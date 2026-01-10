# Affiliate Program - Implementation Plan

## Overview

Tasks organized into 5 milestones, sequenced by dependencies. Each task maps to requirements (AC-X.X) and design sections.

**Estimated scope:** ~40 tasks across database, API, pages, and integration work.

---

## Milestone 1: Database & Foundation

### T1: Add Prisma schema for affiliate models
- **File:** `prisma/schema.prisma`
- **Action:** Add 5 new models: `AffiliateApplication`, `Affiliate`, `AffiliateClick`, `AffiliateConversion`, `AffiliatePayout` with enums
- **Maps to:** Design §1 (Data Models)
- **Done:** Models added, `pnpm prisma generate` succeeds

### T2: Create and run migration
- **Command:** `pnpm prisma migrate dev --name add_affiliate_program`
- **Done:** Migration created and applied, tables exist in database

### T3: Add affiliateCode field to Order model
- **File:** `prisma/schema.prisma`
- **Action:** Add optional `affiliateCode String?` field to Order model for audit trail
- **Maps to:** Design §12.3
- **Done:** Field added, migration applied

### T4: Create affiliate lib utilities
- **Files:**
  - `src/lib/affiliate/code-generator.ts` - Generate codes like "JOHN-A1B2"
  - `src/lib/affiliate/clearing.ts` - Lazy clearing function
  - `src/lib/affiliate/tracking.ts` - Cookie helpers, attribution utils
  - `src/lib/affiliate/middleware.ts` - withAffiliateAuth using NextAuth
- **Maps to:** Design §8.1, §5
- **Done:** All 4 files created with exported functions

### T5: Add affiliate translations
- **Files:** `src/translations/{en,fr,es,zh}.ts`, `src/translations/types.ts`
- **Action:** Add `affiliateDashboard` section with all UI strings
- **Done:** Translations added to all 4 locales, TypeScript types updated

---

## Milestone 2: Auth & Application Flow

### T6: Enhance affiliate signup API to save to database
- **File:** `pages/api/affiliate/signup.ts`
- **Action:**
  - Create `AffiliateApplication` record in DB
  - Keep existing email notification to admin
  - Send confirmation email to applicant
- **Maps to:** AC-1.1
- **Done:** Applications saved to DB, both emails sent

### T7: Add affiliate credentials provider to NextAuth
- **File:** `pages/api/auth/[...nextauth].ts`
- **Action:**
  - Add `CredentialsProvider` with id "affiliate-credentials"
  - Validate against `Affiliate.passwordHash`
  - Return session with `role: "affiliate"` and `affiliateCode`
- **Maps to:** AC-2.1, AC-2.2, Design §5.2
- **Done:** Affiliates can authenticate, session includes role

### T8: Update NextAuth types for affiliate session
- **File:** `src/types/next-auth.d.ts` (create if needed)
- **Action:** Extend Session and User types to include `role` and `affiliateCode`
- **Done:** TypeScript recognizes affiliate session properties

### T9: Create affiliate login page
- **File:** `pages/affiliate/login.tsx`
- **Action:**
  - Login form with email/password
  - Use `signIn("affiliate-credentials", {...})`
  - Redirect to `/affiliate/dashboard` on success
  - Error handling for invalid credentials
- **Maps to:** AC-2.1, AC-2.2
- **Done:** Login page works, redirects to dashboard

### T10: Create withAffiliateAuth middleware
- **File:** `src/lib/affiliate/middleware.ts`
- **Action:**
  - Check `getServerSession()`
  - Verify `session.user.role === "affiliate"`
  - Return 401 if not authenticated
  - Attach affiliate data to request
- **Maps to:** AC-2.3
- **Done:** Middleware protects dashboard APIs

---

## Milestone 3: Admin Application Management

### T11: Create admin affiliates list page
- **File:** `pages/admin/ops/affiliates/index.tsx`
- **Action:**
  - Use OpsLayout (existing pattern)
  - Show total active affiliates, pending applications count
  - Table of all affiliates with status badges
  - Link to applications queue
- **Maps to:** AC-7.1
- **Done:** Page renders with affiliate data

### T12: Create admin applications API
- **File:** `pages/api/admin/affiliates/applications/index.ts`
- **Action:** GET endpoint to list applications with pagination, status filter
- **Maps to:** AC-1.2
- **Done:** API returns paginated applications

