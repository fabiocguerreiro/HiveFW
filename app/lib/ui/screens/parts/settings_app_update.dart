part of '../hivefw_device_screen.dart';

class _AppUpdateCard extends ConsumerStatefulWidget {
  const _AppUpdateCard();

  @override
  ConsumerState<_AppUpdateCard> createState() => _AppUpdateCardState();
}

class _AppUpdateCardState extends ConsumerState<_AppUpdateCard> {
  final _service = const AppUpdateService();

  AppUpdateCheck? _check;
  bool _checking = false;
  bool _installing = false;
  String? _error;

  Future<void> _checkNow() async {
    setState(() {
      _checking = true;
      _error = null;
    });

    try {
      final result = await _service.check();
      if (!mounted) return;
      setState(() => _check = result);
    } catch (e) {
      if (!mounted) return;
      setState(() => _error = e.toString().replaceFirst('Exception: ', ''));
    } finally {
      if (mounted) setState(() => _checking = false);
    }
  }

  Future<void> _install() async {
    final release = _check?.latest;
    if (release == null) return;

    if (kIsWeb || defaultTargetPlatform != TargetPlatform.android) {
      await launchUrl(
        release.releaseUrl,
        mode: LaunchMode.externalApplication,
      );
      return;
    }

    setState(() {
      _installing = true;
      _error = null;
    });

    try {
      final bytes = await _service.downloadApk(release);
      if (!mounted) return;
      await installDownloadedApk(bytes, release.apkName);
    } catch (e) {
      if (!mounted) return;
      setState(() => _error = e.toString().replaceFirst('Exception: ', ''));
    } finally {
      if (mounted) setState(() => _installing = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final check = _check;

    String status;
    IconData icon;
    Color color;

    if (_checking) {
      status = 'A verificar releases…';
      icon = Icons.sync;
      color = theme.colorScheme.primary;
    } else if (_error != null) {
      status = _error!;
      icon = Icons.error_outline;
      color = theme.colorScheme.error;
    } else if (check == null) {
      status = 'Verifica se existe uma versão mais recente da HiveFW.';
      icon = Icons.system_update_alt;
      color = theme.colorScheme.primary;
    } else if (check.updateAvailable) {
      status =
          'Atualização disponível: ${check.currentVersion} → ${check.latest.version}';
      icon = Icons.new_releases_outlined;
      color = theme.colorScheme.primary;
    } else {
      status = 'HiveFW ${check.currentVersion} está atualizada.';
      icon = Icons.check_circle_outline;
      color = Colors.green;
    }

    return _CardSection(
      title: 'Atualização da app',
      icon: Icons.system_update_alt,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          ListTile(
            contentPadding: EdgeInsets.zero,
            leading:
                _checking
                    ? const SizedBox(
                      width: 24,
                      height: 24,
                      child: CircularProgressIndicator(strokeWidth: 2),
                    )
                    : Icon(icon, color: color),
            title: Text(status),
            subtitle:
                check == null
                    ? const Text(
                      'Fonte: releases oficiais do repositório HiveFW.',
                    )
                    : Text(
                      '${check.latest.name}'
                      '${check.latest.prerelease ? ' · beta/pré-release' : ''}',
                    ),
          ),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              OutlinedButton.icon(
                onPressed: _checking || _installing ? null : _checkNow,
                icon: const Icon(Icons.refresh),
                label: const Text('Verificar atualizações'),
              ),
              if (check?.updateAvailable == true)
                FilledButton.icon(
                  onPressed: _checking || _installing ? null : _install,
                  icon:
                      _installing
                          ? const SizedBox(
                            width: 16,
                            height: 16,
                            child: CircularProgressIndicator(strokeWidth: 2),
                          )
                          : Icon(
                            kIsWeb ||
                                    defaultTargetPlatform !=
                                        TargetPlatform.android
                                ? Icons.open_in_new
                                : Icons.download_for_offline_outlined,
                          ),
                  label: Text(
                    _installing
                        ? 'A descarregar…'
                        : (kIsWeb ||
                                defaultTargetPlatform != TargetPlatform.android)
                            ? 'Abrir release'
                            : 'Descarregar e instalar',
                  ),
                ),
            ],
          ),
          if (check?.updateAvailable == true &&
              !kIsWeb &&
              defaultTargetPlatform == TargetPlatform.android) ...[
            const SizedBox(height: 8),
            Text(
              'O Android irá pedir confirmação antes de instalar. '
              'A atualização só pode substituir a app atual se ambos os APKs '
              'forem assinados com a mesma chave.',
              style: theme.textTheme.bodySmall?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
              ),
            ),
          ],
        ],
      ),
    );
  }
}
