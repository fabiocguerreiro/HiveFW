import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../protocol/protocol.dart';
import '../../providers/radio_providers.dart';

class ObservedChannelsScreen extends ConsumerStatefulWidget {
  const ObservedChannelsScreen({super.key});

  @override
  ConsumerState<ObservedChannelsScreen> createState() =>
      _ObservedChannelsScreenState();
}

class _ObservedChannelsScreenState
    extends ConsumerState<ObservedChannelsScreen> {
  bool _loading = false;
  String? _error;
  List<_ObservedChannel> _rows = const [];

  @override
  void initState() {
    super.initState();
    Future.microtask(_load);
  }

  Future<CustomVarsResponse> _requestPage(int offset) async {
    final radio = ref.read(radioServiceProvider);
    if (radio == null || !radio.isConnected) {
      throw StateError('Companion desligado.');
    }

    final completer = Completer<CustomVarsResponse>();
    late StreamSubscription<CompanionResponse> sub;
    sub = radio.responses.listen((response) {
      if (response is CustomVarsResponse &&
          response.values.containsKey('obs_total') &&
          !completer.isCompleted) {
        completer.complete(response);
      } else if (response is ErrorResponse && !completer.isCompleted) {
        completer.completeError(StateError('Firmware sem suporte a Canais observados.'));
      }
    });

    try {
      await radio.requestObservedChannels(offset: offset);
      return await completer.future.timeout(const Duration(seconds: 3));
    } finally {
      await sub.cancel();
    }
  }

  Future<void> _load() async {
    if (_loading) return;
    setState(() {
      _loading = true;
      _error = null;
    });

    try {
      final rows = <_ObservedChannel>[];
      var offset = 0;
      var total = 0;

      do {
        final response = await _requestPage(offset);
        total = int.tryParse(response['obs_total'] ?? '') ?? 0;
        final count = int.tryParse(response['obs_count'] ?? '') ?? 0;
        if (count <= 0) break;

        final raw = response['o0'];
        if (raw == null || raw.isEmpty) break;
        final parsed = _ObservedChannel.tryParse(raw);
        if (parsed != null) rows.add(parsed);

        offset += count;
      } while (offset < total && offset < 64);

      if (!mounted) return;
      setState(() => _rows = rows);
    } catch (error) {
      if (!mounted) return;
      setState(() => _error = error.toString().replaceFirst('Bad state: ', ''));
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  String _age(int seconds) {
    if (seconds < 60) return '${seconds}s';
    if (seconds < 3600) return '${seconds ~/ 60} min';
    return '${seconds ~/ 3600} h';
  }

  String? _ingressName(_ObservedChannel row) {
    final prefix = row.ingressPrefix.toLowerCase();
    if (prefix.isEmpty) return null;
    for (final contact in ref.read(contactsProvider)) {
      final hex = contact.publicKey
          .map((b) => b.toRadixString(16).padLeft(2, '0'))
          .join()
          .toLowerCase();
      if (hex.startsWith(prefix)) return contact.displayName;
    }
    return null;
  }

  Future<void> _showTrace(_ObservedChannel row) async {
    final ingressName = _ingressName(row);
    await showDialog<void>(
      context: context,
      builder: (ctx) {
        final hops = row.routeHashes;
        return AlertDialog(
          title: Text('Trace · #${row.hashHex}'),
          content: SizedBox(
            width: 460,
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Caminho da última mensagem realmente recebida neste canal. '
                    'É um trace passivo do pacote capturado e não gera tráfego LoRa.',
                  ),
                  const SizedBox(height: 14),
                  if (hops.isEmpty)
                    const Text('Receção direta: o pacote chegou sem repetidores no caminho.')
                  else
                    ...List.generate(hops.length, (index) {
                      final isLast = index == hops.length - 1;
                      final label = isLast && ingressName != null
                          ? '$ingressName · ${hops[index]}'
                          : hops[index];
                      return ListTile(
                        dense: true,
                        contentPadding: EdgeInsets.zero,
                        leading: CircleAvatar(
                          radius: 14,
                          child: Text('${index + 1}'),
                        ),
                        title: Text(label),
                        subtitle: Text(
                          isLast
                              ? 'Entrada no nosso rádio'
                              : 'Repeater intermédio · hash RF',
                        ),
                      );
                    }),
                  const Divider(),
                  const ListTile(
                    dense: true,
                    contentPadding: EdgeInsets.zero,
                    leading: Icon(Icons.radio),
                    title: Text('Este HiveFW'),
                    subtitle: Text('Repeater que recebeu a mensagem'),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Os hops intermédios são hashes de caminho. O repeater de '
                    'entrada só é identificado por nome quando o prefixo pode '
                    'ser associado com segurança a um contacto conhecido.',
                    style: Theme.of(ctx).textTheme.bodySmall,
                  ),
                ],
              ),
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx),
              child: const Text('Fechar'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Canais observados'),
        actions: [
          IconButton(
            tooltip: 'Atualizar',
            onPressed: _loading ? null : _load,
            icon: const Icon(Icons.refresh),
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _load,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Card(
              child: ListTile(
                leading: const Icon(Icons.visibility_outlined),
                title: const Text('Atividade passiva · últimas 48 horas'),
                subtitle: const Text(
                  'Mostra canais de grupo desconhecidos que este rádio '
                  'realmente recebeu e encaminhou. Consultar esta lista não '
                  'gera tráfego LoRa.',
                ),
              ),
            ),
            if (_loading) ...[
              const SizedBox(height: 12),
              const LinearProgressIndicator(),
            ],
            if (_error != null) ...[
              const SizedBox(height: 12),
              Card(
                child: ListTile(
                  leading: Icon(Icons.error_outline, color: theme.colorScheme.error),
                  title: Text(_error!),
                ),
              ),
            ],
            const SizedBox(height: 12),
            Text(
              'Observados (${_rows.length})',
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w700,
              ),
            ),
            const SizedBox(height: 8),
            if (!_loading && _rows.isEmpty)
              const Card(
                child: Padding(
                  padding: EdgeInsets.all(20),
                  child: Text(
                    'Ainda não existem canais desconhecidos observados nas últimas 48 horas.',
                    textAlign: TextAlign.center,
                  ),
                ),
              )
            else
              ..._rows.map((row) {
                final ingress = _ingressName(row);
                return Card(
                  child: ListTile(
                    onTap: () => _showTrace(row),
                    leading: CircleAvatar(
                      child: Text('#${row.hashHex}'),
                    ),
                    title: Text('Canal #${row.hashHex}'),
                    subtitle: Text(
                      'Ouvido há ${_age(row.secondsAgo)} · '
                      '${row.messageCount} mensagem(ns)\n'
                      '${row.hopCount} hop(s)'
                      '${ingress != null ? ' · entrada: $ingress' : ''}',
                    ),
                    isThreeLine: true,
                    trailing: const Icon(Icons.route_outlined),
                  ),
                );
              }),
          ],
        ),
      ),
    );
  }
}

