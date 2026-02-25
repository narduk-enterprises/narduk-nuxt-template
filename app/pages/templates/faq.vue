<script setup lang="ts">
/**
 * TEMPLATE: FAQ Page
 *
 * Standalone FAQ page with Schema.org structured data.
 */
useSeo({
  title: 'FAQ',
  description: 'Frequently asked questions about our product and services.',
  ogImage: { title: 'FAQ', description: 'Frequently asked questions', icon: '❓' },
})
useWebPageSchema({ name: 'FAQ', type: 'FAQPage' })

const categories = [
  {
    title: 'General',
    questions: [
      { question: 'What is this template?', answer: 'A production-ready Nuxt 4 starter template with authentication, D1 database, SEO, and Cloudflare Workers deployment — all pre-configured.' },
      { question: 'Is it free?', answer: 'Yes, this template is completely free and open-source. Use it for personal or commercial projects.' },
      { question: 'Do I need a Cloudflare account?', answer: 'Yes, you need a free Cloudflare account to deploy. Cloudflare Workers has a generous free tier with 100,000 requests per day.' },
    ],
  },
  {
    title: 'Technical',
    questions: [
      { question: 'Can I use a different database?', answer: 'The template is designed for Cloudflare D1, but you can swap to any edge-compatible database. Drizzle ORM supports many SQL databases.' },
      { question: 'Does it support SSR?', answer: 'Yes! The template runs as a Cloudflare Worker with full server-side rendering. Pages are rendered at the edge, close to your users.' },
      { question: 'Can I use Node.js libraries?', answer: 'Cloudflare Workers run on V8 isolates, not Node.js. Most browser-compatible libraries work fine, but Node.js-specific ones (like fs, crypto) will not. We provide edge-compatible alternatives.' },
    ],
  },
]

// Flatten for Schema.org
const allFaqs = categories.flatMap(c => c.questions)
useFAQSchema(allFaqs)
</script>

<template>
  <div class="space-y-16 pb-20">
    <UiHeroSection
      title="Frequently Asked Questions"
      subtitle="Can't find what you're looking for? Reach out to our support team."
      badge="FAQ"
      badge-icon="i-lucide-help-circle"
    />

    <div class="max-w-3xl mx-auto space-y-10">
      <section v-for="category in categories" :key="category.title">
        <h2 class="font-display text-xl font-bold mb-4">{{ category.title }}</h2>
        <UAccordion
          :items="category.questions.map(q => ({ label: q.question, content: q.answer }))"
        />
      </section>
    </div>

    <UiCTABanner
      title="Still have questions?"
      description="Our team is here to help."
      cta-label="Contact Support"
      cta-to="/templates/contact"
      variant="subtle"
    />
  </div>
</template>
