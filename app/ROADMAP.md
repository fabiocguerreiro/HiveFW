# HiveFW Companion — Roadmap

## Estado atual

O repositório independente **HiveFW-app**, branch `main`, é agora a origem da aplicação móvel HiveFW.

### Concluído nesta transformação

- [x] Rebranding da aplicação para **HiveFW Companion**
- [x] Android package/application ID: `pt.hivefw.companion`
- [x] Ícone, logo, splash e tema HiveFW
- [x] BLE mantido como transporte principal
- [x] Wi-Fi/TCP HiveFW opcional na porta 5000
- [x] Navegação principal: Chat, Nós, Mapa, Apps, Dispositivo
- [x] Ecrã Dispositivo inspirado na integração HiveFW
- [x] Estado Companion + Repeater
- [x] Preservação do estado Repeater ao alterar parâmetros LoRa
- [x] Smart Advert
- [x] Mesh Time Sync
- [x] Owner Info
- [x] RX Boosted Gain
- [x] ADC multiplier
- [x] Duty Cycle
- [x] Routing/flood/loop detection
- [x] CAD, interference threshold, AGC e delays
- [x] ACL persistente completa
- [x] RegionMap
- [x] App Descoberta com repeaters zero-hop locais
- [x] Repeaters zero-hop destacados no Mapa quando têm GPS
- [x] Import do formato MeshCore original `.discovered_contacts`
- [x] Canais observados 48 h
- [x] App Home Assistant com comandos persistidos no Companion
- [x] Canal APPS/SOS persistente, seleção centralizada e badge no Chat
- [x] UI específica do Repeater condicionada ao modo Repeater ativo
- [x] Remoção do Plan333/eventos e integrações MeshCore Portugal externas
- [x] Backup/Restore Companion
- [x] Backup/Restore Repeater
- [x] Passwords Admin/Guest mantidas write-only e fora dos backups
- [x] Distribuição orientada a APK/GitHub em vez de Play Store/AAB
- [x] Workflows de análise, testes e APK preview/release

## Próximo marco — primeiro APK de teste

- [x] Validar `flutter analyze`
- [x] Executar suite completa `flutter test`
- [x] Compilar APK Android
- [ ] Testar ligação BLE num Companion T114 HiveFW
- [ ] Testar chat/canais/contactos sem regressões
- [ ] Testar ecrã Dispositivo e deteção das extensões HiveFW
- [ ] Testar Vizinhos / Canais observados
- [ ] Testar ACL e RegionMap num rádio de teste
- [ ] Testar Backup/Restore Companion
- [ ] Testar Backup/Restore Repeater
- [ ] Confirmar reconexão BLE e foreground service Android
- [ ] Confirmar Wi-Fi/TCP num Companion ESP32/V3 compatível

## Depois do primeiro teste em hardware

### UX HiveFW

- [ ] Afinar densidade e hierarquia visual com base no uso real em telemóvel
- [ ] Rever e uniformizar todos os textos PT-PT
- [ ] Consolidar definições antigas que ficaram duplicadas com Dispositivo
- [x] Remover Apps/eventos dependentes de serviços MeshCore Portugal e manter apenas módulos locais úteis
- [ ] Rever widget Android e dar-lhe identidade visual HiveFW completa

### Capacidades do firmware

- [ ] Expor na app novas extensões apenas quando o firmware as disponibilizar
- [ ] Manter compatibilidade com Companion MeshCore standard quando extensões HiveFW não existem
- [ ] Acompanhar evolução do Advertising oficial + Smart Advert HiveFW
- [ ] Preparar eventual atualização de firmware/DFU a partir da app, sem assumir implementação antes de o fluxo ser definido no firmware

### Distribuição

- [ ] Definir chave Android persistente do projeto
- [ ] Publicar primeiro GitHub Release `app-v0.x.x`
- [ ] Acrescentar atualização pela própria app a partir das releases GitHub, se fizer sentido
- [ ] Manter instalação direta por APK como caminho principal

### Regra para futuras releases

Cada marco estável deve criar uma **GitHub Release** e incluir obrigatoriamente:

- tag/versão da app;
- APK correspondente;
- commit exato do `main`;
- changelog objetivo das alterações;
- estado do CI (`flutter analyze`, testes e build Android);
- SHA-256 do APK;
- indicação clara quando a build é `preview/debug` ou `release`;
- notas de compatibilidade relevantes, especialmente BLE HiveFW/MeshCore e extensões que dependem do firmware HiveFW.

## Repositório e relação com o firmware

A aplicação vive agora em **`fabiocguerreiro/HiveFW-app`**, branch `main`, separada da antiga base LusoApp. O repositório principal **HiveFW** continua a ser a fonte de verdade para protocolo, comandos, identidade visual e comportamento do firmware.

A branch `baseline-migrated` preserva o snapshot de migração antes das extensões específicas desta fase.
