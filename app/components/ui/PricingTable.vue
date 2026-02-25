<script setup lang="ts">
/**
 * PricingTable — Pricing cards with highlight support.
 *
 * @example
 * <PricingTable
 *   title="Simple Pricing"
 *   :plans="[
 *     { name: 'Free', price: 0, period: '/mo', features: ['1 project', '1GB storage'], ctaLabel: 'Get Started', ctaTo: '/signup' },
 *     { name: 'Pro', price: 29, period: '/mo', features: ['Unlimited projects', '100GB'], ctaLabel: 'Start Trial', ctaTo: '/signup', highlighted: true },
 *   ]"
 * />
 */
export interface PricingPlan {
  name: string
  price: number | string
  period?: string
  description?: string
  features: string[]
  ctaLabel: string
  ctaTo?: string
  highlighted?: boolean
}

withDefaults(defineProps<{
  title?: string
  subtitle?: string
  plans: PricingPlan[]
}>(), {})
</script>

<template>
  <section>
    <div v-if="title || subtitle" class="text-center mb-10">
      <h2 v-if="title" class="font-display text-2xl sm:text-3xl font-bold mb-3">{{ title }}</h2>
      <p v-if="subtitle" class="text-muted max-w-lg mx-auto">{{ subtitle }}</p>
    </div>

    <div
      :class="[
        'grid gap-6 items-start',
        plans.length === 2 ? 'sm:grid-cols-2 max-w-3xl mx-auto' : '',
        plans.length === 3 ? 'sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto' : '',
        plans.length >= 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : '',
      ]"
    >
      <UCard
        v-for="plan in plans"
        :key="plan.name"
        :class="[
          'relative transition-shadow',
          plan.highlighted ? 'ring-2 ring-primary shadow-xl scale-[1.02]' : 'hover:shadow-lg',
        ]"
      >
        <div class="space-y-6">
          <!-- Badge for highlighted plan -->
          <UBadge v-if="plan.highlighted" color="primary" variant="subtle" size="sm" class="absolute -top-3 left-1/2 -translate-x-1/2">
            Most Popular
          </UBadge>

          <!-- Plan header -->
          <div>
            <h3 class="font-semibold text-lg mb-1">{{ plan.name }}</h3>
            <p v-if="plan.description" class="text-sm text-muted">{{ plan.description }}</p>
          </div>

          <!-- Price -->
          <div class="flex items-baseline gap-1">
            <span class="font-display text-4xl font-bold">
              {{ typeof plan.price === 'number' ? (plan.price === 0 ? 'Free' : `$${plan.price}`) : plan.price }}
            </span>
            <span v-if="plan.period && plan.price !== 0" class="text-muted text-sm">{{ plan.period }}</span>
          </div>

          <!-- Features -->
          <ul class="space-y-2.5">
            <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2 text-sm">
              <UIcon name="i-lucide-check" class="size-4 text-primary shrink-0 mt-0.5" />
              <span>{{ feature }}</span>
            </li>
          </ul>

          <!-- CTA -->
          <UButton
            :to="plan.ctaTo"
            :variant="plan.highlighted ? 'solid' : 'outline'"
            :color="plan.highlighted ? 'primary' : 'neutral'"
            block
            size="lg"
          >
            {{ plan.ctaLabel }}
          </UButton>
        </div>
      </UCard>
    </div>
  </section>
</template>
