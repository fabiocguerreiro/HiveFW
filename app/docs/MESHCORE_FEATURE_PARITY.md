# HiveFW app vs MeshCore / MeshOS — feature parity

Last review: 2026-09-25

This document tracks functional parity between HiveFW-app and the current
official MeshCore / MeshOS companion experience. It is intentionally split
between features that are already available, features that are partial, and
features that require new protocol/firmware support.

## Status legend

- ✅ Covered
- 🟡 Partial / different implementation
- ❌ Missing
- ⏳ Requires protocol/firmware investigation
- ➕ HiveFW extension beyond the stock companion app

## Messaging

| Feature | HiveFW | Notes |
|---|---|---|
| Channel chat | ✅ | Persistent history, previews and unread badges |
| Direct messages | ✅ | Persistent history and retries |
| Reply to message | ✅ | Swipe/press reply behaviour |
| Delivery state | ✅ | Sent/confirmed state |
| Repeater echo / repeat report | ✅ | Heard-by-repeaters badge |
| Mentions | ✅ | Styled mention pills |
| Hashtag navigation | ✅ | Hashtag pills/links |
| URLs | ✅ | Confirm before opening externally |
| Quick/canned messages | ✅ | Configurable library |
| Room servers | ✅ | Login, chat and persisted history |
| Dedicated emoji picker | 🟡 | Device keyboard emoji works; no MeshOS-style picker |
| Channel participants | ✅ | Derived from observed senders, with block/unblock controls |
| Global user blocking | ✅ | Persistent per-radio blocking for channel and private chat |
| Profile pictures / avatars | ❌ | Needs local image store + identity mapping |
| Reactions / voice notes | ⏳ | Relevant mainly to newer MeshOS/AirLink flows |
| Share location inside a chat | ✅ | Explicit location action in channel and private composers |
| Open received location directly on map | ✅ | HiveFW GEO messages open directly on the map |
| Per-channel region/scope | ✅ | Persistent scope, QR region_scope and CMD_SET_FLOOD_SCOPE_KEY on send |

## Channels

| Feature | HiveFW | Notes |
|---|---|---|
| Create/join channels | ✅ | Private/public/hashtag + QR |
| Rename/delete | ✅ | |
| QR share/import | ✅ | |
| Mute | ✅ | Per-channel |
| Unread state | ✅ | |
| APPS/SOS dedicated channel | ➕ | HiveFW-specific |
| Favorite channel | ✅ | Per-radio persistent favorite ordering |
| Hide channel without deleting radio slot | ✅ | Per-radio local hide/unhide manager |

## Contacts / discovery

| Feature | HiveFW | Notes |
|---|---|---|
| Contacts sync | ✅ | |
| Search/filter/sort | ✅ | |
| Favorites | ✅ | |
| Heard/discovered contacts | ✅ | Separate discover screen |
| Auto-add policy | ✅ | |
| Contact pruning | ✅ | Configurable |
| QR contact share/import | ✅ | |
| GPS/contact map | ✅ | |
| Path management | ✅ | |
| Path discovery | ✅ | |
| Trace route | ✅ | |
| Zero-hop repeater discovery | ✅ | Active NODE_DISCOVER flow |
| Signal indicator in repeater discovery | ✅ | RSSI visual bars |
| Detailed repeater contact/GPS info | ✅ | On tap / overflow menu |

## Maps

| Feature | HiveFW | Notes |
|---|---|---|
| Online map tiles | ✅ | OpenStreetMap |
| Contact markers | ✅ | |
| Clustering | ✅ | |
| Route/trace overlay | ✅ | |
| Own phone/radio position | ✅ | |
| Share map screenshot | ➕ | |
| Zero-hop repeater overlay | ➕ | |
| Contact visibility controls | ✅ | |
| Wardrive logging / heatmap | ❌ | Official MeshOS mobile supports this |
| Community coverage layer | ❌ | Needs public service/API integration |
| Dropped personal pins/bookmarks | ❌ | Local feature |
| Compass/oriented marker | ❌ | Optional |

