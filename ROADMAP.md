# HiveFW — Roadmap

O HiveFW é agora um projeto unificado: firmware Companion + Repeater e integração
Home Assistant vivem no mesmo repositório, usam a mesma versão e são publicados
pela mesma linha de Releases.

## Estado atual — 1.12.x

### Projeto unificado

- [x] firmware e Home Assistant no mesmo repositório;
- [x] Heltec V3 e Heltec T114 como únicos alvos suportados;
- [x] integração standalone sem dependência de uma instalação separada de `meshcore-ha`;
- [x] `VERSION` e manifest sincronizados;
- [x] HACS apontado para `fabiocguerreiro/HiveFW`;
- [x] updater OTA apontado para as Releases do HiveFW;
- [x] primeira Release unificada publicada: `v1.12.0`;
- [x] repositórios antigos removidos;
- [x] branches de migração/limpeza removidos;
- [x] CI de firmware, frontend, backend, CodeQL e validação ativo.

### Firmware

- [x] Companion como modo base;
- [x] Repeater opcional;
- [x] Heltec V3 Wi-Fi/TCP;
- [x] Heltec T114 BLE;
- [x] portal Wi-Fi e credenciais NVS no V3;
- [x] Web OTA seguro;
- [x] BLE DFU / UF2 no T114;
- [x] Smart Advert com slot diário determinístico de 24 h derivado do hash do nó;
- [x] persistência apenas do último Auto Advert realmente originado;
- [x] proteção at-most-once para Auto Advert;
- [x] janela de segurança de 5 min após ativar Auto Advert quando não existe envio confirmado nas últimas 24 h;
- [x] persistência da janela de ativação para impedir bypass por reboot;
- [x] advert de recuperação quando não existe envio confirmado nas últimas 24 h;
- [x] realinhamento automático ao slot por hash em até 48 h após um advert de recuperação;
- [x] confirmação compacta no Companion com ETA do próximo Smart Advert em minutos (`ADV: Em XX Min.`);
- [x] tabela acumulada de vizinhos Repeater zero-hop;
- [x] exclusão de Share Contact da deteção de vizinhos RF;
- [x] diagnóstico e recuperação de CAD Timeout;
- [x] Regions / Flood Scopes;
- [x] Flood Limits equivalentes ao simple_repeater (geral / unscoped / advert);
- [x] Loop Detect equivalente ao simple_repeater (off / minimal / moderate / strict);
- [x] Duty Cycle e Path Hash;
- [x] UI HiveFW.

### Home Assistant

- [x] TCP/Wi-Fi e BLE;
- [x] entidades, serviços, eventos e WebSocket API;
- [x] painel HiveFW;
- [x] Dispositivo, telemetria e configuração de rádio;
- [x] Chat & Canais;
- [x] Nós em lista + mapa + atividade;
- [x] Vizinhos usando a tabela real do firmware;
- [x] Console;
- [x] Regions & Scopes;
- [x] RX Log;
- [x] firmware OTA e entidade update;
- [x] Backup & Restore compatível com o formato MeshCore;
- [x] import/export `discovered_contacts`;
- [x] QR / URI de canais e contactos;
- [x] Favorites, Tags e operações em massa;
- [x] administração remota de Repeaters;
- [x] LOS / Fresnel on-demand;
- [x] health transitions e eventos HA;
- [x] frontend e backend testados em CI;
- [x] histórico RF/tráfego através do Recorder do Home Assistant;
- [x] janela RF de 7 dias com média das últimas 24 h e tendência face às 24 h anteriores;
- [x] cartão Smart Advert com countdown até ao próximo envio, independente de fuso horário.

## Ponto de recuperação

Antes da consolidação do frontend e da evolução da telemetria RF foi criado um
checkpoint Git sem alterações de ficheiros:

`f4fb93a7b03183194b87abe4df2c41ac6596ec2f`

Esse commit representa o estado estável imediatamente após a limpeza RAK e pode
ser usado como referência para comparar ou reverter esta fase sem depender de
um branch de backup permanente.

## Validação em hardware / utilização real

