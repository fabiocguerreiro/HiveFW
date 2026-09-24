#include <Arduino.h>
#include "DataStore.h"

#if defined(EXTRAFS) || defined(QSPIFLASH)
  #define MAX_BLOBRECS 100
#else
  #define MAX_BLOBRECS 20
#endif

DataStore::DataStore(FILESYSTEM& fs, mesh::RTCClock& clock) : _fs(&fs), _fsExtra(nullptr), _clock(&clock),
#if defined(NRF52_PLATFORM) || defined(STM32_PLATFORM)
    identity_store(fs, "")
#elif defined(RP2040_PLATFORM)
    identity_store(fs, "/identity")
#else
    identity_store(fs, "/identity")
#endif
{
}

#if defined(EXTRAFS) || defined(QSPIFLASH)
DataStore::DataStore(FILESYSTEM& fs, FILESYSTEM& fsExtra, mesh::RTCClock& clock) : _fs(&fs), _fsExtra(&fsExtra), _clock(&clock),
#if defined(NRF52_PLATFORM) || defined(STM32_PLATFORM)
    identity_store(fs, "")
#elif defined(RP2040_PLATFORM)
    identity_store(fs, "/identity")
#else
    identity_store(fs, "/identity")
#endif
{
}
#endif

static File openWrite(FILESYSTEM* fs, const char* filename) {
#if defined(NRF52_PLATFORM) || defined(STM32_PLATFORM)
  fs->remove(filename);
  return fs->open(filename, FILE_O_WRITE);
#elif defined(RP2040_PLATFORM)
  return fs->open(filename, "w");
#else
  return fs->open(filename, "w", true);
#endif
}

#if defined(NRF52_PLATFORM) || defined(STM32_PLATFORM)
  static uint32_t _ContactsChannelsTotalBlocks = 0;
#endif

void DataStore::begin() {
#if defined(RP2040_PLATFORM)
  identity_store.begin();
#endif

#if defined(NRF52_PLATFORM) || defined(STM32_PLATFORM)
  _ContactsChannelsTotalBlocks = _getContactsChannelsFS()->_getFS()->cfg->block_count;
  checkAdvBlobFile();
  #if defined(EXTRAFS) || defined(QSPIFLASH)
  migrateToSecondaryFS();
  #endif
#else
  // init 'blob store' support
  _fs->mkdir("/bl");
#endif
  migrateContactsToNodeStore();
}

#if defined(ESP32)
  #include <SPIFFS.h>
  #include <nvs_flash.h>
#elif defined(RP2040_PLATFORM)
  #include <LittleFS.h>
#elif defined(NRF52_PLATFORM) || defined(STM32_PLATFORM)
  #if defined(QSPIFLASH)
    #include <CustomLFS_QSPIFlash.h>
  #elif defined(EXTRAFS)
    #include <CustomLFS.h>
  #else 
    #include <InternalFileSystem.h>
  #endif
#endif

#if defined(NRF52_PLATFORM) || defined(STM32_PLATFORM)
int _countLfsBlock(void *p, lfs_block_t block){
      if (block > _ContactsChannelsTotalBlocks) {
        MESH_DEBUG_PRINTLN("ERROR: Block %d exceeds filesystem bounds - CORRUPTION DETECTED!", block);
        return LFS_ERR_CORRUPT;  // return error to abort lfs_traverse() gracefully
    }
  lfs_size_t *size = (lfs_size_t*) p;
  *size += 1;
    return 0;
}

lfs_ssize_t _getLfsUsedBlockCount(FILESYSTEM* fs) {
  lfs_size_t size = 0;
  int err = lfs_traverse(fs->_getFS(), _countLfsBlock, &size);
  if (err) {
    MESH_DEBUG_PRINTLN("ERROR: lfs_traverse() error: %d", err);
    return 0;
  }
  return size;
}
#endif

uint32_t DataStore::getStorageUsedKb() const {
#if defined(ESP32)
  return SPIFFS.usedBytes() / 1024;
#elif defined(RP2040_PLATFORM)
  FSInfo info;
  info.usedBytes = 0;
  _fs->info(info);
  return info.usedBytes / 1024;
#elif defined(NRF52_PLATFORM) || defined(STM32_PLATFORM)
  const lfs_config* config = _getContactsChannelsFS()->_getFS()->cfg;
  int usedBlockCount = _getLfsUsedBlockCount(_getContactsChannelsFS());
  int usedBytes = config->block_size * usedBlockCount;
  return usedBytes / 1024;
#else
  return 0;
#endif
}

uint32_t DataStore::getStorageTotalKb() const {
#if defined(ESP32)
  return SPIFFS.totalBytes() / 1024;
#elif defined(RP2040_PLATFORM)
  FSInfo info;
  info.totalBytes = 0;
  _fs->info(info);
  return info.totalBytes / 1024;
#elif defined(NRF52_PLATFORM) || defined(STM32_PLATFORM)
  const lfs_config* config = _getContactsChannelsFS()->_getFS()->cfg;
  int totalBytes = config->block_size * config->block_count;
  return totalBytes / 1024;
#else
  return 0;
#endif
}

File DataStore::openRead(const char* filename) {
#if defined(NRF52_PLATFORM) || defined(STM32_PLATFORM)
  return _fs->open(filename, FILE_O_READ);
#elif defined(RP2040_PLATFORM)
  return _fs->open(filename, "r");
#else
  return _fs->open(filename, "r", false);
#endif
}

