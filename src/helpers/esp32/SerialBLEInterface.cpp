#include "SerialBLEInterface.h"
#include "esp_mac.h"
#include "esp_system.h"
#include <Update.h>

// See the following for generating UUIDs:
// https://www.uuidgenerator.net/

#define SERVICE_UUID           "6E400001-B5A3-F393-E0A9-E50E24DCCA9E" // UART service UUID
#define CHARACTERISTIC_UUID_RX "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_UUID_TX "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"

// HiveFW ESP32 BLE OTA service. This UUID is not advertised (the NUS UUID
// remains the authoritative Companion advertisement), but is discoverable
// after connecting to a HiveFW V3 BLE radio.
#define HIVEFW_OTA_SERVICE_UUID "A6ED0401-D344-460A-8075-B9E8EC90D71B"
#define HIVEFW_OTA_CONTROL_UUID "A6ED0402-D344-460A-8075-B9E8EC90D71B"
#define HIVEFW_OTA_DATA_UUID    "A6ED0403-D344-460A-8075-B9E8EC90D71B"

#define HIVEFW_OTA_OP_BEGIN 0x01
#define HIVEFW_OTA_OP_END   0x02
#define HIVEFW_OTA_OP_ABORT 0x03

#define HIVEFW_OTA_OK            0x00
#define HIVEFW_OTA_ERR_ARGUMENT  0x01
#define HIVEFW_OTA_ERR_BEGIN     0x02
#define HIVEFW_OTA_ERR_WRITE     0x03
#define HIVEFW_OTA_ERR_SIZE      0x04
#define HIVEFW_OTA_ERR_END       0x05

#define ADVERT_RESTART_DELAY  1000   // millis

void SerialBLEInterface::begin(const char* prefix, char* name, uint32_t pin_code) {
  _pin_code = pin_code;

  if (strcmp(name, "@@MAC") == 0) {
    uint8_t addr[8];
    memset(addr, 0, sizeof(addr));
    esp_efuse_mac_get_default(addr);
    sprintf(name, "%02X%02X%02X%02X%02X%02X",    // modify (IN-OUT param)
          addr[5], addr[4], addr[3], addr[2], addr[1], addr[0]);
  }
  char dev_name[32+16];
  sprintf(dev_name, "%s%s", prefix, name);

  // Create the BLE Device
  BLEDevice::init(dev_name);
  BLEDevice::setSecurityCallbacks(this);
  BLEDevice::setMTU(MAX_FRAME_SIZE);

  BLESecurity  sec;
  sec.setStaticPIN(pin_code);
  sec.setAuthenticationMode(ESP_LE_AUTH_REQ_SC_MITM_BOND);

  //BLEDevice::setPower(ESP_PWR_LVL_N8);

  // Create the BLE Server
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(this);

  // Create the BLE Service
  pService = pServer->createService(SERVICE_UUID);

  // Create a BLE Characteristic
  pTxCharacteristic = pService->createCharacteristic(CHARACTERISTIC_UUID_TX, BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY);
  pTxCharacteristic->setAccessPermissions(ESP_GATT_PERM_READ_ENC_MITM);
  pTxCharacteristic->addDescriptor(new BLE2902());

  BLECharacteristic * pRxCharacteristic = pService->createCharacteristic(CHARACTERISTIC_UUID_RX, BLECharacteristic::PROPERTY_WRITE);
  pRxCharacteristic->setAccessPermissions(ESP_GATT_PERM_WRITE_ENC_MITM);
  pRxCharacteristic->setCallbacks(this);

  // Optional HiveFW BLE OTA service for the ESP32/V3 BLE build. Both
  // characteristics inherit the same encrypted+MITM access policy as NUS.
  // Keeping it on a separate service means legacy Companion clients never see
  // OTA bytes as Companion frames.
  pOtaService = pServer->createService(HIVEFW_OTA_SERVICE_UUID);

  pOtaControlCharacteristic = pOtaService->createCharacteristic(
    HIVEFW_OTA_CONTROL_UUID,
    BLECharacteristic::PROPERTY_WRITE | BLECharacteristic::PROPERTY_NOTIFY
  );
  pOtaControlCharacteristic->setAccessPermissions(
    ESP_GATT_PERM_WRITE_ENC_MITM | ESP_GATT_PERM_READ_ENC_MITM
  );
  pOtaControlCharacteristic->addDescriptor(new BLE2902());
  pOtaControlCharacteristic->setCallbacks(this);

  pOtaDataCharacteristic = pOtaService->createCharacteristic(
    HIVEFW_OTA_DATA_UUID,
    BLECharacteristic::PROPERTY_WRITE
  );
  pOtaDataCharacteristic->setAccessPermissions(ESP_GATT_PERM_WRITE_ENC_MITM);
  pOtaDataCharacteristic->setCallbacks(this);

  pServer->getAdvertising()->addServiceUUID(SERVICE_UUID);
}

