import 'dart:async';
import 'dart:convert';
import 'dart:typed_data';

import 'package:crypto/crypto.dart';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;
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
  Map<int, List<_ChannelCandidate>>? _catalog;

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

  Future<Map<int, List<_ChannelCandidate>>> _loadCatalog() async {
    final cached = _catalog;
    if (cached != null) return cached;

    final raw = await rootBundle.loadString(
      'assets/data/channel_catalog.json',
    );
    final decoded = jsonDecode(raw);
    final rows =
        decoded is Map<String, dynamic> && decoded['channels'] is List
            ? decoded['channels'] as List
            : const <dynamic>[];

    final indexed = <int, List<_ChannelCandidate>>{};
    for (final row in rows) {
      if (row is! Map) continue;
      final name = (row['name'] ?? '').toString().trim();
      if (name.isEmpty) continue;

      Uint8List secret;
      try {
        if (name.startsWith('#')) {
          secret = Uint8List.fromList(
            sha256.convert(utf8.encode(name)).bytes.take(16).toList(),
          );
        } else {
          final encoded = (row['key'] ?? '').toString().trim();
          if (encoded.isEmpty) continue;
          final bytes = base64Decode(encoded);
          if (bytes.length != 16) continue;
          secret = Uint8List.fromList(bytes);
        }
      } catch (_) {
        continue;
      }

      final hash = sha256.convert(secret).bytes.first;
      indexed.putIfAbsent(hash, () => <_ChannelCandidate>[]).add(
        _ChannelCandidate(
          name: name.toLowerCase() == 'public' ? 'Public' : name,
          secret: secret,
        ),
      );
    }

    _catalog = indexed;
    return indexed;
  }

  Future<bool> _verifyCandidate(
    int channelHash,
    Uint8List secret,
  ) async {
    final radio = ref.read(radioServiceProvider);
    if (radio == null || !radio.isConnected) return false;

    final completer = Completer<bool>();
    late StreamSubscription<CompanionResponse> sub;
    sub = radio.responses.listen((response) {
      if (completer.isCompleted) return;
      if (response is OkResponse) {
        completer.complete(true);
      } else if (response is ErrorResponse) {
        completer.complete(false);
      }
    });

    try {
      await radio.verifyObservedChannel(channelHash, secret);
      return await completer.future.timeout(
        const Duration(seconds: 2),
        onTimeout: () => false,
      );
    } finally {
      await sub.cancel();
    }
  }

  Future<List<_ObservedChannel>> _resolveVerifiedNames(
    List<_ObservedChannel> rows,
  ) async {
    final catalog = await _loadCatalog();
    final resolved = <_ObservedChannel>[];

    for (final row in rows) {
      final hash = int.tryParse(row.hashHex, radix: 16);
      if (hash == null) {
        resolved.add(row);
        continue;
      }

      String? verifiedName;
      for (final candidate in catalog[hash] ?? const <_ChannelCandidate>[]) {
        if (await _verifyCandidate(hash, candidate.secret)) {
          verifiedName = candidate.name;
          break;
        }
      }
      resolved.add(row.withVerifiedName(verifiedName));
    }

    return resolved;
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

      final resolvedRows = await _resolveVerifiedNames(rows);
      if (!mounted) return;
      setState(() => _rows = resolvedRows);
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

  List<Contact> _contactsForRouteHash(String rawHash) {
    final hash = rawHash.trim().toLowerCase();
    if (hash.isEmpty) return const <Contact>[];

    final matches = <Contact>[];
    for (final contact in ref.read(contactsProvider)) {
      final hex = contact.publicKey
          .map((b) => b.toRadixString(16).padLeft(2, '0'))
          .join()
          .toLowerCase();
      if (hex.startsWith(hash)) matches.add(contact);
    }
    return matches;
  }

  String _resolvedHopTitle(String hash, {required bool isIngress, String? ingressName}) {
    if (isIngress && ingressName != null && ingressName.isNotEmpty) {
      return ingressName;
    }

    final matches = _contactsForRouteHash(hash);
    if (matches.length == 1) {
      return matches.single.displayName;
    }
    if (matches.length > 1) {
      return 'Repeater $hash · identificação ambígua';
    }
    return 'Repeater $hash';
  }

  Future<void> _showTrace(_ObservedChannel row) async {
    final ingressName = _ingressName(row);
    final hops = row.routeHashes;
    final counts = <String, int>{};
    for (final hop in hops) {
      counts[hop] = (counts[hop] ?? 0) + 1;
    }
    final repeated = counts.entries.where((entry) => entry.value > 1).toList();

    await showDialog<void>(
      context: context,
      builder: (ctx) {
        return AlertDialog(
          title: Text('Trace · ${row.verifiedName ?? '#${row.hashHex}'}'),
          content: SizedBox(
            width: 500,
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Caminho da última mensagem realmente recebida neste canal. '
                    'É um trace passivo do pacote capturado e não gera tráfego LoRa.',
                  ),
                  const SizedBox(height: 10),
                  Wrap(
                    spacing: 6,
                    runSpacing: 6,
                    children: [
                      Chip(label: Text('${hops.length} hops')),
                      if (row.hashSize > 0)
                        Chip(label: Text('Path Hash ${row.hashSize} bytes')),
                      if (ingressName != null)
                        Chip(label: Text('Entrada: $ingressName')),
                    ],
                  ),
                  if (repeated.isNotEmpty) ...[
                    const SizedBox(height: 10),
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: Theme.of(ctx).colorScheme.tertiaryContainer,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Text(
                        '⚠ Hash repetido no path: ' +
                        repeated
                            .map((entry) => '${entry.key} ×${entry.value}')
                            .join(', ') +
                        '. Pode indicar loop/retransmissão repetida ou colisão de Path Hash.',
                        style: Theme.of(ctx).textTheme.bodySmall,
                      ),
                    ),
                  ],
                  const SizedBox(height: 12),
                  if (hops.isEmpty)
                    const Text(
                      'Receção direta: o pacote chegou sem repetidores no caminho.',
                    )
                  else ...[
                    const ListTile(
                      dense: true,
                      contentPadding: EdgeInsets.zero,
                      leading: CircleAvatar(radius: 14, child: Text('○')),
                      title: Text('Origem anterior ao primeiro hop'),
                      subtitle: Text(
                        'O path não identifica necessariamente o Companion/utilizador que originou a mensagem.',
                      ),
                    ),
                    ...List.generate(hops.length, (index) {
                      final hash = hops[index];
                      final isLast = index == hops.length - 1;
                      final matches = _contactsForRouteHash(hash);
                      final title = _resolvedHopTitle(
                        hash,
                        isIngress: isLast,
                        ingressName: ingressName,
                      );
                      final ambiguous = !isLast && matches.length > 1;
                      final repeatedHash = (counts[hash] ?? 0) > 1;

                      return ListTile(
                        dense: true,
                        contentPadding: EdgeInsets.zero,
                        leading: CircleAvatar(
                          radius: 14,
                          child: Text('${index + 1}'),
                        ),
                        title: Text(title),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              isLast
                                  ? 'Entrada no nosso rádio · hash $hash'
                                  : 'Hop ${index + 1} · hash $hash',
                            ),
                            if (matches.length == 1 && !(isLast && ingressName != null))
                              Text(
                                'Contacto descoberto: ${matches.single.displayName}',
                              ),
                            if (ambiguous)
                              Text(
                                '${matches.length} contactos descobertos compatíveis com este hash.',
                                style: TextStyle(
                                  color: Theme.of(ctx).colorScheme.tertiary,
                                ),
                              ),
                            if (repeatedHash)
                              Text(
                                '⚠ Hash repetido neste path.',
                                style: TextStyle(
                                  color: Theme.of(ctx).colorScheme.tertiary,
                                ),
                              ),
                          ],
                        ),
                      );
                    }),
                  ],
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
                    'Os hashes de cada hop são cruzados com os contactos '
                    'descobertos/adicionados guardados na App. Um nome só é '
                    'atribuído quando existe uma correspondência única; colisões '
                    'ficam assinaladas como ambíguas.',
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
                    title: Text(row.verifiedName ?? 'Canal #${row.hashHex}'),
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
    this.verifiedName,
  });

  final String hashHex;
  final int secondsAgo;
  final int messageCount;
  final int hashSize;
  final int hopCount;
  final String pathHex;
  final String ingressPrefix;
  final String? verifiedName;

  _ObservedChannel withVerifiedName(String? name) => _ObservedChannel(
    hashHex: hashHex,
    secondsAgo: secondsAgo,
    messageCount: messageCount,
    hashSize: hashSize,
    hopCount: hopCount,
    pathHex: pathHex,
    ingressPrefix: ingressPrefix,
    verifiedName: name,
  );

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


class _ChannelCandidate {
  const _ChannelCandidate({
    required this.name,
    required this.secret,
  });

  final String name;
  final Uint8List secret;
}
