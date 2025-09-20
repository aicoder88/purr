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

/* Backgrounds */
bg-white dark:bg-gray-800
bg-gray-50 dark:bg-gray-900
```

**CRITICAL DARK MODE RULES:**
1. **NEVER use `text-white` without `dark:text-gray-100`**
2. **NEVER use any `text-*` class without corresponding `dark:text-*`**
3. **ALL colored text needs dark variants** (red, green, blue, etc.)
4. **Buttons, links, and interactive elements MUST be readable in dark mode**
5. **Run `npm run validate-dark-mode` BEFORE every commit**

**Common Dark Mode Violations:**
```css
/* ❌ WRONG - Will be unreadable in dark mode */
text-white
text-red-500
text-green-600
className="bg-blue-500 text-white"

/* ✅ CORRECT - Readable in both modes */
text-white dark:text-gray-100
text-red-500 dark:text-red-400
text-green-600 dark:text-green-400
className="bg-blue-500 text-white dark:text-gray-100"
```

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