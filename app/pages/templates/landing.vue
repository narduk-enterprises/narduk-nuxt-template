<script setup lang="ts">
/**
 * TEMPLATE: Landing Page
 *
 * A complete landing page assembled from composite components.
 * Copy this file and customize the content.
 */

useSeo({
  title: 'Landing Page Template',
  description: 'A beautiful landing page template with hero, features, testimonials, and CTA.',
  ogImage: { title: 'Landing Page', description: 'Template with all sections', icon: '🚀' },
})
useWebPageSchema({ name: 'Landing Page Template' })

const features = [
  { icon: 'i-lucide-zap', title: 'Lightning Fast', description: 'Built on V8 isolates at the edge. No cold starts, sub-50ms responses worldwide.' },
  { icon: 'i-lucide-shield-check', title: 'Enterprise Security', description: 'CSRF protection, rate limiting, and Web Crypto auth out of the box.' },
  { icon: 'i-lucide-palette', title: 'Beautiful by Default', description: 'Nuxt UI 4 components with dark mode and customizable themes.' },
  { icon: 'i-lucide-database', title: 'Edge Database', description: 'Cloudflare D1 with Drizzle ORM — SQL at the edge with zero config.' },
  { icon: 'i-lucide-search', title: 'SEO Optimized', description: 'Auto sitemaps, OG images, Schema.org, and per-page meta built in.' },
  { icon: 'i-lucide-code', title: 'TypeScript Native', description: 'End-to-end type safety from database schema to UI components.' },
]

const testimonials = [
  { quote: 'We shipped our SaaS in half the time using this template. The edge auth and D1 integration saved us weeks.', author: 'Sarah Chen', role: 'CTO at LaunchPad' },
  { quote: 'The SEO system alone is worth it. Our blog posts ranked in the first week.', author: 'Mike Rivera', role: 'Growth Lead at Scale' },
  { quote: 'Finally a Nuxt template that actually works on Cloudflare Workers. No more Node.js compatibility headaches.', author: 'Emma Yang', role: 'Full-Stack Developer' },
]
</script>

<template>
  <div class="space-y-20 pb-20">
    <UiHeroSection
      title="Build Your Next App"
      highlight="At The Edge"
      subtitle="A production-ready Nuxt 4 template with everything you need. Auth, database, SEO, and beautiful UI — all running on Cloudflare Workers."
      badge="Production-Ready Template"
      cta-label="Get Started"
      cta-to="#features"
      cta-icon="i-lucide-arrow-right"
      secondary-cta-label="View Source"
      secondary-cta-to="https://github.com"
    />

    <UiFeatureGrid
      id="features"
      title="Everything You Need"
      subtitle="Skip the boilerplate. Every feature is edge-compatible and production-tested."
      :features="features"
    />

    <UiTestimonialCarousel
      title="Trusted by Developers"
      :testimonials="testimonials"
    />

    <UiCTABanner
      title="Ready to build?"
      description="Clone the template and deploy to Cloudflare Workers in under 5 minutes."
      cta-label="Start Building"
      cta-to="/signup"
      cta-icon="i-lucide-rocket"
      variant="gradient"
    />
  </div>
</template>
