import { defineSharedAuthContract } from '../../../../layers/narduk-nuxt-layer/testing/e2e/auth-contract.ts'

defineSharedAuthContract({
  appName: 'example-auth',
  dashboardHeading: /Welcome back/i,
})