File DataStore::openRead(FILESYSTEM* fs, const char* filename) {
#if defined(NRF52_PLATFORM) || defined(STM32_PLATFORM)
  return fs->open(filename, FILE_O_READ);
#elif defined(RP2040_PLATFORM)
  return fs->open(filename, "r");
#else
  return fs->open(filename, "r", false);
#endif
}

bool DataStore::removeFile(const char* filename) {
  return _fs->remove(filename);
}

bool DataStore::removeFile(FILESYSTEM* fs, const char* filename) {
  return fs->remove(filename);
}

bool DataStore::formatFileSystem() {
#if defined(NRF52_PLATFORM) || defined(STM32_PLATFORM)
  if (_fsExtra == nullptr) {
    return _fs->format();
  } else {
    return _fs->format() && _fsExtra->format();
  }
#elif defined(RP2040_PLATFORM)
  return LittleFS.format();
#elif defined(ESP32)
  bool fs_success = ((fs::SPIFFSFS *)_fs)->format();
  esp_err_t nvs_err = nvs_flash_erase(); // no need to reinit, will be done by reboot
  return fs_success && (nvs_err == ESP_OK);
#else
  #error "need to implement format()"
#endif
}

bool DataStore::loadMainIdentity(mesh::LocalIdentity &identity) {
  return identity_store.load("_main", identity);
}

bool DataStore::saveMainIdentity(const mesh::LocalIdentity &identity) {
  return identity_store.save("_main", identity);
}

void DataStore::loadPrefs(NodePrefs& prefs) {
  if (_fs->exists("/prefs.json")) {
    File file = openRead(_fs, "/prefs.json");
    if (file) {
      prefs.loadSerial(file);   // new Serial prefs
      file.close();
    }
  } else if (_fs->exists("/new_prefs")) {
    loadPrefsInt("/new_prefs", prefs);
    if (savePrefs(prefs) ) {                // save to new format
      //_fs->remove("/new_prefs"); // remove old
    }
  }
}

void DataStore::loadPrefsInt(const char *filename, NodePrefs& _prefs) {
  File file = openRead(_fs, filename);
  if (file) {
    uint8_t pad[8];

    file.read((uint8_t *)&_prefs.airtime_factor, sizeof(float));                           // 0
    file.read((uint8_t *)_prefs.node_name, sizeof(_prefs.node_name));                      // 4
    file.read(pad, 4);                                                                     // 36
    file.read((uint8_t *)&_prefs.node_lat, sizeof(_prefs.node_lat));                       // 40
    file.read((uint8_t *)&_prefs.node_lon, sizeof(_prefs.node_lon));                       // 48
    file.read((uint8_t *)&_prefs.freq, sizeof(_prefs.freq));                               // 56
    file.read((uint8_t *)&_prefs.sf, sizeof(_prefs.sf));                                   // 60
    file.read((uint8_t *)&_prefs.cr, sizeof(_prefs.cr));                                   // 61
    file.read((uint8_t *)&_prefs._client_repeat, sizeof(_prefs._client_repeat));             // 62
    file.read((uint8_t *)&_prefs.manual_add_contacts, sizeof(_prefs.manual_add_contacts)); // 63
    file.read((uint8_t *)&_prefs.bw, sizeof(_prefs.bw));                                   // 64
    file.read((uint8_t *)&_prefs.tx_power_dbm, sizeof(_prefs.tx_power_dbm));               // 68
    file.read((uint8_t *)&_prefs.telemetry_mode_base, sizeof(_prefs.telemetry_mode_base)); // 69
    file.read((uint8_t *)&_prefs.telemetry_mode_loc, sizeof(_prefs.telemetry_mode_loc));   // 70
    file.read((uint8_t *)&_prefs.telemetry_mode_env, sizeof(_prefs.telemetry_mode_env));   // 71
    file.read((uint8_t *)&_prefs.rx_delay_base, sizeof(_prefs.rx_delay_base));             // 72
    file.read((uint8_t *)&_prefs.advert_loc_policy, sizeof(_prefs.advert_loc_policy));     // 76
    file.read((uint8_t *)&_prefs.multi_acks, sizeof(_prefs.multi_acks));                   // 77
    file.read((uint8_t *)&_prefs.path_hash_mode, sizeof(_prefs.path_hash_mode));           // 78
    file.read(pad, 1);                                                                     // 79
    file.read((uint8_t *)&_prefs.ble_pin, sizeof(_prefs.ble_pin));                         // 80
    file.read((uint8_t *)&_prefs.buzzer_quiet, sizeof(_prefs.buzzer_quiet));               // 84
    file.read((uint8_t *)&_prefs.gps_enabled, sizeof(_prefs.gps_enabled));                 // 85
    file.read((uint8_t *)&_prefs.gps_interval, sizeof(_prefs.gps_interval));               // 86
    file.read((uint8_t *)&_prefs.autoadd_config, sizeof(_prefs.autoadd_config));           // 87
    file.read((uint8_t *)&_prefs.autoadd_max_hops, sizeof(_prefs.autoadd_max_hops));       // 88
    file.read((uint8_t *)&_prefs.rx_boosted_gain, sizeof(_prefs.rx_boosted_gain));         // 89
    file.read((uint8_t *)_prefs.default_scope_name, sizeof(_prefs.default_scope_name));    // 90
    file.read((uint8_t *)_prefs.default_scope_key, sizeof(_prefs.default_scope_key));     // 121

    // migrate old fields
    _prefs.setRepeatEn(_prefs._client_repeat != 0);

    file.close();
  }
}

bool DataStore::savePrefs(NodePrefs& _prefs) {
  File file = openWrite(_fs, "/prefs.json");
  if (file) {
    bool success = _prefs.saveSerial(file);
    file.close();
    return success;
  }
  return false;
}


