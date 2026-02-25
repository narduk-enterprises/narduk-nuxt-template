<script setup lang="ts">
/**
 * CTABanner — Call-to-action banner section.
 *
 * @example
 * <CTABanner
 *   title="Ready to get started?"
 *   description="Deploy your app to the edge in minutes."
 *   cta-label="Start Building"
 *   cta-to="/signup"
 * />
 */
withDefaults(defineProps<{
  title: string
  description?: string
  ctaLabel: string
  ctaTo?: string
  ctaIcon?: string
  secondaryCtaLabel?: string
  secondaryCtaTo?: string
  /** Visual variant */
  variant?: 'default' | 'gradient' | 'subtle'
}>(), {
  variant: 'default',
})
</script>

<template>
  <section
    :class="[
      'rounded-2xl px-8 py-12 sm:py-16 text-center',
      variant === 'gradient' ? 'bg-linear-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20' : '',
      variant === 'subtle' ? 'bg-elevated' : '',
      variant === 'default' ? 'bg-elevated border border-default' : '',
    ]"
  >
    <h2 class="font-display text-2xl sm:text-3xl font-bold mb-3">{{ title }}</h2>
    <p v-if="description" class="text-muted max-w-xl mx-auto mb-8">{{ description }}</p>

    <div class="flex flex-wrap items-center justify-center gap-4">
      <UButton :to="ctaTo" size="xl" :icon="ctaIcon">
        {{ ctaLabel }}
      </UButton>
      <UButton
        v-if="secondaryCtaLabel"
        :to="secondaryCtaTo"
        size="xl"
        variant="outline"
        color="neutral"
      >
        {{ secondaryCtaLabel }}
      </UButton>
    </div>
  </section>
</template>
