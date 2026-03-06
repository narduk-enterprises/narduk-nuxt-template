import { test, expect, waitForBaseUrlReady, waitForHydration, warmUpApp } from './fixtures'

test.describe('showcase', () => {
  test.beforeAll(async ({ browser, baseURL }) => {
    if (!baseURL) {
      throw new Error('showcase tests require Playwright baseURL to be configured.')
    }

    await waitForBaseUrlReady(baseURL)
    await warmUpApp(browser, baseURL)
  })
  test('page loads without hydration errors', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /Nuxt 4 Showcase/i })).toBeVisible()
  })

  test('hero renders with subtitle and source link', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /Nuxt 4 Showcase/i })).toBeVisible()
    await expect(page.getByText('Production-ready example apps')).toBeVisible()
    await expect(page.getByRole('link', { name: 'View Source' })).toBeVisible()
  })

  test('all example cards render', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Auth & Dashboard' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Marketing' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'OG Images' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Apple Maps' })).toBeVisible()
  })

  test('cards link to correct URLs', async ({ page }) => {
    await page.goto('/')
    await waitForHydration(page)
    const authCard = page.getByRole('link', { name: /Auth & Dashboard/ }).first()
    await expect(authCard).toHaveAttribute('href', /localhost:3011/)
    const blogCard = page.getByRole('link', { name: /Blog/ }).first()
    await expect(blogCard).toHaveAttribute('href', /localhost:3012/)
    const marketingCard = page.getByRole('link', { name: /Marketing/ }).first()
    await expect(marketingCard).toHaveAttribute('href', /localhost:3013/)
    const ogImageCard = page.getByRole('link', { name: /OG Images/ }).first()
    await expect(ogImageCard).toHaveAttribute('href', /localhost:3015/)
    const appleMapsCard = page.getByRole('link', { name: /Apple Maps/ }).first()
    await expect(appleMapsCard).toHaveAttribute('href', /localhost:3016/)
  })

  test('cards open in new tab', async ({ page }) => {
    await page.goto('/')
    const authCard = page.getByRole('link', { name: /Auth & Dashboard/ }).first()
    await expect(authCard).toHaveAttribute('target', '_blank')
    await expect(authCard).toHaveAttribute('rel', 'noopener')
  })

  test('architecture note section is visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Independent Workers' })).toBeVisible()
    await expect(page.getByText('Each example runs as a fully independent')).toBeVisible()
  })

  test('each card shows feature badges', async ({ page }) => {
    await page.goto('/')
    // Auth card features — target badge elements specifically
    const badges = page.locator('[data-slot="base"]')
    await expect(badges.filter({ hasText: 'Web Crypto PBKDF2' }).first()).toBeVisible()
    await expect(badges.filter({ hasText: 'CSRF protection' }).first()).toBeVisible()
    // Blog card features
    await expect(badges.filter({ hasText: 'Nuxt Content v3' }).first()).toBeVisible()
    // Marketing card features
    await expect(badges.filter({ hasText: 'Pricing table' }).first()).toBeVisible()
  })
})
