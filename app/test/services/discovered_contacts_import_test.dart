import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter_test/flutter_test.dart';
import 'package:hivefw_companion/services/discovered_contacts_import.dart';

void main() {
  group('DiscoveredContactsImport', () {
    test('parses original MeshCore discovered_contacts wrapper', () {
      final json = jsonEncode({
        'discovered_contacts': [
          {
            'type': 2,
            'name': 'LI.CSC Trajouce R4',
            'public_key':
                '00112233445566778899aabbccddeeff'
                '00112233445566778899aabbccddeeff',
            'flags': 0,
            'latitude': '38.123456',
            'longitude': '-9.123456',
            'last_advert': 1700000000,
            'last_modified': 1700000001,
            'advert_path_list': ['30', '55', '5F'],
          },
          {
            'type': 2,
            'name': '',
            'public_key': 'broken',
          },
        ],
      });

      final result = DiscoveredContactsImport.parseBytes(
        Uint8List.fromList(utf8.encode(json)),
      );

      expect(result.contacts, hasLength(1));
      expect(result.invalidEntries, 1);

      final contact = result.contacts.single;
      expect(contact.isRepeater, isTrue);
      expect(contact.name, 'LI.CSC Trajouce R4');
      expect(contact.latitude, closeTo(38.123456, 0.000001));
      expect(contact.longitude, closeTo(-9.123456, 0.000001));
      expect(contact.lastAdvertTimestamp, 1700000000);
      expect(contact.lastModified, 1700000001);
      expect(contact.pathLen, 0xFF);
    });

    test('rejects JSON without discovered_contacts root key', () {
      final bytes = Uint8List.fromList(
        utf8.encode(jsonEncode({'contacts': []})),
      );

      expect(
        () => DiscoveredContactsImport.parseBytes(bytes),
        throwsFormatException,
      );
    });
  });
}
