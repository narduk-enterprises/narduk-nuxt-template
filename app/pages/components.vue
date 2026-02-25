<script setup lang="ts">
useSeo({
  title: 'UI Components',
  description: 'Showcase of Nuxt UI 4 components available in this template — buttons, badges, alerts, modals, tabs, and more.',
  ogImage: {
    title: 'UI Components',
    description: 'Nuxt UI 4 component showcase',
    icon: '🎨',
  },
})

useWebPageSchema({
  name: 'UI Components',
  description: 'Showcase of Nuxt UI 4 components available in this template.',
  type: 'CollectionPage',
})

// Modal state
const showModal = ref(false)

// Toast
const toast = useToast()
function showToast(color: 'success' | 'error' | 'warning' | 'info' = 'success') {
  toast.add({
    title: `${color.charAt(0).toUpperCase() + color.slice(1)} Toast`,
    description: 'This is a Nuxt UI toast notification.',
    color,
    icon: color === 'success' ? 'i-lucide-check-circle' : color === 'error' ? 'i-lucide-x-circle' : color === 'warning' ? 'i-lucide-alert-triangle' : 'i-lucide-info',
  })
}

// Form fields
const name = ref('')
const email = ref('')
const favoriteColor = ref('green')
const colorOptions = ['green', 'blue', 'red', 'purple', 'orange', 'pink']
const agreed = ref(false)
const sliderValue = ref(50)
const switchValue = ref(true)

// Dropdown
const dropdownItems = [
  { label: 'Edit', icon: 'i-lucide-pencil' },
  { label: 'Duplicate', icon: 'i-lucide-copy' },
  { label: 'Archive', icon: 'i-lucide-archive' },
  { type: 'separator' as const },
  { label: 'Delete', icon: 'i-lucide-trash-2', color: 'error' as const },
]

// Tabs
const tabItems = [
  { label: 'Overview', icon: 'i-lucide-eye', slot: 'overview' as const },
  { label: 'Settings', icon: 'i-lucide-settings', slot: 'settings' as const },
  { label: 'Advanced', icon: 'i-lucide-code', slot: 'advanced' as const },
]

// Accordion
const accordionItems = [
  { label: 'What is Nuxt 4?', icon: 'i-lucide-help-circle', content: 'Nuxt 4 is the latest major version of the Nuxt framework, bringing improved performance, a new app/ directory structure, and enhanced developer experience with full TypeScript support.' },
  { label: 'Why Cloudflare Workers?', icon: 'i-lucide-cloud', content: 'Cloudflare Workers run on V8 isolates at the edge, providing ultra-fast cold starts, global distribution, and seamless integration with D1 databases, R2 storage, and KV namespaces.' },
  { label: 'How does the auth work?', icon: 'i-lucide-shield', content: 'Authentication uses PBKDF2 password hashing via the Web Crypto API (fully Workers-compatible), session cookies with httpOnly/secure flags, CSRF protection, and per-IP rate limiting.' },
]
</script>

