#include <Arduino.h>   // needed for PlatformIO
#include <Mesh.h>
#include "MyMesh.h"

// Believe it or not, this std C function is busted on some platforms!
static uint32_t _atoi(const char* sp) {
  uint32_t n = 0;
  while (*sp && *sp >= '0' && *sp <= '9') {
    n *= 10;
    n += (*sp++ - '0');
  }
  return n;
}

// interface manager
#include <helpers/MultiSerialInterface.h>
MultiSerialInterface interface_manager;

// include bluetooth interface
#if defined(BLE_PIN_CODE)
  #ifdef ESP32
    // include esp32 bluetooth interface
    #include <helpers/esp32/SerialBLEInterface.h>
    SerialBLEInterface bluetooth_interface;
  #elif defined(NRF52_PLATFORM)
    // include nrf52 bluetooth interface
    #include <helpers/nrf52/SerialBLEInterface.h>
    SerialBLEInterface bluetooth_interface;
  #else
    #error "SerialBLEInterface is not defined for this platform"
  #endif
#endif

// include wifi interface
#ifdef WIFI_SSID
  #if defined(ESP32)
    #include <Preferences.h>
  #endif
  #ifndef TCP_PORT
    #define TCP_PORT 5000
  #endif
  #ifdef ESP32
    // include esp32 wifi interface
    #include <helpers/esp32/SerialWifiInterface.h>
    SerialWifiInterface wifi_interface;
  #else
    #error "SerialWifiInterface is not defined for this platform"
  #endif
#endif

// Web OTA for ESP32 Wi-Fi Companion builds.
//
// Security model:
// - no OTA password is compiled into the public firmware;
// - the Wi-Fi password is never reused for OTA;
// - a fresh 192-bit token is generated on every boot and kept only in RAM;
// - Home Assistant rotates that token again immediately before an OTA upload
//   through the existing local Companion connection;
// - the token is never returned by the Companion custom-variable read path.
#if defined(ESP32) && defined(WIFI_SSID) && defined(WEB_OTA_ENABLED)
  #include <ESPAsyncWebServer.h>
  #include <AsyncElegantOTA.h>
  #include <esp_system.h>

  AsyncWebServer web_ota_server(80);

  static String web_ota_token;

  static String generateWebOtaToken() {
    char token[49];
    for (size_t i = 0; i < 6; ++i) {
      const uint32_t value = esp_random();
      snprintf(&token[i * 8], 9, "%08lx", (unsigned long)value);
    }
    token[48] = '\0';
    return String(token);
  }

  // Called from MyMesh::CMD_SET_CUSTOM_VAR for the write-only "ota_token"
  // control. Deliberately RAM-only: after reboot the previous token is dead.
  bool hivefw_set_ota_token(const char* token) {
    if (token == nullptr || strlen(token) != 48) {
      return false;
    }

    for (size_t i = 0; i < 48; ++i) {
      const char c = token[i];
      const bool is_hex =
        (c >= '0' && c <= '9') ||
        (c >= 'a' && c <= 'f') ||
        (c >= 'A' && c <= 'F');
      if (!is_hex) {
        return false;
      }
    }

    web_ota_token = token;
    AsyncElegantOTA.setAuth("hivefw", web_ota_token.c_str());
    return true;
  }
#endif

// include usb interface
#if defined(ENABLE_USB_INTERFACE)
  #include <helpers/ArduinoSerialInterface.h>
  ArduinoSerialInterface usb_serial_interface;
#endif

// include ethernet interface
#if defined(ETHERNET_ENABLED)
  #include <helpers/ethernet/EthernetInterface.h>
  ETHERNET_CLASS ethernet_interface;
#endif

// include hardware serial interface
#if defined(SERIAL_RX)
  #include <helpers/ArduinoSerialInterface.h>
  ArduinoSerialInterface hardware_serial_interface;
  HardwareSerial companion_serial(1);
#endif

// platform file system
#if defined(NRF52_PLATFORM) || defined(STM32_PLATFORM)
  #include <InternalFileSystem.h>
  #if defined(QSPIFLASH)
    #include <CustomLFS_QSPIFlash.h>
    DataStore store(InternalFS, QSPIFlash, rtc_clock);
  #else
    #if defined(EXTRAFS)
      #include <CustomLFS.h>
      CustomLFS ExtraFS(0xD4000, 0x19000, 128);
      DataStore store(InternalFS, ExtraFS, rtc_clock);
    #else
      DataStore store(InternalFS, rtc_clock);
    #endif
  #endif
