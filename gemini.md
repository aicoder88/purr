# GEMINI.md - Purrify Project Documentation

> This file contains essential information for AI coding agents working on the Purrify project. Read this file thoroughly before making any changes.

---

## Core Mandates

### Package Manager: pnpm ONLY
This project uses **pnpm exclusively**. Do NOT use npm or yarn.

### No Fabrication Rule
**NEVER fabricate or assume the existence of:**
- Contact info, social media handles, hashtags
- File paths, image paths, URLs
- **VERIFY FIRST**: Check the filesystem or ask the user.

### Hydration Safety
Never conditionally return `null` in page components based on client state. Use server-side `redirect()` from `next/navigation` or return a loading/error component instead. See `docs/HYDRATION_SAFETY.md`.

---

## Project Overview

**Purrify** is an e-commerce site for an activated carbon cat litter additive. Serves Canada (CAD) and USA (USD) in four languages (en, fr, zh, es).

- **Website**: https://www.purrify.ca
- **Node**: >= 22.x
- **Package Manager**: pnpm

---

## Technology Stack

### Core
- **Next.js 16** - App Router
- **React 19** - UI library
- **TypeScript 5.9** - Strict mode enabled

### Database & ORM
- **PostgreSQL** via Supabase
- **Prisma 7** - Type-safe ORM, singleton in `src/lib/prisma.ts`

### Authentication
- **NextAuth v5** (beta) - Credentials provider, JWT sessions
- `requireAuth()` from `src/lib/auth/session.ts` for protected routes
- Rate limiting in `src/lib/security/rate-limit.ts` (AUTH: 5/15min, CREATE: 10/min, UPLOAD: 15/min)
- CSRF protection in `src/lib/security/csrf.ts`
- Roles: admin, editor, affiliate

### Styling & UI
- **Tailwind CSS 3.4** with dark mode (`class` strategy)
- **Radix UI** - Headless components (shadcn/ui style) in `src/components/ui/`
- **Lucide React** - Icons
- **Framer Motion** - Animations

### Payments
- **Stripe** - Payment links in `src/lib/payment-links.ts`, webhooks at `app/api/webhooks/stripe/`

### i18n
- **next-intl v4** - Locales: `en` (default), `fr`, `zh`, `es`
- Config: `src/i18n/config.ts`
- Middleware: `proxy.ts` (NOT `middleware.ts` -- Next.js 16 change)

### Monitoring
- **Sentry** - Error tracking
- **Vercel Analytics**

### Testing
- **Jest** - Unit tests in `__tests__/`
- **Playwright** - E2E tests in `e2e/`

---

## Anti-Patterns (Never Do These)

| Anti-Pattern | Example | Correct Behavior |
|---|---|---|
| **The Fabricator** | Referencing `/images/logo.png` that doesn't exist | Verify the file exists first |
| **The Guesser** | Assuming `lodash` is installed | Check `package.json` or ask |
| **The Over-Engineer** | Creating `ButtonFactory` for one button | Just write the button |
| **The Lazy Verifier** | Saying "Done" without testing | Run `pnpm build` and confirm |
| **The Reformatter** | Changing tabs to spaces across the file | Touch only what was requested |
| **The Silent Changer** | Deleting "unused" code that's actually used elsewhere | Mention it, don't delete |
| **The Powder User** | Calling Purrify a "powder" | Use "granules" or "additive" |
| **The Hardcoder** | Writing "Add to Cart" directly in JSX | Use translation keys |
| **The White-on-White** | Using text-white without a colored background | Always ensure contrast in BOTH modes |
| **The Label Maker** | Putting labels on generated bags/bottles | Never use labels on AI images |
| **The Dust Maker** | Showing black clouds/dust | Clean, trapped odor only |
| **The Wrong Folder** | Storing images outside the workflow | Source in `public/original-images/`, output in `public/optimized/` |

---

## Project Structure

