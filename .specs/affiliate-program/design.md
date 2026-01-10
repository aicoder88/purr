# Affiliate Program - Architecture Design

## Overview

This document defines the technical architecture for the Purrify affiliate program, following existing codebase patterns (Retailer model, admin ops pages, Prisma schema conventions).

---

## 1. Data Models (Prisma Schema)

### 1.1 AffiliateApplication

Stores pending applications before approval.

```prisma
model AffiliateApplication {
  id              String                      @id @default(cuid())
  name            String
  email           String                      @unique
  website         String?
  audience        String                      // Target audience description
  trafficSource   String                      // blog, youtube, instagram, etc.
  monthlyVisitors String                      // 0-1000, 1000-5000, etc.
  experience      String                      // beginner, intermediate, advanced
  message         String?                     @db.Text
  status          AffiliateApplicationStatus  @default(PENDING)
  reviewedAt      DateTime?
  reviewedBy      String?                     // Admin user ID
  rejectionReason String?
  createdAt       DateTime                    @default(now())
  updatedAt       DateTime                    @updatedAt

  @@index([status])
  @@index([createdAt])
  @@index([email])
  @@map("affiliate_applications")
}

enum AffiliateApplicationStatus {
  PENDING
  APPROVED
  REJECTED
}
```

### 1.2 Affiliate

Approved affiliate accounts with credentials.

```prisma
model Affiliate {
  id              String          @id @default(cuid())
  code            String          @unique    // e.g., "JOHN-A1B2"
  name            String
  email           String          @unique
  passwordHash    String                     // bcrypt hashed
  website         String?
  status          AffiliateStatus @default(ACTIVE)
  // Stats (denormalized for dashboard performance)
  totalClicks     Int             @default(0)
  totalConversions Int            @default(0)
  totalEarnings   Float           @default(0)
  pendingEarnings Float           @default(0)
  availableBalance Float          @default(0)
  // Payment info
  payoutMethod    PayoutMethod    @default(PAYPAL)
  payoutEmail     String?                    // PayPal email or E-Transfer email
  // Metadata
  applicationId   String?         @unique    // Link to original application
  lastLoginAt     DateTime?
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt
  // Relations
  clicks          AffiliateClick[]
  conversions     AffiliateConversion[]
  payouts         AffiliatePayout[]

  @@index([code])
  @@index([status])
  @@index([email])
  @@map("affiliates")
}

enum AffiliateStatus {
  ACTIVE
  SUSPENDED
  TERMINATED
}

enum PayoutMethod {
  PAYPAL
  ETRANSFER
}
```

### 1.3 AffiliateClick

Tracks clicks on affiliate links.

```prisma
model AffiliateClick {
  id          String    @id @default(cuid())
  affiliateId String
  affiliate   Affiliate @relation(fields: [affiliateId], references: [id], onDelete: Cascade)
  // Tracking data
  ipHash      String                // SHA256 of IP (privacy)
  userAgent   String?   @db.Text
  referrer    String?               // Where click came from
  landingPage String                // Which page they landed on
  // Session tracking
  sessionId   String                // For attributing conversion
  convertedAt DateTime?             // If this click led to purchase
  orderId     String?               // Order if converted
  createdAt   DateTime  @default(now())

  @@index([affiliateId])
  @@index([sessionId])
  @@index([createdAt])
  @@index([convertedAt])
  @@map("affiliate_clicks")
}
```

### 1.4 AffiliateConversion

Tracks successful conversions (purchases).

```prisma
model AffiliateConversion {
  id              String            @id @default(cuid())
  affiliateId     String
  affiliate       Affiliate         @relation(fields: [affiliateId], references: [id], onDelete: Cascade)
  orderId         String            @unique
  orderSubtotal   Float                       // Order subtotal (excl. tax/shipping)
  commissionRate  Float             @default(0.30)  // 30%
  commissionAmount Float                      // Calculated commission
  status          ConversionStatus  @default(PENDING)
  // Timing
  purchasedAt     DateTime          @default(now())
  clearedAt       DateTime?                   // When moved to available (30 days)
  voidedAt        DateTime?                   // If refunded
  voidReason      String?
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt

  @@index([affiliateId])
  @@index([status])
  @@index([purchasedAt])
  @@index([orderId])
  @@map("affiliate_conversions")
}

enum ConversionStatus {
  PENDING    // Within 30-day hold period
  CLEARED    // Available for payout
  VOIDED     // Refunded or cancelled
  PAID       // Included in a payout
}
```

