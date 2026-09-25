import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../protocol/protocol.dart';
import '../../providers/radio_providers.dart';

class HiveFwRepeaterSettingsScreen extends ConsumerStatefulWidget {
  const HiveFwRepeaterSettingsScreen({super.key});

  @override
  ConsumerState<HiveFwRepeaterSettingsScreen> createState() =>
      _HiveFwRepeaterSettingsScreenState();
}

class _HiveFwRepeaterSettingsScreenState
    extends ConsumerState<HiveFwRepeaterSettingsScreen> {
  Map<String, String> _base = const {};
  Map<String, String> _owner = const {};
  Map<String, String> _radio = const {};
  bool _loading = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _refresh());
  }

  bool get _repeatEnabled =>
      (ref.read(deviceInfoProvider)?.clientRepeat ?? 0) != 0;

  Future<CompanionResponse?> _request(
    Future<void> Function() send,
    bool Function(CompanionResponse) accept,
  ) async {
    final service = ref.read(radioServiceProvider);
    if (service == null || !service.isConnected) return null;

    final completer = Completer<CompanionResponse?>();
    late StreamSubscription<CompanionResponse> sub;
    sub = service.responses.listen((response) {
      if (!completer.isCompleted && accept(response)) {
        completer.complete(response);
      }
    });

    try {
      await send();
      return await completer.future.timeout(
        const Duration(seconds: 3),
        onTimeout: () => null,
      );
    } finally {
      await sub.cancel();
    }
  }

  Future<Map<String, String>?> _requestVars(
    Future<void> Function() send,
  ) async {
    final response = await _request(send, (r) => r is CustomVarsResponse);
    return response is CustomVarsResponse ? response.values : null;
  }

  Future<bool> _setVar(String name, String value) async {
    final service = ref.read(radioServiceProvider);
    if (service == null) return false;
    final response = await _request(
      () => service.setHiveCustomVar(name, value),
      (r) => r is OkResponse || r is ErrorResponse,
    );
    return response is OkResponse;
  }

  Future<void> _refresh() async {
    final service = ref.read(radioServiceProvider);
    if (service == null || !service.isConnected || !_repeatEnabled) return;

    setState(() => _loading = true);
    final base = await _requestVars(service.requestHiveCustomVars);
    final owner = await _requestVars(() => service.requestRepeaterProfile(0));
    final radio = await _requestVars(() => service.requestRepeaterProfile(1));

    if (!mounted) return;
    setState(() {
      _base = base ?? const {};
      _owner = owner ?? const {};
      _radio = radio ?? const {};
      _loading = false;
    });
  }

  String get _ownerText {
    final encoded = _owner['owner'] ?? '';
    if (encoded.isEmpty) return '';
    try {
      return utf8.decode(base64Decode(encoded), allowMalformed: true);
    } catch (_) {
      return encoded;
    }
  }

  Future<void> _editOwner() async {
    final controller = TextEditingController(text: _ownerText);
    final value = await showDialog<String>(
      context: context,
      builder:
          (ctx) => AlertDialog(
            title: const Text('Owner info'),
            content: TextField(
              controller: controller,
              minLines: 2,
              maxLines: 5,
              maxLength: 119,
              decoration: const InputDecoration(
                hintText: 'Informação do proprietário / instalação',
              ),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(ctx),
                child: const Text('Cancelar'),
              ),
              FilledButton(
                onPressed: () => Navigator.pop(ctx, controller.text),
                child: const Text('Guardar'),
              ),
            ],
          ),
    );
    controller.dispose();
    if (value == null) return;
    if (utf8.encode(value).length > 119) {
      _toast('Owner info excede 119 bytes UTF-8.', error: true);
      return;
    }
    if (await _setVar('owner', value)) {
      await _refresh();
    } else {
      _toast('Não foi possível guardar Owner info', error: true);
    }
  }

  Future<void> _editAdc() async {
    final milli = int.tryParse(_radio['adc_m'] ?? '') ?? 1000;
    final controller = TextEditingController(
      text: (milli / 1000.0).toStringAsFixed(3),
    );
    final value = await showDialog<double>(
      context: context,
      builder:
          (ctx) => AlertDialog(
            title: const Text('ADC multiplier'),
            content: TextField(
              controller: controller,
              keyboardType: const TextInputType.numberWithOptions(decimal: true),
              decoration: const InputDecoration(labelText: 'Multiplicador'),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(ctx),
                child: const Text('Cancelar'),
              ),
              FilledButton(
                onPressed: () {
                  final v = double.tryParse(
                    controller.text.trim().replaceAll(',', '.'),
                  );
                  if (v != null && v >= 0 && v <= 10) {
                    Navigator.pop(ctx, v);
                  }
                },
                child: const Text('Guardar'),
              ),
            ],
          ),
    );
    controller.dispose();
    if (value == null) return;
    if (await _setVar('adc_m', (value * 1000).round().toString())) {
      await _refresh();
    } else {
      _toast('Não foi possível alterar ADC multiplier', error: true);
    }
  }

  Future<void> _toggle(String key, bool enabled, String label) async {
    if (await _setVar(key, enabled ? '1' : '0')) {
      await _refresh();
    } else {
      _toast('Não foi possível alterar $label', error: true);
    }
  }

  void _toast(String message, {bool error = false}) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor:
            error ? Theme.of(context).colorScheme.errorContainer : null,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final info = ref.watch(deviceInfoProvider);
    final connected = ref.watch(radioServiceProvider)?.isConnected == true;
    final repeatEnabled = (info?.clientRepeat ?? 0) != 0;
    final rxGain = _radio['rxg'] == '1';
    final adcMilli = int.tryParse(_radio['adc_m'] ?? '');
    final meshTime = _base['mt'] == '1';
    final powerNotifySupported = _base.containsKey('power_notify');
    final powerNotify = _base['power_notify'] == '1';
    final externalPower =
        !_base.containsKey('ext_power')
            ? null
            : _base['ext_power'] == '1';

    return Scaffold(
      appBar: AppBar(
        title: const Text('Configuração do Repeater'),
        actions: [
          IconButton(
            onPressed: connected && repeatEnabled && !_loading ? _refresh : null,
            icon: const Icon(Icons.refresh),
            tooltip: 'Atualizar',
          ),
        ],
      ),
      body:
          !repeatEnabled
              ? const Center(
                child: Padding(
                  padding: EdgeInsets.all(24),
                  child: Text(
                    'Ativa o modo Repeater para aceder a estas opções.',
                    textAlign: TextAlign.center,
                  ),
                ),
              )
              : ListView(
                padding: const EdgeInsets.all(16),
                children: [
                  _RepeaterSettingsCard(
                    title: 'Identidade',
                    icon: Icons.badge_outlined,
                    children: [
                      ListTile(
                        contentPadding: EdgeInsets.zero,
                        title: const Text('Owner info'),
                        subtitle: Text(
                          _ownerText.isEmpty ? 'Não definido' : _ownerText,
                          maxLines: 3,
                          overflow: TextOverflow.ellipsis,
                        ),
                        trailing: const Icon(Icons.edit),
                        onTap: connected ? _editOwner : null,
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  _RepeaterSettingsCard(
                    title: 'Sincronização e rádio',
                    icon: Icons.settings_input_antenna,
                    children: [
                      SwitchListTile(
                        contentPadding: EdgeInsets.zero,
                        title: const Text('Mesh Time Sync'),
                        subtitle: const Text(
                          'Sincroniza o relógio do Repeater através da mesh.',
                        ),
                        value: meshTime,
                        onChanged:
                            connected
                                ? (v) => _toggle('mt', v, 'Mesh Time Sync')
                                : null,
                      ),
                      SwitchListTile(
                        contentPadding: EdgeInsets.zero,
                        title: const Text('RX Boosted Gain'),
                        value: rxGain,
                        onChanged:
                            connected
                                ? (v) => _toggle('rxg', v, 'RX Boosted Gain')
                                : null,
                      ),
                      ListTile(
                        contentPadding: EdgeInsets.zero,
                        title: const Text('ADC multiplier'),
                        subtitle: Text(
                          adcMilli == null
                              ? '—'
                              : (adcMilli / 1000.0).toStringAsFixed(3),
                        ),
                        trailing: const Icon(Icons.edit),
                        onTap: connected ? _editAdc : null,
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  _RepeaterSettingsCard(
                    title: 'Energia',
                    icon: Icons.bolt_outlined,
                    children: [
                      ListTile(
                        contentPadding: EdgeInsets.zero,
                        title: const Text('Alimentação'),
                        subtitle: Text(
                          externalPower == null
                              ? 'Estado indisponível neste firmware'
                              : externalPower
                                  ? '⚡ Alimentação externa / carga'
                                  : 'Em bateria',
                        ),
                      ),
                      if (powerNotifySupported)
                        SwitchListTile(
                          contentPadding: EdgeInsets.zero,
                          title: const Text('Notif. Energia'),
                          subtitle: const Text(
                            'Envia “Falha de Energia ⚡” para o Canal APPS/SOS quando a alimentação externa falhar.',
                          ),
                          value: powerNotify,
                          onChanged:
                              connected
                                  ? (v) => _toggle(
                                    'power_notify',
                                    v,
                                    'Notif. Energia',
                                  )
                                  : null,
                        )
                      else
                        const ListTile(
                          contentPadding: EdgeInsets.zero,
                          title: Text('Notif. Energia'),
                          subtitle: Text(
                            'Atualiza o firmware HiveFW para usar esta opção.',
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  _RepeaterSettingsCard(
                    title: 'Diagnóstico',
                    icon: Icons.monitor_heart_outlined,
                    children: [
                      ListTile(
                        contentPadding: EdgeInsets.zero,
                        title: const Text('CAD diagnostics'),
                        subtitle: Text(
                          _base['cad_diag']?.isNotEmpty == true
                              ? _base['cad_diag']!
                              : 'Sem dados',
                        ),
                      ),
                      ListTile(
                        contentPadding: EdgeInsets.zero,
                        title: const Text('Duty cycle'),
                        subtitle: Text('${_base['duty_cycle'] ?? '—'}%'),
                      ),
                    ],
                  ),
                ],
              ),
    );
  }
}

class _RepeaterSettingsCard extends StatelessWidget {
  const _RepeaterSettingsCard({
    required this.title,
    required this.icon,
    required this.children,
  });

  final String title;
  final IconData icon;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Row(
              children: [
                Icon(icon, color: Theme.of(context).colorScheme.primary),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    title,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              ],
            ),
            const Divider(height: 22),
            ...children,
          ],
        ),
      ),
    );
  }
}
