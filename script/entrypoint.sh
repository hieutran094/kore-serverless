#!/bin/sh
cp public/kore-config.js public/kore-config.tmpl.js
envsubst '$API_URL' < public/kore-config.tmpl.js > public/kore-config.js
cp public/kore-widgets-config.js public/kore-widgets-config.tmpl.js
envsubst '$API_URL' < public/kore-widgets-config.tmpl.js > kore-widgets-config.js