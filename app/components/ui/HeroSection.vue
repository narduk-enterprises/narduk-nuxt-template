<script setup lang="ts">
/**
 * HeroSection — Full-width hero banner with title, subtitle, badge, and CTAs.
 *
 * @example
 * <HeroSection
 *   title="Build Faster"
 *   highlight="Ship Today"
 *   subtitle="Production-ready Nuxt 4 template."
 *   badge="Open Source"
 *   cta-label="Get Started"
 *   cta-to="/docs"
 *   secondary-cta-label="View Demo"
 *   secondary-cta-to="/demo"
 * />
 */
withDefaults(defineProps<{
  title: string
  /** Highlighted portion of the title (renders in primary color) */
  highlight?: string
  subtitle?: string
  badge?: string
  badgeIcon?: string
  ctaLabel?: string
  ctaTo?: string
  ctaIcon?: string
  secondaryCtaLabel?: string
  secondaryCtaTo?: string
  /** Center-align the hero content (default: true) */
  centered?: boolean
}>(), {
  centered: true,
  badgeIcon: 'i-lucide-sparkles',
})
</script>

<template>
  <section :class="['py-16 sm:py-24', centered ? 'text-center' : '']">
    <div v-if="badge" class="mb-6">
      <UBadge color="primary" variant="subtle" size="lg">
        <UIcon v-if="badgeIcon" :name="badgeIcon" class="size-3.5 mr-1" />
        {{ badge }}
      </UBadge>
    </div>

    <h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
      {{ title }}
      <template v-if="highlight">
        <br>
        <span class="text-primary">{{ highlight }}</span>
      </template>
    </h1>

    <p v-if="subtitle" :class="['text-lg sm:text-xl text-muted max-w-2xl mb-10', centered ? 'mx-auto' : '']">
      {{ subtitle }}
    </p>

    <div :class="['flex flex-wrap gap-4', centered ? 'items-center justify-center' : '']">
      <UButton
        v-if="ctaLabel"
        :to="ctaTo"
        size="xl"
        :icon="ctaIcon"
      >
        {{ ctaLabel }}
      </UButton>
      <UButton
        v-if="secondaryCtaLabel"
        :to="secondaryCtaTo"
        size="xl"
        variant="soft"
        color="neutral"
      >
        {{ secondaryCtaLabel }}
      </UButton>
    </div>

    <!-- Slot for additional content below CTAs (e.g., trust badges, stats) -->
    <div v-if="$slots.default" class="mt-12">
      <slot />
    </div>
  </section>
</template>
