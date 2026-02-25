import { eq } from 'drizzle-orm'
import { users, sessions } from '../database/schema'
import type { User } from '../database/schema'

// ─── Crypto helpers (Web Crypto API — Workers-compatible) ───

const PBKDF2_ITERATIONS = 100_000
const SALT_LENGTH = 16
const KEY_LENGTH = 32

async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH))
  const key = await deriveKey(password, salt)
  const hash = new Uint8Array(await crypto.subtle.exportKey('raw', key))

  // Store as salt:hash (both hex-encoded)
  return `${toHex(salt)}:${toHex(hash)}`
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltHex, hashHex] = stored.split(':')
  if (!saltHex || !hashHex) return false

  const salt = fromHex(saltHex)
  const key = await deriveKey(password, salt)
  const hash = new Uint8Array(await crypto.subtle.exportKey('raw', key))

  return toHex(hash) === hashHex
}

async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey'],
  )

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt.buffer as ArrayBuffer,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: KEY_LENGTH * 8 },
    true,
    ['encrypt'],
  )
}

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
}

function fromHex(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16)
  }
  return bytes
}

function generateId(): string {
  return crypto.randomUUID()
}

// ─── User management ────────────────────────────────────────

export async function createUser(email: string, password: string, name?: string): Promise<User> {
  const db = useDatabase()
  const id = generateId()
  const passwordHash = await hashPassword(password)
  const now = new Date().toISOString()

  await db.insert(users).values({
    id,
    email: email.toLowerCase(),
    passwordHash,
    name: name || null,
    createdAt: now,
    updatedAt: now,
  })

  const user = await db.select().from(users).where(eq(users.id, id)).get()
  if (!user) throw new Error('Failed to create user')
  return user
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const db = useDatabase()
  return db.select().from(users).where(eq(users.email, email.toLowerCase())).get()
}

export async function verifyCredentials(email: string, password: string): Promise<User | null> {
  const user = await getUserByEmail(email)
  if (!user || !user.passwordHash) return null

  const valid = await verifyPassword(password, user.passwordHash)
  return valid ? user : null
}

// ─── Session management ─────────────────────────────────────

const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000 // 30 days

export async function createSession(userId: string): Promise<string> {
  const db = useDatabase()
  const id = generateId()
  const expiresAt = Date.now() + SESSION_DURATION_MS

  await db.insert(sessions).values({
    id,
    userId,
    expiresAt,
    createdAt: new Date().toISOString(),
  })

  return id
}

export async function getAuthSession(sessionId: string): Promise<{ session: typeof sessions.$inferSelect; user: User } | null> {
  const db = useDatabase()
  const session = await db.select().from(sessions).where(eq(sessions.id, sessionId)).get()

  if (!session) return null
  if (session.expiresAt < Date.now()) {
    await db.delete(sessions).where(eq(sessions.id, sessionId))
    return null
  }

  const user = await db.select().from(users).where(eq(users.id, session.userId)).get()
  if (!user) return null

  return { session, user }
}

export async function deleteSession(sessionId: string): Promise<void> {
  const db = useDatabase()
  await db.delete(sessions).where(eq(sessions.id, sessionId))
}
