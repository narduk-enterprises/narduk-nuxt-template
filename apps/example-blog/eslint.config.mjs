// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import { sharedConfigs } from '@narduk-enterprises/eslint-config/config'

export default withNuxt(...sharedConfigs, {
  files: ['app/**/*.vue'],
  rules: {
    'narduk/no-native-layout': 'off',
  },
})
