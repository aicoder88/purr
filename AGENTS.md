# AGENTS.md - Purrify Project Documentation

> This file contains essential information for AI coding agents working on the Purrify project. Read this file thoroughly before making any changes.

## Project Overview

**Purrify** is an e-commerce website for an activated carbon cat litter additive product. The website serves multiple markets (Canada, USA) in four languages (English, French, Chinese, Spanish). It features a complete online store, blog with AI-generated content, affiliate program, retailer portal, and comprehensive SEO optimization.

- **Website**: https://www.purrify.ca
- **Primary Market**: Canada (CAD currency)
- **Secondary Market**: USA (USD currency)
- **Node Version**: >= 22.x
- **Package Manager**: pnpm 10.27.0

## Technology Stack

### Core Framework
- **Next.js 16.0.10** - React framework with Pages Router (legacy)
- **React 19.2.3** - UI library
- **TypeScript 5.9.3** - Type safety

### Database & ORM
- **PostgreSQL** - Primary database
- **Prisma 6.19.1** - Type-safe ORM with client generation

### Authentication
- **NextAuth.js 4.24.13** - Authentication library
- **bcryptjs** - Password hashing
- JWT-based sessions with 24-hour expiration

### Styling & UI
- **Tailwind CSS 3.4.19** - Utility-first CSS framework
- **Radix UI** - Headless UI components (extensive usage)
- **Lucide React** - Icon library
- **Framer Motion** - Animation library
- **Embla Carousel** - Carousel component

### Payment & E-commerce
- **Stripe 18.5.0** - Payment processing
- Custom checkout session API
- Subscription/autoship support

### AI & Content Generation
- **Anthropic Claude SDK** - Primary AI for blog generation
- **OpenAI SDK** - Alternative AI provider
- **ChromaDB** - Vector database for content

### Email & Communications
- **Resend** - Transactional email
- **EmailJS** - Client-side email sending
- Custom email templates in `src/emails/`

### Monitoring & Analytics
- **Sentry** - Error tracking and performance monitoring
- **Vercel Analytics** - Web analytics
- Custom UTM tracking implementation

### Testing
- **Jest 30.2.0** - Unit testing
- **Playwright 1.57.0** - E2E testing
- **@testing-library/react** - Component testing

## ⛔ Anti-Patterns (Never Do These)

| Anti-Pattern | Example | Correct Behavior |
|--------------|---------|------------------|
| **The Fabricator** | Referencing `/images/logo.png` that doesn't exist | Run `ls public/images/` first |
| **The Guesser** | Assuming `lodash` is installed | Check `package.json` or ask |
| **The Over-Engineer** | Creating `ButtonFactory` for one button | Just write the button |
| **The Lazy Verifier** | Saying "Done" without testing | Run `pnpm build` and confirm |
| **The Reformatter** | Changing tabs to spaces across the file | Touch only what was requested |
| **The Silent Changer** | Deleting "unused" code that's actually used elsewhere | Mention it, don't delete |
| **The Powder User** | Calling Purrify a "powder" | Use "granules" or "additive" |
| **The Hardcoder** | Writing "Add to Cart" directly in JSX | Use `t('addToCart')` |
| **The White-on-White** | Using text-white without a colored background | Always ensure contrast in BOTH modes |
| **The Label Maker** | Putting labels on generated bags/bottles | Never use labels on AI images |
| **The Dust Maker** | Showing black clouds/dust | Clean, trapped odor only |
| **The Wrong Folder** | Storing images outside `public/images` | Use `public/images` -> `optimized` |

## Project Structure

