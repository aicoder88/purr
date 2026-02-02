# GEMINI.md - Purrify Project Documentation

> This file contains essential information for AI coding agents working on the Purrify project. Read this file thoroughly before making any changes.

---

## 🚨 Core Mandates (MUST FOLLOW)

### 📦 Package Manager: pnpm ONLY
**CRITICAL:** This project uses **pnpm exclusively**. Do NOT use npm or yarn.
*   **Install:** `pnpm install`
*   **Add:** `pnpm add package-name`
*   **Dev:** `pnpm dev`
*   **Run Scripts:** `pnpm script-name`

### 🚫 No Fabrication Rule
**NEVER fabricate or assume the existence of:**
*   ❌ Contact info (phone numbers, emails, addresses)
*   ❌ Social media (handles, hashtags)
*   ❌ File paths (images, PDFs, assets)
*   ❌ URLs (subdomains, pages, external links)
*   **VERIFY FIRST**: Check `public/`, `pages/`, or ask the user.

### 💧 Hydration Safety
**CRITICAL:** Never conditionally return `null` in page components based on client state. This causes hydration mismatches.
*   **Bad:** `if (!session) return null;`
*   **Good:** Use server-side redirects (`getServerSideProps`) or return a loading/error component (`<LoadingSpinner />`).

---

## 🧠 Core Thinking Principles

### 1. Think Before Coding
- **Clarify ambiguity**: If a request could mean A or B, ask "Did you mean A or B?" before writing code.
- **State your plan**: Before multi-file changes, write a 3-line plan: "1. Edit X, 2. Update Y, 3. Verify with Z".
-   **Surface tradeoffs**: If there's a simpler approach, say "Option A is faster but less flexible. Option B is more robust. Which do you prefer?"
-   **Verify resources exist**: See the "No Fabrication Rule" above.

### 2. Simplicity First
-   **One-use code stays inline**: Don't extract to a utility unless it's used 2+ times.
-   **Prefer stdlib over npm**: If Node.js or the browser can do it natively, don't install a package.
-   **Delete dead code**: If your change makes something unused, remove it in the same commit.

### 3. Surgical Changes
-   **Match the file's existing style**: If the file uses `function foo()`, don't add `const foo = () =>`.
-   **Don't touch unrelated code**: If you see a typo in a comment 50 lines away, mention it—don't fix it silently.
-   **Small diffs**: A 10-line change shouldn't produce a 200-line diff.

### 4. Goal-Driven Execution
-   **Verify changes work**: Run `pnpm build` or `pnpm lint` after edits. Don't assume success.
-   **Loop on failure**: If a command fails, read the error and fix it. Don't move on.
-   **Localhost Issues**: Start local server (`pnpm dev`) immediately when localhost pages don't work. Don't try to open more pages.


---

## Project Overview

**Purrify** is an e-commerce website for an activated carbon cat litter additive product. The website serves multiple markets (Canada, USA) in four languages (English, French, Chinese, Spanish). It features a complete online store, blog with AI-generated content, affiliate program, retailer portal, and comprehensive SEO optimization.

- **Website**: https://www.purrify.ca
- **Primary Market**: Canada (CAD currency)
- **Secondary Market**: USA (USD currency)
- **Node Version**: >= 22.x
- **Package Manager**: pnpm 10.27.0

---

## Technology Stack

### Core Framework
- **Next.js 16.0.10** - React framework with Pages Router (legacy)
- **React 19.2.3** - UI library
- **TypeScript 5.9.3** - Type safety

### Database & ORM
- **PostgreSQL** - Primary database
- **Prisma 6.19.1** - Type-safe ORM with client generation

### Authentication
- **NextAuth.js 4.24.13** - Authentication library
- **bcryptjs** - Password hashing
- JWT-based sessions with 24-hour expiration

### Styling & UI
- **Tailwind CSS 3.4.19** - Utility-first CSS framework
- **Radix UI** - Headless UI components (extensive usage)
- **Lucide React** - Icon library
- **Framer Motion** - Animation library
- **Embla Carousel** - Carousel component

