# HiveFW Companion & Repeater

**HiveFW** é um firmware baseado no [MeshCore](https://github.com/meshcore-dev/MeshCore) que mantém o **Companion Radio como função principal** e acrescenta um **modo Repeater opcional**, ativável pela aplicação MeshCore.

O projeto usa uma única árvore de código e uma única versão para os equipamentos suportados. As funcionalidades comuns permanecem partilhadas; as capacidades dependentes do hardware ficam isoladas por plataforma.

> **Companion primeiro. Repeater quando ativado. Uma versão para todas as plataformas HiveFW suportadas.**

---

## Arquitetura

O mesmo firmware base serve dois cenários:

- **Companion normal** — comportamento principal e sempre disponível.
- **Companion + Repeater** — o utilizador ativa o modo Repeater na app e o HiveFW passa a anunciar-se e a encaminhar tráfego como Repeater, mantendo a interface Companion.

As funcionalidades comuns são implementadas em `examples/companion_radio/` e compiladas tanto para ESP32 como para nRF52 sempre que o hardware as suporte.

As funcionalidades dependentes da plataforma ficam separadas:

- **ESP32 / Heltec V3 Wi-Fi:** TCP/Wi-Fi, NVS de rede e Web OTA seguro.
- **nRF52 / Heltec T114:** BLE Companion e atualização por BLE DFU/UF2.
- O código OTA/Wi-Fi do V3 é protegido por `ESP32 + WIFI_SSID + WEB_OTA_ENABLED` e não é compilado no T114.

---

## Hardware principal e matriz de funcionalidades

| Funcionalidade | Heltec V3 | Heltec T114 |
| --- | --- | --- |
| HiveFW Companion | Sim | Sim |
| Repeater opcional | Sim | Sim |
| UI HiveFW | Sim | Sim, no modelo com display |
| BLE Companion | Disponível em build própria | **Build principal do T114** |
| Wi-Fi / TCP Companion | **Sim** | Não |
| Home Assistant por TCP/Wi-Fi | **Sim** | Não diretamente |
| Web OTA seguro | **Sim** | Não |
| BLE DFU | Não é o método principal | **Sim** |
| UF2 | Não é o método principal | **Sim** |
| Mesma versão HiveFW | **Sim** | **Sim** |

Ambientes principais de Release:

```text
Heltec_v3_companion_radio_wifi
Heltec_t114_companion_radio_ble
```

Outros equipamentos compatíveis com MeshCore podem continuar a ser compilados através das respetivas definições existentes no repositório.

---

## Funcionalidades comuns Companion & Repeater

Entre as funcionalidades partilhadas pelo V3 e pelo T114 estão:

- Companion Radio como modo base.
- Modo Repeater ativável/desativável pela app.
- Identidade de advert adaptada ao estado Repeater.
- Smart Advert quando Repeater e Auto Advert estão ativos.
- Contadores de adverts TX/RX.
- Descoberta de Repeaters e vizinhos diretos.
- Node Discovery associado ao modo Repeater.
- Regions / Flood Scopes baseados na lógica do Repeater MeshCore.
- Duty Cycle configurável.
- Path Hash Mode.
- configuração de rádio e preferências comuns expostas pelo Companion.
- interface HiveFW e informação de Companion nos equipamentos com display.

O objetivo é que as funcionalidades de protocolo e Repeater sejam comuns sempre que possível, evitando forks separados por placa.

---

## Funcionalidades específicas do Heltec V3 Wi-Fi

O V3 usa ESP32-S3 e inclui as funcionalidades de rede local:

- Companion por TCP/Wi-Fi.
- integração remota com o Home Assistant.
- reconexão Wi-Fi.
- credenciais Wi-Fi persistidas em NVS.
- Web OTA.
- token OTA aleatório de 192 bits, mantido apenas em RAM.
- rotação do token imediatamente antes do flash pela integração HiveFW.
- artefacto OTA público sem SSID/password privados.

O Web OTA utiliza HTTP na LAN. Não deve ser exposto diretamente à Internet nem através de port-forwarding.

### Migração Wi-Fi a partir da V1.11

Uma build local pode migrar o SSID/password compilados para a NVS do ESP32. Depois dessa migração, as Releases públicas podem usar placeholders e continuar a ligar à rede através das credenciais persistidas no equipamento.

O ficheiro local de segredos não é versionado:

```bash
cp platformio.local.ini.example platformio.local.ini
```

Depois editar apenas `platformio.local.ini`.

---

## Funcionalidades específicas do Heltec T114

O T114 usa nRF52840 e permanece independente do código ESP32/Wi-Fi.

A build principal do HiveFW para T114 é:

```text
Heltec_t114_companion_radio_ble
```

O transporte Companion é BLE e a atualização de firmware é disponibilizada em dois formatos:

- `.zip` — pacote para **BLE DFU**, método recomendado para o T114.
- `.uf2` — alternativa para atualização compatível com UF2.

O T114 não recebe:

- AsyncElegantOTA;
- servidor HTTP `/update`;
- token `ota_token`;
- NVS de credenciais Wi-Fi;
- lógica de reconexão Wi-Fi.

Estas diferenças são deliberadas e não representam versões diferentes do HiveFW.

---

## Releases unificadas

O ficheiro `VERSION` é a **fonte única de versão** do projeto.

Uma tag:

```text
hivefw-VX.Y.Z
```

gera uma única GitHub Release **HiveFW Companion & Repeater VX.Y.Z** com artefactos para os dois alvos principais.

### Heltec V3

```text
Heltec_v3_companion_radio_wifi-VX.Y.Z-<commit>.bin
Heltec_v3_companion_radio_wifi-VX.Y.Z-<commit>.bin.sha256
```

O ficheiro `.bin` é a imagem da partição de aplicação adequada ao OTA. Imagens `merged`/factory não são publicadas como OTA.

### Heltec T114

```text
Heltec_t114_companion_radio_ble-VX.Y.Z-<commit>.zip
Heltec_t114_companion_radio_ble-VX.Y.Z-<commit>.zip.sha256
Heltec_t114_companion_radio_ble-VX.Y.Z-<commit>.uf2
Heltec_t114_companion_radio_ble-VX.Y.Z-<commit>.uf2.sha256
```

Desta forma, **V3 e T114 saem sempre da mesma tag, do mesmo commit e com a mesma versão**.

---

## Validação no `main`

O CI compila explicitamente os dois alvos principais:

```text
Heltec_v3_companion_radio_wifi
Heltec_t114_companion_radio_ble
```

Isto serve para detetar imediatamente alterações comuns que funcionem numa plataforma mas quebrem a outra.

O workflow de Release também compila os dois alvos em cada alteração relevante do `main`; só publica uma GitHub Release quando a execução é originada por uma tag `hivefw-V*`.

---

## Compilação local

Clonar:

```bash
git clone https://github.com/fabiocguerreiro/HiveFW-Companion-Repeater.git
cd HiveFW-Companion-Repeater
```

### Heltec V3 Wi-Fi

Para uma instalação que ainda necessita do bootstrap das credenciais:

```bash
cp platformio.local.ini.example platformio.local.ini
# editar platformio.local.ini
./build.sh build-firmware Heltec_v3_companion_radio_wifi
```

Para desenvolvimento rápido também pode ser usado:

```bash
pio run -e Heltec_v3_companion_radio_wifi
```

### Heltec T114 BLE

```bash
./build.sh build-firmware Heltec_t114_companion_radio_ble
```

Os ficheiros de distribuição ficam em `out/`. No T114, o pacote `.zip` é o formato recomendado para BLE DFU.

---

## Home Assistant

A integração própria do projeto é:

[**HiveFW-ha-integration**](https://github.com/fabiocguerreiro/HiveFW-ha-integration)

No V3 Wi-Fi, a integração pode comunicar diretamente com o rádio por TCP e disponibilizar:

- estado e telemetria;
- configuração do Companion/Repeater;
- chats, nós, vizinhos e regiões;
- comandos locais/remotos;
- gestão segura de firmware OTA;
- verificação manual da última GitHub Release;
- flash da última Release;
- flash manual de um `.bin`.

O gestor de firmware no Home Assistant é específico do caminho TCP/Web OTA do V3. O T114 continua a usar BLE DFU/UF2.

---

## Automação e bots

O HiveFW permite usar o Companion como ponte para automação, incluindo Home Assistant.

Bots e respostas automáticas devem ser preferencialmente **on-demand**, acionados por pedidos explícitos. A rede MeshCore utiliza um recurso rádio partilhado; automações que gerem flood, anúncios excessivos ou tráfego repetitivo devem ser evitadas.

> **Automatizar quando necessário, responder quando solicitado e evitar tráfego desnecessário.**

---

## Rádio

O firmware mantém a configuração de rádio MeshCore e as funcionalidades Repeater necessárias ao projeto. Frequência, largura de banda, SF, CR, potência e restantes parâmetros devem ser escolhidos de acordo com o hardware, a rede utilizada e a regulamentação aplicável no local de utilização.

---

## Estrutura de desenvolvimento

```text
HiveFW Companion & Repeater
│
├── Código comum
│   └── examples/companion_radio/
│       ├── Companion
│       ├── Repeater opcional
│       ├── Smart Advert
│       ├── Node Discovery
│       ├── Regions / Scopes
│       ├── Custom Vars
│       └── UI
│
├── Heltec V3 / ESP32-S3
│   ├── Wi-Fi / TCP
│   ├── NVS
│   └── Web OTA seguro
│
└── Heltec T114 / nRF52840
    ├── BLE Companion
    ├── BLE DFU
    └── UF2
```

A intenção é manter esta arquitetura: **uma base comum, diferenças de plataforma isoladas e uma única linha de versões**.

---

## Utilização responsável

O HiveFW é fornecido **tal como está**, sem garantias. A utilização do firmware, do equipamento rádio e das automações é da responsabilidade do utilizador.

É responsabilidade do utilizador garantir conformidade com legislação, frequências, potência, duty cycle e restantes regras aplicáveis.

O projeto não deve ser usado para flooding deliberado, tráfego automatizado excessivo ou interferência com outros utilizadores da rede MeshCore.

---

## Créditos e licença

O HiveFW é baseado no projeto open-source [MeshCore](https://github.com/meshcore-dev/MeshCore) e no trabalho dos seus contribuidores.

- [MeshCore](https://github.com/meshcore-dev/MeshCore)
- [Documentação MeshCore](https://docs.meshcore.io/)

Consulte os ficheiros de licença deste repositório para os termos aplicáveis ao HiveFW e às dependências de terceiros.
