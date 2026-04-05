# Rupa.dev — Personal Developer Blog

A production-ready personal developer blog built with **Next.js 14**, **MDX**, **Algolia Search**, **Monaco Editor**, **Giscus Comments**, **Google Analytics**, and deployed on **Vercel**.

## ✨ Features

| Feature | Tech |
|---|---|
| Static site generation (SSG) | Next.js App Router + `generateStaticParams` |
| MDX blog posts with syntax highlighting | `next-mdx-remote` + `rehype-highlight` |
| AI-powered search | Algolia InstantSearch |
| Interactive code editor | Monaco Editor (`@monaco-editor/react`) |
| GitHub-powered comments | Giscus |
| Analytics | Google Analytics 4 + Vercel Analytics |
| SEO | `next-sitemap`, OG tags, JSON-LD structured data |
| RSS Feed | `/feed.xml` route |
| Newsletter | `/api/subscribe` → Resend |
| Progress tracking | `localStorage` — no login needed |
| Dark mode | `next-themes` (default dark) |

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/rupa-dev-blog.git
cd rupa-dev-blog
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env.local
# Fill in all values — see sections below
```

### 3. Run Development Server

```bash
npm run dev
# → http://localhost:3000
```

---

## 🔧 Service Setup

### Algolia Search

1. Create a free account at [algolia.com](https://www.algolia.com)
2. Create an application → copy **App ID** and **Search-Only API Key**
3. Go to **API Keys** → copy your **Admin API Key**
4. Create an index named `rupa_dev_posts`
5. Add to `.env.local`:
   ```
   NEXT_PUBLIC_ALGOLIA_APP_ID=YOUR_APP_ID
   NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=YOUR_SEARCH_ONLY_KEY
   ALGOLIA_ADMIN_KEY=YOUR_ADMIN_KEY
   NEXT_PUBLIC_ALGOLIA_INDEX_NAME=rupa_dev_posts
   ```
6. Index your posts:
   ```bash
   node scripts/index-algolia.mjs
   ```

### Giscus Comments

1. Enable **GitHub Discussions** on your repo
   (Settings → Features → Discussions ✓)
2. Install [Giscus app](https://github.com/apps/giscus) on your repo
3. Go to [giscus.app](https://giscus.app), enter your repo
4. Select **Discussion title contains page pathname** as mapping
5. Copy the values and add to `.env.local`:
   ```
   NEXT_PUBLIC_GISCUS_REPO=username/repo-name
   NEXT_PUBLIC_GISCUS_REPO_ID=R_xxxxxxxxxx
   NEXT_PUBLIC_GISCUS_CATEGORY=Comments
   NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxxxxxxx
   ```

### Google Analytics

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create a property → Web stream → copy **Measurement ID** (`G-XXXXXXXXXX`)
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

### Newsletter (Resend)

1. Sign up at [resend.com](https://resend.com) (free up to 3k emails/month)
2. Create an API key and an Audience
3. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxx
   RESEND_AUDIENCE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```
4. Uncomment the Resend code in `src/app/api/subscribe/route.ts`

---

## ✍️ Writing Blog Posts

Create a new file in `content/posts/`:

```bash
# File: content/posts/my-new-post.mdx
```

### Frontmatter Options

```yaml
---
title: "Your Post Title"
description: "Short description for SEO and cards"
date: "2025-03-01"
tags: ["react", "typescript"]
category: "react"           # react | java | fullstack | ai | project | series | devops
featured: true              # shows in Featured Posts section
series: "React Mastery"     # optional — links to series nav
seriesOrder: 5              # position in series
githubRepo: "https://github.com/you/repo"  # shows "View source" button
author:
  name: "Rupa"
  github: "https://github.com/rupa"
---
```

### MDX Components Available in Posts

```mdx
# Interactive code editor (Monaco)
<CodeEditor
  language="javascript"
  title="example.js"
  height="300px"
  runnable
  code={`console.log("Hello World")`}
/>

# Callout boxes
<Callout type="info" title="Pro Tip">
  Your callout content here.
</Callout>
# type options: info | warning | error | success

# Step-by-step
<Step number={1} title="First step">
  Description of what to do.
</Step>

# File tree
<FileTree>
  src/
  ├── app/
  │   └── page.tsx
  └── components/
</FileTree>
```

### After adding posts, re-index Algolia:

```bash
node scripts/index-algolia.mjs
```

---

## 🌐 Deploy to Vercel

### Option A: Vercel CLI

```bash
npm i -g vercel
vercel

# For production:
vercel --prod
```

### Option B: GitHub Integration (Recommended)

1. Push your repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repo → Vercel auto-detects Next.js
4. Add all env variables from `.env.example` in the Vercel dashboard
5. Deploy!

### Automatic Algolia Re-indexing

`vercel.json` includes a daily cron job that re-indexes posts:
```json
{
  "crons": [{ "path": "/api/index-posts", "schedule": "0 4 * * *" }]
}
```
Set `CRON_SECRET` in Vercel env vars to protect the endpoint.

---

## 📁 Project Structure

```
rupa-dev-blog/
├── content/
│   └── posts/              ← Your MDX blog posts go here
│       ├── jwt-spring-boot.mdx
│       └── react-hooks-wrong.mdx
├── public/
│   └── og-image.png        ← Add your OG image (1200×630)
├── scripts/
│   └── index-algolia.mjs   ← Run to index posts to Algolia
├── src/
│   ├── app/
│   │   ├── layout.tsx      ← Root layout (fonts, GA, Vercel Analytics)
│   │   ├── page.tsx        ← Homepage (SSG)
│   │   ├── blog/
│   │   │   ├── page.tsx    ← Blog listing (SSG)
│   │   │   └── [slug]/
│   │   │       └── page.tsx ← Individual post (SSG + MDX)
│   │   ├── learn/          ← Learning paths with progress tracking
│   │   ├── projects/       ← Projects showcase
│   │   ├── about/          ← About page
│   │   ├── api/
│   │   │   ├── search/     ← Algolia search endpoint
│   │   │   ├── subscribe/  ← Newsletter endpoint
│   │   │   └── index-posts/ ← Manual Algolia reindex endpoint
│   │   └── feed.xml/       ← RSS feed
│   ├── components/
│   │   ├── blog/           ← PostCard, PostHeader, GiscusComments, etc.
│   │   ├── editor/         ← Monaco CodeEditor
│   │   ├── layout/         ← Navbar, Footer
│   │   ├── search/         ← SearchBar with Algolia
│   │   └── ui/             ← NewsletterForm, etc.
│   ├── lib/
│   │   ├── posts.ts        ← MDX file reading utilities
│   │   ├── algolia.ts      ← Algolia client setup
│   │   ├── analytics.ts    ← Google Analytics helpers
│   │   └── utils.ts        ← Helpers, color maps, formatters
│   ├── styles/
│   │   └── globals.css     ← Tailwind + custom design system
│   └── types/
│       └── index.ts        ← TypeScript types
├── .env.example            ← Copy to .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

---

## 🔮 Adding Features

### Add a new page
Create `src/app/new-page/page.tsx` — Next.js auto-routes it.

### Add a learning path
Edit `src/app/learn/page.tsx` and add to the `learningPaths` array.

### Add a project
Edit `src/app/projects/page.tsx` and add to the `projects` array.

### Customize design tokens
Edit `tailwind.config.ts` and `src/styles/globals.css`.

---

## 📄 License

MIT — use freely for your own personal blog.
