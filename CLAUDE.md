# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

Purrify is a production Next.js 15 e-commerce platform for activated carbon cat litter additive. The site serves both B2C (direct consumer sales via Stripe) and B2B (wholesale retailer management) with multi-language support (en, fr, zh), an advanced blog system, and strict dark mode requirements.

**Critical Constraints:**
- Pages Router architecture (NOT App Router)
- Dark mode mandatory on ALL elements (build fails without compliance)
- Multi-language support via Next.js i18n + custom translation context
- Strict TypeScript enforcement
- Performance-first optimization (code splitting, image optimization)

## Tech Stack

**Core:** Next.js 15 (Pages Router) + TypeScript + Tailwind CSS + Radix UI (shadcn/ui)
**Database:** PostgreSQL + Prisma ORM
**Auth:** NextAuth.js (JWT strategy with role-based access)
**Payments:** Stripe (consumer + wholesale)
**Email:** Resend + EmailJS
**Blog:** TipTap rich text editor + filesystem-based JSON storage
**AI:** Anthropic SDK + OpenAI API (automated content generation)
**Deploy:** Vercel (Node.js 22.x)

## Architecture Overview

### Routing & Data Flow

```
Next.js Pages Router
    ↓
Auth Middleware (session.ts checks JWT roles: admin/editor/user)
    ↓
Business Logic Layer (src/lib/*)
    ↓
Data Storage:
  - PostgreSQL (Prisma): Users, Orders, Products, Retailers
  - Filesystem (JSON): Blog content (/content/blog/{locale}/*.json)
    ↓
Response (SSG/ISR for blogs, SSR for dynamic pages, API routes for mutations)
```

### Directory Structure

```
pages/                    # Pages Router (NOT App Router)
├── api/                  # API routes
│   ├── auth/[...nextauth].ts       # NextAuth authentication
│   ├── admin/blog/*                # Blog CRUD (protected)
│   ├── blog-posts.ts               # Public blog API
│   ├── create-checkout-session.ts  # Stripe checkout
│   ├── retailer/*                  # B2B endpoints
│   └── webhooks/stripe.ts          # Payment webhooks
├── admin/                # Protected admin panel
│   ├── login.tsx         # Admin login
│   └── blog/
│       ├── index.tsx     # Blog posts list
│       └── new.tsx       # Rich text editor with auto-save
├── blog/
│   ├── [slug].tsx        # Dynamic blog posts (SSG + ISR)
│   └── index.tsx         # Blog listing
├── products/             # Product pages (SSG)
├── [locale]/             # Multi-language routes (fr/, zh/)
└── index.tsx             # Homepage

src/
├── components/
│   ├── admin/            # Admin panel components (RichTextEditor, AdminLayout)
│   ├── sections/         # Page sections (hero, testimonials, CTA)
│   ├── ui/               # Radix UI components (55+ shadcn/ui components)
│   ├── blog/             # Blog-specific (RelatedArticles)
│   ├── layout/           # Header, Footer, Layout
│   └── performance/      # LazyLoad, PerformanceMonitor
├── lib/
│   ├── blog/             # Blog system (filesystem-based)
│   │   ├── content-store.ts              # Read/write JSON files
│   │   ├── automated-content-generator.ts # AI content generation
│   │   ├── seo-generator.ts              # SEO optimization
│   │   └── sitemap-generator.ts          # Dynamic sitemap
│   ├── auth/session.ts   # Session utilities + requireAuth middleware
│   ├── cart-context.tsx  # Shopping cart (encrypted localStorage)
│   ├── translation-context.tsx # i18n context (useTranslation hook)
│   ├── seo-utils.ts      # Structured data, hreflang, meta tags
│   ├── prisma.ts         # Prisma client singleton
│   └── [30+ utilities]   # Payment, analytics, caching, etc.
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
├── optimize-images-enhanced.js   # AVIF/WebP generation
├── generate-sitemap.js           # SEO sitemap generation
├── dark-mode-validator.js        # Dark mode compliance check (MANDATORY)
├── seo-keyword-analysis.ts       # Keyword extraction
├── run-auto-blog.ts              # Automated blog generation
└── [20+ scripts]

prisma/
└── schema.prisma         # Database schema (User, Order, Retailer, Product)
```

## Essential Commands

