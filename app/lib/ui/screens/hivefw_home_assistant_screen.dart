import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../protocol/models.dart';
import '../../providers/radio_providers.dart';
import '../../services/hivefw_local_data_service.dart';
import '../../transport/radio_transport.dart';

class HiveFwHomeAssistantScreen extends ConsumerStatefulWidget {
  const HiveFwHomeAssistantScreen({super.key});

  @override
  ConsumerState<HiveFwHomeAssistantScreen> createState() =>
      _HiveFwHomeAssistantScreenState();
}

class _HiveFwHomeAssistantScreenState
    extends ConsumerState<HiveFwHomeAssistantScreen> {
  bool _loading = false;
  bool _sending = false;
  String? _error;
  List<HiveFwHaCommand> _commands = const [];

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _refresh());
  }

  Future<void> _refresh() async {
    final radio = ref.read(radioServiceProvider);
    if (radio == null || !radio.isConnected) {
      if (mounted) {
        setState(() {
          _error = 'Companion desligado';
          _commands = const [];
        });
      }
      return;
    }

    setState(() {
      _loading = true;
      _error = null;
    });

    try {
      final local = HiveFwLocalDataService(radio);
      final appsChannel = await local.readAppsChannelIndex();
      final commands = await local.readHaCommands();

      if (!mounted) return;
      ref.read(hiveAppsChannelIndexProvider.notifier).state = appsChannel;
      setState(() {
        _commands = commands;
        _loading = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _error =
            'O firmware ligado não expõe a lista Home Assistant do HiveFW.';
        _loading = false;
      });
    }
  }

  ChannelInfo? _selectedChannel(
    List<ChannelInfo> channels,
    int? appsChannelIndex,
  ) {
    final idx = appsChannelIndex;
    if (idx == null || idx < 0) return null;
    for (final channel in channels) {
      if (channel.index == idx && !channel.isEmpty) return channel;
    }
    return null;
  }

  Future<void> _chooseAppsChannel(List<ChannelInfo> channels) async {
    final available = channels.where((c) => !c.isEmpty).toList()
      ..sort((a, b) => a.index.compareTo(b.index));
    if (available.isEmpty) {
      _toast('Não existem canais configurados no Companion.', error: true);
      return;
    }

    var selected = ref.read(hiveAppsChannelIndexProvider) ?? -1;
    final result = await showDialog<int>(
      context: context,
      builder:
          (ctx) => StatefulBuilder(
            builder:
                (ctx, setLocal) => AlertDialog(
                  title: const Text('Canal APPS'),
                  content: DropdownButtonFormField<int>(
                    value:
                        selected == -1 ||
                                available.any((c) => c.index == selected)
                            ? selected
                            : -1,
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

    try {
      final local = HiveFwLocalDataService(radio);
      final ok = await local.writeAppsChannelIndex(
        result < 0 ? null : result,
      );
      if (!ok) {
        _toast('O Companion rejeitou o Canal APPS.', error: true);
        return;
      }
      ref.read(hiveAppsChannelIndexProvider.notifier).state =
          result < 0 ? null : result;
      await _refresh();
      _toast(
        result < 0 ? 'Canal APPS desativado.' : 'Canal APPS atualizado.',
      );
    } catch (_) {
      _toast('Não foi possível atualizar o Canal APPS.', error: true);
    }
  }

  Future<void> _sendCommand(HiveFwHaCommand command) async {
    if (_sending) return;
    final radio = ref.read(radioServiceProvider);
    if (radio == null || !radio.isConnected) {
      _toast('Companion desligado.', error: true);
      return;
    }

    final channels = ref.read(channelsProvider);
    final selected = _selectedChannel(
      channels,
      ref.read(hiveAppsChannelIndexProvider),
    );
    if (selected == null) {
      _toast('Define primeiro o Canal APPS.', error: true);
      return;
    }

    var payload = '!${command.command}';
    if (command.includesLocation) {
      final self = ref.read(selfInfoProvider);
      final lat = self?.latitude;
      final lon = self?.longitude;
      final valid =
          lat != null &&
          lon != null &&
          !(lat == 0.0 && lon == 0.0);

      payload = valid
          ? '!${command.command} ${lat.toStringAsFixed(4)} ${lon.toStringAsFixed(4)}'
          : '!${command.command} SEM GPS';
    }

    setState(() => _sending = true);
    try {
      await radio.sendChannelMessage(
        selected.index,
        payload,
        regionScope:
            ref.read(channelUiPrefsProvider).regionScopes[selected.index],
      );
      _toast('Comando enviado em ${selected.name}.');
    } catch (_) {
      _toast('Falha ao enviar comando.', error: true);
    } finally {
      if (mounted) setState(() => _sending = false);
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
    final connected =
        ref.watch(connectionProvider) == TransportState.connected;
    final channels = ref.watch(channelsProvider);
    final appsChannelIndex = ref.watch(hiveAppsChannelIndexProvider);
    final selected = _selectedChannel(channels, appsChannelIndex);
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Home Assistant'),
        actions: [
          IconButton(
            onPressed: _loading ? null : _refresh,
            tooltip: 'Atualizar',
            icon: const Icon(Icons.refresh),
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _refresh,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Icon(Icons.home_outlined, color: theme.colorScheme.primary),
                    const SizedBox(width: 12),
                    const Expanded(
                      child: Text(
                        'Esta lista é lida diretamente dos comandos Home Assistant '
                        'guardados no Companion HiveFW. A app não mantém uma cópia própria.',
                      ),
                    ),
                    if (_loading)
                      const SizedBox(
                        width: 18,
                        height: 18,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 12),
            Card(
              child: ListTile(
                leading: const Icon(Icons.tag),
                title: const Text('Canal APPS'),
                subtitle: Text(
                  selected == null
                      ? 'Não definido'
                      : '${selected.index} · ${selected.name}',
                ),
                trailing: const Icon(Icons.edit),
                enabled: connected,
                onTap: connected ? () => _chooseAppsChannel(channels) : null,
              ),
            ),
            if (_error != null) ...[
              const SizedBox(height: 12),
              Card(
                child: ListTile(
                  leading: Icon(
                    Icons.info_outline,
                    color: theme.colorScheme.error,
                  ),
                  title: Text(_error!),
                ),
              ),
            ],
            const SizedBox(height: 12),
            if (_commands.isEmpty && !_loading)
              const Card(
                child: Padding(
                  padding: EdgeInsets.all(16),
                  child: Text(
                    'Não existem comandos Home Assistant configurados no Companion.',
                  ),
                ),
              )
            else
              ..._commands.map(
                (command) => Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Card(
                    child: ListTile(
                      leading: CircleAvatar(
                        child: Icon(
                          command.includesLocation
                              ? Icons.location_on_outlined
                              : Icons.bolt_outlined,
                        ),
                      ),
                      title: Text(command.name),
                      subtitle: Text(
                        '!${command.command}'
                        '${command.includesLocation ? ' · inclui localização' : ''}',
                      ),
                      trailing: FilledButton.icon(
                        onPressed:
                            connected && !_sending && selected != null
                                ? () => _sendCommand(command)
                                : null,
                        icon: const Icon(Icons.send, size: 18),
                        label: const Text('Enviar'),
                      ),
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
