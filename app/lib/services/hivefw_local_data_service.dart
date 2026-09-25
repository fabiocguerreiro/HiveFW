import 'dart:async';
import 'dart:convert';
import 'dart:typed_data';

import '../protocol/protocol.dart';
import 'radio_service.dart';

class HiveFwNeighbour {
  const HiveFwNeighbour({
    required this.prefix,
    required this.ageSeconds,
    required this.snr,
  });

  final String prefix;
  final int ageSeconds;
  final int snr;
}

class HiveFwHaCommand {
  const HiveFwHaCommand({
    required this.name,
    required this.command,
    required this.flags,
  });

  final String name;
  final String command;
  final int flags;

  bool get includesLocation => (flags & 0x01) != 0;
}

class HiveFwLocalDataService {
  const HiveFwLocalDataService(this.radio);

  final RadioService radio;

  Future<CustomVarsResponse?> _requestVars(
    Future<void> Function() send, {
    Duration timeout = const Duration(seconds: 3),
  }) async {
    if (!radio.isConnected) return null;

    final completer = Completer<CustomVarsResponse?>();
    late StreamSubscription<CompanionResponse> sub;
    sub = radio.responses.listen((response) {
      if (!completer.isCompleted && response is CustomVarsResponse) {
        completer.complete(response);
      }
    });

    try {
      await send();
      return await completer.future.timeout(
        timeout,
        onTimeout: () => null,
      );
    } finally {
      await sub.cancel();
    }
  }

  Future<CustomVarsResponse?> readCustomVars() =>
      _requestVars(radio.requestHiveCustomVars);

  Future<int?> readAppsChannelIndex() async {
    final vars = await readCustomVars();
    if (vars == null) return null;
    final index = int.tryParse(vars['apps_channel'] ?? '');
    return index == null || index < 0 ? null : index;
  }

  /// Persist the Apps/SOS channel on the Companion and verify the value by
  /// reading it back. Pass null (or -1) to clear the configured APPS channel.
  Future<bool> writeAppsChannelIndex(int? index) async {
    if (!radio.isConnected) return false;
    final wanted = index == null || index < 0 ? -1 : index;

    final completer = Completer<CompanionResponse?>();
    late StreamSubscription<CompanionResponse> sub;
    sub = radio.responses.listen((response) {
      if (!completer.isCompleted &&
          (response is OkResponse || response is ErrorResponse)) {
        completer.complete(response);
      }
    });

    try {
      await radio.setHiveCustomVar('apps_channel', wanted.toString());
      final response = await completer.future.timeout(
        const Duration(seconds: 3),
        onTimeout: () => null,
      );
      if (response is! OkResponse) return false;

      final actual = await readAppsChannelIndex();
      return (actual ?? -1) == wanted;
    } finally {
      await sub.cancel();
    }
  }

  Future<List<HiveFwNeighbour>> readNeighbours() async {
    final rows = <HiveFwNeighbour>[];
    var offset = 0;
    var total = 0;

    do {
      final page = await _requestVars(
        () => radio.requestHiveNeighbours(offset: offset),
      );
      if (page == null) break;

      total = int.tryParse(page['nbr_total'] ?? '') ?? 0;
      final count = int.tryParse(page['nbr_count'] ?? '') ?? 0;

      for (var i = 0; i < count; i++) {
        final raw = page['n$i'];
        if (raw == null) continue;
        final parts = raw.split('|');
        if (parts.length < 3) continue;
        rows.add(
          HiveFwNeighbour(
            prefix: parts[0].trim().toUpperCase(),
            ageSeconds: int.tryParse(parts[1]) ?? 0,
            snr: int.tryParse(parts[2]) ?? 0,
          ),
        );
      }

      offset += count;
      if (count == 0) break;
    } while (offset < total);

    return rows;
  }

  Future<List<HiveFwHaCommand>> readHaCommands() async {
    final rows = <HiveFwHaCommand>[];
    var offset = 0;
    var total = 0;

    do {
      final page = await _requestVars(
        () => radio.requestHiveHaCommands(offset: offset),
      );
      if (page == null) break;

      total = int.tryParse(page['ha_total'] ?? '') ?? 0;
      final count = int.tryParse(page['ha_count'] ?? '') ?? 0;

      if (count > 0) {
        final raw = page['h0'];
        if (raw != null) {
          final parts = raw.split('|');
          if (parts.length >= 3) {
            final name = _decodeHexUtf8(parts[0]);
            final command = _decodeHexUtf8(parts[1]);
            final flags = int.tryParse(parts[2]) ?? 0;
            if (name.isNotEmpty && command.isNotEmpty) {
              rows.add(
                HiveFwHaCommand(
                  name: name,
                  command: command,
                  flags: flags,
                ),
              );
            }
          }
        }
      }

      offset += count;
      if (count == 0) break;
    } while (offset < total);

    return rows;
  }

  static String _decodeHexUtf8(String hex) {
    final value = hex.trim();
    if (value.isEmpty || value.length.isOdd) return '';
    if (!RegExp(r'^[0-9A-Fa-f]+$').hasMatch(value)) return '';

    final bytes = Uint8List(value.length ~/ 2);
    for (var i = 0; i < bytes.length; i++) {
      bytes[i] = int.parse(value.substring(i * 2, i * 2 + 2), radix: 16);
    }
    return utf8.decode(bytes, allowMalformed: true).trim();
  }
}
