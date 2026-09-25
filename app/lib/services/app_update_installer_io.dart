import 'dart:io';
import 'dart:typed_data';

import 'package:open_filex/open_filex.dart';
import 'package:path_provider/path_provider.dart';

Future<void> installDownloadedApk(Uint8List bytes, String fileName) async {
  if (!Platform.isAndroid) {
    throw UnsupportedError('A instalação automática está disponível apenas no Android.');
  }

  final dir = await getTemporaryDirectory();
  final safeName =
      fileName.toLowerCase().endsWith('.apk') ? fileName : 'HiveFW-update.apk';
  final file = File('${dir.path}/$safeName');
  await file.writeAsBytes(bytes, flush: true);

  final result = await OpenFilex.open(
    file.path,
    type: 'application/vnd.android.package-archive',
  );
  if (result.type != ResultType.done) {
    throw Exception(
      result.message.isNotEmpty
          ? result.message
          : 'Não foi possível abrir o instalador do Android.',
    );
  }
}
