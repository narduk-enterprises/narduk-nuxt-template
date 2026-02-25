import { eq, and } from 'drizzle-orm'

/**
 * DELETE /api/todos/:id
 *
 * Deletes a todo by ID for the authenticated user.
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

  const id = Number(getRouterParam(event, 'id'))
  if (isNaN(id)) {
    throw createError({ statusCode: 400, message: 'Invalid todo ID' })
  }

  const db = useDatabase()
  const { todos } = await import('../../database/schema')

  // Verify ownership before deleting
  const existing = await db
    .select()
    .from(todos)
    .where(and(eq(todos.id, id), eq(todos.userId, result.user.id)))
    .get()

  if (!existing) {
    throw createError({ statusCode: 404, message: 'Todo not found' })
  }

  await db.delete(todos).where(eq(todos.id, id))

  return { success: true }
})
