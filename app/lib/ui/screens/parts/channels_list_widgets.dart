part of '../channels_list_screen.dart';

// ---------------------------------------------------------------------------
// Empty states
// ---------------------------------------------------------------------------

class _EmptyState extends StatelessWidget {
  const _EmptyState({required this.onRefresh});
  final VoidCallback onRefresh;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            Icons.forum_outlined,
            size: 64,
            color: theme.colorScheme.onSurface.withAlpha(60),
          ),
          const SizedBox(height: 16),
          Text(
            context.l10n.channelsEmpty,
            style: theme.textTheme.bodyLarge?.copyWith(
              color: theme.colorScheme.onSurface.withAlpha(120),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            context.l10n.channelsEmptyHint,
            style: theme.textTheme.bodySmall,
          ),
          const SizedBox(height: 24),
          FilledButton.icon(
            onPressed: onRefresh,
            icon: const Icon(Icons.refresh),
            label: Text(context.l10n.channelsRefresh),
          ),
        ],
      ),
    );
  }
}

class _ChannelSectionLabel extends StatelessWidget {
  const _ChannelSectionLabel({required this.label, this.trailing});

  final String label;
  final Widget? trailing;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 18, 16, 6),
      child: Row(
        children: [
          Expanded(
            child: Text(
              label.toUpperCase(),
              style: theme.textTheme.labelSmall?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
                fontWeight: FontWeight.w700,
                letterSpacing: 0.8,
              ),
            ),
          ),
          if (trailing != null) trailing!,
        ],
      ),
    );
  }
}

class _AppsChannelSection extends ConsumerWidget {
  const _AppsChannelSection({
    required this.channel,
    required this.onConfigure,
    required this.onEdit,
  });

  final ChannelInfo? channel;
  final VoidCallback onConfigure;
  final VoidCallback? onEdit;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final ch = channel;
    final unreadCount =
        ch == null
            ? 0
            : ref.watch(
              unreadCountsProvider.select((u) => u.forChannel(ch.index)),
            );

    ChatMessage? lastMessage;
    if (ch != null) {
      ref.watch(
        messageVersionsProvider.select((vs) => vs['ch_${ch.index}'] ?? 0),
      );
      final messages = ref.read(messagesProvider.notifier).forChannel(ch.index);
      if (messages.isNotEmpty) lastMessage = messages.last;
    }

