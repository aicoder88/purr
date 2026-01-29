# Scripts Documentation

This document describes all npm scripts available in the Purrify project.

## Table of Contents

- [Quick Reference](#quick-reference)
- [Development](#development)
- [Build & Deploy](#build--deploy)
- [Type Checking & Linting](#type-checking--linting)
- [Testing](#testing)
- [Image Optimization](#image-optimization)
- [SEO](#seo)
- [Validation](#validation)
- [Blog Management](#blog-management)
- [Performance & Analysis](#performance--analysis)
- [Cache & Cleanup](#cache--cleanup)
- [Dependencies & Utilities](#dependencies--utilities)
- [Database](#database)
- [Build-Breaking Scripts](#build-breaking-scripts)
- [Common Workflows](#common-workflows)

---

## Quick Reference

| Category | Script | Purpose |
|----------|--------|---------|
| **Dev** | `npm run dev` | Start development server |
| **Dev** | `npm run predev` | Clear webpack cache before dev |
| **Build** | `npm run build` | Production build |
| **Build** | `npm run analyze` | Build with bundle analyzer |
| **Quality** | `npm run lint` | Run ESLint |
| **Quality** | `npm run check-types` | TypeScript type checking |
| **Test** | `npm run test` | Run all tests |
| **Images** | `npm run optimize-images:enhanced` | Optimize images |
| **SEO** | `npm run seo:health-check` | Check SEO health |
| **Validate** | `npm run validate-dark-mode` | Validate dark mode variants |

---

## Development

### `npm run dev`
Start the Next.js development server with hot reload.

**Usage:**
```bash
npm run dev
```

**Details:**
- Runs on http://localhost:3000
- Enables hot module replacement
- Shows compilation errors in browser

---

### `npm run predev`
Clear webpack cache before starting dev server.

**When to use:**
- Hot reload is broken or stuck
- Seeing stale cached code
- After switching branches with major changes

**Usage:**
```bash
npm run predev && npm run dev
```

**Script:** `scripts/clear-webpack-cache.js`

---

### `npm run start`
Start the production server (requires `npm run build` first).

**Usage:**
```bash
npm run build
npm run start
```

**Port:** 3000 (configurable via PORT env var)

---

## Build & Deploy

### `npm run build`
Production build with 4GB memory allocation.

**Build lifecycle:**
1. `prebuild` - Vercel-specific preparation
2. `next build` - Next.js build process
3. `postbuild` - Generate sitemaps
4. `postbuild:seo` - SEO health check (optional)

**Usage:**
```bash
npm run build
```

**Environment:**
- `NODE_OPTIONS="--max-old-space-size=4096"` - Allocates 4GB memory
- Requires all environment variables set
- Node.js 22.x required (see package.json engines)

**Output:**
- `.next/` directory with optimized production code
- Static assets in `.next/static/`
- Server bundles in `.next/server/`

---

### `npm run prebuild`
Runs before build for Vercel deployment preparation.

**Script:** `scripts/vercel-prebuild.js`

**Purpose:**
- Environment validation
- Pre-build checks
- Vercel-specific setup

**Note:** Automatically run by `npm run build`

---

### `npm run postbuild`
Runs after build to generate sitemaps.

**Actions:**
1. `next-sitemap` - Generate basic sitemap
2. `npm run generate-enhanced-sitemap` - Enhanced sitemap with all routes

**Outputs:**
- `public/sitemap.xml`
- `public/sitemap-0.xml`
- `public/robots.txt`

**Note:** Automatically run by `npm run build`

---

### `npm run postbuild:seo`
SEO health check after build (optional).

**Script:** `scripts/seo-health-check.ts`

**Checks:**
- Meta tags present
- OpenGraph tags
- Structured data
- Image alt tags
- Heading hierarchy

**Note:** Not run by default; enable manually if needed

---

### `npm run build:production`
Full production build with all optimizations and checks.

**Script:** `scripts/build-production.js`

**Includes:**
- Pre-build validation
- Performance optimization
- SEO checks
- Bundle analysis
- Cache optimization

**Usage:**
```bash
npm run build:production
```

---

### `npm run analyze`
Build with bundle analyzer enabled to visualize bundle composition.

**Usage:**
```bash
npm run analyze
```

**Environment:**
- Sets `ANALYZE=true`
- Opens interactive treemap in browser
- Shows bundle sizes and dependencies

**Requires:** `@next/bundle-analyzer` (already installed)

---

## Type Checking & Linting

### `npm run lint`
Run ESLint on the entire codebase.

**Usage:**
```bash
npm run lint
```

**What it checks:**
- JavaScript/TypeScript syntax errors
- Code style violations
- React best practices
- Next.js specific rules
- Accessibility issues

**Fix automatically:**
```bash
npm run lint -- --fix
```

**Build requirement:** Must have 0 errors before deployment

---

### `npm run check-types`
Run TypeScript type checking without emitting files.

**Script:** `scripts/check-types.js`

**Usage:**
```bash
npm run check-types
```

**What it checks:**
- Type errors
- Type mismatches
- Missing type definitions
- Strict mode compliance

**Build requirement:** Must have 0 errors before deployment

---

### `npm run check-types:unused`
Find unused TypeScript identifiers in the codebase.

**Script:** `scripts/check-unused-identifiers.js`

**Usage:**
```bash
npm run check-types:unused
```

**Finds:**
- Unused variables
- Unused imports
- Unused functions
- Unused types/interfaces

**Purpose:** Code cleanup and dead code elimination

---

## Testing

### `npm run test`
Run all tests (currently aliases to translation tests).

**Usage:**
```bash
npm run test
```

**Currently runs:** `npm run test:translations`

---

### `npm run test:translations`
Test translation file completeness across all locales (en, fr, zh).

**Test file:** `__tests__/translation-completeness.test.js`

**Usage:**
```bash
npm run test:translations
```

**Checks:**
- All locales have same keys
- No missing translations
- No extra keys in one locale
- Valid JSON structure

**Build requirement:** Must pass before deployment

---

### `npm run test:e2e`
Run all Playwright end-to-end tests.

**Script:** `scripts/run-e2e-tests.sh`

**Usage:**
```bash
npm run test:e2e
```

**Test categories:**
- User flows
- Form submissions
- Navigation
- Authentication
- Payment flows

**Requires:**
- `@playwright/test` installed
- Test database configured
- Environment variables set

---

### `npm run test:e2e:security`
Run security-focused E2E tests.

**Script:** `scripts/run-security-tests.sh`

**Usage:**
```bash
npm run test:e2e:security
```

**Tests:**
- CSRF protection
- XSS prevention
- SQL injection prevention
- Rate limiting
- Authentication flows
- Authorization checks
- Session security

**Critical:** These tests validate security middleware

---

### `npm run e2e:web`
Run web-specific E2E tests.

**Script:** `scripts/run-e2e-web.sh`

**Usage:**
```bash
npm run e2e:web
```

**Tests:**
- Page loads
- Client-side interactions
- Responsive design
- Browser compatibility

---

## Image Optimization

### `npm run optimize-images`
Basic image optimization using Sharp.

**Script:** `scripts/optimize-images.js`

**Usage:**
```bash
npm run optimize-images
```

**Optimizes:**
- JPEG quality: 80%
- PNG compression
- WebP conversion

---

### `npm run optimize-images:enhanced`
Enhanced image optimization with better compression and format conversion.

**Script:** `scripts/optimize-images-enhanced.js`

**Usage:**
```bash
npm run optimize-images:enhanced
```

**Features:**
- Multi-format output (WebP, AVIF)
- Responsive image generation
- Better compression ratios
- Preserves aspect ratios
- Adds metadata

**Recommended:** Use this over basic optimization

---

### `npm run optimize-images:watch`
Watch mode for automatic image optimization when files change.

**Usage:**
```bash
npm run optimize-images:watch
```

**Watches:** `public/original-images/` directory

**Triggers:** Runs `optimize-images:enhanced` on any change

**Use case:** Development workflow for continuous optimization

---

### `npm run optimize-all-images`
Optimize all images in the project at once.

**Script:** `scripts/optimize-all-images.js`

**Usage:**
```bash
npm run optimize-all-images
```

**Processes:**
- All images in `public/images/`
- All images in `public/optimized/`
- Product images
- Blog images

**Warning:** Can take several minutes for large projects

---

### `npm run add-image-dimensions`
Add explicit width/height dimensions to images for CLS optimization.

**Script:** `scripts/add-image-dimensions.js`

**Usage:**
```bash
npm run add-image-dimensions
```

**Purpose:**
- Reduce Cumulative Layout Shift (CLS)
- Improve Core Web Vitals
- Better user experience

**Modifies:** Image components to include dimensions

---

## SEO

### `npm run generate-enhanced-sitemap`
Generate comprehensive sitemap with all routes.

**Script:** `scripts/generate-sitemap.js`

**Usage:**
```bash
npm run generate-enhanced-sitemap
```

**Includes:**
- Static pages
- Dynamic product pages
- Blog posts (all locales)
- Category pages
- Location pages

**Output:** `public/sitemap.xml`

**Note:** Automatically run by `postbuild`

---

### `npm run generate-location-sitemap`
Generate sitemap specifically for location-based pages.

**Script:** `scripts/generate-location-sitemap.js`

**Usage:**
```bash
npm run generate-location-sitemap
```

**Includes:**
- City pages
- Province/state pages
- Country pages
- Store locator pages

**Output:** `public/sitemap-locations.xml`

---

### `npm run optimize-sitemap-changefreq`
Optimize sitemap change frequencies based on actual update patterns.

**Script:** `scripts/optimize-sitemap-changefreq.js`

**Usage:**
```bash
npm run optimize-sitemap-changefreq
```

**Analyzes:**
- Git commit history
- Content update frequency
- Page modification dates

**Updates:** `changefreq` and `priority` in sitemap

---

### `npm run seo:optimize`
Full SEO optimization suite.

**Script:** `scripts/seo-optimization.js`

**Usage:**
```bash
npm run seo:optimize
```

**Actions:**
- Generate sitemaps
- Update robots.txt
- Add structured data
- Optimize meta tags
- Generate OpenGraph images

---

### `npm run seo:keywords`
Analyze SEO keywords across the site.

**Script:** `scripts/seo-keyword-analysis.ts`

**Usage:**
```bash
npm run seo:keywords
```

**Analyzes:**
- Keyword density
- Keyword placement
- Competing keywords
- Keyword opportunities

**Output:** Console report with recommendations

---

### `npm run seo:health-check`
Comprehensive SEO health check.

**Script:** `scripts/seo-health-check.ts`

**Usage:**
```bash
npm run seo:health-check
```

**Checks:**
- Meta titles (length, uniqueness)
- Meta descriptions (length, quality)
- Heading hierarchy (H1-H6)
- Image alt tags
- Internal linking
- Mobile optimization
- Page speed indicators
- Structured data validity

**Output:** Detailed report with issue severity

---

### `npm run seo:fix`
Auto-fix common SEO issues.

**Script:** `scripts/seo-fix.ts`

**Usage:**
```bash
npm run seo:fix
```

**Fixes:**
- Missing alt tags
- Duplicate meta titles
- Missing meta descriptions
- Invalid heading hierarchy
- Broken internal links

**Warning:** Review changes before committing

---

## Validation

### `npm run validate-dark-mode`
Ensure all components have proper dark mode variants.

**Script:** `scripts/dark-mode-validator.js`

**Usage:**
```bash
npm run validate-dark-mode
```

**Checks:**
- Every `text-*` class has `dark:text-*`
- Every `bg-*` class has `dark:bg-*`
- Every `border-*` class has `dark:border-*`
- Special cases like `text-white` (requires `dark:text-gray-100`)

**Build requirement:** MUST pass before deployment (build-blocking)

**Exemptions:** Configure in script for special cases

---

### `npm run validate-blog-images`
Validate blog images exist and meet size requirements.

**Script:** `scripts/validate-blog-images.js`

**Usage:**
```bash
npm run validate-blog-images
```

**Checks:**
- Referenced images exist
- Images are within size limits (800x800px for blog)
- Proper formats (WebP, JPEG, PNG)
- No missing images

**Enforces:** `public/optimized/` size limit of 800x800px

---

### `npm run validate-images`
Validate all image dimensions against project limits.

**Script:** `scripts/validate-image-sizes.ts`

**Usage:**
```bash
npm run validate-images
```

**Enforces limits:**
- `public/optimized/`: 800x800px (STRICT)
- `public/optimized/`: 3200x3200px
- `public/images/products/`: 1200x1800px

**Build requirement:** MUST pass before deployment (build-blocking)

**Fix command:**
```bash
sips -Z 800 public/optimized/*.jpg
```

---

### `npm run validate-links`
Check for broken internal and external links.

**Script:** `scripts/validate-links.ts`

**Usage:**
```bash
npm run validate-links
```

**Checks:**
- Internal links (404s)
- External links (broken URLs)
- Anchor links (#fragments)
- Image src links

**Output:** Report of broken links with locations

---

## Blog Management

### `npm run blog:auto:generate`
Automatically generate blog content using AI (Anthropic Claude).

**Script:** `scripts/run-auto-blog.ts`

**Usage:**
```bash
npm run blog:auto:generate
```

**Requires:**
- `ANTHROPIC_API_KEY` environment variable
- Content guidelines in `/content/content-guidelines.md`

**Generates:**
- Blog post JSON files
- Localized content (en, fr, zh)
- SEO-optimized titles and descriptions

**Warning:** Review AI-generated content before publishing

---

### `npm run blog:migrate`
Migrate blog posts between storage formats.

**Script:** `scripts/migrate-blog-posts.ts`

**Usage:**
```bash
npm run blog:migrate
```

**Use cases:**
- Migrating from Markdown to JSON
- Updating schema versions
- Bulk content transformations

---

### `npm run repair-blog`
Repair corrupted or malformed blog posts.

**Script:** `scripts/repair-blog-posts.ts`

**Usage:**
```bash
npm run repair-blog
```

**Fixes:**
- Invalid JSON syntax
- Missing required fields
- Malformed HTML content
- Broken image references
- Invalid dates

**Backup:** Creates `.backup` files before modifying

---

## Performance & Analysis

### `npm run optimize-performance`
Run performance optimization checks.

**Script:** `scripts/optimize-performance.js`

**Usage:**
```bash
npm run optimize-performance
```

**Analyzes:**
- Bundle size
- Render-blocking resources
- Image optimization opportunities
- Unused CSS/JS
- Core Web Vitals

**Output:** Performance report with recommendations

---

### `npm run bundle:analyze`
Analyze JavaScript bundle size and composition.

**Script:** `scripts/bundle-analysis.js`

**Usage:**
```bash
npm run bundle:analyze
```

**Reports:**
- Bundle sizes (gzipped and uncompressed)
- Largest dependencies
- Duplicate code
- Code splitting opportunities

**Helps identify:** Performance bottlenecks and optimization opportunities

---

### `npm run cache:optimize`
Optimize caching configuration.

**Script:** `scripts/cache-optimization.js`

**Usage:**
```bash
npm run cache:optimize
```

**Optimizes:**
- Next.js cache headers
- Static asset caching
- API route caching
- CDN configuration

---

### `npm run performance:audit`
Full performance audit combining SEO, bundle, and cache analysis.

**Usage:**
```bash
npm run performance:audit
```

**Runs sequentially:**
1. `npm run seo:optimize`
2. `npm run bundle:analyze`
3. `npm run cache:optimize`

**Output:** Comprehensive performance report

**Use before:** Production deployments or performance reviews

---

### `npm run analyze-js`
Analyze JavaScript files for optimization opportunities.

**Script:** `scripts/analyze-js.js`

**Usage:**
```bash
npm run analyze-js
```

**Identifies:**
- Large files (candidates for code splitting)
- Unused exports
- Complex functions (candidates for optimization)
- Import inefficiencies

---

## Cache & Cleanup

### `npm run clear-cache`
Clear webpack cache to fix build issues.

**Script:** `scripts/clear-webpack-cache.js`

**Usage:**
```bash
npm run clear-cache
```

**Clears:**
- `.next/cache/`
- `node_modules/.cache/`
- Webpack caches

**When to use:**
- Build errors that don't make sense
- Stale cached modules
- After major dependency updates

---

### `npm run purge-vercel-cache`
Purge Vercel CDN cache.

**Script:** `scripts/purge-vercel-cache.js`

**Usage:**
```bash
npm run purge-vercel-cache
```

**Requires:**
- Vercel authentication
- Project access

**Use case:** Force cache invalidation after deployments

---

## Dependencies & Utilities

### `npm run postinstall`
Automatically generate Prisma client after npm install.

**Usage:** Runs automatically after `npm install`

**Command:** `prisma generate`

**Purpose:**
- Generate type-safe Prisma client
- Update database types
- Ensure ORM is ready

**Note:** Required for TypeScript types in IDE

---

### `npm run find-unused-deps`
Find unused dependencies using depcheck.

**Usage:**
```bash
npm run find-unused-deps
```

**Command:** `npx depcheck`

**Reports:**
- Unused dependencies (can be removed)
- Missing dependencies (should be added)
- Unused devDependencies

**Use for:** Dependency cleanup and bundle size reduction

---

### `npm run browserslist:update`
Update browserslist database for accurate browser targeting.

**Usage:**
```bash
npm run browserslist:update
```

**Command:** `npx update-browserslist-db@latest`

**Updates:**
- Browser market share data
- Feature support data
- Polyfill requirements

**Run:** Periodically (every few months) or when browser warnings appear

---

### `npm run types:supabase`
Generate placeholder Supabase types (legacy).

**Usage:**
```bash
npm run types:supabase
```

**Output:** `src/types/supabase.ts` with placeholder comment

**Note:** Currently generates placeholder; update if using Supabase

---

## Database

These are not npm scripts but commonly used Prisma commands:

### `npx prisma studio`
Open Prisma database GUI in browser.

**Usage:**
```bash
npx prisma studio
```

**Opens:** http://localhost:5555

**Features:**
- View/edit database records
- Browse tables
- Run queries
- Test relationships

---

### `npx prisma generate`
Regenerate Prisma client after schema changes.

**Usage:**
```bash
npx prisma generate
```

**Run after:**
- Modifying `prisma/schema.prisma`
- Adding new models
- Changing field types

**Note:** Automatically run by `postinstall` script

---

### `npx prisma db push`
Push schema changes to database (development).

**Usage:**
```bash
npx prisma db push
```

**Warning:** Use migrations in production

**For development:** Quick schema updates without migration files

---

### `npx prisma migrate dev`
Create and apply migration (development).

**Usage:**
```bash
npx prisma migrate dev --name migration_name
```

**Creates:**
- Migration SQL file
- Updates database
- Regenerates Prisma client

---

### `npx prisma migrate deploy`
Apply migrations (production).

**Usage:**
```bash
npx prisma migrate deploy
```

**Use in:** CI/CD pipelines and production deployments

---

## Build-Breaking Scripts

These scripts MUST pass before deployment. They are part of the pre-commit/CI pipeline.

### Pre-Commit Checklist

```bash
npm run lint                    # 0 ESLint errors
npm run check-types             # 0 TypeScript errors
npm run validate-dark-mode      # All dark mode variants present
npm run validate-images         # All images within size limits
```

**Run all at once:**
```bash
npm run lint && npm run check-types && npm run validate-dark-mode && npm run validate-images
```

**Required standards:**
- ESLint: 0 warnings, 0 errors
- TypeScript: 0 type errors (strict mode)
- Dark mode: 100% coverage on elements
- Images: All within specified size limits

**Failure = Build blocked**

---

## Common Workflows

### Starting Development

```bash
# First time setup
npm install
npx prisma generate
npx prisma db push

# Start development
npm run dev
```

---

### Before Committing

```bash
# Run all quality checks
npm run lint && npm run check-types && npm run validate-dark-mode && npm run validate-images

# Fix any issues
npm run lint -- --fix
```

---

### Fix Hot Reload Issues

```bash
# Clear cache and restart
npm run predev && npm run dev

# Or manually
npm run clear-cache
npm run dev
```

---

### Full Performance Audit

```bash
# Complete performance check
npm run performance:audit

# Individual checks
npm run bundle:analyze
npm run seo:health-check
npm run optimize-performance
```

---

### Optimize Images Before Deployment

```bash
# Optimize all images with enhanced settings
npm run optimize-images:enhanced

# Validate they meet size requirements
npm run validate-images

# Fix blog images if needed
sips -Z 800 public/optimized/*.jpg
npm run validate-blog-images
```

---

### Prepare for Production Deploy

```bash
# 1. Run quality checks
npm run lint && npm run check-types && npm run validate-dark-mode && npm run validate-images

# 2. Run tests
npm run test
npm run test:e2e

# 3. Build and analyze
npm run build
npm run analyze

# 4. SEO check
npm run seo:health-check
```

---

### Run All E2E Tests

```bash
# All E2E tests
npm run test:e2e

# Security tests only
npm run test:e2e:security

# Web tests only
npm run e2e:web
```

---

### Clean Slate Rebuild

```bash
# Clear all caches
npm run clear-cache

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Regenerate Prisma
npx prisma generate

# Fresh build
npm run build
```

---

### Update Dependencies

```bash
# Check for unused dependencies
npm run find-unused-deps

# Update browserslist
npm run browserslist:update

# After updating deps, regenerate Prisma
npm install
npx prisma generate
```

---

### Blog Content Workflow

```bash
# Generate new blog post
npm run blog:auto:generate

# Validate blog images
npm run validate-blog-images

# Repair any issues
npm run repair-blog

# Migrate if needed
npm run blog:migrate
```

---

## Directory Structure

```
scripts/
├── blog/                      # Blog content management
│   ├── run-auto-blog.ts
│   ├── migrate-blog-posts.ts
│   └── repair-blog-posts.ts
├── build/                     # Build and bundle optimization
│   ├── build-production.js
│   ├── bundle-analysis.js
│   ├── cache-optimization.js
│   ├── clear-webpack-cache.js
│   ├── optimize-performance.js
│   └── purge-vercel-cache.js
├── images/                    # Image processing and validation
│   ├── optimize-images.js
│   ├── optimize-images-enhanced.js
│   ├── optimize-all-images.js
│   ├── validate-blog-images.js
│   └── validate-image-sizes.ts
├── seo/                       # SEO optimization
│   ├── generate-sitemap.js
│   ├── seo-optimization.js
│   ├── seo-keyword-analysis.ts
│   ├── seo-health-check.ts
│   ├── seo-fix.ts
│   └── optimize-sitemap-changefreq.js
├── validation/                # Code validation
│   ├── dark-mode-validator.js
│   ├── validate-links.ts
│   └── check-unused-identifiers.js
├── one-time/                  # Migration scripts
│   └── generate-location-sitemap.js
├── check-types.js             # TypeScript type checking
├── vercel-prebuild.js         # Vercel deployment prep
├── run-e2e-tests.sh          # E2E test runner
├── run-security-tests.sh     # Security test runner
├── run-e2e-web.sh            # Web E2E test runner
└── analyze-js.js             # JavaScript analysis
```

---

## Environment Variables

Many scripts require environment variables. Ensure these are set:

**Required:**
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - NextAuth.js secret
- `NEXTAUTH_URL` - Application URL
- `NEXT_PUBLIC_SITE_URL` - Public site URL

**Optional (for specific scripts):**
- `ANTHROPIC_API_KEY` - For blog auto-generation
- `STRIPE_SECRET_KEY` - For payment features
- `RESEND_API_KEY` - For email features
- `SENTRY_DSN` - For error tracking
- `CRON_SECRET` - For scheduled jobs

**See:** `.env.example` for complete list

---

## Troubleshooting

### "Cannot find module" errors

```bash
npm run clear-cache
rm -rf node_modules package-lock.json
npm install
```

### Type errors after schema change

```bash
npx prisma generate
npm run check-types
```

### Build fails on dark mode validation

```bash
# See specific failures
npm run validate-dark-mode

# Add missing dark: variants to components
```

### Image validation failures

```bash
# See which images are too large
npm run validate-images

# Resize blog images
sips -Z 800 public/optimized/*.jpg

# Re-optimize all images
npm run optimize-images:enhanced
```

### Sitemap not updating

```bash
# Manually regenerate
npm run generate-enhanced-sitemap

# Or rebuild
npm run build
```

---

## Additional Resources

- **Project Guidelines:** `/CLAUDE.md`
- **Spec-Driven Development:** `/spec-driven-protocol.md`
- **Content Guidelines:** `/content/content-guidelines.md`
- **Translations:** `src/translations/`
- **Prisma Schema:** `prisma/schema.prisma`

---

## Contributing

When adding new scripts:

1. Add to `package.json` scripts section
2. Document in this README with:
   - Purpose
   - Usage example
   - Script location
   - Dependencies
   - When to run
3. Add to appropriate category
4. Update Quick Reference table if commonly used
5. Add to Common Workflows if part of a standard process

---

**Last Updated:** 2025-12-31
**Version:** 0.1.0
**Node Version:** 22.x
