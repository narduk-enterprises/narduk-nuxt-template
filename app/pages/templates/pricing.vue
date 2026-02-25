<script setup lang="ts">
/**
 * TEMPLATE: Pricing Page
 *
 * Pricing page with plan comparison and FAQ.
 */
useSeo({
  title: 'Pricing',
  description: 'Simple, transparent pricing. No hidden fees.',
  ogImage: { title: 'Pricing', description: 'Simple transparent pricing', icon: '💰' },
})
useWebPageSchema({ name: 'Pricing' })

const plans = [
  {
    name: 'Starter',
    price: 0,
    period: '/mo',
    description: 'Perfect for side projects.',
    features: ['1 project', '10K requests/mo', '1GB storage', 'Community support'],
    ctaLabel: 'Get Started Free',
    ctaTo: '/signup',
  },
  {
    name: 'Pro',
    price: 29,
    period: '/mo',
    description: 'For growing businesses.',
    features: ['Unlimited projects', '1M requests/mo', '100GB storage', 'Priority support', 'Custom domains', 'Analytics'],
    ctaLabel: 'Start Free Trial',
    ctaTo: '/signup?plan=pro',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large-scale deployments.',
    features: ['Everything in Pro', 'Unlimited requests', '1TB+ storage', '24/7 dedicated support', 'SLA guarantee', 'SSO & RBAC'],
    ctaLabel: 'Contact Sales',
    ctaTo: '/templates/contact',
  },
]

const faqs = [
  { question: 'Can I cancel anytime?', answer: 'Yes, you can cancel your subscription at any time. No lock-in contracts.' },
  { question: 'Is there a free trial?', answer: 'Yes! Pro plans include a 14-day free trial. No credit card required.' },
  { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.' },
  { question: 'Do you offer refunds?', answer: 'We offer a 30-day money-back guarantee on all paid plans.' },
]

// Inject FAQ structured data for rich snippets
useFAQSchema(faqs)
</script>

<template>
  <div class="space-y-20 pb-20">
    <UiHeroSection
      title="Simple Pricing"
      subtitle="Start free, scale as you grow. No hidden fees, no surprises."
      badge="Pricing"
      badge-icon="i-lucide-tag"
    />

    <UiPricingTable :plans="plans" />

    <!-- FAQ Section -->
    <section>
      <h2 class="font-display text-2xl sm:text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div class="max-w-2xl mx-auto">
        <UAccordion
          :items="faqs.map(faq => ({ label: faq.question, content: faq.answer }))"
        />
      </div>
    </section>

    <UiCTABanner
      title="Still have questions?"
      description="Our team is happy to help. Reach out anytime."
      cta-label="Contact Us"
      cta-to="/templates/contact"
      secondary-cta-label="Start Free"
      secondary-cta-to="/signup"
      variant="gradient"
    />
  </div>
</template>
