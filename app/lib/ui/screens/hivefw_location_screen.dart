import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:geolocator/geolocator.dart';

import '../../protocol/protocol.dart';
import '../../providers/radio_providers.dart';

class HiveFwLocationScreen extends ConsumerStatefulWidget {
  const HiveFwLocationScreen({super.key});

  @override
  ConsumerState<HiveFwLocationScreen> createState() => _HiveFwLocationScreenState();
}

class _HiveFwLocationScreenState extends ConsumerState<HiveFwLocationScreen> {
  bool _loading = false;
  bool _saving = false;

  Future<CompanionResponse?> _request(
    Future<void> Function() send,
    bool Function(CompanionResponse) accept,
  ) async {
    final service = ref.read(radioServiceProvider);
    if (service == null || !service.isConnected) return null;
    final completer = Completer<CompanionResponse?>();
    late StreamSubscription<CompanionResponse> sub;
    sub = service.responses.listen((response) {
      if (!completer.isCompleted && accept(response)) {
        completer.complete(response);
      }
    });
    try {
      await send();
      return await completer.future.timeout(
        const Duration(seconds: 4),
        onTimeout: () => null,
      );
    } finally {
      await sub.cancel();
    }
  }

  Future<void> _refresh() async {
    final service = ref.read(radioServiceProvider);
    if (service == null || !service.isConnected) return;
    if (mounted) setState(() => _loading = true);
    final response = await _request(
      service.requestSelfInfo,
      (r) => r is SelfInfoResponse || r is ErrorResponse,
    );
    if (response is SelfInfoResponse) {
      ref.read(selfInfoProvider.notifier).state = response.info;
      ref.read(radioConfigProvider.notifier).state = response.info.radioConfig;
    }
    if (mounted) setState(() => _loading = false);
  }

  Future<bool> _setAdvertPolicy(bool enabled) async {
    final service = ref.read(radioServiceProvider);
    final self = ref.read(selfInfoProvider);
    if (service == null || self == null) return false;
    final response = await _request(
      () => service.setOtherParams(
        manualAddContacts: self.manualAddContacts ?? 0,
        telemetryMode: self.telemetryMode ?? 0,
        advLocPolicy: enabled ? 1 : 0,
        multiAcks: self.multiAcks ?? 0,
      ),
      (r) => r is OkResponse || r is ErrorResponse,
    );
    return response is OkResponse;
  }

  Future<void> _writeCoordinates(double latitude, double longitude) async {
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      _toast('Coordenadas inválidas.', error: true);
      return;
    }
    final service = ref.read(radioServiceProvider);
    if (service == null || !service.isConnected) return;
    setState(() => _saving = true);
    try {
      final response = await _request(
        () => service.setLocation(latitude, longitude),
        (r) => r is OkResponse || r is ErrorResponse,
      );
      if (response is! OkResponse) {
        throw StateError('O Companion rejeitou as coordenadas.');
      }
      if (!await _setAdvertPolicy(true)) {
        throw StateError('Não foi possível ativar a partilha da localização.');
      }
      await _refresh();
      _toast('Localização sincronizada com o Companion.');
    } catch (error) {
      _toast(error.toString().replaceFirst('Bad state: ', ''), error: true);
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  Future<void> _usePhoneLocation() async {
    setState(() => _saving = true);
    try {
      if (!await Geolocator.isLocationServiceEnabled()) {
        throw StateError('Ativa a localização/GPS do telemóvel.');
      }
      var permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
      }
      if (permission == LocationPermission.denied ||
          permission == LocationPermission.deniedForever) {
        throw StateError('A permissão de localização não foi concedida.');
      }
      final position = await Geolocator.getCurrentPosition(
        locationSettings: const LocationSettings(
          accuracy: LocationAccuracy.high,
          timeLimit: Duration(seconds: 20),
        ),
      );
      // _writeCoordinates owns the rest of the saving lifecycle.
      if (mounted) setState(() => _saving = false);
      await _writeCoordinates(position.latitude, position.longitude);
    } catch (error) {
      _toast(error.toString().replaceFirst('Bad state: ', ''), error: true);
      if (mounted) setState(() => _saving = false);
    }
  }

