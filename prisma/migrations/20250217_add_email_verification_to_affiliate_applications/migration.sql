-- AlterTable
ALTER TABLE "affiliate_applications"
ADD COLUMN "emailVerified" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "verifyToken" TEXT,
ADD COLUMN "verifyExpiresAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "affiliate_applications_verifyToken_key" ON "affiliate_applications"("verifyToken");
