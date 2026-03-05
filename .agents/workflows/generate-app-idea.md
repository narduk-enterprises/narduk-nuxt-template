---
description: Generate an app idea suited for the stack and create an agent prompt to build it
---

This workflow helps you brainstorm app ideas that perfectly fit the template's architecture (Nuxt 4, Cloudflare Workers, D1, Nuxt UI 4), bootstrap a new repo, and generate a prompt for another agent to build the app while auditing the template.

## Step 1: Brainstorm App Ideas

1. Consider what the `narduk-nuxt-template` provides:
   - **Full-stack SSR** (Nuxt 4 + Cloudflare Workers)
   - **SQL database** (Cloudflare D1 via Drizzle ORM)
   - **Rich UI components** (Nuxt UI 4 with Pro components — Dashboard, Page, Pricing, Blog, Auth, Chat, Editor)
   - **Monorepo architecture** (apps + shared packages)
2. Generate **10** short, diverse app ideas. Each idea should be 1–2 sentences max. Aim for variety across categories like:
   - Dashboards & analytics
   - Productivity & project management
   - Social & community
   - Marketplaces & directories
   - Content & publishing
   - Utilities & developer tools
   - Personal finance & tracking
   - Health, fitness & habits
   - Education & learning
   - Creative & media
3. Present all 10 to the user and let them pick (or remix).

## Step 2: Bootstrap the Repository

Once the user selects an app idea, **you** (the current agent) perform the bootstrap directly:

// turbo-all

1. Create a new private GitHub repo:
   ```bash
   gh repo create narduk-enterprises/<app-name> --private --confirm
   ```
2. Clone the template:
   ```bash
   git clone https://github.com/narduk-enterprises/narduk-nuxt-template.git ~/new-code/<app-name>
   ```
3. Clear the template's git history and set up your own repository:
   ```bash
   cd ~/new-code/<app-name> && rm -rf .git && git init && git remote add origin https://github.com/narduk-enterprises/<app-name>.git
   ```
4. Install dependencies:
   ```bash
   cd ~/new-code/<app-name> && pnpm install
   ```

**Do NOT run `pnpm setup`.** That will be handled by the next agent in the project workspace.

## Step 3: Generate the Build Prompt and Copy to Clipboard

Generate a single prompt for the user to paste into a new Antigravity window opened at `~/new-code/<app-name>`. Copy it to the clipboard using `pbcopy`.

The prompt **must** contain three sections:

### Section 1: Project Setup

Instruct the agent to run `pnpm setup` with explicit parameters:

```
pnpm setup -- --name="<app-name>" --display="<Display Name>" --url="https://<app-name>.nard.uk"
```

- `--name`: lowercase kebab-case slug (must match `/^[a-z0-9][a-z0-9-]*$/`)
- `--display`: human-readable name for SEO, favicons, and UI
- `--url`: production URL for site config, OG tags, and Doppler

Then instruct the agent to read `AGENTS.md` and `tools/AGENTS.md`.

### Section 2: Build the App

Define the specific features:

- **Database Schema:** Tables, columns, and Drizzle models in `packages/db`.
- **API Routes:** Nitro/Worker endpoints, D1 interactions, validation logic.
- **Frontend UI:** Pages, components, design requirements using Nuxt UI 4 and the `base` layer design system.

### Section 2b: Brand Identity

Instruct the agent to run the `/generate-brand-identity` workflow (`.agents/workflows/generate-brand-identity.md`) after the app is built and functional. This ensures every new app ships with an intentional visual identity — theme colors, typography, favicons, imagery, and design polish — instead of default template styling.

### Section 3: Template Audit & Issue Reporting

Instruct the agent to create `audit_report.md` capturing friction across:

- **Initialization:** `pnpm setup` results, string replacements, missing dependencies.
- **Database & CLI:** Drizzle migrations, `wrangler`, `nitro-cloudflare-dev` binding.
- **Monorepo Layers:** Module resolution, layer inheritance issues.
- **Type Safety:** TypeScript errors, auto-import type failures.
- **Agent Experience:** Adequacy of `AGENTS.md` and documentation.
- **Other Friction:** Port collisions, Tailwind issues, Doppler token errors.

## Step 4: Tell the User

After copying the prompt to clipboard, tell the user:

> Bootstrap complete! Open `~/new-code/<app-name>` in a new Antigravity window and paste (Cmd+V).

---

## Example Prompt Template

