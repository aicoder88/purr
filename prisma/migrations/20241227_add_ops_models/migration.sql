-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'SAMPLE_SENT', 'FOLLOWING_UP', 'CONVERTED', 'NOT_INTERESTED', 'NO_RESPONSE');

-- CreateEnum
CREATE TYPE "SocialPostStatus" AS ENUM ('DRAFT', 'SCHEDULED', 'PUBLISHED', 'FAILED');

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "phone" TEXT,
    "contactName" TEXT,
    "notes" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "email" TEXT,
    "emailSecondary" TEXT,
    "emailQuality" TEXT,
    "emailResult" TEXT,
    "emailIsFree" BOOLEAN,
    "emailIsRole" BOOLEAN,
    "street" TEXT,
    "city" TEXT,
    "province" TEXT,
    "postalCode" TEXT,
    "neighborhood" TEXT,
    "website" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "tiktok" TEXT,
    "youtube" TEXT,
    "twitter" TEXT,
    "openingHours" TEXT,
    "category" TEXT,
    "sentStatus" TEXT,
    "source" TEXT,
    "lastContact" TIMESTAMP(3),
    "lastSyncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_posts" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "platforms" TEXT[],
    "status" "SocialPostStatus" NOT NULL DEFAULT 'DRAFT',
    "scheduledAt" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "leads_status_idx" ON "leads"("status");

-- CreateIndex
CREATE INDEX "leads_city_idx" ON "leads"("city");

-- CreateIndex
CREATE INDEX "leads_province_idx" ON "leads"("province");

-- CreateIndex
CREATE INDEX "leads_category_idx" ON "leads"("category");

-- CreateIndex
CREATE INDEX "leads_createdAt_idx" ON "leads"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "leads_companyName_city_key" ON "leads"("companyName", "city");

-- CreateIndex
CREATE INDEX "social_posts_status_idx" ON "social_posts"("status");

-- CreateIndex
CREATE INDEX "social_posts_scheduledAt_idx" ON "social_posts"("scheduledAt");
