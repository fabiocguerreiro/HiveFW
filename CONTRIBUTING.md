# Contributing to HiveFW

Obrigado pelo interesse em contribuir para o HiveFW.

HiveFW é um projeto unificado: firmware, integração Home Assistant e frontend
fazem parte do mesmo produto e partilham a mesma linha de versões.

## Âmbito suportado

Hardware oficialmente suportado:

- **Heltec WiFi LoRa 32 V3** — Companion por Wi-Fi/TCP, Repeater opcional e Web OTA;
- **Heltec T114** — Companion por BLE, Repeater opcional e BLE DFU/UF2.

Não mantemos no repositório variantes de hardware apenas para acompanhar a
lista completa de boards do MeshCore upstream. Isso evita anunciar
compatibilidade que não testamos.

## Adicionar novo hardware

Um novo equipamento deve entrar como uma alteração deliberada. A proposta deve
incluir:

1. configuração atual importada do MeshCore upstream;
2. adaptação mínima ao HiveFW;
3. um ambiente PlatformIO explícito;
4. build CI dedicado;
5. validação em hardware real;
6. documentação;
7. atualização de `docs/supported_hardware.md`.

Até existir validação real, o novo equipamento não deve ser apresentado como
oficialmente suportado.

## Pull requests

Mantém as alterações pequenas e focadas sempre que possível.

Antes de abrir um PR:

- firmware deve compilar para os dois alvos suportados;
- os unit tests devem passar;
- alterações Home Assistant devem passar backend, frontend, Hassfest e HACS validation;
- `VERSION` e `custom_components/hivefw_integration/manifest.json` devem permanecer sincronizados;
- alterações de comportamento público devem atualizar documentação;
- não introduzas novamente ficheiros de boards/examples upstream que não sejam utilizados.

## Upstreams

HiveFW acompanha três fontes principais:

- `meshcore-dev/MeshCore`;
- `meshcore-dev/meshcore-ha`;
- `mwolter805/meshcore-ha-chat`.

Alterações upstream devem ser revistas e adaptadas ao HiveFW. Evita merges
cegos de árvores completas porque o projeto mantém apenas o hardware e as
funcionalidades que suporta.

## Licenciamento

Contribuições novas para HiveFW são aceites sob a licença MIT do projeto,
indicada em `LICENSE`.

Ao portar código de um upstream ou de outro projeto:

- confirma que a licença é compatível;
- preserva o copyright e os avisos exigidos;
- atualiza `THIRD_PARTY_NOTICES.md` quando necessário;
- não substituas autoria upstream por autoria HiveFW.

## Segurança

Não abras uma Issue pública para vulnerabilidades. Segue `SECURITY.md` e usa
o Private vulnerability reporting do GitHub.

## Estilo

Para C++ segue `.clang-format`. Mantém o estilo existente em Python e
TypeScript e evita alterações de formatação sem relação com a funcionalidade.
