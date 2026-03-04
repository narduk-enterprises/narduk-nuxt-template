#!/bin/bash
# Fleet quality scan — runs quality on all local fleet app clones in parallel
# Usage: pnpm quality:fleet [--fix] [--no-pull] [--filter=NAME]


set -o pipefail

FLEET_DIR="${FLEET_DIR:-/Users/narduk/new-code/template-apps}"
RESULTS_DIR="/tmp/fleet-quality-results"
mkdir -p "$RESULTS_DIR"

# Flags
DO_FIX=false
DO_PULL=true
FILTER=""

for arg in "$@"; do
  case $arg in
    --fix) DO_FIX=true ;;
    --no-pull) DO_PULL=false ;;
    --filter=*) FILTER="${arg#*=}" ;;
  esac
done

# Auto-discover fleet apps
REPOS=()
for d in "$FLEET_DIR"/*/; do
  [ -d "$d" ] || continue
  repo=$(basename "$d")
  if [[ -n "$FILTER" && "$repo" != "$FILTER" ]]; then
    continue
  fi
  
  if [ -f "$d/apps/web/package.json" ] || [ -f "$d/package.json" ]; then
    REPOS+=("$repo")
  fi
done

if [ ${#REPOS[@]} -eq 0 ]; then
  echo "No fleet apps found in $FLEET_DIR"
  exit 1
fi

echo "🚀 Running quality on ${#REPOS[@]} fleet apps..."
[ "$DO_FIX" = true ] && echo "✨ Auto-fix enabled (--fix)"
[ "$DO_PULL" = false ] && echo "⏸️  Skipping git pull (--no-pull)"

run_quality() {
  local repo=$1
  local result_file="$RESULTS_DIR/$repo.txt"
  local app_path="$FLEET_DIR/$repo"
  
  echo "⏳ Starting: $repo"
  
  if [ ! -d "$app_path" ]; then
    echo "FAIL | $repo | Directory missing" > "$result_file"
    return
  fi

  cd "$app_path"

  # Smart Pull
  if [ "$DO_PULL" = true ]; then
    if [[ -z $(git status --porcelain) ]]; then
      git pull --rebase origin main 2>/dev/null >/dev/null || true
    else
      echo "⚠️  $repo is dirty, skipping git pull"
    fi
  fi

  # Build eslint plugins if they exist
  if grep -q "build:plugins" package.json 2>/dev/null; then
    pnpm run build:plugins 2>&1 >/dev/null || true
  fi

  if [ -d "apps/web" ]; then
    cd apps/web
  fi

  # Auto-fix lint issues first if requested
  if [ "$DO_FIX" = true ]; then
    pnpm run lint --fix 2>&1 >/dev/null || true
  fi

  # Run quality (lint + typecheck) to capture remaining issues
  OUTPUT=$(pnpm run quality 2>&1)
  EXIT_CODE=$?

  # Extract relevant lines (errors/warnings/TS errors)
  DETAILS=$(echo "$OUTPUT" | grep -Ei "error |warning |TS[0-9]+:" | grep -vE "node_modules|max-warnings" | head -n 8)

  if [ $EXIT_CODE -eq 0 ]; then
    WARNS=$(echo "$OUTPUT" | grep -i "warning" | grep -vE "max-warnings" | wc -l | tr -d '[:space:]')
    if [[ -n "$WARNS" && "$WARNS" -ne 0 ]]; then
      echo "FAIL | $repo | $WARNS warnings" > "$result_file"
      echo "$DETAILS" >> "$result_file"
      echo "⚠️  Warnings: $repo ($WARNS warnings)"
    else
      echo "PASS | $repo | 0" > "$result_file"
      echo "✅ Passed: $repo"
    fi
  else
    echo "FAIL | $repo | Error" > "$result_file"
    echo "$DETAILS" >> "$result_file"
    echo "❌ Failed: $repo"
  fi
}

# Run all in parallel (up to 8 at a time)
pids=()
for repo in "${REPOS[@]}"; do
  run_quality "$repo" &
  pids+=($!)
  if [ ${#pids[@]} -ge 8 ]; then
    wait "${pids[0]}"
    pids=("${pids[@]:1}")
  fi
done
for pid in "${pids[@]}"; do wait "$pid"; done

# Summary table
echo ""
echo "════════════════════════════════════════════════════════════════════════"
echo "  FLEET QUALITY RESULTS"
echo "════════════════════════════════════════════════════════════════════════"
PASS=0; FAIL=0
for repo in "${REPOS[@]}"; do
  file="$RESULTS_DIR/$repo.txt"
  if [ -f "$file" ]; then
    line=$(head -n 1 "$file")
    status_part="${line#*| $repo | }"
    if [[ "$line" == PASS* ]]; then
      status_icon="✅"
      PASS=$((PASS + 1))
    else
      status_icon="❌"
      FAIL=$((FAIL + 1))
    fi
    printf "  %s %-35s | %s\n" "$status_icon" "$repo" "$status_part"
  else
    printf "  ❌ %-35s | ERROR: No result\n" "$repo"
    FAIL=$((FAIL + 1))
  fi
done
echo "════════════════════════════════════════════════════════════════════════"
echo ""
echo "✅ Passed: $PASS / ${#REPOS[@]}"
echo "❌ Failed: $FAIL / ${#REPOS[@]}"

if [ $FAIL -gt 0 ]; then
  echo ""
  echo "Failure details:"
  for repo in "${REPOS[@]}"; do
    file="$RESULTS_DIR/$repo.txt"
    if grep -q "^FAIL" "$file" 2>/dev/null; then
      echo ""
      echo "--- $repo ---"
      cat "$file" | tail -n +2
    fi
  done
  exit 1
fi
