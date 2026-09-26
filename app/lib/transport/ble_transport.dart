import 'dart:async';
import 'dart:typed_data';

import 'package:flutter_blue_plus/flutter_blue_plus.dart';
import 'package:logger/logger.dart';

import 'radio_transport.dart';

final _log = Logger(printer: SimplePrinter(printTime: false));

String _sanitizeUtf16(String s) {
  for (var i = 0; i < s.length; i++) {
    final c = s.codeUnitAt(i);
    if (c >= 0xD800 && c <= 0xDFFF) {
      final buf = StringBuffer();
      for (var j = 0; j < s.length; j++) {
        final u = s.codeUnitAt(j);
        if (u >= 0xD800 && u <= 0xDBFF) {
          if (j + 1 < s.length) {
            final u2 = s.codeUnitAt(j + 1);
            if (u2 >= 0xDC00 && u2 <= 0xDFFF) {
              buf.write(s[j]);
              buf.write(s[j + 1]);
              j++;
              continue;
            }
          }
          buf.writeCharCode(0xFFFD);
        } else if (u >= 0xDC00 && u <= 0xDFFF) {
          buf.writeCharCode(0xFFFD);
        } else {
          buf.write(s[j]);
        }
      }
      return buf.toString();
    }
  }
  return s;
}

String _safeLowerTrim(String s) => _sanitizeUtf16(s).toLowerCase().trim();

String _safeDeviceName(String? name, {required String fallback}) {
  final sanitized = _sanitizeUtf16(name ?? '').trim();
  return sanitized.isEmpty ? fallback : sanitized;
}

/// Nordic UART Service UUIDs used by MeshCore BLE radios.
class BleUuids {
  static final service = Guid('6E400001-B5A3-F393-E0A9-E50E24DCCA9E');
  static final rxCharacteristic = Guid('6E400002-B5A3-F393-E0A9-E50E24DCCA9E');
  static final txCharacteristic = Guid('6E400003-B5A3-F393-E0A9-E50E24DCCA9E');
}

/// BLE transport for MeshCore companion radio protocol.
class BleTransport implements RadioTransport {
  BleTransport(this._device);

  final BluetoothDevice _device;
  BluetoothCharacteristic? _rxChar;
  BluetoothCharacteristic? _txChar;
  StreamSubscription<List<int>>? _notifySub;
  StreamSubscription<BluetoothConnectionState>? _connStateSub;
  final _dataController = StreamController<Uint8List>.broadcast();
  final _connectionLostController = StreamController<void>.broadcast();
  bool _connected = false;

  /// Set to true when disconnect() is called by the app, so the
  /// connectionState listener doesn't fire a spurious connectionLost event.
  bool _userDisconnected = false;

  @override
  String get displayName =>
      'BLE: ${_safeDeviceName(_device.platformName, fallback: _device.remoteId.str)}';

  @override
  bool get isConnected => _connected;

  @override
  bool get usesFraming => false;

  @override
  Stream<Uint8List> get dataStream => _dataController.stream;

  @override
  Stream<void> get connectionLost => _connectionLostController.stream;

  @override
  Future<bool> connect() async {
    _userDisconnected = false;
    try {
      _log.i(
        'BLE connecting to ${_safeDeviceName(_device.platformName, fallback: _device.remoteId.str)}',
      );

      await _device.connect(
        autoConnect: false,
        timeout: const Duration(seconds: 15),
      );

      // Request a larger MTU before service discovery on Android.
      try {
        await _device.requestMtu(247);
      } catch (e) {
        _log.d('MTU request skipped: $e');
      }

      final services = await _device.discoverServices();
      final uartService = services.firstWhere(
        (s) => s.serviceUuid == BleUuids.service,
        orElse: () => throw StateError('UART service not found'),
      );

      _rxChar = uartService.characteristics.firstWhere(
        (c) => c.characteristicUuid == BleUuids.rxCharacteristic,
      );
      _txChar = uartService.characteristics.firstWhere(
        (c) => c.characteristicUuid == BleUuids.txCharacteristic,
      );

      _log.d('TX char properties: ${_txChar!.properties}');

      // Subscribe to incoming data BEFORE enabling notifications
      // (per flutter_blue_plus docs — avoids missing early values).
      _notifySub = _txChar!.onValueReceived.listen((data) {
        _dataController.add(Uint8List.fromList(data));
      });

      // Brief settle after service discovery — GATT needs time before
      // descriptor writes / startNotifications will succeed.
      await Future.delayed(const Duration(milliseconds: 300));

      // Enable notifications on the TX characteristic (radio → app).
      await _enableNotifications(_txChar!);

      _connected = true;
      _log.i(
        'BLE connected: ${_safeDeviceName(_device.platformName, fallback: _device.remoteId.str)}',
      );

      // Monitor for unexpected disconnects (not triggered by dispose/disconnect).
      _connStateSub = _device.connectionState.listen((s) {
        if (s == BluetoothConnectionState.disconnected &&
            _connected &&
            !_userDisconnected) {
          _log.w('BLE connection lost unexpectedly');
          _connected = false;
          _connectionLostController.add(null);
        }
      });

      return true;
    } catch (e) {
      _log.e('BLE connect failed: $e');
      await _notifySub?.cancel();
      _notifySub = null;
      _connected = false;
      return false;
    }
  }

