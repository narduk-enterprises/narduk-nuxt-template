import { ensureDefaultTestUser } from '../../utils/defaultTestUser'
import { RATE_LIMIT_POLICIES, enforceRateLimitPolicy } from '#layer/server/utils/rateLimit'

export default defineEventHandler(async (event) => {
  if (!import.meta.dev) {
    throw createError({ statusCode: 404, message: 'Not found' })
  }

  await enforceRateLimitPolicy(event, RATE_LIMIT_POLICIES.showcaseAuthLoginTest)

  const user = await ensureDefaultTestUser(event)

  const { passwordHash: _passwordHash, ...cleanUser } = user

  await setUserSession(event, { user: cleanUser })

  return { user: cleanUser }
})
