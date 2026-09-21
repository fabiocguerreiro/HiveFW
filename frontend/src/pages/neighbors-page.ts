import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type {
  HomeAssistant,
  PanelConfig,
  HiveNeighborInfo,
  HiveNeighborsResponse,
  HiveNeighborDiscoveryResult,
  HiveNeighborDiscoveryResponse,
} from '../types';
import {
  getHiveNeighbors,
  getHiveNeighborDiscovery,
  startHiveNeighborDiscovery,
} from '../api';

@customElement('meshcore-neighbors-page')
export class NeighborsPage extends LitElement {
  @property({ type: Object }) hass?: HomeAssistant;
  @property({ type: Object }) config?: PanelConfig;
  @property({ type: Boolean }) narrow = false;

  @state() private _neighbors: HiveNeighborsResponse | null = null;
  @state() private _discovery: HiveNeighborDiscoveryResponse | null = null;
  @state() private _loading = true;
  @state() private _discovering = false;
  @state() private _error: string | null = null;
  @state() private _mapReady = customElements.get('ha-map') !== undefined;
  @state() private _mapFocusId = '';

  private _pollTimer?: ReturnType<typeof setInterval>;
  private _mapMarkerElements = new Map<string, HTMLElement>();

  firstUpdated() {
    void this._loadAll();
    if (!this._mapReady) {
      void customElements.whenDefined('ha-map').then(() => {
        this._mapReady = true;
      });
    }
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('config') && this.hasUpdated) {
      void this._loadAll();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopPolling();
  }

