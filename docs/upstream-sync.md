# Acompanhamento dos upstreams

O HiveFW deriva de vários projetos do ecossistema MeshCore, mas não faz merge
automático de alterações upstream. O objetivo é manter a possibilidade de
acompanhar evolução relevante sem voltar a importar hardware, código ou
comportamentos que não pertencem ao âmbito do HiveFW.

## Upstreams acompanhados

- `meshcore-dev/MeshCore` — firmware base;
- `meshcore-dev/meshcore-ha` — engine e integração Home Assistant de referência;
- `mwolter805/meshcore-ha-chat` — referências de UI/chat;
- `meshcore-dev/meshcore_py` — SDK Python usado pela integração.

O último commit revisto de cada projeto fica em:

`.github/upstream-baseline.json`

## Verificação automática

O workflow `.github/workflows/upstream-watch.yml` corre semanalmente e também
pode ser executado manualmente em **Actions → Upstream Watch → Run workflow**.

A verificação:

1. lê o baseline versionado;
2. consulta o HEAD atual do branch upstream;
3. não altera o código HiveFW;
4. quando encontra diferenças, cria ou atualiza uma issue
   **Upstream updates available** com links de comparação.

Não existe merge, cherry-pick ou atualização automática.

## Rever uma atualização

Para cada upstream assinalado:

1. abrir o link de comparação produzido pelo workflow;
2. identificar alterações relevantes para V3, T114, Companion/Repeater,
   Home Assistant ou `meshcore_py`;
3. portar/adaptar apenas o necessário numa alteração isolada;
4. executar CI e, quando aplicável, validar em hardware;
5. atualizar `reviewed_sha` no baseline para o HEAD que foi revisto.

Atualizar o baseline significa **revisto**, não necessariamente **importado**.
Uma alteração pode ser rejeitada por não ser relevante ao HiveFW e o baseline
deve na mesma avançar para evitar voltar a sinalizar os mesmos commits.

## Remotes locais opcionais

Para uma revisão manual local:

```bash
git remote add upstream-meshcore https://github.com/meshcore-dev/MeshCore.git
git remote add upstream-meshcore-ha https://github.com/meshcore-dev/meshcore-ha.git
git remote add upstream-meshcore-ha-chat https://github.com/mwolter805/meshcore-ha-chat.git
git remote add upstream-meshcore-py https://github.com/meshcore-dev/meshcore_py.git

git fetch --all --prune
```

Esses remotes são apenas ferramentas de consulta. O `main` do HiveFW continua
a ser a linha canónica do projeto.
