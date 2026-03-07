import crypto from 'node:crypto';

import prisma from '@/lib/prisma';
import type { Prisma } from '@/generated/client/client';
import {
  calculateMilestoneProgress,
  generateReferralCode as generateReferralCodeValue,
  generateShareUrls,
  maskEmail,
  REFERRAL_CONFIG,
} from '@/lib/referral';
import type { AuditAction, CustomerSegment } from '@/generated/client/client';

export interface ReferralDashboardReward {
  id: string;
  type: 'discount' | 'credit' | 'free_product';
  value: number;
  description: string;
  code?: string;
  expiresAt: string;
  isUsed: boolean;
  createdAt: string;
}

export interface ReferralDashboardActivity {
  id: string;
  refereeEmail: string;
  refereeName?: string;
  status: 'clicked' | 'signed_up' | 'purchased' | 'expired';
  createdAt: string;
  completedAt?: string;
  orderValue?: number;
  rewardIssued?: boolean;
}

export interface ReferralDashboardData {
  userId: string;
  referralCode: string;
  shareUrl: string;
  totalReferrals: number;
  completedReferrals: number;
  pendingReferrals: number;
  totalEarned: number;
  availableCredit: number;
  availableRewards: ReferralDashboardReward[];
  recentActivity: ReferralDashboardActivity[];
  milestoneProgress: {
    current: number;
    target: number;
    nextReward: string;
    progress: number;
  };
  socialShares: {
    email: number;
    sms: number;
    facebook: number;
    whatsapp: number;
    linkedin: number;
    total: number;
  };
}

export interface ReferralValidationSuccess {
  referralCodeId: string;
  code: string;
  referrerUserId: string;
  referrerName: string;
  discount: number;
  usesRemaining: number;
  expiresAt?: string;
}

export interface ReferralAnalytics {
  overview: {
    totalReferrals: number;
    activeReferrers: number;
    conversionRate: number;
    averageOrderValue: number;
    totalRevenueGenerated: number;
    viralCoefficient: number;
    costPerAcquisition: number;
    customerLifetimeValue: number;
  };
  performance: {
    clickThroughRate: number;
    signupConversionRate: number;
    purchaseConversionRate: number;
    timeToConversion: number;
    referralQuality: number;
    churnRate: number;
    monthlyGrowthRate: number;
    seasonalTrends: Array<{
      month: string;
      performanceIndex: number;
      bestPerformingDays: string[];
    }>;
  };
  trends: Array<{
    date: string;
    referrals: number;
    conversions: number;
    revenue: number;
    newReferrers: number;
  }>;
  topPerformers: Array<{
    referrerCode: string;
    referrerName: string;
    totalReferrals: number;
    successfulConversions: number;
    revenueGenerated: number;
    conversionRate: number;
    averageTimeToConvert: number;
  }>;
  conversionFunnel: Array<{
    stage: string;
    count: number;
    conversionRate: number;
    dropoffRate: number;
  }>;
  socialChannels: Array<{
    platform: string;
    shares: number;
    clicks: number;
    conversions: number;
    conversionRate: number;
    revenuePerShare: number;
  }>;
  cohortAnalysis: Array<{
    cohortMonth: string;
    referrersAcquired: number;
    month1Retention: number;
    month3Retention: number;
    month6Retention: number;
    lifetimeValue: number;
  }>;
  revenueImpact: {
    totalRevenueFromReferrals: number;
    revenueGrowthRate: number;
    averageOrderValueTrend: number[];
    revenueBySource: Array<{ source: string; revenue: number }>;
    profitMarginImpact: number;
  };
}

interface EnsureReferralCodeOptions {
  email: string;
  userName?: string;
}

interface CompleteReferralPurchaseOptions {
  referralCode: string;
  refereeEmail: string;
  orderId: string;
  orderValue?: number | null;
}

interface TimeframeWindow {
  currentStart: Date;
  previousStart: Date;
  label: string;
}

type RewardType = 'REFERRAL_CREDIT' | 'MILESTONE_BONUS' | 'PROMOTIONAL';
type RewardStatus = 'AVAILABLE' | 'USED' | 'EXPIRED' | 'CANCELLED';
type RedemptionStatus = 'PENDING' | 'COMPLETED' | 'EXPIRED' | 'CANCELLED';

const COMPLETED_ORDER_STATUSES = ['PAID', 'SHIPPED', 'DELIVERED'] as const;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function requirePrisma() {
  if (!prisma) {
    throw new Error('Database not available');
  }

  return prisma;
}

export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

export function normalizeReferralCode(code: string): string {
  return code.toUpperCase().trim();
}

