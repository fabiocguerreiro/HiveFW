#include "MyMesh.h"

#include <Arduino.h> // needed for PlatformIO
#include <Mesh.h>

#if defined(ESP32)
#include <Preferences.h>
#endif

#if defined(ESP32) && defined(WIFI_SSID) && defined(WEB_OTA_ENABLED)
extern bool hivefw_set_ota_token(const char* token);
#endif

#define CMD_APP_START                 1
#define CMD_SEND_TXT_MSG              2
#define CMD_SEND_CHANNEL_TXT_MSG      3
#define CMD_GET_CONTACTS              4 // with optional 'since' (for efficient sync)
#define CMD_GET_DEVICE_TIME           5
#define CMD_SET_DEVICE_TIME           6
#define CMD_SEND_SELF_ADVERT          7
#define CMD_SET_ADVERT_NAME           8
#define CMD_ADD_UPDATE_CONTACT        9
#define CMD_SYNC_NEXT_MESSAGE         10
#define CMD_SET_RADIO_PARAMS          11
#define CMD_SET_RADIO_TX_POWER        12
#define CMD_RESET_PATH                13
#define CMD_SET_ADVERT_LATLON         14
#define CMD_REMOVE_CONTACT            15
#define CMD_SHARE_CONTACT             16
#define CMD_EXPORT_CONTACT            17
#define CMD_IMPORT_CONTACT            18
#define CMD_REBOOT                    19
#define CMD_GET_BATT_AND_STORAGE      20   // was CMD_GET_BATTERY_VOLTAGE
#define CMD_SET_TUNING_PARAMS         21
#define CMD_DEVICE_QUERY              22
#define CMD_EXPORT_PRIVATE_KEY        23
#define CMD_IMPORT_PRIVATE_KEY        24
#define CMD_SEND_RAW_DATA             25
#define CMD_SEND_LOGIN                26
#define CMD_SEND_STATUS_REQ           27
#define CMD_HAS_CONNECTION            28
#define CMD_LOGOUT                    29 // 'Disconnect'
#define CMD_GET_CONTACT_BY_KEY        30
#define CMD_GET_CHANNEL               31
#define CMD_SET_CHANNEL               32
#define CMD_SIGN_START                33
#define CMD_SIGN_DATA                 34
#define CMD_SIGN_FINISH               35
#define CMD_SEND_TRACE_PATH           36
#define CMD_SET_DEVICE_PIN            37
#define CMD_SET_OTHER_PARAMS          38
#define CMD_SEND_TELEMETRY_REQ        39  // can deprecate this
#define CMD_GET_CUSTOM_VARS           40
#define CMD_SET_CUSTOM_VAR            41
#define CMD_GET_ADVERT_PATH           42
#define CMD_GET_TUNING_PARAMS         43
#define CMD_GET_HIVE_NEIGHBOURS       44   // HiveFW local neighbour-table page
#define CMD_GET_REPEATER_RF_CONFIG     45   // HiveFW local CAD/interference/AGC/delays
#define CMD_GET_REPEATER_AUTH_CONFIG   46   // HiveFW local Repeater login/ACL status
#define CMD_GET_REPEATER_REGION        47   // HiveFW local RegionMap entry/status
#define CMD_SET_REPEATER_REGION        48   // HiveFW local RegionMap mutation
#define CMD_GET_OBSERVED_CHANNELS      49   // HiveFW passive forwarded-channel activity
#define CMD_SEND_BINARY_REQ           50
#define CMD_FACTORY_RESET             51
#define CMD_SEND_PATH_DISCOVERY_REQ   52
#define CMD_VERIFY_OBSERVED_CHANNEL   53   // HiveFW verify candidate key against observed group packet
#define CMD_SET_FLOOD_SCOPE_KEY       54   // v8+
#define CMD_SEND_CONTROL_DATA         55   // v8+
#define CMD_GET_STATS                 56   // v8+, second byte is stats type
#define CMD_SEND_ANON_REQ             57
#define CMD_SET_AUTOADD_CONFIG        58
#define CMD_GET_AUTOADD_CONFIG        59
#define CMD_GET_ALLOWED_REPEAT_FREQ   60
#define CMD_SET_PATH_HASH_MODE        61
#define CMD_SEND_CHANNEL_DATA         62
#define CMD_SET_DEFAULT_FLOOD_SCOPE   63
#define CMD_GET_DEFAULT_FLOOD_SCOPE   64
#define CMD_SEND_RAW_PACKET           65
#define CMD_GET_REPEATER_PROFILE      66   // HiveFW owner/RX gain/ADC pages
#define CMD_GET_REPEATER_ACL_ENTRY    67   // HiveFW persisted ACL entry by logical index
#define CMD_SET_REPEATER_ACL_ENTRY    68   // HiveFW set/remove one persisted ACL identity
#define CMD_GET_HA_COMMANDS            69   // HiveFW local Home Assistant command page

// Stats sub-types for CMD_GET_STATS
#define STATS_TYPE_CORE               0
#define STATS_TYPE_RADIO              1
#define STATS_TYPE_PACKETS             2

#define RESP_CODE_OK                  0
#define RESP_CODE_ERR                 1
#define RESP_CODE_CONTACTS_START      2  // first reply to CMD_GET_CONTACTS
#define RESP_CODE_CONTACT             3  // multiple of these (after CMD_GET_CONTACTS)
#define RESP_CODE_END_OF_CONTACTS     4  // last reply to CMD_GET_CONTACTS
#define RESP_CODE_SELF_INFO           5  // reply to CMD_APP_START
#define RESP_CODE_SENT                6  // reply to CMD_SEND_TXT_MSG
#define RESP_CODE_CONTACT_MSG_RECV    7  // a reply to CMD_SYNC_NEXT_MESSAGE (ver < 3)
#define RESP_CODE_CHANNEL_MSG_RECV    8  // a reply to CMD_SYNC_NEXT_MESSAGE (ver < 3)
#define RESP_CODE_CURR_TIME           9  // a reply to CMD_GET_DEVICE_TIME
#define RESP_CODE_NO_MORE_MESSAGES    10 // a reply to CMD_SYNC_NEXT_MESSAGE
#define RESP_CODE_EXPORT_CONTACT      11
#define RESP_CODE_BATT_AND_STORAGE    12 // a reply to a CMD_GET_BATT_AND_STORAGE
#define RESP_CODE_DEVICE_INFO         13 // a reply to CMD_DEVICE_QUERY
#define RESP_CODE_PRIVATE_KEY         14 // a reply to CMD_EXPORT_PRIVATE_KEY
#define RESP_CODE_DISABLED            15
#define RESP_CODE_CONTACT_MSG_RECV_V3 16 // a reply to CMD_SYNC_NEXT_MESSAGE (ver >= 3)
#define RESP_CODE_CHANNEL_MSG_RECV_V3 17 // a reply to CMD_SYNC_NEXT_MESSAGE (ver >= 3)
#define RESP_CODE_CHANNEL_INFO        18 // a reply to CMD_GET_CHANNEL
#define RESP_CODE_SIGN_START          19
#define RESP_CODE_SIGNATURE           20
#define RESP_CODE_CUSTOM_VARS         21
#define RESP_CODE_ADVERT_PATH         22
#define RESP_CODE_TUNING_PARAMS       23
#define RESP_CODE_STATS               24   // v8+, second byte is stats type
#define RESP_CODE_AUTOADD_CONFIG      25
#define RESP_ALLOWED_REPEAT_FREQ      26
#define RESP_CODE_CHANNEL_DATA_RECV   27
#define RESP_CODE_DEFAULT_FLOOD_SCOPE 28

#define MAX_CHANNEL_DATA_LENGTH       (MAX_FRAME_SIZE - 9)

#define SEND_TIMEOUT_BASE_MILLIS        500
#define FLOOD_SEND_TIMEOUT_FACTOR       16.0f
#define DIRECT_SEND_PERHOP_FACTOR       6.0f
#define DIRECT_SEND_PERHOP_EXTRA_MILLIS 250


static size_t hivefwBase64Encode(
  const uint8_t* src,
  size_t len,
  char* dest,
  size_t dest_size
) {
  static const char alphabet[] =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const size_t needed = ((len + 2U) / 3U) * 4U;
  if (dest == NULL || dest_size <= needed) return 0;

  size_t out = 0;
  for (size_t i = 0; i < len; i += 3) {
    const uint32_t a = src[i];
    const uint32_t b = i + 1 < len ? src[i + 1] : 0;
    const uint32_t d = i + 2 < len ? src[i + 2] : 0;
    const uint32_t block = (a << 16) | (b << 8) | d;

    dest[out++] = alphabet[(block >> 18) & 0x3F];
    dest[out++] = alphabet[(block >> 12) & 0x3F];
    dest[out++] = i + 1 < len ? alphabet[(block >> 6) & 0x3F] : '=';
    dest[out++] = i + 2 < len ? alphabet[block & 0x3F] : '=';
  }
  dest[out] = '\0';
  return out;
}
#define LAZY_CONTACTS_WRITE_DELAY       5000
#define HIVEFW_REPEATER_RESPONSE_DELAY   300
#define HIVEFW_REPEATER_CLI_REPLY_DELAY  600
#define HIVEFW_REPEATER_FW_LEVEL           2

#ifndef CTL_TYPE_NODE_DISCOVER_REQ
#define CTL_TYPE_NODE_DISCOVER_REQ   0x80
#endif

#ifndef CTL_TYPE_NODE_DISCOVER_RESP
#define CTL_TYPE_NODE_DISCOVER_RESP  0x90
#endif

#define PUBLIC_GROUP_PSK                "izOH6cXN6mrJ5e26oRXNcg=="

// these are _pushed_ to client app at any time
#define PUSH_CODE_ADVERT                0x80
#define PUSH_CODE_PATH_UPDATED          0x81
#define PUSH_CODE_SEND_CONFIRMED        0x82
#define PUSH_CODE_MSG_WAITING           0x83
#define PUSH_CODE_RAW_DATA              0x84
#define PUSH_CODE_LOGIN_SUCCESS         0x85
#define PUSH_CODE_LOGIN_FAIL            0x86
#define PUSH_CODE_STATUS_RESPONSE       0x87
#define PUSH_CODE_LOG_RX_DATA           0x88
#define PUSH_CODE_TRACE_DATA            0x89
#define PUSH_CODE_NEW_ADVERT            0x8A
#define PUSH_CODE_TELEMETRY_RESPONSE    0x8B
#define PUSH_CODE_BINARY_RESPONSE       0x8C
#define PUSH_CODE_PATH_DISCOVERY_RESPONSE 0x8D
#define PUSH_CODE_CONTROL_DATA          0x8E   // v8+
#define PUSH_CODE_CONTACT_DELETED       0x8F // used to notify client app of deleted contact when overwriting oldest
#define PUSH_CODE_CONTACTS_FULL         0x90 // used to notify client app that contacts storage is full

#define ERR_CODE_UNSUPPORTED_CMD        1
#define ERR_CODE_NOT_FOUND              2
#define ERR_CODE_TABLE_FULL             3
#define ERR_CODE_BAD_STATE              4
#define ERR_CODE_FILE_IO_ERROR          5
#define ERR_CODE_ILLEGAL_ARG            6

#define MAX_SIGN_DATA_LEN               (8 * 1024) // 8K

// HiveFW Smart Advert:
// - one deterministic daily slot derived from the node hash;
// - persisted timestamp means an Auto Advert was actually originated;
// - state version 1 distinguishes this scheme from the old "seed timestamp"
//   implementation that could store a reference without transmitting.
static constexpr uint32_t HIVEFW_SMART_ADVERT_INTERVAL_SECONDS = 24UL * 60UL * 60UL;
// Local neighbour adverts follow the official SimpleRepeater interval rules:
// 0 disables; otherwise 60..240 minutes, in two-minute steps. The persisted
// HiveFW default is the maximum (240 min) to minimise airtime.
static constexpr uint32_t HIVEFW_SMART_ADVERT_ENABLE_GRACE_SECONDS = 5UL * 60UL;
static constexpr uint32_t HIVEFW_SMART_ADVERT_VALID_EPOCH_MIN = 1577836800UL;
static constexpr uint8_t HIVEFW_SMART_ADVERT_STATE_VERSION = 1;

// Auto-add config bitmask
// Bit 0: If set, overwrite oldest non-favourite contact when contacts file is full
// Bits 1-4: these indicate which contact types to auto-add when manual_contact_mode = 0x01
#define AUTO_ADD_OVERWRITE_OLDEST (1 << 0)  // 0x01 - overwrite oldest non-favourite when full
#define AUTO_ADD_CHAT             (1 << 1)  // 0x02 - auto-add Chat (Companion) (ADV_TYPE_CHAT)
#define AUTO_ADD_REPEATER         (1 << 2)  // 0x04 - auto-add Repeater (ADV_TYPE_REPEATER)
#define AUTO_ADD_ROOM_SERVER      (1 << 3)  // 0x08 - auto-add Room Server (ADV_TYPE_ROOM)
#define AUTO_ADD_SENSOR           (1 << 4)  // 0x10 - auto-add Sensor (ADV_TYPE_SENSOR)

void MyMesh::writeOKFrame() {
  uint8_t buf[1];
  buf[0] = RESP_CODE_OK;
  _serial->writeFrame(buf, 1);
}
void MyMesh::writeErrFrame(uint8_t err_code) {
  uint8_t buf[2];
  buf[0] = RESP_CODE_ERR;
  buf[1] = err_code;
  _serial->writeFrame(buf, 2);
}

void MyMesh::writeDisabledFrame() {
  uint8_t buf[1];
  buf[0] = RESP_CODE_DISABLED;
  _serial->writeFrame(buf, 1);
}

void MyMesh::writeContactRespFrame(uint8_t code, const ContactInfo &contact) {
  int i = 0;
  out_frame[i++] = code;
  memcpy(&out_frame[i], contact.id.pub_key, PUB_KEY_SIZE);
  i += PUB_KEY_SIZE;
  out_frame[i++] = contact.type;
  out_frame[i++] = contact.flags;
  out_frame[i++] = contact.out_path_len;
  memcpy(&out_frame[i], contact.out_path, MAX_PATH_SIZE);
  i += MAX_PATH_SIZE;
  StrHelper::strzcpy((char *)&out_frame[i], contact.name, 32);
  i += 32;
  memcpy(&out_frame[i], &contact.last_advert_timestamp, 4);
  i += 4;
  memcpy(&out_frame[i], &contact.gps_lat, 4);
  i += 4;
  memcpy(&out_frame[i], &contact.gps_lon, 4);
  i += 4;
  memcpy(&out_frame[i], &contact.lastmod, 4);
  i += 4;
  _serial->writeFrame(out_frame, i);
}

void MyMesh::updateContactFromFrame(ContactInfo &contact, uint32_t& last_mod, const uint8_t *frame, int len) {
  int i = 0;
  uint8_t code = frame[i++]; // eg. CMD_ADD_UPDATE_CONTACT
  memcpy(contact.id.pub_key, &frame[i], PUB_KEY_SIZE);
  i += PUB_KEY_SIZE;
  contact.type = frame[i++];
  contact.flags = frame[i++];
  contact.out_path_len = frame[i++];
  memcpy(contact.out_path, &frame[i], MAX_PATH_SIZE);
  i += MAX_PATH_SIZE;
  memcpy(contact.name, &frame[i], 32);
  i += 32;
  memcpy(&contact.last_advert_timestamp, &frame[i], 4);
  i += 4;
  if (len >= i + 8) { // optional fields
    memcpy(&contact.gps_lat, &frame[i], 4);
    i += 4;
    memcpy(&contact.gps_lon, &frame[i], 4);
    i += 4;
    if (len >= i + 4) {
      memcpy(&last_mod, &frame[i], 4);
    }
  }
}

bool MyMesh::Frame::isChannelMsg() const {
  return buf[0] == RESP_CODE_CHANNEL_MSG_RECV || buf[0] == RESP_CODE_CHANNEL_MSG_RECV_V3 ||
         buf[0] == RESP_CODE_CHANNEL_DATA_RECV;
}

void MyMesh::addToOfflineQueue(const uint8_t frame[], int len) {
  if (offline_queue_len >= OFFLINE_QUEUE_SIZE) {
    MESH_DEBUG_PRINTLN("WARN: offline_queue is full!");
    int pos = 0;
    while (pos < offline_queue_len) {
      if (offline_queue[pos].isChannelMsg()) {
        for (int i = pos; i < offline_queue_len - 1; i++) { // delete oldest channel msg from queue
          offline_queue[i] = offline_queue[i + 1];
        }
        MESH_DEBUG_PRINTLN("INFO: removed oldest channel message from queue.");
        offline_queue[offline_queue_len - 1].len = len;
        memcpy(offline_queue[offline_queue_len - 1].buf, frame, len);
        return;
      }
      pos++;
    }
    MESH_DEBUG_PRINTLN("INFO: no channel messages to remove from queue.");
  } else {
    offline_queue[offline_queue_len].len = len;
    memcpy(offline_queue[offline_queue_len].buf, frame, len);
    offline_queue_len++;
  }
}

int MyMesh::getFromOfflineQueue(uint8_t frame[]) {
  if (offline_queue_len > 0) {         // check offline queue
    size_t len = offline_queue[0].len; // take from top of queue
    memcpy(frame, offline_queue[0].buf, len);

    offline_queue_len--;
    for (int i = 0; i < offline_queue_len; i++) { // delete top item from queue
      offline_queue[i] = offline_queue[i + 1];
    }
    return len;
  }
  return 0; // queue is empty
}

float MyMesh::getAirtimeBudgetFactor() const {
  return _prefs.airtime_factor;
}

int MyMesh::getInterferenceThreshold() const {
  return _prefs.interference_threshold;
}
bool MyMesh::getCADEnabled() const {
  return _prefs.cad_enabled != 0;
}
int MyMesh::getAGCResetInterval() const {
  return ((int)_prefs.agc_reset_interval) * 4000;
}

int MyMesh::calcRxDelay(float score, uint32_t air_time) const {
  if (_prefs.rx_delay_base <= 0.0f) return 0;
  return (int)((pow(_prefs.rx_delay_base, 0.85f - score) - 1.0) * air_time);
}

uint32_t MyMesh::getRetransmitDelay(const mesh::Packet *packet) {
  uint32_t t = (
    _radio->getEstAirtimeFor(
      packet->getPathByteLen() + packet->payload_len + 2
    ) * _prefs.tx_delay_factor
  );
  return getRNG()->nextInt(0, 5*t + 1);
}
uint32_t MyMesh::getDirectRetransmitDelay(const mesh::Packet *packet) {
  uint32_t t = (
    _radio->getEstAirtimeFor(
      packet->getPathByteLen() + packet->payload_len + 2
    ) * _prefs.direct_tx_delay_factor
  );
  return getRNG()->nextInt(0, 5*t + 1);
}

uint8_t MyMesh::getExtraAckTransmitCount() const {
  return _prefs.multi_acks;
}

void MyMesh::logRxRaw(float snr, float rssi, const uint8_t raw[], int len) {
  if (_serial->isConnected() && len + 3 <= MAX_FRAME_SIZE) {
    int i = 0;
    out_frame[i++] = PUSH_CODE_LOG_RX_DATA;
    out_frame[i++] = (int8_t)(snr * 4);
    out_frame[i++] = (int8_t)(rssi);
    memcpy(&out_frame[i], raw, len);
    i += len;

    _serial->writeFrame(out_frame, i);
  }
}

bool MyMesh::isAutoAddEnabled() const {
  return (_prefs.manual_add_contacts & 1) == 0;
}

bool MyMesh::shouldAutoAddContactType(uint8_t contact_type) const {
  if ((_prefs.manual_add_contacts & 1) == 0) {
    return true;
  }

  uint8_t type_bit = 0;
  switch (contact_type) {
    case ADV_TYPE_CHAT:
      type_bit = AUTO_ADD_CHAT;
      break;
    case ADV_TYPE_REPEATER:
      type_bit = AUTO_ADD_REPEATER;
      break;
    case ADV_TYPE_ROOM:
      type_bit = AUTO_ADD_ROOM_SERVER;
      break;
    case ADV_TYPE_SENSOR:
      type_bit = AUTO_ADD_SENSOR;
      break;
    default:
      return false;  // Unknown type, don't auto-add
  }

  return (_prefs.autoadd_config & type_bit) != 0;
}

bool MyMesh::shouldOverwriteWhenFull() const {
  return (_prefs.autoadd_config & AUTO_ADD_OVERWRITE_OLDEST) != 0;
}

uint8_t MyMesh::getAutoAddMaxHops() const {
  return _prefs.autoadd_max_hops;
}

void MyMesh::onContactOverwrite(const uint8_t* pub_key) {
  _store->deleteBlobByKey(pub_key, PUB_KEY_SIZE); // delete from storage
  if (_serial->isConnected()) {
    out_frame[0] = PUSH_CODE_CONTACT_DELETED;
    memcpy(&out_frame[1], pub_key, PUB_KEY_SIZE);
    _serial->writeFrame(out_frame, 1 + PUB_KEY_SIZE);
  }
}

void MyMesh::onContactsFull() {
  if (_serial->isConnected()) {
    out_frame[0] = PUSH_CODE_CONTACTS_FULL;
    _serial->writeFrame(out_frame, 1);
  }
}

static bool hivefwIsSharedAdvert(const mesh::Packet* packet) {
  if (packet == NULL || !packet->hasTransportCodes()) {
    return false;
  }

  // MeshCore Share Contact sends a saved advert as transport-direct with
  // transport codes {0,0}. The official repeater explicitly excludes these
  // from its neighbour table because the RF transmitter is not the advert's
  // signed identity.
  return packet->transport_codes[0] == 0 &&
         packet->transport_codes[1] == 0;
}

void MyMesh::onAdvertRecv(mesh::Packet* packet, const mesh::Identity& id,
                           uint32_t timestamp, const uint8_t* app_data,
                           size_t app_data_len) {
  companion_advert_rx_count++;

  const bool shared_advert = hivefwIsSharedAdvert(packet);

  // Preserve normal Companion contact processing, but tell
  // onDiscoveredContact() not to treat a Share packet as a measured RF path.
  _processing_shared_advert = shared_advert;
  BaseChatMesh::onAdvertRecv(
    packet,
    id,
    timestamp,
    app_data,
    app_data_len
  );
  _processing_shared_advert = false;

  // Optional secondary RTC source: trusted Portuguese MeshCore Timekeeper.
  // APP/GPS are always primary. Once either has synchronized this boot, mesh
  // adverts no longer adjust the clock until the next boot.
  if (
    _prefs.mesh_time_sync &&
    packet != NULL &&
    !shared_advert
  ) {
    static const uint8_t PORTUGAL_TIMEKEEPER_ID[PUB_KEY_SIZE] = {
      0x01, 0xB2, 0xF5, 0xDA, 0x46, 0xBC, 0x0A, 0x9C,
      0x67, 0xFB, 0x8E, 0xDC, 0x36, 0x62, 0x57, 0xB6,
      0x04, 0x52, 0x73, 0xB8, 0x9F, 0x37, 0xF3, 0x08,
      0x04, 0x4A, 0xD5, 0x57, 0x17, 0x34, 0xD4, 0x62
    };

    const mesh::RTCClock::SyncSource current_source =
      getRTCClock()->getLastSyncSource();

    if (
      current_source != mesh::RTCClock::SyncSource::Companion &&
      current_source != mesh::RTCClock::SyncSource::GPS &&
      timestamp >= 1767225600UL &&
      packet->getPathHashCount() < 8 &&
      memcmp(id.pub_key, PORTUGAL_TIMEKEEPER_ID, PUB_KEY_SIZE) == 0
    ) {
      AdvertDataParser time_parser(app_data, app_data_len);

      if (
        time_parser.isValid() &&
        time_parser.getType() == ADV_TYPE_NONE &&
        (last_network_sync_time == 0 ||
         timestamp > last_network_sync_time)
      ) {
        const uint32_t now = getRTCClock()->getCurrentTime();
        const int64_t diff = (int64_t)timestamp - (int64_t)now;
        const bool initial =
          now < 1767225600UL ||
          current_source != mesh::RTCClock::SyncSource::Mesh;

        // First mesh sync is forward-only. Once Mesh is the active source,
        // maintenance corrections are constrained to +/-60 seconds.
        const bool apply =
          initial
            ? diff > 0
            : (diff >= -60 && diff <= 60);

        if (apply) {
          getRTCClock()->setCurrentTimeFromSource(
            timestamp,
            mesh::RTCClock::SyncSource::Mesh
          );
          last_network_sync_time = timestamp;

          // Smart Advert deadlines are based on RTC and must be recalculated.
          next_smart_advert = 0;

          MESH_DEBUG_PRINTLN(
            "HiveFW Mesh Time: %s sync applied (diff=%ld sec)",
            initial ? "initial" : "maintenance",
            (long)diff
          );
        } else {
          MESH_DEBUG_PRINTLN(
            "HiveFW Mesh Time: sync rejected (diff=%ld sec)",
            (long)diff
          );
        }
      }
    }
  }

  if (!_prefs.isRepeatEn()) {
    return;
  }

  // Same rule as the official simple_repeater:
  // zero path hashes + NOT a Share packet + Repeater advert.
  if (
    packet == NULL ||
    packet->getPathHashCount() != 0 ||
    shared_advert
  ) {
    return;
  }

  AdvertDataParser parser(app_data, app_data_len);
  if (!parser.isValid() || parser.getType() != ADV_TYPE_REPEATER) {
    return;
  }

  const uint32_t now = getRTCClock()->getCurrentTime();

  RepeaterNeighbour* neighbour = NULL;
  RepeaterNeighbour* oldest = &repeater_neighbours[0];
  uint32_t oldest_timestamp = 0xFFFFFFFFUL;

  for (int i = 0; i < MAX_REPEATER_NEIGHBOURS; i++) {
    if (id.matches(repeater_neighbours[i].id)) {
      neighbour = &repeater_neighbours[i];
      break;
    }

    if (repeater_neighbours[i].heard_timestamp < oldest_timestamp) {
      neighbour = &repeater_neighbours[i];
      oldest_timestamp = repeater_neighbours[i].heard_timestamp;
    }
  }

  if (neighbour == NULL) {
    neighbour = oldest;
  }

  neighbour->id = id;
  neighbour->advert_timestamp = timestamp;
  neighbour->heard_timestamp = now;
  neighbour->snr = (int8_t)(packet->getSNR() * 4);
  markRepeaterNeighboursDirty();
}

void MyMesh::onDiscoveredContact(ContactInfo &contact, bool is_new, uint8_t path_len, const uint8_t* path) {
  if (_serial->isConnected()) {
    if (is_new) {
      writeContactRespFrame(PUSH_CODE_NEW_ADVERT, contact);
    } else {
      out_frame[0] = PUSH_CODE_ADVERT;
      memcpy(&out_frame[1], contact.id.pub_key, PUB_KEY_SIZE);
      _serial->writeFrame(out_frame, 1 + PUB_KEY_SIZE);
    }
  } else {
#ifdef DISPLAY_CLASS
    if (_ui) _ui->notify(UIEventType::newContactMessage);
#endif
  }

  // Add inbound path to the normal Companion cache, except for Share Contact.
  // A shared advert is authenticated as the original node but physically
  // transmitted by somebody else, so using its zero-hop path as RF evidence
  // would create false neighbours (for example a remote 868 MHz node).
  if (
    !_processing_shared_advert &&
    path &&
    mesh::Packet::isValidPathLen(path_len)
  ) {
    AdvertPath* p = advert_paths;
    uint32_t oldest = 0xFFFFFFFF;
    for (int i = 0; i < ADVERT_PATH_TABLE_SIZE; i++) {   // check if already in table, otherwise evict oldest
      if (memcmp(advert_paths[i].pub_key, contact.id.pub_key, PUB_KEY_SIZE) == 0) {
        p = &advert_paths[i];   // found
        break;
      }
      if (advert_paths[i].recv_timestamp < oldest) {
        oldest = advert_paths[i].recv_timestamp;
        p = &advert_paths[i];
      }
    }

    memcpy(
      p->pubkey_prefix,
      contact.id.pub_key,
      sizeof(p->pubkey_prefix)
    );

    memcpy(
      p->pub_key,
      contact.id.pub_key,
      PUB_KEY_SIZE
    );

    p->node_type =
      contact.type;

    strcpy(
      p->name,
      contact.name
    );

    p->recv_timestamp =
      getRTCClock()->getCurrentTime();

    p->path_len =
      mesh::Packet::copyPath(
        p->path,
        path,
        path_len
      );
  }

  if (!is_new) dirty_contacts_expiry = futureMillis(LAZY_CONTACTS_WRITE_DELAY); // only schedule lazy write for contacts that are in contacts[]
}

static int sort_by_recent(const void *a, const void *b) {
  return ((AdvertPath *) b)->recv_timestamp - ((AdvertPath *) a)->recv_timestamp;
}


bool MyMesh::sendNodeDiscoveryReq() {

  // DISCOVER_REQ
  //
  // byte 0 = subtype 0x80
  // byte 1 = type filter
  // byte 2..5 = random tag
  // byte 6..9 = since timestamp

  uint8_t data[10];

  data[0] = CTL_TYPE_NODE_DISCOVER_REQ;

  // Procuramos Repeaters, Rooms e Companions.
  data[1] =
      (1 << ADV_TYPE_CHAT) |
      (1 << ADV_TYPE_REPEATER) |
      (1 << ADV_TYPE_ROOM);

  getRNG()->random(&data[2], 4);

  memcpy(
    &pending_discover_tag,
    &data[2],
    4
  );

  // janela de 60 segundos para respostas
  pending_discover_until =
    millis() + 60000UL;

  uint32_t since = 0;

  memcpy(
    &data[6],
    &since,
    4
  );

  mesh::Packet* pkt =
    createControlData(
      data,
      sizeof(data)
    );

  if (!pkt) {

    pending_discover_tag = 0;
    pending_discover_until = 0;

    return false;
  }

  // DISCOVER_REQ é enviado por zero-hop/flood.
  sendZeroHop(pkt);

  return true;
}

void MyMesh::clearNodeDiscoveryResults() {
  node_discovery_result_count = 0;
  pending_node_name_tag = 0;

  memset(
    node_discovery_results,
    0,
    sizeof(node_discovery_results)
  );
}

bool MyMesh::requestNodeDiscoveryName(int index) {

  if (index < 0 ||
      index >= node_discovery_result_count) {

    return false;
  }

  NodeDiscoveryResult& result =
    node_discovery_results[index];

  // ----------------------------------------------------------
  // O nó chegou através de DISCOVER, mas pode ainda não estar
  // presente na tabela de contactos.
  //
  // A resposta do ANON_REQ é um PAYLOAD_TYPE_RESPONSE cifrado
  // com a chave pública desse nó. Para que BaseChatMesh/Mesh
  // consiga desencriptá-la, precisamos de uma entrada temporária
  // na tabela de contactos.
  // ----------------------------------------------------------

  ContactInfo* recipient =
    lookupContactByPubKey(
      result.pub_key,
      PUB_KEY_SIZE
    );

  ContactInfo anon;

  if (recipient == NULL) {

    memset(&anon, 0, sizeof(anon));

    memcpy(
      anon.id.pub_key,
      result.pub_key,
      PUB_KEY_SIZE
    );

    anon.type = result.node_type;

    // Não temos path conhecido. O pedido será directo/zero-hop.
    anon.out_path_len = 0;

    anon.lastmod =
      getRTCClock()->getCurrentTime();

    if (!addContact(anon)) {

      MESH_DEBUG_PRINTLN(
        "Discovery name: unable to create temporary contact"
      );

      return false;
    }

    recipient =
      lookupContactByPubKey(
        result.pub_key,
        PUB_KEY_SIZE
      );

    if (recipient == NULL) {

      MESH_DEBUG_PRINTLN(
        "Discovery name: temporary contact lookup failed"
      );

      return false;
    }
  }

  // Garantir que o pedido é enviado directamente.
  recipient->out_path_len = 0;

  // ----------------------------------------------------------
  // ANON OWNER
  //
  // data[0] = ANON_REQ_TYPE_OWNER
  // data[1] = reply-path-len = 0
  // ----------------------------------------------------------

  uint8_t request_data[2];

  request_data[0] = ANON_REQ_TYPE_OWNER;
  request_data[1] = 0;

  uint32_t tag = 0;
  uint32_t est_timeout = 0;

  int send_result =
    sendAnonReq(
      *recipient,
      request_data,
      sizeof(request_data),
      tag,
      est_timeout
    );

  if (send_result == MSG_SEND_FAILED) {

    MESH_DEBUG_PRINTLN(
      "Discovery name: sendAnonReq failed"
    );

    return false;
  }

  pending_node_name_tag = tag;

  // Mostrar "A obter nome..." na linha do nome.
  strncpy(
    result.name,
    "A obter nome...",
    sizeof(result.name) - 1
  );

  result.name[
    sizeof(result.name) - 1
  ] = '\0';

  MESH_DEBUG_PRINTLN(
    "Discovery name request sent, tag=%lu",
    (unsigned long)tag
  );

#ifdef DISPLAY_CLASS
  if (_ui) {
    _ui->notify(UIEventType::newContactMessage);
  }
#endif

  return true;
}

int MyMesh::getNodeDiscoveryResults(
    NodeDiscoveryResult dest[],
    int max_num
) {

  if (dest == NULL || max_num <= 0) {
    return 0;
  }

  if (max_num > NODE_DISCOVERY_RESULTS_MAX) {
    max_num = NODE_DISCOVERY_RESULTS_MAX;
  }

  for (int i = 0;
       i < max_num && i < node_discovery_result_count;
       i++) {

    dest[i] = node_discovery_results[i];
  }

  return node_discovery_result_count < max_num
           ? node_discovery_result_count
           : max_num;
}

bool MyMesh::getAdvertNameByPrefix(
    const uint8_t prefix[7],
    char *dest,
    int dest_len
) {

  if (prefix == NULL ||
      dest == NULL ||
      dest_len <= 0) {

    return false;
  }

  dest[0] = '\0';

  for (int i = 0;
       i < ADVERT_PATH_TABLE_SIZE;
       i++) {

    if (memcmp(
          advert_paths[i].pubkey_prefix,
          prefix,
          7
        ) == 0) {

      if (advert_paths[i].name[0] != '\0') {

        strncpy(
          dest,
          advert_paths[i].name,
          dest_len - 1
        );

        dest[dest_len - 1] = '\0';
        return true;
      }
    }
  }

  return false;
}

int MyMesh::getRecentlyHeard(AdvertPath dest[], int max_num) {
  if (max_num > ADVERT_PATH_TABLE_SIZE) max_num = ADVERT_PATH_TABLE_SIZE;
  qsort(advert_paths, ADVERT_PATH_TABLE_SIZE, sizeof(advert_paths[0]), sort_by_recent);

  for (int i = 0; i < max_num; i++) {
    dest[i] = advert_paths[i];
  }
  return max_num;
}