  @override
  Future<void> disconnect() async {
    _userDisconnected = true;
    _connected = false;
    await _notifySub?.cancel();
    _notifySub = null;
    await _connStateSub?.cancel();
    _connStateSub = null;
    try {
      await _device.disconnect();
    } catch (_) {}
    _log.i('BLE disconnected');
  }

  @override
  Future<void> send(Uint8List data) async {
    if (_rxChar == null || !_connected) {
      throw StateError('Not connected');
    }
    // Bluetooth handles ATT fragmentation internally — write the
    // full payload in a single call.  Chunking would cause the firmware to
    // receive each write as a separate command frame, truncating messages.
    //
    // requestMtu(247) on native gives 244 usable bytes, larger than the
    // protocol's MAX_FRAME_SIZE=172, so a single write is always sufficient.
    //
    // Use Write Without Response when the characteristic supports it (NUS RX
    // always does).  This eliminates the ATT Write Response round-trip
    // (~1 BLE connection interval per command) so the full _sendAndWait
    // timeout is available for the firmware's notification reply.
    // We still get delivery confirmation implicitly: if the write is lost we
    // time out waiting for the response notification and can retry.
    final withoutResponse = _rxChar!.properties.writeWithoutResponse;
    await _rxChar!.write(data, withoutResponse: withoutResponse);
  }

  @override
  Future<void> dispose() async {
    await disconnect();
    await _dataController.close();
    await _connectionLostController.close();
  }

