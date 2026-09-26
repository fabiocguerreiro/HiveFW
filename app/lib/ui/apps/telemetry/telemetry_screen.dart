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
    final contacts = ref.watch(contactsProvider);
    final channels = ref.watch(channelsProvider);
    final theme = Theme.of(context);

    final effectiveBatteryMv =
        statsCore?.batteryMv != null && statsCore!.batteryMv > 0
            ? statsCore.batteryMv
            : batteryMv;
    final pathHashLabel = switch (deviceInfo?.pathHashMode) {
      0 => '1 byte',
      1 => '2 bytes',
      2 => '3 bytes',
      _ => '—',
    };
    final protocolLabel =
        deviceInfo == null ? '—' : 'v${deviceInfo.firmwareVersion}';
    final repeaterActive = (deviceInfo?.clientRepeat ?? 0) != 0;
    final storageValue =
        storage.$2 == null ? '—' : '${storage.$1 ?? 0} / ${storage.$2} KB';
    final batteryValue =
        effectiveBatteryMv > 0
            ? '${batteryPercentFromMv(effectiveBatteryMv)}%'
            : '—';
    final batteryDetail =
        effectiveBatteryMv > 0
            ? '${(effectiveBatteryMv / 1000).toStringAsFixed(3)} V'
            : 'A aguardar leitura';
    final rfValue =
        statsRadio == null ? '—' : '${statsRadio.lastRssi} dBm';
    final rfDetail =
        statsRadio == null
            ? 'SNR —'
            : 'SNR ${statsRadio.lastSnrDb.toStringAsFixed(1)} dB';
    final radioValue =
        radioConfig == null
            ? '—'
            : '${radioConfig.frequencyMHz.toStringAsFixed(3)} MHz';
    final radioDetail =
        radioConfig == null
            ? 'A aguardar configuração'
            : 'BW ${radioConfig.bandwidthKHz} kHz · SF${radioConfig.spreadingFactor} · CR 4/${radioConfig.codingRate}';
    final capacityValue =
        deviceInfo == null
            ? '—'
            : '${contacts.length}/${deviceInfo.maxContacts ?? '—'} contactos';
    final capacityDetail =
        deviceInfo == null
            ? 'Canais —'
            : '${channels.length}/${deviceInfo.maxChannels ?? '—'} canais';

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        _SectionHeader(label: 'Estado', icon: Icons.dashboard_outlined),
        const SizedBox(height: 8),
        _OverviewGrid(
          items: [
            _OverviewMetricData(
              label: 'Bateria',
              value: batteryValue,
              detail: batteryDetail,
              icon: Icons.battery_charging_full,
            ),
            _OverviewMetricData(
              label: 'Uptime',
              value:
                  statsCore == null
                      ? '—'
                      : _formatStatusUptime(statsCore.uptimeSecs),
              detail:
                  statsCore == null
                      ? 'A aguardar estatísticas'
                      : 'Fila TX ${statsCore.queueLen}',
              icon: Icons.schedule,
            ),
            _OverviewMetricData(
              label: 'Sinal',
              value: rfValue,
              detail: rfDetail,
              icon: Icons.signal_cellular_alt,
            ),
            _OverviewMetricData(
              label: 'Noise floor',
              value:
                  statsRadio == null
                      ? '—'
                      : '${statsRadio.noiseFloor} dBm',
              detail: 'Ruído de fundo RF',
              icon: Icons.noise_aware,
            ),
            _OverviewMetricData(
              label: 'Rádio',
              value: radioValue,
              detail: radioDetail,
              icon: Icons.settings_input_antenna,
            ),
            _OverviewMetricData(
              label: 'Potência TX',
              value:
                  radioConfig == null
                      ? '—'
                      : '${radioConfig.txPowerDbm} dBm',
              detail:
                  selfInfo?.maxTxPower == null
                      ? 'Limite —'
                      : 'Máx. ${selfInfo!.maxTxPower} dBm',
              icon: Icons.bolt,
            ),
            _OverviewMetricData(
              label: 'Repeater',
              value: deviceInfo == null ? '—' : (repeaterActive ? 'Ativo' : 'Inativo'),
              detail: deviceInfo == null ? 'A aguardar dispositivo' : (repeaterActive ? 'Modo Repeater' : 'Modo Companion'),
              icon: Icons.repeat,
            ),
            _OverviewMetricData(
              label: 'Protocolo / Path',
              value: protocolLabel,
              detail: 'Path hash $pathHashLabel',
              icon: Icons.alt_route,
            ),
            _OverviewMetricData(
              label: 'Capacidade',
              value: capacityValue,
              detail: capacityDetail,
              icon: Icons.people_alt_outlined,
            ),
            _OverviewMetricData(
              label: 'Storage',
              value: storageValue,
              detail: 'Memória persistente',
              icon: Icons.storage,
            ),
            _OverviewMetricData(
              label: 'Firmware',
              value: deviceInfo?.versionString ?? '—',
              detail: deviceInfo?.firmwareBuild?.isNotEmpty == true
                  ? deviceInfo!.firmwareBuild!
                  : 'A aguardar identificação',
              icon: Icons.system_update_alt,
            ),
            _OverviewMetricData(
              label: 'Hardware',
              value: deviceInfo?.model?.isNotEmpty == true
                  ? deviceInfo!.model!
                  : (deviceInfo?.deviceName ?? '—'),
              detail: selfInfo?.name?.isNotEmpty == true
                  ? selfInfo!.name
                  : 'HiveFW',
              icon: Icons.memory,
            ),
          ],
        ),
        const SizedBox(height: 20),

        _SectionHeader(
          label: context.l10n.telemetryBattery,
          icon: Icons.battery_charging_full,
        ),
        const SizedBox(height: 8),
        _BatteryCard(
          currentMv: effectiveBatteryMv,
          history: battHistoryRaw,
          theme: theme,
        ),
        const SizedBox(height: 20),

        _SectionHeader(
          key: _rfSectionKey,
          label: 'Rádio e RF',
          icon: Icons.cell_tower,
        ),
        const SizedBox(height: 8),
        _RadioRfStatsCard(stats: statsRadio, theme: theme),
        const SizedBox(height: 8),
        _RadioCoreStatsCard(stats: statsCore, theme: theme),
        const SizedBox(height: 20),

        _SectionHeader(
          label: 'Tráfego',
          icon: Icons.swap_horiz,
        ),
        const SizedBox(height: 8),
        _NetworkStatsCard(stats: stats, theme: theme),
        const SizedBox(height: 8),
        _RadioPacketStatsCard(stats: statsPackets, theme: theme),
        const SizedBox(height: 20),

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


