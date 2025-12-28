# Purrify Hub - Operations Dashboard Implementation Plan

## Overview

Consolidate functionality from existing dashboard prototypes into a unified operations dashboard within the `purr` production project. The goal is a clean, professional central operating system for running Purrify - matching the design language of purrify.ca and Purrdash.

**Base Project:** `/Users/macmini/dev/purr` (production Next.js e-commerce with PostgreSQL/Prisma)
**Dashboard Location:** `/admin/ops/*` (new operations dashboard pages)
**Design Language:** Charcoal + Teal (from Purrdash design tokens) - clean, professional, NOT purple/AI/neon

---

## Design System

### Color Palette (from Purrdash design tokens)

```css
/* Primary - Charcoal */
--charcoal-900: #2B2B2B;    /* Headers, primary text */
--charcoal-800: #5a5a5a;    /* Secondary text */
--charcoal-700: #6a6a6a;    /* Tertiary text */
--charcoal-50: #f8f8f8;     /* Light backgrounds */

/* Accent - Teal (Purrify brand) */
--teal-500: #1ABC9C;        /* Primary accent, buttons, links */
--teal-600: #0d9488;        /* Hover states */
--teal-400: #2dd4bf;        /* Highlights */

/* Status Colors */
--success: #27AE60;         /* Green - completed, converted */
--warning: #E67E22;         /* Orange - pending, attention */
--error: #ef4444;           /* Red - errors, urgent */
--info: #3b82f6;            /* Blue - information */

/* Backgrounds */
--bg-primary: #ffffff;      /* Cards, panels (light mode) */
--bg-secondary: #f8fafc;    /* Page background (light mode) */
--bg-dark: #1a1a1a;         /* Dark mode background */
--card-dark: #2B2B2B;       /* Dark mode cards */
```

### Typography
```css
font-family: 'Inter', system-ui, sans-serif;
```

### Component Styling
- **Cards:** Clean white with subtle shadow, 8px radius
- **Buttons:** Teal-500 primary, charcoal secondary
- **Status badges:** Colored backgrounds with matching text
- **Charts:** Teal as primary color, charcoal for labels
- **No neon glows or AI/purple gradients**

---

## Complete Functionality Inventory

### From Purrdash (PRIMARY DESIGN SOURCE)

#### AnimatedMetricCard (`src/components/ui/animated-metric-card.tsx`)
- [x] Animated counters using Framer Motion springs
- [x] Hover lift effect (-8px, scale 1.02)
- [x] Loading skeleton states
- [x] Change indicators (percentage up/down)
- [x] Clean gradient borders on hover

#### EnhancedChart (`src/components/ui/enhanced-chart.tsx`)
- [x] Line, Area, Bar, Pie chart types (Recharts)
- [x] Export functionality (PNG, PDF, CSV)
- [x] Drill-down capability
- [x] Custom Purrify color palette (teal-focused)
- [x] Animated transitions

#### Advanced Filters
- [x] EnhancedDateRangePicker (calendar with presets)
- [x] MultiSelectFilter for regions/categories
- [x] Filter state persistence

#### Data Management (`src/hooks/use-dashboard-data.ts`)
- [x] useDashboardData hook (React Query)
- [x] 30-second stale time
- [x] 60-second refetch interval
- [x] Refetch on window focus

---

### From Autosocial - SOCIAL POSTING

#### ContentCreator
- [x] Text input (direct content)
- [x] URL extraction (fetch and parse)
- [x] Platform Selection Toggles:
  - Facebook (500 char limit)
  - LinkedIn (1300 char limit)
  - Twitter (280 char limit)
  - Instagram (2200 char limit)
  - Blog (5000 char limit)
- [x] Character count with usage percentage
- [x] Platform preview cards

#### RecentSubmissions
- [x] Submission history table
- [x] Platform badges (color-coded)
- [x] Status badges (completed/in-progress/failed)
- [x] Filters and search

---

### From Purrify Marketing - CRM & AUTOMATION

#### Dashboard KPIs
- [x] Total Leads card
- [x] Revenue card
- [x] Website Traffic card
- [x] Conversion Rate card

#### Quick Actions
- [x] Email Campaign launcher
- [x] Social Media manager
- [x] Blog Content creator
- [x] Lead sync trigger

#### BigPushButton
- [x] One-click automation trigger
- [x] Loading states
- [x] Toast notifications

