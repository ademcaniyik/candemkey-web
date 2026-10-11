# candemkey-web

Candemkey tanıtım sitesi ([candemkey.com](https://candemkey.com)): derlenmiş statik dosyalar (TR / EN / ES).

| Yol | Sayfa |
|---|---|
| `/tr/`, `/en/`, `/es/` | Tanıtım |
| `/<dil>/privacy/` | Gizlilik ve veriler (gizlilik politikası) |
| `/<dil>/kvkk/` | KVKK aydınlatma metni |
| `/<dil>/delete-account/` | Hesap silme (Google Play zorunluluğu) |

Bu depodaki dosyalar doğrudan canlıya gider: `noindex` yok, canonical/hreflang adresleri `https://candemkey.com`.

## Canlıya alma

Sunucuda (Oracle, `/var/www/candemkey.com`, nginx statik):

```sh
candemkey-web-update
```

Betik bu depodadır (`deploy/update.sh`); `/opt/candemkey-web`'i çekip `rsync` ile canlı dizine alır.
İlk kurulum: `sudo install -m 755 deploy/update.sh /usr/local/bin/candemkey-web-update`.

İletişim: info@candemkey.com
