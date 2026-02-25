import { z } from 'zod'

/**
 * CRUD API Route Template
 *
 * Copy this file as a starting point for new API routes.
 * It demonstrates the standard patterns used in this template:
 *
 * 1. Zod validation for request bodies
 * 2. Auth check via session cookie
 * 3. Drizzle ORM queries with D1
 * 4. Typed error responses
 *
 * Rename this file to match your resource:
 *   - GET    /api/[resource].get.ts
 *   - POST   /api/[resource].post.ts
 *   - PATCH  /api/[resource]/[id].patch.ts
 *   - DELETE /api/[resource]/[id].delete.ts
 *
 * ─── EXAMPLE: POST /api/items ──────────────────────────
 */

// 1️⃣ Define your validation schema
const createItemSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(1000).optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
})

// 2️⃣ Define the event handler
export default defineEventHandler(async (event) => {
  // ── Auth check ──────────────────────────────────────
  const sessionId = getCookie(event, 'session')
  if (!sessionId) {
    throw createError({ statusCode: 401, message: 'Not authenticated' })
  }

  const session = await getAuthSession(sessionId)
  if (!session) {
    throw createError({ statusCode: 401, message: 'Invalid or expired session' })
  }

  // ── Validate body ───────────────────────────────────
  const body = await readBody(event)
  const parsed = createItemSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      message: parsed.error.issues[0]?.message || 'Invalid input',
    })
  }

  // ── Database operation ──────────────────────────────
  const db = useDatabase()

  // Example: import your table from schema
  // const { items } = await import('../database/schema')
  //
  // const item = await db.insert(items).values({
  //   userId: session.user.id,
  //   title: parsed.data.title,
  //   description: parsed.data.description,
  //   status: parsed.data.status,
  //   createdAt: new Date().toISOString(),
  // }).returning().get()
  //
  // return { item }

  // ── Placeholder return ──────────────────────────────
  return {
    message: 'Template route — replace with your implementation',
    userId: session.user.id,
    data: parsed.data,
  }
})
