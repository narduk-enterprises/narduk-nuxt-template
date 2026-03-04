#!/bin/bash
# Fleet quality scan — runs quality on all local fleet app clones in parallel
# Usage: pnpm quality:fleet (from monorepo root)
set -o pipefail

FLEET_DIR="${FLEET_DIR:-/Users/narduk/new-code/template-apps}"
RESULTS_DIR="/tmp/fleet-quality-results"
mkdir -p "$RESULTS_DIR"

# Auto-discover fleet apps (directories in FLEET_DIR with apps/web/package.json)
REPOS=()
for d in "$FLEET_DIR"/*/; do
  repo=$(basename "$d")
  if [ -f "$d/apps/web/package.json" ]; then
    REPOS+=("$repo")
  fi
done

if [ ${#REPOS[@]} -eq 0 ]; then
  echo "No fleet apps found in $FLEET_DIR"
  exit 1
fi

echo "Running quality on ${#REPOS[@]} fleet apps..."

run_quality() {
  local repo=$1
  local result_file="$RESULTS_DIR/$repo.txt"
  cd "$FLEET_DIR/$repo"

  # Pull latest
  git pull --rebase origin main 2>/dev/null >/dev/null

  # Build eslint plugins
  pnpm run build:plugins 2>&1 >/dev/null

  # Run quality on apps/web
  cd apps/web
  OUTPUT=$(pnpm run quality 2>&1)
  EXIT_CODE=$?

  if [ $EXIT_CODE -eq 0 ]; then
    WARNS=$(echo "$OUTPUT" | grep -ci "warning" | tr -d '[:space:]' || echo 0)
    if [[ -n "$WARNS" && "$WARNS" -ne 0 ]]; then
      ERRS=$(echo "$OUTPUT" | grep "warning " | head -5)
      echo "FAIL | $repo | $WARNS warnings" > "$result_file"
      echo "$ERRS" >> "$result_file"
    else
      echo "PASS | $repo | 0" > "$result_file"
    fi
  else
    ERRS=$(echo "$OUTPUT" | grep "error " | grep -v "node_modules" | head -5)
    echo "FAIL | $repo" > "$result_file"
    echo "$ERRS" >> "$result_file"
  fi
}

# Run all in parallel (up to 6 at a time)
pids=()
for repo in "${REPOS[@]}"; do
  run_quality "$repo" &
  pids+=($!)
  if [ ${#pids[@]} -ge 6 ]; then
    wait "${pids[0]}"
    pids=("${pids[@]:1}")
  fi
done
for pid in "${pids[@]}"; do wait "$pid"; done

# Summary
echo ""
echo "═══════════════════════════════════════"
echo "  FLEET QUALITY RESULTS"
echo "═══════════════════════════════════════"
PASS=0; FAIL=0
for repo in "${REPOS[@]}"; do
  result=$(head -1 "$RESULTS_DIR/$repo.txt" 2>/dev/null || echo "ERROR | $repo")
  echo "  $result"
  echo "$result" | grep -q "^PASS" && PASS=$((PASS+1)) || FAIL=$((FAIL+1))
done
echo ""
echo "✅ Passed: $PASS / ${#REPOS[@]}"
echo "❌ Failed: $FAIL / ${#REPOS[@]}"

if [ $FAIL -gt 0 ]; then
  echo ""
  echo "Failure details:"
  for repo in "${REPOS[@]}"; do
    if grep -q "^FAIL" "$RESULTS_DIR/$repo.txt" 2>/dev/null; then
      echo ""; echo "--- $repo ---"; cat "$RESULTS_DIR/$repo.txt"
    fi
  done
  exit 1
fi