// -------- BLESecurityCallbacks methods

uint32_t SerialBLEInterface::onPassKeyRequest() {
  BLE_DEBUG_PRINTLN("onPassKeyRequest()");
  return _pin_code;
}

void SerialBLEInterface::onPassKeyNotify(uint32_t pass_key) {
  BLE_DEBUG_PRINTLN("onPassKeyNotify(%u)", pass_key);
}

bool SerialBLEInterface::onConfirmPIN(uint32_t pass_key) {
  BLE_DEBUG_PRINTLN("onConfirmPIN(%u)", pass_key);
  return true;
}

bool SerialBLEInterface::onSecurityRequest() {
  BLE_DEBUG_PRINTLN("onSecurityRequest()");
  return true;  // allow
}

void SerialBLEInterface::onAuthenticationComplete(esp_ble_auth_cmpl_t cmpl) {
  if (cmpl.success) {
    BLE_DEBUG_PRINTLN(" - SecurityCallback - Authentication Success");
    deviceConnected = true;
  } else {
    BLE_DEBUG_PRINTLN(" - SecurityCallback - Authentication Failure*");

    //pServer->removePeerDevice(pServer->getConnId(), true);
    pServer->disconnect(pServer->getConnId());
    adv_restart_time = millis() + ADVERT_RESTART_DELAY;
  }
}

// -------- BLEServerCallbacks methods

void SerialBLEInterface::onConnect(BLEServer* pServer) {
}

void SerialBLEInterface::onConnect(BLEServer* pServer, esp_ble_gatts_cb_param_t *param) {
  BLE_DEBUG_PRINTLN("onConnect(), conn_id=%d, mtu=%d", param->connect.conn_id, pServer->getPeerMTU(param->connect.conn_id));
  last_conn_id = param->connect.conn_id;
}

void SerialBLEInterface::onMtuChanged(BLEServer* pServer, esp_ble_gatts_cb_param_t* param) {
  BLE_DEBUG_PRINTLN("onMtuChanged(), mtu=%d", pServer->getPeerMTU(param->mtu.conn_id));
}

void SerialBLEInterface::onDisconnect(BLEServer* pServer) {
  BLE_DEBUG_PRINTLN("onDisconnect()");
  deviceConnected = false;
  if (_otaActive && !_otaRebootPending) {
    resetOtaState(true);
  }
  if (_isEnabled) {
    adv_restart_time = millis() + ADVERT_RESTART_DELAY;
  }
}

// -------- BLECharacteristicCallbacks methods

void SerialBLEInterface::onWrite(BLECharacteristic* pCharacteristic, esp_ble_gatts_cb_param_t* param) {
  uint8_t* rxValue = pCharacteristic->getData();
  int len = pCharacteristic->getLength();

  if (pCharacteristic == pOtaControlCharacteristic) {
    handleOtaControl(rxValue, len);
    return;
  }
  if (pCharacteristic == pOtaDataCharacteristic) {
    handleOtaData(rxValue, len);
    return;
  }

  if (len > MAX_FRAME_SIZE) {
    BLE_DEBUG_PRINTLN("ERROR: onWrite(), frame too big, len=%d", len);
  } else {
    Frame frame = {};
    frame.len = len;
    memcpy(frame.buf, rxValue, len);

    if (xQueueSend(recv_queue, &frame, 0) != pdTRUE) {
      BLE_DEBUG_PRINTLN("ERROR: onWrite(), recv_queue is full!");
    }
  }
}

void SerialBLEInterface::resetOtaState(bool abortUpdate) {
  if (abortUpdate && _otaActive) {
    Update.abort();
  }
  _otaActive = false;
  _otaExpectedSize = 0;
  _otaReceived = 0;
  if (!_otaRebootPending) {
    _otaRebootAt = 0;
  }
}

void SerialBLEInterface::notifyOtaStatus(uint8_t opcode, uint8_t status) {
  if (!pOtaControlCharacteristic || !deviceConnected) return;

  uint8_t reply[6];
  reply[0] = opcode;
  reply[1] = status;
  uint32_t received = (uint32_t)_otaReceived;
  memcpy(&reply[2], &received, sizeof(received));

  pOtaControlCharacteristic->setValue(reply, sizeof(reply));
  pOtaControlCharacteristic->notify();
}