static const char* HIVEFW_REPEATER_NEIGHBOURS_FILE =
  "/hivefw_repeater_neighbours";
static const uint8_t HIVEFW_REPEATER_NEIGHBOURS_MAGIC[4] = {
  'H', 'N', 'B', '1'
};

int DataStore::loadRepeaterNeighbours(
  HiveFWRepeaterNeighbourRecord dest[],
  int max_count
) {
  if (dest == nullptr || max_count <= 0) return 0;

  memset(
    dest,
    0,
    sizeof(HiveFWRepeaterNeighbourRecord) * max_count
  );

  if (!_fs->exists(HIVEFW_REPEATER_NEIGHBOURS_FILE)) return 0;

  File file = openRead(_fs, HIVEFW_REPEATER_NEIGHBOURS_FILE);
  if (!file) return 0;

  uint8_t magic[4];
  if (
    file.read(magic, sizeof(magic)) != (int)sizeof(magic) ||
    memcmp(
      magic,
      HIVEFW_REPEATER_NEIGHBOURS_MAGIC,
      sizeof(magic)
    ) != 0
  ) {
    file.close();
    return 0;
  }

  uint8_t stored_count = 0;
  if (file.read(&stored_count, 1) != 1) {
    file.close();
    return 0;
  }

  int loaded = 0;
  for (
    int i = 0;
    i < stored_count && loaded < max_count;
    i++
  ) {
    HiveFWRepeaterNeighbourRecord record;
    if (
      file.read(
        (uint8_t*)&record,
        sizeof(record)
      ) != (int)sizeof(record)
    ) {
      break;
    }

    bool has_key = false;
    for (size_t j = 0; j < sizeof(record.pub_key); j++) {
      if (record.pub_key[j] != 0) {
        has_key = true;
        break;
      }
    }

    if (!has_key || record.heard_timestamp == 0) continue;
    dest[loaded++] = record;
  }

  file.close();
  return loaded;
}

bool DataStore::saveRepeaterNeighbours(
  const HiveFWRepeaterNeighbourRecord src[],
  int count
) {
  if (count < 0 || count > 50) return false;

  if (count == 0) {
    if (_fs->exists(HIVEFW_REPEATER_NEIGHBOURS_FILE)) {
      _fs->remove(HIVEFW_REPEATER_NEIGHBOURS_FILE);
    }
    return true;
  }

  if (src == nullptr) return false;

  File file = openWrite(_fs, HIVEFW_REPEATER_NEIGHBOURS_FILE);
  if (!file) return false;

  bool success =
    file.write(
      HIVEFW_REPEATER_NEIGHBOURS_MAGIC,
      sizeof(HIVEFW_REPEATER_NEIGHBOURS_MAGIC)
    ) == sizeof(HIVEFW_REPEATER_NEIGHBOURS_MAGIC);

  const uint8_t stored_count = (uint8_t)count;
  success =
    success &&
    file.write(&stored_count, 1) == 1;

  for (int i = 0; success && i < count; i++) {
    success =
      file.write(
        (const uint8_t*)&src[i],
        sizeof(src[i])
      ) == sizeof(src[i]);
  }

  file.close();
  if (!success) {
    _fs->remove(HIVEFW_REPEATER_NEIGHBOURS_FILE);
  }
  return success;
}


// ============================================================================
// HIVEFW — HOME ASSISTANT COMMAND STORE
//
// Formato:
//   4 bytes  magic "HAC1"
//   1 byte   quantidade
//   N x:
//      HIVEFW_HA_NAME_LEN bytes
//      HIVEFW_HA_COMMAND_LEN bytes
//
// Não existem defaults.
// Se o ficheiro não existir, o menu começa vazio.
// ============================================================================

static const char* HIVEFW_HA_COMMANDS_FILE =
  "/hivefw_ha_commands";

static const uint8_t HIVEFW_HA_FILE_MAGIC[4] = {
  'H', 'A', 'C', '1'
};

// Trailer opcional no MESMO ficheiro.
//
// Se não existir:
//   nenhum comando usa localização.
//
// Se existir:
//   cada bit indica se o comando correspondente
//   deve anexar coordenadas GPS.
static const uint8_t HIVEFW_HA_LOCATION_MAGIC[4] = {
  'L', 'O', 'C', '1'
};


