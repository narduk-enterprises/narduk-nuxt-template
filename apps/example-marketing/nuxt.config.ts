let hmrPort = 24640

export default defineNuxtConfig({
  extends: ['@loganrenz/narduk-nuxt-template-layer'],

  components: [
    { path: '~/components/ui', pathPrefix: false },
  ],

  future: {
    compatibilityVersion: 4,
  },

  devServer: {
    port: 3013,
  },

  $development: {
    hooks: {
      'vite:extendConfig'(config) {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        ;(config as any).server ??= {}
        ;(config as any).server.hmr = { port: hmrPort++ }
        /* eslint-enable @typescript-eslint/no-explicit-any */
      },
    },
  },

  runtimeConfig: {
    public: {
      appUrl: process.env.SITE_URL || 'http://localhost:3013',
      appName: 'Marketing Example',
    },
  },

  site: {
    url: process.env.SITE_URL || 'http://127.0.0.1:3013',
    name: 'Marketing Example',
    description: 'Landing page components: hero, pricing, testimonials, and contact forms.',
    defaultLocale: 'en',
  },
})
