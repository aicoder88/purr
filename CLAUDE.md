# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Reference

**First Time Setup:**
```bash
npm install
npm run dev                    # Start development server
```

**Before Every Commit (MANDATORY):**
```bash
npm run validate-dark-mode     # Must pass (0 errors) - CRITICAL
npm run check-types            # Must pass (0 errors)
npm run lint                   # Must pass (<50 warnings)
```

**Common Tasks:**
- **Add new page** → Use Pages Router in `pages/` (NOT App Router!)
- **Add text** → Use `useTranslation()` hook, add keys to `src/translations/{en,fr,zh}.ts`
- **Style component** → Include `dark:` variants on ALL color classes (text, bg, border)
- **Debug hot reload** → `npm run clear-cache && npm run dev`
- **Test single file** → `npx jest <file> --watch` or `npx playwright test <file>`

**Emergency Debugging:**
- Build failing? → Check dark mode violations (`npm run validate-dark-mode`) and TypeScript errors first
- Payment failing? → Check Stripe dashboard webhook logs
- Translation missing? → `npm run test:translations`

---

## Project Context

Purrify is a Next.js 15 e-commerce website for activated carbon cat litter additive. Production system requiring dark mode compliance, multi-language support, and secure payment processing.

**Critical Constraints:**
- Pages Router (NOT App Router)
- Dark mode mandatory on ALL elements
- Multi-language: en, fr, zh
- Stripe payments protected
- No competitor brand names in content (legal risk)

## Tech Stack

**Core**: Next.js 15 (Pages Router) + TypeScript + Tailwind CSS + shadcn/ui
**State**: React Context (Cart, Translation)
**Database**: PostgreSQL + Prisma
**Payments**: Stripe + NextAuth.js
**Deploy**: Vercel
**Runtime**: Node.js 22.x

### Key Architecture

**State Management:**
- **Cart**: React Context with encrypted localStorage (`src/lib/cart-context.tsx`) - Uses CryptoJS for encryption
- **i18n**: React Context with Next.js i18n (`src/lib/translation-context.tsx`) - Supports en/fr/zh
- **Theme**: Built-in Next.js theme system with automatic persistence

**Directory Structure:**
```
pages/                         # Next.js Pages Router (NOT App Router!)
├── api/                       # API routes
│   ├── create-checkout-session.ts    # Stripe checkout (protected)
│   ├── webhooks/stripe.ts            # Payment webhooks (protected)
│   ├── analytics/             # Analytics & tracking endpoints
│   ├── referrals/             # Referral program endpoints
│   └── security/              # Security/validation routes
├── blog/                      # Dynamic blog posts
├── learn/                     # Educational content
├── [locale]/                  # Multi-language routes (fr/, zh/)
└── [other routes]             # Landing, product, location pages

src/
├── components/                # 80+ React components
│   ├── sections/              # Full-width page sections (Hero, CTA, etc.)
│   ├── ui/                    # 40+ shadcn/ui components
│   ├── layout/                # Header, Footer, Navigation
│   ├── mobile/                # Mobile-optimized components
│   ├── social-proof/          # Testimonials, trust signals
│   ├── seo/                   # Structured data, schema.org JSON-LD
│   └── performance/           # Performance monitoring
├── lib/                       # Utility libraries
│   ├── cart-context.tsx       # Shopping cart state
│   ├── translation-context.tsx # i18n provider
│   ├── seo-utils.ts           # SEO helpers
│   ├── analytics.ts           # Event tracking & GTM
│   ├── payment-security.ts    # Payment validation
│   └── [30+ other utilities]
├── translations/              # i18n data
│   ├── en.ts                  # English
│   ├── fr.ts                  # French
│   └── zh.ts                  # Chinese
├── data/                      # Static data, config
└── types/                     # TypeScript interfaces

scripts/                       # Build & optimization scripts
├── dark-mode-validator.js     # Dark mode compliance validator
├── validate-blog-images.js    # Blog image validator
├── optimize-images.js         # Image optimization
└── [40+ other scripts]        # SEO, performance, cache utilities

prisma/
└── schema.prisma              # PostgreSQL database schema

public/
├── optimized/                 # Auto-generated optimized images
└── original-images/           # Source images
```

**Page Types:**
- Landing pages: `pages/index.tsx`, `/products/*`
- Learn pages: `/learn/*` (FAQ, How-it-works, Science)
- Location pages: `/locations/*` for local SEO
- Blog: `/blog/[slug].tsx` dynamic routes
- Multi-language: Routes under `/fr/` and `/zh/` prefixes
- Admin: `/admin/*` protected routes

