# AGENTS.md - Purrify Project Documentation

> This file contains essential information for AI coding agents working on the Purrify project. Read this file thoroughly before making any changes.

## Core Mandates

### Package Manager: pnpm ONLY
- This project uses `pnpm` exclusively.
- Do not use `npm` or `yarn` for manual commands.

### Agent Memory (Persistent Defaults)
- Start by scoping with fast search (`rg --files`, `rg "<pattern>"`) before editing.
- Make the smallest viable change first; avoid broad refactors unless explicitly requested.
- Reuse existing project patterns/components before introducing new abstractions.
- Validate claims before completion: run the smallest relevant check (typecheck, lint, test, or targeted script) for touched areas.
- For UI copy changes, run `pnpm validate-i18n:hardcoded` and inspect `reports/i18n-hardcoded-sweep.md` before handoff.
- When requirements are ambiguous, state assumptions explicitly in the final handoff.
- If a new recurring preference appears, persist it in both `docs/AGENTS.md` and `docs/CLAUDE.md`.

### No Fabrication Rule
- Never fabricate or assume the existence of:
  - contact info, social handles, hashtags
  - file paths, image paths, URLs
  - APIs, scripts, components, database models
- Verify first by checking the filesystem/code.

### Hydration Safety
- Never conditionally `return null` in page components based on client state.
- Use server-side redirects or explicit loading/error UI.
- Reference: `docs/HYDRATION_SAFETY.md`

## Project Overview

**Purrify** is an e-commerce website for an activated carbon cat litter additive product. It serves Canada (CAD) and USA (USD) in two languages (English, French), with a full store, blog, affiliate system, retailer workflows, and SEO tooling.

- **Website**: https://www.purrify.ca
- **Primary Market**: Canada (CAD)
- **Secondary Market**: USA (USD)
- **Node Version**: `22.x`
- **Package Manager**: `pnpm`

## Technology Stack

### Core Framework
- **Next.js 16.0.10** - App Router (primary)
- **React 19.2.3**
- **TypeScript 5.9.3** (strict mode)
- **next-intl 4.8.2** for i18n routing/messages

### Database & ORM
- **PostgreSQL**
- **Prisma 7.3.0** (`prisma` + `@prisma/client`)
- Prisma singleton in `src/lib/prisma.ts`

### Authentication & Security
- **NextAuth 5.0.0-beta.25** (JWT session strategy)
- `requireAuth()` helper in `src/lib/auth/session.ts`
- Rate limiting in `src/lib/security/rate-limit.ts` / `src/lib/security/rate-limit-app.ts`
- CSRF helpers in `src/lib/security/csrf.ts`

### Styling & UI
- **Tailwind CSS 3.4.19**
- **Radix UI** (shadcn-style components in `src/components/ui/`)
- **Lucide React**
- **Framer Motion**
- **Embla Carousel**

### Payment & Commerce
- **Stripe 18.5.0**
- Payment links in `src/lib/payment-links.ts`
- Stripe webhooks under `app/api/webhooks/stripe/`

### AI & Content
- **Anthropic SDK** and **OpenAI SDK**
- Blog automation scripts in `scripts/` and blog JSON content under `content/blog/{en,fr}/`
- Blog generation is manual: `pnpm blog:auto:generate` (no automatic scheduling)

### Monitoring & Analytics
- **Vercel Analytics**
- Custom UTM tracking

### Testing
- **Jest 30.2.0**
- **Playwright 1.57.0**
- **@testing-library/react**

## ⛔ Anti-Patterns (Never Do These)

