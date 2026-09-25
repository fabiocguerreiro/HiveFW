part of '../radio_providers.dart';

/// Backup / restore operations shared by the HiveFW Companion UI.
///
/// The JSON shapes intentionally match the formats already used by the HiveFW
/// Home Assistant integration so files can move between both clients.
extension HiveFwBackupRestore on ConnectionNotifier {
  Future<CompanionResponse?> _backupWait(
    RadioService service,
    Future<void> Function() send,
    bool Function(CompanionResponse) accept, {
    Duration timeout = const Duration(seconds: 5),
  }) {
    return _sendAndWait(service, send, accept, timeout: timeout);
  }

  Future<void> _backupRequireOk(
    RadioService service,
    Future<void> Function() send,
    String label,
  ) async {
    final response = await _backupWait(
      service,
      send,
      (r) => r is OkResponse || r is ErrorResponse,
    );
    if (response is! OkResponse) {
      throw StateError('$label rejected by firmware');
    }
  }

  Future<CustomVarsResponse> _backupRequireVars(
    RadioService service,
    Future<void> Function() send,
    String label,
  ) async {
    final response = await _backupWait(
      service,
      send,
      (r) => r is CustomVarsResponse,
    );
    if (response is! CustomVarsResponse) {
      throw StateError('$label unavailable');
    }
    return response;
  }

  static String _backupHex(Uint8List bytes) =>
      bytes.map((b) => b.toRadixString(16).padLeft(2, '0')).join();

  static Uint8List? _backupHexBytes(String value, {int? length}) {
    final clean = value.trim().replaceAll(RegExp(r'\s+'), '').toLowerCase();
    if (clean.isEmpty ||
        clean.length.isOdd ||
        !RegExp(r'^[0-9a-f]+$').hasMatch(clean)) {
      return null;
    }
    final out = Uint8List(clean.length ~/ 2);
    if (length != null && out.length != length) return null;
    for (var i = 0; i < out.length; i++) {
      out[i] = int.parse(clean.substring(i * 2, i * 2 + 2), radix: 16);
    }
    return out;
  }

  static Map<String, dynamic> _backupMap(dynamic value) =>
      value is Map
          ? value.map((key, val) => MapEntry(key.toString(), val))
          : <String, dynamic>{};

  static int _backupInt(dynamic value, [int fallback = 0]) {
    if (value is int) return value;
    if (value is num) return value.round();
    return int.tryParse(value?.toString() ?? '') ?? fallback;
  }

  static double _backupDouble(dynamic value, [double fallback = 0]) {
    if (value is num) return value.toDouble();
    return double.tryParse(value?.toString() ?? '') ?? fallback;
  }

  static bool _backupBool(dynamic value, [bool fallback = false]) {
    if (value is bool) return value;
    final raw = value?.toString().trim().toLowerCase();
    if (raw == '1' || raw == 'true' || raw == 'on' || raw == 'yes') {
      return true;
    }
    if (raw == '0' || raw == 'false' || raw == 'off' || raw == 'no') {
      return false;
    }
    return fallback;
  }

  static String _backupCoord(double? value) =>
      (value ?? 0).toStringAsFixed(6);

  /// Refresh the authoritative radio-side contacts/channels before exporting.
  Future<void> refreshRadioSnapshotForBackup() async {
    final service = _ref.read(radioServiceProvider);
    if (service == null || !service.isConnected) {
      throw StateError('HiveFW Companion is not connected');
    }
    await _fetchInitialData(service);
  }

