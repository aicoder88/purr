# User TODO List - Remaining Tasks

This document outlines the tasks that require your action to complete the cleanup and optimization of the Purrify site.

---

## 🔴 CRITICAL - Must Do Immediately

### 1. Update Node.js Version
**Current**: Node v18.20.8
**Required**: Node v22.x

Your `package.json` specifies Node 22.x, but the local environment is running v18. Many dependencies require Node 20+.

```bash
# Using nvm (recommended)
nvm install 22
nvm use 22

# Or download from nodejs.org
# https://nodejs.org/
```

**Why**: Multiple packages (Next.js 16, jsdom, cheerio, etc.) require Node 20+. Running on v18 may cause unexpected issues.

---

## 🟠 HIGH PRIORITY - Environment Configuration

### 2. Set Up Cron Security Secrets

**Status**: ❌ NOT CONFIGURED (blocking automated blog features)

Your automated blog cron jobs require security secrets to prevent unauthorized access. Without these, anyone could trigger your blog generation endpoints.

**Required Environment Variables:**

```bash
# For automated blog post publishing (daily at midnight)
CRON_SECRET=your-random-secret-here-make-it-long-and-random

# For automated blog content generation (daily at 6am)
AUTOBLOG_CRON_SECRET=another-random-secret-different-from-above
```

**How to Generate Secrets:**
```bash
# Generate strong random secrets (run these commands):
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Copy the output for CRON_SECRET

node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Copy the output for AUTOBLOG_CRON_SECRET
```

**Where to Add:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add `CRON_SECRET` with the first generated value
3. Add `AUTOBLOG_CRON_SECRET` with the second generated value
4. Redeploy your site

**How Vercel Cron Jobs Use These:**
Your `vercel.json` has two cron jobs configured:
```json
"crons": [
  {
    "path": "/api/cron/publish-scheduled-posts",
    "schedule": "0 0 * * *"  // Daily at midnight - needs CRON_SECRET
  },
  {
    "path": "/api/cron/generate-blog-post",
    "schedule": "0 6 * * *"  // Daily at 6am - needs AUTOBLOG_CRON_SECRET
  }
]
```

Vercel automatically adds the `x-cron-secret` header when calling these endpoints, but your API routes check if it matches your environment variable.

**Test After Setup:**
```bash
# Test publish endpoint (should work after adding CRON_SECRET)
curl -X POST https://purrify.ca/api/cron/publish-scheduled-posts?secret=YOUR_CRON_SECRET

# Test blog generation (should work after adding AUTOBLOG_CRON_SECRET)
curl -X POST https://purrify.ca/api/cron/generate-blog-post?secret=YOUR_AUTOBLOG_CRON_SECRET
```

**Optional Configuration:**
```bash
# Customize how often blog posts are auto-generated (default: 3 days)
AUTOBLOG_INTERVAL_DAYS=7  # Generate new post every 7 days
```

---

### 3. ✅ Analytics Configuration - COMPLETED

- ✅ **GA4 Key Added**: `NEXT_PUBLIC_GA_MEASUREMENT_ID` configured
- ✅ **Anthropic API Key Added**: `ANTHROPIC_API_KEY` configured

Your analytics and AI content generation are now properly configured!

---

### 4. Error Monitoring (Recommended)

**Status**: ⚠️ OPTIONAL but highly recommended

```bash
# Sentry for error tracking
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
SENTRY_AUTH_TOKEN=xxxxx
```

**Why**: Currently no error monitoring is configured. Sentry would help catch production errors.

**Setup Steps**:
1. Create free account at https://sentry.io
2. Create new project for "Next.js"
3. Copy DSN from project settings
4. Add to Vercel environment variables

---

## 🟡 MEDIUM PRIORITY - Code Quality

### 5. Verify Retailer/B2B Features

Several B2B-related API routes were not removed because they might be in use:

**Routes to Verify**:
- `/api/retailer/create-checkout.ts` - Is B2B checkout functionality needed?
- `/api/retailer/orders.ts` - Are retailers able to view their orders?
- `/api/retailer/profile.ts` - Can retailers manage their profiles?
- `/api/shipstation/create-order.ts` - Are you using ShipStation for fulfillment?
- `/api/shipstation/webhook.ts` - Is this webhook configured in ShipStation?

**Action**:
1. Test the B2B/retailer features on the site
2. If not being used, remove these API routes: `rm pages/api/retailer/{create-checkout,orders,profile}.ts pages/api/shipstation/*.ts`
3. If being used, ensure they're properly tested and working

### 6. Newsletter Functionality

**Route**: `/api/newsletter.ts`
**Status**: No frontend references found

**Action**:
1. Check if there's a newsletter signup form on the site
2. Search for newsletter signup forms: `grep -r "newsletter" src/components`
3. If no newsletter feature exists, remove: `rm pages/api/newsletter.ts`
4. If newsletter exists, verify the API endpoint is correct

---

## 🔵 LOW PRIORITY - Optional Improvements

### 7. Missing Script Dependencies

The file `generate-slides-pdf.js` references packages that aren't installed:

```bash
# Only needed if you use generate-slides-pdf.js
npm install --save-dev playwright pdfkit
```

