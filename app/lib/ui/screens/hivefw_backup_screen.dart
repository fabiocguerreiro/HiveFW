import 'dart:convert';
import 'dart:typed_data';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:share_plus/share_plus.dart';

import '../../providers/radio_providers.dart';
import '../../services/discovered_contacts_import.dart';
import '../../transport/radio_transport.dart';

class HiveFwBackupScreen extends ConsumerStatefulWidget {
  const HiveFwBackupScreen({super.key});

  @override
  ConsumerState<HiveFwBackupScreen> createState() => _HiveFwBackupScreenState();
}

class _HiveFwBackupScreenState extends ConsumerState<HiveFwBackupScreen> {
  String? _busy;

  bool get _isBusy => _busy != null;

  String _safeName(String raw) {
    final cleaned = raw
        .trim()
        .replaceAll(RegExp(r'[^A-Za-z0-9._-]+'), '_')
        .replaceAll(RegExp(r'_+'), '_');
    return cleaned.isEmpty ? 'HiveFW' : cleaned;
  }

  String _stamp() {
    final now = DateTime.now();
    String p(int value) => value.toString().padLeft(2, '0');
    return '${now.year}${p(now.month)}${p(now.day)}_${p(now.hour)}${p(now.minute)}';
  }

  Future<void> _shareJson(
    Map<String, dynamic> data,
    String filename,
    String subject,
  ) async {
    final pretty = const JsonEncoder.withIndent('  ').convert(data);
    final bytes = Uint8List.fromList(utf8.encode(pretty));
    await SharePlus.instance.share(
      ShareParams(
        files: [
          XFile.fromData(
            bytes,
            name: filename,
            mimeType: 'application/json',
          ),
        ],
        fileNameOverrides: [filename],
        subject: subject,
      ),
    );
  }

  Future<Map<String, dynamic>?> _pickJson() async {
    try {
      final result = await FilePicker.pickFiles(
        type: FileType.any,
        withData: true,
      );
      if (result == null || result.files.isEmpty) return null;
      final file = result.files.single;
      if (!file.name.toLowerCase().endsWith('.json')) {
        _toast('Selecione um ficheiro .json.', error: true);
        return null;
      }
      final bytes = file.bytes;
      if (bytes == null || bytes.isEmpty) {
        _toast('Não foi possível ler o ficheiro.', error: true);
        return null;
      }
      final decoded = jsonDecode(utf8.decode(bytes, allowMalformed: false));
      if (decoded is! Map) {
        _toast('O backup não contém um objeto JSON válido.', error: true);
        return null;
      }
      return decoded.map((key, value) => MapEntry(key.toString(), value));
    } on MissingPluginException {
      _toast('O seletor de ficheiros não está disponível neste build.', error: true);
      return null;
    } on PlatformException {
      _toast('Não foi possível abrir o seletor de ficheiros.', error: true);
      return null;
    } on FormatException {
      _toast('O ficheiro não contém JSON válido.', error: true);
      return null;
    }
  }

  Future<void> _exportCompanion() async {
    setState(() => _busy = 'companion-export');
    try {
      final backup =
          await ref.read(connectionProvider.notifier).exportCompanionBackup();
      final name = _safeName(backup['name']?.toString() ?? 'HiveFW');
      await _shareJson(
        backup,
        'meshcore_backup_${name}_${_stamp()}.json',
        'HiveFW Companion backup',
      );
      final channels = backup['channels'] is List ? (backup['channels'] as List).length : 0;
      final contacts = backup['contacts'] is List ? (backup['contacts'] as List).length : 0;
      _toast('Backup Companion criado: $channels canais, $contacts contactos.');
    } catch (e) {
      _toast('Backup Companion: $e', error: true);
    } finally {
      if (mounted) setState(() => _busy = null);
    }
  }

