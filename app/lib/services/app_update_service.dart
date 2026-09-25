import 'dart:convert';
import 'dart:typed_data';

import 'package:http/http.dart' as http;
import 'package:package_info_plus/package_info_plus.dart';

class AppUpdateRelease {
  const AppUpdateRelease({
    required this.tag,
    required this.version,
    required this.name,
    required this.releaseUrl,
    required this.apkUrl,
    required this.apkName,
    required this.publishedAt,
    required this.prerelease,
  });

  final String tag;
  final String version;
  final String name;
  final Uri releaseUrl;
  final Uri apkUrl;
  final String apkName;
  final DateTime? publishedAt;
  final bool prerelease;
}

class AppUpdateCheck {
  const AppUpdateCheck({
    required this.currentVersion,
    required this.latest,
    required this.updateAvailable,
  });

  final String currentVersion;
  final AppUpdateRelease latest;
  final bool updateAvailable;
}

class AppUpdateService {
  const AppUpdateService();

  static const _releasesUri = 'https://api.github.com/repos/fabiocguerreiro/HiveFW-app/releases?per_page=30';

  Future<AppUpdateCheck> check() async {
    final package = await PackageInfo.fromPlatform();
    final response = await http.get(
      Uri.parse(_releasesUri),
      headers: const {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'HiveFW-app-updater',
      },
    );

    if (response.statusCode != 200) {
      throw Exception('GitHub respondeu com HTTP ${response.statusCode}');
    }

    final decoded = jsonDecode(response.body);
    if (decoded is! List) {
      throw Exception('Resposta de releases inválida');
    }

    AppUpdateRelease? latest;
    for (final item in decoded) {
      if (item is! Map<String, dynamic>) continue;
      if (item['draft'] == true) continue;

      final tag = (item['tag_name'] as String? ?? '').trim();
      if (!tag.startsWith('app-v')) continue;

      final version = tag.substring('app-v'.length);
      final assets = item['assets'];
      if (assets is! List) continue;

      Map<String, dynamic>? apk;
      for (final asset in assets) {
        if (asset is! Map<String, dynamic>) continue;
        final name = (asset['name'] as String? ?? '').toLowerCase();
        if (name.endsWith('.apk')) {
          apk = asset;
          break;
        }
      }
      if (apk == null) continue;

      final apkUrl = Uri.tryParse(apk['browser_download_url'] as String? ?? '');
      final releaseUrl = Uri.tryParse(item['html_url'] as String? ?? '');
      if (apkUrl == null || releaseUrl == null) continue;

      latest = AppUpdateRelease(
        tag: tag,
        version: version,
        name: (item['name'] as String?)?.trim().isNotEmpty == true
            ? (item['name'] as String).trim()
            : tag,
        releaseUrl: releaseUrl,
        apkUrl: apkUrl,
        apkName: (apk['name'] as String? ?? 'HiveFW-update.apk').trim(),
        publishedAt: DateTime.tryParse(item['published_at'] as String? ?? ''),
        prerelease: item['prerelease'] == true,
      );
      break;
    }

    if (latest == null) {
      throw Exception('Não foi encontrada nenhuma release HiveFW com APK');
    }

    final current = package.version.trim();
    return AppUpdateCheck(
      currentVersion: current,
      latest: latest,
      updateAvailable: _compareVersions(latest.version, current) > 0,
    );
  }

  Future<Uint8List> downloadApk(AppUpdateRelease release) async {
    final response = await http.get(
      release.apkUrl,
      headers: const {'User-Agent': 'HiveFW-app-updater'},
    );
    if (response.statusCode != 200) {
      throw Exception('Falha no download do APK (HTTP ${response.statusCode})');
    }
    return response.bodyBytes;
  }

  int _compareVersions(String a, String b) {
    final va = _ParsedVersion.parse(a);
    final vb = _ParsedVersion.parse(b);
    return va.compareTo(vb);
  }
}

class _ParsedVersion implements Comparable<_ParsedVersion> {
  const _ParsedVersion(this.major, this.minor, this.patch, this.pre);

  final int major;
  final int minor;
  final int patch;
  final List<String> pre;

  factory _ParsedVersion.parse(String raw) {
    var value = raw.trim();
    if (value.startsWith('v')) value = value.substring(1);
    final plus = value.indexOf('+');
    if (plus >= 0) value = value.substring(0, plus);

    final dash = value.indexOf('-');
    final core = dash >= 0 ? value.substring(0, dash) : value;
    final pre = dash >= 0
        ? value.substring(dash + 1).split('.').where((e) => e.isNotEmpty).toList()
        : const <String>[];

    final nums = core.split('.');
    int n(int i) => i < nums.length ? int.tryParse(nums[i]) ?? 0 : 0;

    return _ParsedVersion(n(0), n(1), n(2), pre);
  }

  @override
  int compareTo(_ParsedVersion other) {
    for (final pair in [
      [major, other.major],
      [minor, other.minor],
      [patch, other.patch],
    ]) {
      final c = pair[0].compareTo(pair[1]);
      if (c != 0) return c;
    }

    if (pre.isEmpty && other.pre.isEmpty) return 0;
    if (pre.isEmpty) return 1;
    if (other.pre.isEmpty) return -1;

    final length = pre.length > other.pre.length ? pre.length : other.pre.length;
    for (var i = 0; i < length; i++) {
      if (i >= pre.length) return -1;
      if (i >= other.pre.length) return 1;
      final a = pre[i];
      final b = other.pre[i];
      final ai = int.tryParse(a);
      final bi = int.tryParse(b);
      int c;
      if (ai != null && bi != null) {
        c = ai.compareTo(bi);
      } else if (ai != null) {
        c = -1;
      } else if (bi != null) {
        c = 1;
      } else {
        c = a.compareTo(b);
      }
      if (c != 0) return c;
    }
    return 0;
  }
}
