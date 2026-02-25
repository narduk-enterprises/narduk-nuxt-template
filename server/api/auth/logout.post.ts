/**
 * POST /api/auth/logout
 *
 * Destroys the current session and clears the session cookie.
 */
export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, 'session')

  if (sessionId) {
    await deleteSession(sessionId)
  }

  deleteCookie(event, 'session', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })

  return { success: true }
})
