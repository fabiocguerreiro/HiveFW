# HiveFW — Roadmap e validação

O firmware e a integração Home Assistant vivem agora no mesmo repositório e partilham a mesma linha de versões.

## Implementação concluída

### Firmware

- [x] Companion como modo base.
- [x] Repeater opcional.
- [x] Heltec V3 Wi-Fi/TCP.
- [x] Heltec T114 BLE.
- [x] Portal Wi-Fi e credenciais NVS no V3.
- [x] Web OTA seguro.
- [x] BLE DFU / UF2 no T114.
- [x] Smart Advert com intervalo mínimo de 24 h e persistência.
- [x] Proteção at-most-once para Auto Advert.
- [x] tabela acumulada de vizinhos Repeater zero-hop.
- [x] exclusão de Share Contact da deteção de vizinhos RF.
- [x] diagnóstico e recuperação de CAD Timeout.
- [x] Regions / Flood Scopes.
- [x] Duty Cycle e Path Hash.
- [x] UI HiveFW.

### Home Assistant

- [x] integração standalone sem dependência de `meshcore-ha`.
- [x] TCP/Wi-Fi e BLE.
- [x] entidades, serviços, eventos e WebSocket API.
- [x] painel HiveFW.
- [x] Dispositivo, telemetria e configuração de rádio.
- [x] Chat & Canais.
- [x] Nós em lista + mapa + atividade.
- [x] Vizinhos usando a tabela real do firmware.
- [x] Console.
- [x] Regions & Scopes.
- [x] RX Log.
- [x] firmware OTA e entidade update.
- [x] Backup & Restore compatível com o formato MeshCore.
- [x] import/export `discovered_contacts`.
- [x] QR / URI de canais e contactos.
- [x] Favorites, Tags e operações em massa.
- [x] administração remota de Repeaters.
- [x] LOS / Fresnel on-demand.
- [x] health transitions e eventos HA.
- [x] frontend e backend testados em CI.

### Projeto unificado

- [x] firmware e Home Assistant no mesmo repositório.
- [x] históricos dos dois projetos preservados no merge.
- [x] `VERSION` e manifest sincronizados.
- [x] updater OTA apontado para `fabiocguerreiro/HiveFW`.
- [x] workflows de firmware e Home Assistant unificados.
- [x] release apenas por tag.
- [x] upstream MeshCore, meshcore-ha e meshcore-ha-chat documentados.

## Validação em hardware

Os pontos abaixo dependem de teste real e não devem ser considerados concluídos apenas pelo CI:

- [ ] instalação HACS a partir do novo monorepo;
- [ ] migração HACS do repositório antigo sem remover a Config Entry;
- [ ] TCP/Wi-Fi num Heltec V3;
- [ ] BLE num Heltec T114;
- [ ] reload / restart / reconnect;
- [ ] confirmar ausência de ligações duplicadas;
- [ ] Backup + Restore completo num equipamento de teste;
- [ ] restauro de identidade/private key;
- [ ] Smart Advert durante vários dias;
- [ ] tabela de vizinhos com vários Repeaters zero-hop;
- [ ] diagnóstico CAD durante operação prolongada;
- [ ] Web OTA a partir da primeira Release unificada;
- [ ] BLE DFU / UF2 da primeira Release unificada.

## Próximos passos

- consolidar gradualmente o wrapper `hivefw-panel.js` no source TypeScript;
- continuar a reduzir duplicação entre frontend legado e componentes novos;
- acompanhar alterações relevantes dos três upstreams;
- evoluir a telemetria RF com base nos dados recolhidos em utilização real;
- rever documentação de instalação após a primeira versão unificada estável.
