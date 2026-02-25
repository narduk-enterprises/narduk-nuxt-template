---
title: Deploying to Cloudflare Workers
description: A step-by-step guide to deploying your Nuxt 4 application on Cloudflare Workers with D1 database.
date: 2026-02-22
tags: [deployment, cloudflare, guide]
author:
  name: Admin
readingTime: 4
---

# Deploying to Cloudflare Workers

Cloudflare Workers provide a globally distributed edge computing platform. Your Nuxt 4 app runs on V8 isolates — no cold starts, no containers, just fast.

## Why Cloudflare Workers?

- **Global edge network** — Your code runs in 300+ cities worldwide
- **Zero cold starts** — V8 isolates start in under 5ms
- **Generous free tier** — 100,000 requests per day, free
- **D1 Database** — SQLite at the edge, included

## Step 1: Create a D1 Database

```bash
npx wrangler d1 create my-app-db
```

Copy the `database_id` from the output and paste it into `wrangler.json`.

## Step 2: Push the Schema

```bash
npx wrangler d1 execute my-app-db --remote --file=drizzle/0000_initial_schema.sql
```

## Step 3: Deploy

```bash
npm run deploy
```

Your app is now live at `https://your-app.workers.dev`.

## Environment Variables

To set environment variables (like `SITE_URL`), use Wrangler:

```bash
npx wrangler secret put SITE_URL
```

## Custom Domain

To use a custom domain, add it in the Cloudflare dashboard under **Workers & Pages > your worker > Settings > Domains**.

## Monitoring

View real-time logs:

```bash
npx wrangler tail
```

This streams logs from your deployed Worker in real-time — invaluable for debugging production issues.
