# Redirect Issues - Analysis & Fix Guide

## Summary

**YES, all 256 URLs ARE redirecting.** However, there are **inefficient redirect chains** and **incorrect status codes** that need fixing for optimal SEO.

---

## Issues Found

### 1. ⚠️ CRITICAL: 307 Instead of 308 for Non-WWW Redirect

**Problem:** The non-www → www redirect returns 307 (Temporary) instead of 308 (Permanent).

```
https://purrify.ca/ → 307 → https://www.purrify.ca/
```

**Expected:**
```
https://purrify.ca/ → 308 → https://www.purrify.ca/
```

**Impact:** Google may not transfer link equity properly because it thinks the redirect is temporary.

**Root Cause:** Unknown - the config has `permanent: true` but Vercel/Cloudflare is returning 307. Possible causes:
- Cloudflare Page Rule overriding the redirect
- Vercel dashboard redirect settings
- Interaction between `has` conditions and `permanent: true`

---

### 2. ⚠️ HIGH: Redirect Chains (3-5 Hops)

Many URLs go through multiple redirects before reaching the final destination:

**Example: `/fr/solutions/ammonia-smell-cat-litter`**
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

**This is 4 redirects for one URL!**

**Impact:** Wastes Google crawl budget, slows page load, dilutes SEO value.

---

### 3. ⚠️ MEDIUM: Locale Removal Causes Multiple Hops

**Example: `/zh/locations/ferryland/`**
```
1. /zh/locations/ferryland/
   → /locations/ferryland (308 - locale removal)
2. /locations/ferryland
   → /locations/ferryland/ (308 - trailing slash)
3. /locations/ferryland/
   → /stores (308 - invalid location redirect)
4. /stores
   → /stores/ (308 - trailing slash)
5. 200 OK
```

---

## Affected URL Categories from GSC List

| Category | Example URL | Redirects | Issue |
|----------|-------------|-----------|-------|
| **Non-www URLs** | `https://purrify.ca/*` | 2-4 hops | Uses 307 instead of 308 |
| **/zh/ locale** | `/zh/locations/*` | 4-5 hops | Locale + location + trailing slash |
| **/es/ locale** | `/es/tools/*` | 3-4 hops | Locale removal chains |
| **/solutions/** | `/solutions/*` | 2-3 hops | Path restructure + trailing slash |
| **Product renames** | `/products/purrify-50g` | 2-3 hops | Rename + trailing slash |
| **/en/blog/** | `/en/blog/*` | 2 hops | Locale removal + trailing slash |

---

## Immediate Actions Required

### Action 1: Fix the 307 Status Code (Priority: HIGH)

**Check Cloudflare:**
1. Log into Cloudflare dashboard for purrify.ca
2. Go to **Rules** → **Page Rules**
3. Check if there's a rule for "purrify.ca/*" forwarding to "www.purrify.ca"
4. If exists, delete it (let Next.js handle it)

**Check Vercel Dashboard:**
1. Log into Vercel dashboard
2. Go to purrify.ca project → **Settings** → **Redirects**
3. Check if there are any redirects configured there
4. If exists, delete them (use next.config.js instead)

**Verify Fix:**
```bash
curl -sI "https://purrify.ca/" | grep HTTP
# Should show: HTTP/2 308
```

---

### Action 2: Fix Redirect Chains (Priority: MEDIUM)

**Option A: Update Redirect Destinations to Include Trailing Slashes**

Edit `config/redirects.js` - change all redirect destinations to end with `/`:

```javascript
// BEFORE (causes extra redirect):
{
  source: "/zh/:path*",
  destination: "/:path*",  // No trailing slash
  permanent: true
}

// AFTER (single redirect):
{
  source: "/zh/:path*",
  destination: "/:path*/",  // With trailing slash
  permanent: true
}
```

**Option B: Remove `trailingSlash: true` and Handle in Redirects**

Edit `next.config.js`:
```javascript
// Remove or set to false
trailingSlash: false,
```

Then update all redirects in `config/redirects.js` to not include trailing slashes.

---

### Action 3: Combine Related Redirects (Priority: LOW)

Create combined rules that handle multiple transformations:

```javascript
// Example: Combine locale removal + path restructure
{
  source: "/zh/solutions/:path*",
  destination: "/learn/solutions/:path*/",
  permanent: true
},
{
  source: "/es/solutions/:path*",
  destination: "/learn/solutions/:path*/",
  permanent: true
}
```

---

## Testing Commands

```bash
# Test non-www redirect
curl -sI "https://purrify.ca/learn/faq" | grep -E "(HTTP|location)"

# Test full redirect chain
curl -sIL "https://purrify.ca/fr/solutions/ammonia-smell-cat-litter" | grep -E "(HTTP|location)"

# Test zh locale removal
curl -sIL "https://www.purrify.ca/zh/locations/ferryland/" | grep -E "(HTTP|location)"

# Test es locale removal  
curl -sIL "https://www.purrify.ca/es/tools/cat-litter-calculator" | grep -E "(HTTP|location)"

# Test trailing slash
curl -sIL "https://www.purrify.ca/blog/cat-litter-smell-worse-summer" | grep -E "(HTTP|location)"
```

---

## Results You Should See After Fixes

### Before (Current):
```
http://purrify.ca/learn/faq
  → 301 → https://purrify.ca/learn/faq      (Cloudflare HTTPS)
  → 307 → https://www.purrify.ca/learn/faq  (Vercel non-www)
  → 308 → https://www.purrify.ca/learn/faq/ (Next.js trailing slash)
  → 200
```
**Total: 3 redirects**

### After (Ideal):
```
http://purrify.ca/learn/faq
  → 301 → https://www.purrify.ca/learn/faq/ (Combined: HTTPS + www + trailing slash)
  → 200
```
**Total: 1 redirect**

---

## URLs That Should Be Fixed First (Highest Traffic)

Based on recent crawl dates in GSC:

1. `https://purrify.ca/fr/learn/cat-litter-guide`
2. `https://www.purrify.ca/blog/how-to-use-cat-litter-deodorizer`
3. `https://www.purrify.ca/learn/cat-litter-guide`
4. `https://www.purrify.ca/learn/faq`
5. `https://www.purrify.ca/terms`
6. `https://www.purrify.ca/blog/cat-litter-smell-worse-summer`
7. `https://www.purrify.ca/fr/blog/activated-carbon-litter-additive-benefits`

---

## Conclusion

All 256 URLs ARE correctly redirecting to valid destinations. The issue is **efficiency**, not broken redirects. Google is correctly flagging them as "Page with redirect" because they are redirects - they won't be indexed at their original URLs (which is expected behavior).

**To fix:**
1. Change 307 to 308 for non-www redirects
2. Reduce redirect chains from 4-5 hops to 1-2 hops
3. Validate in Google Search Console after fixes
