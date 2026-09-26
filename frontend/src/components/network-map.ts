// @ts-nocheck
import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Lit-owned map surface for the HiveFW Network page.
 *
 * The surrounding page is fully declarative.  The only imperative code kept
 * here is the Leaflet/ha-map bridge itself: Home Assistant exposes different
 * ha-map APIs across releases and Leaflet layers must be attached after the
 * custom element has upgraded.  Keeping that lifecycle in one component
 * prevents async map work from rebuilding the rest of the Network page.
 */
@customElement('hivefw-network-map')
export class HiveFWNetworkMap extends LitElement {
  @property({ attribute: false }) controller: any = null;
  @property({ type: Number }) revision = 0;

  @state() private _mapReady = Boolean(customElements.get('ha-map'));
  @state() private _mapFailed = false;

  private _loadToken = 0;
  private _syncSeq = 0;
  private _lastMapSignature = '';
  private _lastMapElement: HTMLElement | null = null;
  private _fitTraceOnNextSync = false;

  createRenderRoot() {
    // The HiveFW wrapper already owns the Network styles in its shadow root.
    // Light DOM keeps those styles while Lit owns and diffs every page node.
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.style.display = 'flex';
    this.style.flexDirection = 'column';
    this.style.height = '100%';
    this.style.minHeight = '0';
    void this._prepareMap();
  }

  disconnectedCallback() {
    this._loadToken++;
    this._syncSeq++;
    const c = this.controller;
    const map = this.querySelector('ha-map');
    if (c) {
      // Remove Leaflet layers while the map reference is still valid.
      c.__removeTraceRouteLayer?.();
      if (c.__nodesMapElement === map) {
        c.__nodesMapElement = null;
        c.__nodesMapPane = null;
      }
      if (c.__hiveNeighborMapElement === map) {
        c.__hiveNeighborMapElement = null;
      }
    }
    this._lastMapElement = null;
    super.disconnectedCallback();
  }

  protected updated() {
    if (this._mapReady) void this._syncMap();
  }

  private get _mode(): 'neighbors' | 'discovery' | 'contacts' {
    const mode = String(this.controller?.__hiveNeighborMapMode || 'neighbors');
    return mode === 'discovery' || mode === 'contacts' ? mode : 'neighbors';
  }

  private async _prepareMap() {
    if (this._mapReady || this._mapFailed) return;
    const token = ++this._loadToken;
    const ready = await this.controller?.__ensureMapLoaded?.();
    if (token !== this._loadToken || !this.isConnected) return;
    this._mapReady = Boolean(ready);
    this._mapFailed = !ready;
  }

  private _located(items: any[]) {
    const c = this.controller;
    return (Array.isArray(items) ? items : []).filter((item) => {
      if (c?.__nodeCoords) return Boolean(c.__nodeCoords(item));
      const lat = Number(item?.latitude);
      const lon = Number(item?.longitude);
      return Number.isFinite(lat) && Number.isFinite(lon)
        && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180
        && !(lat === 0 && lon === 0);
    });
  }

  private _mapData() {
    const c = this.controller;
    const mode = this._mode;

    if (mode === 'contacts') {
      const source = Array.isArray(c?.__nodesMapContacts) ? c.__nodesMapContacts : [];
      const contacts = c?.__validMapContacts?.() || [];
      const local = c?.__localRepeaterMapContact?.() || null;
      const localId = local ? c?.__nodeId?.(local) : '';
      const mapContacts = local
        ? [local, ...contacts.filter((contact: any) => c?.__nodeId?.(contact) !== localId)]
        : contacts;
      return { mode, source, located: contacts, total: source.length, local, mapContacts };
    }

    const source = mode === 'discovery'
      ? (Array.isArray(c?.__hiveNeighborDiscovery?.results) ? c.__hiveNeighborDiscovery.results : [])
      : (Array.isArray(c?.__hiveNeighbors?.neighbors) ? c.__hiveNeighbors.neighbors : []);
    return {
      mode,
      source,
      located: this._located(source),
      total: source.length,
      local: c?.__hiveNeighborLocalMapPoint?.() || null,
      mapContacts: [],
    };
  }