int DataStore::loadHACommands(
  HiveFWHACommand dest[],
  int max_count
) {

  if (dest == nullptr || max_count <= 0) {
    return 0;
  }

  if (max_count > HIVEFW_HA_MAX_COMMANDS) {
    max_count = HIVEFW_HA_MAX_COMMANDS;
  }

  memset(
    dest,
    0,
    sizeof(HiveFWHACommand) * max_count
  );

  if (!_fs->exists(HIVEFW_HA_COMMANDS_FILE)) {
    return 0;
  }

  File file =
    openRead(
      _fs,
      HIVEFW_HA_COMMANDS_FILE
    );

  if (!file) {
    return 0;
  }

  uint8_t magic[4];

  if (
    file.read(
      magic,
      sizeof(magic)
    ) != (int)sizeof(magic)
  ) {

    file.close();
    return 0;
  }

  if (
    memcmp(
      magic,
      HIVEFW_HA_FILE_MAGIC,
      sizeof(magic)
    ) != 0
  ) {

    file.close();
    return 0;
  }

  uint8_t stored_count = 0;

  if (
    file.read(
      &stored_count,
      1
    ) != 1
  ) {

    file.close();
    return 0;
  }

  int loaded = 0;

  for (
    int i = 0;
    i < stored_count;
    i++
  ) {

    HiveFWHACommand command;

    memset(
      &command,
      0,
      sizeof(command)
    );

    if (
      file.read(
        (uint8_t*)command.name,
        sizeof(command.name)
      ) != (int)sizeof(command.name)
    ) {
      break;
    }

    if (
      file.read(
        (uint8_t*)command.command,
        sizeof(command.command)
      ) != (int)sizeof(command.command)
    ) {
      break;
    }

    command.name[
      sizeof(command.name) - 1
    ] = '\0';

    command.command[
      sizeof(command.command) - 1
    ] = '\0';

    if (
      loaded < max_count &&
      command.name[0] != '\0' &&
      command.command[0] != '\0'
    ) {

      dest[loaded] = command;
      loaded++;
    }
  }

  // ========================================================
  // HIVEFW — LOCALIZAÇÃO OPCIONAL
  //
  // Os registos nome+comando permanecem exatamente iguais
  // ao formato anterior.
  //
  // Apenas procuramos um trailer opcional:
  //
  //   LOC1
  //   uint16_t location_mask
  //
  // Se não estiver presente, flags permanece 0.
  // ========================================================

  if (
    loaded == stored_count &&
    file.available() >= 6
  ) {

    uint8_t location_magic[4];

    if (
      file.read(
        location_magic,
        sizeof(location_magic)
      ) ==
      (int)sizeof(location_magic) &&
      memcmp(
        location_magic,
        HIVEFW_HA_LOCATION_MAGIC,
        sizeof(location_magic)
      ) == 0
    ) {

      uint8_t mask_bytes[2];

      if (
        file.read(
          mask_bytes,
          sizeof(mask_bytes)
        ) ==
        (int)sizeof(mask_bytes)
      ) {

        uint16_t location_mask =
          (uint16_t)mask_bytes[0] |
          (
            (uint16_t)mask_bytes[1]
            << 8
          );

        for (
          int i = 0;
          i < loaded && i < 16;
          i++
        ) {

          if (
            location_mask &
            ((uint16_t)1 << i)
          ) {

            dest[i].flags |=
              HIVEFW_HA_FLAG_LOCATION;
          }
        }
      }
    }
  }

  file.close();

  return loaded;
}


bool DataStore::saveHACommands(
  const HiveFWHACommand src[],
  int count
) {

  if (
    count < 0 ||
    count > HIVEFW_HA_MAX_COMMANDS
  ) {
    return false;
  }

  // Sem comandos = sem ficheiro.
  if (count == 0) {

    if (_fs->exists(HIVEFW_HA_COMMANDS_FILE)) {
      _fs->remove(HIVEFW_HA_COMMANDS_FILE);
    }

    return true;
  }

  if (src == nullptr) {
    return false;
  }

  File file =
    openWrite(
      _fs,
      HIVEFW_HA_COMMANDS_FILE
    );

  if (!file) {
    return false;
  }

  if (
    file.write(
      HIVEFW_HA_FILE_MAGIC,
      sizeof(HIVEFW_HA_FILE_MAGIC)
    ) != sizeof(HIVEFW_HA_FILE_MAGIC)
  ) {

    file.close();
    return false;
  }

  uint8_t stored_count =
    (uint8_t)count;

  if (
    file.write(
      &stored_count,
      1
    ) != 1
  ) {

    file.close();
    return false;
  }

  for (int i = 0; i < count; i++) {

    HiveFWHACommand command;

    memset(
      &command,
      0,
      sizeof(command)
    );

    strncpy(
      command.name,
      src[i].name,
      sizeof(command.name) - 1
    );

    strncpy(
      command.command,
      src[i].command,
      sizeof(command.command) - 1
    );

    if (
      file.write(
        (const uint8_t*)command.name,
        sizeof(command.name)
      ) != sizeof(command.name)
    ) {

      file.close();
      return false;
    }

    if (
      file.write(
        (const uint8_t*)command.command,
        sizeof(command.command)
      ) != sizeof(command.command)
    ) {

      file.close();
      return false;
    }
  }

  // ========================================================
  // HIVEFW — TRAILER OPCIONAL DE LOCALIZAÇÃO
  //
  // Se nenhum comando usar localização não escrevemos
  // absolutamente nada extra. O ficheiro fica compatível
  // byte-a-byte com o formato original.
  // ========================================================

  uint16_t location_mask = 0;

  for (
    int i = 0;
    i < count && i < 16;
    i++
  ) {

    if (
      src[i].flags &
      HIVEFW_HA_FLAG_LOCATION
    ) {

      location_mask |=
        ((uint16_t)1 << i);
    }
  }

  if (location_mask != 0) {

    if (
      file.write(
        HIVEFW_HA_LOCATION_MAGIC,
        sizeof(HIVEFW_HA_LOCATION_MAGIC)
      ) !=
      sizeof(HIVEFW_HA_LOCATION_MAGIC)
    ) {

      file.close();
      return false;
    }

    uint8_t mask_bytes[2] = {
      (uint8_t)(
        location_mask & 0xFF
      ),
      (uint8_t)(
        (location_mask >> 8) &
        0xFF
      )
    };

    if (
      file.write(
        mask_bytes,
        sizeof(mask_bytes)
      ) !=
      sizeof(mask_bytes)
    ) {

      file.close();
      return false;
    }
  }

  file.close();

  return true;
}



static const char* HIVEFW_NODE_STORE_FILE = "/hivefw_nodes4";

