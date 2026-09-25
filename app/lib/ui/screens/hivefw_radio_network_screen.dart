import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../providers/radio_providers.dart';
import '../../services/hivefw_firmware_update_service.dart';
import '../../services/hivefw_wifi_portal_service.dart';

class HiveFwRadioNetworkScreen extends ConsumerStatefulWidget {
  const HiveFwRadioNetworkScreen({super.key});

  @override
  ConsumerState<HiveFwRadioNetworkScreen> createState() =>
      _HiveFwRadioNetworkScreenState();
}

class _HiveFwRadioNetworkScreenState
    extends ConsumerState<HiveFwRadioNetworkScreen> {
  late final TextEditingController _hostCtrl;
  final _ssidCtrl = TextEditingController();
  final _passwordCtrl = TextEditingController();

  List<HiveFwWifiNetwork> _networks = const [];
  HiveFwFirmwareRelease? _release;
  bool _openNetwork = false;
  bool _scanning = false;
  bool _savingWifi = false;
  bool _checkingFirmware = false;
  bool _updatingFirmware = false;
  String? _wifiStatus;
  String? _firmwareStatus;

  @override
  void initState() {
    super.initState();
    _hostCtrl = TextEditingController(text: _defaultHost());
  }

  @override
  void dispose() {
    _hostCtrl.dispose();
    _ssidCtrl.dispose();
    _passwordCtrl.dispose();
    super.dispose();
  }

  String _defaultHost() {
    final id = ref.read(currentRadioIdProvider) ?? '';
    final match = RegExp(r'^tcp://([^:]+)').firstMatch(id);
    return match?.group(1) ?? '192.168.4.1';
  }

  Future<void> _scanWifi() async {
    if (_scanning) return;
    setState(() {
      _scanning = true;
      _wifiStatus = 'A procurar redes…';
    });
    try {
      final service = HiveFwWifiPortalService(_hostCtrl.text);
      final networks = await service.scan();
      if (!mounted) return;
      setState(() {
        _networks = networks;
        _wifiStatus = '${networks.length} redes encontradas.';
      });
    } catch (e) {
      if (!mounted) return;
      setState(
        () => _wifiStatus =
            'Erro: ${e.toString().replaceFirst('Exception: ', '')}',
      );
    } finally {
      if (mounted) setState(() => _scanning = false);
    }
  }

  Future<void> _saveWifi() async {
    if (_savingWifi) return;
    setState(() {
      _savingWifi = true;
      _wifiStatus = 'A guardar credenciais…';
    });
    try {
      final service = HiveFwWifiPortalService(_hostCtrl.text);
      await service.login();
      await service.save(
        ssid: _ssidCtrl.text,
        password: _passwordCtrl.text,
        openNetwork: _openNetwork,
      );
      if (!mounted) return;
      setState(() {
        _wifiStatus =
            'Wi-Fi guardado. O rádio vai reiniciar e ligar-se à nova rede.';
      });
    } catch (e) {
      if (!mounted) return;
      setState(
        () => _wifiStatus =
            'Erro: ${e.toString().replaceFirst('Exception: ', '')}',
      );
    } finally {
      if (mounted) setState(() => _savingWifi = false);
    }
  }

  Future<void> _checkFirmware() async {
    setState(() {
      _checkingFirmware = true;
      _firmwareStatus = 'A verificar a release HiveFW…';
    });
    try {
      final release = await const HiveFwFirmwareUpdateService().latestRelease();
      if (!mounted) return;
      setState(() {
        _release = release;
        _firmwareStatus =
            'Disponível: ${release.version} · '
            '${(release.assetSize / 1024).round()} KiB';
      });
    } catch (e) {
      if (!mounted) return;
      setState(
        () => _firmwareStatus =
            'Erro: ${e.toString().replaceFirst('Exception: ', '')}',
      );
    } finally {
      if (mounted) setState(() => _checkingFirmware = false);
    }
  }

  Future<void> _updateFirmware() async {
    final radio = ref.read(radioServiceProvider);
    final release = _release;
    if (radio == null || !radio.isConnected || release == null) {
      setState(
        () => _firmwareStatus =
            'Liga primeiro ao Companion HiveFW para autorizar o OTA.',
      );
      return;
    }

    setState(() {
      _updatingFirmware = true;
      _firmwareStatus = 'A descarregar o firmware…';
    });
    try {
      final updater = const HiveFwFirmwareUpdateService();
      final firmware = await updater.download(release);
      if (!mounted) return;
      setState(() => _firmwareStatus = 'A enviar firmware para o rádio…');
      await updater.upload(
        host: _hostCtrl.text,
        radio: radio,
        firmware: firmware,
      );
      if (!mounted) return;
      setState(
        () => _firmwareStatus =
            'Firmware aceite. O rádio deverá reiniciar com ${release.version}.',
      );
    } catch (e) {
      if (!mounted) return;
      setState(
        () => _firmwareStatus =
            'Erro: ${e.toString().replaceFirst('Exception: ', '')}',
      );
    } finally {
      if (mounted) setState(() => _updatingFirmware = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final connected = ref.watch(radioServiceProvider)?.isConnected == true;
    final currentVersion =
        ref.watch(deviceInfoProvider.select((info) => info?.versionString)) ??
        '—';

    return Scaffold(
      appBar: AppBar(title: const Text('Wi-Fi e firmware do rádio')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(
                    'Configuração inicial Wi-Fi',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 6),
                  const Text(
                    'Para um V3 novo, liga o telefone ao hotspot criado pelo '
                    'HiveFW e usa 192.168.4.1. Num rádio já configurado podes '
                    'indicar o IP que ele tem na rede local.',
                  ),
                  const SizedBox(height: 16),
                  TextField(
                    controller: _hostCtrl,
                    decoration: const InputDecoration(
                      labelText: 'IP / host do rádio',
                      border: OutlineInputBorder(),
                      prefixIcon: Icon(Icons.router_outlined),
                    ),
                  ),
                  const SizedBox(height: 12),
                  OutlinedButton.icon(
                    onPressed: _scanning ? null : _scanWifi,
                    icon:
                        _scanning
                            ? const SizedBox(
                              width: 16,
                              height: 16,
                              child: CircularProgressIndicator(strokeWidth: 2),
                            )
                            : const Icon(Icons.wifi_find),
                    label: const Text('Procurar redes'),
                  ),
                  if (_networks.isNotEmpty) ...[
                    const SizedBox(height: 12),
                    DropdownButtonFormField<String>(
                      decoration: const InputDecoration(
                        labelText: 'Rede encontrada',
                        border: OutlineInputBorder(),
                      ),
                      items:
                          _networks
                              .map(
                                (n) => DropdownMenuItem(
                                  value: n.ssid,
                                  child: Text(
                                    '${n.ssid} · ${n.rssi} dBm'
                                    '${n.secured ? ' 🔒' : ''}',
                                  ),
                                ),
                              )
                              .toList(),
                      onChanged: (value) {
                        if (value != null) _ssidCtrl.text = value;
                      },
                    ),
                  ],
                  const SizedBox(height: 12),
                  TextField(
                    controller: _ssidCtrl,
                    decoration: const InputDecoration(
                      labelText: 'SSID',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _passwordCtrl,
                    obscureText: true,
                    enabled: !_openNetwork,
                    decoration: const InputDecoration(
                      labelText: 'Password Wi-Fi',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  CheckboxListTile(
                    contentPadding: EdgeInsets.zero,
                    value: _openNetwork,
                    title: const Text('Esta rede não usa password'),
                    onChanged:
                        (value) =>
                            setState(() => _openNetwork = value ?? false),
                  ),
                  FilledButton.icon(
                    onPressed: _savingWifi ? null : _saveWifi,
                    icon: const Icon(Icons.save_outlined),
                    label: const Text('Guardar Wi-Fi e reiniciar'),
                  ),
                  if (_wifiStatus != null) ...[
                    const SizedBox(height: 10),
                    Text(_wifiStatus!),
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
                  Text(
                    'Firmware HiveFW por Wi-Fi',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text('Versão no rádio: $currentVersion'),
                  const SizedBox(height: 12),
                  OutlinedButton.icon(
                    onPressed: _checkingFirmware ? null : _checkFirmware,
                    icon:
                        _checkingFirmware
                            ? const SizedBox(
                              width: 16,
                              height: 16,
                              child: CircularProgressIndicator(strokeWidth: 2),
                            )
                            : const Icon(Icons.system_update_outlined),
                    label: const Text('Verificar firmware'),
                  ),
                  if (_release != null) ...[
                    const SizedBox(height: 8),
                    FilledButton.icon(
                      onPressed:
                          connected && !_updatingFirmware
                              ? _updateFirmware
                              : null,
                      icon:
                          _updatingFirmware
                              ? const SizedBox(
                                width: 16,
                                height: 16,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                ),
                              )
                              : const Icon(Icons.upload_outlined),
                      label: Text(
                        _updatingFirmware
                            ? 'A atualizar…'
                            : 'Atualizar Heltec V3 por Wi-Fi',
                      ),
                    ),
                  ],
                  if (_firmwareStatus != null) ...[
                    const SizedBox(height: 10),
                    Text(_firmwareStatus!),
                  ],
                  const SizedBox(height: 8),
                  const Text(
                    'O OTA usa um token efémero enviado ao rádio pela ligação '
                    'Companion antes do upload. Para T114/BLE será necessário '
                    'um fluxo DFU específico numa fase posterior.',
                    style: TextStyle(fontSize: 12),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
