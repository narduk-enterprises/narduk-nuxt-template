import { ensureDefaultTestUser } from '../../utils/defaultTestUser'

export default defineEventHandler(async (event) => {
  if (!import.meta.dev) {
    throw createError({ statusCode: 404, message: 'Not found' })
  }

  // Allow enough for E2E tests running in parallel (5/min is too low)
  await enforceRateLimit(event, 'auth-login-test', 100, 60_000)

  const user = await ensureDefaultTestUser(event)

  const { passwordHash: _passwordHash, ...cleanUser } = user

  await setUserSession(event, { user: cleanUser })

  return { user: cleanUser }
})
