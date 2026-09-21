#pragma once

#include <Arduino.h>

#if defined(ESP32) && defined(WIFI_SSID) && defined(WEB_OTA_ENABLED)
#include <ESPAsyncWebServer.h>

void hivefwWifiPortalBegin(
  AsyncWebServer* server,
  const char* node_name,
  const String& current_ssid,
  bool has_credentials
);

void hivefwWifiPortalLoop();
bool hivefwWifiPortalSetupMode();

#endif