  Future<void> _restoreCompanion() async {
    final backup = await _pickJson();
    if (backup == null || !mounted) return;

    final channels = backup['channels'] is List ? (backup['channels'] as List).length : 0;
    final contacts = backup['contacts'] is List ? (backup['contacts'] as List).length : 0;
    final confirmed = await showDialog<bool>(
      context: context,
      builder:
          (ctx) => AlertDialog(
            title: const Text('Restaurar Companion?'),
            content: Text(
              'O restore vai substituir identidade, nome, rádio, posição, '
              'auto-add, canais e contactos do Companion ligado.\n\n'
              '$channels canais · $contacts contactos\n\n'
              'O estado Repeater atual é preservado durante a escrita da configuração RF.',
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(ctx, false),
                child: const Text('Cancelar'),
              ),
              FilledButton(
                onPressed: () => Navigator.pop(ctx, true),
                child: const Text('Restaurar'),
              ),
            ],
          ),
    );
    if (confirmed != true || !mounted) return;

    setState(() => _busy = 'companion-restore');
    try {
      final result =
          await ref.read(connectionProvider.notifier).restoreCompanionBackup(backup);
      _toast(
        'Companion restaurado: ${result['channels']} canais, '
        '${result['contacts']} contactos.'
        '${result['identity_changed'] == true ? ' Identidade atualizada.' : ''}',
      );
    } catch (e) {
      _toast('Restore Companion: $e', error: true);
    } finally {
      if (mounted) setState(() => _busy = null);
    }
  }

  Future<void> _exportRepeater() async {
    setState(() => _busy = 'repeater-export');
    try {
      final backup =
          await ref.read(connectionProvider.notifier).exportRepeaterBackup();
      final name = _safeName(backup['device_name']?.toString() ?? 'HiveFW');
      await _shareJson(
        backup,
        'hivefw_repeater_backup_${name}_${_stamp()}.json',
        'HiveFW Repeater backup',
      );
      final repeater =
          backup['repeater'] is Map ? backup['repeater'] as Map : const {};
      final access = repeater['access'] is Map ? repeater['access'] as Map : const {};
      final regions = repeater['regions'] is Map ? repeater['regions'] as Map : const {};
      final acl = access['acl'] is List ? (access['acl'] as List).length : 0;
      final regionCount = regions['count'] ?? 0;
      _toast('Backup Repeater criado: $regionCount regiões, $acl ACL.');
    } catch (e) {
      _toast('Backup Repeater: $e', error: true);
    } finally {
      if (mounted) setState(() => _busy = null);
    }
  }

  Future<void> _restoreRepeater() async {
    final backup = await _pickJson();
    if (backup == null || !mounted) return;

    if (backup['format'] != 'hivefw_repeater_backup') {
      _toast('O ficheiro não é um backup Repeater HiveFW.', error: true);
      return;
    }

    final repeater =
        backup['repeater'] is Map ? backup['repeater'] as Map : const {};
    final access = repeater['access'] is Map ? repeater['access'] as Map : const {};
    final regions = repeater['regions'] is Map ? repeater['regions'] as Map : const {};
    final acl = access['acl'] is List ? (access['acl'] as List).length : 0;
    final regionCount = regions['count'] ?? 0;

    final confirmed = await showDialog<bool>(
      context: context,
      builder:
          (ctx) => AlertDialog(
            title: const Text('Restaurar Repeater?'),
            content: Text(
              'Vai substituir Owner Info, RX Gain, ADC, modo Repeater, '
              'Path Hash, Multi ACK, Smart Advert, routing, RF avançado, '
              'RegionMap e ACL persistente.\n\n'
              '$regionCount regiões · $acl ACL\n\n'
              'As passwords Admin/Guest NÃO são exportadas e NÃO serão alteradas.',
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(ctx, false),
                child: const Text('Cancelar'),
              ),
              FilledButton(
                onPressed: () => Navigator.pop(ctx, true),
                child: const Text('Restaurar'),
              ),
            ],
          ),
    );
    if (confirmed != true || !mounted) return;

    setState(() => _busy = 'repeater-restore');
    try {
      final result =
          await ref.read(connectionProvider.notifier).restoreRepeaterBackup(backup);
      _toast(
        'Repeater restaurado: ${result['region_count']} regiões, '
        '${result['acl_count']} ACL. Passwords mantidas.',
      );
    } catch (e) {
      _toast('Restore Repeater: $e', error: true);
    } finally {
      if (mounted) setState(() => _busy = null);
    }
  }

  String _hex32(Uint8List key) =>
      key.take(32).map((b) => b.toRadixString(16).padLeft(2, '0')).join();

  Future<void> _exportDiscoveredContacts() async {
    setState(() => _busy = 'discovered-export');
    try {
      final radioKeys = ref.read(radioContactsSnapshotProvider);
      final contacts = ref
          .read(contactsProvider)
          .where(
            (contact) =>
                contact.lastAdvertTimestamp > 0 &&
                !radioKeys.contains(_hex32(contact.publicKey)),
          )
          .toList();
      final payload = <String, dynamic>{
        'format': 'hivefw_discovered_contacts',
        'version': 1,
        'exported_at': DateTime.now().toIso8601String(),
        'discovered_contacts': [
          for (final contact in contacts)
            {
              'public_key': _hex32(contact.publicKey),
              'type': contact.type,
              'flags': contact.flags,
              'name': contact.name,
              'last_advert': contact.lastAdvertTimestamp,
              'last_modified':
                  contact.lastModified ?? contact.lastAdvertTimestamp,
              'latitude': contact.latitude,
              'longitude': contact.longitude,
            },
        ],
      };
      await _shareJson(
        payload,
        'hivefw_discovered_contacts.json',
        'HiveFW discovered contacts',
      );
      _toast('Contactos descobertos exportados: ${contacts.length}.');
    } catch (e) {
      _toast('Exportar contactos descobertos: $e', error: true);
    } finally {
      if (mounted) setState(() => _busy = null);
    }
  }

  Future<void> _importDiscoveredContacts() async {
    setState(() => _busy = 'discovered-import');
    try {
      final result = await FilePicker.pickFiles(type: FileType.any, withData: true);
      if (result == null || result.files.isEmpty) return;
      final file = result.files.single;
      final bytes = file.bytes;
      if (bytes == null || bytes.isEmpty) {
        _toast('Não foi possível ler o ficheiro.', error: true);
        return;
      }
      final parsed = DiscoveredContactsImport.parseBytes(bytes);
      final imported = ref
          .read(contactsProvider.notifier)
          .importLocalContacts(parsed.contacts);
      _toast(
        'Contactos descobertos: ${imported.imported} importados · '
        '${imported.duplicates} duplicados'
        '${parsed.invalidEntries > 0 ? ' · inválidos ${parsed.invalidEntries}' : ''}.',
      );
    } on FormatException catch (e) {
      _toast('Ficheiro de contactos inválido: ${e.message}', error: true);
    } catch (e) {
      _toast('Importar contactos descobertos: $e', error: true);
    } finally {
      if (mounted) setState(() => _busy = null);
    }
  }

  void _toast(String message, {bool error = false}) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor:
            error ? Theme.of(context).colorScheme.errorContainer : null,
        duration: const Duration(seconds: 5),
      ),
    );
  }

  Widget _busyIcon(String operation, IconData fallback) {
    if (_busy == operation) {
      return const SizedBox(
        width: 18,
        height: 18,
        child: CircularProgressIndicator(strokeWidth: 2),
      );
    }
    return Icon(fallback);
  }

  @override
  Widget build(BuildContext context) {
    final connected =
        ref.watch(connectionProvider) == TransportState.connected;
    final repeatEnabled =
        (ref.watch(deviceInfoProvider)?.clientRepeat ?? 0) != 0;
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(title: const Text('Backup & Restore')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Icon(Icons.backup_outlined, color: theme.colorScheme.primary),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      repeatEnabled
                          ? 'Os backups Companion e Repeater são separados. '
                              'O primeiro contém identidade, rádio, canais e contactos; '
                              'o segundo contém apenas a configuração específica do Repeater.'
                          : 'O backup Companion contém identidade, rádio, canais e contactos. '
                              'Ativa o modo Repeater no ecrã Dispositivo para mostrar o backup específico do Repeater.',
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),
          _BackupCard(
            icon: Icons.phone_android,
            title: 'Companion',
            description:
                'Identidade, nome, posição, parâmetros LoRa, auto-add, canais e contactos. '
                'O ficheiro inclui a chave privada do Companion e deve ser guardado em segurança.',
            warning:
                'Ao restaurar, os dados Companion atuais são substituídos. '
                'O estado Repeater ligado/desligado é preservado.',
            children: [
              FilledButton.icon(
                onPressed: connected && !_isBusy ? _exportCompanion : null,
                icon: _busyIcon('companion-export', Icons.download),
                label: const Text('Backup Companion'),
              ),
              OutlinedButton.icon(
                onPressed: connected && !_isBusy ? _restoreCompanion : null,
                icon: _busyIcon('companion-restore', Icons.restore),
                label: const Text('Restaurar Companion'),
              ),
            ],
          ),
          const SizedBox(height: 12),
          _BackupCard(
            icon: Icons.contacts_outlined,
            title: 'Contactos descobertos',
            description:
                'Exporta ou importa a cache local de contactos descobertos no formato HiveFW.',
            warning:
                'Ficheiro: hivefw_discovered_contacts.json. A importação é aditiva e não substitui contactos existentes.',
            children: [
              FilledButton.icon(
                onPressed: !_isBusy ? _exportDiscoveredContacts : null,
                icon: _busyIcon('discovered-export', Icons.save_outlined),
                label: const Text('Exportar contactos'),
              ),
              OutlinedButton.icon(
                onPressed: !_isBusy ? _importDiscoveredContacts : null,
                icon: _busyIcon('discovered-import', Icons.restore),
                label: const Text('Importar contactos'),
              ),
            ],
          ),
          if (repeatEnabled) ...[
            const SizedBox(height: 12),
            _BackupCard(
              icon: Icons.repeat,
              title: 'Repeater HiveFW',
              description:
                  'Owner Info, RX Gain, ADC, Repeater, Path Hash, Multi ACK, '
                  'Smart Advert, routing, RF guard, RegionMap e ACL persistente.',
              warning:
                  'Passwords Admin/Guest são write-only. Nunca entram no backup '
                  'e permanecem inalteradas durante o restore.',
              children: [
                FilledButton.icon(
                  onPressed: connected && !_isBusy ? _exportRepeater : null,
                  icon: _busyIcon('repeater-export', Icons.download),
                  label: const Text('Backup Repeater'),
                ),
                OutlinedButton.icon(
                  onPressed: connected && !_isBusy ? _restoreRepeater : null,
                  icon: _busyIcon('repeater-restore', Icons.restore),
                  label: const Text('Restaurar Repeater'),
                ),
              ],
            ),
          ],
          if (!connected) ...[
            const SizedBox(height: 12),
            const Card(
              child: ListTile(
                leading: Icon(Icons.bluetooth_disabled),
                title: Text('Companion desligado'),
                subtitle: Text(
                  'Ligue primeiro ao HiveFW por Bluetooth LE ou, opcionalmente, Wi-Fi/TCP.',
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _BackupCard extends StatelessWidget {
  const _BackupCard({
    required this.icon,
    required this.title,
    required this.description,
    required this.warning,
    required this.children,
  });

  final IconData icon;
  final String title;
  final String description;
  final String warning;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, color: theme.colorScheme.primary),
                const SizedBox(width: 8),
                Text(
                  title,
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),
            Text(description),
            const SizedBox(height: 8),
            Text(
              warning,
              style: theme.textTheme.bodySmall?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
              ),
            ),
            const SizedBox(height: 14),
            Wrap(spacing: 8, runSpacing: 8, children: children),
          ],
        ),
      ),
    );
  }
}