```
/
├── pages/                  # Next.js Pages Router (legacy)
│   ├── _app.tsx           # App wrapper with providers
│   ├── _document.tsx      # HTML document customization
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth configuration
│   │   ├── admin/         # Admin API endpoints
│   │   ├── affiliate/     # Affiliate program APIs
│   │   ├── cron/          # Scheduled task endpoints
│   │   └── webhooks/      # Stripe webhooks
│   ├── admin/             # Admin dashboard pages
│   ├── affiliate/         # Affiliate portal pages
│   ├── blog/              # Blog pages and articles
│   ├── learn/             # Educational content
│   ├── locations/         # Store location pages
│   └── products/          # Product pages
│
├── src/
│   ├── components/        # React components
│   │   ├── admin/         # Admin-specific components
│   │   ├── affiliate/     # Affiliate components
│   │   ├── blog/          # Blog components
│   │   ├── customer/      # Customer portal components
│   │   ├── layout/        # Layout components (header, footer)
│   │   ├── sections/      # Page section components
│   │   ├── seo/           # SEO components
│   │   ├── ui/            # Reusable UI components (shadcn/ui style)
│   │   └── ...
│   ├── lib/               # Utility libraries
│   │   ├── affiliate/     # Affiliate logic
│   │   ├── auth/          # Authentication utilities
│   │   ├── blog/          # Blog generation & management
│   │   ├── locations/     # Location data
│   │   ├── referral/      # Referral program logic
│   │   ├── security/      # CSRF, rate limiting, sanitization
│   │   ├── seo/           # SEO utilities
│   │   └── tracking/      # UTM and analytics tracking
│   ├── hooks/             # Custom React hooks
│   ├── translations/      # i18n translations (en, fr, zh, es)
│   ├── data/              # Static data files
│   ├── emails/            # Email template components
│   └── types/             # TypeScript type definitions
│
├── content/               # Content files
│   └── blog/              # Blog content in JSON format
│       ├── en/            # English blog posts
│       ├── fr/            # French blog posts
│       ├── zh/            # Chinese blog posts
│       └── es/            # Spanish blog posts
│
├── prisma/                # Database schema and migrations
│   └── schema.prisma      # Prisma schema definition
│
├── scripts/               # Build and utility scripts
│   ├── seo/               # SEO validation and optimization
│   ├── images/            # Image optimization scripts
│   ├── blog/              # Blog automation scripts
│   └── build/             # Build-related scripts
│
├── __tests__/             # Jest unit tests
├── e2e/                   # Playwright E2E tests
├── public/                # Static assets
│   └── optimized/         # Optimized images (auto-generated)
└── [config files]
```

## Build and Development Commands

### Essential Commands

```bash
# Development
pnpm dev              # Start development server with hot reload
                      # Automatically clears webpack cache via predev hook

# Building
pnpm build            # Production build with SEO validation
                      # Runs prebuild hooks: validate-no-middleware, SEO checks
                      # Runs postbuild: next-sitemap, generate-enhanced-sitemap

pnpm prebuild         # Run prebuild validation only
pnpm prebuild:seo     # Run SEO prebuild validation only

# Production server
pnpm start            # Serve production build (for testing)

# Code Quality
pnpm lint             # Run ESLint with Next.js config
pnpm lint --fix       # Auto-fix ESLint issues
pnpm check-types      # TypeScript type checking (tsc --noEmit)

# Testing
pnpm test             # Run Jest unit tests
pnpm test:watch       # Jest in watch mode
pnpm test:coverage    # Jest with coverage report
pnpm test:translations # Translation completeness test only
pnpm test:e2e         # Run Playwright E2E tests
pnpm test:e2e:ui      # Run Playwright with UI

# SEO & Performance
pnpm seo:validate         # Validate SEO compliance
pnpm seo:validate:strict  # Strict SEO validation (fails on error)
pnpm seo:health-check     # Comprehensive SEO health check
pnpm seo:report          # Generate SEO report
pnpm bundle:analyze       # Analyze bundle size
pnpm performance:audit    # Full performance audit

# Blog Automation
pnpm blog:auto:generate   # Generate blog post with AI
pnpm blog:migrate         # Migrate blog posts between formats

# Image Optimization
pnpm optimize-images          # Basic image optimization (moves to public/optimized)
pnpm optimize-images:enhanced # Enhanced optimization (moves to public/optimized)
# NOTE: All images must be in public/optimized. No other folders allowed.
pnpm optimize-images:watch    # Watch mode for development

# Database
pnpm postinstall      # Generate Prisma client
```

### Environment Setup

Copy `.env.local.example` to `.env.local` and configure:
- `NEXTAUTH_SECRET` - Required for authentication
- `NEXTAUTH_URL` - Your local/dev URL
- `DATABASE_URL` - PostgreSQL connection string
- `STRIPE_SECRET_KEY` - For payments
- `ANTHROPIC_API_KEY` - For AI blog generation

## Code Style Guidelines

### TypeScript Conventions
- **Strict mode enabled** - No implicit any
- **2-space indentation**
- **Single quotes** for strings
- **Semicolons required**
- **Explicit prop and variable names** - avoid abbreviations

### File Naming
- **React components**: PascalCase with `.tsx` extension
  - Example: `src/components/HeroBanner.tsx`
- **Utilities/helpers**: camelCase with `.ts` extension
  - Example: `src/lib/seo-utils.ts`
- **Routes/content**: kebab-case
  - Example: `pages/blog/my-awesome-post.tsx`

### Component Structure
```tsx
// Import order: React → External libs → Internal modules → Types
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';

// Props interface with explicit naming
interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  isLoading?: boolean;
}

// Named function component
export function ProductCard({ product, onAddToCart, isLoading }: ProductCardProps) {
  // Component logic
  
  return (
    // JSX
  );
}
```

