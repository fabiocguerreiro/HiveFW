import 'dart:async';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_blue_plus/flutter_blue_plus.dart'
    show FlutterBluePlus, BluetoothAdapterState, FlutterBluePlusException;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:permission_handler/permission_handler.dart';

import '../../l10n/l10n.dart';
import '../../providers/radio_providers.dart';
import '../../services/storage_service.dart';
import '../../transport/transport.dart';
import '../theme.dart';

part 'parts/connect_progress_card.dart';

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

String _safeUiName(String? value, {required String fallback}) {
  final sanitized = _sanitizeUtf16Ui(value ?? '').trim();
  return sanitized.isEmpty ? fallback : sanitized;
}

// ---------------------------------------------------------------------------
// Composite model — a discovered device paired with its connection type.
// ---------------------------------------------------------------------------

/// Discriminates transport type for a pending or recent connection.
/// Web Serial variants mirror their native serial counterparts but dispatch
/// to [connectWebSerial] so the browser's Web Serial API is used instead of
/// the native flutter_libserialport driver.
enum _ConnectType { ble, tcp }

class _ConnectTarget {
  const _ConnectTarget({required this.device, required this.type});
  final RadioDevice device;
  final _ConnectType type;

  String get typeLabel =>
      type == _ConnectType.ble ? 'Bluetooth LE' : 'Wi-Fi / TCP';

  IconData get icon =>
      type == _ConnectType.ble ? Icons.bluetooth : Icons.wifi;
}

// ---------------------------------------------------------------------------
// Screen
// ---------------------------------------------------------------------------

class ConnectScreen extends ConsumerStatefulWidget {
  const ConnectScreen({super.key});

  @override
  ConsumerState<ConnectScreen> createState() => _ConnectScreenState();
}

class _ConnectScreenState extends ConsumerState<ConnectScreen> {
  bool _scanning = false;

  bool _showOtherRecentsExpanded = false;

  final List<_ConnectTarget> _targets = [];
  StreamSubscription<RadioDevice>? _bleScanSub;
  StreamSubscription<BluetoothAdapterState>? _bleStateSub;
  _ConnectTarget? _connectingTarget;
  int _cachedContactCount = 0;
  int _cachedChannelCount = 0;
  bool _cancelledByUser = false;

  @override
  void initState() {
    super.initState();
    // Android-only app: subscribe to the native Bluetooth adapter state.
    if (Platform.isAndroid) {
      _bleStateSub = FlutterBluePlus.adapterState.listen((state) {
        if (state == BluetoothAdapterState.off) {
          _bleStateSub?.cancel();
          _bleStateSub = null;
          if (mounted) _checkBleOnStartup();
        } else if (state != BluetoothAdapterState.unknown) {
          // BLE is already on (or unavailable) — no dialog needed.
          _bleStateSub?.cancel();
          _bleStateSub = null;
        }
      });
    }
  }

  @override
  void dispose() {
    _bleStateSub?.cancel();
    _bleScanSub?.cancel();
    super.dispose();
  }