  /// Export the standard Companion identity/radio/channel/contact backup.
  Future<Map<String, dynamic>> exportCompanionBackup() async {
    final service = _ref.read(radioServiceProvider);
    if (service == null || !service.isConnected) {
      throw StateError('HiveFW Companion is not connected');
    }

    await _fetchInitialData(service);

    final self = _ref.read(selfInfoProvider);
    if (self == null) throw StateError('Companion identity is unavailable');

    final privateKey = await exportPrivateKey();
    if (privateKey == null) {
      throw StateError(
        'Private-key export is disabled or unavailable in this firmware',
      );
    }

    final autoResponse = await _backupWait(
      service,
      service.requestAutoAddConfig,
      (r) => r is AutoAddConfigResponse,
    );
    if (autoResponse is! AutoAddConfigResponse) {
      throw StateError('Auto-add configuration is unavailable');
    }
    final autoMask = autoResponse.bitmask;
    final autoMaxHops = autoResponse.maxHops;

    final channels =
        _ref
            .read(channelsProvider)
            .where(
              (channel) =>
                  !channel.isEmpty &&
                  channel.secret != null &&
                  channel.secret!.length == 16,
            )
            .map(
              (channel) => <String, dynamic>{
                'name': channel.name,
                'secret': _backupHex(channel.secret!),
                'region_scope_name': null,
                'region_scope_key': null,
              },
            )
            .toList();

    final contacts =
        _ref
            .read(contactsProvider)
            .where((contact) => contact.publicKey.length == 32)
            .map(
              (contact) => <String, dynamic>{
                'type': contact.type,
                'name': contact.name,
                'custom_name': contact.customName,
                'public_key': _backupHex(contact.publicKey),
                'flags': contact.flags,
                'latitude': _backupCoord(contact.latitude),
                'longitude': _backupCoord(contact.longitude),
                'last_advert': contact.lastAdvertTimestamp,
                'last_modified':
                    contact.lastModified ?? contact.lastAdvertTimestamp,
                'out_path_list': null,
              },
            )
            .toList();

    return <String, dynamic>{
      'name': self.name,
      'public_key': _backupHex(self.publicKey),
      'private_key': privateKey,
      'radio_settings': <String, dynamic>{
        'frequency': self.radioConfig.frequencyHz,
        'bandwidth': self.radioConfig.bandwidthHz,
        'spreading_factor': self.radioConfig.spreadingFactor,
        'coding_rate': self.radioConfig.codingRate,
        'tx_power': self.txPower,
      },
      'position_settings': <String, dynamic>{
        'latitude': _backupCoord(self.latitude),
        'longitude': _backupCoord(self.longitude),
      },
      'other_settings': <String, dynamic>{
        'manual_add_contacts': (self.manualAddContacts ?? 0) != 0 ? 1 : 0,
        'advert_location_policy': self.advLocPolicy ?? 0,
      },
      'auto_add_settings': <String, dynamic>{
        'auto_add_chat': (autoMask & autoAddChat) != 0,
        'auto_add_repeater': (autoMask & autoAddRepeater) != 0,
        'auto_add_room_server': (autoMask & autoAddRoom) != 0,
        'auto_add_sensor': (autoMask & autoAddSensor) != 0,
        'overwrite_oldest': (autoMask & autoAddOverwriteOldest) != 0,
        'auto_add_max_hops': autoMaxHops,
      },
      'channels': channels,
      'contacts': contacts,
    };
  }

