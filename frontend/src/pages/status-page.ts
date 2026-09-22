import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, PanelConfig, MeshCoreDevice, LocalRepeaterStatus } from '../types';
import { executeLocal, getLocalRepeaterStatus } from '../api';
import { loadMeshcoreEntityRegistry, type EntityInfo } from '../utils/classify-entity';
import type { CompanionDeviceDescriptor } from '../components/node-summary';
import '../components/node-summary';

@customElement('meshcore-status-page')
export class StatusPage extends LitElement {
  @property({ type: Object }) hass?: HomeAssistant;
  @property({ type: Object }) config?: PanelConfig;
  @property({ type: Boolean }) narrow = false;
  @property({ type: Object }) selectedDevice?: MeshCoreDevice;
  @property({ type: Number }) contactCount = 0;
  @property({ type: Number }) channelCount = 0;

  @state() private _repeaterStatus: LocalRepeaterStatus | null = null;
  @state() private _deviceEntities: Record<string, EntityInfo[]> = {};
  @state() private _meshcoreDeviceMap: Record<string, string> = {};
  @state() private _hiddenSensors: Record<string, string[]> = {};
  @state() private _contextMenu: { entityId: string; label: string; deviceKey: string } | null = null;
  @state() private _statusMessage: { text: string; type: 'success' | 'error' } | null = null;
  @state() private _hiddenSensorsOpen = false;
  private _loadedEntry: string | null = null;
  private _statusMessageTimeout: number | null = null;

  static styles = css`
    :host{display:block;width:100%;height:100%;overflow:auto;background:var(--primary-background-color)}
    .page{box-sizing:border-box;width:100%;padding:20px}
    .wrap{width:100%;max-width:none;margin:0}
    .device-section{box-sizing:border-box;width:100%;padding:16px;border:1px solid var(--divider-color);border-radius:12px;background:var(--card-background-color)}
    .companion-header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:14px}
    .section-title{display:flex;align-items:flex-start;gap:10px;min-width:0}
    .section-icon{width:36px;height:36px;display:grid;place-items:center;border-radius:10px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color);flex:0 0 auto}
    .device-name{font-size:16px;font-weight:700;color:var(--primary-text-color)}
    .device-meta{display:flex;flex-wrap:wrap;gap:5px 12px;margin-top:4px;font-size:10px;color:var(--secondary-text-color)}
    .device-meta span{overflow-wrap:anywhere}
    .actions-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
    button{font:inherit;cursor:pointer}
    .action,.danger,.minor{min-height:38px;padding:8px 12px;border-radius:8px}
    .action{border:0;background:var(--primary-color);color:var(--text-primary-color,#fff);font-weight:600}
    .danger{border:1px solid var(--error-color,#db4437);background:var(--error-color,#db4437);color:#fff;font-weight:700}
    .danger:hover:not(:disabled){filter:brightness(.92)}
    .minor{border:1px solid var(--divider-color);background:var(--secondary-background-color);color:var(--primary-text-color)}
    button:disabled{opacity:.55;cursor:not-allowed}
    .toast{position:fixed;right:20px;bottom:20px;z-index:20;max-width:min(420px,calc(100vw - 40px));padding:10px 14px;border-radius:9px;background:var(--card-background-color);box-shadow:0 4px 20px rgba(0,0,0,.2)}
    .toast.success{border-left:4px solid var(--success-color,#4caf50)} .toast.error{border-left:4px solid var(--error-color,#f44336)}
    .overlay{position:fixed;inset:0;z-index:30;display:grid;place-items:center;padding:16px;background:rgba(0,0,0,.45)}
    .dialog{width:min(520px,100%);max-height:80vh;overflow:auto;padding:16px;border-radius:12px;background:var(--card-background-color);color:var(--primary-text-color)}
    .dialog-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px}
    .dialog-title{font-size:16px;font-weight:700}.sensor-row{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 0;border-top:1px solid var(--divider-color)}
    .sensor-id{font-size:10px;color:var(--secondary-text-color);overflow-wrap:anywhere}
    @media(max-width:870px){.page{padding:12px}.companion-header{align-items:stretch}.actions-row>*{flex:1 1 140px}.device-meta{flex-direction:column;gap:3px}}
  `;

  connectedCallback() {
    super.connectedCallback();
    this._loadHiddenSensors();
  }

  protected updated() {
    const entry = this.selectedDevice?.entry_id || null;
    if (entry && entry !== this._loadedEntry) {
      this._loadedEntry = entry;
      void this._loadData();
    }
  }