### Development
```bash
npm run dev                 # Start dev server (runs predev cache clear)
npm run predev              # Clear webpack cache before dev
npm run clear-cache         # Manual cache clear if hot reload stuck
```

### Pre-Commit Validation (MANDATORY)
```bash
npm run lint                # ESLint (MUST pass with 0 warnings)
npm run check-types         # TypeScript strict mode (MUST pass with 0 errors)
npm run validate-dark-mode  # Dark mode compliance (BUILD BLOCKS WITHOUT)
npm run validate-blog-images # Verify blog images exist
```

### Build & Deploy
```bash
npm run build               # Production build (prebuild + build + postbuild)
npm run start               # Start production server locally
npm run analyze             # Build with bundle analysis
```

### Testing
```bash
npm run test:translations   # Jest translation completeness
npm run test:e2e            # Playwright E2E tests
npm run test:e2e -- --debug # E2E debug mode

# Single test execution
npx jest __tests__/translation-completeness.test.js --watch
npx playwright test e2e/homepage.spec.ts
```

### Optimization & Analysis
```bash
npm run performance:audit   # Complete audit (SEO + bundle + cache)
npm run seo:optimize        # SEO optimization
npm run bundle:analyze      # Analyze bundle size
npm run optimize-images     # Optimize single image
npm run optimize-all-images # Batch optimize all images
npm run purge-vercel-cache  # Clear Vercel edge cache
```

### Blog Management
```bash
npm run blog:auto:generate  # Run automated blog post generation (AI)
```

## Key Architectural Patterns

### Blog System (Hybrid Filesystem + Database)

**Content Storage:**
- Blog posts stored as JSON files in `/content/blog/{locale}/{slug}.json`
- Categories and tags in `/content/categories.json` and `/content/tags.json`
- Prisma database stores user-generated content metadata (referrals, orders)

**Workflow:**
```
Admin Editor (/admin/blog/new)
    ↓ Auto-save every 30s
ContentStore.savePost()
    ↓ Write JSON file
/content/blog/{locale}/{slug}.json
    ↓ Build time
getStaticProps() reads JSON
    ↓
[slug].tsx renders static HTML (ISR enabled)
```

**Key Features:**
- **Auto-save:** Drafts saved to localStorage + server every 30 seconds
- **Scheduling:** Posts can be `status: 'scheduled'` with `scheduledDate`
- **Multi-language:** Each locale has own directory (en/, fr/, zh/)
- **SEO Scoring:** Real-time SEO recommendations in editor
- **AI Generation:** Automated content generation via Anthropic/OpenAI APIs

**Blog API Routes:**
- `GET /api/blog-posts` - Fetch published posts (pagination support)
- `GET /api/blog-posts?slug={slug}` - Get single post
- `POST /api/admin/blog/posts` - Create/update post (protected, requires admin/editor role)
- `GET /api/admin/blog/categories` - Manage categories
- `GET /api/admin/blog/tags` - Manage tags

### Authentication & Protected Routes

**NextAuth.js Configuration:**
```typescript
// JWT strategy with role-based access
Providers: CredentialsProvider
  - ADMIN_EMAIL / ADMIN_PASSWORD (env vars) → role: 'admin'
  - EDITOR_EMAIL / EDITOR_PASSWORD (env vars) → role: 'editor'

Session: JWT (30-day max age)
Callbacks:
  - JWT: Adds role to token
  - Session: Adds role to session object
```

**Middleware Pattern:**
```typescript
// src/lib/auth/session.ts
import { requireAuth } from '@/lib/auth/session';

export default async function handler(req, res) {
  const session = await requireAuth(req, res, ['admin', 'editor']);
  if (!session) return; // Already responded with 401

  // Protected logic here
}
```

**Protected Routes:**
- `/admin/login` - Login page (public)
- `/admin/blog/*` - Blog management (admin/editor only)
- `/admin/referral-analytics` - Analytics dashboard (admin only)

### State Management Patterns

**Cart Context (`src/lib/cart-context.tsx`):**
```typescript
import { useCart } from '@/lib/cart-context';

function MyComponent() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  // Cart auto-persists to encrypted localStorage with CryptoJS
}
```

**Translation Context (`src/lib/translation-context.tsx`):**
```typescript
import { useTranslation } from '@/lib/translation-context';

function MyComponent() {
  const { t, locale } = useTranslation();
  // Never hardcode text - always use t('key')
  return <button>{t('addToCart')}</button>;
}
```