  /// Restore a MeshCore/HiveFW Companion backup.
  ///
  /// Repeater enable state is deliberately preserved from the radio currently
  /// connected; importing a normal Companion backup must never disable a
  /// HiveFW Repeater by accident.
  Future<Map<String, dynamic>> restoreCompanionBackup(
    Map<String, dynamic> backup,
  ) async {
    final required = <String>{
      'name',
      'public_key',
      'private_key',
      'radio_settings',
      'position_settings',
      'other_settings',
      'auto_add_settings',
      'channels',
      'contacts',
    };
    final missing = required.where((key) => !backup.containsKey(key)).toList();
    if (missing.isNotEmpty) {
      throw ArgumentError('Missing backup sections: ${missing.join(', ')}');
    }

    final rawChannels = backup['channels'];
    final rawContacts = backup['contacts'];
    if (rawChannels is! List || rawContacts is! List) {
      throw ArgumentError('channels and contacts must be arrays');
    }

    final service = _ref.read(radioServiceProvider);
    if (service == null || !service.isConnected) {
      throw StateError('HiveFW Companion is not connected');
    }

    await _fetchInitialData(service);

    final currentSelf = _ref.read(selfInfoProvider);
    final currentInfo = _ref.read(deviceInfoProvider);
    if (currentSelf == null) throw StateError('Current Companion state missing');
    final repeatEnabled = (currentInfo?.clientRepeat ?? 0) != 0;

    final newName = backup['name']?.toString() ?? '';
    await _backupRequireOk(
      service,
      () => service.setAdvertName(
        newName.length > 31 ? newName.substring(0, 31) : newName,
      ),
      'device name',
    );

    final position = _backupMap(backup['position_settings']);
    await _backupRequireOk(
      service,
      () => service.setLocation(
        _backupDouble(position['latitude']),
        _backupDouble(position['longitude']),
      ),
      'position',
    );

    final radio = _backupMap(backup['radio_settings']);
    var frequency = _backupInt(radio['frequency']);
    var bandwidth = _backupInt(radio['bandwidth']);
    // Accept both the HiveFW/MeshCore backup units and accidental Hz values.
    if (frequency > 10000000) frequency = (frequency / 1000).round();
    if (bandwidth > 1000000) bandwidth = (bandwidth / 1000).round();
    if (bandwidth > 0 && bandwidth < 1000) bandwidth *= 1000;

    final restoredRadio = RadioConfig(
      frequencyHz: frequency,
      bandwidthHz: bandwidth,
      spreadingFactor: _backupInt(radio['spreading_factor']),
      codingRate: _backupInt(radio['coding_rate']),
      txPowerDbm: _backupInt(radio['tx_power'], currentSelf.txPower),
    );
    await _backupRequireOk(
      service,
      () => service.setRadioParams(restoredRadio, repeat: repeatEnabled),
      'radio settings',
    );
    await _backupRequireOk(
      service,
      () => service.setTxPower(restoredRadio.txPowerDbm),
      'TX power',
    );

    final other = _backupMap(backup['other_settings']);
    await _backupRequireOk(
      service,
      () => service.setOtherParams(
        manualAddContacts: _backupInt(other['manual_add_contacts']),
        telemetryMode: currentSelf.telemetryMode ?? 0,
        advLocPolicy: _backupInt(other['advert_location_policy']),
        multiAcks: currentSelf.multiAcks ?? 0,
      ),
      'other settings',
    );

    final auto = _backupMap(backup['auto_add_settings']);
    var autoMask = 0;
    if (_backupBool(auto['overwrite_oldest'])) {
      autoMask |= autoAddOverwriteOldest;
    }
    if (_backupBool(auto['auto_add_chat'])) autoMask |= autoAddChat;
    if (_backupBool(auto['auto_add_repeater'])) autoMask |= autoAddRepeater;
    if (_backupBool(auto['auto_add_room_server'])) autoMask |= autoAddRoom;
    if (_backupBool(auto['auto_add_sensor'])) autoMask |= autoAddSensor;
    final autoHops =
        _backupInt(auto['auto_add_max_hops']).clamp(0, 64).toInt();
    await _backupRequireOk(
      service,
      () => service.setAutoAddConfig(autoMask, autoHops),
      'auto-add settings',
    );

    final maxChannels =
        service.deviceInfo?.maxChannels ?? currentInfo?.maxChannels ?? 8;
    final zeroSecret = Uint8List(16);
    for (var index = 0; index < maxChannels; index++) {
      await _backupRequireOk(
        service,
        () => service.setChannel(index, '', zeroSecret),
        'clear channel $index',
      );
    }

    var restoredChannels = 0;
    for (var index = 0;
        index < rawChannels.length && index < maxChannels;
        index++) {
      final row = _backupMap(rawChannels[index]);
      final name = row['name']?.toString() ?? '';
      final secret = _backupHexBytes(
        row['secret']?.toString() ?? '',
        length: 16,
      );
      if (name.isEmpty || secret == null) continue;
      await _backupRequireOk(
        service,
        () => service.setChannel(index, name, secret),
        'channel $index',
      );
      restoredChannels++;
    }

    final currentContacts = List<Contact>.from(_ref.read(contactsProvider));
    for (final contact in currentContacts) {
      await _backupRequireOk(
        service,
        () => service.removeContact(contact.publicKey),
        'remove contact ${contact.shortId}',
      );
    }

    var restoredContacts = 0;
    var invalidContacts = 0;
    for (final raw in rawContacts) {
      final row = _backupMap(raw);
      final publicKey = _backupHexBytes(
        row['public_key']?.toString() ?? '',
        length: 32,
      );
      if (publicKey == null) {
        invalidContacts++;
        continue;
      }
      final contact = Contact(
        publicKey: publicKey,
        type: _backupInt(row['type'], 1),
        flags: _backupInt(row['flags']),
        pathLen: 0xFF,
        name: row['name']?.toString() ?? '',
        lastAdvertTimestamp: _backupInt(row['last_advert']),
        latitude: double.tryParse(row['latitude']?.toString() ?? ''),
        longitude: double.tryParse(row['longitude']?.toString() ?? ''),
        lastModified: _backupInt(
          row['last_modified'],
          _backupInt(row['last_advert']),
        ),
        customName:
            (row['custom_name']?.toString().trim().isNotEmpty ?? false)
                ? row['custom_name'].toString()
                : null,
      );
      await _backupRequireOk(
        service,
        () => service.addUpdateContact(contact),
        'contact ${contact.shortId}',
      );
      restoredContacts++;
    }

    final expectedPublic =
        backup['public_key']?.toString().trim().toLowerCase() ?? '';
    final currentPublic = _backupHex(currentSelf.publicKey);
    var identityChanged = false;
    if (expectedPublic.isNotEmpty && expectedPublic != currentPublic) {
      final privateKey = backup['private_key']?.toString() ?? '';
      if (!await importPrivateKey(privateKey)) {
        throw StateError('Firmware rejected the backup private key');
      }
      identityChanged = true;
    }

    await _fetchInitialData(service);
    return <String, dynamic>{
      'success': true,
      'channels': restoredChannels,
      'contacts': restoredContacts,
      'invalid_contacts': invalidContacts,
      'identity_changed': identityChanged,
      'repeat_preserved': repeatEnabled,
    };
  }

