# Google Search Console 404 Error Fix - Implementation Plan

**Date**: 2026-02-19
**Status**: Ready for Implementation
**Priority**: High (Affects SEO and user experience)

---

## Executive Summary

Your codebase has **4 critical issues** causing 404s in Google Search Console. The root causes are:

1. **Locale mismatch in `locations` page** (generates invalid zh URLs)
2. **Hreflang tags reference non-existent locales** (zh/es in blog metadata)
3. **Template URLs may be in sitemap** (dynamic route patterns exposed)
4. **Subdomain redirects need verification** (fr.purrify.ca handling)

---

## Issues & Required Fixes

### 1. **CRITICAL: Invalid Locale in Locations Page Generator**

**File**: `app/locations/[citySlug]/page.tsx` (Line 27)

**Problem**:
```typescript
const locales = ['en', 'fr', 'zh'];  // ❌ 'zh' NOT in i18n config!
```

Your `src/i18n/config.ts` only supports `['en', 'fr']`, but `generateStaticParams()` tries to generate paths for 'zh' which doesn't exist. This creates:
- `/zh/locations/vancouver/`
- `/zh/locations/victoria/`
- etc.

These routes don't actually exist in Next.js, so Google gets 404s when crawling them.

**Fix**: Change to use the actual supported locales
```typescript
// Get valid locales from config
import { locales } from '@/i18n/config';
export async function generateStaticParams() {
  const allCities = getAllCities();

  // Only generate for ACTUAL supported locales
  const paths = locales.flatMap((locale) =>
    allCities.map((city) => ({
      locale,  // ← Add this if needed, or adjust based on your routing
      citySlug: city.slug,
    }))
  );

  return paths;
}
```