  /// Enable notifications on a characteristic, with platform-specific handling.
  ///
  /// **Web bug (flutter_blue_plus_Android 7.0.2):**
  /// The Android implementation of `setNotifyValue` calls the Bluetooth
  /// `startNotifications()` JS API and adds the event listener, then returns
  /// `true` (hasCCCD). The platform-agnostic layer interprets `true` as
  /// "wait for an `onDescriptorWritten` confirmation event" — but the Android
  /// plugin *never* emits that event because Bluetooth handles the CCCD
  /// descriptor internally. So the call always times out after 15 s, even
  /// though `startNotifications()` already succeeded.
  ///
  /// **Web workaround:** Call `setNotifyValue` with a short 2 s timeout; the
  /// timeout only fires in the stale "wait for CCCD" phase. Notifications are
  /// already active at that point, so catching and ignoring the error is safe.
  ///
  /// **Windows (flutter_blue_plus_windows):**
  /// Uses `WriteClientCharacteristicConfigurationDescriptorAsync` via WinRT —
  /// no timeout bug.  Falls through to the native retry path below.
  ///
  /// **Android / iOS / macOS / Linux:** native retry path.
  static Future<void> _enableNotifications(BluetoothCharacteristic char) async {
    const maxAttempts = 3;
    const delay = Duration(milliseconds: 500);
    for (var attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        _log.d('setNotifyValue attempt $attempt/$maxAttempts');
        await char.setNotifyValue(true);
        _log.i('setNotifyValue succeeded on attempt $attempt');
        return;
      } catch (e) {
        _log.w('setNotifyValue attempt $attempt/$maxAttempts failed: $e');
        if (attempt == maxAttempts) rethrow;
        await Future.delayed(delay * attempt);
      }
    }
  }

  /// Accepts a compatible Companion advertisement when it exposes the Nordic
  /// UART Service used by the Companion protocol, or when its advertised name
  /// identifies either HiveFW or the official MeshCore firmware.
  ///
  /// The NUS UUID is authoritative: this keeps custom-named official clients
  /// visible even when their name does not contain either product name.
  static bool isSupportedCompanionAdvertisement(
    List<Guid> serviceUuids,
    String deviceName,
  ) {
    if (serviceUuids.contains(BleUuids.service)) return true;
    final name = _safeLowerTrim(deviceName);
    return name.contains('hivefw') || name.contains('meshcore');
  }

  /// Compatibility alias retained for callers/tests from the original base.
  static bool isMeshCoreAdvertisement(
    List<Guid> serviceUuids,
    String deviceName,
  ) =>
      isSupportedCompanionAdvertisement(serviceUuids, deviceName);

  /// Platform scan inclusion rule used by the native listener.
  static bool _shouldIncludeScanResult(ScanResult r) {
    final serviceUuids = r.advertisementData.serviceUuids;
    final advName = _safeLowerTrim(r.advertisementData.advName);
    final platformName = _safeLowerTrim(r.device.platformName);

    return isSupportedCompanionAdvertisement(serviceUuids, advName) ||
        isSupportedCompanionAdvertisement(const [], platformName);
  }

  static String _displayNameForScanResult(ScanResult r) {
    final advName = _safeDeviceName(r.advertisementData.advName, fallback: '');
    if (advName.isNotEmpty) {
      return advName;
    }
    final platformName = _safeDeviceName(r.device.platformName, fallback: '');
    if (platformName.isNotEmpty) {
      return platformName;
    }
    return 'BLE (${r.device.remoteId.str.substring(0, 8)})';
  }

  /// Scan for HiveFW / MeshCore BLE Companions on Android.
  static Stream<RadioDevice> scan({
    Duration timeout = const Duration(seconds: 10),
  }) {
    final controller = StreamController<RadioDevice>();
    final seen = <String>{};

    Future<void> doScan() async {
      {
        void addKnownAndroidDevice(BluetoothDevice d) {
          final id = d.remoteId.str;
          final name = _safeDeviceName(d.platformName, fallback: id);
          if (seen.contains(id) || controller.isClosed) return;

          // Known/bonded devices do not expose advertisement service UUIDs
          // here, so accept both HiveFW and official MeshCore name prefixes.
          final lowerName = _safeLowerTrim(name);
          if (lowerName.startsWith('hivefw') ||
              lowerName.startsWith('meshcore')) {
            seen.add(id);
            controller.add(
              RadioDevice(id: id, name: name, type: RadioDeviceType.ble),
            );
          }
        }

        try {
          final system = await FlutterBluePlus.systemDevices(const []);
          for (final d in system) {
            addKnownAndroidDevice(d);
          }
        } catch (e) {
          _log.w('Could not read Android system BLE devices: $e');
        }

        try {
          final bonded = await FlutterBluePlus.bondedDevices;
          for (final d in bonded) {
            addKnownAndroidDevice(d);
          }
        } catch (e) {
          _log.w('Could not read Android bonded BLE devices: $e');
        }
      }

      // Subscribe BEFORE startScan — critical on Android where startScan blocks
      // inside requestDevice() and emits the chosen device before returning.
      final sub = FlutterBluePlus.onScanResults.listen((results) {
        for (final r in results) {
          final displayName = _displayNameForScanResult(r);

          // Native uses broad scan + client-side filter.
          if (!kIsWeb && !_shouldIncludeScanResult(r)) {
            continue;
          }
          if (!seen.contains(r.device.remoteId.str)) {
            seen.add(r.device.remoteId.str);
            if (!controller.isClosed) {
              controller.add(
                RadioDevice(
                  id: r.device.remoteId.str,
                  name: displayName,
                  type: RadioDeviceType.ble,
                  rssi: r.rssi,
                ),
              );
            }
          }
        }
      });

      try {
        await FlutterBluePlus.startScan(
          timeout: timeout,
          androidScanMode: AndroidScanMode.lowLatency,
        );
      } catch (e) {
        _log.e('BLE startScan failed: $e');
      }

      try {
        await FlutterBluePlus.isScanning.where((scanning) => !scanning).first;
      } catch (e) {
        _log.e('BLE scan wait failed: $e');
      } finally {
        await sub.cancel();
        await controller.close();
      }
    }

    doScan();
    return controller.stream;
  }

  /// Create a BLE transport from a scanned device ID.
  ///
  /// Creates the Android BLE transport for a scanned Companion.
  static RadioTransport fromDeviceId(String deviceId) =>
      BleTransport(BluetoothDevice.fromId(deviceId));
}