  Future<void> _checkBleOnStartup() async {
    if (!mounted) return;

    final enable = await showDialog<bool>(
      context: context,
      barrierDismissible: false,
      builder:
          (ctx) => AlertDialog(
            title: Row(
              children: [
                const Icon(Icons.bluetooth_disabled),
                const SizedBox(width: 10),
                Flexible(child: Text(context.l10n.connectBluetoothOff)),
              ],
            ),
            content: Text(context.l10n.connectBluetoothOffMessage),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(ctx).pop(false),
                child: Text(context.l10n.commonNo),
              ),
              FilledButton(
                onPressed: () => Navigator.of(ctx).pop(true),
                child: Text(context.l10n.connectBluetoothEnable),
              ),
            ],
          ),
    );

    if (!mounted || enable != true) return;
    try {
      await FlutterBluePlus.turnOn();
    } on FlutterBluePlusException catch (_) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(context.l10n.connectBluetoothDeniedMessage),
            duration: const Duration(seconds: 3),
          ),
        );
      }
    }
  }

  /// Returns true if the BT adapter is on (or not relevant to this platform).
  /// Shows a snackbar and returns false when BT is confirmed off, so callers
  /// can abort scan/connect early with clear user feedback.
  bool _checkBluetoothOn() {
    final currentState = FlutterBluePlus.adapterStateNow;
    if (currentState == BluetoothAdapterState.off) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Row(
            children: [
              const Icon(Icons.bluetooth_disabled, color: Colors.white),
              const SizedBox(width: 12),
              Expanded(child: Text(context.l10n.connectBluetoothOff)),
            ],
          ),
          backgroundColor: AppTheme.primary,
          duration: const Duration(seconds: 4),
        ),
      );
      return false;
    }
    return true;
  }

  Future<void> _showTcpConnectDialog() async {
    final hostController = TextEditingController();
    final portController = TextEditingController(text: '5000');

    final result = await showDialog<(String, int)>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Row(
          children: [
            Icon(Icons.wifi),
            SizedBox(width: 10),
            Text('Ligar ao HiveFW por Wi-Fi'),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: hostController,
              autofocus: true,
              keyboardType: TextInputType.url,
              decoration: const InputDecoration(
                labelText: 'IP ou hostname',
                hintText: '192.168.1.97',
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: portController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Porta TCP',
                helperText: 'HiveFW Companion usa 5000 por defeito',
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(),
            child: const Text('Cancelar'),
          ),
          FilledButton(
            onPressed: () {
              final host = hostController.text.trim();
              final port = int.tryParse(portController.text.trim());
              if (host.isEmpty || port == null || port < 1 || port > 65535) {
                return;
              }
              Navigator.of(ctx).pop((host, port));
            },
            child: const Text('Ligar'),
          ),
        ],
      ),
    );

    hostController.dispose();
    portController.dispose();

    if (!mounted || result == null) return;
    final (host, port) = result;
    final target = _ConnectTarget(
      device: RadioDevice(
        id: 'tcp://$host:$port',
        name: 'HiveFW $host',
        type: RadioDeviceType.tcp,
      ),
      type: _ConnectType.tcp,
    );
    await _connectTo(target);
  }

  Future<void> _startScan() async {
    if (!_checkBluetoothOn()) return;

    setState(() {
      _scanning = true;
      _showOtherRecentsExpanded = false;
      _targets.clear();
    });

    // Request Bluetooth permissions before attempting any scan.
      // Request Bluetooth permissions. On Android 12+ (API 31+) the manifest
      // declares BLUETOOTH_SCAN with neverForLocation, so location is NOT
      // required for BLE scanning. On Android 11 and below, location IS
      // required — we request it for those devices but do not hard-block on
      // denial, since we can't know the API level without device_info_plus.
      final btStatuses =
          await [
            Permission.bluetoothScan,
            Permission.bluetoothConnect,
          ].request();

      // Also request location — required on Android ≤ 11 for BLE scan.
      // Don't abort if only location is denied: on Android 12+ with
      // neverForLocation the OS doesn't enforce it, so the scan still works.
      final locationStatus = await Permission.location.request();

      final btDenied = btStatuses.values.any(
        (s) => s.isDenied || s.isPermanentlyDenied,
      );
      if (btDenied) {
        if (mounted) {
          setState(() => _scanning = false);
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text(
                'Permissões Bluetooth necessárias para procurar dispositivos.',
              ),
              action: SnackBarAction(
                label: 'Definições',
                onPressed: openAppSettings,
              ),
            ),
          );
        }
        return;
      }

      if (locationStatus.isDenied || locationStatus.isPermanentlyDenied) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text(
                'Localização negada. Em Android 11 ou inferior, o scan BLE pode não devolver dispositivos.',
              ),
              duration: Duration(seconds: 4),
            ),
          );
        }
      }

    // BLE scan — one entry per device, but the stream may re-emit a device
    // with an improved name (e.g. when a Windows scan-response PDU arrives
    // after the initial advertising PDU). Upsert by device ID so the UI
    // replaces "MESHCORE" placeholders with the real name in place.
    _bleScanSub = BleTransport.scan(
      timeout: const Duration(seconds: 10),
    ).listen(
      (device) {
        if (mounted) {
          setState(() {
            final idx = _targets.indexWhere(
              (t) => t.type == _ConnectType.ble && t.device.id == device.id,
            );
            final target = _ConnectTarget(
              device: device,
              type: _ConnectType.ble,
            );
            if (idx >= 0) {
              _targets[idx] = target; // name improved — update in place
            } else {
              _targets.add(target); // new device
            }
          });
        }
      },
      onDone: () {
        if (mounted) setState(() => _scanning = false);
      },
      onError: (_) {
        if (mounted) setState(() => _scanning = false);
      },
    );

  }

  Future<void> _connectTo(_ConnectTarget target) async {
    if (target.type == _ConnectType.ble && !_checkBluetoothOn()) return;
    _cancelledByUser = false;

    setState(() {
      _connectingTarget = target;
      _cachedContactCount = ref.read(radioContactsSnapshotProvider).length;
      _cachedChannelCount = ref.read(radioChannelsSnapshotProvider).length;
    });
    final connection = ref.read(connectionProvider.notifier);
    final name = _safeUiName(target.device.name, fallback: target.device.id);
    bool ok;

    switch (target.type) {
      case _ConnectType.ble:
        ok = await connection.connectBle(target.device.id, name);
      case _ConnectType.tcp:
        final uri = Uri.parse(target.device.id);
        ok = await connection.connectTcp(
          uri.host,
          port: uri.hasPort ? uri.port : 5000,
        );
    }


    if (ok && mounted) {
      context.go('/channels');
    } else if (mounted) {
      setState(() => _connectingTarget = null);
      if (_cancelledByUser) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Row(
              children: [
                const Icon(Icons.cancel_outlined, color: Colors.white),
                const SizedBox(width: 12),
                Expanded(child: Text(context.l10n.connectCancelledMessage)),
              ],
            ),
            duration: const Duration(seconds: 3),
          ),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(context.l10n.connectFailTitle),
            backgroundColor: Theme.of(context).colorScheme.error,
          ),
        );
      }
    }
  }

  Future<void> _connectToLastDevice(LastDevice last) async {
    if (last.type != 'ble' && last.type != 'tcp') {
      await _removeRecentDevice(last);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Ligação antiga removida. A App suporta apenas Bluetooth e Wi-Fi/TCP.'),
          ),
        );
      }
      return;
    }

    final safeLastName = _safeUiName(last.name, fallback: last.id);
    setState(() {
      _connectingTarget = _ConnectTarget(
        device: RadioDevice(
          id: last.id,
          name: safeLastName,
          type: last.type == 'ble' ? RadioDeviceType.ble : RadioDeviceType.tcp,
        ),
        type: last.type == 'ble' ? _ConnectType.ble : _ConnectType.tcp,
      );
      _cachedContactCount = ref.read(radioContactsSnapshotProvider).length;
      _cachedChannelCount = ref.read(radioChannelsSnapshotProvider).length;
    });

    if (last.type == 'ble' && !_checkBluetoothOn()) return;
    _cancelledByUser = false;
    final connection = ref.read(connectionProvider.notifier);
    final bool ok;
    if (last.type == 'ble') {
      ok = await connection.connectBle(last.id, safeLastName);
    } else {
      final uri = Uri.parse(last.id);
      ok = await connection.connectTcp(
        uri.host,
        port: uri.hasPort ? uri.port : 5000,
      );
    }

    if (ok && mounted) {
      context.go('/channels');
    } else if (mounted) {
      setState(() => _connectingTarget = null);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            _cancelledByUser
                ? context.l10n.connectCancelledMessage
                : context.l10n.connectLastFailTitle,
          ),
          backgroundColor:
              _cancelledByUser ? null : Theme.of(context).colorScheme.error,
        ),
      );
    }
  }

  Future<void> _removeRecentDevice(LastDevice device) async {
    final updated = await StorageService.instance.removeRecentDevice(device.id);
    if (!mounted) return;
    ref.read(recentDevicesProvider.notifier).state = updated;
    // If the removed device was the most-recent, update lastDeviceProvider too.
    final currentLast = ref.read(lastDeviceProvider);
    if (currentLast?.id == device.id) {
      ref.read(lastDeviceProvider.notifier).state =
          updated.isNotEmpty ? updated.first : null;
    }
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(connectionProvider);
    final stepLabel = ref.watch(connectionStepProvider);
    final stepIndex = ref.watch(connectionProgressProvider);
    final theme = Theme.of(context);
    final isLightTheme = theme.brightness == Brightness.light;
    final showScanAreaExpanded = _scanning || _targets.isNotEmpty;

    // Total steps: 0=connecting transport, 1=waiting, 2=device info,
    // 3=contacts, 4=channels, 5=done.
    const totalSteps = 5;

    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            children: [
              SizedBox(height: showScanAreaExpanded ? 20 : 48),
              Stack(
                clipBehavior: Clip.none,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 20,
                      vertical: 16,
                    ),
                    decoration: BoxDecoration(
                      color:
                          isLightTheme
                              ? const Color(0xFF171717)
                              : Colors.transparent,
                      borderRadius: BorderRadius.circular(24),
                      boxShadow:
                          isLightTheme
                              ? [
                                BoxShadow(
                                  color: Colors.black.withAlpha(18),
                                  blurRadius: 24,
                                  offset: const Offset(0, 10),
                                ),
                              ]
                              : const [],
                    ),
                    child: Image.asset(
                      'assets/images/hivefw-logo.png',
                      height: 120,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              SizedBox(height: showScanAreaExpanded ? 20 : 48),

              if (state == TransportState.connecting)
                _ConnectingCard(
                  target: _connectingTarget,
                  stepLabel: stepLabel,
                  stepIndex: stepIndex,
                  totalSteps: totalSteps,
                  theme: theme,
                  contactCount: ref.watch(radioContactsSnapshotProvider).length,
                  channelCount: ref.watch(radioChannelsSnapshotProvider).length,
                  cachedContactCount: _cachedContactCount,
                  cachedChannelCount: _cachedChannelCount,
                  onCancel: () async {
                    _cancelledByUser = true;
                    await ref.read(connectionProvider.notifier).disconnect();
                    if (mounted) setState(() => _connectingTarget = null);
                  },
                )
              else ...[
                Builder(
                  builder: (context) {
                    final recent = ref
                        .watch(recentDevicesProvider)
                        .where((d) => d.type == 'ble' || d.type == 'tcp')
                        .toList();
                    if (recent.isEmpty) return const SizedBox.shrink();
                    final last = recent.first;
                    final others = recent.skip(1).toList();
                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        // Primary reconnect card — most recently connected radio.
                        Padding(
                          padding: const EdgeInsets.only(bottom: 8),
                          child: Card(
                            color: theme.colorScheme.primaryContainer,
                            child: ListTile(
                              leading: Icon(
                                last.type == 'ble' ? Icons.bluetooth : Icons.wifi,
                                color: theme.colorScheme.onPrimaryContainer,
                              ),
                              title: Text(
                                'Ligar novamente',
                                style: TextStyle(
                                  color: theme.colorScheme.onPrimaryContainer,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              subtitle: Text(
                                _safeUiName(last.name, fallback: last.id),
                                style: TextStyle(
                                  color: theme.colorScheme.onPrimaryContainer
                                      .withAlpha(180),
                                ),
                              ),
                              trailing: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Icon(
                                    Icons.arrow_forward_ios,
                                    size: 16,
                                    color: theme.colorScheme.onPrimaryContainer,
                                  ),
                                  const SizedBox(width: 4),
                                  IconButton(
                                    icon: Icon(
                                      Icons.close,
                                      size: 16,
                                      color: theme
                                          .colorScheme
                                          .onPrimaryContainer
                                          .withAlpha(160),
                                    ),
                                    onPressed: () => _removeRecentDevice(last),
                                    padding: EdgeInsets.zero,
                                    constraints: const BoxConstraints(),
                                    visualDensity: VisualDensity.compact,
                                    tooltip: 'Remover da lista',
                                  ),
                                ],
                              ),
                              onTap: () => _connectToLastDevice(last),
                            ),
                          ),
                        ),
                        // Additional recent radios.
                        if (others.isNotEmpty) ...[
                          Padding(
                            padding: const EdgeInsets.only(bottom: 6),
                            child: Card(
                              child: ListTile(
                                dense: true,
                                leading: Icon(
                                  Icons.history,
                                  color: theme.colorScheme.primary,
                                ),
                                title: Text(
                                  'OUTROS RÁDIOS (${others.length})',
                                  style: theme.textTheme.labelLarge,
                                ),
                                trailing: Icon(
                                  _showOtherRecentsExpanded
                                      ? Icons.expand_less
                                      : Icons.expand_more,
                                ),
                                onTap:
                                    () => setState(
                                      () =>
                                          _showOtherRecentsExpanded =
                                              !_showOtherRecentsExpanded,
                                    ),
                              ),
                            ),
                          ),
                          if (_showOtherRecentsExpanded)
                            ...others.map(
                              (d) => Padding(
                                padding: const EdgeInsets.only(bottom: 6),
                                child: Card(
                                  child: ListTile(
                                    leading: CircleAvatar(
                                      backgroundColor:
                                          theme
                                              .colorScheme
                                              .surfaceContainerHighest,
                                      child: Icon(
                                        d.type == 'ble' ? Icons.bluetooth : Icons.wifi,
                                      ),
                                    ),
                                    title: Text(
                                      _safeUiName(d.name, fallback: d.id),
                                    ),
                                    subtitle: Text(
                                      d.type == 'ble' ? 'Bluetooth LE' : 'Wi-Fi / TCP',
                                      style: theme.textTheme.bodySmall,
                                    ),
                                    trailing: Row(
                                      mainAxisSize: MainAxisSize.min,
                                      children: [
                                        const Icon(
                                          Icons.arrow_forward_ios,
                                          size: 16,
                                        ),
                                        const SizedBox(width: 4),
                                        IconButton(
                                          icon: const Icon(
                                            Icons.close,
                                            size: 16,
                                          ),
                                          onPressed:
                                              () => _removeRecentDevice(d),
                                          padding: EdgeInsets.zero,
                                          constraints: const BoxConstraints(),
                                          visualDensity: VisualDensity.compact,
                                          tooltip: 'Remover da lista',
                                        ),
                                      ],
                                    ),
                                    onTap: () => _connectToLastDevice(d),
                                  ),
                                ),
                              ),
                            ),
                        ],
                        Padding(
                          padding: const EdgeInsets.only(top: 4, bottom: 8),
                          child: TextButton.icon(
                            icon: const Icon(Icons.wifi_off, size: 18),
                            label: Text(context.l10n.connectContinueOffline),
                            onPressed: () => context.go('/channels'),
                          ),
                        ),
                        const SizedBox(height: 8),
                      ],
                    );
                  },
                ),
                FilledButton.icon(
                  // Disabled while either scan is in progress — only one
                  // browser picker can be open at a time.
                  onPressed: _scanning ? null : _startScan,
                  icon:
                      _scanning
                          ? const SizedBox(
                            width: 18,
                            height: 18,
                            child: CircularProgressIndicator(strokeWidth: 2),
                          )
                          : const Icon(Icons.search),
                  label: Text(
                    _scanning ? 'A procurar...' : 'Procurar Companion por Bluetooth',
                  ),
                ),
                const SizedBox(height: 10),
                TextButton(
                  onPressed:
                      _scanning
                          ? null
                          : () => context.push('/hivefw/radio-network'),
                  child: const Text('Configurar via Wi-Fi'),
                ),
                SizedBox(height: showScanAreaExpanded ? 8 : 24),

                Expanded(
                  child:
                      _targets.isEmpty
                          ? Center(
                            child: Text(
                              _scanning
                                  ? 'A procurar rádios HiveFW / MeshCore...'
                                  : 'Procure o seu Companion HiveFW por Bluetooth',
                              textAlign: TextAlign.center,
                              style: theme.textTheme.bodyMedium?.copyWith(
                                color: theme.colorScheme.onSurface.withAlpha(
                                  120,
                                ),
                              ),
                            ),
                          )
                          : ListView.builder(
                            itemCount: _targets.length,
                            itemBuilder: (context, index) {
                              final target = _targets[index];
                              final rssiSuffix =
                                  target.type == _ConnectType.ble &&
                                          target.device.rssi != null
                                      ? ' (${target.device.rssi} dBm)'
                                      : '';
                              return Card(
                                child: ListTile(
                                  leading: CircleAvatar(
                                    backgroundColor:
                                        theme.colorScheme.primaryContainer,
                                    child: Icon(
                                      target.icon,
                                      color:
                                          theme.colorScheme.onPrimaryContainer,
                                    ),
                                  ),
                                  title: Text(
                                    _safeUiName(
                                      target.device.name,
                                      fallback: target.device.id,
                                    ),
                                  ),
                                  subtitle: Text(
                                    '${target.typeLabel}$rssiSuffix',
                                  ),
                                  trailing: const Icon(
                                    Icons.arrow_forward_ios,
                                    size: 16,
                                  ),
                                  onTap: () => _connectTo(target),
                                ),
                              );
                            },
                          ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
