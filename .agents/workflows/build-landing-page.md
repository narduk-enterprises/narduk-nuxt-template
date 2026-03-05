---
description: Step-by-step landing page builder using Nuxt UI Pro components — hero, features, pricing, CTA, footer
---

# Build Landing Page

This workflow guides the construction of a premium landing page using Nuxt UI Pro components. Every section uses a purpose-built component — no custom div layouts needed.

> **Prerequisite:** All Pro components are included in `@nuxt/ui` v4. The app must have `@nuxt/ui` in its dependency tree (inherited from the layer).

// turbo-all

## Step 1: Layout Shell

Set up the layout in `app/layouts/default.vue` (or a dedicated `app/layouts/marketing.vue`):

```vue
<template>
  <UApp>
    <UHeader :links="navLinks">
      <template #logo>
        <NuxtImg src="/logo.svg" alt="App Name" class="h-8" />
      </template>
      <template #right>
        <UColorModeButton />
        <UButton to="/login" label="Sign In" variant="ghost" />
        <UButton to="/register" label="Get Started" color="primary" />
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>

    <UFooter>
      <template #left>
        <span class="text-sm text-muted">© {{ new Date().getFullYear() }} App Name</span>
      </template>
      <template #center>
        <UFooterColumns :columns="footerColumns" />
      </template>
    </UFooter>
  </UApp>
</template>
```

**Key points:**

- `UHeader` auto-handles mobile hamburger menu
- `UFooter` + `UFooterColumns` provides organized link columns
- `UMain` fills viewport height between header and footer
- Wrap in `<ClientOnly>` if `UColorModeButton` causes hydration warnings

---

## Step 2: Hero Section

Build the hero in `app/pages/index.vue`:

```vue
<UPageHero
  title="Your Compelling Headline"
  description="A clear value proposition that explains what your product does and why it matters."
  :links="[
    {
      label: 'Get Started',
      to: '/register',
      color: 'primary',
      size: 'xl',
      icon: 'i-lucide-arrow-right',
      trailing: true,
    },
    { label: 'Learn More', to: '#features', color: 'neutral', variant: 'outline', size: 'xl' },
  ]"
>
  <template #top>
    <UBadge label="Now in Beta" variant="subtle" class="mb-4" />
  </template>
</UPageHero>
```

**Options:** The hero accepts `orientation` (`horizontal` for split layout with image), `#default` slot for custom content below links, and `#top`/`#bottom` slots.

---

## Step 3: Social Proof / Logos

```vue
<UPageSection>
  <UPageLogos title="Trusted by" :logos="[
    { src: '/logos/company-a.svg', alt: 'Company A' },
    { src: '/logos/company-b.svg', alt: 'Company B' },
  ]" />
</UPageSection>
```

Alternative: Use `UMarquee` for infinite scrolling logos.

---

## Step 4: Features Grid

```vue
<UPageSection title="Everything you need" description="Built for speed, security, and scale.">
  <UPageGrid>
    <UPageCard
      v-for="feature in features"
      :key="feature.title"
      :title="feature.title"
      :description="feature.description"
      :icon="feature.icon"
    />
  </UPageGrid>
</UPageSection>
```

For larger feature showcases with images:

```vue
<UPageSection>
  <UPageFeature
    title="Lightning Fast"
    description="Deploys to the edge in seconds."
    icon="i-lucide-zap"
    orientation="horizontal"
  >
    <NuxtImg src="/images/feature-speed.webp" alt="Speed demo" />
  </UPageFeature>
</UPageSection>
```

**Component choice guide:**

- `UPageCard` — compact feature card (icon + title + description)
- `UPageFeature` — full-width feature section with image (ideal for alternating left/right layouts)
- `UPageGrid` — responsive grid (auto-adjusts columns)
- `UPageColumns` — explicit column count control

---

## Step 5: Pricing

```vue
<UPageSection title="Simple, transparent pricing">
  <UPricingPlans>
    <UPricingPlan
      title="Free"
      description="For individuals"
      price="$0"
      cycle="/month"
      :features="['5 projects', 'Basic analytics', 'Community support']"
      :button="{ label: 'Get Started', color: 'neutral', variant: 'outline' }"
    />
    <UPricingPlan
      title="Pro"
      description="For teams"
      price="$19"
      cycle="/month"
      highlight
      :features="['Unlimited projects', 'Advanced analytics', 'Priority support', 'Custom domains']"
      :button="{ label: 'Start Free Trial', color: 'primary' }"
    />
  </UPricingPlans>
</UPageSection>
```

For feature comparison tables, use `UPricingTable` instead.

---

## Step 6: Testimonials

```vue
<UPageSection title="What our users say">
  <UPageColumns :columns="3">
    <UCard v-for="t in testimonials" :key="t.name">
      <p class="text-muted italic">"{{ t.quote }}"</p>
      <template #footer>
        <UUser :name="t.name" :description="t.role" :avatar="{ src: t.avatar }" />
      </template>
    </UCard>
  </UPageColumns>
</UPageSection>
```

---

## Step 7: Call to Action

```vue
<UPageCTA
  title="Ready to get started?"
  description="Join thousands of users building amazing products."
  :links="[
    { label: 'Start Free', to: '/register', color: 'primary', size: 'xl' },
    { label: 'Contact Sales', to: '/contact', color: 'neutral', variant: 'outline', size: 'xl' },
  ]"
/>
```

---

## Step 8: SEO & Brand Integration

1. Call `useSeo()` with rich, keyword-optimized title and description
2. Call `useWebPageSchema()` for structured data
3. Generate a custom OG image for the landing page
4. Verify heading hierarchy: `<h1>` in hero, `<h2>` for section titles

---

## Step 9: Brand Identity

After the page structure is built, run `/generate-brand-identity` to apply:

- Theme colors (primary + neutral)
- Typography (display + body fonts)
- Logo and favicon generation
- Dark mode polish
- Motion and micro-animations

---

## Step 10: Verification

1. Start dev server: `pnpm run dev`
2. Check desktop and mobile views (resize browser or use DevTools)
3. Toggle dark mode — verify all sections look intentional
4. Run `/check-ui-styling` and `/check-seo-compliance`
5. Take screenshots for the user

---

## Pro Component Quick Reference

| Component        | Purpose                 | Key Props                                                    |
| ---------------- | ----------------------- | ------------------------------------------------------------ |
| `UPageHero`      | Hero section            | `title`, `description`, `links`, `orientation`               |
| `UPageSection`   | Content section wrapper | `title`, `description`, `headline`                           |
| `UPageFeature`   | Feature with image      | `title`, `description`, `icon`, `orientation`                |
| `UPageCTA`       | Call to action          | `title`, `description`, `links`                              |
| `UPageCard`      | Feature card            | `title`, `description`, `icon`, `to`                         |
| `UPageGrid`      | Responsive grid         | Default slot                                                 |
| `UPageColumns`   | Column layout           | `columns` (number)                                           |
| `UPageLogos`     | Logo strip              | `title`, `logos`                                             |
| `UPricingPlans`  | Pricing grid            | Default slot for `UPricingPlan`                              |
| `UPricingPlan`   | Single plan             | `title`, `price`, `cycle`, `features`, `button`, `highlight` |
| `UHeader`        | Navigation bar          | `links`, logo/right slots                                    |
| `UFooter`        | Page footer             | left/center/right slots                                      |
| `UFooterColumns` | Footer link columns     | `columns`                                                    |
