# Vercel Usage Optimization Guide

> **Current Status**: 487k / 1M Edge Requests (48.7% used) with ~3 weeks remaining in cycle

## ✅ Changes Made

### 1. Edge Middleware for Geo-blocking (`middleware.ts`)

Created a new middleware that blocks traffic at the edge **before** it counts against your function invocations:

**What it does:**
- Blocks Singapore (SG) traffic entirely - identified as major bot source
- Blocks known SEO bots (Semrush, Ahrefs, MJ12bot, etc.)
- Adds helpful debugging headers
- Exempts critical paths (webhooks, cron jobs, static assets)

**Impact:**
- Reduces Edge Requests by blocking unwanted traffic at the CDN level
- Reduces Function Invocations (blocked requests never reach your functions)
- Saves bandwidth from bot/scraper traffic

### 2. Region Pinning (`vercel.json`)

Added `"regions": ["iad1"]` to pin deployment to Washington DC (US East):

**Why:**
- Your customers are in Canada/USA
- Reduces cold starts for your target market
- May reduce edge requests from distant regions

---

## 🔧 Manual Steps Required

### Step 1: Enable Vercel WAF (Firewall) - RECOMMENDED

The middleware is good, but the WAF is more efficient:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your Purrify project
3. Go to **Security** tab → **Firewall**
4. Click **Create Rule**
5. Set:
   - **Condition**: `Country` equals `Singapore (SG)`
   - **Action**: `Deny`
6. Save the rule

**Bonus Rules to Consider:**
```
# Block common bot paths
Path contains "wp-login.php" → Deny
Path contains ".env" → Deny
Path contains "admin.php" → Deny
Path contains "config.xml" → Deny
```

### Step 2: Check ISR Revalidation Settings

Current ISR settings found:
- `app/ammonia-control/page.tsx`: `revalidate = 3600` (1 hour)
- `app/canada/page.tsx`: `revalidate = 3600` (1 hour)
- `scripts/one-time/generate-location-pages.ts`: `revalidate = 86400` (1 day)

**Recommendations:**
- If these pages don't change often, increase to `86400` (24h) or remove ISR entirely
- Static pages without data fetching don't need ISR

**To check all ISR settings:**
```bash
grep -r "revalidate" app/ --include="*.tsx" --include="*.ts" | grep -v "node_modules"
```

### Step 3: Identify Resource-Hungry Projects

In Vercel Dashboard:
1. Go to **Usage** tab
2. Use the **Project** dropdown to switch between projects
3. Look for projects with high Edge Requests but low actual traffic

**Action for low-traffic projects:**
- Enable **Vercel Authentication** (Settings → Security)
- Or add WAF rules to block all countries except CA/US

---

## 📊 Optimization Checklist

| Metric | Current | Target | Action |
|--------|---------|--------|--------|
| Edge Requests | 487k / 1M | < 700k | ✅ Middleware + WAF |
| Function Invocations | 8% | < 15% | ✅ Geo-blocking |
| Bandwidth | 8.5% | < 15% | Monitor |
| Image Transformations | 1.6k / 5k | < 3k | See below |

---

## 🖼️ Image Optimization Tips

Your images in `public/optimized/` look good (multiple formats: avif, webp, jpg).

**To reduce Image Transformations:**

1. **Use explicit sizes in Image components:**
```tsx
// Good - Next.js knows what sizes to generate
<Image 
  src="/optimized/17g-original.webp"
  width={640}
  height={480}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

2. **Pre-generate common sizes:**
   - You already have `17g-original-640w.webp` (good!)
   - Add more sizes if needed: 320w, 768w, 1024w

3. **Check for dynamic image URLs:**
```bash
# Find images that might cause transformations
grep -r "next/image" src/ components/ app/ --include="*.tsx" -A 5 | grep -E "(src=|sizes=)"
```

---

## 🔍 Monitoring Your Savings

After deploying these changes, monitor in Vercel Dashboard:

1. **Real-time Logs**: Check for `X-Blocked-Reason` headers
2. **Usage Tab**: Watch Edge Requests drop over 24-48 hours
3. **Security Tab**: Review blocked requests in Firewall logs

**Expected impact:**
- 20-40% reduction in Edge Requests (depending on bot traffic)
- 10-20% reduction in Function Invocations
- Bandwidth savings from blocked scrapers

---

## 🚨 Emergency: If You're Still Near Limit

If you hit 80% of Edge Requests:

1. **Enable Aggressive Bot Blocking** (in `middleware.ts`):
   - Uncomment `// 'CN', 'RU', 'IN'` in BLOCKED_COUNTRIES
   - Redeploy

2. **Enable Country Allow-list**:
   - Change `const ALLOWED_COUNTRIES: string[] | null = null;`
   - To: `const ALLOWED_COUNTRIES = ['CA', 'US'];`
   - This blocks everything except Canada/US

3. **Pause Non-Critical Projects**:
   - In Vercel Dashboard, pause deployments for secondary sites

---

## 📅 Long-term Recommendations

1. **Weekly Review**: Check Vercel Usage every Monday
2. **Bot Monitoring**: Review Security tab for new bot patterns
3. **ISR Audit**: Monthly review of revalidate settings
4. **Image Audit**: Quarterly check of Image Transformations

---

## Questions?

- Check middleware logs: `vercel logs --json | grep "\[Middleware\]"`
- Test geo-blocking: Use VPN to Singapore, verify 403 response
- WAF documentation: https://vercel.com/docs/security/vercel-waf