#elif defined(RP2040_PLATFORM)
  #include <LittleFS.h>
  DataStore store(LittleFS, rtc_clock);
#elif defined(ESP32)
  #include <SPIFFS.h>
  DataStore store(SPIFFS, rtc_clock);
#endif

/* GLOBAL OBJECTS */
#ifdef DISPLAY_CLASS
  #include "UITask.h"
  UITask ui_task(&board, &interface_manager);
#endif

StdRNG fast_rng;
SimpleMeshTables tables;
MyMesh the_mesh(radio_driver, fast_rng, rtc_clock, tables, store
   #ifdef DISPLAY_CLASS
      , &ui_task
   #endif
);

/* END GLOBAL OBJECTS */

void halt() {
  while (1) ;
}

/* WIFI RUNTIME CREDENTIALS + RECONNECT TRACKERS */
#if defined(ESP32) && defined(WIFI_SSID)
  static String hivefw_wifi_ssid;
  static String hivefw_wifi_password;

  static bool isRuntimeWifiPlaceholder(const char* value) {
    return value != nullptr &&
      strcmp(value, "__HIVEFW_RUNTIME_WIFI__") == 0;
  }

  static void loadHiveFwWifiCredentials() {
    Preferences prefs;
    prefs.begin("hivefw_net", false);

    hivefw_wifi_ssid = prefs.getString("ssid", "");
    hivefw_wifi_password = prefs.getString("pwd", "");

    // One-time bootstrap migration: a locally compiled V1.11 still carries
    // the user's existing WIFI_SSID/WIFI_PWD. Persist them in ESP32 NVS so
    // every later public OTA image can be credential-free. NVS is outside
    // the OTA app partitions and survives normal firmware updates.
    if (
      hivefw_wifi_ssid.length() == 0 &&
      strlen(WIFI_SSID) > 0 &&
      !isRuntimeWifiPlaceholder(WIFI_SSID)
    ) {
      hivefw_wifi_ssid = WIFI_SSID;
      hivefw_wifi_password = WIFI_PWD;
      prefs.putString("ssid", hivefw_wifi_ssid);
      prefs.putString("pwd", hivefw_wifi_password);
    }

    prefs.end();
  }

  bool wifi_needs_reconnect = false;
  unsigned long last_wifi_reconnect_attempt = 0;
#endif