  Future<List<Map<String, dynamic>>> _backupReadAcl(
    RadioService service,
    int count,
  ) async {
    final entries = <Map<String, dynamic>>[];
    final safeCount = count.clamp(0, 20).toInt();
    for (var index = 0; index < safeCount; index++) {
      final row = await _backupRequireVars(
        service,
        () => service.requestRepeaterAclEntry(index),
        'ACL entry $index',
      );
      final key = row['key']?.trim().toLowerCase() ?? '';
      final permissions = row.intValue('perm') ?? -1;
      if (key.length != 64 ||
          !RegExp(r'^[0-9a-f]{64}$').hasMatch(key) ||
          permissions < 1 ||
          permissions > 3) {
        throw StateError('Invalid ACL response at index $index');
      }
      entries.add(<String, dynamic>{
        'public_key': key,
        'permissions': permissions,
        'last_activity': row.intValue('last') ?? 0,
      });
    }
    return entries;
  }

  Future<Map<String, dynamic>> _backupReadRegions(
    RadioService service,
  ) async {
    final entries = <Map<String, dynamic>>[];
    int? total;
    for (var index = 0; index < 33; index++) {
      final row = await _backupRequireVars(
        service,
        () => service.requestRepeaterRegion(index),
        'RegionMap entry $index',
      );
      final returnedIndex = row.intValue('idx') ?? -1;
      final returnedTotal = row.intValue('total') ?? -1;
      final name = row['name'] ?? '';
      if (returnedIndex != index ||
          returnedTotal < 1 ||
          returnedTotal > 33 ||
          name.isEmpty) {
        throw StateError('Invalid RegionMap response');
      }
      total ??= returnedTotal;
      if (total != returnedTotal) {
        throw StateError('RegionMap changed while being read');
      }

      entries.add(<String, dynamic>{
        'index': returnedIndex,
        'name': name,
        'parent': (row['parent'] ?? '').isEmpty ? null : row['parent'],
        'allow_flood': row['allow'] == '1',
        'home': row['home'] == '1',
        'default': row['default'] == '1',
      });
      if (entries.length >= total) break;
    }

    if (total == null || entries.length != total) {
      throw StateError('Incomplete RegionMap response');
    }

    String? home;
    String? defaultRegion;
    for (final entry in entries) {
      if (entry['home'] == true) home = entry['name']?.toString();
      if (entry['default'] == true) {
        defaultRegion = entry['name']?.toString();
      }
    }

    return <String, dynamic>{
      'supported': true,
      'count': entries.length,
      'home': home,
      'default': defaultRegion,
      'regions': entries,
    };
  }