export function getReferralTimeframeWindow(timeframe: string): TimeframeWindow {
  const now = new Date();
  const currentStart = new Date(now);
  const previousStart = new Date(now);

  switch (timeframe) {
    case '7d':
      currentStart.setDate(now.getDate() - 7);
      previousStart.setDate(now.getDate() - 14);
      return { currentStart, previousStart, label: '7d' };
    case '90d':
      currentStart.setDate(now.getDate() - 90);
      previousStart.setDate(now.getDate() - 180);
      return { currentStart, previousStart, label: '90d' };
    case '1y':
      currentStart.setFullYear(now.getFullYear() - 1);
      previousStart.setFullYear(now.getFullYear() - 2);
      return { currentStart, previousStart, label: '1y' };
    case '30d':
    default:
      currentStart.setDate(now.getDate() - 30);
      previousStart.setDate(now.getDate() - 60);
      return { currentStart, previousStart, label: '30d' };
  }
}

function mapRewardType(type: RewardType): ReferralDashboardReward['type'] {
  if (type === 'MILESTONE_BONUS') {
    return 'free_product';
  }

  if (type === 'PROMOTIONAL') {
    return 'discount';
  }

  return 'credit';
}

function mapActivityStatus(redemption: {
  status: RedemptionStatus;
  signedUpAt: Date | null;
  purchasedAt: Date | null;
}): ReferralDashboardActivity['status'] {
  if (redemption.status === 'COMPLETED' || redemption.purchasedAt) {
    return 'purchased';
  }

  if (redemption.status === 'EXPIRED' || redemption.status === 'CANCELLED') {
    return 'expired';
  }

  if (redemption.signedUpAt) {
    return 'signed_up';
  }

  return 'clicked';
}

function createAuditActionValue(action: AuditAction): AuditAction {
  return action;
}

async function writeAuditLog(input: {
  action: AuditAction;
  entity: string;
  entityId: string;
  userId?: string;
  changes?: Prisma.InputJsonValue;
  ipAddress?: string;
  userAgent?: string;
}) {
  const db = requirePrisma();

  await db.auditLog.create({
    data: {
      action: createAuditActionValue(input.action),
      entity: input.entity,
      entityId: input.entityId,
      userId: input.userId,
      changes: input.changes,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
    },
  });
}

async function generateUniqueReferralCode(userName: string): Promise<string> {
  const db = requirePrisma();

  for (let attempt = 0; attempt < 10; attempt++) {
    const nextCode = generateReferralCodeValue(userName);
    const existing = await db.referralCode.findUnique({
      where: { code: nextCode },
      select: { id: true },
    });

    if (!existing) {
      return nextCode;
    }
  }

  return `REF${crypto.randomBytes(4).toString('hex').toUpperCase()}-PURR`;
}

export async function ensureReferralCodeForEmail({
  email,
  userName,
}: EnsureReferralCodeOptions): Promise<{
  user: { id: string; email: string | null; name: string | null };
  referralCode: { id: string; code: string; expiresAt: Date | null };
}> {
  const db = requirePrisma();
  const normalizedEmail = normalizeEmail(email);
  const resolvedName = (userName || normalizedEmail.split('@')[0] || 'Friend').trim().slice(0, 80);

  let user = await db.user.findUnique({
    where: { email: normalizedEmail },
    include: { referralCode: true },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        email: normalizedEmail,
        name: resolvedName,
      },
      include: { referralCode: true },
    });
  } else if (!user.name && resolvedName) {
    user = await db.user.update({
      where: { id: user.id },
      data: { name: resolvedName },
      include: { referralCode: true },
    });
  }

  if (user.referralCode) {
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      referralCode: {
        id: user.referralCode.id,
        code: user.referralCode.code,
        expiresAt: user.referralCode.expiresAt,
      },
    };
  }

  const code = await generateUniqueReferralCode(user.name || resolvedName);
  const referralCode = await db.referralCode.create({
    data: {
      code,
      userId: user.id,
      isActive: true,
      totalClicks: 0,
      totalSignups: 0,
      totalOrders: 0,
      totalEarnings: 0,
    },
  });

  await writeAuditLog({
    action: 'REFERRAL_CODE_GENERATED',
    entity: 'referral_codes',
    entityId: referralCode.id,
    userId: user.id,
    changes: {
      code: referralCode.code,
      generatedAt: new Date().toISOString(),
    },
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    referralCode: {
      id: referralCode.id,
      code: referralCode.code,
      expiresAt: referralCode.expiresAt,
    },
  };
}

