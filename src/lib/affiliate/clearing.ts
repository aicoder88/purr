/**
 * Affiliate Commission Clearing
 * Handles lazy clearing of pending conversions after 30-day hold period
 * Also triggers tier upgrade checks when conversions clear
 */

import prisma from '@/lib/prisma';
import { onConversionCleared } from './tiers';

const CLEARING_PERIOD_DAYS = 30;

/**
 * Clear pending conversions that have passed the 30-day hold period
 * This is called lazily when affiliate views dashboard or requests payout
 *
 * @param affiliateId - The affiliate's ID
 * @returns Object with counts of cleared conversions and updated balances
 */
export async function clearPendingConversions(affiliateId: string): Promise<{
  clearedCount: number;
  pendingEarnings: number;
  availableBalance: number;
}> {
  if (!prisma) {
    throw new Error('Database connection not established');
  }

  const clearingDate = new Date(Date.now() - CLEARING_PERIOD_DAYS * 24 * 60 * 60 * 1000);

  // Update all eligible conversions from PENDING to CLEARED
  const updateResult = await prisma.affiliateConversion.updateMany({
    where: {
      affiliateId,
      status: 'PENDING',
      purchasedAt: { lt: clearingDate },
    },
    data: {
      status: 'CLEARED',
      clearedAt: new Date(),
    },
  });

  // Recalculate balances from conversions
  const [pendingAgg, clearedAgg, paidOutAgg] = await Promise.all([
    // Sum of pending conversions (not yet cleared)
    prisma.affiliateConversion.aggregate({
      where: { affiliateId, status: 'PENDING' },
      _sum: { commissionAmount: true },
    }),
    // Sum of cleared conversions (available for payout)
    prisma.affiliateConversion.aggregate({
      where: { affiliateId, status: 'CLEARED' },
      _sum: { commissionAmount: true },
    }),
    // Sum of pending payouts (already requested but not completed)
    prisma.affiliatePayout.aggregate({
      where: {
        affiliateId,
        status: { in: ['PENDING', 'PROCESSING'] },
      },
      _sum: { amount: true },
    }),
  ]);

  const pendingEarnings = pendingAgg._sum.commissionAmount || 0;
  const clearedEarnings = clearedAgg._sum.commissionAmount || 0;
  const pendingPayouts = paidOutAgg._sum.amount || 0;

  // Available balance = cleared earnings - any pending payouts
  const availableBalance = Math.max(0, clearedEarnings - pendingPayouts);

  // Update affiliate record with recalculated balances
  await prisma.affiliate.update({
    where: { id: affiliateId },
    data: {
      pendingEarnings,
      availableBalance,
    },
  });

  // If any conversions were cleared, check for tier upgrade
  if (updateResult.count > 0) {
    const _tierResult = await onConversionCleared(affiliateId);
    // Tier upgrade check completed silently
  }

  return {
    clearedCount: updateResult.count,
    pendingEarnings,
    availableBalance,
  };
}

/**
 * Recalculate total earnings for an affiliate
 * Called after conversions are voided or paid
 */
export async function recalculateTotalEarnings(affiliateId: string): Promise<number> {
  if (!prisma) {
    throw new Error('Database connection not established');
  }

  const result = await prisma.affiliateConversion.aggregate({
    where: {
      affiliateId,
      status: { in: ['CLEARED', 'PAID'] },
    },
    _sum: { commissionAmount: true },
  });

  const totalEarnings = result._sum.commissionAmount || 0;

  await prisma.affiliate.update({
    where: { id: affiliateId },
    data: { totalEarnings },
  });

  return totalEarnings;
}

/**
 * Void a conversion (e.g., when order is refunded)
 */
export async function voidConversion(
  conversionId: string,
  reason: string
): Promise<void> {
  if (!prisma) {
    throw new Error('Database connection not established');
  }

  const conversion = await prisma.affiliateConversion.findUnique({
    where: { id: conversionId },
    select: { affiliateId: true, status: true },
  });

  if (!conversion) {
    throw new Error('Conversion not found');
  }

  // Can only void PENDING or CLEARED conversions
  if (!['PENDING', 'CLEARED'].includes(conversion.status)) {
    throw new Error(`Cannot void conversion with status: ${conversion.status}`);
  }

  await prisma.affiliateConversion.update({
    where: { id: conversionId },
    data: {
      status: 'VOIDED',
      voidedAt: new Date(),
      voidReason: reason,
    },
  });

  // Recalculate affiliate balances
  await clearPendingConversions(conversion.affiliateId);
}
