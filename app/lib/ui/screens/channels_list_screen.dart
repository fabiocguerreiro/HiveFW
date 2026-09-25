import 'dart:async';
import 'dart:math';
import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:share_plus/share_plus.dart';

import '../../l10n/l10n.dart';
import '../../protocol/protocol.dart';
import '../../providers/radio_providers.dart';
import '../../services/hivefw_local_data_service.dart';
import 'qr_scanner_screen.dart';

part 'parts/channels_create_sheets.dart';
part 'parts/channels_edit_sheet.dart';
part 'parts/channels_list_widgets.dart';
part 'parts/channels_qr_dialog.dart';
// ---------------------------------------------------------------------------
// Channel type enum (used only in the add/create flow)
// ---------------------------------------------------------------------------

enum _ChannelType { publicChannel, hashtag, privateCreate, privateJoin }

String _sanitizeUtf16Ui(String s) {
  for (var i = 0; i < s.length; i++) {
    final c = s.codeUnitAt(i);
    if (c >= 0xD800 && c <= 0xDFFF) {
      final buf = StringBuffer();
      for (var j = 0; j < s.length; j++) {
        final u = s.codeUnitAt(j);
        if (u >= 0xD800 && u <= 0xDBFF) {
          if (j + 1 < s.length) {
            final u2 = s.codeUnitAt(j + 1);
            if (u2 >= 0xDC00 && u2 <= 0xDFFF) {
              buf.write(s[j]);
              buf.write(s[j + 1]);
              j++;
              continue;
            }
          }
          buf.writeCharCode(0xFFFD);
        } else if (u >= 0xDC00 && u <= 0xDFFF) {
          buf.writeCharCode(0xFFFD);
        } else {
          buf.write(s[j]);
        }
      }
      return buf.toString();
    }
  }
  return s;
}

String _safeUiText(String? value, {required String fallback}) {
  final sanitized = _sanitizeUtf16Ui(value ?? '').trim();
  return sanitized.isEmpty ? fallback : sanitized;
}

/// Bundles a radio's identity with its configured channel list.
///
/// Passing one [_TargetDevice] per radio to [_CreateChannelSheet] guarantees
/// that duplicate detection is always scoped to a single device.  Two radios
/// can legitimately share the same channel key (even in different slots)
/// because each will have its own [_TargetDevice] instance.
class _TargetDevice {
  const _TargetDevice({required this.channels, this.id, this.label});

  /// Device identifier (e.g. BLE MAC address).  Null when not yet known.
  /// Included so a future multi-device UI can use it as a map key.
  final String? id;

  /// Human-readable name shown in duplicate-channel error messages.
  final String? label;

  /// Channels already configured **on this device only**.
  final List<ChannelInfo> channels;
}

// Well-known public channel key (from the MeshCore companion protocol spec)
const _kPublicKeyHex = '8b3387e9c5cdea6ac9e5edbaa115cd72';

Uint8List _publicChannelSecret() {
  return Uint8List.fromList(
    List.generate(
      16,
      (i) => int.parse(_kPublicKeyHex.substring(i * 2, i * 2 + 2), radix: 16),
    ),
  );
}

/// Derives the 16-byte hashtag channel key (delegates to shared protocol implementation).
Uint8List _hashtagKey(String name) => hashtagChannelKey(name);

String _toHex(Uint8List bytes) =>
    bytes.map((b) => b.toRadixString(16).padLeft(2, '0')).join();