### Payment & E-commerce
- **Stripe 18.5.0** - Payment processing
- Custom checkout session API
- Subscription/autoship support

### AI & Content Generation
- **Anthropic Claude SDK** - Primary AI for blog generation
- **OpenAI SDK** - Alternative AI provider
- **ChromaDB** - Vector database for content

### Email & Communications
- **Resend** - Transactional email
- **EmailJS** - Client-side email sending
- Custom email templates in `src/emails/`

### Monitoring & Analytics
- **Sentry** - Error tracking and performance monitoring
- **Vercel Analytics** - Web analytics
- Custom UTM tracking implementation

### Testing
- **Jest 30.2.0** - Unit testing
- **Playwright 1.57.0** - E2E testing
- **@testing-library/react** - Component testing

---

## ⛔ Anti-Patterns (Never Do These)

| Anti-Pattern | Example | Correct Behavior |
|--------------|---------|------------------|
| **The Fabricator** | Referencing `/images/logo.png` that doesn't exist | Run `ls public/images/` first |
| **The Guesser** | Assuming `lodash` is installed | Check `package.json` or ask |
| **The Over-Engineer** | Creating `ButtonFactory` for one button | Just write the button |
| **The Lazy Verifier** | Saying "Done" without testing | Run `pnpm build` and confirm |
| **The Reformatter** | Changing tabs to spaces across the file | Touch only what was requested |
| **The Silent Changer** | Deleting "unused" code that's actually used elsewhere | Mention it, don't delete |
| **The Powder User** | Calling Purrify a "powder" | Use "granules" or "additive" |
| **The Hardcoder** | Writing "Add to Cart" directly in JSX | Use `t('addToCart')` |
| **The White-on-White** | Using text-white without a colored background | Always ensure contrast in BOTH modes |
| **The Label Maker** | Putting labels on generated bags/bottles | Never use labels on AI images |
| **The Dust Maker** | Showing black clouds/dust | Clean, trapped odor only |
| **The Wrong Folder** | Storing images outside `public/images` | Use `public/images` -> `optimized` |

---

## Project Structure

```
/
├── pages/                  # Next.js Pages Router (legacy)
│   ├── _app.tsx           # App wrapper with providers
│   ├── _document.tsx      # HTML document customization
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth configuration
│   │   ├── admin/         # Admin API endpoints
│   │   ├── affiliate/     # Affiliate program APIs
│   │   ├── cron/          # Scheduled task endpoints
│   │   └── webhooks/      # Stripe webhooks
│   ├── admin/             # Admin dashboard pages
│   ├── affiliate/         # Affiliate portal pages
│   ├── blog/              # Blog pages and articles
│   ├── learn/             # Educational content
│   ├── locations/         # Store location pages
│   └── products/          # Product pages
│
├── src/
│   ├── components/        # React components
│   │   ├── admin/         # Admin-specific components
│   │   ├── affiliate/     # Affiliate components
│   │   ├── blog/          # Blog components
│   │   ├── customer/      # Customer portal components
│   │   ├── layout/        # Layout components (header, footer)
│   │   ├── sections/      # Page section components
│   │   ├── seo/           # SEO components
│   │   ├── ui/            # Reusable UI components (shadcn/ui style)
│   │   └── ...
│   ├── lib/               # Utility libraries
│   │   ├── affiliate/     # Affiliate logic
│   │   ├── auth/          # Authentication utilities
│   │   ├── blog/          # Blog generation & management
│   │   ├── locations/     # Location data
│   │   ├── referral/      # Referral program logic
│   │   ├── security/      # CSRF, rate limiting, sanitization
│   │   ├── seo/           # SEO utilities
│   │   └── tracking/      # UTM and analytics tracking
│   ├── hooks/             # Custom React hooks
│   ├── translations/      # i18n translations (en, fr, zh, es)
│   ├── data/              # Static data files
│   ├── emails/            # Email template components
│   └── types/             # TypeScript type definitions
│
├── content/               # Content files
│   └── blog/              # Blog content in JSON format
│       ├── en/            # English blog posts
│       ├── fr/            # French blog posts
│       ├── zh/            # Chinese blog posts
│       └── es/            # Spanish blog posts
│
├── prisma/                # Database schema and migrations
│   └── schema.prisma      # Prisma schema definition
│
├── scripts/               # Build and utility scripts
│   ├── seo/               # SEO validation and optimization
│   ├── images/            # Image optimization scripts
│   ├── blog/              # Blog automation scripts
│   └── build/             # Build-related scripts
│
├── __tests__/             # Jest unit tests
├── e2e/                   # Playwright E2E tests
├── public/                # Static assets
│   └── optimized/         # Optimized images (auto-generated)
└── [config files]
```

