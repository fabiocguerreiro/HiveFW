# HiveFW Companion

Aplicação Flutter para comunicar e administrar **Companions HiveFW / MeshCore**, pensada sobretudo para utilização por **Bluetooth LE** com os rádios Companion do projeto HiveFW.

O Wi-Fi/TCP é mantido como transporte opcional para equipamentos HiveFW compatíveis, nomeadamente ESP32/V3. O fluxo normal da aplicação continua a ser: abrir → procurar Companion por Bluetooth → ligar.

## Identidade

- Nome da aplicação: **HiveFW Companion**
- Android Application ID: **`pt.hivefw.companion`**
- Package Flutter: **`hivefw_companion`**
- Identidade visual: HiveFW
- Distribuição prevista: instalação direta e GitHub Releases
- Google Play Store: não é um requisito do projeto

## O que a aplicação faz

Mantém as funções Companion úteis da base MeshCore:

- chat de canais e mensagens privadas;
- contactos, discovery e QR;
- mapa e telemetria;
- configuração LoRa;
- adverts local/flood;
- path discovery e trace;
- Auto Add, Path Hash e estatísticas;
- exportação de contactos/mensagens/mapa;
- widget Android e notificações.

Quando o rádio expõe as extensões HiveFW, disponibiliza também:

- Companion + Repeater;
- Smart Advert;
- Mesh Time Sync;
- Owner Info;
- RX Boosted Gain;
- ADC multiplier;
- Duty Cycle;
- RF / retransmissão e loop detection;
- CAD, interference threshold, AGC e delays;
- passwords Admin/Guest write-only;
- ACL persistente completa;
- RegionMap;
- descoberta local de repeaters zero-hop;
- repeaters zero-hop assinalados no mapa quando têm GPS;
- importação do formato original MeshCore `.discovered_contacts`;
- canais observados nas últimas 48 horas;
- app Home Assistant com os comandos guardados no Companion;
- diagnóstico CAD;
- Canal APPS/SOS persistente, selecionável e identificado no Chat;
- Backup/Restore separado de Companion e Repeater.

As consultas de **Vizinhos** e **Canais observados** usam a cache local do HiveFW e não geram tráfego LoRa.

## Transportes

### Bluetooth LE — principal

É o transporte prioritário, especialmente para T114/nRF52. A descoberta aceita Companions que anunciem o **UUID Nordic UART Service (NUS)** e também os nomes **`HiveFW-*`** e **`MeshCore-*`**, para funcionar tanto com firmware HiveFW como com firmware oficial MeshCore. Os comandos Companion e as extensões HiveFW são enviados diretamente no payload BLE, sem framing Serial.

### Wi-Fi/TCP — opcional

Nos Companions HiveFW ESP32 que disponibilizam `SerialWifiInterface`, a app pode ligar diretamente por TCP, por defeito na porta `5000`.

O TCP usa o framing do Companion Serial:

```text
App -> rádio:  '<' + uint16 little-endian + payload
Rádio -> app:  '>' + uint16 little-endian + payload
```

USB/Serial e Web Serial continuam disponíveis nas plataformas que os suportam.

## Ecrã Dispositivo

O separador **Dispositivo** é a superfície principal para administrar o Companion local. Mostra:

- nome, hardware, firmware, build e public key;
- bateria, uptime, RSSI/SNR, storage e rádio;
- Local Advert, Flood Advert, Sync Clock e Reboot;
- estado/configuração Companion + Repeater;
- Smart Advert e Mesh Time Sync;
- Owner Info, RX Boosted Gain e ADC multiplier;
- RF/Retransmissão;
- Acesso/ACL;
- Vizinhos;
- RegionMap;
- Backup & Restore.

## Backup & Restore

Existem dois backups independentes.

### Companion

Inclui:

- nome e identidade;
- private key;
- parâmetros LoRa;
- posição;
- Auto Add;
- canais;
- contactos.

Ao restaurar este backup, o estado Repeater atualmente ativo no rádio é preservado durante a escrita da configuração RF.

### Repeater

Inclui:

- estado Repeater;
- Owner Info;
- RX Boosted Gain;
- ADC multiplier;
- Path Hash;
- Multi ACK;
- Smart Advert;
- Mesh Time Sync;
- Duty Cycle;
- routing/flood;
- RF guard/delays;
- ACL persistente;
- RegionMap.

As passwords **Admin/Guest não são exportadas** porque o firmware as trata como write-only. Um restore Repeater deixa as passwords existentes inalteradas.

## Android

Android é a plataforma prioritária.

Para desenvolvimento:

```bash
flutter pub get
dart run flutter_launcher_icons
flutter analyze --no-fatal-infos
flutter test
flutter build apk --debug
```

A workflow de preview cria um APK instalável a partir de cada push em `main`. As GitHub Releases futuras usam tags `app-v*` e APK assinado com uma chave persistente guardada nos GitHub Secrets.

Não há AAB nem dependência da Play Store.

## Estrutura

```text
lib/
├── protocol/        Companion protocol + extensões HiveFW
├── transport/       BLE, Serial, Web Serial e HiveFW TCP
├── services/        coordenação do rádio e serviços da aplicação
├── providers/       estado Riverpod + backup/restore
└── ui/
    ├── screens/     Chat, Nós, Mapa, Dispositivo e administração HiveFW
    └── apps/        ferramentas adicionais
```

O firmware HiveFW é a fonte de verdade das capacidades específicas. A aplicação não deve simular controlos que o rádio ligado não exponha.

## Origem e licença

Este projeto deriva tecnicamente da **LusoApp**, distribuída sob licença MIT. O repositório **HiveFW-app** é independente e preserva os avisos de origem e a licença do trabalho original em [LICENSE](LICENSE).

As alterações HiveFW mantêm essa base licenciada e acrescentam a identidade HiveFW, transportes, UI e suporte às extensões do firmware.
