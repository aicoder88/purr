# API Routes Audit Report

## Summary

Found **12 unused API routes** out of 40+ total routes.

---

## Unused API Routes (12 total)

### High Confidence - Can Be Removed

These routes have no frontend references and appear to be unused:

1. ❌ `/api/trial-conversion.ts` - No frontend calls
2. ❌ `/api/trial-users.ts` - No frontend calls
3. ❌ `/api/order-management.ts` - No frontend calls
4. ❌ `/api/security/risk-assessment.ts` - No frontend calls
5. ❌ `/api/analytics/conversion-metrics.ts` - No frontend calls
6. ❌ `/api/analytics/optimization.ts` - No frontend calls
7. ❌ `/api/retailer/create-checkout.ts` - No frontend calls
8. ❌ `/api/retailer/orders.ts` - No frontend calls
9. ❌ `/api/retailer/profile.ts` - No frontend calls
10. ❌ `/api/referrals/notifications.ts` - No frontend calls
11. ❌ `/api/retailer-inquiry.ts` - No frontend calls
12. ❌ `/api/payment-validation.ts` - No frontend calls

### Medium Confidence - Verify Before Removing

These routes have no obvious frontend calls but may be used:

15. ⚠️ `/api/newsletter.ts` - No frontend calls found (check if newsletter signup exists)
16. ⚠️ `/api/create-checkout-session.ts` - No frontend calls found (but critical for payments!)

---

## Used API Routes (26+ total)

### Core Routes (Always Used)
- ✅ `/api/contact.ts` - Contact form (2 references)
- ✅ `/api/orders.ts` - Order management (1 reference)
- ✅ `/api/blog-posts.ts` - Blog data (2 references)
- ✅ `/api/webhooks/stripe.ts` - Stripe webhooks (external)
- ✅ `/api/robots.ts` - Robots.txt (system)
- ✅ `/api/sitemap.ts` - Sitemap (system)

### Feature Routes (Actively Used)
- ✅ `/api/cart-recovery.ts` - Cart recovery (1 reference)
- ✅ `/api/analytics/referrals.ts` - Referral analytics (1 reference)
- ✅ `/api/edge/prefetch-checkout.ts` - Checkout prefetch (1 reference)
- ✅ `/api/leads/city.ts` - City leads (1 reference)
- ✅ `/api/retailer/login.ts` - Retailer login (1 reference)
- ✅ `/api/retailer/register.ts` - Retailer registration (1 reference)
- ✅ `/api/referrals/generate.ts` - Generate referral codes (1 reference)
- ✅ `/api/referrals/track.ts` - Track referrals (3 references)
- ✅ `/api/referrals/validate.ts` - Validate referrals (2 references)
- ✅ `/api/contact-retailer.ts` - Contact retailer (1 reference)
- ✅ `/api/free-giveaway.ts` - Free giveaway (1 reference)

---

## Special Cases

### 1. `/api/create-checkout-session.ts`
**Status**: ⚠️ **VERIFY BEFORE REMOVING**

- No frontend references found
- But this is typically critical for Stripe checkout
- May be called dynamically or through a library
- **Recommendation**: Keep unless you verify checkout works without it

### 2. `/api/newsletter.ts`
**Status**: ⚠️ **VERIFY BEFORE REMOVING**

- No frontend references found
- Check if newsletter signup form exists
- **Recommendation**: Remove if no newsletter signup exists

---

## Recommended Actions

### Phase 1: Safe Removals (10 files)

Remove these with high confidence:

```bash
# Analytics routes (unused)
rm pages/api/analytics/conversion-metrics.ts
rm pages/api/analytics/optimization.ts

# Trial/conversion routes (unused)
rm pages/api/trial-conversion.ts
rm pages/api/trial-users.ts

# Order management (unused)
rm pages/api/order-management.ts

# Security (unused)
rm pages/api/security/risk-assessment.ts

# Retailer routes (unused)
rm pages/api/retailer/create-checkout.ts
rm pages/api/retailer/orders.ts
rm pages/api/retailer/profile.ts

# Referrals (unused)
rm pages/api/referrals/notifications.ts

# Misc (unused)
rm pages/api/retailer-inquiry.ts
rm pages/api/payment-validation.ts
```

### Phase 2: Verify Then Remove (2 files)

1. **Check newsletter signup**:
   ```bash
   # Search for newsletter/subscribe forms
   grep -r "newsletter\|subscribe" src/ pages/
   ```
   If none found: `rm pages/api/newsletter.ts`

2. **Check checkout flow**:
   ```bash
   # Test checkout process manually
   # If it works without this route: rm pages/api/create-checkout-session.ts
   ```

---

## Impact Estimate

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **API routes** | 40+ | ~28 | 30% reduction |
| **Unused routes** | 12 | 0 | 100% cleanup |
| **Lines of code** | - | ~1,000-1,200 | - |

---

## Why These Routes Exist But Aren't Used

Common patterns in over-engineered codebases:

1. **Feature planning** - Routes created for features never implemented
2. **Abandoned features** - Features removed but routes left behind
3. **Copy-paste** - Routes copied from templates/examples
4. **Over-engineering** - "Just in case" routes that were never needed

---

## Next Steps

1. **Review the list** - Confirm which routes you actually need
2. **Test critical paths** - Verify checkout, payments, webhooks work
3. **Remove unused routes** - Start with high-confidence removals
4. **Test build** - Ensure everything still works
5. **Monitor logs** - Check for 404s after deployment

---

**Status**: ✅ Audit complete - Ready to remove unused routes
**High confidence removals**: 10 files
**Verify first**: 2 files
**Estimated lines removed**: ~1,000-1,200