  Future<void> _enterCoordinates() async {
    final self = ref.read(selfInfoProvider);
    final latController = TextEditingController(
      text: (self?.latitude ?? 0).toStringAsFixed(6),
    );
    final lonController = TextEditingController(
      text: (self?.longitude ?? 0).toStringAsFixed(6),
    );
    final result = await showDialog<(double, double)>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Coordenadas'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: latController,
              keyboardType: const TextInputType.numberWithOptions(
                decimal: true,
                signed: true,
              ),
              decoration: const InputDecoration(labelText: 'Latitude'),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: lonController,
              keyboardType: const TextInputType.numberWithOptions(
                decimal: true,
                signed: true,
              ),
              decoration: const InputDecoration(labelText: 'Longitude'),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Cancelar'),
          ),
          FilledButton(
            onPressed: () {
              final lat = double.tryParse(latController.text.trim().replaceAll(',', '.'));
              final lon = double.tryParse(lonController.text.trim().replaceAll(',', '.'));
              if (lat != null && lon != null) Navigator.pop(ctx, (lat, lon));
            },
            child: const Text('Aplicar'),
          ),
        ],
      ),
    );
    latController.dispose();
    lonController.dispose();
    if (result != null) await _writeCoordinates(result.$1, result.$2);
  }

  Future<void> _disableSharing() async {
    setState(() => _saving = true);
    try {
      if (!await _setAdvertPolicy(false)) {
        throw StateError('O Companion rejeitou a alteração.');
      }
      await _refresh();
      _toast('Partilha de localização desativada.');
    } catch (error) {
      _toast(error.toString().replaceFirst('Bad state: ', ''), error: true);
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  void _toast(String text, {bool error = false}) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(text),
        backgroundColor: error ? Theme.of(context).colorScheme.errorContainer : null,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final self = ref.watch(selfInfoProvider);
    final connected = ref.watch(radioServiceProvider)?.isConnected == true;
    final lat = self?.latitude;
    final lon = self?.longitude;
    final sharing = (self?.advLocPolicy ?? 0) != 0;
    final busy = _loading || _saving;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Localização'),
        actions: [
          IconButton(
            onPressed: connected && !busy ? _refresh : null,
            icon: const Icon(Icons.refresh),
            tooltip: 'Sincronizar com o Companion',
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(Icons.my_location, color: Theme.of(context).colorScheme.primary),
                      const SizedBox(width: 8),
                      Text('Posição no Companion', style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Text(
                    lat == null || lon == null
                        ? 'Coordenadas ainda não disponíveis.'
                        : '${lat.toStringAsFixed(6)}, ${lon.toStringAsFixed(6)}',
                    style: Theme.of(context).textTheme.titleSmall,
                  ),
                  const SizedBox(height: 5),
                  Text(
                    sharing ? 'Partilha nos adverts: ativa' : 'Partilha nos adverts: desativada',
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text('Definir localização', style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
                  const SizedBox(height: 6),
                  Text(
                    'As alterações são escritas no Companion e relidas de seguida. '
                    'A localização do telemóvel só é consultada quando usas o botão; não existe seguimento em segundo plano.',
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                  const SizedBox(height: 14),
                  FilledButton.icon(
                    onPressed: connected && !busy ? _usePhoneLocation : null,
                    icon: const Icon(Icons.gps_fixed),
                    label: const Text('Usar localização do telemóvel'),
                  ),
                  const SizedBox(height: 8),
                  OutlinedButton.icon(
                    onPressed: connected && !busy ? _enterCoordinates : null,
                    icon: const Icon(Icons.edit_location_alt_outlined),
                    label: const Text('Introduzir coordenadas'),
                  ),
                  const SizedBox(height: 8),
                  OutlinedButton.icon(
                    onPressed: connected && !busy ? _disableSharing : null,
                    icon: const Icon(Icons.location_off_outlined),
                    label: const Text('Não partilhar localização'),
                  ),
                  if (busy) ...[
                    const SizedBox(height: 14),
                    const LinearProgressIndicator(),
                  ],
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
