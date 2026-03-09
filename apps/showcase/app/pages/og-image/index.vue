<script setup lang="ts">
/**
 * OG Image Examples — Single-page exhaustive showcase of every OG component.
 *
 * Each section calls defineOgImage() with a different component + key prefix
 * so every variant gets a live preview rendered by the Takumi renderer.
 */

// ─── Example 1: Playground (query-driven) ────────────────────────────
const playgroundPaths = defineOgImage(
  'OgPlaygroundTakumi',
  {
    title: 'Edge OG Image',
    description: 'Generated from URL query params with accent colors',
    accent: '#0ea5e9', // eslint-disable-line narduk/no-inline-hex
    badge: 'Query Driven',
  },
  [{ key: 'playground-og' }, { key: 'playground-square', width: 800, height: 800 }],
)

// ─── Example 2: Playground variant (different props) ─────────────────
const playgroundVariantPaths = defineOgImage(
  'OgPlaygroundTakumi',
  {
    title: 'Nuxt SEO Cards',
    description: 'Multi-size OG images for social platforms',
    accent: '#f59e0b', // eslint-disable-line narduk/no-inline-hex
    badge: 'Variant',
  },
  [{ key: 'playground-variant-og' }],
)

// ─── Example 3: Article Card (app-level component) ───────────────────
const articleCardPaths = defineOgImage(
  'OgArticleCardTakumi',
  {
    title: 'Cloudflare Workers OG',
    excerpt: 'Article-style social cards rendered at the edge with route params.',
    category: 'Engineering',
  },
  [{ key: 'article-card-og' }],
)

// ─── Example 4: Article Card variant ─────────────────────────────────
const articleCardVariantPaths = defineOgImage(
  'OgArticleCardTakumi',
  {
    title: 'Nuxt OG Image v6',
    excerpt: 'Release notes — the new defineOgImage API with renderer suffixes.',
    category: 'Release Notes',
  },
  [{ key: 'article-card-variant-og' }],
)

// ─── Example 5: Default layer component ──────────────────────────────
const defaultPaths = defineOgImage(
  'DefaultTakumi',
  {
    title: 'Nuxt 4 Template',
    description: 'Production-ready Nuxt 4 + Cloudflare Workers',
    icon: '✨',
    siteName: 'Nuxt 4 Demo',
    primaryColor: '#10b981', // eslint-disable-line narduk/no-inline-hex
  },
  [{ key: 'default-og' }],
)

// ─── Example 6: Default layer variant (custom branding) ──────────────
const defaultVariantPaths = defineOgImage(
  'DefaultTakumi',
  {
    title: 'Custom Brand Card',
    description: 'Override primaryColor and icon for your app identity',
    icon: '🚀',
    siteName: 'My SaaS App',
    primaryColor: '#8b5cf6', // eslint-disable-line narduk/no-inline-hex
  },
  [{ key: 'default-variant-og' }],
)

// ─── Example 7: Layer article component ──────────────────────────────
const layerArticlePaths = defineOgImage(
  'ArticleTakumi',
  {
    title: 'Building with Nuxt Layers',
    description: 'Share OG templates across projects with Nuxt layer architecture.',
    category: 'Tutorial',
    primaryColor: '#ec4899', // eslint-disable-line narduk/no-inline-hex
  },
  [{ key: 'layer-article-og' }],
)

// Keep server-generated OG URLs stable across hydration.
const allPreviews = useState('og-examples-previews', () => ({
  playground: playgroundPaths,
  playgroundVariant: playgroundVariantPaths,
  articleCard: articleCardPaths,
  articleCardVariant: articleCardVariantPaths,
  default: defaultPaths,
  defaultVariant: defaultVariantPaths,
  layerArticle: layerArticlePaths,
}))

useSeo({
  title: 'OG Image Examples',
  description:
    'Exhaustive showcase of every OG image component — Playground, Article Card, Default, and layer variants rendered at the edge.',
})

useWebPageSchema({
  name: 'OG Image Examples',
  description: 'Exhaustive showcase of dynamic OG image generation on Cloudflare Workers.',
})