### T13: Create admin applications page
- **File:** `pages/admin/ops/affiliates/applications.tsx`
- **Action:**
  - List pending applications
  - Show applicant details (name, email, website, audience, traffic source)
  - Approve/Reject buttons
- **Maps to:** AC-1.2, AC-7.2
- **Done:** Applications displayed with action buttons

### T14: Create approve application API
- **File:** `pages/api/admin/affiliates/applications/[id]/approve.ts`
- **Action:**
  - Create `Affiliate` record with generated code and temp password
  - Update application status to APPROVED
  - Send welcome email with credentials
- **Maps to:** AC-1.3
- **Done:** Approval creates affiliate, sends email

### T15: Create reject application API
- **File:** `pages/api/admin/affiliates/applications/[id]/reject.ts`
- **Action:**
  - Update application status to REJECTED
  - Optionally send rejection email with reason
- **Maps to:** AC-1.4
- **Done:** Rejection updates status, optional email sent

### T16: Create welcome email template
- **File:** `src/lib/email/templates/affiliate-welcome.ts` (or use Resend template)
- **Action:** HTML email with login link, affiliate code, getting started info
- **Maps to:** AC-1.3, Design §9
- **Done:** Email template created and tested

---

## Milestone 4: Affiliate Dashboard

### T17: Create affiliate dashboard layout
- **File:** `src/components/affiliate/AffiliateLayout.tsx`
- **Action:**
  - Sidebar navigation (Dashboard, Links, Stats, Payouts, Assets, Settings)
  - Header with affiliate name and logout
  - Responsive mobile menu
- **Done:** Layout component renders correctly

### T18: Create affiliate dashboard stats API
- **File:** `pages/api/affiliate/dashboard/stats.ts`
- **Action:**
  - Protected with withAffiliateAuth
  - Call `clearPendingConversions()` first (lazy clearing)
  - Return: totalClicks, totalConversions, conversionRate, totalEarnings, pendingEarnings, availableBalance, thisMonth vs lastMonth
- **Maps to:** AC-3.1
- **Done:** API returns all stats

### T19: Create affiliate dashboard main page
- **File:** `pages/affiliate/dashboard/index.tsx`
- **Action:**
  - Use AffiliateLayout
  - Stats cards showing key metrics
  - Quick link generator
  - Recent activity feed (last 10 conversions)
- **Maps to:** AC-3.1
- **Done:** Dashboard displays stats and activity

### T20: Create StatsCard component
- **File:** `src/components/affiliate/StatsCard.tsx`
- **Action:** Reusable card for displaying metric with label, value, and optional trend
- **Done:** Component renders correctly with props

### T21: Create affiliate links API
- **File:** `pages/api/affiliate/dashboard/links.ts`
- **Action:** Return affiliate code, base URL, product-specific URLs
- **Maps to:** AC-3.2
- **Done:** API returns link data

### T22: Create affiliate links page
- **File:** `pages/affiliate/dashboard/links.tsx`
- **Action:**
  - Default referral link with copy button
  - Product-specific links
  - Custom URL generator (any purrify.ca page + ref code)
  - QR code generator
- **Maps to:** AC-3.2
- **Done:** All link features work

### T23: Create LinkGenerator component
- **File:** `src/components/affiliate/LinkGenerator.tsx`
- **Action:** Input for custom URL, generates link with ref code, copy button
- **Done:** Component generates and copies links

### T24: Create affiliate clicks API
- **File:** `pages/api/affiliate/dashboard/clicks.ts`
- **Action:** Paginated list of clicks with date, landing page, converted status
- **Done:** API returns paginated clicks

### T25: Create affiliate conversions API
- **File:** `pages/api/affiliate/dashboard/conversions.ts`
- **Action:** Paginated list of conversions with order value, commission, status
- **Done:** API returns paginated conversions

### T26: Create affiliate stats page
- **File:** `pages/affiliate/dashboard/stats.tsx`
- **Action:**
  - Date range picker
  - Charts: clicks over time, conversions over time, earnings over time
  - Top performing links table
- **Maps to:** AC-3.3
- **Done:** Stats page with charts and tables

### T27: Create PerformanceChart component
- **File:** `src/components/affiliate/PerformanceChart.tsx`
- **Action:** Recharts line/bar chart for time series data
- **Done:** Chart renders with data

