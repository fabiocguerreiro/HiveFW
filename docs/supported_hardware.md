# Hardware suportado

HiveFW suporta oficialmente dois equipamentos e três alvos de firmware.

| Hardware | Transporte Companion | Display | Atualização | Ambiente PlatformIO |
| --- | --- | --- | --- | --- |
| Heltec WiFi LoRa 32 V3 | Wi-Fi / TCP | SSD1306 | Web OTA pela integração / USB recovery | `Heltec_v3_companion_radio_wifi` |
| Heltec WiFi LoRa 32 V3 | BLE | SSD1306 | USB / flash manual; sem OTA pela integração | `Heltec_v3_companion_radio_ble` |
| Heltec T114 | BLE | ST7789 | BLE DFU / UF2 | `Heltec_t114_companion_radio_ble` |

## Política de suporte

O repositório não mantém configurações de boards que não sejam suportados pelo HiveFW.

Isto é intencional:

- reduz ruído e dívida técnica;
- evita dar a impressão de compatibilidade não testada;
- mantém o CI focado nos dois equipamentos reais e nos três alvos suportados;
- facilita distinguir código HiveFW de compatibilidade upstream.

Se for necessário adicionar um novo equipamento, a configuração mais recente deve ser obtida do [MeshCore upstream](https://github.com/meshcore-dev/MeshCore), adicionada numa alteração isolada e validada em hardware antes de ser declarada como suportada.

## Heltec V3

Build Wi-Fi/TCP:

```bash
./build.sh build-firmware Heltec_v3_companion_radio_wifi
```

Inclui Companion por Wi-Fi/TCP, Repeater opcional, portal `/wifi`, NVS e Web OTA. É a única build V3 que suporta atualização de firmware através da integração Home Assistant.

Build BLE:

```bash
./build.sh build-firmware Heltec_v3_companion_radio_ble
```

Inclui Companion por BLE e o mesmo modo Repeater opcional/protocolo HiveFW usado no T114. Não inicializa Wi-Fi, portal web nem Web OTA.

A integração Home Assistant pode comunicar com esta build por BLE, mas **não pode atualizar o firmware**. As atualizações são manuais por USB/serial usando os ficheiros `.bin` ou `-merged.bin` publicados na Release.

## Heltec T114

Build oficial:

```bash
./build.sh build-firmware Heltec_t114_companion_radio_ble
```

Inclui Companion BLE, Repeater opcional, UI com display e pacotes BLE DFU/UF2.