  private async _loadData() {
    if (!this.hass) return;
    try {
      const [{ meshcoreDeviceMap, deviceEntities }, repeaterStatus] = await Promise.all([
        loadMeshcoreEntityRegistry(this.hass),
        getLocalRepeaterStatus(this.hass, this.config?.entry_id).catch(() => null),
      ]);
      this._meshcoreDeviceMap = meshcoreDeviceMap;
      this._deviceEntities = deviceEntities;
      this._repeaterStatus = repeaterStatus;
    } catch {
      this._repeaterStatus = null;
    }
  }

  private _deviceKey() { return this.selectedDevice?.entry_id || 'companion'; }

  private _entities(): EntityInfo[] {
    if (!this.hass || !this.selectedDevice) return [];
    const hidden = new Set(this._hiddenSensors[this._deviceKey()] || []);
    const entryId = this.selectedDevice.entry_id;
    const haDeviceId = this._meshcoreDeviceMap[entryId];
    if (haDeviceId && this._deviceEntities[haDeviceId]) {
      return this._deviceEntities[haDeviceId].filter((e) => !hidden.has(e.entity_id));
    }
    const prefix = this.selectedDevice.pubkey_prefix?.substring(0, 6)?.toLowerCase() || '';
    if (!prefix) return [];
    const results: EntityInfo[] = [];
    for (const [deviceId, entities] of Object.entries(this._deviceEntities)) {
      const managed = Object.entries(this._meshcoreDeviceMap).some(
        ([key, id]) => id === deviceId && (key.includes('_repeater_') || key.includes('_client_')),
      );
      if (managed) continue;
      for (const entity of entities) {
        if (entity.entity_id.toLowerCase().includes(prefix) && !hidden.has(entity.entity_id)) results.push(entity);
      }
    }
    return results.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  private _descriptor(d: MeshCoreDevice): CompanionDeviceDescriptor {
    return { type:'companion', name:d.name, pubkey_prefix:d.pubkey_prefix, connected:d.connected, firmware:d.firmware, entry_id:d.entry_id };
  }

  private _loadHiddenSensors() {
    try { this._hiddenSensors = JSON.parse(localStorage.getItem('meshcore-hidden-sensors') || '{}'); }
    catch { this._hiddenSensors = {}; }
  }
  private _saveHiddenSensors() {
    try { localStorage.setItem('meshcore-hidden-sensors', JSON.stringify(this._hiddenSensors)); } catch {}
  }
  private _hideSensor(entityId: string, label: string) {
    const key=this._deviceKey(); const current=this._hiddenSensors[key]||[];
    if(!current.includes(entityId)) this._hiddenSensors={...this._hiddenSensors,[key]:[...current,entityId]};
    this._saveHiddenSensors(); this._contextMenu=null; this._showStatus('Oculto: '+label,'success');
  }
  private _unhideSensor(entityId: string) {
    const key=this._deviceKey(); const next=(this._hiddenSensors[key]||[]).filter((id)=>id!==entityId);
    const copy={...this._hiddenSensors}; if(next.length) copy[key]=next; else delete copy[key];
    this._hiddenSensors=copy; this._saveHiddenSensors();
  }

  private async _action(command:string,args?:Record<string,unknown>,label?:string){
    if(!this.hass)return;
    try{
      const result=await executeLocal(this.hass,command,args,this.config?.entry_id);
      this._showStatus('Companion: '+(label||command)+' → '+(result.response||'OK'),'success');
      if(command==='set_time') void this._loadData();
    }catch(error){this._showStatus('Companion: '+(label||command)+' — '+String(error),'error');}
  }

  private _trace=()=>{
    this.dispatchEvent(new CustomEvent('companion-trace-requested',{detail:{entryId:this.selectedDevice?.entry_id},bubbles:true,composed:true}));
  };

  private _showStatus(text:string,type:'success'|'error'){
    this._statusMessage={text,type};
    if(this._statusMessageTimeout!==null)window.clearTimeout(this._statusMessageTimeout);
    this._statusMessageTimeout=window.setTimeout(()=>{this._statusMessage=null;this._statusMessageTimeout=null;},5000);
  }

  render(){
    const d=this.selectedDevice;
    if(!d)return html`<div class="page"><div class="wrap">Sem Companion selecionado.</div></div>`;
    const entities=this._entities();
    const hidden=this._hiddenSensors[this._deviceKey()]||[];
    const nodeInfo=entities.find((e)=>e.entity_id.includes('node_count'));
    const nodeState=nodeInfo?this.hass?.states[nodeInfo.entity_id]?.state:undefined;
    const addedNodes=nodeState&&nodeState!=='unknown'&&nodeState!=='unavailable'?nodeState:undefined;
    return html`
      <div class="page"><div class="wrap">
        <div class="device-section">
          <div class="companion-header">
            <div class="section-title">
              <div class="section-icon"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M9,2A1,1 0 0,0 8,3C8,8.67 8,14.33 8,20C8,21.11 8.89,22 10,22H15C16.11,22 17,21.11 17,20V9C17,7.89 16.11,7 15,7H10V3A1,1 0 0,0 9,2M10,9H15V13H10V9Z"/></svg></div>
              <div>
                <div class="device-name">${d.name}</div>
                <div class="device-meta">
                  <span>HiveFW Companion-Repeater</span><span>Firmware: ${d.firmware||'unknown'}</span>
                  <span>Key: ${d.pubkey_prefix}</span><span>Nós conhecidos: ${this.contactCount}</span><span>Canais: ${this.channelCount}</span>
                  ${addedNodes!==undefined?html`<span>Added nodes: ${addedNodes}</span>`:nothing}
                </div>
              </div>
            </div>
            ${hidden.length?html`<button class="minor" @click=${()=>this._hiddenSensorsOpen=true}>Sensores ocultos (${hidden.length})</button>`:nothing}
          </div>

          ${entities.length?html`<meshcore-node-summary
            data-hive-native-cockpit="1"
            .hass=${this.hass}
            .device=${this._descriptor(d)}
            .entities=${entities}
            .hiddenCount=${hidden.length}
            .repeaterStatus=${this._repeaterStatus}
            @tile-context-menu=${(e:CustomEvent)=>{this._contextMenu={...e.detail,deviceKey:this._deviceKey()};}}>
          </meshcore-node-summary>`:nothing}

          <div class="actions-row">
            <button class="action" ?disabled=${!d.connected} @click=${()=>this._action('send_advert',undefined,'Local Advert')}>Local Advert</button>
            <button class="action" ?disabled=${!d.connected} @click=${()=>this._action('send_advert',{flood:true},'Flood Advert')}>Flood Advert</button>
            <button class="action" ?disabled=${!d.connected} @click=${()=>this._action('set_time',{val:Math.floor(Date.now()/1000)},'Sync Clock')}>Sync Clock</button>
            <button class="action" ?disabled=${!d.connected} @click=${this._trace}>Trace</button>
            <button class="danger" ?disabled=${!d.connected} @click=${()=>{if(window.confirm('Reiniciar agora o HiveFW?'))void this._action('reboot',undefined,'Reboot');}}>Reboot</button>
          </div>
        </div>
      </div></div>

      ${this._contextMenu?html`<div class="overlay" @click=${()=>this._contextMenu=null}><div class="dialog" @click=${(e:Event)=>e.stopPropagation()}>
        <div class="dialog-head"><div class="dialog-title">${this._contextMenu.label}</div><button class="minor" @click=${()=>this._contextMenu=null}>Fechar</button></div>
        <button class="danger" @click=${()=>this._hideSensor(this._contextMenu!.entityId,this._contextMenu!.label)}>Ocultar sensor</button>
      </div></div>`:nothing}

      ${this._hiddenSensorsOpen?html`<div class="overlay" @click=${()=>this._hiddenSensorsOpen=false}><div class="dialog" @click=${(e:Event)=>e.stopPropagation()}>
        <div class="dialog-head"><div class="dialog-title">Sensores ocultos</div><button class="minor" @click=${()=>this._hiddenSensorsOpen=false}>Fechar</button></div>
        ${hidden.map((id)=>html`<div class="sensor-row"><div><div>${Object.values(this._deviceEntities).flat().find((e)=>e.entity_id===id)?.label||id}</div><div class="sensor-id">${id}</div></div><button class="minor" @click=${()=>this._unhideSensor(id)}>Mostrar</button></div>`)}
      </div></div>`:nothing}

      ${this._statusMessage?html`<div class="toast ${this._statusMessage.type}">${this._statusMessage.text}</div>`:nothing}
    `;
  }
}

declare global { interface HTMLElementTagNameMap { 'meshcore-status-page': StatusPage; } }