### T28: Create affiliate payouts API
- **File:** `pages/api/affiliate/dashboard/payouts.ts`
- **Action:** Return payout history with status, amount, date, transaction ref
- **Maps to:** AC-3.4
- **Done:** API returns payout history

### T29: Create payout request API
- **File:** `pages/api/affiliate/dashboard/payout-request.ts`
- **Action:**
  - Call `clearPendingConversions()` first
  - Check availableBalance >= $50
  - Create AffiliatePayout record
  - Deduct from availableBalance
  - Notify admin
- **Maps to:** AC-5.1, AC-5.2
- **Done:** Payout requests created, admin notified

### T30: Create affiliate payouts page
- **File:** `pages/affiliate/dashboard/payouts.tsx`
- **Action:**
  - Current available balance display
  - Pending earnings display
  - Payout history table
  - Request payout button (disabled if < $50)
  - Payment method display
- **Maps to:** AC-3.4
- **Done:** Payouts page fully functional

### T31: Create PayoutRequestModal component
- **File:** `src/components/affiliate/PayoutRequestModal.tsx`
- **Action:** Confirmation modal for payout request with amount and payment method
- **Done:** Modal works and triggers API

### T32: Create affiliate settings API
- **File:** `pages/api/affiliate/dashboard/settings.ts`
- **Action:** GET/PUT for profile and payment settings (payout method, payout email)
- **Done:** Settings can be read and updated

### T33: Create affiliate settings page
- **File:** `pages/affiliate/dashboard/settings.tsx`
- **Action:**
  - Profile info (name, email - read only)
  - Payment method selection (PayPal/E-Transfer)
  - Payout email input
  - Password change form
- **Done:** Settings page saves changes

### T34: Create affiliate assets page
- **File:** `pages/affiliate/dashboard/assets.tsx`
- **Action:**
  - Downloadable banners (multiple sizes)
  - Product images
  - Pre-written social posts (copy to clipboard)
  - Brand guidelines summary
- **Maps to:** AC-6.1
- **Done:** Assets page with downloads and copy buttons

### T35: Add marketing assets to public folder
- **Files:** `public/affiliate-assets/banners/*.png`, `public/affiliate-assets/logos/*.png`
- **Action:** Create/export banner images in standard sizes (300x250, 728x90, 160x600, 1200x628)
- **Maps to:** AC-6.1
- **Done:** Assets exist and are downloadable

---

## Milestone 5: Tracking & Admin Payouts

### T36: Create click tracking API
- **File:** `pages/api/affiliate/track.ts`
- **Action:**
  - Validate `?ref=CODE` parameter
  - Check affiliate exists and is ACTIVE
  - Generate sessionId, set cookies (90 days)
  - Record click in AffiliateClick
  - Redirect to clean URL (without ref param)
- **Maps to:** AC-4.1
- **Done:** Clicks tracked, cookies set, redirects work

### T37: Create tracking middleware for ref parameter
- **File:** `src/middleware.ts` (or enhance existing)
- **Action:** Intercept requests with `?ref=` param, redirect to tracking API
- **Maps to:** AC-4.1
- **Done:** Middleware catches ref params site-wide

### T38: Integrate affiliate conversion into Stripe webhook
- **File:** `pages/api/webhooks/stripe.ts`
- **Action:**
  - On checkout.session.completed, check for affiliate cookie in metadata
  - If present: create AffiliateConversion, update affiliate stats, send email
- **Maps to:** AC-4.2
- **Done:** Conversions created on purchase

### T39: Pass affiliate cookie through checkout
- **Files:** Checkout flow files (where Stripe session is created)
- **Action:** Read affiliate_ref cookie, pass as metadata to Stripe checkout session
- **Maps to:** Design §7
- **Done:** Cookie data available in webhook

### T40: Create admin payouts page
- **File:** `pages/admin/ops/affiliates/payouts.tsx`
- **Action:**
  - List pending payout requests
  - Show affiliate name, amount, method, payout email
  - Process button to mark as completed
- **Maps to:** AC-7.4
- **Done:** Admin can view and process payouts

### T41: Create process payout API
- **File:** `pages/api/admin/affiliates/payouts/[id]/process.ts`
- **Action:**
  - Update payout status to COMPLETED
  - Record transaction reference
  - Send confirmation email to affiliate
