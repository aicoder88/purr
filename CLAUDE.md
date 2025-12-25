# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

Purrify is a production Next.js e-commerce platform for activated carbon cat litter additive. The site serves both B2C (direct consumer sales via Stripe) and B2B (wholesale retailer management) with multi-language support (en, fr, zh), an advanced blog system, and strict dark mode requirements.

**Critical Constraints:**
- Pages Router architecture (NOT App Router)
- Dark mode mandatory on ALL elements (build fails without compliance)
- Multi-language support via Next.js i18n + custom translation context
- Strict TypeScript enforcement (no `any` types)
- Performance-first optimization (code splitting, image optimization)

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (Pages Router) + React 19 + TypeScript |
| **Styling** | Tailwind CSS + Radix UI (shadcn/ui) |
| **Database** | PostgreSQL + Prisma ORM |
| **Auth** | NextAuth.js (JWT, roles: admin/editor/user) |
| **Payments** | Stripe (consumer + wholesale) |
| **Email** | Resend + EmailJS |
| **Blog** | TipTap rich text + filesystem JSON (`/content/blog/{locale}/*.json`) |
| **AI** | Anthropic SDK + OpenAI API (content generation) |
| **Shipping** | ShipStation (webhook-based) |
| **Deploy** | Vercel (Node.js 22.x) + GitHub Actions CI/CD |
| **MCP** | Supabase MCP server for database operations |

## Quick Start

```bash
# Install (legacy peer deps required for React 19 compatibility)
npm install --legacy-peer-deps

# Development
npm run dev                    # Start dev server (auto-clears webpack cache)

# Pre-commit validation (ALL must pass)
npm run lint && npm run check-types && npm run validate-dark-mode

# Build
npm run build                  # Production build
```

## Essential Commands

### Development
```bash
npm run dev                    # Start dev server (runs predev cache clear)
npm run predev                 # Clear webpack cache before dev
npm run clear-cache            # Manual cache clear if hot reload stuck
```

### Validation (MANDATORY before commit)
```bash
npm run lint                   # ESLint (MUST pass with 0 warnings)
npm run check-types            # TypeScript strict mode (MUST pass with 0 errors)
npm run check-types:unused     # Check for unused identifiers
npm run validate-dark-mode     # Dark mode compliance (BUILD BLOCKS WITHOUT)
npm run validate-blog-images   # Verify blog images exist
npm run validate-links         # Validate internal and external links
```

### Testing
```bash
npm run test                   # Run translation completeness tests
npm run test:translations      # Jest translation completeness
npm run test:e2e               # Playwright E2E tests (blog, homepage)
npm run test:e2e -- --debug    # E2E debug mode
npm run test:e2e:security      # Security E2E tests (auth, XSS, CSRF, rate-limiting, file-upload)
npm run e2e:web                # Alternative E2E runner

# Single test execution
npx jest __tests__/translation-completeness.test.js --watch
npx playwright test e2e/homepage.spec.ts
npx playwright test e2e/security-xss.spec.ts
```

### Build & Deploy
```bash
npm run build                  # Production build (prebuild + build + postbuild)
npm run start                  # Start production server locally
npm run analyze                # Build with bundle analysis
npm run purge-vercel-cache     # Clear Vercel edge cache
```

### Image Optimization
```bash
npm run optimize-images        # Optimize single image
npm run optimize-images:enhanced # Enhanced optimization (AVIF/WebP/JPG)
npm run optimize-images:watch  # Watch mode for automatic optimization
npm run optimize-all-images    # Batch optimize all images
npm run add-image-dimensions   # Add dimensions metadata to images
```

### Blog Management
```bash
npm run blog:auto:generate     # Run automated blog post generation (AI)
npm run blog:migrate           # Migrate blog posts to new format
npm run repair-blog            # Repair broken/corrupted blog posts
```