## Environment Variables

Create `.env.local` in project root:

```bash
# Stripe (Payment Processing)
STRIPE_SECRET_KEY=sk_test_...              # Stripe secret key
NEXT_PUBLIC_STRIPE_KEY=pk_test_...         # Stripe publishable key
STRIPE_WEBHOOK_SECRET=whsec_...            # Stripe webhook secret

# Database
DATABASE_URL=postgresql://...              # PostgreSQL connection string

# NextAuth
NEXTAUTH_URL=http://localhost:3000         # App URL
NEXTAUTH_SECRET=...                        # Random secret (32+ chars)

# Email (EmailJS)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...         # EmailJS service ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...        # EmailJS template ID
NEXT_PUBLIC_EMAILJS_USER_ID=...            # EmailJS public key

# Analytics (Optional)
NEXT_PUBLIC_GTM_ID=GTM-...                 # Google Tag Manager ID
```

## Essential Commands

```bash
# Development
npm run dev                    # Start dev server
npm run predev                 # Clear cache first (use before dev)
npm run clear-cache            # Clear webpack cache if hot reload stuck

# Pre-commit (MANDATORY - run before every git commit)
npm run lint                   # ESLint validation (max 50 warnings)
npm run check-types            # TypeScript strict mode checking
npm run validate-dark-mode     # Dark mode compliance (CRITICAL - 0 errors)
npm run validate-blog-images   # Verify all blog images exist

# Testing
npm run test:translations      # Jest translation completeness test
npm run test:e2e               # Playwright end-to-end tests
npm run test:e2e -- --debug    # Run e2e tests in debug mode

# Build & Deploy
npm run build                  # Production build (runs prebuild + postbuild)
npm run start                  # Start production server locally
npm run analyze                # Build with bundle analysis enabled

# Optimization & Analysis
npm run performance:audit      # Complete audit (SEO + bundle + cache)
npm run seo:optimize           # Run SEO optimizations
npm run bundle:analyze         # Analyze bundle size
npm run optimize-images        # Optimize single image
npm run optimize-all-images    # Optimize all images in batch
npm run add-image-dimensions   # Add width/height metadata to images

# Vercel & Cache
npm run purge-vercel-cache     # Clear Vercel edge cache after deploy
```

### Testing Single Tests
```bash
# Run single Jest test file
npx jest __tests__/translation-completeness.test.js --watch

# Run specific test by name pattern
npx jest --testNamePattern="translation" --watch

# Run Playwright tests for specific file
npx playwright test tests/homepage.spec.ts
```

## Core Libraries & Patterns

### Critical State Management Patterns

**Cart Context (`src/lib/cart-context.tsx`):**
- Encrypted localStorage with CryptoJS
- Access via `useCart()` hook in components
- Auto-persists on every change
- Integrated with Stripe checkout flow

**Translation Context (`src/lib/translation-context.tsx`):**
- Access via `useTranslation()` hook
- Returns `t` function for getting translated strings
- Auto-detects locale from URL (`/fr/`, `/zh/`)
- All UI text MUST use this hook, never hardcode

**Example Usage:**
```tsx
import { useCart } from '@/lib/cart-context';
import { useTranslation } from '@/lib/translation-context';

export function MyComponent() {
  const { cart, addToCart } = useCart();
  const { t } = useTranslation();

  return <button>{t('addToCart')}</button>;
}
```

### Key Utility Libraries

**Analytics & Tracking (`src/lib/analytics.ts`):**
- Google Tag Manager integration
- Custom event tracking for conversions
- Use `trackEvent()` for all important user actions

**SEO Utilities (`src/lib/seo-utils.ts`):**
- Structured data generation (JSON-LD)
- Meta tag helpers
- Schema.org markup for products, organization, FAQs

**Performance Optimization (`src/lib/performance-optimizer.ts`):**
- Image lazy loading
- Component code splitting
- Cache strategy management

**Payment Security (`src/lib/payment-security.ts`):**
- Payment validation
- Order security checks
- Stripe integration helpers

### Common Patterns to Follow

**Protected API Routes:**
```typescript
// Use proper type checking
if (!session) {
  return res.status(401).json({ error: 'Unauthorized' });
}

// Validate input
const { productId } = req.body;
if (!productId) {
  return res.status(400).json({ error: 'Missing required field' });
}
```

**Server-Side Props with i18n:**
```typescript
export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context.params as { locale: string };
  // Locale is automatically handled by Next.js i18n routing
};
```

