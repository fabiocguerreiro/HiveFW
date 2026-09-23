# HiveFW — Roadmap

O HiveFW é um projeto unificado: firmware Companion + Repeater e integração
Home Assistant vivem no mesmo repositório, partilham a mesma linha de versão e
são publicados pela mesma linha de Releases.

## Estado atual — 1.14.6.1+

### Projeto / manutenção

- [x] firmware e Home Assistant no mesmo repositório;
- [x] Heltec V3 e Heltec T114 como alvos suportados;
- [x] integração Home Assistant standalone;
- [x] CI de firmware, frontend, backend, CodeQL e validação;
- [x] OTA V3 e BLE DFU/UF2 T114;
- [x] acompanhamento explícito de MeshCore, meshcore-ha, meshcore-ha-chat e meshcore_py;
- [x] baseline upstream versionado;
- [x] watcher semanal/manual de mudanças upstream;
- [ ] continuar a rever upstreams seletivamente e avançar o baseline após cada revisão.

Ver [docs/upstream-sync.md](docs/upstream-sync.md).

### Firmware Companion + Repeater

- [x] Companion como modo base com Repeater opcional;
- [x] Wi-Fi/TCP no V3 e BLE no T114;
- [x] Regions / Flood Scopes;
- [x] Flood Limits geral / unscoped / advert;
- [x] Loop Detect off / minimal / moderate / strict;
- [x] CAD, interference threshold, AGC reset e RX/Flood/Direct TX delays;
- [x] RX Boosted Gain persistente e aplicado ao SX126x;
- [x] Duty Cycle, Path Hash e Multi ACK;
- [x] expiração de pacotes TX antigos após 60 s com limpeza de dedup;
- [x] contador de TX expirados;
- [x] ACL persistente Repeater com roles Read Only / Read Write / Admin;
- [x] login Admin/Guest com passwords write-only;
- [x] GET_STATUS / TELEMETRY / NEIGHBOURS / ACCESS_LIST;
- [x] OWNER / REGIONS / CLOCK anónimos e remote CLI;
- [x] Owner Info persistente;
- [x] ADC multiplier persistente com 0 = calibração padrão da placa;
- [x] RegionMap local editável;
- [x] Discovery rate limiting;
- [x] tabela de vizinhos zero-hop acumulada;
- [x] observação passiva de canais;
- [x] sincronização RTC opcional por Timekeeper Mesh como fonte secundária;
- [x] APP/GPS com prioridade sobre a fonte Mesh;
- [x] curva LiPo interpolada para percentagem de bateria;
- [x] Smart Advert com persistência, slot determinístico e proteção at-most-once.

### Smart Advert atual

O Smart Advert HiveFW continua independente dos timers clássicos do
simple_repeater:

- [x] slot determinístico derivado da identidade/public key;
- [x] último Auto Advert realmente transmitido persistido;
- [x] nunca originar dois Smart Adverts com menos de 24 h entre si;
- [x] grace period de 5 min após ativação quando não houve advert confirmado nas últimas 24 h;
- [x] grace period persistente contra bypass por reboot;
- [x] advert de recuperação quando não existe envio confirmado há mais de 24 h;
- [x] realinhamento automático ao slot determinístico;
- [x] ETA do próximo Smart Advert exposto ao Companion/HA.

### Advertising oficial — análise concluída, implementação futura

O simple_repeater oficial mantém dois timers independentes:

- `advert.interval`: advert zero-hop, 0 = off, intervalo válido 60–240 minutos;
- `flood.advert.interval`: advert Flood, 0 = off, intervalo válido 3–168 horas;
- depois de um Flood advert, o oficial reinicia também o timer zero-hop para
  impedir que os dois anúncios ocorram colados.

Objetivo HiveFW: expor estes dois parâmetros e reproduzir o comportamento
oficial sem perder o Smart Advert nem as garantias já implementadas.

Plano aprovado para uma implementação futura:

1. manter três fontes de advert distintas:
   - **Local Advert periódico oficial** — zero-hop;
   - **Flood Advert periódico oficial** — Flood/Scope;
   - **Smart Advert HiveFW** — política determinística própria;
2. `advert.interval` e `flood.advert.interval` devem manter exatamente os
   ranges/unidades do configurador oficial e aceitar 0 = off;
3. um Flood advert periódico reinicia o timer zero-hop, igual ao oficial;
4. o Smart Advert não é convertido num terceiro intervalo configurável e não
   perde a sua persistência/at-most-once;
5. qualquer advert automático realmente originado deve atualizar um estado
   comum de “último advert automático” para permitir anti-colisão entre os
   três schedulers;
6. antes de transmitir, cada scheduler deve respeitar uma janela mínima de
   separação face a outro advert automático recente;
7. um Smart Advert que coincida com um Flood periódico deve ceder ao Flood e
   recalcular o seu próximo slot elegível, sem criar um segundo advert;
8. ações manuais **Local Advert** e **Flood Advert** continuam imediatas e não
   são tratadas como Smart Advert; tal como no simple_repeater oficial, não
   reiniciam os timers periódicos;
9. alterações a nome não influenciam o Smart Advert: o HiveFW usa identidade /
   public key para o slot;
10. a UI futura deve mostrar separadamente os três mecanismos e o próximo envio
    de cada um, evitando um único toggle ambíguo.

- [ ] implementar esta coexistência apenas numa fase dedicada, com testes de
  sequência temporal e sem alterar a lógica Smart Advert durante a atual fase
  de paridade/configuração.