```
/
├── app/                        # Next.js App Router
│   ├── [locale]/               # Internationalized routes (en, fr, zh, es)
│   ├── api/                    # API routes (checkout, webhooks, orders, admin, auth)
│   ├── admin/                  # Admin dashboard
│   └── affiliate/              # Affiliate portal
├── src/
│   ├── components/             # React components by domain
│   │   ├── ui/                 # Radix UI-based (shadcn/ui style)
│   │   ├── seo/                # SEO components
│   │   └── ...                 # product, layout, admin, reviews, blog, etc.
│   ├── lib/                    # Utilities by domain
│   │   ├── auth/               # Authentication
│   │   ├── blog/               # Blog generation & management
│   │   ├── geo/                # Currency detection
│   │   ├── security/           # CSRF, rate limiting, sanitization
│   │   ├── seo/                # SEO utilities
│   │   └── ...
│   ├── hooks/                  # Custom React hooks
│   ├── translations/           # i18n (en.ts, fr.ts, zh.ts, es.ts, types.ts, seo-meta.ts)
│   ├── i18n/                   # i18n config and routing
│   ├── emails/                 # Email templates
│   └── types/                  # TypeScript types
├── content/blog/{en,fr,zh,es}/ # Blog post JSON files
├── prisma/                     # Schema and migrations
├── scripts/                    # Build, SEO, image, blog scripts
├── proxy.ts                    # Middleware (Next.js 16 — NOT middleware.ts)
├── __tests__/                  # Jest unit tests
├── e2e/                        # Playwright E2E tests
└── public/optimized/           # Optimized images (auto-generated)
```

---

## Commands

```bash
# Development
pnpm dev                    # Dev server (auto-clears webpack cache)
pnpm build                  # Production build (4GB memory, pre/post SEO hooks)
pnpm lint                   # ESLint
pnpm check-types            # tsc --noEmit

# Testing
pnpm test                   # Jest unit tests
pnpm test -- __tests__/path/to/test.ts    # Single test file
pnpm test -- --testNamePattern="name"     # Single test by name
pnpm test:translations      # Translation completeness
pnpm test:e2e               # Playwright E2E (localhost:3010)
pnpm test:e2e:ui            # Playwright with browser UI

# Validation
pnpm seo:validate           # Lenient SEO check (same as prebuild)
pnpm seo:validate:strict    # Strict SEO check (fails on error)
pnpm validate-dark-mode     # Dark mode variant coverage
pnpm validate-hydration     # Hydration anti-patterns
pnpm validate-images        # Image size limits

# Database
pnpm prisma generate        # Regenerate client (also runs on postinstall)
pnpm prisma migrate dev --name migration_name
pnpm prisma studio          # Database GUI (localhost:5555)

# Other
pnpm clear-cache            # Clear webpack cache
pnpm blog:auto:generate     # AI blog generation
pnpm repair-blog            # Fix broken blog posts
pnpm optimize-images:enhanced  # Optimize images
```