void SerialBLEInterface::handleOtaControl(const uint8_t* data, size_t len) {
  if (!data || len < 1) return;

  const uint8_t opcode = data[0];

  if (opcode == HIVEFW_OTA_OP_ABORT) {
    resetOtaState(true);
    _otaRebootPending = false;
    notifyOtaStatus(opcode, HIVEFW_OTA_OK);
    return;
  }

  if (opcode == HIVEFW_OTA_OP_BEGIN) {
    // BEGIN = opcode + uint32 little-endian image size + 32 ASCII MD5 chars.
    if (len != 37 || _otaRebootPending) {
      notifyOtaStatus(opcode, HIVEFW_OTA_ERR_ARGUMENT);
      return;
    }

    uint32_t image_size = 0;
    memcpy(&image_size, &data[1], sizeof(image_size));
    if (image_size < 64 * 1024 || image_size > 4 * 1024 * 1024) {
      notifyOtaStatus(opcode, HIVEFW_OTA_ERR_ARGUMENT);
      return;
    }

    char md5[33];
    memcpy(md5, &data[5], 32);
    md5[32] = 0;
    for (int i = 0; i < 32; ++i) {
      const char c = md5[i];
      const bool hex =
        (c >= '0' && c <= '9') ||
        (c >= 'a' && c <= 'f') ||
        (c >= 'A' && c <= 'F');
      if (!hex) {
        notifyOtaStatus(opcode, HIVEFW_OTA_ERR_ARGUMENT);
        return;
      }
    }

    resetOtaState(true);
    if (!Update.begin(image_size, U_FLASH)) {
      BLE_DEBUG_PRINTLN("BLE OTA: Update.begin failed, error=%d", Update.getError());
      notifyOtaStatus(opcode, HIVEFW_OTA_ERR_BEGIN);
      return;
    }
    if (!Update.setMD5(md5)) {
      Update.abort();
      notifyOtaStatus(opcode, HIVEFW_OTA_ERR_ARGUMENT);
      return;
    }

    _otaExpectedSize = image_size;
    _otaReceived = 0;
    _otaActive = true;
    BLE_DEBUG_PRINTLN("BLE OTA: begin size=%u", (uint32_t)image_size);
    notifyOtaStatus(opcode, HIVEFW_OTA_OK);
    return;
  }

  if (opcode == HIVEFW_OTA_OP_END) {
    if (!_otaActive) {
      notifyOtaStatus(opcode, HIVEFW_OTA_ERR_ARGUMENT);
      return;
    }
    if (_otaReceived != _otaExpectedSize) {
      BLE_DEBUG_PRINTLN(
        "BLE OTA: size mismatch received=%u expected=%u",
        (uint32_t)_otaReceived,
        (uint32_t)_otaExpectedSize
      );
      notifyOtaStatus(opcode, HIVEFW_OTA_ERR_SIZE);
      resetOtaState(true);
      return;
    }

    if (!Update.end(false) || Update.hasError()) {
      BLE_DEBUG_PRINTLN("BLE OTA: Update.end failed, error=%d", Update.getError());
      notifyOtaStatus(opcode, HIVEFW_OTA_ERR_END);
      resetOtaState(false);
      return;
    }

    _otaActive = false;
    _otaRebootPending = true;
    _otaRebootAt = millis() + 900;
    BLE_DEBUG_PRINTLN("BLE OTA: complete, reboot scheduled");
    notifyOtaStatus(opcode, HIVEFW_OTA_OK);
    return;
  }

  notifyOtaStatus(opcode, HIVEFW_OTA_ERR_ARGUMENT);
}

void SerialBLEInterface::handleOtaData(const uint8_t* data, size_t len) {
  if (!_otaActive || !data || len == 0) return;
  if (_otaReceived + len > _otaExpectedSize) {
    notifyOtaStatus(HIVEFW_OTA_OP_BEGIN, HIVEFW_OTA_ERR_SIZE);
    resetOtaState(true);
    return;
  }

  const size_t written = Update.write((uint8_t*)data, len);
  if (written != len) {
    BLE_DEBUG_PRINTLN(
      "BLE OTA: write failed wanted=%u wrote=%u error=%d",
      (uint32_t)len,
      (uint32_t)written,
      Update.getError()
    );
    notifyOtaStatus(HIVEFW_OTA_OP_BEGIN, HIVEFW_OTA_ERR_WRITE);
    resetOtaState(true);
    return;
  }

  _otaReceived += written;
}

// ---------- public methods

void SerialBLEInterface::clearBuffers() {
  xQueueReset(recv_queue);
  send_queue_len = 0;
}