**Using shadcn/ui Components:**
- All components in `src/components/ui/` are from shadcn
- Import and customize with Tailwind classes
- Ensure dark mode variants on all interactive elements
- Use `clsx` or `tailwind-merge` for class composition

## Critical Requirements

### Dark Mode Compliance (BUILD FAILS WITHOUT)
**MANDATORY: Every element MUST have dark: variant - NO EXCEPTIONS**

**Quick Reference Patterns:**
```css
/* Essential Patterns */
text-gray-900 dark:text-gray-50        /* Headers */
text-gray-700 dark:text-gray-200       /* Body text */
text-white dark:text-gray-100          /* White text */
bg-blue-50 dark:bg-blue-900/20         /* Colored backgrounds */
border-gray-200 dark:border-gray-700   /* Borders */
```

**ZERO-TOLERANCE VIOLATIONS:**
1. ❌ `text-white` without `dark:text-gray-100`
2. ❌ Colored backgrounds without dark variants (`bg-blue-50`)
3. ❌ Borders without dark variants (`border-gray-200`)
4. ❌ Any `text-*` class without corresponding `dark:text-*`

**Validation Command:**
```bash
npm run validate-dark-mode  # MUST return 0 errors
```

**Common Pattern Examples:**
```css
/* ✅ CORRECT - Complete patterns */
className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700"
className="text-white dark:text-gray-100 bg-red-500 hover:bg-red-600 dark:hover:bg-red-400"
```

**PREVENTION: Enhanced Validation System**
The enhanced validator catches ALL color violations:
- Background colors: `bg-white`, `bg-blue-50`, etc.
- Border colors: `border-gray-200`, `border-blue-200`, etc.
- Text colors: `text-white`, `text-gray-900`, etc.

**Auto-Prevention Tools:**
1. **Pre-commit Hook**: `.husky/pre-commit` blocks commits with violations
2. **VSCode Snippets**: `.vscode/snippets.code-snippets` provides `darkbg`, `darktext`, `darkbox` shortcuts
3. **Enhanced Validator**: Catches 496+ violations across background/border/text patterns
4. **Blog Image Validator**: `npm run validate-blog-images` ensures all blog preview images exist

### Protected Systems
- `/api/create-checkout-session` (Stripe payments)
- `/api/webhooks/stripe` (Payment webhooks)
- `/api/cart-recovery` (Encrypted cart data)
- `/api/analytics/*` (Conversion tracking)
- Payment flow integrity
- Cart data encrypted with CryptoJS

### Content Rules
- **LEGAL RISK MITIGATION**: NO direct competitor brand name comparisons
- Use technology/category comparisons: "Activated Carbon vs Baking Soda Deodorizers" NOT "Purrify vs Brand X"
- Educational positioning = legal protection
- Reference `/docs/LEGAL_STRATEGY.md` before creating comparison content
- All text via `useTranslation` hook

### Location Page Guidelines

**Partnership Positioning (Required):**
- Position Purrify as partnering WITH local pet stores, not competing against them
- Include "Ask Your Local Pet Store" section mentioning store names
- Provide direct order option as alternative
- Avoid competitive language ("better than", "cheaper than")

**Why Partnership Positioning?**
1. **Legal Protection**: Avoids disparagement claims from retailers
2. **B2B Strategy**: Aligns with wholesale/retail expansion goals
3. **Local SEO**: Positive association with local business names
4. **Brand Trust**: Collaborative vs combative positioning

**City-Specific Testimonials (Required):**
- 2 unique testimonials per city with local context
- Reference: local industries, housing types, climate, lifestyle
- Use region-appropriate names (first name + last initial)
- Make testimonials authentic with specific details

**Example Partnership Section:**
```tsx
<section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
  <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-50">
    Where to Find Purrify in {city.name}
  </h2>
  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
    <h3 className="text-xl font-bold mb-3 text-blue-900 dark:text-blue-200">
      Ask Your Local Pet Store
    </h3>
    <p className="text-gray-700 dark:text-gray-200">
      Visit your favorite {city.name} pet store and ask them to stock Purrify!
    </p>
  </div>
</section>
```

**❌ NEVER USE Competitive Messaging:**
```tsx
// ❌ WRONG - Competitive comparison (legal risk!)
<h2>Better Than Local {city.name} Pet Stores</h2>
```

## Development Standards

### TypeScript (Strict Mode)
```typescript
// ❌ Never use 'any'
const handleEvent = (e: any) => { }

// ✅ Use proper types
const handleEvent = (e: React.MouseEvent<HTMLButtonElement>) => { }

// ✅ Define interfaces
interface SlideMeta {
  title: string;
  duration: number;
}
```