void MyMesh::onContactPathUpdated(const ContactInfo &contact) {
  out_frame[0] = PUSH_CODE_PATH_UPDATED;
  memcpy(&out_frame[1], contact.id.pub_key, PUB_KEY_SIZE);
  _serial->writeFrame(out_frame, 1 + PUB_KEY_SIZE); // NOTE: app may not be connected

  dirty_contacts_expiry = futureMillis(LAZY_CONTACTS_WRITE_DELAY);
}

ContactInfo*  MyMesh::processAck(const uint8_t *data) {
  // see if matches any in a table
  for (int i = 0; i < EXPECTED_ACK_TABLE_SIZE; i++) {
    if (memcmp(data, &expected_ack_table[i].ack, 4) == 0) { // got an ACK from recipient
      out_frame[0] = PUSH_CODE_SEND_CONFIRMED;
      memcpy(&out_frame[1], data, 4);
      uint32_t trip_time = _ms->getMillis() - expected_ack_table[i].msg_sent;
      memcpy(&out_frame[5], &trip_time, 4);
      _serial->writeFrame(out_frame, 9);

      // NOTE: the same ACK can be received multiple times!
      expected_ack_table[i].ack = 0; // clear expected hash, now that we have received ACK
      return expected_ack_table[i].contact;
    }
  }
  return checkConnectionsAck(data);
}

void MyMesh::queueMessage(const ContactInfo &from, uint8_t txt_type, mesh::Packet *pkt,
                          uint32_t sender_timestamp, const uint8_t *extra, int extra_len, const char *text) {
  int i = 0;
  if (app_target_ver >= 3) {
    out_frame[i++] = RESP_CODE_CONTACT_MSG_RECV_V3;
    out_frame[i++] = (int8_t)(pkt->getSNR() * 4);
    out_frame[i++] = 0; // reserved1
    out_frame[i++] = 0; // reserved2
  } else {
    out_frame[i++] = RESP_CODE_CONTACT_MSG_RECV;
  }
  memcpy(&out_frame[i], from.id.pub_key, 6);
  i += 6; // just 6-byte prefix
  uint8_t path_len = out_frame[i++] = pkt->isRouteFlood() ? pkt->path_len : 0xFF;
  out_frame[i++] = txt_type;
  memcpy(&out_frame[i], &sender_timestamp, 4);
  i += 4;
  if (extra_len > 0) {
    memcpy(&out_frame[i], extra, extra_len);
    i += extra_len;
  }
  int tlen = strlen(text); // TODO: UTF-8 ??
  if (i + tlen > MAX_FRAME_SIZE) {
    tlen = MAX_FRAME_SIZE - i;
  }
  memcpy(&out_frame[i], text, tlen);
  i += tlen;
  addToOfflineQueue(out_frame, i);

  if (_serial->isConnected()) {
    uint8_t frame[1];
    frame[0] = PUSH_CODE_MSG_WAITING; // send push 'tickle'
    _serial->writeFrame(frame, 1);
  }

#ifdef DISPLAY_CLASS
  // we only want to show text messages on display, not cli data
  bool should_display = txt_type == TXT_TYPE_PLAIN || txt_type == TXT_TYPE_SIGNED_PLAIN;
  if (should_display && _ui) {
    _ui->newMsg(path_len, NULL, from.name, text, offline_queue_len);
    if (!_serial->isConnected()) {
      _ui->notify(UIEventType::contactMessage);
    }
  }
#endif
}

// ========================================================================
// HiveFW V1.09beta — MeshCore RegionMap / Flood Scopes
//
// A classificação abaixo é portada do simple_repeater oficial.
//
// DIFERENÇA INTENCIONAL:
// O HiveFW continua a ser Companion primeiro.
// Uma região bloqueada impede a REPETIÇÃO do pacote, mas não impede
// que BaseChatMesh processe o pacote localmente.
// ========================================================================

mesh::DispatcherAction MyMesh::onRecvPacket(
  mesh::Packet* packet
) {

  recv_pkt_region = NULL;


  // TRANSPORT_FLOOD:
  // procurar uma Region permitida cuja TransportKey corresponda
  // ao transport code do pacote.
  if (
    packet->getRouteType() ==
      ROUTE_TYPE_TRANSPORT_FLOOD
  ) {

    recv_pkt_region =
      region_map.findMatch(
        packet,
        REGION_DENY_FLOOD
      );
  }


  // FLOOD clássico / sem scope:
  // o wildcard "*" controla se é permitido repetir.
  else if (
    packet->getRouteType() ==
      ROUTE_TYPE_FLOOD
  ) {

    if (
      region_map.getWildcard().flags &
        REGION_DENY_FLOOD
    ) {

      recv_pkt_region = NULL;

    } else {

      recv_pkt_region =
        &region_map.getWildcard();
    }
  }


  // IMPORTANTE:
  // continuar sempre pelo Companion.
  //
  // A decisão de retransmitir é feita exclusivamente em
  // allowPacketForward().
  return BaseChatMesh::onRecvPacket(
    packet
  );
}


bool MyMesh::filterRecvFloodPacket(
  mesh::Packet* packet
) {

  // Não filtrar a receção local.
  //
  // No HiveFW, ALLOW/DENY é política do lado Repeater,
  // não do lado Companion.
  (void)packet;

  return false;
}


// MeshCore simple_repeater loop thresholds.
// Index is the path-hash size in bytes (1..3).
static const uint8_t HIVEFW_LOOP_MAX_MINIMAL[]  = { 0, 4, 2, 1 };
static const uint8_t HIVEFW_LOOP_MAX_MODERATE[] = { 0, 2, 1, 1 };
static const uint8_t HIVEFW_LOOP_MAX_STRICT[]   = { 0, 1, 1, 1 };

bool MyMesh::isRepeaterLooped(
  const mesh::Packet* packet,
  const uint8_t max_counters[]
) {
  const uint8_t hash_size = packet->getPathHashSize();
  uint8_t hash_count = packet->getPathHashCount();

  if (hash_size == 0 || hash_size > 3) {
    return false;
  }

  uint8_t own_hash_count = 0;
  const uint8_t* path = packet->path;

  while (hash_count > 0) {
    if (self_id.isHashMatch(path, hash_size)) {
      own_hash_count++;
    }

    hash_count--;
    path += hash_size;
  }

  return own_hash_count >= max_counters[hash_size];
}


void MyMesh::noteObservedForwardedChannel(
  const mesh::Packet* packet
) {
  if (
    packet == NULL ||
    packet->getPayloadType() != PAYLOAD_TYPE_GRP_TXT ||
    packet->payload_len <= 1 + CIPHER_MAC_SIZE
  ) {
    return;
  }

  const uint8_t channel_hash = packet->payload[0];
  const uint8_t* mac_and_data = &packet->payload[1];
  const uint16_t sample_len = packet->payload_len - 1;

  // Hashes are only one byte, so a configured channel with the same hash is
  // not sufficient proof that the packet is known. Try the matching keys and
  // suppress observation only when the packet MAC actually validates.
  mesh::GroupChannel matches[4];
  const int num_matches = searchChannelsByHash(&channel_hash, matches, 4);
  for (int i = 0; i < num_matches; i++) {
    uint8_t decoded[MAX_PACKET_PAYLOAD];
    if (
      mesh::Utils::MACThenDecrypt(
        matches[i].secret,
        decoded,
        mac_and_data,
        sample_len
      ) > 0
    ) {
      return;
    }
  }

  const uint32_t now = getRTCClock()->getCurrentTime();
  if (now == 0) {
    return;
  }

  int free_slot = -1;
  int oldest_slot = -1;
  uint32_t oldest_timestamp = 0xFFFFFFFFUL;

  for (int i = 0; i < MAX_OBSERVED_CHANNELS; i++) {
    ObservedChannel& observed = observed_channels[i];

    if (observed.heard_timestamp > 0 && observed.hash == channel_hash) {
      observed.heard_timestamp = now;
      if (observed.message_count < 0xFFFF) observed.message_count++;
      observed.sample_len = sample_len;
      memcpy(observed.sample, mac_and_data, sample_len);
      return;
    }

    if (observed.heard_timestamp == 0 && free_slot < 0) free_slot = i;
    if (
      observed.heard_timestamp > 0 &&
      observed.heard_timestamp < oldest_timestamp
    ) {
      oldest_timestamp = observed.heard_timestamp;
      oldest_slot = i;
    }
  }

  const int slot = free_slot >= 0 ? free_slot : oldest_slot;
  if (slot < 0) return;

  observed_channels[slot].hash = channel_hash;
  observed_channels[slot].heard_timestamp = now;
  observed_channels[slot].message_count = 1;
  observed_channels[slot].sample_len = sample_len;
  memcpy(observed_channels[slot].sample, mac_and_data, sample_len);
}

bool MyMesh::allowPacketForward(
  const mesh::Packet* packet
) {

  // Companion sem modo Repeater:
  // nunca retransmitir como repetidor.
  if (!_prefs.isRepeatEn()) {
    return false;
  }


  // Official simple_repeater flood hop limits. These protections are
  // independent from RegionMap, so they also apply to legacy/no-region mode.
  if (
    packet->isRouteFlood() &&
    mesh::isFloodHopLimitExceeded(
      packet,
      _prefs.getFloodMax(),
      _prefs.getFloodMaxUnscoped(),
      _prefs.getFloodMaxAdvert()
    )
  ) {
    MESH_DEBUG_PRINTLN(
      "HiveFW Repeater: flood hop limit exceeded"
    );
    return false;
  }


  // Official simple_repeater loop detection. This counts how many times our
  // own identity hash already occurs in the incoming flood path.
  if (
    packet->isRouteFlood() &&
    _prefs.getLoopDetect() != LOOP_DETECT_OFF
  ) {
    const uint8_t* maximums = HIVEFW_LOOP_MAX_STRICT;

    if (_prefs.getLoopDetect() == LOOP_DETECT_MINIMAL) {
      maximums = HIVEFW_LOOP_MAX_MINIMAL;
    } else if (_prefs.getLoopDetect() == LOOP_DETECT_MODERATE) {
      maximums = HIVEFW_LOOP_MAX_MODERATE;
    }

    if (isRepeaterLooped(packet, maximums)) {
      MESH_DEBUG_PRINTLN(
        "HiveFW Repeater: flood loop detected"
      );
      return false;
    }
  }


  // Compatibilidade V1.08 -> V1.09:
  //
  // enquanto ainda não existir uma configuração RegionMap
  // explícita, preservar o comportamento anterior para Regions. Flood limits
  // e Loop Detect acima continuam ativos.
  if (!region_policy_configured) {
    noteObservedForwardedChannel(packet);
    return true;
  }


  // Mesmo comportamento regional do Repeater oficial:
  //
  // - TRANSPORT_FLOOD desconhecido/bloqueado -> não repetir
  // - FLOOD sem scope com wildcard DENY -> não repetir
  if (
    packet->isRouteFlood() &&
    recv_pkt_region == NULL
  ) {

    MESH_DEBUG_PRINTLN(
      "HiveFW RegionMap: flood denied/unknown"
    );

    return false;
  }


  noteObservedForwardedChannel(packet);
  return true;
}

void MyMesh::sendFloodScoped(const TransportKey& scope, mesh::Packet* pkt, uint32_t delay_millis) {
  if (scope.isNull()) {
    sendFlood(pkt, delay_millis, _prefs.path_hash_mode + 1);
  } else {
    uint16_t codes[2];
    codes[0] = scope.calcTransportCode(pkt);
    codes[1] = 0;  // REVISIT: set to 'home' Region, for sender/return region?
    sendFlood(pkt, codes, delay_millis, _prefs.path_hash_mode + 1);
  }
}

void MyMesh::sendFloodScoped(const ContactInfo& recipient, mesh::Packet* pkt, uint32_t delay_millis) {
  // TODO: dynamic send_scope, depending on recipient and current 'home' Region
  if (send_unscoped) {
    sendFlood(pkt, delay_millis, _prefs.path_hash_mode + 1);  // app has explicitly requested un-scoped
  } else {
    TransportKey default_scope;
    memcpy(&default_scope.key, _prefs.default_scope_key, sizeof(default_scope.key));

    auto scope = send_scope.isNull() ? &default_scope : &send_scope;
    sendFloodScoped(*scope, pkt, delay_millis);
  }
}
void MyMesh::sendFloodScoped(const mesh::GroupChannel& channel, mesh::Packet* pkt, uint32_t delay_millis) {
  // TODO: have per-channel send_scope
  if (send_unscoped) {
    sendFlood(pkt, delay_millis, _prefs.path_hash_mode + 1);  // app has explicitly requested un-scoped
  } else {
    TransportKey default_scope;
    memcpy(&default_scope.key, _prefs.default_scope_key, sizeof(default_scope.key));

    auto scope = send_scope.isNull() ? &default_scope : &send_scope;
    sendFloodScoped(*scope, pkt, delay_millis);
  }
}

static bool isHiveFWRepeaterAdminCommand(const char* text) {
  if (text == NULL) return false;

  while (*text == ' ' || *text == '\t') text++;
  if (*text == '\0') return false;

  // MeshCore clients can prefix remote CLI commands with a two-character
  // correlation token plus '|', e.g. "0A|get radio". The command handler
  // already reflects this prefix in its response; strip it only for routing.
  if (strlen(text) > 3 && text[2] == '|') {
    text += 3;
    while (*text == ' ' || *text == '\t') text++;
  }

  // Keep normal Companion chat available even for identities that are also in
  // the Repeater ACL. Only strings in the official Repeater CLI namespace are
  // consumed by the admin adapter.
  static const char* exact[] = {
    "ver",
    "board",
    "clock",
    "clock sync",
    "neighbors",
    "advert",
    "advert.zerohop",
    "clear stats",
    "reboot",
    "region",
    "region load",
    "region save",
    "region home",
    "region default"
  };

  for (const char* command : exact) {
    if (strcmp(text, command) == 0) return true;
  }

  static const char* prefixes[] = {
    "get ",
    "set ",
    "time ",
    "password ",
    "setperm ",
    "neighbor.remove ",
    "region def ",
    "region get ",
    "region list ",
    "region put ",
    "region remove ",
    "region home ",
    "region default ",
    "region allowf ",
    "region denyf "
  };

  for (const char* prefix : prefixes) {
    if (strncmp(text, prefix, strlen(prefix)) == 0) return true;
  }

  return false;
}


bool MyMesh::handleRepeaterRemoteCommand(
  uint32_t sender_timestamp,
  char* command,
  char* reply,
  size_t reply_size
) {
  if (
    command == NULL ||
    reply == NULL ||
    reply_size == 0
  ) {
    return false;
  }

  reply[0] = '\0';

  while (*command == ' ' || *command == '\t') {
    command++;
  }

  // Match simple_repeater exactly: Companion clients may prepend a
  // two-character correlation token plus '|'. Reflect it in the reply so the
  // app can associate asynchronous CLI responses with the originating field.
  if (strlen(command) > 4 && command[2] == '|') {
    if (reply_size <= 3) {
      return false;
    }
    memcpy(reply, command, 3);
    reply += 3;
    reply_size -= 3;
    command += 3;

    while (*command == ' ' || *command == '\t') {
      command++;
    }
  }

  size_t command_len = strlen(command);
  while (
    command_len > 0 &&
    (
      command[command_len - 1] == ' ' ||
      command[command_len - 1] == '\t'
    )
  ) {
    command[--command_len] = '\0';
  }

  if (command_len == 0) {
    snprintf(reply, reply_size, "Err - empty command");
    return true;
  }

  auto save_ok = [&]() {
    savePrefs();
    snprintf(reply, reply_size, "OK");
  };

  if (strcmp(command, "ver") == 0) {
    snprintf(
      reply,
      reply_size,
      "%s (Build: %s)",
      FIRMWARE_VERSION,
      FIRMWARE_BUILD_DATE
    );
    return true;
  }

  if (strcmp(command, "board") == 0) {
    snprintf(reply, reply_size, "HiveFW");
    return true;
  }

  if (strcmp(command, "get name") == 0) {
    snprintf(reply, reply_size, "> %s", _prefs.node_name);
    return true;
  }

  if (strcmp(command, "get radio") == 0) {
    snprintf(
      reply,
      reply_size,
      "> %.3f,%.3f,%u,%u",
      _prefs.freq,
      _prefs.bw,
      (unsigned)_prefs.sf,
      (unsigned)_prefs.cr
    );
    return true;
  }

  if (strcmp(command, "get freq") == 0) {
    snprintf(reply, reply_size, "> %.3f", _prefs.freq);
    return true;
  }

  // Compatibility aliases for mobile Repeater management. HiveFW stores
  // these in Companion NodePrefs, but expose the same logical fields a
  // SimpleRepeater UI expects.
  if (strcmp(command, "get bw") == 0) {
    snprintf(reply, reply_size, "> %.3f", _prefs.bw);
    return true;
  }

  if (strcmp(command, "get sf") == 0) {
    snprintf(reply, reply_size, "> %u", (unsigned)_prefs.sf);
    return true;
  }

  if (strcmp(command, "get cr") == 0) {
    snprintf(reply, reply_size, "> %u", (unsigned)_prefs.cr);
    return true;
  }

  if (strcmp(command, "get tx") == 0) {
    snprintf(reply, reply_size, "> %d", (int)_prefs.tx_power_dbm);
    return true;
  }

  if (strcmp(command, "get af") == 0) {
    snprintf(reply, reply_size, "> %.3f", _prefs.airtime_factor);
    return true;
  }

  if (strcmp(command, "get dutycycle") == 0) {
    const float pct =
      100.0f / (_prefs.airtime_factor + 1.0f);

    snprintf(reply, reply_size, "> %.1f%%", pct);
    return true;
  }

  if (strcmp(command, "get lat") == 0) {
    snprintf(reply, reply_size, "> %.6f", _prefs.node_lat);
    return true;
  }

  if (strcmp(command, "get lon") == 0) {
    snprintf(reply, reply_size, "> %.6f", _prefs.node_lon);
    return true;
  }

  if (strcmp(command, "get repeat") == 0) {
    snprintf(
      reply,
      reply_size,
      "> %s",
      _prefs.isRepeatEn() ? "on" : "off"
    );
    return true;
  }

  if (strcmp(command, "get rxdelay") == 0) {
    snprintf(reply, reply_size, "> %.3f", _prefs.rx_delay_base);
    return true;
  }

  if (strcmp(command, "get txdelay") == 0) {
    snprintf(reply, reply_size, "> %.3f", _prefs.tx_delay_factor);
    return true;
  }

  if (strcmp(command, "get direct.txdelay") == 0) {
    snprintf(reply, reply_size, "> %.3f", _prefs.direct_tx_delay_factor);
    return true;
  }

  if (strcmp(command, "get flood.max") == 0) {
    snprintf(reply, reply_size, "> %u", (unsigned)_prefs.getFloodMax());
    return true;
  }

  if (strcmp(command, "get flood.max.unscoped") == 0) {
    snprintf(
      reply,
      reply_size,
      "> %u",
      (unsigned)_prefs.getFloodMaxUnscoped()
    );
    return true;
  }

  if (strcmp(command, "get flood.max.advert") == 0) {
    snprintf(
      reply,
      reply_size,
      "> %u",
      (unsigned)_prefs.getFloodMaxAdvert()
    );
    return true;
  }

  if (strcmp(command, "get int.thresh") == 0) {
    snprintf(
      reply,
      reply_size,
      "> %u",
      (unsigned)_prefs.interference_threshold
    );
    return true;
  }

  if (strcmp(command, "get agc.reset.interval") == 0) {
    snprintf(
      reply,
      reply_size,
      "> %u",
      (unsigned)_prefs.agc_reset_interval * 4U
    );
    return true;
  }

  if (strcmp(command, "get multi.acks") == 0) {
    snprintf(reply, reply_size, "> %u", (unsigned)_prefs.multi_acks);
    return true;
  }

  if (strcmp(command, "get allow.read.only") == 0) {
    snprintf(
      reply,
      reply_size,
      "> %s",
      _prefs.isAllowReadOnlyEn() ? "on" : "off"
    );
    return true;
  }

  if (strcmp(command, "get public.key") == 0) {
    char hex[PUB_KEY_SIZE * 2 + 1];
    mesh::Utils::toHex(hex, self_id.pub_key, PUB_KEY_SIZE);
    snprintf(reply, reply_size, "> %s", hex);
    return true;
  }

  if (strcmp(command, "get role") == 0) {
    snprintf(reply, reply_size, "> repeater");
    return true;
  }

  if (strcmp(command, "get guest.password") == 0) {
    snprintf(
      reply,
      reply_size,
      "> %s",
      _prefs.getRepeaterGuestPassword()
    );
    return true;
  }

  if (strcmp(command, "get owner.info") == 0) {
    size_t out = 0;
    if (reply_size > 2) {
      reply[out++] = '>';
      reply[out++] = ' ';
    }
    for (
      const char* sp = _prefs.owner_info;
      *sp && out + 1 < reply_size;
      sp++
    ) {
      reply[out++] = *sp == '\n' ? '|' : *sp;
    }
    reply[out] = '\0';
    return true;
  }

  if (strcmp(command, "get path.hash.mode") == 0) {
    snprintf(reply, reply_size, "> %u", (unsigned)_prefs.path_hash_mode);
    return true;
  }

  if (strcmp(command, "get loop.detect") == 0) {
    static const char* names[] = {
      "off",
      "minimal",
      "moderate",
      "strict"
    };

    const uint8_t mode =
      constrain(_prefs.getLoopDetect(), 0, 3);

    snprintf(reply, reply_size, "> %s", names[mode]);
    return true;
  }

  if (strcmp(command, "get radio.rxgain") == 0) {
    snprintf(
      reply,
      reply_size,
      "> %s",
      _prefs.rx_boosted_gain ? "on" : "off"
    );
    return true;
  }

  if (strcmp(command, "get cad") == 0) {
    snprintf(
      reply,
      reply_size,
      "> %s",
      _prefs.cad_enabled ? "on" : "off"
    );
    return true;
  }

  // HiveFW has no periodic zero-hop advert scheduler. Keep the official
  // Repeater setting visible as disabled instead of inventing a second timer.
  if (strcmp(command, "get advert.interval") == 0) {
    snprintf(reply, reply_size, "> 0");
    return true;
  }

  // Compatibility view only: Smart Advert remains the HiveFW scheduler.
  // The official app sees 24 h when Auto Advert is enabled and 0 when off.
  if (strcmp(command, "get flood.advert.interval") == 0) {
    snprintf(
      reply,
      reply_size,
      "> %u",
      _prefs.isAutoAdvertEn() ? 24U : 0U
    );
    return true;
  }

  if (strcmp(command, "get adc.multiplier") == 0) {
    snprintf(reply, reply_size, "> %.3f", _prefs.adc_multiplier);
    return true;
  }

  if (strcmp(command, "get radio.fem.rxgain") == 0) {
    snprintf(
      reply,
      reply_size,
      "> %s",
      _prefs.radio_fem_rxgain ? "on" : "off"
    );
    return true;
  }

  if (strcmp(command, "get radio.fem.txgain") == 0) {
    snprintf(
      reply,
      reply_size,
      "> %s",
      _prefs.radio_fem_txgain ? "on" : "off"
    );
    return true;
  }

  if (strncmp(command, "set name ", 9) == 0) {
    const char* value = command + 9;

    if (*value == '\0') {
      snprintf(reply, reply_size, "Err - empty name");
      return true;
    }

    StrHelper::strncpy(
      _prefs.node_name,
      value,
      sizeof(_prefs.node_name)
    );
    savePrefs();
    snprintf(reply, reply_size, "OK - name changed");
    return true;
  }

  if (strncmp(command, "set af ", 7) == 0) {
    const float value = atof(command + 7);

    if (value < 0.0f || value > 9.0f) {
      snprintf(reply, reply_size, "Err - invalid airtime factor");
      return true;
    }

    _prefs.airtime_factor = value;
    savePrefs();
    snprintf(reply, reply_size, "OK - airtime factor set");
    return true;
  }

  if (strncmp(command, "set dutycycle ", 14) == 0) {
    const float pct = atof(command + 14);

    if (pct < 1.0f || pct > 100.0f) {
      snprintf(reply, reply_size, "Err - invalid duty cycle");
      return true;
    }

    _prefs.airtime_factor =
      (100.0f / pct) - 1.0f;

    savePrefs();
    snprintf(reply, reply_size, "OK - %.1f%%", pct);
    return true;
  }

  if (strncmp(command, "set cad ", 8) == 0) {
    const char* value = command + 8;
    if (strcmp(value, "on") != 0 && strcmp(value, "off") != 0) {
      snprintf(reply, reply_size, "Err - use on or off");
      return true;
    }

    _prefs.cad_enabled = strcmp(value, "on") == 0 ? 1 : 0;
    save_ok();
    return true;
  }

  if (strncmp(command, "set advert.interval ", 20) == 0) {
    const int minutes = atoi(command + 20);

    // HiveFW deliberately has no periodic zero-hop advert timer. Accepting
    // only 0 keeps the official app in sync without creating a second advert
    // scheduler beside Smart Advert.
    if (minutes != 0) {
      snprintf(
        reply,
        reply_size,
        "Error: HiveFW zero-hop auto advert is disabled"
      );
      return true;
    }

    snprintf(reply, reply_size, "OK");
    return true;
  }

  if (strncmp(command, "set flood.advert.interval ", 26) == 0) {
    const int hours = atoi(command + 26);

    if (hours == 0) {
      setAutoAdvertEnabled(false);
      snprintf(reply, reply_size, "OK");
      return true;
    }

    if (hours == 24) {
      setAutoAdvertEnabled(true);
      snprintf(reply, reply_size, "OK");
      return true;
    }

    snprintf(
      reply,
      reply_size,
      "Error: HiveFW Smart Advert uses fixed 24h scheduling"
    );
    return true;
  }

  if (strncmp(command, "set adc.multiplier ", 19) == 0) {
    const float value = atof(command + 19);

    if (value < 0.0f || value > 10.0f) {
      snprintf(reply, reply_size, "Err - invalid ADC multiplier");
      return true;
    }

    if (!board.setAdcMultiplier(value)) {
      snprintf(reply, reply_size, "Error: unsupported");
      return true;
    }

    _prefs.adc_multiplier = value;
    save_ok();
    return true;
  }

  if (strncmp(command, "set radio.fem.rxgain ", 21) == 0) {
    const char* value = command + 21;
    if (strcmp(value, "on") != 0 && strcmp(value, "off") != 0) {
      snprintf(reply, reply_size, "Err - use on or off");
      return true;
    }

    const bool enabled = strcmp(value, "on") == 0;
    if (!board.setLoRaFemLnaEnabled(enabled)) {
      snprintf(reply, reply_size, "Error: unsupported");
      return true;
    }

    _prefs.radio_fem_rxgain = enabled ? 1 : 0;
    save_ok();
    return true;
  }

  if (strncmp(command, "set radio.fem.txgain ", 21) == 0) {
    const char* value = command + 21;
    if (strcmp(value, "on") != 0 && strcmp(value, "off") != 0) {
      snprintf(reply, reply_size, "Err - use on or off");
      return true;
    }

    const bool enabled = strcmp(value, "on") == 0;
    if (!board.setLoRaFemPaGainEnabled(enabled)) {
      snprintf(reply, reply_size, "Error: unsupported");
      return true;
    }

    _prefs.radio_fem_txgain = enabled ? 1 : 0;
    save_ok();
    return true;
  }

  if (strcmp(command, "get advert.interval") == 0) {
    snprintf(
      reply,
      reply_size,
      "> %u",
      (unsigned)_prefs.getNeighborAdvertIntervalMinutes()
    );
    return true;
  }

  if (strncmp(command, "set advert.interval ", 20) == 0) {
    char* endp = nullptr;
    long minutes = strtol(command + 20, &endp, 10);

    if (
      endp == command + 20 ||
      *endp != '\0' ||
      !(
        minutes == 0 ||
        (
          minutes >= 60 &&
          minutes <= 240 &&
          (minutes % 2) == 0
        )
      )
    ) {
      snprintf(reply, reply_size, "Error: interval range is 60-240 minutes, step 2, or 0");
      return true;
    }

    _prefs.setNeighborAdvertIntervalMinutes((uint16_t)minutes);
    next_neighbor_advert = 0;
    savePrefs();
    snprintf(reply, reply_size, "OK");
    return true;
  }

  if (strncmp(command, "set repeat ", 11) == 0) {
    const char* value = command + 11;

    if (
      strcmp(value, "on") != 0 &&
      strcmp(value, "off") != 0
    ) {
      snprintf(reply, reply_size, "Err - use on or off");
      return true;
    }

    _prefs.setRepeatEn(strcmp(value, "on") == 0);
    // Re-arm the direct neighbour advert cadence from the moment Repeater
    // mode changes. OFF disables it immediately; ON schedules a fresh
    // zero-hop advert in two minutes, matching SimpleRepeater.
    next_neighbor_advert = 0;
    savePrefs();
    snprintf(
      reply,
      reply_size,
      "OK - forwarding %s",
      _prefs.isRepeatEn() ? "enabled" : "disabled"
    );
    return true;
  }

  if (strncmp(command, "set radio ", 10) == 0) {
    float freq = 0;
    float bw = 0;
    unsigned sf = 0;
    unsigned cr = 0;

    if (
      sscanf(
        command + 10,
        "%f,%f,%u,%u",
        &freq,
        &bw,
        &sf,
        &cr
      ) != 4 ||
      freq < 150.0f ||
      freq > 2500.0f ||
      bw < 7.8f ||
      bw > 500.0f ||
      sf < 5 ||
      sf > 12 ||
      cr < 5 ||
      cr > 8
    ) {
      snprintf(reply, reply_size, "Err - invalid radio params");
      return true;
    }

    _prefs.freq = freq;
    _prefs.bw = bw;
    _prefs.sf = (uint8_t)sf;
    _prefs.cr = (uint8_t)cr;
    savePrefs();

    snprintf(reply, reply_size, "OK - reboot to apply");
    return true;
  }

  if (strncmp(command, "set freq ", 9) == 0) {
    const float value = atof(command + 9);

    if (
      value < 150.0f ||
      value > 2500.0f
    ) {
      snprintf(reply, reply_size, "Err - invalid Repeater frequency");
      return true;
    }

    _prefs.freq = value;
    savePrefs();
    snprintf(reply, reply_size, "OK - reboot to apply");
    return true;
  }

  if (strncmp(command, "set bw ", 7) == 0) {
    const float value = atof(command + 7);
    if (value < 7.8f || value > 500.0f) {
      snprintf(reply, reply_size, "Err - invalid bandwidth");
      return true;
    }
    _prefs.bw = value;
    savePrefs();
    snprintf(reply, reply_size, "OK - reboot to apply");
    return true;
  }

  if (strncmp(command, "set sf ", 7) == 0) {
    const int value = atoi(command + 7);
    if (value < 5 || value > 12) {
      snprintf(reply, reply_size, "Err - invalid spreading factor");
      return true;
    }
    _prefs.sf = (uint8_t)value;
    savePrefs();
    snprintf(reply, reply_size, "OK - reboot to apply");
    return true;
  }

  if (strncmp(command, "set cr ", 7) == 0) {
    const int value = atoi(command + 7);
    if (value < 5 || value > 8) {
      snprintf(reply, reply_size, "Err - invalid coding rate");
      return true;
    }
    _prefs.cr = (uint8_t)value;
    savePrefs();
    snprintf(reply, reply_size, "OK - reboot to apply");
    return true;
  }

  if (strncmp(command, "set lat ", 8) == 0) {
    const double value = atof(command + 8);

    if (value < -90.0 || value > 90.0) {
      snprintf(reply, reply_size, "Err - invalid latitude");
      return true;
    }

    _prefs.node_lat = value;
    sensors.node_lat = value;
    save_ok();
    return true;
  }

  if (strncmp(command, "set lon ", 8) == 0) {
    const double value = atof(command + 8);

    if (value < -180.0 || value > 180.0) {
      snprintf(reply, reply_size, "Err - invalid longitude");
      return true;
    }

    _prefs.node_lon = value;
    sensors.node_lon = value;
    save_ok();
    return true;
  }

  if (strncmp(command, "set tx ", 7) == 0) {
    const int value = atoi(command + 7);

    if (value < -9 || value > MAX_LORA_TX_POWER) {
      snprintf(reply, reply_size, "Err - invalid TX power");
      return true;
    }

    _prefs.tx_power_dbm = (int8_t)value;
    radio_driver.setTxPower(_prefs.tx_power_dbm);
    savePrefs();
    snprintf(reply, reply_size, "OK - TX power set");
    return true;
  }

  if (strncmp(command, "set rxdelay ", 12) == 0) {
    const float value = atof(command + 12);

    if (value < 0.0f || value > 20.0f) {
      snprintf(reply, reply_size, "Err - invalid RX delay");
      return true;
    }

    _prefs.rx_delay_base = value;
    save_ok();
    return true;
  }

  if (strncmp(command, "set txdelay ", 12) == 0) {
    const float value = atof(command + 12);

    if (value < 0.0f || value > 2.0f) {
      snprintf(reply, reply_size, "Err - invalid TX delay");
      return true;
    }

    _prefs.tx_delay_factor = value;
    save_ok();
    return true;
  }

  if (strncmp(command, "set direct.txdelay ", 19) == 0) {
    const float value = atof(command + 19);

    if (value < 0.0f || value > 2.0f) {
      snprintf(reply, reply_size, "Err - invalid direct TX delay");
      return true;
    }

    _prefs.direct_tx_delay_factor = value;
    save_ok();
    return true;
  }

  if (strncmp(command, "set flood.max.unscoped ", 23) == 0) {
    const int value = atoi(command + 23);

    if (value < 0 || value > 64) {
      snprintf(reply, reply_size, "Err - invalid flood max");
      return true;
    }

    _prefs.setFloodMaxUnscoped((uint8_t)value);
    save_ok();
    return true;
  }

  if (strncmp(command, "set flood.max.advert ", 21) == 0) {
    const int value = atoi(command + 21);

    if (value < 0 || value > 64) {
      snprintf(reply, reply_size, "Err - invalid flood max");
      return true;
    }

    _prefs.setFloodMaxAdvert((uint8_t)value);
    save_ok();
    return true;
  }

  if (strncmp(command, "set flood.max ", 14) == 0) {
    const int value = atoi(command + 14);

    if (value < 0 || value > 64) {
      snprintf(reply, reply_size, "Err - invalid flood max");
      return true;
    }

    _prefs.setFloodMax((uint8_t)value);
    save_ok();
    return true;
  }

  if (strncmp(command, "set int.thresh ", 15) == 0) {
    const int value = atoi(command + 15);

    if (value < 0 || value > 255) {
      snprintf(reply, reply_size, "Err - invalid threshold");
      return true;
    }

    _prefs.interference_threshold = (uint8_t)value;
    save_ok();
    return true;
  }

  if (strncmp(command, "set agc.reset.interval ", 23) == 0) {
    const int value = atoi(command + 23);

    if (value < 0 || value > 1020) {
      snprintf(reply, reply_size, "Err - invalid AGC interval");
      return true;
    }

    _prefs.agc_reset_interval = (uint8_t)(value / 4);
    savePrefs();
    snprintf(
      reply,
      reply_size,
      "OK - interval rounded to %u",
      (unsigned)_prefs.agc_reset_interval * 4U
    );
    return true;
  }

  if (strncmp(command, "set multi.acks ", 15) == 0) {
    const int value = atoi(command + 15);

    if (value != 0 && value != 1) {
      snprintf(reply, reply_size, "Err - use 0 or 1");
      return true;
    }

    _prefs.multi_acks = (uint8_t)value;
    save_ok();
    return true;
  }

  if (strncmp(command, "set allow.read.only ", 20) == 0) {
    const char* value = command + 20;

    if (strcmp(value, "on") != 0 && strcmp(value, "off") != 0) {
      snprintf(reply, reply_size, "Err - use on or off");
      return true;
    }

    _prefs.setAllowReadOnlyEn(strcmp(value, "on") == 0);
    save_ok();
    return true;
  }

  if (strncmp(command, "set guest.password ", 19) == 0) {
    _prefs.setRepeaterGuestPassword(command + 19);
    savePrefs();
    snprintf(reply, reply_size, "OK");
    return true;
  }

  if (strncmp(command, "set owner.info ", 15) == 0) {
    const char* source = command + 15;
    size_t out = 0;

    while (
      *source &&
      out + 1 < sizeof(_prefs.owner_info)
    ) {
      _prefs.owner_info[out++] =
        *source == '|' ? '\n' : *source;
      source++;
    }

    _prefs.owner_info[out] = '\0';
    savePrefs();
    snprintf(reply, reply_size, "OK - owner info set");
    return true;
  }

  if (strncmp(command, "set path.hash.mode ", 19) == 0) {
    const int value = atoi(command + 19);

    if (value < 0 || value > 2) {
      snprintf(reply, reply_size, "Err - invalid hash mode");
      return true;
    }

    _prefs.path_hash_mode = (uint8_t)value;
    save_ok();
    return true;
  }

  if (strncmp(command, "set loop.detect ", 16) == 0) {
    const char* value = command + 16;
    uint8_t mode = LOOP_DETECT_OFF;

    if (strcmp(value, "off") == 0) {
      mode = LOOP_DETECT_OFF;
    } else if (strcmp(value, "minimal") == 0) {
      mode = LOOP_DETECT_MINIMAL;
    } else if (strcmp(value, "moderate") == 0) {
      mode = LOOP_DETECT_MODERATE;
    } else if (strcmp(value, "strict") == 0) {
      mode = LOOP_DETECT_STRICT;
    } else {
      snprintf(reply, reply_size, "Err - invalid loop mode");
      return true;
    }

    _prefs.setLoopDetect(mode);
    save_ok();
    return true;
  }

  if (strncmp(command, "set radio.rxgain ", 17) == 0) {
    const char* value = command + 17;

    if (
      strcmp(value, "on") != 0 &&
      strcmp(value, "off") != 0
    ) {
      snprintf(reply, reply_size, "Err - use on or off");
      return true;
    }

    _prefs.rx_boosted_gain =
      strcmp(value, "on") == 0 ? 1 : 0;

    radio_driver.setRxBoostedGainMode(
      _prefs.rx_boosted_gain
    );

    save_ok();
    return true;
  }

  if (strncmp(command, "password ", 9) == 0) {
    _prefs.setRepeaterAdminPassword(command + 9);
    savePrefs();
    snprintf(
      reply,
      reply_size,
      "password now: %s",
      _prefs.getRepeaterAdminPassword()
    );
    return true;
  }

  if (strcmp(command, "clock") == 0) {
    DateTime dt(getRTCClock()->getCurrentTime());

    snprintf(
      reply,
      reply_size,
      "%02u:%02u - %u/%u/%u UTC",
      (unsigned)dt.hour(),
      (unsigned)dt.minute(),
      (unsigned)dt.day(),
      (unsigned)dt.month(),
      (unsigned)dt.year()
    );
    return true;
  }

  if (strcmp(command, "clock sync") == 0) {
    getRTCClock()->setCurrentTimeFromSource(
      sender_timestamp,
      mesh::RTCClock::SyncSource::Companion
    );

    next_smart_advert = 0;
    snprintf(reply, reply_size, "OK - clock set");
    return true;
  }

  if (strncmp(command, "time ", 5) == 0) {
    const uint32_t epoch =
      (uint32_t)strtoul(command + 5, NULL, 10);

    if (epoch == 0) {
      snprintf(reply, reply_size, "Err - invalid time");
      return true;
    }

    getRTCClock()->setCurrentTimeFromSource(
      epoch,
      mesh::RTCClock::SyncSource::Companion
    );

    next_smart_advert = 0;
    snprintf(reply, reply_size, "OK - clock set");
    return true;
  }

  if (strcmp(command, "neighbors") == 0) {
    size_t used = 0;
    const int count = getRepeaterNeighbourCount();

    if (count == 0) {
      snprintf(reply, reply_size, "-none-");
      return true;
    }

    for (
      int i = 0;
      i < count && used + 2 < reply_size;
      i++
    ) {
      const mesh::Identity* id =
        getRepeaterNeighbour(i);

      if (id == NULL) {
        continue;
      }

      char key[9];
      mesh::Utils::toHex(key, id->pub_key, 4);

      const int written =
        snprintf(
          reply + used,
          reply_size - used,
          "%s%s:%lu:%d",
          used ? "\n" : "",
          key,
          (unsigned long)getRepeaterNeighbourHeardAgo(i),
          (int)getRepeaterNeighbourSNR(i)
        );

      if (written <= 0) {
        break;
      }

      used += min(
        (size_t)written,
        reply_size - used - 1
      );
    }

    return true;
  }

  if (strncmp(command, "neighbor.remove ", 16) == 0) {
    const char* hex = command + 16;
    const size_t hex_len = strlen(hex);

    if (
      hex_len < 2 ||
      hex_len > PUB_KEY_SIZE * 2 ||
      (hex_len & 1)
    ) {
      snprintf(reply, reply_size, "Err - bad pubkey");
      return true;
    }

    uint8_t key[PUB_KEY_SIZE];
    const int key_len = hex_len / 2;

    if (!mesh::Utils::fromHex(key, key_len, hex)) {
      snprintf(reply, reply_size, "Err - bad pubkey");
      return true;
    }

    bool removed = false;

    for (int i = 0; i < MAX_REPEATER_NEIGHBOURS; i++) {
      if (
        repeater_neighbours[i].heard_timestamp > 0 &&
        memcmp(
          repeater_neighbours[i].id.pub_key,
          key,
          key_len
        ) == 0
      ) {
        memset(
          &repeater_neighbours[i],
          0,
          sizeof(repeater_neighbours[i])
        );
        removed = true;
      }
    }

    if (removed) {
      markRepeaterNeighboursDirty();
    }

    snprintf(
      reply,
      reply_size,
      removed ? "OK - neighbor removed" : "Err - not found"
    );
    return true;
  }

  if (strncmp(command, "setperm ", 8) == 0) {
    char* hex = command + 8;
    char* space = strchr(hex, ' ');

    if (space == NULL) {
      snprintf(reply, reply_size, "Err - bad params");
      return true;
    }

    *space++ = '\0';

    const size_t hex_len = strlen(hex);

    if (
      hex_len < 2 ||
      hex_len > PUB_KEY_SIZE * 2 ||
      (hex_len & 1)
    ) {
      snprintf(reply, reply_size, "Err - bad pubkey");
      return true;
    }

    uint8_t key[PUB_KEY_SIZE];
    const int key_len = hex_len / 2;

    if (
      !mesh::Utils::fromHex(key, key_len, hex) ||
      !repeater_acl.applyPermissions(
        self_id,
        key,
        key_len,
        (uint8_t)atoi(space)
      )
    ) {
      snprintf(reply, reply_size, "Err - invalid params");
      return true;
    }

    repeater_acl.save(_store->getPrimaryFS());
    snprintf(reply, reply_size, "OK");
    return true;
  }

  if (strcmp(command, "region") == 0) {
    exportRepeaterRegions(reply, reply_size);
    return true;
  }

  if (strncmp(command, "region def ", 11) == 0) {
    char* payload = command + 11;

    while (*payload == ' ' || *payload == '\t') {
      payload++;
    }

    if (*payload == '\0') {
      snprintf(reply, reply_size, "Err - empty def");
      return true;
    }

    RegionEntry* cursor =
      &region_map.getWildcard();

    char* saveptr = NULL;
    char* token =
      strtok_r(payload, " \t", &saveptr);

    while (token != NULL) {
      char* pipe = strchr(token, '|');
      char* comma = strchr(token, ',');
      char* split = NULL;

      if (pipe != NULL && comma != NULL) {
        split = pipe < comma ? pipe : comma;
      } else {
        split = pipe != NULL ? pipe : comma;
      }

      char* jump = NULL;

      if (split != NULL) {
        *split = '\0';
        jump = split + 1;
      }

      if (token[0] == '\0') {
        snprintf(reply, reply_size, "Err - empty region name");
        return true;
      }

      RegionEntry* region =
        region_map.putRegion(
          token,
          cursor->id
        );

      if (region == NULL) {
        snprintf(
          reply,
          reply_size,
          "Err - put failed: %s",
          token
        );
        return true;
      }

      region->flags = 0;
      cursor = region;

      if (jump != NULL) {
        if (jump[0] == '\0') {
          snprintf(reply, reply_size, "Err - empty jump");
          return true;
        }

        RegionEntry* target =
          region_map.findByNamePrefix(jump);

        if (target == NULL) {
          snprintf(
            reply,
            reply_size,
            "Err - unknown jump: %s",
            jump
          );
          return true;
        }

        cursor = target;
      }

      token =
        strtok_r(NULL, " \t", &saveptr);
    }

    region_policy_configured = true;
    exportRepeaterRegions(reply, reply_size);
    return true;
  }

  if (strcmp(command, "region load") == 0) {
    region_policy_configured =
      region_map.load(_store->getPrimaryFS());

    if (region_policy_configured) {
      syncDefaultScopeFromRegionMap(false);
      exportRepeaterRegions(reply, reply_size);
    } else {
      snprintf(reply, reply_size, "Err - load failed");
    }

    return true;
  }

  if (strcmp(command, "region save") == 0) {
    snprintf(
      reply,
      reply_size,
      saveRepeaterRegions() ? "OK" : "Err - save failed"
    );
    return true;
  }

  if (strncmp(command, "region get ", 11) == 0) {
    RegionEntry* region =
      findRepeaterRegion(command + 11);

    if (region == NULL) {
      snprintf(reply, reply_size, "Err - unknown region");
      return true;
    }

    RegionEntry* parent =
      region_map.findById(region->parent);

    snprintf(
      reply,
      reply_size,
      " %s%s%s%s",
      region->name,
      parent != NULL && parent->id != 0 ? " (" : "",
      parent != NULL && parent->id != 0 ? parent->name : "",
      parent != NULL && parent->id != 0 ? ")" : ""
    );

    if (
      (region->flags & REGION_DENY_FLOOD) == 0 &&
      strlen(reply) + 2 < reply_size
    ) {
      strcat(reply, " F");
    }

    return true;
  }

  if (strncmp(command, "region list ", 12) == 0) {
    const char* filter = command + 12;
    bool invert = false;

    if (strcmp(filter, "allowed") == 0) {
      invert = false;
    } else if (strcmp(filter, "denied") == 0) {
      invert = true;
    } else {
      snprintf(reply, reply_size, "Err - use allowed or denied");
      return true;
    }

    const int length =
      region_map.exportNamesTo(
        reply,
        reply_size,
        REGION_DENY_FLOOD,
        invert
      );

    if (length == 0) {
      snprintf(reply, reply_size, "-none-");
    }

    return true;
  }

  if (strncmp(command, "region put ", 11) == 0) {
    char* name = command + 11;
    char* parent = strchr(name, ' ');

    if (parent != NULL) {
      *parent++ = '\0';
      while (*parent == ' ') parent++;
    }

    snprintf(
      reply,
      reply_size,
      putRepeaterRegion(
        name,
        parent != NULL && *parent ? parent : "*"
      )
        ? "OK - (flood allowed)"
        : "Err - unable to put"
    );
    return true;
  }

  if (strncmp(command, "region remove ", 14) == 0) {
    snprintf(
      reply,
      reply_size,
      removeRepeaterRegion(command + 14)
        ? "OK"
        : "Err - not found or not empty"
    );
    return true;
  }

  if (strcmp(command, "region home") == 0) {
    RegionEntry* home = getRepeaterHomeRegion();

    snprintf(
      reply,
      reply_size,
      " home is %s",
      home != NULL ? home->name : "*"
    );
    return true;
  }

  if (strncmp(command, "region home ", 12) == 0) {
    if (!setRepeaterHomeRegion(command + 12)) {
      snprintf(reply, reply_size, "Err - unknown region");
      return true;
    }

    RegionEntry* home = getRepeaterHomeRegion();
    snprintf(
      reply,
      reply_size,
      " home is now %s",
      home != NULL ? home->name : "*"
    );
    return true;
  }

  if (strcmp(command, "region default") == 0) {
    RegionEntry* def = getRepeaterDefaultRegion();

    snprintf(
      reply,
      reply_size,
      " default scope is %s",
      def != NULL ? def->name : "<null>"
    );
    return true;
  }

  if (strncmp(command, "region default ", 15) == 0) {
    const char* value = command + 15;
    bool ok = false;

    if (strcmp(value, "<null>") == 0) {
      ok = clearRepeaterDefaultRegion();
    } else {
      ok = setRepeaterDefaultRegion(value);
    }

    if (!ok) {
      snprintf(reply, reply_size, "Err - save failed");
      return true;
    }

    RegionEntry* def = getRepeaterDefaultRegion();
    snprintf(
      reply,
      reply_size,
      " default scope is now %s",
      def != NULL ? def->name : "<null>"
    );
    return true;
  }

  if (strncmp(command, "region allowf ", 14) == 0) {
    snprintf(
      reply,
      reply_size,
      setRepeaterRegionFloodAllowed(command + 14, true)
        ? "OK"
        : "Err - unknown region"
    );
    return true;
  }

  if (strncmp(command, "region denyf ", 13) == 0) {
    snprintf(
      reply,
      reply_size,
      setRepeaterRegionFloodAllowed(command + 13, false)
        ? "OK"
        : "Err - unknown region"
    );
    return true;
  }

  if (strcmp(command, "advert") == 0) {
    snprintf(
      reply,
      reply_size,
      advert(true, 1500) ? "OK - Advert sent" : "Err - advert failed"
    );
    return true;
  }

  if (strcmp(command, "advert.zerohop") == 0) {
    snprintf(
      reply,
      reply_size,
      advert(false, 1500) ? "OK - zerohop advert sent" : "Err - advert failed"
    );
    return true;
  }

  if (strcmp(command, "clear stats") == 0) {
    radio_driver.resetStats();
    resetStats();
    ((SimpleMeshTables*)getTables())->resetStats();
    snprintf(reply, reply_size, "OK - stats reset");
    return true;
  }

  if (strcmp(command, "reboot") == 0) {
    // Leave enough time for the CLI_DATA response to clear the radio queue.
    // The old 1 s delay rebooted successfully but could make the client report
    // a timeout because the response was cut off mid-flight.
    remote_reboot_at = futureMillis(5000);
    snprintf(reply, reply_size, "OK - rebooting");
    return true;
  }

  snprintf(reply, reply_size, "Err - unsupported command");
  return true;
}


