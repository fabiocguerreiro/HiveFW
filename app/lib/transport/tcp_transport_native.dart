import 'dart:async';
import 'dart:io';
import 'dart:typed_data';

import 'package:logger/logger.dart';

import 'radio_transport.dart';

final _log = Logger(printer: SimplePrinter(printTime: false));

/// TCP transport for HiveFW Wi-Fi Companion.
///
/// HiveFW's SerialWifiInterface uses the same direction + little-endian length
/// framing as the USB serial Companion transport:
///   app -> radio: '<' + uint16 length + payload
///   radio -> app: '>' + uint16 length + payload
class TcpTransport implements RadioTransport {
  TcpTransport(this.host, {this.port = 5000});

  final String host;
  final int port;

  Socket? _socket;
  StreamSubscription<Uint8List>? _socketSub;
  final _dataController = StreamController<Uint8List>.broadcast();
  final _connectionLostController = StreamController<void>.broadcast();
  bool _connected = false;
  bool _manualDisconnect = false;

  @override
  String get displayName => 'Wi-Fi: $host:$port';

  @override
  bool get isConnected => _connected;

  @override
  bool get usesFraming => true;

  @override
  Stream<Uint8List> get dataStream => _dataController.stream;

  @override
  Stream<void> get connectionLost => _connectionLostController.stream;

  @override
  Future<bool> connect() async {
    if (_connected) return true;
    _manualDisconnect = false;
    try {
      final socket = await Socket.connect(
        host,
        port,
        timeout: const Duration(seconds: 8),
      );
      socket.setOption(SocketOption.tcpNoDelay, true);
      _socket = socket;
      _connected = true;
      _socketSub = socket.listen(
        (data) => _dataController.add(Uint8List.fromList(data)),
        onError: (Object error, StackTrace stack) {
          _log.w('TCP read error from $host:$port: $error');
          _handleLost();
        },
        onDone: _handleLost,
        cancelOnError: true,
      );
      _log.i('TCP connected: $host:$port');
      return true;
    } catch (e) {
      _log.w('TCP connection failed to $host:$port: $e');
      await _closeSocket();
      return false;
    }
  }

  void _handleLost() {
    if (!_connected) return;
    _connected = false;
    _socket = null;
    _socketSub = null;
    if (!_manualDisconnect && !_connectionLostController.isClosed) {
      _connectionLostController.add(null);
    }
  }

  Future<void> _closeSocket() async {
    _connected = false;
    await _socketSub?.cancel();
    _socketSub = null;
    final socket = _socket;
    _socket = null;
    if (socket != null) {
      try {
        await socket.flush();
      } catch (_) {}
      try {
        await socket.close();
      } catch (_) {
        socket.destroy();
      }
    }
  }

  @override
  Future<void> disconnect() async {
    _manualDisconnect = true;
    await _closeSocket();
  }

  @override
  Future<void> send(Uint8List data) async {
    final socket = _socket;
    if (!_connected || socket == null) {
      throw StateError('TCP transport is not connected');
    }
    socket.add(data);
    await socket.flush();
  }

  @override
  Future<void> dispose() async {
    await disconnect();
    await _dataController.close();
    await _connectionLostController.close();
  }
}
