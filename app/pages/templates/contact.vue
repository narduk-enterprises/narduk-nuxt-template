<script setup lang="ts">
/**
 * TEMPLATE: Contact Page
 *
 * Contact page with form and additional contact info.
 */
useSeo({
  title: 'Contact',
  description: 'Get in touch with us. We\'d love to hear from you.',
  ogImage: { title: 'Contact Us', description: 'Get in touch', icon: '📧' },
})
useWebPageSchema({ name: 'Contact', type: 'ContactPage' })

const contactInfo = [
  { icon: 'i-lucide-mail', title: 'Email', description: 'hello@example.com' },
  { icon: 'i-lucide-map-pin', title: 'Office', description: '123 Main St, Anytown, TX 75001' },
  { icon: 'i-lucide-clock', title: 'Hours', description: 'Mon-Fri, 9am-5pm CST' },
]
</script>

<template>
  <div class="space-y-16 pb-20">
    <UiHeroSection
      title="Get in Touch"
      subtitle="Have a question or want to work together? We'd love to hear from you."
      badge="Contact"
      badge-icon="i-lucide-mail"
    />

    <div class="grid lg:grid-cols-[1fr_380px] gap-12 items-start">
      <UiContactForm
        title="Send us a message"
        description="Fill out the form below and we'll get back to you within 24 hours."
      />

      <div class="space-y-6">
        <UCard v-for="info in contactInfo" :key="info.title">
          <div class="flex items-start gap-4">
            <UIcon :name="info.icon" class="size-6 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 class="font-semibold mb-1">{{ info.title }}</h3>
              <p class="text-sm text-muted">{{ info.description }}</p>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