## Device / Companion management

| Feature | HiveFW | Notes |
|---|---|---|
| BLE | ✅ | Primary transport |
| Wi-Fi/TCP | ✅ | |
| USB/serial | ✅ | Desktop/platform dependent |
| Radio parameters | ✅ | Frequency/BW/SF/CR/TX |
| Path hash mode | ✅ | |
| Advert name | ✅ | |
| GPS advert policy | ✅ | |
| Battery/storage | ✅ | |
| Telemetry/stats | ✅ | |
| Reboot | ✅ | |
| Private key backup/restore | ✅ | |
| App self-update | ✅ | GitHub release updater |
| Unified Companion connection-mode switch | ❌ | Official MeshOS can switch BLE/USB/Wi-Fi on supported firmware |
| Push Wi-Fi credentials to radio | ✅ | HiveFW V3 local /wifi portal provisioning from the app |
| Radio firmware update from app | 🟡 | HiveFW V3 Wi-Fi OTA implemented; T114/BLE DFU remains future work |

## Repeater / infrastructure

| Feature | HiveFW | Notes |
|---|---|---|
| Local Repeater enable/disable | ➕ | HiveFW firmware extension |
| Local Repeater config | ➕ | Owner, mesh time, RX gain, ADC, diagnostics |
| Local ACL | ➕ | |
| RegionMap | ➕ | |
| Passive neighbours | ➕ | |
| Remote repeater login | ✅ | |
| Remote status/stats | ✅ | |
| Remote CLI | ✅ | |
| Reboot / admin commands | ✅ | |
| Remote full configuration parity | 🟡 | Review command-by-command against newest firmware |
| Remote neighbour management | 🟡 | Needs final parity check |
| Whitelist management | 🟡 | HiveFW ACL differs from stock UI |

## Notifications / UX

| Feature | HiveFW | Notes |
|---|---|---|
| Message notifications | ✅ | |
| Unread badges | ✅ | |
| Per-channel mute | ✅ | |
| Theme/accent/text size | ✅ | |
| Signal + battery header | ✅ | |
| Multi-language | ✅ | PT/EN/ES, some untranslated strings remain |
| Profile avatars | ❌ | See profile pictures |
| Chat font family selector | ❌ | Text scale exists |

## Newer MeshOS ecosystem features

| Feature | HiveFW | Notes |
|---|---|---|
| AirLink phone-to-phone Bluetooth mesh | ❌ | Large standalone subsystem |
| AirLink bridge via companion | ⏳ | Requires current AirLink protocol support |
| AirLink voice/data/reactions | ⏳ | Depends on AirLink architecture |
| Wardrive/community coverage | ❌ | Good candidate for later phase |

## Migration order

### Phase 1 — app-only, low protocol risk
1. ✅ Channel favorites and local hide.
2. ✅ Channel participants view.
3. ✅ Persistent global user blocking.
4. ✅ Chat location action + open location on map.
5. Not planned: local map pins/bookmarks.
6. Not planned: profile pictures.

### Phase 2 — protocol-dependent
1. Not planned: stock Unified Companion UI (HiveFW will converge on its own unified interface).
2. ✅ HiveFW V3 Wi-Fi credential provisioning.
3. ✅ Per-channel region/scope support.
4. Complete remote repeater command parity.
5. 🟡 Radio firmware updater: V3 Wi-Fi OTA done; BLE DFU pending.

### Phase 3 — larger subsystems
Not planned by project scope: Wardrive, Community Map and AirLink.

## HiveFW-specific functionality to preserve

The following functionality is intentionally not part of strict stock-app
parity and must not be removed while matching upstream behaviour:

- APPS/SOS channel and Home Assistant commands
- HiveFW local Repeater mode/configuration
- ACL and RegionMap controls
- passive neighbour history
- zero-hop repeater discovery enhancements
- telemetry/noise-floor/RX log/data export/topology tools
- app self-update
- quick commands in the APPS/SOS composer, read live from the Companion
