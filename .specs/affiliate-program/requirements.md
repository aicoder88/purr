# Affiliate Program - Requirements

## Overview

Build a full affiliate program system that transforms the existing marketing funnel (landing page + signup form) into an operational affiliate army. Based on Hormozi's framework: Find → Offer → Qualify → Pay → Activate → Retain.

**Existing assets:**
- `/affiliate` - Marketing landing page with 30% commission, income calculator
- `/affiliate/signup` - Application form (name, email, website, audience, traffic source)
- `/api/affiliate/signup` - Application submission endpoint
- Prisma + PostgreSQL database with existing referral models

**Goal:** Enable affiliates to sign up, get approved, receive unique tracking links, see their performance, and get paid.

---

## User Stories

### US-1: Affiliate Application (Exists - Enhance)
As a potential affiliate, I want to submit my application with relevant details so that I can be considered for the program.

### US-2: Admin Application Review
As an admin, I want to review pending affiliate applications so that I can approve qualified affiliates and reject unsuitable ones.

### US-3: Affiliate Onboarding
As a newly approved affiliate, I want to receive a welcome email with login credentials so that I can access my affiliate dashboard.

### US-4: Affiliate Dashboard Access
As an approved affiliate, I want to log into my dashboard so that I can manage my affiliate activities.

### US-5: Unique Tracking Links
As an affiliate, I want to generate unique tracking links so that I can promote Purrify and get credit for referrals.

### US-6: Performance Tracking
As an affiliate, I want to see my clicks, conversions, and earnings in real-time so that I can measure my promotional effectiveness.

### US-7: Marketing Assets
As an affiliate, I want to access banners, images, and copy templates so that I can promote Purrify effectively.

### US-8: Payout Requests
As an affiliate, I want to request a payout when I reach the minimum threshold so that I can receive my earnings.

### US-9: Admin Payout Processing
As an admin, I want to view and process payout requests so that affiliates receive their commissions.

### US-10: Program Analytics (Admin)
As an admin, I want to see overall affiliate program metrics so that I can measure program health and ROI.

---

## Acceptance Criteria (EARS Notation)

### AC-1: Application Management

**AC-1.1** WHEN a visitor submits the affiliate application form THE SYSTEM SHALL create an `AffiliateApplication` record with status `PENDING` and send a confirmation email to the applicant.

**AC-1.2** WHILE an admin is viewing the affiliate applications list THE SYSTEM SHALL display all applications sorted by submission date with filters for status (PENDING, APPROVED, REJECTED).

**AC-1.3** WHEN an admin approves an application THE SYSTEM SHALL:
- Create an `Affiliate` record with status `ACTIVE`
- Generate a unique affiliate code (format: `FIRSTNAME-XXXX` where X is alphanumeric)
- Create login credentials (or link to existing user if email matches)
- Send welcome email with dashboard link and credentials
- Update application status to `APPROVED`

**AC-1.4** WHEN an admin rejects an application THE SYSTEM SHALL update the application status to `REJECTED` and optionally send a rejection email with reason.

### AC-2: Affiliate Authentication

**AC-2.1** WHEN an approved affiliate visits `/affiliate/login` THE SYSTEM SHALL display a login form accepting email and password.

**AC-2.2** WHEN an affiliate submits valid credentials THE SYSTEM SHALL create a session and redirect to `/affiliate/dashboard`.

**AC-2.3** IF an affiliate is not authenticated WHEN they access any `/affiliate/dashboard/*` route THE SYSTEM SHALL redirect to `/affiliate/login`.

**AC-2.4** WHILE an affiliate session is active THE SYSTEM SHALL maintain authentication for 7 days with "remember me" or 24 hours without.

### AC-3: Affiliate Dashboard

**AC-3.1** WHEN an authenticated affiliate visits `/affiliate/dashboard` THE SYSTEM SHALL display:
- Welcome message with affiliate name
- Summary stats: Total clicks, conversions, conversion rate, total earnings, pending earnings, available balance
- This month's performance vs last month
- Quick link generator
- Recent activity feed (last 10 conversions)

**AC-3.2** WHEN an affiliate visits `/affiliate/dashboard/links` THE SYSTEM SHALL display:
- Default referral link (`purrify.ca/?ref=CODE`)
- Product-specific links for each product
- Link generator for custom URLs (any purrify.ca page + ref code)
- Copy button for each link
- QR code generator for each link

**AC-3.3** WHEN an affiliate visits `/affiliate/dashboard/stats` THE SYSTEM SHALL display:
- Date range picker (default: last 30 days)
- Clicks over time (chart)
- Conversions over time (chart)
- Earnings over time (chart)
- Top performing links
- Conversion breakdown by product

**AC-3.4** WHEN an affiliate visits `/affiliate/dashboard/payouts` THE SYSTEM SHALL display:
- Current available balance
- Pending earnings (not yet eligible - 30-day hold for refunds)
- Payout history table
- Request payout button (enabled when balance >= $50 minimum)
- Payment method settings

### AC-4: Tracking System

**AC-4.1** WHEN a visitor clicks an affiliate link (`?ref=CODE`) THE SYSTEM SHALL:
- Validate the affiliate code exists and is active
- Store the affiliate code in a cookie (90-day expiration)
- Record a click event with timestamp, IP hash, user agent, referrer, landing page
- Redirect to the target page (remove ref param from URL for cleaner UX)

