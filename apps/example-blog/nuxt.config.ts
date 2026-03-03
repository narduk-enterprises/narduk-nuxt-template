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

let hmrPort = 24630

export default defineNuxtConfig({
  extends: ['@narduk-enterprises/narduk-nuxt-template-layer'],

  modules: ['@nuxt/content'],

  future: {
    compatibilityVersion: 4,
  },

  hooks: {
    // Strip MDC/remark/rehype from optimizeDeps.include so Vite doesn't try to pre-bundle
    // them (they're transitive deps that can fail to resolve in pnpm; content runs server-side).
    ready(nuxt) {
      const include = nuxt.options.vite?.optimizeDeps?.include as
        | string[]
        | undefined
      if (include?.length) {
        nuxt.options.vite!.optimizeDeps!.include = include.filter(
          (entry) =>
            !mdcOptimizeDepsPackages.some(
              (pkg) => entry === pkg || entry.startsWith(`${pkg}>`),
            ),
        )
      }
    },
  },

  vite: {
    optimizeDeps: {
      exclude: mdcOptimizeDepsPackages,
    },
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

  devServer: {
    port: 3012,
  },

  runtimeConfig: {
    public: {
      appUrl: process.env.SITE_URL || 'http://localhost:3012',
      appName: 'Blog Example',
    },
  },

  site: {
    url: process.env.SITE_URL || 'http://127.0.0.1:3012',
    name: 'Blog Example',
    description: 'Content-driven blog powered by Nuxt Content v3.',
    defaultLocale: 'en',
  },
})
