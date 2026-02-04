/**
 * Affiliate Tier Management
 *
 * Handles tiered commission rates, tier upgrades, monthly resets,
 * and the "Sell 3, Get Free" reward system.
 *
 * Uses LAZY execution patterns (no cron jobs required).
 */

import prisma from '@/lib/prisma';
import { AffiliateTier } from '@/generated/client/client';
import { Resend } from 'resend';
import { RESEND_CONFIG, isResendConfigured } from '@/lib/resend-config';

// Commission rates by tier
export const COMMISSION_RATES: Record<AffiliateTier, number> = {
  STARTER: 0.20, // 20%
  ACTIVE: 0.25,  // 25%
  PARTNER: 0.30, // 30%
};

// Tier upgrade thresholds
export const TIER_THRESHOLDS = {
  ACTIVE: 3,           // 3 cleared sales to upgrade to ACTIVE
  PARTNER_MONTHLY: 5,  // 5+ sales per month
  PARTNER_MONTHS: 2,   // For 2 consecutive months
};

// Monthly reward threshold and amount
export const MONTHLY_REWARD = {
  MIN_SALES: 3,        // Minimum sales to qualify
  CREDIT_AMOUNT: 49,   // $49 credit (value of product)
};

/**
 * Get the commission rate for an affiliate's tier
 */
export function getCommissionRate(tier: AffiliateTier): number {
  return COMMISSION_RATES[tier] || COMMISSION_RATES.STARTER;
}

/**
 * Get the current month key in YYYY-MM format
 */
function getCurrentMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

/**
 * Get the previous month key in YYYY-MM format
 */
function getPreviousMonthKey(): string {
  const now = new Date();
  const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  return `${prevMonth.getFullYear()}-${String(prevMonth.getMonth() + 1).padStart(2, '0')}`;
}

/**
 * Check if a monthly reset is needed based on lastMonthResetAt
 */
function needsMonthlyReset(lastResetAt: Date | null): boolean {
  if (!lastResetAt) return true;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const lastResetMonth = lastResetAt.getMonth();
  const lastResetYear = lastResetAt.getFullYear();

  // Reset needed if we're in a new month
  return currentYear > lastResetYear || currentMonth > lastResetMonth;
}

interface MonthlyResetResult {
  wasReset: boolean;
  rewardGiven: boolean;
  rewardAmount?: number;
}

/**
 * Perform lazy monthly reset for an affiliate
 * Call this on dashboard load to reset counters if needed
 */
export async function checkAndResetMonthlySales(affiliateId: string): Promise<MonthlyResetResult> {
  if (!prisma) {
    return { wasReset: false, rewardGiven: false };
  }

  const affiliate = await prisma.affiliate.findUnique({
    where: { id: affiliateId },
    select: {
      id: true,
      name: true,
      email: true,
      tier: true,
      currentMonthSales: true,
      lastMonthSales: true,
      partnerQualifyingMonths: true,
      lastMonthResetAt: true,
      lastRewardMonth: true,
      availableBalance: true,
    },
  });

  if (!affiliate) {
    return { wasReset: false, rewardGiven: false };
  }

  // Check if we need a monthly reset
  if (!needsMonthlyReset(affiliate.lastMonthResetAt)) {
    return { wasReset: false, rewardGiven: false };
  }

  const previousMonthKey = getPreviousMonthKey();
  let rewardGiven = false;
  let rewardAmount = 0;

  // Check if affiliate qualifies for "Sell 3, Get Free" reward
  // Only give reward if they haven't received it for this month already
  if (
    affiliate.currentMonthSales >= MONTHLY_REWARD.MIN_SALES &&
    affiliate.lastRewardMonth !== previousMonthKey
  ) {
    rewardGiven = true;
    rewardAmount = MONTHLY_REWARD.CREDIT_AMOUNT;
  }

  // Calculate new partnerQualifyingMonths
  let newPartnerQualifyingMonths = affiliate.partnerQualifyingMonths;
  if (affiliate.currentMonthSales >= TIER_THRESHOLDS.PARTNER_MONTHLY) {
    newPartnerQualifyingMonths += 1;
  } else {
    // Reset counter if they didn't hit threshold this month
    newPartnerQualifyingMonths = 0;
  }

  // Perform the reset
  await prisma.affiliate.update({
    where: { id: affiliateId },
    data: {
      lastMonthSales: affiliate.currentMonthSales,
      currentMonthSales: 0,
      partnerQualifyingMonths: newPartnerQualifyingMonths,
      lastMonthResetAt: new Date(),
      // Update reward tracking and balance if reward was given
      ...(rewardGiven && {
        lastRewardMonth: previousMonthKey,
        availableBalance: affiliate.availableBalance + rewardAmount,
      }),
    },
  });

  // Send reward notification email if applicable
  if (rewardGiven && isResendConfigured()) {
    await sendRewardNotificationEmail(affiliate.email, affiliate.name, rewardAmount);
  }

  // Monthly reset processed silently

  return { wasReset: true, rewardGiven, rewardAmount: rewardGiven ? rewardAmount : undefined };
}

