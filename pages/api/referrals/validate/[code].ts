/**
 * GET /api/referrals/validate/[code]
 * Validate a referral code and return referrer details
 *
 * Sprint 6C: "Give $5, Get $5" Referral Program
 */

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../src/lib/prisma';
import {
  validateReferralCodeFormat,
  REFERRAL_CONFIG,
} from '../../../../src/lib/referral';
import { getProductPrice, formatProductPrice } from '../../../../src/lib/pricing';

interface ReferralCodeValidation {
  isValid: boolean;
  code?: string;
  referrerName?: string;
  discount?: {
    type: 'percentage' | 'fixed' | 'free_trial';
    value: number;
    description: string;
  };
  expiresAt?: string;
  usesRemaining?: number;
  message?: string;
  error?: string;
}

// Fallback mock data for when database is not available
interface MockReferralCode {
  id: string;
  userId: string;
  code: string;
  referrerName: string;
  isActive: boolean;
  maxUses: number;
  currentUses: number;
  expiresAt: string;
}

const getMockReferralCode = (code: string): MockReferralCode | null => {
  const mockCodes: Record<string, MockReferralCode> = {
    'SARAH15-PURR': {
      id: 'ref_001',
      userId: 'user_001',
      code: 'SARAH15-PURR',
      referrerName: 'Sarah M.',
      isActive: true,
      maxUses: 100,
      currentUses: 12,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    },
    'MIKE42-PURR': {
      id: 'ref_002',
      userId: 'user_002',
      code: 'MIKE42-PURR',
      referrerName: 'Michael R.',
      isActive: true,
      maxUses: 100,
      currentUses: 7,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    },
    // Legacy format support
    'SARAH15-CAT': {
      id: 'ref_003',
      userId: 'user_001',
      code: 'SARAH15-CAT',
      referrerName: 'Sarah M.',
      isActive: true,
      maxUses: 100,
      currentUses: 12,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    },
    'MIKE42-CAT': {
      id: 'ref_004',
      userId: 'user_002',
      code: 'MIKE42-CAT',
      referrerName: 'Michael R.',
      isActive: true,
      maxUses: 100,
      currentUses: 7,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    },
  };

  return mockCodes[code] ?? null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReferralCodeValidation>
) {
  const { code } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({
      isValid: false,
      error: 'Method not allowed',
    });
  }

  if (!code || typeof code !== 'string') {
    return res.status(400).json({
      isValid: false,
      error: 'Referral code is required',
    });
  }

  const normalizedCode = code.toUpperCase().trim();

  try {
    // Try database first
    if (prisma) {
      const referralCode = await prisma.referralCode.findUnique({
        where: { code: normalizedCode },
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      });

      if (referralCode) {
        // Check if code is active
        if (!referralCode.isActive) {
          return res.status(400).json({
            isValid: false,
            error: 'This referral code is no longer active',
          });
        }

        // Check expiration
        if (referralCode.expiresAt && referralCode.expiresAt < new Date()) {
          return res.status(400).json({
            isValid: false,
            error: 'This referral code has expired',
          });
        }

        // Check max uses
        if (referralCode.totalOrders >= REFERRAL_CONFIG.MAX_REFERRALS_PER_USER) {
          return res.status(400).json({
            isValid: false,
            error: 'This referral code has reached its maximum uses',
          });
        }

        const referrerName = referralCode.user.name?.split(' ')[0] || 'A friend';
        const usesRemaining = REFERRAL_CONFIG.MAX_REFERRALS_PER_USER - referralCode.totalOrders;

        return res.status(200).json({
          isValid: true,
          code: referralCode.code,
          referrerName,
          discount: {
            type: 'fixed',
            value: REFERRAL_CONFIG.REFEREE_DISCOUNT,
            description: `$${REFERRAL_CONFIG.REFEREE_DISCOUNT} off your first order`,
          },
          expiresAt: referralCode.expiresAt?.toISOString(),
          usesRemaining,
          message: `${referrerName} has shared Purrify with you! Get $${REFERRAL_CONFIG.REFEREE_DISCOUNT} off your first order.`,
        });
      }
    }

    // Fallback to mock data (for demo/development)
    const mockCode = getMockReferralCode(normalizedCode);

    if (!mockCode) {
      return res.status(404).json({
        isValid: false,
        error: 'Referral code not found',
      });
    }

    // Validate mock code
    if (!mockCode.isActive) {
      return res.status(400).json({
        isValid: false,
        error: 'This referral code is no longer active',
      });
    }

    if (new Date() > new Date(mockCode.expiresAt)) {
      return res.status(400).json({
        isValid: false,
        error: 'This referral code has expired',
      });
    }

    if (mockCode.currentUses >= mockCode.maxUses) {
      return res.status(400).json({
        isValid: false,
        error: 'This referral code has reached its maximum uses',
      });
    }

    const usesRemaining = mockCode.maxUses - mockCode.currentUses;

    return res.status(200).json({
      isValid: true,
      code: mockCode.code,
      referrerName: mockCode.referrerName,
      discount: {
        type: 'free_trial',
        value: getProductPrice('trial'),
        description: `Free 12g Trial Size (normally ${formatProductPrice('trial')})`,
      },
      expiresAt: mockCode.expiresAt,
      usesRemaining,
      message: `${mockCode.referrerName} has shared Purrify with you! Get your free trial size and see why they love it.`,
    });
  } catch (error) {
    console.error('Error validating referral code:', error);
    return res.status(500).json({
      isValid: false,
      error: 'Failed to validate referral code',
    });
  }
}

// Helper function to apply referral discount to cart
interface CartItem {
  productId: string;
  sku: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  isReferralReward?: boolean;
  referralCode?: string;
}

export function applyReferralDiscount(
  cartItems: CartItem[],
  referralCode: string
): CartItem[] {
  const hasTrialSize = cartItems.some(
    (item) => item.productId === '12g' || item.sku === 'purrify-12g'
  );

  if (!hasTrialSize) {
    return [
      ...cartItems,
      {
        productId: '12g',
        sku: 'purrify-12g',
        name: 'Purrify 12g Trial Size - FREE (Referral)',
        price: 0,
        originalPrice: getProductPrice('trial'),
        quantity: 1,
        isReferralReward: true,
        referralCode,
      },
    ];
  }

  return cartItems;
}