export async function validateReferralCodeForEmail(
  code: string,
  email?: string
): Promise<ReferralValidationSuccess> {
  const db = requirePrisma();
  const normalizedCode = normalizeReferralCode(code);
  const normalizedEmail = email ? normalizeEmail(email) : undefined;

  const referralCode = await db.referralCode.findUnique({
    where: { code: normalizedCode },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!referralCode) {
    throw new Error('Referral code not found');
  }

  if (!referralCode.isActive) {
    throw new Error('This referral code is no longer active');
  }

  if (referralCode.expiresAt && referralCode.expiresAt < new Date()) {
    throw new Error('This referral code has expired');
  }

  if (referralCode.totalOrders >= REFERRAL_CONFIG.MAX_REFERRALS_PER_USER) {
    throw new Error('This referral code has reached its maximum uses');
  }

  if (
    normalizedEmail &&
    referralCode.user.email &&
    normalizeEmail(referralCode.user.email) === normalizedEmail
  ) {
    throw new Error('You cannot use your own referral code');
  }

  return {
    referralCodeId: referralCode.id,
    code: referralCode.code,
    referrerUserId: referralCode.user.id,
    referrerName: referralCode.user.name?.split(' ')[0] || 'A friend',
    discount: REFERRAL_CONFIG.REFEREE_DISCOUNT,
    usesRemaining: REFERRAL_CONFIG.MAX_REFERRALS_PER_USER - referralCode.totalOrders,
    expiresAt: referralCode.expiresAt?.toISOString(),
  };
}

export async function upsertPendingReferralRedemption(options: {
  code: string;
  email: string;
}): Promise<ReferralValidationSuccess> {
  const db = requirePrisma();
  const validation = await validateReferralCodeForEmail(options.code, options.email);
  const normalizedEmail = normalizeEmail(options.email);

  const existingAny = await db.referralRedemption.findFirst({
    where: {
      refereeEmail: normalizedEmail,
      status: { in: ['PENDING', 'COMPLETED'] },
    },
    select: {
      id: true,
      referralCodeId: true,
      status: true,
    },
  });

  if (existingAny && existingAny.referralCodeId !== validation.referralCodeId) {
    throw new Error('You have already used a referral code');
  }

  if (existingAny && existingAny.status === 'COMPLETED') {
    throw new Error('You have already used a referral code');
  }

  if (existingAny) {
    await db.referralRedemption.update({
      where: { id: existingAny.id },
      data: {
        clickedAt: new Date(),
        signedUpAt: existingAny.status === 'PENDING' ? undefined : new Date(),
      },
    });
  } else {
    await db.referralRedemption.create({
      data: {
        referralCodeId: validation.referralCodeId,
        refereeEmail: normalizedEmail,
        status: 'PENDING',
        refereeDiscount: REFERRAL_CONFIG.REFEREE_DISCOUNT,
        referrerCredit: REFERRAL_CONFIG.REFERRER_CREDIT,
        clickedAt: new Date(),
      },
    });

    await db.referralCode.update({
      where: { id: validation.referralCodeId },
      data: {
        totalClicks: { increment: 1 },
      },
    });
  }

  return validation;
}

export async function getReferralDashboardData(
  identifier: string
): Promise<ReferralDashboardData | null> {
  const db = requirePrisma();
  const normalizedIdentifier = identifier.toLowerCase();
  const isEmailLookup = normalizedIdentifier.includes('@');

  const user = await db.user.findUnique({
    where: isEmailLookup ? { email: normalizedIdentifier } : { id: identifier },
    include: {
      referralCode: {
        include: {
          redemptions: {
            orderBy: { createdAt: 'desc' },
            take: 20,
          },
        },
      },
      referralRewards: {
        orderBy: { createdAt: 'desc' },
        take: 20,
      },
    },
  });

  if (!user) {
    return null;
  }

  const userName = user.name?.split(' ')[0] || user.email?.split('@')[0] || 'Friend';

  if (!user.referralCode) {
    return {
      userId: user.id,
      referralCode: '',
      shareUrl: '',
      totalReferrals: 0,
      completedReferrals: 0,
      pendingReferrals: 0,
      totalEarned: 0,
      availableCredit: 0,
      availableRewards: [],
      recentActivity: [],
      milestoneProgress: {
        current: 0,
        target: 5,
        nextReward: '$10 bonus',
        progress: 0,
      },
      socialShares: {
        email: 0,
        sms: 0,
        facebook: 0,
        whatsapp: 0,
        linkedin: 0,
        total: 0,
      },
    };
  }

  const codeRecord = user.referralCode;
  const pendingReferrals = codeRecord.redemptions.filter((item) => item.status === 'PENDING').length;
  const completedReferrals = codeRecord.totalOrders;
  const totalReferrals = Math.max(
    codeRecord.totalClicks,
    codeRecord.totalSignups,
    completedReferrals + pendingReferrals
  );
  const milestone = calculateMilestoneProgress(completedReferrals);
  const shareUrls = generateShareUrls(codeRecord.code, userName);

  const availableRewards = user.referralRewards
    .filter((reward) => reward.status === 'AVAILABLE')
    .map((reward) => ({
      id: reward.id,
      type: mapRewardType(reward.type as RewardType),
      value: reward.amount,
      description: reward.description || `$${reward.amount.toFixed(2)} referral credit`,
      expiresAt:
        reward.expiresAt?.toISOString() ||
        new Date(Date.now() + (REFERRAL_CONFIG.REWARD_EXPIRY_DAYS * MS_PER_DAY)).toISOString(),
      isUsed: reward.status === 'USED',
      createdAt: reward.createdAt.toISOString(),
    }));

  const availableCredit = user.referralRewards
    .filter(
      (reward) =>
        reward.status === 'AVAILABLE' &&
        (reward.type === 'REFERRAL_CREDIT' || reward.type === 'PROMOTIONAL')
    )
    .reduce((sum, reward) => sum + reward.amount, 0);

  const recentActivity = codeRecord.redemptions.slice(0, 10).map((redemption) => ({
    id: redemption.id,
    refereeEmail: maskEmail(redemption.refereeEmail),
    status: mapActivityStatus({
      status: redemption.status as RedemptionStatus,
      signedUpAt: redemption.signedUpAt,
      purchasedAt: redemption.purchasedAt,
    }),
    createdAt: redemption.clickedAt?.toISOString() || redemption.createdAt.toISOString(),
    completedAt: redemption.purchasedAt?.toISOString() || redemption.signedUpAt?.toISOString(),
    orderValue: redemption.referrerCredit || undefined,
    rewardIssued: redemption.status === 'COMPLETED',
  }));

  return {
    userId: user.id,
    referralCode: codeRecord.code,
    shareUrl: shareUrls.shareUrl,
    totalReferrals,
    completedReferrals,
    pendingReferrals,
    totalEarned: codeRecord.totalEarnings,
    availableCredit,
    availableRewards,
    recentActivity,
    milestoneProgress: {
      current: milestone.current,
      target: milestone.target,
      nextReward: milestone.nextReward,
      progress: milestone.progress,
    },
    socialShares: {
      email: 0,
      sms: 0,
      facebook: 0,
      whatsapp: 0,
      linkedin: 0,
      total: 0,
    },
  };
}

export async function completeReferralPurchase({
  referralCode,
  refereeEmail,
  orderId,
  orderValue: _orderValue,
}: CompleteReferralPurchaseOptions): Promise<{
  success: boolean;
  alreadyProcessed: boolean;
  rewardIssued: boolean;
  milestoneRewardIssued: boolean;
  referralId?: string;
  rewards?: {
    referrer: { type: 'credit'; value: number; description: string };
    referee: { type: 'discount'; value: number; description: string };
  };
}> {
  const db = requirePrisma();
  const normalizedEmail = normalizeEmail(refereeEmail);
  const validation = await validateReferralCodeForEmail(referralCode, normalizedEmail);

  const existingForOrder = await db.referralRedemption.findFirst({
    where: {
      refereeOrderId: orderId,
      status: 'COMPLETED',
    },
    select: {
      id: true,
      referralCodeId: true,
    },
  });

  if (existingForOrder) {
    return {
      success: true,
      alreadyProcessed: true,
      rewardIssued: existingForOrder.referralCodeId === validation.referralCodeId,
      milestoneRewardIssued: false,
      referralId: existingForOrder.id,
    };
  }

  const now = new Date();
  const pendingRedemption = await db.referralRedemption.findFirst({
    where: {
      referralCodeId: validation.referralCodeId,
      refereeEmail: normalizedEmail,
      status: 'PENDING',
    },
  });

  const existingRewardCount = await db.referralReward.count({
    where: {
      userId: validation.referrerUserId,
      type: 'REFERRAL_CREDIT',
      status: { in: ['AVAILABLE', 'USED'] },
    },
  });

  let rewardIssued = false;
  let milestoneRewardIssued = false;

  const shouldIncrementSignup = !pendingRedemption?.signedUpAt;

  const redemption = pendingRedemption
    ? await db.referralRedemption.update({
        where: { id: pendingRedemption.id },
        data: {
          status: 'COMPLETED',
          signedUpAt: pendingRedemption.signedUpAt ?? now,
          refereeOrderId: orderId,
          purchasedAt: now,
          rewardIssuedAt: now,
        },
      })
    : await db.referralRedemption.create({
        data: {
          referralCodeId: validation.referralCodeId,
          refereeEmail: normalizedEmail,
          refereeOrderId: orderId,
          status: 'COMPLETED',
          signedUpAt: now,
          purchasedAt: now,
          rewardIssuedAt: now,
          refereeDiscount: REFERRAL_CONFIG.REFEREE_DISCOUNT,
          referrerCredit: REFERRAL_CONFIG.REFERRER_CREDIT,
        },
      });

  const codeRecord = await db.referralCode.update({
    where: { id: validation.referralCodeId },
    data: {
      totalOrders: { increment: 1 },
      ...(shouldIncrementSignup ? { totalSignups: { increment: 1 } } : {}),
      totalEarnings:
        existingRewardCount < REFERRAL_CONFIG.MAX_REFERRALS_PER_USER
          ? { increment: REFERRAL_CONFIG.REFERRER_CREDIT }
          : undefined,
    },
  });

  if (existingRewardCount < REFERRAL_CONFIG.MAX_REFERRALS_PER_USER) {
    const reward = await db.referralReward.create({
      data: {
        userId: validation.referrerUserId,
        amount: REFERRAL_CONFIG.REFERRER_CREDIT,
        type: 'REFERRAL_CREDIT',
        description: `Referral from ${normalizedEmail}`,
        status: 'AVAILABLE',
        expiresAt: new Date(now.getTime() + (REFERRAL_CONFIG.REWARD_EXPIRY_DAYS * MS_PER_DAY)),
      },
    });

    rewardIssued = true;

    await writeAuditLog({
      action: 'REFERRAL_REWARD_ISSUED',
      entity: 'referral_rewards',
      entityId: reward.id,
      userId: validation.referrerUserId,
      changes: {
        amount: reward.amount,
        type: reward.type,
        referralCode: validation.code,
        refereeEmail: normalizedEmail,
        orderId,
      },
    });
  }

  const nextCompletedTotal = codeRecord.totalOrders;
  const milestoneDefinition = REFERRAL_CONFIG.MILESTONES.find(
    (milestone) => milestone.referrals === nextCompletedTotal
  );

  if (milestoneDefinition) {
    const existingMilestone = await db.referralReward.findFirst({
      where: {
        userId: validation.referrerUserId,
        type: 'MILESTONE_BONUS',
        description: milestoneDefinition.description,
      },
      select: { id: true },
    });

    if (!existingMilestone) {
      const milestoneReward = await db.referralReward.create({
        data: {
          userId: validation.referrerUserId,
          amount: milestoneDefinition.bonus,
          type: 'MILESTONE_BONUS',
          description: milestoneDefinition.description,
          status: 'AVAILABLE',
          expiresAt: new Date(now.getTime() + (REFERRAL_CONFIG.REWARD_EXPIRY_DAYS * MS_PER_DAY)),
        },
      });

      milestoneRewardIssued = true;

      await writeAuditLog({
        action: 'REFERRAL_REWARD_ISSUED',
        entity: 'referral_rewards',
        entityId: milestoneReward.id,
        userId: validation.referrerUserId,
        changes: {
          amount: milestoneReward.amount,
          type: milestoneReward.type,
          referralCode: validation.code,
          milestone: milestoneDefinition.referrals,
          orderId,
        },
      });
    }
  }

  return {
    success: true,
    alreadyProcessed: false,
    rewardIssued,
    milestoneRewardIssued,
    referralId: redemption.id,
    rewards: rewardIssued
      ? {
          referrer: {
            type: 'credit',
            value: REFERRAL_CONFIG.REFERRER_CREDIT,
            description: `$${REFERRAL_CONFIG.REFERRER_CREDIT} credit on the next order`,
          },
          referee: {
            type: 'discount',
            value: REFERRAL_CONFIG.REFEREE_DISCOUNT,
            description: `$${REFERRAL_CONFIG.REFEREE_DISCOUNT} off the first order`,
          },
        }
      : undefined,
  };
}

function roundToTwo(value: number): number {
  return Math.round(value * 100) / 100;
}

function percentage(part: number, whole: number): number {
  if (whole <= 0) return 0;
  return roundToTwo((part / whole) * 100);
}

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return roundToTwo(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function buildDateSeries(start: Date, end: Date): string[] {
  const dates: string[] = [];
  const cursor = new Date(start);
  cursor.setHours(0, 0, 0, 0);

  while (cursor <= end) {
    dates.push(cursor.toISOString().split('T')[0]);
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

export async function getReferralAnalyticsData(timeframe: string): Promise<ReferralAnalytics> {
  const db = requirePrisma();
  const { currentStart, previousStart } = getReferralTimeframeWindow(timeframe);
  const now = new Date();

  const [redemptions, previousRedemptions, orders, previousOrders, referralCodes, rewardRows] =
    await Promise.all([
      db.referralRedemption.findMany({
        where: {
          createdAt: { gte: currentStart },
        },
        include: {
          referralCode: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      }),
      db.referralRedemption.findMany({
        where: {
          createdAt: { gte: previousStart, lt: currentStart },
        },
      }),
      db.order.findMany({
        where: {
          createdAt: { gte: currentStart },
          referralCodeUsed: { not: null },
          status: { in: [...COMPLETED_ORDER_STATUSES] },
        },
        select: {
          id: true,
          createdAt: true,
          totalAmount: true,
          referralCodeUsed: true,
          customer: { select: { email: true } },
        },
      }),
      db.order.findMany({
        where: {
          createdAt: { gte: previousStart, lt: currentStart },
          referralCodeUsed: { not: null },
          status: { in: [...COMPLETED_ORDER_STATUSES] },
        },
        select: {
          id: true,
          totalAmount: true,
        },
      }),
      db.referralCode.findMany({
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      }),
      db.referralReward.findMany({
        where: {
          createdAt: { gte: currentStart },
          status: { in: ['AVAILABLE', 'USED'] as RewardStatus[] },
        },
        select: {
          amount: true,
          createdAt: true,
        },
      }),
    ]);

  const clicks = redemptions.filter((item) => item.clickedAt).length;
  const signups = redemptions.filter((item) => item.signedUpAt).length;
  const purchases = redemptions.filter((item) => item.status === 'COMPLETED' || item.purchasedAt).length;
  const activeReferrers = new Set(redemptions.map((item) => item.referralCodeId)).size;
  const totalRevenueGenerated = roundToTwo(
    orders.reduce((sum, order) => sum + order.totalAmount, 0)
  );
  const averageOrderValue = average(orders.map((order) => order.totalAmount));
  const referralCosts = roundToTwo(rewardRows.reduce((sum, reward) => sum + reward.amount, 0));

  const referredEmails = Array.from(
    new Set(
      orders
        .map((order) => order.customer?.email)
        .filter((value): value is string => Boolean(value))
        .map((email) => normalizeEmail(email))
    )
  );

  const referredCustomerMetrics = referredEmails.length
    ? await db.customerMetrics.findMany({
        where: { email: { in: referredEmails } },
        select: {
          email: true,
          predictedLTV: true,
          segment: true,
        },
      })
    : [];
  const metricsByEmail = new Map(
    referredCustomerMetrics.map((item) => [normalizeEmail(item.email), item])
  );

  const customerLifetimeValue = average(
    referredCustomerMetrics
      .map((item) => item.predictedLTV ?? 0)
      .filter((value) => value > 0)
  );

  const atRiskCount = referredCustomerMetrics.filter(
    (item) => item.segment === 'AT_RISK' || item.segment === 'CHURNED'
  ).length;
  const churnRate = percentage(atRiskCount, referredCustomerMetrics.length);

  const previousPurchases = previousRedemptions.filter(
    (item) => item.status === 'COMPLETED' || item.purchasedAt
  ).length;
  const monthlyGrowthRate = previousPurchases
    ? roundToTwo(((purchases - previousPurchases) / previousPurchases) * 100)
    : purchases > 0
      ? 100
      : 0;

  const timeToConversionValues = redemptions
    .filter((item) => item.clickedAt && item.purchasedAt)
    .map((item) => {
      const diffMs = item.purchasedAt!.getTime() - item.clickedAt!.getTime();
      return diffMs > 0 ? diffMs / MS_PER_DAY : 0;
    });
  const timeToConversion = average(timeToConversionValues);

  const referredCodes = new Set(orders.map((order) => order.referralCodeUsed).filter(Boolean));
  const referredCodeCount = referredCodes.size;
  const viralCoefficient = activeReferrers > 0 ? roundToTwo(signups / activeReferrers) : 0;

  const trendMap = new Map<string, {
    referrals: number;
    conversions: number;
    revenue: number;
    newReferrers: Set<string>;
  }>();
  const trendDates = buildDateSeries(currentStart, now);
  for (const date of trendDates) {
    trendMap.set(date, {
      referrals: 0,
      conversions: 0,
      revenue: 0,
      newReferrers: new Set<string>(),
    });
  }

  for (const redemption of redemptions) {
    const createdKey = redemption.createdAt.toISOString().split('T')[0];
    const entry = trendMap.get(createdKey);
    if (!entry) continue;
    entry.referrals += 1;
    entry.newReferrers.add(redemption.referralCodeId);
    if (redemption.status === 'COMPLETED' || redemption.purchasedAt) {
      entry.conversions += 1;
    }
  }

  for (const order of orders) {
    const key = order.createdAt.toISOString().split('T')[0];
    const entry = trendMap.get(key);
    if (!entry) continue;
    entry.revenue = roundToTwo(entry.revenue + order.totalAmount);
  }

  const trends = Array.from(trendMap.entries()).map(([date, value]) => ({
    date,
    referrals: value.referrals,
    conversions: value.conversions,
    revenue: roundToTwo(value.revenue),
    newReferrers: value.newReferrers.size,
  }));

  const codesById = new Map(referralCodes.map((code) => [code.id, code]));
  const codesByCode = new Map(referralCodes.map((code) => [code.code, code]));

  const performerMap = new Map<
    string,
    {
      referrerCode: string;
      referrerName: string;
      totalReferrals: number;
      successfulConversions: number;
      revenueGenerated: number;
      timeToConvert: number[];
    }
  >();

  for (const redemption of redemptions) {
    const code = codesById.get(redemption.referralCodeId);
    if (!code) continue;
    const current = performerMap.get(code.code) || {
      referrerCode: code.code,
      referrerName: code.user.name?.split(' ')[0] || code.user.email?.split('@')[0] || 'Friend',
      totalReferrals: 0,
      successfulConversions: 0,
      revenueGenerated: 0,
      timeToConvert: [],
    };

    current.totalReferrals += 1;
    if (redemption.status === 'COMPLETED' || redemption.purchasedAt) {
      current.successfulConversions += 1;
      if (redemption.clickedAt && redemption.purchasedAt) {
        current.timeToConvert.push(
          Math.max(0, (redemption.purchasedAt.getTime() - redemption.clickedAt.getTime()) / MS_PER_DAY)
        );
      }
    }

    performerMap.set(code.code, current);
  }

  for (const order of orders) {
    if (!order.referralCodeUsed) continue;
    const code = codesByCode.get(order.referralCodeUsed);
    if (!code) continue;
    const current = performerMap.get(code.code);
    if (!current) continue;
    current.revenueGenerated = roundToTwo(current.revenueGenerated + order.totalAmount);
  }

  const topPerformers = Array.from(performerMap.values())
    .map((performer) => ({
      referrerCode: performer.referrerCode,
      referrerName: performer.referrerName,
      totalReferrals: performer.totalReferrals,
      successfulConversions: performer.successfulConversions,
      revenueGenerated: roundToTwo(performer.revenueGenerated),
      conversionRate: percentage(performer.successfulConversions, performer.totalReferrals),
      averageTimeToConvert: average(performer.timeToConvert),
    }))
    .sort((left, right) => right.successfulConversions - left.successfulConversions || right.revenueGenerated - left.revenueGenerated)
    .slice(0, 10);

  const funnelStages = [
    { stage: 'Link Clicked', count: clicks },
    { stage: 'Signed Up', count: signups },
    { stage: 'Purchase Completed', count: purchases },
  ];

  const conversionFunnel = funnelStages.map((stage, index) => ({
    stage: stage.stage,
    count: stage.count,
    conversionRate: percentage(stage.count, funnelStages[0].count || stage.count || 1),
    dropoffRate:
      index === 0
        ? 0
        : percentage(
            Math.max(0, funnelStages[index - 1].count - stage.count),
            funnelStages[index - 1].count || 1
          ),
  }));

  const socialChannels = [
    {
      platform: 'Direct referral link',
      shares: referredCodeCount,
      clicks,
      conversions: purchases,
      conversionRate: percentage(purchases, clicks),
      revenuePerShare: referredCodeCount ? roundToTwo(totalRevenueGenerated / referredCodeCount) : 0,
    },
  ];

  const monthBuckets = new Map<string, { referrals: number; purchases: number; revenue: number }>();
  for (const redemption of redemptions) {
    const key = monthKey(redemption.createdAt);
    const entry = monthBuckets.get(key) || { referrals: 0, purchases: 0, revenue: 0 };
    entry.referrals += 1;
    if (redemption.status === 'COMPLETED' || redemption.purchasedAt) {
      entry.purchases += 1;
    }
    monthBuckets.set(key, entry);
  }

  for (const order of orders) {
    const key = monthKey(order.createdAt);
    const entry = monthBuckets.get(key) || { referrals: 0, purchases: 0, revenue: 0 };
    entry.revenue = roundToTwo(entry.revenue + order.totalAmount);
    monthBuckets.set(key, entry);
  }

  const sortedMonthKeys = Array.from(monthBuckets.keys()).sort();
  const maxMonthPurchases = Math.max(
    1,
    ...Array.from(monthBuckets.values()).map((bucket) => bucket.purchases)
  );

  const seasonalTrends = sortedMonthKeys.slice(-3).map((key) => {
    const bucket = monthBuckets.get(key)!;
    return {
      month: key,
      performanceIndex: roundToTwo((bucket.purchases / maxMonthPurchases) * 100),
      bestPerformingDays: ['Tuesday', 'Wednesday', 'Thursday'],
    };
  });

  const cohortMap = new Map<string, { emails: Set<string>; ltv: number[]; segments: CustomerSegment[] }>();
  for (const order of orders) {
    const email = order.customer?.email ? normalizeEmail(order.customer.email) : null;
    if (!email) continue;
    const key = monthKey(order.createdAt);
    const entry = cohortMap.get(key) || { emails: new Set<string>(), ltv: [], segments: [] };
    entry.emails.add(email);
    const metric = metricsByEmail.get(email);
    if (metric?.predictedLTV) {
      entry.ltv.push(metric.predictedLTV);
    }
    if (metric?.segment) {
      entry.segments.push(metric.segment);
    }
    cohortMap.set(key, entry);
  }

  const cohortAnalysis = Array.from(cohortMap.entries())
    .sort(([left], [right]) => right.localeCompare(left))
    .slice(0, 12)
    .map(([month, entry]) => {
      const retainedMonth1 = entry.segments.filter(
        (segment) => segment === 'RETURNING' || segment === 'LOYAL' || segment === 'VIP'
      ).length;
      const retainedMonth3 = entry.segments.filter(
        (segment) => segment === 'LOYAL' || segment === 'VIP'
      ).length;
      const retainedMonth6 = entry.segments.filter((segment) => segment === 'VIP').length;

      return {
        cohortMonth: month,
        referrersAcquired: entry.emails.size,
        month1Retention: percentage(retainedMonth1, entry.emails.size),
        month3Retention: percentage(retainedMonth3, entry.emails.size),
        month6Retention: percentage(retainedMonth6, entry.emails.size),
        lifetimeValue: average(entry.ltv),
      };
    });

  const averageOrderValueTrend = sortedMonthKeys
    .slice(-5)
    .map((key) => {
      const currentOrders = orders.filter((order) => monthKey(order.createdAt) === key);
      return average(currentOrders.map((order) => order.totalAmount));
    })
    .filter((value) => value > 0);

  const previousRevenue = roundToTwo(
    previousOrders.reduce((sum, order) => sum + order.totalAmount, 0)
  );
  const revenueGrowthRate = previousRevenue
    ? roundToTwo(((totalRevenueGenerated - previousRevenue) / previousRevenue) * 100)
    : totalRevenueGenerated > 0
      ? 100
      : 0;

  const revenueBySource = [
    {
      source: 'Referral codes',
      revenue: totalRevenueGenerated,
    },
  ];

  return {
    overview: {
      totalReferrals: redemptions.length,
      activeReferrers,
      conversionRate: percentage(purchases, redemptions.length),
      averageOrderValue,
      totalRevenueGenerated,
      viralCoefficient,
      costPerAcquisition: purchases ? roundToTwo(referralCosts / purchases) : 0,
      customerLifetimeValue,
    },
    performance: {
      clickThroughRate: percentage(clicks, redemptions.length || clicks || 1),
      signupConversionRate: percentage(signups, clicks),
      purchaseConversionRate: percentage(purchases, signups || clicks || 1),
      timeToConversion,
      referralQuality: percentage(purchases, redemptions.length),
      churnRate,
      monthlyGrowthRate,
      seasonalTrends,
    },
    trends,
    topPerformers,
    conversionFunnel,
    socialChannels,
    cohortAnalysis,
    revenueImpact: {
      totalRevenueFromReferrals: totalRevenueGenerated,
      revenueGrowthRate,
      averageOrderValueTrend,
      revenueBySource,
      profitMarginImpact: totalRevenueGenerated
        ? roundToTwo(((totalRevenueGenerated - referralCosts) / totalRevenueGenerated) * 100)
        : 0,
    },
  };
}
