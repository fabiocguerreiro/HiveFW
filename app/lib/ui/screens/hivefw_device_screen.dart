import 'dart:async';
import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:share_plus/share_plus.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../l10n/l10n.dart';
import '../../protocol/protocol.dart';
import '../../providers/radio_providers.dart';
import '../../services/hivefw_local_data_service.dart';
import '../../services/app_update_service.dart';
import '../../services/app_update_installer.dart';
import '../../services/storage_service.dart';
import '../../services/notification_service.dart';
import '../../transport/radio_transport.dart';
import '../theme.dart';

part 'parts/settings_notifications.dart';
part 'parts/settings_appearance.dart';
part 'parts/settings_app_update.dart';

/// Device-first surface for the local HiveFW Companion.
///
/// BLE is the primary transport, but the page is transport-agnostic: the same
/// Companion commands work over HiveFW Wi-Fi/TCP when the user chooses it.
class HiveFwDeviceScreen extends ConsumerStatefulWidget {
  const HiveFwDeviceScreen({super.key});

  @override
  ConsumerState<HiveFwDeviceScreen> createState() => _HiveFwDeviceScreenState();
}

class _HiveFwDeviceScreenState extends ConsumerState<HiveFwDeviceScreen> {
  Map<String, String> _base = const {};
  bool _loadingHive = false;
  bool _hiveExtensionsAvailable = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _refreshAll());
  }

  Future<CompanionResponse?> _request(
    Future<void> Function() send,
    bool Function(CompanionResponse) accept, {
    Duration timeout = const Duration(seconds: 3),
  }) async {
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
      return await completer.future.timeout(timeout, onTimeout: () => null);
    } finally {
      await sub.cancel();
    }
  }

  Future<Map<String, String>?> _requestVars(
    Future<void> Function() send,
  ) async {
    final response = await _request(
      send,
      (r) => r is CustomVarsResponse,
    );
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

  Future<void> _refreshAll() async {
    final service = ref.read(radioServiceProvider);
    if (service == null || !service.isConnected) return;

    if (mounted) setState(() => _loadingHive = true);

    // Refresh the actual LoRa configuration as part of every device refresh.
    // DEVICE_QUERY does not contain frequency/BW/SF/CR/TX; those values live
    // in SELF_INFO, so refreshing DeviceInfo alone leaves the radio card stale.
    final selfResponse = await _request(
      service.requestSelfInfo,
      (response) =>
          response is SelfInfoResponse || response is ErrorResponse,
    );
    if (selfResponse is SelfInfoResponse) {
      ref.read(selfInfoProvider.notifier).state = selfResponse.info;
      ref.read(radioConfigProvider.notifier).state =
          selfResponse.info.radioConfig;
    }

    final deviceResponse = await _request(
      service.requestDeviceInfo,
      (response) =>
          response is DeviceInfoResponse || response is ErrorResponse,
    );
    if (deviceResponse is DeviceInfoResponse) {
      ref.read(deviceInfoProvider.notifier).state = deviceResponse.info;
    }
    unawaited(service.requestBattAndStorage().catchError((_) {}));

    final repeatEnabled =
        deviceResponse is DeviceInfoResponse
            ? deviceResponse.info.clientRepeat != 0
            : (ref.read(deviceInfoProvider)?.clientRepeat ?? 0) != 0;

    // Read HiveFW local extensions before background/statistics requests.
    // Companion responses have no request id, so avoiding unrelated errors
    // here prevents a stats NACK from being mistaken for an extension failure.
    final base = await _requestVars(service.requestHiveCustomVars);
    if (base == null) {
      if (mounted) {
        setState(() {
          _loadingHive = false;
          _hiveExtensionsAvailable = false;
        });
      }
      return;
    }

    unawaited(service.requestStats(statsTypeCore).catchError((_) {}));
    unawaited(service.requestStats(statsTypeRadio).catchError((_) {}));
    unawaited(service.requestStats(statsTypePackets).catchError((_) {}));

    if (!mounted) return;
    final parsedAppsChannel = int.tryParse(base['apps_channel'] ?? '');
    ref.read(hiveAppsChannelIndexProvider.notifier).state =
        parsedAppsChannel == null || parsedAppsChannel < 0
            ? null
            : parsedAppsChannel;
    setState(() {
      _base = base;
      _hiveExtensionsAvailable = true;
      _loadingHive = false;
    });
  }

  String _connectionLabel() {
    final last = ref.read(lastDeviceProvider);
    return switch (last?.type) {
      'ble' => 'Bluetooth LE',
      'tcp' => 'Wi-Fi / TCP',
      'serialCompanion' => 'USB / Companion',
      'serialKiss' => 'USB / KISS',
      'webSerial' => 'Web USB',
      'webSerialKiss' => 'Web USB / KISS',
      _ => 'Companion',
    };
  }

  String _pubKeyHex(SelfInfo? info) {
    if (info == null) return '—';
    return info.publicKey
        .map((b) => b.toRadixString(16).padLeft(2, '0'))
        .join();
  }

  int _batteryPercent(int mv) {
    if (mv <= 3000) return 0;
    if (mv >= 4200) return 100;
    return (((mv - 3000) / 1200) * 100).round();
  }

  String _uptime(int seconds) {
    final d = Duration(seconds: seconds);
    final days = d.inDays;
    final hours = d.inHours.remainder(24);
    final mins = d.inMinutes.remainder(60);
    return days > 0 ? '${days}d ${hours}h' : '${hours}h ${mins}m';
  }

  Future<void> _toggleRepeat(bool enabled) async {
    final service = ref.read(radioServiceProvider);
    final config = ref.read(radioConfigProvider);
    if (service == null || config == null) return;

    final response = await _request(
      () => service.setRadioParams(config, repeat: enabled),
      (r) => r is OkResponse || r is ErrorResponse,
    );
    if (response is OkResponse) {
      await service.requestDeviceInfo();
      await Future<void>.delayed(const Duration(milliseconds: 250));
      await _refreshAll();
      _toast(enabled ? 'Modo Repeater ativado' : 'Modo Repeater desativado');
    } else {
      _toast('Não foi possível alterar o modo Repeater', error: true);
    }
  }

  Future<void> _toggleVar(String key, bool enabled, String label) async {
    final ok = await _setVar(key, enabled ? '1' : '0');
    if (!ok) {
      _toast('Não foi possível alterar $label', error: true);
      return;
    }
    await _refreshAll();
  }

  ChannelInfo? _appsChannel(
    List<ChannelInfo> channels,
    int? appsChannelIndex,
  ) {
    if (appsChannelIndex == null || appsChannelIndex < 0) return null;
    for (final channel in channels) {
      if (channel.index == appsChannelIndex && !channel.isEmpty) {
        return channel;
      }
    }
    return null;
  }

  Future<void> _chooseAppsChannel(List<ChannelInfo> channels) async {
    final available = channels.where((channel) => !channel.isEmpty).toList()
      ..sort((a, b) => a.index.compareTo(b.index));
    if (available.isEmpty) {
      _toast('Não existem canais configurados no Companion.', error: true);
      return;
    }

    final current = ref.read(hiveAppsChannelIndexProvider) ?? -1;
    var selected =
        current == -1 || available.any((channel) => channel.index == current)
            ? current
            : -1;

    final result = await showDialog<int>(
      context: context,
      builder:
          (ctx) => StatefulBuilder(
            builder:
                (ctx, setLocal) => AlertDialog(
                  title: const Text('Canal APPS / SOS'),
                  content: DropdownButtonFormField<int>(
                    value: selected,
                    decoration: const InputDecoration(
                      labelText: 'Canal usado pelas Apps / SOS',
                    ),
                    items: [
                      const DropdownMenuItem(
                        value: -1,
                        child: Text('Nenhum / desativar'),
                      ),
                      ...available.map(
                        (channel) => DropdownMenuItem(
                          value: channel.index,
                          child: Text(
                            '${channel.index} · ${channel.name}',
                          ),
                        ),
                      ),
                    ],
                    onChanged: (value) {
                      if (value != null) setLocal(() => selected = value);
                    },
                  ),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.pop(ctx),
                      child: const Text('Cancelar'),
                    ),
                    FilledButton(
                      onPressed: () => Navigator.pop(ctx, selected),
                      child: const Text('Aplicar'),
                    ),
                  ],
                ),
          ),
    );
    if (result == null) return;

    final radio = ref.read(radioServiceProvider);
    if (radio == null) return;

    final ok = await HiveFwLocalDataService(radio).writeAppsChannelIndex(
      result < 0 ? null : result,
    );
    if (!ok) {
      _toast('O Companion rejeitou o Canal APPS.', error: true);
      return;
    }

    ref.read(hiveAppsChannelIndexProvider.notifier).state =
        result < 0 ? null : result;
    await _refreshAll();
    _toast(
      result < 0 ? 'Canal APPS desativado.' : 'Canal APPS atualizado.',
    );
  }

  Future<void> _sendAction(
    Future<void> Function() action,
    String success,
  ) async {
    try {
      await action();
      _toast(success);
    } catch (_) {
      _toast('Comando não enviado', error: true);
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

  void _editName(BuildContext context) {
    final controller = TextEditingController(
      text: ref.read(selfInfoProvider)?.name ?? '',
    );
    showDialog<void>(
      context: context,
      builder:
          (ctx) => AlertDialog(
            title: const Text('Alterar nome do Companion'),
            content: TextField(
              controller: controller,
              maxLength: 32,
              decoration: const InputDecoration(labelText: 'Nome'),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(ctx),
                child: const Text('Cancelar'),
              ),
              FilledButton(
                onPressed: () {
                  final name = controller.text.trim();
                  if (name.isNotEmpty) {
                    ref.read(radioServiceProvider)?.setAdvertName(name);
                    final current = ref.read(selfInfoProvider);
                    if (current != null) {
                      ref.read(selfInfoProvider.notifier).state =
                          current.copyWith(name: name);
                    }
                  }
                  Navigator.pop(ctx);
                },
                child: const Text('Guardar'),
              ),
            ],
          ),
    );
  }

  void _showOwnQrCode(BuildContext context, SelfInfo selfInfo) {
    final uri = MeshCoreUri.buildContactUri(
      name: selfInfo.name,
      publicKey: selfInfo.publicKey,
      type: 1,
    );
    showDialog<void>(
      context: context,
      builder:
          (ctx) => AlertDialog(
            title: const Text('Partilhar contacto'),
            content: SizedBox(
              width: 260,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  QrImageView(
                    data: uri,
                    size: 240,
                    backgroundColor: Colors.white,
                  ),
                  const SizedBox(height: 12),
                  Text(
                    selfInfo.name,
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 4),
                  const Text('Companion'),
                ],
              ),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(ctx),
                child: const Text('Fechar'),
              ),
            ],
          ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final connection = ref.watch(connectionProvider);
    final self = ref.watch(selfInfoProvider);
    final info = ref.watch(deviceInfoProvider);
    final batteryMv = ref.watch(batteryProvider);
    final storage = ref.watch(storageProvider);
    final core = ref.watch(radioStatsCoreProvider);
    final radio = ref.watch(radioStatsRadioProvider);
    final packets = ref.watch(radioStatsPacketsProvider);
    final config = ref.watch(radioConfigProvider);
    final channels = ref.watch(channelsProvider);
    final connected = connection == TransportState.connected;
    final autoReconnect = ref.watch(autoReconnectProvider);
    final repeatEnabled = (info?.clientRepeat ?? 0) != 0;
    final smartAdvert = _base['auto_advert'] == '1';
    final route = (_base['route'] ?? '').split('/');
    final appsChannelIndex = ref.watch(hiveAppsChannelIndexProvider);
    final selectedAppsChannel = _appsChannel(channels, appsChannelIndex);

    return RefreshIndicator(
      onRefresh: _refreshAll,
      child: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _IdentityCard(
            logoAsset: 'assets/images/hivefw-logo.png',
            name: self?.name ?? info?.deviceName ?? 'HiveFW',
            model: info?.model ?? '—',
            technology: connected ? _connectionLabel() : '—',
            firmware: info?.versionString ?? '—',
            firmwareBuild: info?.firmwareBuild ?? '—',
            publicKey: _pubKeyHex(self),
            connected: connected,
            onEditName: connected ? () => _editName(context) : null,
            onShareContact:
                self != null ? () => _showOwnQrCode(context, self) : null,
          ),
          const SizedBox(height: 12),
          const SizedBox(height: 12),
          _CardSection(
            title: 'Ações',
            icon: Icons.bolt,
            child: Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                OutlinedButton.icon(
                  onPressed:
                      connected
                          ? () => _sendAction(
                            () => ref.read(radioServiceProvider)!.sendAdvert(),
                            'Local Advert enviado',
                          )
                          : null,
                  icon: const Icon(Icons.cell_tower),
                  label: const Text('Local Advert'),
                ),
                OutlinedButton.icon(
                  onPressed:
                      connected
                          ? () => _sendAction(
                            () => ref
                                .read(radioServiceProvider)!
                                .sendAdvert(flood: true),
                            'Flood Advert enviado',
                          )
                          : null,
                  icon: const Icon(Icons.hub),
                  label: const Text('Flood Advert'),
                ),
                OutlinedButton.icon(
                  onPressed:
                      connected
                          ? () => _sendAction(
                            () => ref.read(radioServiceProvider)!.syncClock(),
                            'Relógio sincronizado',
                          )
                          : null,
                  icon: const Icon(Icons.sync),
                  label: const Text('Sync Clock'),
                ),
                OutlinedButton.icon(
                  onPressed:
                      connected ? () => context.push('/settings/radio') : null,
                  icon: const Icon(Icons.tune),
                  label: const Text('Config. rádio'),
                ),
                OutlinedButton.icon(
                  onPressed:
                      connected
                          ? () => _sendAction(
                            () => ref.read(radioServiceProvider)!.reboot(),
                            'Reboot enviado',
                          )
                          : null,
                  icon: const Icon(Icons.restart_alt),
                  label: const Text('Reboot'),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          _CardSection(
            title: 'Modo Repeater',
            icon: Icons.repeat,
            trailing:
                _loadingHive
                    ? const SizedBox(
                      width: 18,
                      height: 18,
                      child: CircularProgressIndicator(strokeWidth: 2),
                    )
                    : IconButton(
                      onPressed: connected ? _refreshAll : null,
                      tooltip: 'Atualizar',
                      icon: const Icon(Icons.refresh),
                    ),
            child: Column(
              children: [
                SwitchListTile(
                  contentPadding: EdgeInsets.zero,
                  title: const Text('Modo Repeater'),
                  subtitle: Text(
                    repeatEnabled
                        ? 'Ativo — as funções específicas de Repeater estão disponíveis.'
                        : 'Desativado — ativa para mostrar as funções específicas de Repeater.',
                  ),
                  value: repeatEnabled,
                  onChanged: connected ? _toggleRepeat : null,
                ),
                if (_hiveExtensionsAvailable && repeatEnabled) ...[
                  const Divider(),
                  SwitchListTile(
                    contentPadding: EdgeInsets.zero,
                    title: const Text('Smart Advert'),
                    subtitle: Text(
                      _base['auto_adv_diag']?.isNotEmpty == true
                          ? 'Diagnóstico: ${_base['auto_adv_diag']}'
                          : 'Advertising automático inteligente do HiveFW.',
                    ),
                    value: smartAdvert,
                    onChanged:
                        connected
                            ? (v) => _toggleVar('auto_advert', v, 'Smart Advert')
                            : null,
                  ),
                ] else if (connected && !_loadingHive && !_hiveExtensionsAvailable)
                  const ListTile(
                    contentPadding: EdgeInsets.zero,
                    leading: Icon(Icons.info_outline),
                    title: Text('Extensões HiveFW não detetadas'),
                    subtitle: Text(
                      'As funções Companion padrão continuam disponíveis.',
                    ),
                  ),
              ],
            ),
          ),
          if (_hiveExtensionsAvailable) ...[
            const SizedBox(height: 12),
            _CardSection(
              title: 'HiveFW',
              icon: Icons.hub_outlined,
              child: ListTile(
                contentPadding: EdgeInsets.zero,
                leading: const Icon(Icons.tag),
                title: const Text('Canal APPS / SOS'),
                subtitle: Text(
                  selectedAppsChannel == null
                      ? 'Não definido'
                      : '${selectedAppsChannel.index} · ${selectedAppsChannel.name}',
                ),
                trailing: const Icon(Icons.edit),
                enabled: connected,
                onTap:
                    connected
                        ? () => _chooseAppsChannel(channels)
                        : null,
              ),
            ),
          ],
          const SizedBox(height: 12),
          _CardSection(
            title: 'Ligação',
            icon: Icons.link,
            child: SwitchListTile(
              contentPadding: EdgeInsets.zero,
              title: const Text('Reconexão automática'),
              subtitle: const Text(
                'Tenta voltar a ligar automaticamente ao último rádio.',
              ),
              value: autoReconnect,
              onChanged:
                  (value) =>
                      ref.read(autoReconnectProvider.notifier).set(value),
            ),
          ),
          const SizedBox(height: 12),
          _CardSection(
            title: 'Ferramentas',
            icon: Icons.dashboard_customize_outlined,
            child: Column(
              children: [
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: const Icon(Icons.router_outlined),
                  title: const Text('Wi-Fi e firmware do rádio'),
                  subtitle: const Text(
                    'Provisionar Wi-Fi do V3 e atualizar firmware HiveFW por OTA.',
                  ),
                  trailing: const Icon(Icons.chevron_right),
                  onTap: () => context.push('/hivefw/radio-network'),
                ),
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: const Icon(Icons.radar_outlined),
                  title: const Text('RX Log'),
                  subtitle: const Text(
                    'Captura RF e exportação PCAP para diagnóstico.',
                  ),
                  trailing: const Icon(Icons.chevron_right),
                  onTap: connected ? () => context.push('/settings/rxlog') : null,
                ),
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: const Icon(Icons.backup_outlined),
                  title: const Text('Backup & Restore'),
                  subtitle: Text(
                    repeatEnabled
                        ? 'Companion, Repeater, identidade e contactos descobertos.'
                        : 'Companion, identidade e contactos descobertos.',
                  ),
                  trailing: const Icon(Icons.chevron_right),
                  onTap:
                      connected
                          ? () => context.push('/hivefw/backup')
                          : null,
                ),
              ],
            ),
          ),
          if (repeatEnabled) ...[
            const SizedBox(height: 12),
            _CardSection(
              title: 'Repeater',
              icon: Icons.cell_tower,
              child: Column(
                children: [
                  ListTile(
                    contentPadding: EdgeInsets.zero,
                    leading: const Icon(Icons.settings_outlined),
                    title: const Text('Configuração do Repeater'),
                    subtitle: const Text(
                      'Owner, Mesh Time Sync, RX Gain, ADC, duty cycle e diagnósticos.',
                    ),
                    trailing: const Icon(Icons.chevron_right),
                    onTap:
                        connected && _hiveExtensionsAvailable
                            ? () => context.push('/hivefw/repeater-settings')
                            : null,
                  ),
                  ListTile(
                    contentPadding: EdgeInsets.zero,
                    leading: const Icon(Icons.radar),
                    title: const Text('Vizinhos'),
                    subtitle: const Text(
                      'Repeaters ouvidos diretamente nos últimos 7 dias (Zero-Hop).',
                    ),
                    trailing: const Icon(Icons.chevron_right),
                    onTap:
                        connected
                            ? () => context.push('/hivefw/neighbours')
                            : null,
                  ),
                  ListTile(
                    contentPadding: EdgeInsets.zero,
                    leading: const Icon(Icons.admin_panel_settings_outlined),
                    title: const Text('ACL completa'),
                    subtitle: const Text(
                      'Passwords write-only e identidades persistentes do Repeater.',
                    ),
                    trailing: const Icon(Icons.chevron_right),
                    onTap:
                        connected && _hiveExtensionsAvailable
                            ? () => context.push('/hivefw/acl')
                            : null,
                  ),
                  ListTile(
                    contentPadding: EdgeInsets.zero,
                    leading: const Icon(Icons.route_outlined),
                    title: const Text('RegionMap'),
                    subtitle: const Text(
                      'HOME, DEFAULT, parents e política de flood.',
                    ),
                    trailing: const Icon(Icons.chevron_right),
                    onTap:
                        connected && _hiveExtensionsAvailable
                            ? () => context.push('/hivefw/regions')
                            : null,
                  ),
                ],
              ),
            ),
          ],
          const SizedBox(height: 12),
          const _AppUpdateCard(),
          const SizedBox(height: 12),
          const _NotificationsCard(),
          const SizedBox(height: 12),
          const _AppearanceCard(),
          const SizedBox(height: 24),
        ],
      ),
    );
  }
}

