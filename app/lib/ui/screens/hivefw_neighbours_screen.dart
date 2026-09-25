import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../protocol/protocol.dart';
import '../../providers/radio_providers.dart';

class HiveFwNeighboursScreen extends ConsumerStatefulWidget {
  const HiveFwNeighboursScreen({super.key});

  @override
  ConsumerState<HiveFwNeighboursScreen> createState() =>
      _HiveFwNeighboursScreenState();
}

class _HiveFwNeighboursScreenState
    extends ConsumerState<HiveFwNeighboursScreen> {
  bool _loading = false;
  String? _error;
  List<_Neighbour> _neighbours = const [];
  List<_ObservedChannel> _observed = const [];

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _refresh());
  }

  Future<CustomVarsResponse?> _request(
    Future<void> Function() send,
  ) async {
    final service = ref.read(radioServiceProvider);
    if (service == null || !service.isConnected) return null;

    final completer = Completer<CompanionResponse?>();
    late StreamSubscription<CompanionResponse> sub;
    sub = service.responses.listen((response) {
      if (!completer.isCompleted &&
          response is CustomVarsResponse) {
        completer.complete(response);
      }
    });

    try {
      await send();
      final response = await completer.future.timeout(
        const Duration(seconds: 3),
        onTimeout: () => null,
      );
      return response is CustomVarsResponse ? response : null;
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
      final neighbours = <_Neighbour>[];
      var offset = 0;
      var total = 0;
      do {
        final page = await _request(
          () => service.requestHiveNeighbours(offset: offset),
        );
        if (page == null) break;

        total = int.tryParse(page['nbr_total'] ?? '') ?? 0;
        final count = int.tryParse(page['nbr_count'] ?? '') ?? 0;
        for (var i = 0; i < count; i++) {
          final raw = page['n$i'];
          if (raw == null) continue;
          final parts = raw.split('|');
          if (parts.length < 3) continue;
          final ageSeconds = int.tryParse(parts[1]) ?? 0;
          if (ageSeconds > 7 * 24 * 3600) continue;
          neighbours.add(
            _Neighbour(
              prefix: parts[0].toUpperCase(),
              ageSeconds: ageSeconds,
              snr: int.tryParse(parts[2]) ?? 0,
            ),
          );
        }
        offset += count;
        if (count == 0) break;
      } while (offset < total);

      final observed = <_ObservedChannel>[];
      offset = 0;
      total = 0;
      do {
        final page = await _request(
          () => service.requestObservedChannels(offset: offset),
        );
        if (page == null) break;

        total = int.tryParse(page['obs_total'] ?? '') ?? 0;
        final count = int.tryParse(page['obs_count'] ?? '') ?? 0;
        for (var i = 0; i < count; i++) {
          final raw = page['o$i'];
          if (raw == null) continue;
          final parts = raw.split('|');
          if (parts.length < 3) continue;
          observed.add(
            _ObservedChannel(
              hash: parts[0].toUpperCase(),
              ageSeconds: int.tryParse(parts[1]) ?? 0,
              messageCount: int.tryParse(parts[2]) ?? 0,
            ),
          );
        }
        offset += count;
        if (count == 0) break;
      } while (offset < total);

      if (!mounted) return;
      setState(() {
        _neighbours = neighbours;
        _observed = observed;
        _loading = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _error = 'Falha ao ler dados locais do HiveFW';
        _loading = false;
      });
    }
  }

  String _nameForPrefix(String prefix) {
    final contacts = ref.read(contactsProvider);
    for (final contact in contacts) {
      if (contact.publicKey.length < 6) continue;
      final candidate = contact.publicKey
          .take(6)
          .map((b) => b.toRadixString(16).padLeft(2, '0'))
          .join()
          .toUpperCase();
      if (candidate == prefix) {
        return contact.name.trim().isEmpty ? prefix : contact.name;
      }
    }
    return prefix;
  }

  String _age(int seconds) {
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
        title: const Text('Vizinhos'),
        actions: [
          IconButton(
            onPressed: () => context.go('/map'),
            tooltip: 'Ver no mapa',
            icon: const Icon(Icons.map_outlined),
          ),
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
                    Icon(Icons.radar, color: theme.colorScheme.primary),
                    const SizedBox(width: 12),
                    const Expanded(
                      child: Text(
                        'PASSIVO — Repeaters ouvidos diretamente nos últimos 7 dias (Zero-Hop). '
                        'Esta vista usa apenas informação local recebida pelo Companion e não envia pedidos de descoberta.',
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
            const SizedBox(height: 12),
            _Section(
              title: 'Vizinhos zero-hop',
              subtitle: '${_neighbours.length} ouvidos diretamente nos últimos 7 dias',
              icon: Icons.cell_tower,
              child:
                  _neighbours.isEmpty
                      ? const Padding(
                        padding: EdgeInsets.symmetric(vertical: 12),
                        child: Text('Nenhum repeater zero-hop ouvido nos últimos 7 dias.'),
                      )
                      : Column(
                        children:
                            _neighbours
                                .map(
                                  (n) => ListTile(
                                    contentPadding: EdgeInsets.zero,
                                    leading: const CircleAvatar(
                                      child: Icon(Icons.cell_tower, size: 18),
                                    ),
                                    title: Text(_nameForPrefix(n.prefix)),
                                    subtitle: Text(
                                      '${n.prefix} · há ${_age(n.ageSeconds)}',
                                    ),
                                    trailing: Chip(
                                      label: Text('SNR ${n.snr}'),
                                    ),
                                  ),
                                )
                                .toList(),
                      ),
            ),
            const SizedBox(height: 12),
            _Section(
              title: 'Canais observados',
              subtitle: 'Atividade passiva das últimas 48 h',
              icon: Icons.visibility_outlined,
              child:
                  _observed.isEmpty
                      ? const Padding(
                        padding: EdgeInsets.symmetric(vertical: 12),
                        child: Text('Nenhum canal desconhecido observado.'),
                      )
                      : Column(
                        children:
                            _observed
                                .map(
                                  (o) => ListTile(
                                    contentPadding: EdgeInsets.zero,
                                    leading: const CircleAvatar(
                                      child: Icon(Icons.tag, size: 18),
                                    ),
                                    title: Text('Hash 0x${o.hash}'),
                                    subtitle: Text(
                                      'Último há ${_age(o.ageSeconds)}',
                                    ),
                                    trailing: Text(
                                      '${o.messageCount} msg',
                                      style: theme.textTheme.labelLarge,
                                    ),
                                  ),
                                )
                                .toList(),
                      ),
            ),
          ],
        ),
      ),
    );
  }
}

class _Neighbour {
  const _Neighbour({
    required this.prefix,
    required this.ageSeconds,
    required this.snr,
  });

  final String prefix;
  final int ageSeconds;
  final int snr;
}

class _ObservedChannel {
  const _ObservedChannel({
    required this.hash,
    required this.ageSeconds,
    required this.messageCount,
  });

  final String hash;
  final int ageSeconds;
  final int messageCount;
}

class _Section extends StatelessWidget {
  const _Section({
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.child,
  });

  final String title;
  final String subtitle;
  final IconData icon;
  final Widget child;

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
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        title,
                        style: theme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(subtitle, style: theme.textTheme.bodySmall),
                    ],
                  ),
                ),
              ],
            ),
            const Divider(height: 22),
            child,
          ],
        ),
      ),
    );
  }
}
