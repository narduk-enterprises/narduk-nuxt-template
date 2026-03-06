#!/bin/bash

APPS_DIR="$HOME/new-code/template-apps"
TEMPLATE_DIR="$HOME/new-code/narduk-nuxt-template"
FAILED_APPS=""

for app_path in "$APPS_DIR"/*; do
  if [ -d "$app_path" ]; then
    app_name=$(basename "$app_path")
    echo "=========================================="
    echo "🔄 Syncing $app_name"
    echo "=========================================="
    
    cd "$TEMPLATE_DIR"
    npx tsx tools/sync-template.ts "$app_path"
    cp tools/update-layer.ts "$app_path/tools/update-layer.ts"
    
    cd "$app_path"
    if ! npx tsx tools/update-layer.ts; then
      echo "❌ Failed to update $app_name"
      FAILED_APPS="$FAILED_APPS $app_name"
    fi
  fi
done

if [ -n "$FAILED_APPS" ]; then
  echo "=========================================="
  echo "❌ The following apps failed to update completely:"
  echo "$FAILED_APPS"
  exit 1
else
  echo "=========================================="
  echo "✅ All apps updated successfully."
fi
