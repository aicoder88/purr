# Lazy-Load Translation Files

This document describes the route-based translation code splitting implementation that reduces initial bundle size from ~750KB to ~10-30KB per page.

## Overview

### Before (Eager Loading)
- All translations loaded upfront: ~750KB (all 4 locales)
- Per-locale bundle: ~150-200KB
- No code splitting

### After (Lazy Loading)
- Critical translations (common): ~9KB
- Route-specific chunks: 10-40KB each
- Only load what's needed for the current page

## Architecture

```
src/i18n/
├── namespaces.ts          # Namespace definitions and route mapping
├── lazy-loader.ts         # Client-side dynamic loader
├── server-loader.ts       # Server-side loader for RSC
└── messages/              # next-intl messages (unchanged)

src/translations/namespaces/
├── en/
│   ├── common.json        # 9KB - nav, footer, shared UI
│   ├── home.json          # 20KB - homepage sections
│   ├── products.json      # 15KB - product listings
│   ├── product.json       # 2KB - single product
│   ├── learn.json         # 33KB - science, FAQ, how it works
│   ├── retailers.json     # 21KB - B2B content
│   └── ...
├── fr/
├── zh/
└── es/
```

## Usage

### 1. Enable Lazy Loading (App Router)

```tsx
// app/providers.tsx
export function Providers({ 
  children, 
  locale, 
  messages,
  enableLazyTranslations = true  // Enable here
}: ProvidersProps) {
  // ...
}
```

### 2. Server Component (Page Level)

```tsx
// app/[locale]/products/page.tsx
import { loadNamespacesServer } from '@/i18n/server-loader';
import type { Locale } from '@/i18n/config';

export default async function ProductsPage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  // Load only the namespaces needed for this page
  const translations = await loadNamespacesServer(locale, [
    'common',
    'products',
    'product'  // For product cards
  ]);
  
  return (
    <div>
      <ProductsHero translations={translations} />
      {/* ... */}
    </div>
  );
}
```

### 3. Client Component with Hooks

```tsx
// components/ProductsHero.tsx
'use client';

import { useTranslationNamespaces } from '@/hooks/useTranslationNamespaces';
import { useLazyTranslation } from '@/components/providers/LazyTranslationProvider';

export function ProductsHero() {
  // Declare translation dependencies
  const { isLoaded } = useTranslationNamespaces({
    namespaces: ['products', 'common'],
    loadImmediately: true,
    prefetchRelated: true
  });
  
  const { t } = useLazyTranslation();
  
  if (!isLoaded) {
    return <ProductsHeroSkeleton />;
  }
  
  return (
    <div>
      <h1>{t.productsHero.headline}</h1>
      {/* ... */}
    </div>
  );
}
```

### 4. Prefetch on Link Hover

```tsx
import { LazyTranslationLink } from '@/components/ui/LazyTranslationLink';

// Automatically prefetches translations on hover
<LazyTranslationLink href="/products">
  View Products
</LazyTranslationLink>
```

## Namespace Definitions

| Namespace | Size (EN) | Used On | Keys |
|-----------|-----------|---------|------|
| common | 9KB | All pages | nav, footer, shared UI |
| home | 20KB | / | hero, features, benefits |
| products | 15KB | /products | product listings, pricing |
| product | 2KB | /buy/* | single product details |
| learn | 33KB | /learn/* | science, FAQ, how it works |
| blog | 2KB | /blog | blog content |
| retailers | 21KB | /retailers, /b2b | B2B content |
| contact | 3KB | /contact | contact form |
| reviews | 3KB | /reviews | reviews section |
| affiliate | 7KB | /affiliate | affiliate program |
| referral | 2KB | /refer | referral program |
| locations | 6KB | /locations | store locations |
| checkout | 8KB | /thank-you | checkout flow |

## Route Mapping

Routes are mapped to namespaces in `src/i18n/namespaces.ts`:

```typescript
export const ROUTE_NAMESPACE_MAP: Record<string, TranslationNamespace[]> = {
  '/': ['common', 'home'],
  '/products': ['common', 'products'],
  '/learn': ['common', 'learn'],
  '/learn/science': ['common', 'learn'],
  '/retailers': ['common', 'retailers'],
  '/contact': ['common', 'contact'],
  // ...
};
```

## Migration Guide

### Step 1: Extract Namespaces

```bash
# Extract translations into namespace files
npx tsx scripts/extract-namespaces.ts
```

### Step 2: Update Layout

```tsx
// app/layout.tsx
import { loadNamespacesServer } from '@/i18n/server-loader';

export default async function RootLayout({
  children,
  params: { locale }
}) {
  // Load only critical namespace initially
  const messages = await loadNamespacesServer(locale, ['common']);
  
  return (
    <Providers 
      locale={locale} 
      messages={messages}
      enableLazyTranslations={true}
    >
      {children}
    </Providers>
  );
}
```

### Step 3: Update Pages

```tsx
// app/[locale]/page.tsx
import { useTranslationNamespaces } from '@/hooks/useTranslationNamespaces';

export default function HomePage() {
  const { isLoaded } = useTranslationNamespaces({
    namespaces: ['home'],
    loadImmediately: true
  });
  
  // ...
}
```

### Step 4: Verify with Build

```bash
# Analyze bundle
pnpm analyze

# Check translation chunks
ls -la .next/static/chunks/i18n-*
```

## Performance Metrics

### Before
```
Initial JS:  ~750KB (all translations)
Locale size: ~185KB (en), ~200KB (fr)
```

### After
```
Initial JS:  ~9KB (common namespace)
Home page:   +20KB = 29KB total
Product:     +15KB = 24KB total
Learn:       +33KB = 42KB total

Savings: ~80-85% reduction per page
```

## Debug Tools

```typescript
import { estimateMemoryUsage, getCacheStats } from '@/i18n';

// Check cache status
console.log(estimateMemoryUsage()); 
// "3 namespaces cached (~45.23 KB)"

// Get detailed stats
console.log(getCacheStats());
// { cached: 3, pending: 1, totalSize: 46315 }
```

## Troubleshooting

### Missing Translations

If translations are missing after migration:

1. Check namespace file exists: `src/translations/namespaces/[locale]/[namespace].json`
2. Verify key mapping in `src/i18n/lazy-loader.ts` -> `namespaceKeyMap`
3. Check browser network tab for failed chunk loads

### Hydration Mismatch

Ensure server and client load the same namespaces:

```tsx
// Server
const messages = await loadNamespacesServer(locale, ['common', 'home']);

// Client
const { isLoaded } = useTranslationNamespaces({
  namespaces: ['common', 'home']  // Same as server
});
```

### Build Errors

If build fails with missing modules:

```bash
# Clean and rebuild
rm -rf .next
npx tsx scripts/extract-namespaces.ts
pnpm build
```
