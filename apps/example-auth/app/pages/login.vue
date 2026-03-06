<script setup lang="ts">
useSeo({
  title: 'Sign In',
  description: 'Sign in to access your dashboard.',
})
useWebPageSchema({
  name: 'Sign In',
  description: 'Sign in to access your dashboard.',
})
definePageMeta({ middleware: ['guest'] })
</script>

<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-8rem)]">
    <AuthLoginCard show-demo-login>
      <template #before-form>
        <UAlert
          color="neutral"
          variant="subtle"
          title="Demo account available"
          description="Use the button below to sign in as the demo user (no password required)."
          class="mb-4"
        />
      </template>
    </AuthLoginCard>
  </div>
</template>
