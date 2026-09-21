# FAQ HiveFW

## Que hardware é suportado?

Atualmente:

- Heltec WiFi LoRa 32 V3;
- Heltec T114.

Outras configurações existentes no MeshCore upstream não significam compatibilidade HiveFW.

## Porque foram removidos os restantes boards do repositório?

Para manter o projeto coerente com o hardware realmente suportado e testado. Se um novo board for adicionado no futuro, a configuração atual pode ser importada do upstream MeshCore nessa altura.

## O HiveFW continua compatível com MeshCore?

Sim. HiveFW deriva de MeshCore e mantém o protocolo necessário para interoperar com a rede MeshCore.

## O Companion deixa de funcionar quando ativo Repeater?

Não. O Companion é o modo base. O Repeater é uma capacidade opcional adicionada ao mesmo firmware.

## Preciso de meshcore-ha em separado?

Não. A integração `hivefw_integration` inclui o motor necessário e comunica diretamente com o rádio.

## Como atualizo o Heltec V3?

Preferencialmente através do gestor OTA do Home Assistant. Também existe um pacote de recuperação USB nas Releases.

## Como atualizo o T114?

A build oficial produz BLE DFU `.zip` e `.uf2`.

## O Auto Advert envia vários anúncios por dia?

O comportamento HiveFW pretende originar no máximo um Auto Advert por período de 24 horas. Anúncios manuais são independentes.

## Abrir Vizinhos gera tráfego LoRa?

Não. A página consulta a tabela local de Repeaters realmente ouvidos a zero-hop pelo rádio.

## O Backup inclui chaves?

Sim. O backup completo inclui a private key quando o firmware permite exportação. O ficheiro deve ser tratado como uma credencial sensível.