interface TierUpgradeResult {
  upgraded: boolean;
  oldTier?: AffiliateTier;
  newTier?: AffiliateTier;
  newCommissionRate?: number;
}

/**
 * Check if affiliate qualifies for tier upgrade and apply it
 * Call this after conversions clear
 */
export async function checkAndUpgradeTier(affiliateId: string): Promise<TierUpgradeResult> {
  if (!prisma) {
    return { upgraded: false };
  }

  const affiliate = await prisma.affiliate.findUnique({
    where: { id: affiliateId },
    select: {
      id: true,
      name: true,
      email: true,
      tier: true,
      totalConversions: true,
      partnerQualifyingMonths: true,
    },
  });

  if (!affiliate) {
    return { upgraded: false };
  }

  let newTier: AffiliateTier | null = null;
  const oldTier = affiliate.tier;

  // Check for PARTNER upgrade (highest tier)
  if (
    affiliate.tier !== 'PARTNER' &&
    affiliate.partnerQualifyingMonths >= TIER_THRESHOLDS.PARTNER_MONTHS
  ) {
    newTier = 'PARTNER';
  }
  // Check for ACTIVE upgrade
  else if (
    affiliate.tier === 'STARTER' &&
    affiliate.totalConversions >= TIER_THRESHOLDS.ACTIVE
  ) {
    newTier = 'ACTIVE';
  }

  if (!newTier) {
    return { upgraded: false };
  }

  // Apply the upgrade
  const newCommissionRate = COMMISSION_RATES[newTier];

  await prisma.affiliate.update({
    where: { id: affiliateId },
    data: {
      tier: newTier,
      commissionRate: newCommissionRate,
    },
  });

  // Send upgrade notification email
  if (isResendConfigured()) {
    await sendTierUpgradeEmail(affiliate.email, affiliate.name, oldTier, newTier, newCommissionRate);
  }

  // Affiliate tier upgrade processed silently

  return {
    upgraded: true,
    oldTier,
    newTier,
    newCommissionRate,
  };
}

/**
 * Increment monthly sales counter and check for tier upgrade
 * Call this when a new sale is recorded
 */
export async function onNewSale(affiliateId: string): Promise<void> {
  if (!prisma) return;

  // First, ensure monthly counters are reset if needed
  await checkAndResetMonthlySales(affiliateId);

  // Increment current month sales
  await prisma.affiliate.update({
    where: { id: affiliateId },
    data: {
      currentMonthSales: { increment: 1 },
    },
  });
}

/**
 * Check for tier upgrade after a conversion clears
 */
export async function onConversionCleared(affiliateId: string): Promise<TierUpgradeResult> {
  // Ensure monthly reset is done first
  await checkAndResetMonthlySales(affiliateId);

  // Then check for tier upgrade
  return checkAndUpgradeTier(affiliateId);
}

/**
 * Send tier upgrade notification email
 */
async function sendTierUpgradeEmail(
  email: string,
  name: string,
  oldTier: AffiliateTier,
  newTier: AffiliateTier,
  newRate: number
): Promise<void> {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/affiliate/dashboard`;

    const tierNames: Record<AffiliateTier, string> = {
      STARTER: 'Starter',
      ACTIVE: 'Active',
      PARTNER: 'Partner',
    };

    const tierBenefits: Record<AffiliateTier, string[]> = {
      STARTER: ['20% commission on all sales'],
      ACTIVE: ['25% commission on all sales', 'Priority support'],
      PARTNER: ['30% commission on all sales', 'Priority support', 'Early access to new products', 'Exclusive partner events'],
    };

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0d9488;">🎉 Congratulations on Your Tier Upgrade!</h2>

        <p>Hi ${name},</p>

        <p>Great news! You've been upgraded from <strong>${tierNames[oldTier]}</strong> to <strong>${tierNames[newTier]}</strong>!</p>

        <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h3 style="color: #1a1a1a; margin-top: 0;">Your New Commission Rate:</h3>
          <p style="font-size: 24px; font-weight: bold; color: #0d9488; margin: 0;">
            ${(newRate * 100).toFixed(0)}% on every sale
          </p>
        </div>

        <h3 style="color: #1a1a1a;">Your New Benefits:</h3>
        <ul style="line-height: 1.8;">
          ${tierBenefits[newTier].map(benefit => `<li>${benefit}</li>`).join('')}
        </ul>

        ${newTier === 'ACTIVE' ? `
          <p><strong>Next milestone:</strong> Achieve 5+ sales per month for 2 consecutive months to reach Partner status (30% commission)!</p>
        ` : ''}

        <div style="margin: 24px 0;">
          <a href="${dashboardUrl}" style="display: inline-block; background-color: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
            View Your Dashboard
          </a>
        </div>

        <p>Keep up the great work!</p>

        <p>Best regards,<br/>The Purrify Team</p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="color: #666; font-size: 12px;">
          You received this email because you're a Purrify affiliate.
        </p>
      </div>
    `;

    await resend.emails.send({
      from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
      to: email,
      subject: `🎉 You've been upgraded to ${tierNames[newTier]} - ${(newRate * 100).toFixed(0)}% Commission!`,
      html: emailContent,
    });

    // Tier upgrade email sent
  } catch (error) {
    console.error('Failed to send tier upgrade email:', error);
  }
}

