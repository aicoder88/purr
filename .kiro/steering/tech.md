# Tech Stack

## Core Framework

- **Next.js 15** (Pages Router, not App Router)
- **React 19** with TypeScript
- **Node.js 22.x** required

## Styling & UI

- **Tailwind CSS 3.4** with custom theme
- **Shadcn/UI** component library (40+ Radix UI components)
- **Framer Motion** for animations
- **CSS Variables** for dark mode theming

## Backend & Data

- **PostgreSQL** with Prisma ORM
- **NextAuth.js** for authentication
- **Stripe** for payments and checkout
- **API Routes** for backend logic (no separate server)

## Build & Optimization

- **TypeScript** with strict mode
- **SWC** for minification (not Babel)
- **Sharp** for image optimization (AVIF/WebP generation)
- **Webpack** with custom chunk splitting
- **Turbopack** support enabled

## Deployment

- **Primary**: Vercel (standalone output)
- **Backup**: Netlify
- **CDN**: Vercel Edge Network

## Internationalization

- **Next.js i18n** (locales: en, fr, zh)
- **Custom translation context** in `src/lib/translation-context.tsx`
- **Translation files** in `src/translations/`

## Common Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Production build
npm run start                  # Start production server

# Type Checking
npm run check-types            # Run TypeScript checks
npm run check-types:unused     # Find unused code

# Image Optimization
npm run optimize-images:enhanced    # Optimize images (Sharp)
npm run optimize-images:watch       # Watch mode for images
npm run add-image-dimensions        # Generate metadata

# Performance & Analysis
npm run analyze                # Bundle analysis
npm run performance:audit      # Full performance audit
npm run bundle:analyze         # Bundle size analysis
npm run cache:optimize         # Cache optimization

# SEO & Sitemaps
npm run generate-enhanced-sitemap   # Generate sitemaps
npm run seo:optimize                # SEO automation

# Testing
npm run test                   # Run Jest tests
npm run test:e2e              # Playwright E2E tests
npm run validate-blog-images   # Validate blog images

# Cache Management
npm run clear-cache            # Clear webpack cache
npm run purge-vercel-cache     # Purge Vercel CDN cache
```

## Key Configuration Files

- `next.config.js` - Extensive Next.js config with security headers, redirects, webpack customization
- `tailwind.config.js` - Custom theme with dark mode support
- `tsconfig.json` - TypeScript with path aliases (@/*, @translations/*)
- `prisma/schema.prisma` - Database schema
- `vercel.json` - Deployment configuration

## Path Aliases

```typescript
@/*              → src/*
@translations/*  → src/translations/*
```

## Environment Variables

Required in `.env` or `.env.production`:
- `NEXT_PUBLIC_EMAILJS_*` - EmailJS configuration
- `NEXT_PUBLIC_STRIPE_*` - Stripe public keys
- `STRIPE_SECRET_KEY` - Stripe secret key
- `DATABASE_URL` - PostgreSQL connection
- `NEXTAUTH_SECRET` - Auth secret
- `WORDPRESS_API_URL` - WordPress integration (optional)

## Build Process

1. `prebuild` - Runs vercel-prebuild.js script
2. `build` - Next.js build with 4GB memory allocation
3. `postbuild` - Generates sitemaps

## Performance Features

- Advanced webpack chunk splitting (framework, lib, commons)
- Image optimization pipeline with multiple formats
- Aggressive caching headers (static assets: 1 year)
- Tree shaking and module concatenation
- Console removal in production
- Optimized package imports for large libraries

## Development Notes

- Use `getDiagnostics` tool for type checking, not bash commands
- Images go in `public/original-images/`, optimization generates to `public/optimized/`
- All API routes are in `pages/api/`
- Components use Shadcn/UI patterns with Tailwind
- Dark mode uses CSS class strategy with context provider
