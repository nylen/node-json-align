#!/bin/sh

cd "$(dirname "$0")"

bin="../../bin/json-align.js"
pkg="../../package.json"

$bin $pkg         > 4s-package.json
$bin $pkg -s 2    > 2s-package.json
$bin $pkg -a      > 4s-all-package.json
$bin $pkg -s 2 -a > 2s-all-package.json
$bin $pkg -t      > t-package.json
$bin $pkg -t -a   > t-all-package.json

node -e "process.stdout.write(JSON.stringify(JSON.parse(require('fs').readFileSync('$pkg'))));" \
    > min-package.json
