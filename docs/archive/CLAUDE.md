# CLAUDE.md

This file provides detailed guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Quick Reference:** See `AGENTS.md` for a condensed summary of key guidelines.

## Project Context

Purrify is a Next.js 15 e-commerce website for activated carbon cat litter additive. Production system requiring dark mode compliance, multi-language support, and secure payment processing.

**Critical Constraints:**
- Pages Router (NOT App Router) 
- Dark mode mandatory on ALL elements
- Multi-language: en, fr, zh
- Stripe payments protected
- No competitor brand names

## Tech Stack

**Core**: Next.js 15 (Pages Router) + TypeScript + Tailwind CSS + shadcn/ui
**State**: React Context (Cart, Translation)
**Database**: PostgreSQL + Prisma
**Payments**: Stripe + NextAuth.js
**Deploy**: Vercel
**Runtime**: Node.js 22.x

### Key Architecture

**State Management:**
- Cart: React Context with encrypted localStorage (`src/lib/cart-context.tsx`) - Uses CryptoJS for encryption
- i18n: React Context with Next.js i18n (`src/lib/translation-context.tsx`) - Supports en/fr/zh
- Theme: Built-in Next.js theme system with automatic persistence

**Directory Structure:**
```
pages/                         # Next.js Pages Router (NOT App Router!)
├── api/                       # 19+ API routes
│   ├── create-checkout-session.ts    # Stripe checkout (protected)
│   ├── webhooks/stripe.ts            # Payment webhooks (protected)
│   ├── [analytics|referrals|etc]/    # Feature-specific routes
│   └── security/               # Security/validation routes
├── blog/                       # Dynamic blog posts
├── learn/                      # Educational content
├── [locale]/                   # Multi-language routes (fr/, zh/)
└── [other page routes]         # Static pages

src/
├── components/                 # 80+ React components
│   ├── sections/              # Full-width page sections (Hero, CTA, etc.)
│   ├── ui/                    # 40+ shadcn/ui components
│   ├── layout/                # Reusable layout (Header, Footer, Nav)
│   ├── mobile/                # Mobile-specific optimized components
│   ├── social-proof/          # Testimonials, trust signals
│   ├── seo/                   # Structured data, schema.org JSON-LD
│   └── performance/           # Performance monitoring components
├── lib/                        # 30+ utility files
│   ├── cart-context.tsx       # Shopping cart state management
│   ├── translation-context.tsx # i18n translation provider
│   ├── seo-utils.ts           # SEO optimization helpers
│   ├── analytics.ts           # Event tracking & GTM
│   ├── conversion-optimizer.ts # Landing page optimization
│   └── [other utilities]      # Payment, cache, performance, etc.
├── translations/              # i18n data files
│   ├── en.ts                  # English translations
│   ├── fr.ts                  # French translations
│   └── zh.ts                  # Chinese translations
├── data/                      # Static data, config, constants
└── types/                     # TypeScript interfaces & types

scripts/                        # 20+ build & optimization scripts
├── dark-mode-validator.js     # Validates dark mode compliance
├── optimize-images.js         # Image optimization pipeline
├── generate-sitemap.js        # SEO sitemap generation
└── [other scripts]            # Performance, SEO, cache utilities

prisma/
└── schema.prisma              # PostgreSQL database schema

public/
├── optimized/                 # Auto-generated optimized images
├── original-images/           # Source images for optimization
└── [other static assets]

__tests__/                      # Jest unit tests
├── translation-completeness.test.js
├── [feature-name].test.ts
└── [other test specs]

e2e/                            # Playwright E2E tests
├── homepage.spec.ts
├── [journey-name].spec.ts
└── [other journey tests]

.husky/                         # Git hooks
└── pre-commit                  # Validation before commits
```

**Page Types & Routing:**
- Landing pages: `pages/index.tsx`, `/products/*`
- Learn pages: `/learn/*` (FAQ, How-it-works, Science)
- Location pages: `/locations/*` for local SEO targeting
- Blog: `/blog/[slug].tsx` dynamic routes with SEO
- Multi-language: Routes duplicated under `/fr/` and `/zh/` prefixes
- Admin: `/admin/*` protected routes

## Essential Commands