static void hivefwNodeToContact(const HiveFWNodeRecord& rec, ContactInfo& c) {
  memset(&c, 0, sizeof(c));
  c.id = mesh::Identity(rec.pub_key);
  memcpy(c.name, rec.name, sizeof(c.name));
  c.name[sizeof(c.name) - 1] = '\0';
  c.type = rec.type;
  c.flags = rec.flags;
  c.out_path_len = rec.out_path_len;
  c.last_advert_timestamp = rec.last_advert_timestamp;
  c.lastmod = rec.lastmod;
  c.sync_since = rec.sync_since;
  c.gps_lat = rec.gps_lat;
  c.gps_lon = rec.gps_lon;
  memcpy(c.out_path, rec.out_path, sizeof(c.out_path));
  c.shared_secret_valid = false;
}

static void hivefwContactToNode(const ContactInfo& c, HiveFWNodeRecord& rec, bool added, uint32_t heard) {
  memset(&rec, 0, sizeof(rec));
  memcpy(rec.pub_key, c.id.pub_key, PUB_KEY_SIZE);
  memcpy(rec.name, c.name, sizeof(rec.name));
  rec.type = c.type;
  rec.flags = c.flags;
  rec.state = HIVEFW_NODE_STATE_VALID | (added ? HIVEFW_NODE_STATE_ADDED : 0);
  rec.out_path_len = c.out_path_len;
  rec.last_advert_timestamp = c.last_advert_timestamp;
  rec.lastmod = c.lastmod;
  rec.sync_since = c.sync_since;
  rec.heard_timestamp = heard;
  rec.gps_lat = c.gps_lat;
  rec.gps_lon = c.gps_lon;
  memcpy(rec.out_path, c.out_path, sizeof(rec.out_path));
}

static File hivefwOpenNodeStoreUpdate(FILESYSTEM* fs) {
#if defined(NRF52_PLATFORM) || defined(STM32_PLATFORM)
  File f = fs->open(HIVEFW_NODE_STORE_FILE, FILE_O_RDWR);
  if (!f) f = fs->open(HIVEFW_NODE_STORE_FILE, FILE_O_WRITE);
  return f;
#elif defined(RP2040_PLATFORM)
  File f = fs->open(HIVEFW_NODE_STORE_FILE, "r+");
  if (!f) f = fs->open(HIVEFW_NODE_STORE_FILE, "w+");
  return f;
#else
  File f = fs->open(HIVEFW_NODE_STORE_FILE, "r+");
  if (!f) f = fs->open(HIVEFW_NODE_STORE_FILE, "w+");
  return f;
#endif
}

bool DataStore::upsertNode(const ContactInfo& contact, bool added, uint32_t heard_timestamp) {
  File file = hivefwOpenNodeStoreUpdate(_getContactsChannelsFS());
  if (!file) return false;
  HiveFWNodeRecord rec;
  uint32_t offset = 0;
  bool found = false;
  while (file.read((uint8_t*)&rec, sizeof(rec)) == sizeof(rec)) {
    if ((rec.state & HIVEFW_NODE_STATE_VALID) &&
        memcmp(rec.pub_key, contact.id.pub_key, PUB_KEY_SIZE) == 0) {
      found = true;
      break;
    }
    offset += sizeof(rec);
  }
  HiveFWNodeRecord updated;
  hivefwContactToNode(contact, updated, added, heard_timestamp);
  if (found) {
    if (rec.state & HIVEFW_NODE_STATE_ADDED) updated.state |= HIVEFW_NODE_STATE_ADDED;
    if (heard_timestamp == 0) updated.heard_timestamp = rec.heard_timestamp;
    file.seek(offset);
  } else {
    file.seek(file.size());
  }
  bool ok = file.write((const uint8_t*)&updated, sizeof(updated)) == sizeof(updated);
  file.close();
  return ok;
}

bool DataStore::setNodeAdded(const uint8_t pub_key[PUB_KEY_SIZE], bool added) {
  File file = hivefwOpenNodeStoreUpdate(_getContactsChannelsFS());
  if (!file) return false;
  HiveFWNodeRecord rec;
  uint32_t offset = 0;
  while (file.read((uint8_t*)&rec, sizeof(rec)) == sizeof(rec)) {
    if ((rec.state & HIVEFW_NODE_STATE_VALID) &&
        memcmp(rec.pub_key, pub_key, PUB_KEY_SIZE) == 0) {
      if (added) rec.state |= HIVEFW_NODE_STATE_ADDED;
      else rec.state &= ~HIVEFW_NODE_STATE_ADDED;
      file.seek(offset);
      bool ok = file.write((const uint8_t*)&rec, sizeof(rec)) == sizeof(rec);
      file.close();
      return ok;
    }
    offset += sizeof(rec);
  }
  file.close();
  return false;
}

bool DataStore::loadNodeByKey(const uint8_t* pub_key, int prefix_len, ContactInfo& contact, bool added_only) {
  if (!pub_key || prefix_len <= 0 || prefix_len > PUB_KEY_SIZE) return false;
  File file = openRead(_getContactsChannelsFS(), HIVEFW_NODE_STORE_FILE);
  if (!file) return false;
  HiveFWNodeRecord rec;
  while (file.read((uint8_t*)&rec, sizeof(rec)) == sizeof(rec)) {
    if (!(rec.state & HIVEFW_NODE_STATE_VALID)) continue;
    if (added_only && !(rec.state & HIVEFW_NODE_STATE_ADDED)) continue;
    if (memcmp(rec.pub_key, pub_key, prefix_len) == 0) {
      hivefwNodeToContact(rec, contact);
      file.close();
      return true;
    }
  }
  file.close();
  return false;
}

