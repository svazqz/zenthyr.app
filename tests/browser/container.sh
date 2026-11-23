#!/bin/sh
set -eu

workdir=$(mktemp -d)
trap 'rm -rf "$workdir"' EXIT
tar -C /src --exclude=./.git --exclude=node_modules --exclude=./dist --exclude=./.astro \
  --exclude=./.env --exclude=./.env.local -cf - . | tar -C "$workdir" -xf -
cd "$workdir"

npm ci
export BASE_PATH=/coverage-site
npm run build
npm ci --prefix tests/browser --no-audit --no-fund
tests/browser/node_modules/.bin/playwright test --config tests/browser/playwright.config.mjs
