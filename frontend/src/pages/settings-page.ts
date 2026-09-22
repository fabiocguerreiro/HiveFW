import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, PanelConfig, DeviceConfig, MeshCoreDevice, LocalRepeaterStatus, LocalRegionsResponse, ManagedDevice } from '../types';
import {
  getDeviceConfig,
  getLocalRepeaterStatus,
  getLocalRegions,
  setLocalRegion,
  getFirmwareOtaStatus,
  installLatestFirmware,
  getDutyCycle,
  setDutyCycle,
  getManagedDevices,
  getFloodScopes,
  setFloodScopes,
  getRemoteRegions,
  setDeviceConfig,
  executeRemote,
  subscribeIdentityChange,
  setLocationSource,
} from '../api';
import type {
  FirmwareOtaStatus,
  IdentityFlowStep,
  SetDeviceConfigRenameResult,
} from '../api';
import '../components/confirm-dialog';
import { attachDialogA11y } from '../utils/dialog-a11y';
import { panelStyles } from '../styles';

interface ConfirmAction {
  title: string;
  message: string;
  onConfirm: () => Promise<void>;
  requireTyped?: string;
}

/**
 * State for the streaming-progress identity-change modal.
 *
 * The Regenerate / Import flow takes ~5-10s end-to-end (host-side seed
 * generate + clamp, SDK ``import_private_key``, device reboot, transport
 * reconnect, config-entry reload, post-reload pubkey verify). A
 * single-toast UX is insufficient for an irreversible
 * change of this duration; this state machine drives a step checklist
 * during the flow and a terminal panel afterward (success or failure).
 */
type IdentityFlowKind = 'regenerate' | 'import';

type IdentityFlowState =
  | { kind: 'closed' }
  | {
      kind: 'progress';
      flow: IdentityFlowKind;
      currentStep: IdentityFlowStep;
      completedSteps: Set<IdentityFlowStep>;
    }
  | {
      kind: 'success';
      flow: IdentityFlowKind;
      oldPubkey: string;
      newPubkey: string;
      warning?: string;
    }
  | {
      kind: 'failure';
      flow: IdentityFlowKind;
      code: string;
      message: string;
    };

/**
 * Ordered checklist for the progress panel. Each entry is one step
 * the backend emits as a ``{step}`` event_message; the UI marks it as
 * completed when a *later* step arrives (or as the current spinner if
 * it's the most recent event). Order matches
 * ``ws_api._do_identity_change`` and the regenerate/import handlers'
 * initial ``generating`` event.
 */
const IDENTITY_FLOW_STEP_ORDER: ReadonlyArray<{
  step: IdentityFlowStep;
  label: string;
}> = [
  { step: 'generating', label: 'Generating new key' },
  { step: 'importing', label: 'Sending key to device' },
  { step: 'rebooting', label: 'Rebooting device' },
  { step: 'reconnecting', label: 'Waiting for device reconnect' },
  { step: 'reloading', label: 'Reloading HiveFW integration' },
  { step: 'verifying', label: 'Verifying new identity' },
];

/**
 * Full settings page with multiple collapsible sections and companion device card at top
 */
@customElement('meshcore-settings-page')
export class SettingsPage extends LitElement {
  @property({ type: Object }) hass?: HomeAssistant;
  @property({ type: Object }) config?: PanelConfig;
  @property({ type: Boolean }) narrow = false;
  @property({ type: Object }) selectedDevice?: MeshCoreDevice;
  @property({ type: Number }) contactCount = 0;
  @property({ type: Number }) channelCount = 0;

  @state() private _deviceConfig: DeviceConfig | null = null;
  @state() private _repeaterStatus: LocalRepeaterStatus | null = null;
  @state() private _managedDevices: { repeaters: ManagedDevice[]; clients: ManagedDevice[] } = {
    repeaters: [],
    clients: [],
  };
  @state() private _scopeDraft = '';
  @state() private _scopeGlobal = false;
  @state() private _scopeSaving = false;
  @state() private _regionTarget = '';
  @state() private _regionText = '';
  @state() private _regionBusy = false;
  @state() private _localRegions: LocalRegionsResponse | null = null;
  @state() private _localRegionBusy = false;
  @state() private _localRegionAction: 'put' | 'remove' | 'allow' | 'deny' | 'home' | 'default' | 'clear_default' = 'put';
  @state() private _localRegionName = '';
  @state() private _localRegionParent = '';
  @state() private _regionAction: 'allowf' | 'denyf' | 'home' | 'default' | 'put' | 'remove' = 'allowf';
  @state() private _regionName = '';
  @state() private _loading = true;
  @state() private _error: string | null = null;
  @state() private _editValues: Record<string, unknown> = {};
  @state() private _saving = false;
  @state() private _firmwareOtaStatus: FirmwareOtaStatus | null = null;
  @state() private _firmwareFile: File | null = null;
  @state() private _firmwareBusy = false;
  @state() private _firmwareChecking = false;
  @state() private _firmwareUploadStage: 'uploading' | 'rebooting' | 'reconnecting' | null = null;
  @state() private _dutyCycleValue = 10;
  @state() private _dutyCycleReadValue: number | null = null;
  @state() private _dutyCycleBusy: 'read' | 'apply' | null = null;
  @state() private _adminPasswordDraft = '';
  @state() private _guestPasswordDraft = '';
  @state() private _repeaterAccessBusy: 'admin' | 'guest' | 'acl' | null = null;
  @state() private _confirmAction: ConfirmAction | null = null;
  @state() private _confirmDialogOpen = false;
  @state() private _locationSource: 'gps' | 'manual' | 'ha_location' = 'manual';
  @state() private _importKeyValue = '';

  // Streaming identity-change flow (Regenerate / Import).
  @state() private _identityFlowState: IdentityFlowState = { kind: 'closed' };
  private _identityFlowUnsubscribe: (() => void) | null = null;

  // Post-rename persistent dialog. Toast was too easy to
  // miss for an op that rewrites N entity_ids and triggers a
  // config-entry reload. When set, the panel renders a modal the user
  // must explicitly close; on close, we refresh device config so the
  // panel reflects the new name immediately.
  @state() private _renameSuccess: SetDeviceConfigRenameResult | null = null;

  // Status toast
  @state() private _statusMessage: { text: string; type: 'success' | 'error' } | null = null;
  private _statusMessageTimeout: number | null = null;

  constructor() {
    super();
    attachDialogA11y(this, {
      // Identity-flow modal is non-dismissible while in-flight; only
      // terminal states (success / failure) accept Escape via the
      // close button. The a11y attach still focus-traps the panel
      // when open.
      isOpen: () => this._identityFlowState.kind !== 'closed',
      onEscape: () => {
        if (
          this._identityFlowState.kind === 'success' ||
          this._identityFlowState.kind === 'failure'
        ) {
          this._closeIdentityFlowModal();
        }
      },
      getScope: () => this.shadowRoot?.querySelector('[data-a11y="identity-flow"]'),
    });
    // Rename success modal: focus-trap, Escape closes
    // and triggers the same refresh path as the Close button.
    attachDialogA11y(this, {
      isOpen: () => this._renameSuccess !== null,
      onEscape: () => this._closeRenameSuccessModal(),
      getScope: () => this.shadowRoot?.querySelector('[data-a11y="rename-success"]'),
    });
  }

  static styles = [
    panelStyles,
    css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .settings-page {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: var(--primary-background-color, #fafafa);
      }

      .settings-container {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
      }

      .settings-container::-webkit-scrollbar {
        width: 6px;
      }

      .settings-container::-webkit-scrollbar-track {
        background: transparent;
      }

      .settings-container::-webkit-scrollbar-thumb {
        background: var(--scrollbar-thumb, var(--scrollbar-thumb-color, #c1c1c1));
        border-radius: 3px;
      }

      .section-row {
        display: flex;
        gap: 12px;
        margin-bottom: 16px;
      }

      .section-row.full {
        flex: 1;
      }

      .form-group-inline {
        flex: 1 1 0;
        min-width: 0;
        max-width: 100%;
      }

      .danger-zone {
        margin-top: 16px;
        padding: 12px;
        border: 2px solid var(--error-color, #db4437);
        border-radius: 8px;
        background: rgba(219, 68, 55, 0.05);
      }

      .danger-zone-title {
        font-size: 13px;
        font-weight: 600;
        color: var(--error-color, #db4437);
        margin-bottom: 12px;
      }

      .danger-zone-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .info-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }

      .info-row:last-child {
        border-bottom: none;
      }

      .info-label {
        font-size: 13px;
        color: var(--secondary-text-color);
        font-weight: 500;
      }

      .info-value {
        font-size: 13px;
        color: var(--primary-text-color);
        font-family: monospace;
        font-weight: 500;
        word-break: break-all;
      }

      .settings-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
        margin-bottom: 16px;
        width: 100%;
        min-width: 0;
        max-width: 100%;
        box-sizing: border-box;
      }

      .settings-grid > *,
      .device-section,
      .section-row,
      .managed-device-row {
        min-width: 0;
        max-width: 100%;
        box-sizing: border-box;
      }

      .settings-grid > .device-section {
        margin-bottom: 0;
      }

      .managed-devices-card {
        grid-column: 1 / -1;
      }

      .managed-devices-summary {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 12px;
      }

      .managed-devices-chip {
        padding: 5px 9px;
        border-radius: 999px;
        background: var(--secondary-background-color, #f5f5f5);
        color: var(--secondary-text-color);
        font-size: 11px;
        font-weight: 600;
      }

      .managed-device-list {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }

      .repeater-setup-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
        margin-bottom: 10px;
      }

      .repeater-region-form {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px 10px;
        margin-bottom: 8px;
      }

      .managed-device-row {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        align-items: center;
        gap: 10px;
        padding: 11px 12px;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 10px;
        background: var(--primary-background-color);
      }

      .managed-device-icon {
        width: 34px;
        height: 34px;
        display: grid;
        place-items: center;
        border-radius: 9px;
        background: color-mix(in srgb, var(--primary-color) 10%, transparent);
        color: var(--primary-color);
        font-size: 16px;
        font-weight: 700;
      }

      .managed-device-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 13px;
        font-weight: 600;
      }

      .managed-device-meta {
        margin-top: 3px;
        color: var(--secondary-text-color);
        font-size: 10px;
      }

      .managed-device-state {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        white-space: nowrap;
        font-size: 10px;
        font-weight: 650;
      }

      .managed-device-state.online { color: #2e7d32; }
      .managed-device-state.offline { color: var(--secondary-text-color); }

      @media (max-width: 870px) {
        .managed-device-list,
        .repeater-setup-grid,
        .repeater-region-form {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 870px) {
        .settings-container {
          width: 100%;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
        }

        .settings-grid {
          grid-template-columns: minmax(0, 1fr);
          gap: 12px;
          width: 100%;
          min-width: 0;
        }

        .device-section {
          padding: 14px;
          width: 100%;
          min-width: 0;
          max-width: 100%;
          overflow-x: hidden;
          box-sizing: border-box;
        }

        .device-section > *,
        .settings-grid > *,
        .managed-device-list,
        .managed-device-row,
        .companion-header,
        .actions-row,
        .danger-zone {
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
        }

        .device-section input:not([type="checkbox"]):not([type="radio"]),
        .device-section select,
        .device-section textarea {
          width: 100%;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
        }

        .device-meta,
        .managed-device-meta,
        .info-value,
        .form-label {
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .section-row {
          flex-direction: column;
          align-items: stretch;
          gap: 8px;
          width: 100%;
        }

        .form-group-inline,
        .form-input,
        .form-select,
        .apply-button {
          width: 100%;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
        }

        .info-row {
          align-items: flex-start;
          gap: 8px;
          flex-wrap: wrap;
        }

        .info-label,
        .info-value {
          min-width: 0;
          max-width: 100%;
        }

        .info-value {
          margin-left: auto;
          text-align: right;
          overflow-wrap: anywhere;
        }

        .managed-device-row {
          grid-template-columns: auto minmax(0, 1fr);
          align-items: start;
        }

        .managed-device-row > div:last-child {
          grid-column: 2;
          display: flex !important;
          flex-wrap: wrap;
          justify-content: flex-start;
          min-width: 0;
        }

        .action-btn {
          max-width: 100%;
          white-space: normal;
          text-align: center;
        }

        .danger-zone,
        pre {
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
          overflow-wrap: anywhere;
        }

        .modal-card {
          width: calc(100vw - 24px);
          min-width: 0;
          max-width: 400px;
          box-sizing: border-box;
        }
      }

      .card-title {
        font-size: 15px;
        font-weight: 600;
        color: var(--primary-text-color);
        margin-bottom: 16px;
      }

      /* ─── Standalone Firmware Manager ─── */

      .firmware-manager {
        margin-top: 0;
        margin-bottom: 20px;
      }

      .firmware-manager-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        flex-wrap: wrap;
        margin-bottom: 12px;
      }

      .section-icon.firmware {
        background: color-mix(in srgb, var(--primary-color) 12%, transparent);
        color: var(--primary-color);
      }

      .firmware-host {
        padding: 5px 9px;
        border-radius: 999px;
        background: var(--secondary-background-color);
        color: var(--secondary-text-color);
        font: 11px ui-monospace, SFMono-Regular, Menlo, monospace;
      }

      .firmware-security {
        display: flex;
        align-items: center;
        gap: 7px;
        padding: 9px 11px;
        border-radius: 9px;
        background: color-mix(in srgb, #2e7d32 9%, transparent);
        color: var(--primary-text-color);
        font-size: 11px;
        margin-bottom: 14px;
      }

      .firmware-status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #2e7d32;
        flex: 0 0 auto;
      }

      .firmware-notice {
        padding: 10px 12px;
        border-radius: 9px;
        background: var(--secondary-background-color);
        color: var(--secondary-text-color);
        font-size: 11px;
        line-height: 1.45;
        margin-bottom: 14px;
      }

      .firmware-notice.warning {
        background: color-mix(in srgb, var(--warning-color, #ff9800) 12%, transparent);
        color: var(--primary-text-color);
      }

      .firmware-actions-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
      }

      .firmware-action-card {
        min-width: 0;
        padding: 14px;
        border: 1px solid var(--divider-color);
        border-radius: 10px;
        background: var(--primary-background-color);
      }

      .firmware-action-title {
        font-size: 13px;
        font-weight: 700;
        margin-bottom: 5px;
        color: var(--primary-text-color);
      }

      .firmware-action-text {
        min-height: 44px;
        margin-bottom: 12px;
        color: var(--secondary-text-color);
        font-size: 11px;
        line-height: 1.45;
      }

      .firmware-release-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        margin-top: 12px;
        padding: 10px 11px;
        border-radius: 8px;
        background: var(--secondary-background-color);
      }

      .firmware-release-label {
        color: var(--secondary-text-color);
        font-size: 10px;
      }

      .firmware-release-version {
        margin-top: 2px;
        font-size: 14px;
        font-weight: 700;
      }

      .firmware-release-link {
        color: var(--primary-color);
        font-size: 11px;
        font-weight: 600;
        text-decoration: none;
        white-space: nowrap;
      }

      .firmware-primary-action {
        width: 100%;
        margin-top: 10px;
      }

      .firmware-file-picker {
        min-height: 38px;
        display: flex;
        align-items: center;
        width: 100%;
        min-width: 0;
        padding: 8px 10px;
        border: 1px dashed var(--divider-color);
        border-radius: 8px;
        background: var(--secondary-background-color);
        color: var(--secondary-text-color);
        font-size: 11px;
        cursor: pointer;
        box-sizing: border-box;
        overflow: hidden;
      }

      .firmware-file-picker span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .firmware-file-picker input {
        display: none;
      }

      .firmware-empty {
        margin-top: 12px;
        padding: 10px;
        border-radius: 8px;
        background: var(--secondary-background-color);
        color: var(--secondary-text-color);
        font-size: 11px;
      }

      .firmware-progress-state {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 12px;
        padding: 11px 12px;
        border-radius: 9px;
        background: color-mix(in srgb, var(--primary-color) 9%, transparent);
        font-size: 11px;
        line-height: 1.4;
      }

      .firmware-progress-state strong {
        display: block;
        margin-bottom: 2px;
        font-size: 12px;
      }

      @media (max-width: 870px) {
        .firmware-actions-grid {
          grid-template-columns: minmax(0, 1fr);
        }

        .firmware-action-text {
          min-height: 0;
        }
      }

            /* ─── Companion Device Card Styles ─── */

      .device-section {
        background: var(--card-background-color, #fff);
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 16px;
        width: 100%;
        min-width: 0;
        max-width: 100%;
        box-sizing: border-box;
        overflow: hidden;
      }

      .companion-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
        gap: 8px;
        flex-wrap: wrap;
      }

      .section-title {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 0;
        flex: 1 1 auto;
      }

      .section-title > div:last-child {
        min-width: 0;
        flex: 1 1 auto;
      }

      .section-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        flex-shrink: 0;
      }

      .section-icon.companion {
        background: rgba(3, 169, 244, 0.12);
        color: #0288d1;
      }

      .device-name {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .device-meta {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-top: 2px;
      }

      .device-meta span {
        margin-right: 12px;
      }

      .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 600;
        flex-shrink: 0;
        white-space: nowrap;
        max-width: 100%;
      }

      .status-badge.online {
        background: rgba(76, 175, 80, 0.12);
        color: #2e7d32;
      }

      .status-badge.offline {
        background: rgba(114, 114, 114, 0.12);
        color: #616161;
      }

      .status-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
      }

      .status-dot.online {
        background: #4caf50;
      }

      .status-dot.offline {
        background: #9e9e9e;
      }

      .subsection-label {
        font-size: 12px;
        font-weight: 600;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 8px;
        margin-top: 16px;
      }

      .sensor-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
        gap: 8px;
      }

      .actions-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 16px;
      }

      .action-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        padding: 6px 12px;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 6px;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        white-space: nowrap;
      }

