/**
 * Validate that all fleet apps have required Doppler secrets (e.g. SITE_URL).
 * Run from the template repo so we catch missing config before check:reach or deploy.
 *
 * Usage:
 *   pnpm run check:fleet-doppler
 *
 * This runs under `doppler run`, so the template project's secrets are available.
 * For fleet-wide read access, set FLEET_DOPPLER_TOKEN in the template's Doppler
 * project (prd) to a service token with read access to all fleet projects; the
 * script uses it when present for doppler secrets calls.
 */

import { execSync } from 'node:child_process'

// Use fleet-wide token from Doppler context when available (set in template project)
if (process.env.FLEET_DOPPLER_TOKEN) {
  process.env.DOPPLER_TOKEN = process.env.FLEET_DOPPLER_TOKEN
}

const FLEET_PROJECTS = [
  'ai-media-gen',
  'austin-texas-net',
  'circuit-breaker-online',
  'clawdle',
  'control-plane',
  'drift-map',
  'enigma-box',
  'flashcard-pro',
  'imessage-dictionary',
  'nagolnagemluapleira',
  'neon-sewer-raid',
  'ogpreview-app',
  'old-austin-grouch',
  'papa-everetts-pizza',
  'sailing-passage-map',
  'tiny-invoice',
  'video-grab',
]

/** Secrets that every app MUST have to deploy and function. */
const REQUIRED_SECRETS = [
  'SITE_URL',
  'CLOUDFLARE_API_TOKEN',
  'CLOUDFLARE_ACCOUNT_ID',
  'POSTHOG_PUBLIC_KEY',
] as const

/** Secrets that are strongly recommended for full analytics/SEO and cron. */
const RECOMMENDED_SECRETS = [
  'GA_MEASUREMENT_ID',
  'GSC_SERVICE_ACCOUNT_JSON',
  'INDEXNOW_KEY',
  'GSC_USER_EMAIL',
  'GA_ACCOUNT_ID',
  'POSTHOG_HOST',
  'POSTHOG_PROJECT_ID',
  'CRON_SECRET',
] as const

function isDopplerAvailable(): boolean {
  try {
    execSync('doppler --version', { encoding: 'utf-8', stdio: 'pipe' })
    return true
  } catch {
    return false
  }
}

function getSecretNames(project: string, config: string): Set<string> | null {
  try {
    const out = execSync(
      `doppler secrets --project "${project}" --config ${config} --only-names --plain`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] },
    )
    return new Set(out.trim().split('\n').filter(Boolean))
  } catch {
    return null
  }
}

function main() {
  if (!isDopplerAvailable()) {
    console.error('❌ Doppler CLI not available. Install and log in: https://docs.doppler.com/docs/install-cli')
    process.exit(1)
  }

  console.log('')
  console.log('Fleet Doppler Validation')
  console.log('════════════════════════════════════════════════════')
  let failed = 0
  let warned = 0
  let noAccess = 0
  for (const project of FLEET_PROJECTS) {
    const names = getSecretNames(project, 'prd')
    if (names === null) {
      console.log(`  ⚠️ ${project.padEnd(28)} unable to read (no Doppler access)`)
      noAccess++
      continue
    }
    const missingRequired = REQUIRED_SECRETS.filter((s) => !names.has(s))
    const missingRecommended = RECOMMENDED_SECRETS.filter((s) => !names.has(s))

    if (missingRequired.length > 0) {
      console.log(`  ❌ ${project.padEnd(28)} MISSING: ${missingRequired.join(', ')}`)
      failed++
    } else if (missingRecommended.length > 0) {
      console.log(`  🟠 ${project.padEnd(28)} optional: ${missingRecommended.join(', ')}`)
      warned++
    } else {
      console.log(`  ✅ ${project}`)
    }
  }
  console.log('════════════════════════════════════════════════════')
  if (noAccess > 0) {
    console.error(`\n⚠️ ${noAccess} project(s) could not be read. Use a Doppler token with access to all fleet projects.`)
  }
  if (failed > 0) {
    console.error(`\n❌ ${failed} project(s) missing REQUIRED Doppler secrets (prd).`)
    console.error('   Fix: doppler secrets set <KEY>="<value>" --project <name> --config prd')
    process.exit(1)
  }
  if (warned > 0) {
    console.log(`\n🟠 ${warned} project(s) missing recommended secrets. Run setup-analytics.ts to fill gaps.`)
  }
  if (failed === 0 && noAccess === 0) {
    console.log('\n✅ All fleet projects have required secrets.')
  }
  console.log('')
}

main()
