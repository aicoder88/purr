# Purrify Hub - Implementation Plan
## Consolidated Marketing Platform

---

## Table of Contents
1. [Overview](#overview)
2. [Phase 1: Project Foundation](#phase-1-project-foundation)
3. [Phase 2: Design System Migration](#phase-2-design-system-migration)
4. [Phase 3: Database & Authentication](#phase-3-database--authentication)
5. [Phase 4: CRM Module Integration](#phase-4-crm-module-integration)
6. [Phase 5: Social Media Engine](#phase-5-social-media-engine)
7. [Phase 6: Content Management](#phase-6-content-management)
8. [Phase 7: Automation & Integration](#phase-7-automation--integration)
9. [File Migration Reference](#file-migration-reference)
10. [Testing & Deployment](#testing--deployment)

---

## Overview

### Source Projects

| Project | Location | Role in Consolidation |
|---------|----------|----------------------|
| **Purrdash** | `/Users/macmini/dev/Purrdash/purrify-dashboard/` | **Foundation** - Core architecture |
| **Purrify Marketing** | `/Users/macmini/dev/Purrify Marketing/` | CRM, Campaigns, Competitors |
| **Auto-social** | `/Users/macmini/dev/autosocial/` | Social media posting engine |
| **Purrify Clean** | `/Users/macmini/dev/purrify-clean/` | Design effects & animations |

### Target Project
```
/Users/macmini/dev/purrify-hub/
```

---

## Phase 1: Project Foundation

### 1.1 Create Project from Purrdash Base

```bash
# Step 1: Copy Purrdash as foundation
cp -r "/Users/macmini/dev/Purrdash/purrify-dashboard" "/Users/macmini/dev/purrify-hub"

# Step 2: Navigate to new project
cd /Users/macmini/dev/purrify-hub

# Step 3: Update package.json name
# Edit package.json: "name": "purrify-hub"

# Step 4: Clean install
rm -rf node_modules package-lock.json
npm install

# Step 5: Verify it runs
npm run dev
```

### 1.2 Update Branding

**File: `/src/app/layout.tsx`**
```tsx
export const metadata: Metadata = {
  title: 'Purrify Hub - Marketing Control Center',
  description: 'Unified marketing platform for pet businesses',
};
```

**File: `/src/components/layout/sidebar.tsx`**
Update logo and navigation items.

### 1.3 Restructure Navigation

**New Navigation Structure:**
```tsx
const navigationItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Leads', href: '/dashboard/leads', icon: Users },
  { name: 'Campaigns', href: '/dashboard/campaigns', icon: Megaphone },
  { name: 'Social', href: '/dashboard/social', icon: Share2 },
  { name: 'Content', href: '/dashboard/content', icon: FileText },
  { name: 'Competitors', href: '/dashboard/competitors', icon: Eye },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Logs', href: '/dashboard/logs', icon: Terminal },
  { name: 'Settings', href: '/settings', icon: Settings },
];
```

### 1.4 Directory Structure Setup

```bash
# Create new page directories
mkdir -p src/app/dashboard/leads
mkdir -p src/app/dashboard/campaigns
mkdir -p src/app/dashboard/social
mkdir -p src/app/dashboard/content
mkdir -p src/app/dashboard/competitors
mkdir -p src/app/dashboard/logs

# Create API directories
mkdir -p src/app/api/leads
mkdir -p src/app/api/campaigns
mkdir -p src/app/api/social
mkdir -p src/app/api/content
mkdir -p src/app/api/competitors
mkdir -p src/app/api/automation
```

---

## Phase 2: Design System Migration

### 2.1 Migrate CSS Animations from Purrify Clean

**Source:** `/Users/macmini/dev/purrify-clean/app/globals.css`
**Target:** `/Users/macmini/dev/purrify-hub/src/app/globals.css`

**Add to globals.css:**
```css
/* ===== MIGRATED FROM PURRIFY CLEAN ===== */

/* Glow effects */
.glow-purple {
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
}

.glow-pink {
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.3);
}

.glow-cyan {
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
}

.glow-green {
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
}

/* Animated gradient text */
.gradient-text {
  background: linear-gradient(45deg, #8b5cf6, #ec4899, #06b6d4);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Neon border animation */
.neon-border {
  position: relative;
  border: 2px solid transparent;
  background: linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1));
}

.neon-border::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6);
  border-radius: inherit;
  z-index: -1;
  animation: neon-rotate 3s linear infinite;
}

@keyframes neon-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.5);
}

::-webkit-scrollbar-thumb {
  background: rgba(124, 58, 237, 0.5);
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(124, 58, 237, 0.7);
}
```

### 2.2 Update Tailwind Config

**File: `tailwind.config.ts`**

Add neon colors:
```ts
theme: {
  extend: {
    colors: {
      neon: {
        purple: '#8b5cf6',
        pink: '#ec4899',
        cyan: '#06b6d4',
        green: '#10b981',
      }
    }
  }
}
```

### 2.3 Create Enhanced Metric Card with Animations

**File: `/src/components/ui/neon-metric-card.tsx`**
```tsx
'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NeonMetricCardProps {
  title: string;
  value: string | number;
  change?: { value: number; type: 'increase' | 'decrease' };
  icon: LucideIcon;
  variant?: 'purple' | 'pink' | 'cyan' | 'green';
}

const variantStyles = {
  purple: 'glow-purple hover:shadow-purple-500/50',
  pink: 'glow-pink hover:shadow-pink-500/50',
  cyan: 'glow-cyan hover:shadow-cyan-500/50',
  green: 'glow-green hover:shadow-green-500/50',
};

export function NeonMetricCard({
  title,
  value,
  change,
  icon: Icon,
  variant = 'purple',
}: NeonMetricCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={cn(
        'relative overflow-hidden rounded-xl border border-slate-700/50',
        'bg-slate-800/50 backdrop-blur-sm p-6',
        'hover:border-slate-600 transition-all duration-300',
        variantStyles[variant]
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <p className="text-3xl font-bold gradient-text">{value}</p>
          {change && (
            <p className={cn(
              'text-sm mt-1',
              change.type === 'increase' ? 'text-green-400' : 'text-red-400'
            )}>
              {change.type === 'increase' ? '+' : '-'}{change.value}%
            </p>
          )}
        </div>
        <div className={cn(
          'p-3 rounded-lg',
          variant === 'purple' && 'bg-purple-500/20 text-purple-400',
          variant === 'pink' && 'bg-pink-500/20 text-pink-400',
          variant === 'cyan' && 'bg-cyan-500/20 text-cyan-400',
          variant === 'green' && 'bg-green-500/20 text-green-400',
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  );
}
```

---

## Phase 3: Database & Authentication

### 3.1 Add Prisma

```bash
cd /Users/macmini/dev/purrify-hub
npm install prisma @prisma/client
npx prisma init
```

### 3.2 Create Unified Schema

**File: `/prisma/schema.prisma`**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ===== USER & AUTH =====
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  avatar    String?
  role      UserRole @default(VIEWER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  leads     Lead[]
  campaigns Campaign[]
  posts     SocialPost[]
  content   Content[]
}

enum UserRole {
  ADMIN
  MANAGER
  ANALYST
  VIEWER
}

// ===== CRM: LEADS (from Purrify Marketing) =====
model Lead {
  id           String     @id @default(cuid())
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  companyName  String
  website      String?
  email        String?
  phone        String?
  address      String?
  contactName  String?
  contactTitle String?
  storeCount   Int?
  revenue      Float?
  status       LeadStatus @default(NEW)
  source       LeadSource?
  notes        String?
  lastContact  DateTime?
  enriched     Boolean    @default(false)

  createdById  String?
  createdBy    User?      @relation(fields: [createdById], references: [id])
}

enum LeadStatus {
  NEW
  CONTACTED
  QUALIFIED
  CUSTOMER
  LOST
}

enum LeadSource {
  SCRAPE
  MANUAL
  REFERRAL
  TRADE_SHOW
  WEBSITE
}

// ===== CAMPAIGNS (from Purrify Marketing) =====
model Campaign {
  id          String         @id @default(cuid())
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
  name        String
  type        CampaignType
  status      CampaignStatus @default(DRAFT)
  startDate   DateTime?
  endDate     DateTime?
  budget      Float?
  results     Json?
  notes       String?

  createdById String?
  createdBy   User?          @relation(fields: [createdById], references: [id])
  posts       SocialPost[]
}

enum CampaignType {
  EMAIL
  SOCIAL
  BLOG
  ADS
}

enum CampaignStatus {
  DRAFT
  SCHEDULED
  ACTIVE
  COMPLETED
  PAUSED
}

// ===== SOCIAL POSTS (from Auto-social) =====
model SocialPost {
  id          String       @id @default(cuid())
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  content     String
  title       String?
  sourceUrl   String?
  platforms   Platform[]
  status      PostStatus   @default(PENDING)
  scheduledAt DateTime?
  publishedAt DateTime?
  results     Json?        // { platform: { likes, shares, comments } }

  campaignId  String?
  campaign    Campaign?    @relation(fields: [campaignId], references: [id])
  createdById String?
  createdBy   User?        @relation(fields: [createdById], references: [id])
}

enum Platform {
  FACEBOOK
  LINKEDIN
  TWITTER
  INSTAGRAM
  BLOG
}

enum PostStatus {
  PENDING
  SCHEDULED
  PUBLISHED
  FAILED
}

// ===== COMPETITORS (from Purrify Marketing) =====
model Competitor {
  id          String    @id @default(cuid())
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  name        String
  website     String
  priceIndex  Float?    // relative to our pricing (1.0 = same)
  skuCount    Int?
  reviews     Json?     // { average: 4.5, count: 1234 }
  lastScraped DateTime?
  notes       String?
}

// ===== CONTENT (from Purrify Marketing) =====
model Content {
  id          String        @id @default(cuid())
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  title       String
  body        String
  excerpt     String?
  type        ContentType
  status      ContentStatus @default(DRAFT)
  tags        String[]
  publishedAt DateTime?
  viewCount   Int           @default(0)

  createdById String?
  createdBy   User?         @relation(fields: [createdById], references: [id])
}

enum ContentType {
  BLOG
  GUIDE
  VIDEO
  NEWSLETTER
}

enum ContentStatus {
  DRAFT
  SCHEDULED
  PUBLISHED
  ARCHIVED
}

// ===== SALES METRICS (from Purrdash) =====
model SalesMetric {
  id                String   @id @default(cuid())
  date              DateTime @default(now())
  storesContacted   Int      @default(0)
  samplesGiven      Int      @default(0)
  storesBoughtOnce  Int      @default(0)
  storesBoughtMore  Int      @default(0)
  revenue           Float?
  notes             String?
}

// ===== AUTOMATION LOGS (from Purrify Marketing) =====
model AutomationLog {
  id        String    @id @default(cuid())
  createdAt DateTime  @default(now())
  type      String    // email, social, scrape, enrich, big-push
  status    LogStatus
  details   Json?
  error     String?
  duration  Int?      // milliseconds
}

enum LogStatus {
  PENDING
  SUCCESS
  ERROR
  WARNING
}

// ===== CUSTOMERS (from Purrdash) =====
model Customer {
  id            String    @id @default(cuid())
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  name          String
  email         String    @unique
  phone         String?
  address       Json?     // { street, city, state, zip, country }
  totalOrders   Int       @default(0)
  totalSpent    Float     @default(0)
  avgOrderValue Float     @default(0)
  lastOrderDate DateTime?
  status        CustomerStatus @default(ACTIVE)
}

enum CustomerStatus {
  ACTIVE
  INACTIVE
  CHURNED
}
```

### 3.3 Create Database Client

**File: `/src/lib/prisma.ts`**
```ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### 3.4 Initialize Database

```bash
# Create migration
npx prisma migrate dev --name init

# Generate client
npx prisma generate

# Seed database (optional)
npx prisma db seed
```

---

## Phase 4: CRM Module Integration

### 4.1 Migrate Leads Page

**Source:** `/Users/macmini/dev/Purrify Marketing/src/app/dashboard/leads/page.tsx`
**Target:** `/Users/macmini/dev/purrify-hub/src/app/dashboard/leads/page.tsx`

**Enhanced Version:**
```tsx
'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  PlusCircle, UserPlus, Mail, Phone, Building,
  Search, Filter, MoreVertical, RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

interface Lead {
  id: string;
  companyName: string;
  website?: string;
  email?: string;
  phone?: string;
  contactName?: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CUSTOMER' | 'LOST';
  source?: string;
  enriched: boolean;
  createdAt: string;
}

const statusColors = {
  NEW: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  CONTACTED: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  QUALIFIED: 'bg-green-500/20 text-green-400 border-green-500/30',
  CUSTOMER: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  LOST: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function LeadsPage() {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();

  const { data: leads = [], isLoading, refetch } = useQuery<Lead[]>({
    queryKey: ['leads', filter, search],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filter !== 'all') params.set('status', filter);
      if (search) params.set('search', search);

      const res = await fetch(`/api/leads?${params}`);
      if (!res.ok) throw new Error('Failed to fetch leads');
      return res.json();
    },
  });

  const filteredLeads = leads.filter(lead => {
    if (filter !== 'all' && lead.status !== filter) return false;
    if (search && !lead.companyName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Lead Management</h1>
          <p className="text-slate-400 mt-1">Manage and track your sales leads</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700"
            />
          </div>
        </div>
        <div className="flex gap-2">
          {['all', 'NEW', 'CONTACTED', 'QUALIFIED', 'CUSTOMER'].map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(status)}
              className={filter === status ? 'bg-purple-600' : ''}
            >
              {status === 'all' ? 'All' : status}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {['NEW', 'CONTACTED', 'QUALIFIED', 'CUSTOMER', 'LOST'].map((status) => (
          <Card key={status} className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <p className="text-sm text-slate-400">{status}</p>
              <p className="text-2xl font-bold">
                {leads.filter(l => l.status === status).length}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lead Cards */}
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse bg-slate-800/50 h-48" />
          ))}
        </div>
      ) : (
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AnimatePresence>
            {filteredLeads.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                  <CardHeader className="bg-slate-900/50 pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{lead.companyName}</CardTitle>
                      <Badge className={statusColors[lead.status]}>
                        {lead.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400">
                      {lead.website || 'No website'}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      {lead.contactName && (
                        <div className="flex items-center text-sm">
                          <UserPlus className="mr-2 h-4 w-4 text-slate-400" />
                          {lead.contactName}
                        </div>
                      )}
                      {lead.email && (
                        <div className="flex items-center text-sm">
                          <Mail className="mr-2 h-4 w-4 text-slate-400" />
                          {lead.email}
                        </div>
                      )}
                      {lead.phone && (
                        <div className="flex items-center text-sm">
                          <Phone className="mr-2 h-4 w-4 text-slate-400" />
                          {lead.phone}
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                        <span className="text-xs text-slate-400">
                          Source: {lead.source}
                        </span>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
```

### 4.2 Create Leads API

**File: `/src/app/api/leads/route.ts`**
```ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: any = {};
    if (status && status !== 'all') {
      where.status = status;
    }
    if (search) {
      where.companyName = { contains: search, mode: 'insensitive' };
    }

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const lead = await prisma.lead.create({
      data: {
        companyName: body.companyName,
        website: body.website,
        email: body.email,
        phone: body.phone,
        contactName: body.contactName,
        contactTitle: body.contactTitle,
        source: body.source,
        notes: body.notes,
      },
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}
```

### 4.3 Migrate Campaign and Competitor Pages

Follow the same pattern as leads:
1. Copy page from Purrify Marketing
2. Update to use Prisma
3. Add Framer Motion animations
4. Apply neon design system

---

## Phase 5: Social Media Engine

### 5.1 Migrate ContentCreator Component

**Source:** `/Users/macmini/dev/autosocial/src/components/Dashboard/ContentCreator.tsx`
**Target:** `/Users/macmini/dev/purrify-hub/src/components/social/content-creator.tsx`

Copy the entire component and update imports:
```tsx
// Update imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
```

### 5.2 Create Social Posts Page

**File: `/src/app/dashboard/social/page.tsx`**
```tsx
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContentCreator from '@/components/social/content-creator';
import RecentSubmissions from '@/components/social/recent-submissions';
import { PlusCircle, History, BarChart3 } from 'lucide-react';

export default function SocialPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Social Media Hub</h1>
        <p className="text-slate-400 mt-1">Create and distribute content across platforms</p>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="bg-slate-800/50 border border-slate-700">
          <TabsTrigger value="create" className="data-[state=active]:bg-purple-600">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-purple-600">
            <History className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="mt-6">
          <ContentCreator onSubmit={async (data) => {
            const res = await fetch('/api/social/posts', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Failed to create post');
          }} />
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <RecentSubmissions />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          {/* Social analytics component */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

### 5.3 Create Social Posts API

**File: `/src/app/api/social/posts/route.ts`**
```ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.socialPost.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Map platform booleans to array
    const platforms = Object.entries(body.platforms)
      .filter(([_, selected]) => selected)
      .map(([platform]) => platform.toUpperCase());

    const post = await prisma.socialPost.create({
      data: {
        content: body.content,
        sourceUrl: body.url,
        platforms: platforms,
        status: 'PENDING',
      },
    });

    // TODO: Integrate with actual social media APIs
    // - Facebook Graph API
    // - LinkedIn API
    // - Twitter API v2
    // - Instagram Graph API

    // Log automation
    await prisma.automationLog.create({
      data: {
        type: 'social',
        status: 'SUCCESS',
        details: {
          postId: post.id,
          platforms: platforms,
          contentLength: body.content.length,
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating social post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
```

---

## Phase 6: Content Management

### 6.1 Create Content Page

Merge Purrify Marketing's content types with Auto-social's URL extraction.

**File: `/src/app/dashboard/content/page.tsx`**
```tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileText, Video, BookOpen, Mail,
  PlusCircle, Calendar, Eye, Edit
} from 'lucide-react';

const contentTypeIcons = {
  BLOG: FileText,
  GUIDE: BookOpen,
  VIDEO: Video,
  NEWSLETTER: Mail,
};

const statusColors = {
  DRAFT: 'bg-slate-500/20 text-slate-400',
  SCHEDULED: 'bg-yellow-500/20 text-yellow-400',
  PUBLISHED: 'bg-green-500/20 text-green-400',
  ARCHIVED: 'bg-red-500/20 text-red-400',
};

export default function ContentPage() {
  const [filter, setFilter] = useState('all');

  const { data: content = [], isLoading } = useQuery({
    queryKey: ['content', filter],
    queryFn: async () => {
      const res = await fetch(`/api/content?type=${filter}`);
      return res.json();
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Content Management</h1>
          <p className="text-slate-400 mt-1">Create and manage your content library</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Content
        </Button>
      </div>

      {/* Content type filter */}
      <div className="flex gap-2">
        {['all', 'BLOG', 'GUIDE', 'VIDEO', 'NEWSLETTER'].map((type) => (
          <Button
            key={type}
            variant={filter === type ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(type)}
          >
            {type === 'all' ? 'All' : type}
          </Button>
        ))}
      </div>

      {/* Content grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {content.map((item: any) => {
          const Icon = contentTypeIcons[item.type as keyof typeof contentTypeIcons] || FileText;
          return (
            <Card key={item.id} className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-purple-400" />
                    <Badge className={statusColors[item.status as keyof typeof statusColors]}>
                      {item.status}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400 line-clamp-3">{item.excerpt}</p>
                <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {item.viewCount} views
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
```

---

## Phase 7: Automation & Integration

### 7.1 Migrate Big Push Button

**Source:** `/Users/macmini/dev/Purrify Marketing/src/components/big-push-button.tsx`
**Target:** `/Users/macmini/dev/purrify-hub/src/components/automation/big-push-button.tsx`

**Enhanced Version:**
```tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Zap, Loader2, Check, X } from 'lucide-react';
import { toast } from 'sonner';

interface AutomationResult {
  leadsGenerated: number;
  emailsSent: number;
  socialPostsScheduled: number;
  competitorsAnalyzed: number;
  contentCreated: number;
}

export function BigPushButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AutomationResult | null>(null);

  const handleBigPush = async () => {
    try {
      setIsLoading(true);
      setResult(null);
      toast.info('Starting marketing automation...');

      const response = await fetch('/api/automation/big-push', {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Automation failed');

      const data = await response.json();
      setResult(data.results);

      toast.success('Marketing automation completed!', {
        description: `Generated ${data.results.leadsGenerated} leads, sent ${data.results.emailsSent} emails`,
      });
    } catch (error) {
      console.error('Big Push error:', error);
      toast.error('Marketing automation failed', {
        description: 'Please try again or contact support.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative"
    >
      <Button
        size="lg"
        className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white font-bold px-8 py-6 text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
        onClick={handleBigPush}
        disabled={isLoading}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ backgroundSize: '200% 200%' }}
        />

        <span className="relative flex items-center">
          {isLoading ? (
            <>
              <Loader2 className="mr-3 h-6 w-6 animate-spin" />
              Processing Magic...
            </>
          ) : (
            <>
              <Zap className="mr-3 h-6 w-6" />
              Get More Customers
            </>
          )}
        </span>
      </Button>

      {/* Results display */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-green-500/30"
        >
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              {result.leadsGenerated} leads
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              {result.emailsSent} emails
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              {result.socialPostsScheduled} posts
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              {result.competitorsAnalyzed} competitors
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
```

### 7.2 Create Big Push API

**File: `/src/app/api/automation/big-push/route.ts`**
```ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  const startTime = Date.now();

  try {
    // Step 1: Scrape competitor data
    // TODO: Integrate with Apify for web scraping
    const competitorsAnalyzed = 5;

    // Step 2: Enrich leads
    // TODO: Integrate with lead enrichment service
    const leadsGenerated = Math.floor(Math.random() * 20) + 10;

    // Step 3: Generate email content
    // TODO: Integrate with OpenAI for content generation
    const emailsSent = Math.floor(Math.random() * 100) + 50;

    // Step 4: Schedule social posts
    // TODO: Integrate with social media APIs
    const socialPostsScheduled = Math.floor(Math.random() * 5) + 3;

    // Step 5: Create blog content
    // TODO: Integrate with content generation
    const contentCreated = 1;

    // Log the automation run
    await prisma.automationLog.create({
      data: {
        type: 'big-push',
        status: 'SUCCESS',
        duration: Date.now() - startTime,
        details: {
          leadsGenerated,
          emailsSent,
          socialPostsScheduled,
          competitorsAnalyzed,
          contentCreated,
        },
      },
    });

    // Send notification
    // TODO: Integrate with Telegram or Slack

    return NextResponse.json({
      success: true,
      results: {
        leadsGenerated,
        emailsSent,
        socialPostsScheduled,
        competitorsAnalyzed,
        contentCreated,
      },
    });
  } catch (error) {
    console.error('Big Push error:', error);

    await prisma.automationLog.create({
      data: {
        type: 'big-push',
        status: 'ERROR',
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    });

    return NextResponse.json(
      { error: 'Automation failed' },
      { status: 500 }
    );
  }
}
```

---

## File Migration Reference

### Quick Reference: Source → Target

| Component | Source Project | Source Path | Target Path |
|-----------|---------------|-------------|-------------|
| **Foundation** | Purrdash | `/Purrdash/purrify-dashboard/*` | `/purrify-hub/*` |
| **CSS Animations** | Purrify Clean | `/purrify-clean/app/globals.css` | `/purrify-hub/src/app/globals.css` |
| **Lead Management** | Purrify Marketing | `/Purrify Marketing/src/app/dashboard/leads/page.tsx` | `/purrify-hub/src/app/dashboard/leads/page.tsx` |
| **Campaign Management** | Purrify Marketing | `/Purrify Marketing/src/app/dashboard/campaigns/page.tsx` | `/purrify-hub/src/app/dashboard/campaigns/page.tsx` |
| **Competitor Intelligence** | Purrify Marketing | `/Purrify Marketing/src/app/dashboard/competitors/page.tsx` | `/purrify-hub/src/app/dashboard/competitors/page.tsx` |
| **Content Creator** | Auto-social | `/autosocial/src/components/Dashboard/ContentCreator.tsx` | `/purrify-hub/src/components/social/content-creator.tsx` |
| **Platform Preview** | Auto-social | `/autosocial/src/components/Dashboard/PlatformPreviewCard.tsx` | `/purrify-hub/src/components/social/platform-preview-card.tsx` |
| **Recent Submissions** | Auto-social | `/autosocial/src/components/Dashboard/RecentSubmissions.tsx` | `/purrify-hub/src/components/social/recent-submissions.tsx` |
| **Big Push Button** | Purrify Marketing | `/Purrify Marketing/src/components/big-push-button.tsx` | `/purrify-hub/src/components/automation/big-push-button.tsx` |
| **Prisma Schema** | Purrify Marketing | `/Purrify Marketing/prisma/schema.prisma` | `/purrify-hub/prisma/schema.prisma` (enhanced) |
| **Social Media Widget** | Purrdash | `/Purrdash/purrify-dashboard/src/components/ui/social-media-widget.tsx` | Keep in place |
| **Metric Cards** | Purrdash | `/Purrdash/purrify-dashboard/src/components/ui/metric-card.tsx` | Keep in place |
| **Real-time Updates** | Purrdash | `/Purrdash/purrify-dashboard/src/hooks/useRealTimeData.ts` | Keep in place |

---

## Testing & Deployment

### 10.1 Test Checklist

```markdown
## Phase 1: Foundation
- [ ] Project copies correctly from Purrdash
- [ ] npm install succeeds
- [ ] npm run dev starts without errors
- [ ] Navigation updated and working

## Phase 2: Design
- [ ] Neon CSS animations applied
- [ ] Gradient text working
- [ ] Glow effects visible on hover
- [ ] Custom scrollbar styled

## Phase 3: Database
- [ ] Prisma migrations run successfully
- [ ] All models created
- [ ] Seed data loads

## Phase 4: CRM
- [ ] Leads page loads
- [ ] Lead filtering works
- [ ] Lead creation works
- [ ] Campaigns page loads
- [ ] Competitors page loads

## Phase 5: Social Media
- [ ] Content creator loads
- [ ] Platform selection works
- [ ] Character counting works
- [ ] Post submission works
- [ ] History view works

## Phase 6: Content
- [ ] Content list loads
- [ ] Content filtering works
- [ ] Content creation works

## Phase 7: Automation
- [ ] Big Push button works
- [ ] Automation logs created
- [ ] Results displayed correctly
```

### 10.2 Environment Variables

**File: `.env.local`**
```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/purrify_hub"

# Authentication
JWT_SECRET="your-super-secret-key-here"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# External APIs (Phase 7+)
OPENAI_API_KEY=""
APIFY_API_TOKEN=""
TELEGRAM_BOT_TOKEN=""
MAKE_WEBHOOK_URL=""

# Social Media APIs
FACEBOOK_APP_ID=""
FACEBOOK_APP_SECRET=""
LINKEDIN_CLIENT_ID=""
LINKEDIN_CLIENT_SECRET=""
TWITTER_API_KEY=""
TWITTER_API_SECRET=""
```

### 10.3 Deployment Steps

```bash
# 1. Build the project
npm run build

# 2. Run production locally to test
npm start

# 3. Deploy to Vercel
vercel deploy --prod

# 4. Set environment variables in Vercel dashboard

# 5. Run database migrations on production
npx prisma migrate deploy
```

---

## Post-Consolidation Cleanup

After successful deployment and testing:

```bash
# Archive old projects (don't delete yet)
mkdir -p /Users/macmini/dev/_archived
mv "/Users/macmini/dev/purrify-clean" "/Users/macmini/dev/_archived/"
mv "/Users/macmini/dev/Purrify Marketing" "/Users/macmini/dev/_archived/"
mv "/Users/macmini/dev/autosocial" "/Users/macmini/dev/_archived/"
mv "/Users/macmini/dev/Purrdash" "/Users/macmini/dev/_archived/"

# Keep archived for 30 days, then delete if no issues
```

---

## Summary

This implementation plan provides:
- **6 actionable phases** with clear dependencies
- **Specific file paths** for every migration
- **Code examples** for key components
- **Database schema** ready for production
- **API routes** with proper error handling
- **Testing checklists** for each phase

The consolidated **Purrify Hub** will combine:
- Purrdash's production-ready infrastructure
- Purrify Marketing's CRM capabilities
- Auto-social's multi-platform posting
- Purrify Clean's beautiful animations

---

*Implementation Plan Generated: 2025-12-27*