bool MyMesh::handleRepeaterAdminText(
  const ContactInfo& from,
  mesh::Packet* packet,
  uint32_t sender_timestamp,
  const char* text
) {
  // Repeater administration is an ACL capability, not a ContactInfo type.
  // This keeps an identity usable as a normal Companion contact while the same
  // identity also administers the Repeater.
  if (!_prefs.isRepeatEn()) {
    return false;
  }

  ClientInfo* client =
    repeater_acl.getClient(from.id.pub_key, PUB_KEY_SIZE);

  if (client == NULL || !client->isAdmin()) {
    return false;
  }

  // Only consume the official Repeater CLI namespace. Ordinary text from an
  // ACL member remains an ordinary Companion DM.
  if (!isHiveFWRepeaterAdminCommand(text)) {
    return false;
  }

  if (sender_timestamp < client->last_timestamp) {
    MESH_DEBUG_PRINTLN("Remote CLI: replay detected");
    return true;
  }

  const bool is_retry =
    sender_timestamp == client->last_timestamp;

  client->last_timestamp = sender_timestamp;
  client->last_activity =
    getRTCClock()->getCurrentTime();

  if (is_retry) {
    return true;
  }

  char command[161];
  StrHelper::strncpy(
    command,
    text != NULL ? text : "",
    sizeof(command)
  );

  char reply[MAX_TEXT_LEN + 1];
  reply[0] = '\0';

  handleRepeaterRemoteCommand(
    sender_timestamp,
    command,
    reply,
    sizeof(reply)
  );

  if (reply[0] == '\0') {
    return true;
  }

  const int text_len =
    min((int)strlen(reply), (int)MAX_TEXT_LEN);

  uint8_t payload[5 + MAX_TEXT_LEN + 1];
  uint32_t reply_timestamp =
    getRTCClock()->getCurrentTimeUnique();

  if (reply_timestamp == sender_timestamp) {
    reply_timestamp++;
  }

  memcpy(payload, &reply_timestamp, 4);
  payload[4] = (TXT_TYPE_CLI_DATA << 2);
  memcpy(&payload[5], reply, text_len);
  payload[5 + text_len] = '\0';

  mesh::Packet* response =
    createDatagram(
      PAYLOAD_TYPE_TXT_MSG,
      from.id,
      from.getSharedSecret(self_id),
      payload,
      5 + text_len
    );

  if (response == NULL) {
    return true;
  }

  if (
    from.out_path_len != OUT_PATH_UNKNOWN &&
    mesh::Packet::isValidPathLen(from.out_path_len)
  ) {
    sendDirect(
      response,
      from.out_path,
      from.out_path_len,
      HIVEFW_REPEATER_CLI_REPLY_DELAY
    );
  } else if (packet != NULL) {
    sendRepeaterFloodReply(
      response,
      HIVEFW_REPEATER_CLI_REPLY_DELAY,
      packet->getPathHashSize()
    );
  } else {
    sendFloodScoped(
      from,
      response,
      HIVEFW_REPEATER_CLI_REPLY_DELAY
    );
  }

  return true;
}

void MyMesh::onMessageRecv(const ContactInfo &from, mesh::Packet *pkt, uint32_t sender_timestamp,
                           const char *text) {
  // Legacy/simple_repeater remote administration uses TXT_TYPE_PLAIN.
  // BaseChatMesh will still emit the normal ACK after this callback returns.
  if (handleRepeaterAdminText(from, pkt, sender_timestamp, text)) {
    return;
  }

  markConnectionActive(from); // in case this is from a server, and we have a connection
  queueMessage(from, TXT_TYPE_PLAIN, pkt, sender_timestamp, NULL, 0, text);
}

void MyMesh::onCommandDataRecv(const ContactInfo &from, mesh::Packet *pkt, uint32_t sender_timestamp,
                               const char *text) {
  // Newer clients can send the same admin command as CLI_DATA. Supporting
  // both encodings is intentional: HiveFW is Companion + Repeater.
  if (handleRepeaterAdminText(from, pkt, sender_timestamp, text)) {
    return;
  }

  markConnectionActive(from);
  queueMessage(
    from,
    TXT_TYPE_CLI_DATA,
    pkt,
    sender_timestamp,
    NULL,
    0,
    text
  );
}

void MyMesh::onSignedMessageRecv(const ContactInfo &from, mesh::Packet *pkt, uint32_t sender_timestamp,
                                 const uint8_t *sender_prefix, const char *text) {
  markConnectionActive(from);
  // from.sync_since change needs to be persisted
  dirty_contacts_expiry = futureMillis(LAZY_CONTACTS_WRITE_DELAY);
  queueMessage(from, TXT_TYPE_SIGNED_PLAIN, pkt, sender_timestamp, sender_prefix, 4, text);
}

void MyMesh::onChannelMessageRecv(const mesh::GroupChannel &channel, mesh::Packet *pkt, uint32_t timestamp,
                                  const char *text) {
  int i = 0;
  if (app_target_ver >= 3) {
    out_frame[i++] = RESP_CODE_CHANNEL_MSG_RECV_V3;
    out_frame[i++] = (int8_t)(pkt->getSNR() * 4);
    out_frame[i++] = 0; // reserved1
    out_frame[i++] = 0; // reserved2
  } else {
    out_frame[i++] = RESP_CODE_CHANNEL_MSG_RECV;
  }

  uint8_t channel_idx = findChannelIdx(channel);
  out_frame[i++] = channel_idx;
  uint8_t path_len = out_frame[i++] = pkt->isRouteFlood() ? pkt->path_len : 0xFF;

  out_frame[i++] = TXT_TYPE_PLAIN;
  memcpy(&out_frame[i], &timestamp, 4);
  i += 4;
  int tlen = strlen(text); // TODO: UTF-8 ??
  if (i + tlen > MAX_FRAME_SIZE) {
    tlen = MAX_FRAME_SIZE - i;
  }
  memcpy(&out_frame[i], text, tlen);
  i += tlen;
  addToOfflineQueue(out_frame, i);

  if (_serial->isConnected()) {
    uint8_t frame[1];
    frame[0] = PUSH_CODE_MSG_WAITING; // send push 'tickle'
    _serial->writeFrame(frame, 1);
  } else {
#ifdef DISPLAY_CLASS
    if (_ui) _ui->notify(UIEventType::channelMessage);
#endif
  }
#ifdef DISPLAY_CLASS
  // Get the channel name from the channel index
  const char *channel_name = "Unknown";
  ChannelDetails channel_details;
  if (getChannel(channel_idx, channel_details)) {
    channel_name = channel_details.name;
  }
  if (_ui) _ui->newMsg(path_len, channel.hash, channel_name, text, offline_queue_len);
#endif
}

void MyMesh::onChannelDataRecv(const mesh::GroupChannel &channel, mesh::Packet *pkt, uint16_t data_type,
                               const uint8_t *data, size_t data_len) {
  if (data_len > MAX_CHANNEL_DATA_LENGTH) {
    MESH_DEBUG_PRINTLN("onChannelDataRecv: dropping payload_len=%d exceeds frame limit=%d",
                       (uint32_t)data_len, (uint32_t)MAX_CHANNEL_DATA_LENGTH);
    return;
  }

  int i = 0;
  out_frame[i++] = RESP_CODE_CHANNEL_DATA_RECV;
  out_frame[i++] = (int8_t)(pkt->getSNR() * 4);
  out_frame[i++] = 0; // reserved1
  out_frame[i++] = 0; // reserved2

  uint8_t channel_idx = findChannelIdx(channel);
  out_frame[i++] = channel_idx;
  out_frame[i++] = pkt->isRouteFlood() ? pkt->path_len : 0xFF;
  out_frame[i++] = (uint8_t)(data_type & 0xFF);
  out_frame[i++] = (uint8_t)(data_type >> 8);
  out_frame[i++] = (uint8_t)data_len;

  int copy_len = (int)data_len;
  if (copy_len > 0) {
    memcpy(&out_frame[i], data, copy_len);
    i += copy_len;
  }
  addToOfflineQueue(out_frame, i);

  if (_serial->isConnected()) {
    uint8_t frame[1];
    frame[0] = PUSH_CODE_MSG_WAITING; // send push 'tickle'
    _serial->writeFrame(frame, 1);
  }
}

uint8_t MyMesh::onContactRequest(const ContactInfo &contact, uint32_t sender_timestamp, const uint8_t *data,
                                 uint8_t len, uint8_t *reply) {
  if (data == NULL || reply == NULL || len == 0) {
    return 0;
  }

  ClientInfo* repeater_client =
    _prefs.isRepeatEn()
      ? repeater_acl.getClient(contact.id.pub_key, PUB_KEY_SIZE)
      : NULL;
  const bool is_repeater_session = repeater_client != NULL;

  // Repeater server capability is attached to the ACL identity, not to the
  // Companion contact type. This permits the same peer to remain a normal
  // chat contact and use authenticated Repeater requests.
  if (is_repeater_session) {
    repeater_client->last_activity =
      getRTCClock()->getCurrentTime();
  }

  // MeshCore simple_repeater compatible status request.
  if (is_repeater_session && data[0] == REQ_TYPE_GET_STATUS) {
    RepeaterStats stats;
    memset(&stats, 0, sizeof(stats));

    stats.batt_milli_volts = board.getBattMilliVolts();
    stats.curr_tx_queue_len = (uint16_t)_mgr->getOutboundTotal();
    stats.noise_floor = (int16_t)_radio->getNoiseFloor();
    stats.last_rssi = (int16_t)radio_driver.getLastRSSI();
    stats.n_packets_recv = radio_driver.getPacketsRecv();
    stats.n_packets_sent = radio_driver.getPacketsSent();
    stats.total_air_time_secs = getTotalAirTime() / 1000;
    stats.total_up_time_secs = _ms->getMillis() / 1000;
    stats.n_sent_flood = getNumSentFlood();
    stats.n_sent_direct = getNumSentDirect();
    stats.n_recv_flood = getNumRecvFlood();
    stats.n_recv_direct = getNumRecvDirect();
    stats.err_events = _err_flags;
    stats.last_snr = (int16_t)(radio_driver.getLastSNR() * 4);

    SimpleMeshTables* mesh_tables =
      (SimpleMeshTables*)getTables();

    if (mesh_tables != NULL) {
      stats.n_direct_dups = mesh_tables->getNumDirectDups();
      stats.n_flood_dups = mesh_tables->getNumFloodDups();
    }

    stats.total_rx_air_time_secs = getReceiveAirTime() / 1000;
    stats.n_recv_errors = radio_driver.getPacketsRecvErrors();

    memcpy(reply, &sender_timestamp, 4);
    memcpy(&reply[4], &stats, sizeof(stats));
    return 4 + sizeof(stats);
  }

  // Admin-only ACL enumeration. Response is:
  // tag(4) + repeated pubkey-prefix(6) + permissions(1).
  if (is_repeater_session && data[0] == REQ_TYPE_GET_ACCESS_LIST) {
    if (
      repeater_client == NULL ||
      !repeater_client->isAdmin() ||
      len < 3 ||
      data[1] != 0 ||
      data[2] != 0
    ) {
      return 0;
    }

    int ofs = 4;
    memcpy(reply, &sender_timestamp, 4);

    for (
      int i = 0;
      i < repeater_acl.getNumClients() &&
      ofs + 7 <= MAX_PACKET_PAYLOAD;
      i++
    ) {
      ClientInfo* client =
        repeater_acl.getClientByIdx(i);

      if (client == NULL || client->permissions == 0) {
        continue;
      }

      memcpy(&reply[ofs], client->id.pub_key, 6);
      ofs += 6;
      reply[ofs++] = client->permissions;
    }

    return ofs;
  }

  // Authenticated remote NEIGHBOURS uses the same cumulative zero-hop table
  // already exposed locally to the Home Assistant Vizinhos page. It does not
  // run Discovery and does not maintain a second cache.
  if (is_repeater_session && data[0] == REQ_TYPE_GET_NEIGHBOURS) {
    if (len < 11 || data[1] != 0) {
      return 0;
    }

    const uint8_t requested_count = data[2];
    uint16_t offset = 0;
    memcpy(&offset, &data[3], 2);

    const uint8_t order_by = data[5];
    uint8_t pubkey_prefix_length = data[6];

    if (pubkey_prefix_length > PUB_KEY_SIZE) {
      pubkey_prefix_length = PUB_KEY_SIZE;
    }

    const RepeaterNeighbour* sorted[MAX_REPEATER_NEIGHBOURS];
    uint16_t neighbours_count = 0;

    for (int i = 0; i < MAX_REPEATER_NEIGHBOURS; i++) {
      if (repeater_neighbours[i].heard_timestamp > 0) {
        sorted[neighbours_count++] =
          &repeater_neighbours[i];
      }
    }

    if (order_by <= 3) {
      for (uint16_t i = 0; i < neighbours_count; i++) {
        for (uint16_t j = i + 1; j < neighbours_count; j++) {
          bool swap_entries;

          if (order_by == 0) {
            swap_entries =
              sorted[j]->heard_timestamp >
              sorted[i]->heard_timestamp;
          } else if (order_by == 1) {
            swap_entries =
              sorted[j]->heard_timestamp <
              sorted[i]->heard_timestamp;
          } else if (order_by == 2) {
            swap_entries =
              sorted[j]->snr > sorted[i]->snr;
          } else {
            swap_entries =
              sorted[j]->snr < sorted[i]->snr;
          }

          if (swap_entries) {
            const RepeaterNeighbour* tmp = sorted[i];
            sorted[i] = sorted[j];
            sorted[j] = tmp;
          }
        }
      }
    }

    memcpy(reply, &sender_timestamp, 4);

    int reply_offset = 8;
    uint16_t results_count = 0;
    const uint32_t now = getRTCClock()->getCurrentTime();
    const int entry_size = pubkey_prefix_length + 5;

    for (
      uint16_t index = 0;
      index < requested_count &&
      (uint32_t)index + offset < neighbours_count;
      index++
    ) {
      if (reply_offset + entry_size > MAX_PACKET_PAYLOAD) {
        break;
      }

      const RepeaterNeighbour* neighbour =
        sorted[index + offset];

      const uint32_t heard_seconds_ago =
        now >= neighbour->heard_timestamp
          ? now - neighbour->heard_timestamp
          : 0;

      memcpy(
        &reply[reply_offset],
        neighbour->id.pub_key,
        pubkey_prefix_length
      );
      reply_offset += pubkey_prefix_length;

      memcpy(
        &reply[reply_offset],
        &heard_seconds_ago,
        4
      );
      reply_offset += 4;

      reply[reply_offset++] = (uint8_t)neighbour->snr;
      results_count++;
    }

    memcpy(&reply[4], &neighbours_count, 2);
    memcpy(&reply[6], &results_count, 2);

    return reply_offset;
  }

  if (
    is_repeater_session &&
    data[0] == REQ_TYPE_GET_OWNER_INFO
  ) {
    memcpy(reply, &sender_timestamp, 4);

    const int written =
      snprintf(
        (char*)&reply[4],
        MAX_PACKET_PAYLOAD - 4,
        "%s\n%s\n%s",
        FIRMWARE_VERSION,
        _prefs.node_name,
        _prefs.owner_info
      );

    if (written < 0) {
      return 0;
    }

    return (uint8_t)(
      4 +
      min(
        (size_t)written,
        (size_t)MAX_PACKET_PAYLOAD - 5
      )
    );
  }

  if (data[0] == REQ_TYPE_GET_TELEMETRY_DATA) {
    if (len < 2) {
      return 0;
    }

    // Repeater sessions follow simple_repeater semantics. Guests get only
    // base telemetry; higher roles may query additional sensor classes.
    if (is_repeater_session) {
      uint8_t perm_mask = ~(data[1]);

      if (
        repeater_client == NULL ||
        (
          repeater_client->permissions &
          PERM_ACL_ROLE_MASK
        ) == PERM_ACL_GUEST
      ) {
        perm_mask = 0x00;
      }

      telemetry.reset();
      telemetry.addVoltage(
        TELEM_CHANNEL_SELF,
        (float)board.getBattMilliVolts() / 1000.0f
      );

      sensors.querySensors(perm_mask, telemetry);

      float temperature = board.getMCUTemperature();
      if (!isnan(temperature)) {
        telemetry.addTemperature(
          TELEM_CHANNEL_SELF,
          temperature
        );
      }

      memcpy(reply, &sender_timestamp, 4);

      uint8_t tlen = telemetry.getSize();
      memcpy(&reply[4], telemetry.getBuffer(), tlen);
      return 4 + tlen;
    }

    // Existing Companion telemetry behaviour stays unchanged.
    uint8_t permissions = 0;
    uint8_t cp = contact.flags >> 1;

    if (_prefs.telemetry_mode_base == TELEM_MODE_ALLOW_ALL) {
      permissions = TELEM_PERM_BASE;
    } else if (_prefs.telemetry_mode_base == TELEM_MODE_ALLOW_FLAGS) {
      permissions = cp & TELEM_PERM_BASE;
    }

    if (_prefs.telemetry_mode_loc == TELEM_MODE_ALLOW_ALL) {
      permissions |= TELEM_PERM_LOCATION;
    } else if (_prefs.telemetry_mode_loc == TELEM_MODE_ALLOW_FLAGS) {
      permissions |= cp & TELEM_PERM_LOCATION;
    }

    if (_prefs.telemetry_mode_env == TELEM_MODE_ALLOW_ALL) {
      permissions |= TELEM_PERM_ENVIRONMENT;
    } else if (_prefs.telemetry_mode_env == TELEM_MODE_ALLOW_FLAGS) {
      permissions |= cp & TELEM_PERM_ENVIRONMENT;
    }

    uint8_t perm_mask = ~(data[1]);
    permissions &= perm_mask;

    if (permissions & TELEM_PERM_BASE) {
      telemetry.reset();
      telemetry.addVoltage(
        TELEM_CHANNEL_SELF,
        (float)board.getBattMilliVolts() / 1000.0f
      );

      sensors.querySensors(permissions, telemetry);

      float temperature = board.getMCUTemperature();
      if (!isnan(temperature)) {
        telemetry.addTemperature(
          TELEM_CHANNEL_SELF,
          temperature
        );
      }

      memcpy(reply, &sender_timestamp, 4);

      uint8_t tlen = telemetry.getSize();
      memcpy(&reply[4], telemetry.getBuffer(), tlen);
      return 4 + tlen;
    }
  }

  return 0;
}

