let hmrPort = 24610

export default defineNuxtConfig({
  extends: ['@loganrenz/narduk-nuxt-template-layer'],

  future: {
    compatibilityVersion: 4,
  },

  devServer: {
    port: 3010,
  },

  // Unique HMR WebSocket port — avoids collisions when running all apps concurrently.
  // Must be set via hook because Nuxt's DevServerPlugin overwrites static vite.server.hmr.
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
      appUrl: process.env.SITE_URL || 'http://localhost:3010',
      appName: process.env.APP_NAME || 'Nuxt 4 Showcase',
      exampleAuthUrl: process.env.EXAMPLE_AUTH_URL || 'http://localhost:3011',
      exampleBlogUrl: process.env.EXAMPLE_BLOG_URL || 'http://localhost:3012',
      exampleMarketingUrl: process.env.EXAMPLE_MARKETING_URL || 'http://localhost:3013',

      exampleOgImageUrl: process.env.EXAMPLE_OG_IMAGE_URL || 'http://localhost:3015',
      exampleAppleMapsUrl: process.env.EXAMPLE_APPLE_MAPS_URL || 'http://localhost:3016',
    },
  },

  site: {
    url: process.env.SITE_URL || 'https://showcase.narduk-nuxt-template.workers.dev',
    name: 'Nuxt 4 Showcase',
    description: 'Interactive examples showcasing Nuxt 4 + Nuxt UI 4 + Cloudflare Workers patterns.',
    defaultLocale: 'en',
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Nuxt 4 Showcase',
      url: process.env.SITE_URL || 'https://showcase.narduk-nuxt-template.workers.dev',
      logo: '/favicon.svg',
    },
  },
})