### SEO & Performance
```bash
npm run seo:optimize           # SEO optimization
npm run seo:keywords           # Keyword analysis
npm run seo:health-check       # Comprehensive SEO health check
npm run seo:fix                # Auto-fix SEO issues
npm run bundle:analyze         # Analyze bundle size
npm run cache:optimize         # Cache optimization
npm run performance:audit      # Complete audit (SEO + bundle + cache)
```

### Database (Prisma)
```bash
npx prisma generate            # Generate Prisma client (runs on postinstall)
npx prisma migrate dev         # Create/apply migrations in development
npx prisma studio              # Open Prisma Studio GUI
npx prisma db push             # Push schema changes without migration (dev only)
npm audit                      # Check for security vulnerabilities (run periodically)
```

## Architecture Overview

### Directory Structure

```
pages/                    # Pages Router (NOT App Router)
├── api/                  # API routes
│   ├── auth/[...nextauth].ts       # NextAuth authentication
│   ├── admin/blog/*                # Blog CRUD (protected)
│   ├── blog-posts.ts               # Public blog API
│   ├── create-checkout-session.ts  # Stripe checkout
│   ├── retailer/*                  # B2B endpoints
│   ├── webhooks/stripe.ts          # Payment webhooks
│   └── cron/*                      # Scheduled jobs (require CRON_SECRET)
├── admin/                # Protected admin panel
├── blog/                 # Blog pages (SSG + ISR)
├── products/             # Product pages (SSG)
└── [locale]/             # Multi-language routes (fr/, zh/)

src/
├── components/
│   ├── admin/            # Admin panel (RichTextEditor, AdminLayout)
│   ├── sections/         # Page sections (hero, testimonials, CTA)
│   ├── ui/               # Radix UI components (55+ shadcn/ui)
│   ├── blog/             # Blog-specific components
│   ├── layout/           # Header, Footer, Layout
│   ├── seo/              # JSON-LD schema components
│   └── performance/      # LazyLoad, PerformanceMonitor
├── lib/
│   ├── blog/             # Blog system (filesystem-based)
│   │   ├── content-store.ts              # Read/write JSON files
│   │   ├── automated-content-generator.ts # AI content generation
│   │   └── seo-generator.ts              # SEO optimization
│   ├── auth/session.ts   # Session utilities + requireAuth middleware
│   ├── security/         # Security middleware
│   │   ├── sanitize.ts   # XSS protection (DOMPurify)
│   │   ├── csrf.ts       # CSRF token validation
│   │   └── rate-limit.ts # Rate limiting
│   ├── cart-context.tsx  # Shopping cart (encrypted localStorage)
│   ├── translation-context.tsx # i18n context (useTranslation hook)
│   ├── seo-utils.ts      # Structured data, hreflang, meta tags
│   └── prisma.ts         # Prisma client singleton
├── translations/         # i18n files (en.ts, fr.ts, zh.ts)
├── data/                 # Static data, blog topics, locations
└── types/                # TypeScript interfaces

content/blog/             # Filesystem blog storage
├── en/                   # English posts (*.json)
├── fr/                   # French posts
├── zh/                   # Chinese posts
├── categories.json       # Category metadata
└── tags.json             # Tag metadata

scripts/                  # Build & optimization scripts
prisma/schema.prisma      # Database schema
```

### Data Flow

```
Next.js Pages Router
    ↓
Auth Middleware (session.ts checks JWT roles)
    ↓
Security Layer (CSRF, rate limiting, sanitization)
    ↓
Business Logic (src/lib/*)
    ↓
Data Storage:
  - PostgreSQL (Prisma): Users, Orders, Products, Retailers
  - Filesystem (JSON): Blog content (/content/blog/{locale}/*.json)
    ↓
Response (SSG/ISR for blogs, SSR for dynamic, API for mutations)
```

## Dark Mode Compliance (CRITICAL)

**MANDATORY: Every element MUST have dark: variant - NO EXCEPTIONS**