void MyMesh::onContactResponse(const ContactInfo &contact, const uint8_t *data, uint8_t len) {
  uint32_t tag;
  memcpy(&tag, data, 4);

  // ==========================================================
  // ANON OWNER RESPONSE para Discovery ativo
  // ==========================================================

  if (len > 8 &&
      pending_node_name_tag != 0 &&
      tag == pending_node_name_tag) {

    pending_node_name_tag = 0;

    // Resposta ANON OWNER oficial:
    //
    // data[0..3] = tag
    // data[4..7] = remote timestamp
    // data[8..]  = node_name + '\n' + owner_info

    char node_name[64];

    int copy_len = len - 8;

    if (copy_len >= (int)sizeof(node_name)) {
      copy_len = sizeof(node_name) - 1;
    }

    memcpy(
      node_name,
      &data[8],
      copy_len
    );

    node_name[copy_len] = '\0';

    char* newline =
      strchr(node_name, '\n');

    if (newline != NULL) {
      *newline = '\0';
    }

    MESH_DEBUG_PRINTLN(
      "Discovery name response from %02X%02X%02X%02X: '%s'",
      contact.id.pub_key[0],
      contact.id.pub_key[1],
      contact.id.pub_key[2],
      contact.id.pub_key[3],
      node_name
    );

    if (node_name[0] != '\0') {

      for (int i = 0;
           i < node_discovery_result_count;
           i++) {

        if (memcmp(
              node_discovery_results[i].pub_key,
              contact.id.pub_key,
              PUB_KEY_SIZE
            ) == 0) {

          strncpy(
            node_discovery_results[i].name,
            node_name,
            sizeof(node_discovery_results[i].name) - 1
          );

          node_discovery_results[i].name[
            sizeof(node_discovery_results[i].name) - 1
          ] = '\0';

          break;
        }
      }
    }

#ifdef DISPLAY_CLASS
    if (_ui) {
      _ui->notify(UIEventType::newContactMessage);
    }
#endif

    return;
  }

  if (pending_login && memcmp(&pending_login, contact.id.pub_key, 4) == 0) { // check for login response
    // yes, is response to pending sendLogin()
    pending_login = 0;

    int i = 0;
    if (memcmp(&data[4], "OK", 2) == 0) { // legacy Repeater login OK response
      out_frame[i++] = PUSH_CODE_LOGIN_SUCCESS;
      out_frame[i++] = 0; // legacy: is_admin = false
      memcpy(&out_frame[i], contact.id.pub_key, 6);
      i += 6;                                     // pub_key_prefix
    } else if (data[4] == RESP_SERVER_LOGIN_OK) { // new login response
      uint16_t keep_alive_secs = ((uint16_t)data[5]) * 16;
      if (keep_alive_secs > 0) {
        startConnection(contact, keep_alive_secs);
      }
      out_frame[i++] = PUSH_CODE_LOGIN_SUCCESS;
      out_frame[i++] = data[6]; // permissions (eg. is_admin)
      memcpy(&out_frame[i], contact.id.pub_key, 6);
      i += 6; // pub_key_prefix
      memcpy(&out_frame[i], &tag, 4);
      i += 4; // NEW: include server timestamp
      out_frame[i++] = data[7]; // NEW (v7): ACL permissions
      out_frame[i++] = data[12]; // FIRMWARE_VER_LEVEL
    } else {
      out_frame[i++] = PUSH_CODE_LOGIN_FAIL;
      out_frame[i++] = 0; // reserved
      memcpy(&out_frame[i], contact.id.pub_key, 6);
      i += 6; // pub_key_prefix
    }
    _serial->writeFrame(out_frame, i);
  } else if (len > 4 && // check for status response
             pending_status &&
             memcmp(&pending_status, contact.id.pub_key, 4) == 0 // legacy matching scheme
                                                                 // FUTURE: tag == pending_status
  ) {
    pending_status = 0;

    int i = 0;
    out_frame[i++] = PUSH_CODE_STATUS_RESPONSE;
    out_frame[i++] = 0; // reserved
    memcpy(&out_frame[i], contact.id.pub_key, 6);
    i += 6; // pub_key_prefix
    memcpy(&out_frame[i], &data[4], len - 4);
    i += (len - 4);
    _serial->writeFrame(out_frame, i);
  } else if (len > 4 && tag == pending_telemetry) {  // check for matching response tag
    pending_telemetry = 0;

    int i = 0;
    out_frame[i++] = PUSH_CODE_TELEMETRY_RESPONSE;
    out_frame[i++] = 0; // reserved
    memcpy(&out_frame[i], contact.id.pub_key, 6);
    i += 6; // pub_key_prefix
    memcpy(&out_frame[i], &data[4], len - 4);
    i += (len - 4);
    _serial->writeFrame(out_frame, i);
  } else if (len > 4 && tag == pending_req) {  // check for matching response tag
    pending_req = 0;

    int i = 0;
    out_frame[i++] = PUSH_CODE_BINARY_RESPONSE;
    out_frame[i++] = 0; // reserved
    memcpy(&out_frame[i], &tag, 4);   // app needs to match this to RESP_CODE_SENT.tag
    i += 4;
    memcpy(&out_frame[i], &data[4], len - 4);
    i += (len - 4);
    _serial->writeFrame(out_frame, i);
  }
}

bool MyMesh::onContactPathRecv(ContactInfo& contact, uint8_t* in_path, uint8_t in_path_len, uint8_t* out_path, uint8_t out_path_len, uint8_t extra_type, uint8_t* extra, uint8_t extra_len) {
  if (extra_type == PAYLOAD_TYPE_RESPONSE && extra_len > 4) {
    uint32_t tag;
    memcpy(&tag, extra, 4);

    if (tag == pending_discovery) {  // check for matching response tag)
      pending_discovery = 0;

      if (!mesh::Packet::isValidPathLen(in_path_len) || !mesh::Packet::isValidPathLen(out_path_len)) {
        MESH_DEBUG_PRINTLN("onContactPathRecv, invalid path sizes: %d, %d", in_path_len, out_path_len);
      } else {
        int i = 0;
        out_frame[i++] = PUSH_CODE_PATH_DISCOVERY_RESPONSE;
        out_frame[i++] = 0; // reserved
        memcpy(&out_frame[i], contact.id.pub_key, 6);
        i += 6; // pub_key_prefix
        out_frame[i++] = out_path_len;
        i += mesh::Packet::writePath(&out_frame[i], out_path, out_path_len);
        out_frame[i++] = in_path_len;
        i += mesh::Packet::writePath(&out_frame[i], in_path, in_path_len);
        // NOTE: telemetry data in 'extra' is discarded at present

        _serial->writeFrame(out_frame, i);
      }
      return false;  // DON'T send reciprocal path!
    }
  }
  // Keep the Repeater ACL session path aligned with the transient
  // Companion contact used by BaseChatMesh. This lets the official app switch
  // from flood login to direct remote administration exactly like
  // simple_repeater.
  if (
    _prefs.isRepeatEn() &&
    mesh::Packet::isValidPathLen(out_path_len)
  ) {
    ClientInfo* client =
      repeater_acl.getClient(contact.id.pub_key, PUB_KEY_SIZE);

    if (client != NULL) {
      client->out_path_len =
        mesh::Packet::copyPath(
          client->out_path,
          out_path,
          out_path_len
        );
      client->last_activity =
        getRTCClock()->getCurrentTime();
    }
  }

  // let base class handle received path and data
  return BaseChatMesh::onContactPathRecv(contact, in_path, in_path_len, out_path, out_path_len, extra_type, extra, extra_len);
}

ContactInfo* MyMesh::ensureRepeaterLoginContact(
  const mesh::Identity& sender
) {
  ContactInfo* contact =
    lookupContactByPubKey(sender.pub_key, PUB_KEY_SIZE);

  if (contact != NULL) {
    contact->lastmod = getRTCClock()->getCurrentTime();
    return contact;
  }

  ContactInfo transient;
  memset(&transient, 0, sizeof(transient));
  transient.id = sender;
  transient.type = ADV_TYPE_NONE;
  transient.out_path_len = OUT_PATH_UNKNOWN;
  transient.lastmod = getRTCClock()->getCurrentTime();
  transient.shared_secret_valid = false;

  if (!addContact(transient)) {
    return NULL;
  }

  return lookupContactByPubKey(sender.pub_key, PUB_KEY_SIZE);
}


uint8_t MyMesh::handleRepeaterLoginReq(
  const mesh::Identity& sender,
  const uint8_t* secret,
  uint32_t sender_timestamp,
  const uint8_t* password,
  bool is_flood,
  uint8_t* reply
) {
  ClientInfo* client = NULL;

  // An empty password is only a re-login for an identity already present in
  // the persistent ACL. It never grants first-time access.
  if (password[0] == '\0') {
    client = repeater_acl.getClient(sender.pub_key, PUB_KEY_SIZE);
  }

  if (client == NULL) {
    uint8_t permissions = PERM_ACL_GUEST;
    const char* admin_password = _prefs.getRepeaterAdminPassword();
    const char* guest_password = _prefs.getRepeaterGuestPassword();

    if (
      admin_password[0] != '\0' &&
      strcmp((const char*)password, admin_password) == 0
    ) {
      permissions = PERM_ACL_ADMIN;
    } else if (
      guest_password[0] != '\0' &&
      strcmp((const char*)password, guest_password) == 0
    ) {
      permissions = PERM_ACL_GUEST;
    } else {
      return 0;
    }

    client = repeater_acl.putClient(sender, 0);
    if (client == NULL || sender_timestamp <= client->last_timestamp) {
      return 0;
    }

    client->last_timestamp = sender_timestamp;
    client->last_activity = getRTCClock()->getCurrentTime();
    client->permissions &= ~PERM_ACL_ROLE_MASK;
    client->permissions |= permissions;
    memcpy(client->shared_secret, secret, PUB_KEY_SIZE);

    // Guest sessions are intentionally transient, matching simple_repeater.
    if (permissions != PERM_ACL_GUEST) {
      repeater_acl.save(_store->getPrimaryFS());
    }
  }

  // A persisted ACL identity can re-login with an empty password. Refresh
  // its transient session state as well; this does not change permissions.
  client->last_activity = getRTCClock()->getCurrentTime();
  memcpy(client->shared_secret, secret, PUB_KEY_SIZE);

  if (is_flood) {
    client->out_path_len = OUT_PATH_UNKNOWN;
  }

  // BaseChatMesh performs encrypted peer matching. Seed one of its reserved
  // transient contacts so authenticated Repeater clients can use the normal
  // peer crypto path without replacing Companion contacts.
  if (ensureRepeaterLoginContact(sender) == NULL) {
    return 0;
  }

  uint32_t now = getRTCClock()->getCurrentTimeUnique();
  memcpy(reply, &now, 4);
  reply[4] = RESP_SERVER_LOGIN_OK;
  reply[5] = 0;  // legacy keep-alive recommendation
  reply[6] = client->isAdmin() ? 1 : 0;
  reply[7] = client->permissions;
  getRNG()->random(&reply[8], 4);
  reply[12] = HIVEFW_REPEATER_FW_LEVEL;

  return 13;
}


void MyMesh::sendRepeaterFloodReply(
  mesh::Packet* packet,
  uint32_t delay_millis,
  uint8_t path_hash_size
) {
  TransportKey request_scope;
  const bool is_wildcard =
    recv_pkt_region != NULL && recv_pkt_region->isWildcard();
  const bool request_scope_known =
    recv_pkt_region != NULL &&
    !is_wildcard &&
    region_map.getTransportKeysFor(
      *recv_pkt_region,
      &request_scope,
      1
    ) > 0;

  TransportKey default_scope;
  memcpy(
    default_scope.key,
    _prefs.default_scope_key,
    sizeof(default_scope.key)
  );

  switch (
    mesh::chooseReplyScope(
      request_scope_known,
      is_wildcard,
      !default_scope.isNull()
    )
  ) {
    case mesh::REPLY_SCOPE_REQUEST:
      sendFloodScoped(
        request_scope,
        packet,
        delay_millis
      );
      break;

    case mesh::REPLY_SCOPE_DEFAULT:
      sendFloodScoped(
        default_scope,
        packet,
        delay_millis
      );
      break;

    case mesh::REPLY_SCOPE_NONE:
    default:
      sendFlood(
        packet,
        delay_millis,
        path_hash_size
      );
      break;
  }
}


void MyMesh::onAnonDataRecv(
  mesh::Packet* packet,
  const uint8_t* secret,
  const mesh::Identity& sender,
  uint8_t* data,
  size_t len
) {
  if (
    !_prefs.isRepeatEn() ||
    packet->getPayloadType() != PAYLOAD_TYPE_ANON_REQ ||
    data == NULL ||
    len < 5
  ) {
    return;
  }

  uint32_t sender_timestamp = 0;
  memcpy(&sender_timestamp, data, 4);
  data[len] = 0;

  uint8_t reply_data[MAX_PACKET_PAYLOAD];
  uint8_t reply_len = 0;
  uint8_t reply_path[MAX_PATH_SIZE];
  uint8_t reply_path_len = 0xFF;

  const uint8_t request_type = data[4];

  if (request_type == 0 || request_type >= ' ') {
    // Login remains available over DIRECT or FLOOD and is handled by the
    // point-4 ACL server.
    reply_len =
      handleRepeaterLoginReq(
        sender,
        secret,
        sender_timestamp,
        &data[4],
        packet->isRouteFlood(),
        reply_data
      );
  } else {
    // OWNER / REGIONS / BASIC-CLOCK are intentionally DIRECT-only, matching
    // simple_repeater. Their request body is {type}{reply_path_len}{reply_path}.
    if (
      packet->isRouteFlood() ||
      len < 6 ||
      !anon_limiter.allow(getRTCClock()->getCurrentTime())
    ) {
      return;
    }

    reply_path_len = data[5];

    if (!mesh::Packet::isValidPathLen(reply_path_len)) {
      return;
    }

    const uint8_t hash_size =
      (reply_path_len >> 6) + 1;
    const uint8_t hop_count =
      reply_path_len & 0x3F;
    const size_t raw_path_len =
      (size_t)hash_size * hop_count;

    if (len < 6 + raw_path_len) {
      return;
    }

    if (raw_path_len > 0) {
      memcpy(
        reply_path,
        &data[6],
        raw_path_len
      );
    }

    memcpy(reply_data, &sender_timestamp, 4);

    const uint32_t now =
      getRTCClock()->getCurrentTime();

    memcpy(&reply_data[4], &now, 4);

    if (request_type == ANON_REQ_TYPE_REGIONS) {
      const int names_len =
        region_map.exportNamesTo(
          (char*)&reply_data[8],
          sizeof(reply_data) - 12,
          REGION_DENY_FLOOD
        );

      reply_len =
        8 + (names_len > 0 ? names_len : 0);
    } else if (request_type == ANON_REQ_TYPE_OWNER) {
      const int written =
        snprintf(
          (char*)&reply_data[8],
          sizeof(reply_data) - 8,
          "%s\n%s",
          _prefs.node_name,
          _prefs.owner_info
        );

      if (written < 0) {
        return;
      }

      const size_t owner_len =
        min(
          (size_t)written,
          sizeof(reply_data) - 9
        );

      reply_len =
        (uint8_t)(8 + owner_len);
    } else if (request_type == ANON_REQ_TYPE_BASIC) {
      reply_data[8] = 0;

      if (!_prefs.isRepeatEn()) {
        reply_data[8] |= 0x80;
      }

      reply_len = 9;
    } else {
      return;
    }
  }

  if (reply_len == 0) {
    return;
  }

  ContactInfo* contact =
    lookupContactByPubKey(
      sender.pub_key,
      PUB_KEY_SIZE
    );

  if (packet->isRouteFlood()) {
    mesh::Packet* path =
      createPathReturn(
        sender,
        secret,
        packet->path,
        packet->path_len,
        PAYLOAD_TYPE_RESPONSE,
        reply_data,
        reply_len
      );

    if (path != NULL) {
      sendRepeaterFloodReply(
        path,
        HIVEFW_REPEATER_RESPONSE_DELAY,
        packet->getPathHashSize()
      );
    }

    return;
  }

  mesh::Packet* reply =
    createDatagram(
      PAYLOAD_TYPE_RESPONSE,
      sender,
      secret,
      reply_data,
      reply_len
    );

  if (reply == NULL) {
    return;
  }

  if (reply_path_len != 0xFF) {
    sendDirect(
      reply,
      reply_path,
      reply_path_len,
      HIVEFW_REPEATER_RESPONSE_DELAY
    );
  } else if (
    contact != NULL &&
    contact->out_path_len != OUT_PATH_UNKNOWN
  ) {
    sendDirect(
      reply,
      contact->out_path,
      contact->out_path_len,
      HIVEFW_REPEATER_RESPONSE_DELAY
    );
  } else {
    sendRepeaterFloodReply(
      reply,
      HIVEFW_REPEATER_RESPONSE_DELAY,
      packet->getPathHashSize()
    );
  }
}


void MyMesh::onControlDataRecv(mesh::Packet *packet) {
  // Node Discovery is exclusively a Repeater feature.
  // Normal Companion control-data handling remains unchanged.
  // ==========================================================
  // DISCOVERY RESPONSE
  // ==========================================================
  // Isto é Discovery ativo e é INDEPENDENTE dos Adverts.
  // As respostas recebidas são guardadas numa lista própria.
  // ==========================================================

  if (packet->payload_len >= 6) {

    const uint8_t type =
      packet->payload[0] & 0xF0;

    if (type == CTL_TYPE_NODE_DISCOVER_RESP) {
      do {

      // Precisamos de ter uma pesquisa ativa.
      if (pending_discover_tag == 0 ||
          (long)(pending_discover_until - millis()) <= 0) {

          break;
      }

      uint32_t tag = 0;

      memcpy(
        &tag,
        &packet->payload[2],
        4
      );

      // A resposta tem de pertencer à pesquisa atual.
      if (tag != pending_discover_tag) {
          break;
      }

      const uint8_t node_type =
        packet->payload[0] & 0x0F;

      // O protocolo permite resposta com prefixo de 8 bytes
      // ou com a chave pública completa.
      const bool prefix_only =
        (packet->payload_len < (6 + PUB_KEY_SIZE));

      const uint8_t key_len =
        prefix_only ? 8 : PUB_KEY_SIZE;

      if (packet->payload_len < (6 + key_len)) {
          break;
      }

      NodeDiscoveryResult result;
      memset(&result, 0, sizeof(result));

      memcpy(
        result.pub_key,
        &packet->payload[6],
        key_len
      );

      result.node_type = node_type;
      result.snr = packet->_snr;
      result.received_timestamp =
        getRTCClock()->getCurrentTime();

      result.name[0] = '\0';

      // Se já conhecemos este nó, atualizamos e colocamo-lo
      // novamente no topo.
      int existing = -1;

      for (int i = 0; i < node_discovery_result_count; i++) {

        const uint8_t compare_len =
          prefix_only ? 8 : PUB_KEY_SIZE;

        if (memcmp(
              node_discovery_results[i].pub_key,
              result.pub_key,
              compare_len
            ) == 0) {

          existing = i;
          break;
        }
      }

      if (existing > 0) {

        for (int i = existing; i > 0; i--) {
          node_discovery_results[i] =
            node_discovery_results[i - 1];
        }

        node_discovery_results[0] = result;

      } else if (existing == 0) {

        node_discovery_results[0] = result;

      } else {

        if (node_discovery_result_count <
            NODE_DISCOVERY_RESULTS_MAX) {

          for (int i = node_discovery_result_count;
               i > 0;
               i--) {

            node_discovery_results[i] =
              node_discovery_results[i - 1];
          }

          node_discovery_results[0] = result;
          node_discovery_result_count++;

        } else {

          for (int i = NODE_DISCOVERY_RESULTS_MAX - 1;
               i > 0;
               i--) {

            node_discovery_results[i] =
              node_discovery_results[i - 1];
          }

          node_discovery_results[0] = result;
        }
      }

#ifdef DISPLAY_CLASS
      if (_ui) {
        _ui->notify(UIEventType::newContactMessage);
      }
#endif

      // IMPORTANTE:
      // não fazer return aqui.
      //
      // A resposta DISCOVER continua a ser tratada pelo HiveFW,
      // mas também tem de seguir o fluxo original do Companion
      // para chegar à aplicação MeshCore.
      } while (false);
    }
  }

  if (_prefs.isRepeatEn() && packet->payload_len >= 1) {
    const uint8_t type = packet->payload[0] & 0xF0;


    if (type == CTL_TYPE_NODE_DISCOVER_REQ &&
        packet->payload_len >= 6 &&
        discover_limiter.allow(getRTCClock()->getCurrentTime())) {

      int i = 1;
      uint8_t filter = packet->payload[i++];

      uint32_t tag;
      memcpy(&tag, &packet->payload[i], 4);
      i += 4;

      uint32_t since = 0;
      if (packet->payload_len >= i + 4) {
        memcpy(&since, &packet->payload[i], 4);
      }

      if ((filter & (1 << ADV_TYPE_REPEATER)) != 0) {

        bool prefix_only = packet->payload[0] & 1;

        uint8_t data[6 + PUB_KEY_SIZE];

        data[0] = CTL_TYPE_NODE_DISCOVER_RESP | ADV_TYPE_REPEATER;
        data[1] = packet->_snr;

        memcpy(&data[2], &tag, 4);
        memcpy(&data[6], self_id.pub_key, PUB_KEY_SIZE);

        auto resp = createControlData(
            data,
            prefix_only ? 6 + 8 : 6 + PUB_KEY_SIZE);

        if (resp) {
          sendZeroHop(resp, getRetransmitDelay(resp) * 4);
        }
      }


    }
  }

  // Existing Companion behaviour: forward all other control data to the app.
  if (packet->payload_len + 4 > sizeof(out_frame)) {
    MESH_DEBUG_PRINTLN("onControlDataRecv(), payload_len too long: %d", packet->payload_len);
    return;
  }

  int i = 0;
  out_frame[i++] = PUSH_CODE_CONTROL_DATA;
  out_frame[i++] = (int8_t)(_radio->getLastSNR() * 4);
  out_frame[i++] = (int8_t)(_radio->getLastRSSI());
  out_frame[i++] = packet->path_len;
  memcpy(&out_frame[i], packet->payload, packet->payload_len);
  i += packet->payload_len;

  if (_serial->isConnected()) {
    _serial->writeFrame(out_frame, i);
  } else {
    MESH_DEBUG_PRINTLN("onControlDataRecv(), data received while app offline");
  }
}

void MyMesh::onRawDataRecv(mesh::Packet *packet) {
  if (packet->payload_len + 4 > sizeof(out_frame)) {
    MESH_DEBUG_PRINTLN("onRawDataRecv(), payload_len too long: %d", packet->payload_len);
    return;
  }
  int i = 0;
  out_frame[i++] = PUSH_CODE_RAW_DATA;
  out_frame[i++] = (int8_t)(_radio->getLastSNR() * 4);
  out_frame[i++] = (int8_t)(_radio->getLastRSSI());
  out_frame[i++] = 0xFF; // reserved (possibly path_len in future)
  memcpy(&out_frame[i], packet->payload, packet->payload_len);
  i += packet->payload_len;

  if (_serial->isConnected()) {
    _serial->writeFrame(out_frame, i);
  } else {
    MESH_DEBUG_PRINTLN("onRawDataRecv(), data received while app offline");
  }
}

void MyMesh::onTraceRecv(mesh::Packet *packet, uint32_t tag, uint32_t auth_code, uint8_t flags,
                         const uint8_t *path_snrs, const uint8_t *path_hashes, uint8_t path_len) {
  uint8_t path_sz = flags & 0x03;  // NEW v1.11+
  if (12 + path_len + (path_len >> path_sz) + 1 > sizeof(out_frame)) {
    MESH_DEBUG_PRINTLN("onTraceRecv(), path_len is too long: %d", (uint32_t)path_len);
    return;
  }
  int i = 0;
  out_frame[i++] = PUSH_CODE_TRACE_DATA;
  out_frame[i++] = 0; // reserved
  out_frame[i++] = path_len;
  out_frame[i++] = flags;
  memcpy(&out_frame[i], &tag, 4);
  i += 4;
  memcpy(&out_frame[i], &auth_code, 4);
  i += 4;
  memcpy(&out_frame[i], path_hashes, path_len);
  i += path_len;

  memcpy(&out_frame[i], path_snrs, path_len >> path_sz);
  i += path_len >> path_sz;
  out_frame[i++] = (int8_t)(packet->getSNR() * 4); // extra/final SNR (to this node)

  if (_serial->isConnected()) {
    _serial->writeFrame(out_frame, i);
  } else {
    MESH_DEBUG_PRINTLN("onTraceRecv(), data received while app offline");
  }
}

uint32_t MyMesh::calcFloodTimeoutMillisFor(uint32_t pkt_airtime_millis) const {
  return SEND_TIMEOUT_BASE_MILLIS + (FLOOD_SEND_TIMEOUT_FACTOR * pkt_airtime_millis);
}
uint32_t MyMesh::calcDirectTimeoutMillisFor(uint32_t pkt_airtime_millis, uint8_t path_len) const {
  uint8_t path_hash_count = path_len & 63;
  return SEND_TIMEOUT_BASE_MILLIS +
         ((pkt_airtime_millis * DIRECT_SEND_PERHOP_FACTOR + DIRECT_SEND_PERHOP_EXTRA_MILLIS) *
          (path_hash_count + 1));
}

void MyMesh::onSendTimeout() {}


// ============================================================
// HiveFW Repeater UI statistics
// ============================================================

int16_t MyMesh::getRepeaterRSSI() const
{
  return (int16_t)radio_driver.getLastRSSI();
}

void MyMesh::markRepeaterNeighboursDirty()
{
  repeater_neighbours_dirty = true;

  // Coalesce frequent zero-hop adverts into one filesystem write.
  // Thirty seconds is short enough to survive normal update/reboot cycles
  // while avoiding a flash write for every received advert.
  if (repeater_neighbours_save_at == 0) {
    repeater_neighbours_save_at = futureMillis(30UL * 1000UL);
  }
}

void MyMesh::persistRepeaterNeighbours()
{
  HiveFWRepeaterNeighbourRecord records[MAX_REPEATER_NEIGHBOURS];
  int count = 0;

  for (int i = 0; i < MAX_REPEATER_NEIGHBOURS; i++) {
    if (repeater_neighbours[i].heard_timestamp == 0) continue;

    HiveFWRepeaterNeighbourRecord& record = records[count++];
    memcpy(
      record.pub_key,
      repeater_neighbours[i].id.pub_key,
      PUB_KEY_SIZE
    );
    record.advert_timestamp = repeater_neighbours[i].advert_timestamp;
    record.heard_timestamp = repeater_neighbours[i].heard_timestamp;
    record.snr = repeater_neighbours[i].snr;
  }

  if (_store->saveRepeaterNeighbours(records, count)) {
    repeater_neighbours_dirty = false;
    repeater_neighbours_save_at = 0;
  } else {
    // Retry later if the filesystem was temporarily unavailable.
    repeater_neighbours_save_at = futureMillis(60UL * 1000UL);
  }
}

void MyMesh::loadRepeaterNeighbours()
{
  HiveFWRepeaterNeighbourRecord records[MAX_REPEATER_NEIGHBOURS];
  const int count = _store->loadRepeaterNeighbours(
    records,
    MAX_REPEATER_NEIGHBOURS
  );

  memset(
    repeater_neighbours,
    0,
    sizeof(repeater_neighbours)
  );

  const uint32_t now = getRTCClock()->getCurrentTime();

  int restored = 0;
  for (int i = 0; i < count && restored < MAX_REPEATER_NEIGHBOURS; i++) {
    // Only restore the same 48-hour history that the HA view exposes.
    // Invalid/future RTC values are kept defensively and will be refreshed
    // by the next real advert from that neighbour.
    if (
      now > records[i].heard_timestamp &&
      (now - records[i].heard_timestamp) > 48UL * 60UL * 60UL
    ) {
      continue;
    }

    RepeaterNeighbour& neighbour = repeater_neighbours[restored++];
    neighbour.id = mesh::Identity(records[i].pub_key);
    neighbour.advert_timestamp = records[i].advert_timestamp;
    neighbour.heard_timestamp = records[i].heard_timestamp;
    neighbour.snr = records[i].snr;
  }

  repeater_neighbours_dirty = false;
  repeater_neighbours_save_at = 0;

  MESH_DEBUG_PRINTLN(
    "HiveFW: restored %d persistent zero-hop neighbours",
    restored
  );
}

int MyMesh::getRepeaterNeighbourCount() const
{
  int count = 0;

  for (int i = 0; i < MAX_REPEATER_NEIGHBOURS; i++) {
    if (repeater_neighbours[i].heard_timestamp > 0) {
      count++;
    }
  }

  return count;
}

const mesh::Identity* MyMesh::getRepeaterNeighbour(int index) const
{
  if (index < 0) {
    return NULL;
  }

  const RepeaterNeighbour* sorted[MAX_REPEATER_NEIGHBOURS];
  int count = 0;

  for (int i = 0; i < MAX_REPEATER_NEIGHBOURS; i++) {
    if (repeater_neighbours[i].heard_timestamp > 0) {
      sorted[count++] = &repeater_neighbours[i];
    }
  }

  if (index >= count) {
    return NULL;
  }

  for (int i = 0; i < count - 1; i++) {
    for (int j = i + 1; j < count; j++) {
      if (sorted[j]->heard_timestamp > sorted[i]->heard_timestamp) {
        const RepeaterNeighbour* tmp = sorted[i];
        sorted[i] = sorted[j];
        sorted[j] = tmp;
      }
    }
  }

  return &sorted[index]->id;
}

int8_t MyMesh::getRepeaterNeighbourSNR(int index) const
{
  if (index < 0) {
    return 0;
  }

  const RepeaterNeighbour* sorted[MAX_REPEATER_NEIGHBOURS];
  int count = 0;

  for (int i = 0; i < MAX_REPEATER_NEIGHBOURS; i++) {
    if (repeater_neighbours[i].heard_timestamp > 0) {
      sorted[count++] = &repeater_neighbours[i];
    }
  }

  if (index >= count) {
    return 0;
  }

  for (int i = 0; i < count - 1; i++) {
    for (int j = i + 1; j < count; j++) {
      if (sorted[j]->heard_timestamp > sorted[i]->heard_timestamp) {
        const RepeaterNeighbour* tmp = sorted[i];
        sorted[i] = sorted[j];
        sorted[j] = tmp;
      }
    }
  }

  return sorted[index]->snr;
}

uint32_t MyMesh::getRepeaterNeighbourHeardAgo(int index) const
{
  if (index < 0) {
    return 0;
  }

  const RepeaterNeighbour* sorted[MAX_REPEATER_NEIGHBOURS];
  int count = 0;

  for (int i = 0; i < MAX_REPEATER_NEIGHBOURS; i++) {
    if (repeater_neighbours[i].heard_timestamp > 0) {
      sorted[count++] = &repeater_neighbours[i];
    }
  }

  if (index >= count) {
    return 0;
  }

  for (int i = 0; i < count - 1; i++) {
    for (int j = i + 1; j < count; j++) {
      if (sorted[j]->heard_timestamp > sorted[i]->heard_timestamp) {
        const RepeaterNeighbour* tmp = sorted[i];
        sorted[i] = sorted[j];
        sorted[j] = tmp;
      }
    }
  }

  uint32_t now = getRTCClock()->getCurrentTime();

  return now - sorted[index]->heard_timestamp;
}

uint32_t MyMesh::getRepeaterTXAirtime() const
{
  return getTotalAirTime();
}

uint32_t MyMesh::getRepeaterMessagesOut() const
{
  return radio_driver.getPacketsSent();
}

uint32_t MyMesh::getRepeaterMessagesIn() const
{
  return radio_driver.getPacketsRecv();
}



// ========================================================================
// HiveFW V1.09beta — REGIÕES / SCOPES
//
// Implementação baseada no RegionMap do simple_repeater oficial.
// Persistência:
//   /regions2
//
// Convenções oficiais:
//   * = wildcard
//   REGION_DENY_FLOOD = flood bloqueado
//   sem flag           = flood permitido
// ========================================================================

int MyMesh::getRepeaterRegionCount() const {

  // incluir sempre o wildcard "*"
  return region_map.getCount() + 1;
}


const RegionEntry*
MyMesh::getRepeaterRegionByIndex(
  int index
) const {

  if (index == 0) {
    return region_map.getRoot();
  }

  index--;

  if (
    index < 0 ||
    index >= region_map.getCount()
  ) {
    return NULL;
  }

  return region_map.getByIdx(index);
}


RegionEntry*
MyMesh::findRepeaterRegion(
  const char* name
) {

  if (
    name == NULL ||
    name[0] == '\0'
  ) {
    return NULL;
  }

  // O CommonCLI oficial aceita prefixos nos comandos
  // region get/remove/home/default/allowf/denyf.
  return region_map.findByNamePrefix(
    name
  );
}


RegionEntry*
MyMesh::getRepeaterHomeRegion() {

  return region_map.getHomeRegion();
}


RegionEntry*
MyMesh::getRepeaterDefaultRegion() {

  return region_map.getDefaultRegion();
}


bool MyMesh::putRepeaterRegion(
  const char* name,
  const char* parent_name
) {

  if (
    name == NULL ||
    name[0] == '\0'
  ) {
    return false;
  }


  RegionEntry* parent =
    &region_map.getWildcard();


  if (
    parent_name != NULL &&
    parent_name[0] != '\0' &&
    strcmp(parent_name, "*") != 0
  ) {

    parent =
      region_map.findByNamePrefix(
        parent_name
      );

    if (parent == NULL) {
      return false;
    }
  }


  RegionEntry* region =
    region_map.putRegion(
      name,
      parent->id
    );

  if (region == NULL) {
    return false;
  }


  // Mesmo comportamento do CommonCLI oficial:
  //
  // "region put" repõe as flags e ativa FLOOD.
  region->flags = 0;


  region_policy_configured = true;

  return true;
}


bool MyMesh::removeRepeaterRegion(
  const char* name
) {

  // MeshCore oficial:
  // region remove usa findByName(), não prefixo.
  RegionEntry* region =
    region_map.findByName(name);

  if (
    region == NULL ||
    region->isWildcard()
  ) {
    return false;
  }


  bool ok =
    region_map.removeRegion(
      *region
    );

  if (ok) {
    region_policy_configured = true;
  }

  return ok;
}


bool MyMesh::setRepeaterRegionFloodAllowed(
  const char* name,
  bool allowed
) {

  RegionEntry* region =
    findRepeaterRegion(name);

  if (region == NULL) {
    return false;
  }


  if (allowed) {

    // region allowf <name>
    region->flags &=
      ~REGION_DENY_FLOOD;

  } else {

    // region denyf <name>
    region->flags |=
      REGION_DENY_FLOOD;
  }


  region_policy_configured = true;

  return true;
}


bool MyMesh::setRepeaterHomeRegion(
  const char* name
) {

  RegionEntry* region =
    findRepeaterRegion(name);

  if (region == NULL) {
    return false;
  }


  // Mesmo comportamento:
  // region home <name>
  region_map.setHomeRegion(
    region
  );

  region_policy_configured = true;

  return true;
}


bool MyMesh::syncDefaultScopeFromRegionMap(
  bool persist
) {

  RegionEntry* region =
    region_map.getDefaultRegion();


  // region default <null>
  if (region == NULL) {

    memset(
      _prefs.default_scope_name,
      0,
      sizeof(_prefs.default_scope_name)
    );

    memset(
      _prefs.default_scope_key,
      0,
      sizeof(_prefs.default_scope_key)
    );


    if (persist) {
      savePrefs();
    }

    return true;
  }


  TransportKey key;

  memset(
    key.key,
    0,
    sizeof(key.key)
  );


  if (
    region_map.getTransportKeysFor(
      *region,
      &key,
      1
    ) <= 0
  ) {

    return false;
  }


  strncpy(
    _prefs.default_scope_name,
    region->name,
    sizeof(_prefs.default_scope_name) - 1
  );

  _prefs.default_scope_name[
    sizeof(_prefs.default_scope_name) - 1
  ] = '\0';


  memcpy(
    _prefs.default_scope_key,
    key.key,
    sizeof(_prefs.default_scope_key)
  );


  if (persist) {
    savePrefs();
  }


  return true;
}


