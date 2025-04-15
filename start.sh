#!/bin/sh

echo "Loading config.json..."
cat <<EOF > /usr/share/nginx/html/assets/config/config.json
{
  "apiUrl": "${API_URL:-https://default-api.com}"
}
EOF

echo "Loaded config.json:"
cat /usr/share/nginx/html/assets/config.json

nginx -g "daemon off;"
