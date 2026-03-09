import { defineConfig, devices } from '@playwright/test'

/**
 * Root Playwright config so the Test Explorer shows all app E2E tests.
 * Each project points to one app's tests and baseURL. Run from repo root.
 * Starts all apps via `pnpm run dev:e2e` (or reuse existing servers).
 */
export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  maxFailures: process.env.CI ? undefined : 1,
  reporter: 'html',
  // Tight timeouts for fail-fast; increase when tuning (e.g. timeout: 30_000, actionTimeout: 10_000).
  timeout: 15_000,
  expect: { timeout: 2_000 },
  use: {
    trace: 'on-first-retry',
    actionTimeout: 3_000,
    navigationTimeout: 5_000,
  },
  webServer: {
    command: 'pnpm run dev:kill && pnpm run dev:e2e',
    url: 'http://localhost:3000',
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'web',
      testDir: 'apps/web/tests/e2e',
      timeout: 30_000,
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:3000' },
    },
    {
      name: 'showcase',
      testDir: 'apps/showcase/tests/e2e',
      timeout: 30_000,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3010',
        navigationTimeout: 15_000,
        actionTimeout: 10_000,
      },
    },
  ],
})
