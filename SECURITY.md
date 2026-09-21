# Security Policy

## Versões suportadas

O HiveFW aplica correções de segurança ao:

- `main` atual;
- release estável mais recente, quando existir.

Não existe compromisso de backport para releases anteriores.

## Como reportar uma vulnerabilidade

Não publiques vulnerabilidades de segurança em Issues, Discussions ou logs
públicos.

Usa **Security → Report a vulnerability** no repositório HiveFW (Private
vulnerability reporting).

Inclui, quando possível:

- versão/commit HiveFW;
- componente afetado;
- hardware utilizado (V3 ou T114);
- pré-condições necessárias;
- impacto;
- passos mínimos de reprodução;
- logs sanitizados;
- indicação de qualquer segredo/chave que possa ter sido exposto.

Não coloques private keys, passwords Wi-Fi, tokens do Home Assistant ou
credenciais OTA em Issues públicas.

## Âmbito HiveFW

### Firmware e rádio

Incluído:

- parsing e encaminhamento de pacotes MeshCore;
- Companion protocol;
- identidade, assinatura e armazenamento de chaves;
- Repeater;
- Regions / Flood Scopes;
- Smart Advert;
- gestão de contactos/canais;
- BLE Companion do T114;
- Wi-Fi/TCP Companion do V3;
- portal de provisioning Wi-Fi;
- NVS usada pelo HiveFW;
- Web OTA e mecanismo de recuperação;
- comandos administrativos expostos pelo firmware.

### Home Assistant

Incluído:

- `hivefw_integration`;
- WebSocket/API do painel;
- armazenamento de histórico/configuração;
- descoberta e controlo do rádio;
- atualização OTA;
- Backup & Restore;
- manipulação de private keys e channel secrets;
- frontend quando processa dados não confiáveis recebidos da mesh.

## Fora do âmbito normal

Normalmente não são vulnerabilidades do HiveFW:

- jamming ou interferência RF;
- ausência de cobertura;
- violações de regras locais de frequência, potência ou duty cycle;
- acesso JTAG/UART/flash quando o atacante já possui acesso físico privilegiado;
- falhas exclusivamente num serviço externo;
- vulnerabilidades puramente upstream sem código HiveFW envolvido.

Mesmo assim, se não for claro onde está a causa, um relatório privado é
preferível a divulgar publicamente.

## Dependências e upstreams

HiveFW deriva de MeshCore e incorpora/adapta componentes de meshcore-ha e
meshcore-ha-chat. Uma correção pode exigir coordenação com o upstream
responsável. Não removemos avisos de segurança ou autoria upstream ao portar
uma correção.

## Segredos e dados sensíveis

O HiveFW trata como sensíveis, entre outros:

- private key do dispositivo;
- channel secrets;
- passwords Wi-Fi;
- credenciais/tokens Home Assistant;
- credencial OTA efémera;
- ficheiros de backup completos.

Os backups exportados podem conter a private key do rádio e devem ser
armazenados como credenciais.

## Divulgação

Pedimos tempo razoável para investigar e corrigir antes de divulgação pública.
Quando a causa estiver num upstream, coordenaremos a divulgação com esse
projeto quando apropriado.
