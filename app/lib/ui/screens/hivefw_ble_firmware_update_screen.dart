import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../providers/radio_providers.dart';
import '../../services/hivefw_ble_firmware_update_service.dart';
import '../../services/hivefw_firmware_update_service.dart';

class HiveFwBleFirmwareUpdateScreen extends ConsumerStatefulWidget {
  const HiveFwBleFirmwareUpdateScreen({super.key});

  @override
  ConsumerState<HiveFwBleFirmwareUpdateScreen> createState() =>
      _HiveFwBleFirmwareUpdateScreenState();
}

class _HiveFwBleFirmwareUpdateScreenState
    extends ConsumerState<HiveFwBleFirmwareUpdateScreen> {
  HiveFwFirmwareRelease? _release;
  bool _checking = false;
  bool _updating = false;
  int _progress = 0;
  String? _status;

  HiveFwFirmwareTarget? _targetForModel(String model) {
    final value = model.toLowerCase();
    if (value.contains('t114')) return HiveFwFirmwareTarget.t114Ble;
    if (value.contains('heltec') && value.contains('v3')) {
      return HiveFwFirmwareTarget.v3Ble;
    }
    return null;
  }

  String _targetLabel(HiveFwFirmwareTarget target) => switch (target) {
    HiveFwFirmwareTarget.v3Ble => 'Heltec V3 BLE',
    HiveFwFirmwareTarget.t114Ble => 'Heltec T114 BLE',
    HiveFwFirmwareTarget.v3Wifi => 'Heltec V3 Wi-Fi',
  };

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _check());
  }

  Future<void> _check() async {
    final info = ref.read(deviceInfoProvider);
    final target = _targetForModel(info?.model ?? '');
    if (target == null) {
      if (mounted) {
        setState(() => _status = 'Hardware não suportado para atualização BLE.');
      }
      return;
    }

    setState(() {
      _checking = true;
      _status = 'A verificar a última release HiveFW…';
    });
    try {
      final release = await const HiveFwFirmwareUpdateService()
          .latestReleaseForTarget(target);
      if (!mounted) return;
      setState(() {
        _release = release;
        _status = 'Release ${release.tag} disponível para ${_targetLabel(target)}.';
      });
    } catch (error) {
      if (!mounted) return;
      setState(() => _status = 'Erro: $error');
    } finally {
      if (mounted) setState(() => _checking = false);
    }
  }

  Future<void> _update() async {
    if (_updating) return;

    final info = ref.read(deviceInfoProvider);
    final lastDevice = ref.read(lastDeviceProvider);
    final release = _release;
    final target = _targetForModel(info?.model ?? '');

    if (release == null || target == null) {
      _toast('Verifica primeiro a última release.', error: true);
      return;
    }
    if (release.target != target) {
      _toast('O firmware descarregado não corresponde ao hardware ligado.', error: true);
      return;
    }
    if (lastDevice == null || lastDevice.type != 'ble') {
      _toast('Liga o rádio por Bluetooth antes de atualizar.', error: true);
      return;
    }

    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text('Atualizar para ${release.tag}?'),
        content: Text(
          'Será instalado ${release.assetName} em ${_targetLabel(target)}.\n\n'
          'Mantém o telemóvel próximo do rádio e não interrompas o Bluetooth até a atualização terminar.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Cancelar'),
          ),
          FilledButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Atualizar'),
          ),
        ],
      ),
    );
    if (confirmed != true) return;

    final deviceId = lastDevice.id;
    final deviceName = lastDevice.name;

    setState(() {
      _updating = true;
      _progress = 0;
      _status = 'A descarregar e validar o firmware…';
    });

    try {
      final firmware = await const HiveFwFirmwareUpdateService().download(release);
      if (!mounted) return;
      setState(() {
        _progress = 1;
        _status = 'Firmware validado. A preparar Bluetooth…';
      });

      // Stop the normal Companion session first. This also disables the app's
      // automatic reconnect loop while the OTA/DFU transport owns the radio.
      await ref.read(connectionProvider.notifier).disconnect();
      await Future<void>.delayed(const Duration(milliseconds: 650));

      final updater = const HiveFwBleFirmwareUpdater();
      void progress(int percent, String state) {
        if (!mounted) return;
        setState(() {
          _progress = percent.clamp(0, 100);
          _status = state;
        });
      }

      if (target == HiveFwFirmwareTarget.v3Ble) {
        await updater.flashV3(
          deviceId: deviceId,
          firmware: firmware,
          onProgress: progress,
        );
      } else if (target == HiveFwFirmwareTarget.t114Ble) {
        await updater.flashT114(
          deviceId: deviceId,
          deviceName: deviceName,
          dfuZip: firmware,
          onProgress: progress,
        );
      } else {
        throw StateError('Este menu suporta apenas firmware BLE.');
      }

      if (!mounted) return;
      setState(() {
        _progress = 100;
        _status = 'Atualização concluída. Aguarda o reinício e volta a ligar ao rádio.';
      });
      _toast('Firmware atualizado com sucesso.');
    } catch (error) {
      if (!mounted) return;
      final text = error.toString().replaceFirst('Bad state: ', '');
      setState(() => _status = text);
      _toast(text, error: true);
    } finally {
      if (mounted) setState(() => _updating = false);
    }
  }

  void _toast(String text, {bool error = false}) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(text),
        backgroundColor:
            error ? Theme.of(context).colorScheme.errorContainer : null,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final info = ref.watch(deviceInfoProvider);
    final lastDevice = ref.watch(lastDeviceProvider);
    final target = _targetForModel(info?.model ?? '');
    final installed = info?.versionString ?? '—';
    final connectedViaBle = lastDevice?.type == 'ble';

    return Scaffold(
      appBar: AppBar(title: const Text('Atualização de firmware BLE')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(Icons.system_update_alt, color: Theme.of(context).colorScheme.primary),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          target == null ? 'Rádio não suportado' : _targetLabel(target),
                          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  _row('Instalado', installed),
                  _row('Última release', _release?.tag ?? '—'),
                  _row('Ficheiro', _release?.assetName ?? '—'),
                  _row('Ligação', connectedViaBle ? 'Bluetooth LE' : 'Não é BLE'),
                  if (target == HiveFwFirmwareTarget.v3Ble) ...[
                    const SizedBox(height: 8),
                    Text(
                      'O V3 precisa de firmware com o serviço HiveFW BLE OTA. '
                      'Se a versão instalada for anterior a este suporte, é necessário um único flash USB inicial.',
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                  ],
                  if (target == HiveFwFirmwareTarget.t114Ble) ...[
                    const SizedBox(height: 8),
                    Text(
                      'O T114 usa o DFU Bluetooth nativo do bootloader Adafruit/nRF52 e o ZIP oficial da release.',
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                  ],
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  OutlinedButton.icon(
                    onPressed: _checking || _updating ? null : _check,
                    icon: const Icon(Icons.refresh),
                    label: Text(_checking ? 'A verificar…' : 'Verificar última versão'),
                  ),
                  const SizedBox(height: 8),
                  FilledButton.icon(
                    onPressed:
                        target != null && connectedViaBle && !_checking && !_updating && _release != null
                            ? _update
                            : null,
                    icon: const Icon(Icons.bluetooth_connected),
                    label: Text(_updating ? 'A atualizar…' : 'Atualizar por Bluetooth'),
                  ),
                  if (_updating || _progress > 0) ...[
                    const SizedBox(height: 14),
                    LinearProgressIndicator(value: _progress <= 0 ? null : _progress / 100),
                    const SizedBox(height: 5),
                    Text('$_progress%', textAlign: TextAlign.right),
                  ],
                  if (_status != null) ...[
                    const SizedBox(height: 12),
                    Text(_status!, style: Theme.of(context).textTheme.bodySmall),
                  ],
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _row(String label, String value) => Padding(
    padding: const EdgeInsets.symmetric(vertical: 4),
    child: Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(child: Text(label)),
        const SizedBox(width: 12),
        Flexible(
          child: Text(
            value,
            textAlign: TextAlign.right,
            style: const TextStyle(fontWeight: FontWeight.w600),
          ),
        ),
      ],
    ),
  );
}
