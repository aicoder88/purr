# Project Structure

## Directory Organization

```
purrify/
├── pages/              # Next.js Pages Router (routing & page components)
├── src/                # Source code (components, lib, data, translations)
├── public/             # Static assets (images, videos, manifests)
├── scripts/            # Build and optimization scripts
├── prisma/             # Database schema and migrations
├── docs/               # Project documentation
├── e2e/                # Playwright E2E tests
├── __tests__/          # Jest unit tests
└── content/            # Blog content and marketing copy
```

## Pages Directory (Routing)

**Pages Router Structure** - File-based routing, NOT App Router

```
pages/
├── _app.tsx            # App wrapper (providers, global state, analytics)
├── _document.tsx       # HTML document (meta tags, scripts, fonts)
├── index.tsx           # Homepage (/)
├── 404.tsx             # Custom 404 page
├── _error.tsx          # Error boundary
│
├── api/                # API Routes (serverless functions)
│   ├── create-checkout-session.ts    # Stripe checkout
│   ├── contact.ts                    # Contact form handler
│   ├── newsletter.ts                 # Newsletter signup
│   ├── blog-posts.ts                 # Blog API
│   ├── webhooks/                     # Payment webhooks
│   ├── analytics/                    # Analytics endpoints
│   ├── referrals/                    # Referral system
│   ├── retailer/                     # B2B retailer APIs
│   └── admin/                        # Admin APIs
│       └── blog/                     # Blog management APIs
│
├── blog/               # Blog system
│   ├── index.tsx       # Blog listing page
│   ├── [slug].tsx      # Dynamic blog post pages
│   ├── category/       # Category pages
│   ├── tag/            # Tag pages
│   └── preview/        # Preview mode
│
├── products/           # Product pages
│   ├── compare.tsx     # Product comparison
│   ├── trial-size.tsx  # 20g trial product
│   ├── standard.tsx    # 60g standard product
│   └── family-pack.tsx # 140g family product
│
├── learn/              # Educational content
│   ├── how-it-works.tsx
│   ├── science.tsx
│   ├── safety.tsx
│   └── faq.tsx
│
├── solutions/          # Solution-focused landing pages (SEO)
│   ├── apartment-cat-smell-solution.tsx
│   ├── multiple-cats-odor-control.tsx
│   └── [other-solutions].tsx
│
├── locations/          # Location-based pages (SEO)
│   ├── [citySlug].tsx  # Dynamic city pages
│   ├── province/       # Province-specific pages
│   └── [province].tsx  # Province landing pages (ab.tsx, bc.tsx, etc.)
│
├── admin/              # Admin dashboard
│   ├── login.tsx
│   └── blog/           # Blog management UI
│       ├── index.tsx   # Blog dashboard
│       ├── new.tsx     # Create post
│       ├── edit/[slug].tsx  # Edit post
│       └── analytics.tsx    # Blog analytics
│
├── support/            # Customer support
│   ├── index.tsx
│   ├── contact.tsx
│   └── shipping.tsx
│
├── customer/           # Customer portal
│   ├── portal.tsx
│   └── referrals.tsx
│
└── retailer/           # B2B retailer portal
    └── portal/
```

## Source Directory (Components & Logic)

```
src/
├── components/         # React components
│   ├── ui/            # Shadcn/UI components (40+ Radix UI components)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── [other-radix-components].tsx
│   │
│   ├── sections/      # Page sections (reusable)
│   │   ├── Hero.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Features.tsx
│   │   ├── CallToAction.tsx
│   │   └── locations/  # Location-specific sections
│   │
│   ├── layout/        # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── LanguageSwitcher.tsx
│   │
│   ├── admin/         # Admin dashboard components
│   │   ├── MediaLibrary.tsx
│   │   ├── SchedulingCalendar.tsx
│   │   ├── AnalyticsDashboard.tsx
│   │   ├── AIContentGenerator.tsx
│   │   └── [other-admin-components].tsx
│   │
│   ├── mobile/        # Mobile-optimized components
│   ├── performance/   # Performance monitoring
│   ├── seo/           # SEO components (JSON-LD, meta tags)
│   ├── theme/         # Dark mode components
│   └── common/        # Shared components
│       └── OptimizedImage.tsx  # Image optimization wrapper
│
├── lib/               # Utilities and contexts
│   ├── cart-context.tsx          # Shopping cart state
│   ├── translation-context.tsx   # i18n context
│   ├── theme-context.tsx         # Dark mode state
│   ├── image-utils.ts            # Image optimization helpers
│   ├── performance-optimizer.ts  # Performance utilities
│   │
│   ├── blog/          # Blog system utilities
│   │   ├── analytics-service.ts
│   │   ├── category-manager.ts
│   │   ├── media-library.ts
│   │   ├── seo-scorer.ts
│   │   ├── automated-content-generator.ts
│   │   └── [other-blog-utils].ts
│   │
│   ├── seo/           # SEO utilities
│   │   ├── sitemap-cleaner.ts
│   │   ├── report-generator.ts
│   │   └── broken-link-detector.ts
│   │
│   ├── locations/     # Location data and utilities
│   │   └── provinces.ts
│   │
│   └── config/        # Configuration
│       └── environment.ts
│
├── hooks/             # Custom React hooks
│   ├── useAutoSave.ts
│   └── useKeyboardShortcuts.ts
│
├── translations/      # i18n translation files
│   ├── en.ts         # English translations
│   ├── fr.ts         # French translations
│   └── zh.ts         # Chinese translations
│
├── data/             # Static data and content
│   ├── products.ts   # Product definitions
│   ├── cities.ts     # Canadian cities data
│   └── testimonials.ts
│
├── types/            # TypeScript type definitions
│   ├── index.ts
│   └── supabase.ts
│
└── styles/           # Global styles
    └── globals.css   # Tailwind imports, CSS variables
```

