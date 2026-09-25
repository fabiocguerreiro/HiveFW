import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../l10n/l10n.dart';
import '../../protocol/protocol.dart';
import '../../providers/canned_messages_provider.dart';
import '../../providers/gps_sharing_provider.dart';
import '../../providers/radio_providers.dart';
import '../../providers/sos_settings_provider.dart';
import '../../services/gps_sharing_service.dart';
import '../../services/sos_service.dart';
import '../../transport/radio_transport.dart';

part 'parts/settings_canned_messages.dart';
part 'parts/settings_sos.dart';
part 'parts/settings_gps_sharing.dart';
part 'parts/settings_prune_config.dart';
part 'parts/settings_blocked_senders.dart';

/// Focused communication and safety settings.
///
/// General application preferences now live in the main "Definições" tab.
class SettingsScreen extends ConsumerWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: const [
          _CannedMessagesCard(),
          SizedBox(height: 16),
          _SosSettingsCard(),
          SizedBox(height: 16),
          _GpsSharingCard(),
          SizedBox(height: 16),
          _BlockedSendersCard(),
          SizedBox(height: 16),
          _PruneConfigCard(),
          SizedBox(height: 24),
        ],
      ),
    );
  }
}
