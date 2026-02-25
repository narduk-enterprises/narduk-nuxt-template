<script setup lang="ts">
/**
 * TestimonialCarousel — Auto-cycling testimonial cards.
 *
 * @example
 * <TestimonialCarousel
 *   title="What People Say"
 *   :testimonials="[
 *     { quote: 'Amazing product!', author: 'Jane Doe', role: 'CEO at Acme' },
 *     { quote: 'Changed our workflow.', author: 'John Smith', role: 'CTO at Startup' },
 *   ]"
 * />
 */
export interface Testimonial {
  quote: string
  author: string
  role?: string
  avatar?: string
}

const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  testimonials: Testimonial[]
  /** Auto-cycle interval in ms (0 = disabled) */
  interval?: number
}>(), {
  interval: 5000,
})

const currentIndex = ref(0)

const currentTestimonial = computed(() => props.testimonials[currentIndex.value])

function next() {
  currentIndex.value = (currentIndex.value + 1) % props.testimonials.length
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + props.testimonials.length) % props.testimonials.length
}

// Auto-cycle
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (props.interval > 0 && props.testimonials.length > 1) {
    timer = setInterval(next, props.interval)
  }
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section>
    <div v-if="title || subtitle" class="text-center mb-10">
      <h2 v-if="title" class="font-display text-2xl sm:text-3xl font-bold mb-3">{{ title }}</h2>
      <p v-if="subtitle" class="text-muted max-w-lg mx-auto">{{ subtitle }}</p>
    </div>

    <div class="max-w-2xl mx-auto">
      <UCard class="text-center">
        <div class="py-4 space-y-6">
          <!-- Quote -->
          <UIcon name="i-lucide-quote" class="size-8 text-primary mx-auto opacity-50" />

          <Transition name="fade" mode="out-in">
            <div :key="currentIndex" class="space-y-4">
              <p class="text-lg sm:text-xl leading-relaxed italic text-muted">
                "{{ currentTestimonial?.quote }}"
              </p>

              <div class="flex items-center justify-center gap-3">
                <UAvatar
                  v-if="currentTestimonial?.avatar"
                  :src="currentTestimonial.avatar"
                  :alt="currentTestimonial.author"
                  size="md"
                />
                <UAvatar
                  v-else
                  :text="currentTestimonial?.author?.split(' ').map(n => n[0]).join('').slice(0, 2)"
                  size="md"
                />
                <div class="text-left">
                  <p class="font-semibold text-sm">{{ currentTestimonial?.author }}</p>
                  <p v-if="currentTestimonial?.role" class="text-xs text-muted">{{ currentTestimonial?.role }}</p>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Navigation dots -->
          <div v-if="testimonials.length > 1" class="flex items-center justify-center gap-4 pt-2">
            <UButton icon="i-lucide-chevron-left" variant="ghost" color="neutral" size="sm" @click="prev" />
            <div class="flex gap-1.5">
              <button
                v-for="(_, i) in testimonials"
                :key="i"
                :class="[
                  'size-2 rounded-full transition-colors',
                  i === currentIndex ? 'bg-primary' : 'bg-muted',
                ]"
                @click="currentIndex = i"
              />
            </div>
            <UButton icon="i-lucide-chevron-right" variant="ghost" color="neutral" size="sm" @click="next" />
          </div>
        </div>
      </UCard>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