**Note:** Some optimizer files (`src/lib/*-optimizer.ts`) explicitly allow `any` types - this is intentional.

### React Hooks Compliance
```typescript
// ✅ Memoize expensive arrays/objects
const slideContent = useMemo(() => [
  { title: "Slide 1", duration: 5000 }
], []);

// ✅ Include dependencies
useEffect(() => {
  // Use slideContent
}, [slideContent]);

// ✅ Functional updates when only needing previous state
setState(prev => prev + 1);
```

### Component Checklist (MANDATORY BEFORE COMMIT)
- [ ] **DARK MODE: Every text element has `dark:text-*` variant**
- [ ] **DARK MODE: All `text-white` includes `dark:text-gray-100`**
- [ ] **DARK MODE: All colored backgrounds have dark variants**
- [ ] **DARK MODE: All borders have dark variants**
- [ ] **DARK MODE: `npm run validate-dark-mode` passes with 0 errors**
- [ ] TypeScript strict compliance (0 errors)
- [ ] ESLint compliance (<50 warnings)
- [ ] Mobile responsive (44px+ touch targets)
- [ ] Keyboard navigation works
- [ ] WCAG AA contrast ratios met

## Blog & Content Requirements

### Blog Image Requirements

**MANDATORY: All blog posts need accessible preview images**

**Image Standards:**
- **Location**: Store in `/public/optimized/` folder
- **Format**: `.webp` preferred for best performance
- **Size**: Minimum 1200x800px for quality previews
- **Naming**: Use descriptive names (`multi-cat-household.webp`)

**Prevention System:**
```bash
npm run validate-blog-images  # Check all blog post images exist
```

**AVOID:** External URLs (Unsplash, etc.) - they can fail to load
**USE:** Local optimized images in `/public/optimized/` folder

**Fallback System:** NextImage component includes `onError` handler that falls back to `/optimized/140g.webp`

**Every blog post should have 3-4 high-quality images:**
1. **Hero Image** (main article image for social sharing)
2. **Section Images** (2-3 supporting visuals throughout content)
3. **Solution/Result Image** (showing positive outcome)

**Image Selection Criteria:**
- High quality (minimum 1600x1067 resolution)
- Contextual relevance (match blog post topic)
- Professional look (clean, bright, impressive)
- Cat-related (cats, litter boxes, homes, pet care)
- Emotional appeal (evoke pain points or solutions)

### SEO & Content Guidelines

**ALWAYS reference keyword research before content updates:**
- Primary file: `/docs/cat odor keywords.xlsx`
- Strategy guide: `/docs/SEO_KEYWORD_STRATEGY.md`

**Content optimization checklist:**
- Target emotional pain points (embarrassment, frustration)
- Use benefit-driven headlines with numbers
- Include high-converting keywords naturally
- Remove money-back guarantee language (company policy)
- "Military-grade" is trust signal only, not SEO keyword

## Performance Standards

**Targets:**
- Lighthouse: 90+ all categories
- Bundle: <250KB gzipped
- Core Web Vitals: Green

**UX Timing:**
- Dropdown delays: 500ms minimum `onMouseLeave`
- Transitions: 200-400ms
- Social proof: 45-75s intervals, max 3 concurrent

## Build Requirements

**Must pass before commit:**
```bash
npm run check-types            # 0 TypeScript errors
npm run lint                   # <50 ESLint warnings (configured in pre-commit hook)
npm run validate-dark-mode     # 0 dark mode violations
```

**Common ESLint rules (see `eslint.config.js`):**
- `@typescript-eslint/no-unused-vars`: 'warn'
- `react-hooks/exhaustive-deps`: 'warn'
- `@typescript-eslint/no-explicit-any`: 'off' for optimizer files
- `@next/next/no-img-element`: Use Next.js `Image` component

## Debugging & Troubleshooting

### Common Issues & Solutions

**Hot reload not working?**
```bash
npm run predev  # Clear webpack cache
npm run dev     # Restart dev server
```

**Dark mode validation failing?**
```bash
npm run validate-dark-mode  # See exact violations
# Look for: no dark:text-*, no dark:bg-*, missing dark: variants
```

**TypeScript errors on build?**
```bash
npm run check-types  # Get detailed error locations
# Fix each error before pushing
```

**Blog image validator fails?**
```bash
npm run validate-blog-images  # Check which images are missing
# Ensure all blog posts have images in /public/optimized/
```

**Stripe checkout failing?**
- Verify STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_KEY in .env.local
- Check Stripe dashboard for webhook logs
- Ensure webhook endpoint is registered in Stripe settings