---

## Build and Development Commands

### Essential Commands

```bash
# Development
pnpm dev              # Start development server with hot reload

# Building
pnpm build            # Production build with SEO validation

# Code Quality
pnpm lint             # Run ESLint with Next.js config
pnpm check-types      # TypeScript type checking (tsc --noEmit)

# Testing
pnpm test             # Run Jest unit tests
pnpm test:e2e         # Run Playwright E2E tests

# SEO & Performance (See SEO section)
pnpm seo:validate     # Validate SEO compliance
```

### Environment Setup

Copy `.env.local.example` to `.env.local` and configure:
- `NEXTAUTH_SECRET` - Required for authentication
- `NEXTAUTH_URL` - Your local/dev URL
- `DATABASE_URL` - PostgreSQL connection string
- `STRIPE_SECRET_KEY` - For payments
- `ANTHROPIC_API_KEY` - For AI blog generation

---

## Code Style Guidelines

### TypeScript Conventions
- **Strict mode enabled** - No implicit any
- **2-space indentation**
- **Single quotes** for strings
- **Semicolons required**
- **Explicit prop and variable names** - avoid abbreviations

### File Naming
- **React components**: PascalCase with `.tsx` extension (e.g., `src/components/HeroBanner.tsx`)
- **Utilities/helpers**: camelCase with `.ts` extension (e.g., `src/lib/seo-utils.ts`)
- **Routes/content**: kebab-case (e.g., `pages/blog/my-awesome-post.tsx`)

### Component Structure
```tsx
import React from 'react';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
      <div className="p-4 bg-white dark:bg-gray-900">
        <h1>{product.name}</h1>
      </div>
  );
}
```

### Dark Mode (Required)
Every element needs both light and dark variants.
-   **Text**: `text-gray-900 dark:text-gray-50`
-   **Backgrounds**: `bg-white dark:bg-gray-900`
-   **CRITICAL**: `text-white` must ALWAYS have a dark variant (e.g., `dark:text-gray-100`) or a colored background that persists in dark mode.
-   **Validate**: `pnpm validate-dark-mode`

---

## 🗄️ Database & Prisma

### Workflow
1.  **Edit Schema**: `prisma/schema.prisma`
2.  **Migrate (Dev)**: `pnpm prisma migrate dev --name describe_change`
3.  **Generate Client**: `pnpm prisma generate`
4.  **Studio**: `pnpm prisma studio` (View data)

### Connection
The Prisma client is configured as a singleton in `src/lib/prisma.ts` to prevent connection pooling issues.

---

## 🌐 Internationalization (i18n)

### Structure
Translations are in `src/translations/`:
-   `types.ts`: Interface definitions
-   `{en,fr,zh,es}.ts`: Locale data

### Terminology Rules
-   **Purrify is NOT a powder**: Use "granules" or "additive".
-   **Tone**: Professional, warm, science-backed.

---

## 🖼️ Image Workflow

### Storage & Optimization
1.  **Source**: Place in `public/original-images/`
2.  **Optimize**: Run `pnpm optimize-images:enhanced`
3.  **Result**: Images move to `public/optimized/`
4.  **Use**: Reference `/optimized/image-name.webp`

### AI Image Standards
-   **Engine**: FAL / Midjourney (via scripts)
-   **Style**: Studio Ghibli / Anime Aesthetic ("magical realism", "sparkling clean").
-   **Prohibitions**: No black dust, no labels on bags, no product packaging generation.