class _Metric {
  const _Metric(this.label, this.value, this.detail, this.icon);
  final String label;
  final String value;
  final String detail;
  final IconData icon;
}

class _MetricGrid extends StatelessWidget {
  const _MetricGrid({required this.metrics});
  final List<_Metric> metrics;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final columns =
            constraints.maxWidth >= 850
                ? 6
                : constraints.maxWidth >= 560
                ? 3
                : 2;
        final width =
            (constraints.maxWidth - (columns - 1) * 8) / columns;
        return Wrap(
          spacing: 8,
          runSpacing: 8,
          children:
              metrics
                  .map(
                    (m) => SizedBox(
                      width: width,
                      child: Card(
                        child: Padding(
                          padding: const EdgeInsets.all(12),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Icon(
                                m.icon,
                                size: 20,
                                color: Theme.of(context).colorScheme.primary,
                              ),
                              const SizedBox(height: 8),
                              Text(
                                m.value,
                                style: Theme.of(context).textTheme.titleMedium
                                    ?.copyWith(fontWeight: FontWeight.bold),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                m.label,
                                style: Theme.of(context).textTheme.labelMedium,
                              ),
                              if (m.detail.isNotEmpty)
                                Text(
                                  m.detail,
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: Theme.of(context).textTheme.bodySmall,
                                ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  )
                  .toList(),
        );
      },
    );
  }
}

class _IdentityCard extends StatelessWidget {
  const _IdentityCard({
    required this.logoAsset,
    required this.name,
    required this.model,
    required this.technology,
    required this.firmware,
    required this.firmwareBuild,
    required this.publicKey,
    required this.connected,
    this.onEditName,
    this.onShareContact,
  });