### Quick Reference
```css
/* Typography */
text-gray-900 dark:text-gray-50        /* H1-H2 */
text-gray-800 dark:text-gray-100       /* H3-H4 */
text-gray-700 dark:text-gray-200       /* Body */
text-gray-600 dark:text-gray-300       /* Secondary */

/* Backgrounds */
bg-white dark:bg-gray-900              /* Primary */
bg-gray-50 dark:bg-gray-800            /* Secondary */
bg-blue-50 dark:bg-blue-900/20         /* Colored */

/* Borders */
border-gray-200 dark:border-gray-700   /* Standard */

/* CRITICAL: text-white ALWAYS needs dark variant */
text-white dark:text-gray-100
```

### Validation
```bash
npm run validate-dark-mode  # MUST return 0 errors before commit
```

Build Failure: Dark mode validation runs in pre-commit hook. Commits blocked if violations exist.

## Security Implementation

### Security Middleware (`src/lib/security/`)

| File | Purpose | Usage |
|------|---------|-------|
| `sanitize.ts` | XSS protection via DOMPurify | `sanitizeBlogPost(post)` |
| `csrf.ts` | CSRF token validation | `withCSRFProtection(handler)` |
| `rate-limit.ts` | Request rate limiting | `withRateLimit(RATE_LIMITS.CREATE, handler)` |

### Rate Limits

| Type | Window | Max Requests | Use Case |
|------|--------|--------------|----------|
| AUTH | 15 min | 5 | Login attempts |
| CREATE | 1 min | 10 | Content creation |
| READ | 1 min | 100 | Content reading |
| UPLOAD | 1 min | 5 | Image uploads |

### Protected Routes Pattern
```typescript
import { requireAuth } from '@/lib/auth/session';
import { withCSRFProtection } from '@/lib/security/csrf';
import { withRateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';

export default withRateLimit(RATE_LIMITS.CREATE,
  withCSRFProtection(async (req, res) => {
    const session = await requireAuth(req, res, ['admin', 'editor']);
    if (!session) return;
    // Protected logic here
  })
);
```

## Key Patterns

### Translation System
```typescript
import { useTranslation } from '@/lib/translation-context';

function Component() {
  const { t, locale } = useTranslation();
  return <button>{t('addToCart')}</button>; // NEVER hardcode text
}
```

**Adding translations:** Update `en.ts`, `fr.ts`, `zh.ts` in `src/translations/`, then run `npm run test:translations`.

### Cart Context
```typescript
import { useCart } from '@/lib/cart-context';

function Component() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  // Cart auto-persists to encrypted localStorage
}
```

### SEO Utilities
```typescript
import { generateProductPageSchema, generateArticlePageSchema } from '@/lib/seo-utils';
import { HomepageSchema, ProductSchema, ArticleSchema } from '@/components/seo/json-ld-schema';

// In pages
<HomepageSchema locale='en' />
<ProductSchema productId='purrify-50g' locale='en' />
```

### Dynamic Imports (Performance)
```typescript
import dynamic from 'next/dynamic';

const TestimonialsSection = dynamic(() => import('@/components/sections/testimonials'), {
  loading: () => <div>Loading...</div>,
  ssr: true
});

const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), {
  ssr: false
});
```

### ISR for Blog Posts
```typescript
export async function getStaticProps({ params }) {
  return {
    props: { post },
    revalidate: 3600 // Revalidate every hour
  };
}
```

## Database Schema (Prisma)

Key models in `prisma/schema.prisma`:

| Model | Purpose |
|-------|---------|
| `User` | NextAuth users with orders, referrals |
| `Retailer` | B2B wholesale accounts (status: PENDING/ACTIVE/SUSPENDED/REJECTED) |
| `Order` | Consumer orders with Stripe integration |
| `RetailerOrder` | B2B orders with ShipStation tracking |
| `Product` | Products with price, wholesalePrice, minimumOrder |
| `BlogPost` | Blog content with slug, locale, status, keywords |
| `Referral` | Referral tracking with commission |
| `AuditLog` | Compliance logging for all changes |

