<script setup lang="ts">
import { z } from 'zod'

/**
 * ContactForm — Ready-to-use contact form with Zod validation.
 *
 * @example
 * <ContactForm
 *   title="Get in Touch"
 *   description="We'd love to hear from you."
 *   endpoint="/api/contact"
 * />
 */
withDefaults(defineProps<{
  title?: string
  description?: string
  /** API endpoint to submit the form to */
  endpoint?: string
  submitLabel?: string
}>(), {
  title: 'Contact Us',
  submitLabel: 'Send Message',
})

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

const { state, errors, loading, submit, reset } = useFormHandler({
  schema,
  defaults: { name: '', email: '', subject: '', message: '' },
  endpoint: '/api/contact',
  successMessage: 'Your message has been sent! We\'ll get back to you soon.',
  onSuccess: () => reset(),
})
</script>

<template>
  <section>
    <div v-if="title || description" class="mb-8">
      <h2 v-if="title" class="font-display text-2xl sm:text-3xl font-bold mb-3">{{ title }}</h2>
      <p v-if="description" class="text-muted max-w-lg">{{ description }}</p>
    </div>

    <UCard>
      <form class="space-y-5" @submit.prevent="submit">
        <div class="grid sm:grid-cols-2 gap-5">
          <UFormField label="Name" :error="errors.name" required>
            <UInput v-model="state.name" placeholder="Your name" icon="i-lucide-user" />
          </UFormField>
          <UFormField label="Email" :error="errors.email" required>
            <UInput v-model="state.email" type="email" placeholder="you@example.com" icon="i-lucide-mail" />
          </UFormField>
        </div>

        <UFormField label="Subject" :error="errors.subject" required>
          <UInput v-model="state.subject" placeholder="What is this about?" icon="i-lucide-message-square" />
        </UFormField>

        <UFormField label="Message" :error="errors.message" required>
          <UTextarea v-model="state.message" :rows="5" placeholder="Tell us what you need..." />
        </UFormField>

        <div class="flex justify-end">
          <UButton type="submit" size="lg" :loading="loading" icon="i-lucide-send">
            {{ submitLabel }}
          </UButton>
        </div>
      </form>
    </UCard>
  </section>
</template>