### Environment Setup
Copy `.env.local.example` to `.env.local` and configure:
- `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `DATABASE_URL`, `STRIPE_SECRET_KEY`, `ANTHROPIC_API_KEY`

---

## Code Style

- **TypeScript strict mode**, 2-space indent, single quotes, semicolons
- **Server Components by default** -- add `'use client'` only when needed
- **Import order**: React -> External libs -> Internal modules -> Types
- **Named function components** with explicit Props interfaces
- **File naming**: PascalCase (.tsx components), camelCase (.ts utilities), kebab-case (routes)
- **Path aliases**: `@/*` -> `src/*`, `@translations/*` -> `src/translations/*`

### Next.js App Router Rules (CRITICAL)
- **Metadata**: NEVER export `metadata` from a file marked with `'use client'`. This breaks the build.
  - **Pattern**: Create a Server Component `page.tsx` that exports `metadata` and imports a Client Component (e.g. `ClientPage.tsx`) for the interactive UI.
- **Hooks**: ALWAYS add `'use client'` to the very top of any file using React hooks (`useState`, `useEffect`, etc.).


### Dark Mode (Required)
Every element needs both light and dark variants.
- **Text**: `text-gray-900 dark:text-gray-50`
- **Backgrounds**: `bg-white dark:bg-gray-900`
- **CRITICAL**: `text-white` must ALWAYS have a dark variant or a colored background that persists in dark mode.
- **Validate**: `pnpm validate-dark-mode`

---

## Translations

- Two hooks available:
  - `import { useTranslation } from '@/lib/translation-context'` -- context-based: `const { t } = useTranslation()`
  - `import { useTranslation } from '@/translations'` -- direct: `useTranslation('en')`
- Access via object properties: `t.hero.headline` (not string keys)
- Adding translations: update `src/translations/types.ts`, then all 4 locale files, run `pnpm test:translations`
- All user-facing text must use translation keys. No hardcoded strings.

---

## Currency System

- Geo-detection via Vercel `x-vercel-ip-country`: US -> USD, all others -> CAD
- Client: `useCurrency()` from `src/lib/currency-context.tsx`
- Server: `detectCurrencyFromRequest()` from `src/lib/geo/currency-detector.ts`
- Pricing: `src/lib/pricing.ts`
- Always store currency with orders in the database

---

## Protected API Route Pattern

```typescript
import { requireAuth } from '@/lib/auth/session';
import { withCSRFProtection } from '@/lib/security/csrf';
import { withRateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';

export async function POST(req: Request) {
  return withRateLimit(RATE_LIMITS.CREATE,
    withCSRFProtection(async () => {
      const session = await requireAuth(req, ['admin']);
      if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });
      // handler logic
    })
  );
}
```

---

## Image Workflow

1. Source images in `public/original-images/`
2. Run `pnpm optimize-images:enhanced`
3. Output lands in `public/optimized/`
4. Reference as `/optimized/image-name.webp`
5. Validate: `pnpm validate-images`

Never generate product images (bags/boxes/logos) with AI -- use existing assets only.

---

## SEO

- Structured data (JSON-LD) for Organization, Product, FAQ, etc.
- Dynamic sitemap via `next-sitemap` (generated at postbuild)
- Two validation scripts: `prebuild-validation.ts` (lenient, CI) vs `validate-seo-compliance.ts` (strict, manual)
- `SKIP_SEO_VALIDATION=true` as emergency build bypass
- SEO components in `src/components/seo/`
- Blog style guide: `docs/BLOG_STYLE_GUIDE.md`

---

## Branding Rules

- **Purrify** is always capitalized. It is "granules" or "additive", never "powder".
- Never fabricate contact info, social handles, URLs, or file paths.
- No black dust/clouds in visuals -- odor is shown being trapped/adsorbed, never released.
- No labels on AI-generated product imagery.
- Copy tone: professional yet warm, science-backed but accessible.

---

## Deployment (Vercel)

- Build: `pnpm prisma generate && pnpm build`
- Pre-deploy: `pnpm lint && pnpm check-types && pnpm test && pnpm build`
- Cron jobs in `vercel.json` (abandoned cart emails, daily maintenance)

---

## Troubleshooting

- **Build out of memory**: Already configured with `NODE_OPTIONS="--max-old-space-size=4096"`
- **Webpack cache**: `pnpm clear-cache`
- **Stale Prisma client**: `pnpm prisma generate`
- **"Both middleware.ts and proxy.ts detected"**: Delete `middleware.ts`, use only `proxy.ts`
- **Build failing on SEO orphan pages**: Ensure prebuild uses `prebuild-validation.ts` not `validate-seo-compliance.ts --fail-on-error`
- **Hot reload broken**: `pnpm clear-cache && pnpm dev`
- **Type errors after schema change**: `pnpm prisma generate` then restart dev server

---

## Image Generation System Instructions

### [SYSTEM_INSTRUCTION: IMAGE_GENERATOR]
**Context**: Generating image prompts for Purrify.ca.
**Brand Core**: Deep saturation, volumetric lighting, "magical realism" aesthetic.

**STEP 1: CLASSIFY MODE**
[LIFESTYLE] (cats, home, nature) or [TECH] (molecules, filtration, airflow, science).

**STEP 2: APPLY STYLE PRESETS**

**IF [LIFESTYLE]:**
- **Style**: High-fidelity "Hybrid-Ghibli" aesthetic.
- **Vibe**: Magical, pristine, healthy, thriving.
- **Lighting**: Gentle dappled lighting with warm golden highlights.
- **Render**: Hand-painted animation whimsy + 8K photorealistic textures.
- **Key Elements**: Hyper-realistic cats with expressive anime-style faces. Soft painterly backgrounds.

**IF [TECH]:**
- **Style**: Cinematic Macrophotography & 3D Scientific Visualization.
- **Vibe**: Precise, powerful, clean, microscopic clarity.
- **Lighting**: Internal glowing energy, rim lighting, electric blues/purples vs deep charcoal.
- **Render**: Octane Render, ray-tracing, subsurface scattering, crystalline textures.
- **Key Elements**: Visible airflow streams, glowing activated carbon pores, atomic bonds.

**STRICT PROHIBITIONS:**
- NO LABELS on bags or bottles.
- NO BLACK CLOUDS/DUST.
- NO PURRIFY LOGOS/PACKAGING unless explicitly provided.
- ODOR MUST BE adsorbed or TRAPPED, never released.
