import { test, expect } from '@playwright/test'

test.describe('Showcase Hub', () => {
  test('loads hub page with all section links', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('Showcase')

    // Verify all section cards are present
    await expect(page.getByText('Auth & Dashboard')).toBeVisible()
    await expect(page.getByText('Blog')).toBeVisible()
    await expect(page.getByText('Marketing')).toBeVisible()
    await expect(page.getByText('OG Images')).toBeVisible()
    await expect(page.getByText('Apple Maps')).toBeVisible()
  })

  test('navigates to auth section', async ({ page }) => {
    await page.goto('/auth')
    await expect(page.locator('h1')).toContainText('Authentication')
  })

  test('navigates to blog section', async ({ page }) => {
    await page.goto('/blog')
    await expect(page.locator('h1')).toContainText('Our Blog')
  })

  test('navigates to marketing section', async ({ page }) => {
    await page.goto('/marketing')
    await expect(page.getByText('Build at the speed of thought')).toBeVisible()
  })

  test('navigates to og-image section', async ({ page }) => {
    await page.goto('/og-image')
    await expect(page.locator('h1')).toContainText('OG Image Examples')
  })

  test('navigates to maps section', async ({ page }) => {
    await page.goto('/maps')
    await expect(page.getByText('Apple Maps')).toBeVisible()
  })
})