bool MyMesh::setRepeaterDefaultRegion(
  const char* name
) {

  if (
    name == NULL ||
    name[0] == '\0' ||
    strcmp(name, "<null>") == 0
  ) {

    return clearRepeaterDefaultRegion();
  }


  RegionEntry* region =
    region_map.findByNamePrefix(
      name
    );


  // Mesmo comportamento do Repeater oficial:
  //
  // "region default foo"
  // cria automaticamente "foo" na raiz se ainda não existir.
  if (region == NULL) {

    region =
      region_map.putRegion(
        name,
        0
      );

    if (region == NULL) {
      return false;
    }
  }


  // CommonCLI oficial:
  // default repõe as flags da Region.
  region->flags = 0;


  region_map.setDefaultRegion(
    region
  );

  region_policy_configured = true;


  // CommonCLI oficial persiste DEFAULT de forma atómica.
  return saveRepeaterRegions();
}


bool MyMesh::clearRepeaterDefaultRegion() {

  region_map.setDefaultRegion(
    NULL
  );

  region_policy_configured = true;

  return saveRepeaterRegions();
}


bool MyMesh::saveRepeaterRegions() {

  if (
    !_store ||
    !_store->getPrimaryFS()
  ) {
    return false;
  }


  // Mesmo RegionMap / mesma localização do Repeater oficial.
  if (
    !region_map.save(
      _store->getPrimaryFS()
    )
  ) {
    return false;
  }


  region_policy_configured = true;


  // Manter CMD_GET_DEFAULT_FLOOD_SCOPE e a app Companion
  // sincronizados com o DEFAULT oficial de /regions2.
  return syncDefaultScopeFromRegionMap(
    true
  );
}


size_t MyMesh::exportRepeaterRegions(
  char* dest,
  size_t max_len
) {

  return region_map.exportTo(
    dest,
    max_len
  );
}


MyMesh::MyMesh(mesh::Radio &radio, mesh::RNG &rng, mesh::RTCClock &rtc, SimpleMeshTables &tables, DataStore& store, AbstractUITask* ui)
    : BaseChatMesh(radio, *new ArduinoMillis(), rng, rtc, *new StaticPoolPacketManager(16), tables),
      region_map(region_key_store),
      discover_limiter(4, 120),  // simple_repeater: max 4 replies per 120 s
      anon_limiter(4, 180),      // simple_repeater: max 4 anonymous replies per 180 s
      _serial(NULL), telemetry(MAX_PACKET_PAYLOAD - 4), _store(&store), _ui(ui), _iter(0) {
  _iter_started = false;
  _cli_rescue = false;
  offline_queue_len = 0;
  app_target_ver = 0;
  clearPendingReqs();
  pending_discover_tag = 0;
  pending_discover_until = 0;
  pending_node_name_tag = 0;
  node_discovery_result_count = 0;
  memset(node_discovery_results, 0, sizeof(node_discovery_results));
  next_ack_idx = 0;
  sign_data = NULL;
  dirty_contacts_expiry = 0;
  remote_reboot_at = 0;
  next_smart_advert = 0;
  next_neighbor_advert = 0;
  power_state_initialized = false;
  last_external_power = false;
  power_loss_samples = 0;
  next_power_check = 0;
  memset(advert_paths, 0, sizeof(advert_paths));
  memset(repeater_neighbours, 0, sizeof(repeater_neighbours));
  memset(send_scope.key, 0, sizeof(send_scope.key));
  send_unscoped = false;

  recv_pkt_region = NULL;
  region_policy_configured = false;

  // defaults
  _prefs.airtime_factor = 1.0;
  strcpy(_prefs.node_name, "NONAME");
  _prefs.freq = LORA_FREQ;
  _prefs.sf = LORA_SF;
  _prefs.bw = LORA_BW;
  _prefs.cr = LORA_CR;
  _prefs.tx_power_dbm = LORA_TX_POWER;
  _prefs.gps_enabled = 0;       // GPS disabled by default
  _prefs.gps_interval = 0;      // No automatic GPS updates by default
  _prefs.radio_fem_rxgain = 1;
  _prefs.radio_fem_txgain = 0;
  _prefs.rx_delay_base = 0.0f;
  _prefs.tx_delay_factor = 0.5f;
  _prefs.direct_tx_delay_factor = 0.3f;
  _prefs.interference_threshold = 0;
  _prefs.agc_reset_interval = 0;
  _prefs.cad_enabled = 0;
  _prefs.adc_multiplier = 0.0f;
  _prefs.setRepeatEn(false);
#if defined(USE_SX1262) || defined(USE_SX1268)
#ifdef SX126X_RX_BOOSTED_GAIN
  _prefs.rx_boosted_gain = SX126X_RX_BOOSTED_GAIN;
#else
  _prefs.rx_boosted_gain = 1; // enabled by default
#endif
#endif
}

void MyMesh::begin(bool has_display) {
  BaseChatMesh::begin();

  if (!_store->loadMainIdentity(self_id)) {
    self_id = radio_new_identity(); // create new random identity
    int count = 0;
    while (count < 10 && (self_id.pub_key[0] == 0x00 || self_id.pub_key[0] == 0xFF)) { // reserved id hashes
      self_id = radio_new_identity();
      count++;
    }
    _store->saveMainIdentity(self_id);
  }

// if name is provided as a build flag, use that as default node name instead
#ifdef ADVERT_NAME
  strcpy(_prefs.node_name, ADVERT_NAME);
#else
  // use hex of first 4 bytes of identity public key as default node name
  char pub_key_hex[10];
  mesh::Utils::toHex(pub_key_hex, self_id.pub_key, 4);
  strcpy(_prefs.node_name, pub_key_hex);
#endif

  // if build provides default-scope, init with that
#ifdef DEFAULT_FLOOD_SCOPE_NAME
  strcpy(_prefs.default_scope_name, DEFAULT_FLOOD_SCOPE_NAME);
  {
    TransportKeyStore temp;
    TransportKey key;
    temp.getAutoKeyFor(0, "#" DEFAULT_FLOOD_SCOPE_NAME, key);
    memcpy(_prefs.default_scope_key, key.key, sizeof(key.key));
  }
#endif

  // load persisted prefs
  _store->loadPrefs(_prefs);

  // Repeater server ACL is deliberately separate from Companion contacts.
  // It uses the same persistent format as MeshCore simple_repeater.
  repeater_acl.load(_store->getPrimaryFS(), self_id);

  sensors.node_lat = _prefs.node_lat;
  sensors.node_lon = _prefs.node_lon;


  // ========================================================
  // MeshCore simple_repeater — /regions2
  // ========================================================

  region_policy_configured =
    region_map.load(
      _store->getPrimaryFS()
    );

  if (region_policy_configured) {

    // Se /regions2 tiver DEFAULT, ele passa a ser também
    // o default scope apresentado/usado pelo Companion.
    //
    // Não gravamos prefs durante cada boot.
    syncDefaultScopeFromRegionMap(
      false
    );

    MESH_DEBUG_PRINTLN(
      "HiveFW RegionMap: %d regions loaded",
      region_map.getCount()
    );

  } else {

    MESH_DEBUG_PRINTLN(
      "HiveFW RegionMap: no /regions2; legacy forwarding"
    );
  }


  // sanitise bad pref values
  _prefs.rx_delay_base = constrain(_prefs.rx_delay_base, 0, 20.0f);
  _prefs.tx_delay_factor = constrain(_prefs.tx_delay_factor, 0, 2.0f);
  _prefs.direct_tx_delay_factor = constrain(_prefs.direct_tx_delay_factor, 0, 2.0f);
  _prefs.cad_enabled = constrain(_prefs.cad_enabled, 0, 1);
  _prefs.mesh_time_sync = constrain(_prefs.mesh_time_sync, 0, 1);
  _prefs.repeat.power_notify = constrain(_prefs.repeat.power_notify, 0, 1);
  _prefs.adc_multiplier = constrain(_prefs.adc_multiplier, 0.0f, 10.0f);
  _prefs.airtime_factor = constrain(_prefs.airtime_factor, 0, 9.0f);
  _prefs.freq = constrain(_prefs.freq, 150.0f, 2500.0f);
  _prefs.bw = constrain(_prefs.bw, 7.8f, 500.0f);
  _prefs.sf = constrain(_prefs.sf, 5, 12);
  _prefs.cr = constrain(_prefs.cr, 5, 8);
  _prefs.tx_power_dbm = constrain(_prefs.tx_power_dbm, -9, MAX_LORA_TX_POWER);
  _prefs.gps_enabled = constrain(_prefs.gps_enabled, 0, 1);  // Ensure boolean 0 or 1
  _prefs.gps_interval = constrain(_prefs.gps_interval, 0, 86400);  // Max 24 hours
  _prefs.setFloodMax(constrain(_prefs.getFloodMax(), 0, 64));
  _prefs.setFloodMaxUnscoped(constrain(_prefs.getFloodMaxUnscoped(), 0, 64));
  _prefs.setFloodMaxAdvert(constrain(_prefs.getFloodMaxAdvert(), 0, 64));
  _prefs.setLoopDetect(constrain(_prefs.getLoopDetect(), 0, 3));

#ifdef BLE_PIN_CODE // 123456 by default
  if (_prefs.ble_pin == 0) {
#ifdef DISPLAY_CLASS
    if (has_display && BLE_PIN_CODE == 123456) {
      StdRNG rng;
      _active_ble_pin = rng.nextInt(100000, 999999); // random pin each session
    } else {
      _active_ble_pin = BLE_PIN_CODE; // otherwise static pin
    }
#else
    _active_ble_pin = BLE_PIN_CODE; // otherwise static pin
#endif
  } else {
    _active_ble_pin = _prefs.ble_pin;
  }
#else
  _active_ble_pin = 0;
#endif

  resetContacts();
  _store->loadContacts(this);
  bootstrapRTCfromContacts();
  loadRepeaterNeighbours();
  addChannel("Public", PUBLIC_GROUP_PSK); // pre-configure Andy's public channel
  _store->loadChannels(this);

  radio_driver.setParams(_prefs.freq, _prefs.bw, _prefs.sf, _prefs.cr);
  radio_driver.setTxPower(_prefs.tx_power_dbm);
  radio_driver.setRxBoostedGainMode(_prefs.rx_boosted_gain);
  board.setAdcMultiplier(_prefs.adc_multiplier);
  board.setLoRaFemLnaEnabled(_prefs.radio_fem_rxgain);
  board.setLoRaFemPaGainEnabled(_prefs.radio_fem_txgain);

#if defined(NRF52_PLATFORM) || defined(HELTEC_LORA_V3)
  last_external_power = board.isExternalPowered();
  power_state_initialized = true;
  power_loss_samples = 0;
  next_power_check = millis() + 2000UL;
#endif

  MESH_DEBUG_PRINTLN("RX Boosted Gain Mode: %s",
                     radio_driver.getRxBoostedGainMode() ? "Enabled" : "Disabled");
}

const char *MyMesh::getNodeName() {
  return _prefs.node_name;
}
NodePrefs *MyMesh::getNodePrefs() {
  return &_prefs;
}
uint32_t MyMesh::getBLEPin() {
  return _active_ble_pin;
}


bool MyMesh::syncClockFromCompanionTime() {

  if (!_has_companion_time_ref) {
    return false;
  }

  // A referência foi recebida da app em epoch UTC.
  // Compensamos o tempo que passou desde essa receção.
  //
  // A subtração unsigned de millis() também funciona
  // corretamente através do rollover normal de millis().
  uint32_t elapsed_seconds =
    (uint32_t)(
      (millis() - _companion_time_ref_millis)
      / 1000UL
    );

  uint32_t new_time =
    _companion_time_ref +
    elapsed_seconds;

  getRTCClock()->setCurrentTimeFromSource(
    new_time,
    mesh::RTCClock::SyncSource::Companion
  );

  // Recalculate the deterministic daily Smart Advert slot against the
  // corrected RTC instead of keeping a millis() deadline based on old time.
  next_smart_advert = 0;

  return true;
}


// HiveFW Companion + Repeater uses one RF configuration only.
//
// The Repeater role does not own a second/fixed frequency whitelist. Its
// frequency is always the current Companion radio frequency in NodePrefs.
// CMD_GET_ALLOWED_REPEAT_FREQ still exists for Companion/mobile clients, but
// exposes that one mutable frequency as a single-point range.
uint32_t MyMesh::getActiveRepeatFreqKhz() const {
  return (uint32_t)(_prefs.freq * 1000.0f + 0.5f);
}

void MyMesh::startInterface(BaseSerialInterface &serial) {
  _serial = &serial;
  serial.enable();
}

