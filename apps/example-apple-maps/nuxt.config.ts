let hmrPort = 24660
const appleMapsPort = Number(process.env.NUXT_PORT || 3016)

export default defineNuxtConfig({
  extends: ['@narduk-enterprises/narduk-nuxt-template-layer'],

  future: {
    compatibilityVersion: 4,
  },

  devServer: {
    port: appleMapsPort,
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
      appUrl: process.env.SITE_URL || `http://localhost:${appleMapsPort}`,
      appName: 'Apple Maps Example',
      mapkitToken:
        process.env.APPLE_MAPKIT_TOKEN ||
        'eyJraWQiOiI0OVdRVFo0OTRTIiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJGVlNZN0NGQzNTIiwiaWF0IjoxNzcyMTUyNDIwLCJleHAiOjE3NzI3ODM5OTl9.zoFgOLvq8H54AkAV7Oh9WcJQtYA0EwB3s6IF_dj5YdNnSnzKHbBLfE8oxi2qjW2AuuEWGiRSJLqS6dQzpzDtoA',
    },
  },

  site: {
    url: process.env.SITE_URL || `http://127.0.0.1:${appleMapsPort}`,
    name: 'Apple Maps Example',
    description: 'Apple MapKit JS integration on Nuxt 4 and Cloudflare Workers.',
    defaultLocale: 'en',
  },
})