const examples = computed(() => [
  {
    id: 'playground',
    label: 'Playground — Query Driven',
    component: 'OgPlayground.takumi.vue',
    source: 'app',
    description:
      'A general-purpose social card with accent color, badge, and gradient orb. Designed for query-param driven OG generation — update the URL to produce new cards on the fly.',
    props: {
      title: 'Edge OG Image',
      description: 'Generated from URL query params...',
      // eslint-disable-next-line narduk/no-inline-hex
      accent: '#0ea5e9',
      badge: 'Query Driven',
    },
    paths: allPreviews.value.playground,
    dimensions: '1200×600 + 800×800 square',
  },
  {
    id: 'playground-variant',
    label: 'Playground — Amber Variant',
    component: 'OgPlayground.takumi.vue',
    source: 'app',
    description:
      'Same Playground component with a different accent color and badge text. Demonstrates how a single component produces visually distinct cards via props.',
    // eslint-disable-next-line narduk/no-inline-hex
    props: { title: 'Nuxt SEO Cards', accent: '#f59e0b', badge: 'Variant' },
    paths: allPreviews.value.playgroundVariant,
    dimensions: '1200×600',
  },
  {
    id: 'article-card',
    label: 'Article Card — Engineering',
    component: 'OgArticleCard.takumi.vue',
    source: 'app',
    description:
      'An article/blog-post social card with a category badge, headline, and excerpt. Ideal for route-driven OG where title and excerpt come from CMS content.',
    props: { title: 'Cloudflare Workers OG', category: 'Engineering' },
    paths: allPreviews.value.articleCard,
    dimensions: '1200×630',
  },
  {
    id: 'article-card-variant',
    label: 'Article Card — Release Notes',
    component: 'OgArticleCard.takumi.vue',
    source: 'app',
    description:
      'Article card with a "Release Notes" category badge. Shows how the same template adapts to different content types.',
    props: { title: 'Nuxt OG Image v6', category: 'Release Notes' },
    paths: allPreviews.value.articleCardVariant,
    dimensions: '1200×630',
  },
  {
    id: 'default',
    label: 'Default — Layer Template',
    component: 'OgImageDefault.takumi.vue',
    source: 'layer',
    description:
      'The default OG image provided by the Nuxt layer. Features an emoji icon, gradient accent bar at the bottom, and a radial glow in the brand color. Used automatically by useSeo() when no type-specific template exists.',
    // eslint-disable-next-line narduk/no-inline-hex
    props: { title: 'Nuxt 4 Template', icon: '✨', primaryColor: '#10b981' },
    paths: allPreviews.value.default,
    dimensions: '1200×630',
  },
  {
    id: 'default-variant',
    label: 'Default — Custom Branding',
    component: 'OgImageDefault.takumi.vue',
    source: 'layer',
    description:
      'Same default layer template, rebranded with a purple accent and rocket icon. Override primaryColor, icon, and siteName to match your app.',
    // eslint-disable-next-line narduk/no-inline-hex
    props: { title: 'Custom Brand Card', icon: '🚀', primaryColor: '#8b5cf6' },
    paths: allPreviews.value.defaultVariant,
    dimensions: '1200×630',
  },
  {
    id: 'layer-article',
    label: 'Article — Layer Template',
    component: 'OgImageArticle.takumi.vue',
    source: 'layer',
    description:
      'The article OG image provided by the Nuxt layer. Automatically selected by useSeo() when type is "article". Includes a category badge, headline, and the N4 brand mark.',
    // eslint-disable-next-line narduk/no-inline-hex
    props: { title: 'Building with Nuxt Layers', category: 'Tutorial', primaryColor: '#ec4899' },
    paths: allPreviews.value.layerArticle,
    dimensions: '1200×630',
  },
])
</script>

<template>
  <div class="space-y-10 py-10">
    <header class="space-y-4 max-w-3xl">
      <div class="flex items-center gap-4">
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight">OG Image Examples</h1>
      </div>
      <p class="text-lg text-muted">
        Every OG image component available in this template — both app-level and layer-level —
        rendered live by <code>nuxt-og-image v6</code> on Cloudflare Workers using the Takumi
        renderer.
      </p>
      <NuxtLink to="/" class="text-sm text-muted hover:text-primary transition-colors inline-block">
        ← Back to Showcase
      </NuxtLink>
    </header>

    <!-- Component overview -->
    <UCard>
      <template #header>
        <h2 class="font-semibold text-lg">Available Components</h2>
      </template>

      <div class="grid gap-4 sm:grid-cols-2">
        <div class="p-3 rounded-lg border border-default space-y-1">
          <div class="font-medium">App-Level</div>
          <div class="text-sm text-muted">
            <code>OgPlayground.takumi.vue</code> — general-purpose query-driven card
          </div>
          <div class="text-sm text-muted">
            <code>OgArticleCard.takumi.vue</code> — article/blog-post card
          </div>
        </div>
        <div class="p-3 rounded-lg border border-default space-y-1">
          <div class="font-medium">Layer-Level</div>
          <div class="text-sm text-muted">
            <code>OgImageDefault.takumi.vue</code> — default card with icon and brand bar
          </div>
          <div class="text-sm text-muted">
            <code>OgImageArticle.takumi.vue</code> — article card with category badge
          </div>
        </div>
      </div>
    </UCard>

    <!-- Each example rendered with live previews -->
    <UCard v-for="example in examples" :key="example.id">
      <template #header>
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <h2 class="font-semibold text-lg">
            {{ example.label }}
          </h2>
          <UBadge
            :color="example.source === 'layer' ? 'info' : 'success'"
            variant="subtle"
            :label="example.source === 'layer' ? 'Layer' : 'App'"
          />
        </div>
      </template>

      <div class="space-y-4">
        <p class="text-sm text-muted">
          {{ example.description }}
        </p>

        <!-- Props table -->
        <div class="text-sm">
          <div class="font-medium mb-2">Props</div>
          <div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-muted">
            <template v-for="(value, key) in example.props" :key="key">
              <code class="text-xs">{{ key }}</code>
              <span class="text-xs">{{ value }}</span>
            </template>
          </div>
        </div>

        <!-- Component + dimensions -->
        <div class="flex gap-4 flex-wrap text-xs text-muted">
          <span
            ><strong>Component:</strong> <code>{{ example.component }}</code></span
          >
          <span><strong>Dimensions:</strong> {{ example.dimensions }}</span>
        </div>

        <!-- Live-rendered previews -->
        <div class="grid gap-4" :class="example.paths.length > 1 ? 'md:grid-cols-2' : ''">
          <div
            v-for="(path, idx) in example.paths"
            :key="path"
            class="rounded-lg border border-default p-3 space-y-3"
          >
            <div class="font-medium text-sm">Variant {{ idx + 1 }}</div>
            <NuxtImg
              :src="path"
              :alt="`${example.label} OG image preview - variant ${idx + 1}`"
              width="1200"
              height="630"
              class="w-full rounded-md border border-default bg-elevated"
            />
            <code class="block text-xs break-all text-muted">{{ path }}</code>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
