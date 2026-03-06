import { test, expect, waitForHydration } from './fixtures'

test.describe('example-og-image', () => {
  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage()
    await page.goto('/', { timeout: 60_000 })
    await page.waitForLoadState('networkidle', { timeout: 20_000 })
    await page.close()
  })
  test('page loads without hydration errors', async ({ page }) => {
    await page.goto('/')
    await waitForHydration(page)
    await expect(page.getByRole('heading', { name: 'OG Image Examples' })).toBeVisible({
      timeout: 15_000,
    })
  })

  test('heading and description render', async ({ page }) => {
    await page.goto('/')
    await waitForHydration(page)
    await expect(page.getByRole('heading', { name: 'OG Image Examples' })).toBeVisible({
      timeout: 15_000,
    })
    await expect(page.getByText('Every OG image component available')).toBeVisible()
  })

  test('available components section renders', async ({ page }) => {
    await page.goto('/')
    await waitForHydration(page)
    await expect(page.getByRole('heading', { name: 'Available Components' })).toBeVisible({
      timeout: 15_000,
    })
    await expect(page.getByText('OgPlayground.takumi.vue').first()).toBeVisible()
    await expect(page.getByText('OgArticleCard.takumi.vue').first()).toBeVisible()
    await expect(page.getByText('OgImageDefault.takumi.vue').first()).toBeVisible()
    await expect(page.getByText('OgImageArticle.takumi.vue').first()).toBeVisible()
  })

  test('example cards render with labels', async ({ page }) => {
    await page.goto('/')
    await waitForHydration(page)
    await expect(page.getByRole('heading', { name: 'Playground — Query Driven' })).toBeVisible({
      timeout: 15_000,
    })
    await expect(page.getByRole('heading', { name: 'Article Card — Engineering' })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Default — Layer Template/ })).toBeVisible()
  })

  test('app-level and layer-level badges are present', async ({ page }) => {
    await page.goto('/')
    await waitForHydration(page)
    await expect(page.getByRole('heading', { name: 'OG Image Examples' })).toBeVisible({
      timeout: 15_000,
    })
    await expect(page.getByText('App', { exact: true }).first()).toBeVisible()
    await expect(page.getByText('Layer', { exact: true }).first()).toBeVisible()
  })

  test('props section and dimensions are displayed', async ({ page }) => {
    await page.goto('/')
    await waitForHydration(page)
    await expect(page.getByRole('heading', { name: 'OG Image Examples' })).toBeVisible({
      timeout: 15_000,
    })
    // Verify props tables render
    await expect(page.getByText('Props').first()).toBeVisible()
    // Verify dimensions info
    await expect(page.getByText('Dimensions:').first()).toBeVisible()
  })
})
