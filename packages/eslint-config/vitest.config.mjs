/** @type {import('vitest').UserConfig} */
export default {
  test: {
    globals: true,
    environment: 'node',
    include: ['eslint-plugin-nuxt-guardrails/tests/**/*.test.ts'],
  },
}
