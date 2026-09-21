# Migração para o repositório unificado HiveFW

O firmware e a integração Home Assistant passaram a viver no mesmo repositório:

```text
https://github.com/fabiocguerreiro/HiveFW
```

Os repositórios antigos deixam de ser a origem de desenvolvimento:

```text
fabiocguerreiro/HiveFW-Companion-Repeater
fabiocguerreiro/HiveFW-ha-integration
```

## Home Assistant / HACS

O domínio da integração não mudou:

```text
hivefw_integration
```

Por isso a migração do repositório HACS não implica remover a Config Entry do HiveFW em Home Assistant.

Procedimento recomendado:

1. abrir HACS;
2. remover o repositório personalizado antigo `HiveFW-ha-integration`;
3. adicionar `https://github.com/fabiocguerreiro/HiveFW` como **Integration**;
4. instalar/atualizar HiveFW a partir do novo repositório;
5. reiniciar o Home Assistant se o HACS o solicitar;
6. manter a Config Entry existente em **Definições → Dispositivos e Serviços → HiveFW**.

Não remover a integração/configuração do Home Assistant apenas para trocar a origem HACS.

## Firmware

O gestor OTA da integração procura Releases em:

```text
fabiocguerreiro/HiveFW
```

A primeira linha de versões unificada é `1.12.0`.

Até ser publicada uma tag/release unificada, não existe uma Release 1.12.0 apenas por causa do merge.

## Desenvolvimento local

Novo clone:

```bash
git clone https://github.com/fabiocguerreiro/HiveFW.git
cd HiveFW
```

Upstreams opcionais:

```bash
git remote add upstream-meshcore https://github.com/meshcore-dev/MeshCore.git
git remote add upstream-meshcore-ha https://github.com/meshcore-dev/meshcore-ha.git
git remote add upstream-meshcore-ha-chat https://github.com/mwolter805/meshcore-ha-chat.git
git fetch --all --prune
```