| Anti-Pattern | Example | Correct Behavior |
|--------------|---------|------------------|
| **The Fabricator** | Referencing `/images/logo.png` that does not exist | Verify in filesystem first |
| **The Guesser** | Assuming `lodash` is installed | Check `package.json` |
| **The Over-Engineer** | Creating `ButtonFactory` for one button | Write the simple button |
| **The Lazy Verifier** | Saying "Done" without validation | Run relevant checks (`build`, tests, lint) |
| **The Reformatter** | Reformatting unrelated lines | Touch only requested/affected code |
| **The Silent Changer** | Removing code without calling it out | Explain risk before deleting |
| **The Powder User** | Calling Purrify a "powder" | Use "granules" or "additive" |
| **The Hardcoder** | Hardcoded UI strings (`alt`, `aria-label`, button/link text, JSX text) | Use translation keys/hook output |
| **The White-on-White** | `text-white` on white/light bg | Ensure contrast in both light/dark |
| **The Label Maker** | Labels on generated bags/bottles | Never use labels on AI images |
| **The Dust Maker** | Black dust clouds | Show odor trapped/adsorbed only |
| **The Wrong Folder** | Random image storage | Source: `public/original-images/`, output: `public/optimized/` |

## Project Structure

```
/
├── app/                        # Next.js App Router routes (primary)
│   ├── [locale]/               # i18n routes (en, fr, zh, es)
│   ├── api/                    # Route handlers
│   ├── admin/                  # Admin pages
│   └── affiliate/              # Affiliate pages
├── pages/api/                  # Legacy API routes (keep stable unless migrating)
├── src/
│   ├── components/             # UI and domain components
│   │   ├── ui/                 # Radix/shadcn-style primitives
│   │   ├── seo/                # SEO components
│   │   └── ...
│   ├── lib/                    # Utilities by domain
│   │   ├── auth/
│   │   ├── blog/
│   │   ├── geo/
│   │   ├── security/
│   │   └── ...
│   ├── i18n/                   # next-intl config/routing/request
│   ├── translations/           # Locale dictionaries + types
│   ├── hooks/
│   ├── emails/
│   └── types/
├── content/blog/{en,fr}/       # Blog post JSON
├── prisma/                     # Prisma schema + migrations
├── scripts/                    # Build, SEO, image, blog scripts
├── proxy.ts                    # Middleware entry (Next.js 16)
├── __tests__/                  # Jest tests
├── e2e/                        # Playwright tests
└── public/
    ├── original-images/        # Image inputs
    └── optimized/              # Optimized outputs
```

## Build and Development Commands

### Essential Commands

```bash
# Development
pnpm dev

# Build pipeline
pnpm prebuild
pnpm prebuild:seo
pnpm build
pnpm start

# Quality
pnpm lint
pnpm lint --fix
pnpm check-types

# Tests
pnpm test
pnpm test:watch
pnpm test:coverage
pnpm test:translations
pnpm test:e2e
pnpm test:e2e:ui

# Validation
pnpm validate-dark-mode
pnpm validate-i18n:hardcoded
pnpm validate-hydration
pnpm validate-images
pnpm validate-links
pnpm validate-schemas
pnpm validate-sitemap

# SEO
pnpm seo:validate
pnpm seo:validate:strict
pnpm seo:health-check
pnpm seo:report
pnpm bundle:analyze
pnpm performance:audit

# Blog
pnpm blog:auto:generate
pnpm blog:migrate
pnpm repair-blog

# Images
pnpm optimize-images
pnpm optimize-images:enhanced
pnpm optimize-images:watch

# Database
pnpm prisma generate
pnpm prisma migrate dev --name migration_name
pnpm prisma studio
```

### Environment Setup

Copy `.env.local.example` to `.env.local` and configure at least:
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `DATABASE_URL`
- `STRIPE_SECRET_KEY`
- `ANTHROPIC_API_KEY`

## Code Style Guidelines

### TypeScript Conventions
- Strict typing, no implicit any
- 2-space indentation
- Single quotes
- Semicolons required
- Explicit naming over abbreviations

### File Naming
- React components: PascalCase `.tsx`
- Utilities/helpers: camelCase `.ts`
- Routes/content slugs: kebab-case

### Component Patterns
- Prefer Server Components by default; use `'use client'` only when needed.
- Import order: React -> external libs -> internal modules -> types.
- **Next.js App Router Rules (CRITICAL)**:
  - **Metadata**: NEVER export `metadata` from a file marked with `'use client'`. Create a Server Component `page.tsx` that exports `metadata` and imports a Client Component for the application logic.
  - **Hooks**: ALWAYS add `'use client'` to the very top of any component file using React hooks (`useState`, `useEffect`).