```markdown
# Role and Objective

You are an expert Nuxt 4, Cloudflare Workers, and Vue developer. You have been dropped into a newly cloned monorepo based on `narduk-nuxt-template`.

**You have a triple mission:**

1. **Build "[App Name]"**: [app description] using Nuxt 4, Cloudflare D1, and Nuxt UI 4.
2. **Brand Identity & SEO Excellence**: Make it stunning and discoverable.
3. **Template Audit**: Report any friction, broken types, or tooling failures.

---

## Step 0: Project Setup

Run the setup script (the script is NOT interactive). This handles ALL initialization including D1 provisioning, Doppler setup, example app cleanup, and favicon generation:
```

pnpm setup -- --name="<app-name>" --display="<Display Name>" --url="https://<app-name>.nard.uk"

```

Then read `AGENTS.md` and `tools/AGENTS.md`.

---

## Mission 1: Build [App Name]

Build the app inside `apps/web`. Features:

**1. Database Schema (Cloudflare D1)**
- [table details...]

**2. API Routes (Nitro / Cloudflare Workers)**
- [endpoint details...]

**3. Frontend (Nuxt UI 4)**
- [UI requirements...]
- **Requirement:** Use the inherited layer design tokens, Nuxt UI 4 components (including Pro components: `PageHero`, `PageSection`, `PageFeature`, `PageCTA` for landing pages; `DashboardGroup`, `DashboardSidebar`, `DashboardPanel` for admin interfaces), and Tailwind v4.

---

## Mission 1b: Brand Identity

Once the app is built and functional, follow the `/generate-brand-identity` workflow (`.agents/workflows/generate-brand-identity.md`) end-to-end. **Do not ask any questions** — you are the creative director. Analyze the app, make all creative decisions yourself, and execute the full pipeline: theme colors, typography, visual assets (logo, hero imagery), favicons, and holistic design polish. The app should feel like a real product — not a template.

Generate a **distinctive, memorable logo** using `/generate-brand-identity` Phase 3. The logo must work as a favicon at 16×16 and as an app icon at 180×180. Use the `generate_image` tool and the `pnpm generate:favicons` script to produce all required assets.

### ⚠️ MANDATORY: Remove ALL Template Branding

The template ships with default branding that **MUST** be replaced:

1. **Remove the N4 icon.** The green "N4" Nuxt logo in the header/navbar is template branding. It must be deleted and replaced with the app's own logo. Do NOT ship an app with the N4 icon anywhere.
2. **Remove or redesign the default navbar.** The template's default `UHeader` with a generic "Home" link and color mode toggle is lazy scaffolding. Either:
   - **Remove it entirely** if the app doesn't need top navigation (most single-page tools, utilities, and simple apps don't), OR
   - **Redesign it completely** with the app's own logo, meaningful navigation links, and intentional layout — only if navigation genuinely adds value to the user experience.
   - A navbar with just "Home" and a color toggle is **unacceptable**. If that's all you'd put in it, remove it.
3. **Replace all placeholder text.** Search for "Nuxt 4", "N4", "Demo", "Template" in the UI and replace with app-specific content.
4. **Light theme by default.** Set `colorMode: { preference: 'light' }` in `nuxt.config.ts`. We prefer light mode as the default experience. Dark mode must still look polished, but light mode is what users see first.

## Mission 1c: SEO Excellence

This app must be **exceptionally SEO-friendly**. Go beyond the template defaults:

- Every page MUST call `useSeo()` with rich, keyword-optimized titles and descriptions.
- Every page MUST call `useWebPageSchema()` (or appropriate Schema.org type) for structured data.
- Write compelling, unique meta descriptions for every route — not generic placeholders.
- Ensure the landing page has a clear `<h1>` with proper heading hierarchy throughout.
- Use semantic HTML5 elements (`<main>`, `<article>`, `<section>`, `<nav>`, etc.).
- OG images must be customized per page with descriptive text and branding.
- Verify that `sitemap.xml` and `robots.txt` are correctly generated.
- IndexNow is already wired — ensure it fires on content changes.
- Target relevant long-tail keywords in page content and headings.

---

## Mission 2: Template Audit & Issue Reporting

Create `audit_report.md` answering:
1. Did `pnpm setup` complete smoothly?
2. Did Drizzle migration and `nitro-cloudflare-dev` work out of the box?
3. Did Nuxt layer inheritance work seamlessly?
4. Any pre-existing TypeScript errors from `pnpm typecheck`?
5. Did documentation accurately guide you?
6. Any HMR port collisions, Tailwind issues, or Doppler errors?

### Final Deliverable:
- Working code for [App Name] with **ZERO errors and ZERO warnings** (TypeScript, ESLint, Build).
- `audit_report.md` with brutally honest feedback.

**CRITICAL RULE:** If you encounter errors or warnings, you must fix them properly. Do NOT use hacky monkey fixes, `@ts-expect-error`, or suppressions. Solve the actual root cause.
```
