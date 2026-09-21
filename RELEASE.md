# Releasing HiveFW

Firmware e integração Home Assistant partilham agora uma única versão.

## Fonte de versão

`VERSION` é a fonte canónica:

```text
V1.12.0
```

A integração tem de usar exatamente a mesma versão, sem o prefixo `V`:

```text
custom_components/hivefw_integration/manifest.json
1.12.0
```

O workflow `Version sync` bloqueia divergências.

## Publicação

Alterações no `main` podem compilar e validar artefactos, mas **não publicam uma GitHub Release**.

Uma Release só é publicada através de uma tag:

```text
vX.Y.Z
```

Exemplo:

```text
v1.12.0
```

A tag tem de corresponder ao conteúdo de `VERSION` e ao manifest da integração.

## Artefactos

A Release HiveFW contém firmware dos dois alvos principais.

### Heltec V3

- `Heltec_v3_companion_radio_wifi-<version>-<sha>.bin`
- SHA-256 da imagem OTA;
- pacote de recuperação USB;
- SHA-256 do pacote de recuperação.

O pacote de recuperação preserva a NVS em `0x9000`.

### Heltec T114

- `Heltec_t114_companion_radio_ble-<version>-<sha>.zip` — BLE DFU;
- SHA-256;
- `Heltec_t114_companion_radio_ble-<version>-<sha>.uf2`;
- SHA-256.

## Home Assistant / HACS

A mesma tag representa também a versão da integração Home Assistant. O repositório HACS é:

```text
https://github.com/fabiocguerreiro/HiveFW
```

Antes de criar a tag confirmar:

1. `VERSION` e `manifest.json` iguais;
2. Hassfest e HACS validation verdes;
3. frontend typecheck/build/test verde;
4. backend compile/test verde;
5. firmware V3 compila;
6. firmware T114 compila;
7. unit tests verdes;
8. OTA aponta para `fabiocguerreiro/HiveFW`;
9. documentação/changelog da versão revistos.

## Upstream

A criação de uma Release HiveFW é independente das versões de MeshCore, meshcore-ha e meshcore-ha-chat. Alterações upstream são primeiro revistas e adaptadas ao HiveFW.
