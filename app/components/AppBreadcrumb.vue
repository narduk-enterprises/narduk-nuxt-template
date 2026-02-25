<script setup lang="ts">
/**
 * AppBreadcrumb — Auto-generates breadcrumbs from route path.
 *
 * Uses Nuxt UI's UBreadcrumb component and integrates with the
 * useBreadcrumbSchema() composable for Schema.org structured data.
 *
 * @example
 * <!-- Just drop it into any page or layout: -->
 * <AppBreadcrumb />
 */
const route = useRoute()
const config = useRuntimeConfig()
const siteUrl = config.public.appUrl || ''

const items = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  const breadcrumbs: { label: string; to: string; icon?: string }[] = [
    { label: 'Home', to: '/', icon: 'i-lucide-home' },
  ]

  let path = ''
  for (const segment of segments) {
    path += `/${segment}`
    breadcrumbs.push({
      label: segment
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase()),
      to: path,
    })
  }

  return breadcrumbs
})

// Inject Schema.org breadcrumb structured data
const schemaItems = computed(() =>
  items.value.map(item => ({
    name: item.label,
    url: `${siteUrl}${item.to}`,
  })),
)

watchEffect(() => {
  if (schemaItems.value.length > 1) {
    useBreadcrumbSchema(schemaItems.value)
  }
})
</script>

<template>
  <nav v-if="items.length > 1" class="mb-6">
    <UBreadcrumb :items="items" />
  </nav>
</template>