**Action**:
- If you don't use `generate-slides-pdf.js`, delete it: `rm generate-slides-pdf.js`
- If you do use it, install the dependencies above

### 8. Design Improvements

From `/docs/SUGGESTED_IMPROVEMENTS.md`, consider these UX enhancements:

1. **Color Palette**: Shift from alert red to coral/indigo for a more premium feel
2. **Typography**: Use more characterful fonts (Outfit or Playfair Display)
3. **Visual Effects**: Add glassmorphism effects for modern feel
4. **Product Cards**: Redesign for better visual hierarchy
5. **Hero Section**: Improve visual impact with better imagery
6. **Science Section**: Add carbon visualization/animation

**Action**: Review `/docs/SUGGESTED_IMPROVEMENTS.md` for full details and prioritize based on business goals.

### 9. Test Coverage

Currently only 11 test files exist (mostly E2E and translation tests).

**Missing Coverage**:
- API route unit tests
- Utility function tests
- React component tests
- Business logic tests

**Recommended**:
```bash
# Add Jest tests for critical paths
npm run test:translations  # Already exists - runs translation completeness
npm run test:e2e           # Already exists - runs E2E tests

# TODO: Add unit tests for:
# - src/lib/pricing.ts
# - src/lib/cart-context.tsx
# - pages/api/create-checkout-session.ts
```

**Resources**: Consider using Vitest or Jest for unit tests, React Testing Library for component tests.

---

## ✅ COMPLETED BY CLAUDE

The following tasks have been completed automatically:

### Security
- ✅ Fixed all NPM security vulnerabilities (0 vulnerabilities remaining)
- ✅ Replaced vulnerable `xlsx` library with secure JSON-based solution
- ✅ Converted Excel keywords file to JSON format

### Code Quality
- ✅ Removed 30+ production console statements
- ✅ Fixed 90+ TypeScript unused identifier issues
- ✅ Fixed 70+ ESLint violations
- ✅ Removed unused dependencies (@emotion/react, critters, eslint-config-next)
- ✅ Removed 154 packages total

### Cleanup
- ✅ Deleted `.image-migration-backup/` directory (17 files, 276KB)
- ✅ Removed old deployment configs (netlify.toml, windsurf_deployment.yaml)
- ✅ Consolidated image components (OptimizedImage is now the single source)
- ✅ Verified analytics implementations are not duplicative (serve different purposes)

### API Routes
- ✅ Removed 9 unused API routes:
  - `trial-conversion.ts`
  - `trial-users.ts`
  - `order-management.ts`
  - `payment-validation.ts`
  - `retailer-inquiry.ts`
  - `analytics/conversion-metrics.ts`
  - `analytics/optimization.ts`
  - `security/risk-assessment.ts`
  - `referrals/notifications.ts`

### Environment Variables
- ✅ `ANTHROPIC_API_KEY` - Configured for AI content generation
- ✅ `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Configured for Google Analytics 4

---

## 📋 Verification Steps

After completing the tasks above, run these commands to verify everything is working:

```bash
# 1. Verify build succeeds
npm run build

# 2. Verify all tests pass
npm run test:translations
npm run test:e2e

# 3. Verify dark mode compliance
npm run validate-dark-mode

# 4. Verify no linting errors (some warnings are acceptable)
npm run lint

# 5. Verify no TypeScript errors
npm run check-types

# 6. Verify no security vulnerabilities
npm audit
```

All commands above should pass with 0 errors (warnings are acceptable).

---

## 🎯 Success Criteria

- [ ] Node.js upgraded to v22.x
- [x] GA4 configured and working ✅
- [x] ANTHROPIC_API_KEY configured ✅
- [ ] CRON_SECRET configured (for automated publishing)
- [ ] AUTOBLOG_CRON_SECRET configured (for automated blog generation)
- [ ] All B2B features verified or removed
- [ ] Newsletter feature verified or removed
- [ ] All verification commands pass successfully
- [ ] Production deployment successful on Vercel

---

## 📞 Support

If you encounter issues:

1. Check the documentation in `/docs/` directory
2. Review `/docs/TROUBLESHOOTING.md` for common issues
3. Check Vercel deployment logs for errors
4. Verify environment variables in Vercel dashboard

---

## 🔐 Security Best Practices for CRON_SECRET

**Why you need it:**
- Prevents unauthorized access to your cron endpoints
- Without it, anyone could trigger expensive AI API calls or publish posts
- Acts as authentication for automated tasks

**How Vercel uses it:**
1. You set `CRON_SECRET` and `AUTOBLOG_CRON_SECRET` in Vercel env vars
2. Vercel's cron system automatically sends this secret in the `x-cron-secret` header
3. Your API routes check: `if (cronSecret !== process.env.CRON_SECRET) return 401`
4. Only requests with matching secret are allowed through

**What happens without it:**
- Your cron endpoints return 401 Unauthorized
- Automated blog publishing won't work
- Automated blog generation won't work
- You'll see "Unauthorized" errors in Vercel logs

---

**Generated**: 2025-12-26
**Total Tasks Completed by Claude**: 10/10 automated tasks ✅
**Completed by You**: 2/7 manual tasks ✅
**Remaining Critical Tasks**: 2 (Node.js upgrade + CRON secrets)
