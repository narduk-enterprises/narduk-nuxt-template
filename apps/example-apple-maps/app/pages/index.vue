<script setup lang="ts">
useSeo({
  title: 'Apple Maps Example',
  description: 'Apple MapKit JS integration on Nuxt 4 and Cloudflare Workers.',
  ogImage: {
    title: 'Apple Maps Example',
    description: 'MapKit JS in Nuxt 4',
    icon: '🗺️',
  },
})

useWebPageSchema({
  name: 'Apple Maps Example',
  description: 'Apple MapKit JS integration on Nuxt 4 and Cloudflare Workers.',
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b border-default bg-default/80 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <NuxtLink to="/" class="font-display font-bold text-lg">
          <span class="text-primary">Apple Maps</span> Example
        </NuxtLink>
      </div>
    </header>

    <main class="flex-1 flex flex-col p-4">
      <div class="max-w-4xl mx-auto w-full space-y-4">
        <p class="text-muted text-sm">
          Using <code class="rounded bg-elevated px-1">AppMapKit</code> component from the shared layer.
        </p>
        <div class="rounded-xl overflow-hidden border border-default shadow-card min-h-[400px] bg-muted/30 relative">
          <AppMapKit
            :fallback-center="{ lat: 48.2082, lng: 16.3738 }"
            :zoom-span="{ lat: 0.05, lng: 0.05 }"
            class="w-full h-[400px]"
          />
        </div>
      </div>
    </main>
  </div>
</template>
