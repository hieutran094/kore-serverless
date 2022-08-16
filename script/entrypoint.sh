#!/bin/sh
cp public/kore-config.js public/kore-config.tmpl.js
envsubst '$API_URL' < public/kore-config.tmpl.js > public/kore-config.js