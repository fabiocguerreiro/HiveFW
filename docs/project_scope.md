# Vertentes do projeto HiveFW

Esta nomenclatura é canónica para documentação, issues, commits e trabalho futuro no HiveFW.

## Firmware

**Firmware** é o software que é compilado e instalado no Rádio Companion.

Inclui o core MeshCore/HiveFW, Companion + Repeater, drivers, UI do dispositivo, configuração RF e os targets suportados, nomeadamente Heltec V3 e Heltec T114.

No repositório principal encontra-se sobretudo em `src/`, `arch/`, `boards/`, `variants/` e `examples/companion_radio/`.

## Integração

**Integração** significa sempre a integração HiveFW para **Home Assistant e o respetivo frontend HiveFW**.

Inclui o backend Home Assistant em `custom_components/hivefw_integration/` e o código-fonte do painel em `frontend/`. Alterações pedidas à "Integração" não significam alterações à App Android.

Firmware e Integração vivem no repositório principal `fabiocguerreiro/HiveFW` e partilham atualmente a mesma versão/release.

## App

**App** é a aplicação HiveFW para Android/Flutter.

O código canónico vive em `app/` dentro de `fabiocguerreiro/HiveFW`. A migração para o monorepo foi feita a partir de `fabiocguerreiro/HiveFW-app` no snapshot `f83f3f34aa1616d2f4e67f11aa7ce5d5f2322746`; o repositório antigo permanece apenas como histórico/rollback.

A App partilha agora o mesmo repositório, revisão de código e contexto de desenvolvimento das outras duas vertentes. Mantém, no entanto, o seu ciclo de build/release através de tags `app-v*`, separado da versão canónica `VERSION` usada por Firmware + Integração.

## Regra de interpretação

Quando uma tarefa mencionar apenas:

- **Firmware** → trabalhar no software do Rádio Companion;
- **Integração** → trabalhar no Home Assistant e/ou no frontend HiveFW do Home Assistant;
- **App** → trabalhar na aplicação Android HiveFW.

Se uma alteração atravessar mais do que uma vertente, isso deve ser indicado explicitamente.