int DataStore::loadNodesByHash(const uint8_t* hash, ContactInfo dest[], int max_matches) {
  if (!hash || !dest || max_matches <= 0) return 0;
  File file = openRead(_getContactsChannelsFS(), HIVEFW_NODE_STORE_FILE);
  if (!file) return 0;
  int count = 0;
  HiveFWNodeRecord rec;
  while (count < max_matches && file.read((uint8_t*)&rec, sizeof(rec)) == sizeof(rec)) {
    if (!(rec.state & HIVEFW_NODE_STATE_VALID)) continue;
    mesh::Identity id(rec.pub_key);
    if (id.isHashMatch(hash)) hivefwNodeToContact(rec, dest[count++]);
  }
  file.close();
  return count;
}

uint32_t DataStore::countNodes(bool added_only) {
  File file = openRead(_getContactsChannelsFS(), HIVEFW_NODE_STORE_FILE);
  if (!file) return 0;
  uint32_t count = 0;
  HiveFWNodeRecord rec;
  while (file.read((uint8_t*)&rec, sizeof(rec)) == sizeof(rec)) {
    if (!(rec.state & HIVEFW_NODE_STATE_VALID)) continue;
    if (added_only && !(rec.state & HIVEFW_NODE_STATE_ADDED)) continue;
    count++;
  }
  file.close();
  return count;
}

bool DataStore::getNodeByIndex(uint32_t index, ContactInfo& contact, bool added_only, uint32_t* heard_timestamp) {
  File file = openRead(_getContactsChannelsFS(), HIVEFW_NODE_STORE_FILE);
  if (!file) return false;
  uint32_t logical = 0;
  HiveFWNodeRecord rec;
  while (file.read((uint8_t*)&rec, sizeof(rec)) == sizeof(rec)) {
    if (!(rec.state & HIVEFW_NODE_STATE_VALID)) continue;
    if (added_only && !(rec.state & HIVEFW_NODE_STATE_ADDED)) continue;
    if (logical++ == index) {
      hivefwNodeToContact(rec, contact);
      if (heard_timestamp) *heard_timestamp = rec.heard_timestamp;
      file.close();
      return true;
    }
  }
  file.close();
  return false;
}

void DataStore::migrateContactsToNodeStore() {
  if (_getContactsChannelsFS()->exists(HIVEFW_NODE_STORE_FILE)) return;
  File file = openRead(_getContactsChannelsFS(), "/contacts3");
  if (!file) return;
  while (true) {
    ContactInfo c;
    memset(&c, 0, sizeof(c));
    uint8_t pub_key[32];
    uint8_t unused;
    bool success = (file.read(pub_key, 32) == 32);
    success = success && (file.read((uint8_t *)&c.name, 32) == 32);
    success = success && (file.read(&c.type, 1) == 1);
    success = success && (file.read(&c.flags, 1) == 1);
    success = success && (file.read(&unused, 1) == 1);
    success = success && (file.read((uint8_t *)&c.sync_since, 4) == 4);
    success = success && (file.read((uint8_t *)&c.out_path_len, 1) == 1);
    success = success && (file.read((uint8_t *)&c.last_advert_timestamp, 4) == 4);
    success = success && (file.read(c.out_path, 64) == 64);
    success = success && (file.read((uint8_t *)&c.lastmod, 4) == 4);
    success = success && (file.read((uint8_t *)&c.gps_lat, 4) == 4);
    success = success && (file.read((uint8_t *)&c.gps_lon, 4) == 4);
    if (!success) break;
    c.id = mesh::Identity(pub_key);
    upsertNode(c, true, c.lastmod);
  }
  file.close();
}

void DataStore::loadContacts(DataStoreHost* host) {
  if (_getContactsChannelsFS()->exists(HIVEFW_NODE_STORE_FILE)) {
    uint32_t idx = 0;
    ContactInfo c;
    while (getNodeByIndex(idx++, c, true, nullptr)) {
      if (!host->onContactLoaded(c)) break;
    }
    return;
  }

File file = openRead(_getContactsChannelsFS(), "/contacts3");
    if (file) {
      bool full = false;
      while (!full) {
        ContactInfo c;
        uint8_t pub_key[32];
        uint8_t unused;

        bool success = (file.read(pub_key, 32) == 32);
        success = success && (file.read((uint8_t *)&c.name, 32) == 32);
        success = success && (file.read(&c.type, 1) == 1);
        success = success && (file.read(&c.flags, 1) == 1);
        success = success && (file.read(&unused, 1) == 1);
        success = success && (file.read((uint8_t *)&c.sync_since, 4) == 4); // was 'reserved'
        success = success && (file.read((uint8_t *)&c.out_path_len, 1) == 1);
        success = success && (file.read((uint8_t *)&c.last_advert_timestamp, 4) == 4);
        success = success && (file.read(c.out_path, 64) == 64);
        success = success && (file.read((uint8_t *)&c.lastmod, 4) == 4);
        success = success && (file.read((uint8_t *)&c.gps_lat, 4) == 4);
        success = success && (file.read((uint8_t *)&c.gps_lon, 4) == 4);

        if (!success) break; // EOF

        c.id = mesh::Identity(pub_key);
        if (!host->onContactLoaded(c)) full = true;
      }
      file.close();
    }
}

