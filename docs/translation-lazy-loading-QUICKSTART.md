# Lazy Loading Translations - Quick Start

## What Was Implemented

### Problem
- Loading 150-200KB per locale eagerly
- All translations bundled together (~750KB total)
- No code splitting

### Solution
- Route-based translation code splitting into 15 namespaces
- Dynamic `import()` for non-critical translations
- Only load keys needed for current page

## Size Comparison

| Namespace | EN Size | Used On |
|-----------|---------|---------|
| **Before (all)** | **~185KB** | Every page |
| common | 12KB | All pages |
| home | 25KB | Homepage |
| products | 18KB | Product pages |
| learn | 38KB | Learn section |
| retailers | 28KB | B2B pages |
| **Savings** | **~80-85%** | Per page |

## Quick Start

### 1. Extract Namespaces (Already Done)
```bash
npx tsx scripts/extract-namespaces.ts
```

This creates files in `src/translations/namespaces/[locale]/[namespace].json`

### 2. Enable Lazy Loading in Your Page

**Server Component (App Router):**
```tsx
// app/[locale]/products/page.tsx
import { loadNamespacesServer } from '@/i18n/server-loader';
import type { Locale } from '@/i18n/config';

export default async function ProductsPage({
  params: { locale }
}: { params: { locale: Locale } }) {
  // Load only required namespaces
  const messages = await loadNamespacesServer(locale, [
    'common',
    'products'
  ]);
  
  return (
    <Providers locale={locale} messages={messages}>
      <ProductsContent />
    </Providers>
  );
}
```

**Client Component:**
```tsx
'use client';

import { useTranslationNamespaces } from '@/hooks/useTranslationNamespaces';
import { useLazyTranslation } from '@/components/providers/LazyTranslationProvider';

export function ProductsContent() {
  // Declare namespace dependencies
  const { isLoaded } = useTranslationNamespaces({
    namespaces: ['products', 'common'],
    loadImmediately: true,
  });
  
  const { t } = useLazyTranslation();
  
  if (!isLoaded) return <Skeleton />;
  
  return (
    <div>
      <h1>{t.productsHero.headline}</h1>
    </div>
  );
}
```

### 3. Use Prefetch Links

```tsx
import { LazyTranslationLink } from '@/components/ui/LazyTranslationLink';

// Automatically prefetches translations on hover
<LazyTranslationLink href="/products">
  View Products
</LazyTranslationLink>
```

## Available Namespaces

| Namespace | Routes | Description |
|-----------|--------|-------------|
| `common` | All | Nav, footer, shared UI |
| `home` | `/` | Homepage sections |
| `products` | `/products`, `/buy` | Product listings |
| `product` | `/buy/*` | Single product |
| `learn` | `/learn/*`, `/science` | Science, FAQ |
| `blog` | `/blog` | Blog content |
| `retailers` | `/retailers`, `/b2b` | B2B content |
| `contact` | `/contact` | Contact form |
| `reviews` | `/reviews` | Reviews |
| `affiliate` | `/affiliate` | Affiliate program |
| `referral` | `/refer` | Referral program |
| `locations` | `/locations` | Store locations |
| `checkout` | `/thank-you` | Checkout flow |
| `admin` | `/admin` | Admin dashboard |
| `account` | `/customer` | User account |

## Migration Strategy

### Phase 1: Enable for New Pages (Current)
- Keep existing `TranslationProvider` as default
- Use `LazyTranslationProvider` opt-in for new pages
- No breaking changes

### Phase 2: Gradual Migration
```tsx
// In your layout.tsx - opt-in to lazy loading
<Providers 
  locale={locale} 
  messages={messages}
  enableLazyTranslations={true}  // Enable here
>
```

### Phase 3: Full Migration
- Make lazy loading the default
- Remove legacy `TranslationProvider`

## API Reference

### Hooks

```tsx
// Basic lazy translation usage
const { t, locale, loadingState } = useLazyTranslation();

// Declare namespace dependencies
const { isLoaded, status, load, prefetch } = useTranslationNamespaces({
  namespaces: ['products'],
  loadImmediately: true,
  prefetchRelated: true,
});

// Prefetch on link hover
const prefetch = usePrefetchTranslation();
```

### Server Functions

```tsx
// Load single namespace
const messages = await loadNamespaceServer(locale, 'common');

// Load multiple namespaces
const messages = await loadNamespacesServer(locale, ['common', 'products']);

// Merge modules
const merged = mergeNamespaceModules([module1, module2]);
```

### Debug

```tsx
import { estimateMemoryUsage, getCacheStats } from '@/i18n';

// Check memory usage
console.log(estimateMemoryUsage()); // "3 namespaces cached (~45 KB)"

// Get cache stats
console.log(getCacheStats()); // { cached: 3, pending: 0, totalSize: 46032 }
```

## Troubleshooting

### Missing Translations
1. Check namespace file exists: `src/translations/namespaces/en/[namespace].json`
2. Verify key is in `NAMESPACE_KEY_MAP` in `src/i18n/namespaces.ts`
3. Re-run extraction: `npx tsx scripts/extract-namespaces.ts`

### Hydration Mismatch
Ensure server and client load same namespaces:
```tsx
// Server
const messages = await loadNamespacesServer(locale, ['common', 'home']);

// Client
useTranslationNamespaces({ namespaces: ['common', 'home'] });
```

### Build Errors
```bash
# Clean and rebuild
rm -rf .next
npx tsx scripts/extract-namespaces.ts
pnpm build
```

## Performance Monitoring

Add this to your layout for debug builds:

```tsx
useEffect(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('[i18n]', estimateMemoryUsage());
  }
}, []);
```
