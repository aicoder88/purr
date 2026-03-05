-- CreateEnum
CREATE TYPE "FreshnessProfileSource" AS ENUM ('QUIZ', 'CHAT');

-- CreateTable
CREATE TABLE "freshness_profiles" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "email" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "source" "FreshnessProfileSource" NOT NULL DEFAULT 'QUIZ',
    "catCount" INTEGER,
    "litterType" TEXT,
    "homeType" TEXT,
    "odorSeverity" TEXT,
    "currentRemedy" TEXT,
    "riskLevel" TEXT,
    "score" INTEGER,
    "recommendedProductId" TEXT,
    "recommendationReason" TEXT,
    "confidence" INTEGER,
    "answers" JSONB,
    "lastQuizAt" TIMESTAMP(3),
    "lastChatAt" TIMESTAMP(3),
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "freshness_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "freshness_profiles_sessionId_key" ON "freshness_profiles"("sessionId");

-- CreateIndex
CREATE INDEX "freshness_profiles_email_idx" ON "freshness_profiles"("email");

-- CreateIndex
CREATE INDEX "freshness_profiles_recommendedProductId_idx" ON "freshness_profiles"("recommendedProductId");

-- CreateIndex
CREATE INDEX "freshness_profiles_source_idx" ON "freshness_profiles"("source");

-- CreateIndex
CREATE INDEX "freshness_profiles_lastSeenAt_idx" ON "freshness_profiles"("lastSeenAt");
