import 'dart:async';
import 'dart:convert';
import 'dart:math';
import 'dart:typed_data';

import 'package:crypto/crypto.dart';
import 'package:http/http.dart' as http;

import '../protocol/protocol.dart';
import 'radio_service.dart';

class HiveFwFirmwareRelease {
  const HiveFwFirmwareRelease({
    required this.version,
    required this.tag,
    required this.assetName,
    required this.assetUrl,
    required this.assetSize,
    this.checksumUrl,
  });

  final String version;
  final String tag;
  final String assetName;
  final Uri assetUrl;
  final int assetSize;
  final Uri? checksumUrl;
}

class HiveFwFirmwareUpdateService {
  const HiveFwFirmwareUpdateService();

  static const _releaseApi =
      'https://api.github.com/repos/fabiocguerreiro/HiveFW/releases/latest';
  static const _targetPrefix = 'Heltec_v3_companion_radio_wifi-';

  Future<HiveFwFirmwareRelease> latestRelease() async {
    final response = await http.get(
      Uri.parse(_releaseApi),
      headers: const {
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'HiveFW-app-firmware-updater',
      },
    );
    if (response.statusCode != 200) {
      throw Exception('GitHub respondeu com HTTP ${response.statusCode}.');
    }
    final payload = jsonDecode(response.body);
    if (payload is! Map<String, dynamic>) {
      throw Exception('Release HiveFW inválida.');
    }
    final assets = payload['assets'];
    if (assets is! List) throw Exception('A release não contém assets.');

    Map<String, dynamic>? found;
    for (final item in assets) {
      if (item is! Map<String, dynamic>) continue;
      final name = item['name'] as String? ?? '';
      if (name.startsWith(_targetPrefix) &&
          name.endsWith('.bin') &&
          !name.toLowerCase().contains('-merged')) {
        found = item;
        break;
      }
    }
    if (found == null) {
      throw Exception('A release não contém firmware OTA para Heltec V3 Wi-Fi.');
    }

    final url = Uri.tryParse(found['browser_download_url'] as String? ?? '');
    if (url == null) throw Exception('URL do firmware inválido.');
    final tag = payload['tag_name'] as String? ?? '';
    final version = tag.replaceFirst(RegExp(r'^[vV]'), '');

    final assetName = found['name'] as String? ?? 'firmware.bin';
    Uri? checksumUrl;
    for (final item in assets) {
      if (item is! Map<String, dynamic>) continue;
      if (item['name'] == '$assetName.sha256') {
        checksumUrl = Uri.tryParse(
          item['browser_download_url'] as String? ?? '',
        );
        break;
      }
    }

    return HiveFwFirmwareRelease(
      version: version,
      tag: tag,
      assetName: assetName,
      assetUrl: url,
      assetSize: (found['size'] as num?)?.toInt() ?? 0,
      checksumUrl: checksumUrl,
    );
  }

  Future<Uint8List> download(HiveFwFirmwareRelease release) async {
    final response = await http.get(
      release.assetUrl,
      headers: const {'User-Agent': 'HiveFW-app-firmware-updater'},
    );
    if (response.statusCode != 200) {
      throw Exception('Download do firmware falhou (HTTP ${response.statusCode}).');
    }
    final bytes = response.bodyBytes;
    if (bytes.length < 64 * 1024 || bytes.length > 4 * 1024 * 1024) {
      throw Exception('Tamanho do firmware fora dos limites esperados.');
    }
    if (bytes.isEmpty || bytes.first != 0xE9) {
      throw Exception('O ficheiro não parece um firmware ESP32 válido.');
    }

    final checksumUrl = release.checksumUrl;
    if (checksumUrl != null) {
      final checksumResponse = await http.get(
        checksumUrl,
        headers: const {'User-Agent': 'HiveFW-app-firmware-updater'},
      );
      if (checksumResponse.statusCode != 200) {
        throw Exception('Não foi possível validar o checksum do firmware.');
      }
      final expected =
          RegExp(r'\b[0-9a-fA-F]{64}\b')
              .firstMatch(checksumResponse.body)
              ?.group(0)
              ?.toLowerCase();
      final actual = sha256.convert(bytes).toString().toLowerCase();
      if (expected == null || expected != actual) {
        throw Exception('Checksum SHA-256 do firmware não corresponde.');
      }
    }
    return bytes;
  }

