import 'dart:async';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../protocol/protocol.dart';
import '../../providers/radio_providers.dart';

class HiveFwAclScreen extends ConsumerStatefulWidget {
  const HiveFwAclScreen({super.key});

  @override
  ConsumerState<HiveFwAclScreen> createState() => _HiveFwAclScreenState();
}

class _HiveFwAclScreenState extends ConsumerState<HiveFwAclScreen> {
  bool _loading = false;
  String? _error;
  bool _adminPasswordSet = false;
  bool _guestPasswordSet = false;
  List<_AclEntry> _entries = const [];

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

  Future<CustomVarsResponse?> _vars(Future<void> Function() send) async {
    final response = await _request(
      send,
      (r) => r is CustomVarsResponse,
    );
    return response is CustomVarsResponse ? response : null;
  }

  Future<bool> _setVar(String key, String value) async {
    final service = ref.read(radioServiceProvider);
    if (service == null) return false;
    final response = await _request(
      () => service.setHiveCustomVar(key, value),
      (r) => r is OkResponse || r is ErrorResponse,
    );
    return response is OkResponse;
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
      final auth = await _vars(service.requestRepeaterAuthConfig);
      if (auth == null) {
        throw StateError('auth unavailable');
      }

      final count = int.tryParse(auth['acl'] ?? '') ?? 0;
      final entries = <_AclEntry>[];
      for (var i = 0; i < count; i++) {
        final row = await _vars(() => service.requestRepeaterAclEntry(i));
        if (row == null) continue;
        final key = (row['key'] ?? '').trim().toLowerCase();
        if (key.length != 64) continue;
        entries.add(
          _AclEntry(
            publicKey: key,
            permissions: int.tryParse(row['perm'] ?? '') ?? 0,
            lastActivity: int.tryParse(row['last'] ?? '') ?? 0,
          ),
        );
      }

      if (!mounted) return;
      setState(() {
        _adminPasswordSet = auth['adm'] == '1';
        _guestPasswordSet = auth['gst'] == '1';
        _entries = entries;
        _loading = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _error = 'Não foi possível ler a ACL do Repeater.';
        _loading = false;
      });
    }
  }

  Uint8List? _decodeKey(String value) {
    final hex = value.trim().replaceAll(RegExp(r'\s+'), '').toLowerCase();
    if (hex.length != 64 || !RegExp(r'^[0-9a-f]{64}$').hasMatch(hex)) {
      return null;
    }
    return Uint8List.fromList(
      List.generate(
        32,
        (i) => int.parse(hex.substring(i * 2, i * 2 + 2), radix: 16),
      ),
    );
  }

  String _roleName(int permissions) {
    return switch (permissions) {
      1 => 'Read only',
      2 => 'Read / Write',
      3 => 'Admin',
      _ => 'Guest / remover',
    };
  }

  Future<bool> _setEntry(String publicKey, int permissions) async {
    final service = ref.read(radioServiceProvider);
    final key = _decodeKey(publicKey);
    if (service == null || key == null) return false;

    final response = await _request(
      () => service.setRepeaterAclEntry(permissions, key),
      (r) => r is OkResponse || r is ErrorResponse,
    );
    return response is OkResponse;
  }

  Future<void> _editEntry({_AclEntry? existing}) async {
    final keyController = TextEditingController(text: existing?.publicKey ?? '');
    var role = existing?.permissions ?? 2;

    final result = await showDialog<(String, int)>(
      context: context,
      builder:
          (ctx) => StatefulBuilder(
            builder:
                (ctx, setLocal) => AlertDialog(
                  title: Text(existing == null ? 'Adicionar ACL' : 'Editar ACL'),
                  content: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      TextField(
                        controller: keyController,
                        readOnly: existing != null,
                        maxLength: 64,
                        style: const TextStyle(fontFamily: 'monospace'),
                        decoration: const InputDecoration(
                          labelText: 'Public Key completa',
                          hintText: '64 caracteres hexadecimais',
                        ),
                      ),
                      const SizedBox(height: 8),
                      DropdownButtonFormField<int>(
                        value: role,
                        decoration: const InputDecoration(labelText: 'Permissão'),
                        items: const [
                          DropdownMenuItem(value: 1, child: Text('Read only')),
                          DropdownMenuItem(value: 2, child: Text('Read / Write')),
                          DropdownMenuItem(value: 3, child: Text('Admin')),
                        ],
                        onChanged: (value) {
                          if (value != null) setLocal(() => role = value);
                        },
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
                        final key = keyController.text.trim();
                        if (_decodeKey(key) == null) return;
                        Navigator.pop(ctx, (key, role));
                      },
                      child: const Text('Guardar'),
                    ),
                  ],
                ),
          ),
    );

    keyController.dispose();
    if (result == null) return;
    final ok = await _setEntry(result.$1, result.$2);
    if (!ok) {
      _toast('O firmware rejeitou a entrada ACL.', error: true);
      return;
    }
    await _refresh();
  }

  Future<void> _removeEntry(_AclEntry entry) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder:
          (ctx) => AlertDialog(
            title: const Text('Remover da ACL?'),
            content: Text(
              'A identidade ${entry.publicKey.substring(0, 12)}… deixa de ter acesso persistente.',
            ),
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

    final ok = await _setEntry(entry.publicKey, 0);
    if (!ok) {
      _toast('Não foi possível remover a entrada.', error: true);
      return;
    }
    await _refresh();
  }

  Future<void> _clearAcl() async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder:
          (ctx) => AlertDialog(
            title: const Text('Limpar ACL persistente?'),
            content: const Text(
              'Remove todas as identidades persistentes. As passwords Admin/Guest não são alteradas.',
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(ctx, false),
                child: const Text('Cancelar'),
              ),
              FilledButton(
                onPressed: () => Navigator.pop(ctx, true),
                child: const Text('Limpar ACL'),
              ),
            ],
          ),
    );
    if (confirmed != true) return;

    final ok = await _setVar('acl_clear', '1');
    if (!ok) {
      _toast('Não foi possível limpar a ACL.', error: true);
      return;
    }
    await _refresh();
  }

  Future<void> _setPassword(String key, String label) async {
    final controller = TextEditingController();
    final value = await showDialog<String>(
      context: context,
      builder:
          (ctx) => AlertDialog(
            title: Text(label),
            content: TextField(
              controller: controller,
              autofocus: true,
              obscureText: true,
              maxLength: 15,
              decoration: const InputDecoration(
                labelText: 'Nova password',
                helperText: 'Máximo 15 caracteres ASCII. Vazio remove a password.',
              ),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(ctx),
                child: const Text('Cancelar'),
              ),
              FilledButton(
                onPressed: () => Navigator.pop(ctx, controller.text),
                child: const Text('Aplicar'),
              ),
            ],
          ),
    );
    controller.dispose();
    if (value == null) return;

    final ok = await _setVar(key, value);
    if (!ok) {
      _toast('Password rejeitada pelo firmware.', error: true);
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

  String _age(int epoch) {
    if (epoch <= 0) return '—';
    final now = DateTime.now().millisecondsSinceEpoch ~/ 1000;
    final seconds = now > epoch ? now - epoch : 0;
    if (seconds < 60) return '${seconds}s';
    if (seconds < 3600) return '${seconds ~/ 60} min';
    if (seconds < 86400) return '${seconds ~/ 3600} h';
    return '${seconds ~/ 86400} d';
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Acesso / ACL'),
        actions: [
          IconButton(
            onPressed: _loading ? null : _refresh,
            tooltip: 'Atualizar',
            icon: const Icon(Icons.refresh),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _loading ? null : () => _editEntry(),
        icon: const Icon(Icons.person_add_alt_1),
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
                child: Column(
                  children: [
                    ListTile(
                      contentPadding: EdgeInsets.zero,
                      leading: const Icon(Icons.key),
                      title: const Text('Password Admin'),
                      subtitle: Text(
                        _adminPasswordSet ? 'Configurada' : 'Não configurada',
                      ),
                      trailing: const Icon(Icons.edit),
                      onTap: () => _setPassword('admin_pw', 'Password Admin'),
                    ),
                    ListTile(
                      contentPadding: EdgeInsets.zero,
                      leading: const Icon(Icons.key_outlined),
                      title: const Text('Password Guest'),
                      subtitle: Text(
                        _guestPasswordSet ? 'Configurada' : 'Não configurada',
                      ),
                      trailing: const Icon(Icons.edit),
                      onTap: () => _setPassword('guest_pw', 'Password Guest'),
                    ),
                    const Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        'As passwords são write-only: a app apenas sabe se estão configuradas.',
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 12),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  children: [
                    Icon(
                      Icons.admin_panel_settings,
                      color: theme.colorScheme.primary,
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'ACL persistente · ${_entries.length} entradas',
                        style: theme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
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
            const SizedBox(height: 8),
            if (_entries.isEmpty && !_loading)
              const Card(
                child: Padding(
                  padding: EdgeInsets.all(16),
                  child: Text('Nenhuma identidade persistente na ACL.'),
                ),
              )
            else
              ..._entries.map(
                (entry) => Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Card(
                    child: ListTile(
                      leading: CircleAvatar(
                        child: Text(entry.permissions.toString()),
                      ),
                      title: Text(_roleName(entry.permissions)),
                      subtitle: Text(
                        '${entry.publicKey}\nÚltima atividade: ${_age(entry.lastActivity)}',
                        style: const TextStyle(fontFamily: 'monospace'),
                      ),
                      isThreeLine: true,
                      trailing: PopupMenuButton<String>(
                        onSelected: (action) {
                          if (action == 'edit') {
                            _editEntry(existing: entry);
                          } else if (action == 'remove') {
                            _removeEntry(entry);
                          }
                        },
                        itemBuilder:
                            (_) => const [
                              PopupMenuItem(
                                value: 'edit',
                                child: Text('Alterar permissão'),
                              ),
                              PopupMenuItem(
                                value: 'remove',
                                child: Text('Remover'),
                              ),
                            ],
                      ),
                    ),
                  ),
                ),
              ),
            const SizedBox(height: 8),
            OutlinedButton.icon(
              onPressed: _entries.isEmpty || _loading ? null : _clearAcl,
              icon: const Icon(Icons.delete_sweep_outlined),
              label: const Text('Limpar ACL persistente'),
            ),
            const SizedBox(height: 80),
          ],
        ),
      ),
    );
  }
}

class _AclEntry {
  const _AclEntry({
    required this.publicKey,
    required this.permissions,
    required this.lastActivity,
  });

  final String publicKey;
  final int permissions;
  final int lastActivity;
}