### Path Aliases
- `@/*` → `src/*`
- `@translations/*` → `src/translations/*`

## Testing Instructions

### Unit Testing (Jest)

Tests are located in `__tests__/` directory with the following structure:
```
__tests__/
├── api/              # API route tests
├── hooks/            # Custom hook tests
├── security/         # Security utility tests
├── seo/              # SEO utility tests
└── translation-completeness.test.js  # Locale coverage
```

**Before running tests:**
1. Ensure translation fixtures are in sync
2. Run `pnpm prisma generate` if database tests are involved

**Running specific tests:**
```bash
pnpm test -- __tests__/hooks/useBreadcrumb.test.ts
pnpm test -- --testNamePattern="specific test name"
```

### E2E Testing (Playwright)

Tests are in `e2e/` directory:
```
e2e/
├── home.spec.ts                    # Homepage tests
├── blog-articles.spec.ts           # Blog functionality
├── checkout-payment-methods.spec.ts # Checkout flow
├── security-*.spec.ts              # Security tests
└── seo/                            # SEO rendering tests
```

**E2E Configuration:**
- Base URL: `http://localhost:3010`
- Workers: 2 (limited to prevent overwhelming server)
- Timeout: 60 seconds

**Running E2E tests:**
```bash
# Start dev server and run tests
pnpm test:e2e

# With UI for debugging
pnpm test:e2e:ui

# Run specific test file
pnpm test:e2e -- e2e/home.spec.ts
```

## Database & ORM

### Prisma Schema
Located at `prisma/schema.prisma`. Key models include:
- `User` - Customer accounts
- `Order` - Purchase orders with Stripe integration
- `Product` - Product catalog with inventory tracking
- `BlogPost` - AI-generated blog content
- `Affiliate` - Affiliate program participants
- `Retailer` - B2B retailer accounts
- `ReferralCode` - Customer referral program
- `Subscription` - Recurring order subscriptions

### Database Commands
```bash
# Generate Prisma client (runs automatically on postinstall)
pnpm prisma generate

# Create and apply migration
pnpm prisma migrate dev --name migration_name

# Deploy migrations in production
pnpm prisma migrate deploy

# Open Prisma Studio
pnpm prisma studio
```

### Connection Handling
The Prisma client is configured as a singleton in `src/lib/prisma.ts` to prevent connection pooling issues in development (hot reload) and ensure proper connection management in production.

## Internationalization (i18n)

### Supported Locales
- `en` - English (default)
- `fr` - French (Canada)
- `zh` - Chinese (Simplified)
- `es` - Spanish

### Translation Structure
Translations are in `src/translations/`:
- `types.ts` - TypeScript interface definitions
- `en.ts`, `fr.ts`, `zh.ts`, `es.ts` - Locale data
- `index.ts` - Export and utility functions
- `seo-meta.ts` - SEO-specific translations

### Usage in Components
```tsx
import { useTranslation } from '@/lib/translation-context';

function MyComponent() {
  const { t } = useTranslation('en');
  return <h1>{t.hero.headline}</h1>;
}
```

### Adding New Translations
1. Add keys to `src/translations/types.ts` interface
2. Add translations to all locale files (`en.ts`, `fr.ts`, `zh.ts`, `es.ts`)
3. Run `pnpm test:translations` to verify completeness

## SEO & Performance

### SEO Architecture
- **Next SEO** - Default SEO configuration in `_app.tsx`
- **Dynamic sitemap** - Generated at build time via `next-sitemap`
- **Structured data** - JSON-LD schemas for Organization, Product, FAQ, etc.
- **Hreflang tags** - Automatic locale alternates
- **Canonical URLs** - Automatic canonical generation

### Key SEO Scripts
```bash
# Validation
pnpm seo:validate           # Check all SEO requirements
pnpm seo:validate:images    # Validate image optimization
pnpm seo:validate:canonicals # Check canonical URLs

# Optimization
pnpm seo:optimize          # Run SEO optimization
pnpm seo:keywords          # Keyword analysis
```

### Performance Optimizations
- **Image optimization** - WebP/AVIF formats with Next.js Image
- **Code splitting** - Dynamic imports for heavy components
- **Cache headers** - Aggressive caching for static assets
- **Bundle analysis** - Use `pnpm bundle:analyze` to check size

## Security Considerations

### Environment Variables
- **Never commit** `.env.local` or any `.env*` files
- Use `.env.local` for local development secrets
- Use Vercel environment variables for production

### Authentication
- Admin authentication via NextAuth with credentials provider
- Rate limiting on login attempts (5 per 15 minutes per IP)
- Session max age: 24 hours
- JWT strategy for stateless sessions