    final hasUnread = unreadCount > 0;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12),
      child: Card(
        margin: EdgeInsets.zero,
        color: theme.colorScheme.primaryContainer.withAlpha(70),
        child: InkWell(
          borderRadius: BorderRadius.circular(12),
          onTap:
              ch == null
                  ? onConfigure
                  : () => context.push('/channels/${ch.index}'),
          onLongPress: onEdit,
          child: Padding(
            padding: const EdgeInsets.fromLTRB(12, 10, 8, 10),
            child: Row(
              children: [
                Badge(
                  isLabelVisible: hasUnread,
                  label: Text(unreadCount > 99 ? '99+' : '$unreadCount'),
                  child: CircleAvatar(
                    backgroundColor: theme.colorScheme.primaryContainer,
                    child: const Icon(Icons.emergency_share_outlined),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Expanded(
                            child: Text(
                              'Canal APPS/SOS',
                              style: theme.textTheme.titleMedium?.copyWith(
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                          ),
                          if (ch != null)
                            Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 7,
                                vertical: 2,
                              ),
                              decoration: BoxDecoration(
                                color: theme.colorScheme.primaryContainer,
                                borderRadius: BorderRadius.circular(999),
                              ),
                              child: Text(
                                'Canal ${ch.index}',
                                style: theme.textTheme.labelSmall?.copyWith(
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                            ),
                        ],
                      ),
                      const SizedBox(height: 2),
                      Text(
                        ch == null
                            ? 'Nenhum canal selecionado'
                            : _safeUiText(
                              ch.name,
                              fallback: 'Canal ${ch.index}',
                            ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: theme.textTheme.bodyMedium?.copyWith(
                          fontWeight: ch == null ? null : FontWeight.w600,
                        ),
                      ),
                      if (ch != null) ...[
                        const SizedBox(height: 2),
                        Text(
                          lastMessage == null
                              ? context.l10n.commonNoMessages
                              : _appsPreviewText(context, lastMessage),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: theme.textTheme.bodySmall?.copyWith(
                            color:
                                hasUnread
                                    ? theme.colorScheme.primary
                                    : theme.colorScheme.onSurfaceVariant,
                            fontWeight: hasUnread ? FontWeight.w600 : null,
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
                IconButton(
                  tooltip: 'Alterar Canal APPS/SOS',
                  onPressed: onConfigure,
                  icon: const Icon(Icons.settings_outlined),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  String _appsPreviewText(BuildContext context, ChatMessage msg) {
    if (msg.isOutgoing) {
      return '${context.l10n.commonSentByMe}: ${_safeUiText(msg.text, fallback: '')}';
    }
    if (msg.senderName != null && msg.senderName!.isNotEmpty) {
      return '${_safeUiText(msg.senderName, fallback: 'Desconhecido')}: ${_safeUiText(msg.text, fallback: '')}';
    }
    return _safeUiText(msg.text, fallback: '');
  }
}

// ---------------------------------------------------------------------------
// Channel tile
// ---------------------------------------------------------------------------

class _ChannelTile extends ConsumerWidget {
  const _ChannelTile({
    required this.channel,
    required this.onEdit,
  });
  final ChannelInfo channel;
  final VoidCallback onEdit;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final unreadCount = ref.watch(
      unreadCountsProvider.select((u) => u.forChannel(channel.index)),
    );
    final isMuted = ref.watch(
      mutedChannelsProvider.select((s) => s.contains(channel.index)),
    );
    final isFavorite = ref.watch(
      channelUiPrefsProvider.select((p) => p.favorites.contains(channel.index)),
    );

    // Watch only this channel's version so the card rebuilds only when
    // messages arrive on this specific channel (#2 perf fix).
    ref.watch(
      messageVersionsProvider.select((vs) => vs['ch_${channel.index}'] ?? 0),
    );
    final channelMessages = ref
        .read(messagesProvider.notifier)
        .forChannel(channel.index);
    final lastMessage =
        channelMessages.isNotEmpty ? channelMessages.last : null;
    final hasUnread = unreadCount > 0;

    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: () => context.push('/channels/${channel.index}'),
        onLongPress: onEdit,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
          child: Row(
            children: [
              // Leading: index badge with unread indicator (greyed when muted)
              Badge(
                isLabelVisible: hasUnread && !isMuted,
                label: Text(unreadCount > 99 ? '99+' : '$unreadCount'),
                child: CircleAvatar(
                  backgroundColor:
                      hasUnread && !isMuted
                          ? theme.colorScheme.primaryContainer
                          : theme.colorScheme.surfaceContainerHighest,
                  child:
                      isMuted
                          ? Icon(
                            Icons.notifications_off_outlined,
                            size: 18,
                            color: theme.colorScheme.onSurface.withAlpha(120),
                          )
                          : Text(
                            '${channel.index}',
                            style: TextStyle(
                              color:
                                  hasUnread
                                      ? theme.colorScheme.onPrimaryContainer
                                      : theme.colorScheme.onSurface.withAlpha(
                                        180,
                                      ),
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                ),
              ),

              const SizedBox(width: 12),

              // Channel name + last message preview
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: Text(
                            _safeUiText(
                              channel.name,
                              fallback: 'Canal ${channel.index}',
                            ),
                            style: theme.textTheme.titleMedium?.copyWith(
                              fontWeight:
                                  hasUnread && !isMuted
                                      ? FontWeight.bold
                                      : FontWeight.w500,
                              color:
                                  isMuted
                                      ? theme.colorScheme.onSurface.withAlpha(
                                        120,
                                      )
                                      : null,
                            ),
                          ),
                        ),
                        if (isFavorite)
                          Padding(
                            padding: const EdgeInsets.only(left: 4),
                            child: Icon(
                              Icons.star,
                              size: 16,
                              color: Colors.amber.shade700,
                            ),
                          ),
                        if (isMuted)
                          Padding(
                            padding: const EdgeInsets.only(left: 4),
                            child: Text(
                              context.l10n.channelsMuteLabel,
                              style: theme.textTheme.labelSmall?.copyWith(
                                color: theme.colorScheme.onSurface.withAlpha(
                                  100,
                                ),
                              ),
                            ),
                          ),
                      ],
                    ),
                    const SizedBox(height: 2),
                    Text(
                      _previewText(context, lastMessage),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: theme.textTheme.bodySmall?.copyWith(
                        color:
                            hasUnread
                                ? theme.colorScheme.primary
                                : theme.colorScheme.onSurface.withAlpha(140),
                        fontWeight: hasUnread ? FontWeight.w600 : null,
                      ),
                    ),
                  ],
                ),
              ),

              // Trailing: timestamp + total count
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  if (lastMessage != null)
                    Text(
                      _formatTimestamp(context, lastMessage.timestamp),
                      style: theme.textTheme.labelSmall?.copyWith(
                        color:
                            hasUnread
                                ? theme.colorScheme.primary
                                : theme.colorScheme.onSurface.withAlpha(120),
                        fontWeight: hasUnread ? FontWeight.bold : null,
                      ),
                    ),
                  if (channelMessages.isNotEmpty) ...[
                    const SizedBox(height: 4),
                    Text(
                      '${channelMessages.length} msg',
                      style: theme.textTheme.labelSmall?.copyWith(
                        color: theme.colorScheme.onSurface.withAlpha(100),
                      ),
                    ),
                  ],
                ],
              ),

              const SizedBox(width: 4),

              // Keep options at the far-right edge of the tile.
              IconButton(
                icon: const Icon(Icons.more_vert, size: 18),
                tooltip: context.l10n.channelsOptionsFabTooltip,
                onPressed: onEdit,
                visualDensity: VisualDensity.compact,
              ),
            ],
          ),
        ),
      ),
    );
  }

  String _previewText(BuildContext context, ChatMessage? msg) {
    if (msg == null) return context.l10n.commonNoMessages;
    final l10n = context.l10n;
    if (msg.isOutgoing) {
      return '${l10n.commonSentByMe}: ${_safeUiText(msg.text, fallback: '')}';
    }
    if (msg.senderName != null && msg.senderName!.isNotEmpty) {
      return '${_safeUiText(msg.senderName, fallback: 'Desconhecido')}: ${_safeUiText(msg.text, fallback: '')}';
    }
    return _safeUiText(msg.text, fallback: '');
  }

  String _formatTimestamp(BuildContext context, int ts) {
    final dt = DateTime.fromMillisecondsSinceEpoch(ts * 1000);
    final now = DateTime.now();
    final diff = now.difference(dt);
    if (diff.inMinutes < 1) return context.l10n.telemetryNow;
    if (diff.inMinutes < 60) return '${diff.inMinutes}m';
    if (diff.inHours < 24) return '${diff.inHours}h';
    if (diff.inDays < 7) return '${diff.inDays}d';
    return '${dt.day}/${dt.month}';
  }
}

// ---------------------------------------------------------------------------
