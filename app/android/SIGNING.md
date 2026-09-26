# HiveFW Android release signing

A App HiveFW é Android-only e usa uma única identidade de assinatura persistente.

- Application ID: `pt.hivefw.companion`
- Alias: `hivefw-release`
- Certificado: RSA 4096 / SHA-256
- SHA-256 do certificado: `DE:1C:4D:3A:F2:62:37:74:50:E9:29:2F:5F:25:AC:B3:2D:53:15:DC:D0:F4:1D:92:53:CF:DE:B7:FD:1C:A0:CC`

A chave privada **não é guardada em Git**. O backup offline da keystore deve ser preservado de forma segura. Os GitHub Actions recebem a mesma keystore através de Secrets:

- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_PASSWORD`
- `ANDROID_KEY_ALIAS`

Os workflows de release validam a impressão digital acima antes de criar o APK. Uma chave diferente é rejeitada para evitar produzir uma versão que não possa atualizar instalações existentes.

Nunca commitar `.jks`, `.keystore`, `key.properties` ou passwords.
