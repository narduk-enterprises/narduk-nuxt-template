let hmrPort = 24650
const ogImagePort = Number(process.env.NUXT_PORT || 3015)

export default defineNuxtConfig({
  extends: ['@narduk-enterprises/narduk-nuxt-template-layer'],

  future: {
    compatibilityVersion: 4,
  },

  devServer: {
    port: ogImagePort,
  },

  $development: {
    hooks: {
      'vite:extendConfig'(config) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(config as any).server ??= {}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(config as any).server.hmr = { port: hmrPort++ }
      },
    },
  },

  runtimeConfig: {
    public: {
      appUrl: process.env.SITE_URL || `http://localhost:${ogImagePort}`,
      appName: 'OG Image Example',
    },
  },

  site: {
    url: process.env.SITE_URL || `http://127.0.0.1:${ogImagePort}`,
    name: 'OG Image Example',
    description:
      'Dynamic Open Graph image generation on Cloudflare Workers with nuxt-og-image v6 beta.',
    defaultLocale: 'en',
  },

  ogImage: {
    defaults: {},
  },
})