### 1.5 AffiliatePayout

Tracks payout requests and history.

```prisma
model AffiliatePayout {
  id              String        @id @default(cuid())
  affiliateId     String
  affiliate       Affiliate     @relation(fields: [affiliateId], references: [id], onDelete: Cascade)
  amount          Float
  method          PayoutMethod
  payoutEmail     String                    // Email used for this payout
  status          PayoutStatus  @default(PENDING)
  // Processing
  requestedAt     DateTime      @default(now())
  processedAt     DateTime?
  processedBy     String?                   // Admin who processed
  transactionRef  String?                   // PayPal/E-Transfer reference
  notes           String?       @db.Text
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  @@index([affiliateId])
  @@index([status])
  @@index([requestedAt])
  @@map("affiliate_payouts")
}

enum PayoutStatus {
  PENDING     // Requested, awaiting processing
  PROCESSING  // Admin is processing
  COMPLETED   // Payout sent
  REJECTED    // Rejected by admin
}
```

---

## 2. API Routes

### 2.1 Public APIs

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/affiliate/signup` | Submit application (exists - enhance to save to DB) |
| GET | `/api/affiliate/track` | Track click, set cookie, redirect |
| POST | `/api/auth/[...nextauth]` | NextAuth handles login/logout (add affiliate credentials provider) |

*Note: Password reset uses NextAuth's built-in email provider or a simple token-based reset endpoint.*

### 2.2 Affiliate Dashboard APIs (Protected)

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/affiliate/dashboard/stats` | Get affiliate stats summary |
| GET | `/api/affiliate/dashboard/clicks` | Get click history with pagination |
| GET | `/api/affiliate/dashboard/conversions` | Get conversion history |
| GET | `/api/affiliate/dashboard/payouts` | Get payout history |
| POST | `/api/affiliate/dashboard/payout-request` | Request a payout |
| GET | `/api/affiliate/dashboard/links` | Get all tracking links |
| PUT | `/api/affiliate/dashboard/settings` | Update profile/payment settings |

### 2.3 Admin APIs (Protected - Admin only)

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/admin/affiliates` | List all affiliates |
| GET | `/api/admin/affiliates/[id]` | Get single affiliate details |
| PUT | `/api/admin/affiliates/[id]` | Update affiliate (status, etc.) |
| GET | `/api/admin/affiliates/applications` | List applications |
| POST | `/api/admin/affiliates/applications/[id]/approve` | Approve application |
| POST | `/api/admin/affiliates/applications/[id]/reject` | Reject application |
| GET | `/api/admin/affiliates/payouts` | List payout requests |
| POST | `/api/admin/affiliates/payouts/[id]/process` | Process payout |
| GET | `/api/admin/affiliates/stats` | Program-wide analytics |

### 2.4 Webhook/Internal APIs

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/webhooks/affiliate-conversion` | Called after successful order to attribute conversion |

*Note: No cron needed - conversions are cleared lazily when affiliate views dashboard.*

---

## 3. Page Routes

### 3.1 Public Pages

| Route | Purpose |
|-------|---------|
| `/affiliate` | Marketing landing page (exists) |
| `/affiliate/signup` | Application form (exists) |
| `/affiliate/login` | Affiliate login page (uses NextAuth signIn) |

### 3.2 Affiliate Dashboard Pages

| Route | Purpose |
|-------|---------|
| `/affiliate/dashboard` | Main dashboard with stats overview |
| `/affiliate/dashboard/links` | Link generator and management |
| `/affiliate/dashboard/stats` | Detailed performance analytics |
| `/affiliate/dashboard/payouts` | Payout history and requests |
| `/affiliate/dashboard/assets` | Marketing materials download |
| `/affiliate/dashboard/settings` | Profile and payment settings |