### Path Aliases
- `@/*` -> `src/*`
- `@translations/*` -> `src/translations/*`

### Dark Mode (Required)
- Every text/background choice must work in both themes.
- Any `text-white` usage must have safe contrast in dark mode.
- Validate with `pnpm validate-dark-mode`.

## Testing Instructions

### Unit Testing (Jest)

```bash
pnpm test -- __tests__/hooks/useBreadcrumb.test.ts
pnpm test -- --testNamePattern="specific test name"
```

### E2E Testing (Playwright)
- Base URL: `http://localhost:3010`
- Run with `pnpm test:e2e`
- Debug with `pnpm test:e2e:ui`

## Database & ORM

### Prisma Schema
- Schema: `prisma/schema.prisma`
- Typical models: `User`, `Order`, `Product`, `BlogPost`, `Affiliate`, `Retailer`, `ReferralCode`, `Subscription`

### Connection Handling
- Use singleton Prisma client in `src/lib/prisma.ts`.
- Regenerate on schema/tooling changes: `pnpm prisma generate`.

## Internationalization (i18n)

### Supported Locales
- `en` (default)
- `fr`

### i18n Architecture
- Locale routing/config under `src/i18n/`
- Middleware file is `proxy.ts` (not `middleware.ts`)
- Translation dictionaries in `src/translations/`

### Translation Usage
Two patterns are used in this codebase:

```tsx
import { useTranslation } from '@/lib/translation-context';

function ComponentWithContext() {
  const { t } = useTranslation();
  return <h1>{t.hero.headline}</h1>;
}
```

```tsx
import { useTranslation } from '@/translations';

function ComponentWithDirectLocale() {
  const { t } = useTranslation('en');
  return <h1>{t.hero.headline}</h1>;
}
```

### Adding New Translations
1. Update `src/translations/types.ts`
2. Add keys to `en.ts` and `fr.ts`
3. Run `pnpm test:translations`

## Currency System

- Country detection uses Vercel `x-vercel-ip-country`.
- Client hook: `useCurrency()` from `src/lib/currency-context.tsx`
- Server helper: `detectCurrencyFromRequest()` from `src/lib/geo/currency-detector.ts`
- Always persist currency with order data.

## Security Considerations

### Authentication
- NextAuth v5 beta with JWT sessions.
- Protected route helper: `requireAuth()` from `src/lib/auth/session.ts`.
- Roles used in app: `admin`, `editor`, `affiliate`.

### Rate Limits and CSRF
- Rate limits: `src/lib/security/rate-limit.ts` and `src/lib/security/rate-limit-app.ts`
- CSRF helpers: `src/lib/security/csrf.ts`
- Input sanitization: `src/lib/security/sanitize.ts`

### Protected API Route Pattern (App Route)

```typescript
import { requireAuth } from '@/lib/auth/session';

export async function POST(request: Request) {
  const { authorized, session } = await requireAuth();

  if (!authorized || !session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // handler logic
  return Response.json({ success: true });
}
```

## Image Workflow

1. Put source images in `public/original-images/`
2. Run `pnpm optimize-images:enhanced`
3. Output files are written to `public/optimized/`
4. Reference as `/optimized/image-name.webp`
5. Validate sizes using `pnpm validate-images`

Never generate product packaging (bags/boxes/logos) with AI unless explicit approved assets are provided.

## SEO & Performance

### SEO Architecture
- Structured data (JSON-LD) via SEO components in `src/components/seo/`
- Dynamic sitemap from `next-sitemap` at postbuild
- Prebuild validation: `scripts/seo/prebuild-validation.ts`
- Strict validation: `scripts/seo/validate-seo-compliance.ts`
- Emergency bypass: `SKIP_SEO_VALIDATION=true`

### Key Scripts
```bash
pnpm seo:validate
pnpm seo:validate:strict
pnpm seo:validate:images
pnpm seo:validate:canonicals
pnpm seo:report
```

## Deployment

