-- AlterTable
ALTER TABLE "Order"
ADD COLUMN "freshnessSessionId" TEXT,
ADD COLUMN "freshnessSource" "FreshnessProfileSource",
ADD COLUMN "freshnessScore" INTEGER,
ADD COLUMN "freshnessRiskLevel" TEXT,
ADD COLUMN "freshnessRecommendedProductId" TEXT;

-- AlterTable
ALTER TABLE "email_subscribers"
ADD COLUMN "freshnessSessionId" TEXT,
ADD COLUMN "freshnessSource" "FreshnessProfileSource",
ADD COLUMN "freshnessScore" INTEGER,
ADD COLUMN "freshnessRiskLevel" TEXT,
ADD COLUMN "freshnessRecommendedProductId" TEXT;

-- CreateIndex
CREATE INDEX "Order_freshnessSessionId_idx" ON "Order"("freshnessSessionId");

-- CreateIndex
CREATE INDEX "Order_freshnessRecommendedProductId_idx" ON "Order"("freshnessRecommendedProductId");

-- CreateIndex
CREATE INDEX "email_subscribers_freshnessSessionId_idx" ON "email_subscribers"("freshnessSessionId");
