
#!/bin/sh
for file in public/kore*-config.js;
do
  if [ ! -f $file.tmpl.js ]; then
    cp $file $file.tmpl.js
  fi
  envsubst '$API_URL' < $file.tmpl.js > $file
done
echo "Replace ENV Successfully!"