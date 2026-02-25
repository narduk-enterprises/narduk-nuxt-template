<script setup lang="ts">
/**
 * Dashboard layout — Sidebar navigation + top bar.
 *
 * Usage: Add `definePageMeta({ layout: 'dashboard' })` to any page.
 * Great for admin panels, settings, and app interiors.
 */
const colorMode = useColorMode()
const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const sidebarOpen = ref(true)

const sidebarLinks = [
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', to: '/dashboard' },
  { label: 'Analytics', icon: 'i-lucide-bar-chart-3', to: '/dashboard/analytics' },
  { label: 'Users', icon: 'i-lucide-users', to: '/dashboard/users' },
  { label: 'Settings', icon: 'i-lucide-settings', to: '/dashboard/settings' },
]
</script>

<template>
  <UApp>
    <div class="min-h-screen flex">
      <!-- Sidebar -->
      <aside
        :class="[
          'fixed inset-y-0 left-0 z-40 flex flex-col border-r border-default bg-default transition-all duration-200',
          sidebarOpen ? 'w-60' : 'w-16',
        ]"
      >
        <!-- Logo -->
        <div class="h-14 flex items-center px-4 border-b border-default">
          <NuxtLink to="/" class="font-display font-bold text-lg truncate">
            <span class="text-primary">N4</span>
            <span v-if="sidebarOpen"> App</span>
          </NuxtLink>
        </div>

        <!-- Nav links -->
        <nav class="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          <NuxtLink
            v-for="link in sidebarLinks"
            :key="link.to"
            :to="link.to"
            :class="[
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
              'text-muted hover:text-default hover:bg-elevated',
              sidebarOpen ? '' : 'justify-center',
            ]"
            active-class="!text-primary bg-primary/10"
          >
            <UIcon :name="link.icon" class="size-5 shrink-0" />
            <span v-if="sidebarOpen">{{ link.label }}</span>
          </NuxtLink>
        </nav>

        <!-- Collapse toggle -->
        <div class="p-2 border-t border-default">
          <UButton
            :icon="sidebarOpen ? 'i-lucide-panel-left-close' : 'i-lucide-panel-left-open'"
            variant="ghost"
            color="neutral"
            size="sm"
            :class="sidebarOpen ? 'w-full' : 'mx-auto'"
            @click="sidebarOpen = !sidebarOpen"
          />
        </div>
      </aside>

      <!-- Main area -->
      <div :class="['flex-1 flex flex-col transition-all duration-200', sidebarOpen ? 'ml-60' : 'ml-16']">
        <!-- Top bar -->
        <header class="sticky top-0 z-30 h-14 flex items-center justify-between px-6 border-b border-default bg-default/80 backdrop-blur-lg">
          <div>
            <AppBreadcrumb />
          </div>

          <div class="flex items-center gap-2">
            <UButton
              :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
              variant="ghost"
              color="neutral"
              size="sm"
              @click="toggleTheme"
            />
            <UAvatar text="AD" size="sm" />
          </div>
        </header>

        <!-- Page content -->
        <main class="flex-1 p-6">
          <slot />
        </main>
      </div>
    </div>
  </UApp>
</template>
