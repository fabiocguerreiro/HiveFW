// @ts-nocheck
import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../components/network-map';

/**
 * Native Lit Network page.
 *
 * This component owns the complete Rede DOM.  The parent panel remains the
 * data/service controller while the page renders declaratively, so normal
 * Home Assistant hass updates can no longer tear down and rebuild columns,
 * listeners or the map.  The map/Leaflet lifecycle is isolated in
 * <hivefw-network-map>.
 */
@customElement('hivefw-network-page')
export class HiveFWNetworkPage extends LitElement {
  @property({ attribute: false }) controller: any = null;
  @property({ type: Number }) revision = 0;
  @property({ type: Boolean }) narrow = false;

  @state() private _contactSearchOpen = false;
  @state() private _contactSearchQuery = '';
  @state() private _contactMenuOpen = false;
  @state() private _contactsRefreshing = false;

  createRenderRoot() {
    // Keep the existing HiveFW visual system from the parent shadow root while
    // Lit owns the actual Network DOM.
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    // page-container intentionally has overflow:hidden; each page owns its own
    // scroll model.  Rede therefore provides the single outer scrollbar while
    // the three list columns keep their independent desktop scrolling.
    this.style.display = 'block';
    this.style.width = '100%';
    this.style.height = '100%';
    this.style.minHeight = '0';
    this.style.overflow = 'auto';
    this.style.overscrollBehaviorY = 'auto';
    this.style.touchAction = 'pan-y';
    (this.style as any).webkitOverflowScrolling = 'touch';
  }

  private get c() {
    return this.controller;
  }

  private _map() {
    return this.querySelector('hivefw-network-map') as any;
  }

  private _age(seconds: number) {
    const value = Math.max(0, Math.floor(Number(seconds) || 0));
    if (value < 10) return 'agora';
    if (value < 60) return value + 's';
    const minutes = Math.floor(value / 60);
    if (minutes < 60) return minutes + ' min';
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + ' h';
    return Math.floor(hours / 24) + ' d';
  }

  private _state(title: string, detail: string) {
    return html`
      <div class="mcr-state">
        <div class="mcr-state-icon">◉</div>
        <div class="mcr-state-title">${title}</div>
        <div class="mcr-state-text">${detail}</div>
      </div>
    `;
  }

  private _signalBars(snrValue: unknown) {
    const snr = Number(snrValue);
    let count = 0;
    let color = '#757575';
    let label = 'Sinal indisponível';
    if (Number.isFinite(snr)) {
      if (snr >= 0) {
        count = 4; color = '#4caf50'; label = 'Sinal excelente';
      } else if (snr >= -5) {
        count = 3; color = '#8bc34a'; label = 'Sinal bom';
      } else if (snr >= -10) {
        count = 2; color = '#ff9800'; label = 'Sinal razoável';
      } else {
        count = 1; color = '#f44336'; label = 'Sinal fraco';
      }
    }
    const title = Number.isFinite(snr)
      ? label + ' · SNR ' + snr.toFixed(1) + ' dB'
      : label;
    return html`
      <span class="hive-signal-bars"
        data-bars=${String(count)}
        style=${'--hive-signal-color:' + color}
        title=${title}
        aria-label=${title}></span>
    `;
  }

  private _setMapMode(mode: 'neighbors' | 'discovery' | 'contacts') {
    if (!this.c) return;
    this.c.__hiveNeighborMapMode = mode;
    if (mode === 'contacts') {
      this.c.__hiveNeighborMapFocusId = '';
    } else {
      this.c.__nodesMapFocusId = '';
    }
    this.requestUpdate();
  }

  private async _focusNeighbor(item: any, mode: 'neighbors' | 'discovery') {
    if (!item) return;
    this.c.__hiveNeighborMapMode = mode;
    this.c.__hiveNeighborMapFocusId = String(item?.pubkey || item?.pubkey_prefix || '');
    this.requestUpdate();
    await this.updateComplete;
    await this._map()?.focusNeighbor?.(item, mode);
  }

  private async _focusContact(contact: any, openPopup = true) {
    if (!contact) return;
    this.c.__hiveNeighborMapMode = 'contacts';
    this.c.__nodesMapFocusId = this.c.__nodeId?.(contact) || '';
    this.requestUpdate();
    await this.updateComplete;
    await this._map()?.focusContact?.(contact, openPopup);
  }

  private async _refreshContacts() {
    if (this._contactsRefreshing || this.c?.__nodesMapLoading) return;
    this._contactsRefreshing = true;
    try {
      await this.c?.__refreshNetworkContacts?.();
    } finally {
      this._contactsRefreshing = false;
      this.requestUpdate();
    }
  }