void MyMesh::handleCmdFrame(size_t len) {
  if (cmd_frame[0] == CMD_DEVICE_QUERY && len >= 2) { // sent when app establishes connection
    app_target_ver = cmd_frame[1];                    // which version of protocol does app understand

    int i = 0;
    out_frame[i++] = RESP_CODE_DEVICE_INFO;
    out_frame[i++] = FIRMWARE_VER_CODE;
    out_frame[i++] = MAX_CONTACTS / 2;   // v3+
    out_frame[i++] = MAX_GROUP_CHANNELS; // v3+
    memcpy(&out_frame[i], &_prefs.ble_pin, 4);
    i += 4;
    memset(&out_frame[i], 0, 12);
    strcpy((char *)&out_frame[i], FIRMWARE_BUILD_DATE);
    i += 12;
    StrHelper::strzcpy((char *)&out_frame[i], board.getManufacturerName(), 40);
    i += 40;
    StrHelper::strzcpy((char *)&out_frame[i], FIRMWARE_VERSION, 20);
    i += 20;
    out_frame[i++] = _prefs.isRepeatEn() ? 1 : 0;   // v9+
    out_frame[i++] = _prefs.path_hash_mode;  // v10+
    _serial->writeFrame(out_frame, i);
  } else if (cmd_frame[0] == CMD_APP_START &&
             len >= 8) { // sent when app establishes connection, respond with node ID
    //  cmd_frame[1..7]  reserved future
    char *app_name = (char *)&cmd_frame[8];
    cmd_frame[len] = 0; // make app_name null terminated
    MESH_DEBUG_PRINTLN("App %s connected", app_name);

    _iter_started = false; // stop any left-over ContactsIterator
    int i = 0;
    out_frame[i++] = RESP_CODE_SELF_INFO;
    out_frame[i++] = _prefs.isRepeatEn() ? ADV_TYPE_REPEATER : ADV_TYPE_CHAT; // what this node Advert identifies as (maybe node's pronouns too?? :-)
    out_frame[i++] = _prefs.tx_power_dbm;
    out_frame[i++] = MAX_LORA_TX_POWER;
    memcpy(&out_frame[i], self_id.pub_key, PUB_KEY_SIZE);
    i += PUB_KEY_SIZE;

    int32_t lat, lon;
    lat = (sensors.node_lat * 1000000.0);
    lon = (sensors.node_lon * 1000000.0);
    memcpy(&out_frame[i], &lat, 4);
    i += 4;
    memcpy(&out_frame[i], &lon, 4);
    i += 4;
    out_frame[i++] = _prefs.multi_acks; // new v7+
    out_frame[i++] = _prefs.advert_loc_policy;
    out_frame[i++] = (_prefs.telemetry_mode_env << 4) | (_prefs.telemetry_mode_loc << 2) |
                     (_prefs.telemetry_mode_base); // v5+
    out_frame[i++] = _prefs.manual_add_contacts;

    uint32_t freq = _prefs.freq * 1000;
    memcpy(&out_frame[i], &freq, 4);
    i += 4;
    uint32_t bw = _prefs.bw * 1000;
    memcpy(&out_frame[i], &bw, 4);
    i += 4;
    out_frame[i++] = _prefs.sf;
    out_frame[i++] = _prefs.cr;

    int tlen = strlen(_prefs.node_name); // revisit: UTF_8 ??
    memcpy(&out_frame[i], _prefs.node_name, tlen);
    i += tlen;
    _serial->writeFrame(out_frame, i);
  } else if (cmd_frame[0] == CMD_SEND_TXT_MSG && len >= 14) {
    int i = 1;
    uint8_t txt_type = cmd_frame[i++];
    uint8_t attempt = cmd_frame[i++];
    uint32_t msg_timestamp;
    memcpy(&msg_timestamp, &cmd_frame[i], 4);
    i += 4;
    uint8_t *pub_key_prefix = &cmd_frame[i];
    i += 6;
    ContactInfo *recipient = lookupContactByPubKey(pub_key_prefix, 6);
    if (recipient && (txt_type == TXT_TYPE_PLAIN || txt_type == TXT_TYPE_CLI_DATA)) {
      char *text = (char *)&cmd_frame[i];
      int tlen = len - i;
      uint32_t est_timeout;
      text[tlen] = 0; // ensure null
      int result;
      uint32_t expected_ack;
      if (txt_type == TXT_TYPE_CLI_DATA) {
        msg_timestamp = getRTCClock()->getCurrentTimeUnique(); // Use node's RTC instead of app timestamp to avoid tripping replay protection
        result = sendCommandData(*recipient, msg_timestamp, attempt, text, est_timeout);
        expected_ack = 0; // no Ack expected
      } else {
        result = sendMessage(*recipient, msg_timestamp, attempt, text, expected_ack, est_timeout);
      }
      // TODO: add expected ACK to table
      if (result == MSG_SEND_FAILED) {
        writeErrFrame(ERR_CODE_TABLE_FULL);
      } else {
        if (expected_ack) {
          expected_ack_table[next_ack_idx].msg_sent = _ms->getMillis(); // add to circular table
          expected_ack_table[next_ack_idx].ack = expected_ack;
          expected_ack_table[next_ack_idx].contact = recipient;
          next_ack_idx = (next_ack_idx + 1) % EXPECTED_ACK_TABLE_SIZE;
        }

        out_frame[0] = RESP_CODE_SENT;
        out_frame[1] = (result == MSG_SEND_SENT_FLOOD) ? 1 : 0;
        memcpy(&out_frame[2], &expected_ack, 4);
        memcpy(&out_frame[6], &est_timeout, 4);
        _serial->writeFrame(out_frame, 10);
      }
    } else {
      writeErrFrame(recipient == NULL
                        ? ERR_CODE_NOT_FOUND
                        : ERR_CODE_UNSUPPORTED_CMD); // unknown recipient, or unsupported TXT_TYPE_*
    }
  } else if (cmd_frame[0] == CMD_SEND_CHANNEL_TXT_MSG) { // send GroupChannel text msg
    int i = 1;
    uint8_t txt_type = cmd_frame[i++]; // should be TXT_TYPE_PLAIN
    uint8_t channel_idx = cmd_frame[i++];
    uint32_t msg_timestamp;
    memcpy(&msg_timestamp, &cmd_frame[i], 4);
    i += 4;
    const char *text = (char *)&cmd_frame[i];

    if (txt_type != TXT_TYPE_PLAIN) {
      writeErrFrame(ERR_CODE_UNSUPPORTED_CMD);
    } else {
      ChannelDetails channel;
      bool success = getChannel(channel_idx, channel);
      if (success && sendGroupMessage(msg_timestamp, channel.channel, _prefs.node_name, text, len - i)) {
        writeOKFrame();
      } else {
        writeErrFrame(ERR_CODE_NOT_FOUND); // bad channel_idx
      }
    }
  } else if (cmd_frame[0] == CMD_SEND_CHANNEL_DATA) { // send GroupChannel datagram
    if (len < 4) {
      writeErrFrame(ERR_CODE_ILLEGAL_ARG);
      return;
    }
    int i = 1;
    uint8_t channel_idx = cmd_frame[i++];
    uint8_t path_len = cmd_frame[i++];

    // validate path len, allowing 0xFF for flood
    if (!mesh::Packet::isValidPathLen(path_len) && path_len != OUT_PATH_UNKNOWN) {
      MESH_DEBUG_PRINTLN("CMD_SEND_CHANNEL_DATA invalid path size: %d", path_len);
      writeErrFrame(ERR_CODE_ILLEGAL_ARG);
      return;
    }

    // parse provided path if not flood
    uint8_t path[MAX_PATH_SIZE];
    if (path_len != OUT_PATH_UNKNOWN) {
      i += mesh::Packet::writePath(path, &cmd_frame[i], path_len);
    }

    uint16_t data_type = ((uint16_t)cmd_frame[i]) | (((uint16_t)cmd_frame[i + 1]) << 8);
    i += 2;
    const uint8_t *payload = &cmd_frame[i];
    int payload_len = (len > (size_t)i) ? (int)(len - i) : 0;

    ChannelDetails channel;
    if (!getChannel(channel_idx, channel)) {
      writeErrFrame(ERR_CODE_NOT_FOUND); // bad channel_idx
    } else if (data_type == DATA_TYPE_RESERVED) {
      writeErrFrame(ERR_CODE_ILLEGAL_ARG);
    } else if (payload_len > MAX_CHANNEL_DATA_LENGTH) {
      MESH_DEBUG_PRINTLN("CMD_SEND_CHANNEL_DATA payload too long: %d > %d", payload_len, MAX_CHANNEL_DATA_LENGTH);
      writeErrFrame(ERR_CODE_ILLEGAL_ARG);
    } else if (sendGroupData(channel.channel, path, path_len, data_type, payload, payload_len)) {
      writeOKFrame();
    } else {
      writeErrFrame(ERR_CODE_TABLE_FULL);
    }
  } else if (cmd_frame[0] == CMD_GET_CONTACTS) { // get Contact list
    if (_iter_started) {
      writeErrFrame(ERR_CODE_BAD_STATE); // iterator is currently busy
    } else {
      if (len >= 5) { // has optional 'since' param
        memcpy(&_iter_filter_since, &cmd_frame[1], 4);
      } else {
        _iter_filter_since = 0;
      }

      uint8_t reply[5];
      reply[0] = RESP_CODE_CONTACTS_START;
      uint32_t count = getNumContacts(); // total, NOT filtered count
      memcpy(&reply[1], &count, 4);
      _serial->writeFrame(reply, 5);

      // start iterator
      _iter = startContactsIterator();
      _iter_started = true;
      _most_recent_lastmod = 0;
    }
  } else if (cmd_frame[0] == CMD_SET_ADVERT_NAME && len >= 2) {
    int nlen = len - 1;
    if (nlen > sizeof(_prefs.node_name) - 1) nlen = sizeof(_prefs.node_name) - 1; // max len
    memcpy(_prefs.node_name, &cmd_frame[1], nlen);
    _prefs.node_name[nlen] = 0; // null terminator
    savePrefs();
    writeOKFrame();
  } else if (cmd_frame[0] == CMD_SET_ADVERT_LATLON && len >= 9) {
    int32_t lat, lon, alt = 0;
    memcpy(&lat, &cmd_frame[1], 4);
    memcpy(&lon, &cmd_frame[5], 4);
    if (len >= 13) {
      memcpy(&alt, &cmd_frame[9], 4); // for FUTURE support
    }
    if (lat <= 90 * 1E6 && lat >= -90 * 1E6 && lon <= 180 * 1E6 && lon >= -180 * 1E6) {
      sensors.node_lat = ((double)lat) / 1000000.0;
      sensors.node_lon = ((double)lon) / 1000000.0;
      savePrefs();
      writeOKFrame();
    } else {
      writeErrFrame(ERR_CODE_ILLEGAL_ARG); // invalid geo coordinate
    }
  } else if (cmd_frame[0] == CMD_GET_DEVICE_TIME) {
    uint8_t reply[5];
    reply[0] = RESP_CODE_CURR_TIME;
    uint32_t now = getRTCClock()->getCurrentTime();
    memcpy(&reply[1], &now, 4);
    _serial->writeFrame(reply, 5);
  } else if (cmd_frame[0] == CMD_SET_DEVICE_TIME && len >= 5) {
    uint32_t secs;
    memcpy(&secs, &cmd_frame[1], 4);

    // Guardar a referência enviada pelo Companion/app.
    //
    // Isto permite que o utilizador force manualmente
    // a sincronização no menu COMPANION caso o RTC esteja
    // demasiado adiantado para a janela automática.
    _companion_time_ref =
      secs;

    _companion_time_ref_millis =
      millis();

    _has_companion_time_ref =
      true;

    uint32_t curr =
      getRTCClock()->getCurrentTime();

    // HiveFW:
    // O Companion original apenas aceita acertar o relógio
    // para a frente. Isso pode impedir a sincronização por
    // browser/app quando o RTC está apenas alguns segundos
    // adiantado.
    //
    // Mantemos a proteção contra grandes recuos temporais,
    // mas permitimos correções de manutenção até 60 segundos
    // para trás.
    int64_t offset =
      (int64_t)secs -
      (int64_t)curr;

    if (offset >= -60) {

      getRTCClock()->setCurrentTimeFromSource(
        secs,
        mesh::RTCClock::SyncSource::Companion
      );

      // RTC changes must immediately invalidate the cached millis deadline.
      next_smart_advert = 0;

      writeOKFrame();

    } else {

      writeErrFrame(
        ERR_CODE_ILLEGAL_ARG
      );
    }
  } else if (cmd_frame[0] == CMD_SEND_SELF_ADVERT) {
    mesh::Packet* pkt;
    if (_prefs.advert_loc_policy == ADVERT_LOC_NONE) {
      pkt = createSelfAdvert(_prefs.node_name);
    } else {
      pkt = createSelfAdvert(_prefs.node_name, sensors.node_lat, sensors.node_lon);
    }
    if (pkt) {
      if (len >= 2 && cmd_frame[1] == 1) { // optional param (1 = flood, 0 = zero hop)
        unsigned long delay_millis = 0;
        TransportKey default_scope;
        memcpy(&default_scope.key, _prefs.default_scope_key, sizeof(default_scope.key));
        sendFloodScoped(default_scope, pkt, delay_millis);
      } else {
        sendZeroHop(pkt);
      }
      writeOKFrame();
    } else {
      writeErrFrame(ERR_CODE_TABLE_FULL);
    }
  } else if (cmd_frame[0] == CMD_RESET_PATH && len >= 1 + 32) {
    uint8_t *pub_key = &cmd_frame[1];
    ContactInfo *recipient = lookupContactByPubKey(pub_key, PUB_KEY_SIZE);
    if (recipient) {
      recipient->out_path_len = OUT_PATH_UNKNOWN;
      // recipient->lastmod = ??   shouldn't be needed, app already has this version of contact
      dirty_contacts_expiry = futureMillis(LAZY_CONTACTS_WRITE_DELAY);
      writeOKFrame();
    } else {
      writeErrFrame(ERR_CODE_NOT_FOUND); // unknown contact
    }
  } else if (cmd_frame[0] == CMD_ADD_UPDATE_CONTACT && len >= 1 + 32 + 2 + 1) {
    uint8_t *pub_key = &cmd_frame[1];
    ContactInfo *recipient = lookupContactByPubKey(pub_key, PUB_KEY_SIZE);
    uint32_t last_mod = getRTCClock()->getCurrentTime();  // fallback value if not present in cmd_frame
    if (recipient) {
      updateContactFromFrame(*recipient, last_mod, cmd_frame, len);
      recipient->lastmod = last_mod;
      dirty_contacts_expiry = futureMillis(LAZY_CONTACTS_WRITE_DELAY);
      writeOKFrame();
    } else {
      ContactInfo contact;
      updateContactFromFrame(contact, last_mod, cmd_frame, len);
      contact.lastmod = last_mod;
      contact.sync_since = 0;
      if (addContact(contact)) {
        dirty_contacts_expiry = futureMillis(LAZY_CONTACTS_WRITE_DELAY);
        writeOKFrame();
      } else {
        writeErrFrame(ERR_CODE_TABLE_FULL);
      }
    }
  } else if (cmd_frame[0] == CMD_REMOVE_CONTACT) {
    uint8_t *pub_key = &cmd_frame[1];
    ContactInfo *recipient = lookupContactByPubKey(pub_key, PUB_KEY_SIZE);
    if (recipient && removeContact(*recipient)) {
      _store->deleteBlobByKey(pub_key, PUB_KEY_SIZE);
      dirty_contacts_expiry = futureMillis(LAZY_CONTACTS_WRITE_DELAY);
      writeOKFrame();
    } else {
      writeErrFrame(ERR_CODE_NOT_FOUND); // not found, or unable to remove
    }
  } else if (cmd_frame[0] == CMD_SHARE_CONTACT) {
    uint8_t *pub_key = &cmd_frame[1];
    ContactInfo *recipient = lookupContactByPubKey(pub_key, PUB_KEY_SIZE);
    if (recipient) {
      if (shareContactZeroHop(*recipient)) {
        writeOKFrame();
      } else {
        writeErrFrame(ERR_CODE_TABLE_FULL); // unable to send
      }
    } else {
      writeErrFrame(ERR_CODE_NOT_FOUND);
    }
  } else if (cmd_frame[0] == CMD_GET_CONTACT_BY_KEY) {
    uint8_t *pub_key = &cmd_frame[1];
    ContactInfo *contact = lookupContactByPubKey(pub_key, PUB_KEY_SIZE);
    if (contact) {
      writeContactRespFrame(RESP_CODE_CONTACT, *contact);
    } else {
      writeErrFrame(ERR_CODE_NOT_FOUND); // not found
    }
  } else if (cmd_frame[0] == CMD_EXPORT_CONTACT) {
    if (len < 1 + PUB_KEY_SIZE) {
      // export SELF
      mesh::Packet* pkt;
      if (_prefs.advert_loc_policy == ADVERT_LOC_NONE) {
        pkt = createSelfAdvert(_prefs.node_name);
      } else {
        pkt = createSelfAdvert(_prefs.node_name, sensors.node_lat, sensors.node_lon);
      }
      if (pkt) {
        pkt->header |= ROUTE_TYPE_FLOOD; // would normally be sent in this mode

        out_frame[0] = RESP_CODE_EXPORT_CONTACT;
        uint8_t out_len = pkt->writeTo(&out_frame[1]);
        releasePacket(pkt); // undo the obtainNewPacket()
        _serial->writeFrame(out_frame, out_len + 1);
      } else {
        writeErrFrame(ERR_CODE_TABLE_FULL); // Error
      }
    } else {
      uint8_t *pub_key = &cmd_frame[1];
      ContactInfo *recipient = lookupContactByPubKey(pub_key, PUB_KEY_SIZE);
      uint8_t out_len;
      if (recipient && (out_len = exportContact(*recipient, &out_frame[1])) > 0) {
        out_frame[0] = RESP_CODE_EXPORT_CONTACT;
        _serial->writeFrame(out_frame, out_len + 1);
      } else {
        writeErrFrame(ERR_CODE_NOT_FOUND); // not found
      }
    }
  } else if (cmd_frame[0] == CMD_IMPORT_CONTACT && len > 2 + 32 + 64) {
    if (importContact(&cmd_frame[1], len - 1)) {
      writeOKFrame();
    } else {
      writeErrFrame(ERR_CODE_ILLEGAL_ARG);
    }
  } else if (cmd_frame[0] == CMD_SYNC_NEXT_MESSAGE) {
    int out_len;
    if ((out_len = getFromOfflineQueue(out_frame)) > 0) {
      _serial->writeFrame(out_frame, out_len);
#ifdef DISPLAY_CLASS
      if (_ui) _ui->msgRead(offline_queue_len);
#endif
    } else {
      out_frame[0] = RESP_CODE_NO_MORE_MESSAGES;
      _serial->writeFrame(out_frame, 1);
    }
  } else if (cmd_frame[0] == CMD_SET_RADIO_PARAMS) {
    int i = 1;
    uint32_t freq;
    memcpy(&freq, &cmd_frame[i], 4);
    i += 4;
    uint32_t bw;
    memcpy(&bw, &cmd_frame[i], 4);
    i += 4;
    uint8_t sf = cmd_frame[i++];
    uint8_t cr = cmd_frame[i++];
    uint8_t repeat = 0;  // default - false
    if (len > i) {
      repeat = cmd_frame[i++];   // FIRMWARE_VER_CODE  9+
    }

    if (freq >= 150000 && freq <= 2500000 && sf >= 5 && sf <= 12 && cr >= 5 && cr <= 8 && bw >= 7000 &&
        bw <= 500000) {
      _prefs.sf = sf;
      _prefs.cr = cr;
      _prefs.freq = (float)freq / 1000.0;
      _prefs.bw = (float)bw / 1000.0;
      _prefs.setRepeatEn(repeat != 0);
      next_neighbor_advert = 0;
      savePrefs();

      radio_driver.setParams(_prefs.freq, _prefs.bw, _prefs.sf, _prefs.cr);
      MESH_DEBUG_PRINTLN("OK: CMD_SET_RADIO_PARAMS: f=%d, bw=%d, sf=%d, cr=%d", freq, bw, (uint32_t)sf,
                         (uint32_t)cr);

      writeOKFrame();
    } else {
      MESH_DEBUG_PRINTLN("Error: CMD_SET_RADIO_PARAMS: f=%d, bw=%d, sf=%d, cr=%d", freq, bw, (uint32_t)sf,
                         (uint32_t)cr);
      writeErrFrame(ERR_CODE_ILLEGAL_ARG);
    }
  } else if (cmd_frame[0] == CMD_SET_RADIO_TX_POWER) {
    int8_t power = (int8_t)cmd_frame[1];
    if (power < -9 || power > MAX_LORA_TX_POWER) {
      writeErrFrame(ERR_CODE_ILLEGAL_ARG);
    } else {
      _prefs.tx_power_dbm = power;
      savePrefs();
      radio_driver.setTxPower(_prefs.tx_power_dbm);
      writeOKFrame();
    }
  } else if (cmd_frame[0] == CMD_SET_TUNING_PARAMS) {
    int i = 1;
    uint32_t rx, af;
    memcpy(&rx, &cmd_frame[i], 4);
    i += 4;
    memcpy(&af, &cmd_frame[i], 4);
    i += 4;
    _prefs.rx_delay_base = ((float)rx) / 1000.0f;
    _prefs.airtime_factor = ((float)af) / 1000.0f;
    savePrefs();
    writeOKFrame();
  } else if (cmd_frame[0] == CMD_GET_TUNING_PARAMS) {
    uint32_t rx = _prefs.rx_delay_base * 1000, af = _prefs.airtime_factor * 1000;
    int i = 0;
    out_frame[i++] = RESP_CODE_TUNING_PARAMS;
    memcpy(&out_frame[i], &rx, 4); i += 4;
    memcpy(&out_frame[i], &af, 4); i += 4;
    _serial->writeFrame(out_frame, i);
  } else if (cmd_frame[0] == CMD_SET_OTHER_PARAMS) {
    _prefs.manual_add_contacts = cmd_frame[1];
    if (len >= 3) {
      _prefs.telemetry_mode_base = cmd_frame[2] & 0x03; // v5+
      _prefs.telemetry_mode_loc = (cmd_frame[2] >> 2) & 0x03;
      _prefs.telemetry_mode_env = (cmd_frame[2] >> 4) & 0x03;

      if (len >= 4) {
        _prefs.advert_loc_policy = cmd_frame[3];
        if (len >= 5) {
          _prefs.multi_acks = cmd_frame[4];
        }
      }
    }
    savePrefs();
    writeOKFrame();
  } else if (cmd_frame[0] == CMD_SET_PATH_HASH_MODE && cmd_frame[1] == 0 && len >= 3) {
    if (cmd_frame[2] >= 3) {
      writeErrFrame(ERR_CODE_ILLEGAL_ARG);
    } else {
      _prefs.path_hash_mode = cmd_frame[2];
      savePrefs();
      writeOKFrame();
    }
  } else if (cmd_frame[0] == CMD_REBOOT && memcmp(&cmd_frame[1], "reboot", 6) == 0) {
    if (dirty_contacts_expiry) { // is there are pending dirty contacts write needed?
      saveContacts();
    }
    board.reboot();
  } else if (cmd_frame[0] == CMD_GET_BATT_AND_STORAGE) {
    uint8_t reply[11];
    int i = 0;
    reply[i++] = RESP_CODE_BATT_AND_STORAGE;
    uint16_t battery_millivolts = board.getBattMilliVolts();
    uint32_t used = _store->getStorageUsedKb();
    uint32_t total = _store->getStorageTotalKb();
    memcpy(&reply[i], &battery_millivolts, 2); i += 2;
    memcpy(&reply[i], &used, 4); i += 4;
    memcpy(&reply[i], &total, 4); i += 4;
    _serial->writeFrame(reply, i);
  } else if (cmd_frame[0] == CMD_EXPORT_PRIVATE_KEY) {
#if ENABLE_PRIVATE_KEY_EXPORT
    uint8_t reply[65];
    reply[0] = RESP_CODE_PRIVATE_KEY;
    self_id.writeTo(&reply[1], 64);
    _serial->writeFrame(reply, 65);
#else
    writeDisabledFrame();
#endif
  } else if (cmd_frame[0] == CMD_IMPORT_PRIVATE_KEY && len >= 65) {
#if ENABLE_PRIVATE_KEY_IMPORT
    if (!mesh::LocalIdentity::validatePrivateKey(&cmd_frame[1])) {
        writeErrFrame(ERR_CODE_ILLEGAL_ARG); // invalid key
    } else {
        mesh::LocalIdentity identity;
        identity.readFrom(&cmd_frame[1], 64);
        if (_store->saveMainIdentity(identity)) {
          self_id = identity;
          writeOKFrame();
          // re-load contacts, to invalidate ecdh shared_secrets
          resetContacts();
          _store->loadContacts(this);
        } else {
          writeErrFrame(ERR_CODE_FILE_IO_ERROR);
        }
    }
#else
    writeDisabledFrame();
#endif
  } else if (cmd_frame[0] == CMD_SEND_RAW_DATA && len >= 6) {
    int i = 1;
    int8_t path_len = cmd_frame[i++];
    if (path_len >= 0 && i + path_len + 4 <= len) { // minimum 4 byte payload
      uint8_t *path = &cmd_frame[i];
      i += path_len;
      auto pkt = createRawData(&cmd_frame[i], len - i);
      if (pkt) {
        sendDirect(pkt, path, path_len);
        writeOKFrame();
      } else {
        writeErrFrame(ERR_CODE_TABLE_FULL);
      }
    } else {
      writeErrFrame(ERR_CODE_UNSUPPORTED_CMD); // flood, not supported (yet)
    }
  } else if (cmd_frame[0] == CMD_SEND_LOGIN && len >= 1 + PUB_KEY_SIZE) {
    uint8_t *pub_key = &cmd_frame[1];
    ContactInfo *recipient = lookupContactByPubKey(pub_key, PUB_KEY_SIZE);
    char *password = (char *)&cmd_frame[1 + PUB_KEY_SIZE];
    cmd_frame[len] = 0; // ensure null terminator in password
    if (recipient) {
      uint32_t est_timeout;
      int result = sendLogin(*recipient, password, est_timeout);
      if (result == MSG_SEND_FAILED) {
        writeErrFrame(ERR_CODE_TABLE_FULL);
      } else {
        clearPendingReqs();
        memcpy(&pending_login, recipient->id.pub_key, 4); // match this to onContactResponse()
        out_frame[0] = RESP_CODE_SENT;
        out_frame[1] = (result == MSG_SEND_SENT_FLOOD) ? 1 : 0;
        memcpy(&out_frame[2], &pending_login, 4);
        memcpy(&out_frame[6], &est_timeout, 4);
        _serial->writeFrame(out_frame, 10);
      }
    } else {
      writeErrFrame(ERR_CODE_NOT_FOUND); // contact not found
    }
  } else if (cmd_frame[0] == CMD_SEND_ANON_REQ && len > 1 + PUB_KEY_SIZE) {
    uint8_t *pub_key = &cmd_frame[1];
    ContactInfo *recipient = lookupContactByPubKey(pub_key, PUB_KEY_SIZE);
    ContactInfo anon;
    if (recipient == NULL) { // FIRMWARE_VER_CODE 13+,  allow non-contact requests
      memset(&anon, 0, sizeof(anon));
      memcpy(anon.id.pub_key, pub_key, PUB_KEY_SIZE);
      anon.out_path_len = 0;   // default to zero-hop direct
      anon.type = ADV_TYPE_NONE;  // unknown
      anon.lastmod = getRTCClock()->getCurrentTime();

      if (addContact(anon)) recipient = &anon;
    }
    uint8_t *data = &cmd_frame[1 + PUB_KEY_SIZE];
    if (recipient) {
      uint32_t tag, est_timeout;
      int result = sendAnonReq(*recipient, data, len - (1 + PUB_KEY_SIZE), tag, est_timeout);
      if (result == MSG_SEND_FAILED) {
        writeErrFrame(ERR_CODE_TABLE_FULL);
      } else {
        clearPendingReqs();
        pending_req = tag; // match this to onContactResponse()
        out_frame[0] = RESP_CODE_SENT;
        out_frame[1] = (result == MSG_SEND_SENT_FLOOD) ? 1 : 0;
        memcpy(&out_frame[2], &tag, 4);
        memcpy(&out_frame[6], &est_timeout, 4);
        _serial->writeFrame(out_frame, 10);
      }
    } else {
      writeErrFrame(ERR_CODE_TABLE_FULL); // contacts full
    }
  } else if (cmd_frame[0] == CMD_SEND_STATUS_REQ && len >= 1 + PUB_KEY_SIZE) {
    uint8_t *pub_key = &cmd_frame[1];
    ContactInfo *recipient = lookupContactByPubKey(pub_key, PUB_KEY_SIZE);
    if (recipient) {
      uint32_t tag, est_timeout;
      int result = sendRequest(*recipient, REQ_TYPE_GET_STATUS, tag, est_timeout);
      if (result == MSG_SEND_FAILED) {
        writeErrFrame(ERR_CODE_TABLE_FULL);
      } else {
        clearPendingReqs();
        // FUTURE:  pending_status = tag;  // match this in onContactResponse()
        memcpy(&pending_status, recipient->id.pub_key, 4); // legacy matching scheme
        out_frame[0] = RESP_CODE_SENT;
        out_frame[1] = (result == MSG_SEND_SENT_FLOOD) ? 1 : 0;
        memcpy(&out_frame[2], &tag, 4);
        memcpy(&out_frame[6], &est_timeout, 4);
        _serial->writeFrame(out_frame, 10);
      }
    } else {
      writeErrFrame(ERR_CODE_NOT_FOUND); // contact not found
    }
  } else if (cmd_frame[0] == CMD_SEND_PATH_DISCOVERY_REQ && cmd_frame[1] == 0 && len >= 2 + PUB_KEY_SIZE) {
    uint8_t *pub_key = &cmd_frame[2];
    ContactInfo *recipient = lookupContactByPubKey(pub_key, PUB_KEY_SIZE);
    if (recipient) {
      uint32_t tag, est_timeout;
      // 'Path Discovery' is just a special case of flood + Telemetry req
      uint8_t req_data[9];
      req_data[0] = REQ_TYPE_GET_TELEMETRY_DATA;
      req_data[1] = ~(TELEM_PERM_BASE);  // NEW: inverse permissions mask (ie. we only want BASE telemetry)
      memset(&req_data[2], 0, 3);  // reserved
      getRNG()->random(&req_data[5], 4);   // random blob to help make packet-hash unique
      auto save = recipient->out_path_len;    // temporarily force sendRequest() to flood
      recipient->out_path_len = OUT_PATH_UNKNOWN;
      int result = sendRequest(*recipient, req_data, sizeof(req_data), tag, est_timeout);
      recipient->out_path_len = save;
      if (result == MSG_SEND_FAILED) {
        writeErrFrame(ERR_CODE_TABLE_FULL);
      } else {
        clearPendingReqs();
        pending_discovery = tag; // match this in onContactResponse()
        out_frame[0] = RESP_CODE_SENT;
        out_frame[1] = (result == MSG_SEND_SENT_FLOOD) ? 1 : 0;
        memcpy(&out_frame[2], &tag, 4);
        memcpy(&out_frame[6], &est_timeout, 4);
        _serial->writeFrame(out_frame, 10);
      }
    } else {
      writeErrFrame(ERR_CODE_NOT_FOUND); // contact not found
    }
  } else if (cmd_frame[0] == CMD_SEND_TELEMETRY_REQ && len >= 4 + PUB_KEY_SIZE) {  // can deprecate, in favour of CMD_SEND_BINARY_REQ
    uint8_t *pub_key = &cmd_frame[4];
    ContactInfo *recipient = lookupContactByPubKey(pub_key, PUB_KEY_SIZE);
    if (recipient) {
      uint32_t tag, est_timeout;
      int result = sendRequest(*recipient, REQ_TYPE_GET_TELEMETRY_DATA, tag, est_timeout);
      if (result == MSG_SEND_FAILED) {
        writeErrFrame(ERR_CODE_TABLE_FULL);
      } else {
        clearPendingReqs();
        pending_telemetry = tag; // match this in onContactResponse()
        out_frame[0] = RESP_CODE_SENT;
        out_frame[1] = (result == MSG_SEND_SENT_FLOOD) ? 1 : 0;
        memcpy(&out_frame[2], &tag, 4);
        memcpy(&out_frame[6], &est_timeout, 4);
        _serial->writeFrame(out_frame, 10);
      }
    } else {
      writeErrFrame(ERR_CODE_NOT_FOUND); // contact not found
    }
  } else if (cmd_frame[0] == CMD_SEND_TELEMETRY_REQ && len == 4) {  // 'self' telemetry request
    telemetry.reset();
    telemetry.addVoltage(TELEM_CHANNEL_SELF, (float)board.getBattMilliVolts() / 1000.0f);
    float temperature = board.getMCUTemperature();
    if(!isnan(temperature)) { // Supported boards with built-in temperature sensor. ESP32-C3 may return NAN
      telemetry.addTemperature(TELEM_CHANNEL_SELF, temperature); // Built-in MCU Temperature
    }

    // query other sensors -- target specific
    sensors.querySensors(0xFF, telemetry);

    int i = 0;
    out_frame[i++] = PUSH_CODE_TELEMETRY_RESPONSE;
    out_frame[i++] = 0; // reserved
    memcpy(&out_frame[i], self_id.pub_key, 6);
    i += 6; // pub_key_prefix
    uint8_t tlen = telemetry.getSize();
    memcpy(&out_frame[i], telemetry.getBuffer(), tlen);
    i += tlen;
    _serial->writeFrame(out_frame, i);
  } else if (cmd_frame[0] == CMD_SEND_BINARY_REQ && len >= 2 + PUB_KEY_SIZE) {
    uint8_t *pub_key = &cmd_frame[1];
    ContactInfo *recipient = lookupContactByPubKey(pub_key, PUB_KEY_SIZE);
    if (recipient) {
      uint8_t *req_data = &cmd_frame[1 + PUB_KEY_SIZE];
      uint32_t tag, est_timeout;
      int result = sendRequest(*recipient, req_data, len - (1 + PUB_KEY_SIZE), tag, est_timeout);
      if (result == MSG_SEND_FAILED) {
        writeErrFrame(ERR_CODE_TABLE_FULL);
      } else {
        clearPendingReqs();
        pending_req = tag; // match this in onContactResponse()
        out_frame[0] = RESP_CODE_SENT;
        out_frame[1] = (result == MSG_SEND_SENT_FLOOD) ? 1 : 0;
        memcpy(&out_frame[2], &tag, 4);
        memcpy(&out_frame[6], &est_timeout, 4);
        _serial->writeFrame(out_frame, 10);
      }
    } else {
      writeErrFrame(ERR_CODE_NOT_FOUND); // contact not found
    }
  } else if (cmd_frame[0] == CMD_HAS_CONNECTION && len >= 1 + PUB_KEY_SIZE) {
    uint8_t *pub_key = &cmd_frame[1];
    if (hasConnectionTo(pub_key)) {
      writeOKFrame();
    } else {
      writeErrFrame(ERR_CODE_NOT_FOUND);
    }
  } else if (cmd_frame[0] == CMD_LOGOUT && len >= 1 + PUB_KEY_SIZE) {
    uint8_t *pub_key = &cmd_frame[1];
    stopConnection(pub_key);
    writeOKFrame();
  } else if (cmd_frame[0] == CMD_GET_CHANNEL && len >= 2) {
    uint8_t channel_idx = cmd_frame[1];
    ChannelDetails channel;
    if (getChannel(channel_idx, channel)) {
      int i = 0;
      out_frame[i++] = RESP_CODE_CHANNEL_INFO;
      out_frame[i++] = channel_idx;
      strcpy((char *)&out_frame[i], channel.name);
      i += 32;
      memcpy(&out_frame[i], channel.channel.secret, 16);
      i += 16; // NOTE: only 128-bit supported
      _serial->writeFrame(out_frame, i);
    } else {
      writeErrFrame(ERR_CODE_NOT_FOUND);
    }
  } else if (cmd_frame[0] == CMD_SET_CHANNEL && len >= 2 + 32 + 32) {
    writeErrFrame(ERR_CODE_UNSUPPORTED_CMD); // not supported (yet)
  } else if (cmd_frame[0] == CMD_SET_CHANNEL && len >= 2 + 32 + 16) {
    uint8_t channel_idx = cmd_frame[1];
    ChannelDetails channel;
    StrHelper::strncpy(channel.name, (char *)&cmd_frame[2], 32);
    memset(channel.channel.secret, 0, sizeof(channel.channel.secret));
    memcpy(channel.channel.secret, &cmd_frame[2 + 32], 16); // NOTE: only 128-bit supported
    if (setChannel(channel_idx, channel)) {
      saveChannels();
      writeOKFrame();
    } else {
      writeErrFrame(ERR_CODE_NOT_FOUND); // bad channel_idx
    }
  } else if (cmd_frame[0] == CMD_SIGN_START) {
    out_frame[0] = RESP_CODE_SIGN_START;
    out_frame[1] = 0; // reserved
    uint32_t len = MAX_SIGN_DATA_LEN;
    memcpy(&out_frame[2], &len, 4);
    _serial->writeFrame(out_frame, 6);

    if (sign_data) {
      free(sign_data);
    }
    sign_data = (uint8_t *)malloc(MAX_SIGN_DATA_LEN);
    sign_data_len = 0;
  } else if (cmd_frame[0] == CMD_SIGN_DATA && len > 1) {
    if (sign_data == NULL || sign_data_len + (len - 1) > MAX_SIGN_DATA_LEN) {
      writeErrFrame(sign_data == NULL ? ERR_CODE_BAD_STATE : ERR_CODE_TABLE_FULL); // error: too long
    } else {
      memcpy(&sign_data[sign_data_len], &cmd_frame[1], len - 1);
      sign_data_len += (len - 1);
      writeOKFrame();
    }
  } else if (cmd_frame[0] == CMD_SIGN_FINISH) {
    if (sign_data) {
      self_id.sign(&out_frame[1], sign_data, sign_data_len);

      free(sign_data); // don't need sign_data now
      sign_data = NULL;

      out_frame[0] = RESP_CODE_SIGNATURE;
      _serial->writeFrame(out_frame, 1 + SIGNATURE_SIZE);
    } else {
      writeErrFrame(ERR_CODE_BAD_STATE);
    }
  } else if (cmd_frame[0] == CMD_SEND_TRACE_PATH && len > 10 && len - 10 < MAX_PACKET_PAYLOAD-5) {
    uint8_t path_len = len - 10;
    uint8_t flags = cmd_frame[9];
    uint8_t path_sz = flags & 0x03;  // NEW v1.11+
    if ((path_len >> path_sz) > MAX_PATH_SIZE || (path_len % (1 << path_sz)) != 0) { // make sure is multiple of path_sz
      writeErrFrame(ERR_CODE_ILLEGAL_ARG);
    } else {
      uint32_t tag, auth;
      memcpy(&tag, &cmd_frame[1], 4);
      memcpy(&auth, &cmd_frame[5], 4);
      auto pkt = createTrace(tag, auth, flags);
      if (pkt) {
        sendDirect(pkt, &cmd_frame[10], path_len);

        uint32_t t = _radio->getEstAirtimeFor(pkt->payload_len + pkt->path_len + 2);
        uint32_t est_timeout = calcDirectTimeoutMillisFor(t, path_len >> path_sz);

        out_frame[0] = RESP_CODE_SENT;
        out_frame[1] = 0;
        memcpy(&out_frame[2], &tag, 4);
        memcpy(&out_frame[6], &est_timeout, 4);
        _serial->writeFrame(out_frame, 10);
      } else {
        writeErrFrame(ERR_CODE_TABLE_FULL);
      }
    }
  } else if (cmd_frame[0] == CMD_SET_DEVICE_PIN && len >= 5) {

    // get pin from command frame
    uint32_t pin;
    memcpy(&pin, &cmd_frame[1], 4);

    // ensure pin is zero, or a valid 6 digit pin
    if (pin == 0 || (pin >= 100000 && pin <= 999999)) {
      _prefs.ble_pin = pin;
      savePrefs();
      writeOKFrame();
    } else {
      writeErrFrame(ERR_CODE_ILLEGAL_ARG);
    }
  } else if (cmd_frame[0] == CMD_GET_CUSTOM_VARS) {
    out_frame[0] = RESP_CODE_CUSTOM_VARS;
    char *dp = (char *)&out_frame[1];
    char *custom_start = dp;

    // HiveFW settings are appended first so critical Companion controls never
    // disappear when sensor-specific custom vars approach the 140-byte frame
    // budget.
    auto appendCustomVar = [&](const char *name, const char *value) {
      const size_t needed =
        strlen(name) + 1 + strlen(value) + (dp != custom_start ? 1 : 0);

      if ((size_t)(dp - custom_start) + needed > 140) {
        return false;
      }

      if (dp != custom_start) {
        *dp++ = ',';
      }

      strcpy(dp, name);
      dp += strlen(name);
      *dp++ = ':';
      strcpy(dp, value);
      dp += strlen(value);
      return true;
    };

    appendCustomVar(
      "auto_advert",
      _prefs.isAutoAdvertEn() ? "1" : "0"
    );

    char neighbor_adv_value[4];
    snprintf(
      neighbor_adv_value,
      sizeof(neighbor_adv_value),
      "%u",
      (unsigned)_prefs.getNeighborAdvertIntervalMinutes()
    );
    appendCustomVar("nbr_adv", neighbor_adv_value);
    appendCustomVar(
      "mt",
      _prefs.mesh_time_sync ? "1" : "0"
    );

#if defined(NRF52_PLATFORM) || defined(HELTEC_LORA_V3)
    // Keep the 140-byte custom-var frame compact. pwr=<notify><external>,
    // e.g. pwr:11 means notification ON + external power present.
    // The write key remains power_notify for a descriptive control surface.
    char power_state[3];
    snprintf(
      power_state,
      sizeof(power_state),
      "%u%u",
      _prefs.isPowerNotifyEn() ? 1U : 0U,
      board.isExternalPowered() ? 1U : 0U
    );
    appendCustomVar("pwr", power_state);
#else
    appendCustomVar(
      "power_notify",
      _prefs.isPowerNotifyEn() ? "1" : "0"
    );
#endif

    float duty_af = _prefs.airtime_factor;
    if (duty_af < 1.0f) duty_af = 1.0f;
    if (duty_af > 9.0f) duty_af = 9.0f;

    int duty_percent =
      (int)(100.0f / (1.0f + duty_af) + 0.5f);

    if (duty_percent < 10) duty_percent = 10;
    if (duty_percent > 50) duty_percent = 50;

    char duty_value[4];
    snprintf(duty_value, sizeof(duty_value), "%d", duty_percent);
    appendCustomVar("duty_cycle", duty_value);

    // The local UI persists a channel hash; clients use channel_idx. Resolve
    // the current slot dynamically so changes made on the display are visible
    // immediately to Home Assistant.
    int apps_channel_idx = -1;
    bool apps_channel_configured = false;
    for (int i = 0; i < PATH_HASH_SIZE; i++) {
      if (_prefs.apps_channel_hash[i] != 0) {
        apps_channel_configured = true;
        break;
      }
    }

    if (apps_channel_configured) {
#ifdef MAX_GROUP_CHANNELS
      for (int i = 0; i < MAX_GROUP_CHANNELS; i++) {
        ChannelDetails channel;
        if (
          getChannel(i, channel) &&
          channel.name[0] != '\0' &&
          memcmp(
            channel.channel.hash,
            _prefs.apps_channel_hash,
            PATH_HASH_SIZE
          ) == 0
        ) {
          apps_channel_idx = i;
          break;
        }
      }
#endif
    }

    char apps_channel_value[5];
    snprintf(
      apps_channel_value,
      sizeof(apps_channel_value),
      "%d",
      apps_channel_idx
    );
    appendCustomVar("apps_channel", apps_channel_value);

    // Compact Repeater routing configuration:
    // flood_max / flood_max_unscoped / flood_max_advert / loop_detect
    // Kept compact because the Companion custom-var response has a 140-byte
    // payload budget shared with Smart Advert and CAD diagnostics.
    char route_value[20];
    snprintf(
      route_value,
      sizeof(route_value),
      "%u/%u/%u/%u",
      (unsigned)_prefs.getFloodMax(),
      (unsigned)_prefs.getFloodMaxUnscoped(),
      (unsigned)_prefs.getFloodMaxAdvert(),
      (unsigned)_prefs.getLoopDetect()
    );
    appendCustomVar("route", route_value);

    const uint32_t smart_adv_now = getRTCClock()->getCurrentTime();
    const uint32_t smart_adv_last = loadPersistedAutoAdvertEpoch();
    const uint32_t smart_adv_next =
      getNextSmartAdvertEpoch(smart_adv_now, smart_adv_last);

    // Compact Smart Advert diagnostics:
    // sent_this_boot / last_actual_auto_advert_epoch / next_expected_epoch
    char auto_adv_diag_value[48];
    snprintf(
      auto_adv_diag_value,
      sizeof(auto_adv_diag_value),
      "%lu/%lu/%lu",
      (unsigned long)companion_auto_advert_tx_count,
      (unsigned long)smart_adv_last,
      (unsigned long)smart_adv_next
    );
    appendCustomVar("auto_adv_diag", auto_adv_diag_value);

    // Compact CAD diagnostics:
    // timeouts/recoveries/forced_tx/last_busy_ms/max_busy_ms/age_s/expired_tx
    char cad_diag_value[80];
    snprintf(
      cad_diag_value,
      sizeof(cad_diag_value),
      "%lu/%lu/%lu/%lu/%lu/%lu/%lu",
      (unsigned long)getCADTimeoutCount(),
      (unsigned long)getCADRecoveryCount(),
      (unsigned long)getCADForcedTxCount(),
      (unsigned long)getCADLastBusyMillis(),
      (unsigned long)getCADLongestBusyMillis(),
      (unsigned long)getCADLastTimeoutAgeSeconds(),
      (unsigned long)getNumExpired()
    );
    appendCustomVar("cad_diag", cad_diag_value);

    // Preserve the standard sensor extension point with the remaining frame
    // space. Settings that do not fit are omitted exactly as before.
    for (int i = 0; i < sensors.getNumSettings(); i++) {
      if (!appendCustomVar(
            sensors.getSettingName(i),
            sensors.getSettingValue(i)
          )) {
        break;
      }
    }

    _serial->writeFrame(out_frame, dp - (char *)out_frame);
  } else if (cmd_frame[0] == CMD_SET_CUSTOM_VAR && len >= 4) {
    cmd_frame[len] = 0;
    char *sp = (char *)&cmd_frame[1];
    char *np = strchr(sp, ':'); // look for separator char
    if (np) {
      *np++ = 0; // modify 'cmd_frame', replace ':' with null

      bool success = false;

      // HiveFW Repeater preferences are exposed through
      // CMD_SET_CUSTOM_VAR so Companion clients can operate on the exact same
      // settings as the local display menu without a private command opcode.
      if (strcmp(sp, "auto_advert") == 0) {
        if (strcmp(np, "0") == 0 || strcmp(np, "1") == 0) {
          setAutoAdvertEnabled(np[0] == '1');
          success = true;
        }
      } else if (strcmp(sp, "power_notify") == 0) {
        if (strcmp(np, "0") == 0 || strcmp(np, "1") == 0) {
          _prefs.setPowerNotifyEn(np[0] == '1');
          savePrefs();
          success = true;
        }
      } else if (strcmp(sp, "nbr_adv") == 0) {
        char* endp = nullptr;
        long minutes = strtol(np, &endp, 10);
        if (
          endp != np &&
          *endp == '\0' &&
          (
            minutes == 0 ||
            (
              minutes >= 60 &&
              minutes <= 240 &&
              (minutes % 2) == 0
            )
          )
        ) {
          _prefs.setNeighborAdvertIntervalMinutes((uint16_t)minutes);
          next_neighbor_advert = 0;
          savePrefs();
          success = true;
        }
      } else if (strcmp(sp, "mt") == 0) {
        if (strcmp(np, "0") == 0 || strcmp(np, "1") == 0) {
          _prefs.mesh_time_sync = np[0] == '1' ? 1 : 0;
          if (!_prefs.mesh_time_sync) {
            last_network_sync_time = 0;
          }
          savePrefs();
          success = true;
        }
      } else if (strcmp(sp, "owner") == 0) {
        const size_t owner_len = strlen(np);
        if (owner_len < sizeof(_prefs.owner_info)) {
          memcpy(_prefs.owner_info, np, owner_len + 1);
          savePrefs();
          success = true;
        }
      } else if (strcmp(sp, "rxg") == 0) {
        if (strcmp(np, "0") == 0 || strcmp(np, "1") == 0) {
          _prefs.rx_boosted_gain = np[0] == '1' ? 1 : 0;
          radio_driver.setRxBoostedGainMode(_prefs.rx_boosted_gain);
          savePrefs();
          success = true;
        }
      } else if (strcmp(sp, "adc_m") == 0) {
        char* endp = nullptr;
        long milli = strtol(np, &endp, 10);
        if (
          endp != np &&
          *endp == '\0' &&
          milli >= 0 &&
          milli <= 10000
        ) {
          const float multiplier = (float)milli / 1000.0f;
          if (board.setAdcMultiplier(multiplier)) {
            _prefs.adc_multiplier = multiplier;
            savePrefs();
            success = true;
          }
        }
      } else if (strcmp(sp, "route") == 0) {
        unsigned int flood_max = 0;
        unsigned int flood_max_unscoped = 0;
        unsigned int flood_max_advert = 0;
        unsigned int loop_detect = 0;
        char trailing = 0;

        if (
          sscanf(
            np,
            "%u/%u/%u/%u%c",
            &flood_max,
            &flood_max_unscoped,
            &flood_max_advert,
            &loop_detect,
            &trailing
          ) == 4 &&
          flood_max <= 64 &&
          flood_max_unscoped <= 64 &&
          flood_max_advert <= 64 &&
          loop_detect <= LOOP_DETECT_STRICT
        ) {
          _prefs.setFloodMax((uint8_t)flood_max);
          _prefs.setFloodMaxUnscoped((uint8_t)flood_max_unscoped);
          _prefs.setFloodMaxAdvert((uint8_t)flood_max_advert);
          _prefs.setLoopDetect((uint8_t)loop_detect);
          savePrefs();
          success = true;
        }
      } else if (strcmp(sp, "cad") == 0) {
        if (strcmp(np, "0") == 0 || strcmp(np, "1") == 0) {
          _prefs.cad_enabled = np[0] == '1' ? 1 : 0;
          savePrefs();
          success = true;
        }
      } else if (strcmp(sp, "int_thr") == 0) {
        char *endp = nullptr;
        long threshold = strtol(np, &endp, 10);
        if (
          endp != np &&
          *endp == '\0' &&
          threshold >= 0 &&
          threshold <= 255
        ) {
          _prefs.interference_threshold = (uint8_t)threshold;
          savePrefs();
          success = true;
        }
      } else if (strcmp(sp, "agc_s") == 0) {
        char *endp = nullptr;
        long seconds = strtol(np, &endp, 10);
        if (
          endp != np &&
          *endp == '\0' &&
          seconds >= 0 &&
          seconds <= 1020
        ) {
          // Match CommonCLI: round down to a multiple of four seconds.
          _prefs.agc_reset_interval = (uint8_t)(seconds / 4);
          savePrefs();
          success = true;
        }
      } else if (
        strcmp(sp, "rxdelay") == 0 ||
        strcmp(sp, "f_txdelay") == 0 ||
        strcmp(sp, "d_txdelay") == 0
      ) {
        char *endp = nullptr;
        float value = strtof(np, &endp);
        const bool is_rx = strcmp(sp, "rxdelay") == 0;
        const float maximum = is_rx ? 20.0f : 2.0f;

        if (
          endp != np &&
          *endp == '\0' &&
          value >= 0.0f &&
          value <= maximum
        ) {
          if (is_rx) {
            _prefs.rx_delay_base = value;
          } else if (strcmp(sp, "f_txdelay") == 0) {
            _prefs.tx_delay_factor = value;
          } else {
            _prefs.direct_tx_delay_factor = value;
          }
          savePrefs();
          success = true;
        }
      } else if (
        strcmp(sp, "admin_pw") == 0 ||
        strcmp(sp, "guest_pw") == 0
      ) {
        const size_t password_len = strlen(np);
        bool printable = password_len <= 15;

        for (size_t i = 0; printable && i < password_len; ++i) {
          const uint8_t ch = (uint8_t)np[i];
          printable = ch >= 0x20 && ch <= 0x7E;
        }

        if (printable) {
          if (strcmp(sp, "admin_pw") == 0) {
            _prefs.setRepeaterAdminPassword(np);
          } else {
            _prefs.setRepeaterGuestPassword(np);
          }
          savePrefs();
          success = true;
        }
      } else if (strcmp(sp, "acl_clear") == 0) {
        if (strcmp(np, "1") == 0) {
          success = repeater_acl.clear();
        }
      } else if (strcmp(sp, "duty_cycle") == 0) {
        char *endp = nullptr;
        long duty = strtol(np, &endp, 10);

        if (
          endp != np &&
          *endp == '\0' &&
          duty >= 10 &&
          duty <= 50
        ) {
          _prefs.airtime_factor =
            (100.0f / (float)duty) - 1.0f;
          savePrefs();
          success = true;
        }
      } else if (strcmp(sp, "apps_channel") == 0) {
        char *endp = nullptr;
        long channel_idx = strtol(np, &endp, 10);

        if (endp != np && *endp == '\0') {
          if (channel_idx == -1) {
            memset(
              _prefs.apps_channel_hash,
              0,
              sizeof(_prefs.apps_channel_hash)
            );
            savePrefs();
            success = true;
          } else {
#ifdef MAX_GROUP_CHANNELS
            if (
              channel_idx >= 0 &&
              channel_idx < MAX_GROUP_CHANNELS
            ) {
              ChannelDetails channel;
              if (
                getChannel((uint8_t)channel_idx, channel) &&
                channel.name[0] != '\0'
              ) {
                memcpy(
                  _prefs.apps_channel_hash,
                  channel.channel.hash,
                  PATH_HASH_SIZE
                );
                savePrefs();
                success = true;
              }
            }
#endif
          }
        }
      } else if (strcmp(sp, "ota_token") == 0) {
        // Security-sensitive write-only control. It is intentionally NOT
        // appended by CMD_GET_CUSTOM_VARS, so Companion clients cannot read
        // back the current OTA credential.
        #if defined(ESP32) && defined(WIFI_SSID) && defined(WEB_OTA_ENABLED)
          success = hivefw_set_ota_token(np);
        #else
          success = false;
        #endif
      } else {
        success = sensors.setSettingValue(sp, np);
      }

      if (success) {
        #if ENV_INCLUDE_GPS == 1
        // Update node preferences for GPS settings
        if (strcmp(sp, "gps") == 0) {
          _prefs.gps_enabled = (np[0] == '1') ? 1 : 0;
          savePrefs();
        } else if (strcmp(sp, "gps_interval") == 0) {
          uint32_t interval_seconds = atoi(np);
          _prefs.gps_interval = constrain(interval_seconds, 0, 86400);
          savePrefs();
        }
        #endif
        writeOKFrame();
      } else {
        writeErrFrame(ERR_CODE_ILLEGAL_ARG);
      }
    } else {
      writeErrFrame(ERR_CODE_ILLEGAL_ARG);
    }
  } else if (cmd_frame[0] == CMD_GET_HIVE_NEIGHBOURS) {
    // Local-only, paged view of the same neighbour table semantics used by
    // the official MeshCore simple_repeater. No LoRa traffic is generated.
    const uint8_t offset = len >= 2 ? cmd_frame[1] : 0;

    const RepeaterNeighbour* sorted[MAX_REPEATER_NEIGHBOURS];
    int neighbour_count = 0;

    for (int n = 0; n < MAX_REPEATER_NEIGHBOURS; n++) {
      if (repeater_neighbours[n].heard_timestamp > 0) {
        sorted[neighbour_count++] = &repeater_neighbours[n];
      }
    }

    for (int a = 0; a < neighbour_count - 1; a++) {
      for (int b = a + 1; b < neighbour_count; b++) {
        if (sorted[b]->heard_timestamp > sorted[a]->heard_timestamp) {
          const RepeaterNeighbour* tmp = sorted[a];
          sorted[a] = sorted[b];
          sorted[b] = tmp;
        }
      }
    }

    out_frame[0] = RESP_CODE_CUSTOM_VARS;
    char* dp = (char*)&out_frame[1];
    size_t remaining = sizeof(out_frame) - 1;

    int written = snprintf(
      dp,
      remaining,
      "nbr_total:%d,nbr_offset:%u",
      neighbour_count,
      offset
    );

    if (written < 0 || (size_t)written >= remaining) {
      writeErrFrame(ERR_CODE_BAD_STATE);
      return;
    }

    dp += written;
    remaining -= written;

    uint8_t page_count = 0;
    const uint32_t now = getRTCClock()->getCurrentTime();

    for (
      int n = offset;
      n < neighbour_count && page_count < 4;
      n++
    ) {
      char prefix[13];
      mesh::Utils::toHex(prefix, sorted[n]->id.pub_key, 6);

      const uint32_t secs_ago =
        now >= sorted[n]->heard_timestamp
          ? now - sorted[n]->heard_timestamp
          : 0;

      written = snprintf(
        dp,
        remaining,
        ",n%u:%s|%lu|%d",
        page_count,
        prefix,
        (unsigned long)secs_ago,
        (int)sorted[n]->snr
      );

      if (written < 0 || (size_t)written >= remaining) {
        break;
      }

      dp += written;
      remaining -= written;
      page_count++;
    }

    written = snprintf(
      dp,
      remaining,
      ",nbr_count:%u",
      page_count
    );

    if (written < 0 || (size_t)written >= remaining) {
      writeErrFrame(ERR_CODE_BAD_STATE);
      return;
    }

    dp += written;
    _serial->writeFrame(out_frame, dp - (char*)out_frame);

  } else if (cmd_frame[0] == CMD_GET_OBSERVED_CHANNELS) {
    // Passive local view of unknown group-text channels that this radio has
    // actually forwarded. Reading this table never emits LoRa traffic.
    const uint8_t offset = len >= 2 ? cmd_frame[1] : 0;
    const uint32_t now = getRTCClock()->getCurrentTime();
    const ObservedChannel* sorted[MAX_OBSERVED_CHANNELS];
    int observed_count = 0;

    for (int n = 0; n < MAX_OBSERVED_CHANNELS; n++) {
      const ObservedChannel& observed = observed_channels[n];
      if (observed.heard_timestamp == 0) continue;

      const uint32_t secs_ago =
        now >= observed.heard_timestamp ? now - observed.heard_timestamp : 0;
      if (secs_ago > 48UL * 60UL * 60UL) continue;

      sorted[observed_count++] = &observed;
    }

    for (int a = 0; a < observed_count - 1; a++) {
      for (int b = a + 1; b < observed_count; b++) {
        if (sorted[b]->heard_timestamp > sorted[a]->heard_timestamp) {
          const ObservedChannel* tmp = sorted[a];
          sorted[a] = sorted[b];
          sorted[b] = tmp;
        }
      }
    }

    out_frame[0] = RESP_CODE_CUSTOM_VARS;
    char* dp = (char*)&out_frame[1];
    size_t remaining = sizeof(out_frame) - 1;
    int written = snprintf(dp, remaining, "obs_total:%d,obs_offset:%u", observed_count, offset);
    if (written < 0 || (size_t)written >= remaining) {
      writeErrFrame(ERR_CODE_BAD_STATE);
      return;
    }
    dp += written;
    remaining -= written;

    uint8_t page_count = 0;
    for (int n = offset; n < observed_count && page_count < 4; n++) {
      const uint32_t secs_ago =
        now >= sorted[n]->heard_timestamp ? now - sorted[n]->heard_timestamp : 0;
      written = snprintf(
        dp, remaining, ",o%u:%02X|%lu|%u",
        page_count, (unsigned)sorted[n]->hash,
        (unsigned long)secs_ago, (unsigned)sorted[n]->message_count
      );
      if (written < 0 || (size_t)written >= remaining) break;
      dp += written;
      remaining -= written;
      page_count++;
    }

    written = snprintf(dp, remaining, ",obs_count:%u", page_count);
    if (written < 0 || (size_t)written >= remaining) {
      writeErrFrame(ERR_CODE_BAD_STATE);
      return;
    }
    dp += written;
    _serial->writeFrame(out_frame, dp - (char*)out_frame);

  } else if (
    cmd_frame[0] == CMD_VERIFY_OBSERVED_CHANNEL &&
    len >= 2 + CIPHER_KEY_SIZE
  ) {
    const uint8_t channel_hash = cmd_frame[1];

    uint8_t secret[PUB_KEY_SIZE] = {};
    memcpy(secret, &cmd_frame[2], CIPHER_KEY_SIZE);

    // Reject keys that cannot even generate the observed transport hash.
    uint8_t derived_hash = 0;
    mesh::Utils::sha256(
      &derived_hash,
      1,
      secret,
      CIPHER_KEY_SIZE
    );

    if (derived_hash != channel_hash) {
      writeErrFrame(ERR_CODE_NOT_FOUND);
      return;
    }

    for (int n = 0; n < MAX_OBSERVED_CHANNELS; n++) {
      const ObservedChannel& observed = observed_channels[n];
      if (
        observed.heard_timestamp == 0 ||
        observed.hash != channel_hash ||
        observed.sample_len <= CIPHER_MAC_SIZE
      ) {
        continue;
      }

      uint8_t decoded[MAX_PACKET_PAYLOAD];
      const int decoded_len = mesh::Utils::MACThenDecrypt(
        secret,
        decoded,
        observed.sample,
        observed.sample_len
      );

      if (decoded_len < 6) {
        continue;
      }

      // Group text plaintext is timestamp(4), flags(1), then
      // "<sender>: <message>". The MAC is already the main proof. Do not
      // reject UTF-8 sender/message text; instead combine the MAC with a sane
      // timestamp and the expected colon separator to make false positives
      // vanishingly unlikely.
      uint32_t sender_timestamp = 0;
      memcpy(&sender_timestamp, decoded, sizeof(sender_timestamp));

      const uint32_t now = getRTCClock()->getCurrentTime();
      const bool timestamp_sane =
        sender_timestamp >= 1577836800UL &&
        (
          now == 0 ||
          sender_timestamp <= now + 7UL * 24UL * 60UL * 60UL
        );

      bool has_colon = false;
      int text_len = 0;
      for (int i = 5; i < decoded_len && decoded[i] != 0; i++) {
        if (decoded[i] == ':') has_colon = true;
        text_len++;
      }

      if (timestamp_sane && has_colon && text_len >= 3) {
        writeOKFrame();
        return;
      }
    }

    writeErrFrame(ERR_CODE_NOT_FOUND);

  } else if (cmd_frame[0] == CMD_GET_HA_COMMANDS) {
    // Local-only, paged view of Home Assistant commands persisted by the
    // Companion UI. Reading this table never emits LoRa traffic.
    const uint8_t offset = len >= 2 ? cmd_frame[1] : 0;

    HiveFWHACommand commands[HIVEFW_HA_MAX_COMMANDS];
    memset(commands, 0, sizeof(commands));

    int command_count = loadHACommands(
      commands,
      HIVEFW_HA_MAX_COMMANDS
    );
    if (command_count < 0) command_count = 0;
    if (command_count > HIVEFW_HA_MAX_COMMANDS) {
      command_count = HIVEFW_HA_MAX_COMMANDS;
    }

    out_frame[0] = RESP_CODE_CUSTOM_VARS;

    if (offset >= command_count) {
      const int written = snprintf(
        (char*)&out_frame[1],
        sizeof(out_frame) - 1,
        "ha_total:%d,ha_offset:%u,ha_count:0",
        command_count,
        offset
      );
      if (written < 0 || written >= (int)(sizeof(out_frame) - 1)) {
        writeErrFrame(ERR_CODE_BAD_STATE);
      } else {
        _serial->writeFrame(out_frame, 1 + written);
      }
      return;
    }

    char name_hex[HIVEFW_HA_NAME_LEN * 2 + 1];
    char command_hex[HIVEFW_HA_COMMAND_LEN * 2 + 1];
    memset(name_hex, 0, sizeof(name_hex));
    memset(command_hex, 0, sizeof(command_hex));

    static const char HEX_DIGITS[] = "0123456789ABCDEF";

    size_t name_len = strnlen(
      commands[offset].name,
      HIVEFW_HA_NAME_LEN - 1
    );
    for (size_t i = 0; i < name_len; i++) {
      const uint8_t b = (uint8_t)commands[offset].name[i];
      name_hex[i * 2] = HEX_DIGITS[(b >> 4) & 0x0F];
      name_hex[i * 2 + 1] = HEX_DIGITS[b & 0x0F];
    }

    size_t command_len = strnlen(
      commands[offset].command,
      HIVEFW_HA_COMMAND_LEN - 1
    );
    for (size_t i = 0; i < command_len; i++) {
      const uint8_t b = (uint8_t)commands[offset].command[i];
      command_hex[i * 2] = HEX_DIGITS[(b >> 4) & 0x0F];
      command_hex[i * 2 + 1] = HEX_DIGITS[b & 0x0F];
    }

    const int written = snprintf(
      (char*)&out_frame[1],
      sizeof(out_frame) - 1,
      "ha_total:%d,ha_offset:%u,h0:%s|%s|%u,ha_count:1",
      command_count,
      offset,
      name_hex,
      command_hex,
      (unsigned)commands[offset].flags
    );

    if (written < 0 || written >= (int)(sizeof(out_frame) - 1)) {
      writeErrFrame(ERR_CODE_BAD_STATE);
    } else {
      _serial->writeFrame(out_frame, 1 + written);
    }

  } else if (cmd_frame[0] == CMD_GET_REPEATER_RF_CONFIG) {
    // Dedicated local response so these settings do not consume the
    // standard CMD_GET_CUSTOM_VARS 140-byte payload budget.
    out_frame[0] = RESP_CODE_CUSTOM_VARS;

    int written = snprintf(
      (char*)&out_frame[1],
      sizeof(out_frame) - 1,
      "cad:%u,int_thr:%u,agc_s:%u,rx_m:%ld,f_tx_m:%ld,d_tx_m:%ld",
      (unsigned)_prefs.cad_enabled,
      (unsigned)_prefs.interference_threshold,
      (unsigned)(_prefs.agc_reset_interval * 4U),
      (long)(_prefs.rx_delay_base * 1000.0f + 0.5f),
      (long)(_prefs.tx_delay_factor * 1000.0f + 0.5f),
      (long)(_prefs.direct_tx_delay_factor * 1000.0f + 0.5f)
    );

    if (
      written < 0 ||
      written >= (int)(sizeof(out_frame) - 1)
    ) {
      writeErrFrame(ERR_CODE_BAD_STATE);
    } else {
      _serial->writeFrame(out_frame, 1 + written);
    }

  } else if (cmd_frame[0] == CMD_GET_REPEATER_AUTH_CONFIG) {
    // Passwords are write-only. Only configuration booleans and ACL count
    // leave the radio over the local Companion transport.
    out_frame[0] = RESP_CODE_CUSTOM_VARS;
    const int written = snprintf(
      (char*)&out_frame[1],
      sizeof(out_frame) - 1,
      "adm:%u,gst:%u,acl:%d",
      _prefs.getRepeaterAdminPassword()[0] != '\0' ? 1U : 0U,
      _prefs.getRepeaterGuestPassword()[0] != '\0' ? 1U : 0U,
      repeater_acl.getNumPersistedClients()
    );

    if (
      written < 0 ||
      written >= (int)(sizeof(out_frame) - 1)
    ) {
      writeErrFrame(ERR_CODE_BAD_STATE);
    } else {
      _serial->writeFrame(out_frame, 1 + written);
    }

  } else if (cmd_frame[0] == CMD_GET_REPEATER_PROFILE && len >= 2) {
    out_frame[0] = RESP_CODE_CUSTOM_VARS;
    const uint8_t page = cmd_frame[1];

    if (page == 0) {
      char encoded[161] = {};
      const size_t owner_len = strnlen(
        _prefs.owner_info,
        sizeof(_prefs.owner_info) - 1
      );
      if (
        hivefwBase64Encode(
          (const uint8_t*)_prefs.owner_info,
          owner_len,
          encoded,
          sizeof(encoded)
        ) == 0 &&
        owner_len > 0
      ) {
        writeErrFrame(ERR_CODE_BAD_STATE);
        return;
      }

      const int written = snprintf(
        (char*)&out_frame[1],
        sizeof(out_frame) - 1,
        "owner:%s",
        encoded
      );
      if (written < 0 || written >= (int)(sizeof(out_frame) - 1)) {
        writeErrFrame(ERR_CODE_BAD_STATE);
        return;
      }
      _serial->writeFrame(out_frame, 1 + written);
    } else if (page == 1) {
      const long adc_milli =
        (long)(_prefs.adc_multiplier * 1000.0f + 0.5f);
      const int written = snprintf(
        (char*)&out_frame[1],
        sizeof(out_frame) - 1,
        "rxg:%u,adc_m:%ld",
        (unsigned)_prefs.rx_boosted_gain,
        adc_milli
      );
      if (written < 0 || written >= (int)(sizeof(out_frame) - 1)) {
        writeErrFrame(ERR_CODE_BAD_STATE);
        return;
      }
      _serial->writeFrame(out_frame, 1 + written);
    } else {
      writeErrFrame(ERR_CODE_ILLEGAL_ARG);
    }

  } else if (cmd_frame[0] == CMD_GET_REPEATER_ACL_ENTRY && len >= 2) {
    const int logical_index = (int)cmd_frame[1];
    const int total = repeater_acl.getNumPersistedClients();
    ClientInfo* client =
      repeater_acl.getPersistedClientByIdx(logical_index);

    if (client == NULL || logical_index < 0 || logical_index >= total) {
      writeErrFrame(ERR_CODE_ILLEGAL_ARG);
      return;
    }

    char key_hex[PUB_KEY_SIZE * 2 + 1];
    mesh::Utils::toHex(key_hex, client->id.pub_key, PUB_KEY_SIZE);

    out_frame[0] = RESP_CODE_CUSTOM_VARS;
    const int written = snprintf(
      (char*)&out_frame[1],
      sizeof(out_frame) - 1,
      "idx:%d,total:%d,key:%s,perm:%u,last:%lu",
      logical_index,
      total,
      key_hex,
      (unsigned)(client->permissions & PERM_ACL_ROLE_MASK),
      (unsigned long)client->last_activity
    );

    if (written < 0 || written >= (int)(sizeof(out_frame) - 1)) {
      writeErrFrame(ERR_CODE_BAD_STATE);
      return;
    }
    _serial->writeFrame(out_frame, 1 + written);

  } else if (
    cmd_frame[0] == CMD_SET_REPEATER_ACL_ENTRY &&
    len == 2 + PUB_KEY_SIZE
  ) {
    const uint8_t permissions =
      cmd_frame[1] & PERM_ACL_ROLE_MASK;

    if (
      cmd_frame[1] > PERM_ACL_ADMIN ||
      !repeater_acl.applyPermissions(
        self_id,
        &cmd_frame[2],
        PUB_KEY_SIZE,
        permissions
      )
    ) {
      writeErrFrame(ERR_CODE_ILLEGAL_ARG);
      return;
    }

    repeater_acl.save(_store->getPrimaryFS());
    writeOKFrame();

  } else if (cmd_frame[0] == CMD_GET_REPEATER_REGION && len >= 2) {
    // Local-only RegionMap reader. One entry per request keeps the response
    // compact and avoids any dependence on the standard custom-var budget.
    const int index = (int)cmd_frame[1];
    const int total = getRepeaterRegionCount();
    const RegionEntry* region = getRepeaterRegionByIndex(index);

    if (region == NULL || index < 0 || index >= total) {
      writeErrFrame(ERR_CODE_ILLEGAL_ARG);
      return;
    }

    const RegionEntry* parent = NULL;
    if (!region->isWildcard()) {
      parent = region_map.findById(region->parent);
    }

    RegionEntry* home = getRepeaterHomeRegion();
    RegionEntry* def = getRepeaterDefaultRegion();

    out_frame[0] = RESP_CODE_CUSTOM_VARS;
    const int written = snprintf(
      (char*)&out_frame[1],
      sizeof(out_frame) - 1,
      "idx:%d,total:%d,name:%s,parent:%s,allow:%u,home:%u,default:%u",
      index,
      total,
      region->name,
      parent != NULL ? parent->name : "",
      (region->flags & REGION_DENY_FLOOD) == 0 ? 1U : 0U,
      home == region ? 1U : 0U,
      def == region ? 1U : 0U
    );

    if (
      written < 0 ||
      written >= (int)(sizeof(out_frame) - 1)
    ) {
      writeErrFrame(ERR_CODE_BAD_STATE);
    } else {
      _serial->writeFrame(out_frame, 1 + written);
    }

  } else if (cmd_frame[0] == CMD_SET_REPEATER_REGION && len >= 2) {
    // Binary local RegionMap mutation surface. Nothing is applied unless the
    // caller explicitly sends an operation; no default Regions are created.
    //
    // Frame:
    //   [48][op][name_len][name...][parent_len][parent...]
    //
    // op 0 save
    // op 1 put
    // op 2 remove
    // op 3 allow flood
    // op 4 deny flood
    // op 5 set home
    // op 6 set default
    // op 7 clear default
    const uint8_t op = cmd_frame[1];

    if (op == 0) {
      if (saveRepeaterRegions()) {
        writeOKFrame();
      } else {
        writeErrFrame(ERR_CODE_BAD_STATE);
      }
      return;
    }

    if (op == 7) {
      if (clearRepeaterDefaultRegion()) {
        writeOKFrame();
      } else {
        writeErrFrame(ERR_CODE_BAD_STATE);
      }
      return;
    }

    if (len < 3) {
      writeErrFrame(ERR_CODE_ILLEGAL_ARG);
      return;
    }

    const uint8_t name_len = cmd_frame[2];
    if (
      name_len == 0 ||
      (size_t)(3 + name_len) > len ||
      name_len >= 64
    ) {
      writeErrFrame(ERR_CODE_ILLEGAL_ARG);
      return;
    }

    char name[64];
    memcpy(name, &cmd_frame[3], name_len);
    name[name_len] = '\0';

    const size_t parent_len_pos = 3 + name_len;
    uint8_t parent_len = 0;
    const char* parent = NULL;
    char parent_buf[64];

    if (parent_len_pos < len) {
      parent_len = cmd_frame[parent_len_pos];
      if (
        parent_len >= sizeof(parent_buf) ||
        parent_len_pos + 1 + parent_len > len
      ) {
        writeErrFrame(ERR_CODE_ILLEGAL_ARG);
        return;
      }
      if (parent_len > 0) {
        memcpy(parent_buf, &cmd_frame[parent_len_pos + 1], parent_len);
        parent_buf[parent_len] = '\0';
        parent = parent_buf;
      }
    }

    bool success = false;
    switch (op) {
      case 1:
        success = putRepeaterRegion(name, parent);
        break;
      case 2:
        success = removeRepeaterRegion(name);
        break;
      case 3:
        success = setRepeaterRegionFloodAllowed(name, true);
        break;
      case 4:
        success = setRepeaterRegionFloodAllowed(name, false);
        break;
      case 5:
        success = setRepeaterHomeRegion(name);
        break;
      case 6:
        success = setRepeaterDefaultRegion(name);
        break;
      default:
        writeErrFrame(ERR_CODE_ILLEGAL_ARG);
        return;
    }

    if (success) {
      writeOKFrame();
    } else {
      writeErrFrame(ERR_CODE_ILLEGAL_ARG);
    }

  } else if (cmd_frame[0] == CMD_GET_ADVERT_PATH && len >= PUB_KEY_SIZE+2) {
    // FUTURE use:  uint8_t reserved = cmd_frame[1];
    uint8_t *pub_key = &cmd_frame[2];
    AdvertPath* found = NULL;
    for (int i = 0; i < ADVERT_PATH_TABLE_SIZE; i++) {
      auto p = &advert_paths[i];
      if (memcmp(p->pubkey_prefix, pub_key, sizeof(p->pubkey_prefix)) == 0) {
        found = p;
        break;
      }
    }
    if (found) {
      int i = 0;
      out_frame[i++] = RESP_CODE_ADVERT_PATH;
      memcpy(&out_frame[i], &found->recv_timestamp, 4); i += 4;
      out_frame[i++] = found->path_len;
      i += mesh::Packet::writePath(&out_frame[i], found->path, found->path_len);
      _serial->writeFrame(out_frame, i);
    } else {
      writeErrFrame(ERR_CODE_NOT_FOUND);
    }
  } else if (cmd_frame[0] == CMD_GET_STATS && len >= 2) {
    uint8_t stats_type = cmd_frame[1];
    if (stats_type == STATS_TYPE_CORE) {
      int i = 0;
      out_frame[i++] = RESP_CODE_STATS;
      out_frame[i++] = STATS_TYPE_CORE;
      uint16_t battery_mv = board.getBattMilliVolts();
      uint32_t uptime_secs = _ms->getMillis() / 1000;
      uint8_t queue_len = (uint8_t)_mgr->getOutboundTotal();
      memcpy(&out_frame[i], &battery_mv, 2); i += 2;
      memcpy(&out_frame[i], &uptime_secs, 4); i += 4;
      memcpy(&out_frame[i], &_err_flags, 2); i += 2;
      out_frame[i++] = queue_len;
      _serial->writeFrame(out_frame, i);
    } else if (stats_type == STATS_TYPE_RADIO) {
      int i = 0;
      out_frame[i++] = RESP_CODE_STATS;
      out_frame[i++] = STATS_TYPE_RADIO;
      int16_t noise_floor = (int16_t)_radio->getNoiseFloor();
      int8_t last_rssi = (int8_t)radio_driver.getLastRSSI();
      int8_t last_snr = (int8_t)(radio_driver.getLastSNR() * 4); // scaled by 4 for 0.25 dB precision
      uint32_t tx_air_secs = getTotalAirTime() / 1000;
      uint32_t rx_air_secs = getReceiveAirTime() / 1000;
      memcpy(&out_frame[i], &noise_floor, 2); i += 2;
      out_frame[i++] = last_rssi;
      out_frame[i++] = last_snr;
      memcpy(&out_frame[i], &tx_air_secs, 4); i += 4;
      memcpy(&out_frame[i], &rx_air_secs, 4); i += 4;
      _serial->writeFrame(out_frame, i);
    } else if (stats_type == STATS_TYPE_PACKETS) {
      int i = 0;
      out_frame[i++] = RESP_CODE_STATS;
      out_frame[i++] = STATS_TYPE_PACKETS;
      uint32_t recv = radio_driver.getPacketsRecv();
      uint32_t sent = radio_driver.getPacketsSent();
      uint32_t n_sent_flood = getNumSentFlood();
      uint32_t n_sent_direct = getNumSentDirect();
      uint32_t n_recv_flood = getNumRecvFlood();
      uint32_t n_recv_direct = getNumRecvDirect();
      uint32_t n_recv_errors = radio_driver.getPacketsRecvErrors();
      memcpy(&out_frame[i], &recv, 4); i += 4;
      memcpy(&out_frame[i], &sent, 4); i += 4;
      memcpy(&out_frame[i], &n_sent_flood, 4); i += 4;
      memcpy(&out_frame[i], &n_sent_direct, 4); i += 4;
      memcpy(&out_frame[i], &n_recv_flood, 4); i += 4;
      memcpy(&out_frame[i], &n_recv_direct, 4); i += 4;
      memcpy(&out_frame[i], &n_recv_errors, 4); i += 4;
      _serial->writeFrame(out_frame, i);
    } else {
      writeErrFrame(ERR_CODE_ILLEGAL_ARG); // invalid stats sub-type
    }
  } else if (cmd_frame[0] == CMD_FACTORY_RESET && memcmp(&cmd_frame[1], "reset", 5) == 0) {
    if (_serial) {
      MESH_DEBUG_PRINTLN("Factory reset: disabling serial interface to prevent reconnects (BLE/WiFi)");
      _serial->disable(); // Phone app disconnects before we can send OK frame so it's safe here
    }
    bool success = _store->formatFileSystem();
    if (success) {
      writeOKFrame();
      delay(1000);
      board.reboot();  // doesn't return
    } else {
      writeErrFrame(ERR_CODE_FILE_IO_ERROR);
    }
  } else if (cmd_frame[0] == CMD_SET_FLOOD_SCOPE_KEY && len >= 2 && cmd_frame[1] == 0) {
    if (len >= 2 + 16) {
      memcpy(send_scope.key, &cmd_frame[2], sizeof(send_scope.key));  // set scope override TransportKey
    } else {
      memset(send_scope.key, 0, sizeof(send_scope.key));  // reset scope override
    }
    send_unscoped = false;
    writeOKFrame();
  } else if (cmd_frame[0] == CMD_SET_FLOOD_SCOPE_KEY && len >= 2 && cmd_frame[1] == 1) {  // ver 12+
    send_unscoped = true;
    writeOKFrame();
  } else if (cmd_frame[0] == CMD_SET_DEFAULT_FLOOD_SCOPE && len >= 1) {
    if (len >= 1+31+16) {
      int n = strlen((char *) &cmd_frame[1]);
      if (n > 0 && n < 31) {
        strcpy(_prefs.default_scope_name, (char *) &cmd_frame[1]);
        memcpy(_prefs.default_scope_key, &cmd_frame[1+31], 16);
        savePrefs();
        writeOKFrame();
      } else {
        writeErrFrame(ERR_CODE_ILLEGAL_ARG);
      }
    } else {
      memset(_prefs.default_scope_name, 0, sizeof(_prefs.default_scope_name));  // set default scope to null
      memset(_prefs.default_scope_key, 0, sizeof(_prefs.default_scope_key));
      savePrefs();
      writeOKFrame();
    }
  } else if (cmd_frame[0] == CMD_GET_DEFAULT_FLOOD_SCOPE) {
    out_frame[0] = RESP_CODE_DEFAULT_FLOOD_SCOPE;
    if (strlen(_prefs.default_scope_name) > 0) {
      memcpy(&out_frame[1], _prefs.default_scope_name, 31);
      memcpy(&out_frame[1+31], _prefs.default_scope_key, 16);
      _serial->writeFrame(out_frame, 1+31+16);
    } else {
      _serial->writeFrame(out_frame, 1);   // no name or key means null
    }
  } else if (cmd_frame[0] == CMD_SEND_CONTROL_DATA && len >= 2 && (cmd_frame[1] & 0x80) != 0) {
    auto resp = createControlData(&cmd_frame[1], len - 1);
    if (resp) {
      sendZeroHop(resp);
      writeOKFrame();
    } else {
      writeErrFrame(ERR_CODE_TABLE_FULL);
    }
  } else if (cmd_frame[0] == CMD_SET_AUTOADD_CONFIG) {
    _prefs.autoadd_config = cmd_frame[1];
    if (len >= 3) {
      _prefs.autoadd_max_hops = min(cmd_frame[2], (uint8_t)64);
    }
    savePrefs();
    writeOKFrame();
  } else if (cmd_frame[0] == CMD_GET_AUTOADD_CONFIG) {
    int i = 0;
    out_frame[i++] = RESP_CODE_AUTOADD_CONFIG;
    out_frame[i++] = _prefs.autoadd_config;
    out_frame[i++] = _prefs.autoadd_max_hops;
    _serial->writeFrame(out_frame, i);
  } else if (cmd_frame[0] == CMD_GET_ALLOWED_REPEAT_FREQ) {
    int i = 0;
    out_frame[i++] = RESP_ALLOWED_REPEAT_FREQ;

    // One mutable entry: the Repeater uses exactly the active Companion
    // frequency. Encode it as a single-point [min,max] range for protocol
    // compatibility with clients that expect repeat-frequency ranges.
    const uint32_t active_freq = getActiveRepeatFreqKhz();
    memcpy(&out_frame[i], &active_freq, 4); i += 4;
    memcpy(&out_frame[i], &active_freq, 4); i += 4;

    _serial->writeFrame(out_frame, i);
  } else if (cmd_frame[0] == CMD_SEND_RAW_PACKET && len >= 4) {
    auto pkt = obtainNewPacket();
    if (pkt) {
      uint8_t priority = cmd_frame[1];
      if (tryParsePacket(pkt, &cmd_frame[2], len - 2)) {
        sendPacket(pkt, priority, 0);
        writeOKFrame();
      } else {
        releasePacket(pkt);
        writeErrFrame(ERR_CODE_ILLEGAL_ARG);
      }
    } else {
      writeErrFrame(ERR_CODE_TABLE_FULL);
    }
  } else {
    writeErrFrame(ERR_CODE_UNSUPPORTED_CMD);
    MESH_DEBUG_PRINTLN("ERROR: unknown command: %02X", cmd_frame[0]);
  }
}