- **Maps to:** AC-5.3
- **Done:** Payouts can be marked complete

### T42: Create affiliate detail page (admin)
- **File:** `pages/admin/ops/affiliates/[id].tsx`
- **Action:**
  - Full affiliate profile
  - Performance metrics
  - Conversion history
  - Payout history
  - Status controls (activate/suspend/terminate)
- **Maps to:** AC-7.3
- **Done:** Admin can view full affiliate details

### T43: Update affiliate status API
- **File:** `pages/api/admin/affiliates/[id].ts`
- **Action:** PUT endpoint to update affiliate status (ACTIVE/SUSPENDED/TERMINATED)
- **Maps to:** AC-7.3
- **Done:** Admin can change affiliate status

### T44: Add affiliate program stats to admin dashboard
- **File:** `pages/api/admin/affiliates/stats.ts` + update admin ops index
- **Action:** Program-wide metrics: total affiliates, total revenue, total commissions paid
- **Maps to:** AC-7.1
- **Done:** Admin sees program overview

---

## Task Dependencies

```
T1 → T2 → T3 (Database must be ready first)
T4 (Can parallel with T2-T3)
T5 (Can parallel)

T6 → T12 → T13 (Application flow)
T7 → T8 → T9 → T10 (Auth flow)

T14, T15, T16 (Depend on T6, T7)

T10 → T17 → T18 → T19 (Dashboard foundation)
T20-T35 (Dashboard pages, can partially parallel after T17-T19)

T36 → T37 → T38 → T39 (Tracking flow, sequential)

T40, T41, T42, T43, T44 (Admin payouts, after T29)
```

---

## Suggested Execution Order

**Phase A (Foundation):** T1, T2, T3, T4, T5
**Phase B (Auth):** T6, T7, T8, T9, T10
**Phase C (Admin Applications):** T11, T12, T13, T14, T15, T16
**Phase D (Dashboard Core):** T17, T18, T19, T20, T21, T22, T23
**Phase E (Dashboard Full):** T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35
**Phase F (Tracking):** T36, T37, T38, T39
**Phase G (Admin Payouts):** T40, T41, T42, T43, T44
**Phase H (Hormozi Enhancements):** T45, T46, T47, T48, T49, T50, T51, T52

---

## Milestone 6: Hormozi Enhancements (Tiered Commissions & Gamification)

### T45: Add tiered commission structure to database
- **File:** `prisma/schema.prisma`
- **Action:**
  - Add `AffiliateTier` enum (STARTER, ACTIVE, PARTNER)
  - Add fields to Affiliate:
    - `commissionTier AffiliateTier @default(STARTER)`
    - `activatedAt DateTime?`
    - `starterKitOrderId String?`
    - `currentMonthSales Int @default(0)`
    - `lastMonthSales Int @default(0)`
    - `partnerQualifyingMonths Int @default(0)`
    - `lastMonthResetAt DateTime?` (for lazy monthly reset)
    - `lastRewardMonth String?` (for lazy "Sell 3, Get Free" tracking)
- **Maps to:** Hormozi requirement (tiered commissions)
- **Done:** Migration applied, new fields in Prisma Studio

### T46: Update commission calculation logic
- **Files:** `src/lib/affiliate/tracking.ts`, `pages/api/webhooks/stripe.ts`
- **Action:**
  - Replace hardcoded 30% with tier-based rates (20%/25%/30%)
  - Add `COMMISSION_RATES` mapping
- **Done:** Conversions use tier-based commission rates

### T47: Implement tier upgrade logic
- **File:** `src/lib/affiliate/tiers.ts` (create new)
- **Action:**
  - `checkAndUpgradeTier()` - STARTER→ACTIVE (3 sales), ACTIVE→PARTNER (5+/mo × 2mo)
  - `onConversionCleared()` - Check for tier upgrade after conversions clear
  - Send tier upgrade notification email
- **Done:** Affiliates auto-upgrade when hitting tier thresholds

### T48: Add lazy monthly sales reset (no cron)
- **File:** `src/lib/affiliate/monthly-reset.ts` (create new)
- **Action:**
  - Add `lastMonthResetAt DateTime?` field to Affiliate model
  - Create `checkAndResetMonthlySales()` function
  - On dashboard load, check if current month > lastMonthResetAt month
  - If new month: move `currentMonthSales` → `lastMonthSales`, reset current to 0, update `partnerQualifyingMonths`
  - Update `lastMonthResetAt` to current date
