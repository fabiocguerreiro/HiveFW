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

**App** é a futura aplicação HiveFW para Android.

Atualmente é desenvolvida isoladamente no repositório `fabiocguerreiro/HiveFW-app`. O seu desenvolvimento e releases são independentes do Firmware e da Integração enquanto permanecer nesse repositório.

Está previsto que, quando estiver suficientemente madura, a App possa ser integrada no repositório principal HiveFW. Até essa migração acontecer, alterações à App devem permanecer no seu repositório próprio e não devem ser confundidas com alterações à Integração Home Assistant.

## Regra de interpretação

Quando uma tarefa mencionar apenas:

- **Firmware** → trabalhar no software do Rádio Companion;
- **Integração** → trabalhar no Home Assistant e/ou no frontend HiveFW do Home Assistant;
- **App** → trabalhar na aplicação Android HiveFW.

Se uma alteração atravessar mais do que uma vertente, isso deve ser indicado explicitamente.
