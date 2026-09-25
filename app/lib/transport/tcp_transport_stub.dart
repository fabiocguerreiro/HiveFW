import 'dart:async';
import 'dart:typed_data';

import 'radio_transport.dart';

/// Browser stub. Direct TCP sockets are not exposed by web browsers.
class TcpTransport implements RadioTransport {
  TcpTransport(this.host, {this.port = 5000});

  final String host;
  final int port;

  @override
  String get displayName => 'Wi-Fi: $host:$port';

  @override
  bool get isConnected => false;

  @override
  bool get usesFraming => true;

  @override
  Stream<Uint8List> get dataStream => const Stream.empty();

  @override
  Stream<void> get connectionLost => const Stream.empty();

  @override
  Future<bool> connect() async => false;

  @override
  Future<void> disconnect() async {}

  @override
  Future<void> send(Uint8List data) async {
    throw UnsupportedError('Direct TCP transport is not available on web');
  }

  @override
  Future<void> dispose() async {}
}
