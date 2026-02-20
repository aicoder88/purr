# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Purrify is an e-commerce site for an activated carbon cat litter additive. Serves Canada (CAD) and USA (USD) in two languages (en, fr). Built on Next.js 16 App Router with Stripe payments, Prisma/PostgreSQL, and manual blog generation scripts.

- **Site**: https://www.purrify.ca
- **Package manager**: pnpm (never use npm or yarn)
- **Node**: >= 22.x

## Agent Memory (Persistent Defaults)

- Start by scoping with fast search (`rg --files`, `rg "<pattern>"`) before editing.
- Make the smallest viable change first; avoid broad refactors unless explicitly requested.
- Reuse existing project patterns/components before introducing new abstractions.
- Validate claims before completion: run the smallest relevant check (typecheck, lint, test, or targeted script) for touched areas.
- For UI copy changes, run `pnpm validate-i18n:hardcoded` and review `reports/i18n-hardcoded-sweep.md` before handoff.
- When requirements are ambiguous, state assumptions explicitly in the final handoff.
- If a new recurring preference appears, persist it in both `docs/AGENTS.md` and `docs/CLAUDE.md`.

## Commands

```bash
pnpm dev                # Dev server (auto-clears webpack cache via predev)
pnpm build              # Production build (4GB NODE_OPTIONS, runs pre/post SEO hooks)
pnpm lint               # ESLint
pnpm check-types        # tsc --noEmit
pnpm test               # Jest unit tests
pnpm test -- __tests__/path/to/test.ts           # Single test file
pnpm test -- --testNamePattern="test name"        # Single test by name
pnpm test:translations  # Translation completeness check
pnpm test:e2e           # Playwright E2E (base URL: localhost:3010)
pnpm test:e2e:ui        # Playwright with browser UI
pnpm seo:validate       # Lenient SEO check (same as prebuild)
pnpm seo:validate:strict # Strict SEO check (fails on any error)
pnpm validate-dark-mode # Check dark: variants exist for all elements
pnpm validate-i18n:hardcoded # Check hardcoded UI string regressions (writes reports/i18n-hardcoded-sweep.md)
pnpm validate-hydration # Check for hydration anti-patterns
pnpm prisma generate    # Regenerate Prisma client (also runs on postinstall)
pnpm prisma migrate dev --name migration_name
pnpm prisma studio      # Database GUI at localhost:5555
pnpm clear-cache        # Clear webpack cache
```

## Architecture

### Framework & Routing
- **Next.js 16 App Router** with `next-intl` (v4) for i18n
- URL structure: `/{locale}/path` (e.g., `/fr/products`). Default locale `en`.
- Locales: `en`, `fr` — configured in `src/i18n/config.ts`
- **Middleware**: `proxy.ts` (NOT `middleware.ts` — Next.js 16 change). Handles auth, i18n, AI crawler detection, security headers.
- Path aliases: `@/*` → `src/*`, `@translations/*` → `src/translations/*`

### Key Directories
- `app/[locale]/` — Internationalized content routes
- `app/api/` — API routes (checkout, webhooks/stripe, orders, admin, auth, etc.)
- `src/components/ui/` — Radix UI-based components (shadcn/ui style)
- `src/lib/` — Utilities organized by domain (auth/, blog/, seo/, security/, affiliate/, geo/)
- `src/translations/` — Translation files per locale + `types.ts` interface + `seo-meta.ts`
- `content/blog/{en,fr}/` — Blog post JSON files
- `scripts/` — Build, SEO, image, and blog automation scripts

### Data Layer
- **PostgreSQL** via Supabase, **Prisma ORM** (v7)
- Prisma singleton in `src/lib/prisma.ts` (prevents hot-reload connection issues)
- **Stripe** for payments — payment links in `src/lib/payment-links.ts`, webhooks at `app/api/webhooks/stripe/`

### Translations
- Two hooks available:
  - `import { useTranslation } from '@/lib/translation-context'` — context-based, no arg needed: `const { t } = useTranslation()`
  - `import { useTranslation } from '@/translations'` — direct, takes locale: `useTranslation('en')`
- Access: `t.hero.headline` (object property access, not string keys)
- Adding translations: update `src/translations/types.ts` interface, then both locale files (en, fr), run `pnpm test:translations`
- All user-facing text must use translation keys. No hardcoded strings, including JSX attributes like `alt`, `aria-label`, `title`, and `placeholder`.

