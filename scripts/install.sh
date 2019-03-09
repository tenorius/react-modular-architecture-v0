#!/bin/bash
npm config set ca ""
npm set progress=false
npm config set loglevel error

set -x


if [[ $(npm -v) == 5* ]]; then
 echo "################################################################"
 echo "npm 5+ detected... adding --no-save flag to npm install"
 NO_SAVE="--no-save"
fi

echo "################################################################"
echo ">> Installing node modules"
npm install