# Storage Migration Guide - File System to Database

## Problem

The blog system currently uses file-based storage (`content/blog/*.json`), which doesn't work on Vercel's serverless environment because the file system is read-only.

## Solution

Migrate to PostgreSQL database storage using Prisma ORM (already configured in your project).

## Quick Fix Steps

### 1. Update Prisma Schema

Add blog post tables to `prisma/schema.prisma`:

```prisma
model BlogPost {
  id              String   @id @default(cuid())
  slug            String   @unique
  locale          String
  title           String
  excerpt         String?
  content         String   @db.Text
  featuredImage   String?
  author          String
  publishDate     DateTime
  modifiedDate    DateTime @updatedAt
  status          String   // 'draft', 'published', 'scheduled'
  scheduledDate   DateTime?
  categories      String[] // Array of category slugs
  tags            String[] // Array of tag slugs
  seoTitle        String?
  seoDescription  String?
  seoKeywords     String[]
  readingTime     Int?
  viewCount       Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([slug, locale])
  @@index([status])
  @@index([publishDate])
}

model BlogCategory {
  id          String   @id @default(cuid())
  slug        String   @unique
  name        String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model BlogTag {
  id        String   @id @default(cuid())
  slug      String   @unique
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model BlogRevision {
  id        String   @id @default(cuid())
  postSlug  String
  content   String   @db.Text
  author    String
  message   String?
  createdAt DateTime @default(now())

  @@index([postSlug])
  @@index([createdAt])
}

model MediaItem {
  id          String   @id @default(cuid())
  filename    String
  url         String
  alt         String?
  caption     String?
  width       Int?
  height      Int?
  size        Int?
  mimeType    String?
  uploadedBy  String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([filename])
}
```

### 2. Run Migration

```bash
npx prisma migrate dev --name add_blog_tables
npx prisma generate
```

### 3. Update ContentStore to Use Database

Replace `src/lib/blog/content-store.ts` with database implementation.

### 4. Migrate Existing Content

Run migration script to move JSON files to database:

```bash
npm run blog:migrate
```

## Alternative: Use Vercel KV or Blob Storage

If you want to keep file-based approach:

### Option A: Vercel Blob Storage

1. Enable Vercel Blob in dashboard
2. Install: `npm install @vercel/blob`
3. Get `BLOB_READ_WRITE_TOKEN` from Vercel
4. Update ContentStore to use Blob API

### Option B: Vercel KV (Redis)

1. Enable Vercel KV in dashboard
2. Install: `npm install @vercel/kv`
3. Get KV credentials from Vercel
4. Update ContentStore to use KV

## Recommended Approach

**Use PostgreSQL** - You already have it configured, it's more reliable for structured data, and supports complex queries for analytics.

## Immediate Workaround

For testing, you can temporarily use localStorage on the client side, but this is NOT recommended for production.

---

**Status**: Action Required  
**Priority**: Critical (blocks blog editing in production)  
**Estimated Time**: 2-3 hours for database migration