  private async _importContacts(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const button = this.querySelector('[data-network-import-button]') as HTMLButtonElement | null;
    try {
      await this.c?.__importHiveFWContacts?.(file, button);
      // __importHiveFWContacts already reloads the canonical contact snapshot.
      // Do not immediately issue the same get_contacts request a second time.
      this._contactMenuOpen = false;
      this.requestUpdate();
    } finally {
      input.value = '';
    }
  }

  private _renderPassiveNeighbors() {
    const c = this.c;
    const data = c?.__hiveNeighbors;

    const head = html`
      <div class="hive-discovery-head" style="margin:-14px -14px 12px;">
        <div>
          <div class="hive-discovery-eyebrow">PASSIVO</div>
          <div class="hive-discovery-title">Vizinhos</div>
          <div class="hive-discovery-subtitle">
            Repeaters ouvidos diretamente nos últimos 7 dias (Zero-Hop)
          </div>
        </div>
        <button type="button"
          class="hive-network-contact-search-button"
          ?disabled=${Boolean(c?.__hiveNeighborsLoading)}
          title=${c?.__hiveNeighborsLoading ? 'A atualizar vizinhos…' : 'Atualizar vizinhos'}
          aria-label="Atualizar vizinhos"
          @click=${() => void c?.__loadHiveNeighbors?.()}>
          ${c?.__hiveNeighborsLoading ? '…' : '↻'}
        </button>
      </div>
    `;

    if (c?.__hiveNeighborsLoading && !data) {
      return html`${head}${this._state(
        'A carregar',
        'A consultar a tabela local de Repeaters ouvidos diretamente.'
      )}`;
    }
    if (c?.__hiveNeighborsError) {
      return html`${head}${this._state('Erro ao carregar', String(c.__hiveNeighborsError))}`;
    }
    if (!data?.supported) {
      return html`${head}${this._state(
        'Consulta indisponível',
        'Esta versão do Companion não disponibiliza a tabela zero-hop.'
      )}`;
    }
    if (!data.repeater_enabled) {
      return html`${head}${this._state(
        'Modo Repeater desligado',
        'O rádio está ligado como Companion, mas o modo Repeater encontra-se desligado.'
      )}`;
    }

    const neighbors = Array.isArray(data.neighbors)
      ? [...data.neighbors].sort((a, b) => Number(a?.secs_ago || 0) - Number(b?.secs_ago || 0))
      : [];

    return html`
      ${head}
      <div class="hive-discovery-list-head">
        <div style="display:flex;align-items:center;gap:7px;min-width:0;">
          <span>Repeaters ouvidos</span>
          <span class="hive-discovery-count">${String(data.count ?? neighbors.length)}</span>
        </div>
      </div>
      ${!neighbors.length
        ? html`<div class="hive-discovery-empty">
            Ainda não foi ouvido diretamente nenhum advert de Repeater.
          </div>`
        : neighbors.map((neighbor) => {
            const lat = Number(neighbor?.latitude);
            const lon = Number(neighbor?.longitude);
            const hasLocation = Number.isFinite(lat) && Number.isFinite(lon)
              && !(lat === 0 && lon === 0);
            const rssi = Number(neighbor?.rssi);
            const snr = Number(neighbor?.snr);
            return html`
              <article class="hive-discovery-item"
                style=${'cursor:' + (hasLocation ? 'pointer' : 'default')}
                @click=${() => {
                  if (hasLocation) void this._focusNeighbor(neighbor, 'neighbors');
                }}>
                <div style="min-width:0;">
                  <div class="hive-neighbor-name">
                    ${neighbor?.name || neighbor?.pubkey_prefix || 'Repeater'}
                  </div>
                  <div class="hive-neighbor-prefix">
                    ${String(neighbor?.pubkey_prefix || '').toUpperCase()}
                  </div>
                  <div class="hive-neighbor-meta">
                    <span class="hive-neighbor-pill">ZERO-HOP</span>
                    <span>${this._age(Number(neighbor?.secs_ago || 0))}</span>
                    ${neighbor?.known_contact ? html`<span>Conhecido</span>` : nothing}
                  </div>
                </div>
                <div class="hive-discovery-signal">
                  <span class="hive-discovery-signal-values">
                    <span>${Number.isFinite(snr) ? 'SNR ' + snr.toFixed(1) + ' dB' : 'SNR —'}</span>
                    <small>${Number.isFinite(rssi) ? 'RSSI ' + Math.round(rssi) + ' dBm' : 'RSSI —'}</small>
                  </span>
                  ${this._signalBars(snr)}
                </div>
              </article>
            `;
          })}
    `;
  }