```bash
# Development
npm run dev                    # Start dev server
npm run predev                 # Clear cache first (use before dev)
npm run clear-cache           # Clear webpack cache if hot reload stuck

# Pre-commit (MANDATORY - run before every git commit)
npm run lint                   # ESLint validation
npm run check-types           # TypeScript strict mode checking
npm run validate-dark-mode    # Dark mode compliance (BUILD BLOCKS WITHOUT)
npm run validate-blog-images  # Verify all blog images exist

# Testing
npm run test:translations     # Jest translation completeness test
npm run test:e2e              # Playwright end-to-end tests
npm run test:e2e -- --debug   # Run e2e tests in debug mode

# Build & Deploy
npm run build                 # Production build (runs prebuild + postbuild)
npm run start                 # Start production server locally
npm run analyze               # Build with bundle analysis enabled

# Optimization & Analysis
npm run performance:audit     # Complete audit (SEO + bundle + cache)
npm run seo:optimize          # Run SEO optimizations
npm run bundle:analyze        # Analyze bundle size
npm run optimize-images       # Optimize single image
npm run optimize-all-images   # Optimize all images in batch
npm run add-image-dimensions  # Add width/height metadata to images

# Vercel & Cache
npm run purge-vercel-cache    # Clear Vercel edge cache after deploy
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

### Location Page Guidelines (CRITICAL)

**MANDATORY: All location pages MUST follow partnership positioning - NEVER competitive messaging**

#### Partnership Positioning (✅ ALWAYS USE)
Location pages position Purrify as partnering WITH local pet stores, not competing against them:

```tsx
// ✅ CORRECT - Partnership Section
<section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
  <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-50">
    Where to Find Purrify in {city.name}
  </h2>
  <div className="space-y-4">
    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
      <h3 className="text-xl font-bold mb-3 text-blue-900 dark:text-blue-200">
        Ask Your Local Pet Store
      </h3>
      <p className="text-gray-700 dark:text-gray-200">
        Visit your favorite {city.name} pet store and ask them to stock Purrify!
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        We work with retailers like {city.competitors.join(', ')} and independent stores
      </p>
    </div>
    <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-3 text-purple-900 dark:text-purple-200">
        Order Direct
      </h3>
      <p className="text-gray-700 dark:text-gray-200 mb-4">
        Can't find us in stores? Order directly with free shipping to {city.name}
      </p>
      <Link href="/products/trial-size" className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white dark:text-gray-100">
        Shop Online Now
      </Link>
    </div>
  </div>
</section>
```

#### ❌ NEVER USE: Competitive Messaging
```tsx
// ❌ WRONG - Competitive comparison (legal risk!)
<h2>Better Than Local {city.name} Pet Stores</h2>
<div className="bg-red-50 dark:bg-red-900/20">
  <h3>Local Pet Stores ({city.competitors.join(', ')})</h3>
  <ul>
    <li>❌ Limited product selection</li>
    <li>❌ Higher prices due to overhead</li>
    <li>❌ Chemical-based deodorizers</li>
  </ul>
</div>
```

**Why Partnership Positioning?**
1. **Legal Protection**: Avoids disparagement claims from retailers
2. **B2B Strategy**: Aligns with wholesale/retail expansion goals
3. **Local SEO**: Positive association with local business names
4. **Brand Trust**: Collaborative vs combative positioning

#### City-Specific Testimonial Guidelines

**MANDATORY: Every location page needs 2 unique, authentic-sounding testimonials with city-specific context**

**Testimonial Formula:**
1. **Contextual Detail**: Reference local lifestyle, geography, or demographics
2. **Authentic Problem**: Real pain point specific to that city's context
3. **Specific Solution**: How Purrify solved their unique situation
4. **Real Names**: Use common first names + last initial for that region

**Examples by City Type:**

```tsx
// ✅ Calgary (Oil industry, dry climate, urban professionals)
"As a busy oil industry professional, I needed something that actually worked.
Purrify eliminated the litter box smell in my downtown condo completely!"
- Jennifer K., Calgary

"Finally found a natural solution that works in Alberta's dry climate.
My two cats love it and my home stays fresh!"
- David T., Calgary

// ✅ Ottawa (Government workers, bilingual, work-from-home)
"Working from home in Ottawa means my apartment needs to stay fresh.
Purrify handles my cat's litter box odor perfectly - even during video meetings!"
- Marie L., Ottawa

