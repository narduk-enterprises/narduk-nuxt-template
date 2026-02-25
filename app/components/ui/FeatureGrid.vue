<script setup lang="ts">
/**
 * FeatureGrid — Responsive grid of feature cards with icons.
 *
 * @example
 * <FeatureGrid
 *   title="Why Choose Us"
 *   subtitle="Everything you need to succeed."
 *   :features="[
 *     { icon: 'i-lucide-rocket', title: 'Fast', description: 'Blazing speed.' },
 *     { icon: 'i-lucide-shield', title: 'Secure', description: 'Built-in auth.' },
 *   ]"
 * />
 */
export interface Feature {
  icon: string
  title: string
  description: string
  color?: string
}

withDefaults(defineProps<{
  title?: string
  subtitle?: string
  features: Feature[]
  columns?: 2 | 3 | 4
}>(), {
  columns: 3,
})
</script>

<template>
  <section>
    <div v-if="title || subtitle" class="text-center mb-10">
      <h2 v-if="title" class="font-display text-2xl sm:text-3xl font-bold mb-3">{{ title }}</h2>
      <p v-if="subtitle" class="text-muted max-w-lg mx-auto">{{ subtitle }}</p>
    </div>

    <div
      :class="[
        'grid gap-6',
        columns === 2 ? 'sm:grid-cols-2' : '',
        columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : '',
        columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : '',
      ]"
    >
      <UCard v-for="feature in features" :key="feature.title" class="group hover:shadow-lg transition-shadow">
        <div class="space-y-3">
          <UIcon
            :name="feature.icon"
            :class="[feature.color || 'text-primary', 'size-8 transition-transform group-hover:scale-110']"
          />
          <h3 class="font-semibold text-lg">{{ feature.title }}</h3>
          <p class="text-sm text-muted leading-relaxed">{{ feature.description }}</p>
        </div>
      </UCard>
    </div>
  </section>
</template>