  /// Export HiveFW Repeater-only state. Passwords are never exported.
  Future<Map<String, dynamic>> exportRepeaterBackup() async {
    final service = _ref.read(radioServiceProvider);
    if (service == null || !service.isConnected) {
      throw StateError('HiveFW Companion is not connected');
    }

    await _fetchInitialData(service);

    final self = _ref.read(selfInfoProvider);
    final info = _ref.read(deviceInfoProvider);
    if (self == null) throw StateError('Companion identity is unavailable');

    final custom = await _backupRequireVars(
      service,
      service.requestHiveCustomVars,
      'HiveFW custom variables',
    );
    final profileOwner = await _backupRequireVars(
      service,
      () => service.requestRepeaterProfile(0),
      'Repeater owner profile',
    );
    final profileRadio = await _backupRequireVars(
      service,
      () => service.requestRepeaterProfile(1),
      'Repeater radio profile',
    );
    final rf = await _backupRequireVars(
      service,
      service.requestRepeaterRfConfig,
      'Repeater RF guard',
    );
    final auth = await _backupRequireVars(
      service,
      service.requestRepeaterAuthConfig,
      'Repeater access state',
    );

    final aclCount = auth.intValue('acl') ?? 0;
    final acl = await _backupReadAcl(service, aclCount);
    final regions = await _backupReadRegions(service);

    String ownerInfo = '';
    final ownerEncoded = profileOwner['owner'] ?? '';
    if (ownerEncoded.isNotEmpty) {
      try {
        ownerInfo = utf8.decode(
          base64Decode(ownerEncoded),
          allowMalformed: true,
        );
      } catch (_) {
        ownerInfo = ownerEncoded;
      }
    }

    final routeParts =
        (custom['route'] ?? '')
            .split('/')
            .map((part) => int.tryParse(part))
            .toList();
    if (routeParts.length != 4 || routeParts.any((value) => value == null)) {
      throw StateError('Firmware returned invalid Repeater routing state');
    }

    final adcMilli = profileRadio.intValue('adc_m') ?? -1;
    if (adcMilli < 0 || adcMilli > 10000) {
      throw StateError('Firmware returned invalid ADC multiplier');
    }

    return <String, dynamic>{
      'format': 'hivefw_repeater_backup',
      'schema': 1,
      'created_at': DateTime.now().millisecondsSinceEpoch ~/ 1000,
      'device_name': self.name,
      'repeater': <String, dynamic>{
        'enabled': (info?.clientRepeat ?? 0) != 0,
        'owner_info': ownerInfo,
        'rx_boosted_gain': profileRadio['rxg'] == '1',
        'adc_multiplier': adcMilli / 1000.0,
        'path_hash_mode': info?.pathHashMode ?? 0,
        'multi_acks': self.multiAcks ?? 0,
        'auto_advert': custom['auto_advert'] == '1',
        'mesh_time_sync': custom['mt'] == '1',
        'duty_cycle': int.tryParse(custom['duty_cycle'] ?? ''),
        'routing': <String, dynamic>{
          'flood_max': routeParts[0],
          'flood_max_unscoped': routeParts[1],
          'flood_max_advert': routeParts[2],
          'loop_detect': routeParts[3],
        },
        'radio_guard': <String, dynamic>{
          'cad_enabled': rf['cad'] == '1',
          'interference_threshold': rf.intValue('int_thr') ?? 0,
          'agc_reset_interval': rf.intValue('agc_s') ?? 0,
          'rx_delay': (rf.intValue('rx_m') ?? 0) / 1000.0,
          'flood_tx_delay': (rf.intValue('f_tx_m') ?? 0) / 1000.0,
          'direct_tx_delay': (rf.intValue('d_tx_m') ?? 0) / 1000.0,
        },
        'access': <String, dynamic>{
          'admin_password_set': auth['adm'] == '1',
          'guest_password_set': auth['gst'] == '1',
          'passwords_exported': false,
          'acl':
              acl
                  .map(
                    (entry) => <String, dynamic>{
                      'public_key': entry['public_key'],
                      'permissions': entry['permissions'],
                    },
                  )
                  .toList(),
        },
        'regions': regions,
      },
    };
  }

