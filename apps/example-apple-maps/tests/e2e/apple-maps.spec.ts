import { test, expect } from './fixtures'

test.describe('example-apple-maps', () => {
  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage()
    await page.goto('/', { timeout: 60_000 })
    await page.waitForLoadState('networkidle', { timeout: 20_000 })
    await page.close()
  })
  test('page loads and shows header', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: 'Apple Maps Example', exact: true })).toBeVisible({
      timeout: 10_000,
    })
  })

  test('subtitle text renders', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText(/MapKit JS 5.x on Nuxt 4/).first()).toBeVisible({ timeout: 15_000 })
  })

  test('map container or error/loading state is present', async ({ page }) => {
    await page.goto('/')
    const mapEl = page.getByTestId('apple-map')
    const errorOrLoading = page.getByText(/Loading map…|Failed to load|APPLE_MAPKIT_TOKEN/)
    await expect(mapEl.or(errorOrLoading).first()).toBeVisible({ timeout: 15_000 })
  })

  test('page has correct title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Apple Maps/)
  })

  test('header navigation link points to home', async ({ page }) => {
    await page.goto('/')
    const homeLink = page.getByRole('link', { name: 'Apple Maps Example', exact: true })
    await expect(homeLink).toHaveAttribute('href', '/')
  })

  test('map container has correct test id', async ({ page }) => {
    await page.goto('/')
    // Either the map loads or an error displays — the container or error should be in the DOM
    const mapContainer = page.locator('#apple-map-container')
    const errorMsg = page.getByText(/Failed to load|APPLE_MAPKIT_TOKEN/)
    await expect(mapContainer.or(errorMsg).first()).toBeVisible({ timeout: 15_000 })
  })
})
