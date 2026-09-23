import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { Contact, Channel } from '../types';
import type { UnreadController } from '../chat/unread-controller';
// manage-dialog is loaded by chat-page

type ChatFilter = 'all' | 'unread' | 'dms' | 'channels';

@customElement('meshcore-conversation-list')
export class ConversationList extends LitElement {
  @property({ type: Array }) conversations: Array<Contact | Channel> = [];
  @property({ type: String }) activeId: string | null = null;
  /**
   * The panel-owned `UnreadController`. `_getUnreadCount` reads the
   * badge value from `unread.badgeCount`.
   */
  @property({ attribute: false }) unread!: UnreadController;
  /**
   * Still bound (`.unreadCounts=${unread.counts}` from
   * chat-page) — its fresh identity on every controller mutation is
   * what re-renders this component. The badge VALUE, however, now
   * comes from the controller via `_getUnreadCount`.
   */
  @property({ type: Object }) unreadCounts: Record<string, number> = {};
  @property({ type: String }) nodePrefix: string | null = null;

  @state() private _activeFilter: ChatFilter = 'all';
  @state() private _filteredConversations: Array<Contact | Channel> = [];
  @state() private _appsChannelId: string | null = null;
  @state() private _appsPickerOpen = false;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      width: 280px;
      border-right: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      flex-shrink: 0;
    }

    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 12px 8px;
      gap: 8px;
      min-width: 0;
    }

    .apps-section {
      position: relative;
      flex: 0 0 auto;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }

    .apps-channel-slot {
      min-height: 65px;
    }

    .apps-channel-selected {
      display:grid;
      grid-template-columns:minmax(0,1fr) auto;
      align-items:center;
      gap:6px;
    }

    .apps-channel-selected .compose-btn {
      flex:0 0 auto;
    }

    .apps-empty {
      padding: 12px;
      color: var(--secondary-text-color, #727272);
      font-size: 12px;
    }

    .apps-picker {
      position: absolute;
      top: 48px;
      left: 8px;
      right: 8px;
      z-index: 20;
      padding: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 10px;
      background: var(--card-background-color, #fff);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
      max-height: min(360px, 55vh);
      overflow-y: auto;
    }

    .apps-picker-title {
      padding: 4px 8px 8px;
      color: var(--secondary-text-color, #727272);
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: .04em;
    }

    .apps-picker-item,
    .apps-picker-manage {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 8px;
      padding: 9px 10px;
      border: 0;
      border-radius: 7px;
      background: transparent;
      color: var(--primary-text-color);
      font: inherit;
      font-size: 13px;
      text-align: left;
      cursor: pointer;
      box-sizing: border-box;
    }

    .apps-picker-item:hover,
    .apps-picker-manage:hover {
      background: rgba(0, 0, 0, 0.04);
    }

    .apps-picker-item.active {
      color: var(--primary-color, #03a9f4);
      background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.08);
      font-weight: 600;
    }

    .apps-picker-divider {
      height: 1px;
      margin: 6px 2px;
      background: var(--divider-color, #e0e0e0);
    }

    .apps-picker-channel {
      min-width: 0;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .apps-picker-check {
      flex: 0 0 auto;
      width: 16px;
      text-align: center;
    }

    .main-section-header {
      padding-bottom: 6px;
    }

    .main-section-title {
      font-size: 14px;
    }

    .sidebar-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--primary-text-color);
      flex: 1;
    }

    .compose-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: var(--secondary-text-color);
      cursor: pointer;
      transition: all 0.15s;
      flex-shrink: 0;
    }

    .compose-btn:hover {
      background: rgba(0, 0, 0, 0.05);
      color: var(--primary-text-color);
    }

    .compose-btn:disabled {
      opacity: 0.35;
      cursor: default;
      background: transparent;
      color: var(--secondary-text-color);
    }

    .apps-header-actions {
      display: flex;
      align-items: center;
      gap: 2px;
      flex-shrink: 0;
    }

    .filter-bar {
      display: flex;
      padding: 12px 12px 8px;
      gap: 4px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }

    .filter-btn {
      flex: 1;
      padding: 6px 4px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 16px;
      background: transparent;
      color: var(--secondary-text-color, #727272);
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
      white-space: nowrap;
    }

    .filter-btn:hover {
      background: rgba(0, 0, 0, 0.03);
      color: var(--primary-text-color);
    }

    .filter-btn.active {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: #fff;
    }

    .conversation-list {
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: contain;
    }

    .conversation-list::-webkit-scrollbar {
      width: 6px;
    }

    .conversation-list::-webkit-scrollbar-track {
      background: transparent;
    }

    .conversation-list::-webkit-scrollbar-thumb {
      background: var(--scrollbar-thumb, var(--scrollbar-thumb-color, #c1c1c1));
      border-radius: 3px;
    }

    .conversation-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      cursor: pointer;
      transition: background 0.15s;
      outline: none;
    }

    .conversation-item:hover,
    .conversation-item:focus-visible {
      background: rgba(0, 0, 0, 0.02);
    }

    .conversation-item:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: -2px;
    }

    .conversation-item.active {
      background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.08);
      border-left: 3px solid var(--primary-color, #03a9f4);
    }

    .conversation-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
      flex-shrink: 0;
    }

    .conversation-avatar.channel {
      background: var(--accent-color, #ff9800);
    }

    .conversation-info {
      flex: 1;
      overflow: hidden;
    }

    .conversation-name {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .conversation-detail {
      font-size: 12px;
      color: var(--secondary-text-color, #727272);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .chevron {
      flex-shrink: 0;
      color: var(--secondary-text-color, #727272);
      font-size: 18px;
      line-height: 1;
      opacity: 0.5;
    }

    .unread-badge {
      background: var(--primary-color, #03a9f4);
      color: #fff;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 600;
      flex-shrink: 0;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--secondary-text-color, #727272);
      text-align: center;
      padding: 24px;
    }

    .empty-icon {
      font-size: 32px;
      margin-bottom: 8px;
      opacity: 0.5;
    }

    .empty-text {
      font-size: 13px;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._loadAppsChannelPreference();
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('nodePrefix')) {
      this._loadAppsChannelPreference();
    }
    if (
      changedProperties.has('conversations') ||
      changedProperties.has('_activeFilter') ||
      changedProperties.has('_appsChannelId')
    ) {
      this._updateFiltered();
    }
  }

  render() {
    const appsChannel = this._getAppsChannel();
    const channels = this._channelConversations();

    return html`
      <section class="apps-section" aria-label="Canal APPS/SOS">
        <div class="sidebar-header">
          <span class="sidebar-title">Canal APPS/SOS</span>

        </div>

        <div class="apps-channel-slot" role="listbox" aria-label="Canal APPS/SOS selecionado">
          ${appsChannel
            ? html`
                <div class="apps-channel-selected">
                  ${this._renderConversation(appsChannel, 0)}
                  <button
                    class="compose-btn"
                    title="Selecionar canal APPS/SOS"
                    aria-label="Selecionar canal APPS/SOS"
                    aria-expanded=${this._appsPickerOpen ? 'true' : 'false'}
                    @click=${(e: Event) => {
                      e.stopPropagation();
                      this._appsPickerOpen = !this._appsPickerOpen;
                    }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 00-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                    </svg>
                  </button>
                </div>
              `
            : html`<div class="apps-empty">Seleciona o canal usado por APPS/SOS na roda dentada.</div>`}
        </div>

        ${this._appsPickerOpen ? html`
          <div class="apps-picker" role="menu" aria-label="Selecionar canal APPS/SOS">
            <div class="apps-picker-title">Canal apresentado</div>
            <button
              class="apps-picker-item ${this._appsChannelId === null ? 'active' : ''}"
              @click=${() => this._setAppsChannel(null)}>
              <span class="apps-picker-check">${this._appsChannelId === null ? '✓' : ''}</span>
              <span class="apps-picker-channel">Nenhum</span>
            </button>
            ${channels.map((channel) => {
              const id = String(channel.channel_idx);
              const active = id === this._appsChannelId;
              return html`
                <button
                  class="apps-picker-item ${active ? 'active' : ''}"
                  @click=${() => this._setAppsChannel(id)}>
                  <span class="apps-picker-check">${active ? '✓' : ''}</span>
                  <span class="apps-picker-channel">${channel.name || `Channel ${channel.channel_idx}`}</span>
                </button>
              `;
            })}
          </div>
        ` : ''}
      </section>

      <div class="sidebar-header main-section-header">
        <span class="sidebar-title main-section-title">Canais</span>
        <div class="apps-header-actions">
          <button
            class="compose-btn"
            title="Marcar todas as mensagens como lidas"
            aria-label="Marcar todas as mensagens como lidas"
            ?disabled=${!this._hasUnreadMessages()}
            @click=${() => this._markAllRead()}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </button>
          <button
            class="compose-btn"
            title="Atualizar canais do rádio"
            aria-label="Atualizar canais do rádio"
            @click=${() => this.dispatchEvent(
              new CustomEvent('refresh-channels-requested', {
                bubbles: true,
                composed: true,
              }),
            )}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.09 0-7.19 3.72-6.39 7.69l-2.08.68C2.47 7.11 6.48 2 12 2c2.76 0 5.26 1.12 7.07 2.93L22 2v8h-8l3.65-3.65zM6.35 17.65C7.8 19.1 9.79 20 12 20c4.09 0 7.19-3.72 6.39-7.69l2.08-.68C21.53 16.89 17.52 22 12 22c-2.76 0-5.26-1.12-7.07-2.93L2 22v-8h8l-3.65 3.65z"/>
            </svg>
          </button>
          <button
            class="compose-btn"
            title="Gerir canais"
            aria-label="Gerir canais"
            @click=${() => this.dispatchEvent(
              new CustomEvent('manage-requested', {
                detail: { tab: 'channels' },
                bubbles: true,
                composed: true,
              }),
            )}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 00-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
            </svg>
          </button>
        </div>
      </div>
      <div
        class="conversation-list"
        role="listbox"
        aria-label="Canais e chats"
        @keydown=${this._onListKeyDown}>
        ${this._filteredConversations.length > 0
          ? this._filteredConversations.map((conv, idx) => this._renderConversation(conv, idx))
          : html`
              <div class="empty-state">
                <div class="empty-text">
                  ${this._emptyMessage()}
                </div>
              </div>
            `}
      </div>
    `;
  }

  /**
   * Arrow-key navigation between conversation rows. Each
   * row is a focusable role="option" (see _renderConversation); arrow
   * keys move focus, Enter/Space selects, Home/End jump to ends.
   */
  private _onListKeyDown(e: KeyboardEvent) {
    const key = e.key;
    if (
      key !== 'ArrowDown' &&
      key !== 'ArrowUp' &&
      key !== 'Home' &&
      key !== 'End' &&
      key !== 'Enter' &&
      key !== ' '
    ) {
      return;
    }

    const root = this.shadowRoot;
    if (!root) return;
    const items = Array.from(
      root.querySelectorAll<HTMLElement>('.conversation-item'),
    );
    if (items.length === 0) return;

    const current = root.activeElement as HTMLElement | null;
    let idx = current ? items.indexOf(current) : -1;

    if (key === 'Enter' || key === ' ') {
      if (current && idx >= 0) {
        e.preventDefault();
        current.click();
      }
      return;
    }

    e.preventDefault();
    if (key === 'Home') {
      idx = 0;
    } else if (key === 'End') {
      idx = items.length - 1;
    } else if (key === 'ArrowDown') {
      idx = idx < 0 ? 0 : Math.min(idx + 1, items.length - 1);
    } else if (key === 'ArrowUp') {
      idx = idx < 0 ? items.length - 1 : Math.max(idx - 1, 0);
    }

    items[idx]?.focus();
  }

  private _appsStorageKey(): string {
    return `hivefw.apps_sos_channel.${this.nodePrefix || 'default'}`;
  }

  private _loadAppsChannelPreference() {
    try {
      const value = window.localStorage.getItem(this._appsStorageKey());
      this._appsChannelId = value && value.length ? value : null;
    } catch {
      this._appsChannelId = null;
    }
  }

  private _setAppsChannel(id: string | null) {
    this._appsChannelId = id;
    this._appsPickerOpen = false;
    try {
      if (id === null) {
        window.localStorage.removeItem(this._appsStorageKey());
      } else {
        window.localStorage.setItem(this._appsStorageKey(), id);
      }
    } catch {
      // Storage can be unavailable in private/embedded WebViews; the
      // current in-memory selection still works for this session.
    }
    this._updateFiltered();
  }

  private _channelConversations(): Channel[] {
    return this.conversations.filter(
      (conv): conv is Channel => !('pubkey_prefix' in conv),
    );
  }

  private _getAppsChannel(): Channel | null {
    if (this._appsChannelId === null) return null;
    return this._channelConversations().find(
      (channel) => String(channel.channel_idx) === this._appsChannelId,
    ) ?? null;
  }

  private _isAppsChannel(conv: Contact | Channel): boolean {
    return (
      this._appsChannelId !== null &&
      !('pubkey_prefix' in conv) &&
      String((conv as Channel).channel_idx) === this._appsChannelId
    );
  }

  private _renderFilterBtn(filter: ChatFilter, label: string) {
    const active = this._activeFilter === filter;
    return html`
      <button
        class="filter-btn ${active ? 'active' : ''}"
        role="tab"
        aria-selected=${active ? 'true' : 'false'}
        @click=${() => { this._activeFilter = filter; }}>
        ${label}
      </button>
    `;
  }

  private _hasUnreadMessages(): boolean {
    const counts = this.unread?.counts ?? this.unreadCounts ?? {};
    return Object.values(counts).some((value) => Number(value) > 0);
  }

  private _markAllRead() {
    this.dispatchEvent(new CustomEvent('mark-all-read-requested', {
      bubbles: true,
      composed: true,
    }));
  }

  private _emptyMessage(): string {
    switch (this._activeFilter) {
      case 'unread': return 'No unread conversations';
      case 'dms': return 'No direct messages';
      case 'channels': return 'No channels';
      default: return 'No conversations yet';
    }
  }

  private _renderConversation(conv: Contact | Channel, listIdx: number) {
    const isContact = 'pubkey_prefix' in conv;
    const id = isContact ? (conv as Contact).pubkey_prefix : String((conv as Channel).channel_idx);
    const name = isContact ? (conv as Contact).adv_name : (conv as Channel).name;
    const detail = isContact ? (conv as Contact).pubkey_prefix : `Channel ${(conv as Channel).channel_idx}`;
    const avatar = isContact
      ? (conv as Contact).pubkey_prefix.substring(0, 2).toUpperCase()
      : `#${(conv as Channel).channel_idx}`;

    const isActive = this.activeId === id;

    const unread = this._getUnreadCount(id);
    const ariaLabel = unread > 0
      ? `${name}, ${detail}, ${unread} unread`
      : `${name}, ${detail}`;

    // Roving tabindex: exactly one item in the list is the Tab stop.
    // Prefer the active item; if nothing is active, the first row.
    const hasActiveInList = this._filteredConversations.some(
      (c) =>
        ('pubkey_prefix' in c
          ? (c as Contact).pubkey_prefix
          : String((c as Channel).channel_idx)) === this.activeId,
    );
    const isTabStop = isActive || (!hasActiveInList && listIdx === 0);

    return html`
      <div
        class=${isActive ? 'conversation-item active' : 'conversation-item'}
        role="option"
        tabindex=${isTabStop ? '0' : '-1'}
        aria-selected=${isActive ? 'true' : 'false'}
        aria-label=${ariaLabel}
        @click=${() => this.dispatchEvent(
          new CustomEvent('conversation-selected', { detail: { id, isContact } }),
        )}>
        <div class="conversation-avatar ${isContact ? '' : 'channel'}">${avatar}</div>
        <div class="conversation-info">
          <div class="conversation-name">${name}</div>
          <div class="conversation-detail">${detail}</div>
        </div>
        ${unread > 0
          ? html`<div class="unread-badge" aria-hidden="true">${unread}</div>`
          : html`<span class="chevron" aria-hidden="true">›</span>`}
      </div>
    `;
  }

  private _getUnreadCount(id: string): number {
    // Unified badge projection. `UnreadController.badgeCount`
    // is the single implementation backing this and
    // `chat-page._getUnreadCountForSelected`. It owns the entity-id
    // suffix matching, the node_prefix scoping for
    // channels (so same-named channels on different upstream entries
    // don't cross-contaminate), and the suffix-only fallback when
    // nodePrefix is null. The `unread` prop is always supplied by
    // chat-page; the guard covers the brief pre-binding window.
    return this.unread ? this.unread.badgeCount(id, this.nodePrefix) : 0;
  }

  private _updateFiltered() {
    // The APPS/SOS channel is pinned in the dedicated block above and is
    // therefore intentionally excluded from every lower-list filter.
    const conversations = this.conversations.filter(
      (conv) => !this._isAppsChannel(conv),
    );

    switch (this._activeFilter) {
      case 'all':
        this._filteredConversations = [...conversations];
        break;
      case 'unread':
        this._filteredConversations = conversations.filter((conv) => {
          const isContact = 'pubkey_prefix' in conv;
          const id = isContact ? (conv as Contact).pubkey_prefix : String((conv as Channel).channel_idx);
          return this._getUnreadCount(id) > 0;
        });
        break;
      case 'dms':
        this._filteredConversations = conversations.filter(
          (conv) => 'pubkey_prefix' in conv,
        );
        break;
      case 'channels':
        this._filteredConversations = conversations.filter(
          (conv) => !('pubkey_prefix' in conv),
        );
        break;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'meshcore-conversation-list': ConversationList;
  }
}
