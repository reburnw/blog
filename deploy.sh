#!/usr/bin/env bash
set -euo pipefail

npm ci
npm run build
rsync -a --delete dist/ /var/www/tmphome/
chmod 755 -R /var/www/tmphome/
