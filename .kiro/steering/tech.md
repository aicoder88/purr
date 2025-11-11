# Tech Stack

## Core Framework

- **Next.js 15** with Pages Router (NOT App Router)
- **React 19** with TypeScript (strict mode)
- **Node.js 22.x** required

## Styling & UI

- **Tailwind CSS 3.4** with custom theme and CSS variables
- **Shadcn/UI** component library (40+ Radix UI components)
- **Framer Motion** for animations
- **Dark mode** via CSS class strategy with context provider

## Backend & Data

- **PostgreSQL** with Prisma ORM
- **NextAuth.js** for authentication
- **Stripe** for payments and subscriptions
- **API Routes** for serverless backend (no separate server)

## Build & Optimization

- **TypeScript** with strict mode and path aliases (@/*, @translations/*)
- **SWC** for minification (not Babel)
- **Sharp** for image optimization (AVIF/WebP generation)
- **Webpack** with custom chunk splitting
- **Turbopack** support enabled

## Deployment

- **Primary**: Vercel (standalone output)
- **Backup**: Netlify
- **CDN**: Vercel Edge Network

## Internationalization

- **Next.js i18n** routing (locales: en, fr, zh)
- **Custom translation context** in `src/lib/translation-context.tsx`
- **Translation files** in `src/translations/`

## Common Commands

### Development
```bash
npm run dev                    # Start dev server (clears cache first)
npm run build                  # Production build with sitemap generation
npm run start                  # Start production server
```

### Type Checking & Linting
```bash
npm run check-types            # Run TypeScript diagnostics
npm run check-types:unused     # Find unused code
npm run lint                   # ESLint with Next.js preset
npm run lint -- --fix          # Auto-fix linting issues
```

### Testing
```bash
npm run test                   # Jest tests (translation completeness)
npm run test:e2e              # Playwright E2E tests
npm run e2e:web               # Playwright web tests
npm run validate-blog-images   # Validate blog image references
```

### Image Optimization
```bash
npm run optimize-images:enhanced    # Optimize images with Sharp
npm run optimize-images:watch       # Watch mode for images
npm run add-image-dimensions        # Generate image metadata
```

### Performance & Analysis
```bash
npm run analyze                # Bundle analysis
npm run performance:audit      # Full performance audit
npm run bundle:analyze         # Bundle size analysis
npm run cache:optimize         # Cache optimization
```

### SEO & Sitemaps
```bash
npm run generate-enhanced-sitemap   # Generate all sitemaps
npm run seo:optimize                # SEO automation
```

### Cache Management
```bash
npm run clear-cache            # Clear webpack cache
npm run purge-vercel-cache     # Purge Vercel CDN cache
```

## Key Configuration Files

- `next.config.js` - Next.js config with security headers, redirects, webpack customization
- `tailwind.config.js` - Custom theme with dark mode support
- `tsconfig.json` - TypeScript with path aliases
- `prisma/schema.prisma` - Database schema
- `vercel.json` - Deployment configuration
- `package.json` - Dependencies and scripts

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
- Multi-format image optimization (AVIF, WebP, JPEG)
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
- Always run lint and type checks before committing