  private _renderDiscovery() {
    const c = this.c;
    const state = c?.__hiveNeighborDiscovery;
    const active = Boolean(state?.active);
    const results = Array.isArray(state?.results) ? state.results : [];

    return html`
      <div class="hive-discovery-head">
        <div>
          <div class="hive-discovery-eyebrow">ATIVO · RF ZERO-HOP</div>
          <div class="hive-discovery-title">Descobrir Repetidores</div>
          <div class="hive-discovery-subtitle">
            Pesquisa oficial MeshCore apenas a Repeaters em alcance direto.
          </div>
        </div>
        <button class="mcr-btn primary"
          ?disabled=${Boolean(c?.__hiveNeighborDiscoveryStarting)}
          @click=${() => {
            c.__hiveNeighborMapMode = 'discovery';
            c.__hiveNeighborMapFocusId = '';
            this.requestUpdate();
            void c?.__startHiveNeighborDiscovery?.();
          }}>
          ${c?.__hiveNeighborDiscoveryStarting ? 'A iniciar…' : 'Descobrir'}
        </button>
      </div>

      <div class="hive-neighbors-discovery-scroll">
        <div class="hive-discovery-status">
          ${state?.error
            ? 'Erro: ' + state.error
            : active
              ? 'À escuta de respostas · ' +
                String(Math.max(0, Number(state?.remaining_seconds || 0))) +
                ' s restantes.'
              : state?.started_at
                ? 'Pesquisa concluída.'
                : 'Pronto para iniciar uma descoberta zero-hop.'}
        </div>

        <div class="hive-discovery-list-head">
          <span>Repetidores encontrados</span>
          <span class="hive-discovery-count">
            ${String(Number(state?.count ?? results.length))}
          </span>
        </div>

        ${!results.length
          ? html`<div class="hive-discovery-empty">
              ${active
                ? 'A aguardar respostas dos Repeaters em alcance…'
                : state?.started_at
                  ? 'A pesquisa terminou sem encontrar Repeaters em alcance direto.'
                  : 'Ainda não existem resultados de descoberta ativa.'}
            </div>`
          : results.map((item) => {
              const id = String(item?.pubkey || item?.pubkey_prefix || '');
              const rssi = Number(item?.rssi);
              const snr = Number(item?.snr);
              const reqSnr = Number(item?.request_snr);
              const hasLocation = Boolean(c?.__nodeCoords?.(item));
              const title = this._signalBars(snr);
              return html`
                <article class="hive-discovery-item ${id === String(c?.__hiveNeighborMapFocusId || '') ? 'selected' : ''}"
                  @click=${() => void this._focusNeighbor(item, 'discovery')}>
                  <div style="min-width:0;">
                    <div class="hive-neighbor-name">
                      ${item?.name || item?.pubkey_prefix || 'Repeater'}
                    </div>
                    <div class="hive-neighbor-prefix">
                      ${String(item?.pubkey_prefix || '').toUpperCase()}
                    </div>
                    <div class="hive-neighbor-meta">
                      <span class="hive-neighbor-pill">ZERO-HOP</span>
                      <span>${item?.known_contact ? 'Conhecido' : 'Novo'}</span>
                      ${hasLocation ? html`<span>📍 GPS</span>` : nothing}
                    </div>
                  </div>
                  <div class="hive-discovery-signal"
                    aria-label=${(Number.isFinite(snr) ? 'SNR ' + snr.toFixed(1) + ' dB' : 'SNR —') +
                      ' · ' + (Number.isFinite(rssi) ? 'RSSI ' + Math.round(rssi) + ' dBm' : 'RSSI —')}>
                    <span class="hive-discovery-signal-values">
                      <small>${Number.isFinite(reqSnr) ? 'REQ(' + reqSnr.toFixed(1) + ' dB)' : 'REQ(—)'}</small>
                      <span>${Number.isFinite(snr) ? 'SNR ' + snr.toFixed(1) + ' dB' : 'SNR —'}</span>
                      <small>${Number.isFinite(rssi) ? 'RSSI ' + Math.round(rssi) + ' dBm' : 'RSSI —'}</small>
                    </span>
                    ${title}
                  </div>
                </article>
              `;
            })}
      </div>
    `;
  }

  private _contactSource() {
    const c = this.c;
    const raw = Array.isArray(c?.__nodesMapContacts) ? [...c.__nodesMapContacts] : [];
    const local = c?.__localRepeaterMapContact?.();
    const localId = local ? c?.__nodeId?.(local) : '';
    return local && localId
      ? raw.map((contact) => c?.__nodeId?.(contact) === localId ? local : contact)
      : raw;
  }

