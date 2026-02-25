<script setup lang="ts">
useSeo({
  title: 'Home',
  description: 'A production-ready demo template showcasing Nuxt 4, Nuxt UI 4, Tailwind CSS 4, and Cloudflare Workers with D1 database.',
  ogImage: {
    title: 'Nuxt 4 + Nuxt UI 4',
    description: 'Production-ready Cloudflare Workers template',
    icon: '✨',
  },
})

// Structured data — WebSite schema for search engine rich results
useWebPageSchema({
  name: 'Nuxt 4 Demo — Home',
  description: 'A production-ready demo template showcasing Nuxt 4, Nuxt UI 4, Tailwind CSS 4, and Cloudflare Workers with D1 database.',
})

const features = [
  {
    icon: 'i-lucide-rocket',
    title: 'Nuxt 4',
    description: 'The latest evolution of the Nuxt framework with compatibility version 4, enhanced performance, and the new app/ directory structure.',
    color: 'text-green-500',
  },
  {
    icon: 'i-lucide-palette',
    title: 'Nuxt UI 4',
    description: 'Beautiful, accessible components built with Tailwind CSS 4. Dark mode, color customization, and a massive component library.',
    color: 'text-blue-500',
  },
  {
    icon: 'i-lucide-cloud',
    title: 'Cloudflare Workers',
    description: 'Deploy to the edge with Cloudflare Workers. Runs in V8 isolates for ultra-fast cold starts and global distribution.',
    color: 'text-orange-500',
  },
  {
    icon: 'i-lucide-database',
    title: 'D1 Database',
    description: 'SQLite on the edge with Cloudflare D1. Schema-first with Drizzle ORM, migrations, and type-safe queries.',
    color: 'text-purple-500',
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'Authentication',
    description: 'Email/password auth with PBKDF2 hashing (Web Crypto API), session cookies, CSRF protection, and rate limiting.',
    color: 'text-emerald-500',
  },
  {
    icon: 'i-lucide-moon',
    title: 'Dark Mode',
    description: 'System-aware color mode with manual toggle. Fully integrated with Nuxt UI\'s color mode system.',
    color: 'text-indigo-500',
  },
]

const techStack = [
  { label: 'Nuxt', version: '4.x' },
  { label: 'Nuxt UI', version: '4.x' },
  { label: 'Tailwind CSS', version: '4.x' },
  { label: 'TypeScript', version: '5.x' },
  { label: 'Drizzle ORM', version: '0.45+' },
  { label: 'Cloudflare Workers', version: 'latest' },
]
</script>

<template>
  <div class="space-y-16">
    <!-- Hero -->
    <section class="text-center py-12 sm:py-20">
      <div class="animate-count-in">
        <UBadge color="primary" variant="subtle" size="lg" class="mb-6">
          <UIcon name="i-lucide-sparkles" class="size-3.5 mr-1" />
          Production-Ready Template
        </UBadge>
      </div>

      <h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style="animation-delay: 0.1s">
        Nuxt 4 + Nuxt UI 4
        <br>
        <span class="text-primary">Cloudflare Workers</span>
      </h1>

      <p class="text-lg sm:text-xl text-[var(--ui-text-muted)] max-w-2xl mx-auto mb-10" style="animation-delay: 0.2s">
        A demo template showcasing the best of Nuxt 4, Nuxt UI 4, Tailwind CSS 4, and Cloudflare Workers with D1 database — ready to clone, customize, and deploy.
      </p>

      <div class="flex flex-wrap items-center justify-center gap-4">
        <UButton to="/components" size="xl" icon="i-lucide-layout-grid">
          Explore Components
        </UButton>
        <UButton to="/todos" size="xl" variant="soft" color="neutral" icon="i-lucide-check-square">
          Try the Todos Demo
        </UButton>
      </div>
    </section>

    <!-- Features -->
    <section>
      <div class="text-center mb-10">
        <h2 class="font-display text-2xl sm:text-3xl font-bold mb-3">What's Inside</h2>
        <p class="text-[var(--ui-text-muted)] max-w-lg mx-auto">
          Everything you need to build and deploy a production Nuxt 4 application on Cloudflare Workers.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard v-for="feature in features" :key="feature.title" class="group hover:shadow-lg transition-shadow">
          <div class="space-y-3">
            <UIcon :name="feature.icon" :class="[feature.color, 'size-8 transition-transform group-hover:scale-110']" />
            <h3 class="font-semibold text-lg">{{ feature.title }}</h3>
            <p class="text-sm text-[var(--ui-text-muted)] leading-relaxed">{{ feature.description }}</p>
          </div>
        </UCard>
      </div>
    </section>

    <!-- Tech Stack -->
    <section>
      <div class="text-center mb-8">
        <h2 class="font-display text-2xl sm:text-3xl font-bold mb-3">Tech Stack</h2>
      </div>

      <div class="flex flex-wrap justify-center gap-3">
        <UBadge
          v-for="tech in techStack"
          :key="tech.label"
          size="lg"
          variant="subtle"
          color="neutral"
        >
          {{ tech.label }}
          <span class="text-primary ml-1">{{ tech.version }}</span>
        </UBadge>
      </div>
    </section>

    <!-- Auth Demo -->
    <section>
      <div class="text-center mb-8">
        <h2 class="font-display text-2xl sm:text-3xl font-bold mb-3">Authentication Demo</h2>
        <p class="text-[var(--ui-text-muted)] max-w-lg mx-auto">
          Full auth system with PBKDF2 password hashing, session cookies, and CSRF protection — all Workers-compatible.
        </p>
      </div>

      <div class="max-w-md mx-auto">
        <AuthDemo />
      </div>
    </section>
  </div>
</template>