      .action-btn:hover:not(:disabled) {
        background: var(--secondary-background-color, #f5f5f5);
        border-color: var(--primary-color, #03a9f4);
      }

      .action-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .settings-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border: none;
        border-radius: 6px;
        background: transparent;
        color: var(--secondary-text-color);
        cursor: pointer;
        transition: all 0.2s;
        margin-left: 8px;
        flex-shrink: 0;
      }

      .settings-btn:hover {
        background: var(--secondary-background-color, #f0f0f0);
        color: var(--primary-text-color);
      }

      /* Modal overlay */
      .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.15s ease-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .modal-card {
        background: var(--card-background-color, #fff);
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        width: min(400px, calc(100vw - 24px));
        min-width: 0;
        max-width: 400px;
        max-height: 80vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }

      .modal-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .modal-close {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border: none;
        border-radius: 6px;
        background: transparent;
        color: var(--secondary-text-color);
        cursor: pointer;
        font-size: 18px;
      }

      .modal-close:hover {
        background: var(--secondary-background-color, #f0f0f0);
      }

      .modal-body {
        padding: 8px 0;
        overflow-y: auto;
      }

      .modal-action {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 20px;
        cursor: pointer;
        transition: background 0.15s;
        color: var(--primary-text-color);
        font-size: 14px;
        border: none;
        background: none;
        width: 100%;
        text-align: left;
      }

      .modal-action:hover {
        background: var(--secondary-background-color, #f5f5f5);
      }

      .modal-action.danger {
        color: var(--error-color, #db4437);
      }

      .modal-action-icon {
        display: flex;
        align-items: center;
        color: var(--secondary-text-color);
        flex-shrink: 0;
      }

      .modal-action.danger .modal-action-icon {
        color: var(--error-color, #db4437);
      }

      .modal-action:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .modal-action:disabled:hover {
        background: none;
      }

      .modal-divider {
        height: 1px;
        background: var(--divider-color, #e0e0e0);
        margin: 4px 0;
      }

      /* Hidden sensors list */
      .hidden-sensor-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }

      .hidden-sensor-item:last-child {
        border-bottom: none;
      }

      .hidden-sensor-name {
        font-size: 13px;
        color: var(--primary-text-color);
      }

      .hidden-sensor-id {
        font-size: 11px;
        color: var(--secondary-text-color);
        margin-top: 2px;
      }

      .unhide-btn {
        padding: 4px 10px;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 4px;
        background: var(--card-background-color, #fff);
        color: var(--primary-color, #03a9f4);
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        white-space: nowrap;
      }

      .unhide-btn:hover {
        background: var(--secondary-background-color, #f5f5f5);
      }

      .modal-footer {
        padding: 12px 20px;
        border-top: 1px solid var(--divider-color, #e0e0e0);
        display: flex;
        justify-content: flex-end;
      }

      .empty-hidden {
        padding: 20px;
        text-align: center;
        color: var(--secondary-text-color);
        font-size: 13px;
      }

      /* Status toast */
      .status-toast {
        position: fixed;
        bottom: 20px;
        left: 20px;
        right: 20px;
        padding: 12px 16px;
        border-radius: 8px;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        font-size: 13px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
      }

      .status-toast.success {
        border-left: 4px solid #4caf50;
      }

      .status-toast.error {
        border-left: 4px solid var(--error-color, #db4437);
        color: var(--error-color, #db4437);
      }

      @keyframes slideIn {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this._loadDeviceConfig();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._statusMessageTimeout !== null) {
      clearTimeout(this._statusMessageTimeout);
      this._statusMessageTimeout = null;
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('config')) {
      this._loadDeviceConfig();
    }
  }

  private async _loadDeviceConfig() {
    if (!this.hass) return;

    this._loading = true;
    this._error = null;

    try {
      this._deviceConfig = await getDeviceConfig(this.hass, this.config?.entry_id);
      // Repeater status is best-effort: Settings remains usable even when an
      // older Companion cannot answer the newer stats/tuning queries.
      try {
        this._repeaterStatus = await getLocalRepeaterStatus(this.hass, this.config?.entry_id);
        if (
          this._repeaterStatus?.duty_cycle !== undefined &&
          this._dutyCycleReadValue === null
        ) {
          this._dutyCycleValue = Number(this._repeaterStatus.duty_cycle);
          this._dutyCycleReadValue = Number(this._repeaterStatus.duty_cycle);
        }
      } catch {
        this._repeaterStatus = null;
      }
      try {
        this._localRegions = await getLocalRegions(
          this.hass,
          this.config?.entry_id,
        );
      } catch {
        this._localRegions = null;
      }
      try {
        this._firmwareOtaStatus = await getFirmwareOtaStatus(
          this.hass,
          this.config?.entry_id,
        );
      } catch {
        this._firmwareOtaStatus = null;
      }
      this._managedDevices = await getManagedDevices(this.hass, this.config?.entry_id);
      const scopes = await getFloodScopes(this.hass, this.config?.entry_id);
      this._scopeDraft = scopes.scopes.join(', ');
      this._scopeGlobal = scopes.global;
      if (!this._regionTarget && this._managedDevices.repeaters.length) {
        this._regionTarget = this._managedDevices.repeaters[0].pubkey_prefix;
      }
      // Initialize location source from backend instead of defaulting to 'manual'
      if (this._deviceConfig?.location_source) {
        this._locationSource = this._deviceConfig.location_source as 'gps' | 'manual' | 'ha_location';
      }
    } catch (error) {
      this._error = `Failed to load device configuration: ${String(error)}`;
    } finally {
      this._loading = false;
    }
  }

  render() {
    if (this._loading) {
      return html`
        <div class="settings-page">
          <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--secondary-text-color);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div class="loading-spinner"></div>
              <span>Loading settings...</span>
            </div>
          </div>
        </div>
      `;
    }

    if (this._error) {
      return html`
        <div class="settings-page">
          <div style="padding: 16px; color: var(--error-color); font-size: 14px;">
            ${this._error}
          </div>
        </div>
      `;
    }

    if (!this._deviceConfig) {
      return html`<div>No device config loaded</div>`;
    }

    return html`
      <div class="settings-page">
        <div class="settings-container" data-hive-native-layout="device-v2">
          <!-- Definições owns all configuration/maintenance cards. -->
          <!-- Full-width Repeater setup. -->
          ${this.selectedDevice ? html`
            <div id="hive-repeater-settings-card"
                 class="device-section"
                 data-hive-native="repeater"
                 style="margin-bottom:16px;">
              <div class="card-title">Repeater Setup</div>
              ${this._renderRepeaterSettings()}
              <div style="height:1px;background:var(--divider-color);margin:16px 0;"></div>
              <div style="font-size:13px;font-weight:600;margin-bottom:10px;">Regions &amp; Scopes</div>
              ${this._renderRegionsScopes()}
            </div>
          ` : nothing}

          <!-- Firmware manager is the third full-width card. -->
          ${this.selectedDevice ? this._renderFirmwareOta() : nothing}

          <!-- Two-column grid for the remaining device settings cards -->
          <div class="settings-grid">
            <!-- Companion Information -->
            <div class="device-section">
              <div class="card-title">General</div>
              ${this._renderDeviceInfo()}
            </div>

            <!-- Radio & RF Settings -->
            <div class="device-section">
              <div class="card-title">Radio</div>
              ${this._renderRadioSettings()}
            </div>

            <!-- Device identity belongs to Definições, not Estado. -->
            <div class="device-section">
              <div class="card-title">Identidade</div>
              ${this._renderIdentityManagement()}
            </div>

            <!-- Local observability/RX hosts are part of the native layout so
                 HiveFW can populate them without inserting cards after first paint. -->
            <div id="hive-rxlog-card" class="device-section" data-hive-native-host="rx-log">
              <div class="card-title">RX Log</div>
            </div>

            <div id="hive-observability-settings-card" class="device-section" data-hive-native-host="observability">
              <div class="card-title">Alertas &amp; automações</div>
            </div>

            <!-- Location -->
            <div class="device-section">
              <div class="card-title">Location</div>
              ${this._renderLocation()}
            </div>

          </div>

        </div>
      </div>

      <!-- Modals & Dialogs -->
      <!-- Identity Flow Modal (streaming progress) -->
      ${this._renderIdentityFlowModal()}

      <!-- Rename Success Modal (persistent dialog) -->
      ${this._renderRenameSuccessModal()}

      <!-- Status Toast -->
      ${this._statusMessage ? html`
        <div class="status-toast ${this._statusMessage.type}">
          ${this._statusMessage.text}
        </div>
      ` : nothing}

      <!-- Dialogs -->
      <meshcore-confirm-dialog
        .open=${this._confirmDialogOpen}
        .title=${this._confirmAction?.title || ''}
        .message=${this._confirmAction?.message || ''}
        .requireTyped=${this._confirmAction?.requireTyped}
        ?dangerous=${!!this._confirmAction?.requireTyped}
        @confirm=${this._onConfirmAction}
        @cancel=${this._onConfirmCancel}>
      </meshcore-confirm-dialog>

    `;
  }

  private _renderFirmwareOta() {
    const ota = this._firmwareOtaStatus;
    const installed = ota?.installed_version || this.selectedDevice?.firmware || '—';
    const latest = ota?.latest_version || '—';
    const isReady = Boolean(ota?.supported && ota?.secure_ota && !ota?.bootstrap_required);

    return html`
      <div class="device-section firmware-manager">
        <div class="firmware-manager-header">
          <div class="section-title">
            <div class="section-icon firmware">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M5 20h14v-2H5v2zm7-18l-5.5 5.5 1.42 1.42L11 5.83V16h2V5.83l3.08 3.09 1.42-1.42L12 2z"/>
              </svg>
            </div>
            <div>
              <div class="device-name">Gestor de Firmware</div>
              <div class="device-meta">
                <span>Firmware reportado: ${installed}</span>
                ${ota?.release_available
                  ? html`<span>Última Release: ${latest}</span>`
                  : html`<span>Release: por verificar</span>`}
              </div>
            </div>
          </div>
          ${ota?.host
            ? html`<span class="firmware-host">${ota.host}</span>`
            : nothing}
        </div>

        ${!ota
          ? html`
              <div class="firmware-notice">
                O estado OTA ainda não foi carregado. Usa “Verificar Releases”.
              </div>
            `
          : !ota.supported
            ? html`
                <div class="firmware-notice warning">
                  O gestor OTA requer ligação TCP/Wi-Fi ao HiveFW.
                </div>
              `
            : ota.bootstrap_required
              ? html`
                  <div class="firmware-notice warning">
                    Este firmware ainda requer o bootstrap OTA seguro.
                  </div>
                `
              : html`
                  <div class="firmware-security">
                    <span class="firmware-status-dot"></span>
                    OTA seguro ativo · credencial efémera gerida apenas pelo backend
                  </div>
                `}

        <div class="firmware-actions-grid">
          <div class="firmware-action-card">
            <div class="firmware-action-title">Release oficial</div>
            <div class="firmware-action-text">
              Consulta agora o GitHub e, quando existir uma Release, permite
              flashar diretamente a versão mais recente disponível.
            </div>

            <button
              class="apply-button"
              ?disabled=${this._firmwareBusy || this._firmwareChecking}
              @click=${this._checkFirmwareUpdates}>
              ${this._firmwareChecking ? 'A verificar Releases…' : 'Verificar Releases'}
            </button>

            ${ota?.release_available
              ? html`
                  <div class="firmware-release-row">
                    <div>
                      <div class="firmware-release-label">Última versão publicada</div>
                      <div class="firmware-release-version">${latest}</div>
                    </div>
                    ${ota.release_url
                      ? html`
                          <a
                            class="firmware-release-link"
                            href=${ota.release_url}
                            target="_blank"
                            rel="noopener">
                            Ver Release
                          </a>
                        `
                      : nothing}
                  </div>

                  <button
                    class="apply-button firmware-primary-action"
                    ?disabled=${this._firmwareBusy || !isReady}
                    @click=${this._installLatestFirmware}>
                    ${this._firmwareBusy
                      ? 'A processar firmware…'
                      : `Flash da última Release (${latest})`}
                  </button>
                `
              : html`
                  <div class="firmware-empty">
                    Ainda não foi encontrada uma Release OTA pública.
                  </div>
                `}
          </div>

          <div class="firmware-action-card">
            <div class="firmware-action-title">Flash manual</div>
            <div class="firmware-action-text">
              Seleciona um <strong>firmware.bin</strong> de aplicação. Imagens
              <strong>merged</strong> / factory não são aceites pelo OTA.
            </div>

            <label class="firmware-file-picker">
              <span>${this._firmwareFile ? this._firmwareFile.name : 'Selecionar ficheiro .bin'}</span>
              <input
                type="file"
                accept=".bin,application/octet-stream"
                ?disabled=${this._firmwareBusy}
                @change=${(e: Event) => {
                  const input = e.target as HTMLInputElement;
                  this._firmwareFile = input.files?.[0] || null;
                }}
              />
            </label>

            <button
              class="apply-button firmware-primary-action"
              ?disabled=${this._firmwareBusy || !this._firmwareFile || !isReady}
              @click=${this._uploadFirmwareFile}>
              ${this._firmwareBusy ? 'A processar firmware…' : 'Flash do ficheiro selecionado'}
            </button>
          </div>
        </div>

        ${this._firmwareUploadStage
          ? html`
              <div class="firmware-progress-state">
                <div class="loading-spinner"></div>
                <div>
                  <strong>
                    ${this._firmwareUploadStage === 'uploading'
                      ? 'A enviar firmware'
                      : this._firmwareUploadStage === 'rebooting'
                        ? 'Firmware aceite · a reiniciar'
                        : 'A aguardar reconexão'}
                  </strong>
                  <div>
                    ${this._firmwareUploadStage === 'uploading'
                      ? 'O Home Assistant está a enviar e validar a imagem OTA.'
                      : this._firmwareUploadStage === 'rebooting'
                        ? 'O rádio recebeu a imagem e está a arrancar novamente.'
                        : 'A ligação TCP/Wi-Fi será retomada automaticamente.'}
                  </div>
                </div>
              </div>
            `
          : nothing}
      </div>
    `;
  }

  private async _checkFirmwareUpdates() {
    if (!this.hass) return;
    this._firmwareChecking = true;
    try {
      const status = await getFirmwareOtaStatus(
        this.hass,
        this.config?.entry_id,
        true,
      );
      this._firmwareOtaStatus = status;
      if (status.release_available) {
        this._showStatusMessage(
          `Última Release encontrada: ${status.latest_version || 'desconhecida'}.`,
          'success',
        );
      } else {
        this._showStatusMessage('Ainda não existe uma Release OTA pública.', 'success');
      }
    } catch (error) {
      this._showStatusMessage(
        `Verificação de firmware: ${error instanceof Error ? error.message : String(error)}`,
        'error',
      );
    } finally {
      this._firmwareChecking = false;
    }
  }

  private async _refreshFirmwareOtaStatus() {
    if (!this.hass) return;
    try {
      this._firmwareOtaStatus = await getFirmwareOtaStatus(
        this.hass,
        this.config?.entry_id,
      );
    } catch {
      // Keep the previous status visible during the radio reboot window.
    }
  }

  private async _uploadFirmwareFile() {
    if (!this.hass || !this._firmwareFile || !this.config?.entry_id) return;

    if (!this.hass.fetchWithAuth) {
      this._showStatusMessage(
        'Esta versão do Home Assistant não disponibiliza upload autenticado para o painel.',
        'error',
      );
      return;
    }

    const file = this._firmwareFile;
    if (!file.name.toLowerCase().endsWith('.bin') || file.name.toLowerCase().includes('merged')) {
      this._showStatusMessage('Seleciona o firmware .bin OTA, não o ficheiro merged.', 'error');
      return;
    }

    this._firmwareBusy = true;
    this._firmwareUploadStage = 'uploading';

    try {
      const form = new FormData();
      form.append('entry_id', this.config.entry_id);
      form.append('firmware', file, file.name);

      // Use Home Assistant's own authenticated fetch helper. Our panel never
      // reads, copies or stores the HA access token, and the OTA credential is
      // generated exclusively inside the backend immediately before upload.
      const response = await this.hass.fetchWithAuth(
        '/api/hivefw_integration/firmware',
        {
          method: 'POST',
          body: form,
        },
      );

      let payload: { success?: boolean; error?: string } = {};
      try {
        payload = await response.json();
      } catch {
        payload = {};
      }

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || `HTTP ${response.status}`);
      }

      this._firmwareUploadStage = 'rebooting';
      this._firmwareFile = null;
      this._showStatusMessage('Firmware enviado. O HiveFW está a reiniciar.', 'success');

      window.setTimeout(() => {
        this._firmwareUploadStage = 'reconnecting';
        void this._refreshFirmwareOtaStatus().finally(() => {
          window.setTimeout(() => {
            this._firmwareUploadStage = null;
            this._firmwareBusy = false;
          }, 2500);
        });
      }, 5000);
    } catch (error) {
      this._firmwareUploadStage = null;
      this._firmwareBusy = false;
      this._showStatusMessage(
        `Firmware OTA: ${error instanceof Error ? error.message : String(error)}`,
        'error',
      );
    }
  }

  private async _installLatestFirmware() {
    if (!this.hass) return;
    this._firmwareBusy = true;
    this._firmwareUploadStage = 'uploading';
    try {
      const result = await installLatestFirmware(this.hass, this.config?.entry_id);
      if (!result.success) throw new Error('A atualização não foi aceite.');
      this._firmwareUploadStage = 'rebooting';
      this._showStatusMessage(
        `Firmware ${result.version || ''} enviado. O HiveFW está a reiniciar.`,
        'success',
      );
      window.setTimeout(() => {
        this._firmwareUploadStage = 'reconnecting';
        void this._refreshFirmwareOtaStatus().finally(() => {
          this._firmwareUploadStage = null;
        });
      }, 5000);
    } catch (error) {
      const e = error as { message?: string };
      this._showStatusMessage(
        `Firmware OTA: ${e?.message || String(error)}`,
        'error',
      );
    } finally {
      if (this._firmwareUploadStage === 'uploading') {
        this._firmwareUploadStage = null;
      }
      this._firmwareBusy = false;
    }
  }

  // _renderSection removed — replaced with always-visible card layout

  private _renderDeviceInfo() {
    if (!this._deviceConfig) return;

    return html`
      <div class="info-row">
        <span class="info-label">Hardware Model</span>
        <span class="info-value">${this._deviceConfig.hardware_model}</span>
      </div>

      <div class="info-row">
        <span class="info-label">Public Key</span>
        <span class="info-value" style="display: flex; align-items: center; gap: 6px;">
          ${this._deviceConfig.pubkey}
          <button
            style="border: none; background: none; cursor: pointer; padding: 2px; color: var(--secondary-text-color); display: flex; align-items: center;"
            title="Copy public key"
            @click=${() => this._copyToClipboard(this._deviceConfig!.pubkey)}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
          </button>
        </span>
      </div>

      ${this._deviceConfig.connection_type ? html`
        <div class="info-row">
          <span class="info-label">Connection</span>
          <span class="info-value">${this._deviceConfig.connection_type.toUpperCase()}${this._deviceConfig.connection_address ? html` — ${this._deviceConfig.connection_address}` : ''}</span>
        </div>
      ` : ''}

      <div class="danger-zone" style="margin-top: 16px;">
        <div class="danger-zone-title">Rename Device</div>
        <div style="font-size: 12px; color: var(--secondary-text-color); margin-bottom: 8px;">
          Changing the device name will change all entity IDs. Automations, scripts, and dashboards using current entity IDs will need to be updated.
        </div>
        <div style="display: flex; gap: 8px;">
          <input
            type="text"
            class="form-input"
            style="flex: 1;"
            .value=${this._editValues['name'] ?? this._deviceConfig.name}
            @input=${(e: Event) => {
              this._editValues['name'] = (e.target as HTMLInputElement).value;
            }}
          />
          <button class="danger-button"
            ?disabled=${!this._editValues['name'] || this._editValues['name'] === this._deviceConfig.name}
            @click=${this._handleNameSave}>
            Rename
          </button>
        </div>
      </div>
    `;
  }

  private _renderRadioSettings() {
    if (!this._deviceConfig) return;

    const changed = this._hasChanges('radio-settings', [
      'tx_power',
      'frequency',
      'bandwidth',
      'spreading_factor',
      'coding_rate',
      'path_hash_mode',
    ]);

    return html`
      <div class="section-row">
        <div class="form-group-inline">
          <label class="form-label">TX Power (dBm)</label>
          <input
            type="number"
            class="form-input"
            min="2"
            max="22"
            .value=${String(this._editValues['tx_power'] ?? this._deviceConfig.tx_power ?? 17)}
            @input=${(e: Event) => {
              this._editValues['tx_power'] = Number((e.target as HTMLInputElement).value);
            }}
          />
        </div>
        <div class="form-group-inline">
          <label class="form-label">Frequency (MHz)</label>
          <input
            type="number"
            class="form-input"
            step="0.001"
            .value=${String(this._editValues['frequency'] ?? this._deviceConfig.frequency ?? 906.875)}
            @input=${(e: Event) => {
              this._editValues['frequency'] = Number((e.target as HTMLInputElement).value);
            }}
          />
        </div>
      </div>

      <div class="section-row">
        <div class="form-group-inline">
          <label class="form-label">Bandwidth (kHz)</label>
          <select
            class="form-select"
            @change=${(e: Event) => {
              this._editValues['bandwidth'] = Number((e.target as HTMLSelectElement).value);
            }}>
            ${[7.8, 10.4, 15.6, 20.8, 31.25, 41.7, 62.5, 125, 250, 500].map((bw) => {
              const current = this._editValues['bandwidth'] ?? this._deviceConfig!.bandwidth ?? 250;
              return html`<option value=${bw} ?selected=${Number(current) === bw}>${bw}</option>`;
            })}
          </select>
        </div>
        <div class="form-group-inline">
          <label class="form-label">Spreading Factor</label>
          <select
            class="form-select"
            @change=${(e: Event) => {
              this._editValues['spreading_factor'] = Number((e.target as HTMLSelectElement).value);
            }}>
            ${[7, 8, 9, 10, 11, 12].map((sf) => {
              const current = this._editValues['spreading_factor'] ?? this._deviceConfig!.spreading_factor ?? 11;
              return html`<option value=${sf} ?selected=${Number(current) === sf}>${sf}</option>`;
            })}
          </select>
        </div>
      </div>

      <div class="section-row">
        <div class="form-group-inline">
          <label class="form-label">Coding Rate</label>
          <select
            class="form-select"
            @change=${(e: Event) => {
              this._editValues['coding_rate'] = Number((e.target as HTMLSelectElement).value);
            }}>
            ${[5, 6, 7, 8].map((cr) => {
              const current = this._editValues['coding_rate'] ?? this._deviceConfig!.coding_rate ?? 5;
              return html`<option value=${cr} ?selected=${Number(current) === cr}>${cr}</option>`;
            })}
          </select>
        </div>
        <div class="form-group-inline">
          <label class="form-label">Path Hash Mode</label>
          <select
            class="form-select"
            @change=${(e: Event) => {
              this._editValues['path_hash_mode'] = Number((e.target as HTMLSelectElement).value);
            }}>
            ${[[0, '0 - 1 byte'], [1, '1 - 2 byte'], [2, '2 - 3 byte']].map(([val, label]) => {
              const current = this._editValues['path_hash_mode'] ?? this._deviceConfig!.path_hash_mode ?? 0;
              return html`<option value=${val} ?selected=${Number(current) === val}>${label}</option>`;
            })}
          </select>
        </div>
      </div>

      <button
        class="apply-button"
        style="width: 100%; margin-top: 12px;"
        ?disabled=${!changed || this._saving}
        @click=${() => this._handleApply('radio-settings')}>
        ${this._saving ? 'Applying...' : 'Apply Radio Settings'}
      </button>

      <div style="margin-top: 12px; padding: 8px; background: rgba(0, 0, 0, 0.02); border-radius: 6px; font-size: 12px; color: var(--secondary-text-color);">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="vertical-align: -2px; margin-right: 4px;"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>Radio changes require device reboot to take effect
      </div>
    `;
  }

  private _renderLocation() {
    if (!this._deviceConfig) return;

    const isHaLocation = this._locationSource === 'ha_location';
    const zoneHome = isHaLocation ? this.hass?.states['zone.home'] : null;
    const sourceChanged = this._locationSource !== (this._deviceConfig.location_source ?? 'manual');
    const coordsChanged = this._hasChanges('location', ['latitude', 'longitude']);
    const locationChanged = sourceChanged || coordsChanged;
    const displayLat = isHaLocation && zoneHome
      ? String(zoneHome.attributes.latitude ?? 0)
      : String(this._editValues['latitude'] ?? this._deviceConfig.latitude ?? 0);
    const displayLon = isHaLocation && zoneHome
      ? String(zoneHome.attributes.longitude ?? 0)
      : String(this._editValues['longitude'] ?? this._deviceConfig.longitude ?? 0);

    return html`
      <div class="section-row">
        <div class="form-group-inline">
          <label class="form-label">Latitude</label>
          <input
            type="number"
            class="form-input"
            step="0.000001"
            min="-90"
            max="90"
            .value=${displayLat}
            ?disabled=${isHaLocation}
            @input=${(e: Event) => {
              this._editValues['latitude'] = Number((e.target as HTMLInputElement).value);
            }}
          />
        </div>
        <div class="form-group-inline">
          <label class="form-label">Longitude</label>
          <input
            type="number"
            class="form-input"
            step="0.000001"
            min="-180"
            max="180"
            .value=${displayLon}
            ?disabled=${isHaLocation}
            @input=${(e: Event) => {
              this._editValues['longitude'] = Number((e.target as HTMLInputElement).value);
            }}
          />
        </div>
      </div>
      ${isHaLocation ? html`
        <div style="font-size: 11px; color: var(--secondary-text-color); margin-top: -8px; margin-bottom: 8px;">
          Using coordinates from Home Assistant zone.home
        </div>
      ` : ''}

      <div class="section-row">
        <div class="form-group-inline">
          <label class="form-label">Location Source</label>
          <select
            class="form-select"
            .value=${this._locationSource}
            @change=${(e: Event) => {
              this._locationSource = (e.target as HTMLSelectElement).value as 'gps' | 'manual' | 'ha_location';
            }}>
            <option value="manual">Manual (coordinates above)</option>
            <option value="gps">GPS (device hardware)</option>
            <option value="ha_location">Home Assistant Zone</option>
          </select>
          <div style="font-size: 11px; color: var(--secondary-text-color); margin-top: 4px;">
            How the device determines its coordinates
          </div>
        </div>
      </div>

      <button
        class="apply-button"
        style="width: 100%; margin-top: 12px;"
        ?disabled=${!locationChanged || this._saving}
        @click=${this._applyLocation}>
        ${this._saving ? 'Applying...' : 'Apply Location Settings'}
      </button>
    `;
  }

  // _renderAdvancedSettings removed — path hash mode moved to Radio & RF Settings
  // _renderLocationSource removed — merged into _renderLocation

  // Config backup, diagnostics, and backup & recovery removed — low value

  private _renderRegionsScopes() {
    const repeaters = this._managedDevices.repeaters || [];
    const local = this._localRegions;
    const localActionNeedsName = this._localRegionAction !== 'clear_default';
    const localActionNeedsParent = this._localRegionAction === 'put';
    return html`
      <div style="font-size:11px;color:var(--secondary-text-color);line-height:1.5;margin-bottom:12px;">
        A RegionMap abaixo é a configuração RF real do HiveFW. Nada é criado ou alterado automaticamente:
        o estado atual do rádio é preservado até aplicares uma operação.
      </div>
      <div style="padding:12px;border:1px solid var(--divider-color);border-radius:8px;background:var(--secondary-background-color);margin-bottom:12px;">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:10px;">
          <div>
            <div style="font-size:13px;font-weight:600;">RegionMap local</div>
            <div style="font-size:10px;color:var(--secondary-text-color);margin-top:2px;">Companion local · não gera tráfego LoRa</div>
          </div>
          <button class="action-btn" ?disabled=${this._localRegionBusy} @click=${this._refreshLocalRegions}>
            ${this._localRegionBusy ? 'A ler…' : 'Atualizar'}
          </button>
        </div>
        ${local?.supported ? html`
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;">
            <span class="managed-devices-chip">${local.count} regions</span>
            <span class="managed-devices-chip">Home: ${local.home || '*'}</span>
            <span class="managed-devices-chip">Default: ${local.default || '<null>'}</span>
          </div>
          <div style="overflow:auto;border:1px solid var(--divider-color);border-radius:7px;margin-bottom:10px;">
            <table style="width:100%;border-collapse:collapse;font-size:11px;">
              <thead><tr style="background:var(--primary-background-color);text-align:left;">
                <th style="padding:7px 8px;">Region</th><th style="padding:7px 8px;">Parent</th>
                <th style="padding:7px 8px;">Flood</th><th style="padding:7px 8px;">Flags</th>
              </tr></thead>
              <tbody>
                ${local.regions.map((region) => html`
                  <tr style="border-top:1px solid var(--divider-color);">
                    <td style="padding:7px 8px;font-family:monospace;">${region.name}</td>
                    <td style="padding:7px 8px;font-family:monospace;color:var(--secondary-text-color);">${region.parent || '—'}</td>
                    <td style="padding:7px 8px;">${region.allow_flood ? 'Permitido' : 'Bloqueado'}</td>
                    <td style="padding:7px 8px;color:var(--secondary-text-color);">${region.home ? 'HOME ' : ''}${region.default ? 'DEFAULT' : ''}</td>
                  </tr>
                `)}
              </tbody>
            </table>
          </div>
          <div class="repeater-region-form">
            <div class="form-group-inline">
              <label class="form-label">Operação</label>
              <select class="form-select" .value=${this._localRegionAction}
                @change=${(e: Event) => { this._localRegionAction = (e.target as HTMLSelectElement).value as 'put' | 'remove' | 'allow' | 'deny' | 'home' | 'default' | 'clear_default'; }}>
                <option value="put">Criar / atualizar Region</option>
                <option value="allow">Permitir flood</option>
                <option value="deny">Bloquear flood</option>
                <option value="home">Definir HOME</option>
                <option value="default">Definir Default scope</option>
                <option value="clear_default">Limpar Default scope</option>
                <option value="remove">Remover Region</option>
              </select>
            </div>
            <div class="form-group-inline">
              <label class="form-label">Region</label>
              <input class="form-input" type="text" maxlength="30" placeholder="ex.: #pt-setubal"
                .value=${this._localRegionName} ?disabled=${!localActionNeedsName}
                @input=${(e: Event) => { this._localRegionName = (e.target as HTMLInputElement).value; }} />
            </div>
            <div class="form-group-inline">
              <label class="form-label">Parent</label>
              <input class="form-input" type="text" maxlength="30" placeholder="ex.: #pt-lisboa-vale-do-tejo"
                .value=${this._localRegionParent} ?disabled=${!localActionNeedsParent}
                @input=${(e: Event) => { this._localRegionParent = (e.target as HTMLInputElement).value; }} />
            </div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button class="apply-button" style="flex:1;min-width:150px;margin:0;"
              ?disabled=${this._localRegionBusy || (localActionNeedsName && !this._localRegionName.trim())}
              @click=${this._applyLocalRegion}>${this._localRegionBusy ? 'A aplicar…' : 'Aplicar operação'}</button>
            <button class="action-btn" style="flex:1;min-width:150px;" ?disabled=${this._localRegionBusy}
              @click=${this._saveLocalRegions}>Guardar Regions</button>
          </div>
          <div style="font-size:10px;color:var(--secondary-text-color);margin-top:7px;line-height:1.45;">
            Criar/remover/allow/deny/HOME ficam em RAM até “Guardar Regions”. Default scope segue o comportamento oficial e é persistido imediatamente.
          </div>
        ` : html`
          <div style="font-size:11px;color:var(--secondary-text-color);line-height:1.45;">
            ${local?.error || 'Este firmware ainda não expõe a RegionMap local pelo Companion Protocol.'}
          </div>
        `}
      </div>
      <div style="font-size:12px;font-weight:600;margin-bottom:4px;">Scopes do Home Assistant</div>
      <div style="font-size:10px;color:var(--secondary-text-color);line-height:1.45;margin-bottom:10px;">
        Estes scopes são locais à integração. Não alteram a RegionMap nem o forwarding RF do Repeater.
      </div>

      <div class="form-group-inline" style="margin-bottom:8px;">
        <label class="form-label">Flood scopes</label>
        <input
          class="form-input"
          type="text"
          placeholder="ex.: pt-setubal, pt-lisboa"
          .value=${this._scopeDraft}
          @input=${(e: Event) => { this._scopeDraft = (e.target as HTMLInputElement).value; }}
        />
      </div>
      <label style="display:flex;align-items:center;gap:7px;font-size:12px;margin:8px 0 10px;">
        <input
          type="checkbox"
          .checked=${this._scopeGlobal}
          @change=${(e: Event) => { this._scopeGlobal = (e.target as HTMLInputElement).checked; }}
        />
        Permitir scope global (*)
      </label>
      <button class="apply-button" style="width:100%;" ?disabled=${this._scopeSaving}
        @click=${this._saveFloodScopes}>
        ${this._scopeSaving ? 'A guardar…' : 'Guardar Scopes HA'}
      </button>

      <div style="height:1px;background:var(--divider-color);margin:14px 0;"></div>
      <div style="font-size:12px;font-weight:600;margin-bottom:4px;">Repeaters remotos</div>
      <div style="font-size:10px;color:var(--secondary-text-color);line-height:1.45;margin-bottom:10px;">
        Gestão de Regions de outros Repeaters autenticados. Estas operações usam RF e geram tráfego LoRa.
      </div>

      ${repeaters.length ? html`
        <div class="form-group-inline">
          <label class="form-label">Repeater remoto</label>
          <select class="form-select" .value=${this._regionTarget}
            @change=${(e: Event) => { this._regionTarget = (e.target as HTMLSelectElement).value; this._regionText = ''; }}>
            ${repeaters.map((r) => html`<option value=${r.pubkey_prefix}>${r.name}</option>`)}
          </select>
        </div>

        <button class="action-btn" style="width:100%;margin:8px 0;"
          ?disabled=${this._regionBusy || !this._regionTarget}
          @click=${this._readRemoteRegions}>
          ${this._regionBusy ? 'A consultar…' : 'Ler Regions (RF)'}
        </button>

        ${this._regionText ? html`
          <pre style="white-space:pre-wrap;max-height:170px;overflow:auto;padding:9px;border-radius:7px;background:var(--secondary-background-color);font-size:11px;">${this._regionText}</pre>
        ` : nothing}

        <div class="section-row" style="margin-top:8px;">
          <div class="form-group-inline">
            <label class="form-label">Operação</label>
            <select class="form-select" .value=${this._regionAction}
              @change=${(e: Event) => { this._regionAction = (e.target as HTMLSelectElement).value as 'allowf' | 'denyf' | 'home' | 'default' | 'put' | 'remove'; }}>
              <option value="allowf">Allow flood</option>
              <option value="denyf">Deny flood</option>
              <option value="home">Home region</option>
              <option value="default">Default scope</option>
              <option value="put">Create region</option>
              <option value="remove">Remove region</option>
            </select>
          </div>
          <div class="form-group-inline">
            <label class="form-label">Region</label>
            <input class="form-input" type="text" placeholder="ex.: #Portugal"
              .value=${this._regionName}
              @input=${(e: Event) => { this._regionName = (e.target as HTMLInputElement).value; }}
            />
          </div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="action-btn" style="flex:1;"
            ?disabled=${this._regionBusy || !this._regionTarget || (!this._regionName.trim() && this._regionAction !== 'default')}
            @click=${this._applyRemoteRegion}>Aplicar Region</button>
          <button class="action-btn" style="flex:1;"
            ?disabled=${this._regionBusy || !this._regionTarget}
            @click=${() => this._sendRemoteRegionCommand('region save')}>Guardar Regions</button>
        </div>
        <div style="font-size:10px;color:var(--secondary-text-color);margin-top:7px;">
          Operações remotas usam login/CLI do meshcore-ha e geram tráfego LoRa.
        </div>
      ` : html`
        <div style="font-size:11px;color:var(--secondary-text-color);">
          Não há Repeaters remotos geridos.
        </div>
      `}
    `;
  }

  private async _refreshLocalRegions() {
    if (!this.hass) return;
    this._localRegionBusy = true;
    try {
      this._localRegions = await getLocalRegions(this.hass, this.config?.entry_id);
      if (!this._localRegions.supported) {
        this._showStatusMessage(this._localRegions.error || 'RegionMap local indisponível', 'error');
      }
    } catch (error) {
      this._showStatusMessage('RegionMap local: ' + String(error), 'error');
    } finally {
      this._localRegionBusy = false;
    }
  }

  private async _applyLocalRegion() {
    if (!this.hass || !this._localRegions?.supported) return;
    const operation = this._localRegionAction;
    const name = operation === 'clear_default' ? '' : this._localRegionName.trim();
    const parent = operation === 'put' ? this._localRegionParent.trim() : '';
    if (operation !== 'clear_default' && !name) return;

    this._localRegionBusy = true;
    try {
      const result = await setLocalRegion(
        this.hass,
        operation,
        name,
        parent,
        this.config?.entry_id,
      );
      this._localRegions = result;
      if (operation === 'put' || operation === 'remove') {
        this._localRegionName = '';
        this._localRegionParent = '';
      }
      this._showStatusMessage('RegionMap atualizada em ' + (operation === 'default' || operation === 'clear_default' ? 'flash' : 'RAM'), 'success');
    } catch (error) {
      const e = error as { code?: string; message?: string };
      this._showStatusMessage('RegionMap: ' + (e?.message || String(error)), 'error');
    } finally {
      this._localRegionBusy = false;
    }
  }

  private async _saveLocalRegions() {
    if (!this.hass || !this._localRegions?.supported) return;
    this._localRegionBusy = true;
    try {
      const result = await setLocalRegion(
        this.hass,
        'save',
        '',
        '',
        this.config?.entry_id,
      );
      this._localRegions = result;
      this._showStatusMessage('Regions guardadas no HiveFW', 'success');
    } catch (error) {
      const e = error as { code?: string; message?: string };
      this._showStatusMessage('Guardar Regions: ' + (e?.message || String(error)), 'error');
    } finally {
      this._localRegionBusy = false;
    }
  }
  private async _saveFloodScopes() {
    if (!this.hass) return;
    this._scopeSaving = true;
    try {
      const scopes = this._scopeDraft.split(',').map((s) => s.trim()).filter(Boolean);
      const result = await setFloodScopes(this.hass, scopes, this._scopeGlobal, this.config?.entry_id);
      this._scopeDraft = result.scopes.join(', ');
      this._scopeGlobal = result.global;
      this._showStatusMessage('Scopes guardados', 'success');
    } catch (error) {
      this._showStatusMessage(`Erro ao guardar scopes: ${String(error)}`, 'error');
    } finally {
      this._scopeSaving = false;
    }
  }

  private async _readRemoteRegions() {
    if (!this.hass || !this._regionTarget) return;
    this._regionBusy = true;
    try {
      this._regionText = await getRemoteRegions(this.hass, this._regionTarget, this.config?.entry_id);
    } catch (error) {
      this._showStatusMessage(`Regions: ${String(error)}`, 'error');
    } finally {
      this._regionBusy = false;
    }
  }

  private async _sendRemoteRegionCommand(command: string) {
    if (!this.hass || !this._regionTarget) return;
    this._regionBusy = true;
    try {
      const result = await executeRemote(this.hass, this._regionTarget, command, this.config?.entry_id);
      if (!result.success) {
        this._showStatusMessage(result.response || 'Region command failed', 'error');
        return;
      }
      this._showStatusMessage(result.response || 'Region command sent', 'success');
      this._regionBusy = false;
      await this._readRemoteRegions();
    } finally {
      this._regionBusy = false;
    }
  }

  private async _applyRemoteRegion() {
    let name = this._regionName.trim();
    if (this._regionAction === 'default' && !name) name = '<null>';
    if (!name) return;
    await this._sendRemoteRegionCommand(`region ${this._regionAction} ${name}`);
  }

  private _requestManagedAdmin(device: ManagedDevice) {
    this.dispatchEvent(new CustomEvent('hivefw-open-remote-admin', {
      detail: { device },
      bubbles: true,
      composed: true,
    }));
  }

  private _renderManagedDevices() {
    const repeaters = this._managedDevices.repeaters || [];
    const clients = this._managedDevices.clients || [];
    const devices = [...repeaters, ...clients];

    if (devices.length === 0) {
      return html`
        <div style="font-size:12px;color:var(--secondary-text-color);line-height:1.5;">
          Nenhum equipamento remoto está configurado no meshcore-ha.
          O HiveFW local acima é o equipamento principal desta integração.
        </div>
      `;
    }

    const online = devices.filter((d) => d.connected || d.status === 'online').length;

    return html`
      <div class="managed-devices-summary">
        <span class="managed-devices-chip">${devices.length} equipamentos</span>
        <span class="managed-devices-chip">${repeaters.length} repeaters</span>
        <span class="managed-devices-chip">${clients.length} clients</span>
        <span class="managed-devices-chip">${online} online</span>
      </div>

      <div class="managed-device-list">
        ${devices.map((device) => {
          const isOnline = device.connected || device.status === 'online';
          const typeLabel = device.type === 'repeater' ? 'Repeater' : 'Client';
          return html`
            <div class="managed-device-row">
              <div class="managed-device-icon">${device.type === 'repeater' ? 'R' : 'C'}</div>
              <div>
                <div class="managed-device-name">${device.name}</div>
                <div class="managed-device-meta">
                  ${typeLabel} · ${device.pubkey_prefix?.toUpperCase() || 'sem chave'}
                  ${device.firmware_version ? html` · FW ${device.firmware_version}` : nothing}
                  ${device.neighbors_enabled ? html` · vizinhos monitorizados` : nothing}
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:7px;">
                <div class="managed-device-state ${isOnline ? 'online' : 'offline'}">
                  <span>●</span>
                  <span>${isOnline ? 'Online' : 'Offline'}</span>
                </div>
                ${device.type === 'repeater'
                  ? html`<button class="action-btn" @click=${() => this._requestManagedAdmin(device)}>Admin</button>`
                  : nothing}
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  private _renderRepeaterSettings() {
    const status = this._repeaterStatus;
    if (!status?.supported) {
      return html`
        <div style="font-size: 12px; color: var(--secondary-text-color); line-height: 1.5;">
          O Companion está disponível, mas esta versão não anuncia o modo Repeater integrado.
        </div>
      `;
    }

    const repeat = Boolean(this._editValues['repeat'] ?? status.repeat);
    const autoAdvertSupported = Boolean(status.auto_advert_supported);
    const autoAdvert = Boolean(this._editValues['auto_advert'] ?? status.auto_advert);
    const multiAcks = Number(this._editValues['multi_acks'] ?? status.radio.multi_acks ?? 0);
    const rxDelay = Number(this._editValues['rx_delay'] ?? status.tuning.rx_delay ?? 0);
    const routing = status.routing;
    const radioGuard = status.radio_guard;
    const floodMax = Number(this._editValues['flood_max'] ?? routing?.flood_max ?? 64);
    const floodMaxUnscoped = Number(this._editValues['flood_max_unscoped'] ?? routing?.flood_max_unscoped ?? 64);
    const floodMaxAdvert = Number(this._editValues['flood_max_advert'] ?? routing?.flood_max_advert ?? 8);
    const loopDetect = Number(this._editValues['loop_detect'] ?? routing?.loop_detect ?? 0);
    const cadEnabled = Boolean(this._editValues['cad_enabled'] ?? radioGuard?.cad_enabled ?? false);
    const interferenceThreshold = Number(this._editValues['interference_threshold'] ?? radioGuard?.interference_threshold ?? 0);
    const agcResetInterval = Number(this._editValues['agc_reset_interval'] ?? radioGuard?.agc_reset_interval ?? 0);
    const floodTxDelay = Number(this._editValues['flood_tx_delay'] ?? radioGuard?.flood_tx_delay ?? 0.5);
    const directTxDelay = Number(this._editValues['direct_tx_delay'] ?? radioGuard?.direct_tx_delay ?? 0.3);

    return html`
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px;padding:10px 12px;border-radius:8px;background:var(--secondary-background-color);">
        <div>
          <div style="font-size:13px;font-weight:600;">Modo Repetidor</div>
          <div style="font-size:11px;color:var(--secondary-text-color);margin-top:2px;">
            ${status.repeat ? 'Ativo no HiveFW' : 'Desligado — Companion apenas'}
          </div>
        </div>
        <label style="display:flex;align-items:center;gap:8px;font-size:12px;">
          <input
            type="checkbox"
            .checked=${repeat}
            @change=${(e: Event) => {
              this._editValues['repeat'] = (e.target as HTMLInputElement).checked;
              this._editValues = { ...this._editValues };
            }}
          />
          ${repeat ? 'Ativo' : 'Desligado'}
        </label>
      </div>

      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px;padding:10px 12px;border-radius:8px;background:var(--secondary-background-color);">
        <div>
          <div style="font-size:13px;font-weight:600;">Auto Advert</div>
          <div style="font-size:11px;color:var(--secondary-text-color);margin-top:2px;">
            ${autoAdvertSupported
              ? (autoAdvert ? 'Ativo — Smart Advert automático' : 'Desligado')
              : 'Requer firmware HiveFW com controlo remoto de AutoAdvert'}
          </div>
        </div>
        <label style="display:flex;align-items:center;gap:8px;font-size:12px;">
          <input
            type="checkbox"
            .checked=${autoAdvert}
            ?disabled=${!autoAdvertSupported}
            @change=${(e: Event) => {
              this._editValues['auto_advert'] = (e.target as HTMLInputElement).checked;
              this._editValues = { ...this._editValues };
            }}
          />
          ${autoAdvert ? 'Ativo' : 'Desligado'}
        </label>
      </div>

      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px;padding:10px 12px;border-radius:8px;background:var(--secondary-background-color);">
        <div>
          <div style="font-size:13px;font-weight:600;">Multi ACK</div>
          <div style="font-size:11px;color:var(--secondary-text-color);margin-top:2px;">
            Confirmações múltiplas do Repeater.
          </div>
        </div>
        <select
          class="form-select"
          style="width:auto;min-width:130px;"
          .value=${String(multiAcks)}
          @change=${(e: Event) => {
            this._editValues['multi_acks'] = Number((e.target as HTMLSelectElement).value);
            this._editValues = { ...this._editValues };
          }}>
          <option value="0">Desligado</option>
          <option value="1">Ligado</option>
        </select>
      </div>

      <div class="repeater-setup-grid">
        <div style="padding:12px;border:1px solid var(--divider-color);border-radius:8px;background:var(--secondary-background-color);">
          <div style="font-size:13px;font-weight:600;margin-bottom:4px;">Routing &amp; Flood</div>
          <div style="font-size:11px;color:var(--secondary-text-color);line-height:1.45;margin-bottom:10px;">
            Limites oficiais do Repeater para flood e deteção de loops.
          </div>

          ${routing?.supported ? html`
            <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 10px;">
              <div>
                <label class="form-label">Flood Max</label>
                <input class="form-input" type="number" min="0" max="64"
                  .value=${String(floodMax)}
                  @input=${(e: Event) => {
                    this._editValues['flood_max'] = Number((e.target as HTMLInputElement).value);
                    this._editValues = { ...this._editValues };
                  }} />
              </div>
              <div>
                <label class="form-label">Flood Max Unscoped</label>
                <input class="form-input" type="number" min="0" max="64"
                  .value=${String(floodMaxUnscoped)}
                  @input=${(e: Event) => {
                    this._editValues['flood_max_unscoped'] = Number((e.target as HTMLInputElement).value);
                    this._editValues = { ...this._editValues };
                  }} />
              </div>
              <div>
                <label class="form-label">Flood Max Adverts</label>
                <input class="form-input" type="number" min="0" max="64"
                  .value=${String(floodMaxAdvert)}
                  @input=${(e: Event) => {
                    this._editValues['flood_max_advert'] = Number((e.target as HTMLInputElement).value);
                    this._editValues = { ...this._editValues };
                  }} />
              </div>
              <div>
                <label class="form-label">Loop Detect</label>
                <select class="form-select"
                  .value=${String(loopDetect)}
                  @change=${(e: Event) => {
                    this._editValues['loop_detect'] = Number((e.target as HTMLSelectElement).value);
                    this._editValues = { ...this._editValues };
                  }}>
                  <option value="0">Off</option>
                  <option value="1">Minimal</option>
                  <option value="2">Moderate</option>
                  <option value="3">Strict</option>
                </select>
              </div>
            </div>
          ` : html`
            <div style="font-size:11px;color:var(--secondary-text-color);">
              Este firmware não expõe Flood Limits / Loop Detect pelo Companion.
            </div>
          `}
        </div>

        <div style="padding:12px;border:1px solid var(--divider-color);border-radius:8px;background:var(--secondary-background-color);">
          <div style="font-size:13px;font-weight:600;margin-bottom:4px;">RF &amp; Retransmissão</div>
          <div style="font-size:11px;color:var(--secondary-text-color);line-height:1.45;margin-bottom:10px;">
            Proteção contra canal ocupado, AGC e timings de retransmissão do Repeater.
          </div>

          ${radioGuard?.supported ? html`
            <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 10px;">
              <div>
                <label class="form-label">CAD</label>
                <select class="form-select"
                  .value=${cadEnabled ? '1' : '0'}
                  @change=${(e: Event) => {
                    this._editValues['cad_enabled'] = (e.target as HTMLSelectElement).value === '1';
                    this._editValues = { ...this._editValues };
                  }}>
                  <option value="0">Desligado</option>
                  <option value="1">Ligado</option>
                </select>
              </div>
              <div>
                <label class="form-label">Interference Threshold</label>
                <input class="form-input" type="number" min="0" max="255"
                  .value=${String(interferenceThreshold)}
                  @input=${(e: Event) => {
                    this._editValues['interference_threshold'] = Number((e.target as HTMLInputElement).value);
                    this._editValues = { ...this._editValues };
                  }} />
              </div>
              <div>
                <label class="form-label">AGC Reset (s)</label>
                <input class="form-input" type="number" min="0" max="1020" step="4"
                  .value=${String(agcResetInterval)}
                  @input=${(e: Event) => {
                    this._editValues['agc_reset_interval'] = Number((e.target as HTMLInputElement).value);
                    this._editValues = { ...this._editValues };
                  }} />
              </div>
              <div>
                <label class="form-label">RX Delay</label>
                <input class="form-input" type="number" min="0" max="20" step="0.001"
                  .value=${String(rxDelay)}
                  @input=${(e: Event) => {
                    this._editValues['rx_delay'] = Number((e.target as HTMLInputElement).value);
                    this._editValues = { ...this._editValues };
                  }} />
              </div>
              <div>
                <label class="form-label">Flood TX Delay</label>
                <input class="form-input" type="number" min="0" max="2" step="0.001"
                  .value=${String(floodTxDelay)}
                  @input=${(e: Event) => {
                    this._editValues['flood_tx_delay'] = Number((e.target as HTMLInputElement).value);
                    this._editValues = { ...this._editValues };
                  }} />
              </div>
              <div>
                <label class="form-label">Direct TX Delay</label>
                <input class="form-input" type="number" min="0" max="2" step="0.001"
                  .value=${String(directTxDelay)}
                  @input=${(e: Event) => {
                    this._editValues['direct_tx_delay'] = Number((e.target as HTMLInputElement).value);
                    this._editValues = { ...this._editValues };
                  }} />
              </div>
            </div>
          ` : html`
            <div style="font-size:11px;color:var(--secondary-text-color);">
              Este firmware não expõe CAD / AGC / delays avançados pelo Companion.
            </div>
          `}
        </div>
      </div>

      <button
        class="apply-button"
        style="width:100%;margin:0 0 10px;"
        ?disabled=${this._saving}
        @click=${this._applyRepeaterSettings}>
        ${this._saving ? 'A aplicar...' : 'Aplicar configurações do Repeater'}
      </button>

      <div
        style="margin:0 0 10px;padding:12px;border:1px solid var(--divider-color);border-radius:8px;background:var(--secondary-background-color);"
        data-hive-repeater-access>
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:10px;">
          <div>
            <div style="font-size:13px;font-weight:600;">Acesso remoto</div>
            <div style="font-size:11px;color:var(--secondary-text-color);margin-top:2px;line-height:1.45;">
              Credenciais do servidor Repeater. As passwords são write-only: o HiveFW apenas indica se estão configuradas.
            </div>
          </div>
          <div style="font-size:11px;color:var(--secondary-text-color);white-space:nowrap;">
            ACL: ${status.server_auth?.acl_count ?? '—'}
          </div>
        </div>

        ${status.server_auth?.supported ? html`
          <div style="display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px 10px;align-items:end;">
            <div>
              <label class="form-label">
                Admin password
                <span style="margin-left:6px;font-size:10px;color:${status.server_auth.admin_password_set ? 'var(--success-color, #2e7d32)' : 'var(--secondary-text-color)'};">
                  ${status.server_auth.admin_password_set ? 'configurada' : 'não configurada'}
                </span>
              </label>
              <input
                class="form-input"
                type="password"
                maxlength="15"
                autocomplete="new-password"
                placeholder=${status.server_auth.admin_password_set ? '••••••••' : 'Definir password'}
                .value=${this._adminPasswordDraft}
                ?disabled=${this._repeaterAccessBusy !== null}
                @input=${(e: Event) => {
                  this._adminPasswordDraft = (e.target as HTMLInputElement).value;
                }}
              />
            </div>
            <div style="display:flex;gap:6px;">
              <button
                class="apply-button"
                style="width:auto;min-width:76px;padding:7px 12px;margin:0;"
                ?disabled=${this._repeaterAccessBusy !== null || !this._adminPasswordDraft}
                @click=${() => this._saveRepeaterPassword('admin')}>
                ${this._repeaterAccessBusy === 'admin' ? 'A guardar...' : 'Guardar'}
              </button>
              <button
                class="action-btn"
                style="min-width:66px;"
                ?disabled=${this._repeaterAccessBusy !== null || !status.server_auth.admin_password_set}
                @click=${() => this._clearRepeaterPassword('admin')}>
                Limpar
              </button>
            </div>

            <div>
              <label class="form-label">
                Guest password
                <span style="margin-left:6px;font-size:10px;color:${status.server_auth.guest_password_set ? 'var(--success-color, #2e7d32)' : 'var(--secondary-text-color)'};">
                  ${status.server_auth.guest_password_set ? 'configurada' : 'não configurada'}
                </span>
              </label>
              <input
                class="form-input"
                type="password"
                maxlength="15"
                autocomplete="new-password"
                placeholder=${status.server_auth.guest_password_set ? '••••••••' : 'Definir password'}
                .value=${this._guestPasswordDraft}
                ?disabled=${this._repeaterAccessBusy !== null}
                @input=${(e: Event) => {
                  this._guestPasswordDraft = (e.target as HTMLInputElement).value;
                }}
              />
            </div>
            <div style="display:flex;gap:6px;">
              <button
                class="apply-button"
                style="width:auto;min-width:76px;padding:7px 12px;margin:0;"
                ?disabled=${this._repeaterAccessBusy !== null || !this._guestPasswordDraft}
                @click=${() => this._saveRepeaterPassword('guest')}>
                ${this._repeaterAccessBusy === 'guest' ? 'A guardar...' : 'Guardar'}
              </button>
              <button
                class="action-btn"
                style="min-width:66px;"
                ?disabled=${this._repeaterAccessBusy !== null || !status.server_auth.guest_password_set}
                @click=${() => this._clearRepeaterPassword('guest')}>
                Limpar
              </button>
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:12px;padding-top:10px;border-top:1px solid var(--divider-color);">
            <div style="font-size:11px;color:var(--secondary-text-color);line-height:1.4;">
              Admin permite remote CLI e gestão completa. Guest permite operações limitadas ao perfil Guest.
            </div>
            <button
              class="danger-button"
              style="white-space:nowrap;"
              ?disabled=${this._repeaterAccessBusy !== null || !(status.server_auth.acl_count ?? 0)}
              @click=${this._confirmClearRepeaterAcl}>
              ${this._repeaterAccessBusy === 'acl' ? 'A limpar...' : 'Limpar ACL'}
            </button>
          </div>
        ` : html`
          <div style="font-size:11px;color:var(--secondary-text-color);line-height:1.45;">
            Este firmware não expõe a configuração local do servidor Repeater.
          </div>
        `}
      </div>

      <div
        style="margin:0;padding:12px;border:1px solid var(--divider-color);border-radius:8px;background:var(--secondary-background-color);"
        data-hive-duty-cycle-control>
        <div style="font-size:13px;font-weight:600;margin-bottom:10px;">Duty Cycle</div>
        <div style="display:grid;grid-template-columns:minmax(90px,1fr) auto auto;gap:8px;align-items:end;">
          <div>
            <label class="form-label">Valor</label>
            <select
              class="form-select"
              ?disabled=${this._dutyCycleBusy !== null}
              @change=${(e: Event) => {
                this._dutyCycleValue = Number((e.target as HTMLSelectElement).value);
              }}>
              ${Array.from({ length: 41 }, (_, i) => i + 10).map(
                (value) => html`
                  <option
                    value=${String(value)}
                    ?selected=${value === this._dutyCycleValue}>
                    ${value}%
                  </option>
                `,
              )}
            </select>
          </div>
          <button
            class="apply-button"
            style="width:auto;min-width:68px;padding:7px 12px;margin:0;"
            ?disabled=${this._dutyCycleBusy !== null}
            @click=${this._readDutyCycle}>
            ${this._dutyCycleBusy === 'read' ? 'A ler...' : 'Ler'}
          </button>
          <button
            class="apply-button"
            style="width:auto;min-width:78px;padding:7px 12px;margin:0;"
            ?disabled=${this._dutyCycleBusy !== null}
            @click=${this._applyDutyCycle}>
            ${this._dutyCycleBusy === 'apply' ? 'A aplicar...' : 'Aplicar'}
          </button>
        </div>
      </div>

      <div style="margin-top:10px;font-size:11px;color:var(--secondary-text-color);line-height:1.45;">
        Frequência, BW, SF, CR, TX Power e Path Hash pertencem ao cartão Radio;
        adverts, sync de relógio e reboot continuam no cartão do Companion.
      </div>
    `;
  }

  private async _refreshRepeaterAccessStatus() {
    if (!this.hass) return;
    this._repeaterStatus = await getLocalRepeaterStatus(
      this.hass,
      this.config?.entry_id,
    );
  }

  private async _saveRepeaterPassword(kind: 'admin' | 'guest') {
    if (!this.hass || !this._repeaterStatus?.server_auth?.supported) return;

    const isAdmin = kind === 'admin';
    const value = isAdmin ? this._adminPasswordDraft : this._guestPasswordDraft;
    if (!value) return;

    this._repeaterAccessBusy = kind;
    try {
      const result = await setDeviceConfig(
        this.hass,
        { [isAdmin ? 'admin_password' : 'guest_password']: value },
        this.config?.entry_id,
      );
      if (!result.success) {
        this._showStatusMessage(
          result.error || 'Não foi possível guardar a password.',
          'error',
        );
        return;
      }

      if (isAdmin) this._adminPasswordDraft = '';
      else this._guestPasswordDraft = '';

      await this._refreshRepeaterAccessStatus();
      this._showStatusMessage(
        (isAdmin ? 'Admin' : 'Guest') + ' password guardada e verificada.',
        'success',
      );
    } catch (error) {
      this._showStatusMessage('Acesso remoto: ' + String(error), 'error');
    } finally {
      this._repeaterAccessBusy = null;
    }
  }

  private async _clearRepeaterPassword(kind: 'admin' | 'guest') {
    if (!this.hass || !this._repeaterStatus?.server_auth?.supported) return;

    const isAdmin = kind === 'admin';
    this._repeaterAccessBusy = kind;
    try {
      const result = await setDeviceConfig(
        this.hass,
        { [isAdmin ? 'admin_password' : 'guest_password']: '' },
        this.config?.entry_id,
      );
      if (!result.success) {
        this._showStatusMessage(
          result.error || 'Não foi possível limpar a password.',
          'error',
        );
        return;
      }

      if (isAdmin) this._adminPasswordDraft = '';
      else this._guestPasswordDraft = '';

      await this._refreshRepeaterAccessStatus();
      this._showStatusMessage(
        (isAdmin ? 'Admin' : 'Guest') + ' password removida.',
        'success',
      );
    } catch (error) {
      this._showStatusMessage('Acesso remoto: ' + String(error), 'error');
    } finally {
      this._repeaterAccessBusy = null;
    }
  }

  private _confirmClearRepeaterAcl() {
    const count = this._repeaterStatus?.server_auth?.acl_count ?? 0;
    if (!count) return;

    this._confirmAction = {
      title: 'Limpar ACL do Repeater',
      message:
        'Isto remove ' + count +
        ' identidade(s) autorizada(s) da ACL persistente. ' +
        'As passwords Admin/Guest não são alteradas. Os clientes terão de autenticar-se novamente.',
      onConfirm: () => this._clearRepeaterAcl(),
    };
    this._confirmDialogOpen = true;
  }

  private async _clearRepeaterAcl() {
    if (!this.hass || !this._repeaterStatus?.server_auth?.supported) return;

    this._repeaterAccessBusy = 'acl';
    try {
      const result = await setDeviceConfig(
        this.hass,
        { clear_acl: true },
        this.config?.entry_id,
      );
      if (!result.success) {
        this._showStatusMessage(
          result.error || 'Não foi possível limpar a ACL.',
          'error',
        );
        return;
      }

      await this._refreshRepeaterAccessStatus();
      this._showStatusMessage('ACL do Repeater limpa e verificada.', 'success');
    } catch (error) {
      this._showStatusMessage('ACL: ' + String(error), 'error');
    } finally {
      this._repeaterAccessBusy = null;
    }
  }

  private async _readDutyCycle() {
    if (!this.hass) return;

    this._dutyCycleBusy = 'read';
    try {
      const result = await getDutyCycle(this.hass, this.config?.entry_id);
      this._dutyCycleReadValue = Number(result.duty_cycle);
      this._dutyCycleValue = Number(result.duty_cycle);
      this.requestUpdate();
      this._showStatusMessage(`Duty Cycle lido: ${result.duty_cycle}%`, 'success');
    } catch (error) {
      const e = error as { code?: string; message?: string };
      const message = e?.message
        ? (e.code ? `${e.message} (${e.code})` : e.message)
        : String(error);
      this._showStatusMessage(`Duty Cycle: ${message}`, 'error');
    } finally {
      this._dutyCycleBusy = null;
    }
  }

  private async _applyDutyCycle() {
    if (!this.hass) return;

    const duty = Math.max(10, Math.min(50, Math.round(this._dutyCycleValue)));
    this._dutyCycleBusy = 'apply';
    try {
      const result = await setDutyCycle(this.hass, duty, this.config?.entry_id);
      this._dutyCycleReadValue = Number(result.duty_cycle);
      this._dutyCycleValue = Number(result.duty_cycle);
      this.requestUpdate();
      this._showStatusMessage(
        `Duty Cycle aplicado e confirmado: ${result.duty_cycle}%`,
        'success',
      );
    } catch (error) {
      const e = error as { code?: string; message?: string };
      const message = e?.message
        ? (e.code ? `${e.message} (${e.code})` : e.message)
        : String(error);
      this._showStatusMessage(`Duty Cycle: ${message}`, 'error');
    } finally {
      this._dutyCycleBusy = null;
    }
  }

  private async _applyRepeaterSettings() {
    if (!this.hass || !this._repeaterStatus?.supported) return;

    const status = this._repeaterStatus;
    const settings: Record<string, unknown> = {};

    // Send only values the user actually changed. Previously this handler
    // re-sent the whole Repeater block (including CMD_SET_RADIO_PARAMS) even
    // when changing Duty Cycle alone, so an unrelated setting could prevent
    // the tuning command from ever being reached.
    if (this._editValues['repeat'] !== undefined) {
      settings.repeat = Boolean(this._editValues['repeat']);
    }
    if (this._editValues['multi_acks'] !== undefined) {
      settings.multi_acks = Number(this._editValues['multi_acks']);
    }
    if (this._editValues['rx_delay'] !== undefined) {
      settings.rx_delay = Number(this._editValues['rx_delay']);
    }
    if (status.auto_advert_supported && this._editValues['auto_advert'] !== undefined) {
      settings.auto_advert = Boolean(this._editValues['auto_advert']);
    }
    for (const key of [
      'path_hash_mode',
      'flood_max',
      'flood_max_unscoped',
      'flood_max_advert',
      'loop_detect',
      'interference_threshold',
      'agc_reset_interval',
      'flood_tx_delay',
      'direct_tx_delay',
    ]) {
      if (this._editValues[key] !== undefined) {
        settings[key] = Number(this._editValues[key]);
      }
    }
    if (this._editValues['cad_enabled'] !== undefined) {
      settings.cad_enabled = Boolean(this._editValues['cad_enabled']);
    }
    if (Object.keys(settings).length === 0) {
      this._showStatusMessage('No Repeater settings changed', 'success');
      return;
    }

    this._saving = true;
    try {
      const result = await setDeviceConfig(this.hass, settings, this.config?.entry_id);
      if (!result.success) {
        this._showStatusMessage(
          result.error || 'Failed to apply Repeater settings',
          'error',
        );
        return;
      }

      for (const key of [
        'repeat',
        'auto_advert',
        'multi_acks',
        'rx_delay',
        'flood_max',
        'flood_max_unscoped',
        'flood_max_advert',
        'loop_detect',
        'cad_enabled',
        'interference_threshold',
        'agc_reset_interval',
        'flood_tx_delay',
        'direct_tx_delay',
      ]) {
        delete this._editValues[key];
      }
      this._editValues = { ...this._editValues };

      // Read the values back from the device. The backend also verifies
      // tuning writes before reporting success.
      await this._loadDeviceConfig();
      this._showStatusMessage('Repeater settings applied and verified', 'success');
    } catch (error) {
      this._showStatusMessage(`Repeater settings: ${String(error)}`, 'error');
    } finally {
      this._saving = false;
    }
  }

  private _renderIdentityManagement() {
    return html`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div class="danger-zone" style="margin-top: 0;">
          <div class="danger-zone-title">Regenerate Identity</div>
          <div style="font-size: 12px; color: var(--secondary-text-color); margin-bottom: 8px;">
            Creates a new key pair. All contacts will need to re-add you. This will change all entity IDs — automations, scripts, and dashboards using current entity IDs will need to be updated.
          </div>
          <button class="danger-button" @click=${this._showRegenIdentityConfirm}>
            Regenerate Identity
          </button>
        </div>
        <div class="danger-zone" style="margin-top: 0;">
          <div class="danger-zone-title">Import Private Key</div>
          <div style="font-size: 12px; color: var(--secondary-text-color); margin-bottom: 8px;">
            Importing a key changes the device identity. This will change all entity IDs — automations, scripts, and dashboards using current entity IDs will need to be updated.
          </div>
          <div style="display: flex; gap: 8px;">
            <input
              type="text"
              class="form-input"
              style="flex: 1; font-family: monospace;"
              placeholder="Hex private key"
              .value=${this._importKeyValue}
              @input=${(e: Event) => { this._importKeyValue = (e.target as HTMLInputElement).value; }}
            />
            <button
              class="danger-button"
              ?disabled=${!this._importKeyValue.trim()}
              @click=${this._handleImportKeyConfirm}>
              Import
            </button>
          </div>
        </div>
      </div>
    `;
  }


  private _hasChanges(_sectionId: string, keys: string[]): boolean {
    if (!this._deviceConfig) return false;
    return keys.some(
      (key) =>
        this._editValues[key] !== undefined &&
        this._editValues[key] !== (this._deviceConfig as Record<string, unknown>)[key],
    );
  }

  private async _handleApply(sectionId: string) {
    if (!this.hass || !this._deviceConfig) return;

    let keysToApply: string[] = [];

    switch (sectionId) {
      case 'device-name':
        keysToApply = ['name'];
        break;
      case 'radio-settings':
        keysToApply = ['tx_power', 'frequency', 'bandwidth', 'spreading_factor', 'coding_rate', 'path_hash_mode'];
        break;
    }

    const settings: Record<string, unknown> = {};
    for (const key of keysToApply) {
      if (this._editValues[key] !== undefined) {
        settings[key] = this._editValues[key];
      }
    }

    this._saving = true;

    try {
      const result = await setDeviceConfig(this.hass, settings, this.config?.entry_id);
      if (result.success) {
        // Optimistically update local config with the values just applied.
        // Radio settings won't be reflected by send_appstart() until a reboot,
        // so we apply them locally to keep the UI in sync.
        if (this._deviceConfig) {
          this._deviceConfig = { ...this._deviceConfig, ...settings };
        }

        // Clear edit values for applied keys
        for (const key of keysToApply) {
          delete this._editValues[key];
        }
        this._editValues = { ...this._editValues };

        if (result.rename) {
          // Rename triggers a persistent post-rename dialog
          // with old/new names + suffix + count. Toast is too easy to
          // miss for an op that rewrites N entity_ids and reloads the
          // integration. The Close handler refreshes _deviceConfig so
          // the page shows the new name immediately.
          this._renameSuccess = result.rename;
        } else {
          // Non-rename saves keep the existing toast UX.
          this._showStatusMessage(`Saved: ${keysToApply.join(', ')}`, 'success');
        }
      } else {
        this._showStatusMessage('Save failed', 'error');
      }
    } catch (error) {
      this._showStatusMessage(`Error: ${String(error)}`, 'error');
    } finally {
      this._saving = false;
    }
  }

  private async _copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      this._showStatusMessage('Copied to clipboard', 'success');
    } catch {
      this._showStatusMessage('Failed to copy', 'error');
    }
  }

  private _showStatusMessage(text: string, type: 'success' | 'error') {
    this._statusMessage = { text, type };
    if (this._statusMessageTimeout !== null) clearTimeout(this._statusMessageTimeout);
    this._statusMessageTimeout = window.setTimeout(() => {
      this._statusMessage = null;
      this._statusMessageTimeout = null;
    }, 5000);
  }

  private _handleNameSave() {
    const newName = this._editValues['name'];
    const oldName = this._deviceConfig?.name;
    if (newName === undefined || newName === oldName) return;
    // The dialog describes what the migration
    // actually does. Server-side `_migrate_entity_ids_name_suffix` in
    // ws_api.py rewrites entity_ids ending in `_<sanitized-old>` to end
    // in `_<sanitized-new>`. The local `sanitize` mirror approximates
    // meshcore-ha's `utils.py:sanitize_name` closely enough for the
    // preview — the server-side migration uses the canonical sanitize.
    const sanitize = (s: string) =>
      (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
    const oldSuffix = sanitize(oldName ?? '');
    const newSuffix = sanitize(String(newName));
    this._confirmAction = {
      title: 'Rename Device',
      message:
        `Renaming the device will rename all entity IDs ending in _${oldSuffix} to _${newSuffix}. ` +
        `Any automations, scripts, or dashboards referencing entity IDs by the old name will need updating. ` +
        `A repair issue will list every renamed entity. Continue?`,
      onConfirm: async () => {
        await this._handleApply('device-name');
      },
    };
    this._confirmDialogOpen = true;
  }

  private async _applyLocation() {
    if (!this.hass || !this._deviceConfig) return;
    this._saving = true;

    try {
      // Determine coordinates based on source
      const coordKeys = ['latitude', 'longitude'];
      const settings: Record<string, unknown> = {};

      if (this._locationSource === 'ha_location') {
        // Fetch coordinates from HA zone.home
        const zoneHome = this.hass.states['zone.home'];
        if (!zoneHome || zoneHome.attributes.latitude == null || zoneHome.attributes.longitude == null) {
          this._showStatusMessage('Could not read zone.home coordinates from Home Assistant', 'error');
          return;
        }
        settings['latitude'] = zoneHome.attributes.latitude;
        settings['longitude'] = zoneHome.attributes.longitude;
      } else {
        // Manual/GPS: apply user-edited coordinate changes if any
        for (const key of coordKeys) {
          if (this._editValues[key] !== undefined) {
            settings[key] = this._editValues[key];
          }
        }
      }

      if (Object.keys(settings).length > 0) {
        const result = await setDeviceConfig(this.hass, settings, this.config?.entry_id);
        if (!result.success) {
          this._showStatusMessage('Failed to save coordinates', 'error');
          return;
        }
        // Optimistically update local device config so fields reflect new values
        // (self_info on the coordinator may not be refreshed yet)
        if (this._deviceConfig) {
          this._deviceConfig = {
            ...this._deviceConfig,
            ...settings,
          };
        }
        for (const key of coordKeys) {
          delete this._editValues[key];
        }
        this._editValues = { ...this._editValues };
      }

      // Apply location source
      const sourceResult = await setLocationSource(this.hass, this._locationSource, this.config?.entry_id);
      if (!sourceResult.success) {
        this._showStatusMessage('Failed to update location source', 'error');
        return;
      }

      await this._loadDeviceConfig();
      this._showStatusMessage('Location settings applied', 'success');
    } catch (error) {
      this._showStatusMessage(`Error: ${String(error)}`, 'error');
    } finally {
      this._saving = false;
    }
  }

  private _showRegenIdentityConfirm() {
    this._confirmAction = {
      title: 'Regenerate Identity',
      message: 'This will create a new cryptographic identity, reboot the device, and migrate all entity IDs to the new key prefix. Existing automations referencing entity IDs by the old prefix will need updating. All contacts must re-add this device. This cannot be undone.',
      requireTyped: 'REGENERATE',
      onConfirm: async () => {
        if (!this.hass) return;
        this._startIdentityFlow('regenerate', {
          type: 'hivefw_integration/regenerate_identity',
          payload: this.config?.entry_id
            ? { entry_id: this.config.entry_id }
            : {},
        });
      },
    };
    this._confirmDialogOpen = true;
  }

  private _handleImportKeyConfirm() {
    const raw = this._importKeyValue.trim().replace(/\s+/g, '');
    if (!raw) return;
    if (raw.length !== 64 && raw.length !== 128) {
      this._showStatusMessage('Private key must be 64 or 128 hex characters', 'error');
      return;
    }
    if (!/^[0-9a-fA-F]+$/.test(raw)) {
      this._showStatusMessage('Private key must be hex (0-9, a-f)', 'error');
      return;
    }
    this._confirmAction = {
      title: 'Import Private Key',
      message: 'Importing a private key will replace the device identity, reboot the device, and migrate all entity IDs to the new key prefix. Existing automations referencing entity IDs by the old prefix will need updating. All contacts must re-add this device.',
      requireTyped: 'IMPORT',
      onConfirm: () => this._importIdentityKey(),
    };
    this._confirmDialogOpen = true;
  }

  private async _importIdentityKey() {
    if (!this.hass || !this._importKeyValue.trim()) return;
    const sanitized = this._importKeyValue.trim().replace(/\s+/g, '');
    this._importKeyValue = '';
    const payload: Record<string, unknown> = { private_key: sanitized };
    if (this.config?.entry_id) payload.entry_id = this.config.entry_id;
    this._startIdentityFlow('import', {
      type: 'hivefw_integration/import_identity',
      payload,
    });
  }

  /**
   * Open the streaming-progress identity modal and wire the WS
   * subscription. The modal is non-dismissible while in-flight; the
   * Close button only renders on terminal panels.
   *
   * Each ``progress`` event marks the previous step as completed and
   * advances ``currentStep``. ``result`` and ``error`` events
   * transition to the corresponding terminal panel.
   */
  private _startIdentityFlow(
    flow: IdentityFlowKind,
    request: { type: 'hivefw_integration/regenerate_identity' | 'hivefw_integration/import_identity'; payload: Record<string, unknown> },
  ) {
    if (!this.hass) return;
    // Reset any leftover subscription from a previous flow.
    if (this._identityFlowUnsubscribe) {
      this._identityFlowUnsubscribe();
      this._identityFlowUnsubscribe = null;
    }
    this._identityFlowState = {
      kind: 'progress',
      flow,
      currentStep: 'generating',
      completedSteps: new Set(),
    };
    const { unsubscribe } = subscribeIdentityChange(
      this.hass,
      request.type,
      request.payload,
      (event) => {
        if (event.type === 'progress') {
          if (this._identityFlowState.kind !== 'progress') return;
          const completed = new Set(this._identityFlowState.completedSteps);
          // Mark the previous currentStep as completed.
          completed.add(this._identityFlowState.currentStep);
          this._identityFlowState = {
            ...this._identityFlowState,
            currentStep: event.step,
            completedSteps: completed,
          };
        } else if (event.type === 'result') {
          this._identityFlowState = {
            kind: 'success',
            flow,
            oldPubkey: event.data.old_pubkey,
            newPubkey: event.data.new_pubkey,
            warning: event.data.warning,
          };
        } else if (event.type === 'error') {
          this._identityFlowState = {
            kind: 'failure',
            flow,
            code: event.data.code,
            message: event.data.message,
          };
        }
      },
    );
    this._identityFlowUnsubscribe = unsubscribe;
  }

  private _closeIdentityFlowModal() {
    if (this._identityFlowUnsubscribe) {
      this._identityFlowUnsubscribe();
      this._identityFlowUnsubscribe = null;
    }
    const wasSuccess = this._identityFlowState.kind === 'success';
    this._identityFlowState = { kind: 'closed' };
    // Refresh the parent settings panel so the new pubkey is reflected
    // even if the user closed without re-opening Key Management.
    if (wasSuccess) {
      void this._loadDeviceConfig();
    }
  }

  private _renderIdentityFlowModal() {
    const state = this._identityFlowState;
    if (state.kind === 'closed') return nothing;

    const flowLabel = state.flow === 'regenerate' ? 'Regenerate Identity' : 'Import Private Key';
    const inFlightTitle = state.flow === 'regenerate' ? 'Regenerating Identity' : 'Importing Identity';
    const successTitle = state.flow === 'regenerate' ? 'Identity Regenerated' : 'Identity Imported';
    const failureTitle = state.flow === 'regenerate' ? 'Identity Regeneration Failed' : 'Identity Import Failed';

    let body;
    let footer;

    if (state.kind === 'progress') {
      body = html`
        <div style="font-size: 13px; color: var(--secondary-text-color); margin-bottom: 16px;">
          This typically takes 5–10 seconds. Please don't close this dialog.
        </div>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
          ${IDENTITY_FLOW_STEP_ORDER.map((entry) => {
            const isCompleted = state.completedSteps.has(entry.step);
            const isCurrent = state.currentStep === entry.step;
            let icon = '○';
            let color = 'var(--secondary-text-color)';
            if (isCompleted) {
              icon = '✓';
              color = 'var(--success-color, #28a745)';
            } else if (isCurrent) {
              icon = '⏳';
              color = 'var(--primary-color)';
            }
            return html`
              <li style="display: flex; align-items: center; gap: 8px; color: ${color}; font-size: 14px;">
                <span style="font-family: monospace; width: 1em;">${icon}</span>
                <span>${entry.label}</span>
              </li>
            `;
          })}
        </ul>
      `;
      footer = nothing; // No Close button while in-flight.
    } else if (state.kind === 'success') {
      body = html`
        <div style="font-size: 32px; text-align: center; margin-bottom: 8px;">✅</div>
        <div style="font-size: 14px; margin-bottom: 16px;">
          The device's identity has been replaced and verified.
        </div>
        <div style="font-family: monospace; font-size: 12px; background: var(--card-background-color, #f5f5f5); padding: 8px 12px; border-radius: 4px; margin-bottom: 12px;">
          <div><span style="color: var(--secondary-text-color);">Old key:</span> ${state.oldPubkey.slice(0, 12)}…</div>
          <div><span style="color: var(--secondary-text-color);">New key:</span> ${state.newPubkey.slice(0, 12)}… <span style="color: var(--success-color, #28a745); font-size: 11px;">(verified after reload)</span></div>
        </div>
        ${state.warning ? html`
          <div style="font-size: 13px; color: var(--secondary-text-color); margin-top: 12px; padding: 8px 12px; border-left: 3px solid var(--warning-color, #f0ad4e); background: var(--warning-color-bg, rgba(240, 173, 78, 0.08));">
            <strong>Follow-up:</strong>
            <ul style="margin: 4px 0 0 16px; padding: 0;">
              <li>${state.warning}</li>
              <li>Check Settings → Repairs for the entity-ID migration list.</li>
            </ul>
          </div>
        ` : nothing}
      `;
      footer = html`
        <button class="modal-action" @click=${this._closeIdentityFlowModal}>Close</button>
      `;
    } else {
      // failure
      body = html`
        <div style="font-size: 32px; text-align: center; margin-bottom: 8px;">❌</div>
        <div style="font-size: 14px; margin-bottom: 12px;">
          ${state.flow === 'regenerate'
            ? 'The device firmware rejected the new key. Your device identity is unchanged.'
            : 'The import did not take effect. Your device identity may be unchanged.'}
        </div>
        <div style="font-family: monospace; font-size: 12px; background: var(--card-background-color, #f5f5f5); padding: 8px 12px; border-radius: 4px;">
          <div><span style="color: var(--secondary-text-color);">Error code:</span> ${state.code}</div>
          <div style="margin-top: 4px; word-break: break-word;"><span style="color: var(--secondary-text-color);">Message:</span> ${state.message}</div>
        </div>
      `;
      footer = html`
        <button class="modal-action" @click=${this._closeIdentityFlowModal}>Close</button>
      `;
    }

    const headerTitle =
      state.kind === 'progress' ? inFlightTitle :
      state.kind === 'success' ? successTitle : failureTitle;

    return html`
      <div class="modal-overlay">
        <div class="modal-card" data-a11y="identity-flow"
             role="dialog" aria-modal="true" aria-label=${flowLabel}
             style="max-width: 480px;"
             @click=${(e: Event) => e.stopPropagation()}>
          <div class="modal-header">
            <span class="modal-title">${headerTitle}</span>
            ${state.kind === 'progress' ? nothing : html`
              <button class="modal-close" aria-label="Close" @click=${this._closeIdentityFlowModal}>&times;</button>
            `}
          </div>
          <div class="modal-body" style="padding: 20px;">
            ${body}
            ${footer ? html`<div style="margin-top: 20px; display: flex; justify-content: flex-end;">${footer}</div>` : nothing}
          </div>
        </div>
      </div>
    `;
  }

  private _closeRenameSuccessModal() {
    // Clear the modal state and refresh the device config so the
    // settings page's "Device Name" input reflects the new value.
    this._renameSuccess = null;
    void this._loadDeviceConfig();
    // The companion-card title elsewhere on this page (and the
    // panel's header) reads from `selectedDevice.name`, which is
    // owned by the parent panel's `_devices` array — NOT from
    // `_deviceConfig`. Notify the parent so it can re-fetch
    // `getDevices(...)` and refresh `_devices` (which makes the
    // computed `_selectedDevice` reflect the new name).
    this.dispatchEvent(
      new CustomEvent('device-renamed', { bubbles: true, composed: true }),
    );
  }

  private _renderRenameSuccessModal() {
    const r = this._renameSuccess;
    if (!r) return nothing;

    // Uses the canonical `.dialog-*` pattern (same as
    // `meshcore-confirm-dialog`) rather than the `.modal-*` pattern
    // (which is for full-width left-aligned menu-list items, e.g.
    // the Companion Settings overflow menu). Visual consistency
    // with the rename CONFIRM dialog the user just clicked through.
    //
    // Body matches the `name_changed` repair-issue text minus the
    // bullet list of (old_id → new_id) pairs — that list lives in
    // Settings → Repairs (one issue per rename, timestamped) and
    // would dwarf the dialog.
    return html`
      <div class="dialog-overlay">
        <div class="dialog"
             role="dialog" aria-modal="true" aria-label="Device renamed"
             data-a11y="rename-success"
             @click=${(e: Event) => e.stopPropagation()}>
          <div class="dialog-header">
            <div class="dialog-header-title">Device renamed</div>
          </div>
          <div class="dialog-body">
            <p style="margin: 0 0 12px 0;">
              The HiveFW device was renamed from
              <code>${r.old_name}</code> to <code>${r.new_name}</code>.
            </p>
            <p style="margin: 0 0 12px 0;">
              ${r.count}
              ${r.count === 1 ? 'entity ID was' : 'entity IDs were'}
              automatically migrated from the
              <code>_${r.old_suffix}</code> suffix to
              <code>_${r.new_suffix}</code>.
            </p>
            <p style="margin: 0 0 12px 0;">
              If you have automations, scripts, or dashboards
              referencing the old entity IDs, you will need to
              update them manually to use the new suffix.
            </p>
            <p style="margin: 0; color: var(--secondary-text-color); font-size: 13px;">
              The full list of renamed entity IDs is available in
              Settings → Repairs.
            </p>
          </div>
          <div class="dialog-footer">
            <button class="dialog-button primary"
                    @click=${this._closeRenameSuccessModal}>Close</button>
          </div>
        </div>
      </div>
    `;
  }

  private async _onConfirmAction() {
    this._confirmDialogOpen = false;
    if (this._confirmAction) {
      try {
        await this._confirmAction.onConfirm();
      } catch (error) {
        this._error = `Error: ${String(error)}`;
      }
    }
    this._confirmAction = null;
  }

  private _onConfirmCancel() {
    this._confirmDialogOpen = false;
    this._confirmAction = null;
  }


}

declare global {
  interface HTMLElementTagNameMap {
    'meshcore-settings-page': SettingsPage;
  }
}
