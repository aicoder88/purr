# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

Purrify is a Next.js 15 e-commerce website for activated carbon cat litter additive. Production system with strict requirements for dark mode compliance, multi-language support, and payment processing integrity.

**Critical Constraints:**
- Pages Router (NOT App Router)
- Dark mode mandatory on ALL text elements
- Multi-language: en (default), fr, zh
- Stripe payments cannot be broken
- No competitor brand names in content

## Tech Stack & Architecture

### Core Technologies
- **Framework**: Next.js 15 (Pages Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: React Context (CartProvider, TranslationProvider)  
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe integration
- **Deployment**: Vercel

### Directory Structure
```
pages/                    # Next.js routing (Pages Router)
src/components/
  ├── sections/          # Page sections (hero, testimonials)
  ├── ui/                # shadcn/ui components
  ├── layout/            # Header, footer
  └── theme/             # Theme provider/toggle
src/lib/                 # Utilities and configurations
src/translations/        # i18n files (en.ts, fr.ts, zh.ts)
scripts/                 # Build and optimization
prisma/                  # Database schema
```

### Key Models (Prisma)
```prisma
User, Product, Order, Customer, OrderItem, Referral
// NextAuth.js integration
// Stripe webhook integration
```

## Development Commands

### Essential Workflow
```bash
# Development
npm run dev                    # Start dev server
npm run predev                 # Clear webpack cache first

# Pre-commit (MANDATORY)
npm run lint                   # ESLint
npm run check-types           # TypeScript validation
npm run validate-dark-mode    # Dark mode compliance check

# Build & Deploy
npm run build                 # Production build
npm run start                 # Production server
```

### Performance & Optimization
```bash
npm run optimize-images       # Individual image optimization
npm run optimize-all-images   # Bulk image optimization  
npm run performance:audit     # Complete performance audit
npm run analyze              # Bundle analysis
npm run generate-enhanced-sitemap  # SEO sitemap
```

## Critical Requirements

### Dark Mode Compliance (MANDATORY)
**Every text element must have dark: variant. Build will fail without compliance.**

**Required Patterns:**
```css
/* Headings */
text-gray-900 dark:text-gray-50
text-gray-800 dark:text-gray-100

/* Body Text */
text-gray-700 dark:text-gray-200
text-gray-600 dark:text-gray-300

/* Secondary/Metadata */
text-gray-500 dark:text-gray-400
text-gray-400 dark:text-gray-500

/* Backgrounds */
bg-white dark:bg-gray-800
bg-gray-50 dark:bg-gray-900
bg-gray-100 dark:bg-gray-700

/* Borders */
border-gray-100 dark:border-gray-700
border-gray-200 dark:border-gray-600
```

**Validation Command:** `npm run validate-dark-mode`

### Protected Systems
- **Stripe Checkout**: `/api/create-checkout-session` (DO NOT MODIFY)
- **Webhooks**: `/api/webhooks/stripe` (CRITICAL FOR PAYMENTS)
- **Payment Flow**: Must remain functional

### Content Legal Requirements
- **NO competitor brand names** in any content
- Use technology/ingredient comparisons only
- Blog format: "Tech A vs Tech B" not "Brand A vs Brand B"
- Example: "Activated Carbon vs Baking Soda" not "Purrify vs Arm & Hammer"

### Internationalization Rules
- Domain-based routing: `purrify.ca` (en), `fr.purrify.ca` (fr), `zh.purrify.ca` (zh)
- All strings in `src/translations/{locale}.ts`
- Use `useTranslation` hook for text
- Currency/date formatting per locale

## Component Development Standards

### New Component Checklist
```typescript
// MANDATORY: Every text element needs dark variant
className="text-gray-700 dark:text-gray-200"

// Test in both modes before commit
// Check accessibility (WCAG AA contrast)
// Verify mobile responsiveness
```

### UX Interaction Standards
- **Dropdown delays**: Minimum 500ms `onMouseLeave`
- **Social proof notifications**: 45-75 second intervals, max 3 concurrent
- **Animation timing**: 200-400ms for transitions
- **Touch targets**: Minimum 44px on mobile

### Image Optimization Pipeline
- Original images: `public/original-images/`
- Optimized output: `public/optimized/`
- Formats: AVIF → WebP → JPG fallback
- Run optimization after adding new images

## Known Issues (Current State)

### Critical Issues Requiring Attention
1. **Dark mode violations** across multiple components (validation temporarily disabled)
2. **Dropdown menu timing** needs 500ms minimum delay
3. **Social proof frequency** needs 45-75s spacing (currently too fast)
4. **Brand name mentions** in some content need removal

### Testing Protocol
```bash
# Before any commit:
1. npm run lint && npm run check-types
2. npm run validate-dark-mode  
3. Test component in light/dark modes
4. Verify mobile responsiveness
5. Check keyboard navigation
```

## Performance Targets
- **Lighthouse**: 90+ all categories
- **Bundle size**: <250KB gzipped  
- **Core Web Vitals**: Green scores
- **Image formats**: WebP/AVIF with fallbacks

## API Routes & Integration
```
/api/create-checkout-session   # Stripe checkout (PROTECTED)
/api/webhooks/stripe          # Payment webhooks (PROTECTED)
/api/auth/[...nextauth]       # NextAuth.js routes
```

## SEO Implementation
- Next SEO for metadata
- Structured data (Organization, Product schemas)
- Auto-generated sitemap
- Google Tag Manager integration
- Vercel Analytics

## Changelog Requirements (MANDATORY)
```markdown
## [YYYY-MM-DD] - [Brief Description]
### Issues Found
- [Specific technical problem]
### Changes Made
- [File]: [Change] - [Reason]
### Testing Done
- [Validation steps completed]
```

**Log every development session in `/CHANGELOG.md`**

## Development Best Practices

### TypeScript Standards
- Strict mode enabled
- Type all props and state
- Use proper type imports
- Avoid `any` types

### React Patterns
- Functional components with hooks
- Context for global state
- Proper cleanup in useEffect
- Error boundaries for critical sections

### Performance Considerations
- Image optimization mandatory
- Code splitting with dynamic imports
- Caching headers for static assets
- Bundle analysis before deployment

### Accessibility Requirements
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader compatibility
- WCAG AA contrast ratios (both light/dark modes)

## Emergency Contacts & Critical Paths
- **Payment issues**: Check Stripe dashboard and webhook logs
- **Build failures**: Usually dark mode violations or TypeScript errors  
- **SEO problems**: Run `npm run seo:optimize` and check sitemap
- **Performance issues**: Run `npm run performance:audit`

---
