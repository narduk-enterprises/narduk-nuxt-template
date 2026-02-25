import { eq } from 'drizzle-orm'

/**
 * GET /api/todos
 *
 * Returns all todos for the authenticated user.
 * Requires a valid session cookie.
 */
export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, 'session')
  if (!sessionId) {
    throw createError({ statusCode: 401, message: 'Not authenticated' })
  }

  const result = await getAuthSession(sessionId)
  if (!result) {
    throw createError({ statusCode: 401, message: 'Invalid or expired session' })
  }

  const db = useDatabase()
  const { todos } = await import('../database/schema')

  const items = await db
    .select()
    .from(todos)
    .where(eq(todos.userId, result.user.id))
    .orderBy(todos.createdAt)
    .all()

  return { todos: items }
})
