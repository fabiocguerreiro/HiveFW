part of '../hivefw_device_screen.dart';

class _AboutCard extends StatelessWidget {
  const _AboutCard();

  Future<PackageInfo> _packageInfo() => PackageInfo.fromPlatform();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Card(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16, 13, 16, 13),
        child: FutureBuilder<PackageInfo>(
          future: _packageInfo(),
          builder: (context, snapshot) {
            final info = snapshot.data;
            final version = info == null
                ? '—'
                : '${info.version} (${info.buildNumber})';
            return Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Icon(
                      Icons.info_outline,
                      size: 20,
                      color: theme.colorScheme.primary,
                    ),
                    const SizedBox(width: 8),
                    Text(
                      'Sobre',
                      style: theme.textTheme.titleSmall?.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const Spacer(),
                    Text(
                      'v$version',
                      style: theme.textTheme.labelSmall?.copyWith(
                        color: theme.colorScheme.onSurfaceVariant,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 9),
                Text(
                  'HiveFW para Android · base técnica originada na LusoApp e '
                  'no protocolo MeshCore, com identidade, UI, transportes e '
                  'extensões próprias do HiveFW.',
                  style: theme.textTheme.bodySmall,
                ),
                const SizedBox(height: 7),
                Text(
                  'Licença MIT · HiveFW contributors / Portuguese MeshCore Community.',
                  style: theme.textTheme.labelSmall?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
                const SizedBox(height: 5),
                Wrap(
                  spacing: 4,
                  runSpacing: 0,
                  children: [
                    TextButton(
                      style: TextButton.styleFrom(
                        padding: const EdgeInsets.symmetric(horizontal: 6),
                        visualDensity: VisualDensity.compact,
                      ),
                      onPressed: () => showLicensePage(
                        context: context,
                        applicationName: 'HiveFW',
                        applicationVersion: version,
                        applicationLegalese:
                            'MIT · Base técnica LusoApp / MeshCore',
                      ),
                      child: const Text('Licenças'),
                    ),
                    TextButton(
                      style: TextButton.styleFrom(
                        padding: const EdgeInsets.symmetric(horizontal: 6),
                        visualDensity: VisualDensity.compact,
                      ),
                      onPressed: () => launchUrl(
                        Uri.parse('https://github.com/fabiocguerreiro/HiveFW'),
                        mode: LaunchMode.externalApplication,
                      ),
                      child: const Text('Repositório'),
                    ),
                  ],
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
