import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:math';
import 'dart:typed_data';

import 'package:crypto/crypto.dart';
import 'package:flutter/services.dart';
import 'package:flutter_blue_plus/flutter_blue_plus.dart';
import 'package:path_provider/path_provider.dart';

class HiveFwBleFirmwareUpdater {
  const HiveFwBleFirmwareUpdater();

  static final Guid _v3OtaService =
      Guid('A6ED0401-D344-460A-8075-B9E8EC90D71B');
  static final Guid _v3OtaControl =
      Guid('A6ED0402-D344-460A-8075-B9E8EC90D71B');
  static final Guid _v3OtaData =
      Guid('A6ED0403-D344-460A-8075-B9E8EC90D71B');

  static const MethodChannel _dfuChannel =
      MethodChannel('pt.hivefw.companion/dfu');
  static const EventChannel _dfuEvents =
      EventChannel('pt.hivefw.companion/dfu_events');

  Future<void> flashV3({
    required String deviceId,
    required Uint8List firmware,
    void Function(int percent, String state)? onProgress,
  }) async {
    final device = BluetoothDevice.fromId(deviceId);
    StreamSubscription<List<int>>? controlSub;
    final acknowledgements = StreamController<Uint8List>.broadcast();
    var connectedHere = false;

    try {
      final connected = await device.connectionState.first;
      if (connected != BluetoothConnectionState.connected) {
        await device.connect(
          autoConnect: false,
          timeout: const Duration(seconds: 15),
        );
        connectedHere = true;
      }

      try {
        await device.requestMtu(247);
      } catch (_) {}

      onProgress?.call(0, 'A localizar o serviço BLE OTA…');
      final services = await device.discoverServices();
      BluetoothService? otaService;
      for (final service in services) {
        if (service.serviceUuid == _v3OtaService) {
          otaService = service;
          break;
        }
      }
      if (otaService == null) {
        throw StateError(
          'Este firmware V3 ainda não suporta atualização BLE. '
          'É necessário um único flash USB inicial com uma versão que inclua BLE OTA.',
        );
      }

      BluetoothCharacteristic? control;
      BluetoothCharacteristic? data;
      for (final characteristic in otaService.characteristics) {
        if (characteristic.characteristicUuid == _v3OtaControl) {
          control = characteristic;
        } else if (characteristic.characteristicUuid == _v3OtaData) {
          data = characteristic;
        }
      }
      if (control == null || data == null) {
        throw StateError('Serviço BLE OTA incompleto no V3.');
      }

      controlSub = control.onValueReceived.listen((value) {
        if (value.isNotEmpty) {
          acknowledgements.add(Uint8List.fromList(value));
        }
      });
      await control.setNotifyValue(true);

      Future<Uint8List> waitAck(int opcode) async {
        return acknowledgements.stream
            .where((frame) => frame.length >= 2 && frame[0] == opcode)
            .first
            .timeout(const Duration(seconds: 10));
      }

      Future<void> writeControl(Uint8List frame, int opcode) async {
        final ackFuture = waitAck(opcode);
        await control!.write(frame, withoutResponse: false);
        final ack = await ackFuture;
        if (ack[1] != 0) {
          throw StateError(
            'O V3 rejeitou a operação BLE OTA (código ${ack[1]}).',
          );
        }
      }

      final imageMd5 = md5.convert(firmware).toString();
      final begin = BytesBuilder()
        ..addByte(0x01)
        ..add(_uint32LE(firmware.length))
        ..add(ascii.encode(imageMd5));

      onProgress?.call(1, 'A iniciar atualização BLE…');
      await writeControl(begin.toBytes(), 0x01);

      final mtu = max(23, device.mtuNow);
      // ATT payload = MTU - 3. Keep a conservative upper bound for ESP32
      // NimBLE/Bluedroid interoperability while still achieving good speed.
      final chunkSize = min(240, max(20, mtu - 3));
      var sent = 0;
      var lastPercent = -1;

      while (sent < firmware.length) {
        final end = min(sent + chunkSize, firmware.length);
        await data.write(
          firmware.sublist(sent, end),
          withoutResponse: false,
        );
        sent = end;
        final percent = ((sent / firmware.length) * 100).floor().clamp(1, 99);
        if (percent != lastPercent) {
          lastPercent = percent;
          onProgress?.call(percent, 'A enviar firmware por Bluetooth…');
        }
      }

      onProgress?.call(99, 'A validar firmware no V3…');
      await writeControl(Uint8List.fromList([0x02]), 0x02);
      onProgress?.call(100, 'Atualização concluída. O V3 vai reiniciar.');
    } catch (_) {
      try {
        final services = await device.discoverServices();
        for (final service in services) {
          if (service.serviceUuid != _v3OtaService) continue;
          for (final characteristic in service.characteristics) {
            if (characteristic.characteristicUuid == _v3OtaControl) {
              await characteristic.write(
                Uint8List.fromList([0x03]),
                withoutResponse: false,
              );
            }
          }
        }
      } catch (_) {}
      rethrow;
    } finally {
      await controlSub?.cancel();
      await acknowledgements.close();
      // The V3 normally reboots itself. Disconnecting here also releases the
      // direct BLE object if the reboot has not happened yet.
      if (connectedHere || device.isConnected) {
        try {
          await device.disconnect();
        } catch (_) {}
      }
    }
  }

