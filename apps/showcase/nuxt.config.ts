import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const mdcOptimizeDepsPackages = [
  '@nuxtjs/mdc',
  'remark-gfm',
  'remark-emoji',
  'remark-mdc',
  'remark-rehype',
  'rehype-raw',
  'parse5',
  'unist-util-visit',
  'unified',
  'debug',
]

let hmrPort = 24610

export default defineNuxtConfig({
  extends: ['@narduk-enterprises/narduk-nuxt-template-layer'],

  modules: ['nitro-cloudflare-dev', 'nuxt-auth-utils', '@nuxt/content', 'nuxt-og-image'],

  nitro: {
    cloudflareDev: {
      configPath: resolve(__dirname, 'wrangler.json'),
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  devServer: {
    port: 3010,
  },

  // Strip MDC/remark/rehype from optimizeDeps.include so Vite doesn't try to pre-bundle
  // them (they're transitive deps that can fail to resolve in pnpm; content runs server-side).
  hooks: {
    ready(nuxt) {
      const include = nuxt.options.vite?.optimizeDeps?.include as string[] | undefined
      if (include?.length) {
        nuxt.options.vite!.optimizeDeps!.include = include.filter(
          (entry) =>
            !mdcOptimizeDepsPackages.some((pkg) => entry === pkg || entry.startsWith(`${pkg}>`)),
        )
      }
    },
  },

  vite: {
    optimizeDeps: {
      exclude: mdcOptimizeDepsPackages,
    },
  },

  components: [{ path: '~/components/ui', pathPrefix: false }],

  // Unique HMR WebSocket port — avoids collisions when running all apps concurrently.
  $development: {
    hooks: {
      'vite:extendConfig'(config) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- vite config type doesn't expose server directly; cast required for HMR port injection
        ;(config as any).server ??= {}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- same cast as above; accessing server.hmr which is not in vite's exported type
        ;(config as any).server.hmr = { port: hmrPort++ }
      },
    },
  },

  runtimeConfig: {
    session: {
      // nuxt-auth-utils requires min 32 chars for sealed cookie encryption
      password:
        process.env.NUXT_SESSION_PASSWORD ||
        (import.meta.dev ? 'showcase-dev-session-secret-min-32-chars' : ''),
      cookie: {
        secure: false, // Allow cookies over HTTP in local dev (Safari compat)
      },
    },
    public: {
      appUrl: process.env.SITE_URL || 'http://localhost:3010',
      appName: 'Nuxt 4 Showcase',
      mapkitToken: process.env.APPLE_MAPKIT_TOKEN || '',
    },
  },

  site: {
    url: process.env.SITE_URL || 'http://127.0.0.1:3010',
    name: 'Nuxt 4 Showcase',
    description:
      'Interactive examples showcasing Nuxt 4 + Nuxt UI 4 + Cloudflare Workers: auth, blog, marketing, OG images, and Apple Maps.',
    defaultLocale: 'en',
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Nuxt 4 Showcase',
      url: process.env.SITE_URL || 'http://127.0.0.1:3010',
      logo: '/favicon.svg',
    },
  },

  ogImage: {
    defaults: {},
  },
})
