let hmrPort = 24610

export default defineNuxtConfig({
  extends: ['@narduk-enterprises/narduk-nuxt-template-layer'],

  future: {
    compatibilityVersion: 4,
  },

  devServer: {
    port: 3010,
  },

  // Unique HMR WebSocket port — avoids collisions when running all apps concurrently.
  // Must be set via hook because Nuxt's DevServerPlugin overwrites static vite.server.hmr.
  $development: {
    runtimeConfig: {
      public: {
        appUrl: 'http://localhost:3010',
        exampleAuthUrl: 'http://localhost:3011',
        exampleBlogUrl: 'http://localhost:3012',
        exampleMarketingUrl: 'http://localhost:3013',
        exampleOgImageUrl: 'http://localhost:3015',
        exampleAppleMapsUrl: 'http://localhost:3016',
      },
    },
    hooks: {
      'vite:extendConfig'(config) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ; (config as any).server ??= {}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ; (config as any).server.hmr = { port: hmrPort++ }
      },
    },
  },

  runtimeConfig: {
    public: {
      appUrl: 'https://showcase.nard.uk',
      appName: 'Nuxt 4 Showcase',
      exampleAuthUrl: 'https://example-auth.nard.uk',
      exampleBlogUrl: 'https://example-blog.nard.uk',
      exampleMarketingUrl: 'https://example-marketing.nard.uk',
      exampleOgImageUrl: 'https://example-og-image.nard.uk',
      exampleAppleMapsUrl: 'https://example-apple-maps.nard.uk',
    },
  },

  site: {
    url: process.env.SITE_URL || 'https://showcase.nard.uk',
    name: 'Nuxt 4 Showcase',
    description: 'Interactive examples showcasing Nuxt 4 + Nuxt UI 4 + Cloudflare Workers patterns.',
    defaultLocale: 'en',
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Nuxt 4 Showcase',
      url: process.env.SITE_URL || 'https://showcase.nard.uk',
      logo: '/favicon.svg',
    },
  },
})