"My bilingual household now has one thing in common - we all agree
Purrify is the best odor solution we've found in the capital!"
- Philippe D., Ottawa

// ✅ Vancouver (Eco-conscious, condos, West Coast lifestyle)
"Perfect for our eco-conscious household! Natural odor control that actually works."
- Emma T., Vancouver

"Finally something that keeps my condo fresh! No more worrying about
guests noticing the litter box."
- Jason P., Vancouver

// ✅ Montreal (French culture, urban density, artistic community)
"Dans mon petit appartement du Plateau, Purrify garde l'air frais même avec deux chats!"
- Sophie B., Montreal

"As an artist with limited space, I need efficient solutions.
Purrify works perfectly in my Mile End studio."
- Alex M., Montreal
```

**❌ NEVER USE: Generic Template Testimonials**
```tsx
// ❌ WRONG - No city context, sounds fake
"Living in {city.name} with three cats was challenging until I found Purrify.
The odor control is incredible!"
- Sarah M., {city.name}

// ❌ WRONG - No authentic detail
"I tried everything at pet stores in {city.name}. Nothing worked like Purrify!"
- Mike R., {city.name}
```

**City Context Research Checklist:**
Before writing location page testimonials, research:
- [ ] Major local industries (oil, tech, government, tourism)
- [ ] Housing types (condos, apartments, houses)
- [ ] Lifestyle characteristics (eco-conscious, outdoorsy, urban)
- [ ] Demographics (young professionals, families, retirees)
- [ ] Climate considerations (dry, humid, extreme temperatures)
- [ ] Cultural elements (bilingual, artistic, sports-focused)

**Validation:**
Every location page testimonial must answer YES to:
1. Does it reference something specific to this city?
2. Would someone from that city recognize the context?
3. Does it sound authentic, not like a template?
4. Is the problem/solution contextually relevant?

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
- [ ] **DARK MODE: All colored text has dark variants**
- [ ] **DARK MODE: `npm run validate-dark-mode` passes with 0 errors**
- [ ] TypeScript strict compliance
- [ ] Mobile responsive (44px+ touch targets)
- [ ] Keyboard navigation
- [ ] WCAG AA contrast ratios

**Pre-Commit Dark Mode Validation:**
```bash
npm run validate-dark-mode  # MUST show 0 errors
```

**PREVENTION: Enhanced Validation System**
The enhanced validator now catches ALL color violations:
- Background colors: `bg-white`, `bg-blue-50`, etc.
- Border colors: `border-gray-200`, `border-blue-200`, etc.
- Text colors: `text-white`, `text-gray-900`, etc.

**Auto-Prevention Tools:**
1. **Pre-commit Hook**: `.husky/pre-commit` blocks commits with violations
2. **VSCode Snippets**: `.vscode/snippets.code-snippets` provides `darkbg`, `darktext`, `darkbox` shortcuts
3. **Enhanced Validator**: Catches 496+ violations across background/border/text patterns
4. **Blog Image Validator**: `npm run validate-blog-images` ensures all blog preview images exist

## Blog Image Requirements

**MANDATORY: All blog posts need accessible preview images**

### Image Standards:
- **Location**: Store in `/public/optimized/` folder
- **Format**: `.webp` preferred for best performance
- **Size**: Minimum 1200x800px for quality previews
- **Naming**: Use descriptive names (`multi-cat-household.webp`)

### Prevention System:
```bash
npm run validate-blog-images  # Check all blog post images exist
```

**AVOID:** External URLs (Unsplash, etc.) - they can fail to load
**USE:** Local optimized images in `/public/optimized/` folder

**Fallback System:** NextImage component includes `onError` handler that falls back to `/optimized/140g.webp`

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

**Must pass before commit (MANDATORY):**
```bash
npm run lint                # ESLint: zero warnings
npm run check-types         # TypeScript: zero errors
npm run validate-dark-mode  # Dark mode: zero violations
npm run validate-blog-images # Blog images: all exist
```

**Commit Message Format:**
Use `Type: concise summary` format (max 72 chars):
```bash
# ✅ CORRECT
git commit -m "Refactor: simplify product comparison layout"
git commit -m "Feature: add quarterly autoship section headers"
git commit -m "Fix: dark mode validation on new components"

