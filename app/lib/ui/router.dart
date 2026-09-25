import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../config/feature_toggles.dart';
import '../protocol/protocol.dart';
import '../providers/radio_providers.dart';

import 'screens/apps_screen.dart';
import 'screens/connect_screen.dart';
import 'screens/home_screen.dart';
import 'screens/channels_list_screen.dart';
import 'screens/channel_chat_screen.dart';
import 'screens/map_screen.dart';
import 'screens/private_chat_screen.dart';
import 'screens/radio_settings_screen.dart';
import 'screens/contacts_screen.dart';
import 'screens/room_screen.dart';
import 'screens/settings_screen.dart';
import 'screens/hivefw_device_screen.dart';
import 'screens/hivefw_neighbours_screen.dart';
import 'screens/repeater_discovery_screen.dart';
import 'screens/hivefw_home_assistant_screen.dart';
import 'screens/hivefw_acl_screen.dart';
import 'screens/hivefw_regions_screen.dart';
import 'screens/hivefw_backup_screen.dart';
import 'screens/hivefw_repeater_settings_screen.dart';
import 'screens/hivefw_radio_network_screen.dart';
import 'apps/telemetry/telemetry_screen.dart';
import 'screens/discover_contacts_screen.dart';
import 'apps/noise_floor/noise_floor_screen.dart';
import 'apps/rx_log/rx_log_screen.dart';
import 'apps/topology/topology_screen.dart';
import 'apps/data_export/data_export_screen.dart';
import 'screens/repeater_screen.dart';

final rootNavigatorKey = GlobalKey<NavigatorState>();

final routerProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    navigatorKey: rootNavigatorKey,
    initialLocation: '/connect',
    // Widget click intents arrive as `hivefw-widget://...` URIs and would
    // otherwise hit GoRouter's "no route" page. The actual action is handled
    // by `WidgetService.registerClickHandlers()` listening on the
    // `HomeWidget.widgetClicked` stream, so we only need to neutralise the
    // navigation side-effect here.
    redirect: (context, state) {
      final loc = state.matchedLocation;
      if (loc.startsWith('hivefw-widget') ||
          state.uri.scheme == 'hivefw-widget') {
        // Land on the channels list — a stable, always-available shell
        // route. The widget action handler in main.dart will then re-route
        // to the right destination (chats / map / connect / etc.).
        return '/channels';
      }
      return null;
    },
    routes: [
      GoRoute(
        path: '/connect',
        builder: (context, state) => const ConnectScreen(),
      ),
      StatefulShellRoute.indexedStack(
        builder: (context, state, navigationShell) {
          return HomeScreen(
            navigationShell: navigationShell,
            currentPath: state.uri.path,
          );
        },
        branches: [
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/channels',
                builder: (context, state) => const ChannelsListScreen(),
                routes: [
                  GoRoute(
                    path: ':index',
                    builder: (context, state) {
                      final index = int.parse(state.pathParameters['index']!);
                      return ChannelChatScreen(channelIndex: index);
                    },
                  ),
                ],
              ),
            ],
          ),
          StatefulShellBranch(
            preload: true,
            routes: [
              GoRoute(
                path: '/contacts',
                builder: (context, state) => const ContactsScreen(),
              ),
              GoRoute(
                path: '/discover',
                builder: (context, state) => const DiscoverContactsScreen(),
              ),
              GoRoute(
                path: '/chat/:keyHex',
                builder: (context, state) {
                  final keyHex = state.pathParameters['keyHex']!;
                  return PrivateChatScreen(contactKeyHex: keyHex);
                },
              ),
              GoRoute(
                path: '/room/:keyHex',
                builder: (context, state) {
                  final keyHex = state.pathParameters['keyHex']!;
                  return RoomScreen(contactKeyHex: keyHex);
                },
              ),
              GoRoute(
                path: '/repeater/:keyHex',
                builder: (context, state) {
                  final keyHex = state.pathParameters['keyHex']!;
                  return RepeaterScreen(contactKeyHex: keyHex);
                },
              ),
            ],
          ),
          StatefulShellBranch(
            preload: true,
            routes: [
              GoRoute(
                path: '/map',
                builder: (context, state) => const MapScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            preload: true,
            routes: [
              GoRoute(
                path: '/apps',
                builder: (context, state) => const AppsScreen(),
              ),
              GoRoute(
                path: '/apps/discovery',
                builder: (context, state) => const RepeaterDiscoveryScreen(),
              ),
              GoRoute(
                path: '/apps/homeassistant',
                builder: (context, state) => const HiveFwHomeAssistantScreen(),
              ),
              if (FeatureToggles.appTelemetry)
                GoRoute(
                  path: '/apps/telemetry',
                  builder: (context, state) => const TelemetryScreen(),
                ),
              if (FeatureToggles.appRxLog)
                GoRoute(
                  path: '/apps/rxlog',
                  builder: (context, state) => const RxLogScreen(),
                ),
              if (FeatureToggles.appNoiseFloor)
                GoRoute(
                  path: '/apps/noisefloor',
                  builder: (context, state) => const NoiseFloorScreen(),
                ),
              if (FeatureToggles.appTopology)
                GoRoute(
                  path: '/apps/topology',
                  builder: (context, state) => const TopologyScreen(),
                ),
              if (FeatureToggles.appDataExport)
                GoRoute(
                  path: '/apps/dataexport',
                  builder: (context, state) => const DataExportScreen(),
                ),
            ],
          ),
          StatefulShellBranch(
            preload: true,
            routes: [
              GoRoute(
                path: '/settings',
                builder: (context, state) => const HiveFwDeviceScreen(),
              ),
              GoRoute(
                path: '/settings/app',
                builder: (context, state) => const SettingsScreen(),
              ),
              GoRoute(
                path: '/settings/radio',
                builder: (context, state) => const RadioSettingsScreen(),
              ),
            ],
          ),
        ],
      ),
      GoRoute(
        path: '/hivefw/radio-network',
        builder: (context, state) => const HiveFwRadioNetworkScreen(),
      ),
      GoRoute(
        path: '/hivefw/repeater-settings',
        builder: (context, state) => const _LocalRepeaterGate(
          child: HiveFwRepeaterSettingsScreen(),
        ),
      ),
      GoRoute(
        path: '/hivefw/neighbours',
        builder: (context, state) => const _LocalRepeaterGate(
          child: HiveFwNeighboursScreen(),
        ),
      ),
      GoRoute(
        path: '/hivefw/acl',
        builder: (context, state) => const _LocalRepeaterGate(
          child: HiveFwAclScreen(),
        ),
      ),
      GoRoute(
        path: '/hivefw/regions',
        builder: (context, state) => const _LocalRepeaterGate(
          child: HiveFwRegionsScreen(),
        ),
      ),
      GoRoute(
        path: '/hivefw/backup',
        builder: (context, state) => const HiveFwBackupScreen(),
      ),
    ],
  );
});


class _LocalRepeaterGate extends ConsumerWidget {
  const _LocalRepeaterGate({required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final info = ref.watch(deviceInfoProvider);
    final self = ref.watch(selfInfoProvider);
    final repeatActive =
        (info?.clientRepeat ?? 0) != 0 || self?.advType == advTypeRepeater;

    if (repeatActive) return child;

    return Scaffold(
      appBar: AppBar(title: const Text('HiveFW')),
      body: const Center(
        child: Padding(
          padding: EdgeInsets.all(24),
          child: Text(
            'Esta função só está disponível quando o modo Repeater está ativo.',
            textAlign: TextAlign.center,
          ),
        ),
      ),
    );
  }
}
