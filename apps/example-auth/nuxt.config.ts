import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

let hmrPort = 24620

export default defineNuxtConfig({
  extends: ['@narduk-enterprises/narduk-nuxt-template-layer'],

  modules: ['nitro-cloudflare-dev', 'nuxt-auth-utils'],

  nitro: {
    cloudflareDev: {
      configPath: resolve(__dirname, 'wrangler.json'),
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  devServer: {
    port: 3011,
  },

  $development: {
    hooks: {
      'vite:extendConfig'(config) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ; (config as any).server = (config as any).server || {}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ; (config as any).server.hmr = { port: hmrPort++ }
      },
    },
  },

  runtimeConfig: {
    session: {
      password: '', // Overridden at runtime via NUXT_SESSION_PASSWORD
      cookie: {
        secure: false, // Allow cookies over HTTP in local dev (Safari compat)
      },
    },
    public: {
      appName: 'Auth Example',
    },
  },

  site: {
    url: 'http://127.0.0.1:3011',
    name: 'Auth Example',
    description: 'Authentication example using Web Crypto PBKDF2 and D1 sessions.',
    defaultLocale: 'en',
  },
})
