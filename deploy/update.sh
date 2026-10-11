#!/bin/bash
# Sunucuda çalışır: candemkey.com'u bu depodan (github.com/ademcaniyik/candemkey-web) canlıya alır.
# Depodaki dosyalar zaten canlıya hazır (indekslemeye açık, adresler https://candemkey.com); yama yapılmaz.
# Kurulum: sudo install -m 755 deploy/update.sh /usr/local/bin/candemkey-web-update
# Kullanım: candemkey-web-update   (sudo gerekmez; /var/www/candemkey.com ubuntu'nundur)
set -euo pipefail

REPO="https://github.com/ademcaniyik/candemkey-web.git"
SRC="/opt/candemkey-web"
DST="/var/www/candemkey.com"

if [ -d "$SRC/.git" ]; then
  git -C "$SRC" pull --ff-only --quiet
else
  git clone --quiet --depth 1 "$REPO" "$SRC"
fi

mkdir -p "$DST"
rsync -a --delete \
  --exclude '.git' --exclude '.nojekyll' --exclude 'deploy' --exclude 'README.md' \
  "$SRC/" "$DST/"

echo "Site güncellendi: $(git -C "$SRC" rev-parse --short HEAD)"
