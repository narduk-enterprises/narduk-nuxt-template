<div align="center">
  <h1>✨ Nuxt 4 + Nuxt UI 4 Edge Template ✨</h1>
  <p><strong>A production-ready starter template designed for maximum performance on Cloudflare Workers.</strong></p>
</div>

<br />

Built exclusively for the edge. This template combines the power of **Nuxt 4**, the aesthetics of **Nuxt UI 4 (Tailwind CSS 4)**, and the global low-latency of **Cloudflare Workers** with **D1 SQLite databases**.

Skip the configuration boilerplate. Clone, deploy, and focus on building your product.

---

## 🚀 Features

- ⚡️ **Nuxt 4** — Configured for the future with `compatibilityVersion: 4` and the new `app/` structure.
- 🎨 **Nuxt UI 4** — Gorgeous, accessible UI components with built-in dark mode and Tailwind CSS 4 (`@theme`).
- 🦾 **TypeScript** — Full end-to-end type safety out of the box.
- 🌐 **Cloudflare Workers** — True edge deployment running on V8 isolates (no Node.js cold starts).
- 🗄️ **Cloudflare D1** — Edge SQLite database integrated seamlessly with **Drizzle ORM**.
- 🔒 **Edge Authentication** — Custom built, fully Workers-compatible auth system:
  - **PBKDF2** password hashing via the native Web Crypto API.
  - Secure `/api/auth` endpoints with proper session cookie management (`httpOnly`, `secure`, `lax`).
  - `useAuth()` reactive composable for global state management.
- 🛡️ **Hardened Security** — Built-in CSRF protection headers and per-isolate IP rate limiting.
- 🔍 **Advanced SEO System** — Powered by `@nuxtjs/seo`, fully edge-compatible:
  - **Auto Sitemap** — Dynamically generated XML sitemap at `/sitemap.xml`.
  - **Smart Robots.txt** — Dynamic `/robots.txt` with automatic sitemap reference.
  - **Schema.org Structured Data** — JSON-LD injection via `useSchemaOrg()` composable.
  - **Dynamic OG Images** — Branded social share images rendered via Satori at the edge.
  - **`useSeo()` Composable** — Single-call per-page SEO: title, description, OG, canonical in one function.
- 📝 **CRUD Demo** — A fully functional "Todos" application demonstrating real-world D1 queries.
- 🚦 **Health Checks & Error Handling** — Branded global error pages (404/500) and `/api/health` endpoints.

---

## 🛠️ Tech Stack & Philosophy

This template strictly follows **Cloudflare Workers** compatibility standards:

1. **No Node.js Native Modules:** All utilities run purely on V8 APIs (e.g., using Web Crypto API instead of `crypto` or `bcrypt` for hashing).
2. **Nitro Singleton Pattern:** Properly structured database connections and Drizzle bindings for edge environments.
3. **Optimized Build:** `cloudflare-module` preset used exclusively, building a single worker bundle instead of static pages.

---

