# PROJECT OVERVIEW - Purrify E-commerce Platform

## 🎯 Application Purpose

Purrify is a production-ready Next.js e-commerce website for an activated carbon cat litter additive product that eliminates odors at the source. The platform features comprehensive multi-language support, advanced performance optimizations, and enterprise-level SEO capabilities.

**Key Business Features:**
- E-commerce functionality with Stripe integration
- Multi-language support (English, French, Chinese)
- Blog system for content marketing and SEO
- Advanced image optimization pipeline
- Performance monitoring and analytics
- Referral system and customer management

## 🏗️ Architecture Overview

### Technology Stack
```json
{
  "framework": "Next.js 15 (Pages Router)",
  "language": "TypeScript",
  "styling": "Tailwind CSS + Shadcn/UI",
  "database": "PostgreSQL with Prisma ORM",
  "authentication": "NextAuth.js",
  "payments": "Stripe",
  "deployment": "Vercel (primary), Netlify (backup)",
  "analytics": "Vercel Analytics + Google Tag Manager",
  "image_optimization": "Sharp (AVIF/WebP generation)",
  "internationalization": "Next.js i18n with custom context"
}
```

### Core Architecture Patterns
- **Pages Router**: Traditional Next.js routing (not App Router)
- **Context-based State Management**: Shopping cart and translations
- **Component Library**: Shadcn/UI with custom extensions
- **Performance-First**: Advanced webpack optimization and caching
- **SEO-Optimized**: Comprehensive structured data and sitemaps

## 📁 Directory Structure

```
/Users/macmini/VS/purr/
├── 📄 Configuration & Build
│   ├── package.json                    # Dependencies and 33+ npm scripts
│   ├── next.config.js                  # Extensive Next.js configuration
│   ├── tailwind.config.js              # Custom Tailwind theme
│   ├── tsconfig.json                   # TypeScript configuration
│   ├── vercel.json                     # Vercel deployment config
│   └── scripts/                        # 20+ build and optimization scripts
│       ├── optimize-images.js          # Image optimization pipeline
│       ├── generate-sitemap.js         # SEO sitemap generation
│       ├── performance-audit.js        # Performance analysis
│       └── seo-optimization.js         # SEO automation
│
├── 🗂️ Pages (Next.js Pages Router)
│   └── pages/
│       ├── _app.tsx                    # App wrapper with providers
│       ├── _document.tsx               # Custom document with optimizations
│       ├── index.tsx                   # Homepage (English)
│       ├── api/                        # API routes
│       │   ├── create-checkout-session.ts # Stripe integration
│       │   ├── contact.ts              # Contact form handler
│       │   ├── webhooks/stripe.ts      # Payment webhooks
│       │   └── [8 other API routes]
│       ├── blog/                       # Content marketing system
│       │   ├── [slug].tsx              # Dynamic blog posts
│       │   └── [6 static blog posts]
│       ├── learn/                      # Educational content
│       ├── products/                   # Product pages
│       ├── customers/                  # Social proof pages
│       ├── fr/                         # French language pages
│       └── zh/                         # Chinese language pages
│
├── 🎨 Source Code
│   └── src/
│       ├── components/                 # 80+ React components
│       │   ├── sections/               # Page sections (hero, testimonials, etc.)
│       │   ├── ui/                     # Shadcn/UI components (40+ components)
│       │   ├── layout/                 # Layout components
│       │   ├── mobile/                 # Mobile-optimized components
│       │   ├── performance/            # Performance monitoring
│       │   ├── seo/                    # SEO and structured data
│       │   └── theme/                  # Dark/light mode system
│       ├── lib/                        # Utility functions and contexts
│       │   ├── cart-context.tsx        # Shopping cart state
│       │   ├── translation-context.tsx # i18n context
│       │   ├── performance-optimizer.ts # Performance utilities
│       │   └── [15 other utilities]
│       ├── translations/               # i18n system
│       │   ├── en.ts                   # English translations
│       │   ├── fr.ts                   # French translations
│       │   └── zh.ts                   # Chinese translations
│       ├── data/                       # Static data and content
│       ├── stories/                    # Storybook documentation (40+ stories)
│       └── types/                      # TypeScript definitions
│
├── 🗄️ Database
│   └── prisma/
│       └── schema.prisma               # PostgreSQL schema (Users, Orders, Products, Referrals)
│
├── 🖼️ Assets
│   └── public/
│       ├── optimized/                  # Auto-generated optimized images
│       ├── original-images/            # Source images for optimization
│       ├── videos/                     # Video assets
│       ├── flags/                      # Language flag icons
│       ├── manifest.json               # PWA configuration
│       ├── robots.txt                  # SEO directives
│       └── sitemap*.xml                # SEO sitemaps
│
└── 📚 Documentation
    ├── README.md                       # Project documentation
    ├── CLAUDE.md                       # Development guidelines
    ├── ULTIMATE-OPTIMIZATION-GUIDE.md # Performance guide
    └── docs/                           # Additional documentation
```

## 🔧 Key Configuration Values