  private _setMode(mode: 'neighbors' | 'discovery' | 'contacts') {
    const c = this.controller;
    if (!c || this._mode === mode) return;
    c.__hiveNeighborMapMode = mode;
    c.__hiveNeighborMapFocusId = '';
    if (mode !== 'contacts') c.__nodesMapFocusId = '';
    this._lastMapSignature = '';
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('network-map-mode-changed', {
      detail: { mode },
      bubbles: true,
      composed: true,
    }));
  }

  private _renderTraceSummary() {
    if (this._mode !== 'contacts') return nothing;
    const data = this.controller?.__traceRouteData?.();
    if (!data?.trace?.result) return nothing;
    const result = data.trace.result;
    const parts = [
      result.response_time || ((result.round_trip_ms || 0) + 'ms'),
      String(result.hops || 0) + ' hops',
    ];
    if (Number.isFinite(Number(result.final_snr))) {
      parts.push('SNR ' + Number(result.final_snr).toFixed(1) + ' dB');
    }
    if (data.unresolved?.length) {
      parts.push(
        String(data.unresolved.length) +
        ' hash não resolvido' +
        (data.unresolved.length === 1 ? '' : 's')
      );
    }

    return html`
      <div class="hive-trace-summary"
        style="position:absolute;left:10px;top:10px;z-index:35;max-width:min(360px,calc(100% - 20px));padding:8px 10px;border:1px solid var(--divider-color,#ccc);border-radius:10px;background:color-mix(in srgb,var(--card-background-color,#fff) 93%,transparent);box-shadow:0 1px 5px rgba(0,0,0,.18);font-size:10px;color:var(--primary-text-color,#222);pointer-events:auto;">
        <div style="display:flex;align-items:center;gap:8px;">
          <strong style="flex:1;">
            Último Trace · ${String(data.trace.target?.adv_name || data.trace.target?.pubkey_prefix || 'Nó')}
          </strong>
          <button type="button"
            style="border:0;background:transparent;color:var(--primary-color,#03a9f4);font:inherit;font-weight:700;cursor:pointer;"
            @click=${() => this.controller?.__clearLastTrace?.()}>
            Limpar
          </button>
        </div>
        <div style="margin-top:3px;color:var(--secondary-text-color,#666);">${parts.join(' · ')}</div>
        ${data.unresolved?.length
          ? html`<div style="margin-top:3px;font:9px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:var(--secondary-text-color,#777);overflow-wrap:anywhere;">
              Sem GPS/ambíguos: ${data.unresolved.join(', ')}
            </div>`
          : nothing}
      </div>
    `;
  }

  render() {
    const c = this.controller;
    const mode = this._mode;
    const data = this._mapData();
    const discoveryActive = mode === 'discovery' && Boolean(c?.__hiveNeighborDiscovery?.active);

    let body;
    if (discoveryActive) {
      body = html`
        <div class="hive-neighbors-map-note">
          Mapa oculto durante a descoberta. Será preenchido quando a pesquisa terminar.
        </div>
      `;
    } else if (!this._mapReady && !this._mapFailed) {
      body = html`<div class="hive-neighbors-map-note">A preparar mapa…</div>`;
    } else if (this._mapFailed) {
      body = html`<div class="hive-neighbors-map-note">Não foi possível carregar o mapa do Home Assistant.</div>`;
    } else if (!data.located.length) {
      let text = '';
      if (mode === 'contacts') {
        text = data.total
          ? 'Os contactos existem, mas ainda não têm localização GPS anunciada.'
          : 'Ainda não existem contactos para mostrar no mapa.';
      } else if (mode === 'discovery') {
        text = data.total
          ? String(data.total) + ' Repeater(s) encontrado(s), mas ainda sem localização conhecida.'
          : 'Os Repeaters encontrados aparecerão aqui quando a descoberta começar.';
      } else {
        text = data.total
          ? String(data.total) + ' Vizinho(s) ouvido(s), mas ainda sem localização conhecida.'
          : 'A aguardar anúncios de Vizinhos para mostrar no mapa.';
      }
      body = html`<div class="hive-neighbors-map-note">${text}</div>`;
    } else {
      body = html`
        <div class="hive-neighbors-map-count">
          ${data.located.length}/${data.total} com localização
        </div>
        <ha-map></ha-map>
        ${this._renderTraceSummary()}
      `;
    }

    return html`
      <div class="hive-discovery-head">
        <div class="hive-discovery-title">Mapa</div>
        <div class="hive-neighbors-map-actions" style="display:flex;align-items:center;gap:4px;">
          ${([
            ['neighbors', 'Vizinhos'],
            ['discovery', 'Descobrir Repetidores'],
            ['contacts', 'Contactos Descobertos'],
          ] as const).map(([value, label]) => html`
            <button type="button"
              class="mcr-btn ${mode === value ? 'active' : ''}"
              aria-pressed=${mode === value ? 'true' : 'false'}
              @click=${() => this._setMode(value)}>
              ${label}
            </button>
          `)}
        </div>
      </div>
      <div class="hive-neighbors-map-host">${body}</div>
    `;
  }

  private _mapSignature(data: any) {
    const c = this.controller;
    const focus = data.mode === 'contacts'
      ? String(c?.__nodesMapFocusId || '')
      : String(c?.__hiveNeighborMapFocusId || '');
    const points = (data.mode === 'contacts' ? data.mapContacts : data.located).map((item: any) => {
      const coords = c?.__nodeCoords?.(item)
        || [Number(item?.latitude), Number(item?.longitude)];
      const id = data.mode === 'contacts'
        ? c?.__nodeId?.(item)
        : String(item?.pubkey || item?.pubkey_prefix || '');
      return [id, coords?.[0] ?? null, coords?.[1] ?? null, item?.snr ?? null, item?.rssi ?? null];
    });
    const trace = data.mode === 'contacts' ? c?.__loadLastTrace?.() : null;
    return JSON.stringify([
      data.mode,
      focus,
      points,
      trace?.timestamp || null,
      trace?.result?.hops || null,
      trace?.result?.final_snr ?? null,
    ]);
  }

  private async _syncMap(force = false) {
    const seq = ++this._syncSeq;
    await this.updateComplete;
    if (seq !== this._syncSeq || !this.isConnected) return;

    const map: any = this.querySelector('ha-map');
    if (!map) {
      this._lastMapElement = null;
      return;
    }

    const c = this.controller;
    const data = this._mapData();
    const signature = this._mapSignature(data);
    const shouldFitTrace = this._fitTraceOnNextSync;
    if (
      !force &&
      !shouldFitTrace &&
      signature === this._lastMapSignature &&
      map === this._lastMapElement
    ) return;
    this._lastMapSignature = signature;
    this._lastMapElement = map;

    map.autoFit = false;
    map.clusterMarkers = true;
    map.scaleRuler = true;
    map.themeMode = 'light';

    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
    );
    if (seq !== this._syncSeq || !map.isConnected) return;

    const legacyReady = 'layers' in map
      ? await c?.__waitForLegacyLeaflet?.(map)
      : false;
    if (seq !== this._syncSeq || !map.isConnected) return;

    if (data.mode === 'contacts') {
      c.__hiveNeighborMapElement = null;
      c.__nodesMapPane = this.querySelector('.hive-neighbors-map-host') || this;
      c.__nodesMapElement = map;
      c.__nodesMapSignature = signature;

      if (legacyReady) {
        map.entities = [];
        map.layers = c.__legacyLeafletLayers?.(map, data.mapContacts, null) || [];
      } else {
        map.entities = c.__mapEntities?.(data.mapContacts) || [];
        if ('editableLocations' in map) {
          map.editableLocations = c.__mapLocations?.(data.mapContacts) || [];
        }
      }

      const localCoords = data.local ? c.__nodeCoords?.(data.local) : null;
      const firstCoords = localCoords
        || data.mapContacts.map((contact: any) => c.__nodeCoords?.(contact)).find(Boolean);
      if (firstCoords) {
        if (map.leafletMap?.setView) map.leafletMap.setView(firstCoords, 16, { animate: false });
        else map.setView?.(firstCoords, 16);
      }

      const focusId = String(c.__nodesMapFocusId || '');
      if (focusId) {
        const selected = data.mapContacts.find((contact: any) =>
          String(c.__nodeId?.(contact) || '') === focusId
        );
        const coords = selected ? c.__nodeCoords?.(selected) : null;
        if (coords) {
          if (map.leafletMap?.setView) map.leafletMap.setView(coords, 16, { animate: false });
          else map.setView?.(coords, 16);
        }
      }

      map.leafletMap?.invalidateSize?.(false);
      this._syncTraceLayer(map, shouldFitTrace);
      this._fitTraceOnNextSync = false;
      return;
    }

    // A previous contacts render may own a trace layer on this same ha-map.
    // Remove it before releasing the controller's map reference.
    c.__removeTraceRouteLayer?.();
    if (c.__nodesMapElement === map) {
      c.__nodesMapElement = null;
      c.__nodesMapPane = null;
    }
    c.__hiveNeighborMapElement = map;

    if (legacyReady) {
      map.entities = [];
      map.layers = c.__hiveNeighborLegacyLeafletLayers?.(map, data.located) || [];
      const coords = data.located
        .map((item: any) => c.__nodeCoords?.(item)
          || [Number(item?.latitude), Number(item?.longitude)])
        .filter(Boolean);
      if (coords.length === 1) {
        map.leafletMap?.setView?.(coords[0], 11, { animate: false });
      } else if (coords.length > 1 && map.Leaflet?.latLngBounds) {
        const bounds = map.Leaflet.latLngBounds(coords);
        map.leafletMap?.fitBounds?.(bounds, {
          padding: [28, 28],
          maxZoom: 12,
          animate: false,
        });
      }
      map.leafletMap?.invalidateSize?.(false);
    } else {
      map.entities = data.located
        .map((item: any) => item?.map_entity_id)
        .filter((entityId: string) => entityId && c?.hass?.states?.[entityId]);

      if ('editableLocations' in map) {
        const locations = c.__hiveNeighborMapLocations?.(data.located) || [];
        const localPoint = c.__hiveNeighborLocalMapPoint?.();
        if (localPoint) {
          const localElement = document.createElement('div');
          localElement.textContent = 'H';
          localElement.style.cssText =
            'width:30px;height:30px;border-radius:50%;display:grid;place-items:center;' +
            'font-size:10px;font-weight:800;background:var(--warning-color,#ff9800);' +
            'color:#fff;border:3px solid #fff;box-shadow:0 1px 6px rgba(0,0,0,.4)';
          locations.unshift({
            id: '__hivefw_local__',
            location: [Number(localPoint.latitude), Number(localPoint.longitude)],
            element: localElement,
            elementSize: [36, 36],
            title: 'HiveFW local · ' + localPoint.name,
            locationEditable: false,
            activatable: false,
          });
        }
        map.editableLocations = locations;
      }
      map.autoFit = true;
    }

    const focusId = String(c.__hiveNeighborMapFocusId || '');
    if (focusId) {
      const selected = data.located.find((item: any) =>
        String(item?.pubkey || item?.pubkey_prefix || '') === focusId
      );
      const coords = selected
        ? c.__nodeCoords?.(selected)
          || [Number(selected?.latitude), Number(selected?.longitude)]
        : null;
      if (coords) {
        if (map.leafletMap?.setView) map.leafletMap.setView(coords, 14, { animate: false });
        else map.setView?.(coords, 14);
      }
    }
  }

  private _syncTraceLayer(map: any, fit = false) {
    const c = this.controller;
    c?.__removeTraceRouteLayer?.();
    const data = c?.__traceRouteData?.();
    if (!data || !map?.leafletMap || !map?.Leaflet) return;

    if (data.points?.length >= 2) {
      const line = map.Leaflet.polyline(data.points, {
        weight: 4,
        opacity: .78,
        dashArray: '9 6',
        interactive: false,
      });
      line.addTo(map.leafletMap);
      c.__traceRouteLayer = line;
    }

    if (fit && data.points?.length) {
      try {
        map.leafletMap.fitBounds(data.points, { padding: [40, 40], maxZoom: 12 });
      } catch {}
    }
  }

  async focusContact(contact: any, openPopup = true) {
    const c = this.controller;
    if (!c || !contact) return;

    const existingMap: any = this.querySelector('ha-map');
    const canFocusInPlace =
      this._mode === 'contacts' &&
      existingMap?.isConnected &&
      c.__nodesMapElement === existingMap;

    c.__hiveNeighborMapMode = 'contacts';
    c.__nodesMapFocusId = c.__nodeId?.(contact) || '';

    if (!canFocusInPlace) {
      this._lastMapSignature = '';
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent('network-map-mode-changed', {
        detail: { mode: 'contacts' },
        bubbles: true,
        composed: true,
      }));
      await this._prepareMap();
      await this.updateComplete;
      await this._syncMap(true);
    }

    const coords = c.__nodeCoords?.(contact);
    const map: any = this.querySelector('ha-map');
    if (coords) {
      if (map?.leafletMap?.setView) map.leafletMap.setView(coords, 16, { animate: true });
      else map?.setView?.(coords, 16);
    }
    if (openPopup) {
      requestAnimationFrame(() => c.__openPersistentNodePopup?.(contact));
    }
  }

  async focusNeighbor(item: any, mode: 'neighbors' | 'discovery' = 'neighbors') {
    const c = this.controller;
    if (!c || !item) return;

    const existingMap: any = this.querySelector('ha-map');
    const canFocusInPlace =
      this._mode === mode &&
      existingMap?.isConnected &&
      c.__hiveNeighborMapElement === existingMap;

    c.__hiveNeighborMapMode = mode;
    c.__hiveNeighborMapFocusId = String(item?.pubkey || item?.pubkey_prefix || '');

    if (!canFocusInPlace) {
      this._lastMapSignature = '';
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent('network-map-mode-changed', {
        detail: { mode },
        bubbles: true,
        composed: true,
      }));
      await this._prepareMap();
      await this.updateComplete;
      await this._syncMap(true);
    }

    const coords = c.__nodeCoords?.(item)
      || [Number(item?.latitude), Number(item?.longitude)];
    const map: any = this.querySelector('ha-map');
    if (coords && Number.isFinite(Number(coords[0])) && Number.isFinite(Number(coords[1]))) {
      map?.leafletMap?.setView?.(coords, 14, { animate: true });
      const id = String(item?.pubkey || item?.pubkey_prefix || '');
      c.__hiveNeighborMapLeafletMarkers?.get?.(id)?.openTooltip?.();
    }
  }

  async refreshTrace(fit = false) {
    if (this._mode !== 'contacts') return;
    this._fitTraceOnNextSync = this._fitTraceOnNextSync || fit;
    this._lastMapSignature = '';
    this.requestUpdate();
    await this.updateComplete;
    await this._syncMap(true);
  }

  async showTraceAndFit() {
    const c = this.controller;
    if (!c) return;
    c.__hiveNeighborMapMode = 'contacts';
    this._fitTraceOnNextSync = true;
    this._lastMapSignature = '';
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('network-map-mode-changed', {
      detail: { mode: 'contacts' },
      bubbles: true,
      composed: true,
    }));
    await this._prepareMap();
    await this.updateComplete;
    await this._syncMap(true);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hivefw-network-map': HiveFWNetworkMap;
  }
}