### 3.3 Admin Pages

| Route | Purpose |
|-------|---------|
| `/admin/ops/affiliates` | Affiliate management list |
| `/admin/ops/affiliates/applications` | Application review queue |
| `/admin/ops/affiliates/[id]` | Individual affiliate details |
| `/admin/ops/affiliates/payouts` | Payout processing queue |

---

## 4. Component Architecture

### 4.1 Shared Components

```
src/components/affiliate/
├── AffiliateLayout.tsx          # Dashboard layout wrapper
├── AffiliateSidebar.tsx         # Dashboard navigation
├── StatsCard.tsx                # Metric display card
├── ClicksTable.tsx              # Paginated clicks table
├── ConversionsTable.tsx         # Paginated conversions table
├── PayoutsTable.tsx             # Paginated payouts table
├── LinkGenerator.tsx            # Generate tracking links
├── QRCodeGenerator.tsx          # QR code for links
├── PerformanceChart.tsx         # Recharts-based chart
└── PayoutRequestModal.tsx       # Payout request form
```

### 4.2 Admin Components

```
src/components/admin/affiliates/
├── ApplicationCard.tsx          # Application review card
├── AffiliateRow.tsx             # Table row for affiliate list
├── PayoutRequestCard.tsx        # Payout approval card
├── AffiliateStatsOverview.tsx   # Program-wide stats
└── AffiliateDetailPanel.tsx     # Full affiliate info panel
```

---

## 5. Authentication Flow

### 5.1 Affiliate Authentication

**Use NextAuth Credentials provider** (already in use for admin, free).

```
┌─────────────────────────────────────────────────────────────┐
│              Affiliate Auth via NextAuth                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Add Credentials provider for affiliates in [...nextauth] │
│     - id: "affiliate-credentials"                            │
│     - Validate against Affiliate.passwordHash                │
│     - Return affiliate data with role: "affiliate"           │
│                                                              │
│  2. Session includes:                                        │
│     - user.id (affiliateId)                                  │
│     - user.email                                             │
│     - user.role = "affiliate"                                │
│     - user.affiliateCode                                     │
│                                                              │
│  3. Middleware: withAffiliateAuth                            │
│     → Use getServerSession()                                 │
│     → Check session.user.role === "affiliate"                │
│     → Attach affiliate to request                            │
│                                                              │
│  4. Logout via NextAuth signOut()                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 NextAuth Configuration Addition

```typescript
// In [...nextauth].ts - add to providers array
CredentialsProvider({
  id: "affiliate-credentials",
  name: "Affiliate Login",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" }
  },
  async authorize(credentials) {
    const affiliate = await prisma.affiliate.findUnique({
      where: { email: credentials.email }
    });
    if (!affiliate || affiliate.status !== "ACTIVE") return null;
    const valid = await bcrypt.compare(credentials.password, affiliate.passwordHash);
    if (!valid) return null;
    return {
      id: affiliate.id,
      email: affiliate.email,
      name: affiliate.name,
      role: "affiliate",
      affiliateCode: affiliate.code
    };
  }
})
```

---

## 6. Click Tracking Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Click Tracking Flow                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Visitor clicks: purrify.ca/?ref=JOHN-A1B2                │
│                                                              │
│  2. Middleware intercepts ?ref= parameter                    │
│     → Validate code exists and affiliate is ACTIVE           │
│     → Generate sessionId (UUID)                              │
│     → Set cookies:                                           │
│       - affiliate_ref: "JOHN-A1B2" (90 days)                 │
│       - affiliate_session: sessionId (90 days)               │
│     → Record click in AffiliateClick table                   │
│     → Redirect to same URL without ?ref= (clean URL)         │
│                                                              │
│  3. On purchase (Stripe webhook success):                    │
│     → Check for affiliate_ref cookie                         │
│     → If exists: create AffiliateConversion                  │
│     → Update affiliate stats                                 │
│     → Send email notification to affiliate                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. Conversion Attribution Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  Conversion Attribution                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Stripe Webhook: checkout.session.completed                  │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────┐                    │
│  │ Check cookies from checkout session │                    │
│  │ (passed via metadata)               │                    │
│  └─────────────────────────────────────┘                    │
│                          │                                   │
│            ┌─────────────┴─────────────┐                    │
│            │                           │                    │
│      Has affiliate_ref?          No affiliate               │
│            │                           │                    │
│            ▼                           ▼                    │
│  ┌─────────────────────┐     ┌──────────────────┐          │
│  │ Create conversion   │     │ Regular order    │          │
│  │ - Link to affiliate │     │ (no conversion)  │          │
│  │ - Calculate 30%     │     └──────────────────┘          │
│  │ - Status: PENDING   │                                    │
│  │ - Update stats      │                                    │
│  │ - Email affiliate   │                                    │
│  └─────────────────────┘                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. Payout Flow (Lazy Clearing - No Cron)

```
┌─────────────────────────────────────────────────────────────┐
│                 Payout Flow (Lazy Clearing)                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  When affiliate views dashboard OR requests payout:          │
│  → clearPendingConversions(affiliateId) is called            │
│  → Find conversions where:                                   │
│       status = PENDING AND purchasedAt < (now - 30 days)     │
│  → Update status: PENDING → CLEARED                          │
│  → Recalculate: pendingEarnings & availableBalance           │
│  → Update affiliate record with new balances                 │
│                                                              │
│  Affiliate requests payout:                                  │
│  → First run clearPendingConversions()                       │
│  → Check availableBalance >= $50                             │
│  → Create AffiliatePayout (PENDING)                          │
│  → Deduct from availableBalance                              │
│  → Notify admin                                              │
│                                                              │
│  Admin processes payout:                                     │
│  → Update status: PENDING → PROCESSING → COMPLETED           │
│  → Record transactionRef                                     │
│  → Email confirmation to affiliate                           │
│                                                              │
│  Benefit: No cron needed, conversions clear on-demand        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 8.1 Lazy Clearing Function