void SerialBLEInterface::enable() { 
  if (_isEnabled) return;

  _isEnabled = true;
  clearBuffers();

  // Start the Companion and OTA services. OTA is not advertised separately;
  // clients discover it after connecting through the normal NUS advertisement.
  pOtaService->start();
  pService->start();

  // Start advertising

  //pServer->getAdvertising()->setMinInterval(500);
  //pServer->getAdvertising()->setMaxInterval(1000);

  pServer->getAdvertising()->start();
  adv_restart_time = 0;
}

void SerialBLEInterface::disable() {
  _isEnabled = false;

  BLE_DEBUG_PRINTLN("SerialBLEInterface::disable");

  pServer->getAdvertising()->stop();
  pServer->disconnect(last_conn_id);
  if (_otaActive) resetOtaState(true);
  _otaRebootPending = false;
  pOtaService->stop();
  pService->stop();
  oldDeviceConnected = deviceConnected = false;
  adv_restart_time = 0;
}

size_t SerialBLEInterface::writeFrame(const uint8_t src[], size_t len) {
  if (len > MAX_FRAME_SIZE) {
    BLE_DEBUG_PRINTLN("writeFrame(), frame too big, len=%d", len);
    return 0;
  }

  if (deviceConnected && len > 0) {
    if (send_queue_len >= FRAME_QUEUE_SIZE) {
      BLE_DEBUG_PRINTLN("writeFrame(), send_queue is full!");
      return 0;
    }

    send_queue[send_queue_len].len = len;  // add to send queue
    memcpy(send_queue[send_queue_len].buf, src, len);
    send_queue_len++;

    return len;
  }
  return 0;
}

#define  BLE_WRITE_MIN_INTERVAL   60

bool SerialBLEInterface::isWriteBusy() const {
  return millis() < _last_write + BLE_WRITE_MIN_INTERVAL;   // still too soon to start another write?
}

size_t SerialBLEInterface::checkRecvFrame(uint8_t dest[]) {
  if (
    _otaRebootPending &&
    _otaRebootAt &&
    millis() >= _otaRebootAt
  ) {
    _otaRebootPending = false;
    _otaRebootAt = 0;
    delay(20);
    esp_restart();
    return 0;
  }

  if (send_queue_len > 0   // first, check send queue
    && millis() >= _last_write + BLE_WRITE_MIN_INTERVAL    // space the writes apart
  ) {
    _last_write = millis();
    pTxCharacteristic->setValue(send_queue[0].buf, send_queue[0].len);
    pTxCharacteristic->notify();

    BLE_DEBUG_PRINTLN("writeBytes: sz=%d, hdr=%d", (uint32_t)send_queue[0].len, (uint32_t) send_queue[0].buf[0]);

    send_queue_len--;
    for (int i = 0; i < send_queue_len; i++) {   // delete top item from queue
      send_queue[i] = send_queue[i + 1];
    }
  }

  Frame frame;
  if (xQueueReceive(recv_queue, &frame, 0) == pdTRUE) {
    memcpy(dest, frame.buf, frame.len);
    BLE_DEBUG_PRINTLN("readBytes: sz=%d, hdr=%d", (uint32_t) frame.len, (uint32_t) dest[0]);
    return frame.len;
  }

  if (deviceConnected != oldDeviceConnected) {
    if (!deviceConnected) {    // disconnecting
      clearBuffers();

      BLE_DEBUG_PRINTLN("SerialBLEInterface -> disconnecting...");

      //pServer->getAdvertising()->setMinInterval(500);
      //pServer->getAdvertising()->setMaxInterval(1000);

      adv_restart_time = millis() + ADVERT_RESTART_DELAY;
    } else {
      BLE_DEBUG_PRINTLN("SerialBLEInterface -> stopping advertising");
      BLE_DEBUG_PRINTLN("SerialBLEInterface -> connecting...");
      // connecting
      // do stuff here on connecting
      pServer->getAdvertising()->stop();
      adv_restart_time = 0;
    }
    oldDeviceConnected = deviceConnected;
  }

  if (adv_restart_time && millis() >= adv_restart_time) {
    if (pServer->getConnectedCount() == 0) {
      BLE_DEBUG_PRINTLN("SerialBLEInterface -> re-starting advertising");
      pServer->getAdvertising()->start();  // re-Start advertising
    }
    adv_restart_time = 0;
  }
  return 0;
}

bool SerialBLEInterface::isConnected() const {
  return deviceConnected;  //pServer != NULL && pServer->getConnectedCount() > 0;
}