void DataStore::saveContacts(DataStoreHost* host, bool (*filter)(const ContactInfo& c)) {
  File file = openWrite(_getContactsChannelsFS(), "/contacts3");
  if (file) {
    uint32_t idx = 0;
    ContactInfo c;
    uint8_t unused = 0;

    while (host->getContactForSave(idx, c)) {
      if (filter && !filter(c)) {
        idx++;  // advance to next contact
        continue;
      }
      bool success = (file.write(c.id.pub_key, 32) == 32);
      success = success && (file.write((uint8_t *)&c.name, 32) == 32);
      success = success && (file.write(&c.type, 1) == 1);
      success = success && (file.write(&c.flags, 1) == 1);
      success = success && (file.write(&unused, 1) == 1);
      success = success && (file.write((uint8_t *)&c.sync_since, 4) == 4);
      success = success && (file.write((uint8_t *)&c.out_path_len, 1) == 1);
      success = success && (file.write((uint8_t *)&c.last_advert_timestamp, 4) == 4);
      success = success && (file.write(c.out_path, 64) == 64);
      success = success && (file.write((uint8_t *)&c.lastmod, 4) == 4);
      success = success && (file.write((uint8_t *)&c.gps_lat, 4) == 4);
      success = success && (file.write((uint8_t *)&c.gps_lon, 4) == 4);

      if (!success) break; // write failed
      upsertNode(c, true, c.lastmod);

      idx++;  // advance to next contact
    }
    file.close();
  }
}

void DataStore::loadChannels(DataStoreHost* host) {
    File file = openRead(_getContactsChannelsFS(), "/channels2");
    if (file) {
      bool full = false;
      uint8_t channel_idx = 0;
      while (!full) {
        ChannelDetails ch;
        uint8_t unused[4];

        bool success = (file.read(unused, 4) == 4);
        success = success && (file.read((uint8_t *)ch.name, 32) == 32);
        success = success && (file.read((uint8_t *)ch.channel.secret, 32) == 32);

        if (!success) break; // EOF

        if (host->onChannelLoaded(channel_idx, ch)) {
          channel_idx++;
        } else {
          full = true;
        }
      }
      file.close();
    }
}

void DataStore::saveChannels(DataStoreHost* host) {
  File file = openWrite(_getContactsChannelsFS(), "/channels2");
  if (file) {
    uint8_t channel_idx = 0;
    ChannelDetails ch;
    uint8_t unused[4];
    memset(unused, 0, 4);

    while (host->getChannelForSave(channel_idx, ch)) {
      bool success = (file.write(unused, 4) == 4);
      success = success && (file.write((uint8_t *)ch.name, 32) == 32);
      success = success && (file.write((uint8_t *)ch.channel.secret, 32) == 32);

      if (!success) break; // write failed
      channel_idx++;
    }
    file.close();
  }
}

#if defined(NRF52_PLATFORM) || defined(STM32_PLATFORM)

#define MAX_ADVERT_PKT_LEN   (2 + 32 + PUB_KEY_SIZE + 4 + SIGNATURE_SIZE + MAX_ADVERT_DATA_SIZE)

struct BlobRec {
  uint32_t timestamp;
  uint8_t  key[7];
  uint8_t  len;
  uint8_t  data[MAX_ADVERT_PKT_LEN];
};

void DataStore::checkAdvBlobFile() {
  if (!_getContactsChannelsFS()->exists("/adv_blobs")) {
    File file = openWrite(_getContactsChannelsFS(), "/adv_blobs");
    if (file) {
      BlobRec zeroes;
      memset(&zeroes, 0, sizeof(zeroes));
      for (int i = 0; i < MAX_BLOBRECS; i++) {     // pre-allocate to fixed size
        file.write((uint8_t *) &zeroes, sizeof(zeroes));
      }
      file.close();
    }
  }
}

void DataStore::migrateToSecondaryFS() {
  // migrate old adv_blobs, contacts3 and channels2 files to secondary FS if they don't already exist
  if (!_fsExtra->exists("/adv_blobs")) {
    if (_fs->exists("/adv_blobs")) {
    File oldAdvBlobs = openRead(_fs, "/adv_blobs");
    File newAdvBlobs = openWrite(_fsExtra, "/adv_blobs");

    if (oldAdvBlobs && newAdvBlobs) {
      BlobRec rec;
      size_t count = 0;

      // Copy 20 BlobRecs from old to new
      while (count < 20 && oldAdvBlobs.read((uint8_t *)&rec, sizeof(rec)) == sizeof(rec)) {
        newAdvBlobs.seek(count * sizeof(BlobRec));
        newAdvBlobs.write((uint8_t *)&rec, sizeof(rec));
        count++;
      }
    }
    if (oldAdvBlobs) oldAdvBlobs.close();
    if (newAdvBlobs) newAdvBlobs.close();
    _fs->remove("/adv_blobs");
    }
  }
  if (!_fsExtra->exists("/contacts3")) {
    if (_fs->exists("/contacts3")) {
      File oldFile = openRead(_fs, "/contacts3");
      File newFile = openWrite(_fsExtra, "/contacts3");

      if (oldFile && newFile) {
        uint8_t buf[64];
        int n;
        while ((n = oldFile.read(buf, sizeof(buf))) > 0) {
          newFile.write(buf, n);
        }
      }
      if (oldFile) oldFile.close();
      if (newFile) newFile.close();
      _fs->remove("/contacts3");
    }
  }
  if (!_fsExtra->exists("/channels2")) {
    if (_fs->exists("/channels2")) {
      File oldFile = openRead(_fs, "/channels2");
      File newFile = openWrite(_fsExtra, "/channels2");

      if (oldFile && newFile) {
        uint8_t buf[64];
        int n;
        while ((n = oldFile.read(buf, sizeof(buf))) > 0) {
          newFile.write(buf, n);
        }
      }
      if (oldFile) oldFile.close();
      if (newFile) newFile.close();
      _fs->remove("/channels2");
    }
  }
  // cleanup nodes which have been testing the extra fs, copy _main.id and new_prefs back to primary
  if (_fsExtra->exists("/_main.id")) {
      if (_fs->exists("/_main.id")) {_fs->remove("/_main.id");}
      File oldFile = openRead(_fsExtra, "/_main.id");
      File newFile = openWrite(_fs, "/_main.id");

      if (oldFile && newFile) {
        uint8_t buf[64];
        int n;
        while ((n = oldFile.read(buf, sizeof(buf))) > 0) {
          newFile.write(buf, n);
        }
      }
      if (oldFile) oldFile.close();
      if (newFile) newFile.close();
      _fsExtra->remove("/_main.id");
  }
  if (_fsExtra->exists("/new_prefs")) {
    if (_fs->exists("/new_prefs")) {_fs->remove("/new_prefs");}
      File oldFile = openRead(_fsExtra, "/new_prefs");
      File newFile = openWrite(_fs, "/new_prefs");

      if (oldFile && newFile) {
        uint8_t buf[64];
        int n;
        while ((n = oldFile.read(buf, sizeof(buf))) > 0) {
          newFile.write(buf, n);
        }
      }
      if (oldFile) oldFile.close();
      if (newFile) newFile.close();
      _fsExtra->remove("/new_prefs");
  }
  // remove files from where they should not be anymore
  if (_fs->exists("/adv_blobs")) {
    _fs->remove("/adv_blobs");
  }
  if (_fs->exists("/contacts3")) {
    _fs->remove("/contacts3");
  }
  if (_fs->exists("/channels2")) {
    _fs->remove("/channels2");
  }
  if (_fsExtra->exists("/_main.id")) {
    _fsExtra->remove("/_main.id");
  }
  if (_fsExtra->exists("/new_prefs")) {
    _fsExtra->remove("/new_prefs");
  }
}

