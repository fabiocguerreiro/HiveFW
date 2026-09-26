/// MeshCore Companion Radio Protocol — command and response codes.
///
/// These map to the companion radio serial protocol used over
/// Serial/BLE/WiFi between the app and a MeshCore radio.
library;

// ---------------------------------------------------------------------------
// Direction markers
// ---------------------------------------------------------------------------

/// App → Radio direction byte.
const int dirAppToRadio = 0x3C; // '<'

/// Radio → App direction byte.
const int dirRadioToApp = 0x3E; // '>'

// ---------------------------------------------------------------------------
// App → Radio commands
// ---------------------------------------------------------------------------

const int cmdAppStart = 0x01;
const int cmdSendMsg = 0x02;
const int cmdSendChanMsg = 0x03;
const int cmdGetContacts = 0x04;
const int cmdGetDeviceTime = 0x05;
const int cmdSetDeviceTime = 0x06;
const int cmdSendAdvert = 0x07;
const int cmdSetAdvertName = 0x08;
const int cmdAddUpdateContact = 0x09;
const int cmdSyncNext = 0x0A;
const int cmdSetRadioParams = 0x0B;
const int cmdSetTxPower = 0x0C;
const int cmdResetPath = 0x0D;
const int cmdSetAdvertLatLon = 0x0E;
const int cmdRemoveContact = 0x0F;
const int cmdShareContact = 0x10;
const int cmdExportContact = 0x11;
const int cmdImportContact = 0x12;
const int cmdReboot = 0x13;
const int cmdGetBattAndStorage = 0x14;
const int cmdSetTuningParams = 0x15;
const int cmdDeviceQuery = 0x16;
const int cmdExportPrivateKey = 0x17;
const int cmdImportPrivateKey = 0x18;
const int cmdSendLogin = 0x1A;
const int cmdSendStatusReq = 0x1B;
const int cmdGetByKey = 0x1E;
const int cmdGetChannel = 0x1F;
const int cmdSetChannel = 0x20;
const int cmdSignData = 0x22;
const int cmdSignFinish = 0x23;
const int cmdSendTracePath = 0x24;
const int cmdSendTelemetryReq = 0x27;

// HiveFW local Companion extensions. These opcodes mirror the current
// HiveFW firmware and never generate LoRa traffic by themselves.
const int cmdGetCustomVars = 0x28;
const int cmdSetCustomVar = 0x29;
const int cmdGetAdvertPath = 0x2A;
const int cmdGetTuningParams = 0x2B;
const int cmdGetHiveNeighbours = 0x2C;
const int cmdGetRepeaterRfConfig = 0x2D;
const int cmdGetRepeaterAuthConfig = 0x2E;
const int cmdGetRepeaterRegion = 0x2F;
const int cmdSetRepeaterRegion = 0x30;
const int cmdGetObservedChannels = 0x31;
const int cmdVerifyObservedChannel = 0x35;

const int cmdSetOtherParams =
    0x26; // 38 — manual_add_contacts, telemetry_mode, adv_loc_policy, multi_acks
const int cmdSendBinaryReq = 0x32;
const int cmdSendPathDiscoveryReq = 0x34;
const int cmdSetFloodScopeKey = 0x36; // 54 — MeshCore v8+
const int cmdSendControlData = 0x37;
const int cmdGetStats = 0x38;
const int cmdSetAutoAddConfig = 0x3A; // 58 — write autoadd bitmask + max-hops
const int cmdGetAutoAddConfig = 0x3B; // 59 — read  autoadd bitmask + max-hops

/// Experimental: set the wire-level path hash size used by sendFlood().
/// Mode 0 = 1-byte hashes (default, all firmwares), 1 = 2-byte, 2 = 3-byte.
/// Reported back in the device-info response at byte 80 (firmware v10+).
const int cmdSetPathHashMode = 0x3D; // 61 — frame: [cmd, 0x00, mode]
const int cmdGetRepeaterProfile = 0x42; // 66 — page 0 owner, page 1 RX gain/ADC
const int cmdGetRepeaterAclEntry = 0x43; // 67 — persisted ACL entry by index
const int cmdSetRepeaterAclEntry = 0x44; // 68 — role byte + full 32-byte pubkey
const int cmdGetHaCommands = 0x45; // 69 — HiveFW local HA command page