### Home Assistant / UI

- [x] Estado/identidade/telemetria;
- [x] Chat & Canais;
- [x] Canais Observados 48H;
- [x] Nós em lista + mapa + atividade;
- [x] Vizinhos passivos e Discovery ativo;
- [x] Console integrado em Definições;
- [x] Regions & Scopes;
- [x] RX Log e observabilidade RF;
- [x] firmware OTA;
- [x] import/export de contactos;
- [x] exportação de contactos MeshCore;
- [x] configuração Repeater: Repeat, Multi ACK, Path Hash, Duty Cycle;
- [x] configuração Routing/Flood + Loop Detect;
- [x] configuração CAD/interference/AGC/delays;
- [x] botão de releitura real da configuração do rádio;
- [x] Owner Info local;
- [x] RX Boosted Gain local;
- [x] ADC multiplier local com explicação;
- [x] ACL completa com chave, role, alteração e remoção individual;
- [x] passwords Admin/Guest write-only e limpeza total da ACL;
- [x] Frequências Repeater permitidas read-only;
- [x] RTC Mesh opcional;
- [x] Backup/Restore Companion separado do Backup/Restore Repeater e renderizado
  nativamente em Definições, sem injeção DOM pelo wrapper;
- [x] Backup Repeater inclui Owner Info, RX Gain, ADC, Repeat, Path Hash,
  Multi ACK, Smart Advert, RTC Mesh, Duty Cycle, Routing/Flood, CAD/AGC/delays,
  RegionMap e ACL;
- [x] passwords Admin/Guest nunca são exportadas;
- [x] popup do mapa dos Nós com idade do último advert, `Criado localmente`,
  contraste corrigido e botão Fechar acessível em mobile;
- [ ] validar em hardware o novo Owner Info / RX Gain / ADC / ACL /
  Backup Repeater antes da próxima release.

### Backup & Restore

#### Companion

Formato compatível com o backup MeshCore:

- [x] nome;
- [x] identidade/public key + private key;
- [x] rádio;
- [x] posição;
- [x] auto-add;
- [x] canais;
- [x] contactos;
- [x] restore da identidade com verificação.

#### Repeater

Formato HiveFW separado e identificado:

- [x] modo Repeater;
- [x] Owner Info;
- [x] RX Boosted Gain;
- [x] ADC multiplier;
- [x] Path Hash;
- [x] Multi ACK;
- [x] Smart Advert ON/OFF;
- [x] RTC Mesh ON/OFF;
- [x] Duty Cycle;
- [x] Flood Limits + Loop Detect;
- [x] CAD / interference / AGC / delays;
- [x] RegionMap;
- [x] ACL completa;
- [x] estado Admin/Guest sem exportar os segredos;
- [x] restore mantém as passwords existentes;
- [x] verificação pós-restore das secções críticas.

## Frontend

A árvore nativa Lit é agora a fonte preferencial. O wrapper
`frontend/src/hivefw-panel.ts` continua apenas onde ainda fornece composição
ou funcionalidades que não têm equivalente nativo seguro.

- [x] fonte do wrapper migrada para TypeScript;
- [x] bundle único via Rollup;
- [x] Repeater Setup passou para a página nativa;
- [x] RTC Mesh passou para a página nativa;
- [x] leitura Repeater duplicada removida;
- [x] estado Repeater serializado no backend para evitar respostas cruzadas;
- [x] Backup & Restore migrado do wrapper para a página Lit nativa;
- [x] RX Boosted Gain e ADC multiplier integrados no cartão Radio nativo;
- [x] evitar novas extensões DOM pós-render quando existe componente Lit;
- [ ] migrar apenas blocos restantes quando houver equivalência funcional
  testada; não remover o wrapper de uma só vez enquanto ainda agrega funções
  sem destino nativo;
- [ ] remover o wrapper apenas quando a comparação funcional ficar 1:1.

A prioridade é estabilidade e leveza; uma remoção total prematura do wrapper
não é objetivo por si só.

## Validação em hardware

A utilização prolongada atual está estável e deixa de ser uma pendência geral:

- [x] V3 Wi-Fi/TCP prolongado;
- [x] T114 BLE prolongado;
- [x] BLE DFU / UF2;
- [x] reload / restart / reconnect repetidos;
- [x] ausência de ligações duplicadas;
- [x] Smart Advert durante utilização prolongada;
- [x] múltiplos vizinhos zero-hop;
- [x] CAD durante operação prolongada;
- [x] RF/Retransmissão e Acesso remoto carregam ao abrir a página;
- [ ] validar apenas as funcionalidades novas desta fase
  (Owner Info, RX Gain, ADC, ACL completa e Backup Repeater).

## Próximos passos

1. validar em hardware o lote atual de paridade Repeater;
2. corrigir eventuais regressões sem criar release intermédia desnecessária;
3. publicar a próxima release apenas quando o lote estiver validado;
4. numa fase separada, implementar o Advertising oficial + Smart Advert de
   acordo com o desenho documentado acima;
5. continuar o acompanhamento seletivo dos upstreams.

## Princípio de manutenção

O HiveFW não importa indiscriminadamente alterações upstream. Mudanças de
MeshCore, meshcore-ha, meshcore-ha-chat e meshcore_py devem ser revistas,
adaptadas ao V3/T114 e validadas antes de entrar no `main`.
