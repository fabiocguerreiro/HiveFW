# Security Policy

## Supported versions

As correções de segurança são aplicadas à versão HiveFW mais recente. Não existe compromisso de backport para versões antigas.

## Reporting a vulnerability

Não publiques vulnerabilidades de segurança em Issues públicas.

Usa o **Private vulnerability reporting** no separador **Security** do repositório e inclui, quando possível:

- componente/ficheiro afetado;
- impacto;
- condições necessárias;
- reprodução mínima;
- versão HiveFW;
- hardware utilizado.

## Scope

Incluído no âmbito:

- processamento de pacotes rádio;
- autenticação, identidade e chaves;
- Companion protocol;
- portal Wi-Fi do V3;
- Web OTA;
- integração Home Assistant;
- WebSocket/API administrativa;
- backup/restore de identidade e configuração.

Fora do âmbito normal:

- jamming/interferência RF;
- conformidade regulamentar de frequência/potência;
- ataques que dependam exclusivamente de acesso físico já privilegiado;
- vulnerabilidades exclusivamente em dependências de terceiros, que devem também ser reportadas ao respetivo upstream.

O HiveFW utiliza componentes upstream. Quando a causa estiver num projeto upstream, a correção pode exigir coordenação com esse projeto.
