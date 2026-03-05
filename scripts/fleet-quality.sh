#!/bin/bash
# Fleet quality scan — runs quality on all local fleet app clones in parallel
# Usage: pnpm quality:fleet [--fix] [--no-pull] [--filter=NAME]


# Note: no set -e/pipefail here — run_quality handles errors manually

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
  set +e  # Allow non-zero exits — we capture exit codes manually
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

  # Run lint + typecheck directly from apps/web (not via turbo — its TUI swallows output when piped)
  if [ -d "apps/web" ]; then
    cd apps/web

    # Auto-fix lint issues first if requested
    if [ "$DO_FIX" = true ]; then
      pnpm run lint --fix 2>&1 >/dev/null || true
    fi

    LINT_OUT=$(pnpm run lint 2>&1); LINT_EXIT=$?
    TC_OUT=$(pnpm run typecheck 2>&1); TC_EXIT=$?
  else
    echo "FAIL | $repo | No apps/web directory" > "$result_file"
    echo "❌ Failed: $repo (no apps/web)"
    return
  fi

  COMBINED="$LINT_OUT"$'\n'"$TC_OUT"

  # Match real ESLint lines: "line:col  warning|error  message  rule-name"
  LINT_ISSUES=$(echo "$COMBINED" | grep -E '[0-9]+:[0-9]+\s+(warning|error)\s' | grep -vE 'node_modules|ELIFECYCLE|Command failed' || true)
  # Match TypeScript errors: "TS[0-9]+:"
  TS_ERRORS=$(echo "$COMBINED" | grep -E 'TS[0-9]+:' | grep -v 'node_modules' || true)
  DETAILS=$(printf '%s\n%s' "$LINT_ISSUES" "$TS_ERRORS" | grep -v '^$' | head -n 8)

  # Count issues
  if [ -z "$LINT_ISSUES" ]; then
    WARN_COUNT=0
    ERR_COUNT=0
  else
    WARN_COUNT=$(echo "$LINT_ISSUES" | grep -c 'warning' 2>/dev/null | tr -d '[:space:]')
    ERR_COUNT=$(echo "$LINT_ISSUES" | grep -c 'error' 2>/dev/null | tr -d '[:space:]')
  fi
  if [ -z "$TS_ERRORS" ]; then
    TS_COUNT=0
  else
    TS_COUNT=$(echo "$TS_ERRORS" | grep -c 'TS[0-9]' 2>/dev/null | tr -d '[:space:]')
  fi
  TOTAL_ISSUES=$((WARN_COUNT + ERR_COUNT + TS_COUNT))

  if [ "$TOTAL_ISSUES" -gt 0 ]; then
    if [ "$ERR_COUNT" -gt 0 ] || [ "$TS_COUNT" -gt 0 ]; then
      echo "FAIL | $repo | ${ERR_COUNT} errors, ${TS_COUNT} TS errors, ${WARN_COUNT} warnings" > "$result_file"
    else
      echo "FAIL | $repo | $WARN_COUNT warnings" > "$result_file"
    fi
    echo "$DETAILS" >> "$result_file"
    echo "❌ Failed: $repo"
  elif [ $LINT_EXIT -ne 0 ] || [ $TC_EXIT -ne 0 ]; then
    echo "FAIL | $repo | Exit code lint=$LINT_EXIT tc=$TC_EXIT" > "$result_file"
    echo "❌ Failed: $repo (exit lint=$LINT_EXIT tc=$TC_EXIT)"
  else
    echo "PASS | $repo | 0" > "$result_file"
    echo "✅ Passed: $repo"
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