## Public Directory (Static Assets)

```
public/
├── optimized/              # Auto-generated optimized images
│   ├── [image]-640w.avif   # Mobile size
│   ├── [image]-828w.avif   # Tablet size
│   ├── [image]-1080w.avif  # Desktop size
│   ├── [image]-1200w.avif  # Large desktop
│   └── [multiple-formats].{avif,webp,jpg}
│
├── original-images/        # Source images (add here, run optimization)
├── images/                 # Legacy images (being phased out)
├── videos/                 # Video assets
├── flags/                  # Language flag icons (en.svg, fr.svg, zh.svg)
│
├── manifest.json           # PWA manifest
├── robots.txt              # SEO robots file
├── sitemap.xml             # Main sitemap
├── sitemap-locations.xml   # Location-specific sitemap
├── image-dimensions.json   # Image metadata (auto-generated)
└── sw.js                   # Service worker
```

## Scripts Directory

```
scripts/
├── optimize-images-enhanced.js     # Main image optimization (Sharp)
├── generate-sitemap.js             # Sitemap generation
├── generate-location-sitemap.js    # Location sitemap
├── bundle-analysis.js              # Bundle size analysis
├── seo-optimization.js             # SEO automation
├── seo-health-check.ts             # SEO health checks
├── performance-audit.js            # Performance checks
├── validate-blog-images.js         # Blog image validation
├── verify-storage.ts               # Storage verification
└── lib/                            # Script utilities
    ├── ConfigurationManager.js
    └── MetadataGenerator.js
```

## Content Directory

```
content/
├── blog/              # Blog posts (Markdown)
│   ├── en/           # English posts
│   ├── fr/           # French posts
│   └── zh/           # Chinese posts
├── categories.json    # Blog categories
└── tags.json         # Blog tags
```

## Documentation

```
docs/
├── PROJECT_OVERVIEW.md         # Technical architecture
├── PROJECT_HANDOFF.md          # Production status
├── REFERENCE.md                # Technical standards
├── OPTIMIZATION_GUIDE.md       # Performance guide
├── IMAGE_OPTIMIZATION_GUIDE.md # Image workflow
├── DEPLOYMENT_CHECKLIST.md     # Deployment guide
├── BLOG_SYSTEM_STATUS.md       # Blog system docs
└── archive/                    # Historical docs
```

## Key Conventions

### Component Organization
- **UI components** (`src/components/ui/`) - Shadcn/UI primitives, no business logic
- **Section components** (`src/components/sections/`) - Reusable page sections with business logic
- **Layout components** (`src/components/layout/`) - Navigation, header, footer
- **Admin components** (`src/components/admin/`) - Admin dashboard UI
- **Page components** (`pages/`) - Route handlers, compose sections

### File Naming
- **Components**: PascalCase (e.g., `OptimizedImage.tsx`)
- **Utilities**: kebab-case (e.g., `image-utils.ts`)
- **Pages**: kebab-case (e.g., `trial-size.tsx`)
- **API routes**: kebab-case (e.g., `create-checkout-session.ts`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAutoSave.ts`)

### Import Patterns
```typescript
// Use path aliases
import { Component } from '@/components/ui/component'
import { translations } from '@translations/en'

// Not relative paths from deep nesting
// Avoid: import { Component } from '../../../components/ui/component'
```

### Image Workflow
1. Add original image to `public/original-images/`
2. Run `npm run optimize-images:enhanced`
3. Optimized versions generated in `public/optimized/`
4. Use `OptimizedImage` component or `getImageProps()` helper
5. Metadata stored in `public/image-dimensions.json`

### Translation Pattern
```typescript
// Use translation context
import { useTranslation } from '@/lib/translation-context'

const { t } = useTranslation()
const text = t('key.path')
```

### API Route Pattern
```typescript
// pages/api/example.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle request
}
```

### Dark Mode Pattern
```typescript
// Use theme context
import { useTheme } from '@/lib/theme-context'

const { theme, toggleTheme } = useTheme()
// theme is 'light' or 'dark'
```

## Build Artifacts

```
.next/              # Next.js build output (gitignored)
node_modules/       # Dependencies (gitignored)
public/optimized/   # Generated images (committed)
public/image-dimensions.json  # Image metadata (committed)
tsconfig.tsbuildinfo  # TypeScript cache (gitignored)
```

## Configuration Files (Root)

- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind theme
- `tsconfig.json` - TypeScript config with path aliases
- `package.json` - Dependencies and scripts
- `vercel.json` - Deployment config
- `netlify.toml` - Netlify config
- `prisma/schema.prisma` - Database schema
- `.env` / `.env.production` - Environment variables (not committed)
- `eslint.config.mjs` - ESLint configuration
- `playwright.config.ts` - E2E test configuration