**Theme Context:**
```typescript
// Built-in Next.js theme system with automatic persistence
// Dark mode classes automatically applied via Tailwind dark: variants
```

### Database Schema (Prisma)

**Key Models:**
```prisma
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  orders        Order[]
  referralCode  String?   @unique
  referrals     Referral[]
  createdAt     DateTime  @default(now())
}

model Retailer {
  id                String          @id @default(uuid())
  businessName      String
  email             String          @unique
  status            RetailerStatus  @default(PENDING) // PENDING/ACTIVE/SUSPENDED/REJECTED
  orders            RetailerOrder[]
  stripeCustomerId  String?
  createdAt         DateTime        @default(now())
}

model Order {
  id              String      @id @default(uuid())
  userId          String?
  orderNumber     String      @unique
  items           OrderItem[]
  totalAmount     Decimal
  status          OrderStatus @default(PENDING)
  stripeSessionId String?
  createdAt       DateTime    @default(now())
}

model Product {
  id            String   @id @default(uuid())
  name          String
  price         Decimal
  wholesalePrice Decimal?
  stock         Int
  createdAt     DateTime @default(now())
}
```

**Relationships:**
- User → Orders (one-to-many)
- Retailer → RetailerOrders (one-to-many)
- Order → OrderItems (one-to-many)
- OrderItem → Product (many-to-one)

### API Route Patterns

**Stripe Checkout:**
```typescript
// pages/api/create-checkout-session.ts
POST /api/create-checkout-session
Body: { items: [{ id, quantity }], locale: 'en' | 'fr' | 'zh' }
Returns: { sessionId: string, url: string }
```

**Webhook Handling:**
```typescript
// pages/api/webhooks/stripe.ts
POST /api/webhooks/stripe
Headers: stripe-signature
Body: Raw Stripe webhook event
Processes: checkout.session.completed, payment_intent.succeeded, etc.
```

**Blog Content:**
```typescript
// pages/api/blog-posts.ts
GET /api/blog-posts?locale=en&page=1&limit=10&category=tips
Returns: { posts: BlogPost[], total: number, page: number }
```

## Dark Mode Compliance (CRITICAL)

**MANDATORY: Every element MUST have dark: variant - NO EXCEPTIONS**

### Quick Reference Patterns
```css
/* Essential Typography */
text-gray-900 dark:text-gray-50        /* H1-H2 headers */
text-gray-800 dark:text-gray-100       /* H3-H4 headers */
text-gray-700 dark:text-gray-200       /* Body text */
text-gray-600 dark:text-gray-300       /* Secondary text */

/* Backgrounds */
bg-white dark:bg-gray-900              /* Primary backgrounds */
bg-gray-50 dark:bg-gray-800            /* Secondary backgrounds */
bg-blue-50 dark:bg-blue-900/20         /* Colored backgrounds */

/* Borders */
border-gray-200 dark:border-gray-700   /* Standard borders */
border-blue-200 dark:border-blue-700   /* Colored borders */

/* Interactive Elements */
bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500
text-white dark:text-gray-100          /* White text ALWAYS needs dark variant */
```

### Zero-Tolerance Violations
```css
/* ❌ WRONG - Missing dark variants */
text-white                 /* Missing dark:text-gray-100 */
bg-blue-50                 /* Missing dark:bg-blue-900/20 */
border-gray-200           /* Missing dark:border-gray-700 */

/* ✅ CORRECT - Complete patterns */
text-white dark:text-gray-100
bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200
border-gray-200 dark:border-gray-700
```

### Validation Command
```bash
npm run validate-dark-mode  # MUST return 0 errors before commit
```

**Build Failure:** Dark mode validation runs in pre-commit hook. Commits will be blocked if violations exist.

## Content & SEO Guidelines

### Translation System
```typescript
// NEVER hardcode text - always use translation hook
// ❌ WRONG
<button>Add to Cart</button>

// ✅ CORRECT
import { useTranslation } from '@/lib/translation-context';

function Component() {
  const { t } = useTranslation();
  return <button>{t('addToCart')}</button>;
}
```

**Adding New Translations:**
1. Add key to `src/translations/en.ts`
2. Add French translation to `src/translations/fr.ts`
3. Add Chinese translation to `src/translations/zh.ts`
4. Run `npm run test:translations` to verify completeness