```typescript
// src/lib/affiliate/clearing.ts
async function clearPendingConversions(affiliateId: string) {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  // Update all eligible conversions
  await prisma.affiliateConversion.updateMany({
    where: {
      affiliateId,
      status: 'PENDING',
      purchasedAt: { lt: thirtyDaysAgo }
    },
    data: {
      status: 'CLEARED',
      clearedAt: new Date()
    }
  });

  // Recalculate balances from conversions
  const [pending, cleared] = await Promise.all([
    prisma.affiliateConversion.aggregate({
      where: { affiliateId, status: 'PENDING' },
      _sum: { commissionAmount: true }
    }),
    prisma.affiliateConversion.aggregate({
      where: { affiliateId, status: 'CLEARED' },
      _sum: { commissionAmount: true }
    })
  ]);

  // Update affiliate balances
  await prisma.affiliate.update({
    where: { id: affiliateId },
    data: {
      pendingEarnings: pending._sum.commissionAmount || 0,
      availableBalance: cleared._sum.commissionAmount || 0
    }
  });
}
```

---

## 9. Email Notifications

| Event | Recipient | Template |
|-------|-----------|----------|
| Application submitted | Admin | `affiliate-application-received` |
| Application submitted | Applicant | `affiliate-application-confirmation` |
| Application approved | Affiliate | `affiliate-welcome` (includes credentials) |
| Application rejected | Applicant | `affiliate-rejection` |
| New conversion | Affiliate | `affiliate-new-conversion` |
| Conversion cleared | Affiliate | `affiliate-conversion-cleared` |
| Payout requested | Admin | `affiliate-payout-requested` |
| Payout completed | Affiliate | `affiliate-payout-completed` |

---

## 10. Security Considerations

### 10.1 Password Security
- Hash with bcrypt (cost factor 12)
- Minimum 8 characters
- Password reset tokens expire in 1 hour

### 10.2 Rate Limiting
- Login: 5 attempts per 15 minutes per IP
- Password reset: 3 requests per hour per email
- Click tracking: No limit (performance critical)