/**
 * Send monthly reward notification email
 */
async function sendRewardNotificationEmail(
  email: string,
  name: string,
  rewardAmount: number
): Promise<void> {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/affiliate/dashboard`;

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0d9488;">🎁 You've Earned a Free Product!</h2>

        <p>Hi ${name},</p>

        <p>Amazing work last month! You hit 3+ sales, which means you've earned our <strong>"Sell 3, Get Free"</strong> reward!</p>

        <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h3 style="color: #1a1a1a; margin-top: 0;">Your Reward:</h3>
          <p style="font-size: 24px; font-weight: bold; color: #0d9488; margin: 0;">
            $${rewardAmount.toFixed(2)} Credit Added
          </p>
          <p style="color: #666; margin-top: 8px;">This credit has been added to your available balance.</p>
        </div>

        <p>This is equivalent to a free bag of Purrify! You can request a payout or let it accumulate with your other commissions.</p>

        <p><strong>Pro tip:</strong> Keep up the momentum! Hit 3+ sales again this month to earn another reward.</p>

        <div style="margin: 24px 0;">
          <a href="${dashboardUrl}" style="display: inline-block; background-color: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
            View Your Dashboard
          </a>
        </div>

        <p>Thank you for being an amazing affiliate!</p>

        <p>Best regards,<br/>The Purrify Team</p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="color: #666; font-size: 12px;">
          You received this email because you're a Purrify affiliate who earned a monthly reward.
        </p>
      </div>
    `;

    await resend.emails.send({
      from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
      to: email,
      subject: `🎁 You've Earned a Free $${rewardAmount.toFixed(2)} Credit - Sell 3, Get Free!`,
      html: emailContent,
    });

    // Monthly reward email sent
  } catch (error) {
    console.error('Failed to send monthly reward email:', error);
  }
}

/**
 * Get tier progress info for dashboard display
 */
export interface TierProgressInfo {
  currentTier: AffiliateTier;
  currentTierName: string;
  commissionRate: number;
  nextTier: AffiliateTier | null;
  nextTierName: string | null;
  nextTierRate: number | null;
  progressToNext: number; // 0-100 percentage
  progressLabel: string;
  salesThisMonth: number;
  salesLastMonth: number;
  partnerQualifyingMonths: number;
}

export async function getTierProgress(affiliateId: string): Promise<TierProgressInfo | null> {
  if (!prisma) return null;

  // First check for monthly reset
  await checkAndResetMonthlySales(affiliateId);

  const affiliate = await prisma.affiliate.findUnique({
    where: { id: affiliateId },
    select: {
      tier: true,
      totalConversions: true,
      currentMonthSales: true,
      lastMonthSales: true,
      partnerQualifyingMonths: true,
      commissionRate: true,
    },
  });

  if (!affiliate) return null;

  const tierNames: Record<AffiliateTier, string> = {
    STARTER: 'Starter',
    ACTIVE: 'Active',
    PARTNER: 'Partner',
  };

  let nextTier: AffiliateTier | null = null;
  let progressToNext = 0;
  let progressLabel = '';

  switch (affiliate.tier) {
    case 'STARTER':
      nextTier = 'ACTIVE';
      progressToNext = Math.min(100, (affiliate.totalConversions / TIER_THRESHOLDS.ACTIVE) * 100);
      progressLabel = `${affiliate.totalConversions}/${TIER_THRESHOLDS.ACTIVE} sales to Active`;
      break;
    case 'ACTIVE':
      nextTier = 'PARTNER';
      // Progress based on qualifying months
      progressToNext = Math.min(100, (affiliate.partnerQualifyingMonths / TIER_THRESHOLDS.PARTNER_MONTHS) * 100);
      progressLabel = `${affiliate.partnerQualifyingMonths}/${TIER_THRESHOLDS.PARTNER_MONTHS} qualifying months to Partner`;
      break;
    case 'PARTNER':
      nextTier = null;
      progressToNext = 100;
      progressLabel = 'You\'ve reached the highest tier!';
      break;
  }

  return {
    currentTier: affiliate.tier,
    currentTierName: tierNames[affiliate.tier],
    commissionRate: affiliate.commissionRate,
    nextTier,
    nextTierName: nextTier ? tierNames[nextTier] : null,
    nextTierRate: nextTier ? COMMISSION_RATES[nextTier] : null,
    progressToNext,
    progressLabel,
    salesThisMonth: affiliate.currentMonthSales,
    salesLastMonth: affiliate.lastMonthSales,
    partnerQualifyingMonths: affiliate.partnerQualifyingMonths,
  };
}