### Vercel Configuration
- Build command: `pnpm prisma generate && pnpm build`
- Framework: Next.js
- Output: `.next`

### Pre-deployment Checklist
1. `pnpm lint`
2. `pnpm check-types`
3. `pnpm test`
4. `pnpm build`
5. `pnpm test:e2e`
6. `pnpm seo:validate`

### Post-deployment Verification
- Check `/api/health/storage`
- Verify Stripe webhooks
- Validate checkout/login critical paths
- Monitor Vercel logs for regressions

## Common Issues & Solutions

### Build Failures
- Out-of-memory: build already sets `NODE_OPTIONS="--max-old-space-size=4096"`
- Cache issues: `pnpm clear-cache`
- Hydration issues: run `pnpm validate-hydration`

### Prisma/Database Issues
- Connection errors: verify `DATABASE_URL`
- Stale client: `pnpm prisma generate`

### Next.js Middleware Conflict
- If both `middleware.ts` and `proxy.ts` exist, remove `middleware.ts`.

### SEO Validation Confusion
- Prebuild is lenient (`prebuild-validation.ts`)
- `seo:validate:strict` is fail-on-error mode

## Contact & Resources

- **Site URL**: https://www.purrify.ca
- **Admin Panel**: https://www.purrify.ca/admin
- **Affiliate Portal**: https://www.purrify.ca/affiliate
- **Support Email**: meow@purrify.ca
- **Blog Style Guide**: `docs/BLOG_STYLE_GUIDE.md`

## Branding Rules

- Always capitalize **Purrify**.
- Use "granules" or "additive"; never call the product a "powder".
- No fabricated social handles, contact details, URLs, or file paths.
- No labels on AI-generated product imagery.
- No black dust/cloud visuals; odor must be shown as trapped/adsorbed.
- Copy tone should be professional, warm, science-backed, and accessible.

---

## 🤖 System Instructions

### [SYSTEM_INSTRUCTION: IMAGE_GENERATOR]
**Context**: You are generating image prompts for Purrify.ca.
**Brand Core**: All images must feature deep saturation, volumetric lighting, and a "magical realism" aesthetic.

**STEP 1: CLASSIFY MODE**
Determine if the request is [LIFESTYLE] (cats, home, nature) or [TECH] (molecules, filtration, airflow, science).

**STEP 2: APPLY STYLE PRESETS**

**IF [LIFESTYLE]:**
- **Style**: High-fidelity "Hybrid-Ghibli" aesthetic.
- **Vibe**: Magical, pristine, healthy, and thriving.
- **Lighting**: Gentle dappled lighting with warm golden highlights.
- **Render**: Hand-painted animation whimsy + 8K photorealistic textures.
- **Key Elements**: Hyper-realistic cats with expressive anime-style faces. Soft painterly bokeh backgrounds.

**IF [TECH]:**
- **Style**: Cinematic Macrophotography & 3D Scientific Visualization.
- **Vibe**: Precise, powerful, clean, microscopic clarity.
- **Lighting**: Internal glowing energy, rim lighting, electric blues and purples vs deep charcoal.
- **Render**: Octane Render, ray-tracing, subsurface scattering, crystalline textures.
- **Key Elements**: Visible airflow streams, glowing activated carbon pores, atomic bonds, sleek industrial design.

**STEP 3: GENERATE PROMPT TEMPLATE**
- **Subject**: [Describe the core subject/action in detail]
- **Setting**: [Describe the environment]
- **Art Direction**: [Insert the relevant preset text from Step 2]
- **Color Palette**: Vivid and punchy. Lifestyle: rich emeralds, deep ambers, vibrant pastels. Tech: neon cyans, electric blues, matte charcoal.
- **Camera**: Lifestyle -> wide angle/eye level. Tech -> macro/electron microscope style.

**STRICT PROHIBITIONS:**
- **NO LABELS** on bags or bottles.
- **NO BLACK CLOUDS/DUST**.
- **NO PURRIFY LOGOS/PACKAGING** unless explicitly provided.
- **ODOR MUST BE ADSORBED/TRAPPED**, never released.