## 💻 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd nuxt-v4-template
npm install
```

### 2. Local Development

Start the Nuxt 4 development server locally:

```bash
npm run dev
```

---

## ☁️ Deployment (Cloudflare Workers)

Deploy globally in minutes to your `*.workers.dev` subdomain:

### 1. Provision Infrastructure

Create a remote D1 database on your Cloudflare account:

```bash
npx wrangler d1 create nuxt-v4-template-db
```

_Copy the `database_id` from the terminal output._

### 2. Configure project

Open `wrangler.json` and paste your `database_id`:

```json
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "nuxt-v4-template-db",
      "database_id": "<PASTE_DATABASE_ID_HERE>"
    }
  ]
}
```

### 3. Apply Migrations

Push the database schema (Users, Sessions, Todos tables) to your remote D1 instance:

```bash
npx wrangler d1 execute nuxt-v4-template-db --remote --file=drizzle/0000_initial_schema.sql
```

### 4. Deploy!

Build the Nuxt project and deploy the Worker:

```bash
npm run deploy
```

---

## 🧩 Project Structure & Navigation

The architecture conforms to Nuxt 4 conventions:

```text
nuxt-v4-template/
├── app/
│   ├── app.vue              # Main application shell with theme configuration
│   ├── app.config.ts        # Nuxt UI color tokens (primary/neutral)
│   ├── error.vue            # Beautiful full-page error handler
│   ├── assets/
│   ├── components/
│   │   └── OgImage/         # OG image templates (rendered via Satori)
│   ├── composables/         # Global state (useAuth, useSeo, useSchemaOrg)
│   ├── middleware/          # Route guards
│   └── pages/               # File-based routing (Index, Components, Todos)
├── server/
│   ├── api/                 # Nitro API endpoints (Auth, Todos, Health)
│   ├── database/            # Drizzle schema definitions
│   ├── middleware/          # Server hooks (CSRF, Rate Limiter, D1 Injector)
│   └── utils/               # WebCrypto hashing and database utilities
├── drizzle/                 # SQLite migration files
├── nuxt.config.ts           # Nuxt configuration (cloudflare preset + SEO)
└── wrangler.json            # Cloudflare Workers configuration
```

---

## 🔍 SEO System

This template includes a comprehensive, production-grade SEO system powered by [`@nuxtjs/seo`](https://nuxtseo.com). Every feature is edge-compatible and runs on Cloudflare Workers.

### Quick Usage — `useSeo()` Composable

Every page should call `useSeo()` in its `<script setup>` block. This single call handles meta tags, Open Graph, Twitter Cards, canonical URLs, and dynamic OG images:

```vue
<script setup lang="ts">
// Minimal — just title + description
useSeo({
  title: 'About Us',
  description: 'Learn more about our team and mission.',
});
</script>
```

```vue
<script setup lang="ts">
// Full — with dynamic OG image, article metadata, and keywords
useSeo({
  title: 'How to Deploy Nuxt 4',
  description: 'Step-by-step guide to deploying Nuxt 4 on Cloudflare Workers.',
  type: 'article',
  publishedAt: '2026-02-20',
  author: 'Jane Doe',
  keywords: ['nuxt 4', 'cloudflare workers', 'deployment'],
  ogImage: {
    title: 'How to Deploy Nuxt 4',
    description: 'Step-by-step deployment guide',
    icon: '🚀',
  },
});
</script>
```

### Schema.org Structured Data — `useSchemaOrg()` Helpers

Rich snippets and structured data are critical for modern SEO. The template provides typed helpers:

```ts
// WebPage — for any page
useWebPageSchema({ name: 'About Us', description: 'Our story...' });

// Article — for blog posts
useArticleSchema({
  headline: 'How to Deploy Nuxt 4',
  description: 'A complete guide...',
  datePublished: '2026-02-20',
  author: { name: 'Jane Doe', url: 'https://jane.dev' },
});

// Product — for e-commerce
useProductSchema({
  name: 'Premium Widget',
  price: 29.99,
  availability: 'InStock',
  brand: 'Acme',
});

// FAQ — for FAQ sections
useFAQSchema([
  { question: 'What is Nuxt 4?', answer: 'The latest version...' },
  { question: 'Is it fast?', answer: 'Extremely fast...' },
]);

// LocalBusiness — for local businesses
useLocalBusinessSchema({
  name: 'Acme Corp',
  telephone: '+1-555-0100',
  address: {
    streetAddress: '123 Main St',
    addressLocality: 'Anytown',
    addressRegion: 'TX',
    postalCode: '75001',
  },
});

