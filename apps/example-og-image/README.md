# Example: OG Image

Demonstrates **dynamic Open Graph image generation** using the `nuxt-og-image`
module and the shared `OgImageDefault` Takumi template.

## What It Shows

- Custom OG image component at `app/components/OgImage/`
- Dynamic title, description, and icon rendering via the Takumi template engine
- Integration with the `useSeo()` composable for per-page OG image generation

## Run Locally

```bash
pnpm run dev:og-image
```

## Key Files

| File                      | Purpose                                  |
| ------------------------- | ---------------------------------------- |
| `app/pages/index.vue`     | Demo page with useSeo + OG image options |
| `app/components/OgImage/` | Custom OG image templates                |