  final String logoAsset;
  final String name;
  final String model;
  final String technology;
  final String firmware;
  final String firmwareBuild;
  final String publicKey;
  final bool connected;
  final VoidCallback? onEditName;
  final VoidCallback? onShareContact;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Image.asset(
                      logoAsset,
                      height: 42,
                      width: 132,
                      fit: BoxFit.contain,
                    ),
                    const SizedBox(height: 6),
                    InkWell(
                      onTap: onEditName,
                      borderRadius: BorderRadius.circular(8),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 2,
                          vertical: 2,
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            ConstrainedBox(
                              constraints: const BoxConstraints(maxWidth: 180),
                              child: Text(
                                name,
                                overflow: TextOverflow.ellipsis,
                                style: theme.textTheme.bodySmall?.copyWith(
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                            if (onEditName != null) ...[
                              const SizedBox(width: 4),
                              const Icon(Icons.edit_outlined, size: 14),
                            ],
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
                const Spacer(),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Chip(
                      avatar: Icon(
                        connected ? Icons.circle : Icons.circle_outlined,
                        size: 12,
                        color:
                            connected ? Colors.green : theme.colorScheme.error,
                      ),
                      label: Text(connected ? 'Ligado' : 'Desligado'),
                    ),
                    Text(
                      model,
                      style: theme.textTheme.bodySmall?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    Text(
                      technology,
                      style: theme.textTheme.labelSmall?.copyWith(
                        color: theme.colorScheme.onSurfaceVariant,
                      ),
                    ),
                    if (onShareContact != null) ...[
                      const SizedBox(height: 4),
                      TextButton.icon(
                        onPressed: onShareContact,
                        style: TextButton.styleFrom(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 6,
                            vertical: 2,
                          ),
                          visualDensity: VisualDensity.compact,
                        ),
                        icon: const Icon(Icons.qr_code_2, size: 16),
                        label: const Text('Partilhar contacto'),
                      ),
                    ],
                  ],
                ),
              ],
            ),
            const Divider(height: 20),
            _ValueRow('Firmware', firmware),
            _ValueRow('Build', firmwareBuild),
            _ValueRow('Public Key', publicKey, monospace: true),
          ],
        ),
      ),
    );
  }
}

class _CardSection extends StatelessWidget {
  const _CardSection({
    required this.title,
    required this.icon,
    required this.child,
    this.trailing,
  });

  final String title;
  final IconData icon;
  final Widget child;
  final Widget? trailing;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, color: theme.colorScheme.primary),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    title,
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                if (trailing != null) trailing!,
              ],
            ),
            const SizedBox(height: 10),
            child,
          ],
        ),
      ),
    );
  }
}

class _ValueRow extends StatelessWidget {
  const _ValueRow(this.label, this.value, {this.monospace = false});
  final String label;
  final String value;
  final bool monospace;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(child: Text(label)),
          const SizedBox(width: 12),
          Flexible(
            child: Text(
              value,
              textAlign: TextAlign.right,
              style: TextStyle(
                fontWeight: FontWeight.w600,
                fontFamily: monospace ? 'monospace' : null,
                fontSize: monospace ? 11 : null,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