// Breadcrumbs — for navigation hierarchy
useBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
  { name: 'Current Post', url: '/blog/current-post' },
]);
```

### Automatic Features (Zero Config)

These work out of the box with no per-page setup:

| Feature            | Endpoint       | Description                                 |
| ------------------ | -------------- | ------------------------------------------- |
| **Sitemap**        | `/sitemap.xml` | Auto-discovers all pages, updates on deploy |
| **Robots.txt**     | `/robots.txt`  | Dynamic generation with sitemap reference   |
| **Canonical URLs** | Auto           | Proper canonical tags on every page         |
| **Title Template** | Auto           | `%s — Site Name` format site-wide           |
| **OG Site Name**   | Auto           | Consistent og:site_name across all pages    |

### OG Image Customization

Custom OG image templates live in `app/components/OgImage/`. The default template (`OgImageDefault.vue`) renders a dark-themed branded card. Create additional templates by adding more components to this directory.

---

## 🎨 Design Customization

Modify primary and neutral theme colors instantly via `app/app.config.ts`:

```ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'emerald', // Explore: blue, violet, rose, amber
      neutral: 'slate', // Explore: zinc, gray, stone
    },
  },
});
```

Global font stacks (Inter, Outfit) and Tailwind `@theme` utilities are controlled via `app/assets/css/main.css`.

---

## 🤖 AI Agent Instructions

If you are an AI agent analyzing this repository, welcome! This template is designed to give you a pristine starting point for building edge-native web applications with **Nuxt 4** and **Nuxt UI 4**.

### How to Start a New Project from this Template:

1. Assure dependencies are cleanly installed.
2. Strip out the demo-specific files to give yourself a clean slate:
   - Remove demo pages: `app/pages/components.vue`, `app/pages/todos.vue`.
   - Remove demo API routes: `server/api/todos.get.ts`, `server/api/todos.post.ts`, `server/api/todos/[id].patch.ts`, `server/api/todos/[id].delete.ts`.
   - Remove demo UI components: `app/components/AuthDemo.vue`.
3. Retain the core architecture: `app/app.vue` (shell), `server/utils/auth.ts`, `server/api/auth/*` (if auth is needed), and `server/database/schema.ts`.
4. **Critical Context constraints you must follow:**
   - **Nuxt 4 Structure:** All frontend code goes into the `app/` directory. The `compatibilityVersion: 4` is already set. Don't put pages or components in the root directory.
   - **Nuxt UI 4:** Use Nuxt UI 4 syntax and components. Note that `UDivider` is now `USeparator`. Tailwind CSS 4 is properly configured via `@theme` in `app/assets/css/main.css`.
   - **Cloudflare Workers Environment:** Do not install Node.js ORMs (like Prisma) or Node-specific crypto libraries (like `bcrypt`). Use `drizzle-orm` and the native Web Crypto API (`crypto.subtle`) ensuring strict V8 isolate compatibility.

### SEO — Critical for Every Page

You **MUST** add SEO to every new page you create. Use the built-in composables:

1. **Always call `useSeo()`** in every page's `<script setup>`:
   ```ts
   useSeo({
     title: 'Page Title',
     description: 'A compelling description for search engines.',
     ogImage: { title: 'Page Title', description: 'Short tagline', icon: '🎯' },
   });
   ```
2. **Always add structured data** using `useSchemaOrg()` helpers. Choose the right type:
   - `useWebPageSchema()` — for generic pages
   - `useArticleSchema()` — for blog/news content
   - `useProductSchema()` — for product pages
   - `useFAQSchema()` — for FAQ sections
   - `useLocalBusinessSchema()` — for local business sites
   - `useBreadcrumbSchema()` — for breadcrumb navigation

3. **OG Image templates** live in `app/components/OgImage/`. The default `OgImageDefault.vue` accepts `title`, `description`, `icon`, and `siteName` props. Customize or create new templates as needed.

4. **Update `nuxt.config.ts` `site` block** when changing the site name or URL:

   ```ts
   site: {
     url: 'https://your-domain.com',
     name: 'Your Site Name',
     description: 'Your site description.',
   }
   ```

5. **The sitemap and robots.txt are automatic** — no manual configuration needed.

### Built-in Antigravity Workflows

This repository includes Google Antigravity workflows (`.agents/workflows/`) that you should proactively use to audit your code during development. You can trigger these via slash-commands, or proactively run them yourself:

- `/check-nuxt-ui-v4` - Validates strict UI 4 component usage.
- `/check-nuxt-ssr` - Validates SSR safe data fetching, `isHydrated` checks, and client-only boundaries.
- `/check-store-separation` - Validates the separation of concerns (thin components vs thick composables/stores).
- `/check-nitro-edge` - Validates Nitro event handling and Cloudflare Worker compatibility.