### 10.3 Data Privacy
- IP addresses hashed (SHA256) before storage
- Affiliate cannot see customer PII
- Only order subtotal visible, not full order details

### 10.4 CSRF Protection
- All POST/PUT/DELETE endpoints require CSRF token
- Use existing `withCSRFProtection` middleware

---

## 11. File Structure

```
pages/
├── affiliate/
│   ├── index.tsx                    # Landing (exists)
│   ├── signup.tsx                   # Application (exists)
│   ├── login.tsx                    # NEW - Uses NextAuth signIn()
│   └── dashboard/
│       ├── index.tsx                # NEW - Main dashboard
│       ├── links.tsx                # NEW
│       ├── stats.tsx                # NEW
│       ├── payouts.tsx              # NEW
│       ├── assets.tsx               # NEW
│       └── settings.tsx             # NEW
├── admin/
│   └── ops/
│       └── affiliates/
│           ├── index.tsx            # NEW - Affiliate list
│           ├── applications.tsx     # NEW - Application queue
│           ├── [id].tsx             # NEW - Affiliate detail
│           └── payouts.tsx          # NEW - Payout queue
└── api/
    ├── auth/
    │   └── [...nextauth].ts         # MODIFY - Add affiliate credentials provider
    ├── affiliate/
    │   ├── signup.ts                # EXISTS - Enhance to save to DB
    │   ├── track.ts                 # NEW - Click tracking endpoint
    │   └── dashboard/
    │       ├── stats.ts             # NEW
    │       ├── clicks.ts            # NEW
    │       ├── conversions.ts       # NEW
    │       ├── payouts.ts           # NEW
    │       ├── payout-request.ts    # NEW
    │       ├── links.ts             # NEW
    │       └── settings.ts          # NEW
    ├── admin/
    │   └── affiliates/
    │       ├── index.ts             # NEW
    │       ├── [id].ts              # NEW
    │       ├── applications/
    │       │   ├── index.ts         # NEW
    │       │   └── [id]/
    │       │       ├── approve.ts   # NEW
    │       │       └── reject.ts    # NEW
    │       └── payouts/
    │           ├── index.ts         # NEW
    │           └── [id]/
    │               └── process.ts   # NEW
    └── webhooks/
        └── stripe.ts                # MODIFY - Add affiliate conversion tracking

src/
├── components/
│   └── affiliate/
│       ├── AffiliateLayout.tsx      # NEW
│       ├── AffiliateSidebar.tsx     # NEW
│       ├── StatsCard.tsx            # NEW
│       ├── LinkGenerator.tsx        # NEW
│       ├── PerformanceChart.tsx     # NEW
│       └── PayoutRequestModal.tsx   # NEW
├── lib/
│   └── affiliate/
│       ├── tracking.ts              # NEW - Click/conversion utils
│       ├── clearing.ts              # NEW - Lazy clearing of pending conversions
│       ├── code-generator.ts        # NEW - Generate affiliate codes
│       └── middleware.ts            # NEW - withAffiliateAuth (uses NextAuth session)
└── translations/
    └── *.ts                         # Add affiliate dashboard strings
```

---

## 12. Integration Points

### 12.1 Existing Stripe Webhook Enhancement

Modify `/api/webhooks/stripe.ts` to check for affiliate cookie and create conversion.

### 12.2 Checkout Flow Enhancement

Pass affiliate cookie data through Stripe checkout metadata so it's available in webhook.

### 12.3 Order Model Enhancement

Add optional `affiliateCode` field to Order model for audit trail.

---

## 13. Marketing Assets Storage

Store in `/public/affiliate-assets/`:
```
public/
└── affiliate-assets/
    ├── banners/
    │   ├── 300x250.png
    │   ├── 728x90.png
    │   ├── 160x600.png
    │   └── 1200x628.png
    ├── logos/
    │   ├── purrify-logo-light.png
    │   └── purrify-logo-dark.png
    └── products/
        ├── product-hero.png
        └── product-lifestyle.png
```

---

Ready for approval? Reply `y` to proceed to Implementation Plan, or `refine [feedback]` to iterate.
