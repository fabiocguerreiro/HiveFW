import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../protocol/protocol.dart';
import '../../providers/radio_providers.dart';

class HiveFwRegionsScreen extends ConsumerStatefulWidget {
  const HiveFwRegionsScreen({super.key});

  @override
  ConsumerState<HiveFwRegionsScreen> createState() => _HiveFwRegionsScreenState();
}

class _HiveFwRegionsScreenState extends ConsumerState<HiveFwRegionsScreen> {
  bool _loading = false;
  String? _error;
  List<_RegionEntry> _regions = const [];

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _refresh());
  }

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

  Future<void> _refresh() async {
    final service = ref.read(radioServiceProvider);
    if (service == null || !service.isConnected) {
      if (mounted) setState(() => _error = 'Companion desligado');
      return;
    }

    setState(() {
      _loading = true;
      _error = null;
    });

    try {
      final first = await _request(
        () => service.requestRepeaterRegion(0),
        (response) => response is CustomVarsResponse,
      );
      if (first is ErrorResponse || first == null) {
        if (!mounted) return;
        setState(() {
          _regions = const [];
          _loading = false;
        });
        return;
      }
      if (first is! CustomVarsResponse) {
        throw StateError('invalid response');
      }

      final total = int.tryParse(first['total'] ?? '') ?? 0;
      final rows = <_RegionEntry>[];
      rows.add(_RegionEntry.fromVars(first));

      for (var i = 1; i < total; i++) {
        final response = await _request(
          () => service.requestRepeaterRegion(i),
          (item) => item is CustomVarsResponse,
        );
        if (response is CustomVarsResponse) {
          rows.add(_RegionEntry.fromVars(response));
        }
      }

      if (!mounted) return;
      setState(() {
        _regions = rows;
        _loading = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _error = 'Não foi possível ler a RegionMap.';
        _loading = false;
      });
    }
  }

  Future<bool> _mutate(
    int operation, {
    String name = '',
    String parent = '',
  }) async {
    final service = ref.read(radioServiceProvider);
    if (service == null) return false;

    final response = await _request(
      () => service.mutateRepeaterRegion(
        operation,
        name: name,
        parent: parent,
      ),
      (item) => item is OkResponse || item is ErrorResponse,
    );
    if (response is! OkResponse) return false;

    if (operation != 0) {
      final save = await _request(
        () => service.mutateRepeaterRegion(0),
        (item) => item is OkResponse || item is ErrorResponse,
      );
      if (save is! OkResponse) return false;
    }
    return true;
  }

  Future<void> _addRegion() async {
    final nameController = TextEditingController();
    final parentController = TextEditingController();

    final result = await showDialog<(String, String)>(
      context: context,
      builder:
          (ctx) => AlertDialog(
            title: const Text('Adicionar região'),
            content: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: nameController,
                  autofocus: true,
                  maxLength: 30,
                  decoration: const InputDecoration(labelText: 'Nome'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: parentController,
                  maxLength: 30,
                  decoration: const InputDecoration(
                    labelText: 'Parent',
                    helperText: 'Deixe vazio para uma região de topo.',
                  ),
                ),
              ],
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(ctx),
                child: const Text('Cancelar'),
              ),
              FilledButton(
                onPressed: () {
                  final name = nameController.text.trim();
                  if (name.isEmpty) return;
                  Navigator.pop(ctx, (name, parentController.text.trim()));
                },
                child: const Text('Adicionar'),
              ),
            ],
          ),
    );

    nameController.dispose();
    parentController.dispose();
    if (result == null) return;

    final ok = await _mutate(1, name: result.$1, parent: result.$2);
    if (!ok) {
      _toast('A região foi rejeitada pelo firmware.', error: true);
      return;
    }
    await _refresh();
  }

  Future<void> _apply(_RegionEntry entry, String action) async {
    final op = switch (action) {
      'allow' => 3,
      'deny' => 4,
      'home' => 5,
      'default' => 6,
      'remove' => 2,
      _ => -1,
    };
    if (op < 0) return;

    if (action == 'remove') {
      final confirmed = await showDialog<bool>(
        context: context,
        builder:
            (ctx) => AlertDialog(
              title: const Text('Remover região?'),
              content: Text('Remover "${entry.name}" da RegionMap?'),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(ctx, false),
                  child: const Text('Cancelar'),
                ),
                FilledButton(
                  onPressed: () => Navigator.pop(ctx, true),
                  child: const Text('Remover'),
                ),
              ],
            ),
      );
      if (confirmed != true) return;
    }

    final ok = await _mutate(op, name: entry.name);
    if (!ok) {
      _toast('A alteração foi rejeitada pelo firmware.', error: true);
      return;
    }
    await _refresh();
  }

  Future<void> _clearDefault() async {
    final ok = await _mutate(7);
    if (!ok) {
      _toast('Não foi possível limpar a região DEFAULT.', error: true);
      return;
    }
    await _refresh();
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
    final theme = Theme.of(context);
    _RegionEntry? defaultEntry;
    for (final entry in _regions) {
      if (entry.isDefault) {
        defaultEntry = entry;
        break;
      }
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('RegionMap'),
        actions: [
          IconButton(
            onPressed: _loading ? null : _refresh,
            tooltip: 'Atualizar',
            icon: const Icon(Icons.refresh),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _loading ? null : _addRegion,
        icon: const Icon(Icons.add_location_alt_outlined),
        label: const Text('Adicionar'),
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
                    Icon(Icons.route, color: theme.colorScheme.primary),
                    const SizedBox(width: 12),
                    const Expanded(
                      child: Text(
                        'Configuração regional real do Repeater. Nada é criado automaticamente; '
                        'as alterações são gravadas explicitamente no rádio.',
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
            if (defaultEntry != null) ...[
              const SizedBox(height: 8),
              OutlinedButton.icon(
                onPressed: _clearDefault,
                icon: const Icon(Icons.layers_clear_outlined),
                label: Text('Limpar DEFAULT (${defaultEntry.name})'),
              ),
            ],
            if (_error != null) ...[
              const SizedBox(height: 12),
              Card(
                child: ListTile(
                  leading: Icon(
                    Icons.error_outline,
                    color: theme.colorScheme.error,
                  ),
                  title: Text(_error!),
                ),
              ),
            ],
            const SizedBox(height: 12),
            if (_regions.isEmpty && !_loading)
              const Card(
                child: Padding(
                  padding: EdgeInsets.all(16),
                  child: Text(
                    'Nenhuma região configurada, ou o firmware ligado não expõe RegionMap local.',
                  ),
                ),
              )
            else
              ..._regions.map(
                (entry) => Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Card(
                    child: ListTile(
                      leading: CircleAvatar(
                        child: Icon(
                          entry.isHome ? Icons.home : Icons.public,
                          size: 18,
                        ),
                      ),
                      title: Row(
                        children: [
                          Expanded(child: Text(entry.name)),
                          if (entry.isHome)
                            const Padding(
                              padding: EdgeInsets.only(left: 6),
                              child: Chip(label: Text('HOME')),
                            ),
                          if (entry.isDefault)
                            const Padding(
                              padding: EdgeInsets.only(left: 6),
                              child: Chip(label: Text('DEFAULT')),
                            ),
                        ],
                      ),
                      subtitle: Text(
                        entry.parent.isEmpty
                            ? (entry.allowFlood
                                ? 'Topo · Flood permitido'
                                : 'Topo · Flood bloqueado')
                            : '${entry.parent} · ${entry.allowFlood ? 'Flood permitido' : 'Flood bloqueado'}',
                      ),
                      trailing: PopupMenuButton<String>(
                        onSelected: (action) => _apply(entry, action),
                        itemBuilder:
                            (_) => [
                              PopupMenuItem(
                                value: entry.allowFlood ? 'deny' : 'allow',
                                child: Text(
                                  entry.allowFlood
                                      ? 'Bloquear flood'
                                      : 'Permitir flood',
                                ),
                              ),
                              const PopupMenuItem(
                                value: 'home',
                                child: Text('Definir HOME'),
                              ),
                              const PopupMenuItem(
                                value: 'default',
                                child: Text('Definir DEFAULT'),
                              ),
                              const PopupMenuDivider(),
                              const PopupMenuItem(
                                value: 'remove',
                                child: Text('Remover'),
                              ),
                            ],
                      ),
                    ),
                  ),
                ),
              ),
            const SizedBox(height: 80),
          ],
        ),
      ),
    );
  }
}

class _RegionEntry {
  const _RegionEntry({
    required this.name,
    required this.parent,
    required this.allowFlood,
    required this.isHome,
    required this.isDefault,
  });

  factory _RegionEntry.fromVars(CustomVarsResponse vars) {
    return _RegionEntry(
      name: vars['name'] ?? '',
      parent: vars['parent'] ?? '',
      allowFlood: vars['allow'] == '1',
      isHome: vars['home'] == '1',
      isDefault: vars['default'] == '1',
    );
  }

  final String name;
  final String parent;
  final bool allowFlood;
  final bool isHome;
  final bool isDefault;
}