class _ObservedChannel {
  const _ObservedChannel({
    required this.hashHex,
    required this.secondsAgo,
    required this.messageCount,
    required this.hashSize,
    required this.hopCount,
    required this.pathHex,
    required this.ingressPrefix,
  });

  final String hashHex;
  final int secondsAgo;
  final int messageCount;
  final int hashSize;
  final int hopCount;
  final String pathHex;
  final String ingressPrefix;

  List<String> get routeHashes {
    if (hashSize <= 0 || hopCount <= 0 || pathHex.isEmpty) return const [];
    final width = hashSize * 2;
    final hashes = <String>[];
    for (var i = 0; i < hopCount; i++) {
      final start = i * width;
      final end = start + width;
      if (end > pathHex.length) break;
      hashes.add(pathHex.substring(start, end).toUpperCase());
    }
    return hashes;
  }

  static _ObservedChannel? tryParse(String raw) {
    final parts = raw.split('|');
    if (parts.length < 3) return null;
    return _ObservedChannel(
      hashHex: parts[0].toUpperCase().padLeft(2, '0'),
      secondsAgo: int.tryParse(parts[1]) ?? 0,
      messageCount: int.tryParse(parts[2]) ?? 0,
      hashSize: parts.length > 3 ? int.tryParse(parts[3]) ?? 0 : 0,
      hopCount: parts.length > 4 ? int.tryParse(parts[4]) ?? 0 : 0,
      pathHex: parts.length > 5 ? parts[5] : '',
      ingressPrefix: parts.length > 6 ? parts[6] : '',
    );
  }
}