void setup() {
  Serial.begin(115200);
  board.begin();

#ifdef HAS_EXTERNAL_WATCHDOG
  external_watchdog.begin();
#endif

#ifdef DISPLAY_CLASS
  DisplayDriver* disp = NULL;
  if (display.begin()) {
    disp = &display;
    disp->startFrame();
  #ifdef ST7789
    disp->setTextSize(2);
  #endif
    disp->drawTextCentered(disp->width() / 2, 28, "A Iniciar ...");
    disp->endFrame();
  }
#endif

  if (!radio_init()) { halt(); }

  fast_rng.begin(radio_driver.getRngSeed());

#if defined(NRF52_PLATFORM) || defined(STM32_PLATFORM)
  InternalFS.begin();
  #if defined(QSPIFLASH)
    if (!QSPIFlash.begin()) {
      // debug output might not be available at this point, might be too early. maybe should fall back to InternalFS here?
      MESH_DEBUG_PRINTLN("CustomLFS_QSPIFlash: failed to initialize");
    } else {
      MESH_DEBUG_PRINTLN("CustomLFS_QSPIFlash: initialized successfully");
    }
  #else
  #if defined(EXTRAFS)
      ExtraFS.begin();
  #endif
  #endif
  store.begin();
  the_mesh.begin(
    #ifdef DISPLAY_CLASS
        disp != NULL
    #else
        false
    #endif
  );
#elif defined(RP2040_PLATFORM)
  LittleFS.begin();
  store.begin();
  the_mesh.begin(
    #ifdef DISPLAY_CLASS
        disp != NULL
    #else
        false
    #endif
  );
#elif defined(ESP32)
  SPIFFS.begin(true);
  store.begin();
  the_mesh.begin(
    #ifdef DISPLAY_CLASS
        disp != NULL
    #else
        false
    #endif
  );
#else
  #error "need to define filesystem"
#endif

// add bluetooth interface
#if defined(BLE_PIN_CODE)
  bluetooth_interface.begin(BLE_NAME_PREFIX, the_mesh.getNodePrefs()->node_name, the_mesh.getBLEPin());
  interface_manager.addInterface(InterfaceType::Bluetooth, &bluetooth_interface);
#endif

// add wifi interface
#ifdef WIFI_SSID
  board.setInhibitSleep(true);   // prevent sleep when WiFi is active
  WiFi.setAutoReconnect(true);

  WiFi.onEvent([](WiFiEvent_t event, WiFiEventInfo_t info){
      if (event == ARDUINO_EVENT_WIFI_STA_DISCONNECTED) {
          WIFI_DEBUG_PRINTLN("WiFi disconnected. Flagging for reconnect...");
          wifi_needs_reconnect = true;
      } else if (event == ARDUINO_EVENT_WIFI_STA_GOT_IP) {
          WIFI_DEBUG_PRINTLN("WiFi connected successfully!");
          wifi_needs_reconnect = false;
      }
  });

  loadHiveFwWifiCredentials();

  if (hivefw_wifi_ssid.length() > 0) {
    WiFi.begin(hivefw_wifi_ssid.c_str(), hivefw_wifi_password.c_str());
  } else {
    WIFI_DEBUG_PRINTLN(
      "No runtime WiFi credentials found; Companion TCP/Web OTA will remain offline"
    );
  }

  wifi_interface.begin(TCP_PORT);
  interface_manager.addInterface(InterfaceType::WiFi, &wifi_interface);

  #if defined(ESP32) && defined(WEB_OTA_ENABLED)
    web_ota_token = generateWebOtaToken();

    web_ota_server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
      request->send(
        200,
        "text/plain",
        "HiveFW Companion-Repeater\nWeb OTA is managed securely by HiveFW/Home Assistant.\n"
      );
    });

    AsyncElegantOTA.begin(
      &web_ota_server,
      "hivefw",
      web_ota_token.c_str()
    );
    web_ota_server.begin();

    // Never print the OTA token. Only the endpoint/address is diagnostic.
    WIFI_DEBUG_PRINTLN(
      "Web OTA ready at http://%s/update",
      WiFi.localIP().toString().c_str()
    );
  #endif
#endif

// add usb interface
#if defined(ENABLE_USB_INTERFACE)
  usb_serial_interface.begin(Serial);
  interface_manager.addInterface(InterfaceType::USB, &usb_serial_interface);
#endif

// add ethernet interface
#if defined(ETHERNET_ENABLED)
  ethernet_interface.begin();
  interface_manager.addInterface(InterfaceType::Ethernet, &ethernet_interface);
#endif

// add hardware serial interface
#if defined(SERIAL_RX)
  companion_serial.setPins(SERIAL_RX, SERIAL_TX);
  companion_serial.begin(115200);
  hardware_serial_interface.begin(companion_serial);
  interface_manager.addInterface(InterfaceType::HardwareSerial, &hardware_serial_interface);
#endif

  the_mesh.startInterface(interface_manager);
  sensors.begin();

#if ENV_INCLUDE_GPS == 1
  the_mesh.applyGpsPrefs();
#endif

#ifdef DISPLAY_CLASS
  ui_task.begin(disp, &sensors, the_mesh.getNodePrefs());  // still want to pass this in as dependency, as prefs might be moved
#endif

  board.onBootComplete();
}

void loop() {
  the_mesh.loop();
  interface_manager.loop();
  sensors.loop();
#ifdef DISPLAY_CLASS
  ui_task.loop();
#endif
  rtc_clock.tick();
#ifdef HAS_EXTERNAL_WATCHDOG
  external_watchdog.loop();
#endif

  if (!the_mesh.hasPendingWork()) {
#if defined(NRF52_PLATFORM)
    board.sleep(0); // nrf ignores seconds param, sleeps whenever possible
#endif
  }

#if defined(ESP32) && defined(WIFI_SSID)
  // Safely attempt to reconnect every 10 seconds if flagged
  if (wifi_needs_reconnect && (millis() - last_wifi_reconnect_attempt > 10000)) {
    WIFI_DEBUG_PRINTLN("Attempting manual WiFi reconnect...");
    WiFi.disconnect();
    WiFi.reconnect();
    last_wifi_reconnect_attempt = millis();
  }
#endif
}