Uint8List? _fromHex(String hex) {
  final clean = hex.replaceAll(RegExp(r'\s+'), '');
  if (clean.length != 32) return null;
  try {
    return Uint8List.fromList(
      List.generate(
        16,
        (i) => int.parse(clean.substring(i * 2, i * 2 + 2), radix: 16),
      ),
    );
  } catch (_) {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Main screen
// ---------------------------------------------------------------------------

/// Channels list with a dedicated APPS/SOS conversation and channel previews.
class ChannelsListScreen extends ConsumerStatefulWidget {
  const ChannelsListScreen({super.key});

  @override
  ConsumerState<ChannelsListScreen> createState() => _ChannelsListScreenState();
}

class _ChannelsListScreenState extends ConsumerState<ChannelsListScreen> {
  @override
  void initState() {
    super.initState();
    // Eagerly load persisted messages for all known channels so the list
    // shows last-message previews without requiring a channel visit first.
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      _loadAllChannelMessages(ref.read(channelsProvider));
      unawaited(_refreshAppsChannel());
    });
  }

  Future<void> _refreshAppsChannel() async {
    final radio = ref.read(radioServiceProvider);
    if (radio == null || !radio.isConnected) {
      ref.read(hiveAppsChannelIndexProvider.notifier).state = null;
      return;
    }

    try {
      final index = await HiveFwLocalDataService(radio).readAppsChannelIndex();
      if (!mounted) return;
      ref.read(hiveAppsChannelIndexProvider.notifier).state = index;
    } catch (_) {
      // Official MeshCore firmware does not expose HiveFW local vars.
      // Leave the normal channel list unchanged in that case.
      if (mounted) {
        ref.read(hiveAppsChannelIndexProvider.notifier).state = null;
      }
    }
  }

  void _loadAllChannelMessages(List<ChannelInfo> channels) {
    for (final ch in channels) {
      if (ch.name.isNotEmpty) {
        ref.read(messagesProvider.notifier).ensureLoadedForChannel(ch.index);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final channels = ref.watch(channelsProvider);
    final appsChannelIndex = ref.watch(hiveAppsChannelIndexProvider);
    final channelUiPrefs = ref.watch(channelUiPrefsProvider);

    // Also trigger when channels arrive from the radio after the screen opens.
    ref.listen<List<ChannelInfo>>(channelsProvider, (_, next) {
      _loadAllChannelMessages(next);
    });
    ref.listen(connectionProvider, (_, __) {
      final radio = ref.read(radioServiceProvider);
      if (radio?.isConnected == true) {
        unawaited(_refreshAppsChannel());
      }
    });
    // Watch overall message count so the sort updates when messages arrive;
    // the actual per-channel lookup is O(1) via the notifier partition.
    ref.watch(messagesProvider.select((msgs) => msgs.length));
    final maxChannels = ref.watch(
      deviceInfoProvider.select((info) => info?.maxChannels ?? 8),
    );

    final configured = channels.where((c) => c.name.isNotEmpty).toList();
    ChannelInfo? appsChannel;
    if (appsChannelIndex != null) {
      for (final channel in configured) {
        if (channel.index == appsChannelIndex) {
          appsChannel = channel;
          break;
        }
      }
    }

    final hiddenChannels =
        configured
            .where(
              (channel) =>
                  channel.index != appsChannelIndex &&
                  channelUiPrefs.hidden.contains(channel.index),
            )
            .toList();
    final visibleChannels =
        configured
            .where(
              (channel) =>
                  channel.index != appsChannelIndex &&
                  !channelUiPrefs.hidden.contains(channel.index),
            )
            .toList();

    final notifier = ref.read(messagesProvider.notifier);
    visibleChannels.sort((a, b) {
      int lastTs(ChannelInfo ch) {
        final msgs = notifier.forChannel(ch.index);
        return msgs.fold(0, (ts, m) => m.timestamp > ts ? m.timestamp : ts);
      }

      final favA = channelUiPrefs.favorites.contains(a.index);
      final favB = channelUiPrefs.favorites.contains(b.index);
      if (favA != favB) return favA ? -1 : 1;
      final ta = lastTs(a);
      final tb = lastTs(b);
      if (ta != tb) return tb.compareTo(ta); // newest message first
      return a.index.compareTo(b.index); // tie-break by slot index
    });

    final usedIndices = configured.map((c) => c.index).toSet();
    // Build a _TargetDevice so channels and device identity travel together.
    // Using currentRadioIdProvider when connected; last-known device otherwise.
    // The same channel key on a different radio is NOT a duplicate — the
    // duplicate check inside _CreateChannelSheet is scoped to targetDevice.channels.
    final deviceId =
        ref.watch(currentRadioIdProvider) ??
        ref.watch(recentDevicesProvider.select((d) => d.firstOrNull?.id));
    final deviceLabel = ref.watch(
      recentDevicesProvider.select((d) => d.firstOrNull?.name),
    );
    final targetDevice = _TargetDevice(
      id: deviceId,
      label: deviceLabel,
      channels: configured,
    );

    void openTypePicker() {
      showModalBottomSheet<void>(
        context: context,
        isScrollControlled: true,
        showDragHandle: true,
        builder:
            (ctx) => _TypePickerSheet(
              onTypeSelected: (type) {
                Navigator.pop(ctx);
                _openCreateSheet(
                  type: type,
                  maxChannels: maxChannels,
                  usedIndices: usedIndices,
                  targetDevice: targetDevice,
                );
              },
              onScanQr: () {
                Navigator.pop(ctx);
                _scanQrToCreate(
                  maxChannels: maxChannels,
                  usedIndices: usedIndices,
                  targetDevice: targetDevice,
                );
              },
            ),
      );
    }

    void openEditSheet(ChannelInfo channel) {
      showModalBottomSheet<void>(
        context: context,
        isScrollControlled: true,
        showDragHandle: true,
        builder:
            (_) => _EditChannelSheet(
              channel: channel,
              onSave: (idx, name, secret) async {
                final service = ref.read(radioServiceProvider);
                if (service == null) return;
                await service.setChannel(idx, name, secret);
                await Future.delayed(const Duration(milliseconds: 200));
                await service.requestChannel(idx);
              },
              onDelete: (idx) async {
                final service = ref.read(radioServiceProvider);
                if (service == null) return;
                // Delete = SET_CHANNEL with empty name and all-zero 16-byte secret
                await service.setChannel(idx, '', Uint8List(16));
                await Future.delayed(const Duration(milliseconds: 200));
                await service.requestChannel(idx);
              },
            ),
      );
    }


    Future<void> chooseAppsChannel() async {
      if (configured.isEmpty) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Não existem canais configurados.')),
        );
        return;
      }

      final selected = await showModalBottomSheet<int?>(
        context: context,
        showDragHandle: true,
        builder: (ctx) => SafeArea(
          child: ListView(
            shrinkWrap: true,
            padding: const EdgeInsets.fromLTRB(12, 0, 12, 20),
            children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(8, 4, 8, 10),
                child: Text(
                  'Canal APPS/SOS',
                  style: Theme.of(ctx).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
              for (final channel in configured)
                RadioListTile<int>(
                  value: channel.index,
                  groupValue: appsChannelIndex,
                  title: Text(
                    _safeUiText(
                      channel.name,
                      fallback: 'Canal ${channel.index}',
                    ),
                  ),
                  subtitle: Text('Canal ${channel.index}'),
                  onChanged: (value) => Navigator.pop(ctx, value),
                ),
              if (appsChannelIndex != null)
                ListTile(
                  leading: const Icon(Icons.link_off),
                  title: const Text('Remover seleção APPS/SOS'),
                  onTap: () => Navigator.pop(ctx, -1),
                ),
            ],
          ),
        ),
      );

      if (selected == null) return;
      final radio = ref.read(radioServiceProvider);
      if (radio == null || !radio.isConnected) return;

      final ok = await HiveFwLocalDataService(radio).writeAppsChannelIndex(
        selected < 0 ? null : selected,
      );
      if (!mounted) return;
      if (!ok) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Não foi possível alterar o Canal APPS/SOS.')),
        );
        return;
      }

      ref.read(hiveAppsChannelIndexProvider.notifier).state =
          selected < 0 ? null : selected;
    }

    return Stack(
      children: [
        Column(
          children: [
            Expanded(
              child:
                  configured.isEmpty
                      ? _EmptyState(
                        onRefresh: () {
                          final service = ref.read(radioServiceProvider);
                          if (service == null) return;
                          for (var i = 0; i < maxChannels; i++) {
                            service.requestChannel(i);
                          }
                        },
                      )
                      : RefreshIndicator(
                        onRefresh: () async {
                          final service = ref.read(radioServiceProvider);
                          if (service == null) return;
                          for (var i = 0; i < maxChannels; i++) {
                            await service.requestChannel(i);
                            await Future.delayed(
                              const Duration(milliseconds: 100),
                            );
                          }
                          await _refreshAppsChannel();
                        },
                        child: ListView(
                          padding: const EdgeInsets.only(top: 8, bottom: 80),
                          children: [
                            _AppsChannelSection(
                              channel: appsChannel,
                              onConfigure: chooseAppsChannel,
                              onEdit:
                                  appsChannel == null
                                      ? null
                                      : () => openEditSheet(appsChannel!),
                            ),
                            _ChannelSectionLabel(
                              label: 'Canais',
                              trailing:
                                  hiddenChannels.isEmpty
                                      ? null
                                      : TextButton.icon(
                                        onPressed: () {
                                          showModalBottomSheet<void>(
                                            context: context,
                                            showDragHandle: true,
                                            builder:
                                                (ctx) => SafeArea(
                                                  child: ListView(
                                                    shrinkWrap: true,
                                                    padding:
                                                        const EdgeInsets.fromLTRB(
                                                          12,
                                                          0,
                                                          12,
                                                          20,
                                                        ),
                                                    children: [
                                                      Padding(
                                                        padding:
                                                            const EdgeInsets.all(
                                                              8,
                                                            ),
                                                        child: Text(
                                                          'Canais ocultos',
                                                          style:
                                                              Theme.of(ctx)
                                                                  .textTheme
                                                                  .titleMedium
                                                                  ?.copyWith(
                                                                    fontWeight:
                                                                        FontWeight
                                                                            .w700,
                                                                  ),
                                                        ),
                                                      ),
                                                      for (final channel
                                                          in hiddenChannels)
                                                        ListTile(
                                                          leading: const Icon(
                                                            Icons
                                                                .visibility_outlined,
                                                          ),
                                                          title: Text(
                                                            _safeUiText(
                                                              channel.name,
                                                              fallback:
                                                                  'Canal ${channel.index}',
                                                            ),
                                                          ),
                                                          subtitle: Text(
                                                            'Canal ${channel.index}',
                                                          ),
                                                          trailing: const Icon(
                                                            Icons
                                                                .visibility_outlined,
                                                          ),
                                                          onTap: () async {
                                                            await ref
                                                                .read(
                                                                  channelUiPrefsProvider
                                                                      .notifier,
                                                                )
                                                                .setHidden(
                                                                  channel.index,
                                                                  false,
                                                                );
                                                            if (ctx.mounted) {
                                                              Navigator.pop(
                                                                ctx,
                                                              );
                                                            }
                                                          },
                                                        ),
                                                    ],
                                                  ),
                                                ),
                                          );
                                        },
                                        icon: const Icon(
                                          Icons.visibility_off_outlined,
                                          size: 16,
                                        ),
                                        label: Text(
                                          'Ocultos ${hiddenChannels.length}',
                                        ),
                                      ),
                            ),
                            if (visibleChannels.isEmpty)
                              const Padding(
                                padding: EdgeInsets.fromLTRB(20, 8, 20, 20),
                                child: Text(
                                  'Não existem outros canais configurados.',
                                ),
                              )
                            else
                              for (final channel in visibleChannels)
                                _ChannelTile(
                                  channel: channel,
                                  onEdit: () => openEditSheet(channel),
                                ),
                          ],
                        ),
                      ),
            ),
          ],
        ),

        // FAB — opens type picker
        Positioned(
          bottom: 16,
          right: 16,
          child: FloatingActionButton(
            heroTag: 'channels_fab',
            onPressed: openTypePicker,
            tooltip: context.l10n.commonAdd,
            child: const Icon(Icons.add),
          ),
        ),
      ],
    );
  }

  void _openCreateSheet({
    required _ChannelType type,
    required int maxChannels,
    required Set<int> usedIndices,
    required _TargetDevice targetDevice,
    String? prefillName,
    Uint8List? prefillSecret,
    String? prefillRegionScope,
  }) {
    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      showDragHandle: true,
      builder:
          (_) => _CreateChannelSheet(
            type: type,
            maxChannels: maxChannels,
            usedIndices: usedIndices,
            targetDevice: targetDevice,
            prefillName: prefillName,
            prefillSecret: prefillSecret,
            prefillRegionScope: prefillRegionScope,
            onSave: (idx, name, secret, regionScope) async {
              final service = ref.read(radioServiceProvider);
              if (service == null) return;
              await service.setChannel(idx, name, secret);
              await ref
                  .read(channelUiPrefsProvider.notifier)
                  .setRegionScope(idx, regionScope);
              await Future.delayed(const Duration(milliseconds: 200));
              await service.requestChannel(idx);
            },
          ),
    );
  }

  Future<void> _scanQrToCreate({
    required int maxChannels,
    required Set<int> usedIndices,
    required _TargetDevice targetDevice,
  }) async {
    final raw = await Navigator.of(context).push<String>(
      MaterialPageRoute(
        fullscreenDialog: true,
        builder: (_) => const QrScannerScreen(title: 'Ler QR de Canal'),
      ),
    );
    if (raw == null || !mounted) return;

    final result = MeshCoreUri.parse(raw);
    if (result is MeshCoreChannelUri) {
      _openCreateSheet(
        type: _ChannelType.privateJoin,
        maxChannels: maxChannels,
        usedIndices: usedIndices,
        targetDevice: targetDevice,
        prefillName: result.name,
        prefillSecret: result.secret,
        prefillRegionScope: result.regionScope,
      );
    } else if (result is MeshCoreContactUri) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text(
              'QR de contacto detectado. Use o ecrã de Contactos para o adicionar.',
            ),
          ),
        );
      }
    } else {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('QR Code MeshCore inválido ou não reconhecido.'),
          ),
        );
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Type picker sheet — matches official app layout
