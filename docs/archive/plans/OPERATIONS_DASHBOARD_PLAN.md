# Purrify Operations Dashboard
## Simple Extension to purr Project

---

## Goal

Add a simple operations dashboard to the existing `purr` project for daily business management. No new infrastructure - just new pages using existing database and components.

---

## What You Already Have (No Changes Needed)

| Asset | Location | Status |
|-------|----------|--------|
| Database (PostgreSQL + Prisma) | `prisma/schema.prisma` | Working |
| Auth (NextAuth with roles) | `pages/api/auth/` | Working |
| UI Components (55+ shadcn) | `src/components/ui/` | Working |
| Admin Layout | `src/components/admin/AdminLayout.tsx` | Working |
| Lead CSV data | `/Users/macmini/dev/clean/*.csv` | Ready to import |
| Scraper tool | `/Users/macmini/dev/scraper/` | Working CLI |
| Enrich tool | `/Users/macmini/dev/enrich/` | Working CLI |

---

## What to Add

### New Database Model (1 table)

Add to `prisma/schema.prisma`:

```prisma
model Lead {
  id           String      @id @default(cuid())
  companyName  String
  website      String?
  email        String?
  phone        String?
  address      String?
  city         String?
  province     String?
  contactName  String?
  status       LeadStatus  @default(NEW)
  source       String?     // csv-import, scraper, manual
  notes        String?     @db.Text
  lastContact  DateTime?
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt

  @@index([status])
  @@index([city])
  @@index([createdAt])
  @@map("leads")
}

enum LeadStatus {
  NEW
  CONTACTED
  SAMPLE_SENT
  FOLLOWING_UP
  CONVERTED      // Became a Retailer
  NOT_INTERESTED
  NO_RESPONSE
}
```

### New Pages (4 pages)

```
pages/admin/ops/
├── index.tsx        # Dashboard overview
├── leads.tsx        # Lead management
├── retailers.tsx    # Retailer management (uses existing Retailer model)
└── orders.tsx       # Order overview (uses existing Order models)
```

### New Layout Component

```
src/components/admin/
└── OpsLayout.tsx    # Similar to AdminLayout but for operations
```

---

## Implementation Steps

### Step 1: Add Lead Model to Database

```bash
# In /Users/macmini/dev/purr/
# 1. Add Lead model to prisma/schema.prisma
# 2. Run migration
npx prisma migrate dev --name add-leads
```

### Step 2: Create OpsLayout Component

Create `src/components/admin/OpsLayout.tsx` - copy AdminLayout and modify tabs:

```tsx
const tabs = [
  { name: 'Overview', href: '/admin/ops', icon: LayoutDashboard },
  { name: 'Leads', href: '/admin/ops/leads', icon: Users },
  { name: 'Retailers', href: '/admin/ops/retailers', icon: Store },
  { name: 'Orders', href: '/admin/ops/orders', icon: ShoppingCart },
];
```

### Step 3: Create Overview Dashboard

`pages/admin/ops/index.tsx`:

```tsx
// Simple KPI cards showing:
// - Total Leads (by status)
// - Active Retailers
// - Recent Orders
// - Revenue this month
```

### Step 4: Create Leads Page

`pages/admin/ops/leads.tsx`:

```tsx
// - Table of leads with status badges
// - Filter by status, city
// - Click to edit/update status
// - Import CSV button (reuse your clean/*.csv data)
```

### Step 5: Create Retailers Page

`pages/admin/ops/retailers.tsx`:

```tsx
// - Uses existing Retailer model
// - Show status (PENDING, ACTIVE, etc.)
// - Approve/reject pending retailers
// - View order history
```

### Step 6: Create Orders Page

`pages/admin/ops/orders.tsx`:

```tsx
// - Combined view of Order + RetailerOrder
// - Filter by status
// - Quick actions (mark shipped, etc.)
```

### Step 7: Add CSV Import API

`pages/api/admin/leads/import.ts`:

```tsx
// - Accept CSV upload
// - Parse and insert into Lead table
// - Dedupe by email/company name
```

### Step 8: Update AdminLayout Navigation

Add link to Operations in the header or create a top-level switch.

---

## File Structure After Implementation

```
pages/admin/
├── blog/                 # Existing blog admin
│   ├── index.tsx
│   ├── new.tsx
│   └── ...
├── ops/                  # NEW: Operations dashboard
│   ├── index.tsx         # Overview with KPIs
│   ├── leads.tsx         # Lead management
│   ├── retailers.tsx     # Retailer management
│   └── orders.tsx        # Order management
├── login.tsx             # Existing
└── referral-analytics.tsx # Existing

pages/api/admin/
├── blog/                 # Existing blog APIs
└── ops/                  # NEW: Operations APIs
    ├── leads/
    │   ├── index.ts      # GET/POST leads
    │   ├── [id].ts       # GET/PUT/DELETE single lead
    │   └── import.ts     # CSV import
    ├── stats.ts          # Dashboard stats
    └── retailers/
        └── [id]/
            └── approve.ts # Approve retailer
```

---

## Design Approach

Keep the existing AdminLayout style but with purple/indigo theme for Operations:

```tsx
// Simple, clean cards
<Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
  <CardHeader>
    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-50">
      Leads by Status
    </CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

If you want the neon effects from purrify-clean, add these to `src/index.css`:

```css
/* Optional: Neon glow effects */
.glow-purple { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
.gradient-text {
  background: linear-gradient(45deg, #8b5cf6, #ec4899, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## What This Gives You

### Day 1 (After Implementation)
- View all leads in one place
- Import your existing CSV leads
- See retailer applications
- Track orders

### Day 2+ (Future Additions)
- Bulk email from lead list
- Connect scraper output directly
- Auto-enrich new leads
- Sales pipeline view

---

## Reusing From Other Projects

| Feature | Source Project | What to Copy |
|---------|---------------|--------------|
| Neon CSS effects | `purrify-clean` | `globals.css` animations |
| Lead table design | `Purrify Marketing` | Leads page layout |
| Stats cards | `Purrdash` | MetricCard component |

But honestly, your existing `purr` UI components are good enough. Keep it simple.

---

## Commands to Get Started

```bash
cd /Users/macmini/dev/purr

# 1. Add Lead model to schema (manual edit)

# 2. Create migration
npx prisma migrate dev --name add-leads-table

# 3. Create the pages (I can help with this)

# 4. Test locally
npm run dev
# Visit http://localhost:3000/admin/ops
```

---

## Questions Before Starting

1. **Do you want the neon/glassmorphic design from purrify-clean, or keep the clean AdminLayout style?**

2. **What CSV columns do your lead files have?** (So I can map them correctly)

3. **Should the ops dashboard be at `/admin/ops` or a separate `/ops` route?**

---

*This plan focuses on getting a working operations dashboard quickly by reusing everything you already have.*
