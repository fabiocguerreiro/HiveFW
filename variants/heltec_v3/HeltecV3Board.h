#pragma once

#include <Arduino.h>
#include <helpers/RefCountedDigitalPin.h>
#include <helpers/ESP32Board.h>

// built-ins
#ifndef PIN_VBAT_READ              // set in platformio.ini for boards like Heltec Wireless Paper (20)
  #define  PIN_VBAT_READ    1
#endif
#ifndef PIN_ADC_CTRL              // set in platformio.ini for Heltec Wireless Tracker (2)
  #define  PIN_ADC_CTRL    37
#endif
#ifndef ADC_MULTIPLIER            //default ADC multiplier
  #define ADC_MULTIPLIER 5.42
#endif
#define  PIN_ADC_CTRL_ACTIVE    LOW
#define  PIN_ADC_CTRL_INACTIVE  HIGH

// Heltec WiFi LoRa 32 V3: the onboard CP2102 UART bridge is powered from
// VUSB. Its TX line is wired to ESP32-S3 U0RXD (GPIO44), so an idle HIGH is
// a practical local indication that USB power is present. A pulldown keeps
// the pin LOW when the bridge is unpowered. This is used only as a VUSB
// presence proxy; it does not claim the charger is actively pushing current.
#ifndef PIN_USB_POWER_SENSE
  #define PIN_USB_POWER_SENSE 44
#endif

class HeltecV3Board : public ESP32Board {
private:
  bool adc_active_state;
  float adc_multiplier_override = 0.0f;

public:
  RefCountedDigitalPin periph_power;

  HeltecV3Board() : periph_power(PIN_VEXT_EN) { }

  void begin() {
    ESP32Board::begin();

    // Auto-detect correct ADC_CTRL pin polarity (different for boards >3.2)
    pinMode(PIN_ADC_CTRL, INPUT);
    adc_active_state = !digitalRead(PIN_ADC_CTRL);

    pinMode(PIN_ADC_CTRL, OUTPUT);
    digitalWrite(PIN_ADC_CTRL, !adc_active_state); // Initially inactive

    periph_power.begin();

    pinMode(PIN_USB_POWER_SENSE, INPUT_PULLDOWN);

    esp_reset_reason_t reason = esp_reset_reason();
    if (reason == ESP_RST_DEEPSLEEP) {
      long wakeup_source = esp_sleep_get_ext1_wakeup_status();
      if (wakeup_source & (1 << P_LORA_DIO_1)) {  // received a LoRa packet (while in deep sleep)
        startup_reason = BD_STARTUP_RX_PACKET;
      }

      rtc_gpio_hold_dis((gpio_num_t)P_LORA_NSS);
      rtc_gpio_deinit((gpio_num_t)P_LORA_DIO_1);
    }
  }

  uint16_t getBattMilliVolts() override {
    analogReadResolution(10);
    digitalWrite(PIN_ADC_CTRL, adc_active_state);

    uint32_t raw = 0;
    for (int i = 0; i < 8; i++) {
      raw += analogRead(PIN_VBAT_READ);
    }
    raw = raw / 8;

    digitalWrite(PIN_ADC_CTRL, !adc_active_state);

    return (getAdcMultiplier() * (3.3 / 1024.0) * raw) * 1000;
  }

  bool isExternalPowered() override {
    // UART idle is HIGH while the USB-powered CP2102 is alive. Sample several
    // times so normal serial traffic (LOW data bits) cannot look like a power
    // failure. With VUSB absent the pulldown keeps every sample LOW.
    for (uint8_t i = 0; i < 8; ++i) {
      if (digitalRead(PIN_USB_POWER_SENSE) == HIGH) return true;
      delayMicroseconds(250);
    }
    return false;
  }

  bool setAdcMultiplier(float multiplier) override {
    if (multiplier < 0.0f || multiplier > 10.0f) return false;
    adc_multiplier_override = multiplier;
    return true;
  }

  float getAdcMultiplier() const override {
    return adc_multiplier_override > 0.0f
      ? adc_multiplier_override
      : (float)ADC_MULTIPLIER;
  }

  const char* getManufacturerName() const override {
    return "Heltec V3";
  }
};