  Future<void> _backupRestoreRegions(
    RadioService service,
    Map<String, dynamic> regions,
  ) async {
    final current = await _backupReadRegions(service);
    final currentRows =
        (current['regions'] as List)
            .map((row) => _backupMap(row))
            .toList()
            .reversed;

    for (final row in currentRows) {
      final name = row['name']?.toString() ?? '';
      if (name.isEmpty || name == '*') continue;
      await _backupRequireOk(
        service,
        () => service.mutateRepeaterRegion(2, name: name),
        'remove region $name',
      );
    }

    final wanted =
        (regions['regions'] is List ? regions['regions'] as List : const [])
            .map((row) => _backupMap(row))
            .toList();

    Map<String, dynamic>? wildcard;
    for (final row in wanted) {
      if (row['name']?.toString() == '*') {
        wildcard = row;
        break;
      }
    }
    if (wildcard != null) {
      final op = _backupBool(wildcard['allow_flood'], true) ? 3 : 4;
      await _backupRequireOk(
        service,
        () => service.mutateRepeaterRegion(op, name: '*'),
        'restore wildcard region',
      );
    }

    final pending =
        wanted
            .where((row) {
              final name = row['name']?.toString() ?? '';
              return name.isNotEmpty && name != '*';
            })
            .map((row) => Map<String, dynamic>.from(row))
            .toList();
    final created = <String>{'*'};

    while (pending.isNotEmpty) {
      var progress = false;
      for (final row in List<Map<String, dynamic>>.from(pending)) {
        final name = row['name']?.toString() ?? '';
        final parent =
            (row['parent']?.toString().trim().isNotEmpty ?? false)
                ? row['parent'].toString()
                : '*';
        if (!created.contains(parent)) continue;

        await _backupRequireOk(
          service,
          () => service.mutateRepeaterRegion(
            1,
            name: name,
            parent: parent,
          ),
          'restore region $name',
        );
        created.add(name);
        pending.remove(row);
        progress = true;
      }
      if (!progress) {
        throw StateError('RegionMap backup has a missing/cyclic parent');
      }
    }

    for (final row in wanted) {
      final name = row['name']?.toString() ?? '';
      if (name.isEmpty) continue;
      final op = _backupBool(row['allow_flood'], true) ? 3 : 4;
      await _backupRequireOk(
        service,
        () => service.mutateRepeaterRegion(op, name: name),
        'restore flood policy for $name',
      );
    }

    final home = regions['home']?.toString().trim() ?? '';
    if (home.isNotEmpty) {
      await _backupRequireOk(
        service,
        () => service.mutateRepeaterRegion(5, name: home),
        'restore HOME region',
      );
    }

    final defaultRegion = regions['default']?.toString().trim() ?? '';
    if (defaultRegion.isNotEmpty) {
      await _backupRequireOk(
        service,
        () => service.mutateRepeaterRegion(6, name: defaultRegion),
        'restore DEFAULT region',
      );
    } else {
      await _backupRequireOk(
        service,
        () => service.mutateRepeaterRegion(7),
        'clear DEFAULT region',
      );
    }

    await _backupRequireOk(
      service,
      () => service.mutateRepeaterRegion(0),
      'save RegionMap',
    );
  }