**Conventions:** IDs use `cuid()`, prices as `Float`, customer PII encrypted at app level.

## API Routes

### Public
- `GET /api/blog-posts?locale=en&page=1&limit=10` - Paginated blog posts
- `GET /api/blog-posts?slug={slug}` - Single post

### Protected (Admin/Editor)
- `POST /api/admin/blog/posts` - Create/update post
- `DELETE /api/admin/blog/posts/[slug]` - Delete post
- `POST /api/admin/blog/upload-image` - Upload images
- `POST /api/admin/blog/generate-content` - AI content generation

### Payments
- `POST /api/create-checkout-session` - Stripe checkout
- `POST /api/webhooks/stripe` - Stripe webhooks
- `POST /api/retailer/create-checkout` - B2B checkout

### Cron (require CRON_SECRET)
- `GET /api/cron/publish-scheduled-posts` - Daily at midnight
- `POST /api/cron/generate-blog-post` - Daily at 6am

## Legal & Content Guidelines

**NO direct competitor brand comparisons:**
- **Purrify vs Brand X**
- **Activated Carbon vs Baking Soda Deodorizers**

**Location pages:** Use partnership positioning, not competitive.
- **"Better than local pet stores"**
- **"Ask your local pet store to stock Purrify"**

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Hot reload not working | `npm run predev && npm run dev` |
| Dark mode validation failing | Add missing `dark:*` variants |
| TypeScript errors | `npm run check-types` and fix all |
| Blog images missing | `npm run validate-blog-images` |
| Translation missing | Add keys to all locale files, run `npm run test:translations` |
| Performance issues | `npm run performance:audit && npm run analyze` |

## Deployment

### Vercel Configuration
- **Project ID:** `prj_4U4S5H54ifEUlIrWw8ebYtvxZBT2`
- **Team ID:** `team_9MD2gEmcma1CnApg7QalkGj8`
- **Production URL:** `https://purrify.ca`
- **Node Version:** 22.x

### Environment Variables (Vercel Dashboard)
`DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `EDITOR_EMAIL`, `EDITOR_PASSWORD`, `RESEND_API_KEY`, `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `CRON_SECRET`, `NEXT_PUBLIC_SITE_URL`

### Cron Jobs (vercel.json)
- `0 0 * * *` - Publish scheduled posts (midnight)
- `0 6 * * *` - Auto-generate blog content (6am)

## Git Workflow

### Commit Format
```bash
git commit -m "feat: add blog scheduling functionality"
git commit -m "fix: dark mode validation on admin components"
git commit -m "perf: optimize image loading with AVIF format"
```

### Pre-Commit (Husky)
Runs automatically: `lint`, `check-types`, `validate-dark-mode`, `validate-blog-images`

### Before PR
```bash
npm run lint                # 0 warnings
npm run check-types         # 0 errors
npm run validate-dark-mode  # 0 violations
npm run test:translations   # All locales complete
npm run test:e2e            # E2E tests pass
npm audit                   # No critical vulnerabilities
```

## Documentation Reference

| File | Purpose |
|------|---------|
| `CLAUDE.md` | AI development guidelines (this file) |
| `AGENTS.md` | Quick developer reference |
| `docs/REFERENCE.md` | Dark mode colors, SEO playbook, JSON-LD schemas |
| `docs/BLOG_SYSTEM_GUIDE.md` | Blog system documentation |
| `docs/SECURITY.md` | Security implementation details |
| `docs/PROJECT_OVERVIEW.md` | System architecture |

## MCP Integration

Supabase MCP server available for database operations:
- `mcp__supabase__list_tables` - List database tables
- `mcp__supabase__execute_sql` - Execute SQL queries
- `mcp__supabase__apply_migration` - Apply migrations
- `mcp__supabase__search_docs` - Search Supabase docs

Prefer MCP tools for database introspection when available.

---

**Code Quality:** All code must pass lint (0 warnings), types (0 errors), dark mode validation (0 violations), and security checks before deployment.
