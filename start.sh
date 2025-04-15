#!/bin/sh

languages="es en"

echo "Generating config.json for each language..."

for lang in $languages; do
  config_path="/usr/share/nginx/html/$lang/config/config.json"

  mkdir -p $(dirname $config_path)

  cat <<EOF > $config_path
{
  "apiUrl": "${API_URL:-https://default-api.com}"
}
EOF

  echo "Generated: $config_path"
  cat $config_path
done

echo "All config.json files have been generated."

echo "Starting Nginx..."
nginx -g "daemon off;"
