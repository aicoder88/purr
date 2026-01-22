# B2C Restoration Guide

This document provides step-by-step instructions to restore D2C (Direct-to-Consumer) e-commerce functionality.

**To restore B2C functionality, follow all sections below in order.**

---

## Quick Summary

All B2C elements were **hidden (not removed)** using:
1. Comment blocks marked with `{/* B2C: ... */}`
2. Conditional rendering where appropriate
3. Translation keys with B2B variants

**Search Pattern:** Look for `B2C:` in the codebase to find all hidden elements.

```bash
grep -r "B2C:" src/ pages/
```

---

## 1. Header - Restore Buy Now Button

**File:** `src/components/layout/header.tsx`

### Desktop Button (~Line 435-445)

**Current (B2B):**
```tsx
<Button
  asChild
  className="flex items-center gap-2 bg-gradient-to-r from-brand-red to-brand-red/80 hover:from-brand-red/90 hover:to-brand-red text-white dark:text-gray-100 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
>
  <Link href="/stockists">
    <MapPin className="w-4 h-4" />
    {t.nav?.findStore || "Find a Store"}
  </Link>
</Button>
```

**Restore to (B2C):**
```tsx
<Button
  onClick={scrollToProducts}
  className="flex items-center gap-2 bg-gradient-to-r from-brand-red to-brand-red/80 hover:from-brand-red/90 hover:to-brand-red text-white dark:text-gray-100 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
>
  <ShoppingBag className="w-4 h-4" />
  {t.nav?.buyNow || ""}
</Button>
```

### Mobile Button (~Line 545-555)

Same changes as desktop - replace `MapPin` + `Link` with `ShoppingBag` + `onClick={handleBuyNowMobile}`

### Import Changes

**Remove from imports:**
```tsx
import { MapPin } from "lucide-react";
import Link from "next/link"; // if no longer needed elsewhere
```

**Ensure in imports:**
```tsx
import { ShoppingBag } from "lucide-react";
```

---

## 2. Hero Section - Restore Pricing & CTA

**File:** `src/components/sections/hero/HeroContent.tsx`

### Unhide Pricing Display

Find and uncomment the pricing section marked with `{/* B2C: HIDDEN PRICING */}`:

```tsx
{/* Pricing Above Fold - Trial only */}
<div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm sm:text-base">
  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-full border border-green-300 dark:border-green-700">
    <span className="font-bold text-green-700 dark:text-green-300">
      {t.hero.pricing?.trial || ""}
    </span>
  </div>
</div>
```

### Unhide Urgency Indicators

Find and uncomment:

```tsx
{/* Urgency & Social Proof */}
<div className="flex items-center sm:justify-start justify-center gap-6">
  <div className="flex items-center gap-2 text-sm">
    <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></div>
    <span className="text-gray-600 dark:text-gray-400">{t.hero.simplified?.soldThisWeek || ""}</span>
  </div>
  <div className="flex items-center gap-1 text-sm">
    <svg className="w-4 h-4 text-red-500 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
    <span className="text-gray-600 dark:text-gray-400">{t.hero.simplified?.limitedStock || ""}</span>
  </div>
</div>
```

### Restore CTA Button

**Current (B2B):**
```tsx
<Button
  asChild
  className={ctaButtonClasses}
  aria-label={t.hero.buttons.tryFree || ""}
>
  <Link href="/stockists">
    <LightningIcon className="transition-transform duration-300 group-hover:scale-110" />
    {t.nav?.findNearYou || "Find It Near You"}
    <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
  </Link>
</Button>
```

**Restore to (B2C):**
```tsx
<Button
  onClick={handleScrollToProducts}
  className={ctaButtonClasses}
  aria-label={t.hero.buttons.tryFree || ""}
>
  <LightningIcon className="transition-transform duration-300 group-hover:scale-110" />
  {t.hero.buttons.tryFree || ""}
  <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
</Button>
```

---

## 3. Product Comparison - Restore Pricing & Buy Buttons

**File:** `src/components/sections/enhanced-product-comparison.tsx`

### Unhide Pricing Displays

Search for `{/* B2C: HIDDEN PRICING */}` and uncomment all pricing sections.

### Restore Purchase Buttons

**Current (B2B):**
```tsx
<Button asChild className={...}>
  <Link href="/stockists">
    Find a Retailer <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
  </Link>
</Button>
```

**Restore to (B2C):**
```tsx
<Button asChild className={...}>
  <a href={getPaymentLink(preferredOption.linkKey!) || '#'} target="_blank" rel="noopener noreferrer">
    {preferredOption.ctaLabel} <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
  </a>
</Button>
```

---

## 4. CTA Section - Restore Product Link

**File:** `src/components/sections/cta.tsx`

**Current (B2B):**
```tsx
<Link href="/stockists">
  {t.cta?.b2bButtonText || "Find a Store Near You"}
</Link>
```

**Restore to (B2C):**
```tsx
<Link href="/products">
  {t.cta?.buttonText || ""}
</Link>
```

Also restore the guarantee text from `t.cta?.b2bGuarantee` back to `t.cta?.guarantee`.

---

## 5. Footer - Restore Product Links

**File:** `src/components/layout/footer.tsx`

### Unhide Product Purchase Links

Search for `{/* B2C: HIDDEN PRODUCT LINKS */}` and uncomment:

```tsx
<li>
  <Link href={locale === "fr" ? "/fr/products/trial-size" : "/products/trial-size"}>
    {t.footerNav?.trialSize || ""}
  </Link>
</li>
<li>
  <Link href={locale === "fr" ? "/fr/products/standard" : "/products/standard"}>
    {t.footerNav?.standardSize || ""}
  </Link>
</li>
<li>
  <Link href={locale === "fr" ? "/fr/products/family-pack" : "/products/family-pack"}>
    {t.footerNav?.familyPack || ""}
  </Link>
</li>
```

---

## 6. Product Pages - Restore Buy Buttons

**Files:**
- `pages/products/index.tsx`
- `pages/products/standard.tsx`
- `pages/products/family-pack.tsx`
- `pages/products/trial-size.tsx`

### For Each File:

1. Search for `{/* B2C: HIDDEN */}`
2. Uncomment pricing displays
3. Uncomment "Add to Cart" / "Buy Now" buttons
4. Uncomment `StickyAddToCart` component
5. Remove or hide the "Ask for Purrify at Your Local Store" CTA

---

## 7. Translation Keys (Optional Cleanup)

The B2B translation keys can be left in place (they won't cause issues), or removed:

**Keys to optionally remove:**
```typescript
nav: {
  findStore,
  findNearYou,
  whereToBuy,
  askForPurrify,
}

productsSection: {
  findNearYou,
  askYourStore,
  availableAtStores,
}

cta: {
  b2bTitle,
  b2bSubtitle,
  b2bButtonText,
  b2bGuarantee,
}
```

---

## Verification After Restoration

Run all validation checks:

```bash
pnpm lint && pnpm check-types && pnpm validate-dark-mode && pnpm validate-images && pnpm validate-hydration
pnpm build
pnpm dev
```

**Manual Checks:**
- [ ] Pricing visible on homepage
- [ ] Buy buttons functional
- [ ] CTAs scroll to products section
- [ ] Product pages have working purchase options
- [ ] Trial size FREE offer works
- [ ] Dark mode works
- [ ] All 4 languages work

---

## Notes

- All changes were designed to be reversible
- Original code is preserved in comments
- Search for `B2C:` to find all modified sections
- Free sample option on trial-size page was kept active for B2B use
