# Project Structure

## Directory Organization

```
purrify/
├── pages/              # Next.js Pages Router (routing & page components)
├── src/                # Source code (components, lib, data)
├── public/             # Static assets (images, videos, manifests)
├── scripts/            # Build and optimization scripts
├── prisma/             # Database schema
├── docs/               # Project documentation
├── e2e/                # Playwright E2E tests
└── __tests__/          # Jest unit tests
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
│   ├── webhooks/stripe.ts            # Payment webhooks
│   ├── analytics/                    # Analytics endpoints
│   ├── referrals/                    # Referral system
│   └── retailer/                     # B2B retailer APIs
│
├── blog/               # Blog system
│   ├── index.tsx       # Blog listing page
│   ├── [slug].tsx      # Dynamic blog post pages
│   └── [static-posts].tsx  # Individual blog posts
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
├── solutions/          # Solution-focused landing pages
│   ├── apartment-cat-smell-solution.tsx
│   ├── multiple-cats-odor-control.tsx
│   └── [other-solutions].tsx
│
├── locations/          # Location-based pages (SEO)
│   ├── [citySlug].tsx  # Dynamic city pages
│   └── province/       # Province-specific pages
│
├── support/            # Customer support
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
│   ├── ui/            # Shadcn/UI components (40+ components)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── [radix-ui-components].tsx
│   │
│   ├── sections/      # Page sections (reusable)
│   │   ├── Hero.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Features.tsx
│   │   └── CallToAction.tsx
│   │
│   ├── layout/        # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── LanguageSwitcher.tsx
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
│   └── [other-utils].ts
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
│   ├── [image]-640w.avif
│   ├── [image]-640w.webp
│   ├── [image]-828w.avif
│   └── [multiple-sizes].{avif,webp,jpg}
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
└── sw.js                   # Service worker
```

## Scripts Directory

```
scripts/
├── optimize-images-enhanced.js     # Main image optimization
├── generate-sitemap.js             # Sitemap generation
├── bundle-analysis.js              # Bundle size analysis
├── seo-optimization.js             # SEO automation
├── performance-audit.js            # Performance checks
├── validate-blog-images.js         # Blog image validation
└── lib/                            # Script utilities
    ├── ConfigurationManager.js
    └── MetadataGenerator.js
```

## Documentation

```
docs/
├── PROJECT_OVERVIEW.md         # Technical architecture
├── PROJECT_HANDOFF.md          # Production status
├── REFERENCE.md                # Technical standards
├── OPTIMIZATION_GUIDE.md       # Performance guide
├── IMAGE_OPTIMIZATION_GUIDE.md # Image workflow
├── REVENUE_STRATEGY.md         # Business strategy
├── B2B_RETAILERS.md            # B2B documentation
└── archive/                    # Historical docs
```

## Key Conventions

### Component Organization
- **UI components** (`src/components/ui/`) - Shadcn/UI primitives, no business logic
- **Section components** (`src/components/sections/`) - Reusable page sections with business logic
- **Layout components** (`src/components/layout/`) - Navigation, header, footer
- **Page components** (`pages/`) - Route handlers, compose sections

### File Naming
- **Components**: PascalCase (e.g., `OptimizedImage.tsx`)
- **Utilities**: kebab-case (e.g., `image-utils.ts`)
- **Pages**: kebab-case (e.g., `trial-size.tsx`)
- **API routes**: kebab-case (e.g., `create-checkout-session.ts`)

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
```

## Configuration Files (Root)

- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind theme
- `tsconfig.json` - TypeScript config
- `package.json` - Dependencies and scripts
- `vercel.json` - Deployment config
- `netlify.toml` - Netlify config
- `prisma/schema.prisma` - Database schema
- `.env` / `.env.production` - Environment variables
