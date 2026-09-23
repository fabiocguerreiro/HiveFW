// @ts-nocheck
/*
 * SOURCE OF TRUTH: frontend/src/hivefw-panel.ts
 *
 * This TypeScript source owns the HiveFW-specific panel extensions. Rollup
 * generates custom_components/hivefw_integration/hivefw-panel.js; do not
 * hand-edit the generated bundle.
 */
import "./hivefw-integration-panel.js";

/*
 * HiveFW panel wrapper.
 *
 * The base panel is built from frontend/src/hivefw-integration-panel.ts.
 * This extension layer contains HiveFW-specific behaviour that has not yet
 * been folded into the typed page/components tree. It is now built from this
 * TypeScript source rather than maintained as a hand-edited production file.
 * Every status/configuration request uses the Companion protocol exposed by
 * the currently flashed radio.
 */
const BasePanel = customElements.get("hivefw-integration-panel");

if (!BasePanel) {
  throw new Error("hivefw-integration-panel failed to register");
}

class HiveFWPanel extends BasePanel {
  constructor() {
    super();

    this._activeTab = "state";

    this.__repeaterStatus = null;
    this.__repeaterLoading = false;
    this.__repeaterError = null;
    this.__repeaterMessage = null;
    this.__repeaterLoadedEntry = null;
    this.__repeaterEdit = {};
    this.__repeaterStatusLoadedAt = 0;
    this.__smartAdvertCountdownTimer = null;
    this.__settingsObserver = null;
    this.__settingsObservedRoot = null;
    this.__managedDevices = { repeaters: [], clients: [] };
    this.__managedDevicesLoading = false;
    this.__managedDevicesLoadedEntry = null;
    this.__scopesLoadedEntry = null;
    this.__scopeState = { scopes: [], global: false };
    this.__scopeDraft = "";
    this.__scopeGlobal = false;
    this.__regionTarget = "";
    this.__regionText = "";
    this.__regionAction = "allowf";
    this.__regionName = "";
    this.__regionsBusy = false;
    this.__nodesMapPane = null;
    this.__nodesActivityPane = null;
    this.__nodesMapElement = null;
    this.__nodesMapContacts = null;
    this.__nodesMapLoading = false;
    this.__nodesMapLoadedEntry = null;
    this.__nodesMapMarkerElements = new Map();
    this.__nodesLeafletMarkers = new Map();
    this.__nodesMapSignature = "";
    this.__nodesMapFocusId = "";
    this.__nodesPopupId = "";
    this.__nodesPersistentPopup = null;
    this.__nodesInitialViewport = null;
    this.__nodesMapInitialViewEntry = null;
    this.__nodesMapFrame = 0;
    this.__nodesHeaderResizeObserver = null;
    this.__mapLoadStarted = false;
    this.__mapLoadPromise = null;
    this.__nodesMapRetryTimer = null;

    this.__diagHistory = null;
    this.__diagHistoryKey = "";
    this.__diagHistoryLoading = false;
    this.__diagHistoryAt = 0;
    this.__rxLogOverlay = null;
    this.__rxLogRows = [];
    this.__rxLogLoading = false;
    this.__rxLogLoadedEntry = null;
    this.__rxLogFilter = "";

    this.__lastSeenTraceResult = null;
    this.__lastTrace = null;
    this.__lastTraceLoadedEntry = null;
    this.__traceRouteLayer = null;
    this.__traceHistory = [];
    this.__traceHistoryLoadedEntry = null;
    this.__traceHistoryLoading = false;
    this.__traceHistoryPanel = null;
    this.__peerActivity = { peers: {}, links: {}, edges: {} };
    this.__peerActivityLoadedEntry = null;
    this.__peerActivityLoading = false;
    this.__topologyVisible = false;
    this.__topologyOverlay = null;
    this.__activityHeatmapVisible = false;
    this.__activityHeatmapLayer = null;
    this.__losOverlay = null;
    this.__traceMonitorOverlay = null;
    this.__traceMonitorTimer = null;
    this.__traceMonitorRunning = false;
    this.__traceMonitorBusy = false;
    this.__traceMonitorContact = null;
    this.__traceMonitorSamples = [];
    this.__traceMonitorInterval = 300;

    this.__hiveNeighbors = null;
    this.__hiveNeighborsLoading = false;
    this.__hiveNeighborsError = null;
    this.__hiveNeighborsSort = "recent";
    this.__hiveNeighborsLoadedEntry = null;
    this.__neighborsOverlay = null;
    this.__hiveNeighborDiscovery = null;
    this.__hiveNeighborDiscoveryLoading = false;
    this.__hiveNeighborDiscoveryStarting = false;
    this.__hiveNeighborDiscoveryLoadedEntry = null;
    this.__hiveNeighborDiscoveryPollTimer = null;
    this.__hiveNeighborDiscoverySignature = "";
    this.__hiveNeighborMapMarkerElements = new Map();
    this.__hiveNeighborMapLeafletMarkers = new Map();
    this.__hiveNeighborMapElement = null;
    this.__hiveNeighborMapSignalLayers = [];
    this.__hiveNeighborLocalMarker = null;
    this.__hiveNeighborMapFocusId = "";

    this.__networkOverlay = null;
    this.__networkRangeHours = 48;
    this.__networkHistory = null;

    this.__consoleHistory = [];
    this.__consoleCommandHistory = [];
    this.__consoleHistoryIndex = -1;
    this.__consolePresetName = "";
    this.__consolePresetValues = {};
    this.__consoleBusy = false;
    this.__consoleError = null;
    this.__consoleLoadedEntry = null;
    this.__consoleOverlay = null;
    this.__shareOverlay = null;
    this.__bulkMode = false;
    this.__bulkSelection = new Set();
    this.__bulkOverlay = null;
    this.__remoteAdminOverlay = null;
    this.__remoteAdminDevice = null;
    this.__remoteAdminHistory = [];
    this.__observabilitySettings = null;
    this.__observabilityState = {};
    this.__observabilityLoadedEntry = null;
    this.__observabilityLoading = false;

    this.__chatObservedRoot = null;
    this.__chatObserver = null;
    this.__appsSosChannelSyncTimer = null;
    this.__appsSosChannelSyncBusy = false;
    this.__appsSosChannelLoadedEntry = null;
    this.__appsSosChannelLast = null;
    this.__observedChannels = null;
    this.__observedChannelsLoading = false;
    this.__observedChannelsLoadedEntry = null;

    this.__manualOtaSession = null;
    this.__manualOtaBusy = false;
    this.__manualOtaEntry = null;
    this.__manualOtaRetryTimer = null;
    this.__otaProgress = null;
    this.__otaProgressTimer = null;
    this.__otaProgressBusy = false;

    this.__wifiPortalHost = "";
    this.__wifiPortalSupported = null;
    this.__wifiPortalLoading = false;
    this.__wifiPortalLoadedEntry = null;
  }

  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    this.__captureTraceResult();
    this.__enhanceRepeaterUi();
  }

  __entryId() {
    return this._selectedEntryId || this._config?.entry_id || undefined;
  }

  __headerPathHash() {
    const rawMode=
      this.__repeaterStatus?.radio?.path_hash_mode ??
      this.__repeaterStatus?.device_info?.path_hash_mode ??
      this._selectedDevice?.path_hash_mode ??
      this.__repeaterEdit?.path_hash_mode;
    const mode=Number(rawMode);
    if(!Number.isInteger(mode)||mode<0||mode>2)return "";

    const chars=(mode+1)*2;
    const local=this.__localRepeaterMapContact?.();
    const candidates=[
      this._selectedDevice?.pubkey,
      this._selectedDevice?.public_key,
      this._selectedDevice?.pubkey_prefix,
      this._config?.pubkey,
      this._config?.public_key,
      local?.public_key,
      local?.pubkey_prefix,
    ];

    for(const value of candidates){
      const key=String(value||"").replace(/[^0-9a-f]/gi,"").toLowerCase();
      if(key.length>=chars)return key.slice(0,chars);
    }
    return "";
  }

  __enhanceRepeaterUi() {
    const root = this.shadowRoot;
    if (!root) return;

    const title = root.querySelector(".panel-title");
    if (title) {
      const radioName = this._selectedDevice?.name
        || this.__repeaterStatus?.name
        || this._config?.name
        || "HiveFW";
      title.replaceChildren();
      const product = document.createElement("span");
      product.className = "hivefw-header-product";
      product.textContent = radioName;
      title.appendChild(product);

      const pathHash=this.__headerPathHash();
      if(pathHash){
        const hash=document.createElement("span");
        hash.className="hivefw-header-path-hash";
        hash.textContent="("+pathHash+")";
        const bytes=Math.max(1,pathHash.length/2);
        hash.title="Path Hash · "+bytes+" byte"+(bytes===1?"":"s");
        title.appendChild(hash);
      }

      title.setAttribute("aria-label", radioName);
    }

    // Keep the right side compact: connection state + battery + HiveFW logo.
    // The native panel already renders the logo here; only create/reposition it
    // as a compatibility fallback for an older cached frontend bundle.
    root.querySelectorAll(".header-right .device-info-wrap").forEach((el) => el.remove());
    const headerRight=root.querySelector(".header-right");
    if(headerRight){
      let brand=headerRight.querySelector(".hivefw-header-brand-white");
      if(!brand){
        brand=root.querySelector(".panel-title .hivefw-header-brand-white");
      }
      if(!brand){
        brand=document.createElement("span");
        brand.className="hivefw-header-brand-white";
        brand.setAttribute("aria-label","HiveFW");
        brand.title="HiveFW";
      }
      headerRight.appendChild(brand);
    }
    const connectionStatus = root.querySelector(".connection-status");
    if (connectionStatus) {
      const online = connectionStatus.classList.contains("online");
      let label = connectionStatus.querySelector(".hivefw-connection-label");
      if (!label) {
        for (const node of [...connectionStatus.childNodes]) {
          if (node.nodeType === Node.TEXT_NODE) node.remove();
        }
        label = document.createElement("span");
        label.className = "hivefw-connection-label";
        connectionStatus.appendChild(label);
      }
      label.textContent = online ? "Ligado" : "Desligado";
    }


    this.__ensureRepeaterStyles(root);
    this.__ensureTabs(root);
    if (this._activeTab === "state") {
      this.__startSmartAdvertCountdown();
    } else {
      this.__stopSmartAdvertCountdown();
    }

    const entryId = this.__entryId() || null;
    if (this.__nodesMapLoadedEntry !== null && this.__nodesMapLoadedEntry !== entryId) {
      this.__nodesMapContacts = null;
      this.__nodesMapLoadedEntry = null;
      this.__nodesMapSignature = "";
      this.__nodesMapFocusId = "";
      this.__nodesPopupId = "";
      this.__nodesPersistentPopup = null;
      this.__nodesInitialViewport = null;
      this.__nodesMapInitialViewEntry = null;
      this.__peerActivityLoadedEntry = null;
      this.__observabilityLoadedEntry = null;
      this.__observabilitySettings = null;
      this.__observabilityState = {};
      this.__networkHistory = null;
    }

    if (this._activeTab !== "neighbors") {
      this.__removeNeighborsOverlay();
    }
    if (this._activeTab !== "network") {
      this.__removeNetworkOverlay();
    }
    if (!["neighbors", "network"].includes(this._activeTab)) {
      this.__stopHiveNeighborDiscoveryPolling();
    }
    if (this._activeTab !== "settings") {
      this.__removeConsoleOverlay();
    }
    if (this._activeTab !== "state") {
      this.__closeMetricEditor();
    }
    if (this._activeTab !== "settings") {
      this.__closeRxLog();
    }

    if (this._activeTab === "chat") {
      this.__enhanceChatUi();
    } else {
      this.__stopAppsSosChannelSync();
      if (this.__chatObserver) {
        this.__chatObserver.disconnect();
        this.__chatObserver = null;
        this.__chatObservedRoot = null;
      }
    }

    if (this._activeTab === "nodes") {
      this.__enhanceNodesPage();
      return;
    }

    this.__cleanupNodesSplit();

    if (this._activeTab === "state") {
      if (entryId !== this.__repeaterLoadedEntry) {
        this.__repeaterStatus = null;
        this.__repeaterError = null;
        this.__repeaterMessage = null;
        this.__repeaterEdit = {};
        this.__repeaterLoadedEntry = entryId;
      }
      this.__enhanceStatePage();
      if (!this.__repeaterStatus && !this.__repeaterLoading) {
        void this.__loadRepeaterStatus();
      }
      return;
    }

    if (this._activeTab === "settings") {
      if (entryId !== this.__consoleLoadedEntry) {
        this.__consoleHistory = [];
        this.__consoleError = null;
        this.__consoleLoadedEntry = entryId;
        void this.__loadConsoleHistory();
      }
      if (entryId !== this.__repeaterLoadedEntry) {
        this.__repeaterStatus = null;
        this.__repeaterError = null;
        this.__repeaterMessage = null;
        this.__repeaterEdit = {};
        this.__repeaterLoadedEntry = entryId;
      }
      this.__enhanceSettingsPage();
      this.__enhanceManualOtaCard(root);
      this.__renderOtaLiveProgress(root);
      if (this.__managedDevicesLoadedEntry !== entryId && !this.__managedDevicesLoading) {
        void this.__loadManagedDevices();
      }
      if (this.__scopesLoadedEntry !== entryId) {
        void this.__loadScopes();
      }
      if (this.__observabilityLoadedEntry !== entryId && !this.__observabilityLoading) {
        void this.__loadObservabilitySettings();
      }
      return;
    }

    if (this._activeTab === "neighbors" || this._activeTab === "network") {
      const networkMode = this._activeTab === "network";

      if (entryId !== this.__hiveNeighborsLoadedEntry) {
        this.__hiveNeighbors = null;
        this.__hiveNeighborsError = null;
        this.__hiveNeighborsLoadedEntry = entryId;
        this.__networkHistory = null;
      }
      if (entryId !== this.__hiveNeighborDiscoveryLoadedEntry) {
        this.__hiveNeighborDiscovery = null;
        this.__hiveNeighborDiscoveryLoadedEntry = entryId;
        this.__hiveNeighborDiscoverySignature = "";
        this.__hiveNeighborMapFocusId = "";
        this.__stopHiveNeighborDiscoveryPolling();
      }

      const container = root.querySelector(".page-container");
      if (!container) return;

      if (networkMode) {
        const overlay = this.__ensureNetworkOverlay(container);
        if (!overlay.querySelector(".hive-network-page")) {
          this.__renderHiveNetwork(overlay);
        }
      } else {
        const overlay = this.__ensureNeighborsOverlay(container);
        if (!overlay.querySelector(".hive-neighbors-three")) {
          this.__renderHiveNeighbors(overlay);
        }
      }

      // Both pages consume the same local data, but Vizinhos keeps its
      // presentation unchanged. Rede adds analytics on top of the copy.
      if (!this.__hiveNeighbors && !this.__hiveNeighborsLoading) {
        void this.__loadHiveNeighbors();
      }
      if (!this.__hiveNeighborDiscovery && !this.__hiveNeighborDiscoveryLoading) {
        void this.__loadHiveNeighborDiscovery();
      }
      if (!this.__repeaterStatus && !this.__repeaterLoading) {
        void this.__loadRepeaterStatus();
      }
      if (networkMode) {
        if (this.__peerActivityLoadedEntry !== entryId && !this.__peerActivityLoading) {
          void this.__loadPeerActivity();
        }
        if ((!Array.isArray(this.__nodesMapContacts) || this.__nodesMapLoadedEntry !== entryId) && !this.__nodesMapLoading) {
          void this.__loadNodesMapContacts().then(() => this.__rerenderHivePage());
        }
      }
    }
  }

  __otaErrorMessage(error) {
    if (!error) return "Erro desconhecido";
    if (typeof error === "string") return error;

    const candidates = [
      error.message,
      error.error?.message,
      error.body?.message,
      error.data?.message,
      error.error,
      error.body?.error,
      error.code,
    ];

    for (const value of candidates) {
      if (typeof value === "string" && value.trim() && value !== "Unknown error") {
        return value.trim();
      }
    }

    try {
      const json = JSON.stringify(error);
      if (json && json !== "{}") return json;
    } catch {}

    return error?.constructor?.name || "Erro desconhecido";
  }

  async __loadOtaProgress() {
    if (!this.hass || this.__otaProgressBusy) return;
    this.__otaProgressBusy = true;
    try {
      const msg = { type: "hivefw_integration/get_firmware_ota_progress" };
      const entryId = this.__entryId();
      if (entryId) msg.entry_id = entryId;
      this.__otaProgress = await this.hass.callWS(msg);
      this.__renderOtaLiveProgress(this.shadowRoot);
    } catch (error) {
      console.debug("HiveFW OTA progress unavailable:", error);
    } finally {
      this.__otaProgressBusy = false;
    }
  }

  __startOtaProgressPolling() {
    if (this.__otaProgressTimer) return;
    void this.__loadOtaProgress();
    this.__otaProgressTimer = window.setInterval(() => {
      void this.__loadOtaProgress();
    }, 500);
  }

  __stopOtaProgressPolling() {
    if (this.__otaProgressTimer) {
      window.clearInterval(this.__otaProgressTimer);
      this.__otaProgressTimer = null;
    }
  }

  __renderOtaLiveProgress(root) {
    const settingsHost =
      root?.querySelector("meshcore-settings-page") ||
      this.shadowRoot?.querySelector("meshcore-settings-page");
    const settingsRoot = settingsHost?.shadowRoot || null;
    const manager =
      settingsRoot?.querySelector(".firmware-manager") ||
      root?.querySelector(".firmware-manager");
    if (!manager) return;

    let box = manager.querySelector(".hivefw-ota-live-progress");
    const state = this.__otaProgress;
    const stage = String(state?.stage || "idle");

    if (!state || stage === "idle") {
      box?.remove();
      return;
    }

    if (!box) {
      box = document.createElement("div");
      box.className = "hivefw-ota-live-progress";
      box.style.cssText =
        "margin-top:14px;padding:12px;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color);";
      manager.appendChild(box);
    }

    const percent = Math.max(0, Math.min(100, Number(state.percent) || 0));
    const labels = {
      downloading: "A descarregar Release",
      preparing: "A preparar firmware",
      authenticating: "A autenticar OTA",
      uploading: "A enviar para o rádio",
      rebooting: "Rádio a reiniciar",
      verifying: "A confirmar nova versão",
      complete: "Atualização concluída",
      error: "Falha na atualização",
    };

    box.replaceChildren();

    const head = document.createElement("div");
    head.style.cssText =
      "display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;font-size:12px;font-weight:700;";

    const label = document.createElement("span");
    label.textContent = labels[stage] || stage;

    const pct = document.createElement("span");
    pct.textContent = percent + "%";

    head.append(label, pct);

    const track = document.createElement("div");
    track.style.cssText =
      "height:8px;overflow:hidden;border-radius:999px;background:var(--divider-color);";

    const fill = document.createElement("div");
    fill.style.cssText =
      "height:100%;width:" + percent + "%;border-radius:inherit;background:var(--primary-color);transition:width .2s linear;";
    track.appendChild(fill);

    const detail = document.createElement("div");
    detail.style.cssText =
      "margin-top:7px;color:var(--secondary-text-color);font-size:10px;line-height:1.4;";
    detail.textContent =
      stage === "error"
        ? String(state.error || state.detail || "Falha no processo OTA")
        : String(state.detail || "");

    box.append(head, track, detail);
  }

  async _installLatestFirmware() {
    if (!this.hass || this._firmwareBusy) return;

    this._firmwareBusy = true;
    this._firmwareUploadStage = "uploading";
    this.__otaProgress = {
      stage: "preparing",
      percent: 1,
      detail: "A iniciar atualização",
    };
    this.__renderOtaLiveProgress(this.shadowRoot);
    this.__startOtaProgressPolling();

    try {
      const msg = { type: "hivefw_integration/install_latest_firmware" };
      const entryId = this.__entryId();
      if (entryId) msg.entry_id = entryId;

      const result = await this.hass.callWS(msg);
      if (!result?.success) {
        throw new Error("A atualização não foi aceite.");
      }

      await this.__loadOtaProgress();
      this._firmwareUploadStage = "reconnecting";
      await this._refreshFirmwareOtaStatus();

      const installed =
        result.installed_version ||
        result.version ||
        this._firmwareOtaStatus?.installed_version ||
        "";
      this._showStatusMessage(
        installed
          ? "Firmware " + installed + " instalado e confirmado."
          : "Firmware instalado e confirmado.",
        "success"
      );
    } catch (error) {
      await this.__loadOtaProgress();
      const message = this.__otaErrorMessage(error);
      this._showStatusMessage("Firmware OTA: " + message, "error");
    } finally {
      this.__stopOtaProgressPolling();
      this._firmwareBusy = false;
      this._firmwareUploadStage = null;
      this.__renderOtaLiveProgress(this.shadowRoot);
    }
  }

  async _uploadFirmwareFile() {
    const entryId = this.__entryId();
    if (
      !this.hass ||
      !this._firmwareFile ||
      !entryId ||
      this._firmwareBusy
    ) return;

    if (!this.hass.fetchWithAuth) {
      this._showStatusMessage(
        "Esta versão do Home Assistant não disponibiliza upload autenticado para o painel.",
        "error"
      );
      return;
    }

    const file = this._firmwareFile;
    if (
      !file.name.toLowerCase().endsWith(".bin") ||
      file.name.toLowerCase().includes("merged")
    ) {
      this._showStatusMessage(
        "Seleciona o firmware .bin OTA, não o ficheiro merged.",
        "error"
      );
      return;
    }

    this._firmwareBusy = true;
    this._firmwareUploadStage = "uploading";
    this.__otaProgress = {
      stage: "preparing",
      percent: 1,
      detail: "A enviar o ficheiro para o Home Assistant",
    };
    this.__renderOtaLiveProgress(this.shadowRoot);
    this.__startOtaProgressPolling();

    try {
      const form = new FormData();
      form.append("entry_id", entryId);
      form.append("firmware", file, file.name);

      const response = await this.hass.fetchWithAuth(
        "/api/hivefw_integration/firmware",
        { method: "POST", body: form }
      );

      let payload = {};
      try {
        payload = await response.json();
      } catch {}

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "HTTP " + response.status);
      }

      this._firmwareFile = null;
      await this.__loadOtaProgress();
      this._firmwareUploadStage = "reconnecting";
      await this._refreshFirmwareOtaStatus();

      const installed =
        payload.installed_version ||
        this._firmwareOtaStatus?.installed_version ||
        "";
      this._showStatusMessage(
        installed
          ? "Firmware " + installed + " instalado e confirmado."
          : "Firmware instalado e confirmado.",
        "success"
      );
    } catch (error) {
      await this.__loadOtaProgress();
      this._showStatusMessage(
        "Firmware OTA: " + this.__otaErrorMessage(error),
        "error"
      );
    } finally {
      this.__stopOtaProgressPolling();
      this._firmwareBusy = false;
      this._firmwareUploadStage = null;
      this.__renderOtaLiveProgress(this.shadowRoot);
    }
  }

  __enhanceManualOtaCard(root) {
    // Firmware Manager lives inside <meshcore-settings-page>, which owns its
    // own shadow root. Fall back to the supplied root only for compatibility
    // with older bundles that rendered settings directly in the panel.
    const settingsHost =
      root?.querySelector("meshcore-settings-page") ||
      this.shadowRoot?.querySelector("meshcore-settings-page");
    const settingsRoot = settingsHost?.shadowRoot || null;
    const manager =
      settingsRoot?.querySelector(".firmware-manager") ||
      root?.querySelector(".firmware-manager");
    const grid = manager?.querySelector(".firmware-actions-grid");

    if (!grid) {
      // Lit schedules the child settings-page update after the parent panel
      // update. Retry once the child has had a chance to render.
      if (
        this._activeTab === "settings" &&
        !this.__manualOtaRetryTimer
      ) {
        this.__manualOtaRetryTimer = window.setTimeout(() => {
          this.__manualOtaRetryTimer = null;
          this.__enhanceManualOtaCard(this.shadowRoot);
        }, 120);
      }
      return;
    }

    if (this.__manualOtaRetryTimer) {
      window.clearTimeout(this.__manualOtaRetryTimer);
      this.__manualOtaRetryTimer = null;
    }

    const entryId = String(this.__entryId() || "");
    if (this.__manualOtaEntry !== entryId) {
      this.__manualOtaEntry = entryId;
      this.__manualOtaSession = null;
      this.__manualOtaBusy = false;
    }

    let card = grid.querySelector(".hivefw-manual-ota-card");
    if (!card) {
      card = document.createElement("div");
      card.className = "firmware-action-card hivefw-manual-ota-card";
      grid.appendChild(card);
    }

    card.replaceChildren();

    const title = document.createElement("div");
    title.className = "firmware-action-title";
    title.textContent = "OTA manual no browser";

    const text = document.createElement("div");
    text.className = "firmware-action-text";
    text.textContent =
      "Gera uma credencial efémera para abrir diretamente a página /update do rádio. A password deixa de ser válida após reboot ou nova rotação.";

    const button = document.createElement("button");
    button.className = "apply-button firmware-primary-action";
    button.disabled = this.__manualOtaBusy;
    button.textContent = this.__manualOtaBusy
      ? "A gerar credencial…"
      : "Gerar credencial temporária";
    button.addEventListener("click", () => void this.__createManualOtaSession());

    card.append(title, text, button);

    const session = this.__manualOtaSession;
    if (!session) return;

    const details = document.createElement("div");
    details.style.cssText =
      "margin-top:12px;padding:12px;border:1px solid var(--divider-color);border-radius:10px;background:var(--secondary-background-color);font-size:12px;";

    const addRow = (label, value, secret = false) => {
      const row = document.createElement("div");
      row.style.cssText =
        "display:grid;grid-template-columns:82px minmax(0,1fr) auto;gap:8px;align-items:center;margin:6px 0;";

      const key = document.createElement("strong");
      key.textContent = label;

      const val = document.createElement("code");
      val.textContent = value;
      val.style.cssText =
        "min-width:0;overflow-wrap:anywhere;user-select:all;font-size:11px;";

      const copy = document.createElement("button");
      copy.className = "mcr-btn";
      copy.textContent = "Copiar";
      copy.addEventListener("click", async () => {
        const result = await this.__copyManualOtaText(value, val);
        copy.textContent =
          result === "copied"
            ? "Copiado"
            : result === "selected"
              ? "Selecionado"
              : "Falhou";
        window.setTimeout(() => { copy.textContent = "Copiar"; }, 1400);
      });

      row.append(key, val, copy);
      details.appendChild(row);
    };

    addRow("URL", String(session.url || ""));
    addRow("Utilizador", String(session.username || "hivefw"));
    addRow("Password", String(session.password || ""), true);

    const open = document.createElement("a");
    open.className = "apply-button";
    open.href = String(session.url || "#");
    open.target = "_blank";
    open.rel = "noopener";
    open.textContent = "Abrir página OTA";
    open.style.cssText =
      "display:inline-flex;align-items:center;justify-content:center;text-decoration:none;margin-top:10px;";
    details.appendChild(open);

    const note = document.createElement("div");
    note.style.cssText =
      "margin-top:9px;color:var(--secondary-text-color);font-size:10px;line-height:1.45;";
    note.textContent =
      "Usa firmware.bin de aplicação. Não uses ficheiros merged/factory nesta página.";
    details.appendChild(note);

    card.appendChild(details);
  }

  async __copyManualOtaText(value, sourceElement = null) {
    const text = String(value ?? "");
    if (!text) return "failed";

    // Preferred path. Clipboard API is restricted to secure contexts and can
    // also be blocked inside some Home Assistant embedding/browser setups.
    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return "copied";
      }
    } catch {}

    // Compatibility fallback for HTTP/local HA sessions and restrictive
    // webviews. execCommand is deprecated but remains broadly supported for
    // user-initiated copy operations.
    let textarea = null;
    try {
      textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.setAttribute("aria-hidden", "true");
      textarea.style.cssText =
        "position:fixed;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none;";
      document.body.appendChild(textarea);
      textarea.focus({ preventScroll: true });
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      if (document.execCommand("copy")) {
        return "copied";
      }
    } catch {
    } finally {
      textarea?.remove();
    }

    // Last-resort UX: select the visible value so Ctrl+C / context-menu copy
    // works immediately instead of failing silently.
    try {
      if (sourceElement) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(sourceElement);
        selection?.removeAllRanges();
        selection?.addRange(range);
        return "selected";
      }
    } catch {}

    return "failed";
  }

  async __createManualOtaSession() {
    if (!this.hass || this.__manualOtaBusy) return;

    this.__manualOtaBusy = true;
    this.__manualOtaSession = null;
    this.__enhanceManualOtaCard(this.shadowRoot);

    try {
      const msg = { type: "hivefw_integration/create_manual_ota_session" };
      const entryId = this.__entryId();
      if (entryId) msg.entry_id = entryId;

      const session = await this.hass.callWS(msg);
      if (!session?.success || !session?.password || !session?.url) {
        throw new Error("O rádio não devolveu uma sessão OTA válida.");
      }

      this.__manualOtaSession = session;
    } catch (error) {
      const message = this.__otaErrorMessage(error);
      this._showStatusMessage?.("OTA manual: " + message, "error");
    } finally {
      this.__manualOtaBusy = false;
      this.__enhanceManualOtaCard(this.shadowRoot);
    }
  }

  __enhanceChatUi() {
    const chat = this.shadowRoot?.querySelector("hivefw-integration-page");
    const croot = chat?.shadowRoot;
    if (!croot) return;

    if (!chat.__hiveMessageRouteBound) {
      chat.__hiveMessageRouteBound = true;
      chat.addEventListener("show-message-route", (event) => {
        const message = event?.detail?.message;
        if (message) void this.__showMessageRouteOnMap(message);
      });
    }

    if (this.__chatObservedRoot !== croot) {
      this.__chatObserver?.disconnect();
      this.__chatObservedRoot = croot;
      this.__chatObserver = new MutationObserver(() => {
        queueMicrotask(() => {
          if (this._activeTab === "chat") this.__enhanceChatUi();
        });
      });
      this.__chatObserver.observe(croot, { childList: true, subtree: true });
    }

    if (!croot.querySelector("#hivefw-chat-layout-style")) {
      const style = document.createElement("style");
      style.id = "hivefw-chat-layout-style";
      style.textContent = `
        .conversation-sidebar {
          width: 330px !important;
          min-width: 330px !important;
        }
        .hive-observed-column {
          width: 330px;
          min-width: 330px;
          min-height: 0;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          border-left: 1px solid var(--divider-color,#e0e0e0);
          background: var(--card-background-color,#fff);
          box-sizing: border-box;
        }
        .hive-observed-head {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 12px 12px 8px;
          font-size: 16px;
          font-weight: 600;
          color: var(--primary-text-color);
        }
        .hive-observed-note {
          flex: 0 0 auto;
          padding: 0 12px 10px;
          color: var(--secondary-text-color,#727272);
          font-size: 10px;
          line-height: 1.35;
          border-bottom: 1px solid var(--divider-color,#e0e0e0);
        }
        .hive-observed-list {
          flex: 1 1 auto;
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-y: contain;
        }
        .hive-observed-row {
          display: grid;
          grid-template-columns: minmax(0,1fr) auto;
          gap: 8px;
          align-items: center;
          padding: 10px 12px;
          border-bottom: 1px solid var(--divider-color,#e0e0e0);
        }
        .hive-observed-hash {
          font: 700 12px ui-monospace,SFMono-Regular,Menlo,monospace;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .hive-observed-meta {
          margin-top: 2px;
          font-size: 10px;
          color: var(--secondary-text-color,#727272);
          line-height: 1.35;
        }
        .hive-observed-add {
          border: 1px solid var(--primary-color,#03a9f4);
          border-radius: 7px;
          padding: 5px 8px;
          background: transparent;
          color: var(--primary-color,#03a9f4);
          font-size: 11px;
          font-weight: 650;
          cursor: pointer;
        }
        @media (max-width: 900px) {
          .conversation-sidebar {
            width: 300px !important;
            min-width: 300px !important;
          }
          .hive-observed-column {
            width: 300px;
            min-width: 300px;
          }
        }
        :host([narrow]) .conversation-sidebar {
          width: 100% !important;
          min-width: 0 !important;
        }
      `;
      croot.appendChild(style);
    }

    // RX metadata (hops / RSSI / SNR) is rendered natively by
    // meshcore-message-bubble as .route-info-inline. Remove any legacy
    // wrapper-injected copy so each message shows the information once.
    for (const bubbleHost of croot.querySelectorAll("meshcore-message-bubble")) {
      const broot = bubbleHost.shadowRoot;
      if (!broot) continue;
      broot.querySelectorAll(".hivefw-rx-meta").forEach((el) => el.remove());
    }

    this.__decorateShareActions(croot);
    window.setTimeout(()=>this.__decorateShareActions(croot),80);

    const conversationList = croot.querySelector("meshcore-conversation-list");
    if (conversationList) {
      this.__bindAppsSosChannelSync(conversationList);
      // Remove the pre-1.14.5 injected block from the left component if the
      // element survived a hot frontend reload.
      conversationList.shadowRoot?.querySelector(".hive-observed-section")?.remove();
    }
    this.__renderObservedChannels(croot);
  }

  async __loadObservedChannels(force = false) {
    if (!this.hass || this.__observedChannelsLoading) return;
    if (this._activeTab !== "chat" && !force) return;
    this.__observedChannelsLoading = true;
    try {
      const msg = { type: "hivefw_integration/get_observed_channels" };
      const entryId = this.__entryId();
      if (entryId) msg.entry_id = entryId;
      this.__observedChannels = await this.hass.callWS(msg);
    } catch (error) {
      console.debug("HiveFW observed-channel read unavailable:", error);
      this.__observedChannels = { supported: false, channels: [], error: String(error?.message || error || "") };
    } finally {
      this.__observedChannelsLoading = false;
      const chat = this.shadowRoot?.querySelector("hivefw-integration-page");
      const croot = chat?.shadowRoot;
      if (croot) this.__renderObservedChannels(croot);
    }
  }

  __openObservedChannelAdd(item) {
    const chat = this.shadowRoot?.querySelector("hivefw-integration-page");
    if (!chat) return;
    chat._manageInitialTab = "channels";
    chat._manageOpen = true;
    chat.requestUpdate?.();

    window.setTimeout(() => {
      const manage = chat.shadowRoot?.querySelector("meshcore-manage-dialog");
      if (!manage) return;
      manage._switchTab?.("channels");
      if (item?.resolved && item?.name && item?.secret) {
        manage.openSuggestedChannel?.(item.name, item.secret);
      } else {
        manage._openAddChannel?.();
      }
    }, 80);
  }

  __renderObservedChannels(chatRoot) {
    if (!chatRoot) return;

    const chat = this.shadowRoot?.querySelector("hivefw-integration-page");
    let column = chatRoot.querySelector(".hive-observed-column");

    // Mobile keeps the established list/thread switcher. The observed-channel
    // view is a dedicated third column in the wide layout only.
    if (chat?._isNarrow) {
      column?.remove();
      return;
    }

    const layout = chatRoot.querySelector(".chat-layout");
    if (!layout) return;

    if (!column) {
      column = document.createElement("aside");
      column.className = "hive-observed-column";
      column.setAttribute("aria-label", "Canais Observados 48H");
      const searchPanel = layout.querySelector(".search-panel");
      if (searchPanel) layout.insertBefore(column, searchPanel);
      else layout.appendChild(column);
    }

    const state = this.__observedChannels;
    const channels = Array.isArray(state?.channels) ? state.channels : [];
    const signature = JSON.stringify({
      loading: !!this.__observedChannelsLoading,
      supported: state?.supported ?? null,
      error: state?.error || "",
      channels: channels.map((item) => [
        item?.hash,
        item?.name,
        item?.resolved,
        item?.secret,
        item?.message_count,
        item?.secs_ago,
      ]),
    });
    if (column.dataset.signature === signature) return;
    column.dataset.signature = signature;
    column.replaceChildren();

    const head = document.createElement("div");
    head.className = "hive-observed-head";
    head.textContent = "Canais Observados 48H";
    column.appendChild(head);

    const note = document.createElement("div");
    note.className = "hive-observed-note";

    if (this.__observedChannelsLoading && !state) {
      note.textContent = "A ler atividade retransmitida…";
      column.appendChild(note);
      return;
    }

    if (!state?.supported) {
      note.textContent = "Requer HiveFW 1.14.4 ou superior para observar passivamente canais retransmitidos.";
      column.appendChild(note);
      return;
    }

    note.textContent =
      "Tráfego de grupo encaminhado pelo Repeater. Canais hashtag/públicos conhecidos são identificados apenas quando a chave derivada valida o MAC do pacote real.";
    column.appendChild(note);

    const list = document.createElement("div");
    list.className = "hive-observed-list";
    column.appendChild(list);

    if (!channels.length) {
      const empty = document.createElement("div");
      empty.className = "hive-observed-note";
      empty.style.borderBottom = "0";
      empty.style.paddingTop = "10px";
      empty.textContent = "Nenhum canal desconhecido foi retransmitido nas últimas 48 horas.";
      list.appendChild(empty);
      return;
    }

    for (const item of channels) {
      const row = document.createElement("div");
      row.className = "hive-observed-row";

      const info = document.createElement("div");
      info.style.minWidth = "0";

      const hash = document.createElement("div");
      hash.className = "hive-observed-hash";
      hash.textContent = item.resolved && item.name
        ? String(item.name)
        : "#" + String(item.hash || "??");

      const meta = document.createElement("div");
      meta.className = "hive-observed-meta";
      const secs = Math.max(0, Number(item.secs_ago) || 0);
      const when = new Date(Date.now() - secs * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const resolution = item.resolved
        ? " · hash " + String(item.hash) + " · confirmado"
        : " · hash " + String(item.hash) + " · não identificado";
      meta.textContent =
        String(item.message_count || 0) + " mensagens · última " + when + resolution;
      info.append(hash, meta);

      if (item.resolved && item.name && item.secret) {
        const add = document.createElement("button");
        add.type = "button";
        add.className = "hive-observed-add";
        add.textContent = "Adicionar";
        add.title = "Adicionar canal identificado; nome e chave já foram confirmados pelo MAC do pacote.";
        add.addEventListener("click", () => this.__openObservedChannelAdd(item));
        row.append(info, add);
      } else {
        row.append(info);
      }
      list.appendChild(row);
    }
  }

  __bindAppsSosChannelSync(conversationList) {
    if (!conversationList) return;

    if (conversationList.__hivefwAppsSosOwner !== this) {
      const originalSet =
        typeof conversationList._setAppsChannel === "function"
          ? conversationList._setAppsChannel.bind(conversationList)
          : null;

      conversationList.__hivefwAppsSosOwner = this;
      conversationList.__hivefwOriginalSetAppsChannel = originalSet;

      conversationList._setAppsChannel = (value) => {
        if (originalSet) originalSet(value);
        void this.__setAppsSosChannel(value);
      };
    }

    const entryId = this.__entryId() || null;
    if (this.__appsSosChannelLoadedEntry !== entryId) {
      this.__appsSosChannelLoadedEntry = entryId;
      this.__appsSosChannelLast = null;
      void this.__loadAppsSosChannel(true);
    }

    if (this.__observedChannelsLoadedEntry !== entryId) {
      this.__observedChannelsLoadedEntry = entryId;
      this.__observedChannels = null;
      void this.__loadObservedChannels(true);
    }

    this.__startAppsSosChannelSync();
  }

  __startAppsSosChannelSync() {
    if (this.__appsSosChannelSyncTimer || this._activeTab !== "chat") return;

    this.__appsSosChannelSyncTimer = window.setInterval(() => {
      if (this._activeTab === "chat") {
        void this.__loadAppsSosChannel(false);
        void this.__loadObservedChannels(false);
      }
    }, 5000);
  }

  __stopAppsSosChannelSync() {
    if (this.__appsSosChannelSyncTimer) {
      window.clearInterval(this.__appsSosChannelSyncTimer);
      this.__appsSosChannelSyncTimer = null;
    }
  }

  __applyAppsSosChannelToChat(channelIdx) {
    const chat = this.shadowRoot?.querySelector("hivefw-integration-page");
    const croot = chat?.shadowRoot;
    const list = croot?.querySelector("meshcore-conversation-list");
    if (!list) return;

    const value = channelIdx == null ? null : String(channelIdx);
    if (list._appsChannelId === value) return;

    list._appsChannelId = value;

    // Keep the previous browser preference only as a fast cache/fallback.
    // The radio custom var is the source of truth.
    try {
      const key =
        typeof list._appsStorageKey === "function"
          ? list._appsStorageKey()
          : null;
      if (key) {
        if (value == null) window.localStorage.removeItem(key);
        else window.localStorage.setItem(key, value);
      }
    } catch {}

    list._updateFiltered?.();
    list.requestUpdate?.();
  }

  async __loadAppsSosChannel(force = false) {
    if (!this.hass || this.__appsSosChannelSyncBusy) return;
    if (this._activeTab !== "chat" && !force) return;

    this.__appsSosChannelSyncBusy = true;
    try {
      const msg = { type: "hivefw_integration/get_apps_sos_channel" };
      const entryId = this.__entryId();
      if (entryId) msg.entry_id = entryId;

      const state = await this.hass.callWS(msg);
      if (!state?.supported) return;

      const next =
        state.channel_idx == null
          ? null
          : Number(state.channel_idx);

      if (force || next !== this.__appsSosChannelLast) {
        this.__appsSosChannelLast = next;
        this.__applyAppsSosChannelToChat(next);
      }
    } catch (error) {
      console.debug("HiveFW APPS/SOS channel read unavailable:", error);
    } finally {
      this.__appsSosChannelSyncBusy = false;
    }
  }

  async __setAppsSosChannel(value) {
    if (!this.hass) return;

    const channelIdx =
      value == null || value === ""
        ? null
        : Number(value);

    const msg = { type: "hivefw_integration/set_apps_sos_channel" };
    const entryId = this.__entryId();
    if (entryId) msg.entry_id = entryId;
    if (Number.isInteger(channelIdx) && channelIdx >= 0) {
      msg.channel_idx = channelIdx;
    }

    try {
      const result = await this.hass.callWS(msg);
      const confirmed =
        result?.channel_idx == null
          ? null
          : Number(result.channel_idx);
      this.__appsSosChannelLast = confirmed;
      this.__applyAppsSosChannelToChat(confirmed);
    } catch (error) {
      console.debug("HiveFW APPS/SOS channel write failed:", error);
      // Restore the physical Companion value if the write did not succeed.
      await this.__loadAppsSosChannel(true);
    }
  }

  __meshCoreContactShareUri(contact) {
    const publicKey=String(contact?.public_key||"").trim().toLowerCase();
    if(!/^[0-9a-f]{64}$/.test(publicKey))return "";
    const params=new URLSearchParams();
    params.set("name",String(contact?.adv_name||contact?.name||"Contact"));
    params.set("public_key",publicKey);
    params.set("type",String(Number(contact?.type)||1));
    return "meshcore://contact/add?"+params.toString();
  }

  __meshCoreChannelShareUri(channel) {
    const secret=String(channel?.settings?.channel_secret||"").trim().toLowerCase();
    if(!/^[0-9a-f]{32}$/.test(secret))return "";
    const params=new URLSearchParams();
    params.set("name",String(channel?.name||"Channel"));
    params.set("secret",secret);
    const scope=String(channel?.scope||"").trim();
    if(scope)params.set("region_scope",scope);
    return "meshcore://channel/add?"+params.toString();
  }

  __closeShareDialog() {
    if(this.__shareOverlay?.isConnected)this.__shareOverlay.remove();
    this.__shareOverlay=null;
  }

  __openShareDialog(title,uri) {
    if(!uri)return;
    this.__closeShareDialog();

    const overlay=document.createElement("div");
    overlay.style.cssText="position:fixed;inset:0;z-index:10000;display:grid;place-items:center;padding:18px;background:rgba(0,0,0,.48);";
    overlay.addEventListener("click",(event)=>{if(event.target===overlay)this.__closeShareDialog();});

    const dialog=document.createElement("div");
    dialog.style.cssText="width:min(520px,100%);max-height:min(88vh,760px);overflow:auto;padding:18px;box-sizing:border-box;border-radius:14px;background:var(--card-background-color,#fff);color:var(--primary-text-color,#222);box-shadow:0 12px 36px rgba(0,0,0,.35);";

    const header=document.createElement("div");
    header.style.cssText="display:flex;align-items:center;gap:12px;margin-bottom:14px;";
    const heading=document.createElement("strong");
    heading.textContent=title;
    heading.style.cssText="flex:1;font-size:16px;";
    const close=document.createElement("button");
    close.type="button";
    close.textContent="✕";
    close.title="Fechar";
    close.style.cssText="border:0;background:transparent;color:var(--secondary-text-color,#666);font-size:18px;cursor:pointer;";
    close.addEventListener("click",()=>this.__closeShareDialog());
    header.append(heading,close);
    dialog.appendChild(header);

    if(customElements.get("ha-qr-code")){
      const qr=document.createElement("ha-qr-code");
      qr.data=uri;
      qr.width=260;
      qr.margin=2;
      qr.style.cssText="display:grid;place-items:center;margin:0 auto 14px;max-width:100%;";
      dialog.appendChild(qr);
    }else{
      const unavailable=document.createElement("div");
      unavailable.textContent="O componente QR nativo do Home Assistant não está carregado nesta sessão; o URI abaixo continua disponível para copiar.";
      unavailable.style.cssText="margin-bottom:12px;padding:9px 10px;border-radius:8px;background:var(--secondary-background-color,#f3f3f3);color:var(--secondary-text-color,#666);font-size:11px;";
      dialog.appendChild(unavailable);
    }

    const uriBox=document.createElement("code");
    uriBox.textContent=uri;
    uriBox.style.cssText="display:block;padding:10px;border:1px solid var(--divider-color,#ddd);border-radius:8px;overflow-wrap:anywhere;white-space:normal;font-size:11px;user-select:all;";

    const note=document.createElement("div");
    note.textContent="Este URI contém os dados necessários para importar o contacto/canal. No caso de um canal, trata a chave como uma palavra-passe.";
    note.style.cssText="margin-top:9px;color:var(--secondary-text-color,#666);font-size:10px;";

    const actions=document.createElement("div");
    actions.style.cssText="display:flex;justify-content:flex-end;gap:8px;margin-top:14px;";
    const copy=document.createElement("button");
    copy.type="button";
    copy.textContent="Copiar URI";
    copy.style.cssText="padding:7px 11px;border:1px solid var(--divider-color,#bbb);border-radius:7px;background:var(--card-background-color,#fff);color:var(--primary-color,#03a9f4);font-weight:650;cursor:pointer;";
    copy.addEventListener("click",async()=>{
      const original=copy.textContent;
      try{
        await navigator.clipboard.writeText(uri);
        copy.textContent="Copiado";
      }catch{
        copy.textContent="Falhou";
      }
      window.setTimeout(()=>{if(copy.isConnected)copy.textContent=original;},1200);
    });
    actions.appendChild(copy);
    dialog.append(uriBox,note,actions);
    overlay.appendChild(dialog);
    this.shadowRoot?.appendChild(overlay);
    this.__shareOverlay=overlay;
  }

  __decorateShareActions(croot) {
    const manage=croot?.querySelector("meshcore-manage-dialog");
    const mroot=manage?.shadowRoot;
    if(!manage||!mroot)return;

    if(!mroot.querySelector("#hivefw-share-actions-style")){
      const style=document.createElement("style");
      style.id="hivefw-share-actions-style";
      style.textContent=`
        .hive-share-btn{
          border:1px solid var(--divider-color,#bbb);
          border-radius:6px;
          padding:5px 8px;
          background:var(--card-background-color,#fff);
          color:var(--primary-color,#03a9f4);
          font-size:11px;
          font-weight:650;
          cursor:pointer;
          flex:0 0 auto;
        }
      `;
      mroot.appendChild(style);
    }

    const contacts=Array.isArray(manage._contacts)?manage._contacts:[];
    for(const row of mroot.querySelectorAll(".contact-item")){
      if(row.querySelector(".hive-share-btn"))continue;
      const prefix=String(row.querySelector(".contact-prefix")?.textContent||"").trim().toLowerCase();
      const matches=contacts.filter((contact)=>String(contact?.pubkey_prefix||"").trim().toLowerCase()===prefix);
      if(matches.length!==1)continue;
      const contact=matches[0];
      const uri=this.__meshCoreContactShareUri(contact);
      if(!uri)continue;
      const button=document.createElement("button");
      button.type="button";
      button.className="hive-share-btn";
      button.textContent="QR";
      button.title="Partilhar contacto por QR/URI MeshCore";
      button.addEventListener("click",(event)=>{
        event.preventDefault();
        event.stopPropagation();
        this.__openShareDialog("Partilhar contacto · "+String(contact.adv_name||contact.pubkey_prefix||"Contacto"),uri);
      });
      row.appendChild(button);
    }

    const channels=Array.isArray(manage._channels)?manage._channels:[];
    for(const row of mroot.querySelectorAll(".channel-item")){
      if(row.querySelector(".hive-share-btn"))continue;
      const text=String(row.querySelector(".channel-idx")?.textContent||"");
      const match=text.match(/Index\s+(\d+)/i);
      if(!match)continue;
      const idx=Number(match[1]);
      const candidates=channels.filter((channel)=>Number(channel?.channel_idx)===idx);
      if(candidates.length!==1)continue;
      const channel=candidates[0];
      const uri=this.__meshCoreChannelShareUri(channel);
      if(!uri)continue;
      const button=document.createElement("button");
      button.type="button";
      button.className="hive-share-btn";
      button.textContent="QR";
      button.title="Partilhar canal por QR/URI MeshCore";
      button.addEventListener("click",(event)=>{
        event.preventDefault();
        event.stopPropagation();
        this.__openShareDialog("Partilhar canal · "+String(channel.name||("#"+idx)),uri);
      });
      const actions=row.querySelector(".channel-actions");
      if(actions)actions.prepend(button); else row.appendChild(button);
    }
  }

    __ensureTabs(root) {
    const tabBar = root.querySelector(".tab-bar");
    if (!tabBar) return;

    // Never move/remove Lit-managed tab buttons. Moving them with appendChild()
    // breaks Lit's internal child-part bookkeeping after the injected Vizinhos
    // page renders, which can leave the original tabs visually present but
    // no longer navigable.
    const buttons = [...tabBar.querySelectorAll("button")];
    const byLabel = (...labels) => buttons.find((button) =>
      labels.includes(button.textContent?.trim())
    );

    const state = byLabel("Estado");
    const settings = byLabel("Settings", "Dispositivo", "Definições");
    const chat = byLabel("Chat", "Chat & Canais");
    const nodes = byLabel("Nodes", "Nós");
    const devices = byLabel("Devices");
    let neighbors = byLabel("Vizinhos");
    let network = byLabel("Rede");
    const consoleTab = byLabel("Console", "Consola");

    if (state) {
      state.textContent = "Estado";
      state.style.order = "1";
    }
    if (chat) {
      chat.textContent = "Chat & Canais";
      chat.style.order = "2";
    }
    if (nodes) {
      nodes.textContent = "Nós";
      nodes.style.order = "3";
    }
    if (settings) {
      settings.textContent = "Definições";
      settings.style.order = "6";
    }

    // Reuse the legacy Devices Lit button as Vizinhos when required.
    if (!neighbors && devices) {
      neighbors = devices;
      neighbors.textContent = "Vizinhos";
      neighbors.dataset.hiveNeighborsTab = "1";

      if (!neighbors.dataset.hiveNeighborsBound) {
        neighbors.dataset.hiveNeighborsBound = "1";
        neighbors.addEventListener("click", () => {
          this._activeTab = "neighbors";
          this.requestUpdate();
        });
      }
    }

    if (!neighbors) {
      neighbors = document.createElement("button");
      neighbors.dataset.hiveNeighborsTab = "1";
      neighbors.textContent = "Vizinhos";
      neighbors.addEventListener("click", () => {
        this._activeTab = "neighbors";
        this.requestUpdate();
      });
      tabBar.appendChild(neighbors);
    }

    neighbors.style.order = "4";
    neighbors.classList.toggle("active", this._activeTab === "neighbors");
    if (this._activeTab !== "neighbors") {
      neighbors.classList.remove("active");
    }

    if (!network) {
      network = document.createElement("button");
      network.dataset.hiveNetworkTab = "1";
      network.textContent = "Rede";
      network.addEventListener("click", () => {
        this._activeTab = "network";
        this.requestUpdate();
      });
      tabBar.appendChild(network);
    }
    network.style.order = "5";
    network.classList.toggle("active", this._activeTab === "network");
    if (this._activeTab !== "network") {
      network.classList.remove("active");
    }

    // Consola no longer has a top-level tab. Remove only the wrapper-owned
    // compatibility tab; hide a hypothetical stale native one without moving it.
    if (consoleTab) {
      if (consoleTab.dataset.hiveConsoleTab) consoleTab.remove();
      else consoleTab.hidden = true;
    }

    const iconize = (button, iconName) => {
      if (!button) return;
      let icon = button.querySelector(".hivefw-tab-icon");
      if (!icon) {
        icon = document.createElement("ha-icon");
        icon.className = "hivefw-tab-icon";
        button.prepend(icon);
      }
      icon.setAttribute("icon", iconName);
    };

    iconize(state, "mdi:monitor-dashboard");
    iconize(chat, "mdi:message-text-outline");
    iconize(nodes, "mdi:map-marker-multiple-outline");
    iconize(neighbors, "mdi:access-point-network");
    iconize(network, "mdi:chart-timeline-variant");
    iconize(settings, "mdi:cog-outline");
  }

  __ensureRepeaterStyles(root) {
    if (root.querySelector("#meshcore-repeater-fork-styles")) return;

    const style = document.createElement("style");
    style.id = "meshcore-repeater-fork-styles";
    style.textContent = `
      .hivefw-wordmark,
      .hivefw-header-logo {
        display:inline-block;
        width:152px;
        height:38px;
        flex:0 0 auto;
        background:
          transparent
          url('/hivefw_integration_panel/hivefw-wordmark.png?v=dark-2')
          center/contain
          no-repeat !important;
        -webkit-mask:none !important;
        mask:none !important;
      }
      .hivefw-header-product {
        font-weight:600;
        white-space:nowrap;
      }
      .hivefw-header-path-hash {
        display:inline-flex;
        align-items:center;
        flex:0 0 auto;
        padding:3px 7px;
        border:1px solid var(--divider-color,#ddd);
        border-radius:999px;
        background:var(--secondary-background-color,#f3f3f3);
        color:var(--secondary-text-color,#666);
        font:600 11px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
        letter-spacing:.02em;
        white-space:nowrap;
      }
      .panel-title {
        display:flex !important;
        align-items:center;
        gap:10px;
      }

      .tab-bar {
        overflow-x: auto !important;
        overflow-y: hidden !important;
        scrollbar-width: none;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior-x: contain;
      }
      .tab-bar::-webkit-scrollbar { display: none; }
      :host([narrow]) .tab-bar button {
        flex: 0 0 auto !important;
        min-width: 88px;
      }
      .tab-bar button {
        display:flex !important;
        align-items:center;
        justify-content:center;
        gap:7px;
      }
      .hivefw-tab-icon {
        width:18px;
        height:18px;
        flex:0 0 auto;
        --mdc-icon-size:18px;
      }
      .header-right {
        display:flex !important;
        align-items:center;
        gap:10px;
      }
      .panel-title {
        display:inline-flex !important;
        align-items:center;
        gap:10px;
        min-width:0;
      }
      .hivefw-header-brand-white {
        display:inline-block;
        width:152px;
        height:38px;
        flex:0 0 auto;
        background:transparent url('/hivefw_integration_panel/hivefw-wordmark.png?v=dark-2') center/contain no-repeat;
      }
      .hivefw-header-brand-white::before,
      .hivefw-header-brand-white::after {
        content:none;
      }
      :host([narrow]) .hivefw-header-brand-white {
        width:132px;
        height:33px;
      }

      .hivefw-console-page {
        width:100%;
        height:100%;
        min-height:0;
        overflow:auto;
        -webkit-overflow-scrolling:touch;
        overscroll-behavior-y:contain;
        box-sizing:border-box;
        padding:18px;
        color:var(--primary-text-color);
        background:var(--primary-background-color);
      }
      .hivefw-console-wrap {
        width:min(1160px,100%);
        margin:0 auto;
      }
      .hivefw-console-layout {
        display:grid;
        grid-template-columns:minmax(280px,.78fr) minmax(0,1.35fr);
        gap:14px;
        align-items:start;
      }
      .hivefw-console-column {
        min-width:0;
        display:flex;
        flex-direction:column;
        gap:14px;
      }
      .hivefw-console-description {
        display:block;
        padding:18px;
      }
      .hivefw-console-description .mcr-subtitle {
        max-width:none;
      }
      .hivefw-console-toolbar,
      .hivefw-console-input-row {
        display:flex;
        align-items:center;
        gap:8px;
        flex-wrap:wrap;
      }
      @media (max-width: 870px) {
        .hivefw-console-page { padding:12px; }
        .hivefw-console-layout { grid-template-columns:minmax(0,1fr); }
        .hivefw-console-input { flex-basis:100%; min-width:0; }
      }
      .hivefw-console-card {
        min-width:0;
        max-width:100%;
        overflow:hidden;
        box-sizing:border-box;
        border:1px solid var(--divider-color);
        border-radius:16px;
        background:var(--card-background-color);
        padding:16px;
      }
      .hivefw-console-output {
        min-height:360px;
        max-height:62vh;
        overflow:auto;
        border-radius:12px;
        background:#101418;
        color:#d9e2e8;
        padding:14px;
        font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono",monospace;
        font-size:12px;
        line-height:1.55;
      }
      .hivefw-console-entry {
        padding:9px 0;
        border-bottom:1px solid rgba(255,255,255,.08);
      }
      .hivefw-console-entry:last-child { border-bottom:none; }
      .hivefw-console-command { color:#7dd3fc; white-space:pre-wrap; }
      .hivefw-console-response { color:#e5e7eb; white-space:pre-wrap; margin-top:4px; }
      .hivefw-console-entry.error .hivefw-console-response { color:#fca5a5; }
      .hivefw-console-time { color:#7b8794; margin-right:7px; }
      .hivefw-console-input {
        flex:1 1 420px;
        width:100%;
        max-width:100%;
        min-width:0;
        box-sizing:border-box;
        border:1px solid var(--divider-color);
        border-radius:11px;
        padding:11px 12px;
        background:var(--secondary-background-color);
        color:var(--primary-text-color);
        font:13px ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;
        outline:none;
      }
      .hivefw-console-input:focus { border-color:var(--primary-color); }
      .hivefw-console-hint {
        color:var(--secondary-text-color);
        font-size:11px;
        line-height:1.45;
        margin-top:8px;
      }
      .hivefw-console-error {
        color:var(--error-color,#db4437);
        font-size:12px;
        margin-top:8px;
      }
      .hivefw-console-empty {
        color:#7b8794;
        padding:28px 8px;
        text-align:center;
      }

      .mcr-page {
        height: 100%;
        min-height: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior-y: contain;
        box-sizing: border-box;
        padding: 18px;
        color: var(--primary-text-color);
        background:
          radial-gradient(circle at 96% 0%, color-mix(in srgb, var(--primary-color) 10%, transparent), transparent 34%),
          var(--primary-background-color);
      }
      .mcr-wrap {
        width: min(1160px, 100%);
        margin: 0 auto;
      }
      .mcr-hero {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 20px;
        padding: 22px 24px;
        border: 1px solid var(--divider-color);
        border-radius: 18px;
        background: var(--card-background-color);
        box-shadow: 0 8px 28px rgba(0,0,0,.055);
      }
      .mcr-eyebrow {
        display: flex;
        align-items: center;
        gap: 7px;
        margin-bottom: 7px;
        color: var(--primary-color);
        font-size: 11px;
        font-weight: 760;
        letter-spacing: .12em;
        text-transform: uppercase;
      }
      .mcr-title {
        margin: 0;
        font-size: 25px;
        line-height: 1.1;
        font-weight: 720;
      }
      .mcr-subtitle {
        max-width: 700px;
        margin: 8px 0 0;
        color: var(--secondary-text-color);
        font-size: 13px;
        line-height: 1.48;
      }
      .mcr-badge {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        margin-top: 12px;
        border-radius: 999px;
        padding: 5px 10px;
        font-size: 11px;
        font-weight: 700;
      }
      .mcr-badge.on {
        color: #2e7d32;
        background: rgba(76,175,80,.13);
      }
      .mcr-badge.off {
        color: var(--secondary-text-color);
        background: var(--secondary-background-color);
      }
      .mcr-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: currentColor;
      }
      .mcr-btn {
        border: 1px solid var(--divider-color);
        border-radius: 11px;
        padding: 9px 12px;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        cursor: pointer;
        font: inherit;
        font-size: 12px;
        font-weight: 650;
      }
      .mcr-btn:hover { border-color: var(--primary-color); }
      .mcr-btn:disabled { opacity: .55; cursor: default; }
      .mcr-btn.primary {
        border-color: var(--primary-color);
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .mcr-btn.danger {
        border-color: rgba(244,67,54,.45);
        color: var(--error-color, #db4437);
        background: transparent;
      }
      .mcr-grid {
        display: grid;
        grid-template-columns: repeat(4,minmax(0,1fr));
        gap: 11px;
        margin-top: 13px;
      }
      .mcr-metric {
        min-height: 82px;
        box-sizing: border-box;
        padding: 14px 15px;
        border: 1px solid var(--divider-color);
        border-radius: 15px;
        background: var(--card-background-color);
      }
      .mcr-metric-label {
        margin-bottom: 7px;
        color: var(--secondary-text-color);
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .075em;
        text-transform: uppercase;
      }
      .mcr-metric-value {
        font-size: 20px;
        font-weight: 730;
        line-height: 1.1;
      }
      .mcr-metric-sub {
        margin-top: 5px;
        color: var(--secondary-text-color);
        font-size: 10px;
      }
      .mcr-columns {
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 13px;
        margin-top: 13px;
        padding-bottom: 22px;
      }
      .mcr-card {
        padding: 18px;
        border: 1px solid var(--divider-color);
        border-radius: 17px;
        background: var(--card-background-color);
      }
      .mcr-card.wide { grid-column: 1 / -1; }
      .mcr-card-title {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;
        font-size: 14px;
        font-weight: 720;
      }
      .mcr-card-desc {
        margin-bottom: 15px;
        color: var(--secondary-text-color);
        font-size: 11px;
        line-height: 1.45;
      }
      .mcr-form-grid {
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 11px;
      }
      .mcr-field {
        display: flex;
        flex-direction: column;
        gap: 5px;
        min-width: 0;
      }
      .mcr-field label {
        color: var(--secondary-text-color);
        font-size: 10px;
        font-weight: 650;
        letter-spacing: .035em;
      }
      .mcr-input,
      .mcr-select {
        box-sizing: border-box;
        width: 100%;
        max-width: 100%;
        min-width: 0;
        min-height: 39px;
        border: 1px solid var(--divider-color);
        border-radius: 10px;
        padding: 8px 10px;
        background: var(--primary-background-color);
        color: var(--primary-text-color);
        font: inherit;
        font-size: 12px;
      }
      .mcr-input:focus,
      .mcr-select:focus {
        outline: none;
        border-color: var(--primary-color);
      }
      .mcr-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 13px;
      }
      .mcr-mode-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        padding: 13px 14px;
        border: 1px solid var(--divider-color);
        border-radius: 13px;
        background: var(--secondary-background-color);
      }
      .mcr-mode-name {
        font-size: 13px;
        font-weight: 700;
      }
      .mcr-mode-help {
        margin-top: 3px;
        color: var(--secondary-text-color);
        font-size: 10px;
      }
      .mcr-switch {
        position: relative;
        display: inline-block;
        width: 42px;
        height: 24px;
        flex: 0 0 auto;
      }
      .mcr-switch input { display: none; }
      .mcr-switch span {
        position: absolute;
        inset: 0;
        border-radius: 999px;
        background: var(--divider-color);
        cursor: pointer;
        transition: .18s ease;
      }
      .mcr-switch span::after {
        content: "";
        position: absolute;
        top: 3px;
        left: 3px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: white;
        box-shadow: 0 1px 4px rgba(0,0,0,.25);
        transition: .18s ease;
      }
      .mcr-switch input:checked + span {
        background: var(--primary-color);
      }
      .mcr-switch input:checked + span::after {
        transform: translateX(18px);
      }
      .mcr-stat-list {
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 8px;
      }
      .mcr-stat {
        padding: 10px 11px;
        border-radius: 11px;
        background: var(--secondary-background-color);
      }
      .mcr-stat-name {
        color: var(--secondary-text-color);
        font-size: 9px;
        text-transform: uppercase;
        letter-spacing: .065em;
      }
      .mcr-stat-value {
        margin-top: 4px;
        font-size: 13px;
        font-weight: 680;
      }
      .mcr-note {
        margin-top: 12px;
        padding: 11px 12px;
        border-radius: 11px;
        background: var(--secondary-background-color);
        color: var(--secondary-text-color);
        font-size: 10px;
        line-height: 1.5;
      }
      .mcr-message {
        margin-top: 12px;
        padding: 10px 12px;
        border-radius: 11px;
        font-size: 11px;
      }
      .mcr-message.ok {
        color: #2e7d32;
        background: rgba(76,175,80,.12);
      }
      .mcr-message.error {
        color: var(--error-color, #db4437);
        background: rgba(244,67,54,.1);
      }
      .mcr-state {
        margin-top: 14px;
        padding: 34px 24px;
        border: 1px dashed var(--divider-color);
        border-radius: 17px;
        background: var(--card-background-color);
        text-align: center;
      }
      .mcr-state-icon {
        width: 48px;
        height: 48px;
        display: grid;
        place-items: center;
        margin: 0 auto 13px;
        border-radius: 15px;
        background: var(--secondary-background-color);
        color: var(--primary-color);
        font-size: 22px;
      }
      .mcr-state-title { font-size: 15px; font-weight: 700; }
      .mcr-state-text {
        max-width: 590px;
        margin: 7px auto 0;
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.5;
      }

      .page-container {
        position: relative;
      }
      .hive-neighbors-overlay {
        position:absolute;
        inset:0;
        z-index:20;
        overflow:hidden;
        background:var(--primary-background-color);
      }
      .hive-neighbors-overlay > .mcr-page {
        height:100%;
        min-height:0;
      }

      .hive-neighbors-three {
        display:grid;
        grid-template-columns:minmax(300px,.95fr) minmax(320px,1fr) minmax(380px,1.35fr);
        gap:12px;
        width:100%;
        height:100%;
        min-height:0;
        overflow:hidden;
        box-sizing:border-box;
      }
      .hive-neighbors-column {
        min-width:0;
        min-height:0;
        height:100%;
        overflow:hidden;
        border:1px solid var(--divider-color);
        border-radius:16px;
        background:var(--card-background-color);
        display:flex;
        flex-direction:column;
      }
      .hive-neighbors-left-scroll,
      .hive-neighbors-discovery-scroll {
        flex:1 1 0;
        height:0;
        min-height:0;
        overflow-y:auto;
        overflow-x:hidden;
        overscroll-behavior:contain;
        scrollbar-gutter:stable;
        touch-action:pan-y;
        -webkit-overflow-scrolling:touch;
        padding:14px;
      }
      .hive-neighbors-left-scroll .mcr-wrap {
        width:100%;
        max-width:none;
        margin:0;
      }
      .hive-neighbors-left-scroll .mcr-hero {
        padding:18px;
      }
      .hive-neighbors-left-scroll .mcr-grid {
        grid-template-columns:repeat(2,minmax(0,1fr));
      }
      .hive-neighbors-left-scroll .hive-neighbors-grid {
        grid-template-columns:1fr;
      }
      .hive-discovery-head {
        display:flex;
        justify-content:space-between;
        align-items:flex-start;
        gap:10px;
        padding:16px;
        border-bottom:1px solid var(--divider-color);
      }
      .hive-discovery-eyebrow {
        color:var(--primary-color);
        font-size:9px;
        font-weight:760;
        letter-spacing:.11em;
        text-transform:uppercase;
        margin-bottom:4px;
      }
      .hive-discovery-title {
        font-size:16px;
        font-weight:720;
      }
      .hive-discovery-subtitle {
        margin-top:5px;
        color:var(--secondary-text-color);
        font-size:10px;
        line-height:1.4;
      }
      .hive-discovery-status {
        padding:10px 11px;
        border-radius:10px;
        background:color-mix(in srgb,var(--primary-color) 8%,transparent);
        font-size:10px;
        line-height:1.4;
        margin-bottom:10px;
      }
      .hive-discovery-list-head {
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:10px;
        margin:0 0 8px;
        color:var(--secondary-text-color);
        font-size:9px;
        font-weight:720;
        letter-spacing:.07em;
        text-transform:uppercase;
      }
      .hive-discovery-count {
        display:inline-flex;
        align-items:center;
        justify-content:center;
        min-width:24px;
        padding:3px 7px;
        border-radius:999px;
        background:color-mix(in srgb,var(--primary-color) 10%,transparent);
        color:var(--primary-color);
        font-size:9px;
        font-weight:780;
        letter-spacing:0;
      }
      .hive-discovery-item {
        display:grid;
        grid-template-columns:minmax(0,1fr) auto;
        align-items:center;
        gap:9px;
        padding:10px;
        border:1px solid var(--divider-color);
        border-radius:10px;
        background:var(--primary-background-color);
        cursor:pointer;
      }
      .hive-discovery-item + .hive-discovery-item { margin-top:7px; }
      .hive-discovery-item:hover,
      .hive-discovery-item.selected {
        border-color:var(--primary-color);
        background:color-mix(in srgb,var(--primary-color) 6%,var(--primary-background-color));
      }
      .hive-discovery-signal {
        min-width:76px;
        display:inline-flex;
        align-items:center;
        justify-content:flex-end;
        gap:6px;
        text-align:right;
        font-size:12px;
        font-weight:700;
      }
      .hive-discovery-signal-dot {
        flex:0 0 auto;
        width:12px;
        height:12px;
        border-radius:50%;
        border:2px solid white;
        box-shadow:0 1px 4px rgba(0,0,0,.35);
      }
      .hive-discovery-empty {
        padding:22px 14px;
        border:1px dashed var(--divider-color);
        border-radius:11px;
        color:var(--secondary-text-color);
        text-align:center;
        font-size:10px;
        line-height:1.45;
      }
      .hive-neighbor-signal-label,
      .hivefw-map-tooltip {
        border:1px solid #c8ccd0 !important;
        border-radius:7px !important;
        background:#eef0f2 !important;
        color:#202124 !important;
        box-shadow:0 1px 4px rgba(0,0,0,.18) !important;
        padding:2px 5px !important;
        font-size:9px !important;
        font-weight:700 !important;
      }
      .hive-neighbor-signal-label::before,
      .hivefw-map-tooltip::before { display:none !important; }
      .hivefw-node-popup .leaflet-popup-content-wrapper,
      .hivefw-node-popup .leaflet-popup-tip {
        background:#eef0f2 !important;
        color:#202124 !important;
      }
      .hivefw-node-popup .leaflet-popup-content {
        color:#202124 !important;
      }
      .hive-neighbors-map {
        position:relative;
      }
      .hive-neighbors-map-host {
        position:relative;
        flex:1 1 0;
        height:0;
        min-height:0;
        overflow:hidden;
      }
      .hive-neighbors-map-host ha-map {
        display:block;
        width:100%;
        height:100%;
        min-height:0;
      }
      .hive-neighbors-map-note {
        display:grid;
        place-items:center;
        height:100%;
        min-height:360px;
        padding:24px;
        box-sizing:border-box;
        color:var(--secondary-text-color);
        text-align:center;
        font-size:11px;
        line-height:1.45;
      }
      .hive-neighbors-map-count {
        position:absolute;
        top:10px;
        right:10px;
        z-index:30;
        padding:5px 8px;
        border:1px solid var(--divider-color);
        border-radius:999px;
        background:color-mix(in srgb,var(--card-background-color) 92%,transparent);
        box-shadow:0 1px 5px rgba(0,0,0,.16);
        font-size:9px;
        font-weight:700;
        pointer-events:none;
      }
      .hive-network-overlay {
        position:absolute;
        inset:0;
        z-index:21;
        overflow:auto;
        background:var(--primary-background-color);
      }
      .hive-network-page {
        min-height:100%;
        padding:0 0 18px;
        box-sizing:border-box;
      }
      .hive-network-analytics {
        margin-bottom:12px;
        padding:16px;
        border:1px solid var(--divider-color);
        border-radius:16px;
        background:var(--card-background-color);
      }
      .hive-network-head {
        display:flex;
        align-items:flex-start;
        justify-content:space-between;
        gap:14px;
        margin-bottom:13px;
      }
      .hive-network-head h1 {
        margin:2px 0 3px;
        font-size:20px;
        line-height:1.2;
      }
      .hive-network-head p {
        margin:0;
        max-width:760px;
        color:var(--secondary-text-color);
        font-size:11px;
        line-height:1.45;
      }
      .hive-network-range {
        display:flex;
        gap:5px;
        padding:3px;
        border:1px solid var(--divider-color);
        border-radius:10px;
        background:var(--secondary-background-color);
      }
      .hive-network-range button {
        border:0;
        border-radius:7px;
        padding:6px 9px;
        background:transparent;
        color:var(--secondary-text-color);
        font:inherit;
        font-size:10px;
        font-weight:700;
        cursor:pointer;
      }
      .hive-network-range button.active {
        background:var(--primary-color);
        color:white;
      }
      .hive-network-metrics {
        display:grid;
        grid-template-columns:repeat(6,minmax(105px,1fr));
        gap:8px;
        margin-bottom:10px;
      }
      .hive-network-metric {
        min-width:0;
        padding:10px 11px;
        border:1px solid var(--divider-color);
        border-radius:11px;
        background:var(--primary-background-color);
      }
      .hive-network-metric span {
        display:block;
        color:var(--secondary-text-color);
        font-size:9px;
        font-weight:700;
        letter-spacing:.03em;
        text-transform:uppercase;
      }
      .hive-network-metric strong {
        display:block;
        margin-top:4px;
        font-size:18px;
        line-height:1.1;
      }
      .hive-network-metric small {
        display:block;
        margin-top:3px;
        color:var(--secondary-text-color);
        font-size:9px;
        line-height:1.3;
      }
      .hive-network-panels {
        display:grid;
        grid-template-columns:1.05fr 1fr 1.15fr;
        gap:8px;
      }
      .hive-network-panel {
        min-width:0;
        padding:11px;
        border:1px solid var(--divider-color);
        border-radius:11px;
        background:var(--primary-background-color);
      }
      .hive-network-panel-title {
        display:flex;
        justify-content:space-between;
        gap:8px;
        margin-bottom:9px;
        font-size:11px;
        font-weight:760;
      }
      .hive-network-bar-row {
        display:grid;
        grid-template-columns:minmax(70px,1fr) 2.1fr auto;
        align-items:center;
        gap:7px;
        margin-top:6px;
        font-size:9px;
      }
      .hive-network-bar-track {
        height:6px;
        overflow:hidden;
        border-radius:999px;
        background:var(--divider-color);
      }
      .hive-network-bar-fill {
        height:100%;
        border-radius:inherit;
        background:var(--primary-color);
      }
      .hive-network-top-row {
        display:grid;
        grid-template-columns:minmax(0,1fr) auto;
        gap:8px;
        padding:6px 0;
        border-top:1px solid var(--divider-color);
        font-size:10px;
      }
      .hive-network-top-row:first-of-type { border-top:0; }
      .hive-network-top-row strong {
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
      .hive-network-event {
        display:grid;
        grid-template-columns:auto minmax(0,1fr);
        gap:7px;
        padding:5px 0;
        border-top:1px solid var(--divider-color);
        font-size:9px;
        line-height:1.35;
      }
      .hive-network-event:first-of-type { border-top:0; }
      .hive-network-event time { color:var(--secondary-text-color); }
      .hive-network-copy {
        height:min(68vh,760px);
        min-height:600px;
      }
      .hive-network-copy .hive-neighbors-three { height:100%; }

      @media (max-width:1050px) {
        .hive-neighbors-overlay { overflow:auto; }
        .hive-neighbors-overlay > .mcr-page { height:auto; min-height:100%; }
        .hive-network-metrics { grid-template-columns:repeat(2,minmax(0,1fr)); }
        .hive-network-panels { grid-template-columns:1fr; }
        .hive-network-head { flex-direction:column; }
        .hive-network-copy { height:auto; min-height:0; }
        .hive-neighbors-three {
          grid-template-columns:1fr;
          height:auto;
          overflow:visible;
        }
        .hive-neighbors-column { height:auto; min-height:360px; }
        .hive-neighbors-left-scroll,
        .hive-neighbors-discovery-scroll {
          flex:0 0 auto;
          height:auto;
          overflow:visible;
        }
        .hive-neighbors-map { min-height:500px; }
        .hive-neighbors-map-host {
          flex:0 0 auto;
          height:430px;
          min-height:430px;
        }
      }

            .hive-neighbors-toolbar {
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:12px;
        margin:18px 0 10px;
      }
      .hive-neighbors-sort {
        display:inline-flex;
        gap:3px;
        padding:3px;
        border:1px solid var(--divider-color);
        border-radius:11px;
        background:var(--secondary-background-color);
      }
      .hive-neighbors-sort button {
        border:0;
        border-radius:8px;
        padding:7px 10px;
        background:transparent;
        color:var(--secondary-text-color);
        font:inherit;
        font-size:11px;
        font-weight:650;
        cursor:pointer;
      }
      .hive-neighbors-sort button.active {
        background:var(--primary-color);
        color:var(--text-primary-color,#fff);
      }
      .hive-neighbors-grid {
        display:grid;
        grid-template-columns:repeat(2,minmax(0,1fr));
        gap:12px;
        padding-bottom:22px;
      }
      .hive-neighbor-card {
        position:relative;
        overflow:hidden;
        display:grid;
        grid-template-columns:42px minmax(0,1fr) auto;
        align-items:center;
        gap:14px;
        padding:16px;
        border:1px solid var(--divider-color);
        border-radius:16px;
        background:var(--card-background-color);
      }
      .hive-neighbor-card::before {
        content:"";
        position:absolute;
        inset:0 auto 0 0;
        width:3px;
        background:var(--primary-color);
      }
      .hive-neighbor-icon {
        width:42px;
        height:42px;
        display:grid;
        place-items:center;
        border-radius:13px;
        background:color-mix(in srgb,var(--primary-color) 10%,var(--card-background-color));
        color:var(--primary-color);
        font-size:20px;
      }
      .hive-neighbor-name {
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size:14px;
        font-weight:700;
      }
      .hive-neighbor-prefix {
        margin-top:4px;
        color:var(--secondary-text-color);
        font:11px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
        letter-spacing:.035em;
      }
      .hive-neighbor-meta {
        display:flex;
        flex-wrap:wrap;
        align-items:center;
        gap:7px;
        margin-top:8px;
        color:var(--secondary-text-color);
        font-size:11px;
      }
      .hive-neighbor-pill {
        border-radius:999px;
        padding:3px 8px;
        background:color-mix(in srgb,var(--primary-color) 10%,transparent);
        color:var(--primary-color);
        font-size:10px;
        font-weight:700;
      }
      .hive-neighbor-side { text-align:right; min-width:64px; }
      .hive-neighbor-age { font-size:13px; font-weight:700; }
      .hive-neighbor-side-label {
        margin-top:4px;
        color:var(--secondary-text-color);
        font-size:9px;
        letter-spacing:.07em;
        text-transform:uppercase;
      }

      @media (max-width: 820px) {
        .mcr-page { padding: 12px; }
        .mcr-hero { flex-direction: column; padding: 18px; }
        .mcr-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
        .mcr-columns { grid-template-columns: 1fr; }
        .mcr-card.wide { grid-column: auto; }
        .hive-neighbors-grid { grid-template-columns:1fr; }
      }
      @media (max-width: 520px) {
        .mcr-grid { grid-template-columns: 1fr 1fr; }
        .mcr-form-grid { grid-template-columns: 1fr; }
        .mcr-stat-list { grid-template-columns: 1fr 1fr; }
      }
    `;

    root.appendChild(style);
  }

  __metricLayoutStorageKey() {
    const entry=String(this.__entryId()||"default").replace(/[^a-zA-Z0-9_.-]/g,"_");
    return `hivefw.metric_layout.v1.${entry}`;
  }

  __loadMetricLayout() {
    try{
      const raw=localStorage.getItem(this.__metricLayoutStorageKey());
      if(!raw)return {order:[],hidden:[]};
      const parsed=JSON.parse(raw);
      return {
        order:Array.isArray(parsed?.order)?parsed.order.map(String):[],
        hidden:Array.isArray(parsed?.hidden)?parsed.hidden.map(String):[],
      };
    }catch{
      return {order:[],hidden:[]};
    }
  }

  __saveMetricLayout(layout) {
    try{
      localStorage.setItem(this.__metricLayoutStorageKey(),JSON.stringify({
        order:Array.isArray(layout?.order)?layout.order:[],
        hidden:Array.isArray(layout?.hidden)?layout.hidden:[],
      }));
    }catch{}
  }

  __metricTileInfo(hero) {
    const seen=new Map();
    return [...hero.querySelectorAll(":scope > .hero-tile")].map((tile,index)=>{
      let id=tile.dataset.hiveMetricId;
      const head=tile.querySelector(".hero-tile-head");
      const title=(head?.textContent||`Métrica ${index+1}`).trim().replace(/\s+/g," ");
      if(!id){
        if(tile.dataset.repeaterExtra){
          id=`hive:${tile.dataset.repeaterExtra}`;
        }else{
          const base=title.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
            .replace(/[^a-z0-9]+/g,"-")
            .replace(/^-|-$/g,"") || `metric-${index+1}`;
          const count=(seen.get(base)||0)+1;
          seen.set(base,count);
          id=`native:${base}${count>1?`-${count}`:""}`;
        }
        tile.dataset.hiveMetricId=id;
      }
      return {id,title,tile,index};
    });
  }

  __defaultMetricOrder(items) {
    const priority=[
      // Standard layout matches the approved Device cockpit order.
      "hive:state",
      "native:radio-activity",
      "hive:airtime-health",
      "native:messages-sent",
      "native:messages-received",
      "hive:integrity",

      "hive:uptime",
      "native:battery",
      "hive:temperature",
      "hive:rf-health",
      "native:last-message-strength",
      "hive:clock",

      "hive:network-activity",
      "hive:protocol",
      "hive:hardware",
      "hive:repeat-frequencies",
      "hive:health-alerts",
      "hive:queue",

      "hive:capacity",
      "hive:storage",
      "native:location",

      // Less frequently used optional metrics follow the approved cockpit.
      "hive:traffic-now",
      "hive:reliability",
      "hive:request-tokens",
      "hive:contacts",
    ];
    const rank=new Map(priority.map((id,index)=>[id,index]));
    return [...items]
      .sort((a,b)=>{
        const ar=rank.has(a.id)?rank.get(a.id):999;
        const br=rank.has(b.id)?rank.get(b.id):999;
        return ar-br || a.index-b.index;
      })
      .map((item)=>item.id);
  }

  __applyMetricLayout(hero) {
    const items=this.__metricTileInfo(hero);
    if(!items.length)return;
    const saved=this.__loadMetricLayout();
    const knownIds=new Set(items.map((item)=>item.id));
    const storedOrder=saved.order.filter((id)=>knownIds.has(id));
    const defaultOrder=this.__defaultMetricOrder(items);
    const missing=defaultOrder.filter((id)=>!storedOrder.includes(id));
    const order=storedOrder.length?[...storedOrder,...missing]:defaultOrder;
    const hidden=new Set(saved.hidden.filter((id)=>knownIds.has(id)));

    items.forEach(({id,tile})=>{
      const position=order.indexOf(id);
      tile.style.order=String(position<0?999:position);
      tile.style.display=hidden.has(id)?"none":"";
    });
  }

  __closeMetricEditor() {
    this.shadowRoot?.querySelector("#hive-metric-editor-overlay")?.remove();
  }

  __openMetricEditor(summary,nroot,hero) {
    this.__closeMetricEditor();
    const items=this.__metricTileInfo(hero);
    if(!items.length)return;

    const saved=this.__loadMetricLayout();
    const byId=new Map(items.map((item)=>[item.id,item]));
    const stored=saved.order.filter((id)=>byId.has(id));
    const defaultOrder=this.__defaultMetricOrder(items);
    const order=stored.length?[...stored,...defaultOrder.filter((id)=>!stored.includes(id))]:defaultOrder;
    const hidden=new Set(saved.hidden.filter((id)=>byId.has(id)));

    const overlay=document.createElement("div");
    overlay.id="hive-metric-editor-overlay";
    overlay.style.cssText="position:fixed;inset:0;z-index:10050;background:rgba(0,0,0,.48);display:grid;place-items:center;padding:18px;box-sizing:border-box;";

    const dialog=document.createElement("div");
    dialog.style.cssText="width:min(520px,100%);max-height:min(78vh,720px);display:flex;flex-direction:column;background:var(--card-background-color,#fff);color:var(--primary-text-color,#222);border-radius:12px;box-shadow:0 10px 34px rgba(0,0,0,.28);overflow:hidden;";

    const header=document.createElement("div");
    header.style.cssText="display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid var(--divider-color,#ddd);";
    const title=document.createElement("div");
    title.textContent="Editar métricas";
    title.style.cssText="flex:1;font-size:16px;font-weight:700;";
    const close=document.createElement("button");
    close.type="button";
    close.textContent="✕";
    close.title="Fechar";
    close.style.cssText="width:32px;height:32px;border:0;border-radius:50%;background:transparent;color:inherit;font-size:17px;cursor:pointer;";
    close.addEventListener("click",()=>this.__closeMetricEditor());
    header.append(title,close);

    const help=document.createElement("div");
    help.textContent="Arrasta para ordenar. Usa o olho para mostrar ou ocultar cartões.";
    help.style.cssText="padding:10px 16px 5px;font-size:11px;color:var(--secondary-text-color,#777);";

    const list=document.createElement("div");
    list.style.cssText="overflow:auto;padding:7px 12px 12px;display:flex;flex-direction:column;gap:6px;";

    const persist=()=>{
      const ids=[...list.querySelectorAll("[data-metric-editor-id]")].map((row)=>row.dataset.metricEditorId);
      const hiddenIds=[...list.querySelectorAll("[data-metric-editor-id]")]
        .filter((row)=>row.dataset.hidden==="1")
        .map((row)=>row.dataset.metricEditorId);
      this.__saveMetricLayout({order:ids,hidden:hiddenIds});
      this.__applyMetricLayout(hero);
    };

    const buildRow=(id)=>{
      const info=byId.get(id);
      if(!info)return null;
      const row=document.createElement("div");
      row.dataset.metricEditorId=id;
      row.dataset.hidden=hidden.has(id)?"1":"0";
      row.draggable=true;
      row.style.cssText="display:grid;grid-template-columns:28px minmax(0,1fr) 30px 30px 38px;align-items:center;gap:6px;min-height:42px;padding:6px 8px;border:1px solid var(--divider-color,#ddd);border-radius:8px;background:var(--secondary-background-color,#f5f5f5);";

      const drag=document.createElement("span");
      drag.textContent="☰";
      drag.title="Arrastar";
      drag.style.cssText="cursor:grab;text-align:center;opacity:.65;font-size:17px;user-select:none;";

      const label=document.createElement("span");
      label.textContent=info.title;
      label.style.cssText="min-width:0;font-size:13px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;";

      const up=document.createElement("button");
      up.type="button"; up.textContent="↑"; up.title="Subir";
      const down=document.createElement("button");
      down.type="button"; down.textContent="↓"; down.title="Descer";
      for(const btn of [up,down]){
        btn.style.cssText="width:28px;height:28px;padding:0;border:1px solid var(--divider-color,#ccc);border-radius:6px;background:var(--card-background-color,#fff);color:inherit;cursor:pointer;";
      }

      const eye=document.createElement("button");
      eye.type="button";
      const refreshEye=()=>{
        const isHidden=row.dataset.hidden==="1";
        eye.textContent=isHidden?"◉":"👁";
        eye.title=isHidden?"Mostrar":"Ocultar";
        eye.style.opacity=isHidden?".48":"1";
        label.style.opacity=isHidden?".48":"1";
      };
      eye.style.cssText="width:36px;height:28px;padding:0;border:1px solid var(--divider-color,#ccc);border-radius:6px;background:var(--card-background-color,#fff);color:inherit;cursor:pointer;font-size:14px;";
      refreshEye();

      eye.addEventListener("click",()=>{
        row.dataset.hidden=row.dataset.hidden==="1"?"0":"1";
        refreshEye();
        persist();
      });
      up.addEventListener("click",()=>{
        const prev=row.previousElementSibling;
        if(prev){list.insertBefore(row,prev);persist();}
      });
      down.addEventListener("click",()=>{
        const next=row.nextElementSibling;
        if(next){list.insertBefore(next,row);persist();}
      });

      row.addEventListener("dragstart",(event)=>{
        event.dataTransfer?.setData("text/plain",id);
        if(event.dataTransfer)event.dataTransfer.effectAllowed="move";
        row.style.opacity=".55";
      });
      row.addEventListener("dragend",()=>{row.style.opacity="1";});
      row.addEventListener("dragover",(event)=>{
        event.preventDefault();
        if(event.dataTransfer)event.dataTransfer.dropEffect="move";
      });
      row.addEventListener("drop",(event)=>{
        event.preventDefault();
        const draggedId=event.dataTransfer?.getData("text/plain");
        if(!draggedId||draggedId===id)return;
        const dragged=list.querySelector(`[data-metric-editor-id="${CSS.escape(draggedId)}"]`);
        if(!dragged)return;
        const box=row.getBoundingClientRect();
        const before=event.clientY<box.top+box.height/2;
        list.insertBefore(dragged,before?row:row.nextElementSibling);
        persist();
      });

      row.append(drag,label,up,down,eye);
      return row;
    };

    order.forEach((id)=>{
      const row=buildRow(id);
      if(row)list.appendChild(row);
    });

    const footer=document.createElement("div");
    footer.style.cssText="display:flex;justify-content:space-between;gap:8px;padding:12px 16px;border-top:1px solid var(--divider-color,#ddd);";
    const reset=document.createElement("button");
    reset.type="button";
    reset.textContent="Repor padrão";
    reset.style.cssText="padding:7px 11px;border:1px solid var(--divider-color,#ccc);border-radius:7px;background:var(--card-background-color,#fff);color:inherit;font-size:12px;font-weight:600;cursor:pointer;";
    reset.addEventListener("click",()=>{
      try{localStorage.removeItem(this.__metricLayoutStorageKey());}catch{}
      this.__applyMetricLayout(hero);
      this.__closeMetricEditor();
      this.__openMetricEditor(summary,nroot,hero);
    });
    const done=document.createElement("button");
    done.type="button";
    done.textContent="Concluído";
    done.style.cssText="padding:7px 13px;border:1px solid var(--primary-color,#03a9f4);border-radius:7px;background:var(--primary-color,#03a9f4);color:#fff;font-size:12px;font-weight:700;cursor:pointer;";
    done.addEventListener("click",()=>this.__closeMetricEditor());
    footer.append(reset,done);

    dialog.append(header,help,list,footer);
    overlay.appendChild(dialog);
    overlay.addEventListener("click",(event)=>{
      if(event.target===overlay)this.__closeMetricEditor();
    });
    this.shadowRoot?.appendChild(overlay);
  }

  __ensureMetricEditor(summary,nroot,hero) {
    // Layout is always applied here. The editor itself is opened from the
    // existing Companion gear menu via "Editar Menu".
    nroot.querySelector(".hive-metric-toolbar")?.remove();
    nroot.querySelector("#hive-metric-editor-style")?.remove();
    this.__applyMetricLayout(hero);
  }

  __closeRxLog() {
    this.__rxLogOverlay?.remove();
    this.__rxLogOverlay=null;
  }

  __rxLogTime(value) {
    if(value==null||value==="")return "—";
    let date=new Date(value);
    if(Number.isNaN(date.getTime())){
      const numeric=Number(value);
      if(Number.isFinite(numeric))date=new Date(numeric*(numeric<1e12?1000:1));
    }
    return Number.isNaN(date.getTime())?String(value):date.toLocaleString();
  }

  async __loadRxLogRows() {
    if(!this.hass||this.__rxLogLoading)return;
    this.__rxLogLoading=true;
    try{
      const msg={type:"hivefw_integration/get_rx_log",limit:150,incoming_only:true};
      const entryId=this.__entryId();
      if(entryId)msg.entry_id=entryId;
      const result=await this.hass.callWS(msg);
      this.__rxLogRows=Array.isArray(result?.rows)?result.rows:[];
      this.__rxLogLoadedEntry=this.__entryId()||null;
    }catch(error){
      console.error("HiveFW RX Log failed:",error);
      this.__rxLogRows=[];
    }finally{
      this.__rxLogLoading=false;
      if(this.__rxLogOverlay?.isConnected)this.__renderRxLogOverlay();
      if(this._activeTab==="settings")this.__enhanceSettingsPage();
    }
  }

  __renderRxLogOverlay() {
    const overlay=this.__rxLogOverlay;
    if(!overlay)return;
    const dialog=overlay.querySelector(".hive-rxlog-dialog");
    if(!dialog)return;
    const oldFilter=dialog.querySelector(".hive-rxlog-filter")?.value||"";
    dialog.replaceChildren();

    const header=document.createElement("div");
    header.style.cssText="display:flex;align-items:center;gap:8px;padding:14px 16px;border-bottom:1px solid var(--divider-color,#ddd);";
    const title=document.createElement("div");
    title.textContent="RX Log";
    title.style.cssText="flex:1;font-size:16px;font-weight:700;";
    const refresh=document.createElement("button");
    refresh.type="button";refresh.textContent="Atualizar";
    refresh.style.cssText="padding:6px 9px;border:1px solid var(--divider-color,#ccc);border-radius:7px;background:var(--card-background-color,#fff);color:inherit;font-size:11px;cursor:pointer;";
    refresh.disabled=this.__rxLogLoading;
    refresh.addEventListener("click",()=>void this.__loadRxLogRows());
    const exportBtn=document.createElement("button");
    exportBtn.type="button";exportBtn.textContent="Exportar JSON";
    exportBtn.style.cssText=refresh.style.cssText;
    exportBtn.addEventListener("click",()=>{
      const blob=new Blob([JSON.stringify({rx_log:this.__rxLogRows},null,2)],{type:"application/json;charset=utf-8"});
      const url=URL.createObjectURL(blob);
      const link=document.createElement("a");
      link.href=url;link.download="hivefw_rx_log.json";document.body.appendChild(link);link.click();link.remove();
      window.setTimeout(()=>URL.revokeObjectURL(url),1000);
    });
    const close=document.createElement("button");
    close.type="button";close.textContent="✕";close.title="Fechar";
    close.style.cssText="width:30px;height:30px;border:0;border-radius:50%;background:transparent;color:inherit;font-size:17px;cursor:pointer;";
    close.addEventListener("click",()=>this.__closeRxLog());
    header.append(title,refresh,exportBtn,close);
    dialog.appendChild(header);

    const note=document.createElement("div");
    note.textContent="Observações de receção já guardadas no Home Assistant · sem tráfego RF adicional · máximo 150 linhas";
    note.style.cssText="padding:9px 16px 5px;font-size:10px;color:var(--secondary-text-color,#777);";
    dialog.appendChild(note);

    const filter=document.createElement("input");
    filter.className="hive-rxlog-filter";
    filter.type="search";filter.placeholder="Filtrar por nó, conversa, path ou texto…";filter.value=oldFilter;
    filter.style.cssText="box-sizing:border-box;margin:7px 16px 9px;width:calc(100% - 32px);padding:8px 10px;border:1px solid var(--divider-color,#ccc);border-radius:8px;background:var(--primary-background-color,#fff);color:var(--primary-text-color,#222);font:inherit;font-size:12px;";
    dialog.appendChild(filter);

    const body=document.createElement("div");
    body.style.cssText="overflow:auto;padding:0 12px 12px;";
    dialog.appendChild(body);

    const renderRows=()=>{
      body.replaceChildren();
      const q=filter.value.trim().toLowerCase();
      const rows=this.__rxLogRows.filter((row)=>{
        if(!q)return true;
        const hay=[row.sender,row.conversation_name,row.pubkey_prefix,row.text,row.path,Array.isArray(row.path_nodes)?row.path_nodes.join(","):""].join(" ").toLowerCase();
        return hay.includes(q);
      });
      if(this.__rxLogLoading&&!rows.length){
        const loading=document.createElement("div");loading.textContent="A carregar…";loading.style.cssText="padding:24px;text-align:center;color:var(--secondary-text-color,#777);";body.appendChild(loading);return;
      }
      if(!rows.length){
        const empty=document.createElement("div");empty.textContent="Sem observações RX guardadas para este filtro.";empty.style.cssText="padding:24px;text-align:center;color:var(--secondary-text-color,#777);";body.appendChild(empty);return;
      }
      for(const row of rows){
        const item=document.createElement("div");
        item.style.cssText="display:grid;grid-template-columns:145px minmax(130px,1fr) minmax(180px,1.5fr) auto;gap:9px;align-items:start;padding:8px 6px;border-top:1px solid var(--divider-color,#e5e5e5);font-size:11px;";
        const time=document.createElement("div");time.textContent=this.__rxLogTime(row.timestamp);time.style.color="var(--secondary-text-color,#777)";
        const who=document.createElement("div");
        const sender=document.createElement("div");sender.textContent=row.sender||row.conversation_name||"—";sender.style.fontWeight="650";
        const conv=document.createElement("div");conv.textContent=row.conversation_name||"";conv.style.cssText="margin-top:2px;font-size:9px;color:var(--secondary-text-color,#777);";who.append(sender,conv);
        const route=document.createElement("div");
        const pathNodes=Array.isArray(row.path_nodes)?row.path_nodes.join(" → "):String(row.path||"");
        route.textContent=pathNodes||row.text||"—";
        route.style.cssText="font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;overflow-wrap:anywhere;";
        const radio=document.createElement("div");
        const stats=[];
        if(Number.isFinite(Number(row.rssi)))stats.push("RSSI "+Number(row.rssi).toFixed(0));
        if(Number.isFinite(Number(row.snr)))stats.push("SNR "+Number(row.snr).toFixed(1));
        if(Number.isFinite(Number(row.hop_count)))stats.push(Number(row.hop_count)+" hops");
        radio.textContent=stats.join(" · ")||"—";radio.style.whiteSpace="nowrap";
        item.append(time,who,route,radio);body.appendChild(item);
      }
    };
    filter.addEventListener("input",renderRows);
    renderRows();
  }

  __openRxLog(settingsPage) {
    this.__closeRxLog();
    settingsPage._settingsModalOpen=false;
    settingsPage.requestUpdate?.();
    const overlay=document.createElement("div");
    overlay.id="hive-rxlog-overlay";
    overlay.style.cssText="position:fixed;inset:0;z-index:10060;background:rgba(0,0,0,.48);display:grid;place-items:center;padding:18px;box-sizing:border-box;";
    const dialog=document.createElement("div");
    dialog.className="hive-rxlog-dialog";
    dialog.style.cssText="width:min(980px,100%);max-height:min(84vh,780px);display:flex;flex-direction:column;background:var(--card-background-color,#fff);color:var(--primary-text-color,#222);border-radius:12px;box-shadow:0 10px 34px rgba(0,0,0,.28);overflow:hidden;";
    overlay.appendChild(dialog);
    overlay.addEventListener("click",(event)=>{if(event.target===overlay)this.__closeRxLog();});
    this.shadowRoot?.appendChild(overlay);
    this.__rxLogOverlay=overlay;
    this.__renderRxLogOverlay();
    void this.__loadRxLogRows();
  }

  __ensureMetricSettingsMenu(settingsPage,sroot) {
    const modal=sroot.querySelector('.modal-card[data-a11y="companion-settings"]');
    const body=modal?.querySelector(".modal-body");
    if(!body)return;

    // Command execution now lives in the full-width Consola card in Definições.
    // Remove the old modal launcher so the overflow menu stays device-focused.
    for (const button of body.querySelectorAll(".modal-action")) {
      if (button.textContent?.trim() === "Issue Command") button.remove();
    }

    let edit=body.querySelector(".hive-edit-menu-action");
    if(!edit){
      edit=document.createElement("button");
      edit.type="button";
      edit.className="modal-action hive-edit-menu-action";
      edit.innerHTML='<span class="modal-action-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25M20.71 7.04c.39-.39.39-1.03 0-1.42l-2.34-2.34a.995.995 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.82z"/></svg></span>Editar Menu';
      edit.addEventListener("click",(event)=>{
        event.preventDefault();event.stopPropagation();
        settingsPage._settingsModalOpen=false;settingsPage.requestUpdate?.();
        window.setTimeout(()=>{
          const summary=sroot.querySelector("meshcore-node-summary");
          const nroot=summary?.shadowRoot;const hero=nroot?.querySelector(".hero-row");
          if(summary&&nroot&&hero)this.__openMetricEditor(summary,nroot,hero);
        },40);
      });
      body.prepend(edit);
    }

    body.querySelector(".hive-rxlog-action")?.remove();
  }

  __enhanceStatePage() {
    const statusPage = this.shadowRoot?.querySelector("meshcore-status-page");
    const sroot = statusPage?.shadowRoot;
    if (!sroot) return;

    this.__enhanceCompanionHero(sroot);

    const summary = sroot.querySelector("meshcore-node-summary");
    const nroot = summary?.shadowRoot;
    const hero = nroot?.querySelector(".hero-row");
    if (summary && nroot && hero) {
      let edit = sroot.querySelector(".hivefw-status-edit-metrics");
      if (!edit) {
        edit = document.createElement("button");
        edit.type = "button";
        edit.className = "minor hivefw-status-edit-metrics";
        edit.textContent = "Editar métricas";
        edit.addEventListener("click", () => this.__openMetricEditor(summary, nroot, hero));
        const header = sroot.querySelector(".companion-header");
        header?.appendChild(edit);
      }
    }
  }

  __enhanceSettingsPage() {
    const settingsPage = this.shadowRoot?.querySelector("meshcore-settings-page");
    const sroot = settingsPage?.shadowRoot;
    if (!sroot) return;

    if (this.__settingsObservedRoot !== sroot) {
      this.__settingsObserver?.disconnect();
      this.__settingsObservedRoot = sroot;
      this.__settingsObserver = new MutationObserver(() => {
        queueMicrotask(() => {
          if (this._activeTab === "settings") this.__enhanceSettingsPage();
        });
      });
    }

    // Ignore mutations caused by our own injected cards. Reconnect the
    // observer only after rendering so it reacts to Lit replacing Settings,
    // not to replaceChildren()/appendChild() below.
    this.__settingsObserver?.disconnect();

    if (!sroot.querySelector("#hive-settings-extension-style")) {
      const style = document.createElement("style");
      style.id = "hive-settings-extension-style";
      style.textContent = `
        .hive-settings-pill {
          display:inline-flex;align-items:center;gap:6px;padding:4px 8px;
          border-radius:999px;font-size:11px;font-weight:650;
          background:var(--secondary-background-color);color:var(--secondary-text-color);
        }
        .hive-settings-pill.on { color:#2e7d32;background:rgba(76,175,80,.13); }
        .hive-settings-controls { display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px; }
        .hive-settings-field { display:flex;flex-direction:column;gap:5px; }
        .hive-settings-field label { font-size:11px;color:var(--secondary-text-color); }
        .hive-settings-field input,.hive-settings-field select {
          box-sizing:border-box;width:100%;min-height:38px;border:1px solid var(--divider-color);
          border-radius:8px;padding:8px;background:var(--primary-background-color);
          color:var(--primary-text-color);font:inherit;font-size:12px;
        }
        .hive-settings-note { margin-top:10px;font-size:11px;line-height:1.45;color:var(--secondary-text-color); }
        @media(max-width:870px){
          .hive-settings-controls{grid-template-columns:minmax(0,1fr)}
          .hive-settings-controls,.hive-settings-field,.hive-settings-note{
            min-width:0;max-width:100%;box-sizing:border-box;
          }
          .hive-settings-field input,.hive-settings-field select{
            width:100%;min-width:0;max-width:100%;box-sizing:border-box;
          }
        }
      `;
      sroot.appendChild(style);
    }

    const grid = sroot.querySelector(".settings-grid");
    if (!grid) return;

    const nativeLayout=!!sroot.querySelector('.settings-container[data-hive-native-layout="device-v2"]');

    // HiveFW is a single active companion connection in this integration.
    // Never expose the legacy upstream "managed devices" card.
    sroot.querySelector("#hive-managed-devices-card")?.remove();

    if(!settingsPage.__hiveRemoteAdminBound){
      settingsPage.__hiveRemoteAdminBound=true;
      settingsPage.addEventListener("hivefw-open-remote-admin",(event)=>{
        const device=event?.detail?.device;
        if(device)this.__openRemoteAdmin(device);
      });
    }

    // New bundles own the Device structure from first paint. Keep these
    // renderers only as a compatibility fallback for an older cached bundle.
    if(!nativeLayout){
      // Compatibility fallback for an older cached Settings bundle. Only the
      // fallback needs wrapper-owned repeater state; the native page performs
      // its own single authoritative radio read.
      if (!this.__repeaterStatus && !this.__repeaterLoading) {
        queueMicrotask(() => void this.__loadRepeaterStatus());
      }
      this.__renderSettingsRepeaterCard(sroot, grid);
      this.__renderRegionsScopesCard(sroot, grid);
      this.__enhanceCompanionMeta(sroot);
      this.__renderMeshTimeSettingsCard(sroot, grid);
    } else {
      // Remove a stale injected card left behind by an older wrapper render.
      sroot.querySelector("#hive-mesh-time-settings-card")?.remove();
    }

    // These cards remain wrapper-specific.
    this.__renderRxLogCard(sroot, grid);
    this.__renderObservabilityCard(sroot, grid);
    this.__renderSettingsConsoleCard(sroot, grid);
    this.__renderWifiPortalCard(sroot, grid);

    const wifiEntry = this.__entryId() || null;
    if (
      this.__wifiPortalLoadedEntry !== wifiEntry &&
      !this.__wifiPortalLoading
    ) {
      void this.__loadWifiPortalInfo();
    }

    this.__settingsObserver?.takeRecords();
    this.__settingsObserver?.observe(sroot, { childList: true, subtree: true });
  }


  __renderMeshTimeSettingsCard(sroot, grid) {
    let card = sroot.querySelector("#hive-mesh-time-settings-card");
    if (!card) {
      card = document.createElement("section");
      card.id = "hive-mesh-time-settings-card";
      card.className = "device-section";
      grid.appendChild(card);
    }

    card.replaceChildren();

    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = "RTC & Atualização da configuração";
    card.appendChild(title);

    const description = document.createElement("div");
    description.className = "hive-settings-note";
    description.style.marginTop = "0";
    description.textContent =
      "O relógio continua a usar APP/GPS como fontes principais. Opcionalmente, o HiveFW pode usar como fonte secundária os adverts assinados pelo Timekeeper da rede portuguesa, validados pela public key 01B2F5DA…1734D462.";
    card.appendChild(description);

    const status = this.__repeaterStatus;
    if (!status && this.__repeaterLoading) {
      const loading = document.createElement("div");
      loading.className = "hive-settings-note";
      loading.textContent = "A consultar a configuração diretamente no rádio…";
      card.appendChild(loading);
      return;
    }

    if (status?.mesh_time_sync_supported) {
      const controls = document.createElement("div");
      controls.className = "hive-settings-controls";
      controls.style.marginTop = "12px";

      const meshTime = this.__settingsSelect(
        "Sincronização RTC via Mesh",
        [["1", "Ativada"], ["0", "Desativada"]],
        this.__repeaterEdit.mesh_time_sync ? "1" : "0"
      );
      meshTime.select.addEventListener("change", () => {
        this.__repeaterEdit.mesh_time_sync =
          meshTime.select.value === "1";
      });
      controls.appendChild(meshTime.field);
      card.appendChild(controls);
    } else {
      const unsupported = document.createElement("div");
      unsupported.className = "hive-settings-note";
      unsupported.textContent =
        "O firmware atualmente ligado ainda não expõe a opção de sincronização RTC via Mesh.";
      card.appendChild(unsupported);
    }

    const actions = document.createElement("div");
    actions.className = "actions-row";
    actions.style.marginTop = "12px";

    if (status?.mesh_time_sync_supported) {
      const save = document.createElement("button");
      save.className = "action-btn";
      save.disabled = this.__repeaterLoading;
      save.textContent = "Guardar sincronização";
      save.addEventListener("click", () => {
        void this.__saveRepeaterSettings(
          { mesh_time_sync: !!this.__repeaterEdit.mesh_time_sync },
          this.__repeaterEdit.mesh_time_sync
            ? "Sincronização RTC via Mesh ativada."
            : "Sincronização RTC via Mesh desativada."
        );
      });
      actions.appendChild(save);
    }

    const refresh = document.createElement("button");
    refresh.className = "action-btn";
    refresh.disabled = this.__repeaterLoading;
    refresh.textContent =
      this.__repeaterLoading
        ? "A reler configuração…"
        : "↻ Reler configuração do rádio";
    refresh.addEventListener("click", () => {
      void this.__refreshRepeaterConfig();
    });
    actions.appendChild(refresh);
    card.appendChild(actions);

    const note = document.createElement("div");
    note.className = "hive-settings-note";
    note.textContent =
      "A releitura força novo APPSTART, Device Info, Custom Vars, configuração RF/retransmissão e estado de acesso remoto. Não gera tráfego LoRa.";
    card.appendChild(note);
  }


  __renderSettingsConsoleCard(sroot, grid) {
    let card = sroot.querySelector("#hive-console-settings-card");
    if (!card) {
      card = document.createElement("section");
      card.id = "hive-console-settings-card";
      card.className = "device-section";
      card.dataset.hiveNativeHost = "console";

      const title = document.createElement("div");
      title.className = "card-title";
      title.textContent = "Consola";

      const description = document.createElement("div");
      description.style.cssText =
        "font-size:12px;line-height:1.45;color:var(--secondary-text-color);margin-bottom:14px;";
      description.textContent =
        "Executa comandos diretamente no rádio ligado ao Home Assistant. Os comandos locais não geram tráfego LoRa, exceto quando o próprio comando envia dados para a mesh.";

      const host = document.createElement("div");
      host.className = "hive-console-settings-host";
      card.append(title, description, host);
      grid.appendChild(card);
    }

    card.style.gridColumn = "";
    const host = card.querySelector(".hive-console-settings-host");
    if (!host) return;

    if (!sroot.querySelector("#hive-console-settings-style")) {
      const style = document.createElement("style");
      style.id = "hive-console-settings-style";
      style.textContent = `
        #hive-console-settings-card { min-width:0; }
        .hive-console-settings-host { min-width:0; }
        .hivefw-console-page.hivefw-console-embedded {
          width:100%;
          height:auto;
          min-height:0;
          overflow:visible;
          box-sizing:border-box;
          padding:0;
          color:var(--primary-text-color);
          background:transparent;
        }
        .hivefw-console-embedded .hivefw-console-wrap {
          width:100%;
          margin:0;
        }
        .hivefw-console-embedded .hivefw-console-layout {
          display:grid;
          grid-template-columns:minmax(0,1fr);
          gap:14px;
          align-items:start;
        }
        .hivefw-console-embedded .hivefw-console-column {
          min-width:0;
          display:flex;
          flex-direction:column;
          gap:14px;
        }
        .hivefw-console-embedded .hivefw-console-card {
          min-width:0;
          max-width:100%;
          overflow:hidden;
          box-sizing:border-box;
          border:1px solid var(--divider-color);
          border-radius:12px;
          background:var(--secondary-background-color,var(--card-background-color));
          padding:14px;
        }
        .hivefw-console-section-title {
          font-size:13px;
          font-weight:650;
          color:var(--primary-text-color);
          margin-bottom:10px;
        }
        .hivefw-console-embedded .hivefw-console-toolbar,
        .hivefw-console-embedded .hivefw-console-input-row {
          display:flex;
          align-items:center;
          gap:8px;
          flex-wrap:wrap;
        }
        .hivefw-console-embedded .hivefw-console-output {
          min-height:320px;
          max-height:58vh;
          overflow:auto;
          border-radius:10px;
          background:#101418;
          color:#d9e2e8;
          padding:14px;
          font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono",monospace;
          font-size:12px;
          line-height:1.55;
        }
        .hivefw-console-embedded .hivefw-console-entry {
          padding:9px 0;
          border-bottom:1px solid rgba(255,255,255,.08);
        }
        .hivefw-console-embedded .hivefw-console-entry:last-child { border-bottom:none; }
        .hivefw-console-embedded .hivefw-console-command { color:#7dd3fc; white-space:pre-wrap; }
        .hivefw-console-embedded .hivefw-console-response { color:#e5e7eb; white-space:pre-wrap; margin-top:4px; }
        .hivefw-console-embedded .hivefw-console-entry.error .hivefw-console-response { color:#fca5a5; }
        .hivefw-console-embedded .hivefw-console-time { color:#7b8794; margin-right:7px; }
        .hivefw-console-embedded .hivefw-console-input {
          flex:1 1 320px;
          width:100%;
          max-width:100%;
          min-width:0;
          box-sizing:border-box;
          border:1px solid var(--divider-color);
          border-radius:9px;
          padding:10px 11px;
          background:var(--card-background-color);
          color:var(--primary-text-color);
          font:13px ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;
          outline:none;
        }
        .hivefw-console-embedded .hivefw-console-input:focus { border-color:var(--primary-color); }
        .hivefw-console-embedded .hivefw-console-hint {
          color:var(--secondary-text-color);
          font-size:11px;
          line-height:1.45;
          margin-top:8px;
        }
        .hivefw-console-embedded .hivefw-console-error {
          color:var(--error-color,#db4437);
          font-size:12px;
          margin-top:8px;
        }
        .hivefw-console-embedded .hivefw-console-empty {
          color:#7b8794;
          padding:28px 8px;
          text-align:center;
        }
        .hivefw-console-action {
          min-height:36px;
          border:1px solid var(--divider-color);
          border-radius:8px;
          padding:7px 12px;
          background:var(--card-background-color);
          color:var(--primary-text-color);
          font:inherit;
          font-size:12px;
          font-weight:600;
          cursor:pointer;
        }
        .hivefw-console-action.primary {
          border-color:var(--primary-color);
          background:var(--primary-color);
          color:#fff;
        }
        .hivefw-console-action.danger {
          border-color:var(--error-color,#db4437);
          color:var(--error-color,#db4437);
          background:transparent;
        }
        .hivefw-console-action:disabled {
          opacity:.45;
          cursor:default;
        }
        @media(max-width:870px) {
          .hivefw-console-embedded .hivefw-console-layout {
            grid-template-columns:minmax(0,1fr);
          }
          .hivefw-console-embedded .hivefw-console-input {
            flex-basis:100%;
          }
        }
      `;
      sroot.appendChild(style);
    }

    this.__consoleOverlay = host;
    this.__renderConsole(host, true);
  }

  async __loadWifiPortalInfo() {
    if (!this.hass || this.__wifiPortalLoading) return;
    this.__wifiPortalLoading = true;
    const entryId = this.__entryId() || null;

    try {
      const msg = { type: "hivefw_integration/get_firmware_ota_status" };
      if (entryId) msg.entry_id = entryId;
      const status = await this.hass.callWS(msg);
      this.__wifiPortalHost = String(status?.host || "").trim();
      this.__wifiPortalSupported = !!status?.supported;
      this.__wifiPortalLoadedEntry = entryId;
    } catch (error) {
      console.debug("HiveFW Wi-Fi portal info unavailable:", error);
      this.__wifiPortalHost = "";
      this.__wifiPortalSupported = false;
      this.__wifiPortalLoadedEntry = entryId;
    } finally {
      this.__wifiPortalLoading = false;
      if (this._activeTab === "settings") this.__enhanceSettingsPage();
    }
  }

  __renderWifiPortalCard(sroot, grid) {
    let card = sroot.querySelector("#hive-wifi-portal-card");

    // The portal exists only on the supported Heltec V3 TCP/Wi-Fi target.
    if (
      this.__wifiPortalLoadedEntry !== null &&
      this.__wifiPortalSupported === false
    ) {
      card?.remove();
      return;
    }

    if (!card) {
      card = document.createElement("div");
      card.id = "hive-wifi-portal-card";
      card.className = "device-section";
      grid.appendChild(card);
    }

    const host = String(this.__wifiPortalHost || "").trim();
    const sig = JSON.stringify([
      host,
      this.__wifiPortalSupported,
      this.__wifiPortalLoading,
      this.__wifiPortalLoadedEntry,
    ]);
    if (card.dataset.hiveRenderSig === sig) return;
    card.dataset.hiveRenderSig = sig;
    card.replaceChildren();

    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = "Wi-Fi do Companion";
    card.appendChild(title);

    const desc = document.createElement("div");
    desc.className = "hive-settings-note";
    desc.textContent =
      "No Heltec V3, o SSID e a password ficam guardados na NVS. Para mudar de router ou de rede Wi-Fi, abre a página /wifi do próprio rádio. A alteração só é gravada quando confirmas no portal.";
    card.appendChild(desc);

    const setup = document.createElement("div");
    setup.className = "hive-settings-note";
    setup.innerHTML =
      "<strong>Primeira instalação:</strong> se o V3 ainda não tiver Wi-Fi configurado, liga-te à rede temporária com o nome do dispositivo e abre <strong>http://192.168.4.1/wifi</strong>. Login: <strong>hivefw / hivefw</strong>.";
    card.appendChild(setup);

    if (this.__wifiPortalLoading && !host) {
      const loading = document.createElement("div");
      loading.className = "hive-settings-note";
      loading.textContent = "A obter o endereço atual do Companion…";
      card.appendChild(loading);
      return;
    }

    if (!host) {
      const note = document.createElement("div");
      note.className = "hive-settings-note";
      note.textContent =
        "Quando o V3 estiver ligado por TCP/Wi-Fi, o endereço atual do portal aparece aqui.";
      card.appendChild(note);
      return;
    }

    const url = "http://" + host + "/wifi";

    const meta = document.createElement("div");
    meta.className = "hive-settings-note";
    meta.style.marginTop = "12px";
    const strong = document.createElement("strong");
    strong.textContent = "Portal atual: ";
    const code = document.createElement("code");
    code.textContent = url;
    code.style.userSelect = "all";
    meta.append(strong, code);
    card.appendChild(meta);

    const actions = document.createElement("div");
    actions.className = "actions-row";
    actions.style.marginTop = "12px";

    const open = document.createElement("button");
    open.className = "action-btn";
    open.textContent = "Abrir configuração Wi-Fi";
    open.addEventListener("click", () => {
      window.open(url, "_blank", "noopener,noreferrer");
    });

    const copy = document.createElement("button");
    copy.className = "action-btn";
    copy.textContent = "Copiar endereço";
    copy.addEventListener("click", async () => {
      const result = await this.__copyManualOtaText(url, code);
      copy.textContent = result === "copied" ? "Copiado" : "Selecionado";
      window.setTimeout(() => {
        if (copy.isConnected) copy.textContent = "Copiar endereço";
      }, 1400);
    });

    actions.append(open, copy);
    card.appendChild(actions);

    const warning = document.createElement("div");
    warning.className = "hive-settings-note";
    warning.textContent =
      "Depois de mudares de rede o V3 reinicia e pode receber outro IP do router. Nesse caso, reconfigura o endereço TCP da integração para o novo IP.";
    card.appendChild(warning);
  }

  async __loadObservabilitySettings() {
    if(!this.hass||this.__observabilityLoading)return;
    this.__observabilityLoading=true;
    const entryId=this.__entryId()||null;
    try{
      const msg={type:"hivefw_integration/get_observability_settings"};
      if(entryId)msg.entry_id=entryId;
      const result=await this.hass.callWS(msg);
      this.__observabilitySettings={...(result?.settings||{})};
      this.__observabilityState=result?.health_state||{};
      this.__observabilityLoadedEntry=entryId;
    }catch(error){
      console.warn("HiveFW observability settings load failed",error);
      this.__observabilityLoadedEntry=entryId;
    }finally{
      this.__observabilityLoading=false;
      if(this._activeTab==="settings")this.__enhanceSettingsPage();
    }
  }

  async __saveObservabilitySettings(settings,button) {
    if(!this.hass)return;
    const original=button?.textContent||"Guardar thresholds";
    if(button){button.disabled=true;button.textContent="A guardar…";}
    try{
      const msg={type:"hivefw_integration/set_observability_settings",settings};
      const entryId=this.__entryId();
      if(entryId)msg.entry_id=entryId;
      const result=await this.hass.callWS(msg);
      this.__observabilitySettings={...(result?.settings||settings)};
      if(button){
        button.textContent="Guardado";
        window.setTimeout(()=>{if(button.isConnected)button.textContent=original;},1200);
      }
    }catch(error){
      console.error("HiveFW observability settings save failed",error);
      if(button)button.textContent="Erro";
    }finally{
      if(button)button.disabled=false;
    }
  }

  __renderObservabilityCard(sroot,grid) {
    let card=sroot.querySelector("#hive-observability-settings-card");
    if(!card){
      card=document.createElement("div");
      card.id="hive-observability-settings-card";
      card.className="device-section";
      grid.appendChild(card);
    }
    const renderSig=JSON.stringify([
      this.__entryId()||null,
      !!this.__observabilityLoading,
      this.__observabilityLoadedEntry,
      this.__observabilitySettings||null,
      this.__observabilityState||null,
    ]);
    if(card.dataset.hiveRenderSig===renderSig)return;
    card.dataset.hiveRenderSig=renderSig;
    card.replaceChildren();

    const title=document.createElement("div");
    title.className="card-title";
    title.textContent="Alertas & automações";
    card.appendChild(title);

    const note=document.createElement("div");
    note.className="hive-settings-note";
    note.textContent="Avaliação local a cada minuto, sem RF adicional. Cada mudança de estado dispara o evento HA hivefw_health_transition; notificações persistentes são opcionais.";
    card.appendChild(note);

    if(this.__observabilityLoading&&!this.__observabilitySettings){
      card.append("A carregar thresholds…");
      return;
    }
    const settings=this.__observabilitySettings||{
      noise_floor_warn:-105,
      tx_queue_warn:5,
      recv_errors_rate_warn:0.5,
      reliability_warn:70,
      reliability_min_requests:20,
      persistent_notifications:false,
    };

    const controls=document.createElement("div");
    controls.className="hive-settings-controls";
    const field=(label,value,step="1")=>{
      const wrap=document.createElement("div");wrap.className="hive-settings-field";
      const l=document.createElement("label");l.textContent=label;
      const input=document.createElement("input");input.type="number";input.step=step;input.value=String(value);
      wrap.append(l,input);controls.appendChild(wrap);return input;
    };
    const noise=field("Noise floor alerta (dBm)",settings.noise_floor_warn,"1");
    const queue=field("TX queue alerta",settings.tx_queue_warn,"1");
    const rxErrors=field("RX errors alerta (/min)",settings.recv_errors_rate_warn,"0.1");
    const reliability=field("Fiabilidade mínima (%)",settings.reliability_warn,"1");
    const minRequests=field("Amostra mínima de requests",settings.reliability_min_requests,"1");
    card.appendChild(controls);

    const notify=document.createElement("label");
    notify.style.cssText="display:flex;align-items:center;gap:7px;margin:10px 0;font-size:12px;";
    const notifyCheck=document.createElement("input");notifyCheck.type="checkbox";notifyCheck.checked=!!settings.persistent_notifications;
    notify.append(notifyCheck,document.createTextNode("Criar notificação persistente quando entra um novo alerta"));
    card.appendChild(notify);

    const active=this.__observabilityState?.active||{};
    const state=document.createElement("div");
    state.className="hive-settings-note";
    const activeValues=Object.values(active);
    state.textContent=activeValues.length
      ?"Ativos: "+activeValues.join(" · ")
      :"Estado atual: sem alertas ativos";
    card.appendChild(state);

    const save=document.createElement("button");
    save.className="action-btn";
    save.style.width="100%";
    save.textContent="Guardar thresholds";
    save.addEventListener("click",()=>void this.__saveObservabilitySettings({
      noise_floor_warn:Number(noise.value),
      tx_queue_warn:Number(queue.value),
      recv_errors_rate_warn:Number(rxErrors.value),
      reliability_warn:Number(reliability.value),
      reliability_min_requests:Number(minRequests.value),
      persistent_notifications:notifyCheck.checked,
    },save));
    card.appendChild(save);
  }

  __renderSettingsRepeaterCard(sroot, grid) {
    let card = sroot.querySelector("#hive-repeater-settings-card");
    if (!card) {
      card = document.createElement("div");
      card.id = "hive-repeater-settings-card";
      card.className = "device-section";
      grid.appendChild(card);
    }
    const renderSig=JSON.stringify([
      this.__entryId()||null,
      !!this.__repeaterLoading,
      this.__repeaterError||"",
      this.__repeaterStatus?.supported??null,
      this.__repeaterStatus?.repeat??null,
    ]);
    if(card.dataset.hiveRenderSig===renderSig)return;
    card.dataset.hiveRenderSig=renderSig;
    card.replaceChildren();

    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = "Repeater";
    card.appendChild(title);

    if (this.__repeaterLoading && !this.__repeaterStatus) {
      card.append("A consultar o rádio…");
      return;
    }
    if (this.__repeaterError) {
      const error = document.createElement("div");
      error.style.color = "var(--error-color)";
      error.style.fontSize = "12px";
      error.textContent = this.__repeaterError;
      card.appendChild(error);
      return;
    }

    const status = this.__repeaterStatus;
    if (!status?.supported) {
      const note = document.createElement("div");
      note.className = "hive-settings-note";
      note.textContent = "Esta versão do Companion não anuncia suporte ao modo Repeater integrado.";
      card.appendChild(note);
      return;
    }

    const pill = document.createElement("div");
    pill.className = `hive-settings-pill ${status.repeat ? "on" : ""}`;
    pill.textContent = status.repeat ? "● Repeater ativo" : "● Repeater desligado";
    card.appendChild(pill);

    const controls = document.createElement("div");
    controls.className = "hive-settings-controls";
    controls.style.marginTop = "12px";

    const repeat = this.__settingsSelect(
      "Modo Repeater",
      [["1", "Ativo"], ["0", "Desligado"]],
      this.__repeaterEdit.repeat ? "1" : "0"
    );
    repeat.select.addEventListener("change", () => {
      this.__repeaterEdit.repeat = repeat.select.value === "1";
    });

    const multi = this.__settingsSelect(
      "Multi ACKs",
      [["1", "Ligado"], ["0", "Desligado"]],
      String(Number(this.__repeaterEdit.multi_acks ?? 0))
    );
    multi.select.addEventListener("change", () => {
      this.__repeaterEdit.multi_acks = Number(multi.select.value);
    });

    const rx = this.__settingsNumber("RX Delay", this.__repeaterEdit.rx_delay ?? 0, "0.001");
    rx.input.addEventListener("input", () => {
      this.__repeaterEdit.rx_delay = Number(rx.input.value);
    });

    const af = this.__settingsNumber("Airtime Factor", this.__repeaterEdit.airtime_factor ?? 0, "0.001");
    af.input.addEventListener("input", () => {
      this.__repeaterEdit.airtime_factor = Number(af.input.value);
    });

    controls.append(repeat.field, multi.field, rx.field, af.field);
    card.appendChild(controls);

    const actions = document.createElement("div");
    actions.className = "actions-row";
    actions.style.marginTop = "12px";
    const save = document.createElement("button");
    save.className = "action-btn";
    save.textContent = this.__repeaterLoading ? "Applying…" : "Apply Repeater Settings";
    save.disabled = this.__repeaterLoading;
    save.addEventListener("click", () => {
      void this.__saveRepeaterSettings({
        repeat: !!this.__repeaterEdit.repeat,
        multi_acks: Number(this.__repeaterEdit.multi_acks ?? 0),
        rx_delay: Number(this.__repeaterEdit.rx_delay ?? 0),
        airtime_factor: Number(this.__repeaterEdit.airtime_factor ?? 0),
      }, "Repeater settings applied.");
    });
    actions.appendChild(save);
    card.appendChild(actions);

    const note = document.createElement("div");
    note.className = "hive-settings-note";
    note.textContent =
      "RF, TX Power e Path Hash permanecem no cartão Radio; adverts, sync e reboot permanecem no cartão do Companion.";
    card.appendChild(note);
  }

  __findDeviceMetricEntity(summary, needle) {
    const wanted=String(needle||"").toLowerCase();
    const entities=Array.isArray(summary?.entities)?summary.entities:[];
    const direct=entities.find((entity)=>
      String(entity?.entity_id||"").toLowerCase().includes(wanted) ||
      String(entity?.label||"").toLowerCase().includes(wanted)
    );
    if(direct?.entity_id && this.hass?.states?.[direct.entity_id])return direct.entity_id;

    const prefix=String(this._selectedDevice?.pubkey_prefix||this._selectedDevice?.pubkey||"")
      .slice(0,6).toLowerCase();
    const name=String(this._selectedDevice?.name||"").toLowerCase()
      .replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"");
    const ids=Object.keys(this.hass?.states||{});
    return ids.find((id)=>{
      const lower=id.toLowerCase();
      if(!lower.includes(wanted))return false;
      if(prefix && lower.includes(prefix))return true;
      return !!name && lower.includes(name);
    })||null;
  }

  __readMetricState(summary, needle) {
    const entityId=this.__findDeviceMetricEntity(summary,needle);
    if(!entityId)return {entityId:null,value:NaN,state:null};
    const state=this.hass?.states?.[entityId]||null;
    const value=Number.parseFloat(state?.state);
    return {entityId,value:Number.isFinite(value)?value:NaN,state};
  }

  async __loadDiagnosticHistory(summary) {
    if(!this.hass||!summary)return;
    const entry=String(this.__entryId()||"default");
    const wanted=[
      ["Noise floor","noise_floor","dBm"],
      ["RSSI","last_rssi","dBm"],
      ["SNR","last_snr","dB"],
      ["RX rate","nb_recv_rate","msg/min"],
      ["TX rate","nb_sent_rate","msg/min"],
      ["RX errors","recv_errors_rate","msg/min"],
      ["TX queue","tx_queue_len",""],
      ["TX airtime","airtime_utilization","%"],
      ["RX airtime","rx_airtime_utilization","%"],
    ];
    const metrics=wanted.map(([label,key,unit])=>{
      const entityId=this.__findDeviceMetricEntity(summary,key);
      return entityId?{label,key,unit,entityId}:null;
    }).filter(Boolean);
    const key=entry+"|7d|"+metrics.map((metric)=>metric.entityId).join("|");
    const fresh=this.__diagHistoryKey===key && Date.now()-this.__diagHistoryAt<5*60*1000;
    if(fresh||this.__diagHistoryLoading)return;
    if(!metrics.length){
      this.__diagHistory={metrics:[],series:{}};
      this.__diagHistoryKey=key;
      this.__diagHistoryAt=Date.now();
      return;
    }

    this.__diagHistoryLoading=true;
    try{
      const end=new Date();
      const start=new Date(end.getTime()-7*24*60*60*1000);
      const statistics=await this.hass.callWS({
        type:"recorder/statistics_during_period",
        start_time:start.toISOString(),
        end_time:end.toISOString(),
        statistic_ids:metrics.map((metric)=>metric.entityId),
        period:"hour",
      });
      const series={};
      for(const metric of metrics){
        const rows=Array.isArray(statistics?.[metric.entityId])?statistics[metric.entityId]:[];
        const values=rows.map((row)=>({
          t:new Date(row?.start??row?.start_time??0).getTime(),
          v:Number(row?.mean??row?.state??row?.sum),
        })).filter((point)=>Number.isFinite(point.t)&&Number.isFinite(point.v));
        series[metric.entityId]=values;
      }
      this.__diagHistory={metrics,series,windowHours:7*24};
      this.__diagHistoryKey=key;
      this.__diagHistoryAt=Date.now();
    }catch(error){
      console.debug("HiveFW diagnostics history unavailable:",error);
      this.__diagHistory={metrics:[],series:{}};
      this.__diagHistoryKey=key;
      this.__diagHistoryAt=Date.now();
    }finally{
      this.__diagHistoryLoading=false;
      if(this._activeTab==="settings")queueMicrotask(()=>this.__enhanceSettingsPage());
    }
  }

  __sparklineSvg(values) {
    const NS="http://www.w3.org/2000/svg";
    const svg=document.createElementNS(NS,"svg");
    svg.setAttribute("viewBox","0 0 220 54");
    svg.setAttribute("preserveAspectRatio","none");
    svg.style.cssText="display:block;width:100%;height:54px;overflow:visible;";
    if(!Array.isArray(values)||values.length<2)return svg;
    const nums=values.map((point)=>Number(point.v)).filter(Number.isFinite);
    if(nums.length<2)return svg;
    let min=Math.min(...nums),max=Math.max(...nums);
    if(min===max){min-=1;max+=1;}
    const points=values.map((point,index)=>{
      const x=(index/(values.length-1))*218+1;
      const y=52-((Number(point.v)-min)/(max-min))*48;
      return x.toFixed(2)+","+y.toFixed(2);
    }).join(" ");
    const grid=document.createElementNS(NS,"line");
    grid.setAttribute("x1","0");grid.setAttribute("x2","220");
    grid.setAttribute("y1","52");grid.setAttribute("y2","52");
    grid.setAttribute("stroke","var(--divider-color,#ddd)");
    grid.setAttribute("stroke-width","1");
    const line=document.createElementNS(NS,"polyline");
    line.setAttribute("points",points);
    line.setAttribute("fill","none");
    line.setAttribute("stroke","var(--primary-color,#03a9f4)");
    line.setAttribute("stroke-width","2");
    line.setAttribute("vector-effect","non-scaling-stroke");
    svg.append(grid,line);
    return svg;
  }

  __renderDiagnosticHistory(summary,nroot,hero) {
    let panel=nroot.querySelector(".hive-diagnostics-history");
    if(!panel){
      panel=document.createElement("section");
      panel.className="hive-diagnostics-history";
      panel.style.cssText="margin:4px 0 14px;padding:11px 12px;border:1px solid var(--divider-color,#ddd);border-radius:10px;background:var(--card-background-color,#fff);";
      hero.insertAdjacentElement("afterend",panel);
    }
    panel.replaceChildren();
    const title=document.createElement("div");
    title.style.cssText="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:9px;";
    const heading=document.createElement("strong");
    heading.textContent="Histórico RF / tráfego · 7 dias";
    heading.style.cssText="font-size:11px;text-transform:uppercase;letter-spacing:.45px;";
    const source=document.createElement("span");
    source.textContent="Recorder do Home Assistant";
    source.style.cssText="font-size:9px;color:var(--secondary-text-color,#777);";
    title.append(heading,source);
    panel.appendChild(title);

    const history=this.__diagHistory;
    if(this.__diagHistoryLoading && !history){
      const loading=document.createElement("div");
      loading.textContent="A carregar histórico…";
      loading.style.cssText="padding:8px 0;font-size:11px;color:var(--secondary-text-color,#777);";
      panel.appendChild(loading);
      return;
    }
    const metrics=(history?.metrics||[]).filter((metric)=>
      Array.isArray(history?.series?.[metric.entityId]) && history.series[metric.entityId].length>1
    );
    if(!metrics.length){panel.style.display="none";return;}
    panel.style.display="block";
    const grid=document.createElement("div");
    grid.style.cssText="display:grid;grid-template-columns:repeat(auto-fit,minmax(155px,1fr));gap:8px;";
    for(const metric of metrics){
      const values=history.series[metric.entityId];
      const nums=values.map((point)=>Number(point.v)).filter(Number.isFinite);
      const last=nums[nums.length-1];
      const min=Math.min(...nums),max=Math.max(...nums);
      const now=Date.now();
      const recent24=values
        .filter((point)=>Number(point.t)>=now-24*60*60*1000)
        .map((point)=>Number(point.v)).filter(Number.isFinite);
      const previous24=values
        .filter((point)=>Number(point.t)>=now-48*60*60*1000 && Number(point.t)<now-24*60*60*1000)
        .map((point)=>Number(point.v)).filter(Number.isFinite);
      const average=(items)=>items.length?items.reduce((sum,value)=>sum+value,0)/items.length:NaN;
      const avg24=average(recent24);
      const prev24=average(previous24);
      const delta24=Number.isFinite(avg24)&&Number.isFinite(prev24)?avg24-prev24:NaN;
      const card=document.createElement("div");
      card.style.cssText="min-width:0;padding:8px;border:1px solid transparent;border-radius:8px;background:var(--secondary-background-color,#f5f5f5);cursor:pointer;";
      card.title="Abrir entidade "+metric.entityId;
      card.addEventListener("click",()=>summary?._fireMoreInfo?.(metric.entityId));
      const top=document.createElement("div");
      top.style.cssText="display:flex;justify-content:space-between;gap:6px;font-size:10px;";
      const label=document.createElement("span");label.textContent=metric.label;label.style.fontWeight="650";
      const value=document.createElement("span");
      const precision=metric.unit==="dBm"||metric.unit===""?0:1;
      value.textContent=Number(last).toFixed(precision)+(metric.unit?" "+metric.unit:"");
      value.style.fontVariantNumeric="tabular-nums";
      top.append(label,value);
      card.append(top,this.__sparklineSvg(values));
      const range=document.createElement("div");
      const parts=[];
      if(Number.isFinite(avg24))parts.push("média 24h "+avg24.toFixed(1));
      if(Number.isFinite(delta24))parts.push("Δ24h "+(delta24>=0?"+":"")+delta24.toFixed(1));
      parts.push("mín "+min.toFixed(1));
      parts.push("máx "+max.toFixed(1));
      range.textContent=parts.join(" · ");
      range.style.cssText="font-size:9px;color:var(--secondary-text-color,#777);text-align:right;";
      card.appendChild(range);grid.appendChild(card);
    }
    panel.appendChild(grid);
  }

  __enhanceCompanionHero(sroot) {
    const summary = sroot.querySelector("meshcore-node-summary");
    const nroot = summary?.shadowRoot;
    const hero = nroot?.querySelector(".hero-row");
    const status = this.__repeaterStatus;
    if (!hero || !status?.supported) return;

    let style = nroot.querySelector("#hivefw-cockpit-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "hivefw-cockpit-style";
      style.textContent = `
        .hero-row{
          grid-template-columns:repeat(6,minmax(0,1fr))!important;
          grid-auto-flow:dense;
          gap:7px!important;
          align-items:stretch;
        }
        .hero-row > .hero-tile,
        .hero-row > .hero-tile.hive-metric-compact{
          grid-column:span 1;
          min-width:0;
        }
        .hero-row > .hero-tile[data-repeater-extra="repeat-frequencies"]{
          grid-column:span 1;
        }
        .hero-tile{
          min-height:70px!important;
          height:100%;
          box-sizing:border-box;
          padding:8px 9px!important;
          gap:4px!important;
          border-radius:10px!important;
        }
        .hero-tile-head{
          font-size:10px!important;
          letter-spacing:.035em!important;
          line-height:1.12!important;
          white-space:normal!important;
        }
        .hero-tile-value{
          gap:3px!important;
          min-width:0;
        }
        .hero-tile-value .primary{
          font-size:15px!important;
          line-height:1.05!important;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }
        .hero-tile-value .secondary{
          font-size:10px!important;
          line-height:1.2!important;
          opacity:.8;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }
        .hero-tile.hive-metric-compact{
          padding:8px 9px!important;
        }
        .hero-tile.hive-metric-compact .hero-tile-head{
          font-size:10px!important;
        }
        .hero-tile.hive-metric-compact .hero-tile-value .primary{
          font-size:15px!important;
        }
        .hero-tile meshcore-stat-bar{
          margin-top:auto!important;
        }
        @container(max-width:1050px){
          .hero-row{grid-template-columns:repeat(4,minmax(0,1fr))!important}
        }
        @container(max-width:650px){
          .hero-row{grid-template-columns:repeat(2,minmax(0,1fr))!important}
          .hero-row > .hero-tile[data-repeater-extra="repeat-frequencies"]{grid-column:span 1}
        }
        @container(max-width:390px){
          .hero-row{grid-template-columns:1fr!important}
          .hero-row > .hero-tile,
          .hero-row > .hero-tile.hive-metric-compact,
          .hero-row > .hero-tile[data-repeater-extra="repeat-frequencies"]{grid-column:1!important}
        }
      `;
      nroot.appendChild(style);
    }

    const entityStateSig=(Array.isArray(summary.entities)?summary.entities:[]).map((entity)=>{
      const entityId=entity?.entity_id||"";
      const state=entityId?this.hass?.states?.[entityId]:null;
      return [entityId,state?.state??null,state?.last_updated??null];
    });
    const heroSig=JSON.stringify([
      this.__entryId()||null,
      status,
      entityStateSig,
    ]);
    if(hero.dataset.hiveRenderSig===heroSig)return;
    hero.dataset.hiveRenderSig=heroSig;

    nroot.querySelectorAll(".hive-repeater-extra").forEach((el) => el.remove());

    const entities = Array.isArray(summary.entities) ? summary.entities : [];
    const findEntity = (needle) => entities.find((e) =>
      String(e.entity_id || "").includes(needle) ||
      String(e.label || "").toLowerCase().includes(needle.toLowerCase())
    );
    const entityFor = (...needles) => {
      for (const needle of needles) {
        const info=findEntity(needle);
        if(info?.entity_id && this.hass?.states?.[info.entity_id])return info;
      }
      return null;
    };
    const clickEntityId = (entityId) => entityId && this.hass?.states?.[entityId]
      ? ()=>summary._fireMoreInfo?.(entityId)
      : null;
    const clickEntity = (...needles) => {
      const info=entityFor(...needles);
      return info?clickEntityId(info.entity_id):null;
    };
    const stateFor = (info) => info ? this.hass?.states?.[info.entity_id] : null;
    const num = (info) => {
      const raw = stateFor(info)?.state;
      const v = Number.parseFloat(raw);
      return Number.isFinite(v) ? v : NaN;
    };
    const bandForTemp = (c) => c >= 0 && c <= 50 ? "good" : c > -10 && c <= 60 ? "warn" : "bad";
    const makeTile = (title, primary, secondary, value, min, max, band, marker, click, size="normal") => {
      if(marker && hero.querySelector(`:scope > .hero-tile[data-repeater-extra="${CSS.escape(String(marker))}"]`)){
        return document.createComment(`native metric: ${marker}`);
      }
      const tile = document.createElement("div");
      tile.className = `hero-tile hive-repeater-extra${size==="compact"?" hive-metric-compact":""}`;
      tile.dataset.repeaterExtra = marker;
      if (click) { tile.style.cursor = "pointer"; tile.addEventListener("click", click); }
      const head = document.createElement("div");
      head.className = "hero-tile-head";
      const label = document.createElement("span"); label.textContent = title;
      const dot = document.createElement("span"); dot.className = `status-dot ${band}`;
      head.append(label,dot);
      const vr = document.createElement("div"); vr.className = "hero-tile-value";
      const main = document.createElement("span"); main.className = "primary"; main.textContent = primary; vr.appendChild(main);
      if (secondary) { const sub=document.createElement("span"); sub.className="secondary"; sub.textContent=secondary; vr.appendChild(sub); }
      const bar=document.createElement("meshcore-stat-bar"); bar.value=value; bar.min=min; bar.max=max; bar.band=band;
      tile.append(head,vr,bar); return tile;
    };

    const active=!!status.repeat;
    hero.appendChild(makeTile("Modo Repeater",active?"Active":"Off","· Companion always on",active?100:0,0,100,active?"good":"info","state",clickEntity("repeater_mode")));

    const uptimeSecs=Number(status.stats?.core?.uptime_secs);
    if(Number.isFinite(uptimeSecs)){
      const h=Math.max(0,uptimeSecs/3600);
      const d=h>=48?`${Math.floor(h/24)}d ${Math.floor(h%24)}h`:h>=1?`${Math.floor(h)}h ${Math.floor((h%1)*60)}m`:`${Math.floor(h*60)}m`;
      hero.appendChild(makeTile("Tempo ligado",d,"",Math.min(h,168),0,168,h<1?"bad":h<24?"warn":"good","uptime",clickEntity("uptime"),"compact"));
    }

    const clock=Number(status.clock?.timestamp);
    if(Number.isFinite(clock)&&clock>0){
      const drift=Number(status.clock?.drift_seconds||0), abs=Math.abs(drift);
      const t=new Date(clock*1000).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",second:"2-digit"});
      hero.appendChild(makeTile("Relógio do dispositivo",t,abs<=2?"· synchronized":`· drift ${drift>0?"+":""}${drift}s`,Math.min(abs,120),0,120,abs<=2?"good":abs<=30?"warn":"bad","clock",clickEntity("device_clock","clock")));
    }

    const smartAdvert=status.smart_advert||{};
    if(smartAdvert.supported){
      const remaining=this.__smartAdvertRemainingSeconds();
      const sent=Number(smartAdvert.tx_this_boot);
      const secondary=smartAdvert.enabled
        ? "· "+(Number.isFinite(sent)?Math.max(0,Math.round(sent)):0)+" enviados neste boot"
        : "· Auto Advert desativado";
      hero.appendChild(makeTile(
        "Smart Advert",
        smartAdvert.enabled?this.__formatSmartAdvertCountdown(remaining):"Off",
        secondary,
        Number.isFinite(remaining)?Math.min(48,remaining/3600):0,
        0,48,
        "info",
        "smart-advert",
        null,
        "compact"
      ));
    }

    const queue=Number(status.stats?.core?.queue_len);
    if(Number.isFinite(queue)) hero.appendChild(makeTile("Fila TX",String(Math.round(queue)),"queued",Math.min(Math.max(queue,0),30),0,30,queue>10?"bad":queue>5?"warn":"good","queue",clickEntity("tx_queue_len"),"compact"));

    const tempInfo=findEntity("temperature");
    const temp=num(tempInfo);
    if(Number.isFinite(temp)){
      const unit=stateFor(tempInfo)?.attributes?.unit_of_measurement||"°C";
      const c=String(unit).includes("F")?(temp-32)*5/9:temp;
      hero.appendChild(makeTile("Temperatura",`${c.toFixed(1)} °C`,"",c,-20,60,bandForTemp(c),"temperature",()=>summary._fireMoreInfo?.(tempInfo.entity_id),"compact"));
    }

    let tokensInfo=findEntity("request_rate_limiter");
    if(!tokensInfo){
      const key=Object.keys(this.hass?.states||{}).find((id)=>id.includes("request_rate_limiter"));
      if(key) tokensInfo={entity_id:key,label:"Request Tokens"};
    }
    const tokens=num(tokensInfo);
    if(Number.isFinite(tokens)) hero.appendChild(makeTile("Tokens de pedidos",tokens.toFixed(1),"available",tokens,0,20,tokens<5?"bad":tokens<10?"warn":"good","request-tokens",()=>summary._fireMoreInfo?.(tokensInfo.entity_id),"compact"));

    const dcInfo=findEntity("discovered_contacts");
    const discovered=num(dcInfo);
    if(Number.isFinite(discovered)) hero.appendChild(makeTile("Contactos descobertos",String(Math.round(discovered)),"seen",Math.min(discovered,1000),0,1000,"info","contacts",()=>summary._fireMoreInfo?.(dcInfo.entity_id),"compact"));

    const used=Number(status.battery?.used_kb), total=Number(status.battery?.total_kb);
    if(Number.isFinite(used)&&Number.isFinite(total)&&total>0){
      const pct=Math.max(0,Math.min(100,used/total*100));
      hero.appendChild(makeTile("Armazenamento",`${pct.toFixed(0)}%`,`· ${used} / ${total} KB`,pct,0,100,pct>=90?"bad":pct>=70?"warn":"good","storage",clickEntity("storage")));
    }

    const info=status.device_info||{};
    const model=info.model||status.model;
    if(model){
      hero.appendChild(makeTile("Equipamento",String(model),info.firmware_build?`· ${info.firmware_build}`:"",100,0,100,"info","hardware",clickEntity("firmware","model")));
    }

    if(info.protocol_version!=null || info.path_hash_mode!=null){
      const pathLabels=["1 byte","2 bytes","3 bytes"];
      const protocol=info.protocol_version!=null?`v${info.protocol_version}`:"—";
      const path=info.path_hash_mode==null?"—":(pathLabels[Number(info.path_hash_mode)]||String(info.path_hash_mode));
      hero.appendChild(makeTile("Protocolo / Caminho",protocol,`· ${path}`,100,0,100,"info","protocol",clickEntity("path_hash_mode","protocol_version"),"compact"));
    }

    if(info.max_contacts!=null || info.max_channels!=null){
      hero.appendChild(makeTile(
        "Capacidade",
        `${info.max_contacts??"—"} / ${info.max_channels??"—"}`,
        "contacts / channels",
        100,0,100,"info","capacity",clickEntity("max_contacts","max_channels"),"compact"
      ));
    }

    const repeatRanges=Array.isArray(status.allowed_repeat_frequencies)?status.allowed_repeat_frequencies:[];
    if(repeatRanges.length){
      const values=repeatRanges.map((r)=>{
        const lo=Number(r.min)/1000, hi=Number(r.max)/1000;
        return lo===hi?lo.toFixed(3):`${lo.toFixed(3)}–${hi.toFixed(3)}`;
      });
      hero.appendChild(makeTile(
        "Frequências Repeater",
        `${values[0]} MHz`,
        values.length>1?`· ${values.slice(1).join(" · ")} MHz`:"",
        100,0,100,"info","repeat-frequencies",clickEntity("frequency"),"compact"
      ));
    }

    // Aggregated operational diagnostics. All inputs are already local in
    // Home Assistant / Companion status; rendering these cards adds no RF.
    const metric=(key)=>this.__readMetricState(summary,key);
    const finite=(...values)=>values.find((value)=>Number.isFinite(value));

    const noiseMetric=metric("noise_floor");
    const rssiMetric=metric("last_rssi");
    const snrMetric=metric("last_snr");
    const noiseValue=finite(Number(status.stats?.radio?.noise_floor),noiseMetric.value);
    const rssiValue=finite(Number(status.stats?.radio?.last_rssi),rssiMetric.value);
    const snrValue=finite(Number(status.stats?.radio?.last_snr),snrMetric.value);
    if(Number.isFinite(noiseValue)||Number.isFinite(rssiValue)||Number.isFinite(snrValue)){
      const rfBand=Number.isFinite(noiseValue)
        ? (noiseValue>-105?"bad":noiseValue>-115?"warn":"good")
        : (Number.isFinite(snrValue)&&snrValue<-10?"warn":"good");
      const primary=Number.isFinite(noiseValue)
        ? Math.round(noiseValue)+" dBm"
        : Number.isFinite(rssiValue)
          ? Math.round(rssiValue)+" dBm"
          : snrValue.toFixed(1)+" dB";
      const details=[
        Number.isFinite(rssiValue)?"RSSI "+Math.round(rssiValue):null,
        Number.isFinite(snrValue)?"SNR "+snrValue.toFixed(1):null,
      ].filter(Boolean).join(" · ");
      const rfEntityId=noiseMetric.entityId||rssiMetric.entityId||snrMetric.entityId;
      hero.appendChild(makeTile(
        "Ruído de fundo",primary,details?"· "+details:"",100,0,100,rfBand,"rf-health",
        clickEntityId(rfEntityId)
      ));
    }

    const airtimeUtil=metric("airtime_utilization");
    const rxAirtimeUtil=metric("rx_airtime_utilization");
    const txAirtime=metric("tx_airtime");
    const rxAirtime=metric("rx_airtime");
    if(
      Number.isFinite(airtimeUtil.value)||Number.isFinite(rxAirtimeUtil.value)||
      Number.isFinite(txAirtime.value)||Number.isFinite(rxAirtime.value)
    ){
      const utilParts=[
        Number.isFinite(airtimeUtil.value)?"TX "+airtimeUtil.value.toFixed(1)+"%":null,
        Number.isFinite(rxAirtimeUtil.value)?"RX "+rxAirtimeUtil.value.toFixed(1)+"%":null,
      ].filter(Boolean);
      const timeParts=[
        Number.isFinite(txAirtime.value)?"TX "+txAirtime.value.toFixed(1)+" min":null,
        Number.isFinite(rxAirtime.value)?"RX "+rxAirtime.value.toFixed(1)+" min":null,
      ].filter(Boolean);
      const primary=utilParts.length?utilParts.join(" · "):(timeParts[0]||"—");
      const secondary=timeParts.length?"· "+timeParts.join(" · "):"";
      const maxUtil=Math.max(
        Number.isFinite(airtimeUtil.value)?airtimeUtil.value:0,
        Number.isFinite(rxAirtimeUtil.value)?rxAirtimeUtil.value:0
      );
      const airtimeEntityId=airtimeUtil.entityId||rxAirtimeUtil.entityId||txAirtime.entityId||rxAirtime.entityId;
      hero.appendChild(makeTile(
        "Tempo de rádio",primary,secondary,Math.min(maxUtil,100),0,100,
        maxUtil>=50?"warn":"info","airtime-health",clickEntityId(airtimeEntityId)
      ));
    }

    const successMetric=metric("request_successes");
    const failMetric=metric("request_failures");
    if(Number.isFinite(successMetric.value)||Number.isFinite(failMetric.value)){
      const successes=Number.isFinite(successMetric.value)?successMetric.value:0;
      const failures=Number.isFinite(failMetric.value)?failMetric.value:0;
      const attempts=successes+failures;
      const pct=attempts>0?successes/attempts*100:NaN;
      const band=attempts<20?"info":pct>=90?"good":pct>=70?"warn":"bad";
      hero.appendChild(makeTile(
        "Fiabilidade",
        Number.isFinite(pct)?pct.toFixed(0)+"%":"—",
        "· "+Math.round(successes)+" OK / "+Math.round(failures)+" falhas",
        Number.isFinite(pct)?pct:0,0,100,band,"reliability",
        clickEntityId(successMetric.entityId||failMetric.entityId)
      ));
    }

    const packetStats=status.stats?.packets||{};
    const errorsMetric=metric("recv_errors");
    const directDupsMetric=metric("direct_dups");
    const floodDupsMetric=metric("flood_dups");
    const fullMetric=metric("full_evts");
    const errors=finite(Number(packetStats.recv_errors),errorsMetric.value);
    const directDups=finite(Number(packetStats.direct_dups),directDupsMetric.value);
    const floodDups=finite(Number(packetStats.flood_dups),floodDupsMetric.value);
    const fullEvents=finite(Number(packetStats.full_evts),fullMetric.value);
    if([errors,directDups,floodDups,fullEvents].some(Number.isFinite)){
      const e=Number.isFinite(errors)?errors:0;
      const d=(Number.isFinite(directDups)?directDups:0)+(Number.isFinite(floodDups)?floodDups:0);
      const f=Number.isFinite(fullEvents)?fullEvents:0;
      const integrityEntityId=errorsMetric.entityId||directDupsMetric.entityId||floodDupsMetric.entityId||fullMetric.entityId;
      hero.appendChild(makeTile(
        "Integridade",
        Math.round(e)+" erros",
        "· "+Math.round(d)+" dup · "+Math.round(f)+" full",
        Math.min(e+f,100),0,100,e>0||f>0?"warn":"info","integrity",
        clickEntityId(integrityEntityId)
      ));
    }

    const rxRate=metric("nb_recv_rate");
    const txRate=metric("nb_sent_rate");
    const recvErrorRate=metric("recv_errors_rate");
    const rxDirectRate=metric("recv_direct_rate");
    const rxFloodRate=metric("recv_flood_rate");
    const txDirectRate=metric("sent_direct_rate");
    const txFloodRate=metric("sent_flood_rate");
    if(Number.isFinite(rxRate.value)||Number.isFinite(txRate.value)){
      const rx=Number.isFinite(rxRate.value)?rxRate.value:0;
      const tx=Number.isFinite(txRate.value)?txRate.value:0;
      const detailParts=[
        Number.isFinite(rxDirectRate.value)?"RD "+rxDirectRate.value.toFixed(1):null,
        Number.isFinite(rxFloodRate.value)?"RF "+rxFloodRate.value.toFixed(1):null,
        Number.isFinite(txDirectRate.value)?"TD "+txDirectRate.value.toFixed(1):null,
        Number.isFinite(txFloodRate.value)?"TF "+txFloodRate.value.toFixed(1):null,
      ].filter(Boolean);
      const secondary="· RX "+rx.toFixed(1)+" · TX "+tx.toFixed(1)+(detailParts.length?" · "+detailParts.join(" · "):"");
      hero.appendChild(makeTile(
        "Tráfego atual",(rx+tx).toFixed(1)+" msg/min",secondary,
        Math.min(rx+tx,50),0,50,"info","traffic-now",
        clickEntityId(rxRate.entityId||txRate.entityId)
      ));
    }

    const contacts=Array.isArray(this._contacts)?this._contacts:[];
    const nowSec=Date.now()/1000;
    const activeAt=(contact)=>Math.max(Number(contact?.lastmod||0),Number(contact?.last_advert||0));
    const active24=contacts.filter((contact)=>activeAt(contact)>0&&nowSec-activeAt(contact)<=86400).length;
    const active7d=contacts.filter((contact)=>activeAt(contact)>0&&nowSec-activeAt(contact)<=7*86400).length;
    const gps=contacts.filter((contact)=>this.__nodeCoords(contact)).length;
    const favorites=contacts.filter((contact)=>this.__nodeMeta(contact).favorite).length;
    const firstSeen=this.__touchFirstSeen(contacts);
    if(contacts.length){
      hero.appendChild(makeTile(
        "Atividade da rede",active24+" / "+contacts.length,
        "· 24h · "+active7d+" em 7d · +"+firstSeen.new24+" novos 24h · +"+firstSeen.new7d+" em 7d · "+gps+" GPS · "+favorites+" ★",
        Math.min(100,contacts.length?active24/contacts.length*100:0),0,100,"info","network-activity",
        clickEntity("discovered_contacts","node_count")
      ));
    }

    const alerts=[];
    let healthEntityId=null;
    if(Number.isFinite(noiseValue)&&noiseValue>-105){
      alerts.push("noise floor alto");
      healthEntityId=noiseMetric.entityId||healthEntityId;
    }

    // meshcore-ha exposes STATS_CORE radio faults as latching problem
    // binary sensors when Self Diagnostics is enabled. "on" means the
    // fault has occurred at least once since the radio last booted.
    for(const [key,label] of [
      ["err_pool_full","packet pool esgotado"],
      ["err_cad_timeout","CAD timeout"],
      ["err_rx_timeout","RX timeout"],
    ]){
      const entityId=this.__findDeviceMetricEntity(summary,key);
      const state=entityId?this.hass?.states?.[entityId]:null;
      if(state?.state==="on"){alerts.push(label);healthEntityId=healthEntityId||entityId;}
    }
    const queueValue=Number(status.stats?.core?.queue_len);
    if(Number.isFinite(queueValue)&&queueValue>5){
      alerts.push("TX queue "+Math.round(queueValue));
      healthEntityId=healthEntityId||metric("tx_queue_len").entityId;
    }
    const driftAbs=Math.abs(Number(status.clock?.drift_seconds||0));
    if(Number.isFinite(driftAbs)&&driftAbs>30)alerts.push("clock drift "+Math.round(driftAbs)+"s");
    if(Number.isFinite(recvErrorRate.value)&&recvErrorRate.value>0.5){
      alerts.push("RX errors "+recvErrorRate.value.toFixed(1)+"/min");
      healthEntityId=healthEntityId||recvErrorRate.entityId;
    }
    if(Number.isFinite(successMetric.value)&&Number.isFinite(failMetric.value)){
      const totalRequests=successMetric.value+failMetric.value;
      const reliability=totalRequests>0?successMetric.value/totalRequests*100:100;
      if(totalRequests>=20&&reliability<70){
        alerts.push("fiabilidade "+reliability.toFixed(0)+"%");
        healthEntityId=healthEntityId||successMetric.entityId||failMetric.entityId;
      }
    }
    if(!healthEntityId)healthEntityId=noiseMetric.entityId||recvErrorRate.entityId||successMetric.entityId||null;
    hero.appendChild(makeTile(
      "Saúde",
      alerts.length?alerts.length+" alerta"+(alerts.length===1?"":"s"):"OK",
      alerts.length?"· "+alerts.slice(0,2).join(" · "):"· sem alertas locais",
      alerts.length?Math.min(alerts.length,5):0,0,5,alerts.length?"warn":"good","health-alerts",
      clickEntityId(healthEntityId)
    ));

        for(const row of nroot.querySelectorAll(".sensor-item")){
      const label=(row.querySelector(".si-label")?.textContent||"").trim().toLowerCase();
      row.style.display = label.includes("temperature") ? "none" : "";
    }
    for(const label of nroot.querySelectorAll(".subsection-label")){
      if((label.textContent||"").trim().toLowerCase().startsWith("sensors")){
        label.style.display="none";
      }
    }
    for(const group of nroot.querySelectorAll(".group-label")){
      const name=(group.textContent||"").trim();
      if(name==="Radio · live"||name==="Radio · configuration"||name==="Identity"){
        group.style.display="none";
        let next=group.nextElementSibling;
        while(next && !next.classList.contains("group-label")){
          next.style.display="none";
          next=next.nextElementSibling;
        }
      }
    }

    void this.__loadDiagnosticHistory(summary);
    this.__renderDiagnosticHistory(summary,nroot,hero);
    this.__ensureMetricEditor(summary,nroot,hero);
  }

  async __loadManagedDevices() {
    if (!this.hass || this.__managedDevicesLoading) return;
    this.__managedDevicesLoading = true;
    try {
      const msg = { type: "hivefw_integration/get_managed_devices" };
      const entryId = this.__entryId();
      if (entryId) msg.entry_id = entryId;
      const result = await this.hass.callWS(msg);
      this.__managedDevices = {
        repeaters: Array.isArray(result?.repeaters) ? result.repeaters : [],
        clients: Array.isArray(result?.clients) ? result.clients : [],
      };
      this.__managedDevicesLoadedEntry = entryId || null;
    } catch {
      this.__managedDevices = { repeaters: [], clients: [] };
      this.__managedDevicesLoadedEntry = this.__entryId() || null;
    } finally {
      this.__managedDevicesLoading = false;
      if (this._activeTab === "settings") this.__enhanceSettingsPage();
    }
  }

  __enhanceCompanionMeta(sroot) {
    const meta = sroot.querySelector(".device-meta");
    if (!meta) return;

    const ensureMeta=(key,text,prepend=false)=>{
      let node=meta.querySelector(`[data-hive-meta="${key}"]`);
      if(!node){
        node=document.createElement("span");
        node.dataset.hiveMeta=key;
        if(prepend)meta.prepend(node);
        else meta.appendChild(node);
      }
      if(node.textContent!==text)node.textContent=text;
      return node;
    };

    ensureMeta("role","HiveFW Companion-Repeater",true);
    ensureMeta("nodes",`Nós conhecidos: ${Array.isArray(this._contacts)?this._contacts.length:0}`);
    ensureMeta("channels",`Canais: ${Array.isArray(this._channels)?this._channels.length:0}`);

    const existingCompanion=[...meta.querySelectorAll("span")]
      .find((span)=>!span.dataset.hiveMeta&&span.textContent?.trim()==="Companion");
    existingCompanion?.remove();
  }

  __ensureRebootAction(sroot) {
    const deviceSection = sroot.querySelector(".device-section");
    if (!deviceSection) return;

    const actionRows = [...deviceSection.querySelectorAll(".actions-row")];
    const row = actionRows.find((el) =>
      [...el.querySelectorAll("button")].some((b) => b.textContent?.trim() === "Trace")
    );
    if (!row) return;
    if ([...row.querySelectorAll("button")].some((b) => b.textContent?.trim() === "Reboot")) return;

    const reboot = document.createElement("button");
    reboot.className = "action-btn danger";
    reboot.textContent = "Reboot";
    reboot.addEventListener("click", async () => {
      if (!window.confirm("Reiniciar agora o HiveFW?")) return;
      try {
        const msg = { type: "hivefw_integration/execute_local", command: "reboot" };
        const entryId = this.__entryId();
        if (entryId) msg.entry_id = entryId;
        await this.hass.callWS(msg);
      } catch (error) {
        const page = sroot.host;
        page?._showStatusMessage?.(`HiveFW: Reboot failed — ${String(error)}`, "error");
      }
    });
    row.appendChild(reboot);
  }

  __renderManagedDevicesCard(sroot, grid) {
    let card = sroot.querySelector("#hive-managed-devices-card");
    if (!card) {
      card = document.createElement("div");
      card.id = "hive-managed-devices-card";
      card.className = "device-section";
      card.style.gridColumn = "1 / -1";
      grid.appendChild(card);
    }
    const renderSig=JSON.stringify([
      this.__entryId()||null,
      !!this.__managedDevicesLoading,
      this.__managedDevicesLoadedEntry,
      this.__managedDevices||null,
    ]);
    if(card.dataset.hiveRenderSig===renderSig)return;
    card.dataset.hiveRenderSig=renderSig;
    card.replaceChildren();

    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = "Equipamentos HiveFW geridos";
    card.appendChild(title);

    if (this.__managedDevicesLoading) {
      const loading = document.createElement("div");
      loading.className = "hive-settings-note";
      loading.textContent = "A carregar equipamentos remotos…";
      card.appendChild(loading);
      return;
    }

    const repeaters = this.__managedDevices.repeaters || [];
    const clients = this.__managedDevices.clients || [];
    const devices = [...repeaters, ...clients];

    if (!devices.length) {
      const empty = document.createElement("div");
      empty.className = "hive-settings-note";
      empty.textContent =
        "Nenhum equipamento remoto está configurado. O HiveFW local acima é o equipamento principal desta integração.";
      card.appendChild(empty);
      return;
    }

    const summary = document.createElement("div");
    summary.style.cssText = "display:flex;flex-wrap:wrap;gap:7px;margin-bottom:11px;";
    const online = devices.filter((d) => d.status === "online").length;
    for (const text of [
      `${devices.length} equipamentos`,
      `${repeaters.length} repeaters`,
      `${clients.length} clients`,
      `${online} online`,
    ]) {
      const chip = document.createElement("span");
      chip.className = "hive-settings-pill";
      chip.textContent = text;
      summary.appendChild(chip);
    }
    card.appendChild(summary);

    const list = document.createElement("div");
    list.style.cssText =
      "display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:9px;";

    for (const device of devices) {
      const isOnline = device.status === "online";
      const row = document.createElement("div");
      row.style.cssText =
        "display:grid;grid-template-columns:34px minmax(0,1fr) auto;align-items:center;gap:10px;padding:11px 12px;border:1px solid var(--divider-color);border-radius:10px;background:var(--primary-background-color);";

      const icon = document.createElement("div");
      icon.style.cssText =
        "width:34px;height:34px;display:grid;place-items:center;border-radius:9px;background:var(--secondary-background-color);color:var(--primary-color);font-weight:700;";
      icon.textContent = device.type === "repeater" ? "R" : "C";

      const info = document.createElement("div");
      const name = document.createElement("div");
      name.style.cssText =
        "overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;font-weight:600;";
      name.textContent = device.name || "HiveFW";
      const meta = document.createElement("div");
      meta.style.cssText =
        "margin-top:3px;color:var(--secondary-text-color);font-size:10px;";
      meta.textContent =
        `${device.type === "repeater" ? "Repeater" : "Client"} · ${String(device.pubkey_prefix || "").toUpperCase()}${device.firmware_version ? ` · FW ${device.firmware_version}` : ""}`;
      info.append(name, meta);

      const state = document.createElement("div");
      state.style.cssText =
        `font-size:10px;font-weight:650;white-space:nowrap;color:${isOnline ? "#2e7d32" : "var(--secondary-text-color)"};`;
      state.textContent = isOnline ? "● Online" : "● Offline";

      if(device.type==="repeater"){
        const admin=document.createElement("button");
        admin.type="button";
        admin.className="action-btn";
        admin.textContent="Admin";
        admin.title="Administração remota on-demand";
        admin.addEventListener("click",()=>this.__openRemoteAdmin(device));
        const actions=document.createElement("div");
        actions.style.cssText="display:flex;align-items:center;gap:7px;";
        actions.append(state,admin);
        row.append(icon,info,actions);
      }else{
        row.append(icon,info,state);
      }
      list.appendChild(row);
    }

    card.appendChild(list);
  }

  __closeRemoteAdmin() {
    if(this.__remoteAdminOverlay?.isConnected)this.__remoteAdminOverlay.remove();
    this.__remoteAdminOverlay=null;
    this.__remoteAdminDevice=null;
  }

  async __remoteAdminCommand(command,output) {
    const device=this.__remoteAdminDevice;
    if(!device||!this.hass||!command?.trim())return null;
    const row={timestamp:new Date().toISOString(),command:command.trim(),response:"A executar…",pending:true};
    this.__remoteAdminHistory.push(row);
    const render=()=> {
      if(!output?.isConnected)return;
      output.replaceChildren();
      for(const item of this.__remoteAdminHistory.slice(-30)){
        const line=document.createElement("div");
        line.style.cssText="padding:5px 0;border-top:1px solid color-mix(in srgb,var(--divider-color,#ddd) 65%,transparent);";
        const cmd=document.createElement("div");
        cmd.textContent="> "+item.command;
        cmd.style.cssText="font-weight:650;color:var(--primary-color,#03a9f4);";
        const resp=document.createElement("div");
        resp.textContent=String(item.response||"");
        resp.style.cssText="margin-top:2px;white-space:pre-wrap;overflow-wrap:anywhere;";
        line.append(cmd,resp);
        output.appendChild(line);
      }
      output.scrollTop=output.scrollHeight;
    };
    render();
    try{
      const msg={
        type:"hivefw_integration/execute_remote",
        target_prefix:String(device.pubkey_prefix||""),
        command:command.trim(),
      };
      const entryId=this.__entryId();
      if(entryId)msg.entry_id=entryId;
      const result=await this.hass.callWS(msg);
      row.response=result?.response||"OK";
      row.pending=false;
      row.success=result?.success!==false;
      render();
      return result;
    }catch(error){
      row.response="Erro: "+String(error);
      row.pending=false;
      row.success=false;
      render();
      return null;
    }
  }

  async __remoteAdminTrace(device,resultBox) {
    if(!this.hass||!device?.pubkey_prefix)return;
    resultBox.textContent="A descobrir path / executar trace…";
    try{
      const msg={
        type:"hivefw_integration/trace",
        pubkey_prefix:String(device.pubkey_prefix),
        source:"remote-admin",
      };
      const entryId=this.__entryId();
      if(entryId)msg.entry_id=entryId;
      const result=await this.hass.callWS(msg);
      const parts=[
        (result?.round_trip_ms!=null?result.round_trip_ms+" ms":null),
        (result?.hops!=null?result.hops+" hops":null),
        (Number.isFinite(Number(result?.final_snr))?"SNR "+Number(result.final_snr).toFixed(1)+" dB":null),
      ].filter(Boolean);
      resultBox.textContent=parts.length?parts.join(" · "):JSON.stringify(result);
      const source=Array.isArray(this.__nodesMapContacts)?this.__nodesMapContacts:(Array.isArray(this._contacts)?this._contacts:[]);
      const matches=source.filter((contact)=>{
        const prefix=String(contact?.pubkey_prefix||String(contact?.public_key||"").slice(0,12));
        return prefix===String(device.pubkey_prefix);
      });
      if(matches.length===1)this.__recordTraceResult(result,matches[0],"remote-admin");
    }catch(error){
      resultBox.textContent="Trace falhou: "+String(error);
    }
  }

  async __remoteAdminLoadNeighbors(device,box) {
    if(!this.hass||!device?.pubkey_prefix)return;
    box.textContent="A carregar vizinhos cacheados…";
    try{
      const msg={
        type:"hivefw_integration/get_neighbors",
        target_prefix:String(device.pubkey_prefix),
      };
      const entryId=this.__entryId();
      if(entryId)msg.entry_id=entryId;
      const result=await this.hass.callWS(msg);
      const neighbors=Array.isArray(result?.neighbors)?result.neighbors:[];
      box.replaceChildren();
      if(!neighbors.length){
        box.textContent="Sem vizinhos remotos guardados. Ativa a recolha de vizinhos para este Repeater para preencher esta área.";
        return;
      }
      for(const neighbor of neighbors.slice(0,30)){
        const line=document.createElement("div");
        const snr=Number(neighbor?.snr);
        line.textContent=
          String(neighbor?.name||neighbor?.pubkey||neighbor?.public_key||"Nó")+
          (Number.isFinite(snr)?" · SNR "+snr.toFixed(1)+" dB":"")+
          (neighbor?.secs_ago!=null?" · "+Math.round(Number(neighbor.secs_ago))+"s":"");
        line.style.cssText="padding:5px 0;border-top:1px solid var(--divider-color,#ddd);font-size:11px;";
        box.appendChild(line);
      }
    }catch(error){
      box.textContent="Erro ao carregar vizinhos: "+String(error);
    }
  }

  __openRemoteAdmin(device) {
    if(!device||!this.hass)return;
    this.__closeRemoteAdmin();
    this.__remoteAdminDevice=device;
    this.__remoteAdminHistory=[];

    const overlay=document.createElement("div");
    overlay.style.cssText="position:fixed;inset:0;z-index:10030;display:grid;place-items:center;padding:16px;background:rgba(0,0,0,.52);";
    overlay.addEventListener("click",(event)=>{if(event.target===overlay)this.__closeRemoteAdmin();});

    const dialog=document.createElement("div");
    dialog.style.cssText="width:min(900px,100%);max-height:min(90vh,850px);overflow:auto;padding:16px;box-sizing:border-box;border-radius:14px;background:var(--card-background-color,#fff);color:var(--primary-text-color,#222);box-shadow:0 14px 40px rgba(0,0,0,.38);";

    const header=document.createElement("div");
    header.style.cssText="display:flex;align-items:center;gap:10px;margin-bottom:12px;";
    const title=document.createElement("strong");
    title.style.cssText="flex:1;font-size:17px;";
    title.textContent="Admin remoto · "+String(device.name||device.pubkey_prefix||"Repeater");
    const close=document.createElement("button");
    close.type="button";close.textContent="✕";
    close.style.cssText="border:0;background:transparent;color:var(--secondary-text-color,#666);font-size:18px;cursor:pointer;";
    close.addEventListener("click",()=>this.__closeRemoteAdmin());
    header.append(title,close);
    dialog.appendChild(header);

    const note=document.createElement("div");
    note.style.cssText="margin-bottom:10px;padding:8px 10px;border-radius:8px;background:var(--secondary-background-color,#f3f3f3);color:var(--secondary-text-color,#666);font-size:10px;";
    note.textContent="A password administrativa permanece no ConfigEntry do Home Assistant e nunca é enviada para o frontend. Os comandos abaixo geram tráfego RF apenas quando os executas.";
    dialog.appendChild(note);

    const grid=document.createElement("div");
    grid.style.cssText="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;";
    const card=(name)=>{
      const el=document.createElement("section");
      el.style.cssText="padding:11px;border:1px solid var(--divider-color,#ddd);border-radius:10px;min-width:0;";
      const h=document.createElement("strong");h.textContent=name;h.style.cssText="display:block;margin-bottom:7px;font-size:12px;";
      el.appendChild(h);grid.appendChild(el);return el;
    };

    const status=card("Estado / firmware");
    const stats=device.stats||{};
    const statusLines=[
      ["Estado",device.status|| (device.connected?"online":"offline")],
      ["Prefix",device.pubkey_prefix||"—"],
      ["Firmware",device.firmware_version||stats.firmware_version||"—"],
      ["Telemetria",device.telemetry_enabled?"ativa":"inativa"],
      ["Vizinhos",device.neighbors_enabled?"ativos":"inativos"],
      ["Update",device.update_interval?device.update_interval+" s":"—"],
    ];
    for(const [label,value] of statusLines){
      const line=document.createElement("div");
      line.textContent=label+": "+String(value);
      line.style.cssText="font-size:11px;margin:3px 0;";
      status.appendChild(line);
    }
    if(Object.keys(stats).length){
      const pre=document.createElement("pre");
      pre.textContent=JSON.stringify(stats,null,2);
      pre.style.cssText="max-height:170px;overflow:auto;margin:7px 0 0;padding:7px;background:var(--primary-background-color,#fafafa);font-size:9px;border-radius:6px;";
      status.appendChild(pre);
    }

    const access=card("Acesso / Route Health");
    const accessResult=document.createElement("div");
    accessResult.style.cssText="margin-top:7px;font-size:11px;color:var(--secondary-text-color,#666);min-height:18px;";
    const makeButton=(label)=>{
      const button=document.createElement("button");
      button.type="button";button.textContent=label;button.className="action-btn";button.style.margin="3px";
      return button;
    };
    const login=makeButton("Testar acesso");
    login.addEventListener("click",async()=>{
      accessResult.textContent="A testar auto-login…";
      const result=await this.__remoteAdminCommand("get name",consoleOut);
      accessResult.textContent=result?.success===false?"Acesso recusado":"Comando autenticado concluído; consulta a Consola.";
    });
    const trace=makeButton("Path + Trace");
    trace.addEventListener("click",()=>void this.__remoteAdminTrace(device,accessResult));
    const monitor=makeButton("Route Health");
    monitor.addEventListener("click",async()=>{
      if(!Array.isArray(this.__nodesMapContacts))await this.__loadNodesMapContacts();
      const source=(Array.isArray(this.__nodesMapContacts)&&this.__nodesMapContacts.length)
      ? this.__nodesMapContacts
      : (Array.isArray(this._contacts)?this._contacts:[]);
      const matches=source.filter((contact)=>String(contact?.pubkey_prefix||"")===String(device.pubkey_prefix||""));
      if(matches.length===1){
        this.__closeRemoteAdmin();
        this._activeTab="nodes";
        this.requestUpdate();
        window.setTimeout(()=>this.__openTraceMonitor(matches[0]),180);
      }else{
        accessResult.textContent="Não foi possível resolver este Repeater de forma única nos contactos.";
      }
    });
    access.append(login,trace,monitor,accessResult);

    const neighbors=card("Vizinhos remotos");
    const neighborsBody=document.createElement("div");
    neighborsBody.style.cssText="max-height:190px;overflow:auto;color:var(--secondary-text-color,#666);";
    const refreshNeighbors=makeButton("Atualizar lista");
    refreshNeighbors.addEventListener("click",()=>void this.__remoteAdminLoadNeighbors(device,neighborsBody));
    neighbors.append(refreshNeighbors,neighborsBody);
    void this.__remoteAdminLoadNeighbors(device,neighborsBody);

    const quick=card("Consultas on-demand");
    for(const command of ["get role","get radio","get tx","get repeat","get path.hash.mode"]){
      const button=makeButton(command);
      button.addEventListener("click",()=>void this.__remoteAdminCommand(command,consoleOut));
      quick.appendChild(button);
    }

    dialog.appendChild(grid);

    const consoleCard=document.createElement("section");
    consoleCard.style.cssText="margin-top:10px;padding:11px;border:1px solid var(--divider-color,#ddd);border-radius:10px;";
    const consoleTitle=document.createElement("strong");consoleTitle.textContent="Consola administrativa remota";consoleTitle.style.cssText="display:block;margin-bottom:7px;font-size:12px;";
    const form=document.createElement("div");form.style.cssText="display:flex;gap:7px;";
    const input=document.createElement("input");
    input.type="text";input.placeholder="Comando CLI remoto…";
    input.style.cssText="flex:1;min-width:0;padding:8px;border:1px solid var(--divider-color,#bbb);border-radius:7px;background:var(--primary-background-color,#fff);color:var(--primary-text-color,#222);font:12px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;";
    const send=makeButton("Executar");
    const consoleOut=document.createElement("div");
    consoleOut.style.cssText="margin-top:9px;max-height:220px;overflow:auto;font:10px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;";
    const run=()=>{
      const command=input.value.trim();
      if(!command)return;
      input.value="";
      void this.__remoteAdminCommand(command,consoleOut);
    };
    send.addEventListener("click",run);
    input.addEventListener("keydown",(event)=>{if(event.key==="Enter"){event.preventDefault();run();}});
    form.append(input,send);
    consoleCard.append(consoleTitle,form,consoleOut);
    dialog.appendChild(consoleCard);

    const responsive=document.createElement("style");
    responsive.textContent="@media(max-width:760px){.hivefw-remote-admin-grid{grid-template-columns:1fr!important;}}";
    grid.className="hivefw-remote-admin-grid";
    dialog.appendChild(responsive);

    overlay.appendChild(dialog);
    this.shadowRoot?.appendChild(overlay);
    this.__remoteAdminOverlay=overlay;
  }

  async __loadScopes() {
    try {
      const msg = { type: "hivefw_integration/get_flood_scopes" };
      const entryId = this.__entryId();
      if (entryId) msg.entry_id = entryId;
      const result = await this.hass.callWS(msg);
      this.__scopeState = { scopes: result?.scopes || [], global: !!result?.global };
      this.__scopeDraft = this.__scopeState.scopes.join(", ");
      this.__scopeGlobal = this.__scopeState.global;
      this.__scopesLoadedEntry = entryId || null;
      if (!this.__regionTarget && this.__managedDevices.repeaters?.length) {
        this.__regionTarget = this.__managedDevices.repeaters[0].pubkey_prefix;
      }
      if (this._activeTab === "settings") this.__enhanceSettingsPage();
    } catch {
      this.__scopesLoadedEntry = this.__entryId() || null;
    }
  }

  __renderRxLogCard(sroot, grid) {
    let card=sroot.querySelector("#hive-rxlog-card");
    if(!card){
      card=document.createElement("div");
      card.id="hive-rxlog-card";
      card.className="device-section";
      grid.appendChild(card);
    }
    const entryId=this.__entryId()||null;
    const rows=this.__rxLogRows||[];
    const firstRow=rows[0]||null;
    const lastRow=rows[rows.length-1]||null;
    const renderSig=JSON.stringify([
      entryId,
      !!this.__rxLogLoading,
      this.__rxLogLoadedEntry,
      rows.length,
      firstRow?.id||firstRow?.timestamp||"",
      lastRow?.id||lastRow?.timestamp||"",
    ]);
    if(card.dataset.hiveRenderSig===renderSig)return;
    card.dataset.hiveRenderSig=renderSig;
    card.replaceChildren();
    if(this.__rxLogLoadedEntry!==entryId && !this.__rxLogLoading){
      queueMicrotask(()=>void this.__loadRxLogRows());
    }

    const header=document.createElement("div");
    header.style.cssText="display:flex;align-items:center;gap:8px;flex-wrap:wrap;";
    const title=document.createElement("div");
    title.className="card-title";
    title.textContent="RX Log";
    title.style.marginRight="auto";

    const refresh=document.createElement("button");
    refresh.type="button";
    refresh.className="action-btn";
    refresh.textContent=this.__rxLogLoading?"A carregar…":"Atualizar";
    refresh.disabled=this.__rxLogLoading;
    refresh.addEventListener("click",()=>void this.__loadRxLogRows());

    const exportBtn=document.createElement("button");
    exportBtn.type="button";
    exportBtn.className="action-btn";
    exportBtn.textContent="Exportar JSON";
    exportBtn.disabled=!this.__rxLogRows.length;
    exportBtn.addEventListener("click",()=>{
      const blob=new Blob([JSON.stringify({rx_log:this.__rxLogRows},null,2)],{type:"application/json;charset=utf-8"});
      const url=URL.createObjectURL(blob);
      const link=document.createElement("a");
      link.href=url;
      link.download="hivefw_rx_log.json";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(()=>URL.revokeObjectURL(url),1000);
    });
    header.append(title,refresh,exportBtn);
    card.appendChild(header);

    const note=document.createElement("div");
    note.className="hive-settings-note";
    note.textContent="Observações RX já guardadas no Home Assistant · sem tráfego RF adicional · máximo 150 linhas";
    card.appendChild(note);

    const filter=document.createElement("input");
    filter.type="search";
    filter.placeholder="Filtrar por nó, conversa, path ou texto…";
    filter.value=this.__rxLogFilter||"";
    filter.style.cssText="box-sizing:border-box;width:100%;margin:9px 0;padding:8px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--primary-background-color);color:var(--primary-text-color);font:inherit;font-size:12px;";
    card.appendChild(filter);

    const body=document.createElement("div");
    body.style.cssText="max-height:340px;overflow:auto;border:1px solid var(--divider-color);border-radius:9px;";
    card.appendChild(body);

    const renderRows=()=>{
      body.replaceChildren();
      const q=(this.__rxLogFilter||"").trim().toLowerCase();
      const rows=this.__rxLogRows.filter((row)=>{
        if(!q)return true;
        const hay=[row.sender,row.conversation_name,row.pubkey_prefix,row.text,row.path,Array.isArray(row.path_nodes)?row.path_nodes.join(","):""].join(" ").toLowerCase();
        return hay.includes(q);
      });

      if(this.__rxLogLoading&&!rows.length){
        const msg=document.createElement("div");
        msg.textContent="A carregar…";
        msg.style.cssText="padding:24px;text-align:center;color:var(--secondary-text-color);";
        body.appendChild(msg);
        return;
      }
      if(!rows.length){
        const msg=document.createElement("div");
        msg.textContent="Sem observações RX guardadas para este filtro.";
        msg.style.cssText="padding:24px;text-align:center;color:var(--secondary-text-color);";
        body.appendChild(msg);
        return;
      }

      for(const row of rows){
        const item=document.createElement("div");
        item.style.cssText="display:grid;grid-template-columns:132px minmax(120px,1fr) minmax(170px,1.5fr) auto;gap:8px;align-items:start;padding:8px;border-top:1px solid var(--divider-color);font-size:11px;";
        const time=document.createElement("div");
        time.textContent=this.__rxLogTime(row.timestamp);
        time.style.color="var(--secondary-text-color)";

        const who=document.createElement("div");
        const sender=document.createElement("div");
        sender.textContent=row.sender||row.conversation_name||"—";
        sender.style.fontWeight="650";
        const conv=document.createElement("div");
        conv.textContent=row.conversation_name||"";
        conv.style.cssText="margin-top:2px;font-size:9px;color:var(--secondary-text-color);";
        who.append(sender,conv);

        const route=document.createElement("div");
        const pathNodes=Array.isArray(row.path_nodes)?row.path_nodes.join(" → "):String(row.path||"");
        route.textContent=pathNodes||row.text||"—";
        route.style.cssText="font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;overflow-wrap:anywhere;";

        const radio=document.createElement("div");
        const stats=[];
        if(Number.isFinite(Number(row.rssi)))stats.push("RSSI "+Number(row.rssi).toFixed(0));
        if(Number.isFinite(Number(row.snr)))stats.push("SNR "+Number(row.snr).toFixed(1));
        if(Number.isFinite(Number(row.hop_count)))stats.push(Number(row.hop_count)+" hops");
        radio.textContent=stats.join(" · ")||"—";
        radio.style.whiteSpace="nowrap";

        item.append(time,who,route,radio);
        body.appendChild(item);
      }
    };

    filter.addEventListener("input",()=>{
      this.__rxLogFilter=filter.value;
      renderRows();
    });
    renderRows();
  }

    __renderRegionsScopesCard(sroot, grid) {
    let card = sroot.querySelector("#hive-regions-scopes-card");
    if (!card) {
      card = document.createElement("div");
      card.id = "hive-regions-scopes-card";
      card.className = "device-section";
      grid.appendChild(card);
    }
    const repeatersForSig=(this.__managedDevices.repeaters||[]).map((item)=>[
      item.pubkey_prefix,item.name,item.status
    ]);
    const renderSig=JSON.stringify([
      this.__entryId()||null,
      this.__scopesLoadedEntry,
      this.__scopeState||null,
      repeatersForSig,
      !!this.__regionsBusy,
      this.__regionText||"",
    ]);
    if(card.dataset.hiveRenderSig===renderSig)return;
    card.dataset.hiveRenderSig=renderSig;
    card.replaceChildren();

    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = "Regions & Scopes";
    card.appendChild(title);

    const note = document.createElement("div");
    note.className = "hive-settings-note";
    note.textContent = "Scopes são locais ao HA/Companion. Regions remotas usam RF apenas quando pedires.";
    card.appendChild(note);

    const scopes = this.__settingsNumber("Flood scopes (comma separated)", this.__scopeDraft, "any");
    scopes.input.type = "text";
    scopes.input.value = this.__scopeDraft;
    scopes.input.addEventListener("input", () => { this.__scopeDraft = scopes.input.value; });
    card.appendChild(scopes.field);

    const global = document.createElement("label");
    global.style.cssText = "display:flex;align-items:center;gap:7px;font-size:12px;margin:9px 0;";
    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = this.__scopeGlobal;
    check.addEventListener("change", () => { this.__scopeGlobal = check.checked; });
    global.append(check, document.createTextNode("Permitir scope global (*)"));
    card.appendChild(global);

    const save = document.createElement("button");
    save.className = "action-btn";
    save.style.width = "100%";
    save.textContent = "Guardar Scopes";
    save.addEventListener("click", async () => {
      const msg = {
        type: "hivefw_integration/set_flood_scopes",
        scopes: this.__scopeDraft.split(",").map((s) => s.trim()).filter(Boolean),
        global: this.__scopeGlobal,
      };
      const entryId = this.__entryId(); if (entryId) msg.entry_id = entryId;
      try {
        const result = await this.hass.callWS(msg);
        this.__scopeDraft = (result?.scopes || []).join(", ");
        this.__scopeGlobal = !!result?.global;
        sroot.host?._showStatusMessage?.("Scopes guardados", "success");
      } catch (error) {
        sroot.host?._showStatusMessage?.(`Scopes: ${String(error)}`, "error");
      }
    });
    card.appendChild(save);

    const repeaters = this.__managedDevices.repeaters || [];
    if (!repeaters.length) {
      const local = document.createElement("div");
      local.className = "hive-settings-note";
      local.style.marginTop = "12px";
      local.textContent = "O HiveFW local não expõe edição da árvore de Regions pelo Companion Protocol atual.";
      card.appendChild(local);
      return;
    }

    const hr = document.createElement("div");
    hr.style.cssText = "height:1px;background:var(--divider-color);margin:14px 0;";
    card.appendChild(hr);

    const select = document.createElement("select");
    select.className = "form-select";
    for (const r of repeaters) {
      const o = document.createElement("option");
      o.value = r.pubkey_prefix;
      o.textContent = r.name;
      o.selected = r.pubkey_prefix === this.__regionTarget;
      select.appendChild(o);
    }
    select.addEventListener("change", () => { this.__regionTarget = select.value; this.__regionText = ""; });
    card.appendChild(select);

    const read = document.createElement("button");
    read.className = "action-btn";
    read.style.cssText = "width:100%;margin:8px 0;";
    read.textContent = this.__regionsBusy ? "A consultar…" : "Ler Regions (RF)";
    read.disabled = this.__regionsBusy;
    read.addEventListener("click", () => void this.__readRemoteRegions(sroot));
    card.appendChild(read);

    if (this.__regionText) {
      const pre = document.createElement("pre");
      pre.style.cssText = "white-space:pre-wrap;max-height:170px;overflow:auto;padding:9px;border-radius:7px;background:var(--secondary-background-color);font-size:11px;";
      pre.textContent = this.__regionText;
      card.appendChild(pre);
    }

    const op = document.createElement("select");
    op.className = "form-select";
    for (const [v, label] of [["allowf","Allow flood"],["denyf","Deny flood"],["home","Home region"],["default","Default scope"],["put","Create region"],["remove","Remove region"]]) {
      const o = document.createElement("option"); o.value=v; o.textContent=label; o.selected=v===this.__regionAction; op.appendChild(o);
    }
    op.addEventListener("change",()=>{this.__regionAction=op.value;});
    const name = document.createElement("input");
    name.className = "form-input";
    name.placeholder = "Region";
    name.value = this.__regionName;
    name.style.marginTop = "7px";
    name.addEventListener("input",()=>{this.__regionName=name.value;});
    card.append(op,name);

    const actions=document.createElement("div");
    actions.style.cssText="display:flex;gap:8px;margin-top:8px;";
    const apply=document.createElement("button"); apply.className="action-btn"; apply.style.flex="1"; apply.textContent="Aplicar Region";
    apply.addEventListener("click",()=>void this.__applyRemoteRegion(sroot));
    const persist=document.createElement("button"); persist.className="action-btn"; persist.style.flex="1"; persist.textContent="Guardar Regions";
    persist.addEventListener("click",()=>void this.__sendRemoteRegionCommand("region save",sroot));
    actions.append(apply,persist); card.appendChild(actions);
  }

  async __readRemoteRegions(sroot) {
    if (!this.__regionTarget || this.__regionsBusy) return;
    this.__regionsBusy = true; this.__renderRegionsScopesCard(sroot, sroot.querySelector(".settings-grid"));
    try {
      const msg={type:"hivefw_integration/get_remote_regions",target_prefix:this.__regionTarget};
      const entryId=this.__entryId(); if(entryId) msg.entry_id=entryId;
      const result=await this.hass.callWS(msg);
      this.__regionText=result?.regions||"";
    } catch(error) {
      sroot.host?._showStatusMessage?.(`Regions: ${String(error)}`,"error");
    } finally {
      this.__regionsBusy=false; this.__renderRegionsScopesCard(sroot,sroot.querySelector(".settings-grid"));
    }
  }

  async __sendRemoteRegionCommand(command,sroot) {
    if(!this.__regionTarget||this.__regionsBusy)return;
    this.__regionsBusy=true;
    try{
      const msg={type:"hivefw_integration/execute_remote",target_prefix:this.__regionTarget,command};
      const entryId=this.__entryId(); if(entryId) msg.entry_id=entryId;
      const result=await this.hass.callWS(msg);
      sroot.host?._showStatusMessage?.(result?.response||"Region command sent",result?.success?"success":"error");
      if(result?.success){
        this.__regionsBusy=false;
        await this.__readRemoteRegions(sroot);
      }
    }finally{this.__regionsBusy=false;}
  }

  async __applyRemoteRegion(sroot){
    let name=(this.__regionName||"").trim();
    if(this.__regionAction==="default"&&!name)name="<null>";
    if(!name)return;
    await this.__sendRemoteRegionCommand(`region ${this.__regionAction} ${name}`,sroot);
  }

  async __loadPeerActivity(force=false) {
    const entryId=this.__entryId()||null;
    if(this.__peerActivityLoading)return;
    if(!force&&this.__peerActivityLoadedEntry===entryId)return;
    this.__peerActivityLoading=true;
    this.__renderActivityPane();
    try{
      const msg={type:"hivefw_integration/get_peer_activity"};
      if(entryId)msg.entry_id=entryId;
      const result=await this.hass.callWS(msg);
      this.__peerActivity={
        peers:result?.peers&&typeof result.peers==="object"?result.peers:{},
        links:result?.links&&typeof result.links==="object"?result.links:{},
        edges:result?.edges&&typeof result.edges==="object"?result.edges:{},
      };
      this.__peerActivityLoadedEntry=entryId;
    }catch(error){
      console.warn("HiveFW peer activity load failed",error);
      this.__peerActivity={peers:{},links:{},edges:{}};
      this.__peerActivityLoadedEntry=entryId;
    }finally{
      this.__peerActivityLoading=false;
      this.__renderActivityPane();
      if(this._activeTab==="network")this.__rerenderHivePage();
    }
  }

  __activityPeerFor(contact) {
    const peers=this.__peerActivity?.peers||{};
    const key=String(contact?.public_key||"").trim().toLowerCase();
    const prefix=String(contact?.pubkey_prefix||key.slice(0,12)).trim().toLowerCase();
    let match=null;
    let matchedLength=-1;
    for(const [candidate,value] of Object.entries(peers)){
      const c=String(candidate||"").trim().toLowerCase();
      if(!c)continue;
      const matches=(key&&(key.startsWith(c)||c.startsWith(key)))||
        (prefix&&(prefix.startsWith(c)||c.startsWith(prefix)));
      if(!matches)continue;
      if(c.length>matchedLength){
        match=value;
        matchedLength=c.length;
      }
    }
    return match&&typeof match==="object"?match:null;
  }

  __renderActivityPane() {
    const pane=this.__nodesActivityPane;
    if(!pane?.isConnected)return;

    const source=(Array.isArray(this.__nodesMapContacts)&&this.__nodesMapContacts.length)
      ? this.__nodesMapContacts
      : (Array.isArray(this._contacts)?this._contacts:[]);
    pane.replaceChildren();

    const inner=document.createElement("section");
    inner.className="hive-activity-pane-inner";

    const header=document.createElement("div");
    header.className="hive-activity-pane-header";
    const title=document.createElement("strong");
    title.textContent="Atividade";
    const refresh=document.createElement("button");
    refresh.type="button";
    refresh.textContent=this.__peerActivityLoading?"A carregar…":"Atualizar";
    refresh.disabled=!!this.__peerActivityLoading;
    refresh.addEventListener("click",()=>void this.__loadPeerActivity(true));
    header.append(title,refresh);
    inner.appendChild(header);

    if(this.__peerActivityLoadedEntry!==this.__entryId()||this.__peerActivityLoading){
      const loading=document.createElement("div");
      loading.className="hive-activity-empty";
      loading.textContent="A carregar atividade…";
      inner.appendChild(loading);
      pane.appendChild(inner);
      return;
    }

    // Recreate the useful behaviour of the former Activity pane without
    // bringing back any map overlays. Direct peers contribute RX/TX and
    // path hashes contribute observed path volume. Resolve each hash only
    // once so this stays cheap even with a large contact list.
    const byId=new Map();
    for(const contact of source){
      const peer=this.__activityPeerFor(contact);
      const id=this.__nodeId(contact);
      if(!id)continue;
      byId.set(id,{
        contact,
        rx:Number(peer?.rx)||0,
        tx:Number(peer?.tx)||0,
        messages:Number(peer?.messages)||0,
        linkVolume:0,
      });
    }

    const links=this.__peerActivity?.links||{};
    for(const [hash,value] of Object.entries(links)){
      const resolved=this.__resolveTraceHash(hash);
      if(!resolved)continue;
      const id=this.__nodeId(resolved);
      const item=byId.get(id);
      if(!item)continue;
      item.linkVolume+=Number(value?.observations)||0;
    }

    const rows=[...byId.values()]
      .map((item)=>({...item,score:item.rx+item.tx+item.linkVolume}))
      .filter((item)=>item.score>0)
      .sort((a,b)=>b.score-a.score)
      .slice(0,60);

    const totalRx=rows.reduce((sum,item)=>sum+item.rx,0);
    const totalTx=rows.reduce((sum,item)=>sum+item.tx,0);
    const activeCount=rows.length;
    const top=rows[0];

    const summary=document.createElement("div");
    summary.className="hive-activity-pane-summary";
    const stat=(label,value)=>{
      const box=document.createElement("div");
      box.className="hive-activity-stat";
      const l=document.createElement("span");
      l.textContent=label;
      const v=document.createElement("strong");
      v.textContent=String(value);
      box.append(l,v);
      return box;
    };
    summary.append(
      stat("Nós ativos",activeCount),
      stat("RX",totalRx),
      stat("TX",totalTx),
      stat("Mais ativo",top?String(top.contact.adv_name||top.contact.pubkey_prefix||"Nó"):"—")
    );
    inner.appendChild(summary);

    const list=document.createElement("div");
    list.className="hive-activity-list";
    if(!rows.length){
      const empty=document.createElement("div");
      empty.className="hive-activity-empty";
      empty.textContent="Ainda não existe atividade local registada.";
      list.appendChild(empty);
    }else{
      for(const item of rows){
        const row=document.createElement("button");
        row.type="button";
        row.className="hive-activity-row";

        const left=document.createElement("div");
        left.className="hive-activity-row-main";
        const name=document.createElement("div");
        name.className="hive-activity-name";
        name.textContent=String(item.contact.adv_name||item.contact.pubkey_prefix||"Nó");
        const detail=document.createElement("div");
        detail.className="hive-activity-detail";
        detail.textContent=`RX ${item.rx} · TX ${item.tx} · paths ${item.linkVolume}`;
        left.append(name,detail);

        const score=document.createElement("span");
        score.className="hive-activity-score";
        score.textContent=String(item.score);

        row.append(left,score);
        row.addEventListener("click",()=>this.__focusNodeOnMap(item.contact,true));
        list.appendChild(row);
      }
    }

    inner.appendChild(list);
    pane.appendChild(inner);
  }


  __peerActivityFor(contact) {
    const peers=this.__peerActivity?.peers||{};
    const links=this.__peerActivity?.links||{};
    const key=String(contact?.public_key||"").trim().toLowerCase();
    const prefix=String(contact?.pubkey_prefix||key.slice(0,12)).trim().toLowerCase();
    let peer=null;
    for(const [candidate,value] of Object.entries(peers)){
      const c=String(candidate||"").toLowerCase();
      if((key&&key.startsWith(c))||(prefix&&prefix.startsWith(c))||(c&&c.startsWith(prefix))){
        if(peer!==null){peer=null;break;}
        peer=value;
      }
    }
    let linkVolume=0;
    let weightedRssi=0;
    let weightedSnr=0;
    let rssiN=0;
    let snrN=0;
    for(const [hash,value] of Object.entries(links)){
      const resolved=this.__resolveTraceHash(hash);
      if(!resolved||this.__nodeId(resolved)!==this.__nodeId(contact))continue;
      const count=Number(value?.observations)||0;
      linkVolume+=count;
      if(Number.isFinite(Number(value?.avg_rssi))){weightedRssi+=Number(value.avg_rssi)*count;rssiN+=count;}
      if(Number.isFinite(Number(value?.avg_snr))){weightedSnr+=Number(value.avg_snr)*count;snrN+=count;}
    }
    return {
      rx:Number(peer?.rx)||0,
      tx:Number(peer?.tx)||0,
      messages:Number(peer?.messages)||0,
      linkVolume,
      avgRssi:rssiN?weightedRssi/rssiN:null,
      avgSnr:snrN?weightedSnr/snrN:null,
    };
  }

  async __loadTraceHistory(force=false) {
    const entryId=this.__entryId()||null;
    if(this.__traceHistoryLoading)return;
    if(!force&&this.__traceHistoryLoadedEntry===entryId)return;
    this.__traceHistoryLoading=true;
    try{
      const msg={type:"hivefw_integration/get_trace_history",limit:100};
      if(entryId)msg.entry_id=entryId;
      const result=await this.hass.callWS(msg);
      this.__traceHistory=Array.isArray(result?.traces)?result.traces:[];
      this.__traceHistoryLoadedEntry=entryId;
    }catch(error){
      console.warn("HiveFW trace history load failed",error);
      this.__traceHistory=[];
      this.__traceHistoryLoadedEntry=entryId;
    }finally{
      this.__traceHistoryLoading=false;
    }
  }

  async __clearTraceHistory() {
    const msg={type:"hivefw_integration/clear_trace_history"};
    const entryId=this.__entryId();
    if(entryId)msg.entry_id=entryId;
    try{await this.hass.callWS(msg);}catch(error){console.warn("HiveFW trace history clear failed",error);}
    this.__traceHistory=[];
    this.__traceHistoryPanel?.remove();
    this.__traceHistoryPanel=null;
  }

  async __toggleTraceHistory() {
    if(this.__traceHistoryPanel?.isConnected){
      this.__traceHistoryPanel.remove();
      this.__traceHistoryPanel=null;
      return;
    }
    await this.__loadTraceHistory(true);
    const pane=this.__nodesMapPane;
    if(!pane)return;
    const panel=document.createElement("div");
    panel.className="hive-trace-history";
    panel.style.cssText="position:absolute;left:10px;top:68px;z-index:36;width:min(390px,calc(100% - 20px));max-height:55%;overflow:auto;padding:9px;border:1px solid var(--divider-color,#ccc);border-radius:10px;background:color-mix(in srgb,var(--card-background-color,#fff) 96%,transparent);box-shadow:0 2px 8px rgba(0,0,0,.22);font-size:10px;color:var(--primary-text-color,#222);";
    const head=document.createElement("div");
    head.style.cssText="display:flex;align-items:center;gap:8px;margin-bottom:7px;";
    const title=document.createElement("strong");title.textContent="Histórico de Trace";title.style.flex="1";
    const clear=document.createElement("button");clear.type="button";clear.textContent="Limpar";clear.style.cssText="border:0;background:transparent;color:var(--error-color,#db4437);font:inherit;font-weight:700;cursor:pointer;";
    clear.addEventListener("click",()=>void this.__clearTraceHistory());
    const close=document.createElement("button");close.type="button";close.textContent="✕";close.style.cssText="border:0;background:transparent;color:var(--secondary-text-color);cursor:pointer;";
    close.addEventListener("click",()=>{panel.remove();this.__traceHistoryPanel=null;});
    head.append(title,clear,close);panel.appendChild(head);
    if(!this.__traceHistory.length){
      const empty=document.createElement("div");empty.textContent="Ainda não existem traces guardados.";empty.style.color="var(--secondary-text-color)";panel.appendChild(empty);
    }else{
      for(const record of this.__traceHistory){
        const row=document.createElement("button");
        row.type="button";
        row.style.cssText="display:block;width:100%;padding:7px 8px;margin:0 0 5px;text-align:left;border:1px solid var(--divider-color,#ddd);border-radius:7px;background:transparent;color:inherit;cursor:pointer;font:inherit;";
        const when=document.createElement("div");
        const dt=new Date(record.timestamp);
        when.textContent=(Number.isNaN(dt.getTime())?String(record.timestamp||""):dt.toLocaleString())+" · "+String(record.target_prefix||"");
        when.style.fontWeight="700";
        const details=document.createElement("div");
        const parts=[String(record.round_trip_ms||0)+" ms",String(record.hops||0)+" hops",String(record.source||"manual")];
        if(Number.isFinite(Number(record.final_snr)))parts.push("SNR "+Number(record.final_snr).toFixed(1)+" dB");
        details.textContent=parts.join(" · ");details.style.cssText="margin-top:2px;color:var(--secondary-text-color);";
        row.append(when,details);
        row.addEventListener("click",()=>{
          this.__lastTrace={
            timestamp:record.timestamp,
            source:"history",
            target:{pubkey_prefix:String(record.target_prefix||""),adv_name:String(record.target_prefix||"Nó")},
            result:{
              round_trip_ms:Number(record.round_trip_ms)||0,
              response_time:String(Number(record.round_trip_ms)||0)+"ms",
              hops:Number(record.hops)||0,
              final_snr:record.final_snr,
              path:Array.isArray(record.path)?record.path:[],
            },
          };
          this.__lastTraceLoadedEntry=String(this.__entryId()||"default");
          panel.remove();this.__traceHistoryPanel=null;
          this.__drawLastTraceRoute();
        });
        panel.appendChild(row);
      }
    }
    pane.appendChild(panel);
    this.__traceHistoryPanel=panel;
  }

  async __showMessageRouteOnMap(message) {
    const observations=Array.isArray(message?.rxLogData)?message.rxLogData:[];
    if(!observations.length)return;
    const best=observations[observations.length-1]||{};
    const nodes=Array.isArray(best.path_nodes)?best.path_nodes.map(String).filter(Boolean):[];
    if(!nodes.length&&Number(best.hop_count||0)<=0)return;
    const path=nodes.map((hash)=>({hash,snr:null}));
    this.__lastTrace={
      timestamp:message?.timestamp instanceof Date?message.timestamp.toISOString():new Date().toISOString(),
      source:"message",
      target:{pubkey_prefix:"",adv_name:String(message?.sender||"Mensagem")},
      result:{
        round_trip_ms:0,
        response_time:"mensagem",
        hops:Number(best.hop_count)||nodes.length,
        final_snr:Number.isFinite(Number(best.snr))?Number(best.snr):null,
        path,
      },
    };
    this.__lastTraceLoadedEntry=String(this.__entryId()||"default");
    this._activeTab="nodes";
    this.requestUpdate?.();
    try{await this.updateComplete;}catch{}
    this.__enhanceRepeaterUi();
    window.setTimeout(()=>{
      this.__drawLastTraceRoute();
      const data=this.__traceRouteData();
      if(data?.points?.length){
        const map=this.__nodesMapElement?.leafletMap;
        try{map?.fitBounds?.(data.points,{padding:[40,40],maxZoom:12});}catch{}
      }
    },120);
  }

  __lastTraceStorageKey() {
    const entry=String(this.__entryId()||"default").replace(/[^a-zA-Z0-9_.-]/g,"_");
    return "hivefw.last_trace.v1."+entry;
  }

  __loadLastTrace() {
    const entry=String(this.__entryId()||"default");
    if(this.__lastTraceLoadedEntry===entry)return this.__lastTrace;
    this.__lastTraceLoadedEntry=entry;
    try{
      const parsed=JSON.parse(localStorage.getItem(this.__lastTraceStorageKey())||"null");
      this.__lastTrace=parsed&&parsed.result?parsed:null;
    }catch{this.__lastTrace=null;}
    return this.__lastTrace;
  }

  __recordTraceResult(result,target,source="manual") {
    if(!result||!target)return;
    const trace={
      timestamp:Date.now(),
      source,
      target:{
        public_key:String(target.public_key||""),
        pubkey_prefix:String(target.pubkey_prefix||""),
        adv_name:String(target.adv_name||target.name||target.pubkey_prefix||"Nó"),
        adv_lat:Number(target.adv_lat??target.latitude),
        adv_lon:Number(target.adv_lon??target.longitude),
      },
      result:{
        round_trip_ms:Number(result.round_trip_ms||0),
        response_time:String(result.response_time||((Number(result.round_trip_ms)||0)+"ms")),
        hops:Number(result.hops||0),
        final_snr:result.final_snr==null?null:Number(result.final_snr),
        path:Array.isArray(result.path)?result.path.map((hop)=>({
          hash:hop?.hash==null?undefined:String(hop.hash),
          snr:Number(hop?.snr),
        })):[],
      },
    };
    this.__lastTrace=trace;
    this.__lastTraceLoadedEntry=String(this.__entryId()||"default");
    try{localStorage.setItem(this.__lastTraceStorageKey(),JSON.stringify(trace));}catch{}
    this.__drawLastTraceRoute();
  }

  __captureTraceResult() {
    const result=this._traceDialogResult;
    if(!result||result===this.__lastSeenTraceResult)return;
    this.__lastSeenTraceResult=result;
    const target=this._traceDialogTargetContact;
    if(target)this.__recordTraceResult(result,target,"manual");
  }

  __clearLastTrace() {
    try{localStorage.removeItem(this.__lastTraceStorageKey());}catch{}
    this.__lastTrace=null;
    this.__removeTraceRouteLayer();
    this.__nodesMapPane?.querySelector(".hive-trace-summary")?.remove();
  }

  __removeTraceRouteLayer() {
    const map=this.__nodesMapElement?.leafletMap;
    if(this.__traceRouteLayer&&map){try{map.removeLayer(this.__traceRouteLayer);}catch{}}
    this.__traceRouteLayer=null;
  }

  __resolveTraceHash(hash) {
    const wanted=String(hash||"").trim().replace(/^0x/i,"").toLowerCase();
    if(!wanted)return null;
    const source=Array.isArray(this.__nodesMapContacts)?this.__nodesMapContacts:(Array.isArray(this._contacts)?this._contacts:[]);
    const matches=source.filter((contact)=>{
      if(!this.__nodeCoords(contact))return false;
      const key=String(contact?.public_key||"").toLowerCase();
      const prefix=String(contact?.pubkey_prefix||key.slice(0,12)).toLowerCase();
      return key.startsWith(wanted)||prefix.startsWith(wanted);
    });
    if(matches.length!==1)return null;
    return matches[0];
  }

  __traceTargetContact(trace) {
    if(!trace?.target)return null;
    const source=Array.isArray(this.__nodesMapContacts)?this.__nodesMapContacts:(Array.isArray(this._contacts)?this._contacts:[]);
    const key=String(trace.target.public_key||"").toLowerCase();
    const prefix=String(trace.target.pubkey_prefix||"").toLowerCase();
    const found=source.find((contact)=>{
      const ckey=String(contact?.public_key||"").toLowerCase();
      const cp=String(contact?.pubkey_prefix||ckey.slice(0,12)).toLowerCase();
      return (key&&ckey===key)||(prefix&&cp===prefix);
    });
    return found||trace.target;
  }

  __traceRouteData() {
    const trace=this.__loadLastTrace();
    if(!trace?.result)return null;
    const target=this.__traceTargetContact(trace);
    const local=this.__localRepeaterMapContact();
    const points=[];
    const resolved=[];
    const unresolved=[];
    const push=(contact,label,hash,snr)=>{
      const coords=this.__nodeCoords(contact);
      if(!coords)return;
      const previous=points[points.length-1];
      if(!previous||previous[0]!==coords[0]||previous[1]!==coords[1])points.push(coords);
      resolved.push({contact,label,hash,snr,coords});
    };
    if(target&&this.__nodeCoords(target))push(target,String(target.adv_name||target.pubkey_prefix||"Destino"),null,null);
    for(const hop of (trace.result.path||[])){
      if(!hop?.hash)continue;
      const contact=this.__resolveTraceHash(hop.hash);
      if(contact)push(contact,String(contact.adv_name||contact.pubkey_prefix||hop.hash),String(hop.hash),hop.snr);
      else unresolved.push(String(hop.hash));
    }
    if(local&&this.__nodeCoords(local))push(local,String(local.adv_name||"Local"),null,trace.result.final_snr);
    return {trace,points,resolved,unresolved};
  }

  __drawLastTraceRoute() {
    const pane=this.__nodesMapPane;
    const mapEl=this.__nodesMapElement;
    const map=mapEl?.leafletMap;
    const L=mapEl?.Leaflet;
    if(!pane||!map||!L)return;
    this.__removeTraceRouteLayer();
    pane.querySelector(".hive-trace-summary")?.remove();
    const data=this.__traceRouteData();
    if(!data)return;

    if(data.points.length>=2){
      const line=L.polyline(data.points,{weight:4,opacity:.78,dashArray:"9 6",interactive:false});
      line.addTo(map);
      this.__traceRouteLayer=line;
    }

    const summary=document.createElement("div");
    summary.className="hive-trace-summary";
    summary.style.cssText="position:absolute;left:10px;top:10px;z-index:35;max-width:min(360px,calc(100% - 20px));padding:8px 10px;border:1px solid var(--divider-color,#ccc);border-radius:10px;background:color-mix(in srgb,var(--card-background-color,#fff) 93%,transparent);box-shadow:0 1px 5px rgba(0,0,0,.18);font-size:10px;color:var(--primary-text-color,#222);pointer-events:auto;";
    const top=document.createElement("div");
    top.style.cssText="display:flex;align-items:center;gap:8px;";
    const label=document.createElement("strong");
    label.style.flex="1";
    label.textContent="Último Trace · "+String(data.trace.target?.adv_name||data.trace.target?.pubkey_prefix||"Nó");
    const clear=document.createElement("button");
    clear.type="button";clear.textContent="Limpar";
    clear.style.cssText="border:0;background:transparent;color:var(--primary-color,#03a9f4);font:inherit;font-weight:700;cursor:pointer;";
    clear.addEventListener("click",()=>this.__clearLastTrace());
    top.append(label,clear);
    const detail=document.createElement("div");
    const parts=[data.trace.result.response_time||((data.trace.result.round_trip_ms||0)+"ms"),String(data.trace.result.hops||0)+" hops"];
    if(Number.isFinite(Number(data.trace.result.final_snr)))parts.push("SNR "+Number(data.trace.result.final_snr).toFixed(1)+" dB");
    if(data.unresolved.length)parts.push(data.unresolved.length+" hash não resolvido"+(data.unresolved.length===1?"":"s"));
    detail.textContent=parts.join(" · ");
    detail.style.cssText="margin-top:3px;color:var(--secondary-text-color,#666);";
    summary.append(top,detail);
    if(data.unresolved.length){
      const hashes=document.createElement("div");
      hashes.textContent="Sem GPS/ambíguos: "+data.unresolved.join(", ");
      hashes.style.cssText="margin-top:3px;font:9px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:var(--secondary-text-color,#777);overflow-wrap:anywhere;";
      summary.appendChild(hashes);
    }
    pane.appendChild(summary);
  }

  async __ensureMapLoaded() {
    if (customElements.get("ha-map")) return true;
    if (this.__mapLoadStarted) return false;
    this.__mapLoadStarted = true;
    try {
      if (window.loadCardHelpers) {
        const helpers = await window.loadCardHelpers();
        helpers.createCardElement?.({type:"map",entities:[]});
      }
      await Promise.race([customElements.whenDefined("ha-map"),new Promise((r)=>setTimeout(r,1500))]);
    } catch {}
    return !!customElements.get("ha-map");
  }

  __nodeCoords(contact) {
    if(!contact)return null;
    const loc=contact.location||{};
    const lat=Number(contact.adv_lat ?? contact.latitude ?? contact.lat ?? loc.latitude ?? loc.lat);
    const lon=Number(contact.adv_lon ?? contact.longitude ?? contact.lon ?? contact.lng ?? loc.longitude ?? loc.lon ?? loc.lng);
    if(!Number.isFinite(lat)||!Number.isFinite(lon))return null;
    if(lat < -90 || lat > 90 || lon < -180 || lon > 180)return null;
    if(lat===0&&lon===0)return null;
    return [lat,lon];
  }

  __nodeId(contact) {
    return contact?.public_key || contact?.pubkey_prefix || "";
  }

  __meshcoreExportPath(contact) {
    const existing=contact?.advert_path_list;
    if(Array.isArray(existing)){
      return existing.map((part)=>
        String(part??"").trim().replace(/^0x/i,"").toLowerCase()
      ).filter(Boolean).join(",");
    }
    if(typeof existing==="string" && existing.includes(",")){
      return existing.split(",").map((part)=>
        part.trim().replace(/^0x/i,"").toLowerCase()
      ).filter(Boolean).join(",");
    }

    const rawHex=String(contact?.out_path ?? contact?.path ?? existing ?? "")
      .replace(/[^0-9a-f]/gi,"")
      .toLowerCase();
    const outPathLen=Number(contact?.out_path_len);
    if(!rawHex || !Number.isInteger(outPathLen) || outPathLen<=0)return "";

    const modeRaw=contact?.out_path_hash_mode ?? contact?.path_hash_mode;
    const mode=Number(modeRaw);
    let hopChars=Number.isInteger(mode) && mode>=0 && mode<=2
      ? (mode+1)*2
      : 0;

    // Old stored contacts can have a missing/defaulted hash mode. The wire
    // path length lets us recover the real width exactly: 1/2/3-byte hashes
    // are 2/4/6 hex chars per hop.
    if(rawHex.length % outPathLen===0){
      const inferred=rawHex.length/outPathLen;
      if([2,4,6].includes(inferred) && (!hopChars || hopChars*outPathLen!==rawHex.length)){
        hopChars=inferred;
      }
    }
    if(!hopChars || hopChars*outPathLen!==rawHex.length)return "";

    const hops=[];
    for(let i=0;i<outPathLen;i++){
      hops.push(rawHex.slice(i*hopChars,(i+1)*hopChars));
    }
    return hops.join(",");
  }

  __meshcoreExportCoord(value) {
    const number=Number(value);
    if(!Number.isFinite(number) || number===0)return "0.0";
    return String(number);
  }

  async __exportHiveFWContacts(button) {
    if(!this.hass)return;
    const original=button?.textContent||"Exportar";
    if(button){
      button.disabled=true;
      button.textContent="A exportar…";
    }
    try{
      const msg={type:"hivefw_integration/get_contacts"};
      const entryId=this.__entryId();
      if(entryId)msg.entry_id=entryId;
      const result=await this.hass.callWS(msg);
      const source=Array.isArray(result?.contacts)?result.contacts:[];
      const byKey=new Map();

      for(const contact of source){
        const publicKey=String(contact?.public_key||"").trim().toLowerCase();
        if(!/^[0-9a-f]{64}$/.test(publicKey))continue;
        const row={
          type:Number(contact?.type??0) || 0,
          name:String(contact?.adv_name ?? contact?.name ?? ""),
          public_key:publicKey,
          flags:Number(contact?.flags??0) || 0,
          latitude:this.__meshcoreExportCoord(contact?.adv_lat ?? contact?.latitude),
          longitude:this.__meshcoreExportCoord(contact?.adv_lon ?? contact?.longitude),
          last_advert:Math.trunc(Number(contact?.last_advert ?? 0)) || 0,
          last_modified:Math.trunc(Number(contact?.lastmod ?? contact?.last_modified ?? 0)) || 0,
          advert_path_list:this.__meshcoreExportPath(contact),
        };
        const previous=byKey.get(publicKey);
        if(!previous || row.last_modified>=previous.last_modified)byKey.set(publicKey,row);
      }

      const contacts=[...byKey.values()].sort((a,b)=>b.last_modified-a.last_modified);
      const json=JSON.stringify({discovered_contacts:contacts},null,2);
      const blob=new Blob([json],{type:"application/json;charset=utf-8"});
      const url=URL.createObjectURL(blob);
      const link=document.createElement("a");
      link.href=url;
      link.download="hivefw_discovered_contacts.json";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(()=>URL.revokeObjectURL(url),1000);

      if(button){
        button.textContent=`Exportados: ${contacts.length}`;
        window.setTimeout(()=>{
          if(button.isConnected)button.textContent=original;
        },1800);
      }
    }catch(error){
      console.error("HiveFW contact export failed:",error);
      if(button){
        button.textContent="Erro ao exportar";
        window.setTimeout(()=>{
          if(button.isConnected)button.textContent=original;
        },1800);
      }
    }finally{
      if(button)button.disabled=false;
    }
  }

  async __importHiveFWContacts(file,button,page) {
    if(!this.hass||!file)return;
    const original=button?.textContent||"Importar";
    if(button){
      button.disabled=true;
      button.textContent="A importar…";
    }

    try{
      const text=await file.text();
      const parsed=JSON.parse(text);
      const contacts=parsed?.discovered_contacts;
      if(!Array.isArray(contacts)){
        throw new Error("Ficheiro inválido: falta discovered_contacts");
      }

      const msg={
        type:"hivefw_integration/import_contacts",
        contacts,
      };
      const entryId=this.__entryId();
      if(entryId)msg.entry_id=entryId;

      const result=await this.hass.callWS(msg);

      // Force a fresh list + map snapshot after an additive import.
      this.__nodesMapContacts=null;
      this.__nodesMapLoadedEntry=null;
      this.__nodesMapSignature="";
      page?._syncAll?.();
      if(this.__nodesMapPane?.isConnected){
        await this.__loadNodesMapContacts();
        void this.__ensureSplitMap(page,this.__nodesMapPane);
      }

      if(button){
        const imported=Number(result?.imported||0);
        const skipped=Number(result?.skipped_existing||0);
        const invalid=Number(result?.invalid||0);
        button.textContent=invalid
          ? `+${imported} · ${skipped} iguais · ${invalid} inválidos`
          : `+${imported} · ${skipped} iguais`;
        window.setTimeout(()=>{
          if(button.isConnected)button.textContent=original;
        },2600);
      }
    }catch(error){
      console.error("HiveFW contact import failed:",error);
      if(button){
        button.textContent="Ficheiro inválido";
        window.setTimeout(()=>{
          if(button.isConnected)button.textContent=original;
        },2200);
      }
    }finally{
      if(button)button.disabled=false;
    }
  }

  __ensureNodeExportControls(nroot,page) {
    const filters=nroot?.querySelector(".l1-filters");
    const actions=nroot?.querySelector(".header-actions");
    if(!filters||!actions)return;

    // Clean up the 0.10.5 stacked layout if this page survived a hot reload.
    actions.querySelector(".hive-sync-stack")?.remove();
    const originalSync=actions.querySelector(":scope > .sync-btn:not(.hive-export-btn):not(.hive-sync-proxy)");
    if(originalSync)originalSync.style.display="";

    let style=nroot.querySelector("#hive-node-export-style");
    if(!style){
      style=document.createElement("style");
      style.id="hive-node-export-style";
      style.textContent=`
        .l1-filters .hive-export-btn{
          margin-left:auto;
        }
        .l1-filters .hive-export-btn,
        .l1-filters .hive-import-btn{
          white-space:nowrap;
        }
        .map-selection{
          display:none!important;
        }
      `;
      nroot.appendChild(style);
    }

    if(filters.querySelector(".hive-export-btn"))return;

    const exportButton=document.createElement("button");
    exportButton.className="l1-btn hive-export-btn";
    exportButton.textContent="Exportar";
    exportButton.title="Exportar contactos no formato discovered_contacts compatível com MeshCore";
    exportButton.addEventListener("click",()=>void this.__exportHiveFWContacts(exportButton));

    const importButton=document.createElement("button");
    importButton.className="l1-btn hive-import-btn";
    importButton.textContent="Importar";
    importButton.title="Importar apenas contactos novos; contactos existentes nunca são alterados";

    const input=document.createElement("input");
    input.type="file";
    input.accept=".json,application/json";
    input.hidden=true;
    input.addEventListener("change",()=>{
      const file=input.files?.[0];
      if(file)void this.__importHiveFWContacts(file,importButton,page);
      input.value="";
    });
    importButton.addEventListener("click",()=>{
      input.value="";
      input.click();
    });

    filters.append(exportButton,importButton,input);
  }

  async __refreshNodeMapAfterMutation(pubkey,page) {
    const openId=this.__nodesPopupId;
    this.__nodesMapContacts=null;
    this.__nodesMapLoadedEntry=null;
    this.__nodesMapSignature="";

    await this.__loadNodesMapContacts();
    if(this.__nodesMapPane?.isConnected){
      await this.__ensureSplitMap(page,this.__nodesMapPane);
    }

    if(openId){
      const source=Array.isArray(this.__nodesMapContacts)?this.__nodesMapContacts:[];
      const fresh=source.find((contact)=>{
        if(pubkey && contact?.public_key===pubkey)return true;
        return this.__nodeId(contact)===openId;
      });
      if(fresh && this.__nodeCoords(fresh)){
        this.__openPersistentNodePopup(fresh);
      }
    }
  }

  __enhanceNodesPage() {
    const root=this.shadowRoot;
    const page=root?.querySelector("meshcore-nodes-page");
    const nroot=page?.shadowRoot;
    const content=nroot?.querySelector(".content-area");
    const pane=nroot?.querySelector(".nodes-map-pane");
    const activityPane=nroot?.querySelector(".nodes-activity-pane");
    if(!root||!page||!nroot||!content||!pane||!activityPane)return;

    // The Nodes component owns the final layout from first paint. The wrapper
    // only fills the native map and activity panes.
    nroot.querySelector(".hive-view-switch")?.remove();
    nroot.querySelector(".hive-map-overlay")?.remove();
    this.__ensureNodeExportControls(nroot,page);

    if(!page.__hiveMapMutationRefreshBound&&typeof page.refreshAfterMutation==="function"){
      page.__hiveMapMutationRefreshBound=true;
      const originalRefreshAfterMutation=page.refreshAfterMutation.bind(page);
      page.refreshAfterMutation=async(pubkey)=>{
        await originalRefreshAfterMutation(pubkey);
        await this.__refreshNodeMapAfterMutation(pubkey,page);
      };
    }

    let style=nroot.querySelector("#hive-node-runtime-style");
    if(!style){
      style=document.createElement("style");
      style.id="hive-node-runtime-style";
      style.textContent=`
        .nodes-map-pane ha-map{
          display:block;
          width:100%;
          height:100%;
          min-height:420px;
        }
        .hive-map-note{
          display:grid;
          place-items:center;
          height:100%;
          padding:24px;
          box-sizing:border-box;
          color:var(--secondary-text-color);
          text-align:center;
        }
        .hive-map-count{
          position:absolute;
          top:10px;
          right:10px;
          z-index:30;
          padding:6px 9px;
          border-radius:14px;
          background:color-mix(in srgb,var(--card-background-color) 90%,transparent);
          color:var(--primary-text-color);
          border:1px solid var(--divider-color);
          font-size:11px;
          font-weight:600;
          box-shadow:0 1px 4px rgba(0,0,0,.18);
          pointer-events:auto;
        }
        .hive-map-count button{
          border:0;
          padding:0;
          background:transparent;
          color:var(--primary-color,#03a9f4);
          font:inherit;
          font-weight:700;
          cursor:pointer;
          text-decoration:underline;
          text-underline-offset:2px;
        }
        .nodes-activity-pane{
          overflow:hidden;
        }
        .hive-activity-pane-inner{
          display:flex;
          flex-direction:column;
          width:100%;
          height:100%;
          min-height:0;
          background:var(--card-background-color,#fff);
          color:var(--primary-text-color,#222);
        }
        .hive-activity-pane-header{
          display:flex;
          align-items:center;
          gap:8px;
          padding:10px 11px;
          border-bottom:1px solid var(--divider-color,#ddd);
          flex:0 0 auto;
        }
        .hive-activity-pane-header strong{
          flex:1;
          font-size:12px;
        }
        .hive-activity-pane-header button{
          border:1px solid var(--divider-color,#ccc);
          border-radius:7px;
          background:transparent;
          color:var(--primary-color,#03a9f4);
          padding:4px 7px;
          font:inherit;
          font-size:10px;
          cursor:pointer;
        }
        .hive-activity-pane-summary{
          display:grid;
          grid-template-columns:repeat(2,minmax(0,1fr));
          gap:6px;
          padding:8px 9px;
          border-bottom:1px solid var(--divider-color,#eee);
          flex:0 0 auto;
        }
        .hive-activity-stat{
          min-width:0;
          padding:7px;
          border:1px solid var(--divider-color,#eee);
          border-radius:8px;
          background:var(--secondary-background-color,#f7f7f7);
        }
        .hive-activity-stat span{
          display:block;
          color:var(--secondary-text-color,#666);
          font-size:9px;
          margin-bottom:2px;
        }
        .hive-activity-stat strong{
          display:block;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          font-size:12px;
        }
        .hive-activity-list{
          flex:1;
          min-height:0;
          overflow:auto;
          padding:4px 8px 8px;
        }
        .hive-activity-row{
          width:100%;
          display:grid;
          grid-template-columns:minmax(0,1fr) auto;
          gap:8px;
          align-items:center;
          padding:8px 4px;
          border:0;
          border-bottom:1px solid var(--divider-color,#eee);
          background:transparent;
          color:inherit;
          text-align:left;
          cursor:pointer;
        }
        .hive-activity-row:hover{
          background:var(--secondary-background-color,#f7f7f7);
        }
        .hive-activity-name{
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          font-size:11px;
          font-weight:600;
        }
        .hive-activity-detail{
          color:var(--secondary-text-color,#666);
          font-size:9px;
          margin-top:2px;
        }
        .hive-activity-score{
          font:700 11px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
          color:var(--primary-color,#03a9f4);
        }
        .hive-activity-empty{
          padding:18px 10px;
          color:var(--secondary-text-color,#666);
          text-align:center;
          font-size:10px;
        }
      `;
      nroot.appendChild(style);
    }

    this.__nodesMapPane=pane;
    this.__nodesActivityPane=activityPane;
    pane.querySelector(".hive-map-selection")?.remove();
    nroot.querySelectorAll(".map-selection").forEach((el)=>el.remove());

    // Cheap first-stage decoration only. Peer activity is intentionally not
    // requested here; the map gets the first render budget.
    this.__decorateNodeCards(nroot);

    if(!content.dataset.hiveMapFocusBound){
      content.dataset.hiveMapFocusBound="1";
      content.addEventListener("click",(event)=>{
        const path=event.composedPath?.()||[];
        const card=path.find((el)=>el?.tagName==="MESHCORE-CONTACT-CARD");
        const contact=card?.contact;
        if(contact){
          event.preventDefault?.();
          event.stopPropagation();
          event.stopImmediatePropagation?.();
          this.__focusNodeOnMap(contact);
        }
      },true);
    }

    // Do not rebuild Activity on every Home Assistant update cycle.
    // Replacing its children resets scrollTop, so only seed an empty pane;
    // __loadPeerActivity() owns real data/loading rerenders.
    if(!activityPane.firstElementChild)this.__renderActivityPane();
    if(this.__peerActivityLoadedEntry!==this.__entryId()&&!this.__peerActivityLoading){
      void this.__loadPeerActivity();
    }
    void this.__ensureSplitMap(page,pane);
  }

  __cleanupNodesSplit() {
    this.__closeTraceMonitor();
    this.__removeTraceRouteLayer();
    this.__traceHistoryPanel?.remove();
    this.__traceHistoryPanel=null;
    this.__closePersistentNodePopup();

    // Map/activity panes are part of the native Nodes component. Never remove
    // them; clear runtime children only so the correct layout exists on the
    // next first paint as well.
    if(this.__nodesMapPane?.isConnected)this.__nodesMapPane.replaceChildren();
    if(this.__nodesActivityPane?.isConnected)this.__nodesActivityPane.replaceChildren();

    this.__nodesMapPane=null;
    this.__nodesActivityPane=null;
    this.__nodesMapElement=null;
    this.__nodesMapSignature="";
    this.__nodesPopupId="";
    this.__nodesInitialViewport=null;
  }

  __firstSeenStorageKey() {
    const entry=String(this.__entryId()||"default").replace(/[^a-zA-Z0-9_.-]/g,"_");
    return "hivefw.first_seen.v1."+entry;
  }

  __touchFirstSeen(contacts) {
    if(!Array.isArray(contacts))return {new24:0,new7d:0};
    let state;
    try{state=JSON.parse(localStorage.getItem(this.__firstSeenStorageKey())||"null");}catch{state=null;}
    const initialized=!!state?.initialized;
    if(!state||typeof state!=="object")state={initialized:false,nodes:{}};
    if(!state.nodes||typeof state.nodes!=="object")state.nodes={};
    const now=Date.now();
    let changed=false;
    for(const contact of contacts){
      const key=String(contact?.public_key||"").trim().toLowerCase();
      if(!/^[0-9a-f]{64}$/.test(key)||Object.prototype.hasOwnProperty.call(state.nodes,key))continue;
      // First run is a baseline, not a claim that every old contact is new.
      state.nodes[key]=initialized?now:0;
      changed=true;
    }
    if(!state.initialized){state.initialized=true;changed=true;}
    if(changed){try{localStorage.setItem(this.__firstSeenStorageKey(),JSON.stringify(state));}catch{}}
    const stamps=Object.values(state.nodes).map(Number).filter((value)=>Number.isFinite(value)&&value>0);
    return {
      new24:stamps.filter((value)=>now-value<=24*60*60*1000).length,
      new7d:stamps.filter((value)=>now-value<=7*24*60*60*1000).length,
    };
  }

  __nodeMetaStorageKey() {
    const entry=String(this.__entryId()||"default").replace(/[^a-zA-Z0-9_.-]/g,"_");
    return "hivefw.node_meta.v1."+entry;
  }

  __loadNodeMetaMap() {
    try{
      const parsed=JSON.parse(localStorage.getItem(this.__nodeMetaStorageKey())||"{}");
      return parsed&&typeof parsed==="object"?parsed:{};
    }catch{return {};}
  }

  __saveNodeMetaMap(map) {
    try{localStorage.setItem(this.__nodeMetaStorageKey(),JSON.stringify(map||{}));}catch{}
  }

  __nodeMeta(contact) {
    const directTags=Array.isArray(contact?.tags)
      ? contact.tags.map(String).filter(Boolean).slice(0,8)
      : [];
    if(contact?.favorite!==undefined || directTags.length){
      return {favorite:!!contact?.favorite,tags:directTags};
    }

    // One-release fallback for metadata created before it moved from browser
    // localStorage into Home Assistant storage.
    const key=String(contact?.public_key||"").trim().toLowerCase();
    if(!/^[0-9a-f]{64}$/.test(key))return {favorite:false,tags:[]};
    const value=this.__loadNodeMetaMap()[key]||{};
    return {
      favorite:!!value.favorite,
      tags:Array.isArray(value.tags)?value.tags.map(String).filter(Boolean).slice(0,8):[],
    };
  }

  async __setNodeMeta(contact,patch) {
    const key=String(contact?.public_key||"").trim().toLowerCase();
    if(!/^[0-9a-f]{6,64}$/.test(key))return;

    const previous=this.__nodeMeta(contact);
    const next={
      favorite:patch.favorite!==undefined?!!patch.favorite:!!previous.favorite,
      tags:Array.isArray(patch.tags)
        ? patch.tags.map(String).filter(Boolean).slice(0,8)
        : previous.tags,
    };

    // Optimistic local update keeps popup/map interactions instant.
    contact.favorite=next.favorite;
    contact.tags=next.tags;
    this.__nodesMapSignature="";

    try{
      const msg={
        type:"hivefw_integration/set_node_meta",
        public_key:key,
        favorite:next.favorite,
        tags:next.tags,
      };
      const entryId=this.__entryId();
      if(entryId)msg.entry_id=entryId;
      const saved=await this.hass.callWS(msg);
      contact.favorite=!!saved?.favorite;
      contact.tags=Array.isArray(saved?.tags)?saved.tags:next.tags;

      // Retire any pre-backend localStorage copy after a successful save.
      const map=this.__loadNodeMetaMap();
      if(map[key]){
        delete map[key];
        this.__saveNodeMetaMap(map);
      }
    }catch(error){
      // Preserve the change locally if the backend is temporarily unavailable.
      const map=this.__loadNodeMetaMap();
      map[key]=next;
      this.__saveNodeMetaMap(map);
      console.warn("HiveFW node metadata save failed",error);
    }

    const page=this.shadowRoot?.querySelector("meshcore-nodes-page");
    if(page?._loadPage)void page._loadPage(true);
    const nroot=page?.shadowRoot;
    if(nroot)this.__decorateNodeCards(nroot);
    if(this.__nodesMapPane?.isConnected){
      this.__nodesMapLoadedEntry=null;
      void this.__loadNodesMapContacts().then(()=>this.__ensureSplitMap(page,this.__nodesMapPane));
    }
    if(this.__nodesPersistentPopup){
      this.__openPersistentNodePopup(contact);
    }
    if(this._activeTab==="settings")this.__enhanceSettingsPage();
  }

  __decorateNodeCards(nroot) {
    if(!nroot)return;
    for(const card of nroot.querySelectorAll("meshcore-contact-card")){
      const root=card.shadowRoot;
      const name=root?.querySelector(".contact-name");
      if(!name)continue;
      let badge=root.querySelector(".hive-node-meta-inline");
      if(!badge){
        badge=document.createElement("span");
        badge.className="hive-node-meta-inline";
        badge.style.cssText="margin-left:5px;font-size:10px;color:var(--primary-color,#03a9f4);font-weight:650;";
        name.appendChild(badge);
      }
      const meta=this.__nodeMeta(card.contact);
      const parts=[];
      if(meta.favorite)parts.push("★");
      parts.push(...meta.tags.slice(0,2).map((tag)=>"#"+tag));
      badge.textContent=parts.length?" "+parts.join(" "):"";
      badge.hidden=!parts.length;
    }
  }

  async __loadNodesMapContacts() {
    const entryId=this.__entryId()||null;
    if(this.__nodesMapLoading)return;
    if(this.__nodesMapLoadedEntry===entryId && Array.isArray(this.__nodesMapContacts))return;
    this.__nodesMapLoading=true;
    try{
      const msg={type:"hivefw_integration/get_contacts"};
      if(entryId)msg.entry_id=entryId;
      const result=await this.hass.callWS(msg);
      this.__nodesMapContacts=Array.isArray(result?.contacts)?result.contacts:[];
    }catch{
      this.__nodesMapContacts=Array.isArray(this._contacts)?this._contacts:[];
    }finally{
      this.__nodesMapLoadedEntry=entryId;
      this.__nodesMapLoading=false;
    }
  }

  __validMapContacts() {
    const source=Array.isArray(this.__nodesMapContacts)
      ? this.__nodesMapContacts
      : (Array.isArray(this._contacts)?this._contacts:[]);
    return source.filter((c)=>this.__nodeCoords(c)!==null);
  }

  __normalizeNodeName(value) {
    return String(value||"")
      .normalize("NFKC")
      .trim()
      .replace(/\s+/g," ")
      .toLocaleLowerCase();
  }

  __localRepeaterMapContact() {
    const status=this.__repeaterStatus||{};
    const device=this._selectedDevice||{};
    const source=Array.isArray(this.__nodesMapContacts)
      ? this.__nodesMapContacts
      : (Array.isArray(this._contacts)?this._contacts:[]);

    const fullKey=String(device.pubkey||"").trim().toLowerCase();
    const prefixes=[
      String(device.pubkey_prefix||"").trim().toLowerCase(),
      fullKey.slice(0,12),
    ].filter(Boolean);

    let matched=null;

    // Strongest identity: the connected Companion public key.
    if(fullKey){
      matched=source.find((contact)=>
        String(contact?.public_key||"").trim().toLowerCase()===fullKey
      )||null;
    }

    // Next best: stable pubkey prefix.
    if(!matched && prefixes.length){
      matched=source.find((contact)=>{
        const key=String(contact?.public_key||"").trim().toLowerCase();
        const prefix=String(contact?.pubkey_prefix||key.slice(0,12)).trim().toLowerCase();
        return prefixes.some((wanted)=>
          prefix===wanted || key.startsWith(wanted) || wanted.startsWith(prefix)
        );
      })||null;
    }

    // Fallback requested for HiveFW: cross the currently connected radio
    // name with the discovered-contact advert name. If duplicate names ever
    // exist, keep the most recently updated contact.
    if(!matched){
      const names=[
        device.name,
        status.name,
        this._config?.node_name,
        this._config?.name,
      ].map((name)=>this.__normalizeNodeName(name)).filter(Boolean);
      if(names.length){
        matched=source
          .filter((contact)=>{
            const contactName=this.__normalizeNodeName(contact?.adv_name ?? contact?.name);
            return contactName && names.includes(contactName);
          })
          .sort((a,b)=>Number(b?.lastmod||0)-Number(a?.lastmod||0))[0]||null;
      }
    }

    const currentName=String(
      device.name || status.name || this._config?.node_name || this._config?.name || matched?.adv_name || "HiveFW"
    ).trim();

    const location=status?.location||{};
    const fallbackLat=Number(location.latitude);
    const fallbackLon=Number(location.longitude);
    const fallbackCoordsValid=
      Number.isFinite(fallbackLat) && Number.isFinite(fallbackLon) &&
      fallbackLat>=-90 && fallbackLat<=90 &&
      fallbackLon>=-180 && fallbackLon<=180 &&
      !(fallbackLat===0&&fallbackLon===0);

    if(matched){
      const merged={...matched,__hivefw_local:true,__hivefw_local_match:true};
      // The map label always follows the currently connected device name,
      // even before a fresh advert updates the discovered-contact name.
      if(currentName)merged.adv_name=currentName;

      // Preserve the real contact GPS first; use SELF_INFO location only
      // when that contact currently has no valid advertised coordinates.
      if(!this.__nodeCoords(merged) && fallbackCoordsValid){
        merged.adv_lat=fallbackLat;
        merged.adv_lon=fallbackLon;
        merged.latitude=fallbackLat;
        merged.longitude=fallbackLon;
      }
      return merged;
    }

    // Last-resort compatibility for a local node not yet present in
    // discoveries. This disappears automatically once a real contact matches.
    if(!fallbackCoordsValid)return null;
    return {
      public_key:"__hivefw_local__",
      pubkey_prefix:"LOCAL",
      adv_name:currentName||"HiveFW",
      adv_lat:fallbackLat,
      adv_lon:fallbackLon,
      latitude:fallbackLat,
      longitude:fallbackLon,
      __hivefw_local:true,
      __hivefw_local_match:false,
    };
  }

  __mapEntities(contacts) {
    return contacts
      .filter((c)=>c?.map_entity_id && this.hass?.states?.[c.map_entity_id])
      .map((c)=>c.map_entity_id);
  }

  __mapLocations(contacts) {
    const fallback=contacts.filter((c)=>!c?.map_entity_id || !this.hass?.states?.[c.map_entity_id]);
    const active=new Set();
    const selectedId=this.__nodesMapFocusId||"";
    const locations=fallback.map((c)=>{
      const id=this.__nodeId(c);
      const coords=this.__nodeCoords(c);
      active.add(id);
      let marker=this.__nodesMapMarkerElements.get(id);
      if(!marker){
        marker=document.createElement("div");
        this.__nodesMapMarkerElements.set(id,marker);
      }
      const selected=id===selectedId;
      marker.textContent=String(c.adv_name||c.pubkey_prefix||"?").slice(0,2).toUpperCase();
      marker.style.cssText=`width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font-size:10px;font-weight:700;background:${selected?"var(--warning-color,#ff9800)":"var(--primary-color,#03a9f4)"};color:#fff;border:${selected?"3px":"2px"} solid #fff;box-shadow:${selected?"0 0 0 3px rgba(255,152,0,.35),0 2px 7px rgba(0,0,0,.35)":"0 1px 5px rgba(0,0,0,.35)"}`;
      return {id,location:coords,element:marker,elementSize:[36,36],title:c.adv_name||c.pubkey_prefix,locationEditable:false,activatable:true};
    });
    for(const id of this.__nodesMapMarkerElements.keys()){
      if(!active.has(id))this.__nodesMapMarkerElements.delete(id);
    }
    return locations;
  }

  async __waitForLegacyLeaflet(map) {
    if(!map || !("layers" in map))return false;
    for(let i=0;i<40;i++){
      if(map.leafletMap && map.Leaflet)return true;
      await new Promise((resolve)=>setTimeout(resolve,75));
      if(!map.isConnected)return false;
    }
    return !!(map.leafletMap && map.Leaflet);
  }

  __traceMonitorStorageKey(contact=this.__traceMonitorContact) {
    const entry=String(this.__entryId()||"default").replace(/[^a-zA-Z0-9_.-]/g,"_");
    const key=String(contact?.public_key||contact?.pubkey_prefix||"unknown").toLowerCase().replace(/[^a-z0-9]/g,"");
    return "hivefw.trace_monitor.v1."+entry+"."+key;
  }

  __loadTraceMonitorSamples(contact) {
    try{
      const parsed=JSON.parse(localStorage.getItem(this.__traceMonitorStorageKey(contact))||"[]");
      return Array.isArray(parsed)?parsed.slice(-100):[];
    }catch{return [];}
  }

  __saveTraceMonitorSamples() {
    try{
      localStorage.setItem(
        this.__traceMonitorStorageKey(),
        JSON.stringify(this.__traceMonitorSamples.slice(-100))
      );
    }catch{}
  }

  __clearTraceMonitorSamples() {
    this.__traceMonitorSamples=[];
    try{localStorage.removeItem(this.__traceMonitorStorageKey());}catch{}
    this.__renderTraceMonitorOverlay();
  }

  __stopTraceMonitor() {
    if(this.__traceMonitorTimer){
      window.clearInterval(this.__traceMonitorTimer);
      this.__traceMonitorTimer=null;
    }
    this.__traceMonitorRunning=false;
    this.__traceMonitorBusy=false;
  }

  __closeTraceMonitor() {
    this.__stopTraceMonitor();
    this.__traceMonitorOverlay?.remove();
    this.__traceMonitorOverlay=null;
  }

  async __runTraceMonitorSample() {
    const contact=this.__traceMonitorContact;
    if(!this.hass||!contact||this.__traceMonitorBusy)return;
    if(!contact.added_to_node){
      this.__traceMonitorSamples.push({timestamp:Date.now(),error:"Contacto não adicionado"});
      this.__renderTraceMonitorOverlay();
      return;
    }
    const prefix=String(contact.pubkey_prefix||String(contact.public_key||"").slice(0,12));
    if(!prefix)return;
    this.__traceMonitorBusy=true;
    this.__renderTraceMonitorOverlay();
    try{
      const msg={type:"hivefw_integration/trace",pubkey_prefix:prefix};
      const entryId=this.__entryId();
      if(entryId)msg.entry_id=entryId;
      const result=await this.hass.callWS(msg);
      this.__traceMonitorSamples.push({
        timestamp:Date.now(),
        round_trip_ms:Number(result?.round_trip_ms||0),
        hops:Number(result?.hops||0),
        final_snr:result?.final_snr==null?null:Number(result.final_snr),
        result,
      });
      if(this.__traceMonitorSamples.length>100)this.__traceMonitorSamples=this.__traceMonitorSamples.slice(-100);
      this.__saveTraceMonitorSamples();
      this.__recordTraceResult(result,contact,"monitor");
    }catch(error){
      this.__traceMonitorSamples.push({
        timestamp:Date.now(),
        error:error?.message||error?.code||String(error),
      });
      if(this.__traceMonitorSamples.length>100)this.__traceMonitorSamples=this.__traceMonitorSamples.slice(-100);
      this.__saveTraceMonitorSamples();
    }finally{
      this.__traceMonitorBusy=false;
      this.__renderTraceMonitorOverlay();
    }
  }

  __startTraceMonitor() {
    if(this.__traceMonitorRunning||!this.__traceMonitorContact)return;
    this.__traceMonitorRunning=true;
    void this.__runTraceMonitorSample();
    const ms=Math.max(120,Number(this.__traceMonitorInterval)||300)*1000;
    this.__traceMonitorTimer=window.setInterval(()=>void this.__runTraceMonitorSample(),ms);
    this.__renderTraceMonitorOverlay();
  }

  __traceMonitorChart(samples,key) {
    const values=samples
      .filter((sample)=>!sample.error&&sample?.[key]!=null&&Number.isFinite(Number(sample[key])))
      .map((sample)=>({t:sample.timestamp,v:Number(sample[key])}));
    return this.__sparklineSvg(values);
  }

  __renderTraceMonitorOverlay() {
    const overlay=this.__traceMonitorOverlay;
    if(!overlay)return;
    const dialog=overlay.querySelector(".hive-trace-monitor-dialog");
    if(!dialog)return;
    dialog.replaceChildren();
    const contact=this.__traceMonitorContact;

    const header=document.createElement("div");
    header.style.cssText="display:flex;align-items:center;gap:8px;padding:14px 16px;border-bottom:1px solid var(--divider-color,#ddd);";
    const title=document.createElement("div");
    title.textContent="Trace Monitor · "+String(contact?.adv_name||contact?.pubkey_prefix||"Nó");
    title.style.cssText="flex:1;font-size:16px;font-weight:700;";
    const close=document.createElement("button");
    close.type="button";close.textContent="✕";close.title="Fechar";
    close.style.cssText="width:30px;height:30px;border:0;border-radius:50%;background:transparent;color:inherit;font-size:17px;cursor:pointer;";
    close.addEventListener("click",()=>this.__closeTraceMonitor());
    header.append(title,close);dialog.appendChild(header);

    const note=document.createElement("div");
    note.style.cssText="padding:10px 16px 4px;font-size:10px;line-height:1.45;color:var(--secondary-text-color,#777);";
    note.textContent="On-demand: cada amostra executa um Trace HiveFW e pode usar path discovery/flood. O monitor só corre enquanto esta janela estiver aberta; mínimo 2 minutos.";
    dialog.appendChild(note);

    const controls=document.createElement("div");
    controls.style.cssText="display:flex;align-items:center;gap:8px;padding:8px 16px 11px;";
    const select=document.createElement("select");
    select.style.cssText="padding:7px 9px;border:1px solid var(--divider-color,#ccc);border-radius:7px;background:var(--card-background-color,#fff);color:inherit;font:inherit;font-size:12px;";
    for(const [seconds,label] of [[120,"2 min"],[300,"5 min"],[600,"10 min"],[1800,"30 min"]]){
      const option=document.createElement("option");option.value=String(seconds);option.textContent=label;option.selected=Number(seconds)===Number(this.__traceMonitorInterval);select.appendChild(option);
    }
    select.disabled=this.__traceMonitorRunning;
    select.addEventListener("change",()=>{this.__traceMonitorInterval=Number(select.value)||300;});
    const toggle=document.createElement("button");
    toggle.type="button";toggle.textContent=this.__traceMonitorRunning?"Parar":"Iniciar";
    toggle.style.cssText="padding:7px 12px;border:1px solid var(--primary-color,#03a9f4);border-radius:7px;background:var(--primary-color,#03a9f4);color:#fff;font-size:12px;font-weight:700;cursor:pointer;";
    toggle.addEventListener("click",()=>{
      if(this.__traceMonitorRunning){this.__stopTraceMonitor();this.__renderTraceMonitorOverlay();}
      else this.__startTraceMonitor();
    });
    const one=document.createElement("button");
    one.type="button";one.textContent=this.__traceMonitorBusy?"A medir…":"Medir agora";one.disabled=this.__traceMonitorBusy;
    one.style.cssText="padding:7px 12px;border:1px solid var(--divider-color,#ccc);border-radius:7px;background:var(--card-background-color,#fff);color:inherit;font-size:12px;font-weight:600;cursor:pointer;";
    one.addEventListener("click",()=>void this.__runTraceMonitorSample());
    const clearHistory=document.createElement("button");
    clearHistory.type="button";clearHistory.textContent="Limpar histórico";
    clearHistory.style.cssText="padding:7px 9px;border:1px solid var(--divider-color,#ccc);border-radius:7px;background:var(--card-background-color,#fff);color:inherit;font-size:10px;cursor:pointer;";
    clearHistory.addEventListener("click",()=>this.__clearTraceMonitorSamples());
    const count=document.createElement("span");
    count.textContent=this.__traceMonitorSamples.length+" amostras";
    count.style.cssText="margin-left:auto;font-size:10px;color:var(--secondary-text-color,#777);";
    controls.append(select,toggle,one,clearHistory,count);dialog.appendChild(controls);

    if(!contact?.added_to_node){
      const warning=document.createElement("div");
      warning.textContent="Este nó precisa de estar Adicionado antes de poder executar Trace Monitor.";
      warning.style.cssText="margin:0 16px 10px;padding:9px;border-radius:7px;background:rgba(255,152,0,.12);font-size:11px;";
      dialog.appendChild(warning);
      toggle.disabled=true;one.disabled=true;
    }

    const good=this.__traceMonitorSamples.filter((sample)=>!sample.error);
    if(good.length){
      const charts=document.createElement("div");
      charts.style.cssText="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;padding:0 16px 10px;";
      for(const [label,key,unit] of [["RTT","round_trip_ms","ms"],["SNR final","final_snr","dB"]]){
        const valid=good.filter((sample)=>sample[key]!=null&&Number.isFinite(Number(sample[key])));
        if(!valid.length)continue;
        const card=document.createElement("div");card.style.cssText="padding:9px;border-radius:8px;background:var(--secondary-background-color,#f5f5f5);";
        const latest=Number(valid[valid.length-1][key]);
        const head=document.createElement("div");head.textContent=label+" · "+latest.toFixed(key==="round_trip_ms"?0:1)+" "+unit;head.style.cssText="font-size:11px;font-weight:650;";
        card.append(head,this.__traceMonitorChart(valid,key));charts.appendChild(card);
      }
      dialog.appendChild(charts);
    }

    const list=document.createElement("div");
    list.style.cssText="overflow:auto;max-height:330px;padding:0 16px 14px;";
    for(const sample of [...this.__traceMonitorSamples].reverse()){
      const row=document.createElement("div");
      row.style.cssText="display:grid;grid-template-columns:145px 1fr;gap:8px;padding:7px 4px;border-top:1px solid var(--divider-color,#e5e5e5);font-size:11px;";
      const when=document.createElement("span");when.textContent=new Date(sample.timestamp).toLocaleString();when.style.color="var(--secondary-text-color,#777)";
      const value=document.createElement("span");
      value.textContent=sample.error
        ? "Erro: "+sample.error
        : String(sample.round_trip_ms)+" ms · "+String(sample.hops)+" hops"+(sample.final_snr!=null&&Number.isFinite(Number(sample.final_snr))?" · SNR "+Number(sample.final_snr).toFixed(1)+" dB":"");
      if(sample.error)value.style.color="var(--error-color,#db4437)";
      row.append(when,value);list.appendChild(row);
    }
    if(!this.__traceMonitorSamples.length){
      const empty=document.createElement("div");empty.textContent="Ainda sem amostras.";empty.style.cssText="padding:18px;text-align:center;color:var(--secondary-text-color,#777);font-size:11px;";list.appendChild(empty);
    }
    dialog.appendChild(list);
  }

  __openTraceMonitor(contact) {
    this.__closeTraceMonitor();
    this.__traceMonitorContact=contact;
    this.__traceMonitorSamples=this.__loadTraceMonitorSamples(contact);
    this.__traceMonitorInterval=300;
    const overlay=document.createElement("div");
    overlay.id="hive-trace-monitor-overlay";
    overlay.style.cssText="position:fixed;inset:0;z-index:10070;background:rgba(0,0,0,.48);display:grid;place-items:center;padding:18px;box-sizing:border-box;";
    const dialog=document.createElement("div");
    dialog.className="hive-trace-monitor-dialog";
    dialog.style.cssText="width:min(720px,100%);max-height:min(86vh,800px);display:flex;flex-direction:column;background:var(--card-background-color,#fff);color:var(--primary-text-color,#222);border-radius:12px;box-shadow:0 10px 34px rgba(0,0,0,.28);overflow:hidden;";
    overlay.appendChild(dialog);
    overlay.addEventListener("click",(event)=>{if(event.target===overlay)this.__closeTraceMonitor();});
    this.shadowRoot?.appendChild(overlay);
    this.__traceMonitorOverlay=overlay;
    this.__renderTraceMonitorOverlay();
  }

  __fullPublicKey(contact) {
    const readKey=(value)=>{
      if(value && typeof value==="object"){
        value=value.hex ?? value.public_key ?? value.key ?? "";
      }
      const key=String(value||"").trim().replace(/[^0-9a-f]/gi,"").toLowerCase();
      return /^[0-9a-f]{64}$/.test(key)?key:"";
    };
    for(const value of [contact?.public_key,contact?.pubkey,contact?.publicKey,contact?.key]){
      const key=readKey(value);
      if(key)return key;
    }

    const prefix=String(contact?.pubkey_prefix||contact?.pubkey||"")
      .trim().replace(/[^0-9a-f]/gi,"").toLowerCase();
    const name=this.__normalizeNodeName(contact?.adv_name||contact?.name);
    const source=[
      ...(Array.isArray(this.__nodesMapContacts)?this.__nodesMapContacts:[]),
      ...(Array.isArray(this._contacts)?this._contacts:[]),
    ];
    const matches=source.filter((candidate)=>{
      if(candidate===contact)return false;
      const key=readKey(candidate?.public_key)||readKey(candidate?.pubkey)||readKey(candidate?.publicKey);
      const cp=String(candidate?.pubkey_prefix||key.slice(0,12))
        .trim().replace(/[^0-9a-f]/gi,"").toLowerCase();
      if(prefix && (key.startsWith(prefix)||cp===prefix||prefix.startsWith(cp)))return true;
      return !!name && this.__normalizeNodeName(candidate?.adv_name||candidate?.name)===name;
    }).map((candidate)=>
      readKey(candidate?.public_key)||readKey(candidate?.pubkey)||readKey(candidate?.publicKey)
    ).filter(Boolean);
    if(matches.length===1)return matches[0];

    const deviceKey=readKey(this._selectedDevice?.pubkey)||readKey(this._selectedDevice?.public_key);
    if(contact?.__hivefw_local__ && deviceKey)return deviceKey;
    return "";
  }

  __nodeMapPopup(contact) {
    const root=document.createElement("div");
    root.style.minWidth="300px";
    root.style.maxWidth="410px";
    root.style.fontFamily="var(--paper-font-body1_-_font-family, sans-serif)";
    root.style.color="#202124";
    root.style.background="#eef0f2";
    root.style.borderRadius="9px";
    root.style.padding="0 2px 2px";

    const header=document.createElement("div");
    header.style.cssText="display:flex;align-items:center;gap:10px;padding-top:14px;margin-bottom:8px;";

    const title=document.createElement("div");
    title.textContent=String(contact.adv_name||contact.pubkey_prefix||"Nó");
    title.style.cssText="flex:1;min-width:0;font-weight:700;font-size:15px;line-height:1.25;overflow-wrap:anywhere;";
    header.appendChild(title);

    const publicKeyForAction=this.__fullPublicKey(contact);
    const hasRealKey=/^[0-9a-fA-F]{64}$/.test(publicKeyForAction);
    if(hasRealKey){
      const meta=this.__nodeMeta(contact);
      const favorite=document.createElement("button");
      favorite.type="button";
      favorite.textContent=meta.favorite?"★":"☆";
      favorite.title=meta.favorite?"Remover dos favoritos":"Adicionar aos favoritos";
      favorite.setAttribute("aria-label",favorite.title);
      favorite.style.cssText="flex:0 0 auto;width:30px;height:30px;padding:0;border:1px solid var(--divider-color,#ccc);border-radius:7px;background:var(--card-background-color,#fff);color:var(--warning-color,#ff9800);font-size:18px;line-height:1;cursor:pointer;";
      favorite.addEventListener("click",(event)=>{
        event.preventDefault();event.stopPropagation();
        this.__setNodeMeta(contact,{favorite:!meta.favorite});
      });
      header.appendChild(favorite);
    }
    if(!contact.__hivefw_local__ && hasRealKey){
      const added=!!contact.added_to_node;
      const contactAction=document.createElement("button");
      contactAction.type="button";
      contactAction.textContent=added?"👤 Remover":"👤 Adicionar";
      contactAction.title=added?"Remover dos contactos adicionados":"Adicionar aos contactos";
      contactAction.style.cssText=added
        ?"flex:0 0 auto;padding:6px 9px;border:1px solid var(--error-color,#db4437);border-radius:7px;background:var(--card-background-color,#fff);color:var(--error-color,#db4437);font-size:11px;font-weight:650;white-space:nowrap;cursor:pointer;"
        :"flex:0 0 auto;padding:6px 9px;border:1px solid var(--primary-color,#03a9f4);border-radius:7px;background:var(--card-background-color,#fff);color:var(--primary-color,#03a9f4);font-size:11px;font-weight:650;white-space:nowrap;cursor:pointer;";
      contactAction.addEventListener("click",(event)=>{
        event.preventDefault();
        event.stopPropagation();
        if(contactAction.disabled)return;
        contactAction.disabled=true;
        contactAction.style.opacity=".65";
        contactAction.textContent=added?"A remover…":"A adicionar…";
        const page=this.shadowRoot?.querySelector("meshcore-nodes-page");
        page?.dispatchEvent(new CustomEvent("node-action",{
          detail:{action:added?"remove-contact":"add-contact",node:contact},
          bubbles:true,
          composed:true,
        }));
      });
      header.appendChild(contactAction);
    }

    root.appendChild(header);

    if(hasRealKey){
      const meta=this.__nodeMeta(contact);
      const tagRow=document.createElement("div");
      tagRow.style.cssText="display:flex;align-items:center;flex-wrap:wrap;gap:5px;margin:-2px 0 8px;";
      for(const tag of meta.tags){
        const chip=document.createElement("button");
        chip.type="button";
        chip.textContent="#"+tag+" ×";
        chip.title="Remover tag "+tag;
        chip.style.cssText="padding:3px 6px;border:1px solid var(--divider-color,#ccc);border-radius:999px;background:var(--secondary-background-color,#f5f5f5);color:var(--secondary-text-color,#666);font-size:10px;cursor:pointer;";
        chip.addEventListener("click",(event)=>{
          event.preventDefault();event.stopPropagation();
          this.__setNodeMeta(contact,{tags:meta.tags.filter((value)=>value!==tag)});
        });
        tagRow.appendChild(chip);
      }
      root.appendChild(tagRow);
    }

    const typeLabels={0:"Client/Unknown",1:"Client",2:"Repeater",3:"Room Server",4:"Sensor"};
    const rows=[];
    if(contact.__hivefw_local){
      rows.push(["Tipo","Repeater local"]);
    }else{
      rows.push(["Tipo",typeLabels[Number(contact.type)]||`Tipo ${Number(contact.type)||0}`]);
      rows.push(["Estado",contact.added_to_node?"Adicionado":"Descoberto"]);
    }

    const publicKey=this.__fullPublicKey(contact);
    const prefix=String(contact.pubkey_prefix||contact.pubkey||publicKey.slice(0,12)||"").trim();
    if(prefix && prefix!=="LOCAL")rows.push(["Prefixo",prefix]);

    const rssi=Number(contact.last_rssi ?? contact.rssi);
    const snr=Number(contact.last_snr ?? contact.snr);
    if(Number.isFinite(rssi))rows.push(["RSSI",`${rssi} dBm`]);
    if(Number.isFinite(snr))rows.push(["SNR",`${snr} dB`]);

    const formatElapsed=(seconds)=>{
      const total=Math.max(0,Math.floor(Number(seconds)||0));
      if(total<60)return total+" s";
      if(total<3600)return Math.floor(total/60)+" min";
      if(total<86400){
        const hours=Math.floor(total/3600);
        const minutes=Math.floor((total%3600)/60);
        return hours+" h"+(minutes?" "+minutes+" min":"");
      }
      const days=Math.floor(total/86400);
      const hours=Math.floor((total%86400)/3600);
      return days+" d"+(hours?" "+hours+" h":"");
    };

    const lastAdvert=Number(contact.last_advert||0);
    if(lastAdvert>0){
      const date=new Date(lastAdvert*1000);
      if(!Number.isNaN(date.getTime())){
        const ageSeconds=(Date.now()-date.getTime())/1000;
        rows.push([
          "Último advert",
          date.toLocaleString()+"\nHá "+formatElapsed(ageSeconds)
        ]);
      }
    }

    const lastmod=Number(contact.lastmod ?? contact.last_modified ?? 0);
    if(lastmod>0){
      const date=new Date(lastmod*1000);
      if(!Number.isNaN(date.getTime()))rows.push(["Criado localmente",date.toLocaleString()]);
    }

    const lat=Number(contact.adv_lat ?? contact.latitude);
    const lon=Number(contact.adv_lon ?? contact.longitude);
    if(Number.isFinite(lat)&&Number.isFinite(lon)&&!(lat===0&&lon===0)){
      rows.push(["Localização",`${lat.toFixed(6)}, ${lon.toFixed(6)}`]);
    }

    const flags=Number(contact.flags);
    if(Number.isFinite(flags)){
      rows.push(["Flags",`0x${Math.trunc(flags).toString(16).padStart(2,"0").toUpperCase()} (${Math.trunc(flags)})`]);
    }

    const storedPath=this.__meshcoreExportPath(contact);
    let pathHops=Number(contact.out_path_len);
    if(!Number.isInteger(pathHops)||pathHops<0){
      pathHops=storedPath?storedPath.split(",").filter(Boolean).length:0;
    }

    let hashMode=Number(contact.out_path_hash_mode ?? contact.path_hash_mode);
    if(!Number.isInteger(hashMode)||hashMode<0||hashMode>2){
      const first=storedPath.split(",").find(Boolean)||"";
      hashMode=first.length===2?0:first.length===4?1:first.length===6?2:-1;
    }

    if(storedPath){
      rows.push(["Path guardado",storedPath]);
      rows.push(["Hops",String(pathHops)]);
      if(hashMode>=0){
        rows.push(["Path Hash",`${hashMode+1} byte${hashMode===0?"":"s"}`]);
      }
    }

    const makeRow=(label,value,mono=false)=>{
      const row=document.createElement("div");
      row.style.display="grid";
      row.style.gridTemplateColumns="112px minmax(0,1fr)";
      row.style.gap="9px";
      row.style.fontSize="12px";
      row.style.lineHeight="1.45";
      row.style.padding="2px 0";

      const key=document.createElement("span");
      key.textContent=label;
      key.style.color="#202124";
      key.style.fontWeight="650";

      const val=document.createElement("span");
      val.textContent=String(value);
      val.style.fontWeight="500";
      val.style.color="#202124";
      val.style.whiteSpace="pre-line";
      val.style.minWidth="0";
      val.style.overflowWrap="anywhere";
      if(mono)val.style.fontFamily="ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

      row.append(key,val);
      return row;
    };

    for(const [label,value] of rows){
      root.appendChild(makeRow(label,value,label==="Path guardado"||label==="Prefixo"));
    }

    if(publicKey && publicKey!=="__hivefw_local__"){
      const details=document.createElement("details");
      details.style.marginTop="5px";
      const summary=document.createElement("summary");
      summary.textContent="Chave pública";
      summary.style.cssText="cursor:pointer;font-size:11px;color:#4d5156;";
      const key=document.createElement("div");
      key.textContent=publicKey;
      key.style.cssText="margin-top:5px;padding:6px 7px;border-radius:6px;background:#dde1e5;color:#202124;font:10px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;overflow-wrap:anywhere;";
      details.append(summary,key);
      root.appendChild(details);
    }

    const copyText=[
      String(contact.adv_name||contact.pubkey_prefix||"Nó"),
      ...rows.map(([label,value])=>`${label}: ${value}`),
      ...(publicKey&&publicKey!=="__hivefw_local__"?[`Chave pública: ${publicKey}`]:[])
    ].join("\n");

    const actions=document.createElement("div");
    actions.style.cssText="display:flex;gap:7px;margin-top:11px;";

    if(!contact.__hivefw_local__ && prefix && Number(contact.type)!==1){
      const trace=document.createElement("button");
      trace.type="button";
      trace.textContent="Trace";
      trace.style.cssText="flex:1;padding:7px 9px;border:1px solid var(--primary-color,#03a9f4);border-radius:6px;background:var(--primary-color,#03a9f4);color:#fff;font-size:12px;font-weight:650;cursor:pointer;";
      trace.addEventListener("click",(event)=>{
        event.preventDefault();
        event.stopPropagation();
        const page=this.shadowRoot?.querySelector("meshcore-nodes-page");
        page?.dispatchEvent(new CustomEvent("node-action",{
          detail:{action:"trace",node:contact},
          bubbles:true,
          composed:true,
        }));
      });
      actions.appendChild(trace);

      if(contact.added_to_node){
        const monitor=document.createElement("button");
        monitor.type="button";monitor.textContent="Monitor";monitor.title="Trace Monitor on-demand";
        monitor.style.cssText="flex:1;padding:7px 9px;border:1px solid var(--divider-color,#bbb);border-radius:6px;background:var(--card-background-color,#fff);color:var(--primary-color,#03a9f4);font-size:12px;font-weight:650;cursor:pointer;";
        monitor.addEventListener("click",(event)=>{event.preventDefault();event.stopPropagation();this.__openTraceMonitor(contact);});
        actions.appendChild(monitor);
      }
    }

    const copy=document.createElement("button");
    copy.type="button";
    copy.textContent="Copiar texto";
    copy.style.cssText="flex:1;padding:7px 9px;border:1px solid var(--divider-color,#bbb);border-radius:6px;background:var(--card-background-color,#fff);color:var(--primary-text-color,#333);font-size:12px;font-weight:600;cursor:pointer;";
    copy.addEventListener("click",async(event)=>{
      event.preventDefault();
      event.stopPropagation();
      const original=copy.textContent;
      try{
        if(navigator.clipboard?.writeText){
          await navigator.clipboard.writeText(copyText);
        }else{
          const area=document.createElement("textarea");
          area.value=copyText;
          area.style.position="fixed";
          area.style.opacity="0";
          document.body.appendChild(area);
          area.focus();
          area.select();
          document.execCommand("copy");
          area.remove();
        }
        copy.textContent="Copiado";
      }catch{
        copy.textContent="Não foi possível copiar";
      }
      window.setTimeout(()=>{
        if(copy.isConnected)copy.textContent=original;
      },1200);
    });
    actions.appendChild(copy);
    root.appendChild(actions);

    const close=document.createElement("button");
    close.type="button";
    close.textContent="Fechar";
    close.style.cssText="width:100%;margin-top:7px;padding:7px 9px;border:1px solid var(--divider-color,#bbb);border-radius:6px;background:var(--card-background-color,#fff);color:var(--primary-text-color,#212121);font-size:12px;font-weight:600;cursor:pointer;";
    close.addEventListener("click",(event)=>{
      event.preventDefault();
      event.stopPropagation();
      this.__closePersistentNodePopup();
    });
    root.appendChild(close);

    return root;
  }

  __legacyLeafletLayers(map,contacts,page) {
    const L=map?.Leaflet;
    if(!L)return [];
    this.__nodesLeafletMarkers.clear();
    return contacts.map((contact)=>{
      const coords=this.__nodeCoords(contact);
      if(!coords)return null;
      const isLocal=!!contact.__hivefw_local;
      const id=this.__nodeId(contact);
      const name=String(contact.adv_name||contact.pubkey_prefix||"Nó");
      const age=String(contact?.age_bucket|| (isLocal?"lt1h":"stale"));
      const ageColors={
        lt1h:"#2e7d32",
        lt6h:"#66a832",
        lt24h:"#f9a825",
        lt7d:"#ef6c00",
        stale:"#757575",
      };
      const markerColor=ageColors[age]||ageColors.stale;
      const markerIcon=L.divIcon?.({
        className:"hivefw-node-age-marker",
        html:'<span style="display:block;width:14px;height:14px;border-radius:50%;background:'+markerColor+';border:'+(isLocal?'3px solid var(--primary-color,#03a9f4)':'2px solid white')+';box-shadow:0 1px 4px rgba(0,0,0,.5)"></span>',
        iconSize:[18,18],
        iconAnchor:[9,9],
      });
      const marker=L.marker(coords,{title:name,keyboard:true,riseOnHover:true,zIndexOffset:isLocal?1000:0,...(markerIcon?{icon:markerIcon}:{})});
      const meta=this.__nodeMeta(contact);
      const tagText=meta.tags.length?" · "+meta.tags.map((tag)=>"#"+tag).join(" "):"";
      const tooltipName=(meta.favorite?"★ ":"")+name+(isLocal?" · local":"")+tagText;
      marker.bindTooltip?.(tooltipName,{
        direction:"top",
        offset:[0,-12],
        permanent:isLocal,
        className:"hivefw-map-tooltip",
      });
      marker.on?.("click",()=>{
        this.__focusNodeOnMap(contact,true);
      });
      if(id)this.__nodesLeafletMarkers.set(id,marker);
      return marker;
    }).filter(Boolean);
  }

  __closePersistentNodePopup() {
    const popup=this.__nodesPersistentPopup;
    const map=this.__nodesMapElement?.leafletMap;
    if(popup && map){
      try{ map.removeLayer(popup); }catch{}
    }
    this.__nodesPersistentPopup=null;
    this.__nodesPopupId="";
  }

  __openPersistentNodePopup(contact) {
    const mapEl=this.__nodesMapElement;
    const map=mapEl?.leafletMap;
    const L=mapEl?.Leaflet;
    const coords=this.__nodeCoords(contact);
    if(!map||!L||!coords)return false;

    this.__closePersistentNodePopup();

    const id=this.__nodeId(contact);
    const popup=L.popup({
      autoPan:true,
      autoClose:false,
      closeOnClick:false,
      closeButton:false,
      minWidth:320,
      maxWidth:440,
      className:"hivefw-node-popup",
      offset:[0,-10],
    })
      .setLatLng(coords)
      .setContent(this.__nodeMapPopup(contact));

    popup.on?.("remove",()=>{
      if(this.__nodesPersistentPopup===popup){
        this.__nodesPersistentPopup=null;
        this.__nodesPopupId="";
      }
    });

    popup.addTo(map);
    this.__nodesPersistentPopup=popup;
    this.__nodesPopupId=id;
    return true;
  }

  __resetNodesMapView() {
    const map=this.__nodesMapElement?.leafletMap;
    const saved=this.__nodesInitialViewport;
    if(!map||!saved)return false;
    this.__closePersistentNodePopup();
    map.setView([saved.lat,saved.lng],saved.zoom,{animate:true});
    return true;
  }

  async __applyInitialNodesMapView(localRepeater) {
    const mapEl=this.__nodesMapElement;
    if(!mapEl||!localRepeater)return false;
    if(!await this.__waitForLegacyLeaflet(mapEl))return false;

    const coords=this.__nodeCoords(localRepeater);
    if(!coords)return false;

    const bounds=mapEl.Leaflet.circle(coords,{radius:100000}).getBounds();
    mapEl.leafletMap.fitBounds(bounds,{animate:false});

    const center=mapEl.leafletMap.getCenter?.();
    const zoom=mapEl.leafletMap.getZoom?.();
    if(center && Number.isFinite(center.lat) && Number.isFinite(center.lng) && Number.isFinite(zoom)){
      this.__nodesInitialViewport={lat:center.lat,lng:center.lng,zoom};
    }
    return true;
  }

  async __ensureSplitMap(page,pane) {
    if(!pane?.isConnected)return;
    const entryId=this.__entryId()||null;
    if(!this.__repeaterStatus && !this.__repeaterLoading){
      await this.__loadRepeaterStatus();
    }
    if(!Array.isArray(this.__nodesMapContacts)||this.__nodesMapLoadedEntry!==entryId){
      if(!pane.querySelector(".hive-map-note")){
        const note=document.createElement("div");
        note.className="hive-map-note";
        note.textContent="A carregar nós…";
        pane.appendChild(note);
      }
      await this.__loadNodesMapContacts();
    }

    const ready=await this.__ensureMapLoaded();
    if(!pane.isConnected)return;

    const source=Array.isArray(this.__nodesMapContacts)?this.__nodesMapContacts:[];
    const contacts=this.__validMapContacts();
    const localRepeater=this.__localRepeaterMapContact();
    const localId=localRepeater?this.__nodeId(localRepeater):"";
    const mapContacts=localRepeater
      ? [localRepeater,...contacts.filter((contact)=>this.__nodeId(contact)!==localId)]
      : contacts;

    if(!ready){
      if(!this.__nodesMapElement?.isConnected){
        pane.replaceChildren();
        const note=document.createElement("div");
        note.className="hive-map-note";
        note.textContent="Não foi possível carregar o mapa do Home Assistant.";
        pane.appendChild(note);
      }
      return;
    }

    if(!contacts.length){
      if(!this.__nodesMapElement?.isConnected){
        pane.replaceChildren();
        const note=document.createElement("div");
        note.className="hive-map-note";
        note.textContent=`0 nós com localização · ${source.length} nós no total. Os nós sem GPS anunciado permanecem na lista.`;
        pane.appendChild(note);
      }
      return;
    }

    if(!this.__nodesMapElement?.isConnected){
      pane.replaceChildren();

      const count=document.createElement("div");
      count.className="hive-map-count";
      pane.appendChild(count);

      const map=document.createElement("ha-map");
      map.autoFit=false;
      map.clusterMarkers=true;
      map.scaleRuler=true;
      map.themeMode="light";
      map.addEventListener("editable-location-clicked",(e)=>{
        const id=e.detail?.id;
        const contact=this.__validMapContacts().find((c)=>this.__nodeId(c)===id);
        if(contact){
          this.__focusNodeOnMap(contact);
        }
      });
      pane.appendChild(map);
      this.__nodesMapElement=map;
      this.__nodesMapSignature="";
    }

    const signature=mapContacts.map((c)=>{
      const p=this.__nodeCoords(c);
      const meta=this.__nodeMeta(c); return `${this.__nodeId(c)}:${p?.[0]}:${p?.[1]}:${c?.map_entity_id||""}:${String(c?.adv_name||"")}:${c?.__hivefw_local?1:0}:${meta.favorite?1:0}:${meta.tags.join(",")}`;
    }).join("|");

    const count=pane.querySelector(".hive-map-count");
    if(count){
      count.replaceChildren();
      const label=document.createElement("span");
      label.textContent=`${contacts.length} nós com localização - `;
      const center=document.createElement("button");
      center.type="button";
      center.textContent="CENTRAR";
      center.title="Centrar no repetidor local";
      center.addEventListener("click",(event)=>{
        event.preventDefault();
        event.stopPropagation();

        const local=this.__localRepeaterMapContact();
        if(!local)return;

        const id=this.__nodeId(local);
        const marker=this.__nodesLeafletMarkers.get(id);

        // This is intentionally the same operation as clicking the actual
        // local contact marker. Because "local" is now the real discovered
        // contact, its marker id/coordinates are the same ones shown on map.
        if(marker?.fire){
          marker.fire("click");
          return;
        }
        this.__focusNodeOnMap(local,true);
      });
      count.append(label,center);
    }

    // Home Assistant 2026.9's ha-map has no editableLocations API yet.
    // It does expose Leaflet layers, so use real Leaflet markers there.
    // Newer HA builds are feature-detected and use editableLocations/entities.
    if(this.__nodesMapSignature!==signature){
      const map=this.__nodesMapElement;
      if("layers" in map && await this.__waitForLegacyLeaflet(map)){
        map.entities=[];
        map.layers=this.__legacyLeafletLayers(map,mapContacts,page);
      }else{
        map.entities=this.__mapEntities(mapContacts);
        if("editableLocations" in map){
          map.editableLocations=this.__mapLocations(mapContacts);
        }
      }
      this.__nodesMapSignature=signature;
    }

    if(localRepeater && this.__nodesMapInitialViewEntry!==entryId){
      if(await this.__applyInitialNodesMapView(localRepeater)){
        this.__nodesMapInitialViewEntry=entryId;
      }
    }
    this.__drawLastTraceRoute();
  }

  __focusNodeOnMap(contact,openPopup=true) {
    const coords=this.__nodeCoords(contact);
    const pane=this.__nodesMapPane;
    if(!coords||!pane||!this.__nodesMapElement)return;

    const id=this.__nodeId(contact);
    this.__nodesMapFocusId=id;

    const selected=pane.querySelector(".hive-map-selection");
    if(selected)selected.hidden=true;

    const contacts=this.__validMapContacts();
    const map=this.__nodesMapElement;
    if(map.leafletMap){
      map.leafletMap.setView(coords,12,{animate:true});
      if(openPopup){
        const marker=this.__nodesLeafletMarkers.get(id);
        marker?.setZIndexOffset?.(2000);
        window.setTimeout(()=>{
          this.__openPersistentNodePopup(contact);
        },180);
      }
    }else if(!("layers" in map)){
      map.entities=this.__mapEntities(contacts);
      if("editableLocations" in map)map.editableLocations=this.__mapLocations(contacts);
      map.setView?.(coords,12);
    }
  }

    __settingsSelect(label, options, value) {
    const field = document.createElement("div");
    field.className = "hive-settings-field";
    const l = document.createElement("label");
    l.textContent = label;
    const select = document.createElement("select");
    for (const [v, text] of options) {
      const option = document.createElement("option");
      option.value = v;
      option.textContent = text;
      option.selected = v === value;
      select.appendChild(option);
    }
    field.append(l, select);
    return { field, select };
  }

  __settingsNumber(label, value, step) {
    const field = document.createElement("div");
    field.className = "hive-settings-field";
    const l = document.createElement("label");
    l.textContent = label;
    const input = document.createElement("input");
    input.type = "number";
    input.step = step;
    input.value = String(value ?? "");
    field.append(l, input);
    return { field, input };
  }

  async __loadRepeaterStatus() {
    if (!this.hass || this.__repeaterLoading) return;

    this.__repeaterLoading = true;
    this.__repeaterError = null;
    this.__rerenderRepeater();

    try {
      const msg = { type: "hivefw_integration/get_local_repeater_status" };
      const entryId = this.__entryId();
      if (entryId) msg.entry_id = entryId;

      this.__repeaterStatus = await this.hass.callWS(msg);
      this.__repeaterStatusLoadedAt = Date.now();
      this.__seedRepeaterEdit(this.__repeaterStatus);
    } catch (error) {
      this.__repeaterError =
        error?.message || "Não foi possível carregar o estado do Repeater.";
    } finally {
      this.__repeaterLoading = false;
      this.__rerenderRepeater();
    }
  }

  async __refreshRepeaterConfig() {
    if (!this.hass || this.__repeaterLoading) return;

    // Clear the current view first so this cannot look like a cosmetic refresh.
    // get_local_repeater_status performs fresh APPSTART, DEVICE_INFO,
    // CUSTOM_VARS, RF and auth reads from the radio.
    this.__repeaterStatus = null;
    this.__repeaterEdit = {};
    this.__repeaterMessage = null;
    this.__repeaterError = null;
    this.__rerenderRepeater();

    await this.__loadRepeaterStatus();

    if (!this.__repeaterError) {
      this.__repeaterMessage =
        "Configuração relida diretamente do rádio.";
      this.__rerenderRepeater();
    }
  }

  __smartAdvertRemainingSeconds() {
    const smart = this.__repeaterStatus?.smart_advert;
    if (!smart?.supported || !smart?.enabled) return null;

    const elapsed = this.__repeaterStatusLoadedAt
      ? Math.max(0, (Date.now() - this.__repeaterStatusLoadedAt) / 1000)
      : 0;

    const remaining = Number(smart.remaining_seconds);
    if (Number.isFinite(remaining)) {
      return Math.max(0, remaining - elapsed);
    }

    const nextEpoch = Number(smart.next_epoch);
    const clockEpoch = Number(this.__repeaterStatus?.clock?.timestamp);
    if (Number.isFinite(nextEpoch) && Number.isFinite(clockEpoch)) {
      return Math.max(0, nextEpoch - clockEpoch - elapsed);
    }

    return null;
  }

  __formatSmartAdvertCountdown(seconds) {
    if (!Number.isFinite(seconds)) return "—";
    if (seconds <= 5) return "A enviar…";

    const totalMinutes = Math.max(1, Math.ceil(seconds / 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours <= 0) return minutes + " min";
    return hours + "h " + String(minutes).padStart(2, "0") + "m";
  }

  __updateSmartAdvertCountdown() {
    const remaining = this.__smartAdvertRemainingSeconds();
    const statusHost = this.shadowRoot?.querySelector("meshcore-status-page");
    const statusRoot = statusHost?.shadowRoot;
    const summary = statusRoot?.querySelector("meshcore-node-summary");
    const tile = summary?.shadowRoot?.querySelector(
      '.hero-tile[data-repeater-extra="smart-advert"]'
    );
    const primary = tile?.querySelector(".hero-tile-value .primary");

    if (primary) {
      const smart = this.__repeaterStatus?.smart_advert;
      primary.textContent = smart?.enabled
        ? this.__formatSmartAdvertCountdown(remaining)
        : "Off";
    }

    // Once the countdown reaches the slot, refresh local Companion status so
    // the card picks up the newly persisted last/next epochs. This is local
    // transport only and creates no LoRa traffic.
    if (
      this._activeTab === "state" &&
      Number.isFinite(remaining) &&
      remaining <= 0 &&
      !this.__repeaterLoading
    ) {
      void this.__loadRepeaterStatus();
    }
  }

  __startSmartAdvertCountdown() {
    if (this.__smartAdvertCountdownTimer) return;
    this.__smartAdvertCountdownTimer = window.setInterval(
      () => this.__updateSmartAdvertCountdown(),
      30000
    );
    queueMicrotask(() => this.__updateSmartAdvertCountdown());
  }

  __stopSmartAdvertCountdown() {
    if (!this.__smartAdvertCountdownTimer) return;
    window.clearInterval(this.__smartAdvertCountdownTimer);
    this.__smartAdvertCountdownTimer = null;
  }

  __seedRepeaterEdit(status) {
    if (!status) return;
    const radio = status.radio || {};
    const location = status.location || {};
    const tuning = status.tuning || {};
    const routing = status.routing || {};
    const radioGuard = status.radio_guard || {};
    const serverAuth = status.server_auth || {};

    this.__repeaterEdit = {
      repeat: !!status.repeat,
      mesh_time_sync: !!status.mesh_time_sync,
      frequency: radio.frequency,
      bandwidth: radio.bandwidth,
      spreading_factor: radio.spreading_factor,
      coding_rate: radio.coding_rate,
      tx_power: radio.tx_power,
      path_hash_mode: radio.path_hash_mode ?? 0,
      multi_acks: Number(radio.multi_acks ?? 0),
      rx_delay: tuning.rx_delay ?? 0,
      airtime_factor: tuning.airtime_factor ?? 0,
      flood_max: Number(routing.flood_max ?? 64),
      flood_max_unscoped: Number(routing.flood_max_unscoped ?? 64),
      flood_max_advert: Number(routing.flood_max_advert ?? 8),
      loop_detect: Number(routing.loop_detect ?? 0),
      cad_enabled: !!radioGuard.cad_enabled,
      interference_threshold: Number(radioGuard.interference_threshold ?? 0),
      agc_reset_interval: Number(radioGuard.agc_reset_interval ?? 0),
      repeater_rx_delay: Number(radioGuard.rx_delay ?? tuning.rx_delay ?? 0),
      flood_tx_delay: Number(radioGuard.flood_tx_delay ?? 0.5),
      direct_tx_delay: Number(radioGuard.direct_tx_delay ?? 0.3),
      admin_password: "",
      guest_password: "",
      admin_password_set: !!serverAuth.admin_password_set,
      guest_password_set: !!serverAuth.guest_password_set,
      latitude: location.latitude ?? 0,
      longitude: location.longitude ?? 0,
    };
  }

  async __saveRepeaterSettings(settings, successText) {
    if (!this.hass) return;
    this.__repeaterMessage = null;
    this.__repeaterError = null;
    this.__repeaterLoading = true;
    this.__rerenderRepeater();

    try {
      const msg = {
        type: "hivefw_integration/set_device_config",
        settings,
      };
      const entryId = this.__entryId();
      if (entryId) msg.entry_id = entryId;
      await this.hass.callWS(msg);

      this.__repeaterMessage = successText;
      this.__repeaterStatus = null;
    } catch (error) {
      this.__repeaterError = error?.message || "Não foi possível aplicar a configuração.";
    } finally {
      this.__repeaterLoading = false;
      this.__rerenderRepeater();
      if (!this.__repeaterError) {
        await this.__loadRepeaterStatus();
      }
    }
  }

  __ensureConsoleOverlay(container) {
    let overlay = container.querySelector(".hivefw-console-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "hivefw-console-overlay";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      container.appendChild(overlay);
    }
    this.__consoleOverlay = overlay;
    return overlay;
  }

  __removeConsoleOverlay() {
    if (this.__consoleOverlay?.isConnected) this.__consoleOverlay.remove();
    this.__consoleOverlay = null;
  }

  __formatConsoleResponse(value) {
    if (value == null) return "(sem resposta)";
    if (typeof value === "string") return value;
    try { return JSON.stringify(value, null, 2); }
    catch (_) { return String(value); }
  }

  async __loadConsoleHistory() {
    if (!this.hass) return;
    try {
      const msg = { type: "hivefw_integration/console_get" };
      const entryId = this.__entryId();
      if (entryId) msg.entry_id = entryId;
      const result = await this.hass.callWS(msg);
      this.__consoleHistory = Array.isArray(result?.history) ? result.history : [];
      this.__consoleCommandHistory = this.__consoleHistory
        .map((item) => String(item?.command || "").trim())
        .filter(Boolean)
        .slice(-50);
      this.__consoleHistoryIndex = this.__consoleCommandHistory.length;
      this.__consoleError = null;
    } catch (error) {
      this.__consoleError = error?.message || "Não foi possível carregar o histórico da Consola.";
    }
    if (this.__consoleOverlay?.isConnected) {
      this.__renderConsole(this.__consoleOverlay, true);
    }
  }

  async __runConsoleCommand(command) {
    const raw = String(command || "").trim();
    if (!raw || !this.hass || this.__consoleBusy) return;
    this.__consoleBusy = true;
    this.__consoleError = null;
    if (this.__consoleOverlay) this.__renderConsole(this.__consoleOverlay);

    try {
      const msg = {
        type: "hivefw_integration/console_execute",
        command: raw,
      };
      const entryId = this.__entryId();
      if (entryId) msg.entry_id = entryId;
      const result = await this.hass.callWS(msg);
      if (!result?.success && result?.response) {
        this.__consoleError = this.__formatConsoleResponse(result.response);
      }
      await this.__loadConsoleHistory();
    } catch (error) {
      this.__consoleError = error?.message || "Falha ao executar o comando.";
    } finally {
      this.__consoleBusy = false;
      if (this.__consoleOverlay?.isConnected) {
        this.__renderConsole(this.__consoleOverlay, true);
      }
    }
  }

  async __clearConsole() {
    if (!this.hass || this.__consoleBusy) return;
    this.__consoleBusy = true;
    try {
      const msg = { type: "hivefw_integration/console_clear" };
      const entryId = this.__entryId();
      if (entryId) msg.entry_id = entryId;
      await this.hass.callWS(msg);
      this.__consoleHistory = [];
      this.__consoleError = null;
    } catch (error) {
      this.__consoleError = error?.message || "Não foi possível limpar a Consola.";
    } finally {
      this.__consoleBusy = false;
      if (this.__consoleOverlay?.isConnected) {
        this.__renderConsole(this.__consoleOverlay, true);
      }
    }
  }

  __renderConsole(container, embedded = container?.classList?.contains("hive-console-settings-host")) {
    container.replaceChildren();

    const page = document.createElement("div");
    page.className = "hivefw-console-page" + (embedded ? " hivefw-console-embedded" : "");
    const wrap = document.createElement("div");
    wrap.className = "hivefw-console-wrap";
    page.appendChild(wrap);
    container.appendChild(page);

    const layout = document.createElement("div");
    layout.className = "hivefw-console-layout";
    const leftColumn = document.createElement("div");
    leftColumn.className = "hivefw-console-column";
    const rightColumn = document.createElement("div");
    rightColumn.className = "hivefw-console-column";
    if (embedded) layout.append(rightColumn);
    else layout.append(leftColumn, rightColumn);
    wrap.appendChild(layout);

    if (!embedded) {
      const hero = document.createElement("section");
      hero.className = "mcr-hero hivefw-console-description";
      const heading = document.createElement("div");
      const eyebrow = document.createElement("div");
      eyebrow.className = "mcr-eyebrow";
      eyebrow.textContent = "⌨  HIVEFW · CONSOLA";
      const title = document.createElement("h1");
      title.className = "mcr-title";
      title.textContent = "Consola";
      const subtitle = document.createElement("p");
      subtitle.className = "mcr-subtitle";
      subtitle.textContent =
        "Executa comandos diretamente no rádio ligado ao Home Assistant. Os comandos locais não geram tráfego LoRa, exceto quando o próprio comando envia dados para a mesh.";
      heading.append(eyebrow, title, subtitle);
      hero.appendChild(heading);
      leftColumn.appendChild(hero);
    }

    // Reuse the exact command catalogue that powered the former Device
    // "Issue Command" dialog. This keeps one source of truth for command
    // names, categories, parameters and danger flags.
    const presetCard = document.createElement("section");
    presetCard.className = "hivefw-console-card";
    const presetTitle = document.createElement("div");
    presetTitle.className = embedded ? "hivefw-console-section-title" : "mcr-card-title";
    presetTitle.textContent = "Comandos pré-definidos";

    const commandElement = document.createElement("meshcore-command-dialog");
    commandElement.isLocal = true;
    const definitions = typeof commandElement._getCommands === "function"
      ? commandElement._getCommands()
      : [];

    const presetSelect = document.createElement("select");
    presetSelect.className = "hivefw-console-input";
    presetSelect.style.cssText = "flex:1 1 100%;width:100%;max-width:100%;min-width:0;";
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Selecionar comando…";
    presetSelect.appendChild(placeholder);

    const groups = new Map();
    for (const def of definitions) {
      const category = String(def?.category || "Outros");
      if (!groups.has(category)) groups.set(category, []);
      groups.get(category).push(def);
    }
    for (const [category, defs] of groups) {
      const group = document.createElement("optgroup");
      group.label = category;
      for (const def of defs) {
        const option = document.createElement("option");
        option.value = def.name;
        option.textContent = def.name + " — " + (def.description || "");
        option.selected = def.name === this.__consolePresetName;
        group.appendChild(option);
      }
      presetSelect.appendChild(group);
    }

    const presetBody = document.createElement("div");
    presetBody.style.marginTop = "10px";

    const renderPreset = () => {
      presetBody.replaceChildren();
      const selected = definitions.find((def) => def.name === this.__consolePresetName);
      if (!selected) return;

      const desc = document.createElement("div");
      desc.className = "hivefw-console-hint";
      desc.textContent = selected.description || "";
      desc.style.marginBottom = "10px";
      presetBody.appendChild(desc);

      if (selected.dangerous) {
        const warning = document.createElement("div");
        warning.className = "hivefw-console-error";
        warning.style.cssText += "padding:8px 10px;border:1px solid currentColor;border-radius:8px;margin:0 0 10px;";
        warning.textContent = "⚠ " + (selected.dangerMessage || "Este comando pode alterar permanentemente a configuração do rádio.");
        presetBody.appendChild(warning);
      }

      const params = Array.isArray(selected.params) ? selected.params : [];
      const fields = document.createElement("div");
      fields.className = "hive-settings-controls";

      for (const param of params) {
        const field = document.createElement("label");
        field.className = "hive-settings-field";
        const label = document.createElement("span");
        label.textContent = (param.label || param.name) + (param.required ? " *" : "");
        field.appendChild(label);

        let input;
        if (param.type === "boolean") {
          input = document.createElement("select");
          for (const [value, text] of [["false","False"],["true","True"]]) {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = text;
            input.appendChild(option);
          }
          const existing = this.__consolePresetValues[param.name];
          input.value = String(existing ?? param.default ?? false);
        } else if (param.type === "select") {
          input = document.createElement("select");
          const opts = Array.isArray(param.selectOptions) && param.selectOptions.length
            ? param.selectOptions
            : (param.options || []).map((value) => ({ label: String(value), value }));
          for (const opt of opts) {
            const option = document.createElement("option");
            option.value = String(opt.value);
            option.textContent = String(opt.label);
            input.appendChild(option);
          }
          const existing = this.__consolePresetValues[param.name];
          input.value = String(existing ?? param.default ?? (opts[0]?.value ?? ""));
        } else if (param.type === "bitmask") {
          input = document.createElement("input");
          input.type = "number";
          input.min = "0";
          input.value = String(this.__consolePresetValues[param.name] ?? param.default ?? 0);
        } else {
          input = document.createElement("input");
          input.type = param.type === "number" ? "number" : "text";
          if (param.min != null) input.min = String(param.min);
          if (param.max != null) input.max = String(param.max);
          input.value = String(this.__consolePresetValues[param.name] ?? param.default ?? "");
        }

        input.style.cssText = "box-sizing:border-box;width:100%;min-height:38px;border:1px solid var(--divider-color);border-radius:8px;padding:8px;background:var(--secondary-background-color);color:var(--primary-text-color);font:inherit;font-size:12px;";
        if (param.description) input.title = param.description;
        input.addEventListener("input", () => {
          let value = input.value;
          if (param.type === "number" || param.type === "bitmask") {
            value = value === "" ? "" : Number(value);
          } else if (param.type === "boolean") {
            value = value === "true";
          } else if (param.type === "select" && Array.isArray(param.selectOptions)) {
            const found = param.selectOptions.find((opt) => String(opt.value) === input.value);
            value = found ? found.value : input.value;
          }
          this.__consolePresetValues[param.name] = value;
        });
        field.appendChild(input);

        if (param.description) {
          const help = document.createElement("span");
          help.className = "hivefw-console-hint";
          help.textContent = param.description;
          field.appendChild(help);
        }
        fields.appendChild(field);
      }

      if (params.length) presetBody.appendChild(fields);

      const runPreset = document.createElement("button");
      runPreset.type = "button";
      runPreset.className = embedded ? "hivefw-console-action primary" : "mcr-btn primary";
      runPreset.style.marginTop = "10px";
      runPreset.textContent = "Executar comando";
      runPreset.disabled = this.__consoleBusy;
      runPreset.addEventListener("click", () => {
        const parts = [selected.name];
        for (const param of params) {
          let value = this.__consolePresetValues[param.name];
          if (value === undefined) value = param.default;
          if ((value === undefined || value === "") && param.required) {
            this.__consoleError = "Preenche o parâmetro obrigatório: " + (param.label || param.name);
            this.__renderConsole(container);
            return;
          }
          if (value === undefined || value === "") continue;
          if (typeof value === "string") {
            const escaped = value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
            parts.push(/[\s"']/u.test(value) ? '"' + escaped + '"' : escaped);
          } else if (typeof value === "boolean") {
            parts.push(value ? "true" : "false");
          } else {
            parts.push(String(value));
          }
        }
        void this.__runConsoleCommand(parts.join(" "));
      });
      presetBody.appendChild(runPreset);
    };

    presetSelect.addEventListener("change", () => {
      this.__consolePresetName = presetSelect.value;
      this.__consolePresetValues = {};
      const selected = definitions.find((def) => def.name === this.__consolePresetName);
      for (const param of selected?.params || []) {
        if (param.default !== undefined) this.__consolePresetValues[param.name] = param.default;
      }
      renderPreset();
    });

    presetCard.append(presetTitle, presetSelect, presetBody);
    if (!embedded) leftColumn.appendChild(presetCard);
    renderPreset();

    const commandCard = document.createElement("section");
    commandCard.className = "hivefw-console-card";
    const inputTitle = document.createElement("div");
    inputTitle.className = embedded ? "hivefw-console-section-title" : "mcr-card-title";
    inputTitle.textContent = "Comando livre";
    const row = document.createElement("div");
    row.className = "hivefw-console-input-row";
    const input = document.createElement("input");
    input.className = "hivefw-console-input";
    input.type = "text";
    input.placeholder = 'Ex.: get_bat   ·   set_tx_power 20   ·   set_name "HiveFW"';
    input.autocomplete = "off";
    input.spellcheck = false;
    input.disabled = this.__consoleBusy;
    const run = document.createElement("button");
    run.className = embedded ? "hivefw-console-action primary" : "mcr-btn primary";
    run.type = "button";
    run.textContent = this.__consoleBusy ? "A executar…" : "Executar";
    run.disabled = this.__consoleBusy;
    const execute = () => {
      const command = input.value.trim();
      if (!command) return;
      input.value = "";
      void this.__runConsoleCommand(command);
    };
    run.addEventListener("click", execute);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        execute();
        return;
      }
      if (event.key === "ArrowUp" && this.__consoleCommandHistory.length) {
        event.preventDefault();
        this.__consoleHistoryIndex = Math.max(
          0,
          Math.min(this.__consoleHistoryIndex - 1, this.__consoleCommandHistory.length - 1),
        );
        input.value = this.__consoleCommandHistory[this.__consoleHistoryIndex] || "";
        input.setSelectionRange(input.value.length, input.value.length);
        return;
      }
      if (event.key === "ArrowDown" && this.__consoleCommandHistory.length) {
        event.preventDefault();
        this.__consoleHistoryIndex = Math.min(
          this.__consoleCommandHistory.length,
          this.__consoleHistoryIndex + 1,
        );
        input.value = this.__consoleHistoryIndex >= this.__consoleCommandHistory.length
          ? ""
          : (this.__consoleCommandHistory[this.__consoleHistoryIndex] || "");
        input.setSelectionRange(input.value.length, input.value.length);
      }
    });
    row.append(input, run);
    const hint = document.createElement("div");
    hint.className = "hivefw-console-hint";
    hint.textContent =
      "A Consola usa o parser nativo do HiveFW. Comandos destrutivos ou de configuração são executados exatamente como escritos; usa-os apenas quando pretendes alterar o rádio.";
    commandCard.append(inputTitle, row, hint);
    if (this.__consoleError) {
      const error = document.createElement("div");
      error.className = "hivefw-console-error";
      error.textContent = this.__consoleError;
      commandCard.appendChild(error);
    }
    // Appended below the History pane so the right side behaves like a console.

    const outputCard = document.createElement("section");
    outputCard.className = "hivefw-console-card";
    const toolbar = document.createElement("div");
    toolbar.className = "hivefw-console-toolbar";
    const outputTitle = document.createElement("div");
    outputTitle.className = embedded ? "hivefw-console-section-title" : "mcr-card-title";
    outputTitle.textContent = "Histórico";
    outputTitle.style.marginRight = "auto";
    const refresh = document.createElement("button");
    refresh.className = embedded ? "hivefw-console-action" : "mcr-btn";
    refresh.type = "button";
    refresh.textContent = "Atualizar";
    refresh.disabled = this.__consoleBusy;
    refresh.addEventListener("click", () => void this.__loadConsoleHistory());
    const clear = document.createElement("button");
    clear.className = embedded ? "hivefw-console-action danger" : "mcr-btn danger";
    clear.type = "button";
    clear.textContent = "Limpar";
    clear.disabled = this.__consoleBusy || this.__consoleHistory.length === 0;
    clear.addEventListener("click", () => void this.__clearConsole());
    toolbar.append(outputTitle, refresh, clear);

    const output = document.createElement("div");
    output.className = "hivefw-console-output";
    if (!this.__consoleHistory.length) {
      const empty = document.createElement("div");
      empty.className = "hivefw-console-empty";
      empty.textContent = "Ainda não existem comandos nesta sessão do rádio.";
      output.appendChild(empty);
    } else {
      for (const item of this.__consoleHistory) {
        const entry = document.createElement("div");
        entry.className = "hivefw-console-entry" + (item?.is_error ? " error" : "");
        const cmd = document.createElement("div");
        cmd.className = "hivefw-console-command";
        const stamp = document.createElement("span");
        stamp.className = "hivefw-console-time";
        const ts = Number(item?.timestamp || 0);
        stamp.textContent = ts
          ? new Date(ts * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
          : "--:--:--";
        cmd.append(stamp, document.createTextNode("> " + String(item?.command || "")));
        const response = document.createElement("div");
        response.className = "hivefw-console-response";
        response.textContent = this.__formatConsoleResponse(item?.response);
        entry.append(cmd, response);
        output.appendChild(entry);
      }
    }

    outputCard.append(toolbar, output);
    if (embedded) {
      rightColumn.append(commandCard, presetCard, outputCard);
    } else {
      rightColumn.append(outputCard, commandCard);
    }
    requestAnimationFrame(() => { output.scrollTop = output.scrollHeight; });
  }

    async __executeLocal(command, args, successText) {
    if (!this.hass) return;

    this.__repeaterMessage = null;
    this.__repeaterError = null;
    this.__repeaterLoading = true;
    this.__rerenderRepeater();

    try {
      const msg = {
        type: "hivefw_integration/execute_local",
        command,
      };
      if (args) msg.args = args;
      const entryId = this.__entryId();
      if (entryId) msg.entry_id = entryId;

      await this.hass.callWS(msg);
      this.__repeaterMessage = successText;
    } catch (error) {
      this.__repeaterError = error?.message || `Falha ao executar ${command}.`;
    } finally {
      this.__repeaterLoading = false;
      this.__rerenderRepeater();
    }
  }

  __rerenderRepeater() {
    if (this._activeTab === "state") this.__enhanceStatePage();
    if (this._activeTab === "settings") this.__enhanceSettingsPage();
  }

  __renderRepeater(container) {
    container.replaceChildren();

    const page = document.createElement("div");
    page.className = "mcr-page";
    const wrap = document.createElement("div");
    wrap.className = "mcr-wrap";
    page.appendChild(wrap);
    container.appendChild(page);

    const hero = document.createElement("section");
    hero.className = "mcr-hero";

    const heading = document.createElement("div");
    const eyebrow = document.createElement("div");
    eyebrow.className = "mcr-eyebrow";
    eyebrow.textContent = "◉  HIVEFW · REPEATER";
    const title = document.createElement("h1");
    title.className = "mcr-title";
    title.textContent = "Repeater";
    const subtitle = document.createElement("p");
    subtitle.className = "mcr-subtitle";
    subtitle.textContent =
      "Estado e configuração do Repeater integrado no Companion. Todas as leituras e alterações desta página usam a ligação local ao rádio — não geram tráfego LoRa na mesh.";

    heading.append(eyebrow, title, subtitle);

    if (this.__repeaterStatus) {
      const badge = document.createElement("div");
      badge.className = `mcr-badge ${this.__repeaterStatus.repeat ? "on" : "off"}`;
      const dot = document.createElement("span");
      dot.className = "mcr-dot";
      const label = document.createElement("span");
      label.textContent = this.__repeaterStatus.repeat
        ? "Repeater ativo"
        : "Repeater desligado";
      badge.append(dot, label);
      heading.appendChild(badge);
    }

    const refresh = document.createElement("button");
    refresh.className = "mcr-btn";
    refresh.disabled = this.__repeaterLoading;
    refresh.textContent = this.__repeaterLoading ? "A atualizar…" : "↻ Atualizar";
    refresh.addEventListener("click", () => void this.__refreshRepeaterConfig());

    hero.append(heading, refresh);
    wrap.appendChild(hero);

    if (this.__repeaterError) {
      const msg = document.createElement("div");
      msg.className = "mcr-message error";
      msg.textContent = this.__repeaterError;
      wrap.appendChild(msg);
    } else if (this.__repeaterMessage) {
      const msg = document.createElement("div");
      msg.className = "mcr-message ok";
      msg.textContent = this.__repeaterMessage;
      wrap.appendChild(msg);
    }

    if (this.__repeaterLoading && !this.__repeaterStatus) {
      wrap.appendChild(this.__state(
        "A carregar",
        "A consultar o Companion e as estatísticas locais do rádio."
      ));
      return;
    }

    const status = this.__repeaterStatus;
    if (!status) return;

    if (!status.supported) {
      wrap.appendChild(this.__state(
        "Modo Repeater não exposto",
        "O rádio respondeu, mas esta versão do Companion Protocol não anuncia suporte ao modo Repeater integrado."
      ));
      return;
    }

    const core = status.stats?.core || {};
    const radioStats = status.stats?.radio || {};
    const packets = status.stats?.packets || {};
    const batteryMv = core.battery_mv ?? status.battery?.level;

    const metrics = document.createElement("section");
    metrics.className = "mcr-grid";
    metrics.append(
      this.__metric(
        "Bateria",
        batteryMv != null ? `${(Number(batteryMv) / 1000).toFixed(2)} V` : "—",
        status.battery?.total_kb
          ? `Storage ${status.battery.used_kb ?? 0}/${status.battery.total_kb} KB`
          : ""
      ),
      this.__metric(
        "Uptime",
        core.uptime_secs != null ? this.__duration(core.uptime_secs) : "—",
        core.queue_len != null ? `Fila: ${core.queue_len}` : ""
      ),
      this.__metric(
        "Último sinal",
        radioStats.last_rssi != null ? `${radioStats.last_rssi} dBm` : "—",
        radioStats.last_snr != null ? `SNR ${Number(radioStats.last_snr).toFixed(1)} dB` : ""
      ),
      this.__metric(
        "Noise floor",
        radioStats.noise_floor != null ? `${radioStats.noise_floor} dBm` : "—",
        status.firmware ? `FW ${status.firmware}` : ""
      )
    );
    wrap.appendChild(metrics);

    const columns = document.createElement("div");
    columns.className = "mcr-columns";

    columns.append(
      this.__renderModeCard(status),
      this.__renderRadioCard(status),
      this.__renderFloodLoopCard(status),
      this.__renderRadioGuardCard(status),
      this.__renderServerAccessCard(status),
      this.__renderRoutingCard(status),
      this.__renderStatsCard(status),
      this.__renderLocationCard(status),
      this.__renderActionsCard(status),
      this.__renderLimitationsCard()
    );

    wrap.appendChild(columns);
  }

  __renderModeCard(status) {
    const card = this.__card(
      "Modo Repeater",
      "Ativa ou desativa a função de repetição mantendo o equipamento como Companion."
    );

    const row = document.createElement("div");
    row.className = "mcr-mode-row";

    const info = document.createElement("div");
    const name = document.createElement("div");
    name.className = "mcr-mode-name";
    name.textContent = status.repeat ? "Ativo" : "Desligado";
    const help = document.createElement("div");
    help.className = "mcr-mode-help";
    help.textContent = status.repeat
      ? "O Companion anuncia-se também como Repeater."
      : "O Companion funciona apenas no modo normal.";
    info.append(name, help);

    const toggle = document.createElement("label");
    toggle.className = "mcr-switch";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = !!this.__repeaterEdit.repeat;
    input.disabled = this.__repeaterLoading;
    input.addEventListener("change", () => {
      this.__repeaterEdit.repeat = input.checked;
    });
    const slider = document.createElement("span");
    toggle.append(input, slider);

    row.append(info, toggle);
    card.appendChild(row);

    const actions = document.createElement("div");
    actions.className = "mcr-actions";
    const save = this.__button("Aplicar modo", "primary");
    save.disabled = this.__repeaterLoading;
    save.addEventListener("click", () => {
      void this.__saveRepeaterSettings(
        { repeat: !!this.__repeaterEdit.repeat },
        this.__repeaterEdit.repeat
          ? "Modo Repeater ativado."
          : "Modo Repeater desligado."
      );
    });
    actions.appendChild(save);
    card.appendChild(actions);

    return card;
  }

  __renderRadioCard(status) {
    const card = this.__card(
      "Rádio",
      "Parâmetros RF equivalentes à parte principal do Repeater Setup."
    );

    const grid = document.createElement("div");
    grid.className = "mcr-form-grid";

    const freq = this.__numberField(
      "Frequência (MHz)",
      this.__repeaterEdit.frequency,
      "0.001",
      (v) => this.__repeaterEdit.frequency = v
    );
    const bw = this.__selectField(
      "Bandwidth (kHz)",
      [7.8,10.4,15.6,20.8,31.25,41.7,62.5,125,250,500],
      this.__repeaterEdit.bandwidth,
      (v) => this.__repeaterEdit.bandwidth = Number(v)
    );
    const sf = this.__selectField(
      "Spreading Factor",
      [7,8,9,10,11,12],
      this.__repeaterEdit.spreading_factor,
      (v) => this.__repeaterEdit.spreading_factor = Number(v)
    );
    const cr = this.__selectField(
      "Coding Rate",
      [5,6,7,8],
      this.__repeaterEdit.coding_rate,
      (v) => this.__repeaterEdit.coding_rate = Number(v)
    );
    const tx = this.__numberField(
      "TX Power (dBm)",
      this.__repeaterEdit.tx_power,
      "1",
      (v) => this.__repeaterEdit.tx_power = v
    );
    const path = this.__selectField(
      "Path Hash",
      [
        { value: 0, label: "0 · 1 byte" },
        { value: 1, label: "1 · 2 bytes" },
        { value: 2, label: "2 · 3 bytes" },
      ],
      this.__repeaterEdit.path_hash_mode,
      (v) => this.__repeaterEdit.path_hash_mode = Number(v)
    );

    grid.append(freq, bw, sf, cr, tx, path);
    card.appendChild(grid);

    const actions = document.createElement("div");
    actions.className = "mcr-actions";
    const save = this.__button("Guardar rádio", "primary");
    save.disabled = this.__repeaterLoading;
    save.addEventListener("click", () => {
      void this.__saveRepeaterSettings(
        {
          frequency: Number(this.__repeaterEdit.frequency),
          bandwidth: Number(this.__repeaterEdit.bandwidth),
          spreading_factor: Number(this.__repeaterEdit.spreading_factor),
          coding_rate: Number(this.__repeaterEdit.coding_rate),
          tx_power: Number(this.__repeaterEdit.tx_power),
          path_hash_mode: Number(this.__repeaterEdit.path_hash_mode),
        },
        "Configuração de rádio aplicada."
      );
    });
    actions.appendChild(save);
    card.appendChild(actions);

    const note = document.createElement("div");
    note.className = "mcr-note";
    note.textContent =
      "Confirma sempre que frequência e potência respeitam a configuração da tua rede e os limites regulamentares aplicáveis.";
    card.appendChild(note);

    return card;
  }

  __renderFloodLoopCard(status) {
    const routing = status.routing || {};
    const card = this.__card(
      "Flood Limits & Loop Detect",
      "Proteções de encaminhamento equivalentes ao simple_repeater oficial. 0 num Flood Limit bloqueia esse tipo de flood."
    );

    if (!routing.supported) {
      const note = document.createElement("div");
      note.className = "mcr-note";
      note.textContent =
        "Esta versão do firmware não expõe ainda a configuração de Flood Limits / Loop Detect.";
      card.appendChild(note);
      return card;
    }

    const grid = document.createElement("div");
    grid.className = "mcr-form-grid";

    grid.append(
      this.__numberField(
        "Flood max",
        this.__repeaterEdit.flood_max,
        "1",
        (v) => this.__repeaterEdit.flood_max = Number(v)
      ),
      this.__numberField(
        "Flood max · unscoped",
        this.__repeaterEdit.flood_max_unscoped,
        "1",
        (v) => this.__repeaterEdit.flood_max_unscoped = Number(v)
      ),
      this.__numberField(
        "Flood max · advert",
        this.__repeaterEdit.flood_max_advert,
        "1",
        (v) => this.__repeaterEdit.flood_max_advert = Number(v)
      ),
      this.__selectField(
        "Loop Detect",
        [
          { value: 0, label: "Off" },
          { value: 1, label: "Minimal" },
          { value: 2, label: "Moderate" },
          { value: 3, label: "Strict" },
        ],
        this.__repeaterEdit.loop_detect,
        (v) => this.__repeaterEdit.loop_detect = Number(v)
      )
    );

    card.appendChild(grid);

    const actions = document.createElement("div");
    actions.className = "mcr-actions";
    const save = this.__button("Guardar routing", "primary");
    save.disabled = this.__repeaterLoading;
    save.addEventListener("click", () => {
      void this.__saveRepeaterSettings(
        {
          flood_max: Number(this.__repeaterEdit.flood_max),
          flood_max_unscoped: Number(this.__repeaterEdit.flood_max_unscoped),
          flood_max_advert: Number(this.__repeaterEdit.flood_max_advert),
          loop_detect: Number(this.__repeaterEdit.loop_detect),
        },
        "Flood Limits e Loop Detect atualizados."
      );
    });
    actions.appendChild(save);
    card.appendChild(actions);

    const note = document.createElement("div");
    note.className = "mcr-note";
    note.textContent =
      "Defaults MeshCore: Flood 64 · Unscoped 64 · Advert 8 · Loop Detect Off. Os limites contam hashes/hops já presentes no path.";
    card.appendChild(note);

    return card;
  }


  __renderRadioGuardCard(status) {
    const guard = status.radio_guard || {};
    const card = this.__card(
      "CAD / Interference / AGC & Delays",
      "Controlo de acesso ao canal e temporizações equivalentes ao simple_repeater atual. As alterações aplicam-se sem reboot."
    );

    if (!guard.supported) {
      const note = document.createElement("div");
      note.className = "mcr-note";
      note.textContent =
        "Esta versão do firmware ainda não expõe a configuração RF avançada.";
      card.appendChild(note);
      return card;
    }

    const grid = document.createElement("div");
    grid.className = "mcr-form-grid";
    grid.append(
      this.__selectField(
        "CAD",
        [
          { value: 0, label: "Off" },
          { value: 1, label: "On" },
        ],
        this.__repeaterEdit.cad_enabled ? 1 : 0,
        (v) => this.__repeaterEdit.cad_enabled = Number(v) === 1
      ),
      this.__numberField(
        "Interference threshold",
        this.__repeaterEdit.interference_threshold,
        "1",
        (v) => this.__repeaterEdit.interference_threshold = Number(v)
      ),
      this.__numberField(
        "AGC reset · segundos",
        this.__repeaterEdit.agc_reset_interval,
        "4",
        (v) => this.__repeaterEdit.agc_reset_interval = Number(v)
      ),
      this.__numberField(
        "RX delay",
        this.__repeaterEdit.repeater_rx_delay,
        "0.001",
        (v) => this.__repeaterEdit.repeater_rx_delay = Number(v)
      ),
      this.__numberField(
        "Flood TX delay",
        this.__repeaterEdit.flood_tx_delay,
        "0.001",
        (v) => this.__repeaterEdit.flood_tx_delay = Number(v)
      ),
      this.__numberField(
        "Direct TX delay",
        this.__repeaterEdit.direct_tx_delay,
        "0.001",
        (v) => this.__repeaterEdit.direct_tx_delay = Number(v)
      )
    );
    card.appendChild(grid);

    const actions = document.createElement("div");
    actions.className = "mcr-actions";
    const save = this.__button("Guardar RF avançado", "primary");
    save.disabled = this.__repeaterLoading;
    save.addEventListener("click", () => {
      void this.__saveRepeaterSettings(
        {
          cad_enabled: !!this.__repeaterEdit.cad_enabled,
          interference_threshold: Number(this.__repeaterEdit.interference_threshold),
          agc_reset_interval: Number(this.__repeaterEdit.agc_reset_interval),
          rx_delay: Number(this.__repeaterEdit.repeater_rx_delay),
          flood_tx_delay: Number(this.__repeaterEdit.flood_tx_delay),
          direct_tx_delay: Number(this.__repeaterEdit.direct_tx_delay),
        },
        "CAD, interference, AGC e delays atualizados."
      );
    });
    actions.appendChild(save);
    card.appendChild(actions);

    const note = document.createElement("div");
    note.className = "mcr-note";
    note.textContent =
      "Defaults HiveFW/simple_repeater: CAD Off · interference 0 · AGC 0 s · RX delay 0 · Flood TX 0.5 · Direct TX 0.3. AGC é arredondado para baixo em passos de 4 s.";
    card.appendChild(note);

    return card;
  }


  __renderServerAccessCard(status) {
    const auth = status.server_auth || {};
    const card = this.__card(
      "Acesso remoto Repeater",
      "Servidor de login compatível com o simple_repeater. As passwords são write-only e nunca são devolvidas pelo rádio."
    );

    if (!auth.supported) {
      const note = document.createElement("div");
      note.className = "mcr-note";
      note.textContent =
        "Esta versão do firmware ainda não expõe o servidor de login Repeater.";
      card.appendChild(note);
      return card;
    }

    const states = document.createElement("div");
    states.className = "mcr-stat-list";
    for (const [label, value] of [
      ["Admin password", auth.admin_password_set ? "Configurada" : "Não configurada"],
      ["Guest password", auth.guest_password_set ? "Configurada" : "Não configurada"],
      ["Entradas ACL", auth.acl_count ?? "—"],
    ]) {
      const row = document.createElement("div");
      row.className = "mcr-stat";
      const name = document.createElement("div");
      name.className = "mcr-stat-name";
      name.textContent = String(label);
      const current = document.createElement("div");
      current.className = "mcr-stat-value";
      current.textContent = String(value);
      row.append(name, current);
      states.appendChild(row);
    }
    card.appendChild(states);

    const grid = document.createElement("div");
    grid.className = "mcr-form-grid";
    grid.append(
      this.__passwordField(
        "Nova password admin",
        this.__repeaterEdit.admin_password,
        (v) => this.__repeaterEdit.admin_password = v
      ),
      this.__passwordField(
        "Nova password guest",
        this.__repeaterEdit.guest_password,
        (v) => this.__repeaterEdit.guest_password = v
      )
    );
    card.appendChild(grid);

    const actions = document.createElement("div");
    actions.className = "mcr-actions";

    const saveAdmin = this.__button("Guardar admin", "primary");
    saveAdmin.disabled =
      this.__repeaterLoading ||
      !String(this.__repeaterEdit.admin_password || "").length;
    saveAdmin.addEventListener("click", () => {
      void this.__saveRepeaterSettings(
        { admin_password: String(this.__repeaterEdit.admin_password || "") },
        "Password admin atualizada."
      );
    });

    const clearAdmin = this.__button("Limpar admin");
    clearAdmin.disabled = this.__repeaterLoading || !auth.admin_password_set;
    clearAdmin.addEventListener("click", () => {
      if (window.confirm("Desativar a password admin do servidor Repeater?")) {
        void this.__saveRepeaterSettings(
          { admin_password: "" },
          "Password admin removida."
        );
      }
    });

    const saveGuest = this.__button("Guardar guest", "primary");
    saveGuest.disabled =
      this.__repeaterLoading ||
      !String(this.__repeaterEdit.guest_password || "").length;
    saveGuest.addEventListener("click", () => {
      void this.__saveRepeaterSettings(
        { guest_password: String(this.__repeaterEdit.guest_password || "") },
        "Password guest atualizada."
      );
    });

    const clearGuest = this.__button("Limpar guest");
    clearGuest.disabled = this.__repeaterLoading || !auth.guest_password_set;
    clearGuest.addEventListener("click", () => {
      if (window.confirm("Desativar a password guest do servidor Repeater?")) {
        void this.__saveRepeaterSettings(
          { guest_password: "" },
          "Password guest removida."
        );
      }
    });

    const clearAcl = this.__button("Limpar ACL", "danger");
    clearAcl.disabled =
      this.__repeaterLoading || !(Number(auth.acl_count) > 0);
    clearAcl.addEventListener("click", () => {
      if (
        window.confirm(
          "Remover todos os clientes autorizados da ACL Repeater? As passwords configuradas são mantidas."
        )
      ) {
        void this.__saveRepeaterSettings(
          { clear_acl: true },
          "ACL Repeater limpa."
        );
      }
    });

    actions.append(
      saveAdmin,
      clearAdmin,
      saveGuest,
      clearGuest,
      clearAcl
    );
    card.appendChild(actions);

    const note = document.createElement("div");
    note.className = "mcr-note";
    note.textContent =
      "Sem password admin ou guest configurada não são aceites novos logins por essa via. Clientes persistidos na ACL podem voltar a autenticar-se pela sua identidade. Limpar a ACL não altera as passwords.";
    card.appendChild(note);

    return card;
  }


  __renderRoutingCard(status) {
    const card = this.__card(
      "ACKs & Airtime",
      "Parâmetros Companion que permanecem independentes dos controlos RF do Repeater."
    );

    const grid = document.createElement("div");
    grid.className = "mcr-form-grid";

    grid.append(
      this.__selectField(
        "Multi ACKs",
        [
          { value: 0, label: "Desligado" },
          { value: 1, label: "Ligado" },
        ],
        this.__repeaterEdit.multi_acks,
        (v) => this.__repeaterEdit.multi_acks = Number(v)
      ),
      this.__numberField(
        "Airtime factor",
        this.__repeaterEdit.airtime_factor,
        "0.001",
        (v) => this.__repeaterEdit.airtime_factor = v
      )
    );

    card.appendChild(grid);

    const actions = document.createElement("div");
    actions.className = "mcr-actions";
    const save = this.__button("Guardar tuning", "primary");
    save.disabled = this.__repeaterLoading;
    save.addEventListener("click", () => {
      void this.__saveRepeaterSettings(
        {
          multi_acks: Number(this.__repeaterEdit.multi_acks),
          airtime_factor: Number(this.__repeaterEdit.airtime_factor),
        },
        "ACKs e Airtime atualizados."
      );
    });
    actions.appendChild(save);
    card.appendChild(actions);

    return card;
  }

  __renderStatsCard(status) {
    const card = this.__card(
      "Tráfego & RF",
      "Estatísticas locais do rádio; consultar esta secção não usa airtime LoRa."
    );

    const radio = status.stats?.radio || {};
    const packets = status.stats?.packets || {};
    const cad = status.stats?.cad || {};
    const list = document.createElement("div");
    list.className = "mcr-stat-list";

    const values = [
      ["Pacotes RX", packets.recv],
      ["Pacotes TX", packets.sent],
      ["Flood RX", packets.flood_rx],
      ["Flood TX", packets.flood_tx],
      ["Direct RX", packets.direct_rx],
      ["Direct TX", packets.direct_tx],
      ["Erros RX", packets.recv_errors],
      ["Airtime TX", radio.tx_air_secs != null ? this.__duration(radio.tx_air_secs) : null],
      ["Airtime RX", radio.rx_air_secs != null ? this.__duration(radio.rx_air_secs) : null],
      ["CAD timeouts", cad.timeouts],
      ["Recuperações RX", cad.recoveries],
      ["CAD force TX", cad.forced_tx],
      ["TX expirados", cad.expired_tx],
      ["CAD busy máx.", cad.max_busy_ms != null ? `${(Number(cad.max_busy_ms) / 1000).toFixed(1)} s` : null],
      [
        "Último CAD timeout",
        Number(cad.timeouts) > 0 && cad.last_timeout_age_secs != null
          ? `${this.__duration(cad.last_timeout_age_secs)} atrás`
          : null
      ],
    ];

    for (const [label, value] of values) {
      if (value == null) continue;
      const row = document.createElement("div");
      row.className = "mcr-stat";
      const n = document.createElement("div");
      n.className = "mcr-stat-name";
      n.textContent = label;
      const v = document.createElement("div");
      v.className = "mcr-stat-value";
      v.textContent = String(value);
      row.append(n, v);
      list.appendChild(row);
    }

    card.appendChild(list);
    return card;
  }

  __renderLocationCard(status) {
    const card = this.__card(
      "Localização",
      "Coordenadas anunciadas pelo Companion. A alteração é local ao equipamento."
    );

    const grid = document.createElement("div");
    grid.className = "mcr-form-grid";
    grid.append(
      this.__numberField(
        "Latitude",
        this.__repeaterEdit.latitude,
        "0.000001",
        (v) => this.__repeaterEdit.latitude = v
      ),
      this.__numberField(
        "Longitude",
        this.__repeaterEdit.longitude,
        "0.000001",
        (v) => this.__repeaterEdit.longitude = v
      )
    );
    card.appendChild(grid);

    const actions = document.createElement("div");
    actions.className = "mcr-actions";
    const save = this.__button("Guardar localização", "primary");
    save.disabled = this.__repeaterLoading;
    save.addEventListener("click", () => {
      void this.__saveRepeaterSettings(
        {
          latitude: Number(this.__repeaterEdit.latitude),
          longitude: Number(this.__repeaterEdit.longitude),
        },
        "Localização atualizada."
      );
    });
    actions.appendChild(save);
    card.appendChild(actions);

    return card;
  }

  __renderActionsCard(status) {
    const card = this.__card(
      "Ações",
      "Ações rápidas do Companion/Repeater."
    );

    const actions = document.createElement("div");
    actions.className = "mcr-actions";

    const localAdvert = this.__button("Local Advert");
    localAdvert.addEventListener("click", () => {
      void this.__executeLocal("send_advert", undefined, "Local Advert enviado.");
    });

    const floodAdvert = this.__button("Flood Advert");
    floodAdvert.addEventListener("click", () => {
      void this.__executeLocal("send_advert", { flood: true }, "Flood Advert enviado.");
    });

    const clock = this.__button("Sincronizar relógio");
    clock.addEventListener("click", () => {
      void this.__executeLocal(
        "set_time",
        { val: Math.floor(Date.now() / 1000) },
        "Relógio sincronizado."
      );
    });

    const reboot = this.__button("Reiniciar rádio", "danger");
    reboot.addEventListener("click", () => {
      if (window.confirm("Reiniciar agora o Companion/Repeater?")) {
        void this.__executeLocal("reboot", undefined, "Comando de reinício enviado.");
      }
    });

    for (const button of [localAdvert, floodAdvert, clock, reboot]) {
      button.disabled = this.__repeaterLoading;
      actions.appendChild(button);
    }

    card.appendChild(actions);
    return card;
  }

  __renderLimitationsCard() {
    const card = this.__card(
      "Repeater Setup · cobertura atual",
      "Funcionalidades disponíveis sem alterar o firmware do rádio."
    );
    card.classList.add("wide");

    const note = document.createElement("div");
    note.className = "mcr-note";
    note.textContent =
      "Disponível agora: modo Repeater, rádio, Flood Limits, Loop Detect, CAD, interference threshold, AGC reset, RX/TX delays, RX Boosted Gain, ADC multiplier, Owner Info, Duty Cycle, Path Hash, Multi ACKs, Regions, Discovery, ACL completa/login Repeater, RTC Mesh, localização, adverts, reboot e estatísticas.";
    card.appendChild(note);
    return card;
  }

  __card(title, description) {
    const card = document.createElement("section");
    card.className = "mcr-card";

    const h = document.createElement("div");
    h.className = "mcr-card-title";
    h.textContent = title;
    card.appendChild(h);

    if (description) {
      const p = document.createElement("div");
      p.className = "mcr-card-desc";
      p.textContent = description;
      card.appendChild(p);
    }

    return card;
  }

  __button(label, variant = "") {
    const button = document.createElement("button");
    button.className = `mcr-btn ${variant}`.trim();
    button.textContent = label;
    return button;
  }

  __passwordField(label, value, onChange) {
    const field = document.createElement("div");
    field.className = "mcr-field";

    const l = document.createElement("label");
    l.textContent = label;

    const input = document.createElement("input");
    input.className = "mcr-input";
    input.type = "password";
    input.maxLength = 15;
    input.autocomplete = "new-password";
    input.value = value == null ? "" : String(value);
    input.addEventListener("input", () => onChange(input.value));

    field.append(l, input);
    return field;
  }


  __numberField(label, value, step, onChange) {
    const field = document.createElement("div");
    field.className = "mcr-field";

    const l = document.createElement("label");
    l.textContent = label;

    const input = document.createElement("input");
    input.className = "mcr-input";
    input.type = "number";
    input.step = step;
    input.value = value == null ? "" : String(value);
    input.addEventListener("input", () => {
      const n = Number(input.value);
      if (Number.isFinite(n)) onChange(n);
    });

    field.append(l, input);
    return field;
  }

  __selectField(label, options, value, onChange) {
    const field = document.createElement("div");
    field.className = "mcr-field";

    const l = document.createElement("label");
    l.textContent = label;

    const select = document.createElement("select");
    select.className = "mcr-select";

    for (const option of options) {
      const spec = typeof option === "object"
        ? option
        : { value: option, label: String(option) };
      const el = document.createElement("option");
      el.value = String(spec.value);
      el.textContent = spec.label;
      el.selected = String(spec.value) === String(value);
      select.appendChild(el);
    }

    select.addEventListener("change", () => onChange(select.value));
    field.append(l, select);
    return field;
  }

  __metric(label, value, sub = "") {
    const el = document.createElement("div");
    el.className = "mcr-metric";

    const l = document.createElement("div");
    l.className = "mcr-metric-label";
    l.textContent = label;

    const v = document.createElement("div");
    v.className = "mcr-metric-value";
    v.textContent = value;

    el.append(l, v);

    if (sub) {
      const s = document.createElement("div");
      s.className = "mcr-metric-sub";
      s.textContent = sub;
      el.appendChild(s);
    }

    return el;
  }

  __state(title, text) {
    const el = document.createElement("div");
    el.className = "mcr-state";

    const icon = document.createElement("div");
    icon.className = "mcr-state-icon";
    icon.textContent = "⌁";

    const h = document.createElement("div");
    h.className = "mcr-state-title";
    h.textContent = title;

    const p = document.createElement("div");
    p.className = "mcr-state-text";
    p.textContent = text;

    el.append(icon, h, p);
    return el;
  }

  __duration(seconds) {
    let value = Math.max(0, Math.floor(Number(seconds) || 0));
    const days = Math.floor(value / 86400);
    value %= 86400;
    const hours = Math.floor(value / 3600);
    value %= 3600;
    const minutes = Math.floor(value / 60);

    if (days) return `${days}d ${hours}h`;
    if (hours) return `${hours}h ${minutes}m`;
    if (minutes) return `${minutes}m`;
    return `${value}s`;
  }

  __networkHistoryStorageKey() {
    const entry=String(this.__entryId()||"default").replace(/[^a-zA-Z0-9_.-]/g,"_");
    return "hivefw.network_analytics.v1."+entry;
  }

  __networkNeighborId(neighbor) {
    const raw=String(
      neighbor?.public_key || neighbor?.pubkey || neighbor?.pubkey_prefix || neighbor?.name || ""
    ).trim().toLowerCase();
    return raw.replace(/\s+/g,"_");
  }

  __networkContactForNeighbor(neighbor) {
    const id=this.__networkNeighborId(neighbor);
    const prefix=String(neighbor?.pubkey_prefix||neighbor?.pubkey||"")
      .trim().toLowerCase();
    const name=this.__normalizeNodeName(neighbor?.name);
    const source=Array.isArray(this.__nodesMapContacts)&&this.__nodesMapContacts.length
      ? this.__nodesMapContacts
      : (Array.isArray(this._contacts)?this._contacts:[]);
    const matches=source.filter((contact)=>{
      const key=String(contact?.public_key||contact?.pubkey||"").trim().toLowerCase();
      const cp=String(contact?.pubkey_prefix||key.slice(0,12)).trim().toLowerCase();
      if(id && (key===id||cp===id||key.startsWith(id)||id.startsWith(cp)))return true;
      if(prefix && (cp===prefix||key.startsWith(prefix)||prefix.startsWith(cp)))return true;
      return !!name && this.__normalizeNodeName(contact?.adv_name||contact?.name)===name;
    });
    return matches.length===1?matches[0]:null;
  }

  __networkHistorySnapshot(neighbors) {
    if(!Array.isArray(neighbors))neighbors=[];
    let state=this.__networkHistory;
    if(!state){
      try{state=JSON.parse(localStorage.getItem(this.__networkHistoryStorageKey())||"null");}catch{state=null;}
    }
    if(!state||typeof state!=="object"){
      state={version:1,initialized:false,samples:0,last_sample_at:0,nodes:{},events:[],advert_events:[],config_signature:""};
    }
    if(!state.nodes||typeof state.nodes!=="object")state.nodes={};
    if(!Array.isArray(state.events))state.events=[];
    if(!Array.isArray(state.advert_events))state.advert_events=[];

    const now=Date.now();
    const current=new Set();
    const sampleDue=!state.last_sample_at||now-Number(state.last_sample_at)>=5*60*1000;
    if(sampleDue){
      state.samples=Math.max(0,Number(state.samples)||0)+1;
      state.last_sample_at=now;
    }

    for(const neighbor of neighbors){
      const id=this.__networkNeighborId(neighbor);
      if(!id)continue;
      current.add(id);
      let node=state.nodes[id];
      const isNew=!node;
      if(!node){
        node=state.nodes[id]={
          name:String(neighbor?.name||neighbor?.pubkey_prefix||"Repeater"),
          first_seen_at:state.initialized?now:0,
          first_sample:Math.max(1,Number(state.samples)||1),
          seen_samples:0,
          last_seen_at:now,
          last_advert_at:0,
          missing_since:0,
        };
        if(state.initialized){
          state.events.unshift({type:"new",timestamp:now,id,name:node.name});
        }
      }
      node.name=String(neighbor?.name||node.name||neighbor?.pubkey_prefix||"Repeater");
      node.last_seen_at=now;
      node.missing_since=0;
      if(sampleDue)node.seen_samples=Math.max(0,Number(node.seen_samples)||0)+1;

      const secs=Math.max(0,Number(neighbor?.secs_ago)||0);
      const advertAt=now-secs*1000;
      const previousAdvert=Number(node.last_advert_at)||0;
      if(previousAdvert>0 && advertAt>previousAdvert+4000){
        state.advert_events.push({timestamp:advertAt,id});
      }
      node.last_advert_at=Math.max(previousAdvert,advertAt);
      if(isNew&&state.initialized&&node.first_seen_at<=0)node.first_seen_at=now;
    }

    for(const [id,node] of Object.entries(state.nodes)){
      if(current.has(id))continue;
      const lastAdvert=Number(node?.last_advert_at)||0;
      if(lastAdvert>0 && now-lastAdvert>48*60*60*1000 && !node.missing_since){
        node.missing_since=now;
        state.events.unshift({
          type:"missing",
          timestamp:now,
          id,
          name:String(node.name||id),
        });
      }
    }

    if(this.__repeaterStatus){
      const radio=this.__repeaterStatus?.radio||{};
      const configSignature=JSON.stringify({
        frequency:radio.frequency??this.__repeaterStatus?.frequency??null,
        bandwidth:radio.bandwidth??null,
        spreading_factor:radio.spreading_factor??null,
        coding_rate:radio.coding_rate??null,
        tx_power:radio.tx_power??null,
        path_hash_mode:radio.path_hash_mode??this.__repeaterStatus?.device_info?.path_hash_mode??null,
        repeat:!!this.__repeaterStatus?.repeat,
      });
      if(state.config_signature && configSignature!==state.config_signature){
        state.events.unshift({type:"config",timestamp:now,id:"config",name:"Configuração RF/Repeater alterada"});
      }
      state.config_signature=configSignature;
    }
    state.initialized=true;
    state.events=state.events.filter((event)=>now-Number(event.timestamp||0)<=7*86400000).slice(0,80);
    state.advert_events=state.advert_events.filter((event)=>now-Number(event.timestamp||0)<=48*3600000).slice(-4000);

    this.__networkHistory=state;
    try{localStorage.setItem(this.__networkHistoryStorageKey(),JSON.stringify(state));}catch{}
    return state;
  }

  __networkSignalFor(neighbor) {
    const id=this.__networkNeighborId(neighbor);
    const prefix=String(neighbor?.pubkey_prefix||neighbor?.pubkey||"").toLowerCase();
    const results=Array.isArray(this.__hiveNeighborDiscovery?.results)?this.__hiveNeighborDiscovery.results:[];
    const discovery=results.find((item)=>{
      const candidate=this.__networkNeighborId(item);
      const cp=String(item?.pubkey_prefix||item?.pubkey||"").toLowerCase();
      return (id&&candidate===id)||(prefix&&cp===prefix);
    });
    const contact=this.__networkContactForNeighbor(neighbor);
    const rssi=Number(discovery?.rssi ?? contact?.last_rssi ?? contact?.rssi);
    const snr=Number(discovery?.snr ?? contact?.last_snr ?? contact?.snr);
    return {
      rssi:Number.isFinite(rssi)?rssi:null,
      snr:Number.isFinite(snr)?snr:null,
      contact,
    };
  }

  __networkMetric(label,value,detail="") {
    const box=document.createElement("div");
    box.className="hive-network-metric";
    const l=document.createElement("span");l.textContent=label;
    const v=document.createElement("strong");v.textContent=String(value);
    const d=document.createElement("small");d.textContent=detail;
    box.append(l,v,d);
    return box;
  }

  __networkBarRow(label,value,max,display=String(value)) {
    const row=document.createElement("div");
    row.className="hive-network-bar-row";
    const name=document.createElement("span");name.textContent=label;
    const track=document.createElement("div");track.className="hive-network-bar-track";
    const fill=document.createElement("div");fill.className="hive-network-bar-fill";
    fill.style.width=(max>0?Math.max(0,Math.min(100,Number(value||0)/max*100)):0)+"%";
    track.appendChild(fill);
    const amount=document.createElement("strong");amount.textContent=display;
    row.append(name,track,amount);
    return row;
  }

  __renderHiveNetworkAnalytics(container) {
    container.replaceChildren();
    const data=this.__hiveNeighbors;
    const all=Array.isArray(data?.neighbors)?[...data.neighbors]:[];
    const hours=Math.max(1,Number(this.__networkRangeHours)||48);
    const visible=all.filter((neighbor)=>Number(neighbor?.secs_ago||0)<=hours*3600);
    const hasNeighborData=!!data && Array.isArray(data.neighbors);
    const history=hasNeighborData
      ? this.__networkHistorySnapshot(all)
      : (this.__networkHistory||{nodes:{},events:[],advert_events:[]});
    const now=Date.now();

    const head=document.createElement("div");
    head.className="hive-network-head";
    const intro=document.createElement("div");
    const eyebrow=document.createElement("div");eyebrow.className="mcr-eyebrow";eyebrow.textContent="◉  NETWORK ANALYTICS · LOCAL";
    const title=document.createElement("h1");title.textContent="Rede";
    const subtitle=document.createElement("p");
    subtitle.textContent="Leitura consolidada da rede observada pelo HiveFW. O histórico de novos/desaparecidos, presença e adverts/h começa a ser acumulado localmente a partir desta versão e não gera tráfego LoRa.";
    intro.append(eyebrow,title,subtitle);

    const range=document.createElement("div");
    range.className="hive-network-range";
    for(const value of [6,24,48]){
      const button=document.createElement("button");
      button.type="button";
      button.textContent=value+"H";
      button.classList.toggle("active",hours===value);
      button.addEventListener("click",()=>{
        this.__networkRangeHours=value;
        this.__rerenderHivePage();
      });
      range.appendChild(button);
    }
    head.append(intro,range);
    container.appendChild(head);

    const new24=Object.values(history.nodes||{}).filter((node)=>Number(node?.first_seen_at)>0&&now-Number(node.first_seen_at)<=86400000).length;
    const missing7=Object.values(history.nodes||{}).filter((node)=>Number(node?.missing_since)>0&&now-Number(node.missing_since)<=7*86400000).length;
    const active1=all.filter((neighbor)=>Number(neighbor?.secs_ago||0)<=3600).length;
    const adverts1h=(history.advert_events||[]).filter((event)=>now-Number(event.timestamp||0)<=3600000).length;

    const rxRate=this.__readMetricState(null,"nb_recv_rate").value;
    const txRate=this.__readMetricState(null,"nb_sent_rate").value;
    const rxFlood=this.__readMetricState(null,"recv_flood_rate").value;
    const txFlood=this.__readMetricState(null,"sent_flood_rate").value;
    const traffic=([rxRate,txRate].some(Number.isFinite))
      ? ((Number.isFinite(rxRate)?rxRate:0)+(Number.isFinite(txRate)?txRate:0)).toFixed(1)
      : "—";
    const floodHour=([rxFlood,txFlood].some(Number.isFinite))
      ? (((Number.isFinite(rxFlood)?rxFlood:0)+(Number.isFinite(txFlood)?txFlood:0))*60).toFixed(0)
      : "—";

    const metrics=document.createElement("div");
    metrics.className="hive-network-metrics";
    metrics.append(
      this.__networkMetric("Vizinhos "+hours+"H",visible.length,"zero-hop observados"),
      this.__networkMetric("Ativos <1H",active1,"advert recente"),
      this.__networkMetric("Novos 24H",new24,"desde o baseline"),
      this.__networkMetric("Desaparecidos",missing7,"últimos 7 dias"),
      this.__networkMetric("Adverts/H",adverts1h,"eventos observados"),
      this.__networkMetric("Tráfego",traffic,traffic==="—"?"sem métrica":("msg/min · flood "+floodHour+"/h"))
    );
    container.appendChild(metrics);

    const panels=document.createElement("div");
    panels.className="hive-network-panels";

    const freshness=document.createElement("section");
    freshness.className="hive-network-panel";
    const ftitle=document.createElement("div");ftitle.className="hive-network-panel-title";ftitle.textContent="Presença / recência";
    freshness.appendChild(ftitle);
    const freshBuckets=[
      ["< 1h",all.filter((n)=>Number(n.secs_ago||0)<3600).length],
      ["1–6h",all.filter((n)=>Number(n.secs_ago||0)>=3600&&Number(n.secs_ago||0)<21600).length],
      ["6–24h",all.filter((n)=>Number(n.secs_ago||0)>=21600&&Number(n.secs_ago||0)<86400).length],
      ["24–48h",all.filter((n)=>Number(n.secs_ago||0)>=86400&&Number(n.secs_ago||0)<=172800).length],
    ];
    const freshMax=Math.max(1,...freshBuckets.map(([,value])=>value));
    for(const [label,value] of freshBuckets)freshness.appendChild(this.__networkBarRow(label,value,freshMax));

    const sampledNodes=Object.values(history.nodes||{}).filter((node)=>{
      const first=Math.max(1,Number(node?.first_sample)||1);
      return (Number(history.samples)||0)-first+1>=2;
    });
    if(sampledNodes.length){
      const presence=sampledNodes.map((node)=>{
        const first=Math.max(1,Number(node?.first_sample)||1);
        const possible=Math.max(1,(Number(history.samples)||0)-first+1);
        return Math.max(0,Math.min(100,(Number(node?.seen_samples)||0)/possible*100));
      });
      const average=presence.reduce((sum,value)=>sum+value,0)/presence.length;
      const note=document.createElement("div");
      note.style.cssText="margin-top:9px;padding-top:8px;border-top:1px solid var(--divider-color);color:var(--secondary-text-color);font-size:9px;line-height:1.35;";
      note.textContent="Estabilidade observada · "+average.toFixed(0)+"% de presença média · "+String(history.samples||0)+" amostras";
      freshness.appendChild(note);
    }

    const signals=document.createElement("section");
    signals.className="hive-network-panel";
    const stitle=document.createElement("div");stitle.className="hive-network-panel-title";stitle.textContent="Distribuição de sinal";
    signals.appendChild(stitle);
    const signalRows=all.map((n)=>this.__networkSignalFor(n)).filter((s)=>s.snr!=null||s.rssi!=null);
    const good=signalRows.filter((s)=>s.snr!=null?s.snr>=-5:s.rssi>=-100).length;
    const medium=signalRows.filter((s)=>{
      if(s.snr!=null)return s.snr<-5&&s.snr>=-12;
      return s.rssi<-100&&s.rssi>=-115;
    }).length;
    const weak=Math.max(0,signalRows.length-good-medium);
    const signalMax=Math.max(1,good,medium,weak);
    signals.append(
      this.__networkBarRow("Bom",good,signalMax),
      this.__networkBarRow("Médio",medium,signalMax),
      this.__networkBarRow("Fraco",weak,signalMax)
    );
    const sNote=document.createElement("div");
    sNote.style.cssText="margin-top:8px;color:var(--secondary-text-color);font-size:9px;line-height:1.35;";
    sNote.textContent=signalRows.length?signalRows.length+" vizinho(s) com RSSI/SNR disponível.":"Sem amostras RSSI/SNR disponíveis neste momento.";
    signals.appendChild(sNote);

    const trafficPanel=document.createElement("section");
    trafficPanel.className="hive-network-panel";
    const ttitle=document.createElement("div");ttitle.className="hive-network-panel-title";
    const tlabel=document.createElement("span");tlabel.textContent="Repeaters por atividade";
    const tmeta=document.createElement("span");tmeta.style.color="var(--secondary-text-color)";tmeta.textContent="RX + TX + paths";
    ttitle.append(tlabel,tmeta);trafficPanel.appendChild(ttitle);

    const ranked=all.map((neighbor)=>{
      const signal=this.__networkSignalFor(neighbor);
      const activity=signal.contact?this.__peerActivityFor(signal.contact):{rx:0,tx:0,linkVolume:0};
      return {neighbor,contact:signal.contact,score:(Number(activity.rx)||0)+(Number(activity.tx)||0)+(Number(activity.linkVolume)||0),activity};
    }).filter((item)=>item.score>0).sort((a,b)=>b.score-a.score).slice(0,5);

    if(!ranked.length){
      const empty=document.createElement("div");
      empty.style.cssText="color:var(--secondary-text-color);font-size:9px;line-height:1.4;";
      empty.textContent="Ainda sem atividade correlacionada com os vizinhos zero-hop.";
      trafficPanel.appendChild(empty);
    }else{
      for(const item of ranked){
        const row=document.createElement("div");row.className="hive-network-top-row";
        const name=document.createElement("strong");name.textContent=String(item.neighbor?.name||item.neighbor?.pubkey_prefix||"Repeater");
        const value=document.createElement("span");value.textContent=String(item.score);
        row.append(name,value);
        if(item.contact){
          row.style.cursor="pointer";
          row.title="Abrir este nó no mapa";
          row.addEventListener("click",()=>{
            this._activeTab="nodes";
            this.requestUpdate?.();
            window.setTimeout(()=>this.__focusNodeOnMap(item.contact,true),180);
          });
        }
        trafficPanel.appendChild(row);
      }
    }
    panels.append(freshness,signals,trafficPanel);

    const events=document.createElement("section");
    events.className="hive-network-panel";
    events.style.marginTop="8px";
    const etitle=document.createElement("div");etitle.className="hive-network-panel-title";
    etitle.textContent="Alterações observadas · 7 dias";
    events.appendChild(etitle);
    const recent=(history.events||[]).slice(0,8);
    if(!recent.length){
      const empty=document.createElement("div");
      empty.style.cssText="color:var(--secondary-text-color);font-size:9px;";
      empty.textContent="Baseline criado. Novos repeaters, desaparecimentos e alterações de configuração passarão a aparecer aqui.";
      events.appendChild(empty);
    }else{
      const labels={new:"Novo repeater",missing:"Saiu da janela 48H",config:"Configuração alterada"};
      for(const event of recent){
        const row=document.createElement("div");row.className="hive-network-event";
        const time=document.createElement("time");time.textContent=new Date(Number(event.timestamp)).toLocaleString();
        const textNode=document.createElement("div");
        textNode.textContent=(labels[event.type]||event.type)+" · "+String(event.name||event.id||"");
        row.append(time,textNode);events.appendChild(row);
      }
    }

    container.append(panels,events);
  }

  __ensureNetworkOverlay(container) {
    if(this.__networkOverlay?.isConnected)return this.__networkOverlay;
    const overlay=document.createElement("div");
    overlay.className="hive-network-overlay";
    container.appendChild(overlay);
    this.__networkOverlay=overlay;
    return overlay;
  }

  __removeNetworkOverlay() {
    if(this.__networkOverlay?.isConnected)this.__networkOverlay.remove();
    this.__networkOverlay=null;
    if(this._activeTab!=="neighbors")this.__stopHiveNeighborDiscoveryPolling();
  }

  __renderHiveNetwork(container) {
    container.replaceChildren();
    const page=document.createElement("div");
    page.className="mcr-page hive-network-page";
    page.style.overflow="visible";

    const analytics=document.createElement("section");
    analytics.className="hive-network-analytics";
    this.__renderHiveNetworkAnalytics(analytics);

    const copy=document.createElement("div");
    copy.className="hive-network-copy";

    const layout=document.createElement("div");
    layout.className="hive-neighbors-three";
    const left=document.createElement("section");
    left.className="hive-neighbors-column hive-neighbors-passive";
    const leftScroll=document.createElement("div");
    leftScroll.className="hive-neighbors-left-scroll";
    left.appendChild(leftScroll);
    const middle=document.createElement("section");
    middle.className="hive-neighbors-column hive-neighbors-discovery";
    const right=document.createElement("section");
    right.className="hive-neighbors-column hive-neighbors-map";
    layout.append(left,middle,right);
    copy.appendChild(layout);
    page.append(analytics,copy);
    container.appendChild(page);

    // Literal copy of the current Vizinhos content. The original tab keeps
    // using __renderHiveNeighbors() and is not augmented with analytics.
    this.__renderHiveNeighborsLeft(leftScroll);
    this.__renderHiveNeighborDiscovery(middle);
    void this.__renderHiveNeighborDiscoveryMap(right);
  }

  __ensureNeighborsOverlay(container) {
    if (this.__neighborsOverlay?.isConnected) return this.__neighborsOverlay;

    const overlay = document.createElement("div");
    overlay.className = "hive-neighbors-overlay";
    container.appendChild(overlay);
    this.__neighborsOverlay = overlay;
    return overlay;
  }

  __removeNeighborsOverlay() {
    if (this.__neighborsOverlay?.isConnected) {
      this.__neighborsOverlay.remove();
    }
    this.__neighborsOverlay = null;
    if(this._activeTab!=="network")this.__stopHiveNeighborDiscoveryPolling();
  }

  async __loadHiveNeighbors() {
    if (!this.hass || this.__hiveNeighborsLoading) return;

    this.__hiveNeighborsLoading = true;
    this.__hiveNeighborsError = null;
    this.__rerenderHiveNeighborsLeftOnly();

    try {
      const msg = { type: "hivefw_integration/get_hive_neighbors" };
      const entryId = this.__entryId();
      if (entryId) msg.entry_id = entryId;
      this.__hiveNeighbors = await this.hass.callWS(msg);
    } catch (error) {
      this.__hiveNeighborsError =
        error?.message || "Não foi possível carregar os vizinhos.";
    } finally {
      this.__hiveNeighborsLoading = false;
      this.__rerenderHiveNeighborsLeftOnly();
    }
  }

  __rerenderHivePage() {
    if (!["neighbors","network"].includes(this._activeTab)) return;
    const container = this.shadowRoot?.querySelector(".page-container");
    if (!container) return;
    if(this._activeTab==="network"){
      const overlay=this.__ensureNetworkOverlay(container);
      this.__renderHiveNetwork(overlay);
    }else{
      const overlay=this.__ensureNeighborsOverlay(container);
      this.__renderHiveNeighbors(overlay);
    }
  }

  __rerenderHiveNeighborsLeftOnly() {
    if (!["neighbors","network"].includes(this._activeTab)) return;
    const overlay = this._activeTab==="network" ? this.__networkOverlay : this.__neighborsOverlay;
    const left = overlay?.querySelector(".hive-neighbors-passive .hive-neighbors-left-scroll");
    if (!left) {
      this.__rerenderHivePage();
      return;
    }
    const scrollTop = left.scrollTop;
    this.__renderHiveNeighborsLeft(left);
    left.scrollTop = scrollTop;
  }

  __rerenderHiveNeighborDiscoveryOnly(renderMap = false) {
    if (!["neighbors","network"].includes(this._activeTab)) return;
    const overlay = this._activeTab==="network" ? this.__networkOverlay : this.__neighborsOverlay;
    const middle = overlay?.querySelector(".hive-neighbors-discovery");
    if (!middle) {
      this.__rerenderHivePage();
      return;
    }

    const oldScroll = middle.querySelector(".hive-neighbors-discovery-scroll");
    const scrollTop = oldScroll?.scrollTop || 0;
    this.__renderHiveNeighborDiscovery(middle);
    const newScroll = middle.querySelector(".hive-neighbors-discovery-scroll");
    if (newScroll) {
      newScroll.scrollTop = scrollTop;
      requestAnimationFrame(() => {
        if (newScroll.isConnected) newScroll.scrollTop = scrollTop;
      });
    }

    if (renderMap) {
      const right = overlay?.querySelector(".hive-neighbors-map");
      if (right) void this.__renderHiveNeighborDiscoveryMap(right);
    }
  }

  __renderHiveNeighbors(container) {
    container.replaceChildren();

    const page = document.createElement("div");
    page.className = "mcr-page";
    page.style.overflow = "hidden";

    const layout = document.createElement("div");
    layout.className = "hive-neighbors-three";

    const left = document.createElement("section");
    left.className = "hive-neighbors-column hive-neighbors-passive";
    const leftScroll = document.createElement("div");
    leftScroll.className = "hive-neighbors-left-scroll";
    left.appendChild(leftScroll);

    const middle = document.createElement("section");
    middle.className = "hive-neighbors-column hive-neighbors-discovery";

    const right = document.createElement("section");
    right.className = "hive-neighbors-column hive-neighbors-map";

    layout.append(left, middle, right);
    page.appendChild(layout);
    container.appendChild(page);

    // Preserve the original Vizinhos page exactly as the passive source in
    // column one. Active discovery is rendered independently beside it.
    this.__renderHiveNeighborsLeft(leftScroll);
    this.__renderHiveNeighborDiscovery(middle);
    void this.__renderHiveNeighborDiscoveryMap(right);
  }

  __renderHiveNeighborsLeft(container) {
    container.replaceChildren();

    const wrap = document.createElement("div");
    wrap.className = "mcr-wrap";
    container.appendChild(wrap);

    const hero = document.createElement("section");
    hero.className = "mcr-hero";

    const heading = document.createElement("div");
    const eyebrow = document.createElement("div");
    eyebrow.className = "mcr-eyebrow";
    eyebrow.textContent = "◉  REPEATER · ZERO-HOP";
    const title = document.createElement("h1");
    title.className = "mcr-title";
    title.textContent = "Vizinhos 48H";
    const subtitle = document.createElement("p");
    subtitle.className = "mcr-subtitle";
    subtitle.textContent =
      "Repeaters cujos adverts foram ouvidos diretamente (zero-hop) pelo HiveFW nas últimas 48 horas. A consulta é local e não gera tráfego LoRa.";
    heading.append(eyebrow, title, subtitle);

    const refresh = document.createElement("button");
    refresh.className = "mcr-btn";
    refresh.disabled = this.__hiveNeighborsLoading;
    refresh.textContent = this.__hiveNeighborsLoading ? "A atualizar…" : "↻ Atualizar";
    refresh.addEventListener("click", () => void this.__loadHiveNeighbors());

    hero.append(heading, refresh);
    wrap.appendChild(hero);

    if (this.__hiveNeighborsLoading && !this.__hiveNeighbors) {
      wrap.appendChild(this.__state(
        "A carregar",
        "A consultar a tabela local de vizinhos diretos do Repeater."
      ));
      return;
    }

    if (this.__hiveNeighborsError) {
      wrap.appendChild(this.__state("Erro ao carregar", this.__hiveNeighborsError));
      return;
    }

    const data = this.__hiveNeighbors;
    if (!data?.supported) {
      wrap.appendChild(this.__state(
        "Consulta indisponível",
        "Esta versão do Companion não disponibiliza os dados necessários para determinar vizinhos zero-hop."
      ));
      return;
    }

    if (!data.repeater_enabled) {
      wrap.appendChild(this.__state(
        "Modo Repeater desligado",
        "O rádio está ligado como Companion, mas o modo Repeater encontra-se desligado."
      ));
      return;
    }

    const neighbors = Array.isArray(data.neighbors) ? [...data.neighbors] : [];
    const latest = neighbors.length
      ? Math.min(...neighbors.map((n) => Number(n.secs_ago || 0)))
      : null;

    const summary = document.createElement("section");
    summary.className = "mcr-grid";
    summary.append(
      this.__metric("Vizinhos", String(data.count ?? neighbors.length), "Repeaters diretos"),
      this.__metric("Método", "Zero-hop", "Tabela Repeater"),
      this.__metric(
        "Último advert",
        latest == null ? "—" : this.__age(latest),
        "mais recente"
      ),
      this.__metric(
        "Modo",
        data.repeater_enabled ? "Ativo" : "Desligado",
        "HiveFW"
      )
    );
    wrap.appendChild(summary);

    const toolbar = document.createElement("div");
    toolbar.className = "hive-neighbors-toolbar";

    const sectionTitle = document.createElement("div");
    sectionTitle.className = "mcr-card-title";
    sectionTitle.textContent = "Repeaters diretos";

    const sort = document.createElement("div");
    sort.className = "hive-neighbors-sort";

    for (const [value, label] of [["recent", "Recentes"], ["name", "Nome"]]) {
      const button = document.createElement("button");
      button.textContent = label;
      button.classList.toggle("active", this.__hiveNeighborsSort === value);
      button.addEventListener("click", () => {
        this.__hiveNeighborsSort = value;
        this.__rerenderHivePage();
      });
      sort.appendChild(button);
    }

    toolbar.append(sectionTitle, sort);
    wrap.appendChild(toolbar);

    if (!neighbors.length) {
      wrap.appendChild(this.__state(
        "Ainda sem vizinhos zero-hop",
        "Ainda não foi ouvido diretamente nenhum advert de Repeater desde o arranque."
      ));
      return;
    }

    neighbors.sort(
      this.__hiveNeighborsSort === "name"
        ? (a, b) => String(a.name || "").localeCompare(String(b.name || ""))
        : (a, b) => Number(a.secs_ago || 0) - Number(b.secs_ago || 0)
    );

    const grid = document.createElement("div");
    grid.className = "hive-neighbors-grid";
    for (const neighbor of neighbors) {
      grid.appendChild(this.__neighborCard(neighbor));
    }
    wrap.appendChild(grid);
  }

  async __loadHiveNeighborDiscovery() {
    if (!this.hass || this.__hiveNeighborDiscoveryLoading) return;
    this.__hiveNeighborDiscoveryLoading = true;
    try {
      const msg = { type: "hivefw_integration/get_hive_neighbor_discovery" };
      const entryId = this.__entryId();
      if (entryId) msg.entry_id = entryId;
      const state = await this.hass.callWS(msg);
      this.__applyHiveNeighborDiscoveryState(state);
    } catch (error) {
      // Active discovery is optional. Never let it change/fail the original
      // passive Vizinhos page in the left column.
      this.__hiveNeighborDiscovery = {
        supported: false,
        active: false,
        count: 0,
        results: [],
        error: error?.message || "Descoberta ativa indisponível."
      };
      this.__rerenderHivePage();
    } finally {
      this.__hiveNeighborDiscoveryLoading = false;
    }
  }

  async __startHiveNeighborDiscovery() {
    if (!this.hass || this.__hiveNeighborDiscoveryStarting) return;

    // Cada clique inicia uma sessão nova. Limpa a lista e oculta o mapa
    // imediatamente; o backend cancela a janela anterior antes do novo pedido.
    this.__hiveNeighborDiscoveryStarting = true;
    this.__hiveNeighborMapFocusId = "";
    this.__hiveNeighborMapElement = null;
    this.__hiveNeighborMapMarkerElements.clear();
    this.__hiveNeighborMapLeafletMarkers.clear();
    this.__hiveNeighborDiscovery = {
      supported: true,
      active: true,
      started_at: new Date().toISOString(),
      ends_at: "",
      remaining_seconds: 30,
      count: 0,
      results: [],
      error: ""
    };
    this.__hiveNeighborDiscoverySignature = "";
    this.__rerenderHiveNeighborDiscoveryOnly(true);

    try {
      const msg = { type: "hivefw_integration/start_hive_neighbor_discovery" };
      const entryId = this.__entryId();
      if (entryId) msg.entry_id = entryId;
      const state = await this.hass.callWS(msg);
      this.__applyHiveNeighborDiscoveryState(state, true);
      this.__startHiveNeighborDiscoveryPolling();
    } catch (error) {
      this.__hiveNeighborDiscovery = {
        supported: true,
        active: false,
        started_at: "",
        ends_at: "",
        remaining_seconds: 0,
        count: 0,
        results: [],
        error: error?.message || "Não foi possível iniciar a descoberta."
      };
      this.__stopHiveNeighborDiscoveryPolling();
      this.__rerenderHiveNeighborDiscoveryOnly(true);
    } finally {
      this.__hiveNeighborDiscoveryStarting = false;
      this.__rerenderHiveNeighborDiscoveryOnly(false);
    }
  }

  __applyHiveNeighborDiscoveryState(state, forceRender = false) {
    const previous = this.__hiveNeighborDiscovery;
    const wasActive = Boolean(previous?.active);
    const normalized = state && typeof state === "object"
      ? state
      : { supported:false, active:false, count:0, results:[] };
    const results = Array.isArray(normalized.results) ? normalized.results : [];
    const signature = JSON.stringify({
      active:Boolean(normalized.active),
      remaining_seconds:Number(normalized.remaining_seconds || 0),
      count:Number(normalized.count || results.length),
      error:String(normalized.error || ""),
      results:results.map((item) => [
        item?.pubkey || item?.pubkey_prefix || "",
        item?.snr ?? null,
        item?.rssi ?? null,
        item?.latitude ?? null,
        item?.longitude ?? null
      ])
    });

    this.__hiveNeighborDiscovery = normalized;
    if (normalized.active) this.__startHiveNeighborDiscoveryPolling();
    else this.__stopHiveNeighborDiscoveryPolling();

    if (forceRender || signature !== this.__hiveNeighborDiscoverySignature) {
      this.__hiveNeighborDiscoverySignature = signature;
      const firstState = !previous;
      const finishedNow = wasActive && !normalized.active;
      this.__rerenderHiveNeighborDiscoveryOnly(
        firstState || finishedNow || (forceRender && !normalized.active)
      );
    }
  }

  __startHiveNeighborDiscoveryPolling() {
    if (this.__hiveNeighborDiscoveryPollTimer) return;
    this.__hiveNeighborDiscoveryPollTimer = window.setInterval(async () => {
      if (!this.hass || !["neighbors","network"].includes(this._activeTab)) return;
      try {
        const msg = { type: "hivefw_integration/get_hive_neighbor_discovery" };
        const entryId = this.__entryId();
        if (entryId) msg.entry_id = entryId;
        const state = await this.hass.callWS(msg);
        this.__applyHiveNeighborDiscoveryState(state);
      } catch {
        // Keep the last result set visible through transient WS hiccups.
      }
    }, 1000);
  }

  __stopHiveNeighborDiscoveryPolling() {
    if (this.__hiveNeighborDiscoveryPollTimer) {
      window.clearInterval(this.__hiveNeighborDiscoveryPollTimer);
      this.__hiveNeighborDiscoveryPollTimer = null;
    }
  }

  __renderHiveNeighborDiscovery(container) {
    container.replaceChildren();

    const head = document.createElement("div");
    head.className = "hive-discovery-head";
    const heading = document.createElement("div");
    const eyebrow = document.createElement("div");
    eyebrow.className = "hive-discovery-eyebrow";
    eyebrow.textContent = "ATIVO · RF ZERO-HOP";
    const title = document.createElement("div");
    title.className = "hive-discovery-title";
    title.textContent = "Repetidores descobertos";
    const subtitle = document.createElement("div");
    subtitle.className = "hive-discovery-subtitle";
    subtitle.textContent = "Pesquisa oficial MeshCore apenas a Repeaters em alcance direto.";
    heading.append(eyebrow, title, subtitle);

    const discover = document.createElement("button");
    discover.className = "mcr-btn primary";
    const active = Boolean(this.__hiveNeighborDiscovery?.active);
    // O botão fica sempre disponível. Um novo clique substitui a sessão atual.
    discover.disabled = this.__hiveNeighborDiscoveryStarting;
    discover.textContent = this.__hiveNeighborDiscoveryStarting ? "A iniciar…" : "Descobrir";
    discover.addEventListener("click", () => void this.__startHiveNeighborDiscovery());
    head.append(heading, discover);
    container.appendChild(head);

    const scroll = document.createElement("div");
    scroll.className = "hive-neighbors-discovery-scroll";
    container.appendChild(scroll);

    const state = this.__hiveNeighborDiscovery;
    const status = document.createElement("div");
    status.className = "hive-discovery-status";
    if (state?.error) {
      status.textContent = "Erro: " + state.error;
    } else if (active) {
      status.textContent =
        "À escuta de respostas · " +
        String(Math.max(0, Number(state?.remaining_seconds || 0))) +
        " s restantes.";
    } else if (state?.started_at) {
      status.textContent = "Pesquisa concluída.";
    } else {
      status.textContent = "Pronto para iniciar uma descoberta zero-hop.";
    }
    scroll.appendChild(status);

    const results = Array.isArray(state?.results) ? state.results : [];
    const listHead = document.createElement("div");
    listHead.className = "hive-discovery-list-head";
    const listLabel = document.createElement("span");
    listLabel.textContent = "Repetidores encontrados";
    const listCount = document.createElement("span");
    listCount.className = "hive-discovery-count";
    listCount.textContent = String(Number(state?.count ?? results.length));
    listHead.append(listLabel, listCount);
    scroll.appendChild(listHead);

    if (!results.length) {
      const empty = document.createElement("div");
      empty.className = "hive-discovery-empty";
      empty.textContent = active
        ? "A aguardar respostas dos Repeaters em alcance…"
        : state?.started_at
          ? "A pesquisa terminou sem encontrar Repeaters em alcance direto."
          : "Ainda não existem resultados de descoberta ativa.";
      scroll.appendChild(empty);
      return;
    }

    for (const item of results) {
      const row = document.createElement("article");
      row.className = "hive-discovery-item";
      const id = String(item.pubkey || item.pubkey_prefix || "");
      row.classList.toggle("selected", id === this.__hiveNeighborMapFocusId);

      const info = document.createElement("div");
      const name = document.createElement("div");
      name.className = "hive-neighbor-name";
      name.textContent = item.name || item.pubkey_prefix || "Repeater";
      const prefix = document.createElement("div");
      prefix.className = "hive-neighbor-prefix";
      prefix.textContent = String(item.pubkey_prefix || "").toUpperCase();
      const meta = document.createElement("div");
      meta.className = "hive-neighbor-meta";
      const direct = document.createElement("span");
      direct.className = "hive-neighbor-pill";
      direct.textContent = "ZERO-HOP";
      meta.appendChild(direct);

      const known = document.createElement("span");
      known.textContent = item.known_contact ? "Conhecido" : "Novo";
      meta.appendChild(known);

      if (Number.isFinite(Number(item.latitude)) && Number.isFinite(Number(item.longitude))) {
        const gps = document.createElement("span");
        gps.textContent = "📍 GPS";
        meta.appendChild(gps);
      }
      if (item.request_snr != null) {
        const req = document.createElement("span");
        req.textContent = "REQ " + Number(item.request_snr).toFixed(1) + " dB";
        meta.appendChild(req);
      }
      info.append(name, prefix, meta);

      const signal = document.createElement("div");
      signal.className = "hive-discovery-signal";
      const snr = Number(item.snr);
      const signalValue = document.createElement("span");
      const signalDot = document.createElement("span");
      signalDot.className = "hive-discovery-signal-dot";

      if (Number.isFinite(snr)) {
        signalValue.textContent = snr.toFixed(1) + " dB";
        const quality = snr >= -5
          ? { color:"#2e7d32", label:"Sinal bom" }
          : snr >= -12
            ? { color:"#f9a825", label:"Sinal médio" }
            : { color:"#c62828", label:"Sinal fraco" };
        signalDot.style.background = quality.color;
        signalDot.title = quality.label;
        signal.setAttribute("aria-label", quality.label + " · " + signalValue.textContent);
      } else {
        signalValue.textContent = "—";
        signalDot.style.background = "#757575";
        signalDot.title = "Qualidade do sinal indisponível";
        signal.setAttribute("aria-label", "Qualidade do sinal indisponível");
      }

      signal.append(signalValue, signalDot);
      row.append(info, signal);
      row.addEventListener("click", () => {
        this.__hiveNeighborMapFocusId = id;
        this.__rerenderHiveNeighborDiscoveryOnly(false);

        const lat = Number(item.latitude);
        const lon = Number(item.longitude);
        const map = this.__hiveNeighborMapElement;
        if (Number.isFinite(lat) && Number.isFinite(lon)) {
          map?.leafletMap?.setView?.([lat, lon], 14, { animate:true });
          const marker = this.__hiveNeighborMapLeafletMarkers.get(id);
          marker?.openTooltip?.();
        }
      });
      scroll.appendChild(row);
    }
  }

  __hiveNeighborDiscoveryLocated() {
    const results = Array.isArray(this.__hiveNeighborDiscovery?.results)
      ? this.__hiveNeighborDiscovery.results : [];
    return results.filter((item) => {
      const lat = Number(item.latitude);
      const lon = Number(item.longitude);
      return Number.isFinite(lat) && Number.isFinite(lon)
        && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180
        && !(lat === 0 && lon === 0);
    });
  }

  __hiveNeighborMapLocations() {
    const active = new Set();
    const locations = this.__hiveNeighborDiscoveryLocated().map((item) => {
      const id = String(item.pubkey || item.pubkey_prefix || "");
      active.add(id);
      let marker = this.__hiveNeighborMapMarkerElements.get(id);
      if (!marker) {
        marker = document.createElement("div");
        this.__hiveNeighborMapMarkerElements.set(id, marker);
      }
      const selected = id === this.__hiveNeighborMapFocusId;
      marker.style.cssText =
        "width:30px;height:30px;border-radius:50%;display:grid;place-items:center;" +
        "font-size:9px;font-weight:750;color:white;border:" +
        (selected ? "3px" : "2px") + " solid white;box-shadow:" +
        (selected
          ? "0 0 0 3px rgba(255,152,0,.30),0 2px 7px rgba(0,0,0,.32);"
          : "0 1px 5px rgba(0,0,0,.30);") +
        "background:" + (selected
          ? "var(--warning-color,#ff9800);"
          : "var(--primary-color,#03a9f4);");
      marker.textContent = String(item.name || item.pubkey_prefix || "?").slice(0,2).toUpperCase();
      return {
        id,
        location:[Number(item.latitude), Number(item.longitude)],
        element:marker,
        elementSize:[36,36],
        title:item.name || item.pubkey_prefix,
        locationEditable:false,
        activatable:true
      };
    });
    for (const id of this.__hiveNeighborMapMarkerElements.keys()) {
      if (!active.has(id)) this.__hiveNeighborMapMarkerElements.delete(id);
    }
    return locations;
  }

  __hiveNeighborLocalMapPoint() {
    const local = this.__localRepeaterMapContact?.();
    const coords = this.__nodeCoords(local);
    if (!local || !coords) return null;
    return {
      id: "__hivefw_local__",
      name: String(local.adv_name || local.name || this.__repeaterStatus?.name || "HiveFW"),
      latitude: Number(coords[0]),
      longitude: Number(coords[1]),
      contact: local,
    };
  }

  __hiveNeighborLegacyLeafletLayers(map, items) {
    const L = map?.Leaflet;
    if (!L) return [];
    this.__hiveNeighborMapLeafletMarkers.clear();
    this.__hiveNeighborMapSignalLayers = [];
    this.__hiveNeighborLocalMarker = null;

    const layers = [];
    const local = this.__hiveNeighborLocalMapPoint();
    const localCoords = local
      ? [Number(local.latitude), Number(local.longitude)]
      : null;

    if (local && localCoords) {
      const localIcon = L.divIcon?.({
        className: "hivefw-neighbor-local-marker",
        html:
          '<span style="display:grid;place-items:center;width:24px;height:24px;border-radius:50%;' +
          'background:var(--warning-color,#ff9800);color:white;border:3px solid white;' +
          'box-shadow:0 1px 7px rgba(0,0,0,.42);font-size:9px;font-weight:800;">H</span>',
        iconSize:[30,30],
        iconAnchor:[15,15],
      });
      const localMarker = L.marker(localCoords, {
        title: local.name,
        keyboard:true,
        riseOnHover:true,
        ...(localIcon ? { icon:localIcon } : {}),
      });
      localMarker.bindTooltip?.("HiveFW local · " + local.name, {
        direction:"top",
        offset:[0,-14],
        className:"hivefw-map-tooltip",
      });
      this.__hiveNeighborLocalMarker = localMarker;
      layers.push(localMarker);
    }

    for (const item of items) {
      const lat = Number(item.latitude);
      const lon = Number(item.longitude);
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) continue;

      const id = String(item.pubkey || item.pubkey_prefix || "");
      const name = String(item.name || item.pubkey_prefix || "Repeater");
      const selected = id === this.__hiveNeighborMapFocusId;
      const color = selected ? "#ff9800" : "#03a9f4";

      const icon = L.divIcon?.({
        className: "hivefw-neighbor-discovery-marker",
        html:
          '<span style="display:grid;place-items:center;width:18px;height:18px;border-radius:50%;' +
          'background:' + color + ';color:white;border:2px solid white;' +
          'box-shadow:0 1px 5px rgba(0,0,0,.4);font-size:8px;font-weight:750;">' +
          String(name).slice(0,2).toUpperCase() +
          '</span>',
        iconSize:[22,22],
        iconAnchor:[11,11],
      });

      const marker = L.marker([lat, lon], {
        title:name,
        keyboard:true,
        riseOnHover:true,
        ...(icon ? { icon } : {}),
      });
      marker.bindTooltip?.(name, {
        direction:"top",
        offset:[0,-12],
        className:"hivefw-map-tooltip",
      });
      marker.on?.("click", () => {
        this.__hiveNeighborMapFocusId = id;
        map?.leafletMap?.setView?.([lat, lon], 14, { animate:true });
        marker.openTooltip?.();
        this.__rerenderHiveNeighborDiscoveryOnly(false);
      });

      if (id) this.__hiveNeighborMapLeafletMarkers.set(id, marker);
      layers.push(marker);

      if (localCoords && (lat !== localCoords[0] || lon !== localCoords[1])) {
        const rssi = Number(item.rssi);
        const snr = Number(item.snr);
        const hasRssi = Number.isFinite(rssi);
        const hasSnr = Number.isFinite(snr);
        const line = L.polyline(
          [localCoords, [lat, lon]],
          {
            // Mesmo traço visual usado pelo Trace: a intensidade medida
            // fica no label, não na geometria da linha.
            weight: 4,
            opacity: .78,
            dashArray: "9 6",
            interactive: false,
          }
        );
        const signal = [
          hasRssi ? "RSSI " + Math.round(rssi) + " dBm" : null,
          hasSnr ? "SNR " + snr.toFixed(1) + " dB" : null,
        ].filter(Boolean).join(" · ");
        if (signal) {
          line.bindTooltip?.(signal, {
            permanent:true,
            direction:"center",
            className:"hive-neighbor-signal-label",
            opacity:0.92,
          });
        }
        this.__hiveNeighborMapSignalLayers.push(line);
        layers.unshift(line);
      }
    }

    return layers;
  }

  async __renderHiveNeighborDiscoveryMap(container) {
    container.replaceChildren();
    this.__hiveNeighborMapElement = null;

    const head = document.createElement("div");
    head.className = "hive-discovery-head";
    const heading = document.createElement("div");
    const eyebrow = document.createElement("div");
    eyebrow.className = "hive-discovery-eyebrow";
    eyebrow.textContent = "DESCOBERTA ATIVA";
    const title = document.createElement("div");
    title.className = "hive-discovery-title";
    title.textContent = "Mapa";
    const subtitle = document.createElement("div");
    subtitle.className = "hive-discovery-subtitle";
    subtitle.textContent = "Localização conhecida dos Repeaters encontrados.";
    heading.append(eyebrow, title, subtitle);
    head.appendChild(heading);
    container.appendChild(head);

    const host = document.createElement("div");
    host.className = "hive-neighbors-map-host";
    container.appendChild(host);

    const located = this.__hiveNeighborDiscoveryLocated();
    const total = Array.isArray(this.__hiveNeighborDiscovery?.results)
      ? this.__hiveNeighborDiscovery.results.length : 0;

    // Durante a janela de descoberta o mapa fica deliberadamente oculto.
    // Só é criado uma vez quando o timeout termina, evitando reconstruções
    // contínuas à medida que a lista recebe novos resultados.
    if (this.__hiveNeighborDiscovery?.active) {
      const note = document.createElement("div");
      note.className = "hive-neighbors-map-note";
      note.textContent =
        "Mapa oculto durante a descoberta. Será preenchido quando a pesquisa terminar.";
      host.appendChild(note);
      return;
    }

    const ready = await this.__ensureMapLoaded();
    if (!container.isConnected) return;

    if (!ready) {
      const note = document.createElement("div");
      note.className = "hive-neighbors-map-note";
      note.textContent = "Não foi possível carregar o mapa do Home Assistant.";
      host.appendChild(note);
      return;
    }

    if (!located.length) {
      const note = document.createElement("div");
      note.className = "hive-neighbors-map-note";
      note.textContent = total
        ? String(total) + " Repeater(s) encontrado(s), mas ainda sem localização conhecida."
        : "Os Repeaters encontrados aparecerão aqui quando a descoberta começar.";
      host.appendChild(note);
      return;
    }

    const count = document.createElement("div");
    count.className = "hive-neighbors-map-count";
    count.textContent = String(located.length) + "/" + String(total) + " com localização";
    host.appendChild(count);

    const map = document.createElement("ha-map");
    map.autoFit = false;
    map.clusterMarkers = true;
    map.scaleRuler = true;
    map.themeMode = "light";
    host.appendChild(map);
    this.__hiveNeighborMapElement = map;

    // Let the flex/grid layout settle before Leaflet measures the container.
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    if (!map.isConnected) return;

    // Home Assistant 2026.9 exposes Leaflet layers rather than
    // editableLocations. Use the same compatibility path as the Nodes map.
    if ("layers" in map && await this.__waitForLegacyLeaflet(map)) {
      map.entities = [];
      map.layers = this.__hiveNeighborLegacyLeafletLayers(map, located);

      const coords = located.map((item) => [
        Number(item.latitude),
        Number(item.longitude),
      ]);
      if (coords.length === 1) {
        map.leafletMap?.setView?.(coords[0], 11, { animate:false });
      } else if (coords.length > 1 && map.Leaflet?.latLngBounds) {
        const bounds = map.Leaflet.latLngBounds(coords);
        map.leafletMap?.fitBounds?.(bounds, {
          padding:[28,28],
          maxZoom:12,
          animate:false,
        });
      }
      map.leafletMap?.invalidateSize?.(false);
    } else {
      const entityIds = located
        .map((item) => item.map_entity_id)
        .filter((entityId) => entityId && this.hass?.states?.[entityId]);
      map.entities = entityIds;
      if ("editableLocations" in map) {
        const locations = this.__hiveNeighborMapLocations();
        const localPoint = this.__hiveNeighborLocalMapPoint();
        if (localPoint) {
          const localElement = document.createElement("div");
          localElement.textContent = "H";
          localElement.style.cssText =
            "width:30px;height:30px;border-radius:50%;display:grid;place-items:center;" +
            "font-size:10px;font-weight:800;background:var(--warning-color,#ff9800);" +
            "color:#fff;border:3px solid #fff;box-shadow:0 1px 6px rgba(0,0,0,.4)";
          locations.unshift({
            id:"__hivefw_local__",
            location:[Number(localPoint.latitude), Number(localPoint.longitude)],
            element:localElement,
            elementSize:[36,36],
            title:"HiveFW local · " + localPoint.name,
            locationEditable:false,
            activatable:false,
          });
        }
        map.editableLocations = locations;
      }
      map.autoFit = true;
    }

    if (this.__hiveNeighborMapFocusId) {
      const selected = located.find(
        (item) =>
          String(item.pubkey || item.pubkey_prefix || "") ===
          this.__hiveNeighborMapFocusId
      );
      if (selected) {
        const coords = [Number(selected.latitude), Number(selected.longitude)];
        if (map.leafletMap) {
          map.leafletMap.setView(coords, 14, { animate:false });
        } else {
          map.setView?.(coords, 14);
        }
      }
    }
  }

  __neighborCard(neighbor) {
    const card = document.createElement("article");
    card.className = "hive-neighbor-card";

    const icon = document.createElement("div");
    icon.className = "hive-neighbor-icon";
    icon.textContent = "⌁";

    const info = document.createElement("div");

    const name = document.createElement("div");
    name.className = "hive-neighbor-name";
    name.textContent = neighbor.name || neighbor.pubkey_prefix || "Repeater";

    const prefix = document.createElement("div");
    prefix.className = "hive-neighbor-prefix";
    prefix.textContent = String(neighbor.pubkey_prefix || "").toUpperCase();

    const meta = document.createElement("div");
    meta.className = "hive-neighbor-meta";

    const direct = document.createElement("span");
    direct.className = "hive-neighbor-pill";
    direct.textContent = "ZERO-HOP";
    meta.appendChild(direct);

    if (neighbor.known_contact) {
      const known = document.createElement("span");
      known.textContent = "Contacto adicionado";
      meta.appendChild(known);
    } else {
      const discovered = document.createElement("span");
      discovered.textContent = "Descoberto";
      meta.appendChild(discovered);
    }

    info.append(name, prefix, meta);

    const side = document.createElement("div");
    side.className = "hive-neighbor-side";

    const age = document.createElement("div");
    age.className = "hive-neighbor-age";
    age.textContent = this.__age(Number(neighbor.secs_ago || 0));

    const label = document.createElement("div");
    label.className = "hive-neighbor-side-label";
    label.textContent = "último advert";

    side.append(age, label);
    card.append(icon, info, side);
    return card;
  }

  __age(seconds) {
    const value = Math.max(0, Math.floor(Number(seconds) || 0));
    if (value < 10) return "agora";
    if (value < 60) return `${value}s`;
    const minutes = Math.floor(value / 60);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} h`;
    return `${Math.floor(hours / 24)} d`;
  }
}

customElements.define("hivefw-panel", HiveFWPanel);
