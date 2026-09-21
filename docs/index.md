# HiveFW Documentation

HiveFW reúne o firmware Companion + Repeater e a integração Home Assistant no mesmo projeto.

## Hardware oficialmente suportado

- Heltec WiFi LoRa 32 V3 — Wi-Fi/TCP Companion, Repeater opcional e Web OTA.
- Heltec T114 — BLE Companion, Repeater opcional e atualização BLE DFU/UF2.

O repositório foi deliberadamente reduzido a estes dois alvos. Se no futuro for necessário suportar outro equipamento, a configuração correspondente deve ser importada do upstream MeshCore e adaptada ao HiveFW.

## Guias

- [Hardware suportado](supported_hardware.md)
- [Provisioning Wi-Fi do Heltec V3](hivefw_wifi_provisioning.md)
- [Migração para o repositório unificado](repository_migration.md)
- [FAQ](faq.md)

## Referência MeshCore

O HiveFW continua a usar o protocolo MeshCore. A documentação técnica de protocolo relevante permanece incluída:

- [Companion Protocol](companion_protocol.md)
- [Packet Format](packet_format.md)
- [Payloads](payloads.md)
- [Binary Stats](stats_binary_frames.md)
- [Number Allocations](number_allocations.md)
- [QR Codes](qr_codes.md)
- [CLI Commands](cli_commands.md)
