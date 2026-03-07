let hmrPort = 24640
const marketingPort = Number(process.env.NUXT_PORT || 3013)

export default defineNuxtConfig({
  extends: ['@narduk-enterprises/narduk-nuxt-template-layer'],

  components: [{ path: '~/components/ui', pathPrefix: false }],

  future: {
    compatibilityVersion: 4,
  },

  devServer: {
    port: marketingPort,
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
      appUrl: process.env.SITE_URL || `http://localhost:${marketingPort}`,
      appName: 'Marketing Example',
    },
  },

  site: {
    url: process.env.SITE_URL || `http://127.0.0.1:${marketingPort}`,
    name: 'Marketing Example',
    description: 'Landing page components: hero, pricing, testimonials, and contact forms.',
    defaultLocale: 'en',
  },
})
