# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

~Purrify is a Next.js 15 e-commerce website for activated carbon cat litter additive. Production system requiring dark mode compliance, multi-language support, and secure payment processing.

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

### Key Architecture

**State Management:**
- Cart: React Context with encrypted localStorage (`src/lib/cart-context.tsx`)
- i18n: React Context with Next.js i18n (`src/lib/translation-context.tsx`)
- Theme: Built-in Next.js theme system with automatic persistence

**Key Structure:**
```
pages/                    # Next.js Pages Router
├── api/                 # API routes (Stripe, webhooks, analytics)
├── [locale]/            # Internationalized pages
src/
├── components/
│   ├── sections/        # Page sections (Hero, About, etc.)
│   ├── ui/              # shadcn/ui components
│   ├── layout/          # Header, Footer
│   ├── social-proof/    # Trust badges, notifications
│   └── seo/             # Structured data, JSON-LD
├── lib/                 # Core business logic
├── translations/        # i18n JSON files (en/fr/zh)
└── types/               # TypeScript definitions
scripts/                 # Build/optimization scripts
```

**Page Types:**
- Landing pages: `pages/index.tsx`, product pages
- Learn pages: `/learn/*` (FAQ, How-it-works, Science)
- Location pages: `/locations/*` for local SEO
- Blog: Dynamic routes with SEO optimization

## Essential Commands

```bash
# Development
npm run dev                    # Start dev server
npm run predev                 # Clear cache first

# Pre-commit (MANDATORY)
npm run lint                   # ESLint
npm run check-types           # TypeScript validation
npm run validate-dark-mode    # Dark mode compliance

# Testing
npm run test:e2e              # Playwright end-to-end tests

# Build & Deploy
npm run build                 # Production build
npm run start                 # Start production server
npm run analyze               # Bundle analysis

# Optimization
npm run optimize-images       # Image optimization
npm run optimize-all-images   # Optimize all images
npm run performance:audit     # Performance check (SEO + bundle + cache)
npm run seo:optimize         # SEO optimizations
npm run bundle:analyze       # Bundle size analysis

# Cache Management
npm run clear-cache          # Clear webpack cache
npm run purge-vercel-cache   # Purge Vercel edge cache
```

## Critical Requirements

### Dark Mode Compliance (BUILD FAILS WITHOUT)
**MANDATORY: Every text element MUST have dark: variant - NO EXCEPTIONS**

```css
/* Headings */
text-gray-900 dark:text-gray-50
text-gray-800 dark:text-gray-100

/* Body Text */
text-gray-700 dark:text-gray-200
text-gray-600 dark:text-gray-300

/* White Text (Common Issue) */
text-white dark:text-gray-100    /* NEVER use text-white alone */

/* Colored Text */
text-red-500 dark:text-red-400
text-green-500 dark:text-green-400
text-blue-500 dark:text-blue-400

/* Backgrounds - MUST HAVE DARK VARIANTS */
bg-white dark:bg-gray-800
bg-gray-50 dark:bg-gray-900
bg-blue-50 dark:bg-blue-900/20
bg-green-50 dark:bg-green-900/20
bg-yellow-50 dark:bg-yellow-900/20
bg-red-50 dark:bg-red-900/20

/* Borders - MUST HAVE DARK VARIANTS */
border-gray-200 dark:border-gray-700
border-blue-200 dark:border-blue-700
border-green-200 dark:border-green-700
border-yellow-200 dark:border-yellow-700
```

**CRITICAL DARK MODE RULES:**
1. **NEVER use `text-white` without `dark:text-gray-100`**
2. **NEVER use any `text-*` class without corresponding `dark:text-*`**
3. **ALL colored text needs dark variants** (red, green, blue, etc.)
4. **ALL colored backgrounds need dark variants** (bg-blue-50, bg-green-50, etc.)
5. **ALL borders need dark variants** (border-gray-200, border-blue-200, etc.)
6. **Buttons, links, and interactive elements MUST be readable in dark mode**
7. **Run `npm run validate-dark-mode` BEFORE every commit**

**Common Dark Mode Violations:**
```css
/* ❌ WRONG - Will be unreadable in dark mode */
text-white
text-red-500
text-green-600
bg-blue-50                    /* Missing dark variant */
border-gray-200              /* Missing dark variant */
className="bg-blue-500 text-white"

/* ✅ CORRECT - Readable in both modes */
text-white dark:text-gray-100
text-red-500 dark:text-red-400
text-green-600 dark:text-green-400
bg-blue-50 dark:bg-blue-900/20
border-gray-200 dark:border-gray-700
className="bg-blue-500 text-white dark:text-gray-100"
```

**MANDATORY CHECKLIST - EVERY ELEMENT:**
- [ ] ALL `text-*` classes have `dark:text-*` variants
- [ ] ALL `bg-*` classes have `dark:bg-*` variants
- [ ] ALL `border-*` classes have `dark:border-*` variants
- [ ] ALL colored backgrounds (blue-50, green-50, etc.) have dark variants
- [ ] NO standalone `text-white` without `dark:text-gray-100`
- [ ] Test in both light and dark mode before committing

### Protected Systems
- `/api/create-checkout-session` (Stripe payments)
- `/api/webhooks/stripe` (Payment webhooks)
- `/api/cart-recovery` (Encrypted cart data)
- `/api/analytics/*` (Conversion tracking)
- Payment flow integrity
- Cart data encrypted with CryptoJS

### Content Rules
- NO competitor brand names
- Use tech comparisons: "Activated Carbon vs Baking Soda" NOT "Purrify vs Brand X"
- All text via `useTranslation` hook

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
eslint --max-warnings=0     # Zero warnings
tsc --noEmit               # Zero TypeScript errors
npm run validate-dark-mode  # All elements compliant
```

**Common lint rules:**
- `react-hooks/exhaustive-deps`: Include all dependencies
- `@typescript-eslint/no-explicit-any`: No `any` types
- `@next/next/no-img-element`: Use Next.js `Image`

## Emergency Protocols

**Build failures:** Usually dark mode violations or TypeScript errors  
**Payment issues:** Check Stripe dashboard/webhooks  
**Performance:** Run `npm run performance:audit`

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

## Deployment Verification Protocol

### MANDATORY: After Every Commit/Push
Always verify deployment success using Vercel MCP tools:

```bash
# 1. Check deployment status
mcp__vercel__list_deployments (get latest deployment ID)
mcp__vercel__get_deployment (check state = "READY")

# 2. If deployment fails, check build logs
mcp__vercel__get_deployment_build_logs (identify errors)

# 3. Verify production site accessibility
mcp__vercel__web_fetch_vercel_url (test main domain loads)
```

### Deployment Success Criteria:
- [ ] State shows "READY" (not "BUILDING", "ERROR", "QUEUED")
- [ ] Production URL (www.purrify.ca) loads successfully
- [ ] No build errors in deployment logs
- [ ] All new features/content visible on live site

### Build Failure Recovery:
If deployment shows "ERROR" state:
1. Get build logs: `mcp__vercel__get_deployment_build_logs`
2. Fix identified issues (usually TypeScript/dark mode violations)
3. Re-commit and re-verify
4. Never proceed to next task until deployment is READY

**Project Info for Vercel MCP:**
- Project ID: `prj_4U4S5H54ifEUlIrWw8ebYtvxZBT2`
- Team ID: `team_9MD2gEmcma1CnApg7QalkGj8`