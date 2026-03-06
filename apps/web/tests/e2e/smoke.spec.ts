import { expect, test, waitForBaseUrlReady, waitForHydration, warmUpApp } from './fixtures'

test.describe('web smoke', () => {
  test.beforeAll(async ({ browser, baseURL }) => {
    if (!baseURL) {
      throw new Error('web smoke tests require Playwright baseURL to be configured.')
    }

    await waitForBaseUrlReady(baseURL)
    await warmUpApp(browser, baseURL)
  })

  test('home page renders the template hero', async ({ page }) => {
    await page.goto('/')
    await waitForHydration(page)
    await expect(page.getByText('Nuxt 4 Template').first()).toBeVisible()
    await expect(page).toHaveTitle(/Welcome to the Nuxt 4 Template/)
    await expect(page.getByRole('link', { name: 'Nuxt UI Docs' })).toBeVisible()
  })
})