  /// Restore a HiveFW Repeater-only backup without touching Admin/Guest
  /// passwords.
  Future<Map<String, dynamic>> restoreRepeaterBackup(
    Map<String, dynamic> backup,
  ) async {
    if (backup['format'] != 'hivefw_repeater_backup') {
      throw ArgumentError('Not a HiveFW Repeater backup');
    }
    final repeater = _backupMap(backup['repeater']);
    if (repeater.isEmpty) {
      throw ArgumentError('Missing Repeater backup section');
    }

    final service = _ref.read(radioServiceProvider);
    if (service == null || !service.isConnected) {
      throw StateError('HiveFW Companion is not connected');
    }

    await _fetchInitialData(service);

    final self = _ref.read(selfInfoProvider);
    final radio = _ref.read(radioConfigProvider);
    if (self == null || radio == null) {
      throw StateError('Current Companion radio state unavailable');
    }

    await _backupRequireOk(
      service,
      () => service.setRadioParams(
        radio,
        repeat: _backupBool(repeater['enabled']),
      ),
      'Repeater mode',
    );

    if (repeater.containsKey('path_hash_mode')) {
      await _backupRequireOk(
        service,
        () => service.setPathHashMode(
          _backupInt(repeater['path_hash_mode']).clamp(0, 2).toInt(),
        ),
        'Path Hash',
      );
    }

    if (repeater.containsKey('multi_acks')) {
      await _backupRequireOk(
        service,
        () => service.setOtherParams(
          manualAddContacts: self.manualAddContacts ?? 0,
          telemetryMode: self.telemetryMode ?? 0,
          advLocPolicy: self.advLocPolicy ?? 0,
          multiAcks: _backupInt(repeater['multi_acks']),
        ),
        'Multi ACK',
      );
    }

    final scalarVars = <(String, String)>[
      (
        'auto_advert',
        _backupBool(repeater['auto_advert']) ? '1' : '0',
      ),
      (
        'mt',
        _backupBool(repeater['mesh_time_sync']) ? '1' : '0',
      ),
      ('owner', repeater['owner_info']?.toString() ?? ''),
      (
        'rxg',
        _backupBool(repeater['rx_boosted_gain']) ? '1' : '0',
      ),
      (
        'adc_m',
        (_backupDouble(repeater['adc_multiplier']) * 1000).round().toString(),
      ),
    ];
    if (repeater['duty_cycle'] != null) {
      scalarVars.add(
        ('duty_cycle', _backupInt(repeater['duty_cycle']).toString()),
      );
    }

    final routing = _backupMap(repeater['routing']);
    scalarVars.add((
      'route',
      [
        _backupInt(routing['flood_max']),
        _backupInt(routing['flood_max_unscoped']),
        _backupInt(routing['flood_max_advert']),
        _backupInt(routing['loop_detect']),
      ].join('/'),
    ));

    final rf = _backupMap(repeater['radio_guard']);
    scalarVars.addAll(<(String, String)>[
      ('cad', _backupBool(rf['cad_enabled']) ? '1' : '0'),
      ('int_thr', _backupInt(rf['interference_threshold']).toString()),
      ('agc_s', _backupInt(rf['agc_reset_interval']).toString()),
      ('rxdelay', _backupDouble(rf['rx_delay']).toString()),
      ('f_txdelay', _backupDouble(rf['flood_tx_delay']).toString()),
      ('d_txdelay', _backupDouble(rf['direct_tx_delay']).toString()),
    ]);

    for (final item in scalarVars) {
      await _backupRequireOk(
        service,
        () => service.setHiveCustomVar(item.$1, item.$2),
        'restore ${item.$1}',
      );
    }

    await _backupRequireOk(
      service,
      () => service.setHiveCustomVar('acl_clear', '1'),
      'clear ACL',
    );

    final access = _backupMap(repeater['access']);
    final aclRows = access['acl'] is List ? access['acl'] as List : const [];
    var restoredAcl = 0;
    for (final raw in aclRows) {
      final row = _backupMap(raw);
      final key = _backupHexBytes(
        row['public_key']?.toString() ?? '',
        length: 32,
      );
      final permissions = _backupInt(row['permissions']);
      if (key == null || permissions < 1 || permissions > 3) {
        throw ArgumentError('Repeater backup contains an invalid ACL entry');
      }
      await _backupRequireOk(
        service,
        () => service.setRepeaterAclEntry(permissions, key),
        'restore ACL entry',
      );
      restoredAcl++;
    }

    final regions = _backupMap(repeater['regions']);
    if (regions.isEmpty) {
      throw ArgumentError('Repeater backup is missing RegionMap data');
    }
    await _backupRestoreRegions(service, regions);

    final verifiedAuth = await _backupRequireVars(
      service,
      service.requestRepeaterAuthConfig,
      'ACL verification',
    );
    final verifiedAclCount = verifiedAuth.intValue('acl') ?? -1;
    if (verifiedAclCount != restoredAcl) {
      throw StateError(
        'ACL verification mismatch: expected $restoredAcl, got $verifiedAclCount',
      );
    }
    final verifiedRegions = await _backupReadRegions(service);

    await _fetchInitialData(service);
    return <String, dynamic>{
      'success': true,
      'acl_count': restoredAcl,
      'region_count': verifiedRegions['count'],
      'passwords_restored': false,
      'password_note':
          'Admin/Guest passwords are write-only and were left unchanged.',
    };
  }
}