class _OverviewMetricData {
  const _OverviewMetricData({
    required this.label,
    required this.value,
    required this.detail,
    required this.icon,
  });

  final String label;
  final String value;
  final String detail;
  final IconData icon;
}

class _OverviewGrid extends StatelessWidget {
  const _OverviewGrid({required this.items});

  final List<_OverviewMetricData> items;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final columns =
            constraints.maxWidth >= 900
                ? 4
                : constraints.maxWidth >= 600
                ? 3
                : 2;
        final spacing = 8.0;
        final width =
            (constraints.maxWidth - spacing * (columns - 1)) / columns;
        return Wrap(
          spacing: spacing,
          runSpacing: spacing,
          children: [
            for (final item in items)
              SizedBox(width: width, child: _OverviewMetric(item: item)),
          ],
        );
      },
    );
  }
}

class _OverviewMetric extends StatelessWidget {
  const _OverviewMetric({required this.item});

  final _OverviewMetricData item;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Card(
      margin: EdgeInsets.zero,
      child: SizedBox(
        height: 102,
        child: Padding(
          padding: const EdgeInsets.all(11),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Icon(item.icon, size: 19, color: theme.colorScheme.primary),
              const SizedBox(width: 8),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      item.label,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: theme.textTheme.labelSmall?.copyWith(
                        color: theme.colorScheme.onSurfaceVariant,
                      ),
                    ),
                    const SizedBox(height: 3),
                    Text(
                      item.value,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: theme.textTheme.titleSmall?.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 3),
                    Text(
                      item.detail,
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
        ),
      ),
    );
  }
}

