import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../protocol/cayenne_lpp.dart';
import '../../../protocol/companion_decoder.dart';
import '../../../l10n/l10n.dart';
import '../../../providers/radio_providers.dart';
import '../../../utils/battery_utils.dart';

part 'parts/telemetry_battery_card.dart';
part 'parts/telemetry_network_card.dart';
part 'parts/telemetry_entry_card.dart';
part 'parts/telemetry_radio_stats_cards.dart';

/// Telemetry dashboard — battery history chart, CayenneLPP sensor readings,
/// and network statistics.
class TelemetryScreen extends ConsumerStatefulWidget {
  const TelemetryScreen({super.key});

  @override
  ConsumerState<TelemetryScreen> createState() => _TelemetryScreenState();
}

class _TelemetryScreenState extends ConsumerState<TelemetryScreen> {
  final _rfSectionKey = GlobalKey();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final scrollToRf = ref.read(telemetryScrollToRfProvider);
      if (scrollToRf) {
        ref.read(telemetryScrollToRfProvider.notifier).state = false;
        final ctx = _rfSectionKey.currentContext;
        if (ctx != null) {
          Scrollable.ensureVisible(
            ctx,
            duration: const Duration(milliseconds: 350),
            curve: Curves.easeInOut,
            alignment: 0.0,
          );
        }
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final batteryMv = ref.watch(batteryProvider);
    final battHistoryRaw = ref.watch(batteryHistoryProvider);
    final stats = ref.watch(networkStatsProvider);
    final deviceInfo = ref.watch(deviceInfoProvider);
    final selfInfo = ref.watch(selfInfoProvider);
    final storage = ref.watch(storageProvider);
    final radioConfig = ref.watch(radioConfigProvider);
    final telemetry = ref.watch(telemetryProvider);
    final statsCore = ref.watch(radioStatsCoreProvider);
    final statsRadio = ref.watch(radioStatsRadioProvider);
    final statsPackets = ref.watch(radioStatsPacketsProvider);
    final theme = Theme.of(context);

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        // ---- Device status summary ----
        _SectionHeader(
          label: 'Estado',
          icon: Icons.dashboard_outlined,
        ),
        const SizedBox(height: 8),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(14),
            child: Wrap(
              spacing: 18,
              runSpacing: 12,
              children: [
                _StatusMetric(
                  label: 'Dispositivo',
                  value: selfInfo?.name ?? deviceInfo?.deviceName ?? 'HiveFW',
                  detail: deviceInfo?.model ?? '—',
                  icon: Icons.memory,
                ),
                _StatusMetric(
                  label: 'Firmware',
                  value: deviceInfo?.versionString ?? '—',
                  detail: deviceInfo?.firmwareBuild ?? '',
                  icon: Icons.system_update_alt,
                ),
                _StatusMetric(
                  label: 'Uptime',
                  value: statsCore == null
                      ? '—'
                      : _formatStatusUptime(statsCore.uptimeSecs),
                  detail: statsCore == null ? '' : '${statsCore.uptimeSecs}s',
                  icon: Icons.schedule,
                ),
                _StatusMetric(
                  label: 'Storage',
                  value: storage.$2 == null
                      ? '—'
                      : '${storage.$1 ?? 0} / ${storage.$2} KB',
                  detail: 'Utilização local',
                  icon: Icons.storage,
                ),
                _StatusMetric(
                  label: 'Rádio',
                  value: radioConfig == null
                      ? '—'
                      : '${radioConfig.frequencyMHz.toStringAsFixed(3)} MHz',
                  detail: radioConfig == null
                      ? ''
                      : 'BW ${radioConfig.bandwidthKHz} kHz · SF${radioConfig.spreadingFactor} · 4/${radioConfig.codingRate} · ${radioConfig.txPowerDbm} dBm',
                  icon: Icons.settings_input_antenna,
                ),
                _StatusMetric(
                  label: 'Modo Repeater',
                  value: (deviceInfo?.clientRepeat ?? 0) != 0 ? 'Ativo' : 'Inativo',
                  detail: (deviceInfo?.clientRepeat ?? 0) != 0
                      ? 'Funções Repeater disponíveis'
                      : 'Modo Companion',
                  icon: Icons.repeat,
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 20),

        // ---- Battery section ----
        _SectionHeader(
          label: context.l10n.telemetryBattery,
          icon: Icons.battery_charging_full,
        ),
        const SizedBox(height: 8),
        _BatteryCard(
          currentMv: batteryMv,
          history: battHistoryRaw,
          theme: theme,
        ),
        const SizedBox(height: 20),

        // ---- Network stats section ----
        _SectionHeader(
          label: context.l10n.telemetryNetStats,
          icon: Icons.bar_chart,
        ),
        const SizedBox(height: 8),
        _NetworkStatsCard(stats: stats, theme: theme),
        const SizedBox(height: 20),

        // ---- Radio core stats section ----
        _SectionHeader(
          label: context.l10n.telemetryRadioState,
          icon: Icons.memory,
        ),
        const SizedBox(height: 8),
        if (statsCore == null)
          _EmptyHint(
            icon: Icons.hourglass_empty,
            message: context.l10n.telemetryRadioWaiting,
            theme: theme,
          )
        else
          _RadioCoreStatsCard(stats: statsCore, theme: theme),
        const SizedBox(height: 20),

        // ---- Radio RF stats section ----
        _SectionHeader(
          key: _rfSectionKey,
          label: context.l10n.telemetryRadioRF,
          icon: Icons.cell_tower,
        ),
        const SizedBox(height: 8),
        if (statsRadio == null)
          _EmptyHint(
            icon: Icons.hourglass_empty,
            message: context.l10n.telemetryRFWaiting,
            theme: theme,
          )
        else
          _RadioRfStatsCard(stats: statsRadio, theme: theme),
        const SizedBox(height: 20),

        // ---- Packet counters section ----
        _SectionHeader(
          label: context.l10n.telemetryPacketCounters,
          icon: Icons.swap_horiz,
        ),
        const SizedBox(height: 8),
        if (statsPackets == null)
          _EmptyHint(
            icon: Icons.hourglass_empty,
            message: context.l10n.telemetryCountersWaiting,
            theme: theme,
          )
        else
          _RadioPacketStatsCard(stats: statsPackets, theme: theme),
        const SizedBox(height: 20),

        // ---- CayenneLPP sensor readings ----
        _SectionHeader(
          label: context.l10n.telemetrySensors,
          icon: Icons.sensors,
        ),
        const SizedBox(height: 8),
        if (telemetry.isEmpty)
          _EmptyHint(
            icon: Icons.sensors_off,
            message: context.l10n.telemetryNoData,
            theme: theme,
          )
        else
          for (final entry in telemetry)
            _TelemetryEntryCard(entry: entry, theme: theme),
      ],
    );
  }
}


String _formatStatusUptime(int seconds) {
  final days = seconds ~/ 86400;
  final hours = (seconds % 86400) ~/ 3600;
  final minutes = (seconds % 3600) ~/ 60;
  if (days > 0) return '${days}d ${hours}h';
  if (hours > 0) return '${hours}h ${minutes}m';
  return '${minutes}m';
}

class _StatusMetric extends StatelessWidget {
  const _StatusMetric({
    required this.label,
    required this.value,
    required this.detail,
    required this.icon,
  });

  final String label;
  final String value;
  final String detail;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return SizedBox(
      width: 220,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, size: 20, color: theme.colorScheme.primary),
          const SizedBox(width: 9),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(label, style: theme.textTheme.labelSmall),
                Text(
                  value,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: theme.textTheme.titleSmall?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
                ),
                if (detail.isNotEmpty)
                  Text(
                    detail,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
