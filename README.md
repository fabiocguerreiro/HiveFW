<p align="center">
  <img src="custom_components/hivefw_integration/brand/logo.png" alt="HiveFW" width="420">
</p>

# HiveFW para Home Assistant

Integração standalone para Home Assistant dedicada ao
[HiveFW Companion-Repeater](https://github.com/fabiocguerreiro/HiveFW-Companion-Repeater).

O HiveFW liga diretamente ao rádio e disponibiliza entidades, serviços, eventos,
mensagens, configuração e uma interface própria no Home Assistant.

**Não é necessário instalar `meshcore-ha` em separado.**

## Funcionalidades

### Dispositivo

Visão geral e configuração do rádio:

- bateria, tensão, temperatura e uptime;
- frequência, bandwidth, spreading factor, coding rate e TX power;
- RSSI, SNR, noise floor, TX queue e airtime;
- armazenamento, contactos, canais e Path Hash;
- estado Companion / Repeater;
- relógio interno e sincronização;
- Local Advert, Flood Advert, Trace e Reboot;
- atualização de firmware Web OTA diretamente no Home Assistant;
- upload manual de `.bin` e entidade nativa `update`;
- descoberta e instalação de Releases públicas HiveFW com validação SHA-256;
- Regions & Scopes;
- RX Log com informação de RSSI, SNR, hops e path;
- configuração do rádio e do modo Repeater.

### Chat e canais

- mensagens de canais e contactos;
- histórico persistente;
- unread e pesquisa;
- gestão de contactos e canais;
- scopes;
- informação RX associada às mensagens quando disponível.

Bots e automações devem ser preferencialmente **on-demand** para evitar tráfego LoRa
desnecessário numa rede partilhada.

### Nós

A página **Nós** usa um layout nativo de três colunas:

- **esquerda:** lista de nós;
- **centro:** mapa;
- **direita:** atividade.

A barra de filtros e pesquisa ocupa toda a largura no topo.

Inclui:

- Added / Discovered;
- Clients / Repeaters / Room Servers / Sensors;
- pesquisa e filtros;
- lista de nós numa única coluna;
- mapa com os nós que anunciam localização;
- centragem e popup do nó selecionado;
- Favorites e Tags locais;
- adicionar e remover contactos;
- importação e exportação no formato `discovered_contacts` compatível com MeshCore;
- atividade local baseada no histórico armazenado, incluindo RX, TX e aparições em paths.

A coluna **Atividade** é independente do mapa e não adiciona overlays nem camadas ao
`ha-map`.

### Vizinhos

Mostra Repeaters ouvidos pelo Companion utilizando a informação já disponível no rádio.

### Console

Console administrativo integrado com:

- execução de comandos;
- histórico;
- atalhos para comandos frequentes;
- respostas, timestamps e erros;
- seleção do dispositivo HiveFW ativo.

## Arquitetura

```text
Home Assistant
      │
      └── HiveFW
            │
            ├── TCP / Wi-Fi
            ├── BLE
            └── USB
                  │
                  ▼
        HiveFW Companion-Repeater
                  │
                  ▼
             Rede MeshCore
```

O firmware HiveFW é **Companion primeiro**. Quando o modo Repeater é ativado, a ligação
Companion continua disponível para o Home Assistant.

Para instalações permanentes, TCP/Wi-Fi é normalmente a ligação mais conveniente.

## Instalação com HACS

Adicionar como repositório personalizado:

```text
https://github.com/fabiocguerreiro/HiveFW-ha-integration
```

Depois:

1. Abrir **HACS → Integrations → Custom repositories**.
2. Adicionar o repositório como **Integration**.
3. Instalar **HiveFW**.
4. Reiniciar o Home Assistant.
5. Abrir **Definições → Dispositivos e Serviços → Adicionar integração**.
6. Procurar **HiveFW**.
7. Configurar a ligação ao rádio.
8. Abrir **HiveFW** na barra lateral.

O projeto assume uma instalação limpa do HiveFW e não mantém compatibilidade de migração
com instalações antigas de `meshcore-ha-chat`.

## Requisitos

- Home Assistant 2024.12 ou superior;
- rádio Companion compatível;
- TCP/Wi-Fi, BLE ou USB;
- para todas as funcionalidades específicas:
  [HiveFW Companion-Repeater](https://github.com/fabiocguerreiro/HiveFW-Companion-Repeater).

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

Referências a MeshCore no código correspondem ao protocolo, SDK, formatos compatíveis ou
código upstream.

## Tráfego RF

Leituras de entidades, histórico, mapa, atividade armazenada e métricas são operações
locais e não precisam de gerar tráfego LoRa.

Podem gerar tráfego RF ações explícitas como:

- envio de mensagens;
- Flood Advert;
- Trace;
- comandos remotos;
- administração remota de Repeaters.

O HiveFW procura evitar polling RF desnecessário.

## Segurança

Dados recebidos da mesh devem ser tratados como não confiáveis. Nomes, mensagens e outros
campos provenientes do rádio são renderizados como texto, e operações administrativas são
protegidas no backend pelo Home Assistant.

### Firmware OTA

Para HiveFW V1.11 ou superior, a integração gere o Web OTA sem armazenar uma password OTA:

- antes de cada atualização, o backend gera um token aleatório de 192 bits;
- o token é enviado ao rádio pelo canal Companion como variável write-only;
- o browser nunca recebe a credencial OTA;
- o frontend usa `hass.fetchWithAuth()`, pelo que o código HiveFW também não lê nem copia
  o access token do Home Assistant;
- o token não é persistido na configuração da integração;
- filtros dedicados impedem que o token, ou a sua representação hexadecimal nos frames,
  seja escrito nos logs de debug;
- o firmware gera uma nova credencial após reboot, invalidando a anterior;
- imagens de factory/merged são recusadas pelo backend OTA;
- Releases automáticas são verificadas por SHA-256 antes do envio ao rádio.

A V1.11 é uma migração única para equipamentos já instalados: deve ser compilada localmente
e instalada uma última vez pelo Web OTA existente. Nessa inicialização, as credenciais Wi-Fi
são migradas para a NVS do ESP32. Atualizações posteriores podem usar imagens públicas sem
SSID/password incorporados.

O transporte Web OTA entre Home Assistant e ESP32 continua a ser HTTP na LAN, sem TLS.
Utiliza esta funcionalidade apenas numa rede local de confiança.

Ver [SECURITY.md](SECURITY.md).

## Desenvolvimento

Frontend:

```bash
cd frontend
npm ci
npm run typecheck
npm run build
npm test
```

Backend:

```bash
python -m pytest tests/
```

Source frontend:

```text
frontend/src/
```

Bundle utilizado pelo Home Assistant:

```text
custom_components/hivefw_integration/hivefw-integration-panel.js
```

Wrapper específico do HiveFW:

```text
custom_components/hivefw_integration/hivefw-panel.js
```

## Código upstream

Parte do motor foi adaptada de
[meshcore-dev/meshcore-ha](https://github.com/meshcore-dev/meshcore-ha).

Projetos relacionados:

- [HiveFW Companion-Repeater](https://github.com/fabiocguerreiro/HiveFW-Companion-Repeater)
- [MeshCore](https://github.com/meshcore-dev/MeshCore)
- [meshcore_py](https://github.com/meshcore-dev/meshcore_py)

## Disclaimer

Projeto custom/experimental. A utilização e configuração do rádio são da responsabilidade
do utilizador.

Respeita os limites legais de frequência e potência aplicáveis e evita bots, automações ou
polling que provoquem flood desnecessário da rede.

## Licença

MIT — ver [LICENSE](LICENSE).
