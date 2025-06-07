#!/bin/sh

languages="es en"

USE_API_VALUE="${USE_API:-false}"
API_URL_VALUE="${API_URL:-https://default-api.com/api/}"

echo "Generating config.json for each language..."
echo "Configuration to be applied:"
echo "  - useAPI: ${USE_API_VALUE}"
echo "  - apiUrl: ${API_URL_VALUE}"
echo "---"

for lang in $languages; do
  config_path="/usr/share/nginx/html/$lang/config/config.json"

  mkdir -p $(dirname $config_path)

  cat <<EOF > $config_path
{
  "useAPI": ${USE_API_VALUE},
  "apiUrl": "${API_URL_VALUE}"
}
EOF

  echo "Generated: $config_path"
  cat $config_path
done

echo "All config.json files have been generated."

echo "Starting Nginx..."
nginx -g "daemon off;"
