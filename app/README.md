# HiveFW Companion

Aplicação Flutter para controlo e comunicação com **Companions HiveFW / MeshCore**, com foco principal em **Bluetooth LE** e suporte opcional a **Wi-Fi/TCP** nos equipamentos HiveFW compatíveis.

> Estado: desenvolvimento ativo em `main` no repositório independente **HiveFW-app**.

## Objetivo

HiveFW Companion é a aplicação móvel do projeto HiveFW. A app é desenvolvida no repositório independente **HiveFW-app**. A base técnica nasceu da LusoApp, mas a aplicação atual usa identidade, arquitetura de produto e extensões próprias do HiveFW.

O alvo principal são rádios Companion, em especial dispositivos nRF52/T114 por BLE. Em ESP32/V3, quando o firmware disponibiliza o Companion por rede, a app também pode ligar diretamente por TCP.

## Ligações

- **Bluetooth LE — principal e recomendado**: descoberta por UUID NUS e nomes `HiveFW-*` / `MeshCore-*`
- **Wi-Fi/TCP — opcional**, porta HiveFW Companion `5000`
- USB/Serial e Web Serial continuam disponíveis onde a plataforma os suporta

O protocolo Companion é o mesmo nas várias ligações; BLE envia payloads Companion diretamente e Serial/TCP usam framing `<|>|uint16_le|payload`.

## Funções principais

A app mantém as capacidades MeshCore úteis para um Companion:

- canais e chat;
- mensagens privadas;
- contactos e discovery;
- mapa e telemetria;
- path discovery e trace;
- configuração LoRa;
- estatísticas de rádio, bateria, uptime e storage;
- adverts local e flood;
- gestão de canais;
- auto-add e Path Hash;
- export/import de identidade quando permitido pelo firmware.

Quando deteta extensões HiveFW, disponibiliza também:

- modo Companion + Repeater;
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
- marcação de repeaters zero-hop com GPS no mapa;
- importação de ficheiros MeshCore originais `.discovered_contacts`;
- canais observados nas últimas 48 horas;
- Home Assistant: lista de comandos persistidos no Companion e envio direto;
- diagnóstico CAD;
- Canal APPS/SOS persistente e identificado no Chat.

As páginas de **Vizinhos** e **Canais observados** consultam a cache local do rádio e não geram tráfego LoRa.

## Identidade da aplicação

- Nome: **HiveFW Companion**
- Android Application ID: **`pt.hivefw.companion`**
- Tema: identidade visual HiveFW
- Ícone, wordmark e splash: assets oficiais do projeto HiveFW

## Android

O Android é a plataforma prioritária.

### Preview APK

A workflow `.github/workflows/internal.yml` cria um APK de preview para cada push em `main`.

### Releases GitHub

A workflow `.github/workflows/prod.yml` publica APKs em GitHub Releases para tags `app-v*`.

Releases instaláveis por cima de versões anteriores precisam de uma chave de assinatura persistente configurada nos GitHub Secrets:

- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_PASSWORD`
- `ANDROID_KEY_ALIAS`

Não existe dependência da Google Play Store.

## Desenvolvimento

Requisitos:

- Flutter stable compatível com Dart 3.7+
- Android SDK / JDK 17 para builds Android

Comandos típicos:

```bash
flutter pub get
flutter analyze --no-fatal-infos
flutter test
flutter build apk --debug
```

Para gerar os launcher icons a partir do asset HiveFW:

```bash
dart run flutter_launcher_icons
```

## Arquitetura

A aplicação mantém as camadas MeshCore genéricas e acrescenta extensões HiveFW por cima:

```text
lib/
├── protocol/        Companion protocol + extensões HiveFW
├── transport/       BLE, Serial, Web Serial e HiveFW TCP
├── services/        RadioService e serviços da aplicação
├── providers/       estado Riverpod
└── ui/
    ├── screens/     chat, nós, mapa, dispositivo
    └── apps/        ferramentas adicionais
```

O firmware HiveFW continua a ser a fonte de verdade para as capacidades suportadas. A app não simula controlos que o rádio não exponha.

## Licença e origem

Este projeto deriva tecnicamente da **LusoApp**, distribuída sob licença MIT. O repositório atual é independente e preserva os avisos de copyright/licença do trabalho original em [LICENSE](LICENSE).

As alterações HiveFW mantêm a mesma base licenciada e adicionam identidade, UI, transportes e suporte às extensões do firmware HiveFW.
