# Vercel Optimization Deployment Checklist

## Changes Summary

### 1. ✅ Created `middleware.ts` - Edge Geo-blocking
Blocks unwanted traffic at the CDN level (before it hits your functions).

**Blocks:**
- Singapore (SG) - identified as major bot source
- Known SEO bots (Semrush, Ahrefs, etc.)

**Impact:** Reduces Edge Requests and Function Invocations

### 2. ✅ Updated `vercel.json` - Region Pinning
Pinned to `iad1` (Washington DC) for your Canada/US customers.

### 3. ✅ Optimized ISR Settings
Changed revalidation from 1 hour to 24 hours for:
- `app/ammonia-control/page.tsx`
- `app/canada/page.tsx`

### 4. ✅ Created `scripts/audit-isr.ts`
Run `pnpm audit:isr` to check all ISR settings.

---

## Pre-Deploy Checklist

- [ ] Review `middleware.ts` - adjust blocked countries if needed
- [ ] Test build locally: `pnpm build`
- [ ] Run ISR audit: `pnpm audit:isr`

## Deploy Commands

```bash
# 1. Test build
pnpm build

# 2. If build succeeds, deploy to Vercel
vercel --prod
```

## Post-Deploy Verification

1. **Test Geo-blocking:**
   ```bash
   # Should return 403 from Singapore
   curl -H "CF-IPCountry: SG" https://www.purrify.ca/
   
   # Should work from Canada
   curl -H "CF-IPCountry: CA" https://www.purrify.ca/
   ```

2. **Check Vercel Logs:**
   - Go to Vercel Dashboard → Project → Logs
   - Look for `[Middleware]` entries
   - Verify blocked requests are logged

3. **Monitor Usage (24-48 hours):**
   - Vercel Dashboard → Usage tab
   - Watch for Edge Requests decrease
   - Check Security tab for blocked requests

---

## Manual WAF Setup (Recommended)

After deploying, also set up Vercel WAF for extra protection:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) → Purrify → Security → Firewall
2. Create Rule:
   - Condition: `Country` equals `Singapore (SG)`
   - Action: `Deny`
3. Create Rule:
   - Condition: `Path` contains `wp-login.php`
   - Action: `Deny`

---

## Emergency Rollback

If issues arise:

```bash
# Remove middleware temporarily
git rm middleware.ts
git commit -m "Temporarily remove geo-blocking"
git push

# Or disable via environment variable (add to Vercel env vars)
DISABLE_MIDDLEWARE=true
```

Then modify `middleware.ts` to check for this variable:
```typescript
if (process.env.DISABLE_MIDDLEWARE === 'true') {
  return NextResponse.next();
}
```