Já confirmado no fluxo unificado:

- [x] instalação/atualização da integração a partir do novo monorepo;
- [x] painel HiveFW carregado a partir do repositório unificado;
- [x] TCP/Wi-Fi no Heltec V3;
- [x] Web OTA usando a primeira Release unificada.

Continuar a observar/testar:

- [ ] BLE num Heltec T114 em utilização prolongada;
- [ ] BLE DFU / UF2 a partir de uma Release unificada;
- [ ] reload / restart / reconnect repetidos;
- [ ] confirmar ausência de ligações duplicadas após vários reloads;
- [ ] Backup + Restore completo num equipamento de teste;
- [ ] restauro de identidade/private key;
- [ ] Smart Advert durante vários dias, incluindo slot por hash, ativação/desativação durante a janela de 5 min, reboot durante a grace period e recuperação após mais de 24 h sem envio;
- [ ] tabela de vizinhos com vários Repeaters zero-hop durante utilização prolongada;
- [ ] diagnóstico CAD durante operação prolongada.

## Próxima fase — 1.12.x de estabilização

- observar Smart Advert, CAD, reconnect e vizinhos antes de alterar a lógica RF;
- corrigir apenas regressões e problemas encontrados em utilização real;
- evitar uma nova Release apenas por reorganização interna de código;
- usar Releases 1.12.x apenas quando existir uma correção que deva chegar aos equipamentos/utilizadores.

## Próxima fase de desenvolvimento — 1.13

### Frontend

- [x] mover a fonte do wrapper `hivefw-panel.js` para `frontend/src/hivefw-panel.ts`;
- [x] gerar `hivefw-integration-panel.js` e `hivefw-panel.js` pelo mesmo pipeline Rollup;
- [x] deixar de usar a versão do `frontend/package.json` como versão do bundle e usar `VERSION`;
- [ ] migrar gradualmente as extensões ainda existentes em `hivefw-panel.ts` para páginas/componentes TypeScript próprios;
- [ ] reduzir manipulação DOM pós-render onde já existe um componente Lit equivalente;
- [ ] remover o wrapper de extensão quando toda a funcionalidade HiveFW estiver integrada na árvore TypeScript principal.

### Paridade com simple_repeater

Implementar pela ordem definida para o Repeater HiveFW:

- [x] 1. Flood Limits + Loop Detect;
- [x] 2. CAD / interference / AGC + delays configuráveis;
- [x] 3. Discovery rate limiting;
- [x] 4. ACL + servidor de login Repeater;
- [x] 5. GET_STATUS / TELEMETRY / NEIGHBOURS / ACCESS_LIST;
- [ ] 6. OWNER / REGIONS / CLOCK anónimos + remote CLI.

### Observabilidade RF

- [x] histórico local sem tráfego LoRa adicional;
- [x] Noise Floor, RSSI, SNR, RX/TX rate, RX errors, TX queue e airtime no histórico;
- [x] janela de 7 dias, média 24 h, delta 24 h e mínimos/máximos;
- [ ] avaliar métricas adicionais apenas depois de recolher dados reais suficientes;
- [ ] usar os dados reais para ajustar thresholds, sem assumir valores universais para todas as instalações.

### Upstream

- [x] manter referências explícitas a MeshCore, meshcore-ha, meshcore-ha-chat e meshcore_py;
- [x] baseline versionado dos commits upstream já revistos;
- [x] verificação automática semanal e manual de novos commits upstream;
- [x] abrir/atualizar uma issue quando existir trabalho upstream por rever;
- [ ] rever mudanças upstream seletivamente e portar apenas o que é relevante para HiveFW;
- [ ] atualizar o baseline depois de cada revisão, mesmo quando a decisão for não importar uma alteração.

Ver [docs/upstream-sync.md](docs/upstream-sync.md).

## Princípio de manutenção

O HiveFW não pretende voltar a transportar indiscriminadamente todos os targets
e ficheiros dos projetos upstream. Atualizações upstream devem ser revistas,
adaptadas ao V3/T114 e validadas antes de entrar no `main`.
