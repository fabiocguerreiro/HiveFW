<p align="center">
  <img src="custom_components/hivefw_integration/brand/logo.png" alt="HiveFW" width="420">
</p>

# HiveFW

**HiveFW** é uma plataforma local-first baseada no [MeshCore](https://github.com/meshcore-dev/MeshCore) que reúne, no mesmo projeto e na mesma linha de versões, o **firmware Companion + Repeater** e a respetiva **integração nativa para Home Assistant**.

O Companion continua a ser a interface principal do rádio. O modo **Repeater** é opcional e pode ser ativado sem perder a ligação Companion. A integração Home Assistant comunica diretamente com o equipamento HiveFW e disponibiliza configuração, mensagens, nós, vizinhos, diagnóstico RF, backup/restore e atualização de firmware.

> **Companion primeiro. Repeater quando ativado. Firmware e Home Assistant no mesmo HiveFW.**

## Visão geral

O projeto unificado inclui:

- firmware HiveFW para **Heltec WiFi LoRa 32 V3** e **Heltec T114**;
- Companion Radio com **Repeater opcional**;
- Wi-Fi/TCP no Heltec V3 quando é usada a build Wi-Fi;
- BLE Companion no Heltec V3 e no T114;
- integração standalone para Home Assistant — não requer `meshcore-ha` separado;
- painel HiveFW no Home Assistant;
- chats, canais, contactos, nós, mapas e atividade;
- tabela real de **vizinhos Repeater zero-hop**;
- Regions / Flood Scopes;
- Smart Advert com cadência mínima de 24 horas e persistência;
- diagnóstico de CAD e recuperação do RX;
- backup/restore compatível com o formato original da app MeshCore;
- Web OTA seguro no Heltec V3 **apenas na build Wi-Fi/TCP**;
- build BLE do Heltec V3 com atualização manual por USB;
- BLE DFU / UF2 no T114;
- uma única versão HiveFW para firmware e integração.

## Arquitetura

```text
                           HiveFW
                             │
             ┌───────────────┴───────────────┐
             │                               │
          Firmware                      Home Assistant
             │                               │
     Companion + Repeater              hivefw_integration
             │                               │
      ┌──────┴──────┐              ┌─────────┴─────────┐
      │             │              │                   │
 Heltec V3      Heltec T114     Dispositivo        Chat / Nós
 Wi-Fi/TCP         BLE          Diagnóstico        Mapa / Vizinhos
 Web OTA        DFU / UF2       Backup/Restore     Console
      │             │              │                   │
      └─────────────┴──────────────┴───────────────────┘
                             │
                         Rede MeshCore
```

O código MeshCore/HiveFW permanece na raiz do repositório para manter a estrutura normal de desenvolvimento e facilitar o acompanhamento do upstream. A integração Home Assistant também permanece na raiz, em `custom_components/hivefw_integration/`, para continuar compatível com HACS.

## Estrutura do repositório

```text
HiveFW/
├── src/                                  core MeshCore/HiveFW
├── arch/                                 suporte por plataforma
├── boards/                               definições de boards
├── variants/                             variantes de hardware
├── examples/companion_radio/             Companion + Repeater HiveFW
├── custom_components/hivefw_integration/ integração Home Assistant
├── frontend/                             source do painel HA
├── tests/                                testes HA
├── docs/                                 documentação
├── platformio.ini
├── build.sh
├── hacs.json
└── VERSION                               versão comum do projeto
```

## Hardware principal

| Funcionalidade | Heltec V3 | Heltec T114 |
| --- | --- | --- |
| HiveFW Companion | Sim | Sim |
| Repeater opcional | Sim | Sim |
| UI HiveFW | Sim | Sim, modelo com display |
| Wi-Fi / TCP Companion | **Sim, build Wi-Fi** | Não |
| BLE Companion | **Sim, build BLE** | **Sim** |
| Home Assistant direto | **TCP/Wi-Fi ou BLE** | **BLE** |
| Web OTA / update pela integração | **Só build Wi-Fi/TCP** | Não |
| Atualização da build BLE | **USB / flash manual** | **BLE DFU / UF2** |
| UF2 | Não | **Sim** |
| Versão HiveFW | **Comum** | **Comum** |

Política e matriz de suporte: [docs/supported_hardware.md](docs/supported_hardware.md).

Ambientes principais:

```text
Heltec_v3_companion_radio_wifi
Heltec_v3_companion_radio_ble
Heltec_t114_companion_radio_ble
```

## Firmware HiveFW

### Companion + Repeater

O mesmo firmware suporta:

- **Companion normal** — comportamento base e sempre disponível;
- **Companion + Repeater** — encaminhamento MeshCore ativável, mantendo simultaneamente o Companion.

Funcionalidades comuns:

- identidade de advert adaptada ao estado Repeater;
- configuração de rádio: frequência, BW, SF, CR, TX Power e Path Hash;
- Duty Cycle configurável;
- Flood Limits oficiais: geral, unscoped e advert;
- Loop Detect configurável: Off / Minimal / Moderate / Strict;
- CAD hardware configurável antes de TX;
- interference threshold configurável;
- AGC reset interval configurável em passos de 4 segundos;
- RX delay, Flood TX delay e Direct TX delay configuráveis;
- Regions / Flood Scopes;
- descoberta de Repeaters;
- Node Discovery com rate limiting equivalente ao simple_repeater: máximo de 4 respostas por janela de 120 segundos;
- servidor de login Repeater com ACL persistente e perfis Admin/Guest;
- passwords Repeater write-only na integração, sem leitura de segredos a partir do rádio;
- contadores de adverts TX/RX;
- telemetria e informação do Companion;
- UI HiveFW nos equipamentos com display.

### Smart Advert

O Smart Advert do Repeater usa um **slot diário determinístico de 24 horas derivado do hash/identidade do nó**. Reiniciar, atualizar ou reflashear não escolhe uma nova hora normal de anúncio.

- anúncios manuais Local/Flood não reiniciam nem alteram o slot automático;
- o timestamp persistido representa apenas um Auto Advert realmente originado;
- existe uma proteção independente `at-most-once` para impedir dois Auto Adverts em menos de 24 horas;
- ao ativar o Auto Advert sem existir um envio automático confirmado nas últimas 24 horas, existe uma **janela de segurança de 5 minutos** antes do primeiro advert; se for desligado durante essa janela, nada é transmitido;
- essa janela de ativação é persistida, por isso um reboot durante os 5 minutos não a contorna;
- depois da janela de segurança, se continuar sem existir um Auto Advert nas últimas 24 horas, é enviado um advert de recuperação;
- em reboots normais com Auto Advert já ativo há mais de 5 minutos, a recuperação continua imediata quando passaram 24 horas sem envio;
- se o advert de recuperação ficar fora do slot normal, um slot demasiado próximo é ignorado e o nó regressa automaticamente ao horário por hash em até 48 horas;
- no ESP32 o último Auto Advert é também espelhado em NVS;
- ao alterar o Auto Advert no Companion com display, a confirmação mostra o tempo efetivo até ao próximo envio em minutos (`ADV: Em XX Min.`); o countdown detalhado permanece na integração Home Assistant.

### Vizinhos zero-hop

A tabela de Vizinhos segue a semântica do Repeater oficial MeshCore:

- apenas adverts de tipo Repeater;
- recebidos diretamente, com zero hashes no path;
- adverts provenientes de **Share Contact** não contam como prova de vizinhança RF;
- tabela acumulada de vários Repeaters, em vez de depender apenas do último Advert Path observado;
- consulta local pela integração, sem gerar tráfego LoRa.

### ACL e login Repeater

Quando o modo Repeater está ativo, o HiveFW pode funcionar também como servidor autenticado compatível com o fluxo de login do `simple_repeater`.

- password **Admin** e password **Guest** são independentes e opcionais;
- por defeito ambas estão vazias, portanto não é aceite um primeiro login remoto até ser configurada uma password;
- um login Admin válido cria/atualiza uma entrada persistente na ACL do rádio;
- sessões Guest não são persistidas na ACL;
- clientes já persistidos na ACL podem voltar a autenticar-se pela sua identidade com o fluxo de re-login do MeshCore;
- a integração mostra apenas se cada password está configurada e o número de entradas ACL;
- os valores das passwords são **write-only** e nunca são devolvidos pelo firmware;
- a integração permite limpar a ACL sem alterar as passwords configuradas;
- a configuração local pela integração usa BLE/TCP/USB e não gera tráfego LoRa; o login remoto propriamente dito é tráfego MeshCore.

O servidor Repeater suporta `GET_STATUS`, `TELEMETRY`, `NEIGHBOURS`, `ACCESS_LIST`, `GET_OWNER_INFO` e remote CLI autenticada. `NEIGHBOURS` reutiliza a mesma tabela zero-hop da integração; a remote CLI é restrita a sessões Admin autenticadas e inclui proteção contra replay.

### Diagnóstico CAD

O HiveFW recolhe informação adicional para investigar `CAD Timeout`:

- número de timeouts;
- recuperações RX;
- force-TX após recuperação;
- duração do último estado busy;
- maior duração observada;
- tempo desde o último timeout.

Quando o canal permanece continuamente busy durante o timeout, o firmware tenta recuperar o estado RX uma vez antes do mecanismo final de force-TX.

## Heltec V3 · ESP32-S3

O V3 tem duas builds oficiais e alternativas:

```text
Heltec_v3_companion_radio_wifi
Heltec_v3_companion_radio_ble
```

A build **Wi-Fi/TCP** mantém o funcionamento atual:

- Companion por TCP/Wi-Fi;
- integração direta com Home Assistant por rede local;
- credenciais Wi-Fi em NVS;
- reconexão Wi-Fi;
- portal local de configuração em `/wifi`;
- hotspot de provisioning quando ainda não existem credenciais;
- Web OTA seguro;
- credencial OTA efémera de 192 bits, mantida apenas em RAM;
- atualização de firmware através da integração Home Assistant;
- pacote de recuperação USB que preserva a NVS.

A build **BLE** usa o mesmo modelo Companion + Repeater do T114, mas sobre o ESP32-S3:

- Companion por BLE, incluindo ligação direta à integração Home Assistant por BLE;
- mesma configuração Repeater, Regions, Smart Advert, diagnóstico e protocolo Companion;
- não inicializa Wi-Fi, portal `/wifi` nem Web OTA;
- **não permite atualização de firmware através da integração Home Assistant**;
- atualização feita manualmente por USB/serial, usando o `.bin` ou `-merged.bin` publicado na Release.

As duas builds usam o mesmo hardware e a mesma versão HiveFW; o transporte Companion é escolhido no momento de compilar/instalar o firmware.

### Provisioning Wi-Fi

Num V3 sem SSID guardado, o HiveFW cria um hotspot temporário. Abrir:

```text
http://192.168.4.1/wifi
```

Credenciais do portal:

```text
Utilizador: hivefw
Password:   hivefw
```

Depois de configurado, a mesma página fica disponível no endereço LAN:

```text
http://IP_DO_RADIO/wifi
```

A password Wi-Fi guardada não é apresentada no portal.

Documentação: [Configuração Wi-Fi do Heltec V3](docs/hivefw_wifi_provisioning.md).

## Heltec T114 · nRF52840

A build principal é:

```text
Heltec_t114_companion_radio_ble
```

O Companion utiliza BLE. Atualizações são produzidas em:

- `.zip` — BLE DFU, método recomendado;
- `.uf2` — alternativa UF2.

O código específico do ESP32 — Wi-Fi, NVS de rede e Web OTA — não é compilado para o T114.

## Home Assistant

A integração está incluída neste mesmo repositório:

```text
custom_components/hivefw_integration
```

Domínio:

```text
hivefw_integration
```

É uma integração standalone: **não é necessário instalar `meshcore-ha` separadamente**.

### Dispositivo

A página Dispositivo agrega:

- bateria, tensão, temperatura e uptime;
- frequência, bandwidth, SF, CR e TX Power;
- RSSI, SNR, noise floor, TX queue e airtime;
- contactos, canais, armazenamento e Path Hash;
- estado Companion / Repeater;
- relógio interno e sincronização;
- Local Advert, Flood Advert, Trace e Reboot;
- Regions & Scopes;
- RX Log;
- diagnóstico CAD;
- gestão Wi-Fi do V3;
- atualização OTA;
- **Backup & Restore** completo.

### Backup & Restore

O HiveFW pode exportar e restaurar backups no formato JSON compatível com a app MeshCore Companion.

O backup inclui, quando suportado pelo rádio:

- nome;
- public key e private key;
- configuração de rádio;
- posição;
- opções de contactos;
- Auto Add;
- canais e respetivas chaves;
- contactos guardados no rádio.

> O ficheiro de backup contém a chave privada do dispositivo e deve ser tratado como credencial sensível.

### Chat e Canais

- mensagens de canais e contactos;
- histórico persistente;
- unread e pesquisa;
- gestão de contactos e canais;
- scopes;
- metadados RX associados às mensagens.

### Nós

A página Nós disponibiliza:

- Added / Discovered;
- Clients / Repeaters / Room Servers / Sensors;
- pesquisa e filtros;
- lista + mapa + atividade;
- centragem e popup do nó selecionado;
- Favorites e Tags;
- adicionar/remover contactos;
- import/export `discovered_contacts` compatível com MeshCore;
- histórico de atividade, RX/TX e presença em paths.

### Vizinhos

Mostra a tabela de Repeaters realmente ouvidos diretamente pelo rádio, com a semântica zero-hop do firmware HiveFW.

### Console

Console administrativo com:

- comandos livres;
- histórico;
- comandos predefinidos;
- respostas e timestamps;
- operações locais e administração remota quando suportada.

## HACS

Adicionar como repositório personalizado:

```text
https://github.com/fabiocguerreiro/HiveFW
```

Categoria: **Integration**.

Depois instalar **HiveFW** e reiniciar o Home Assistant.

Como o domínio continua a ser `hivefw_integration`, a mudança do antigo repositório para o monorepo não altera a identidade interna da integração. Para migrar uma instalação existente no HACS, remove a origem antiga do HACS e adiciona este novo repositório; não é necessário apagar a configuração HiveFW em **Definições → Dispositivos e Serviços**.

Guia de migração: [docs/repository_migration.md](docs/repository_migration.md).

## Identidade no Home Assistant

```text
Domínio:   hivefw_integration
Entidades: sensor.hivefw_*
           binary_sensor.hivefw_*
           select.hivefw_*
           device_tracker.hivefw_*
Painel:    /hivefw
Eventos:   hivefw_*
```

## Atualização de firmware

A integração procura firmware nas Releases de:

```text
fabiocguerreiro/HiveFW
```

No V3:

- verifica a Release pública;
- seleciona a imagem OTA de aplicação;
- valida SHA-256 quando disponível;
- gera uma credencial OTA efémera;
- envia o firmware pela LAN;
- espera pelo reboot;
- volta a consultar o `DEVICE_INFO` para confirmar a versão arrancada.

Factory/merged images não são aceites pelo updater OTA.

## Versionamento unificado

O ficheiro:

```text
VERSION
```

é a fonte canónica de versão do HiveFW.

A versão do firmware e:

```text
custom_components/hivefw_integration/manifest.json
```

têm de corresponder. O CI rejeita versões divergentes.

A primeira linha unificada é:

```text
HiveFW 1.13.0
```

**Um merge normal não publica uma Release.** Uma commit explícita `Release HiveFW X.Y.Z` cria/move a tag `vX.Y.Z` para essa commit e o próprio workflow compila e publica a Release. Uma tag criada manualmente continua igualmente suportada.

## Releases

Uma futura tag:

```text
v1.13.0
```

produz a Release:

```text
HiveFW 1.12.0
```

e os artefactos dos alvos principais.

### Heltec V3

```text
Heltec_v3_companion_radio_wifi-V1.12.0-<commit>.bin
...sha256
...recovery.zip
...recovery.zip.sha256
```

### Heltec T114

```text
Heltec_t114_companion_radio_ble-V1.12.0-<commit>.zip
...zip.sha256
Heltec_t114_companion_radio_ble-V1.12.0-<commit>.uf2
...uf2.sha256
```

## Tráfego RF e automações

Leituras locais de entidades, histórico, mapa e métricas não devem gerar tráfego LoRa.

Geram ou podem gerar tráfego RF ações explícitas como:

- envio de mensagens;
- Flood Advert;
- Trace;
- descoberta ativa;
- comandos remotos;
- administração remota de Repeaters.

Bots e respostas automáticas devem ser preferencialmente **on-demand**.

> **Automatizar quando necessário, responder quando solicitado e evitar tráfego desnecessário.**

## Compilação local

Clonar:

```bash
git clone https://github.com/fabiocguerreiro/HiveFW.git
cd HiveFW
```

Heltec V3:

```bash
./build.sh build-firmware Heltec_v3_companion_radio_wifi
```

Heltec T114:

```bash
./build.sh build-firmware Heltec_t114_companion_radio_ble
```

Frontend Home Assistant:

```bash
cd frontend
npm ci
npm run typecheck
npm run build
npm test
```

Backend Home Assistant:

```bash
python -m pytest tests/
```

## Upstreams

O HiveFW acompanha três projetos upstream independentes:

- [MeshCore](https://github.com/meshcore-dev/MeshCore) — base do firmware;
- [meshcore-ha](https://github.com/meshcore-dev/meshcore-ha) — funcionalidades e engine Home Assistant;
- [meshcore-ha-chat](https://github.com/mwolter805/meshcore-ha-chat) — origem de partes da experiência de chat/UI.

As alterações upstream são analisadas e adaptadas ao HiveFW; não são fundidas cegamente no `main`.

Numa clone de desenvolvimento podem ser configurados:

```bash
git remote add upstream-meshcore https://github.com/meshcore-dev/MeshCore.git
git remote add upstream-meshcore-ha https://github.com/meshcore-dev/meshcore-ha.git
git remote add upstream-meshcore-ha-chat https://github.com/mwolter805/meshcore-ha-chat.git

O repositório também mantém um baseline versionado e uma verificação semanal
dos upstreams. O processo é apenas de acompanhamento — nunca faz merge
automático. Ver [Acompanhamento dos upstreams](docs/upstream-sync.md).
git fetch --all --prune
```

## Segurança

Dados provenientes da mesh são tratados como não confiáveis no frontend.

No Web OTA do V3:

- a integração gera uma credencial aleatória por operação;
- a credencial é enviada pelo Companion;
- não fica persistida no Home Assistant;
- é invalidada por reboot/rotação;
- filtros impedem a sua exposição nos logs de debug;
- o upload ocorre por HTTP na LAN.

O endpoint OTA não deve ser exposto diretamente à Internet.

Ver [SECURITY.md](SECURITY.md).

## Utilização responsável

O HiveFW é fornecido tal como está, sem garantias.

É responsabilidade do utilizador respeitar frequência, potência, duty cycle e restantes regras aplicáveis ao local de utilização. O projeto não deve ser usado para flooding deliberado, tráfego automatizado excessivo ou interferência com outros utilizadores da rede MeshCore.

## Créditos e licenças

HiveFW deriva do trabalho open-source do ecossistema MeshCore.

- [MeshCore](https://github.com/meshcore-dev/MeshCore)
- [meshcore-ha](https://github.com/meshcore-dev/meshcore-ha)
- [meshcore-ha-chat](https://github.com/mwolter805/meshcore-ha-chat)
- [meshcore_py](https://github.com/meshcore-dev/meshcore_py)
- [Documentação MeshCore](https://docs.meshcore.io/)

Consultar `LICENSE`, `THIRD_PARTY_NOTICES.md` e os ficheiros de licença mantidos junto dos componentes de terceiros para os termos e atribuições aplicáveis.
