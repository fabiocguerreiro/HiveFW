# Security Policy

## Versões suportadas

HiveFW é uma integração custom para Home Assistant. Correções de segurança são aplicadas à versão mais recente.

| Versão | Suporte |
| --- | --- |
| Mais recente | Sim |
| Versões anteriores | Não garantido |

## Reportar uma vulnerabilidade

Não abras um issue público para uma vulnerabilidade.

Usa **GitHub → Security → Report a vulnerability** e inclui:

- versão/commit afetado;
- impacto;
- passos de reprodução;
- logs ou payloads relevantes, removendo segredos.

O objetivo é confirmar o problema e coordenar uma correção antes de divulgação pública.

## Modelo de confiança

HiveFW recebe dados provenientes de uma rede mesh. Nomes de nós, mensagens, canais,
paths e outros campos recebidos por rádio devem ser tratados como **dados não confiáveis**.

### Renderização

O frontend usa Lit e DOM APIs. Dados provenientes da mesh são inseridos através de
interpolação escapada ou `textContent`. Onde existe markup estático criado por JavaScript,
esse markup não é construído a partir de valores recebidos da mesh.

### WebSocket e permissões

Comandos WebSocket que alteram configuração, identidade, contactos, canais, rádio,
Repeaters remotos ou executam comandos administrativos exigem utilizador administrador
do Home Assistant.

Operações de leitura e estado podem estar disponíveis a utilizadores autenticados,
de acordo com o modelo de permissões do Home Assistant.

### Validação

Os comandos WebSocket declaram schemas de entrada. Payloads inválidos são rejeitados
antes de chegar à lógica do rádio.

### Persistência

Histórico de mensagens, unread cursors e estado auxiliar usam as convenções de storage
do Home Assistant. Dados persistidos são validados ao carregar e erros de escrita não
devem provocar substituição silenciosa por estruturas vazias.

### Segredos

Passwords, chaves e identidade do rádio não devem ser expostos em payloads frontend,
logs ou mensagens de erro além do estritamente necessário.

### Firmware OTA

O Web OTA do ESP32 é uma operação administrativa e exige um utilizador administrador
no Home Assistant.

A integração não guarda uma password OTA estática. Para firmware HiveFW V1.11 ou
superior, cada atualização usa uma credencial aleatória efémera, rodada imediatamente
antes do upload e mantida apenas em memória. A credencial não é devolvida ao frontend
nem persistida na configuração.

Como o SDK MeshCore pode registar valores de Custom Vars e frames raw em DEBUG, o
backend aplica um filtro temporário que elimina qualquer registo contendo a credencial
OTA em texto ou na representação hexadecimal do frame.

O upload manual do browser usa a autenticação nativa do Home Assistant através de
`fetchWithAuth`; o painel HiveFW não lê nem armazena o access token do Home Assistant.

O backend rejeita imagens `merged`/factory e valida a estrutura básica da imagem ESP32.
Para instalações provenientes de GitHub Releases, é também validado o SHA-256 publicado.

O transporte do Home Assistant para o endpoint Web OTA do ESP32 é HTTP e não oferece
confidencialidade de transporte. O modelo pressupõe uma LAN de confiança. A utilização
através de redes não confiáveis ou exposição direta do endpoint OTA à Internet não é
suportada.

## Fora do âmbito

- vulnerabilidades do Home Assistant Core;
- vulnerabilidades do sistema operativo/host;
- vulnerabilidades do protocolo MeshCore ou do firmware que não sejam introduzidas por HiveFW;
- comportamento de hardware/radiofrequência que não atravesse a fronteira de segurança da integração.

## Dependências e upstream

HiveFW inclui/adapta componentes de `meshcore-dev/meshcore-ha` e usa o SDK MeshCore.
A proveniência e os avisos de licença upstream estão consolidados em [LICENSE](LICENSE).