### Currency System
- Geo-detection via Vercel `x-vercel-ip-country` header: US visitors get USD, all others get CAD
- `useCurrency()` hook from `src/lib/currency-context.tsx`
- Server-side: `detectCurrencyFromRequest()` from `src/lib/geo/currency-detector.ts`
- Pricing logic in `src/lib/pricing.ts`
- Always store currency with orders in the database

### Authentication
- **NextAuth v5** (beta) with Credentials Provider, JWT sessions
- `requireAuth()` from `src/lib/auth/session.ts` for protected API routes
- Rate limiting: `src/lib/security/rate-limit.ts` (AUTH: 5/15min, CREATE: 10/min, UPLOAD: 15/min)
- CSRF protection: `src/lib/security/csrf.ts`
- Roles: admin, editor, affiliate

### SEO
- Structured data (JSON-LD) for Organization, Product, FAQ, etc.
- Dynamic sitemap via `next-sitemap` (generated at postbuild)
- Two SEO validation scripts: `prebuild-validation.ts` (lenient, used in CI) vs `validate-seo-compliance.ts` (strict, manual)
- SEO components in `src/components/seo/`
- `SKIP_SEO_VALIDATION=true` env var as emergency build bypass

### Blog System
- JSON files in `content/blog/{en,fr}/slug.json`
- AI generation: `pnpm blog:auto:generate`
- Fix broken posts: `pnpm repair-blog`
- Style guide: `docs/BLOG_STYLE_GUIDE.md`

## Code Patterns

- **TypeScript strict mode**, 2-space indent, single quotes, semicolons
- **Server Components by default** — add `'use client'` only when needed
- **Import order**: React → External libs → Internal modules → Types
- **Named function components** with explicit Props interfaces
- **File naming**: PascalCase for components (.tsx), camelCase for utilities (.ts), kebab-case for routes
- **Dark mode required**: Every `text-white` needs a dark variant or colored background. Every `bg-white` needs `dark:bg-gray-900`. Validate with `pnpm validate-dark-mode`.
- **Hydration safety**: Never conditionally `return null` in page components. Use server-side `redirect()` or return a loading/error component instead. See `docs/HYDRATION_SAFETY.md`.
- **Next.js App Router Rules**:
  - **Metadata**: NEVER export `metadata` from a file with `'use client'`. If you need metadata + interactivity, create a Server Component `page.tsx` that exports metadata and imports a Client Component for the UI.
  - **Hooks**: ALWAYS add `'use client'` to the top of any file using React hooks (`useState`, `useEffect`, etc.).

### Protected API Route Pattern
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

## Image Workflow

- Source images go in `public/original-images/`
- Run `pnpm optimize-images:enhanced` → outputs to `public/optimized/`
- Reference as `/optimized/image-name.webp` in code
- Validate sizes: `pnpm validate-images`
- Never generate product images (bags/boxes/logos) with AI — use existing assets only

## Branding Rules

- **Purrify** is always capitalized. It is "granules" or "additive", never "powder".
- Never fabricate contact info, social handles, URLs, or file paths — verify they exist first.
- No black dust/clouds in visuals — odor is shown being trapped/adsorbed, never released.
- No labels on AI-generated product imagery.
- Copy tone: professional yet warm, science-backed but accessible. See `docs/BLOG_STYLE_GUIDE.md`.

## Deployment

- **Vercel** — build: `pnpm prisma generate && pnpm build`
- Pre-deploy: `pnpm lint && pnpm check-types && pnpm test && pnpm build`
- Cron jobs in `vercel.json` (abandoned cart emails, daily maintenance)

## Troubleshooting

- **Build out of memory**: Already configured with `NODE_OPTIONS="--max-old-space-size=4096"`
- **Webpack cache issues**: `pnpm clear-cache`
- **Stale Prisma client**: `pnpm prisma generate`
- **"Both middleware.ts and proxy.ts detected"**: Delete `middleware.ts`, use only `proxy.ts`
- **Build failing on SEO orphan pages**: Ensure prebuild uses `prebuild-validation.ts` not `validate-seo-compliance.ts --fail-on-error`
- **Hot reload broken**: `pnpm clear-cache && pnpm dev`
- **Type errors after schema change**: `pnpm prisma generate` then restart dev server
