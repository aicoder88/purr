# Quick Fix Plan: 3 Critical OG/Canonical Issues

**Estimated Time:** 15 minutes  
**Impact:** Achieves 100% OG/Canonical URL compliance

---

## Issue 1: `/terms` - Missing Canonical URL

**File:** `app/terms/page.tsx`

**Current State:**
- ✅ Has Open Graph URL
- ❌ Missing canonical URL

**Fix:**
Add `canonical` property to NextSeo or metadata:

```tsx
// If using NextSeo:
<NextSeo
  canonical={`${SITE_URL}/terms`}
  openGraph={{
    url: `${SITE_URL}/terms`,
    // ... other OG properties
  }}
/>

// OR if using Next.js metadata:
export const metadata = {
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    url: `${SITE_URL}/terms`,
  },
}
```

---

## Issue 2: `/thank-you` - Missing OG URL

**File:** `app/thank-you/page.tsx`

**Current State:**
- ✅ Has canonical URL
- ❌ Missing Open Graph URL

**Fix:**
Add `url` property to `openGraph` object:

```tsx
// If using NextSeo:
<NextSeo
  canonical={`${SITE_URL}/thank-you`}
  openGraph={{
    url: `${SITE_URL}/thank-you`,  // ADD THIS LINE
    // ... other OG properties
  }}
/>

// OR if using Next.js metadata:
export const metadata = {
  alternates: {
    canonical: '/thank-you',
  },
  openGraph: {
    url: `${SITE_URL}/thank-you`,  // ADD THIS LINE
  },
}
```

---

## Issue 3: `/thank-you/upsell` - Missing OG URL

**File:** `app/thank-you/upsell/page.tsx`

**Current State:**
- ✅ Has canonical URL
- ❌ Missing Open Graph URL

**Fix:**
Add `url` property to `openGraph` object:

```tsx
// If using NextSeo:
<NextSeo
  canonical={`${SITE_URL}/thank-you/upsell`}
  openGraph={{
    url: `${SITE_URL}/thank-you/upsell`,  // ADD THIS LINE
    // ... other OG properties
  }}
/>

// OR if using Next.js metadata:
export const metadata = {
  alternates: {
    canonical: '/thank-you/upsell',
  },
  openGraph: {
    url: `${SITE_URL}/thank-you/upsell`,  // ADD THIS LINE
  },
}
```

---

## Verification Steps

After making the fixes:

1. **Run validation:**
   ```bash
   pnpm seo:validate
   ```

2. **Check for zero OG/Canonical errors:**
   ```
   OG/Canonical Mismatches: 0  ✅
   ```

3. **Generate updated report:**
   ```bash
   pnpm seo:validate --report
   ```

4. **Verify in browser:**
   - Start dev server: `pnpm dev`
   - Check each page's `<head>` for both canonical and OG URL tags
   - Use browser DevTools or "View Page Source"

---

## Expected Result

After fixes:
- **OG/Canonical Errors:** 0 (down from 3)
- **Success Rate:** 100% (up from 96.8%)
- **Pages with Errors:** 0 (down from 3)

---

## Notes

- All three pages are **client-rendered** (hence why they weren't caught by the initial automated fixes)
- The validator now properly detects these issues
- These are the **last remaining SEO errors** blocking 100% compliance
- Once fixed, only warnings remain (weak internal links, image optimization)

---

**Ready to implement?** Let me know if you'd like me to:
1. Check the actual files to see their current structure
2. Make the fixes automatically
3. Run the validation to confirm success