  static styles = css\`
    :host { display:block; width:100%; height:100%; min-height:0; overflow:hidden; color:var(--primary-text-color); }
    .page {
      width:100%; height:100%; min-height:0; box-sizing:border-box; padding:14px; overflow:hidden;
      background:radial-gradient(circle at 96% 0%,color-mix(in srgb,var(--primary-color) 8%,transparent),transparent 30%),var(--primary-background-color);
    }
    .layout {
      display:grid;
      grid-template-columns:minmax(270px,.9fr) minmax(320px,1.05fr) minmax(360px,1.45fr);
      gap:12px; width:100%; height:100%; min-height:0;
    }
    .panel {
      min-width:0; min-height:0; border:1px solid var(--divider-color); border-radius:15px;
      background:var(--card-background-color); overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,.035);
    }
    .column { display:flex; flex-direction:column; min-height:0; }
    .panel-head {
      display:flex; align-items:flex-start; justify-content:space-between; gap:10px; padding:15px 16px 13px;
      border-bottom:1px solid var(--divider-color); flex:0 0 auto;
    }
    .eyebrow {
      margin-bottom:4px; color:var(--primary-color); font-size:9px; font-weight:760;
      letter-spacing:.11em; text-transform:uppercase;
    }
    .title { margin:0; font-size:16px; line-height:1.2; font-weight:730; }
    .subtitle { margin-top:5px; color:var(--secondary-text-color); font-size:10px; line-height:1.4; }
    button {
      border:1px solid var(--divider-color); border-radius:9px; padding:8px 10px;
      background:var(--secondary-background-color); color:var(--primary-text-color);
      cursor:pointer; font:inherit; font-size:11px; font-weight:680;
    }
    button:hover:not(:disabled) { border-color:var(--primary-color); }
    button:disabled { opacity:.5; cursor:default; }
    .primary {
      background:var(--primary-color); border-color:var(--primary-color);
      color:var(--text-primary-color,#fff); white-space:nowrap;
    }
    .metrics {
      display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px; padding:12px; flex:0 0 auto;
    }
    .metric { min-width:0; padding:10px 11px; border-radius:10px; background:var(--secondary-background-color); }
    .metric-label {
      color:var(--secondary-text-color); font-size:8px; font-weight:720;
      letter-spacing:.065em; text-transform:uppercase;
    }
    .metric-value {
      margin-top:4px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
      font-size:16px; font-weight:740;
    }
    .metric-sub { margin-top:2px; color:var(--secondary-text-color); font-size:9px; }
    .list { min-height:0; overflow-y:auto; padding:0 10px 12px; }
    .list-title {
      padding:3px 2px 8px; color:var(--secondary-text-color); font-size:9px;
      font-weight:720; letter-spacing:.07em; text-transform:uppercase;
    }
    .neighbor,.discovery-item {
      display:grid; grid-template-columns:minmax(0,1fr) auto; gap:9px; align-items:center;
      padding:10px; border:1px solid var(--divider-color); border-radius:10px;
      background:var(--primary-background-color);
    }
    .neighbor + .neighbor,.discovery-item + .discovery-item { margin-top:7px; }
    .discovery-item { cursor:pointer; transition:border-color .15s,background .15s; }
    .discovery-item:hover,.discovery-item.selected {
      border-color:var(--primary-color);
      background:color-mix(in srgb,var(--primary-color) 6%,var(--primary-background-color));
    }
    .name { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:12px; font-weight:700; }
    .prefix {
      margin-top:2px; color:var(--secondary-text-color);
      font:9px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
    }
    .meta { display:flex; flex-wrap:wrap; gap:5px; margin-top:5px; color:var(--secondary-text-color); font-size:9px; }
    .pill {
      display:inline-flex; align-items:center; padding:2px 6px; border-radius:999px;
      background:color-mix(in srgb,var(--primary-color) 10%,transparent);
      color:var(--primary-color); font-size:8px; font-weight:750;
    }
    .side { min-width:52px; text-align:right; }
    .signal { font-size:12px; font-weight:720; }
    .side-label { margin-top:2px; color:var(--secondary-text-color); font-size:8px; text-transform:uppercase; }
    .empty {
      margin:0 10px 12px; padding:18px 14px; border:1px dashed var(--divider-color);
      border-radius:10px; color:var(--secondary-text-color); text-align:center;
      font-size:10px; line-height:1.45;
    }
    .discovery-status {
      margin:12px; padding:10px 11px; border-radius:10px;
      background:color-mix(in srgb,var(--primary-color) 8%,transparent);
      font-size:10px; line-height:1.4; flex:0 0 auto;
    }
    .status-line { display:flex; align-items:center; justify-content:space-between; gap:8px; }
    .pulse {
      width:7px; height:7px; border-radius:50%; background:var(--primary-color);
      box-shadow:0 0 0 0 color-mix(in srgb,var(--primary-color) 30%,transparent);
      animation:pulse 1.5s infinite; flex:0 0 auto;
    }
    @keyframes pulse {
      0% { box-shadow:0 0 0 0 color-mix(in srgb,var(--primary-color) 35%,transparent); }
      70% { box-shadow:0 0 0 7px transparent; }
      100% { box-shadow:0 0 0 0 transparent; }
    }
    .map-panel { position:relative; min-height:0; }
    .map-wrap { position:relative; width:100%; height:100%; min-height:0; }
    .map-wrap ha-map { display:block; width:100%; height:100%; min-height:360px; }
    .map-note {
      display:grid; place-items:center; height:100%; min-height:320px; box-sizing:border-box;
      padding:24px; color:var(--secondary-text-color); text-align:center; font-size:11px; line-height:1.45;
    }
    .map-count {
      position:absolute; top:10px; right:10px; z-index:30; padding:5px 8px;
      border:1px solid var(--divider-color); border-radius:999px;
      background:color-mix(in srgb,var(--card-background-color) 92%,transparent);
      box-shadow:0 1px 5px rgba(0,0,0,.16); font-size:9px; font-weight:700; pointer-events:none;
    }
    .error {
      margin:12px; padding:10px; border-radius:9px;
      background:color-mix(in srgb,var(--error-color,#db4437) 10%,transparent);
      color:var(--error-color,#db4437); font-size:10px;
    }
    @media (max-width:1050px) {
      :host { overflow:auto; }
      .page { height:auto; min-height:100%; overflow:visible; }
      .layout { grid-template-columns:1fr; height:auto; }
      .panel { min-height:360px; }
      .map-panel { min-height:480px; }
    }
  \`;

  private async _load() {
    if (!this.hass) return;
    this._loading = true;
    this._error = null;
    try {
      this._data = await getHiveNeighbors(this.hass, this.config?.entry_id);
    } catch (err) {
      this._error = err instanceof Error ? err.message : 'Não foi possível carregar os vizinhos.';
    } finally {
      this._loading = false;
    }
  }

  private _age(seconds: number): string {
    const value = Math.max(0, Math.floor(seconds || 0));
    if (value < 10) return 'agora';
    if (value < 60) return `${value}s`;
    const minutes = Math.floor(value / 60);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} h`;
    return `${Math.floor(hours / 24)} d`;
  }

  private _sorted(): HiveNeighborInfo[] {
    const list = [...(this._data?.neighbors || [])];
    if (this._sort === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list.sort((a, b) => a.secs_ago - b.secs_ago);
    }
    return list;
  }

  render() {
    const data = this._data;
    const latest = data?.neighbors.length
      ? Math.min(...data.neighbors.map((n) => n.secs_ago))
      : null;

    return html`
      <div class="page">
        <div class="wrap">
          <section class="hero">
            <div>
              <div class="eyebrow">◉ Repeater · Zero-hop</div>
              <h1>Vizinhos</h1>
              <p class="subtitle">
                Repeaters cujo último advert guardado pelo Companion foi recebido diretamente,
                com zero hops. A consulta usa a cache Advert Path existente no firmware e
                não gera tráfego LoRa.
              </p>
            </div>
            <button ?disabled=${this._loading} @click=${() => this._load()}>
              ${this._loading ? 'A atualizar…' : '↻ Atualizar'}
            </button>
          </section>

          ${this._error
            ? this._state('Erro ao carregar', this._error)
            : this._loading && !data
              ? this._state('A carregar', 'A consultar os caminhos dos adverts guardados pelo Companion.')
              : !data?.supported
                ? this._state('Consulta indisponível', 'O Companion não disponibiliza os dados necessários.')
                : !data.repeater_enabled
                  ? this._state('Modo Repeater desligado', 'O Companion está ligado, mas o modo Repeater encontra-se desligado.')
                  : html`
                      <section class="summary">
                        ${this._metric('Vizinhos', String(data.count), 'Repeaters diretos')}
                        ${this._metric('Método', 'Zero-hop', 'Advert Path')}
                        ${this._metric('Último advert', latest == null ? '—' : this._age(latest), 'mais recente')}
                        ${this._metric('Modo', 'Ativo', 'HiveFW')}
                      </section>

                      <div class="toolbar">
                        <div class="section-title">Repeaters diretos</div>
                        <div class="sort">
                          <button class=${this._sort === 'recent' ? 'active' : ''} @click=${() => (this._sort = 'recent')}>Recentes</button>
                          <button class=${this._sort === 'name' ? 'active' : ''} @click=${() => (this._sort = 'name')}>Nome</button>
                        </div>
                      </div>

                      ${data.neighbors.length === 0
                        ? this._state('Ainda sem vizinhos zero-hop', 'Nenhum contacto Repeater tem neste momento um Advert Path direto guardado no Companion.')
                        : html`<div class="grid">${this._sorted().map((n) => this._neighbor(n))}</div>`}
                    `}
        </div>
      </div>
    `;
  }

  private _metric(label: string, value: string, sub: string) {
    return html`<div class="metric">
      <div class="metric-label">${label}</div>
      <div class="metric-value">${value}</div>
      <div class="metric-sub">${sub}</div>
    </div>`;
  }

  private _state(title: string, text: string) {
    return html`<div class="state">
      <div class="state-title">${title}</div>
      <div class="state-text">${text}</div>
    </div>`;
  }

  private _neighbor(n: HiveNeighborInfo) {
    return html`<article class="card">
      <div class="icon">⌁</div>
      <div>
        <div class="name">${n.name || n.pubkey_prefix}</div>
        <div class="prefix">${n.pubkey_prefix.toUpperCase()}</div>
        <div class="meta">
          <span class="pill">ZERO-HOP</span>
          <span>${n.known_contact ? 'Contacto adicionado' : 'Descoberto'}</span>
        </div>
      </div>
      <div class="side">
        <div class="age">${this._age(n.secs_ago)}</div>
        <div class="side-label">último advert</div>
      </div>
    </article>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'meshcore-neighbors-page': NeighborsPage;
  }
}
