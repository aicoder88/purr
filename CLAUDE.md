# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Purrify is a Next.js e-commerce website for an activated carbon cat litter additive product. The application features:

- Multi-language support (English, French, Chinese)
- E-commerce functionality with Stripe integration
- Blog system for SEO
- Advanced image optimization
- Performance monitoring and analytics
- Internationalization (i18n) with Next.js

## Common Development Commands

### Development
- `npm run dev` - Start development server
- `npm run predev` - Clear webpack cache before dev
- `npm run build` - Build for production (includes prebuild step)
- `npm run start` - Start production server

### Code Quality
- `npm run lint` - Run ESLint
- `npm run check-types` - Run TypeScript type checking

### Performance & Optimization
- `npm run optimize-images` - Optimize individual images
- `npm run optimize-all-images` - Optimize all images in project
- `npm run optimize-performance` - Run performance optimization scripts
- `npm run analyze` - Analyze bundle size with webpack-bundle-analyzer
- `npm run performance:audit` - Run complete performance audit

### Cache Management
- `npm run clear-cache` - Clear webpack cache
- `npm run purge-vercel-cache` - Purge Vercel cache

### SEO & Sitemaps
- `npm run generate-enhanced-sitemap` - Generate comprehensive sitemap
- `npm run seo:optimize` - Run SEO optimization

## Architecture & Key Components

### Framework & Structure
- **Framework**: Next.js 15 (Pages Router)
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context (CartProvider, TranslationProvider)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe integration
- **Deployment**: Vercel

### Directory Structure
- `pages/` - Next.js pages (uses Pages Router, not App Router)
- `src/components/` - React components organized by purpose:
  - `sections/` - Page sections (hero, testimonials, etc.)
  - `ui/` - Reusable UI components (shadcn/ui)
  - `layout/` - Layout components (header, footer)
  - `theme/` - Theme provider and toggle
- `src/lib/` - Utility functions and configurations
- `src/translations/` - i18n translation files
- `scripts/` - Build and optimization scripts
- `prisma/` - Database schema and migrations

### Internationalization
- Uses Next.js i18n with custom TranslationProvider
- Supported locales: `en` (default), `fr`, `zh`
- Translation files in `src/translations/`
- Domain-based locale routing configured in `next.config.js`

### Image Optimization
- Custom image optimization pipeline with Sharp
- Multiple formats: AVIF, WebP, JPG fallbacks
- Optimized images stored in `public/optimized/`
- Original images in `public/original-images/`

### Performance Features
- Advanced webpack optimization with custom chunk splitting
- Aggressive caching headers for static assets
- Image optimization with multiple formats
- Bundle analysis tools
- Performance monitoring

## Database Schema
The application uses Prisma with PostgreSQL and includes:
- User management with NextAuth.js integration
- Product catalog
- Order system with customer data
- Referral system

Key models: User, Product, Order, Customer, OrderItem, Referral

## Key Configuration Files
- `next.config.js` - Extensive Next.js configuration with i18n, image optimization, security headers, and webpack customization
- `tailwind.config.js` - Tailwind configuration with custom theme
- `prisma/schema.prisma` - Database schema
- `vercel.json` - Vercel deployment configuration

## Payment Integration
- Stripe integration for payment processing
- API routes for checkout session creation
- Webhook handling for order fulfillment

## SEO & Analytics
- Next SEO for metadata management
- Google Tag Manager integration
- Structured data for organization/product schema
- Comprehensive sitemap generation
- Vercel Analytics integration

## Testing
No formal test framework is currently set up. The project uses TypeScript for type safety and ESLint for code quality.