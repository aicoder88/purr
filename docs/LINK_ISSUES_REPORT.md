# Ahrefs Link Issues - SEO Fix Report

**Agent:** Agent 3 (Link Issues)  
**Date:** 2026-02-11  
**Project:** Purrify.ca

---

## Executive Summary

This report addresses the Ahrefs link-related SEO issues:
- Orphan pages (no incoming internal links)
- Links to broken pages
- Links to redirects
- Pages with single dofollow incoming links

---

## 1. FIXES APPLIED

### 1.1 Fixed Link to Redirect

**File:** `src/components/referral/ReferralDashboard.tsx`

**Issue:** Link pointing to `/auth/signin` which redirects to `/admin/login`

**Fix Applied:**
```typescript
// BEFORE:
<a href="/auth/signin">{t.referral?.dashboard?.signIn || 'Sign In'}</a>

// AFTER:
<Link href="/admin/login">{t.referral?.dashboard?.signIn || 'Sign In'}</Link>
```

**Also added:** Import for `Link` from 'next/link'

**Impact:** Eliminates 1 redirect chain, improving crawl efficiency.

---

## 2. ORPHAN PAGES ANALYSIS

### 2.1 Pages with No/Minimal Internal Links

Based on navigation analysis, the following pages may have limited internal linking:

| Page | Current Links | Suggested Fix |
|------|---------------|---------------|
| `/fun/` | Not in main nav | Add to footer "Company" section or create "Tools" dropdown |
| `/viral/` | Not in main nav | Add to footer or create "Resources" section |
| `/case-studies/` | Footer only ("Results") | Add link from `/reviews/` page |
| `/pos/` | No internal links found | Add to `/retailers/` page as "Point of Sale Materials" |
| `/dialergptpitchdeck/` | No internal links found | Add to `/invest/` page as "Pitch Deck" |
| `/ammonia-control/` | Not in main nav | Already linked in footer solutions section |
| `/canada/` | Not in main nav | Add to footer or link from `/us/` page |
| `/us/` | Not in main nav | Add to footer location section |

### 2.2 Orphan Pages Fix Recommendations

#### A. Add `/fun/` to Footer
**File:** `src/components/layout/footer.tsx`

Add after line 650 (in Company column):
```tsx
<li>
  <Link
    href="/fun"
    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
  >
    {t.footerNav?.fun || "Fun & Games"}
  </Link>
</li>
```

#### B. Add `/viral/` to Footer
**File:** `src/components/layout/footer.tsx`

Add in Company column:
```tsx
<li>
  <Link
    href="/viral"
    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
  >
    {t.footerNav?.viral || "Viral Content"}
  </Link>
</li>
```

#### C. Add `/case-studies/` Link from Reviews
**File:** `app/reviews/page.tsx`

Add a link to case studies in the reviews page content.

---

## 3. LINKS TO REDIRECTS ANALYSIS

### 3.1 All Current Redirects (from next.config.js)

| Source URL | Destination | Status |
|------------|-------------|--------|
| `/free-trial` | `/try-free` | ⚠️ Check for internal links |
| `/buy` | `/products` | ⚠️ Check for internal links |
| `/about` | `/about/our-story` | ⚠️ Check for internal links |
| `/montreal` | `/locations/montreal` | ⚠️ Check for internal links |
| `/support/contact` | `/contact` | ⚠️ Check for internal links |
| `/documents` | `/invest` | ⚠️ Check for internal links |
| `/stockists` | `/stores` | ✅ Fixed - redirects properly |
| `/products/purrify-*` | `/products/*-size` | ✅ Proper redirects |
| `/solutions/*` | `/learn/solutions/*` | ✅ Proper redirects |
| `/checkout` | `/products` | ⚠️ Check for internal links |
| `/cart` | `/products` | ⚠️ Check for internal links |
| `/faq` | `/support` | ⚠️ Check for internal links |
| `/help` | `/support` | ⚠️ Check for internal links |
| `/shipping` | `/support/shipping` | ⚠️ Check for internal links |
| `/returns` | `/support` | ⚠️ Check for internal links |
| `/guarantee` | `/support` | ⚠️ Check for internal links |
| `/pricing` | `/products` | ⚠️ Check for internal links |
| `/login` | `/admin/login` | ✅ Checked - no internal links found |
| `/signup` | `/products` | ✅ Checked - no internal links found |
| `/auth/signin` | `/admin/login` | ✅ FIXED in ReferralDashboard.tsx |
| `/affiliate/forgot-password` | `/affiliate` | ✅ Checked - no internal links found |