### API Security
- CSRF protection on state-changing endpoints
- Input sanitization via `src/lib/security/sanitize.ts`
- Rate limiting on sensitive endpoints
- Security headers configured in `next.config.js` and `vercel.json`

### File Uploads
- Validate file types and sizes
- Store uploads outside web root
- Use signed URLs for sensitive downloads

## Deployment

### Vercel Configuration
- **Build command**: `pnpm prisma generate && pnpm build`
- **Output directory**: `.next`
- **Framework**: Next.js

### Cron Jobs (Vercel)
Configured in `vercel.json`:
- Daily at 2 PM: Abandoned cart emails
- Daily at 6 AM: Daily maintenance tasks

### Pre-deployment Checklist
1. Run `pnpm lint` - fix any errors
2. Run `pnpm check-types` - ensure TypeScript passes
3. Run `pnpm test` - unit tests pass
4. Run `pnpm build` - production build succeeds
5. Run `pnpm test:e2e` - critical paths work
6. Check `pnpm seo:validate` - no SEO regressions

### Post-deployment Verification
- Check `/api/health/storage` - storage connectivity
- Verify Stripe webhook endpoints
- Test critical user flows (checkout, signup)
- Monitor Sentry for errors

## Common Issues & Solutions

### Build Failures
- **Out of memory**: Increase Node memory: `NODE_OPTIONS="--max-old-space-size=4096"`
- **Type errors**: Run `pnpm check-types` to identify issues
- **Webpack cache**: Clear with `pnpm clear-cache`

### Database Issues
- **Connection errors**: Check `DATABASE_URL` environment variable
- **Prisma client stale**: Run `pnpm prisma generate`

### SEO Issues
- **Missing hreflang**: Check `next-sitemap.config.js` alternateRefs
- **Thin content**: Use `pnpm seo:validate:images` to check image sizes
- **Sitemap errors**: Verify in `next-sitemap.config.js` exclude patterns

## Contact & Resources

- **Site URL**: https://www.purrify.ca
- **Admin Panel**: https://www.purrify.ca/admin
- **Affiliate Portal**: https://www.purrify.ca/affiliate
- **Support Email**: meow@purrify.ca

---

## 🤖 System Instructions

### [SYSTEM_INSTRUCTION: IMAGE_GENERATOR]
**Context**: You are generating image prompts for Purrify.ca.
**Brand Core**: All images must feature deep saturation, volumetric lighting, and a "magical realism" aesthetic.

**STEP 1: CLASSIFY MODE**
Determine if the user's request is [LIFESTYLE] (cats, home, nature) or [TECH] (molecules, filtration, airflow, science).

**STEP 2: APPLY STYLE PRESETS**
**IF [LIFESTYLE]:**
- **Style**: High-fidelity "Hybrid-Ghibli" aesthetic.
- **Vibe**: Magical, pristine, healthy, and thriving.
- **Lighting**: Gentle dappled lighting with warm golden highlights 
- **Render**: Combine the whimsy of hand-painted animation with 8K photorealistic textures.
- **Key Elements**: Cats have hyper-realistic detail but expressive, charming anime-style faces. Soft painterly background (bokeh).

**IF [TECH]:**
- **Style**: Cinematic Macrophotography & 3D Scientific Visualization.
- **Vibe**: Precise, powerful, clean, microscopic clarity.
- **Lighting**: Internal glowing energy, rim lighting, electric blues and purples vs. deep charcoal.
- **Render**: Octane Render, ray-tracing, subsurface scattering, crystalline textures.
- **Key Elements**: Visible airflow streams, glowing activated carbon pores, atomic bonds, sleek industrial design, infinite black or gradient backgrounds.

**STEP 3: GENERATE PROMPT**
Fill the following template based on the selected mode:
- **Subject**: [Describe the core subject/action in detail]
- **Setting**: [Describe background—e.g., "A cozy sun-drenched windowsill" OR "Inside a microscopic carbon pore"]
- **Art Direction**: [Insert the relevant Style Preset text from Step 2]
- **Color Palette**: Vivid and punchy (Makoto Shinkai style vibrancy). Rich emeralds, deep ambers, and vibrant pastels (Lifestyle) OR Neon cyans, electric blues, and matte charcoal (Tech).
- **Camera**: [Wide angle/Eye level] for Lifestyle OR [Macro/Electron Microscope] for Tech.

**STRICT PROHIBITIONS:**
- **NO LABELS** on bags or bottles.
- **NO BLACK CLOUDS/DUST**.
- **NO PURRIFY LOGOS/PACKAGING** unless explicitly provided.
- **ODOR MUST BE obviously adsorbed, or TRAPPED**, never released.