### SEO Utilities

**Structured Data Generation:**
```typescript
import { generateProductPageSchema, generateArticlePageSchema } from '@/lib/seo-utils';

// Product pages
const schema = generateProductPageSchema('purrify-50g', 'en');

// Blog/article pages
const schema = generateArticlePageSchema('Title', 'Description', '/blog/slug', 'en', {
  author: 'Purrify Team',
  publishedDate: '2024-01-15',
  category: 'Tips'
});
```

**JSON-LD Components:**
```typescript
import { HomepageSchema, ProductSchema, ArticleSchema, LocationSchema } from '@/components/seo/json-ld-schema';

// Usage in pages
<HomepageSchema locale='en' />
<ProductSchema productId='purrify-50g' locale='en' />
<ArticleSchema title="..." description="..." path="/blog/..." />
<LocationSchema cityName='Toronto' province='Ontario' />
```

### Legal & Competitive Positioning

**CRITICAL: NO direct competitor brand comparisons**
- ✅ "Activated Carbon vs Baking Soda Deodorizers"
- ❌ "Purrify vs Brand X"
- Use technology/category comparisons for legal protection
- Educational positioning reduces legal risk

**Location Pages:**
- MUST use partnership positioning (not competitive)
- ✅ "Ask your local pet store to stock Purrify"
- ❌ "Better than local pet stores"
- Reference local retailers positively to avoid disparagement claims

## Performance Optimization

### Image Optimization Pipeline
```bash
# Images stored in /public/original-images/
# Run optimization (generates AVIF, WebP, JPG)
npm run optimize-images-enhanced

# Output: /public/optimized/{filename}.{avif,webp,jpg}
# Metadata: Image dimensions added automatically
```

**Next.js Image Component:**
```typescript
import Image from 'next/image';

<Image
  src="/optimized/product.webp"
  alt="Descriptive alt text"
  width={1200}
  height={800}
  loading="lazy"
  placeholder="blur"
/>
```

### Code Splitting Strategy

**Dynamic Imports:**
```typescript
import dynamic from 'next/dynamic';

// Below-the-fold sections
const TestimonialsSection = dynamic(() => import('@/components/sections/testimonials'), {
  loading: () => <div>Loading...</div>,
  ssr: true
});

// Admin components (rarely used)
const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), {
  loading: () => <div>Loading editor...</div>,
  ssr: false
});
```

**Webpack Configuration:**
- Framework chunks isolated (React, React-DOM)
- Vendor libraries split by package
- Common chunks for shared components
- SWC minification enabled
- Tree shaking + module concatenation

### Caching Strategy

**Static Assets:**
```
Cache-Control: max-age=31536000, immutable  # 1 year
```

**API Routes:**
```typescript
// Short-lived cache for dynamic data
res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

// Blog content (longer cache)
res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');
```

**ISR (Incremental Static Regeneration):**
```typescript
export async function getStaticProps({ params }) {
  return {
    props: { post },
    revalidate: 3600 // Revalidate every hour
  };
}
```

## Development Standards

### TypeScript (Strict Mode)
```typescript
// ❌ Never use 'any'
const handleEvent = (e: any) => { }

// ✅ Use proper types
const handleEvent = (e: React.MouseEvent<HTMLButtonElement>) => { }

// ✅ Define interfaces
interface BlogPost {
  id: string;
  title: string;
  content: string;
  publishedAt?: Date;
}
```

### React Hooks Compliance
```typescript
// ✅ Memoize expensive computations
const processedData = useMemo(() =>
  expensiveComputation(data),
  [data]
);

// ✅ Include all dependencies
useEffect(() => {
  fetchData(id);
}, [id]);

// ✅ Functional updates
setState(prev => prev + 1);
```

### Component Checklist (Pre-Commit)
- [ ] Dark mode: Every text/bg/border has `dark:*` variant
- [ ] TypeScript: No `any` types, proper interfaces
- [ ] Translations: All text uses `useTranslation()` hook
- [ ] Accessibility: WCAG AA contrast ratios, keyboard navigation
- [ ] Mobile: 44px+ touch targets, responsive breakpoints
- [ ] Performance: Dynamic imports for below-fold content

## Debugging & Troubleshooting

