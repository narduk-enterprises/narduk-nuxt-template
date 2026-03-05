#!/usr/bin/env npx tsx
/**
 * Fleet Layer Promotion Cleanup
 *
 * Removes local auth, D1 cache, and shadowed SEO composables from fleet apps
 * that now get these from the shared layer.
 *
 * Usage: npx tsx tools/cleanup-fleet-local-copies.ts [--dry-run]
 */

import { existsSync, unlinkSync, readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, basename } from 'node:path'

const FLEET_DIR = '/Users/narduk/new-code/template-apps'
const DRY_RUN = process.argv.includes('--dry-run')

// ─── Auth files to remove ───────────────────────────────────────
// Only from apps that implement the custom D1 session pattern
const AUTH_APPS = [
  'tiny-invoice',
  'flashcard-pro',
  'enigma-box',
  'papa-everetts-pizza',
  'ai-media-gen',
]

const AUTH_FILES_TO_REMOVE = [
  'apps/web/server/utils/password.ts',
  'apps/web/server/utils/session.ts',
  'apps/web/server/utils/requireAuth.ts',
]

// ─── D1 Cache files to remove ───────────────────────────────────
const D1_CACHE_CLEANUP = [
  { app: 'tide-check', file: 'apps/web/server/utils/apiCache.ts' },
  { app: 'control-plane', file: 'apps/web/server/utils/d1-cache.ts' },
]

// ─── Shadowed SEO composables to remove ─────────────────────────
// These shadow the layer's useSeo/useSchemaOrg with local copies
const SHADOWED_SEO = [
  { app: 'imessage-dictionary', files: ['apps/web/app/composables/useSchemaOrg.ts', 'apps/web/app/composables/useSeo.ts'] },
  { app: 'nagolnagemluapleira', files: ['apps/web/app/composables/useSchemaOrg.ts', 'apps/web/app/composables/useSeo.ts'] },
  { app: 'old-austin-grouch', files: ['apps/web/app/composables/useSchemaOrg.ts', 'apps/web/app/composables/useSeo.ts'] },
  { app: 'ogpreview-app', files: ['apps/web/app/composables/useSchemaOrg.ts', 'apps/web/app/composables/useSeo.ts'] },
]

let totalRemoved = 0
let totalSkipped = 0

function removeFile(appName: string, relPath: string): void {
  const fullPath = join(FLEET_DIR, appName, relPath)
  if (!existsSync(fullPath)) {
    console.log(`  SKIP  ${relPath} (not found)`)
    totalSkipped++
    return
  }
  if (DRY_RUN) {
    console.log(`  WOULD REMOVE  ${relPath}`)
  } else {
    unlinkSync(fullPath)
    console.log(`  REMOVED  ${relPath}`)
  }
  totalRemoved++
}

console.log(`\nFleet Layer Promotion Cleanup ${DRY_RUN ? '[DRY RUN]' : '[LIVE]'}`)
console.log('═'.repeat(72))

// ─── Auth cleanup ───────────────────────────────────────────────
console.log('\n🔑 Auth System Cleanup')
console.log('─'.repeat(72))
for (const app of AUTH_APPS) {
  console.log(`\n  ${app}:`)
  for (const file of AUTH_FILES_TO_REMOVE) {
    removeFile(app, file)
  }
}

// ─── D1 Cache cleanup ──────────────────────────────────────────
console.log('\n\n💾 D1 Cache Cleanup')
console.log('─'.repeat(72))
for (const { app, file } of D1_CACHE_CLEANUP) {
  console.log(`\n  ${app}:`)
  removeFile(app, file)
}

// ─── Shadowed SEO cleanup ──────────────────────────────────────
console.log('\n\n🔍 Shadowed SEO Composable Cleanup')
console.log('─'.repeat(72))
for (const { app, files } of SHADOWED_SEO) {
  console.log(`\n  ${app}:`)
  for (const file of files) {
    removeFile(app, file)
  }
}

// ─── Summary ────────────────────────────────────────────────────
console.log(`\n${'═'.repeat(72)}`)
console.log(`${DRY_RUN ? 'Would remove' : 'Removed'}: ${totalRemoved} files`)
console.log(`Skipped (not found): ${totalSkipped} files`)
if (DRY_RUN) {
  console.log('\nRe-run without --dry-run to apply changes.')
}
