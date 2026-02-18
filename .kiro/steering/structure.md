# Project Structure

## Directory Organization

```
purrify/
├── app/                # Next.js App Router (routing & page components)
├── src/                # Source code (components, lib, data, translations)
├── public/             # Static assets (images, videos, manifests)
├── scripts/            # Build and optimization scripts
├── prisma/             # Database schema and migrations
├── docs/               # Project documentation
├── e2e/                # Playwright E2E tests
├── __tests__/          # Jest unit tests
└── content/            # Blog content and marketing copy
```

## App Directory (App Router)

**App Router Structure** - File-based routing with layout support

```
app/
├── layout.tsx          # Root layout (providers, global state, fonts)
├── page.tsx            # Homepage (/)
├── not-found.tsx       # 404 page
├── error.tsx           # Error boundary
├── globals.css         # Global styles
│
├── api/                # Route Handlers (serverless functions)
│   ├── create-checkout-session/    # Stripe checkout
│   ├── contact/                    # Contact form handler
│   ├── newsletter/                 # Newsletter signup
│   ├── blog-posts/                 # Blog API
│   ├── webhooks/                   # Payment webhooks
│   ├── analytics/                  # Analytics endpoints
│   ├── referrals/                  # Referral system
│   ├── retailer/                   # B2B retailer APIs
│   └── admin/                      # Admin APIs
│       └── blog/                   # Blog management APIs
│
├── [locale]/           # Localized routes
│   ├── layout.tsx      # Locale layout with i18n
│   ├── page.tsx        # Localized homepage
│   ├── products/       # Product pages
│   │   └── page.tsx
│   ├── blog/           # Blog system
│   │   ├── page.tsx    # Blog listing
│   │   └── [slug]/     # Dynamic blog posts
│   │       └── page.tsx
│   ├── learn/          # Educational content
│   │   └── page.tsx
│   └── b2b/            # B2B pages
│       └── page.tsx
│
└── (routes)/           # Route groups (non-localized)
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
│   ├── zh.ts         # Chinese translations
│   └── es.ts         # Spanish translations
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
└── styles/           # Global styles (if needed outside app/)
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
├── flags/                  # Language flag icons (en.svg, fr.svg, zh.svg, es.svg)
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
│   ├── zh/           # Chinese posts
│   └── es/           # Spanish posts
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
- **Page components** (`app/**/page.tsx`) - Route handlers, compose sections

### File Naming
- **Components**: PascalCase (e.g., `OptimizedImage.tsx`)
- **Utilities**: kebab-case (e.g., `image-utils.ts`)
- **Routes**: App Router uses `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`
- **API routes**: Route Handlers use `route.ts` in `app/api/**/`
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

### API Route Pattern (App Router)
```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Handle request
  return NextResponse.json({ success: true })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  // Handle POST
  return NextResponse.json({ success: true })
}
```

### Server Component Pattern
```typescript
// app/page.tsx (Server Component by default)
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description'
}

export default function Page() {
  return <div>Server-rendered content</div>
}
```

### Client Component Pattern
```typescript
// components/ClientComponent.tsx
'use client'

import { useState } from 'react'

export function ClientComponent() {
  const [state, setState] = useState()
  // Client-side logic
  return <div>Client component</div>
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