static bool save_filter(const ContactInfo& c) {
  return c.type != ADV_TYPE_NONE;   // don't save the transient/anon entries
}

void MyMesh::saveContacts() {
  _store->saveContacts(this, save_filter);
}


// ========================================================================
// HIVEFW — CONTACTOS NO DISPOSITIVO
// ========================================================================

bool MyMesh::setContactFavouriteByUiIndex(
  uint32_t index,
  bool favourite
) {

  ContactInfo copy;

  if (
    !getContactByIdx(
      index + MAX_ANON_CONTACTS,
      copy
    )
  ) {
    return false;
  }


  ContactInfo* contact =
    lookupContactByPubKey(
      copy.id.pub_key,
      PUB_KEY_SIZE
    );

  if (contact == NULL) {
    return false;
  }


  if (favourite) {

    contact->flags |= 0x01;

  } else {

    contact->flags &= ~0x01;
  }


  contact->lastmod =
    getRTCClock()->getCurrentTime();

  saveContacts();

  return true;
}


bool MyMesh::removeContactByUiIndex(
  uint32_t index
) {

  ContactInfo copy;

  if (
    !getContactByIdx(
      index + MAX_ANON_CONTACTS,
      copy
    )
  ) {
    return false;
  }


  uint8_t pub_key[PUB_KEY_SIZE];

  memcpy(
    pub_key,
    copy.id.pub_key,
    PUB_KEY_SIZE
  );


  ContactInfo* contact =
    lookupContactByPubKey(
      pub_key,
      PUB_KEY_SIZE
    );

  if (
    contact == NULL ||
    !removeContact(*contact)
  ) {

    return false;
  }


  _store->deleteBlobByKey(
    pub_key,
    PUB_KEY_SIZE
  );

  saveContacts();


  // Se a app estiver ligada, informar também a app.
  if (
    _serial != NULL &&
    _serial->isConnected()
  ) {

    out_frame[0] =
      PUSH_CODE_CONTACT_DELETED;

    memcpy(
      &out_frame[1],
      pub_key,
      PUB_KEY_SIZE
    );

    _serial->writeFrame(
      out_frame,
      1 + PUB_KEY_SIZE
    );
  }

  return true;
}


int MyMesh::sendContactPingByUiIndex(
  uint32_t index,
  uint32_t& est_timeout
) {

  ContactInfo contact;

  if (
    !getContactByIdx(
      index + MAX_ANON_CONTACTS,
      contact
    )
  ) {

    est_timeout = 0;

    return MSG_SEND_FAILED;
  }


  uint32_t tag = 0;

  return sendRequest(
    contact,
    REQ_TYPE_GET_STATUS,
    tag,
    est_timeout
  );
}


bool MyMesh::sendContactTraceByUiIndex(
  uint32_t index
) {

  ContactInfo contact;

  if (
    !getContactByIdx(
      index + MAX_ANON_CONTACTS,
      contact
    )
  ) {

    return false;
  }


  if (
    contact.out_path_len ==
    OUT_PATH_UNKNOWN
  ) {

    return false;
  }


  // out_path_len usa o encoding MeshCore:
  //
  // bits 7..6 -> hash size - 1
  // bits 5..0 -> número de hops

  const uint8_t hash_size =
    (
      contact.out_path_len >>
      6
    ) + 1;

  const uint8_t hop_count =
    contact.out_path_len &
    0x3F;


  if (hop_count == 0) {

    // Não existe percurso de repetidores para traçar.
    return false;
  }


  // TRACE atual usa no flags:
  //
  // 0 -> 1 byte
  // 1 -> 2 bytes
  //
  // O formato atual de TRACE não representa uma entrada
  // de 3 bytes. Não enviamos um TRACE incorreto.

  uint8_t trace_flags = 0;

  if (hash_size == 1) {

    trace_flags = 0;

  } else if (hash_size == 2) {

    trace_flags = 1;

  } else {

    return false;
  }


  const uint8_t raw_path_len =
    hop_count *
    hash_size;


  const uint32_t tag =
    getRTCClock()->
      getCurrentTimeUnique();


  mesh::Packet* packet =
    createTrace(
      tag,
      0,
      trace_flags
    );


  if (packet == NULL) {

    return false;
  }


  // Para TRACE, Mesh::sendDirect() espera o comprimento
  // bruto do path, e não o byte codificado usado nos
  // ContactInfo normais.

  sendDirect(
    packet,
    contact.out_path,
    raw_path_len
  );

  return true;
}




// ========================================================================
// HIVEFW — RECENTES -> CONTACTOS
// ========================================================================

int MyMesh::findContactUiIndexByPubKey(
  const uint8_t* pub_key
) {

  if (pub_key == NULL) {
    return -1;
  }


  const int count =
    getNumContacts();


  for (int i = 0; i < count; i++) {

    ContactInfo contact;

    if (
      !getContactByIdx(
        i + MAX_ANON_CONTACTS,
        contact
      )
    ) {

      continue;
    }


    if (
      memcmp(
        contact.id.pub_key,
        pub_key,
        PUB_KEY_SIZE
      ) == 0
    ) {

      return i;
    }
  }


  return -1;
}


bool MyMesh::addRecentContact(
  const AdvertPath& recent,
  uint32_t& ui_index
) {

  ui_index = 0;


  int existing =
    findContactUiIndexByPubKey(
      recent.pub_key
    );


  if (existing >= 0) {

    ui_index =
      (uint32_t)existing;

    return true;
  }


  if (
    recent.name[0] == '\0' ||
    recent.node_type == ADV_TYPE_NONE
  ) {

    return false;
  }


  ContactInfo contact;

  memset(
    &contact,
    0,
    sizeof(contact)
  );


  memcpy(
    contact.id.pub_key,
    recent.pub_key,
    PUB_KEY_SIZE
  );


  strncpy(
    contact.name,
    recent.name,
    sizeof(contact.name) - 1
  );

  contact.name[
    sizeof(contact.name) - 1
  ] = '\0';


  contact.type =
    recent.node_type;

  contact.flags = 0;


  // O caminho de entrada de um Advert não é assumido
  // automaticamente como caminho de saída.
  //
  // Até existir uma rota recíproca confirmada,
  // o contacto novo usa FLOOD.
  contact.out_path_len =
    OUT_PATH_UNKNOWN;


  contact.last_advert_timestamp =
    0;

  contact.lastmod =
    getRTCClock()->getCurrentTime();

  contact.sync_since =
    0;


  if (!addContact(contact)) {

    onContactsFull();

    return false;
  }


  saveContacts();


  int added =
    findContactUiIndexByPubKey(
      recent.pub_key
    );


  if (added < 0) {
    return false;
  }


  ui_index =
    (uint32_t)added;


  return true;
}


void MyMesh::enterCLIRescue() {
  _cli_rescue = true;
  cli_command[0] = 0;
  Serial.println("========= CLI Rescue =========");
}


// ========================================================================
// HiveFW V1.09beta
// MeshCore simple_repeater — REGION CLI
//
// Sintaxe compatível com o Region Management oficial:
//
//   region
//   region get <name>
//   region list allowed
//   region list denied
//   region put <name> [parent]
//   region remove <name>
//   region home
//   region home <name>
//   region default
//   region default <name>
//   region default <null>
//   region allowf <name>
//   region denyf <name>
//   region save
//   region def <token> [token ...]
//
// As alterações put/remove/home/allowf/denyf ficam em RAM até
// "region save", tal como no fluxo normal do Repeater.
// "region default" é persistido imediatamente, reproduzindo o
// comportamento atual do CommonCLI oficial.
// ========================================================================

