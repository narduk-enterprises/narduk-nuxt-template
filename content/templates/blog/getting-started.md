---
title: Getting Started with Nuxt 4
description: Learn how to set up and deploy your first Nuxt 4 application on Cloudflare Workers.
date: 2026-02-20
tags: [tutorial, nuxt, getting-started]
author:
  name: Admin
readingTime: 5
---

# Getting Started with Nuxt 4

Nuxt 4 brings exciting improvements to the Vue.js ecosystem. This guide walks you through setting up your first project using this template.

## Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** installed
- A **Cloudflare account** (free tier works great)
- Basic knowledge of **Vue.js** and **TypeScript**

## Quick Setup

Clone the template and install dependencies:

```bash
git clone <your-repo-url>
cd nuxt-v4-template
npm install
```

Start the development server:

```bash
npm run dev
```

Your app is now running at `http://localhost:3000`.

## Project Structure

Nuxt 4 uses the `app/` directory for all frontend code:

```
app/
├── pages/          # File-based routing
├── components/     # Auto-imported components
├── composables/    # Shared state and logic
├── layouts/        # Page layouts
└── assets/         # CSS and static assets
```

## Adding a New Page

Create a new file in `app/pages/`:

```vue
<script setup lang="ts">
useSeo({
  title: 'My New Page',
  description: 'A description for search engines.',
});
useWebPageSchema({ name: 'My New Page' });
</script>

<template>
  <div>
    <h1>Hello World</h1>
  </div>
</template>
```

## Deploying to Cloudflare Workers

When you're ready to go live:

```bash
npm run deploy
```

That's it! Your app is now running at the edge, globally.

## Next Steps

- Explore the [UI Components](/components) page
- Try the [Todos Demo](/todos) for CRUD operations
- Check out the [page templates](/templates/landing) for inspiration