# ❌ WRONG
git commit -m "updated stuff"
git commit -m "WIP: work in progress changes"
```

**Common lint rules:**
- `react-hooks/exhaustive-deps`: Include all dependencies
- `@typescript-eslint/no-explicit-any`: No `any` types
- `@next/next/no-img-element`: Use Next.js `Image`

## Debugging & Troubleshooting

### Common Issues & Solutions

**Hot reload not working?**
```bash
npm run predev  # Clear webpack cache
npm run dev    # Restart dev server
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
- Verify STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_KEY in .env
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
# Check bundle size, cache hits, Core Web Vitals
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
- Never force push main branch

**Payment issues:** Check Stripe dashboard/webhooks
- Verify test keys in development
- Check webhook event logs in Stripe dashboard
- Ensure POST endpoint matches webhook configuration

**Performance degradation:** Run `npm run performance:audit`
- Bundle size over 250KB? Run `npm run analyze`
- Core Web Vitals failing? Check image optimization
- Lighthouse scores dropping? Check CSS specificity

## Pull Request Guidelines (MANDATORY)

**Before creating a PR, verify locally:**
```bash
npm run lint                # ESLint: zero warnings
npm run check-types         # TypeScript: zero errors
npm run validate-dark-mode  # Dark mode: zero violations
npm run validate-blog-images # Blog images: all exist
npm run test:translations   # Translations: complete (if text changed)
npm run test:e2e            # E2E tests: pass (if journeys changed)
```

**PR Description Template:**
```markdown
## Summary
Brief description of what changed and why (1-3 bullet points)

## Changes Made
- [File]: [What changed] - [Why]
- [File]: [What changed] - [Why]

## Testing
- [x] Lint & types pass
- [x] Dark mode validated
- [x] Blog images validated (if applicable)
- [x] E2E tests pass (if applicable)
- [x] Manual testing completed

## Screenshots (if UI changed)
[Add before/after screenshots]

## Related Issues
Fixes #123
```

**Important Notes:**
- Stage generated assets (sitemap, images) separately from code changes
- Capture UI diffs with screenshots when layout changes
- Sync with maintainers before touching Stripe, analytics, or Prisma schema
- Never force push to main branch
- After merge, verify Vercel deployment reaches `READY` state

## Changelog (MANDATORY)
Document every session in `/CHANGELOG.md`:
```markdown
## [YYYY-MM-DD] - [Brief Description]
### Issues Found
- [Technical problem]
### Changes Made
- [File]: [Change] - [Reason]
### Testing Done
- [Validation completed]
```

---

## Business Requirements

### B2B vs B2C Path Strategy
**Current State:** Single consumer-focused e-commerce site
**Required:** Dual-path experience for retailers vs consumers

**Implementation Approach:**
- Header navigation: Add "For Retailers" vs "Shop Now" paths
- Retailer portal: Wholesale pricing, minimum orders, marketing support
- Consumer path: Direct checkout, individual pricing
- Conditional component rendering based on user type
- Separate checkout flows and pricing logic

### Customer Segmentation
- **B2C**: Individual cat owners, direct Stripe checkout
- **B2B**: Pet stores, retailers, wholesale accounts
- **Target Markets**: Canada (primary), US expansion planned

## Critical API Endpoints

```typescript
// Stripe Integration
/api/create-checkout-session     # Consumer checkout
/api/webhooks/stripe            # Payment processing
/api/payment-validation         # Security validation

// Business Logic
/api/cart-recovery             # Abandoned cart emails
/api/analytics/conversion-metrics  # Performance tracking
/api/trial-conversion          # Trial to full conversion

// Content Management
/api/blog-posts               # Dynamic blog content
/api/newsletter              # Email subscriptions
```

---

**Code Quality Promise:** All code output will be production-ready with zero lint warnings, complete TypeScript compliance, full dark mode coverage, and performance optimized.

## SEO & Content Creation Guidelines

**ALWAYS reference keyword research before content updates:**
- Primary file: `/docs/cat odor keywords.xlsx`
- Strategy guide: `/docs/SEO_KEYWORD_STRATEGY.md`

