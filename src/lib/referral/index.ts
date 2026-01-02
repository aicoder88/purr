/**
 * Referral Program Library
 * Sprint 6C: "Give $5, Get $5" Referral System
 */

import crypto from 'node:crypto';

// Constants for the referral program
export const REFERRAL_CONFIG = {
  // Reward amounts
  REFERRER_CREDIT: 5.00, // $5 credit for referrer
  REFEREE_DISCOUNT: 5.00, // $5 off for referee

  // Milestones and bonuses
  MILESTONES: [
    { referrals: 5, bonus: 10.00, description: '5 Referrals Milestone' },
    { referrals: 10, bonus: 25.00, description: '10 Referrals Milestone' },
    { referrals: 25, bonus: 50.00, description: '25 Referrals Milestone' },
  ],

  // Code generation
  CODE_SUFFIX: 'PURR',
  CODE_MAX_LENGTH: 15,

  // Expiration
  REWARD_EXPIRY_DAYS: 90, // Rewards expire after 90 days
  REDEMPTION_EXPIRY_DAYS: 30, // Pending redemptions expire after 30 days

  // Limits
  MAX_REFERRALS_PER_USER: 100, // Maximum referrals per user
} as const;

/**
 * Generate a unique referral code based on user's name
 * Format: NAME##-PURR (e.g., SARAH15-PURR)
 */
export function generateReferralCode(userName: string): string {
  // Sanitize and uppercase the name
  const sanitizedName = userName
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase()
    .substring(0, 8);

  // Generate random suffix (1-99)
  const randomSuffix = Math.floor(Math.random() * 99) + 1;

  // Combine to create code
  const code = `${sanitizedName}${randomSuffix}-${REFERRAL_CONFIG.CODE_SUFFIX}`;

  return code.substring(0, REFERRAL_CONFIG.CODE_MAX_LENGTH);
}

/**
 * Validate referral code format
 * Format: NAME##-PURR (e.g., SARAH15-PURR)
 */
export function validateReferralCodeFormat(code: string): boolean {
  const codeRegex = /^[A-Z]{1,8}\d{1,2}-PURR$/;
  return codeRegex.test(code);
}

/**
 * Generate a unique token for tracking referral clicks
 */
export function generateReferralToken(): string {
  return crypto.randomBytes(16).toString('hex');
}

/**
 * Calculate milestone bonus for a given number of referrals
 */
export function calculateMilestoneBonus(totalReferrals: number): { bonus: number; description: string } | null {
  // Find the highest milestone reached
  for (let i = REFERRAL_CONFIG.MILESTONES.length - 1; i >= 0; i--) {
    const milestone = REFERRAL_CONFIG.MILESTONES[i];
    if (totalReferrals === milestone.referrals) {
      return { bonus: milestone.bonus, description: milestone.description };
    }
  }
  return null;
}

/**
 * Get next milestone for a user
 */
export function getNextMilestone(currentReferrals: number): { target: number; bonus: number; description: string } | null {
  for (const milestone of REFERRAL_CONFIG.MILESTONES) {
    if (currentReferrals < milestone.referrals) {
      return {
        target: milestone.referrals,
        bonus: milestone.bonus,
        description: milestone.description,
      };
    }
  }
  return null;
}

/**
 * Calculate progress to next milestone
 */
export function calculateMilestoneProgress(currentReferrals: number): {
  current: number;
  target: number;
  progress: number;
  nextReward: string;
} {
  const nextMilestone = getNextMilestone(currentReferrals);

  if (!nextMilestone) {
    // All milestones reached
    return {
      current: currentReferrals,
      target: currentReferrals,
      progress: 100,
      nextReward: 'All milestones achieved!',
    };
  }

  // Find previous milestone or 0
  let previousTarget = 0;
  for (const milestone of REFERRAL_CONFIG.MILESTONES) {
    if (milestone.referrals < nextMilestone.target && milestone.referrals <= currentReferrals) {
      previousTarget = milestone.referrals;
    }
  }

  const progressInRange = currentReferrals - previousTarget;
  const rangeSize = nextMilestone.target - previousTarget;
  const progress = (progressInRange / rangeSize) * 100;

  return {
    current: currentReferrals,
    target: nextMilestone.target,
    progress: Math.round(progress * 10) / 10,
    nextReward: `$${nextMilestone.bonus} bonus`,
  };
}

/**
 * Generate social share URLs for a referral code
 */
export function generateShareUrls(code: string, referrerName: string) {
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://purrify.ca'}/refer/${code}`;
  const message = `Get $5 off Purrify cat litter deodorizer! Use my code ${code} or click here:`;
  const fullMessage = `${referrerName} wants to share Purrify with you! ${message}`;

  return {
    shareUrl,
    email: {
      subject: `${referrerName} sent you $5 off Purrify!`,
      body: `Hi!\n\n${fullMessage}\n\n${shareUrl}\n\nPurrify uses activated carbon to eliminate litter box odors - no more embarrassing smells!\n\nBest,\n${referrerName}`,
    },
    sms: {
      text: `${message} ${shareUrl}`,
    },
    facebook: {
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(fullMessage)}`,
    },
    twitter: {
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${message} ${shareUrl} #CatLitterDeodorizer #Purrify`)}`,
    },
    whatsapp: {
      url: `https://wa.me/?text=${encodeURIComponent(`${fullMessage} ${shareUrl}`)}`,
    },
    linkedin: {
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
  };
}

/**
 * Sanitize user input for code generation
 */
export function sanitizeForCode(input: string): string {
  return input
    .trim()
    .replace(/[^a-zA-Z0-9]/g, '')
    .substring(0, 50);
}

/**
 * Calculate reward expiry date
 */
export function calculateRewardExpiry(): Date {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + REFERRAL_CONFIG.REWARD_EXPIRY_DAYS);
  return expiry;
}

/**
 * Calculate redemption expiry date (for pending referrals)
 */
export function calculateRedemptionExpiry(): Date {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + REFERRAL_CONFIG.REDEMPTION_EXPIRY_DAYS);
  return expiry;
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(amount);
}

/**
 * Mask email for privacy
 */
export function maskEmail(email: string): string {
  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) return '***@***.***';

  const maskedLocal = localPart.length > 2
    ? `${localPart[0]}***${localPart[localPart.length - 1]}`
    : '***';

  return `${maskedLocal}@${domain}`;
}

// Type exports
export interface ReferralStats {
  code: string;
  shareUrl: string;
  totalClicks: number;
  totalSignups: number;
  totalOrders: number;
  totalEarnings: number;
  pendingReferrals: number;
  availableCredit: number;
  milestoneProgress: {
    current: number;
    target: number;
    progress: number;
    nextReward: string;
  };
}

export interface ReferralRedemptionData {
  refereeEmail: string;
  status: 'PENDING' | 'COMPLETED' | 'EXPIRED' | 'CANCELLED';
  refereeDiscount: number;
  referrerCredit: number;
  createdAt: Date;
  purchasedAt?: Date;
}

export interface ReferralRewardData {
  id: string;
  amount: number;
  type: 'REFERRAL_CREDIT' | 'MILESTONE_BONUS' | 'PROMOTIONAL';
  description: string;
  status: 'AVAILABLE' | 'USED' | 'EXPIRED' | 'CANCELLED';
  expiresAt?: Date;
  createdAt: Date;
}
