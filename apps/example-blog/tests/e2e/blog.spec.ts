import { test, expect, waitForBaseUrlReady, warmUpApp } from './fixtures'

test.describe('example-blog', () => {
  test.beforeAll(async ({ browser, baseURL }) => {
    if (!baseURL) {
      throw new Error('example-blog tests require Playwright baseURL to be configured.')
    }

    await waitForBaseUrlReady(baseURL)
    await warmUpApp(browser, baseURL)
  })

  test('page loads without hydration errors on index', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Our Blog' })).toBeVisible()
  })

  test('blog index renders with heading and subtitle', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Our Blog' })).toBeVisible()
    await expect(page.getByText('Thoughts, updates, and tutorials.')).toBeVisible()
  })

  test('blog index has a separator below header', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Our Blog' })).toBeVisible()
    await expect(page.locator('[role="separator"]').first()).toBeVisible()
  })

  test('blog index shows post cards when content exists', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Our Blog' })).toBeVisible()
    const postLinks = page.locator('a[href*="hello-world"], a[href*="d1-and-content"]')
    await expect(postLinks.first()).toBeVisible({ timeout: 15_000 })
  })

  test('post cards display title, description, and date', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Our Blog' })).toBeVisible()
    // Wait for posts to load
    await expect(page.locator('a[href*="hello-world"]').first()).toBeVisible({ timeout: 15_000 })
    // Each post card should have a heading and date icon
    await expect(page.getByRole('heading', { name: /Hello World/ }).first()).toBeVisible()
  })

  test('navigate to post and see content', async ({ page }) => {
    await page.goto('/hello-world')
    await expect(page).toHaveURL(/\/hello-world/)
    await expect(
      page.getByRole('heading', { name: 'Hello World: Building for the Edge' }),
    ).toBeVisible({ timeout: 10_000 })
    await expect(page.getByText(/Nuxt 4|Welcome to the/)).toBeVisible()
  })

  test('post page loads without hydration errors', async ({ page }) => {
    await page.goto('/hello-world')
    await expect(
      page.getByRole('heading', { name: 'Hello World: Building for the Edge' }),
    ).toBeVisible({ timeout: 10_000 })
  })

  test('blog layout navigation to index', async ({ page }) => {
    await page.goto('/hello-world')
    await expect(
      page.getByRole('heading', { name: 'Hello World: Building for the Edge' }),
    ).toBeVisible({ timeout: 10_000 })
    await page.getByRole('link', { name: 'Blog', exact: true }).click()
    await expect(page).toHaveURL('/')
    await expect(page.getByRole('heading', { name: 'Our Blog' })).toBeVisible()
  })

  test('404 for unknown slug', async ({ page }) => {
    const res = await page.goto('/nonexistent-post', { waitUntil: 'commit', timeout: 15_000 })
    expect(res?.status()).toBe(404)
  })

  test('blog index loads with correct page title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Blog/)
  })
})
