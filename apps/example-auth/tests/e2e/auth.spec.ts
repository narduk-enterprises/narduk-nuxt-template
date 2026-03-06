import { test, expect, waitForHydration } from './fixtures'

test.describe('example-auth', () => {
  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage()
    await page.goto('/', { timeout: 60_000 })
    await page.waitForLoadState('networkidle', { timeout: 20_000 })
    await page.close()
  })
  test('page loads without hydration errors on index', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Authentication' })).toBeVisible()
  })

  test('page loads without hydration errors on login', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible()
  })

  test('page loads without hydration errors on register', async ({ page }) => {
    await page.goto('/register')
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible()
  })

  test('index page renders hero content', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Authentication' })).toBeVisible()
    await expect(page.getByText('Web Crypto PBKDF2 password hashing')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Create Account' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Try Demo User' })).toBeVisible()
  })

  test('navigation from index to login and register', async ({ page }) => {
    await page.goto('/')
    await waitForHydration(page)
    await page.getByRole('link', { name: 'Sign In' }).click()
    await expect(page).toHaveURL(/\/login/)
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible()

    await page.goto('/')
    await waitForHydration(page)
    await page.getByRole('link', { name: 'Create Account' }).click()
    await expect(page).toHaveURL(/\/register/)
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible()
  })

  test('login page shows demo account alert and demo button', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByText('Demo account available')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Sign In as Demo User' })).toBeVisible()
  })

  test('login footer link goes to register', async ({ page }) => {
    await page.goto('/login')
    await waitForHydration(page)
    await page.getByRole('link', { name: 'Sign up' }).click()
    await expect(page).toHaveURL(/\/register/)
  })

  test('register footer link goes to login', async ({ page }) => {
    await page.goto('/register')
    await waitForHydration(page)
    await page.getByRole('link', { name: 'Sign in' }).click()
    await expect(page).toHaveURL(/\/login/)
  })

  test('login form validation shows errors for empty submit', async ({ page }) => {
    await page.goto('/login')
    await waitForHydration(page)
    await page.getByRole('button', { name: 'Sign In', exact: true }).click()
    await expect(page.getByText('Invalid email')).toBeVisible()
    await expect(page.getByText('Password is required')).toBeVisible()
  })

  test('register form validation shows errors for empty submit', async ({ page }) => {
    await page.goto('/register')
    await waitForHydration(page)
    await page.getByRole('button', { name: 'Create Account', exact: true }).click()
    // Validation should prevent submit: we stay on register, form still visible
    await expect(page).toHaveURL(/\/register/)
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible()
  })

  test('register form validation for short password', async ({ page }) => {
    await page.goto('/register')
    await waitForHydration(page)
    await page.getByPlaceholder('John Doe').fill('Test User')
    await page.getByPlaceholder('you@example.com').fill('test@example.com')
    await page.getByPlaceholder('••••••••').first().fill('short')
    await page.getByRole('button', { name: 'Create Account', exact: true }).click()
    // Validation should prevent submit: we stay on register
    await expect(page).toHaveURL(/\/register/)
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible()
  })

  test('full registration flow succeeds', async ({ page }) => {
    test.setTimeout(30_000)
    const email = `e2e-${Date.now()}@example.com`
    await page.goto('/register')
    await waitForHydration(page)
    await page.getByPlaceholder('John Doe').fill('E2E User')
    await page.getByPlaceholder('you@example.com').fill(email)
    await page.getByPlaceholder('••••••••').first().fill('password123')
    await page.getByRole('button', { name: 'Create Account', exact: true }).click()
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 })
    await expect(page.getByRole('heading', { name: /Welcome/ })).toBeVisible()
    await expect(page.getByRole('alert').filter({ hasText: 'Error' })).not.toBeVisible()
  })

  test('demo user login succeeds', async ({ page }) => {
    test.setTimeout(30_000)
    await page.goto('/login')
    await waitForHydration(page)
    await page.getByRole('button', { name: 'Sign In as Demo User' }).click()
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 })
    await expect(page.getByRole('heading', { name: /Welcome/ })).toBeVisible()
    await expect(page.getByRole('alert').filter({ hasText: 'Error' })).not.toBeVisible()
  })

  test('demo user login from index page succeeds', async ({ page }) => {
    test.setTimeout(30_000)
    await page.goto('/')
    await waitForHydration(page)
    await page.getByRole('button', { name: 'Try Demo User' }).click()
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 })
    await expect(page.getByRole('heading', { name: /Welcome/ })).toBeVisible()
  })

  test('dashboard shows stats cards after login', async ({ page }) => {
    test.setTimeout(30_000)
    await page.goto('/login')
    await waitForHydration(page)
    await page.getByRole('button', { name: 'Sign In as Demo User' }).click()
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 })
    await expect(page.getByText('Total Users')).toBeVisible()
    await expect(page.getByText('Active Sessions')).toBeVisible()
    await expect(page.getByText('Monthly Revenue')).toBeVisible()
  })

  test('dashboard shows recent activity after login', async ({ page }) => {
    test.setTimeout(30_000)
    await page.goto('/login')
    await waitForHydration(page)
    await page.getByRole('button', { name: 'Sign In as Demo User' }).click()
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 })
    await expect(page.getByRole('heading', { name: 'Recent Activity' })).toBeVisible()
    await expect(page.getByText('User logged in').first()).toBeVisible()
  })

  test('login with invalid credentials shows error', async ({ page }) => {
    test.setTimeout(15_000)
    await page.goto('/login')
    await waitForHydration(page)
    await page.getByPlaceholder('you@example.com').fill('wrong@example.com')
    await page.getByPlaceholder('••••••••').first().fill('wrongpassword')
    await page.getByRole('button', { name: 'Sign In', exact: true }).click()
    await expect(page.getByText('Invalid email or password')).toBeVisible({ timeout: 5_000 })
  })

  test('duplicate registration shows error', async ({ page }) => {
    test.setTimeout(30_000)
    const email = `e2e-dup-${Date.now()}@example.com`
    await page.goto('/register')
    await waitForHydration(page)
    await page.getByPlaceholder('John Doe').fill('First User')
    await page.getByPlaceholder('you@example.com').fill(email)
    await page.getByPlaceholder('••••••••').first().fill('password123')
    await page.getByRole('button', { name: 'Create Account', exact: true }).click()
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 })

    // Clear cookies to start fresh (avoids guest middleware redirect issues)
    await page.context().clearCookies()

    await page.goto('/register')
    await waitForHydration(page)
    await page.getByPlaceholder('John Doe').fill('Second User')
    await page.getByPlaceholder('you@example.com').fill(email)
    await page.getByPlaceholder('••••••••').first().fill('password456')
    await page.getByRole('button', { name: 'Create Account', exact: true }).click()
    await expect(page.getByText('already in use')).toBeVisible({ timeout: 5_000 })
  })

  test('unauthenticated user is redirected from dashboard', async ({ page }) => {
    await page.goto('/dashboard/')
    await expect(page).toHaveURL(/\/login/, { timeout: 10_000 })
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible()
  })

  // ─── Logout & session ───────────────────────────────────────────────────

  test('logout from dashboard redirects to login and session is cleared', async ({ page }) => {
    test.setTimeout(30_000)
    await page.goto('/login')
    await waitForHydration(page)
    await page.getByRole('button', { name: 'Sign In as Demo User' }).click()
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 })
    await expect(page.getByRole('heading', { name: /Welcome/ })).toBeVisible()

    await page.getByRole('button', { name: 'Sign out' }).click()
    await expect(page).toHaveURL(/\/login/, { timeout: 10_000 })
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible()

    await page.goto('/dashboard/')
    await expect(page).toHaveURL(/\/login/, { timeout: 10_000 })
  })

  test('session persists after full page reload on dashboard', async ({ page }) => {
    test.setTimeout(30_000)
    await page.goto('/login')
    await waitForHydration(page)
    await page.getByRole('button', { name: 'Sign In as Demo User' }).click()
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 })
    await expect(page.getByRole('heading', { name: /Welcome/ })).toBeVisible()

    await page.reload()
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10_000 })
    await expect(page.getByRole('heading', { name: /Welcome/ })).toBeVisible()
    await expect(page.getByText('Total Users')).toBeVisible()
  })

  test('authenticated user visiting login is redirected to dashboard', async ({ page }) => {
    test.setTimeout(30_000)
    await page.goto('/login')
    await waitForHydration(page)
    await page.getByRole('button', { name: 'Sign In as Demo User' }).click()
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 })

    await page.goto('/login')
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10_000 })
    await expect(page.getByRole('heading', { name: /Welcome/ })).toBeVisible()
  })

  test('authenticated user visiting register is redirected to dashboard', async ({ page }) => {
    test.setTimeout(30_000)
    await page.goto('/login')
    await waitForHydration(page)
    await page.getByRole('button', { name: 'Sign In as Demo User' }).click()
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 })

    await page.goto('/register')
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10_000 })
    await expect(page.getByRole('heading', { name: /Welcome/ })).toBeVisible()
  })

  test('authenticated user visiting index is redirected to dashboard', async ({ page }) => {
    test.setTimeout(30_000)
    await page.goto('/login')
    await waitForHydration(page)
    await page.getByRole('button', { name: 'Sign In as Demo User' }).click()
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 })

    await page.goto('/')
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10_000 })
    await expect(page.getByRole('heading', { name: /Welcome/ })).toBeVisible()
  })

  test('manual email/password login after registration succeeds', async ({ page }) => {
    test.setTimeout(45_000)
    const email = `e2e-manual-${Date.now()}@example.com`
    const password = 'securePassword123'

    await page.goto('/register')
    await waitForHydration(page)
    await page.getByPlaceholder('John Doe').fill('Manual Login User')
    await page.getByPlaceholder('you@example.com').fill(email)
    await page.getByPlaceholder('••••••••').first().fill(password)
    await page.getByRole('button', { name: 'Create Account', exact: true }).click()
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 })

    await page.getByRole('button', { name: 'Sign out' }).click()
    await expect(page).toHaveURL(/\/login/, { timeout: 10_000 })

    await page.getByPlaceholder('you@example.com').fill(email)
    await page.getByPlaceholder('••••••••').first().fill(password)
    await page.getByRole('button', { name: 'Sign In', exact: true }).click()
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 })
    await expect(page.getByRole('heading', { name: /Welcome/ })).toBeVisible()
    await expect(page.getByText('Manual Login User').or(page.getByText('Manual Login User', { exact: false })).first()).toBeVisible({ timeout: 5_000 })
  })

  test('login form accepts valid email format and shows server error for unknown user', async ({ page }) => {
    test.setTimeout(15_000)
    await page.goto('/login')
    await waitForHydration(page)
    await page.getByPlaceholder('you@example.com').fill('valid-but-unknown@example.com')
    await page.getByPlaceholder('••••••••').first().fill('somepassword')
    await page.getByRole('button', { name: 'Sign In', exact: true }).click()
    await expect(page.getByText('Invalid email or password')).toBeVisible({ timeout: 5_000 })
    await expect(page).toHaveURL(/\/login/)
  })
})
