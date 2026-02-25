<script setup lang="ts">
/**
 * Blog layout — Standard chrome + sidebar for recent posts / navigation.
 *
 * Usage: Add `definePageMeta({ layout: 'blog' })` to any page.
 */
const colorMode = useColorMode()
const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/templates/blog' },
]
</script>

<template>
  <UApp>
    <div class="min-h-screen flex flex-col">
      <!-- Header -->
      <header class="sticky top-0 z-50 backdrop-blur-lg bg-default/80 border-b border-default">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <NuxtLink to="/" class="font-display font-bold text-lg">
            <span class="text-primary">N4</span> Blog
          </NuxtLink>

          <div class="flex items-center gap-1">
            <UButton
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              variant="ghost"
              color="neutral"
              size="sm"
            >
              {{ link.label }}
            </UButton>
            <UButton
              :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
              variant="ghost"
              color="neutral"
              @click="toggleTheme"
            />
          </div>
        </div>
      </header>

      <!-- Main with sidebar -->
      <div class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div class="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
          <main>
            <slot />
          </main>

          <!-- Sidebar -->
          <aside class="hidden lg:block space-y-8 pt-2">
            <slot name="sidebar">
              <!-- Default sidebar content -->
              <div>
                <h3 class="font-semibold text-sm uppercase tracking-wider text-muted mb-3">About</h3>
                <p class="text-sm text-muted leading-relaxed">
                  A blog powered by Nuxt Content and deployed on Cloudflare Workers.
                </p>
              </div>

              <USeparator />

              <div>
                <h3 class="font-semibold text-sm uppercase tracking-wider text-muted mb-3">Categories</h3>
                <div class="flex flex-wrap gap-2">
                  <UBadge variant="subtle" size="sm">Tutorials</UBadge>
                  <UBadge variant="subtle" size="sm">Updates</UBadge>
                  <UBadge variant="subtle" size="sm">Guides</UBadge>
                </div>
              </div>
            </slot>
          </aside>
        </div>
      </div>

      <!-- Footer -->
      <footer class="border-t border-default py-6 text-center text-sm text-muted">
        <p>&copy; {{ new Date().getFullYear() }} Your Company. All rights reserved.</p>
      </footer>
    </div>
  </UApp>
</template>
