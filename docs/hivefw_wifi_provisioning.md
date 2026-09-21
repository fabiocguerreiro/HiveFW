# Configuração Wi-Fi do HiveFW no Heltec V3

O **Heltec V3** é suportado pelo HiveFW como **Companion Wi-Fi/TCP**. A partir da V1.11.7, a configuração inicial da rede deixa de depender de `platformio.local.ini` ou de SSID/password compilados no firmware.

O **Heltec T114** não usa este mecanismo: continua a ser o alvo BLE do HiveFW e mantém o fluxo BLE DFU/UF2.

## Primeiro arranque num V3 limpo

O HiveFW lê a namespace NVS:

```text
hivefw_net
├── ssid
└── pwd
```

Se `ssid` estiver vazio, o firmware não grava nem inventa credenciais. Inicia um hotspot Wi-Fi com o **nome atual/original do nó MeshCore**, ativa DNS de captive portal e disponibiliza:

```text
http://192.168.4.1/wifi
```

Em muitos sistemas a página pode abrir automaticamente após ligar ao hotspot. Caso contrário, abrir manualmente o endereço acima.

## Hotspot e autenticação

O hotspot de provisioning é aberto. A autenticação é feita **na página HiveFW**:

```text
Utilizador: hivefw
Password:   hivefw
```

A password `hivefw` tem 6 caracteres. O ESP32 exige pelo menos 8 caracteres para uma passphrase WPA/WPA2 de SoftAP; por isso estas credenciais são usadas como autenticação do portal Web e não como password WPA do hotspot.

Depois do login é criada uma sessão aleatória apenas em RAM. Reiniciar o V3 invalida essa sessão.

## Página de configuração

A página usa o visual HiveFW: fundo cinzento, cartão branco, logótipo HiveFW, destaques laranja e layout responsivo.

Permite escrever manualmente um SSID, procurar redes próximas, selecionar uma rede encontrada, introduzir a password, configurar uma rede aberta e guardar/reiniciar.

A pesquisa de redes só é executada quando o utilizador carrega em **Procurar redes**. Scans Wi-Fi obrigam o ESP32 a percorrer canais e podem interromper brevemente o AP/STA; por isso não há scans contínuos em background.

O conceito segue o padrão de captive/fallback portal usado por projetos como o ESPHome, mas o portal HiveFW é implementado diretamente no firmware Companion.

Referências:

- ESPHome Captive Portal: https://esphome.io/components/captive_portal/
- ESPHome WiFi / Access Point mode: https://esphome.io/components/wifi/
- Arduino ESP32 Wi-Fi API: https://docs.espressif.com/projects/arduino-esp32/en/latest/api/wifi.html

## Gravação na NVS

As credenciais só são alteradas quando o utilizador confirma **Guardar Wi-Fi e reiniciar**. São gravadas nas chaves já usadas pelo HiveFW:

```text
namespace: hivefw_net
ssid:      <SSID>
pwd:       <password>
```

Depois da gravação o V3 reinicia e tenta ligar-se ao router. As credenciais permanecem na NVS durante updates OTA normais.

## Equipamentos que já têm Wi-Fi configurado

Se a NVS já contém `ssid` e `pwd`:

- o firmware usa essas credenciais como antes;
- **não inicia o hotspot de provisioning**;
- **não substitui o SSID**;
- **não substitui a password**;
- **não limpa a NVS**;
- o Companion Wi-Fi/TCP continua normal.

A página permanece disponível pelo IP atribuído pelo router:

```text
http://IP_DO_RADIO/wifi
```

Exemplo:

```text
http://192.168.1.97/wifi
```

O login continua a ser `hivefw / hivefw`.

A password Wi-Fi atualmente guardada nunca é apresentada. Se o utilizador mantiver o mesmo SSID e submeter a password em branco, o HiveFW preserva a password NVS existente. Para configurar explicitamente uma rede sem password é necessário marcar **Esta rede não usa password**.

## OTA e configuração Wi-Fi são independentes

### Wi-Fi: `/wifi`

- login local `hivefw / hivefw`;
- apenas seleção e gravação da rede;
- disponível no AP de provisioning ou no IP LAN do V3.

### Firmware OTA: `/update`

- mantém o token OTA aleatório/efémero;
- token apenas em RAM;
- a integração Home Assistant pode rodar o token antes de cada update;
- a password Wi-Fi nunca é reutilizada no OTA.

A introdução do portal não altera o modelo de segurança do OTA.

## Compilação

A build normal do V3 contém apenas placeholders de runtime:

```text
WIFI_SSID=__HIVEFW_RUNTIME_WIFI__
WIFI_PWD=__HIVEFW_RUNTIME_WIFI__
```

Não é necessário criar `platformio.local.ini`.

```bash
./build.sh build-firmware Heltec_v3_companion_radio_wifi
```

ou:

```bash
pio run -e Heltec_v3_companion_radio_wifi
```

O mesmo binário público pode ser instalado num V3 limpo e configurado posteriormente pelo browser.

## Compatibilidade com instalações antigas

O código de migração que reconhece builds antigas com SSID/password compilados é mantido por compatibilidade. Se uma instalação antiga ainda tiver credenciais embutidas e a NVS estiver vazia, elas podem ser migradas uma única vez para NVS.

Esse mecanismo deixou de ser necessário para instalações novas.

## Recovery e apagamento da NVS

O pacote de recovery HiveFW foi desenhado para **preservar a NVS**. Um V3 já configurado mantém as credenciais anteriores.

Um erase que apague efetivamente a NVS faz o dispositivo voltar a ser considerado não provisionado; no boot seguinte abre novamente o hotspot.

## Segurança

O portal é destinado à rede local e ao provisioning presencial. Não expor `/wifi`, `/update` ou a porta TCP Companion diretamente à Internet por port-forwarding.