  private _renderContacts() {
    const c = this.c;
    const source = this._contactSource();
    const query = this._contactSearchQuery.trim().toLocaleLowerCase();
    const contacts = source
      .filter((contact) => {
        if (!query) return true;
        const haystack = [
          contact?.adv_name,
          contact?.name,
          contact?.pubkey_prefix,
          contact?.public_key,
          contact?.added_to_node ? 'no rádio' : 'local',
        ].map((value) => String(value || '').toLocaleLowerCase()).join(' ');
        return haystack.includes(query);
      })
      .sort((a, b) =>
        Number(b?.lastmod ?? b?.last_modified ?? 0) -
        Number(a?.lastmod ?? a?.last_modified ?? 0)
      );

    return html`
      <div class="hive-discovery-head hive-network-contacts-head">
        <div>
          <div class="hive-discovery-eyebrow">PASSIVO · COMPANION</div>
          <div class="hive-discovery-title">Contactos descobertos</div>
          <div class="hive-discovery-subtitle">Contactos anunciados ao Companion.</div>
        </div>
        <div class="hive-network-contact-tools">
          <button type="button"
            class="hive-network-contact-search-button"
            title="Pesquisar contactos"
            aria-label="Pesquisar contactos"
            @click=${() => {
              this._contactSearchOpen = !this._contactSearchOpen;
              if (!this._contactSearchOpen) this._contactSearchQuery = '';
              if (this._contactSearchOpen) {
                this.updateComplete.then(() =>
                  (this.querySelector('.hive-network-contact-search input') as HTMLInputElement | null)?.focus()
                );
              }
            }}>⌕</button>

          <button type="button"
            class="hive-network-contact-search-button"
            ?disabled=${this._contactsRefreshing || Boolean(c?.__nodesMapLoading)}
            title=${this._contactsRefreshing ? 'A atualizar contactos…' : 'Atualizar contactos'}
            aria-label="Atualizar contactos"
            @click=${() => void this._refreshContacts()}>
            ${this._contactsRefreshing ? '…' : '↻'}
          </button>

          <button type="button"
            class="hive-network-contact-gear"
            title="Importar / exportar contactos"
            @click=${() => { this._contactMenuOpen = !this._contactMenuOpen; }}>⚙</button>

          ${this._contactMenuOpen
            ? html`
                <div class="hive-network-contact-menu">
                  <button type="button"
                    @click=${(event: Event) =>
                      void c?.__exportHiveFWContacts?.(event.currentTarget as HTMLButtonElement)}>
                    Exportar contactos
                  </button>
                  <button type="button"
                    data-network-import-button
                    @click=${() =>
                      (this.querySelector('input[data-network-import]') as HTMLInputElement | null)?.click()}>
                    Importar contactos
                  </button>
                  <input data-network-import
                    type="file"
                    accept=".json,application/json"
                    hidden
                    @change=${this._importContacts} />
                </div>
              `
            : nothing}
        </div>
      </div>

      ${this._contactSearchOpen
        ? html`
            <div class="hive-network-contact-search">
              <input type="search"
                placeholder="Pesquisar nome, prefixo ou chave…"
                .value=${this._contactSearchQuery}
                @input=${(event: Event) => {
                  this._contactSearchQuery = (event.currentTarget as HTMLInputElement).value;
                }} />
            </div>
          `
        : nothing}

      <div class="hive-network-contact-list">
        ${!source.length
          ? html`<div class="hive-discovery-empty">
              ${c?.__nodesMapLoading
                ? 'A carregar contactos…'
                : 'Ainda não existem contactos disponíveis.'}
            </div>`
          : contacts.map((contact) => {
              const name = String(contact?.adv_name || contact?.name || contact?.pubkey_prefix || 'Contacto');
              const prefix = String(
                contact?.pubkey_prefix || String(contact?.public_key || '').slice(0, 12)
              ).toUpperCase();
              const rawAge = contact?.age_seconds;
              const ageSeconds = rawAge == null ? Number.NaN : Number(rawAge);
              const hasGps = Boolean(c?.__nodeCoords?.(contact));
              const clockSkew = String(contact?.age_bucket || '') === 'clock_skew';
              const advertAge = Number.isFinite(ageSeconds)
                ? Math.max(0, ageSeconds)
                : Infinity;
              const dotColor = clockSkew
                ? '#000000'
                : advertAge < 24 * 3600
                  ? '#2e7d32'
                  : advertAge < 48 * 3600
                    ? '#f9a825'
                    : advertAge < 72 * 3600
                      ? '#c62828'
                      : '#757575';
              const dotTitle = clockSkew
                ? 'Relógio dessincronizado — ignorar recência'
                : Number.isFinite(advertAge)
                  ? 'Última vez ouvido: há ' + this._age(advertAge)
                  : 'Sem lastmod disponível';

              return html`
                <article class="hive-discovery-item hive-network-contact-row"
                  @click=${() => void this._focusContact(contact, true)}>
                  <div style="min-width:0;">
                    <div class="hive-neighbor-name">${name}</div>
                    <div class="hive-neighbor-prefix">${prefix}</div>
                    <div class="hive-neighbor-meta">
                      <span class="hive-neighbor-pill">
                        ${contact?.added_to_node ? 'NO RÁDIO' : 'LOCAL'}
                      </span>
                      ${Number.isFinite(ageSeconds)
                        ? html`<span>${this._age(ageSeconds)}</span>`
                        : nothing}
                    </div>
                  </div>

                  <div class="hive-discovery-signal">
                    <div class="hive-network-contact-gps">
                      <span class="hive-network-contact-gps-label">GPS:</span>
                      <ha-icon
                        icon=${hasGps ? 'mdi:map-marker' : 'mdi:map-marker-off-outline'}
                        style=${'color:' + (hasGps ? '#2e7d32' : '#9e9e9e')}
                        title=${hasGps ? 'GPS incluído no advert' : 'Advert sem localização GPS'}>
                      </ha-icon>
                    </div>
                    <div class="hive-network-contact-age-dot">
                      <span class="hive-network-contact-age-spacer">GPS:</span>
                      <span class="hive-discovery-signal-dot"
                        style=${'background:' + dotColor}
                        title=${dotTitle}></span>
                    </div>
                  </div>
                </article>
              `;
            })}
      </div>
    `;
  }

