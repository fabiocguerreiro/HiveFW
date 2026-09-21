<p align="center">
  <img src="custom_components/hivefw_integration/brand/logo.png" alt="HiveFW" width="420">
</p>

# HiveFW

**HiveFW** is a unified MeshCore-based platform combining the radio firmware and its native Home Assistant integration in one repository.

The firmware keeps **Companion Radio** as the primary interface and adds an optional **Repeater** mode. The Home Assistant integration communicates directly with HiveFW and provides radio configuration, messaging, neighbours, maps, diagnostics, backup/restore and secure LAN OTA for supported ESP32 targets.

## Repository layout

```text
HiveFW/
├── src/                                  MeshCore/HiveFW core
├── examples/companion_radio/             HiveFW Companion + optional Repeater
├── variants/                             board definitions
├── arch/                                 platform support
├── custom_components/hivefw_integration/ Home Assistant integration
├── frontend/                             Home Assistant panel source
├── tests/                                Home Assistant tests
├── docs/                                 project documentation
├── platformio.ini
├── build.sh
└── VERSION                               shared HiveFW version
```

## Supported primary targets

- **Heltec WiFi LoRa 32 V3** — Companion over TCP/Wi-Fi, optional Repeater, Web OTA.
- **Heltec T114** — Companion over BLE, optional Repeater, BLE DFU / UF2.

## Home Assistant

HACS custom repository:

```text
https://github.com/fabiocguerreiro/HiveFW
```

The integration remains:

```text
custom_components/hivefw_integration
```

Domain: `hivefw_integration`.

## Versioning

HiveFW now uses one project version for firmware and Home Assistant. The `VERSION` file is the canonical release version and the Home Assistant manifest is kept in sync with it.

The first unified development line is **1.12.0**. No release is published merely by this repository merge.

## Firmware update source

Home Assistant OTA and firmware discovery use this repository's GitHub releases:

```text
fabiocguerreiro/HiveFW
```

## Upstream projects

HiveFW remains derived from and tracks changes from:

- [MeshCore](https://github.com/meshcore-dev/MeshCore)
- [meshcore-ha](https://github.com/meshcore-dev/meshcore-ha)
- [meshcore-ha-chat](https://github.com/mwolter805/meshcore-ha-chat)

Upstream changes are reviewed and adapted to HiveFW rather than blindly merged into the product tree.

## Development

Firmware:

```bash
./build.sh build-firmware Heltec_v3_companion_radio_wifi
./build.sh build-firmware Heltec_t114_companion_radio_ble
```

Home Assistant frontend:

```bash
cd frontend
npm ci
npm run typecheck
npm run build
npm test
```

Home Assistant backend:

```bash
python -m pytest tests/
```

## Credits and licences

HiveFW contains code derived from MeshCore and adapted code from the MeshCore Home Assistant ecosystem. See `LICENSE`, `license.txt`, `THIRD_PARTY_NOTICES.md` and the files under `licenses/` for the applicable licences and attributions.
