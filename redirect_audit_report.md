# Google Search Console Redirect Audit Report

**Date:** February 19, 2026  
**Property:** purrify.ca  
**Issue:** "Page with redirect" - 256 affected pages

---

## Summary

The URLs reported by Google Search Console **ARE correctly redirecting**, but many have **inefficient redirect chains** (multiple hops) and some use **incorrect redirect status codes** (307 instead of 301/308). These are causing Google to flag them as "Page with redirect" and preventing proper indexing.

---

## Root Cause Analysis

### 1. Multiple Competing Redirect Rules

The site has several redirect systems working simultaneously:

| Priority | Redirect Type | Status Code | Source |
|----------|--------------|-------------|--------|
| 1 | Non-www → www | 307 (wrong!) | `config/redirects.js` |
| 2 | HTTP → HTTPS | 301 | Cloudflare/Vercel |
| 3 | Trailing slash | 308 | `next.config.js` (`trailingSlash: true`) |
| 4 | Custom redirects | 308 | `config/redirects.js` |
| 5 | Locale removal (/zh/, /es/) | 308 | `config/redirects.js` |
| 6 | Path restructuring | 308 | `config/redirects.js` |

### 2. Problem: Redirect Chains

Many URLs go through **3-5 redirects** before reaching the final destination:

**Example 1: `/fr/solutions/ammonia-smell-cat-litter`**
```
1. /fr/solutions/ammonia-smell-cat-litter
   → /fr/solutions/ammonia-smell-cat-litter/ (308 - trailing slash)
2. /fr/solutions/ammonia-smell-cat-litter/
   → https://www.purrify.ca/solutions/ammonia-smell-cat-litter/ (307 - non-www fix)
3. /solutions/ammonia-smell-cat-litter/
   → /learn/solutions/ammonia-smell-cat-litter (308 - path restructure)
4. /learn/solutions/ammonia-smell-cat-litter
   → /learn/solutions/ammonia-smell-cat-litter/ (308 - trailing slash)
5. 200 OK
```

**Example 2: `/es/tools/cat-litter-calculator`**
```
1. /es/tools/cat-litter-calculator
   → /es/tools/cat-litter-calculator/ (308 - trailing slash)
2. /es/tools/cat-litter-calculator/
   → /tools/cat-litter-calculator (308 - locale removal)
3. /tools/cat-litter-calculator
   → /tools/cat-litter-calculator/ (308 - trailing slash)
4. 200 OK
```

### 3. Critical Issue: 307 Instead of 301

The non-www → www redirect uses **307 (Temporary)** instead of **301/308 (Permanent)**:

```
# Current (WRONG):
HTTP/2 307
location: https://www.purrify.ca/

# Should be:
HTTP/2 301 or 308
location: https://www.purrify.ca/
```

This tells Google the redirect is temporary, which is incorrect for a canonical domain change.

---

## Affected URL Categories

Based on the GSC list, here are the redirect patterns:

### ✅ Correctly Redirecting (1 hop)

| Pattern | From | To | Status |
|---------|------|-----|--------|
| Blog posts | `/blog/post-name` | `/blog/post-name/` | 308 |
| Terms | `/tos` | `/terms/` | 308 |
| English locale | `/en/blog/*` | `/blog/*` | 308 |

### ⚠️ Multi-Hop Redirects (2+ hops) - NEED FIXING

| Pattern | Example | Hops | Issue |
|---------|---------|------|-------|
| Non-www URLs | `purrify.ca/*` | 2-5 | Uses 307, chains with other rules |
| /zh/ locale | `/zh/*` | 3-4 | Locale removal + trailing slash |
| /es/ locale | `/zh/*` | 3-4 | Locale removal + trailing slash |
| /solutions/ | `/solutions/*` | 2-3 | Path restructure + trailing slash |
| Product renames | `/products/purrify-50g` | 2-3 | Rename + trailing slash |
| Location redirects | `/locations/bathurst` | 2-3 | Province redirect + trailing slash |

### ❌ Potentially Broken

| URL | Expected | Actual | Issue |
|-----|----------|--------|-------|
| `https://blog.purrify.ca/*` | Redirect to www | Unknown | Subdomain not in redirect config |

---

## Recommendations

### 1. **FIX IMMEDIATE:** Change 307 to 301/308

In `config/redirects.js`, lines 6-18:

```javascript
// CURRENT (WRONG):
{
  source: "/:path*",
  has: [{ type: "host", value: "purrify.ca" }],
  destination: "https://www.purrify.ca/:path*",
  permanent: true  // This should create 308, but showing as 307
},

// Check if Cloudflare or Vercel is overriding this
```

**Action:** Verify if Cloudflare Page Rules are causing the 307. The `permanent: true` in Next.js should create a 308 redirect.

### 2. **OPTIMIZE:** Combine Redirects to Reduce Chains

Create combined redirect rules that handle multiple transformations in one hop:

```javascript
// EXAMPLE: Instead of separate rules, combine them:
{
  source: "/:path*",
  has: [{ type: "host", value: "purrify.ca" }],
  destination: "https://www.purrify.ca/:path*/",
  permanent: true
}
```

### 3. **CONSIDER:** Remove `trailingSlash: true`

The `trailingSlash: true` setting in `next.config.js` (line 69) is causing automatic 308 redirects. Consider:

- Option A: Remove it and add trailing slashes in the redirect rules directly
- Option B: Keep it but update all redirect destinations to include trailing slashes

### 4. **PRIORITIZE:** Fix Most-Clicked URLs First

From the GSC list, these are the highest priority to fix (most recent + likely most traffic):

1. `https://purrify.ca/fr/learn/cat-litter-guide`
2. `https://www.purrify.ca/blog/how-to-use-cat-litter-deodorizer`
3. `https://www.purrify.ca/learn/cat-litter-guide`
4. `https://www.purrify.ca/learn/faq`
5. `https://www.purrify.ca/terms`
6. `https://www.purrify.ca/blog/cat-litter-smell-worse-summer`

---

## Testing Results

### Test Commands Used

```bash
# Non-www to www redirect
curl -sI "https://purrify.ca/fr/learn/cat-litter-guide"
# Result: 307 → https://www.purrify.ca/fr/learn/cat-litter-guide

# Full redirect chain
curl -sIL "https://www.purrify.ca/fr/solutions/ammonia-smell-cat-litter" | grep -E "(HTTP|location:)"
# Result: 308 → 307 → 308 → 308 → 200 (5 hops!)

# Locale removal
curl -sIL "https://www.purrify.ca/zh/locations/ferryland/" | grep -E "(HTTP|location:)"
# Result: 308 → 308 → 308 → 308 → 200 (5 hops!)
```

---

## Conclusion

**All 256 URLs ARE redirecting correctly** to their final destinations. However:

1. The **307 status code** for non-www → www is incorrect and should be 301/308
2. **Redirect chains** of 3-5 hops are inefficient and waste crawl budget
3. Google is correctly flagging these as "Page with redirect" - they won't be indexed at their original URLs

**This is expected behavior**, but the efficiency can be improved by consolidating redirects.

---

## Action Items

| Priority | Action | File | Effort |
|----------|--------|------|--------|
| High | Fix 307 to 308 for non-www redirect | `config/redirects.js` | 5 min |
| Medium | Combine redirects to reduce chains | `config/redirects.js` | 2-3 hours |
| Low | Evaluate removing `trailingSlash: true` | `next.config.js` | 1-2 hours |
| Low | Monitor GSC for validation | Google Search Console | Ongoing |