### Common Issues

**Hot Reload Not Working:**
```bash
npm run predev  # Clear webpack cache
npm run dev     # Restart dev server
```

**Dark Mode Validation Failing:**
```bash
npm run validate-dark-mode
# Look for: "Missing dark: variant" errors
# Fix by adding dark:text-*, dark:bg-*, dark:border-* classes
```

**TypeScript Errors:**
```bash
npm run check-types
# Fix all errors before committing
```

**Blog Images Missing:**
```bash
npm run validate-blog-images
# Ensure all blog posts reference images in /public/optimized/
```

**Stripe Checkout Failing:**
- Verify `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in `.env.local`
- Check Stripe dashboard for webhook logs
- Ensure webhook URL is registered: `https://purrify.ca/api/webhooks/stripe`

**Translation Missing:**
```bash
npm run test:translations
# Add missing keys to en.ts, fr.ts, zh.ts
```

**Performance Degradation:**
```bash
npm run performance:audit
npm run analyze  # Interactive bundle analysis
# Check bundle size, cache hits, Core Web Vitals
```

## Deployment & Vercel

### Vercel Configuration
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

### Environment Variables (Vercel)
All sensitive keys stored in Vercel dashboard:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `EDITOR_EMAIL`, `EDITOR_PASSWORD`
- `RESEND_API_KEY`, `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`
- `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`

### Deployment Verification
```bash
# After push, verify deployment
# Check Vercel dashboard for build status
# Visit production URL to confirm changes live

# Clear edge cache if needed
npm run purge-vercel-cache
```

### Post-Deployment Checklist
- [ ] Verify build completed successfully
- [ ] Test key user flows (checkout, blog, contact)
- [ ] Check dark mode on production
- [ ] Verify sitemap regenerated (`/sitemap.xml`)
- [ ] Test mobile responsiveness
- [ ] Check Lighthouse scores (90+ all categories)

## Git Workflow

### Commit Message Format
```bash
# Use conventional commit format
git commit -m "feat: add blog scheduling functionality"
git commit -m "fix: dark mode validation on admin components"
git commit -m "docs: update CLAUDE.md with blog system details"
git commit -m "perf: optimize image loading with AVIF format"
git commit -m "refactor: simplify cart context logic"
```

### Pre-Commit Validation (Husky)
```bash
# Runs automatically on git commit
npm run lint
npm run check-types
npm run validate-dark-mode
npm run validate-blog-images

# If any fail, commit is blocked
```

### Pull Request Guidelines
**Before Creating PR:**
```bash
npm run lint                # 0 warnings
npm run check-types         # 0 errors
npm run validate-dark-mode  # 0 violations
npm run test:translations   # All locales complete
npm run test:e2e            # E2E tests pass
```

**PR Description Template:**
```markdown
## Summary
Brief description (1-3 bullet points)

## Changes Made
- [File]: [Change] - [Reason]

## Testing
- [x] Lint & types pass
- [x] Dark mode validated
- [x] Manual testing completed

## Screenshots
[Add before/after if UI changed]
```

## Quick Reference

### Project Info
- **Vercel Project ID:** `prj_4U4S5H54ifEUlIrWw8ebYtvxZBT2`
- **Vercel Team ID:** `team_9MD2gEmcma1CnApg7QalkGj8`
- **Production URL:** `https://purrify.ca`
- **Node Version:** 22.x

### Documentation Structure
- `CLAUDE.md` - AI development guidelines (this file)
- `AGENTS.md` - Quick developer reference
- `CHANGELOG.md` - Change log (update after each session)
- `TODO.md` - Active work queue
- `docs/REFERENCE.md` - Technical reference (dark mode, SEO, structured data)
- `docs/PROJECT_OVERVIEW.md` - System architecture
- `docs/PROJECT_HANDOFF.md` - Production status

### Important File Locations
- Blog content: `/content/blog/{locale}/*.json`
- Translations: `/src/translations/{en,fr,zh}.ts`
- Database schema: `/prisma/schema.prisma`
- Environment config: `.env.local` (local), Vercel dashboard (production)
- Optimized images: `/public/optimized/`
- Build scripts: `/scripts/`

---

**Code Quality Promise:** All code must pass lint (0 warnings), types (0 errors), dark mode validation (0 violations), and performance standards before deployment.