  private _metric(label: string, value: unknown, detail = '') {
    return html`
      <div class="hive-network-metric">
        <span>${label}</span>
        <strong>${String(value)}</strong>
        <small>${detail}</small>
      </div>
    `;
  }

  private _barRow(label: string, value: number, max: number, display = String(value)) {
    const width = max > 0
      ? Math.max(0, Math.min(100, Number(value || 0) / max * 100))
      : 0;
    return html`
      <div class="hive-network-bar-row">
        <span>${label}</span>
        <div class="hive-network-bar-track">
          <div class="hive-network-bar-fill" style=${'width:' + width + '%'}></div>
        </div>
        <strong>${display}</strong>
      </div>
    `;
  }

  private _renderNetworkAnalytics() {
    const c = this.c;
    const data = c?.__hiveNeighbors;
    const all = Array.isArray(data?.neighbors) ? [...data.neighbors] : [];
    const hours = Math.max(1, Number(c?.__networkRangeHours) || 48);
    const visible = all.filter((neighbor) => Number(neighbor?.secs_ago || 0) <= hours * 3600);
    const hasNeighborData = Boolean(data && Array.isArray(data.neighbors));
    const history = hasNeighborData
      ? c?.__networkHistorySnapshot?.(all)
      : (c?.__networkHistory || { nodes: {}, events: [], advert_events: [] });
    const safeHistory = history || { nodes: {}, events: [], advert_events: [] };
    const now = Date.now();

    const new24 = Object.values(safeHistory.nodes || {}).filter((node: any) =>
      Number(node?.first_seen_at) > 0 && now - Number(node.first_seen_at) <= 86400000
    ).length;
    const new48 = Object.values(safeHistory.nodes || {}).filter((node: any) =>
      Number(node?.first_seen_at) > 0 && now - Number(node.first_seen_at) <= 2 * 86400000
    ).length;
    const missing7 = Object.values(safeHistory.nodes || {}).filter((node: any) =>
      Number(node?.missing_since) > 0 && now - Number(node.missing_since) <= 7 * 86400000
    ).length;
    const active1 = all.filter((neighbor) => Number(neighbor?.secs_ago || 0) <= 3600).length;
    const adverts1h = (safeHistory.advert_events || []).filter((event: any) =>
      now - Number(event?.timestamp || 0) <= 3600000
    ).length;

    const metric = (key: string) => c?.__readMetricState?.(null, key)?.value;
    const rxRate = metric('nb_recv_rate');
    const txRate = metric('nb_sent_rate');
    const rxFlood = metric('recv_flood_rate');
    const txFlood = metric('sent_flood_rate');
    const traffic = [rxRate, txRate].some(Number.isFinite)
      ? ((Number.isFinite(rxRate) ? rxRate : 0) + (Number.isFinite(txRate) ? txRate : 0)).toFixed(1)
      : '—';
    const floodHour = [rxFlood, txFlood].some(Number.isFinite)
      ? (((Number.isFinite(rxFlood) ? rxFlood : 0) + (Number.isFinite(txFlood) ? txFlood : 0)) * 60).toFixed(0)
      : '—';
    const txAirtime = metric('airtime_utilization');
    const rxAirtime = metric('rx_airtime_utilization');
    const airtimePrimary = Number.isFinite(txAirtime) ? txAirtime.toFixed(1) + '%' : '—';
    const airtimeDetail = [
      Number.isFinite(txAirtime) ? 'TX ' + txAirtime.toFixed(1) + '%' : null,
      Number.isFinite(rxAirtime) ? 'RX ' + rxAirtime.toFixed(1) + '%' : null,
    ].filter(Boolean).join(' · ') || 'sem métrica';

    const freshBuckets: Array<[string, number]> = [
      ['< 1h', all.filter((n) => Number(n?.secs_ago || 0) < 3600).length],
      ['1–6h', all.filter((n) => Number(n?.secs_ago || 0) >= 3600 && Number(n?.secs_ago || 0) < 21600).length],
      ['6–24h', all.filter((n) => Number(n?.secs_ago || 0) >= 21600 && Number(n?.secs_ago || 0) < 86400).length],
      ['1–3 dias', all.filter((n) => Number(n?.secs_ago || 0) >= 86400 && Number(n?.secs_ago || 0) < 3 * 86400).length],
      ['3–7 dias', all.filter((n) => Number(n?.secs_ago || 0) >= 3 * 86400 && Number(n?.secs_ago || 0) <= 7 * 86400).length],
    ];
    const freshMax = Math.max(1, ...freshBuckets.map(([, value]) => value));

    const sampledNodes = Object.values(safeHistory.nodes || {}).filter((node: any) => {
      const first = Math.max(1, Number(node?.first_sample) || 1);
      return (Number(safeHistory.samples) || 0) - first + 1 >= 2;
    });
    let presenceNote = '';
    if (sampledNodes.length) {
      const presence = sampledNodes.map((node: any) => {
        const first = Math.max(1, Number(node?.first_sample) || 1);
        const possible = Math.max(1, (Number(safeHistory.samples) || 0) - first + 1);
        return Math.max(0, Math.min(100, (Number(node?.seen_samples) || 0) / possible * 100));
      });
      const average = presence.reduce((sum: number, value: number) => sum + value, 0) / presence.length;
      presenceNote =
        'Estabilidade observada · ' +
        average.toFixed(0) +
        '% de presença média · ' +
        String(safeHistory.samples || 0) +
        ' amostras';
    }

    const signalCache = new Map();
    const signalFor = (neighbor: any) => {
      const id = c?.__networkNeighborId?.(neighbor) || '';
      if (signalCache.has(id)) return signalCache.get(id);
      const signal = c?.__networkSignalFor?.(neighbor) || { snr: null, rssi: null, contact: null };
      signalCache.set(id, signal);
      return signal;
    };
    const signalRows = all.map(signalFor).filter((s: any) => s.snr != null || s.rssi != null);
    const good = signalRows.filter((s: any) => s.snr != null ? s.snr >= -5 : s.rssi >= -100).length;
    const medium = signalRows.filter((s: any) => {
      if (s.snr != null) return s.snr < -5 && s.snr >= -12;
      return s.rssi < -100 && s.rssi >= -115;
    }).length;
    const weak = Math.max(0, signalRows.length - good - medium);
    const signalMax = Math.max(1, good, medium, weak);

    const contactSource = Array.isArray(c?.__nodesMapContacts)
      ? c.__nodesMapContacts
      : (Array.isArray(c?._contacts) ? c._contacts : []);
    const resolvedHashCache = new Map();
    const resolveHash = (rawHash: unknown) => {
      const hash = String(rawHash || '').trim().replace(/^0x/i, '').toLowerCase();
      if (!hash) return null;
      if (resolvedHashCache.has(hash)) return resolvedHashCache.get(hash);
      const matches = contactSource.filter((contact: any) => {
        const key = String(contact?.public_key || '').trim().toLowerCase();
        const prefix = String(contact?.pubkey_prefix || key.slice(0, 12)).trim().toLowerCase();
        return (key && key.startsWith(hash)) || (prefix && prefix.startsWith(hash));
      });
      const resolved = matches.length === 1 ? matches[0] : null;
      resolvedHashCache.set(hash, resolved);
      return resolved;
    };
    const rowsFromHashes = (source: any) =>
      Object.entries(source || {}).map(([hash, activity]: [string, any]) => {
        const contact = resolveHash(hash);
        const neighbor = all.find((candidate) => {
          const signal = signalFor(candidate);
          return contact && signal.contact &&
            c?.__nodeId?.(signal.contact) === c?.__nodeId?.(contact);
        }) || null;
        return {
          hash: String(hash).toUpperCase(),
          activity: activity || {},
          contact,
          name: String(
            contact?.adv_name ||
            contact?.name ||
            neighbor?.name ||
            neighbor?.pubkey_prefix ||
            ('Repeater ' + String(hash).toUpperCase())
          ),
        };
      }).filter((item) => Number(item.activity?.observations) > 0)
        .sort((a, b) => Number(b.activity.observations) - Number(a.activity.observations))
        .slice(0, 10);

    const inbound = rowsFromHashes(c?.__peerActivity?.ingress);
    const pathRows = rowsFromHashes(c?.__peerActivity?.links);
    const inboundTotal = inbound.reduce((sum, item) => sum + (Number(item.activity?.observations) || 0), 0);
    const pathTotal = pathRows.reduce((sum, item) => sum + (Number(item.activity?.observations) || 0), 0);

    const renderDirection = (label: string, items: any[], total: number, emptyText: string) => html`
      <div class="hive-network-activity-side">
        <div class="hive-network-activity-side-title">${label}</div>
        ${!items.length
          ? html`<div style="color:var(--secondary-text-color);font-size:9px;line-height:1.4;">
              ${emptyText}
            </div>`
          : items.map((item) => {
              const count = Number(item.activity?.observations) || 0;
              const pct = total > 0 ? count / total * 100 : 0;
              const detail = [
                'hash ' + item.hash,
                Number.isFinite(Number(item.activity?.avg_rssi))
                  ? 'RSSI ' + Number(item.activity.avg_rssi).toFixed(1) + ' dBm'
                  : '',
                Number.isFinite(Number(item.activity?.avg_snr))
                  ? 'SNR ' + Number(item.activity.avg_snr).toFixed(1) + ' dB'
                  : '',
              ].filter(Boolean).join(' · ');
              return html`
                <div class="hive-network-top-row"
                  style=${item.contact ? 'cursor:pointer' : ''}
                  title=${detail}
                  @click=${() => {
                    if (item.contact) void this._focusContact(item.contact, true);
                  }}>
                  <strong>${item.name}</strong>
                  <span>${String(Math.round(count))} · ${pct.toFixed(1)}%</span>
                </div>
              `;
            })}
      </div>
    `;

    const recent = (safeHistory.events || []).slice(0, 8);
    const labels: Record<string, string> = {
      new: 'Novo repeater',
      missing: 'Saiu da janela de 7 dias',
      config: 'Configuração alterada',
    };

    return html`
      <div class="hive-network-head">
        <div>
          <div class="mcr-eyebrow">◉ NETWORK ANALYTICS · LOCAL</div>
          <h1>Rede</h1>
          <p>
            Leitura consolidada da rede observada pelo HiveFW. O histórico de
            novos/desaparecidos, presença e adverts/h começa a ser acumulado
            localmente a partir desta versão e não gera tráfego LoRa.
          </p>
        </div>
        <div class="hive-network-range">
          ${[6, 24, 48, 168].map((value) => html`
            <button type="button"
              class=${hours === value ? 'active' : ''}
              @click=${() => {
                c.__networkRangeHours = value;
                this.requestUpdate();
              }}>${value}H</button>
          `)}
        </div>
      </div>

      <div class="hive-network-metrics">
        ${this._metric('Vizinhos ' + hours + 'H', visible.length, 'zero-hop observados')}
        ${this._metric('Ativos <1H', active1, 'advert recente')}
        ${this._metric('Novos 24H', new24, new48 + ' em 48H · desde o baseline')}
        ${this._metric('Desaparecidos', missing7, 'últimos 7 dias')}
        ${this._metric('Adverts/H', adverts1h, 'eventos observados')}
        ${this._metric('Flood/H', floodHour, floodHour === '—' ? 'sem métrica' : 'RX + TX atual')}
        ${this._metric('Airtime', airtimePrimary, airtimeDetail)}
        ${this._metric('Tráfego', traffic, traffic === '—' ? 'sem métrica' : 'msg/min · RX + TX')}
      </div>

      <div class="hive-network-panels">
        <section class="hive-network-panel">
          <div class="hive-network-panel-title">Presença / recência</div>
          ${freshBuckets.map(([label, value]) => this._barRow(label, value, freshMax))}
          ${presenceNote
            ? html`<div style="margin-top:9px;padding-top:8px;border-top:1px solid var(--divider-color);color:var(--secondary-text-color);font-size:9px;line-height:1.35;">
                ${presenceNote}
              </div>`
            : nothing}
        </section>

        <section class="hive-network-panel">
          <div class="hive-network-panel-title">Distribuição de sinal</div>
          ${this._barRow('Bom', good, signalMax)}
          ${this._barRow('Médio', medium, signalMax)}
          ${this._barRow('Fraco', weak, signalMax)}
          <div style="margin-top:8px;color:var(--secondary-text-color);font-size:9px;line-height:1.35;">
            ${signalRows.length
              ? signalRows.length + ' vizinho(s) com RSSI/SNR disponível.'
              : 'Sem amostras RSSI/SNR disponíveis neste momento.'}
          </div>
        </section>

        <section class="hive-network-panel">
          <div class="hive-network-panel-title">
            <span>Repeaters principais</span>
            <span style="color:var(--secondary-text-color)">Entrada / Percurso</span>
          </div>
          <div class="hive-network-activity-split">
            ${renderDirection(
              'Entrada',
              inbound,
              inboundTotal,
              'Ainda não existem paths recebidos com Repeater de entrada identificado.'
            )}
            ${renderDirection(
              'No percurso',
              pathRows,
              pathTotal,
              'Ainda não existem hashes de Repeaters nos paths RF armazenados.'
            )}
          </div>
          <div style="margin-top:8px;color:var(--secondary-text-color);font-size:9px;line-height:1.35;">
            Entrada = último Repeater antes do nosso rádio. Percurso = frequência
            com que cada hash apareceu nos paths recebidos. A saída não é
            inferida sem telemetria RF que a confirme.
          </div>
        </section>
      </div>

      <section class="hive-network-panel" style="margin-top:8px;">
        <div class="hive-network-panel-title">Alterações observadas · 7 dias</div>
        ${!recent.length
          ? html`<div style="color:var(--secondary-text-color);font-size:9px;">
              Baseline criado. Novos repeaters, desaparecimentos e alterações
              de configuração passarão a aparecer aqui.
            </div>`
          : recent.map((event: any) => html`
              <div class="hive-network-event">
                <time>${new Date(Number(event?.timestamp)).toLocaleString()}</time>
                <div>
                  ${labels[event?.type] || event?.type} ·
                  ${String(event?.name || event?.id || '')}
                </div>
              </div>
            `)}
      </section>
    `;
  }

