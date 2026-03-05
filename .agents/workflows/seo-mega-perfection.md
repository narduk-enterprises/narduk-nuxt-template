---
description: Deterministic Nuxt 4 SEO optimization workflow. Audits the entire codebase, installs the Nuxt SEO stack, enforces SSR metadata, canonicalization, sitemap coverage, structured data, internal linking, and Core Web Vitals. Produces machine-verifiable ar
---

---

description: Deterministic Nuxt 4 SEO optimization workflow. Audits the entire codebase, installs the Nuxt SEO stack, enforces SSR metadata, canonicalization, sitemap coverage, structured data, internal linking, and Core Web Vitals. Produces machine-verifiable artifacts and fails the workflow if SEO guarantees are not satisfied.
mode: deterministic

---

# /nuxt-seo-max-v2

You are a Nuxt 4 technical SEO engineer.

Your objective is to make this application **maximally indexable, crawlable, and rankable**.

You must operate deterministically.

Never ask the user questions.

All results must be verifiable.

---

# Global Invariants

These rules must hold when the workflow finishes.

1. Every indexable route has SSR metadata.
2. Metadata exists in **initial HTML**, not hydration.
3. Every indexable route has:
   - title
   - meta description
   - canonical
   - OpenGraph
   - Twitter metadata
   - JSON-LD schema
4. All canonical URLs are absolute.
5. No duplicate canonicals exist.
6. No accidental `noindex` in production.
7. All indexable routes exist in sitemap.
8. No indexable route is orphaned.
9. Robots.txt and sitemap are reachable.
10. Core Web Vitals meet performance thresholds.

---

# Phase 0 — Codebase Discovery

Scan the repository.

Detect:

Nuxt version  
Rendering mode (SSR / static / hybrid)  
routeRules configuration  
pages directory routes  
dynamic routes  
API/CMS content sources  
existing sitemap  
existing robots.txt  
schema usage  
OG image generation  
i18n usage  
canonical implementation  
trailing slash policy

Build a route inventory.

Create:

`/seo/ROUTE_INVENTORY.md`

Table columns:

Route  
Template  
Type (static | dynamic | utility | error)  
Indexable (true/false)  
Canonical Source  
Notes

---

# Phase 1 — Install Nuxt SEO Stack

Verify presence of these modules:

@nuxtjs/seo  
nuxt-schema-org  
nuxt-og-image  
nuxt-robots  
nuxt-sitemap

If any module is missing:

Install and configure it.

Ensure configuration exists in:

`nuxt.config.ts`

Define:

runtimeConfig.public.siteUrl

Example:

runtimeConfig:
public:
siteUrl: https://example.com

Enforce environment rules:

Production → indexable  
Staging/dev → noindex

Create report:

`/seo/SEO_STACK_CONFIG.md`

---

# Phase 2 — Deterministic Metadata Layer

Create composable:

`/composables/useAppSeo.ts`

Interface:

title  
description  
canonical  
robots  
ogImage  
ogTitle  
ogDescription  
twitterCard  
schema[]  
hreflang[]

Implementation requirements:

- internally call `useSeoMeta`
- execute during SSR
- ensure canonical URLs are absolute
- provide fallback defaults
- allow schema injection

Refactor all page components to use this composable.

Remove duplicate or inline metadata logic.

Assertion:

Every page template imports `useAppSeo`.

---

# Phase 3 — Canonicalization Enforcement

Detect duplicate URL patterns:

trailing slash variants  
query parameter duplication  
pagination duplication  
dynamic route aliases  
http vs https  
www vs root

Implement:

redirect normalization

and canonical tags.

Generate report:

`/seo/DUPLICATE_CONTENT_AUDIT.md`

Assertion:

No duplicate canonical URLs remain.

---

# Phase 4 — Crawl Control

Ensure robots configuration exists.

Create:

`public/robots.txt`

Production rules:

User-agent: \*  
Allow: /  
Sitemap: {siteUrl}/sitemap.xml

Staging rules:

User-agent: \*  
Disallow: /

Assertion:

robots.txt reachable at `/robots.txt`.

---

# Phase 5 — Sitemap Coverage

Configure Nuxt Sitemap.

Requirements:

Include all indexable routes.

Dynamic routes must be sourced from CMS/API.

Include:

lastmod  
image entries when available

Split sitemaps if necessary:

sitemap.xml  
sitemap-pages.xml  
sitemap-products.xml  
sitemap-blog.xml

Constraint:

Each sitemap < 50,000 URLs.

Create:

`/seo/SITEMAP_PLAN.md`

Assertion:

All indexable routes appear in sitemap.

---

# Phase 6 — Structured Data

Implement JSON-LD schema.

Global schema:

Organization  
WebSite

Page schema mapping:

Home → WebPage  
Blog → BlogPosting  
Article → Article  
Product → Product  
Category → CollectionPage  
Breadcrumbs → BreadcrumbList

Schema requirements:

absolute URLs  
stable IDs  
content parity with visible page content

Create:

`/seo/SCHEMA_MAP.md`

Assertion:

Each indexable template contains schema.

---

# Phase 7 — Internal Linking Graph

Construct an internal link graph.

Detect:

orphan pages  
deep pages (>3 clicks)  
broken internal links

Rules:

Every indexable route must have ≥1 inbound internal link.

Homepage must link to primary sections.

Important pages must be ≤3 clicks from homepage.

Create:

`/seo/INTERNAL_LINKING_AUDIT.md`

---

# Phase 8 — Core Web Vitals Optimization

Measure:

LCP  
CLS  
INP  
TTFB

Implement improvements:

image optimization  
font preloading  
script splitting  
reduce blocking JS  
layout shift prevention  
server caching where appropriate

Create:

`/seo/CWV_REPORT.md`

Assertion thresholds:

LCP < 2.5s  
CLS < 0.1  
INP < 200ms

---

# Phase 9 — AI Search Discoverability

Add additional discovery signals.

Implement:

`/public/llms.txt`

Ensure structured data supports:

AI Overviews  
LLM indexing  
citation extraction

Improve semantic structure:

clear headings  
structured sections  
clean article markup

---

# Phase 10 — Verification Harness

Create automated verification script.

Script must:

1. Start preview server

nuxi build  
nuxi preview

2. Fetch HTML for sample pages.

Verify presence of:

title  
meta description  
canonical  
OpenGraph tags  
Twitter tags  
JSON-LD schema

3. Validate crawl endpoints:

GET /robots.txt → 200  
GET /sitemap.xml → valid XML

4. Sample 20 URLs from sitemap.

Verify:

HTTP 200  
indexable metadata present.

Create report:

`/seo/SEO_VERIFICATION.md`

---

# Phase 11 — Release Gate

Deployment must fail if any condition is violated:

missing title  
missing meta description  
missing canonical  
missing schema  
missing sitemap coverage  
robots misconfiguration  
hydration-only metadata  
Core Web Vitals regression

---

# Output Artifacts

Create directory:

`/seo`

Artifacts required:

ROUTE_INVENTORY.md  
SEO_STACK_CONFIG.md  
DUPLICATE_CONTENT_AUDIT.md  
SITEMAP_PLAN.md  
SCHEMA_MAP.md  
INTERNAL_LINKING_AUDIT.md  
CWV_REPORT.md  
SEO_VERIFICATION.md

---

# Final Output

The workflow must conclude with:

1. List of files modified
2. SEO issues resolved
3. Verification results
4. Remaining SEO risks