**Translation missing for new text?**
```bash
npm run test:translations  # Identifies missing keys
# Add key to src/translations/en.ts, fr.ts, zh.ts
```

**Performance degradation?**
```bash
npm run performance:audit  # Complete performance check
npm run analyze            # Interactive bundle analysis
```

**Mobile layout broken?**
- Check 44px minimum touch targets (WCAG AA)
- Verify responsive classes at breakpoints (sm:, md:, lg:)
- Test on actual devices, not just browser DevTools
- Ensure images have proper aspect ratios

## Emergency Protocols

**Build failures:** Usually dark mode violations or TypeScript errors
- Run `npm run validate-dark-mode` and `npm run check-types` first
- Check recent commit changes before pushing
- Never force push to main branch

**Payment issues:** Check Stripe dashboard/webhooks
- Verify test keys in development
- Check webhook event logs in Stripe dashboard
- Ensure POST endpoint matches webhook configuration

**Performance degradation:** Run `npm run performance:audit`
- Bundle size over 250KB? Run `npm run analyze`
- Core Web Vitals failing? Check image optimization
- Lighthouse scores dropping? Check CSS specificity

## Deployment & Verification

### Git Development Branch Requirements

**DEVELOP** on feature branches starting with `claude/` and ending with session ID.

**Git push requirements:**
- Always use: `git push -u origin <branch-name>`
- Branch MUST start with `claude/` and end with matching session ID
- If push fails with 403, verify branch name format
- For network errors: retry up to 4 times with exponential backoff (2s, 4s, 8s, 16s)

**Example:**
```bash
git push -u origin claude/feature-name-SESSION123
```

### Deployment Verification Protocol

**After pushing changes:**

**Option 1: If Vercel MCP is available:**
```bash
# Check latest deployment status
mcp__vercel__list_deployments
mcp__vercel__get_deployment <deployment-id>
```

**Option 2: Manual verification:**
1. Push changes: `git push`
2. Visit Vercel dashboard to check deployment status
3. Wait for status to show "READY" (not "BUILDING" or "ERROR")
4. Test production URL once deployed

**Production Validation Checklist:**
- ✅ Visit production URL to verify changes are live
- ✅ Test key functionality (forms, navigation, dark mode)
- ✅ Check mobile responsiveness
- ✅ Verify SEO meta tags in view source

**Build Failure Recovery:**
If deployment shows "ERROR":
1. Check build logs
2. Fix TypeScript/lint/dark-mode errors locally
3. Re-run pre-commit validation before pushing
4. Push fix and repeat verification

**Vercel Project Info:**
- Project: `prj_4U4S5H54ifEUlIrWw8ebYtvxZBT2`
- Team: `team_9MD2gEmcma1CnApg7QalkGj8`

## Business Context

### B2B vs B2C Strategy
**Current State:** Single consumer-focused e-commerce site
**Future Direction:** Dual-path experience for retailers vs consumers

**Customer Segmentation:**
- **B2C**: Individual cat owners, direct Stripe checkout
- **B2B**: Pet stores, retailers, wholesale accounts
- **Target Markets**: Canada (primary), US expansion planned

### Critical API Endpoints

```typescript
// Stripe Integration
/api/create-checkout-session     # Consumer checkout
/api/webhooks/stripe             # Payment processing
/api/payment-validation          # Security validation

// Business Logic
/api/cart-recovery               # Abandoned cart emails
/api/analytics/conversion-metrics # Performance tracking
/api/trial-conversion            # Trial to full conversion

// Content Management
/api/blog-posts                  # Dynamic blog content
/api/newsletter                  # Email subscriptions
```

---

## Git Operations

**For git push:**
- Always use `git push -u origin <branch-name>`
- CRITICAL: Branch must start with `claude/` and end with matching session ID
- Only retry for network errors (up to 4 times with exponential backoff)

**For git fetch/pull:**
- Prefer fetching specific branches: `git fetch origin <branch-name>`
- For pulls: `git pull origin <branch-name>`
- Retry on network failures (up to 4 times with exponential backoff)

**Creating commits:**
- Only commit when explicitly requested by user
- NEVER skip hooks (--no-verify, --no-gpg-sign)
- NEVER force push to main/master
- Use heredoc for commit messages to ensure proper formatting

**GitHub CLI (`gh`):**
- Not available in this environment
- For GitHub issues, ask user to provide necessary information directly

---

**Code Quality Promise:** All code output will be production-ready with zero lint errors, complete TypeScript compliance, full dark mode coverage, and performance optimized.
