<script setup lang="ts">
useSeo({
  title: 'Welcome to the Nuxt 4 Template',
  description: 'Built with Nuxt 4, Nuxt UI 4, and Cloudflare Workers.',
})
useWebPageSchema({
  name: 'Welcome to the Nuxt 4 Template',
  description: 'Built with Nuxt 4, Nuxt UI 4, and Cloudflare Workers.',
})
</script>

<template>
  <UPage>
    <UPageHero
      title="Nuxt 4 Template"
      description="Built with Nuxt 4, Nuxt UI 4, Tailwind CSS 4, and deployed on Cloudflare Workers with D1."
    >
      <template #links>
        <UButton to="https://ui.nuxt.com" target="_blank" icon="i-lucide-book-open" color="neutral">
          Nuxt UI Docs
        </UButton>
      </template>
    </UPageHero>
  </UPage>
</template>