<template>
  <div class="space-y-12">
    <div>
      <h1 class="font-display text-3xl sm:text-4xl font-bold mb-2">UI Components</h1>
      <p class="text-[var(--ui-text-muted)] text-lg">A showcase of Nuxt UI 4 components available in this template.</p>
    </div>

    <!-- Buttons -->
    <section>
      <h2 class="font-display text-xl font-semibold mb-4">Buttons</h2>
      <UCard>
        <div class="space-y-6">
          <div>
            <p class="text-sm font-medium text-[var(--ui-text-muted)] mb-3">Variants</p>
            <div class="flex flex-wrap gap-3">
              <UButton>Solid</UButton>
              <UButton variant="soft">Soft</UButton>
              <UButton variant="outline">Outline</UButton>
              <UButton variant="ghost">Ghost</UButton>
              <UButton variant="link">Link</UButton>
            </div>
          </div>
          <USeparator />
          <div>
            <p class="text-sm font-medium text-[var(--ui-text-muted)] mb-3">Colors</p>
            <div class="flex flex-wrap gap-3">
              <UButton color="primary">Primary</UButton>
              <UButton color="secondary">Secondary</UButton>
              <UButton color="success">Success</UButton>
              <UButton color="info">Info</UButton>
              <UButton color="warning">Warning</UButton>
              <UButton color="error">Error</UButton>
              <UButton color="neutral">Neutral</UButton>
            </div>
          </div>
          <USeparator />
          <div>
            <p class="text-sm font-medium text-[var(--ui-text-muted)] mb-3">Sizes</p>
            <div class="flex flex-wrap items-center gap-3">
              <UButton size="xs">Extra Small</UButton>
              <UButton size="sm">Small</UButton>
              <UButton size="md">Medium</UButton>
              <UButton size="lg">Large</UButton>
              <UButton size="xl">Extra Large</UButton>
            </div>
          </div>
          <USeparator />
          <div>
            <p class="text-sm font-medium text-[var(--ui-text-muted)] mb-3">With Icons</p>
            <div class="flex flex-wrap gap-3">
              <UButton icon="i-lucide-plus">Add Item</UButton>
              <UButton icon="i-lucide-download" variant="soft">Download</UButton>
              <UButton icon="i-lucide-trash-2" color="error" variant="outline">Delete</UButton>
              <UButton icon="i-lucide-loader" loading>Loading</UButton>
            </div>
          </div>
        </div>
      </UCard>
    </section>

    <!-- Badges -->
    <section>
      <h2 class="font-display text-xl font-semibold mb-4">Badges</h2>
      <UCard>
        <div class="space-y-4">
          <div class="flex flex-wrap gap-3">
            <UBadge>Default</UBadge>
            <UBadge color="success">Success</UBadge>
            <UBadge color="warning">Warning</UBadge>
            <UBadge color="error">Error</UBadge>
            <UBadge color="info">Info</UBadge>
            <UBadge color="neutral">Neutral</UBadge>
          </div>
          <div class="flex flex-wrap gap-3">
            <UBadge variant="subtle" color="success">Subtle</UBadge>
            <UBadge variant="outline" color="warning">Outline</UBadge>
            <UBadge variant="soft" color="error">Soft</UBadge>
          </div>
        </div>
      </UCard>
    </section>

    <!-- Alerts -->
    <section>
      <h2 class="font-display text-xl font-semibold mb-4">Alerts</h2>
      <div class="space-y-4">
        <UAlert title="Success!" description="Your changes have been saved." color="success" icon="i-lucide-check-circle" />
        <UAlert title="Heads up" description="This action cannot be undone." color="warning" icon="i-lucide-alert-triangle" />
        <UAlert title="Error" description="Something went wrong. Please try again." color="error" icon="i-lucide-x-circle" />
        <UAlert title="Info" description="Nuxt 4 uses the new app/ directory structure." color="info" icon="i-lucide-info" />
      </div>
    </section>

    <!-- Form Inputs -->
    <section>
      <h2 class="font-display text-xl font-semibold mb-4">Form Inputs</h2>
      <UCard>
        <div class="grid sm:grid-cols-2 gap-6">
          <UFormField label="Name">
            <UInput v-model="name" placeholder="John Doe" icon="i-lucide-user" />
          </UFormField>
          <UFormField label="Email">
            <UInput v-model="email" type="email" placeholder="john@example.com" icon="i-lucide-mail" />
          </UFormField>
          <UFormField label="Favorite Color">
            <USelect v-model="favoriteColor" :items="colorOptions" icon="i-lucide-palette" />
          </UFormField>
          <UFormField label="Volume">
            <USlider v-model="sliderValue" />
          </UFormField>
          <UFormField label="Notifications">
            <USwitch v-model="switchValue" label="Enable notifications" />
          </UFormField>
          <UFormField label="Terms">
            <UCheckbox v-model="agreed" label="I agree to the terms and conditions" />
          </UFormField>
        </div>
      </UCard>
    </section>

    <!-- Toasts -->
    <section>
      <h2 class="font-display text-xl font-semibold mb-4">Toast Notifications</h2>
      <UCard>
        <div class="flex flex-wrap gap-3">
          <UButton variant="soft" color="success" icon="i-lucide-check-circle" @click="showToast('success')">
            Success Toast
          </UButton>
          <UButton variant="soft" color="error" icon="i-lucide-x-circle" @click="showToast('error')">
            Error Toast
          </UButton>
          <UButton variant="soft" color="warning" icon="i-lucide-alert-triangle" @click="showToast('warning')">
            Warning Toast
          </UButton>
          <UButton variant="soft" color="info" icon="i-lucide-info" @click="showToast('info')">
            Info Toast
          </UButton>
        </div>
      </UCard>
    </section>

    <!-- Modal -->
    <section>
      <h2 class="font-display text-xl font-semibold mb-4">Modal</h2>
      <UCard>
        <UButton icon="i-lucide-maximize-2" @click="showModal = true">
          Open Modal
        </UButton>

        <UModal v-model:open="showModal">
          <template #header>
            <h3 class="font-semibold text-lg">Example Modal</h3>
          </template>
          <template #body>
            <p class="text-[var(--ui-text-muted)]">
              This is a Nuxt UI modal component. It supports headers, footers, custom content, and can be controlled programmatically.
            </p>
          </template>
          <template #footer>
            <div class="flex justify-end gap-3">
              <UButton variant="ghost" color="neutral" @click="showModal = false">Cancel</UButton>
              <UButton @click="showModal = false">Confirm</UButton>
            </div>
          </template>
        </UModal>
      </UCard>
    </section>

    <!-- Dropdown -->
    <section>
      <h2 class="font-display text-xl font-semibold mb-4">Dropdown Menu</h2>
      <UCard>
        <UDropdownMenu :items="dropdownItems">
          <UButton variant="outline" icon="i-lucide-more-vertical">
            Actions
          </UButton>
        </UDropdownMenu>
      </UCard>
    </section>

    <!-- Tabs -->
    <section>
      <h2 class="font-display text-xl font-semibold mb-4">Tabs</h2>
      <UCard>
        <UTabs :items="tabItems">
          <template #overview>
            <div class="p-4">
              <p class="text-[var(--ui-text-muted)]">This is the overview tab content. Tabs are great for organizing related content.</p>
            </div>
          </template>
          <template #settings>
            <div class="p-4">
              <p class="text-[var(--ui-text-muted)]">Settings tab — configure your preferences here.</p>
            </div>
          </template>
          <template #advanced>
            <div class="p-4">
              <p class="text-[var(--ui-text-muted)]">Advanced settings for power users. Handle with care!</p>
            </div>
          </template>
        </UTabs>
      </UCard>
    </section>

    <!-- Accordion -->
    <section>
      <h2 class="font-display text-xl font-semibold mb-4">Accordion</h2>
      <UAccordion :items="accordionItems" />
    </section>

    <!-- Skeleton -->
    <section>
      <h2 class="font-display text-xl font-semibold mb-4">Skeletons</h2>
      <UCard>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <USkeleton class="size-12 rounded-full" />
            <div class="space-y-2 flex-1">
              <USkeleton class="h-4 w-3/4" />
              <USkeleton class="h-3 w-1/2" />
            </div>
          </div>
          <USkeleton class="h-32 w-full rounded-lg" />
        </div>
      </UCard>
    </section>

    <!-- Avatars -->
    <section>
      <h2 class="font-display text-xl font-semibold mb-4">Avatars</h2>
      <UCard>
        <div class="flex flex-wrap items-center gap-4">
          <UAvatar text="JD" size="sm" />
          <UAvatar text="AB" size="md" />
          <UAvatar text="XY" size="lg" />
          <UAvatar text="N4" size="xl" />
        </div>
      </UCard>
    </section>
  </div>
</template>
