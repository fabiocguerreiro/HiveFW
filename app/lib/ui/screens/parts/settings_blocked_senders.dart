part of '../settings_screen.dart';

class _BlockedSendersCard extends ConsumerWidget {
  const _BlockedSendersCard();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final blocked = ref.watch(blockedSendersProvider).toList()..sort();
    final theme = Theme.of(context);

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                Icon(Icons.block, color: theme.colorScheme.primary),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Utilizadores bloqueados',
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 6),
            Text(
              'Mensagens de remetentes bloqueados são ignoradas antes de '
              'entrarem no histórico, unread ou notificações.',
              style: theme.textTheme.bodySmall,
            ),
            const Divider(height: 22),
            if (blocked.isEmpty)
              const Text('Não existem utilizadores bloqueados.')
            else
              for (final name in blocked)
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: const Icon(Icons.person_off_outlined),
                  title: Text(name),
                  trailing: IconButton(
                    tooltip: 'Desbloquear',
                    icon: const Icon(Icons.lock_open_outlined),
                    onPressed:
                        () => ref
                            .read(blockedSendersProvider.notifier)
                            .unblock(name),
                  ),
                ),
          ],
        ),
      ),
    );
  }
}