#### Lead Status Workflow
- NEW
- CONTACTED
- SAMPLE_SENT
- FOLLOWING_UP
- CONVERTED
- NOT_INTERESTED
- NO_RESPONSE

---

## Lead Data Structure

**Source CSV:** `/Users/macmini/Library/Mobile Documents/com~apple~CloudDocs/Purrify/Dec16...UPDATED.csv`

### CSV to Database Mapping

| CSV Column | Database Field | Type | Notes |
|------------|---------------|------|-------|
| store_name | companyName | String | Required |
| phone | phone | String? | |
| owner_manager | contactName | String? | |
| notes | notes | String? | Text field |
| status | status | LeadStatus | Enum mapping |
| email_primary | email | String? | |
| email_secondary | emailSecondary | String? | |
| email_quality | emailQuality | String? | |
| email_result | emailResult | String? | |
| email_is_free | emailIsFree | Boolean? | |
| email_is_role | emailIsRole | Boolean? | |
| street | street | String? | |
| city | city | String? | Indexed |
| province | province | String? | |
| postal_code | postalCode | String? | |
| neighborhood | neighborhood | String? | |
| website | website | String? | |
| facebook | facebook | String? | |
| instagram | instagram | String? | |
| tiktok | tiktok | String? | |
| youtube | youtube | String? | |
| twitter | twitter | String? | |
| opening_hours | openingHours | String? | JSON or text |
| category | category | String? | |
| sent status | sentStatus | String? | Email campaign status |

---

## Implementation Architecture

### New Files to Create in `/Users/macmini/dev/purr`

```
pages/admin/ops/
├── index.tsx              # Main dashboard
├── leads.tsx              # Lead management table
├── retailers.tsx          # Retailer management
├── orders.tsx             # Order overview
└── social.tsx             # Social media posting

pages/api/admin/ops/
├── stats.ts               # Dashboard KPIs
├── leads/
│   ├── index.ts           # GET/POST leads
│   ├── [id].ts            # GET/PUT/DELETE single lead
│   ├── import.ts          # CSV import
│   └── sync.ts            # Google Sheets sync
├── retailers/
│   └── [id]/
│       └── approve.ts     # Approve retailer
└── social/
    ├── post.ts            # Create social post
    └── submissions.ts     # Get submission history

src/components/admin/ops/
├── OpsLayout.tsx          # Operations layout
├── AnimatedMetricCard.tsx # Metric cards with animations
├── EnhancedChart.tsx      # Charts with export
├── ContentCreator.tsx     # Social content creator
├── LeadTable.tsx          # Lead management table
├── LeadStatusBadge.tsx    # Status badges
├── QuickActions.tsx       # Action buttons grid
└── RecentActivity.tsx     # Activity feed

src/lib/
├── google-sheets.ts       # Google Sheets API client
└── lead-sync.ts           # Lead sync logic

src/hooks/
├── use-ops-data.ts        # Operations dashboard data hook
└── use-social-posting.ts  # Social posting hook
```

### Prisma Schema Addition

```prisma
// Add to prisma/schema.prisma

model Lead {
  id              String      @id @default(cuid())
  companyName     String
  phone           String?
  contactName     String?
  notes           String?     @db.Text
  status          LeadStatus  @default(NEW)
  email           String?
  emailSecondary  String?
  emailQuality    String?
  emailResult     String?
  emailIsFree     Boolean?
  emailIsRole     Boolean?
  street          String?
  city            String?
  province        String?
  postalCode      String?
  neighborhood    String?
  website         String?
  facebook        String?
  instagram       String?
  tiktok          String?
  youtube         String?
  twitter         String?
  openingHours    String?     @db.Text
  category        String?
  sentStatus      String?
  source          String?     // csv-import, google-sheets, manual
  lastContact     DateTime?
  lastSyncedAt    DateTime?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  @@unique([companyName, city])
  @@index([status])
  @@index([city])
  @@index([province])
  @@index([category])
  @@index([createdAt])
  @@map("leads")
}

model SocialPost {
  id            String          @id @default(cuid())
  content       String          @db.Text
  platforms     String[]
  status        SocialPostStatus @default(DRAFT)
  scheduledAt   DateTime?
  publishedAt   DateTime?
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt

  @@index([status])
  @@index([scheduledAt])
  @@map("social_posts")
}

enum LeadStatus {
  NEW
  CONTACTED
  SAMPLE_SENT
  FOLLOWING_UP
  CONVERTED
  NOT_INTERESTED
  NO_RESPONSE
}

enum SocialPostStatus {
  DRAFT
  SCHEDULED
  PUBLISHED
  FAILED
}
```