  Future<void> upload({
    required String host,
    required RadioService radio,
    required Uint8List firmware,
  }) async {
    final token = _randomHex(24);
    final authResult = Completer<CompanionResponse?>();
    late StreamSubscription<CompanionResponse> authSub;
    authSub = radio.responses.listen((response) {
      if (!authResult.isCompleted &&
          (response is OkResponse || response is ErrorResponse)) {
        authResult.complete(response);
      }
    });
    try {
      await radio.setHiveCustomVar('ota_token', token);
      final response = await authResult.future.timeout(
        const Duration(seconds: 3),
        onTimeout: () => null,
      );
      if (response is! OkResponse) {
        throw Exception(
          'O firmware não confirmou a autorização OTA segura.',
        );
      }
    } finally {
      await authSub.cancel();
    }

    final digest = md5.convert(firmware).toString();
    final boundary = '----HiveFWOTA${_randomHex(12)}';
    final prefix = utf8.encode(
      '--$boundary\r\n'
      'Content-Disposition: form-data; name="MD5"\r\n'
      '\r\n'
      '$digest\r\n'
      '--$boundary\r\n'
      'Content-Disposition: form-data; name="firmware"; filename="firmware"\r\n'
      'Content-Type: application/octet-stream\r\n'
      '\r\n',
    );
    final suffix = utf8.encode('\r\n--$boundary--\r\n');
    final body = Uint8List(prefix.length + firmware.length + suffix.length)
      ..setRange(0, prefix.length, prefix)
      ..setRange(prefix.length, prefix.length + firmware.length, firmware)
      ..setRange(prefix.length + firmware.length, prefix.length + firmware.length + suffix.length, suffix);

    final auth = base64Encode(utf8.encode('hivefw:$token'));
    final client = http.Client();
    try {
      final request = http.Request(
        'POST',
        Uri.parse('http://${host.trim()}/update'),
      )
        ..headers.addAll({
          'Authorization': 'Basic $auth',
          'Accept': 'text/plain',
          'Connection': 'close',
          'Content-Type': 'multipart/form-data; boundary=$boundary',
          'Content-Length': '${body.length}',
        })
        ..bodyBytes = body;
      try {
        final streamed = await client.send(request).timeout(
          const Duration(seconds: 90),
        );
        final responseBody = await streamed.stream.bytesToString();
        if (streamed.statusCode != 200 || responseBody.trim() != 'OK') {
          throw Exception(
            'Rádio rejeitou o OTA (HTTP ${streamed.statusCode}: '
            '${responseBody.trim().isEmpty ? 'sem resposta' : responseBody.trim()}).',
          );
        }
      } on TimeoutException {
        if (!await _waitForRadio(host)) rethrow;
      } on http.ClientException {
        if (!await _waitForRadio(host)) rethrow;
      }
    } finally {
      client.close();
    }
  }

  Future<bool> _waitForRadio(String host) async {
    await Future<void>.delayed(const Duration(seconds: 3));
    for (var attempt = 0; attempt < 10; attempt++) {
      try {
        final response = await http
            .get(Uri.parse('http://${host.trim()}/'))
            .timeout(const Duration(seconds: 3));
        if (response.statusCode == 200 ||
            response.statusCode == 302 ||
            response.statusCode == 401) {
          return true;
        }
      } catch (_) {}
      await Future<void>.delayed(const Duration(seconds: 2));
    }
    return false;
  }

  String _randomHex(int bytes) {
    final random = Random.secure();
    final data = List<int>.generate(bytes, (_) => random.nextInt(256));
    return data.map((b) => b.toRadixString(16).padLeft(2, '0')).join();
  }
}
