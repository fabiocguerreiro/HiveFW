# Releasing HiveFW firmware

HiveFW releases are built by GitHub Actions from `hivefw-V*` / `hivefw-v*` tags.

Each release must contain device-specific firmware for both supported targets:

- **Heltec V3** — `Heltec_v3_companion_radio_wifi-<version>-<sha>.bin`
- **Heltec T114** — `Heltec_t114_companion_radio_ble-<version>-<sha>.zip` for BLE DFU and the matching `.uf2`

The release workflow validates that the V3 BIN and both T114 files exist before publishing.

Only the current HiveFW GitHub Release is kept. When a new tagged HiveFW release is published, older HiveFW release entries are deleted automatically. Historical Git tags are preserved.
