import { z } from 'zod'

const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(500),
})

/**
 * POST /api/todos
 *
 * Creates a new todo for the authenticated user.
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

  const body = await readBody(event)
  const parsed = createTodoSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({ statusCode: 400, message: parsed.error.issues[0]?.message || 'Invalid input' })
  }

  const db = useDatabase()
  const { todos } = await import('../database/schema')

  const todo = await db.insert(todos).values({
    userId: result.user.id,
    title: parsed.data.title,
    createdAt: new Date().toISOString(),
  }).returning().get()

  return { todo }
})