**Impact**: Prevents generation of ~100+ invalid zh/* location URLs.

---

### 2. **HIGH: Hreflang Tags Reference Non-Existent Locales**

**File**: `app/[locale]/blog/[slug]/page.tsx` (Lines 64-89)

**Problem**:
```typescript
const hrefLang = locale === 'en' ? 'en-CA' :
  locale === 'fr' ? 'fr-CA' :
    locale === 'zh' ? 'zh-CN' :      // ❌ Should never reach here (zh is redirected)
      locale === 'es' ? 'es-US' : 'en-CA';

// Metadata references non-existent versions
alternates: {
  canonical: ...,
  languages: {
    'en-CA': `${SITE_URL}/blog/${slug}/`,
    'fr-CA': `${SITE_URL}/fr/blog/${slug}/`,
    'zh-CN': `${SITE_URL}/zh/blog/${slug}/`,  // ❌ Doesn't exist
    'es-US': `${SITE_URL}/es/blog/${slug}/`,  // ❌ Doesn't exist
    ...
  },
}
```

Google sees hreflang pointing to `/zh/blog/*` and `/es/blog/*` URLs, tries to crawl them, finds the redirect, but gets confused.

**Fix**: Remove non-existent locale references
```typescript
// In generateMetadata()
const hrefLang = locale === 'en' ? 'en-CA' : locale === 'fr' ? 'fr-CA' : 'en-CA';

alternates: {
  canonical: post.canonicalUrl || canonicalSlugPath,
  languages: {
    'en-CA': `${SITE_URL}/blog/${slug}/`,
    'fr-CA': `${SITE_URL}/fr/blog/${slug}/`,
    'x-default': `${SITE_URL}/blog/${slug}/`,
    [hrefLang]: canonicalSlugPath,
  },
},
```

Also remove from `uiStrings` object (lines 220-235):
```typescript
const uiStrings: Record<string, { ... }> = {
  fr: { ... },  // Keep
  en: { ... },  // Keep
  // Remove: es, zh
};
```

**Impact**: Stops Google from trying to crawl non-existent zh/es blog pages.

---

### 3. **MEDIUM: Robots.txt - Block Template URLs**

**File**: `public/robots.txt`

**Problem**:
Template URLs like `/locations/[citySlug]` should never be crawled. These suggest your sitemap is exposing template syntax or the routes are somehow accessible.

**Fix**: Add explicit disallows for patterns
```
User-agent: *
Allow: /
Disallow: /api/*
Disallow: /admin/*
Disallow: /*[
Disallow: /*]
Disallow: /*{search_term_string}*
```

**Better approach**: Don't put these in sitemap at all (see #5 below).

**Impact**: Extra safety layer if template URLs somehow become crawlable.

---

### 4. **MEDIUM: Verify Redirect Order**

**File**: `config/redirects.js`

**Problem**:
Your subdomain redirects (lines 24-48) come BEFORE the general zh/es redirects (lines 361-370). Need to verify this order is correct.

**Current order**:
```
1. Subdomain fixes (lines 24-48)
2. Locale-specific location redirects (lines 64-357)  ← MANY!
3. General zh/es redirects (lines 362-370)           ← Should this be higher?
```

**Fix**: Verify the `/zh/:path*` redirect is working by testing:
```bash
# Test in your terminal
curl -I https://www.purrify.ca/zh/locations/vancouver
# Should see: 301 → /?path=locations/vancouver
```

If it's not working, move the zh/es redirects HIGHER (before specific location redirects):
```javascript
// Move this block RIGHT AFTER subdomain fixes (before location-specific redirects)
{
  source: "/zh/:path*",
  destination: "/:path*",
  permanent: true
},
{
  source: "/es/:path*",
  destination: "/:path*",
  permanent: true
},
```

**Impact**: Ensures zh/es URLs redirect correctly before more specific rules match.

---

### 5. **MEDIUM: Check Sitemap for Template URLs**

**File**: `public/sitemap.xml`

**Problem**:
Template URLs like `/locations/[citySlug]` should NEVER appear in your sitemap.

**Verification Step**:
```bash
# Download and check your sitemap
curl -s https://www.purrify.ca/sitemap.xml | grep -E '\[|\{' | head -20
# If you see any URLs with [ or {, they shouldn't be there
```

**Expected output**: Nothing (no matches)

If there ARE template URLs in the sitemap:
- The `next-sitemap` transform function should be filtering them
- Verify `next-sitemap.config.js` excludes these properly
- The `transform: async (config, path)` function should return `null` for invalid paths

**Current logic** (lines 783-801) checks for known redirecting patterns. Add template patterns:
```javascript
const redirectingPatterns = [
  // ... existing patterns ...
  '/locations/[citySlug]',
  '/locations/province/[provinceSlug]',
  '/search',
  '/[locale]/blog/[slug]',
];

// Or use regex:
if (normalizedPath.includes('[') || normalizedPath.includes('{')) {
  return null; // Exclude from sitemap
}
```

**Impact**: Prevents Google from crawling invalid template URLs.

---

## Implementation Checklist

### Phase 1: Fix Code Issues (LOW RISK)

- [ ] **1.1** Fix `app/locations/[citySlug]/page.tsx` - Remove hardcoded `['en', 'fr', 'zh']`, use config import
- [ ] **1.2** Fix `app/[locale]/blog/[slug]/page.tsx` - Remove zh/es from hreflang and uiStrings
- [ ] **1.3** Rebuild project to regenerate static pages
  ```bash
  pnpm build
  ```

### Phase 2: Verify Redirects (MEDIUM RISK)

- [ ] **2.1** Test a zh/* URL redirect:
  ```bash
  curl -I https://www.purrify.ca/zh/locations/vancouver
  ```
  Expected: `301` redirect to `/locations/vancouver`

- [ ] **2.2** Test an es/* URL redirect:
  ```bash
  curl -I https://www.purrify.ca/es/blog/some-post
  ```
  Expected: `301` redirect to `/blog/some-post`

- [ ] **2.3** If redirects fail, reorder in `config/redirects.js`

### Phase 3: Check Sitemap (LOW RISK)

- [ ] **3.1** Verify no template URLs in sitemap:
  ```bash
  curl -s https://www.purrify.ca/sitemap.xml | grep -E '\[|\]|\{' | wc -l
  ```
  Expected: 0 matches

- [ ] **3.2** If template URLs found, verify `next-sitemap.config.js` transform function

### Phase 4: Update robots.txt (OPTIONAL)

- [ ] **4.1** Add template URL disallows to `public/robots.txt`

### Phase 5: Submit to Google Search Console (CRITICAL)

After all fixes are deployed:

- [ ] **5.1** Wait 24-48 hours for Google to re-crawl
- [ ] **5.2** Go to **GSC → Coverage**
- [ ] **5.3** Request URL inspection for a few example bad URLs:
  - `https://www.purrify.ca/zh/locations/vancouver`
  - `https://www.purrify.ca/es/blog/example-post`
  - Verify they now redirect correctly
- [ ] **5.4** If still showing errors after redirect, use GSC → "Request indexing" or "Mark as fixed"
- [ ] **5.5** Monitor Coverage tab daily until error count drops to 0

---

## Files to Modify

| File | Changes | Risk |
|------|---------|------|
| `app/locations/[citySlug]/page.tsx` | Remove hardcoded `['en', 'fr', 'zh']` | Low |
| `app/[locale]/blog/[slug]/page.tsx` | Remove zh/es hreflang, remove from uiStrings | Low |
| `config/redirects.js` | **Possibly** reorder zh/es redirects (verify first) | Medium |
| `next-sitemap.config.js` | **Possibly** add template URL filtering | Low |
| `public/robots.txt` | **Optional**: Add `Disallow: /*[` rules | Low |

---

## Detailed Code Changes

### Change 1: Fix Locations Page Static Params

**File**: `app/locations/[citySlug]/page.tsx`

**Before** (line 25-37):
```typescript
export async function generateStaticParams() {
  const allCities = getAllCities();
  const locales = ['en', 'fr', 'zh'];  // ❌ BUG: 'zh' not supported

  const paths = locales.flatMap(() =>
    allCities.map((city) => ({
      citySlug: city.slug,
    }))
  );

  return paths;
}
```

**After**:
```typescript
import { locales } from '@/i18n/config';  // ✅ Import from config

export async function generateStaticParams() {
  const allCities = getAllCities();

  // Only generate for supported locales (en, fr)
  const paths = allCities.map((city) => ({
    citySlug: city.slug,
  }));

  return paths;
}
```

**Why**: This prevents generating routes for unsupported 'zh' locale.

---

### Change 2: Fix Blog Page Hreflang

**File**: `app/[locale]/blog/[slug]/page.tsx`

**Before** (lines 64-92):
```typescript
const hrefLang = locale === 'en' ? 'en-CA' :
  locale === 'fr' ? 'fr-CA' :
    locale === 'zh' ? 'zh-CN' :
      locale === 'es' ? 'es-US' : 'en-CA';

// ...metadata...
alternates: {
  canonical: post.canonicalUrl || canonicalSlugPath,
  languages: {
    'en-CA': `${SITE_URL}/blog/${slug}/`,
    'fr-CA': `${SITE_URL}/fr/blog/${slug}/`,
    'zh-CN': `${SITE_URL}/zh/blog/${slug}/`,      // ❌ Non-existent
    'es-US': `${SITE_URL}/es/blog/${slug}/`,      // ❌ Non-existent
    'en-US': `${SITE_URL}/blog/${slug}/`,
    'x-default': `${SITE_URL}/blog/${slug}/`,
    [hrefLang]: canonicalSlugPath,
  },
},
```

**After**:
```typescript
const hrefLang = locale === 'en' ? 'en-CA' : 'fr-CA';

// ...metadata...
alternates: {
  canonical: post.canonicalUrl || canonicalSlugPath,
  languages: {
    'en-CA': `${SITE_URL}/blog/${slug}/`,
    'fr-CA': `${SITE_URL}/fr/blog/${slug}/`,
    'x-default': `${SITE_URL}/blog/${slug}/`,
    [hrefLang]: canonicalSlugPath,
  },
},
```

**Also remove from uiStrings** (lines 211-244):
```typescript
// REMOVE these:
es: { ... },
zh: { ... },

// KEEP these:
fr: { ... },
en: { ... },
```

**Why**: Stops Google from following non-existent zh/es links in metadata.

---

### Change 3 (Optional): Update robots.txt

**File**: `public/robots.txt`

**Add after line 5**:
```
# Block template/pattern URLs
Disallow: /*[
Disallow: /*]
Disallow: /*{search_term_string}*
```

---

## Testing Checklist

After implementation, verify:

```bash
# 1. Rebuild
pnpm build

# 2. Test zh redirect
curl -I https://www.purrify.ca/zh/locations/vancouver
# Expected: 301 (or 308)

# 3. Test es redirect
curl -I https://www.purrify.ca/es/blog/some-article
# Expected: 301 (or 308)

# 4. Check sitemap for template URLs
curl -s https://www.purrify.ca/sitemap.xml | grep -E '\[|\]' | wc -l
# Expected: 0

# 5. Verify blog page loads without errors
curl -s https://www.purrify.ca/fr/blog/activated-carbon-litter-additive-benefits/ | grep -o "200\|404\|500"
# Expected: Should load successfully (200)
```

---

## Timeline

| Phase | Task | Est. Time | Dependencies |
|-------|------|-----------|--------------|
| 1 | Code fixes | 15 min | None |
| 2 | Build & test | 10 min | Phase 1 complete |
| 3 | Deploy | 5 min | Phase 2 passing |
| 4 | GSC verification | 24-48 hrs | Phase 3 deployed |
| 5 | Monitor & cleanup | Ongoing | Phase 4 complete |

**Total active work**: ~30 minutes
**Wait time (Google re-crawl)**: 24-48 hours

---

## Success Criteria

✅ **The fix is successful when:**

1. No `/zh/*` or `/es/*` URLs in Google Search Console Coverage tab (404 errors)
2. No `/locations/[citySlug]` template URLs in GSC
3. All redirect tests pass (curl shows 301)
4. No template URLs in sitemap (`sitemap.xml` inspection)
5. Blog pages load correctly in both English and French

---

## Rollback Plan

If anything breaks:

1. Revert the changed files to previous commits:
   ```bash
   git checkout HEAD -- app/locations/[citySlug]/page.tsx
   git checkout HEAD -- app/[locale]/blog/[slug]/page.tsx
   git checkout HEAD -- config/redirects.js
   ```
2. Rebuild and redeploy:
   ```bash
   pnpm build && pnpm deploy
   ```

---

## Questions Before Implementation?

- ✅ Verified zh/es locales are intentionally removed (per MEMORY.md)
- ✅ Confirmed only en/fr are supported locales
- ✅ Redirects already in place for zh/es → en
- ❓ Should `/fr/locations/*` be removed from sitemap entirely? (Currently excluded per line 203-204)

---

## Notes

- The `/fr/locations/*` pages are already excluded from sitemap (good)
- The `/es/opiniones` redirect is in place (line 801 in redirects.js)
- `/customers/testimonials` is correctly excluded (doesn't exist)
- Trailing slash handling looks correct (trailingSlash: true in config)