  Future<void> flashT114({
    required String deviceId,
    required String deviceName,
    required Uint8List dfuZip,
    void Function(int percent, String state)? onProgress,
  }) async {
    final dir = await getTemporaryDirectory();
    final file = File(
      '${dir.path}/hivefw-t114-${DateTime.now().millisecondsSinceEpoch}.zip',
    );
    await file.writeAsBytes(dfuZip, flush: true);

    StreamSubscription<dynamic>? eventSub;
    final done = Completer<void>();

    try {
      eventSub = _dfuEvents.receiveBroadcastStream().listen(
        (dynamic raw) {
          if (raw is! Map) return;
          final state = raw['state']?.toString() ?? 'dfu';
          final percent = (raw['percent'] as num?)?.toInt() ?? 0;
          final message = switch (state) {
            'connecting' => 'A ligar ao bootloader DFU…',
            'connected' => 'Bootloader DFU ligado.',
            'starting' || 'started' => 'A iniciar DFU…',
            'dfu_mode' => 'T114 em modo DFU.',
            'uploading' => 'A enviar firmware por Bluetooth…',
            'validating' => 'A validar firmware…',
            'disconnecting' => 'A reiniciar o T114…',
            'completed' => 'Atualização concluída.',
            'aborted' => 'Atualização cancelada.',
            'error' => raw['message']?.toString() ?? 'Erro durante DFU.',
            _ => state,
          };
          onProgress?.call(percent, message);

          if (state == 'completed' && !done.isCompleted) {
            done.complete();
          } else if (state == 'aborted' && !done.isCompleted) {
            done.completeError(StateError('Atualização T114 cancelada.'));
          } else if (state == 'error' && !done.isCompleted) {
            done.completeError(
              StateError(raw['message']?.toString() ?? 'Falha no DFU T114.'),
            );
          }
        },
        onError: (Object error) {
          if (!done.isCompleted) done.completeError(error);
        },
      );

      final started = await _dfuChannel.invokeMethod<bool>('startT114Dfu', {
        'address': deviceId,
        'name': deviceName,
        'filePath': file.path,
      });
      if (started != true) {
        throw StateError('Não foi possível iniciar o DFU T114.');
      }
      await done.future.timeout(const Duration(minutes: 8));
    } finally {
      await eventSub?.cancel();
      try {
        await file.delete();
      } catch (_) {}
    }
  }

  Uint8List _uint32LE(int value) {
    final data = ByteData(4)..setUint32(0, value, Endian.little);
    return data.buffer.asUint8List();
  }
}