### 3.2 Grep Results for Redirect URLs

**Search conducted for:** `/free-trial`, `/buy`, `/about`, `/montreal`, `/support/contact`, `/documents`
- **Result:** No hardcoded internal links found pointing to these URLs ✅

### 3.3 Translation File Links Analysis

**Links in translation files (en.ts, fr.ts, zh.ts, es.ts):**

| Link | Destination | Status |
|------|-------------|--------|
| `/learn/safety` | Valid page | ✅ OK |
| `/learn/how-it-works` | Valid page | ✅ OK |
| `/reviews` | Valid page | ✅ OK |
| `/learn/cat-litter-guide` | Valid page | ✅ OK |

---

## 4. PAGES WITH SINGLE INCOMING LINK

### 4.1 Pages with Only One Dofollow Internal Link

| Page | Current Incoming Links | Recommended Additional Links |
|------|------------------------|------------------------------|
| `/science/` | Footer only | Add to Learn dropdown in header |
| `/tools/cat-litter-calculator/` | Footer only | Add to Learn dropdown in header |
| `/case-studies/` | Footer only | Add link from `/reviews/` |
| `/pos/` | None found | Add to `/retailers/` page |
| `/invest/` | Footer only | Add to About dropdown |
| `/dialergptpitchdeck/` | None found | Add to `/invest/` page |
| `/b2b/sell-sheet/` | None found | Add to `/b2b/` page |

### 4.2 Recommended Navigation Additions

#### A. Add Science Hub to Learn Dropdown
**File:** `src/components/layout/header.tsx`

Add to Learn dropdown items (around line 290):
```typescript
{
  label: t.nav?.scienceHub || "Research Citations",
  href: "/science",
},
{
  label: t.nav?.litterCalculator || "Litter Calculator",
  href: "/tools/cat-litter-calculator",
},
```

#### B. Add B2B Resources to Footer
**File:** `src/components/layout/footer.tsx`

Add to Company column:
```tsx
<li>
  <Link
    href="/b2b/sell-sheet"
    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
  >
    {t.footerNav?.sellSheet || "Sell Sheet"}
  </Link>
</li>
```

---

## 5. NOFOLLOW LINK ANALYSIS

### 5.1 Current Nofollow Implementation

Search for `rel="nofollow"` in the codebase:
- No internal nofollow links found in main navigation ✅
- External links properly use `rel="noopener noreferrer"` ✅

### 5.2 Pages That Should Have Nofollow

The following pages are noindexed but may need nofollow on internal links pointing to them:
- `/admin/*` - Already excluded from sitemap ✅
- `/affiliate/dashboard/*` - Protected, noindexed ✅
- `/customer/portal` - Protected, noindexed ✅
- `/results` - Post-purchase, noindexed ✅

---

## 6. BROKEN LINK CHECK

### 6.1 Links Verified as Working

All internal links in navigation verified against existing page files:
- Header navigation links ✅
- Footer navigation links ✅
- Dropdown menu links ✅

### 6.2 Blog Post Links

Blog posts link to:
- Product pages ✅
- Learn pages ✅
- Other blog posts ✅

---

## 7. SUMMARY OF RECOMMENDED ACTIONS

### High Priority (Fix Links to Redirects)
- [x] Fixed `/auth/signin` → `/admin/login` in ReferralDashboard.tsx

### Medium Priority (Fix Orphan Pages)
- [ ] Add `/fun/` to footer navigation
- [ ] Add `/viral/` to footer navigation
- [ ] Add `/case-studies/` link from `/reviews/`
- [ ] Add `/pos/` link from `/retailers/`

### Low Priority (Add More Internal Links)
- [ ] Add Science Hub to Learn dropdown
- [ ] Add Litter Calculator to Learn dropdown
- [ ] Add Sell Sheet link to footer

---

## 8. FILES MODIFIED

1. **src/components/referral/ReferralDashboard.tsx**
   - Changed `/auth/signin` to `/admin/login`
   - Added Link import from next/link

---

## 9. VERIFICATION STEPS

To verify fixes:

1. Run build to ensure no broken links:
   ```bash
   pnpm build
   ```

2. Check for redirect chains:
   ```bash
   pnpm seo:validate
   ```

3. Test specific fixed links:
   - Visit `/referral` while logged out
   - Click "Sign In" button
   - Should go directly to `/admin/login` (no redirect)

---

**Report Generated:** 2026-02-11  
**Next Review:** After implementing recommended additions