**Content optimization checklist:**
- Target emotional pain points (embarrassment, frustration)
- Use benefit-driven headlines with numbers
- Include high-converting keywords naturally
- Remove money-back guarantee language (company policy)
- "Military-grade" is trust signal only, not SEO keyword

## Deployment Verification Protocol

**MANDATORY: Always verify deployment after pushing changes**

### Step 1: Push and Deploy
```bash
git add . && git commit -m "..." && git push
```

### Step 2: Verify Build Success
Use Vercel MCP to check deployment status:
```bash
# Check latest deployment
mcp__vercel__list_deployments (get latest ID)
mcp__vercel__get_deployment (check state: BUILDING -> READY)
```

### Step 3: Production Validation
If deployment state = "READY":
- ✅ Visit production URL to verify changes are live
- ✅ Test key functionality (forms, navigation, dark mode)
- ✅ Check mobile responsiveness
- ✅ Verify SEO meta tags in view source

### Step 4: Handle Build Failures
If deployment state = "ERROR":
- Check build logs: `mcp__vercel__get_deployment_build_logs`
- Fix TypeScript/lint errors locally
- Re-run `npm run check-types` and `npm run lint`
- Push fix and repeat verification

## Blog Image Requirements

**MANDATORY: Every blog post needs 3-4 high-quality images**

### Image Sources (Commercial-Use Approved):
- **Unsplash.com** (primary) - Always use `?auto=format&fit=crop&w=1600&q=80`
- **Pexels.com** (secondary) - Free commercial use
- **Pixabay.com** (tertiary) - Check license before use

### Image Selection Criteria:
- **High Quality**: Minimum 1600x1067 resolution
- **Contextual Relevance**: Must match blog post topic exactly
- **Professional Look**: Clean, bright, impressive visuals
- **Cat-Related**: Prefer images with cats, litter boxes, homes, or pet care
- **Emotional Appeal**: Images that evoke the pain points or solutions

### Required Images Per Blog Post:
1. **Hero Image** (main article image for social sharing)
2. **Section Images** (2-3 supporting visuals throughout content)
3. **Solution/Result Image** (showing positive outcome)

### Implementation:
```typescript
// Always use these variable names and structure:
const heroImage = 'https://images.unsplash.com/photo-ID?auto=format&fit=crop&w=1600&q=80';
const sectionImage1 = 'https://images.unsplash.com/photo-ID?auto=format&fit=crop&w=1600&q=80';
const solutionImage = 'https://images.unsplash.com/photo-ID?auto=format&fit=crop&w=1600&q=80';

// Update all meta tags:
<meta property="og:image" content={heroImage} />
<meta name="twitter:image" content={heroImage} />
```

### Image Testing Protocol:
After adding images to blog posts, ALWAYS:
1. Use Playwright MCP to test image loading and display
2. Verify images fit context and look professional
3. Check mobile responsiveness of images
4. Confirm images load fast and don't break layout

### Common Image Keywords for Cat Blog Posts:
- "cat litter box clean"
- "happy cat home"
- "pet care supplies"
- "apartment with cat"
- "multiple cats household"
- "cleaning supplies natural"
- "fresh home interior"

## Deployment & Quality Assurance

### Quick Deployment Check
After pushing commits, verify deployment with minimal overhead:

```bash
# Fast deployment verification (30s max)
mcp__vercel__list_deployments | check latest state = "READY"
# If ERROR, only then check build logs
```

### Pre-Commit Validation (MANDATORY)
```bash
npm run validate-dark-mode    # 0 errors required
npm run lint                  # 0 warnings required
npm run check-types          # 0 errors required
```

### Success Criteria:
- Latest deployment state: "READY" ✅
- Dark mode validation: 0 errors ✅
- TypeScript compilation: 0 errors ✅
- ESLint validation: 0 warnings ✅

### Build Failure Recovery:
Only if deployment shows "ERROR":
1. Check build logs: `mcp__vercel__get_deployment_build_logs`
2. Fix issues (usually dark mode or TypeScript violations)
3. Re-run pre-commit validation before pushing

**Vercel Project Info:**
- Project: `prj_4U4S5H54ifEUlIrWw8ebYtvxZBT2`
- Team: `team_9MD2gEmcma1CnApg7QalkGj8`
