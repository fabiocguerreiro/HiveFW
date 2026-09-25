import 'dart:convert';
import 'dart:typed_data';

import '../protocol/models.dart';

class DiscoveredContactsImportResult {
  const DiscoveredContactsImportResult({
    required this.contacts,
    required this.invalidEntries,
  });

  final List<Contact> contacts;
  final int invalidEntries;
}

class DiscoveredContactsImport {
  const DiscoveredContactsImport._();

  static DiscoveredContactsImportResult parseBytes(Uint8List bytes) {
    final decoded = jsonDecode(utf8.decode(bytes, allowMalformed: false));
    if (decoded is! Map) {
      throw const FormatException('Root JSON must be an object');
    }

    final root = decoded.map((key, value) => MapEntry(key.toString(), value));
    final rawContacts = root['discovered_contacts'];
    if (rawContacts is! List) {
      throw const FormatException(
        'Missing original MeshCore discovered_contacts array',
      );
    }

    final contacts = <Contact>[];
    var invalid = 0;

    for (final raw in rawContacts) {
      if (raw is! Map) {
        invalid++;
        continue;
      }
      final row = raw.map((key, value) => MapEntry(key.toString(), value));
      final key = _hexBytes(row['public_key']?.toString() ?? '', 32);
      final name = row['name']?.toString().trim() ?? '';
      if (key == null || name.isEmpty) {
        invalid++;
        continue;
      }

      final type = _asInt(row['type'], 1);
      final flags = _asInt(row['flags'], 0);
      final lastAdvert = _asInt(row['last_advert'], 0);
      final lastModified = _asInt(row['last_modified'], lastAdvert);
      final lat = _asDouble(row['latitude']);
      final lon = _asDouble(row['longitude']);

      contacts.add(
        Contact(
          publicKey: key,
          type: type,
          flags: flags,
          pathLen: 0xFF,
          name: name,
          lastAdvertTimestamp: lastAdvert,
          latitude: lat,
          longitude: lon,
          lastModified: lastModified,
        ),
      );
    }

    return DiscoveredContactsImportResult(
      contacts: contacts,
      invalidEntries: invalid,
    );
  }

  static Uint8List? _hexBytes(String value, int expectedLength) {
    final clean = value.trim().replaceAll(RegExp(r'\s+'), '').toLowerCase();
    if (clean.length != expectedLength * 2 ||
        !RegExp(r'^[0-9a-f]+$').hasMatch(clean)) {
      return null;
    }

    final out = Uint8List(expectedLength);
    for (var i = 0; i < out.length; i++) {
      out[i] = int.parse(clean.substring(i * 2, i * 2 + 2), radix: 16);
    }
    return out;
  }

  static int _asInt(dynamic value, [int fallback = 0]) {
    if (value is int) return value;
    if (value is num) return value.round();
    return int.tryParse(value?.toString() ?? '') ?? fallback;
  }

  static double? _asDouble(dynamic value) {
    if (value == null) return null;
    if (value is num) return value.toDouble();
    final parsed = double.tryParse(value.toString());
    return parsed;
  }
}