bool MyMesh::handleCLIRegionCommand(
  char* command
) {

  if (command == NULL) {
    return false;
  }


  // Só capturar:
  //
  //   region
  //   region ...
  //
  // Não capturar palavras começadas por "region".
  if (
    strcmp(command, "region") != 0 &&
    strncmp(command, "region ", 7) != 0
  ) {
    return false;
  }


  // --------------------------------------------------------
  // remover espaços finais
  // --------------------------------------------------------

  size_t command_len =
    strlen(command);

  while (
    command_len > 0 &&
    (
      command[command_len - 1] == ' ' ||
      command[command_len - 1] == '\t'
    )
  ) {

    command[
      --command_len
    ] = '\0';
  }


  // --------------------------------------------------------
  // region
  //
  // Mostrar árvore completa.
  // --------------------------------------------------------

  if (
    strcmp(command, "region") == 0
  ) {

    region_map.exportTo(
      Serial
    );

    return true;
  }


  char* args =
    command + 7;

  while (
    *args == ' ' ||
    *args == '\t'
  ) {
    args++;
  }


  // ========================================================
  // region def
  //
  // Port do mecanismo de cursor do CommonCLI:
  //
  //   region def a b c
  //
  // cria:
  //
  //   *
  //   └ a
  //     └ b
  //       └ c
  //
  // "nome|jump" ou "nome,jump":
  // cria nome e depois move o cursor para jump.
  // ========================================================

  if (
    strncmp(args, "def ", 4) == 0
  ) {

    char* payload =
      args + 4;

    while (
      *payload == ' ' ||
      *payload == '\t'
    ) {
      payload++;
    }


    if (*payload == '\0') {

      Serial.println(
        "Err - empty def"
      );

      return true;
    }


    RegionEntry* cursor =
      &region_map.getWildcard();

    char* saveptr = NULL;

    char* token =
      strtok_r(
        payload,
        " \t",
        &saveptr
      );


    while (token != NULL) {

      // -----------------------------------------------
      // separar:
      //
      //   nome|jump
      //   nome,jump
      // -----------------------------------------------

      char* pipe =
        strchr(token, '|');

      char* comma =
        strchr(token, ',');

      char* split = NULL;


      if (
        pipe != NULL &&
        comma != NULL
      ) {

        split =
          pipe < comma
            ? pipe
            : comma;

      } else if (pipe != NULL) {

        split = pipe;

      } else {

        split = comma;
      }


      char* jump = NULL;

      if (split != NULL) {

        *split = '\0';

        jump =
          split + 1;
      }


      if (token[0] == '\0') {

        Serial.println(
          "Err - empty region name"
        );

        return true;
      }


      // -----------------------------------------------
      // Mesmo RegionMap oficial.
      //
      // Region criada/atualizada debaixo do cursor.
      // -----------------------------------------------

      RegionEntry* region =
        region_map.putRegion(
          token,
          cursor->id
        );


      if (region == NULL) {

        Serial.print(
          "Err - put failed: "
        );

        Serial.println(
          token
        );

        return true;
      }


      // CommonCLI oficial:
      // region def repõe flags e ativa FLOOD.
      region->flags = 0;


      cursor =
        region;


      // -----------------------------------------------
      // jump opcional
      // -----------------------------------------------

      if (jump != NULL) {

        if (jump[0] == '\0') {

          Serial.println(
            "Err - empty jump"
          );

          return true;
        }


        RegionEntry* target =
          region_map.findByNamePrefix(
            jump
          );


        if (target == NULL) {

          Serial.print(
            "Err - unknown jump: "
          );

          Serial.println(
            jump
          );

          return true;
        }


        cursor =
          target;
      }


      token =
        strtok_r(
          NULL,
          " \t",
          &saveptr
        );
    }


    region_policy_configured =
      true;


    region_map.exportTo(
      Serial
    );

    return true;
  }


  // ========================================================
  // Parse normal:
  //
  // subcommand arg1 arg2
  // ========================================================

  char* saveptr = NULL;

  char* sub =
    strtok_r(
      args,
      " \t",
      &saveptr
    );

  char* arg1 =
    strtok_r(
      NULL,
      " \t",
      &saveptr
    );

  char* arg2 =
    strtok_r(
      NULL,
      " \t",
      &saveptr
    );


  if (sub == NULL) {

    region_map.exportTo(
      Serial
    );

    return true;
  }


  // ========================================================
  // region save
  // ========================================================

  if (
    strcmp(sub, "save") == 0
  ) {

    // HiveFW Companion:
    // o NodePrefs do Companion não possui
    // discovery_mod_timestamp.
    //
    // A persistência regional continua a usar exatamente
    // o RegionMap oficial e o ficheiro /regions2.
    if (saveRepeaterRegions()) {

      Serial.println(
        "OK"
      );

    } else {

      Serial.println(
        "Err - save failed"
      );
    }

    return true;
  }


  // ========================================================
  // region get <name>
  // ========================================================

  if (
    strcmp(sub, "get") == 0
  ) {

    if (arg1 == NULL) {

      Serial.println(
        "Err - unknown region"
      );

      return true;
    }


    RegionEntry* region =
      region_map.findByNamePrefix(
        arg1
      );


    if (region == NULL) {

      Serial.println(
        "Err - unknown region"
      );

      return true;
    }


    RegionEntry* parent =
      region_map.findById(
        region->parent
      );


    // Formato idêntico ao CommonCLI oficial:
    //
    //   REGION (PARENT) F
    //
    // F = flood permitido.
    if (
      parent != NULL &&
      parent->id != 0
    ) {

      Serial.print(" ");
      Serial.print(region->name);
      Serial.print(" (");
      Serial.print(parent->name);
      Serial.print(") ");

    } else {

      Serial.print(" ");
      Serial.print(region->name);
      Serial.print(" ");
    }


    if (
      (
        region->flags &
        REGION_DENY_FLOOD
      ) == 0
    ) {

      Serial.print("F");
    }


    Serial.println();

    return true;
  }


  // ========================================================
  // region list allowed
  // region list denied
  // ========================================================

  if (
    strcmp(sub, "list") == 0
  ) {

    if (arg1 == NULL) {

      Serial.println(
        "Err - use 'allowed' or 'denied'"
      );

      return true;
    }


    uint8_t mask =
      REGION_DENY_FLOOD;

    bool invert =
      false;


    if (
      strcmp(arg1, "allowed") == 0
    ) {

      invert = false;

    } else if (
      strcmp(arg1, "denied") == 0
    ) {

      // Igual ao CommonCLI oficial:
      // listar as regiões que TÊM a flag DENY.
      invert = true;

    } else {

      Serial.println(
        "Err - use 'allowed' or 'denied'"
      );

      return true;
    }


    char names[1024];

    names[0] =
      '\0';


    int names_len =
      region_map.exportNamesTo(
        names,
        sizeof(names),
        mask,
        invert
      );


    if (names_len == 0) {

      Serial.println(
        "-none-"
      );

    } else {

      Serial.println(
        names
      );
    }

    return true;
  }


  // ========================================================
  // region put <name> [parent]
  // ========================================================

  if (
    strcmp(sub, "put") == 0
  ) {

    if (arg1 == NULL) {

      Serial.println(
        "Err - unable to put"
      );

      return true;
    }


    RegionEntry* parent =
      arg2 != NULL
        ? region_map.findByNamePrefix(arg2)
        : &region_map.getWildcard();


    if (parent == NULL) {

      Serial.println(
        "Err - unknown parent"
      );

      return true;
    }


    RegionEntry* region =
      region_map.putRegion(
        arg1,
        parent->id
      );


    if (region == NULL) {

      Serial.println(
        "Err - unable to put"
      );

      return true;
    }


    // CommonCLI oficial.
    region->flags = 0;

    region_policy_configured =
      true;


    Serial.println(
      "OK - (flood allowed)"
    );

    return true;
  }


  // ========================================================
  // region remove <name>
  // ========================================================

  if (
    strcmp(sub, "remove") == 0
  ) {

    if (arg1 == NULL) {

      Serial.println(
        "Err - not found"
      );

      return true;
    }


    // Oficial: remoção exige nome exato.
    RegionEntry* region =
      region_map.findByName(
        arg1
      );


    if (region == NULL) {

      Serial.println(
        "Err - not found"
      );

      return true;
    }


    if (
      region_map.removeRegion(
        *region
      )
    ) {

      region_policy_configured =
        true;

      Serial.println(
        "OK"
      );

    } else {

      Serial.println(
        "Err - not empty"
      );
    }


    return true;
  }


  // ========================================================
  // region home
  // region home <name>
  // ========================================================

  if (
    strcmp(sub, "home") == 0
  ) {

    if (arg1 == NULL) {

      RegionEntry* home =
        region_map.getHomeRegion();


      Serial.print(
        " home is "
      );

      Serial.println(
        home != NULL
          ? home->name
          : "*"
      );

      return true;
    }


    RegionEntry* home =
      region_map.findByNamePrefix(
        arg1
      );


    if (home == NULL) {

      Serial.println(
        "Err - unknown region"
      );

      return true;
    }


    region_map.setHomeRegion(
      home
    );

    region_policy_configured =
      true;


    Serial.print(
      " home is now "
    );

    Serial.println(
      home->name
    );

    return true;
  }


  // ========================================================
  // region default
  // region default <name>
  // region default <null>
  //
  // O firmware oficial persiste DEFAULT imediatamente.
  // ========================================================

  if (
    strcmp(sub, "default") == 0
  ) {

    if (arg1 == NULL) {

      RegionEntry* def =
        region_map.getDefaultRegion();


      Serial.print(
        " default scope is "
      );

      Serial.println(
        def != NULL
          ? def->name
          : "<null>"
      );

      return true;
    }


    if (
      strcmp(arg1, "<null>") == 0
    ) {

      if (
        clearRepeaterDefaultRegion()
      ) {

        Serial.println(
          " default scope is now <null>"
        );

      } else {

        Serial.println(
          "Err - save failed"
        );
      }


      return true;
    }


    if (
      setRepeaterDefaultRegion(
        arg1
      )
    ) {

      RegionEntry* def =
        region_map.getDefaultRegion();


      Serial.print(
        " default scope is now "
      );

      Serial.println(
        def != NULL
          ? def->name
          : "<null>"
      );

    } else {

      Serial.println(
        "Err - region table full"
      );
    }


    return true;
  }


  // ========================================================
  // region allowf <name>
  // ========================================================

  if (
    strcmp(sub, "allowf") == 0
  ) {

    if (arg1 == NULL) {

      Serial.println(
        "Err - missing region"
      );

      return true;
    }


    if (
      setRepeaterRegionFloodAllowed(
        arg1,
        true
      )
    ) {

      Serial.println(
        "OK"
      );

    } else {

      Serial.println(
        "Err - unknown region"
      );
    }


    return true;
  }


  // ========================================================
  // region denyf <name>
  // ========================================================

  if (
    strcmp(sub, "denyf") == 0
  ) {

    if (arg1 == NULL) {

      Serial.println(
        "Err - missing region"
      );

      return true;
    }


    if (
      setRepeaterRegionFloodAllowed(
        arg1,
        false
      )
    ) {

      Serial.println(
        "OK"
      );

    } else {

      Serial.println(
        "Err - unknown region"
      );
    }


    return true;
  }


  Serial.println(
    "Err - ??"
  );

  return true;
}


void MyMesh::checkCLIRescueCmd() {
  int len = strlen(cli_command);
  while (Serial.available() && len < sizeof(cli_command)-1) {
    char c = Serial.read();
    if (c != '\n') {
      cli_command[len++] = c;
      cli_command[len] = 0;
    }
    Serial.print(c);  // echo
  }
  if (len == sizeof(cli_command)-1) {  // command buffer full
    cli_command[sizeof(cli_command)-1] = '\r';
  }

  if (len > 0 && cli_command[len - 1] == '\r') {  // received complete line
    cli_command[len - 1] = 0;  // replace newline with C string null terminator

    if (
      handleCLIRegionCommand(
        cli_command
      )
    ) {
      // handled by MeshCore-compatible Region CLI

    } else if (memcmp(cli_command, "set ", 4) == 0) {
      const char* config = &cli_command[4];
      if (memcmp(config, "pin ", 4) == 0) {
        _prefs.ble_pin = atoi(&config[4]);
        savePrefs();
        Serial.printf("  > pin is now %06d\n", _prefs.ble_pin);
      } else {
        Serial.printf("  Error: unknown config: %s\n", config);
      }
    } else if (strcmp(cli_command, "rebuild") == 0) {
      bool success = _store->formatFileSystem();
      if (success) {
        _store->saveMainIdentity(self_id);
        savePrefs();
        saveContacts();
        saveChannels();
        Serial.println("  > erase and rebuild done");
      } else {
        Serial.println("  Error: erase failed");
      }
    } else if (strcmp(cli_command, "erase") == 0) {
      bool success = _store->formatFileSystem();
      if (success) {
        Serial.println("  > erase done");
      } else {
        Serial.println("  Error: erase failed");
      }
    } else if (memcmp(cli_command, "ls", 2) == 0) {

      // get path from command e.g: "ls /adafruit"
      const char *path = &cli_command[3];

      bool is_fs2 = false;
      if (memcmp(path, "UserData/", 9) == 0) {
        path += 8; // skip "UserData"
      } else if (memcmp(path, "ExtraFS/", 8) == 0) {
        path += 7; // skip "ExtraFS"
        is_fs2 = true;
      }
      Serial.printf("Listing files in %s\n", path);

      // log each file and directory
      File root = _store->openRead(path);
      if (is_fs2 == false) {
        if (root) {
          File file = root.openNextFile();
          while (file) {
            if (file.isDirectory()) {
              Serial.printf("[dir]  UserData%s/%s\n", path, file.name());
            } else {
              Serial.printf("[file] UserData%s/%s (%d bytes)\n", path, file.name(), file.size());
            }
            // move to next file
            file = root.openNextFile();
          }
          root.close();
        }
      }

      if (is_fs2 == true || strlen(path) == 0 || strcmp(path, "/") == 0) {
        if (_store->getSecondaryFS() != nullptr) {
          File root2 = _store->openRead(_store->getSecondaryFS(), path);
          File file = root2.openNextFile();
          while (file) {
            if (file.isDirectory()) {
              Serial.printf("[dir]  ExtraFS%s/%s\n", path, file.name());
            } else {
              Serial.printf("[file] ExtraFS%s/%s (%d bytes)\n", path, file.name(), file.size());
            }
            // move to next file
            file = root2.openNextFile();
          }
          root2.close();
        }
      }
    } else if (memcmp(cli_command, "cat", 3) == 0) {

      // get path from command e.g: "cat /contacts3"
      const char *path = &cli_command[4];

      bool is_fs2 = false;
      if (memcmp(path, "UserData/", 9) == 0) {
        path += 8; // skip "UserData"
      } else if (memcmp(path, "ExtraFS/", 8) == 0) {
        path += 7; // skip "ExtraFS"
        is_fs2 = true;
      } else {
        Serial.println("Invalid path provided, must start with UserData/ or ExtraFS/");
        cli_command[0] = 0;
        return;
      }

      // log file content as hex
      File file = _store->openRead(path);
      if (is_fs2 == true) {
        file = _store->openRead(_store->getSecondaryFS(), path);
      }
      if(file){

        // get file content
        int file_size = file.available();
        uint8_t buffer[file_size];
        file.read(buffer, file_size);

        // print hex
        mesh::Utils::printHex(Serial, buffer, file_size);
        Serial.print("\n");

        file.close();

      }

    } else if (memcmp(cli_command, "rm ", 3) == 0) {
      // get path from command e.g: "rm /adv_blobs"
      const char *path = &cli_command[3];
      MESH_DEBUG_PRINTLN("Removing file: %s", path);
      // ensure path is not empty, or root dir
      if(!path || strlen(path) == 0 || strcmp(path, "/") == 0){
        Serial.println("Invalid path provided");
      } else {
      bool is_fs2 = false;
      if (memcmp(path, "UserData/", 9) == 0) {
        path += 8; // skip "UserData"
      } else if (memcmp(path, "ExtraFS/", 8) == 0) {
        path += 7; // skip "ExtraFS"
        is_fs2 = true;
      }

        // remove file
        bool removed;
        if (is_fs2) {
          MESH_DEBUG_PRINTLN("Removing file from ExtraFS: %s", path);
          removed = _store->removeFile(_store->getSecondaryFS(), path);
        } else {
          MESH_DEBUG_PRINTLN("Removing file from UserData: %s", path);
          removed = _store->removeFile(path);
        }
        if(removed){
          Serial.println("File removed");
        } else {
          Serial.println("Failed to remove file");
        }

      }

    } else if (strcmp(cli_command, "reboot") == 0) {
      board.reboot();  // doesn't return
    } else {
      Serial.println("  Error: unknown command");
    }

    cli_command[0] = 0;  // reset command buffer
  }
}

void MyMesh::checkSerialInterface() {
  size_t len = _serial->checkRecvFrame(cmd_frame);
  if (len > 0) {
    handleCmdFrame(len);
  } else if (_iter_started              // check if our ContactsIterator is 'running'
             && !_serial->isWriteBusy() // don't spam the Serial Interface too quickly!
  ) {
    ContactInfo contact;
    if (_iter.hasNext(this, contact)) {
      if (contact.lastmod > _iter_filter_since) { // apply the 'since' filter
        writeContactRespFrame(RESP_CODE_CONTACT, contact);
        if (contact.lastmod > _most_recent_lastmod) {
          _most_recent_lastmod = contact.lastmod; // save for the RESP_CODE_END_OF_CONTACTS frame
        }
      }
    } else { // EOF
      out_frame[0] = RESP_CODE_END_OF_CONTACTS;
      memcpy(&out_frame[1], &_most_recent_lastmod,
             4); // include the most recent lastmod, so app can update their 'since'
      _serial->writeFrame(out_frame, 5);
      _iter_started = false;
    }
  //} else if (!_serial->isWriteBusy()) {
  //  checkConnections();    // TODO - deprecate the 'Connections' stuff
  }
}

bool MyMesh::sendPowerFailureNotification() {
  if (!_prefs.isRepeatEn() || !_prefs.isPowerNotifyEn()) {
    return false;
  }

  bool apps_channel_configured = false;
  for (int i = 0; i < PATH_HASH_SIZE; ++i) {
    if (_prefs.apps_channel_hash[i] != 0) {
      apps_channel_configured = true;
      break;
    }
  }
  if (!apps_channel_configured) {
    MESH_DEBUG_PRINTLN("HiveFW power notify: Canal APPS/SOS not configured");
    return false;
  }

#ifdef MAX_GROUP_CHANNELS
  for (int i = 0; i < MAX_GROUP_CHANNELS; ++i) {
    ChannelDetails channel;
    if (
      getChannel((uint8_t)i, channel) &&
      channel.name[0] != '\0' &&
      memcmp(
        channel.channel.hash,
        _prefs.apps_channel_hash,
        PATH_HASH_SIZE
      ) == 0
    ) {
      static const char message[] = "Falha de Energia ⚡";
      const uint32_t now = getRTCClock()->getCurrentTime();
      const bool sent = sendGroupMessage(
        now,
        channel.channel,
        _prefs.node_name,
        message,
        strlen(message)
      );
      MESH_DEBUG_PRINTLN(
        "HiveFW power notify: %s on channel %d",
        sent ? "sent" : "queue failed",
        i
      );
      return sent;
    }
  }
#endif

  MESH_DEBUG_PRINTLN("HiveFW power notify: selected channel no longer exists");
  return false;
}

void MyMesh::loop() {
  if (
    remote_reboot_at &&
    millisHasNowPassed(remote_reboot_at)
  ) {
    remote_reboot_at = 0;
    board.reboot();
    return;
  }

  BaseChatMesh::loop();

  if (_cli_rescue) {
    checkCLIRescueCmd();
  } else {
    checkSerialInterface();
  }

#if defined(NRF52_PLATFORM) || defined(HELTEC_LORA_V3)
  // Poll slowly and debounce loss-of-power so USB serial traffic on the V3
  // cannot create a false alarm. Booting on battery never emits an alert:
  // only a confirmed transition from external power to battery does.
  if (next_power_check == 0 || millisHasNowPassed(next_power_check)) {
    next_power_check = millis() + 2000UL;
    const bool external_power = board.isExternalPowered();

    if (!power_state_initialized) {
      last_external_power = external_power;
      power_state_initialized = true;
      power_loss_samples = 0;
    } else if (external_power) {
      last_external_power = true;
      power_loss_samples = 0;
    } else if (last_external_power) {
      if (++power_loss_samples >= 3) {
        last_external_power = false;
        power_loss_samples = 0;
        sendPowerFailureNotification();
      }
    } else {
      power_loss_samples = 0;
    }
  }
#endif

  // is there are pending dirty contacts write needed?
  if (dirty_contacts_expiry && millisHasNowPassed(dirty_contacts_expiry)) {
    saveContacts();
    dirty_contacts_expiry = 0;
  }

  if (
    repeater_neighbours_dirty &&
    repeater_neighbours_save_at &&
    millisHasNowPassed(repeater_neighbours_save_at)
  ) {
    persistRepeaterNeighbours();
  }

  // Direct neighbour advert, kept deliberately separate from Smart Advert.
  // This is the same local-presence behaviour as official SimpleRepeater:
  // one ADV_TYPE_REPEATER advert every two minutes, transmitted only with
  // sendZeroHop(). It is never flooded or forwarded by other Repeaters.
  if (_prefs.isRepeatEn()) {
    if (next_neighbor_advert == 0) {
      updateNeighborAdvertTimer();
    } else if (millisHasNowPassed(next_neighbor_advert)) {
      next_neighbor_advert = 0;
      if (advert(false, 0)) {
        MESH_DEBUG_PRINTLN("HiveFW: sent zero-hop neighbour advert");
      }
      updateNeighborAdvertTimer();
    }
  } else {
    next_neighbor_advert = 0;
  }

  // Smart Advert is exclusively a Repeater feature.
  // The normal daily slot is deterministic from the node hash. Persistence is
  // only a 24 h at-most-once guard: it never chooses the node's daily slot.
  if (_prefs.isRepeatEn() && _prefs.isAutoAdvertEn()) {
    if (next_smart_advert == 0) {
      updateSmartAdvertTimer();
    } else if (millisHasNowPassed(next_smart_advert)) {
      next_smart_advert = 0;

      const uint32_t now_epoch = getRTCClock()->getCurrentTime();
      const uint32_t last_epoch = loadPersistedAutoAdvertEpoch();

      if (now_epoch < HIVEFW_SMART_ADVERT_VALID_EPOCH_MIN) {
        // RTC is not usable yet. Retry later; a clock sync also clears the
        // cached timer so this is recalculated immediately.
        updateSmartAdvertTimer();
      } else if (
        _prefs.getAutoAdvertStateVersion() == HIVEFW_SMART_ADVERT_STATE_VERSION &&
        last_epoch >= HIVEFW_SMART_ADVERT_VALID_EPOCH_MIN &&
        last_epoch <= now_epoch &&
        (now_epoch - last_epoch) < HIVEFW_SMART_ADVERT_INTERVAL_SECONDS
      ) {
        // Independent at-most-once guard. This can happen after a clock
        // correction or when an off-slot recovery advert made the next hash
        // slot too early. Recalculate the next eligible hash slot.
        updateSmartAdvertTimer();
      } else {
        mesh::Packet* pkt;
        if (_prefs.advert_loc_policy == ADVERT_LOC_NONE) {
          pkt = createSelfAdvert(_prefs.node_name);
        } else {
          pkt = createSelfAdvert(
              _prefs.node_name,
              sensors.node_lat,
              sensors.node_lon);
        }

        if (pkt) {
          TransportKey default_scope;
          memcpy(
              &default_scope.key,
              _prefs.default_scope_key,
              sizeof(default_scope.key));

          // Persist first. From state version 1 onward this timestamp always
          // means that an automatic advert was actually queued for origin.
          // On the first boot after migrating from the old seed-based scheme,
          // adv_ver is 0, so the stale reference is ignored and a recovery
          // advert is originated immediately.
          persistAutoAdvertEpoch(now_epoch);

          sendFloodScoped(default_scope, pkt, 0);
          companion_advert_tx_count++;
          companion_auto_advert_tx_count++;
        }

        updateSmartAdvertTimer();
      }
    }
  } else {
    next_smart_advert = 0;

    // Leaving the effective Auto Advert state arms a new activation grace for
    // the next time both Repeater and Auto Advert are enabled.
    if (_prefs.getAutoAdvertEnabledEpoch() != 0) {
      _prefs.setAutoAdvertEnabledEpoch(0);
      savePrefs();
    }
  }

#ifdef DISPLAY_CLASS
  if (_ui) _ui->setHasConnection(_serial->isConnected());
#endif
}

mesh::Packet* MyMesh::createSelfAdvert(const char* name) {
  uint8_t app_data[MAX_ADVERT_DATA_SIZE];
  uint8_t app_data_len;

  {
    uint8_t advert_type = _prefs.isRepeatEn()
        ? ADV_TYPE_REPEATER
        : ADV_TYPE_CHAT;

    AdvertDataBuilder builder(advert_type, name);
    app_data_len = builder.encodeTo(app_data);
  }

  return createAdvert(self_id, app_data, app_data_len);
}

mesh::Packet* MyMesh::createSelfAdvert(const char* name, double lat, double lon) {
  uint8_t app_data[MAX_ADVERT_DATA_SIZE];
  uint8_t app_data_len;

  {
    uint8_t advert_type = _prefs.isRepeatEn()
        ? ADV_TYPE_REPEATER
        : ADV_TYPE_CHAT;

    AdvertDataBuilder builder(advert_type, name, lat, lon);
    app_data_len = builder.encodeTo(app_data);
  }

  return createAdvert(self_id, app_data, app_data_len);
}

uint32_t MyMesh::loadPersistedAutoAdvertEpoch() {
  uint32_t epoch = _prefs.getLastAutoAdvertEpoch();

#if defined(ESP32)
  Preferences prefs;
  if (prefs.begin("hivefw_adv", true)) {
    const uint32_t nvs_epoch = prefs.getUInt("last_auto", 0);
    prefs.end();
    if (nvs_epoch > epoch) {
      epoch = nvs_epoch;
    }
  }
#endif

  return epoch;
}

void MyMesh::persistAutoAdvertEpoch(uint32_t epoch) {
  if (epoch < HIVEFW_SMART_ADVERT_VALID_EPOCH_MIN) {
    return;
  }

  bool prefs_changed = false;

  if (_prefs.getLastAutoAdvertEpoch() != epoch) {
    _prefs.setLastAutoAdvertEpoch(epoch);
    prefs_changed = true;
  }

  if (_prefs.getAutoAdvertStateVersion() != HIVEFW_SMART_ADVERT_STATE_VERSION) {
    _prefs.setAutoAdvertStateVersion(HIVEFW_SMART_ADVERT_STATE_VERSION);
    prefs_changed = true;
  }

  if (prefs_changed) {
    savePrefs();
  }

#if defined(ESP32)
  Preferences prefs;
  if (prefs.begin("hivefw_adv", false)) {
    prefs.putUInt("last_auto", epoch);
    prefs.end();
  }
#endif
}

uint32_t MyMesh::getSmartAdvertSlotOffsetSeconds() const {
  uint32_t hash = 0;
  const char* name = _prefs.node_name ? _prefs.node_name : "";

  // Preserve the original Smart Advert identity/hash concept: name + the
  // first bytes of the node identity choose a stable point in a 24 h day.
  mesh::Utils::sha256(
      (uint8_t*)&hash,
      sizeof(hash),
      (const uint8_t*)name,
      strlen(name),
      self_id.pub_key,
      4);

  return hash % HIVEFW_SMART_ADVERT_INTERVAL_SECONDS;
}

uint32_t MyMesh::getNextSmartAdvertSlotEpoch(uint32_t now_epoch) const {
  if (now_epoch < HIVEFW_SMART_ADVERT_VALID_EPOCH_MIN) {
    return 0;
  }

  const uint32_t cycle_start =
      now_epoch - (now_epoch % HIVEFW_SMART_ADVERT_INTERVAL_SECONDS);
  uint32_t target_epoch =
      cycle_start + getSmartAdvertSlotOffsetSeconds();

  if (target_epoch <= now_epoch) {
    target_epoch += HIVEFW_SMART_ADVERT_INTERVAL_SECONDS;
  }

  return target_epoch;
}

uint32_t MyMesh::getNextSmartAdvertEpoch(
    uint32_t now_epoch,
    uint32_t last_epoch) const {
  if (
    !_prefs.isRepeatEn() ||
    !_prefs.isAutoAdvertEn() ||
    now_epoch < HIVEFW_SMART_ADVERT_VALID_EPOCH_MIN
  ) {
    return 0;
  }

  // Version 0 belongs to the temporary seed-based implementation. Its stored
  // timestamp did not necessarily represent a transmitted advert. Treat that
  // state exactly like "no confirmed Auto Advert in the last 24 h" so the
  // five-minute activation grace still applies during migration.
  const bool trusted_last_advert =
    _prefs.getAutoAdvertStateVersion() == HIVEFW_SMART_ADVERT_STATE_VERSION &&
    last_epoch >= HIVEFW_SMART_ADVERT_VALID_EPOCH_MIN &&
    last_epoch <= now_epoch;

  // Boot/restart recovery: if we cannot prove an automatic advert happened in
  // the previous 24 h, an advert is due even when this is off the normal hash
  // slot. A fresh OFF -> ON activation must, however, remain enabled for five
  // minutes first. The activation timestamp is persisted, so rebooting during
  // that grace period does not bypass the safeguard.
  if (
    !trusted_last_advert ||
    (now_epoch - last_epoch) >= HIVEFW_SMART_ADVERT_INTERVAL_SECONDS
  ) {
    const uint32_t enabled_epoch = _prefs.getAutoAdvertEnabledEpoch();

    if (
      enabled_epoch < HIVEFW_SMART_ADVERT_VALID_EPOCH_MIN ||
      enabled_epoch > now_epoch
    ) {
      return now_epoch + HIVEFW_SMART_ADVERT_ENABLE_GRACE_SECONDS;
    }

    const uint32_t grace_end =
      enabled_epoch + HIVEFW_SMART_ADVERT_ENABLE_GRACE_SECONDS;

    return now_epoch < grace_end ? grace_end : now_epoch;
  }

  // Normal operation follows the deterministic daily slot. If an off-slot
  // recovery advert makes the upcoming slot less than 24 h after the last
  // transmission, skip that slot and use the following day's slot. This
  // realigns the node to its hash schedule within at most 48 h without ever
  // originating two automatic adverts inside 24 h.
  uint32_t target_epoch = getNextSmartAdvertSlotEpoch(now_epoch);
  if (
    target_epoch > last_epoch &&
    (target_epoch - last_epoch) < HIVEFW_SMART_ADVERT_INTERVAL_SECONDS
  ) {
    target_epoch += HIVEFW_SMART_ADVERT_INTERVAL_SECONDS;
  }

  return target_epoch;
}

void MyMesh::setAutoAdvertEnabled(bool enabled) {
  const bool was_enabled = _prefs.isAutoAdvertEn();

  // Re-applying the same state must not restart the five-minute grace window.
  if (was_enabled == enabled) {
    next_smart_advert = 0;
    return;
  }

  _prefs.setAutoAdvertEn(enabled);

  if (!enabled) {
    _prefs.setAutoAdvertEnabledEpoch(0);
  } else {
    const uint32_t now_epoch = getRTCClock()->getCurrentTime();
    _prefs.setAutoAdvertEnabledEpoch(
      now_epoch >= HIVEFW_SMART_ADVERT_VALID_EPOCH_MIN
        ? now_epoch
        : 0
    );
  }

  // Recalculate immediately from the new effective state. If no Auto Advert
  // was confirmed in the last 24 h, this activation timestamp enforces the
  // five-minute safety grace.
  next_smart_advert = 0;
  savePrefs();
}

bool MyMesh::getSmartAdvertSecondsUntilNext(uint32_t& seconds) {
  seconds = 0;

  if (!_prefs.isRepeatEn() || !_prefs.isAutoAdvertEn()) {
    return false;
  }

  const uint32_t now_epoch = getRTCClock()->getCurrentTime();
  if (now_epoch < HIVEFW_SMART_ADVERT_VALID_EPOCH_MIN) {
    return false;
  }

  const uint32_t last_epoch = loadPersistedAutoAdvertEpoch();
  const uint32_t next_epoch =
    getNextSmartAdvertEpoch(now_epoch, last_epoch);

  if (next_epoch == 0) {
    return false;
  }

  seconds = next_epoch <= now_epoch
    ? 0
    : next_epoch - now_epoch;

  return true;
}

void MyMesh::updateNeighborAdvertTimer() {
  const uint16_t minutes = _prefs.getNeighborAdvertIntervalMinutes();

  if (!_prefs.isRepeatEn() || minutes == 0) {
    next_neighbor_advert = 0;
    return;
  }

  next_neighbor_advert =
      futureMillis((int)((uint32_t)minutes * 60UL * 1000UL));
}

void MyMesh::updateSmartAdvertTimer() {
  if (!_prefs.isRepeatEn() || !_prefs.isAutoAdvertEn()) {
    next_smart_advert = 0;
    return;
  }

  const uint32_t now_epoch = getRTCClock()->getCurrentTime();

  if (now_epoch < HIVEFW_SMART_ADVERT_VALID_EPOCH_MIN) {
    // Do not anchor scheduling to an invalid RTC. Retry every minute until the
    // clock is usable; explicit clock sync also invalidates this timer.
    next_smart_advert = futureMillis(60UL * 1000UL);
    return;
  }

  // Seed the persisted activation timestamp lazily as well, so enabling Auto
  // Advert from any UI path (not only CMD_SET_CUSTOM_VAR) gets the same
  // five-minute safety grace.
  const uint32_t enabled_epoch = _prefs.getAutoAdvertEnabledEpoch();
  if (
    enabled_epoch < HIVEFW_SMART_ADVERT_VALID_EPOCH_MIN ||
    enabled_epoch > now_epoch
  ) {
    _prefs.setAutoAdvertEnabledEpoch(now_epoch);
    savePrefs();
  }

  const uint32_t last_epoch = loadPersistedAutoAdvertEpoch();
  const uint32_t next_epoch =
      getNextSmartAdvertEpoch(now_epoch, last_epoch);

  if (next_epoch == 0) {
    next_smart_advert = 0;
    return;
  }

  const uint32_t wait_seconds =
      next_epoch <= now_epoch ? 1UL : next_epoch - now_epoch;

  next_smart_advert =
      futureMillis((int)(wait_seconds * 1000UL));
}

bool MyMesh::advert(bool flood, uint32_t delay_millis) {
  mesh::Packet* pkt;

  if (_prefs.advert_loc_policy == ADVERT_LOC_NONE) {
    pkt = createSelfAdvert(_prefs.node_name);
  } else {
    pkt = createSelfAdvert(
      _prefs.node_name,
      sensors.node_lat,
      sensors.node_lon
    );
  }

  if (!pkt) {
    return false;
  }

  if (flood) {
    TransportKey default_scope;

    memcpy(
      &default_scope.key,
      _prefs.default_scope_key,
      sizeof(default_scope.key)
    );

    sendFloodScoped(default_scope, pkt, delay_millis);
  } else {
    sendZeroHop(pkt, delay_millis);
  }

  // HiveFW Companion:
  // o advert foi criado e entregue ao mecanismo de transmissão.
  companion_advert_tx_count++;

  return true;
}

// To check if there is pending work
bool MyMesh::hasPendingWork() const {
  return _mgr->getOutboundTotal() > 0 || dirty_contacts_expiry != 0;
}