---

## 💰 Currency System (Geo-located)

-   **US Visitors**: USD
-   **Others**: CAD (fallback)
-   **Implementation**: `useCurrency` hook (`src/lib/currency-context.tsx`).
-   **Database**: Orders store the currency used.

---

## 📝 Blog Content System

-   **Format**: JSON files in `content/blog/{lang}/`.
-   **Structure**: Title, slug, excerpt, content (HTML), featuredImage.
-   **Generation**: `pnpm blog:auto:generate`.

---

## 🔒 Security & Auth

-   **Auth**: NextAuth.js (Credentials + JWT).
-   **Rate Limits**: Configured in `src/lib/security/rate-limit.ts` (Login, Create, Upload).
-   **Sanitization**: `src/lib/security/sanitize.ts`.
-   **Environment**: Never commit `.env` files.

---

## 🧪 Testing Strategy

-   **Unit Tests (`__tests__/`)**: Pure functions, hooks, utilities. Run `pnpm test`.
-   **E2E Tests (`e2e/`)**: Critical user flows (Checkout, Login). Run `pnpm test:e2e`.
-   **Translation Tests**: `pnpm test:translations`.

---

## 🚀 Deployment (Vercel)

-   **Build**: `pnpm prisma generate && pnpm build`
-   **Output**: `.next`
-   **Pre-deploy Check**: Lint, Type-check, Test, Build, SEO Validate.

---

## 🤖 System Instructions (Image Generation)

### [SYSTEM_INSTRUCTION: IMAGE_GENERATOR]
**Context**: You are generating image prompts for Purrify.ca.
**Brand Core**: All images must feature deep saturation, volumetric lighting, and a "magical realism" aesthetic.

**STEP 1: CLASSIFY MODE**
Determine if the user's request is [LIFESTYLE] (cats, home, nature) or [TECH] (molecules, filtration, air flow, science).

**STEP 2: APPLY STYLE PRESETS**
**IF [LIFESTYLE]:**
- **Style**: High-fidelity "Hybrid-Ghibli" aesthetic.
- **Vibe**: Magical, pristine, healthy, and thriving.
- **Lighting**: Gentle dappled lighting with warm golden highlights streaming through windows.
- **Render**: Combine the whimsy of hand-painted animation with 8K photorealistic textures.
- **Key Elements**: Cats have hyper-realistic detail but expressive, charming anime-style faces. Soft painterly background (bokeh).

**IF [TECH]:**
- **Style**: Cinematic Macrophotography & 3D Scientific Visualization.
- **Vibe**: Precise, powerful, clean, microscopic clarity.
- **Lighting**: Internal glowing energy, rim lighting, electric blues and purples vs. deep charcoal.
- **Render**: Octane Render, ray-tracing, subsurface scattering, crystalline textures.
- **Key Elements**: Visible airflow streams, glowing activated carbon pores, atomic bonds, sleek industrial design, infinite black or gradient backgrounds.

**STEP 3: GENERATE PROMPT**
Fill the following template based on the selected mode:
- **Subject**: [Describe the core subject/action in detail]
- **Setting**: [Describe background—e.g., "A cozy sun-drenched windowsill" OR "Inside a microscopic carbon pore"]
- **Art Direction**: [Insert the relevant Style Preset text from Step 2]
- **Color Palette**: Vivid and punchy (Makoto Shinkai style vibrancy). Rich emeralds, deep ambers, and vibrant pastels (Lifestyle) OR Neon cyans, electric blues, and matte charcoal (Tech).
- **Camera**: [Wide angle/Eye level] for Lifestyle OR [Macro/Electron Microscope] for Tech.

**STRICT PROHIBITIONS:**
- **NO LABELS** on bags or bottles.
- **NO BLACK CLOUDS/DUST**.
- **NO PURRIFY LOGOS/PACKAGING** unless explicitly provided.
- **ODOR MUST BE OBVIOUSLY adsorbed or TRAPPED**, never released.
