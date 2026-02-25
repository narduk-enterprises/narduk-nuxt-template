<script setup lang="ts">
/**
 * TEMPLATE: About Page
 *
 * Company/team about page with mission and team grid.
 */
useSeo({
  title: 'About Us',
  description: 'Learn about our mission, values, and the team behind the product.',
  ogImage: { title: 'About Us', description: 'Our mission and team', icon: '👥' },
})
useWebPageSchema({ name: 'About Us', type: 'AboutPage' })

const team = [
  { icon: 'i-lucide-user', title: 'Jane Doe', description: 'CEO & Co-founder. Passionate about developer tools and edge computing.' },
  { icon: 'i-lucide-user', title: 'John Smith', description: 'CTO & Co-founder. 15+ years building scalable infrastructure.' },
  { icon: 'i-lucide-user', title: 'Sarah Chen', description: 'Head of Design. Creating beautiful, accessible interfaces.' },
  { icon: 'i-lucide-user', title: 'Mike Rivera', description: 'Lead Engineer. Open-source enthusiast and Nuxt contributor.' },
]

const values = [
  { icon: 'i-lucide-rocket', title: 'Ship Fast', description: 'We believe in rapid iteration and getting products to users quickly.' },
  { icon: 'i-lucide-heart', title: 'User First', description: 'Every decision starts with the question: how does this help our users?' },
  { icon: 'i-lucide-code', title: 'Open Source', description: 'We contribute to the community and build on the shoulders of giants.' },
]
</script>

<template>
  <div class="space-y-20 pb-20">
    <UiHeroSection
      title="About Us"
      subtitle="We're on a mission to make edge computing accessible to every developer. No compromise on performance, security, or developer experience."
      badge="Our Story"
      badge-icon="i-lucide-heart"
    />

    <UiFeatureGrid
      title="Our Values"
      subtitle="The principles that guide everything we build."
      :features="values"
    />

    <UiFeatureGrid
      title="Meet the Team"
      subtitle="A small team with big ambitions."
      :features="team"
      :columns="4"
    />

    <UiCTABanner
      title="Want to join us?"
      description="We're always looking for talented people who share our values."
      cta-label="View Open Roles"
      cta-to="/careers"
      variant="subtle"
    />
  </div>
</template>