  render() {
    const c = this.c;
    if (!c?.__loadHiveNeighbors) {
      return html`
        <div class="mcr-page hive-network-page">
          ${this._state(
            'Rede indisponível',
            'A extensão HiveFW necessária para esta página ainda não está carregada.'
          )}
        </div>
      `;
    }

    return html`
      <div class="mcr-page hive-network-page" style="overflow:visible;">
        <div class="hive-network-copy">
          <div class="hive-neighbors-three">
            <section class="hive-neighbors-column hive-neighbors-passive">
              <div class="hive-neighbors-left-scroll">
                ${this._renderPassiveNeighbors()}
              </div>
            </section>

            <section class="hive-neighbors-column hive-neighbors-discovery">
              ${this._renderDiscovery()}
            </section>

            <section class="hive-neighbors-column hive-network-contacts">
              ${this._renderContacts()}
            </section>

            <section class="hive-neighbors-column hive-neighbors-map">
              <hivefw-network-map
                .controller=${c}
                .revision=${this.revision}
                @network-map-mode-changed=${() => this.requestUpdate()}>
              </hivefw-network-map>
            </section>
          </div>
        </div>

        <div class="hive-network-lower">
          <section class="hive-network-analytics">
            ${this._renderNetworkAnalytics()}
          </section>
        </div>
      </div>
    `;
  }

  async focusContact(contact: any, openPopup = true) {
    await this._focusContact(contact, openPopup);
  }

  async showTraceAndFit() {
    this.c.__hiveNeighborMapMode = 'contacts';
    this.requestUpdate();
    await this.updateComplete;
    await this._map()?.showTraceAndFit?.();
  }

  async refreshTrace(fit = false) {
    await this.updateComplete;
    await this._map()?.refreshTrace?.(fit);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hivefw-network-page': HiveFWNetworkPage;
  }
}
