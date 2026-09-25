import 'dart:convert';

import 'package:http/http.dart' as http;

class HiveFwWifiNetwork {
  const HiveFwWifiNetwork({
    required this.ssid,
    required this.rssi,
    required this.secured,
  });

  final String ssid;
  final int rssi;
  final bool secured;
}

class HiveFwWifiPortalService {
  HiveFwWifiPortalService(String host)
      : _base = Uri.parse('http://${host.trim()}');

  final Uri _base;
  String? _cookie;

  Uri _uri(String path) => _base.replace(path: path);

  Future<void> login({
    String username = 'hivefw',
    String password = 'hivefw',
  }) async {
    final client = http.Client();
    try {
      final request = http.Request('POST', _uri('/wifi/login'))
        ..followRedirects = false
        ..headers['Content-Type'] = 'application/x-www-form-urlencoded'
        ..bodyFields = {'user': username, 'password': password};
      final streamed = await client.send(request);
      final setCookie = streamed.headers['set-cookie'];
      if ((streamed.statusCode != 302 && streamed.statusCode != 303) ||
          setCookie == null ||
          !setCookie.contains('hivefw_session=')) {
        throw Exception('Autenticação no portal Wi-Fi falhou.');
      }
      _cookie = setCookie.split(';').first;
      await streamed.stream.drain<void>();
    } finally {
      client.close();
    }
  }

  Future<List<HiveFwWifiNetwork>> scan() async {
    if (_cookie == null) await login();
    for (var attempt = 0; attempt < 60; attempt++) {
      final response = await http.get(
        _uri('/api/wifi/scan'),
        headers: {
          'Accept': 'application/json',
          if (_cookie != null) 'Cookie': _cookie!,
        },
      );
      if (response.statusCode == 202) {
        await Future<void>.delayed(const Duration(milliseconds: 500));
        continue;
      }
      if (response.statusCode == 401) {
        _cookie = null;
        await login();
        continue;
      }
      if (response.statusCode != 200) {
        throw Exception('Scan Wi-Fi falhou (HTTP ${response.statusCode}).');
      }
      final decoded = jsonDecode(response.body);
      if (decoded is! Map<String, dynamic>) {
        throw Exception('Resposta Wi-Fi inválida.');
      }
      final networks = decoded['networks'];
      if (networks is! List) return const [];
      return networks.whereType<Map<String, dynamic>>().map((n) {
        return HiveFwWifiNetwork(
          ssid: (n['ssid'] as String? ?? '').trim(),
          rssi: (n['rssi'] as num?)?.toInt() ?? -127,
          secured: n['secured'] == true,
        );
      }).where((n) => n.ssid.isNotEmpty).toList();
    }
    throw Exception('Tempo de pesquisa Wi-Fi excedido.');
  }

  Future<void> save({
    required String ssid,
    required String password,
    bool openNetwork = false,
  }) async {
    if (_cookie == null) await login();
    final cleanSsid = ssid.trim();
    if (cleanSsid.isEmpty) throw Exception('SSID obrigatório.');
    final response = await http.post(
      _uri('/wifi/save'),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        if (_cookie != null) 'Cookie': _cookie!,
      },
      body: {
        'ssid': cleanSsid,
        'pwd': password,
        if (openNetwork) 'open': '1',
      },
    );
    if (response.statusCode != 200) {
      throw Exception(
        response.body.trim().isNotEmpty
            ? response.body.trim()
            : 'Falha ao guardar Wi-Fi (HTTP ${response.statusCode}).',
      );
    }
  }
}
