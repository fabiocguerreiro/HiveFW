/// Unit tests for the Windows BLE scan filter in [BleTransport].
///
/// On Windows, flutter_blue_plus_windows (WinRT) ignores the withServices
/// scan filter and returns every visible BLE advertisement.  [BleTransport.scan]
/// calls [BleTransport.isSupportedCompanionAdvertisement] per result to
/// discard unrelated devices before they reach the UI.
///
/// These tests exercise the compatible Companion filter directly (using plain
/// [Guid]/[String] values) so no platform channel or real BLE hardware is
/// needed.
library;

import 'package:flutter_blue_plus/flutter_blue_plus.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:hivefw_companion/transport/ble_transport.dart';

void main() {
  // Nordic UART Service UUID used by all MeshCore BLE radios.
  final nusGuid = Guid('6E400001-B5A3-F393-E0A9-E50E24DCCA9E');

  // An unrelated GATT service UUID (Generic Access Profile).
  final gapGuid = Guid('00001800-0000-1000-8000-00805F9B34FB');

  group('BleTransport compatible Companion filter — service UUID', () {
    test('accepts device that advertises the NUS service UUID', () {
      expect(
        BleTransport.isSupportedCompanionAdvertisement([nusGuid], 'SomeDevice'),
        isTrue,
      );
    });

    test('accepts device with NUS UUID among other service UUIDs', () {
      expect(
        BleTransport.isSupportedCompanionAdvertisement([
          gapGuid,
          nusGuid,
        ], 'MultiServiceDevice'),
        isTrue,
      );
    });

    test(
      'rejects device with only unrelated service UUIDs and generic name',
      () {
        expect(
          BleTransport.isSupportedCompanionAdvertisement([gapGuid], 'MyHeadphones'),
          isFalse,
        );
      },
    );
  });

  group('BleTransport compatible Companion filter — name fallback', () {
    test('accepts device named "MeshCore-1A2B" even without service UUID', () {
      expect(BleTransport.isSupportedCompanionAdvertisement([], 'MeshCore-1A2B'), isTrue);
    });

    test('accepts device with lowercase "meshcore" in name', () {
      expect(BleTransport.isSupportedCompanionAdvertisement([], 'meshcore-node'), isTrue);
    });

    test('accepts device with mixed-case "MeshCore" substring', () {
      expect(
        BleTransport.isSupportedCompanionAdvertisement([], 'CT2HEV MeshCore Relay'),
        isTrue,
      );
    });

    test('accepts HiveFW-prefixed Companion without service UUID', () {
      expect(
        BleTransport.isSupportedCompanionAdvertisement([], 'HiveFW-SE.PLM-R4'),
        isTrue,
      );
    });

    test('accepts lowercase hivefw name fallback', () {
      expect(
        BleTransport.isSupportedCompanionAdvertisement([], 'hivefw-companion'),
        isTrue,
      );
    });

    test('NUS keeps custom-named official firmware visible', () {
      expect(
        BleTransport.isSupportedCompanionAdvertisement([nusGuid], 'SE.PLM PALMELA R4'),
        isTrue,
      );
    });

    test('rejects device with empty name and no service UUIDs', () {
      expect(BleTransport.isSupportedCompanionAdvertisement([], ''), isFalse);
    });

    test('rejects device with unrelated name and no service UUIDs', () {
      expect(BleTransport.isSupportedCompanionAdvertisement([], 'JBL Headset'), isFalse);
    });
  });
}
