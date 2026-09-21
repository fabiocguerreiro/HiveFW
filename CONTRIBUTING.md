# Contributing to HiveFW

Obrigado pelo interesse em contribuir para o HiveFW.

## Âmbito do projeto

HiveFW é um projeto unificado com:

- firmware Companion + Repeater;
- Heltec V3 por Wi-Fi/TCP;
- Heltec T114 por BLE;
- integração Home Assistant `hivefw_integration`.

O projeto suporta oficialmente apenas V3 e T114. Não adiciones variantes de hardware upstream apenas para manter paridade com MeshCore.

## Novo hardware

Suporte para um novo equipamento deve ser proposto de forma explícita e incluir:

1. configuração importada da versão atual do MeshCore upstream;
2. adaptação mínima ao HiveFW;
3. build CI dedicado;
4. validação em hardware real;
5. documentação;
6. atualização da matriz de hardware suportado.

## Pull requests

- uma alteração funcional por PR sempre que possível;
- mensagens de commit descritivas;
- atualizar documentação quando o comportamento público muda;
- firmware deve compilar nos dois alvos suportados;
- alterações da integração devem passar frontend, backend, Hassfest e HACS validation;
- `VERSION` e o manifest da integração devem permanecer sincronizados.

## Upstreams

O HiveFW acompanha:

- `meshcore-dev/MeshCore`;
- `meshcore-dev/meshcore-ha`;
- `mwolter805/meshcore-ha-chat`.

Alterações upstream devem ser revistas e adaptadas, não fundidas cegamente no `main`.

## Estilo

Para C++ segue `.clang-format`. Mantém consistência com o código existente e evita alterações de formatação sem relação com a funcionalidade.