- **Integration:** Call from dashboard stats API before returning stats
- **Done:** Monthly counters reset lazily on first dashboard visit of new month

### T49: Add "Sell 3, Get Free" reward system (lazy)
- **File:** `src/lib/affiliate/monthly-reset.ts` (extend)
- **Action:**
  - Add `lastRewardMonth String?` field to Affiliate (format: "YYYY-MM")
  - During monthly reset, if `lastMonthSales >= 3` AND reward not already given for that month:
    - Add $49 credit to `availableBalance`
    - Set `lastRewardMonth` to previous month
    - Send reward notification email
- **Done:** Qualifying affiliates receive reward on first dashboard visit of new month

### T50: Update landing page commission calculator
- **File:** `pages/affiliate/index.tsx`
- **Action:**
  - Show tiered commission structure (20%/25%/30%)
  - Update calculator to show earnings at each tier
  - Add tier criteria explanations
- **Done:** Landing page reflects tiered system

### T51: Add tier progress to dashboard
- **File:** `pages/affiliate/dashboard/index.tsx`
- **Action:**
  - Show current tier with badge
  - Progress bar to next tier (e.g., "2/3 sales to Active")
  - Benefits of next tier
  - Monthly sales counter
- **Done:** Affiliates see tier and progress

### T52: Investment requirement - Starter kit purchase flow
- **Prerequisites:** Create "Affiliate Starter Kit" product in Stripe ($49)
- **Files:** `pages/affiliate/activate.tsx` (create), `pages/api/webhooks/stripe.ts`
- **Action:**
  - After approval, redirect to activation page (not dashboard)
  - Require $49 starter kit purchase via Stripe
  - On purchase: set `status = 'ACTIVE'`, `activatedAt`, `starterKitOrderId`
  - Block dashboard access until activated
- **Done:** Affiliates must purchase to activate account

---

## Email Templates Needed (Phase H)

| Template | Trigger | Content |
|----------|---------|---------|
| `affiliate-tier-upgrade` | Tier changes | Congrats, new rate, what's next |
| `affiliate-monthly-reward` | 3+ sales last month | Free product earned |
| `affiliate-activation-required` | After approval | Link to purchase starter kit |

---

## Verification Checklist

### Core System (T1-T44)
- [ ] Affiliate can apply via `/affiliate/signup`
- [ ] Admin can approve/reject applications
- [ ] Approved affiliate receives welcome email with credentials
- [ ] Affiliate can log in and see dashboard
- [ ] Affiliate can generate and copy tracking links
- [ ] Clicks are tracked when visiting `?ref=CODE` URLs
- [ ] Purchases with affiliate cookie create conversions
- [ ] Conversions clear after 30 days (on dashboard view)
- [ ] Affiliate can request payout when balance >= $50
- [ ] Admin can process payouts
- [ ] All pages have dark mode support
- [ ] All text uses translations

### Hormozi Enhancements (T45-T52)
- [ ] New affiliate starts at STARTER tier (20%)
- [ ] After approval, affiliate must purchase $49 starter kit to activate
- [ ] After 3 cleared sales, auto-upgrades to ACTIVE (25%)
- [ ] Monthly sales track correctly
- [ ] After 2 months of 5+ sales, upgrades to PARTNER (30%)
- [ ] Affiliates with 3+ monthly sales get $49 credit ("Sell 3, Get Free")
- [ ] Landing page shows tiered commission structure
- [ ] Dashboard shows current tier and progress to next tier
- [ ] All tier upgrade emails send correctly

---

## Task Summary

| Phase | Tasks | Count | Description |
|-------|-------|-------|-------------|
| A | T1-T5 | 5 | Foundation (schema, lib, translations) |
| B | T6-T10 | 5 | Auth & Application Flow |
| C | T11-T16 | 6 | Admin Application Management |
| D | T17-T23 | 7 | Dashboard Core |
| E | T24-T35 | 12 | Dashboard Full |
| F | T36-T39 | 4 | Click & Conversion Tracking |
| G | T40-T44 | 5 | Admin Payouts |
| H | T45-T52 | 8 | Hormozi Enhancements |
| **Total** | | **52** | |

---

Ready for approval? Reply `y` to begin execution, or `refine [feedback]` to iterate.