**AC-4.2** WHEN a visitor with an affiliate cookie completes a purchase THE SYSTEM SHALL:
- Create a `Conversion` record linking the order to the affiliate
- Calculate commission (30% of order subtotal, excluding taxes/shipping)
- Update affiliate's pending earnings
- Send notification email to affiliate about the conversion

**AC-4.3** AFTER 30 days from a conversion without a refund THE SYSTEM SHALL:
- Move the commission from pending to available balance
- Update affiliate earnings stats

**AC-4.4** IF an order is refunded WHEN the conversion is still in pending status THE SYSTEM SHALL void the conversion and remove the pending commission.

### AC-5: Payouts

**AC-5.1** WHEN an affiliate's available balance >= $50 THE SYSTEM SHALL enable the "Request Payout" button.

**AC-5.2** WHEN an affiliate requests a payout THE SYSTEM SHALL:
- Create a `PayoutRequest` record with status `PENDING`
- Deduct the amount from available balance (set to "processing")
- Notify admin of new payout request

**AC-5.3** WHEN an admin approves a payout request THE SYSTEM SHALL:
- Update status to `PROCESSING`
- Display payment instructions (PayPal email or bank details)
- After admin marks as paid, update status to `COMPLETED` with transaction reference
- Send confirmation email to affiliate

**AC-5.4** THE SYSTEM SHALL support payout methods: PayPal (email) and E-Transfer (email).

### AC-6: Marketing Assets

**AC-6.1** WHEN an affiliate visits `/affiliate/dashboard/assets` THE SYSTEM SHALL display:
- Downloadable banner images (multiple sizes: 300x250, 728x90, 160x600, 1200x628)
- Product images (high-res, approved for affiliate use)
- Pre-written social media posts (copy to clipboard)
- Email templates
- Brand guidelines summary

**AC-6.2** THE SYSTEM SHALL track asset downloads per affiliate for analytics.

### AC-7: Admin Dashboard

**AC-7.1** WHEN an admin visits `/admin/affiliates` THE SYSTEM SHALL display:
- Total active affiliates
- Pending applications count (with link to review)
- Total program earnings (commissions paid)
- Total revenue generated by affiliates
- Top 10 affiliates by earnings
- Recent conversions

**AC-7.2** WHEN an admin visits `/admin/affiliates/applications` THE SYSTEM SHALL display applications list with: name, email, website, audience, traffic source, monthly visitors, date applied, status, action buttons.

**AC-7.3** WHEN an admin visits `/admin/affiliates/[id]` THE SYSTEM SHALL display full affiliate profile: contact info, performance metrics, conversion history, payout history, communication log, status controls (activate/suspend/terminate).

**AC-7.4** WHEN an admin visits `/admin/affiliates/payouts` THE SYSTEM SHALL display:
- Pending payout requests requiring action
- Payout history with filters
- Total paid out this month/year

---

## Non-Functional Requirements

### NFR-1: Performance
- Dashboard shall load within 2 seconds
- Click tracking shall complete within 100ms (non-blocking)
- Stats queries shall be optimized with proper indexing

### NFR-2: Security
- Affiliate passwords hashed with bcrypt (cost factor 12)
- Rate limiting on login (5 attempts per 15 minutes)
- CSRF protection on all forms
- Click tracking shall hash IP addresses (privacy)

### NFR-3: Scalability
- Click tracking should handle 1000+ clicks/minute without degradation
- Consider message queue for high-volume click processing (future)

### NFR-4: Data Integrity
- Conversions linked to orders via foreign key
- Commission calculations auditable (stored, not computed on-fly)
- Payout history immutable after completion

---

## Out of Scope (v1)

- Tiered commission rates (all affiliates get 30%)
- Recurring commissions for subscriptions (not applicable - one-time products)
- Sub-affiliates / MLM structure
- Stripe Connect / automated payouts (manual PayPal/E-Transfer for v1)
- Affiliate API for programmatic access
- Custom landing pages per affiliate
- A/B testing affiliate creatives

---

## Database Considerations

**Recommendation:** Extend existing Prisma/PostgreSQL schema. This maintains consistency with existing referral models and allows easy joins with Order, User tables.

**New models needed:**
- `AffiliateApplication` - Stores submitted applications
- `Affiliate` - Approved affiliate accounts
- `AffiliateClick` - Click tracking events
- `AffiliateConversion` - Successful conversions linked to orders
- `AffiliatePayout` - Payout requests and history
- `AffiliateAssetDownload` - Optional: track asset downloads

**Alternative (MongoDB):** Could use MongoDB for high-volume click tracking if PostgreSQL becomes a bottleneck. Evaluate after v1 based on actual volume.

---

## Success Metrics

1. **Activation Rate:** % of approved affiliates who generate at least 1 click within 30 days (target: >60%)
2. **Conversion Rate:** Clicks to purchases (target: >2%)
3. **Revenue per Affiliate:** Average monthly revenue generated per active affiliate
4. **Payout Velocity:** Average days from conversion to payout completion
5. **Affiliate Retention:** % of affiliates active (>1 click) month-over-month

---

Ready for approval? Reply `y` to proceed to Architecture Design, or `refine [feedback]` to iterate.
