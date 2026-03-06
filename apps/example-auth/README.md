# Example: Authentication

Demonstrates **Web Crypto PBKDF2 + D1 session-based authentication** on
Cloudflare Workers.

## What It Demonstrates

- User registration and login using `crypto.subtle` (PBKDF2) — no bcrypt
- Session management stored in D1 with Drizzle ORM
- Route guards via `middleware/auth.ts`
- `useAuth()` composable for reactive auth state (`useState`-backed)
- CSRF-safe fetch interceptor (`plugins/fetch.client.ts`)

## Key Files

| File                         | Purpose                                    |
| ---------------------------- | ------------------------------------------ |
| `server/utils/crypto.ts`     | PBKDF2 password hashing via Web Crypto API |
| `server/utils/session.ts`    | D1-backed session CRUD                     |
| `server/api/auth/*.ts`       | Login, register, logout, me endpoints      |
| `server/database/schema.ts`  | Users + sessions Drizzle schema            |
| `app/composables/useAuth.ts` | Reactive auth state                        |
| `app/middleware/auth.ts`     | Route guard                                |
| `app/pages/login.vue`        | Zod-validated login form                   |
| `app/pages/register.vue`     | Zod-validated registration form            |

## Doppler Setup (Required)

This app reads secrets from the **`narduk-nuxt-template`** Doppler project,
config **`dev_auth`**.

**One-time setup:**

```bash
cd apps/example-auth
doppler setup --project narduk-nuxt-template --config dev_auth --no-interactive
```

| Secret                  | Purpose                             | Inherited From |
| ----------------------- | ----------------------------------- | -------------- |
| `NUXT_SESSION_PASSWORD` | Encrypts `nuxt-auth-utils` sessions | `dev` (shared) |

To add auth-specific secrets:

```bash
doppler secrets set MY_SECRET=value --project narduk-nuxt-template --config dev_auth
```

## Running

```bash
# From monorepo root:
pnpm run dev:auth

# Or directly:
cd apps/example-auth
pnpm run dev     # db:migrate + db:seed → doppler run -- nuxt dev
```

**Port:** `3011` — demo login at http://localhost:3011/login

## Scripts

| Script       | What It Does                                   |
| ------------ | ---------------------------------------------- |
| `dev`        | Migrate DB, seed, start dev server via Doppler |
| `db:ready`   | Run migrations + seed (no server)              |
| `db:migrate` | Apply D1 schema from layer's `drizzle/` SQL    |
| `db:seed`    | Insert seed data                               |
| `build`      | Production build via Doppler                   |
| `test:e2e`   | Run Playwright E2E tests                       |