uint8_t DataStore::getBlobByKey(const uint8_t key[], int key_len, uint8_t dest_buf[]) {
  File file = openRead(_getContactsChannelsFS(), "/adv_blobs");
  uint8_t len = 0;  // 0 = not found
  if (file) {
    BlobRec tmp;
    while (file.read((uint8_t *) &tmp, sizeof(tmp)) == sizeof(tmp)) {
      if (memcmp(key, tmp.key, sizeof(tmp.key)) == 0) {  // only match by 7 byte prefix
        len = tmp.len;
        memcpy(dest_buf, tmp.data, len);
        break;
      }
    }
    file.close();
  }
  return len;
}

bool DataStore::putBlobByKey(const uint8_t key[], int key_len, const uint8_t src_buf[], uint8_t len) {
  if (len < PUB_KEY_SIZE+4+SIGNATURE_SIZE || len > MAX_ADVERT_PKT_LEN) return false;
  checkAdvBlobFile();
  File file = _getContactsChannelsFS()->open("/adv_blobs", FILE_O_WRITE);
  if (file) {
    uint32_t pos = 0, found_pos = 0;
    uint32_t min_timestamp = 0xFFFFFFFF;

    // search for matching key OR evict by oldest timestamp
    BlobRec tmp;
    file.seek(0);
    while (file.read((uint8_t *) &tmp, sizeof(tmp)) == sizeof(tmp)) {
      if (memcmp(key, tmp.key, sizeof(tmp.key)) == 0) {  // only match by 7 byte prefix
        found_pos = pos;
        break;
      }
      if (tmp.timestamp < min_timestamp) {
        min_timestamp = tmp.timestamp;
        found_pos = pos;
      }

      pos += sizeof(tmp);
    }

    memcpy(tmp.key, key, sizeof(tmp.key));  // just record 7 byte prefix of key
    memcpy(tmp.data, src_buf, len);
    tmp.len = len;
    tmp.timestamp = _clock->getCurrentTime();

    file.seek(found_pos);
    file.write((uint8_t *) &tmp, sizeof(tmp));

    file.close();
    return true;
  }
  return false; // error
}
bool DataStore::deleteBlobByKey(const uint8_t key[], int key_len) {
  return true; // this is just a stub on NRF52/STM32 platforms
}
#else
inline void makeBlobPath(const uint8_t key[], int key_len, char* path, size_t path_size) {
  char fname[18];
  if (key_len > 8) key_len = 8; // just use first 8 bytes (prefix)
  mesh::Utils::toHex(fname, key, key_len);
  sprintf(path, "/bl/%s", fname);
}

uint8_t DataStore::getBlobByKey(const uint8_t key[], int key_len, uint8_t dest_buf[]) {
  char path[64];
  makeBlobPath(key, key_len, path, sizeof(path));

  if (_fs->exists(path)) {
    File f = openRead(_fs, path);
    if (f) {
      int len = f.read(dest_buf, 255); // currently MAX 255 byte blob len supported!!
      f.close();
      return len;
    }
  }
  return 0; // not found
}

bool DataStore::putBlobByKey(const uint8_t key[], int key_len, const uint8_t src_buf[], uint8_t len) {
  char path[64];
  makeBlobPath(key, key_len, path, sizeof(path));

  File f = openWrite(_fs, path);
  if (f) {
    int n = f.write(src_buf, len);
    f.close();
    if (n == len) return true; // success!

    _fs->remove(path); // blob was only partially written!
  }
  return false; // error
}

bool DataStore::deleteBlobByKey(const uint8_t key[], int key_len) {
  char path[64];
  makeBlobPath(key, key_len, path, sizeof(path));

  _fs->remove(path);
  
  return true; // return true even if file did not exist
}
#endif
