# Example: Apple Maps

Demonstrates **Apple MapKit JS integration** with Nuxt 4 on Cloudflare Workers.

## What It Shows

- Embedding Apple Maps using MapKit JS in a Nuxt 4 application
- Client-side map rendering with proper SSR safety (`<ClientOnly>` /
  `onMounted`)
- Map token configuration via runtime config

## Run Locally

```bash
pnpm run dev:apple-maps
```

## Key Files

| File                  | Purpose                                     |
| --------------------- | ------------------------------------------- |
| `app/pages/index.vue` | Map display page with MapKit JS integration |