---

## Phase-by-Phase Implementation

### Phase 1: Foundation
1. Add Lead and SocialPost models to Prisma schema
2. Run migration: `npx prisma migrate dev --name add-ops-models`
3. Create OpsLayout component (extend existing AdminLayout)
4. Create basic `/admin/ops` index page with navigation
5. Set up route protection with existing auth

### Phase 2: Lead Management
1. Create LeadTable component with:
   - DataTable with sorting, filtering, pagination
   - Status badges with colors
   - Quick edit inline
   - Bulk actions (change status)
2. Create CSV import API route
3. Import existing leads from CSV
4. Create lead detail modal/drawer

### Phase 3: Dashboard KPIs
1. Port AnimatedMetricCard from Purrdash (restyle with charcoal/teal)
2. Port EnhancedChart from Purrdash
3. Create stats API route
4. Build dashboard page with:
   - Lead count by status
   - Conversion funnel
   - Activity over time chart
   - Region distribution

### Phase 4: Social Posting
1. Port ContentCreator from autosocial
2. Create social post API routes
3. Add platform character limits
4. Create submission history
5. Add platform preview cards

### Phase 5: Google Sheets Sync
1. Set up Google Sheets API credentials
2. Create sync API route
3. Implement bidirectional sync logic
4. Add sync status indicator to UI

### Phase 6: Integration & Polish
1. Connect quick action buttons to real endpoints
2. Add keyboard shortcuts (Ctrl+R refresh, etc.)
3. Add loading states and error handling
4. Mobile responsive adjustments
5. Final testing

---

## Components to Port

### From Purrdash → purr

| Source File | Destination | Changes Needed |
|-------------|------------|----------------|
| `animated-metric-card.tsx` | `src/components/admin/ops/AnimatedMetricCard.tsx` | Remove purple, use teal/charcoal |
| `enhanced-chart.tsx` | `src/components/admin/ops/EnhancedChart.tsx` | Update color palette |
| `use-dashboard-data.ts` | `src/hooks/use-ops-data.ts` | Adapt to purr's React Query setup |

### From Autosocial → purr

| Source File | Destination | Changes Needed |
|-------------|------------|----------------|
| `ContentCreator.tsx` | `src/components/admin/ops/ContentCreator.tsx` | Match purr styling |

---

## Environment Variables to Add

```env
# Google Sheets Sync
GOOGLE_SHEETS_ID=your-sheet-id
GOOGLE_API_KEY=your-api-key
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"

# Social Media APIs (future)
FACEBOOK_ACCESS_TOKEN=
INSTAGRAM_ACCESS_TOKEN=
TWITTER_API_KEY=
LINKEDIN_ACCESS_TOKEN=

# Automation (future)
MAKE_WEBHOOK_URL=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

---

## Success Metrics

1. **Lead Import**: Successfully import all CSV leads
2. **Dashboard Load**: < 1 second initial load
3. **Data Sync**: Google Sheets sync within 15 minutes
4. **UI Consistency**: Matches purrify.ca/Purrdash design language
5. **Social Posting**: Successfully create posts for all platforms
6. **Mobile**: Responsive on all screen sizes
7. **Dark Mode**: Full dark mode support (required by purr)

---

## Future Enhancements (Post-MVP)

1. Real-time WebSocket server (replace mock)
2. Email campaigns via Resend
3. Competitor scraping via Apify/Python
4. Multi-user roles for employees
5. Audit logging for all operations
6. Export functionality (PDF reports, CSV downloads)
7. Dashboard customization (drag-drop widgets)

---

## Notes


- **NO purple/AI/neon design** - use clean charcoal + teal palette
- **Match purrify.ca and Purrdash** aesthetic
- All pages MUST have dark mode variants (purr requirement)
- Use existing purr auth system (NextAuth.js)
- Follow purr's existing patterns for API routes and components

---

*This plan consolidates Purrdash, autosocial, and Purrify Marketing into a single operations dashboard within the purr project, using the established Purrify brand design language.*
