import { eq, and } from 'drizzle-orm'

/**
 * PATCH /api/todos/:id
 *
 * Toggles completed state or updates title of a todo.
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

  const body = await readBody(event)
  const db = useDatabase()
  const { todos } = await import('../../database/schema')

  // Verify ownership
  const existing = await db
    .select()
    .from(todos)
    .where(and(eq(todos.id, id), eq(todos.userId, result.user.id)))
    .get()

  if (!existing) {
    throw createError({ statusCode: 404, message: 'Todo not found' })
  }

  const updates: Record<string, any> = {}
  if (typeof body.completed === 'boolean') updates.completed = body.completed
  if (typeof body.title === 'string' && body.title.trim()) updates.title = body.title.trim()

  if (Object.keys(updates).length === 0) {
    throw createError({ statusCode: 400, message: 'No valid fields to update' })
  }

  const updated = await db
    .update(todos)
    .set(updates)
    .where(and(eq(todos.id, id), eq(todos.userId, result.user.id)))
    .returning()
    .get()

  return { todo: updated }
})
