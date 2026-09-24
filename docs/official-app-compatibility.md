# HiveFW · Compatibilidade com a aplicação oficial MeshCore

O HiveFW mantém o protocolo Companion oficial como camada de compatibilidade, mas usa internamente um **Node Store persistente unificado**. Os limites compilados de contactos passam a representar a **cache operacional em RAM**, não a capacidade lógica da base de nós.

| Função | App MeshCore oficial | HiveFW / Home Assistant | Notas |
| --- | --- | --- | --- |
| Ligar por Companion BLE/TCP | Compatível | Compatível | Wire protocol original preservado. |
| Sincronizar contactos | Compatível | Compatível | `CMD_GET_CONTACTS` é servido pelo Node Store persistente. |
| Adicionar/editar contacto | Compatível | Compatível | Promove o registo existente para `added`; não cria uma segunda base. |
| Remover contacto | Compatível | Compatível | Limpa `added`, mantendo o nó como descoberto quando já foi observado. |
| Contactos além da cache RAM | Parcialmente transparente | Compatível | O firmware materializa por pubkey/hash em slots transitórios quando necessário. A app oficial continua a receber o campo histórico de capacidade da cache. |
| Nós descobertos | Push de adverts compatível | Vista completa | Todo advert válido atualiza o mesmo Node Store. |
| Favoritos/flags oficiais | Compatível | Compatível | `ContactInfo.flags` é mantido. |
| Mensagens diretas | Compatível | Compatível | Lookup faz fallback ao Node Store quando o nó não está na cache RAM. |
| Receção/desencriptação direta | Compatível | Compatível | Hash lookup faz fallback ao Node Store e materializa temporariamente o contacto. |
| Share / Export Contact | Compatível | Compatível | Formato oficial de advert/blob preservado. |
| Backup/restore de contactos | Compatível | Compatível | A enumeração usa os contactos `added` do Node Store. |
| Canais | Compatível até ao que a app conseguir apresentar | Compatível | HiveFW compila **100 canais**; o índice continua a ser um byte. |
| GET/SET_CHANNEL | Compatível | Compatível | O frame oficial de canal não foi alterado. |
| Migração de firmware anterior | Transparente | Transparente | `/contacts3` é importado para `/hivefw_nodes4` no primeiro boot. |

## Modelo de dados

Existe um único registo persistente por public key. O registo contém nome, tipo, flags, path, GPS, timestamps e o estado `added`.

- **Descoberto**: existe no Node Store porque foi ouvido.
- **Adicionado**: o mesmo registo tem o bit `added`.
- **Removido dos contactos**: limpa apenas `added`; a observação permanece.
- **Cache RAM**: contém apenas a working set necessária ao funcionamento imediato.

O ficheiro `/contacts3` continua a existir como espelho legado durante a transição, mas deixa de ser a fonte de verdade.

## Limites

O Node Store não tem um número máximo de registos definido em compile-time. A capacidade real é limitada pelo filesystem disponível. O firmware continua a usar uma cache RAM finita para não consumir memória proporcionalmente ao número total de nós.

O protocolo oficial possui um campo histórico de capacidade de contactos com apenas um byte e codificação em pares. Para não quebrar clientes existentes, o HiveFW continua a anunciar nesse campo a capacidade da cache. Esse valor **não representa a capacidade do Node Store**.

Os canais passam para **100 slots** nos alvos HiveFW atuais. Como o protocolo usa um índice de canal de um byte, esta alteração não muda o formato dos frames.