### TypeScript Configuration
```json
{
  "target": "es2015",
  "strict": true,
  "noEmit": true,
  "jsx": "preserve",
  "paths": {
    "@/*": ["./src/*"],
    "@translations/*": ["./src/translations/*"]
  }
}
```

### Environment Variables (from .env.production.example)
```env
# Deployment
VERCEL_TOKEN=your_vercel_token_here
VERCEL_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_DOMAIN=purrify.ca

# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_*
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_*

# WordPress Integration
WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
```

### Next.js Configuration Highlights
```javascript
{
  output: 'standalone',
  i18n: {
    locales: ['en', 'fr', 'zh'],
    defaultLocale: 'en',
    domains: [
      { domain: 'purrify.ca', defaultLocale: 'en' },
      { domain: 'fr.purrify.ca', defaultLocale: 'fr' },
      { domain: 'zh.purrify.ca', defaultLocale: 'zh' }
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
  }
}
```

## 📦 Dependencies Overview

### Core Dependencies (Notable Ones)
```json
{
  "next": "^15.4.5",
  "react": "^19.1.1",
  "typescript": "^5.9.2",
  "@prisma/client": "^6.13.0",
  "next-auth": "^4.24.11",
  "stripe": "^18.4.0",
  "framer-motion": "^12.23.12",
  "sharp": "^0.34.3",
  "@radix-ui/*": "Multiple Radix UI components",
  "tailwindcss": "3.4.1"
}
```

### Development Scripts (33 total)
```bash
# Development
npm run dev          # Start development server
npm run build        # Production build
npm run check-types  # TypeScript checking

# Performance & Optimization  
npm run analyze              # Bundle analysis
npm run optimize-images      # Image optimization
npm run performance:audit    # Complete performance audit
npm run clear-cache         # Cache management

# SEO & Content
npm run generate-enhanced-sitemap  # Sitemap generation
npm run seo:optimize              # SEO automation
```

## 🐛 Known Issues & Pain Points

### Code Analysis Results
Based on scanning the codebase for TODOs, warnings, and error handling:

1. **Error Handling Patterns Found:**
   - Cache operations have proper error handling with console warnings
   - EmailJS configuration errors are logged but not user-facing
   - Performance monitoring gracefully degrades when APIs aren't supported
   - Mobile payment flows have comprehensive error handling

2. **No Critical TODOs or FIXMEs Found:**
   - Codebase appears to be production-ready
   - No urgent technical debt identified in comments

3. **Areas of Complexity:**
   - **Image Optimization Pipeline**: Complex build process with multiple formats
   - **Webpack Configuration**: Extensive customization in next.config.js
   - **i18n Implementation**: Custom translation context alongside Next.js i18n
   - **Performance Monitoring**: Multiple performance optimization layers

## 🔄 Main Workflows

### 1. E-commerce Flow
```
User Browse Products → Add to Cart → Stripe Checkout → 
Webhook Processing → Order Creation → Email Confirmation
```

### 2. Content Management
```
Blog Post Creation → SEO Optimization → Sitemap Generation → 
Multi-language Deployment → Performance Monitoring
```

### 3. Image Optimization
```
Add Original Image → Run Optimization Script → 
Generate AVIF/WebP/JPG → Update Metadata → 
Deploy to CDN
```

### 4. Development Workflow
```
Code Changes → TypeScript Check → Lint → 
Performance Audit → Build → Deploy to Vercel
```

### 5. Internationalization
```
Add English Content → Translate to FR/ZH → 
Update Translation Files → Deploy Domain-specific Routes
```

## 🚀 Performance Features

1. **Advanced Webpack Optimization**
   - Custom chunk splitting strategy
   - Framework chunks for React/Next.js
   - Library-specific chunking (Radix UI, Chart.js)
   - Tree shaking and module concatenation

2. **Image Optimization Pipeline**
   - Sharp-based optimization
   - AVIF, WebP, and JPG generation
   - Automatic dimension metadata
   - CDN-optimized caching headers

3. **Caching Strategy**
   - Static assets: 1 year cache
   - API routes: 5-60 minutes cache
   - Images: 30 days cache
   - Webpack filesystem cache

4. **SEO Optimization**
   - Enhanced sitemap generation
   - Structured data for products/organization
   - Localized meta tags
   - Core Web Vitals optimization

## 🔒 Security Considerations

- **Content Security Policy**: Configured for images and scripts
- **Security Headers**: XSS protection, frame options, referrer policy
- **Environment Variables**: Sensitive data properly externalized
- **API Routes**: Input validation and error handling
- **Build Process**: Console logs removed in production

## 📈 Analytics & Monitoring

- **Vercel Analytics**: Performance and user behavior
- **Google Tag Manager**: Custom event tracking
- **Performance Monitoring**: Custom performance observer
- **Cache Analytics**: Cache hit/miss tracking
- **Error Monitoring**: Graceful error handling and logging

This codebase represents a production-ready, enterprise-level e-commerce platform with comprehensive optimization, internationalization, and monitoring capabilities.