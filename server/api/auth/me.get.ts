/**
 * GET /api/auth/me
 *
 * Returns the currently authenticated user from session cookie.
 * Returns { user: null } if not authenticated.
 */
export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, 'session')

  if (!sessionId) {
    return { user: null }
  }

  try {
    const result = await getAuthSession(sessionId)
    if (!result) {
      return { user: null }
    }

    return {
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        isAdmin: result.user.isAdmin,
      },
    }
  }
  catch {
    return { user: null }
  }
})
