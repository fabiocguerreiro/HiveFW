import 'dart:async';
import 'dart:math';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../protocol/protocol.dart';
import '../../providers/radio_providers.dart';

/// Active zero-hop repeater discovery.
///
/// This deliberately does NOT read HiveFW's neighbour cache and does NOT use
/// passive repeater adverts. Every result on this screen is a
/// NODE_DISCOVER_RESP received in answer to the current NODE_DISCOVER_REQ tag.
class RepeaterDiscoveryScreen extends ConsumerStatefulWidget {
  const RepeaterDiscoveryScreen({super.key});

  @override
  ConsumerState<RepeaterDiscoveryScreen> createState() =>
      _RepeaterDiscoveryScreenState();
}

class _RepeaterDiscoveryScreenState
    extends ConsumerState<RepeaterDiscoveryScreen> {
  static const _scanWindow = Duration(seconds: 15);

  final Map<String, _DiscoveredRepeater> _results = {};
  StreamSubscription<CompanionResponse>? _responseSub;
  Timer? _scanTimer;
  bool _scanning = false;
  String? _error;
  int? _activeTag;

  @override
  void dispose() {
    _scanTimer?.cancel();
    _responseSub?.cancel();
    super.dispose();
  }

  int _newTag() {
    final rng = Random.secure();
    var tag = 0;
    while (tag == 0) {
      tag = rng.nextInt(0x100000000);
    }
    return tag;
  }

  Future<void> _discover() async {
    final service = ref.read(radioServiceProvider);
    if (service == null || !service.isConnected) {
      setState(() => _error = 'Companion desligado.');
      return;
    }
    _scanTimer?.cancel();
    await _responseSub?.cancel();

    final tag = _newTag();
    _activeTag = tag;

    setState(() {
      _results.clear();
      _error = null;
      _scanning = true;
    });

    _responseSub = service.responses.listen((response) {
      if (!_scanning || _activeTag != tag) return;

      if (response is ControlDataPush) {
        _handleControlResponse(response, tag);
      } else if (response is ErrorResponse) {
        _finish(
          error:
              'O rádio recusou o pedido de descoberta. Confirma que o firmware suporta NODE_DISCOVER.',
        );
      }
    });

    try {
      await service.discoverRepeatersZeroHop(tag: tag);
      _scanTimer = Timer(_scanWindow, _finish);
    } catch (_) {
      _finish(error: 'Não foi possível enviar o pedido de descoberta.');
    }
  }

  void _handleControlResponse(ControlDataPush response, int expectedTag) {
    // Discovery is zero-hop in both directions. Ignore unrelated/flooded
    // control traffic even if it happens to resemble a response.
    if (response.pathLen != 0) return;

    final payload = response.payload;
    // Response layout:
    // [0] 0x90 | node_type
    // [1] SNR at responder * 4
    // [2..5] echoed tag (uint32 LE)
    // [6..37] full public key
    if (payload.length < 38) return;
    if ((payload[0] & 0xF0) != controlTypeNodeDiscoverResp) return;
    if ((payload[0] & 0x0F) != advTypeRepeater) return;

    final tag =
        payload[2] |
        (payload[3] << 8) |
        (payload[4] << 16) |
        (payload[5] << 24);
    if (tag != expectedTag) return;

    final publicKey = Uint8List.fromList(payload.sublist(6, 38));
    final keyHex = _hex(publicKey);
    final inboundSnrByte = payload[1];
    final inboundSnr =
        (inboundSnrByte < 128 ? inboundSnrByte : inboundSnrByte - 256) / 4.0;

    final result = _DiscoveredRepeater(
      publicKey: publicKey,
      snr: response.snr,
      rssi: response.rssi,
      requesterSnrAtRepeater: inboundSnr,
      receivedAt: DateTime.now(),
    );

    if (!mounted) return;
    setState(() {
      // Same repeater may answer more than once. Keep the strongest response.
      final previous = _results[keyHex];
      if (previous == null || result.snr > previous.snr) {
        _results[keyHex] = result;
      }
    });
  }

  void _finish({String? error}) {
    _scanTimer?.cancel();
    _scanTimer = null;
    _responseSub?.cancel();
    _responseSub = null;
    _activeTag = null;
    if (!mounted) return;
    setState(() {
      _scanning = false;
      if (error != null) _error = error;
    });
  }

  String _hex(Uint8List bytes) => bytes
      .map((b) => b.toRadixString(16).padLeft(2, '0'))
      .join()
      .toUpperCase();

  String _nameFor(Uint8List publicKey) {
    for (final contact in ref.read(contactsProvider)) {
      if (_sameKey(contact.publicKey, publicKey)) {
        return contact.displayName;
      }
    }
    return 'Repeater ${_hex(publicKey.sublist(0, 4))}';
  }

  IconData _signalIcon(int rssi) {
    if (rssi >= -85) return Icons.signal_cellular_alt;
    if (rssi >= -100) return Icons.signal_cellular_alt_2_bar;
    return Icons.signal_cellular_alt_1_bar;
  }

  Color _signalColor(BuildContext context, int rssi) {
    final scheme = Theme.of(context).colorScheme;
    if (rssi >= -85) return scheme.primary;
    if (rssi >= -100) return scheme.tertiary;
    return scheme.error;
  }

  Contact? _contactFor(Uint8List publicKey) {
    for (final contact in ref.read(contactsProvider)) {
      if (_sameKey(contact.publicKey, publicKey)) return contact;
    }
    return null;
  }

  Future<void> _showRepeaterInfo(_DiscoveredRepeater result) async {
    final contact = _contactFor(result.publicKey);
    final keyHex = _hex(result.publicKey).toLowerCase();
    final hasGps =
        contact != null &&
        (contact.latitude != 0 || contact.longitude != 0);

    await showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      showDragHandle: true,
      builder: (ctx) => SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(20, 0, 20, 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                _nameFor(result.publicKey),
                style: Theme.of(ctx).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w700,
                ),
              ),
              const SizedBox(height: 12),
              ListTile(
                contentPadding: EdgeInsets.zero,
                leading: Icon(
                  _signalIcon(result.rssi),
                  color: _signalColor(ctx, result.rssi),
                ),
                title: const Text('Sinal'),
                subtitle: Text(
                  'RSSI ${result.rssi} dBm · '
                  'SNR ${result.snr.toStringAsFixed(1)} dB',
                ),
              ),
              ListTile(
                contentPadding: EdgeInsets.zero,
                leading: const Icon(Icons.key_outlined),
                title: const Text('Public key'),
                subtitle: SelectableText(_hex(result.publicKey)),
              ),
              if (contact != null) ...[
                const Divider(),
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: const Icon(Icons.badge_outlined),
                  title: const Text('Contacto'),
                  subtitle: Text(contact.displayName),
                ),
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: const Icon(Icons.location_on_outlined),
                  title: const Text('GPS'),
                  subtitle: Text(
                    hasGps
                        ? '${contact.latitude!.toStringAsFixed(6)}, '
                            '${contact.longitude!.toStringAsFixed(6)}'
                        : 'Sem posição conhecida',
                  ),
                  trailing:
                      hasGps ? const Icon(Icons.chevron_right) : null,
                  onTap:
                      hasGps
                          ? () {
                            Navigator.pop(ctx);
                            context.push('/map');
                          }
                          : null,
                ),
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: const Icon(Icons.cell_tower),
                  title: const Text('Abrir contacto Repeater'),
                  trailing: const Icon(Icons.chevron_right),
                  onTap: () {
                    Navigator.pop(ctx);
                    context.push('/repeater/$keyHex');
                  },
                ),
              ] else
                const ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: Icon(Icons.info_outline),
                  title: Text('Contacto não guardado'),
                  subtitle: Text(
                    'Ainda não existem dados adicionais como nome ou GPS para este repeater.',
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }

  bool _sameKey(Uint8List a, Uint8List b) {
    if (a.length != b.length) return false;
    for (var i = 0; i < a.length; i++) {
      if (a[i] != b[i]) return false;
    }
    return true;
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final results = _results.values.toList()
      ..sort((a, b) => b.snr.compareTo(a.snr));

    return Scaffold(
      appBar: AppBar(title: const Text('Descobrir repetidores')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Icon(Icons.radar, color: theme.colorScheme.primary),
                      const SizedBox(width: 12),
                      const Expanded(
                        child: Text(
                          'Envia um pedido de descoberta zero-hop dirigido a repetidores. '
                          'Só aparecem aqui repetidores que responderem diretamente a esse pedido.',
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  FilledButton.icon(
                    onPressed: _scanning ? null : _discover,
                    icon:
                        _scanning
                            ? const SizedBox(
                              width: 18,
                              height: 18,
                              child: CircularProgressIndicator(strokeWidth: 2),
                            )
                            : const Icon(Icons.wifi_find),
                    label: Text(
                      _scanning
                          ? 'A aguardar respostas...'
                          : 'Descobrir repetidores',
                    ),
                  ),
                  if (_scanning) ...[
                    const SizedBox(height: 10),
                    const LinearProgressIndicator(),
                    const SizedBox(height: 6),
                    Text(
                      'Janela de resposta: ${_scanWindow.inSeconds} segundos',
                      style: theme.textTheme.bodySmall,
                      textAlign: TextAlign.center,
                    ),
                  ],
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
          Text(
            'Respostas (${results.length})',
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          if (results.isEmpty)
            Card(
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Text(
                  _scanning
                      ? 'À procura de repetidores zero-hop...'
                      : 'Ainda não há respostas de uma sessão de descoberta.',
                  textAlign: TextAlign.center,
                ),
              ),
            )
          else
            ...results.map(
              (result) => Card(
                child: ListTile(
                  onTap: () => _showRepeaterInfo(result),
                  leading: const CircleAvatar(
                    child: Icon(Icons.cell_tower, size: 18),
                  ),
                  title: Text(_nameFor(result.publicKey)),
                  subtitle: Builder(
                    builder: (context) {
                      final contact = _contactFor(result.publicKey);
                      final hasGps =
                          contact != null &&
                          (contact.latitude != 0 || contact.longitude != 0);
                      return Text(
                        '${_hex(result.publicKey.sublist(0, 6))}\n'
                        'ZERO-HOP · ${contact != null ? 'Conhecido' : 'Novo'}'
                        '${hasGps ? ' · 📍 GPS' : ''}\n'
                        'REQ ${result.requesterSnrAtRepeater.toStringAsFixed(1)} dB · '
                        'RSSI ${result.rssi} dBm',
                      );
                    },
                  ),
                  isThreeLine: true,
                  trailing: Tooltip(
                    message:
                        'REQ ${result.requesterSnrAtRepeater.toStringAsFixed(1)} dB · '
                        'SNR ${result.snr.toStringAsFixed(1)} dB · '
                        'RSSI ${result.rssi} dBm',
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        _DiscoverySignalBars(snr: result.snr),
                        const SizedBox(height: 3),
                        Text(
                          'SNR ${result.snr.toStringAsFixed(1)}',
                          style: Theme.of(context).textTheme.labelSmall,
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class _DiscoveredRepeater {
  const _DiscoveredRepeater({
    required this.publicKey,
    required this.snr,
    required this.rssi,
    required this.requesterSnrAtRepeater,
    required this.receivedAt,
  });

  final Uint8List publicKey;

  /// SNR measured locally when the Companion received the response.
  final double snr;

  /// RSSI measured locally when the Companion received the response.
  final int rssi;

  /// SNR measured by the repeater when it received our discovery request.
  final double requesterSnrAtRepeater;

  final DateTime receivedAt;
}

class _DiscoverySignalBars extends StatelessWidget {
  const _DiscoverySignalBars({required this.snr});
  final double snr;

  @override
  Widget build(BuildContext context) {
    final bars = snr >= 0 ? 4 : snr >= -5 ? 3 : snr >= -10 ? 2 : 1;
    final color = Theme.of(context).colorScheme.primary;
    return SizedBox(
      width: 24,
      height: 18,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: List.generate(4, (index) {
          final active = index < bars;
          return Container(
            width: 4,
            height: 4.5 * (index + 1),
            decoration: BoxDecoration(
              color: active ? color : color.withAlpha(45),
              borderRadius: const BorderRadius.vertical(
                top: Radius.circular(1.5),
              ),
            ),
          );
        }),
      ),
    );
  }
}