// ---------------------------------------------------------------------------
// CMD_GET_STATS sub-types
// ---------------------------------------------------------------------------

/// Core device statistics: battery, uptime, errors, queue length.
const int statsTypeCore = 0;

/// Radio statistics: noise floor, RSSI, SNR, TX/RX airtime.
const int statsTypeRadio = 1;

/// Packet counters: received, sent, flood/direct breakdown, receive errors.
const int statsTypePackets = 2;

// ---------------------------------------------------------------------------
// Radio → App responses
// ---------------------------------------------------------------------------

const int respOk = 0x00;
const int respErr = 0x01;
const int respContactsStart = 0x02;
const int respContact = 0x03;
const int respEndContacts = 0x04;
const int respSelfInfo = 0x05;
const int respSent = 0x06;
const int respContactMsgRecv = 0x07;
const int respChannelMsgRecv = 0x08;
const int respCurrTime = 0x09;
const int respNoMoreMessages = 0x0A;
const int respBattAndStorage = 0x0C;
const int respDeviceInfo = 0x0D;
const int respPrivateKey = 0x0E;
const int respContactMsgRecvV3 = 0x10;
const int respChannelMsgRecvV3 = 0x11;
const int respChannelInfo = 0x12;
const int respSignature = 0x14;
const int respCustomVars = 0x15;
const int respAdvertPath = 0x16;
const int respTuningParams = 0x17;
const int respStats = 0x18;
const int respAutoAddConfig = 0x19; // 25 — response to CMD_GET_AUTOADD_CONFIG

// ---------------------------------------------------------------------------
// autoadd_config bitmask bits  (companion radio firmware — MyMesh.cpp)
// ---------------------------------------------------------------------------

/// Overwrite the oldest non-favourite contact when the contact table is full.
const int autoAddOverwriteOldest = 0x01;

/// Auto-add Chat / Companion node adverts (ADV_TYPE_CHAT = 1).
const int autoAddChat = 0x02;

/// Auto-add Repeater node adverts (ADV_TYPE_REPEATER = 2).
const int autoAddRepeater = 0x04;

/// Auto-add Room Server node adverts (ADV_TYPE_ROOM = 3).
const int autoAddRoom = 0x08;

/// Auto-add Sensor node adverts (ADV_TYPE_SENSOR = 4).
const int autoAddSensor = 0x10;

// ---------------------------------------------------------------------------
// Unsolicited push codes (Radio → App)
// ---------------------------------------------------------------------------

const int pushAdvert = 0x80;
const int pushPathUpdated = 0x81;
const int pushSendConfirmed = 0x82;
const int pushMsgWaiting = 0x83;
const int pushRawData = 0x84;
const int pushLoginSuccess = 0x85;
const int pushLoginFail = 0x86;
const int pushStatusResponse = 0x87;
const int pushLogRxData = 0x88;
const int pushTraceData = 0x89;
const int pushNewAdvert = 0x8A;
const int pushTelemetryResponse = 0x8B;
const int pushBinaryResponse = 0x8C;
const int pushPathDiscoveryResponse = 0x8D;
const int pushControlData = 0x8E;
const int pushContactDeleted = 0x8F;
const int pushContactsFull = 0x90;

// ---------------------------------------------------------------------------
// Contact / Advert types
// ---------------------------------------------------------------------------

const int advTypeNone = 0x00;
const int advTypeChat = 0x01;
const int advTypeRepeater = 0x02;
const int advTypeRoom = 0x03;
const int advTypeSensor = 0x04;

// ---------------------------------------------------------------------------
// Mesh control-data sub-types
// ---------------------------------------------------------------------------

/// Zero-hop node discovery request. Low bit may request prefix-only responses.
const int controlTypeNodeDiscoverReq = 0x80;

/// Node discovery response family. Low nibble contains the ADV_TYPE_* value.
const int controlTypeNodeDiscoverResp = 0x90;

// ---------------------------------------------------------------------------
// Max frame payload
// ---------------------------------------------------------------------------

const int maxPayload = 172;

// ---------------------------------------------------------------------------
// Text type indicator (first byte of message payload)
// ---------------------------------------------------------------------------

const int txtPlain = 0x00;
const int txtCliData = 0x01;
