import { NextApiRequest, NextApiResponse } from 'next';
import { validateReferralCodeFormat } from '../generate';

interface ReferralCodeValidation {
  isValid: boolean;
  code?: string;
  referrerName?: string;
  referrerEmail?: string;
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

// Simulated database lookup - replace with actual database
const getMockReferralCode = (code: string) => {
  // Mock data for demo - this would come from database
  const mockCodes = {
    'SARAH15-CAT': {
      id: 'ref_001',
      userId: 'user_001',
      code: 'SARAH15-CAT',
      referrerName: 'Sarah M.',
      referrerEmail: 'sarah@example.com',
      isActive: true,
      maxUses: 50,
      currentUses: 12,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: '2024-01-15T10:30:00Z'
    },
    'MIKE42-CAT': {
      id: 'ref_002',
      userId: 'user_002',
      code: 'MIKE42-CAT',
      referrerName: 'Michael R.',
      referrerEmail: 'mike@example.com',
      isActive: true,
      maxUses: 50,
      currentUses: 7,
      expiresAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: '2024-01-20T14:15:00Z'
    }
  };

  return (mockCodes as any)[code] || null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ReferralCodeValidation>) {
  const { code } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({
      isValid: false,
      error: 'Method not allowed'
    });
  }

  if (!code || typeof code !== 'string') {
    return res.status(400).json({
      isValid: false,
      error: 'Referral code is required'
    });
  }

  try {
    // Validate code format
    if (!validateReferralCodeFormat(code.toUpperCase())) {
      return res.status(400).json({
        isValid: false,
        error: 'Invalid referral code format'
      });
    }

    // Look up referral code in database (simulated)
    const referralCode = getMockReferralCode(code.toUpperCase());

    if (!referralCode) {
      return res.status(404).json({
        isValid: false,
        error: 'Referral code not found'
      });
    }

    // Check if code is still active and valid
    if (!referralCode.isActive) {
      return res.status(400).json({
        isValid: false,
        error: 'This referral code is no longer active'
      });
    }

    // Check if code has expired
    if (new Date() > new Date(referralCode.expiresAt)) {
      return res.status(400).json({
        isValid: false,
        error: 'This referral code has expired'
      });
    }

    // Check if code has reached maximum uses
    if (referralCode.currentUses >= referralCode.maxUses) {
      return res.status(400).json({
        isValid: false,
        error: 'This referral code has reached its maximum number of uses'
      });
    }

    // Code is valid - return referral details
    const usesRemaining = referralCode.maxUses - referralCode.currentUses;

    // Track referral code validation
    if (typeof global !== 'undefined' && (global as any).gtag) {
      (global as any).gtag('event', 'referral_code_validated', {
        event_category: 'referrals',
        event_label: 'code_validation',
        custom_parameter_1: code
      });
    }

    res.status(200).json({
      isValid: true,
      code: referralCode.code,
      referrerName: referralCode.referrerName,
      referrerEmail: referralCode.referrerEmail,
      discount: {
        type: 'free_trial',
        value: 6.99, // Value of free 12g trial
        description: 'Free 12g Trial Size (normally $6.99)'
      },
      expiresAt: referralCode.expiresAt,
      usesRemaining,
      message: `${referralCode.referrerName} has shared Purrify with you! Get your free trial size and see why they love it.`
    });

  } catch (error) {
    console.error('Error validating referral code:', error);
    res.status(500).json({
      isValid: false,
      error: 'Failed to validate referral code'
    });
  }
}

// Helper function to apply referral discount to cart
export function applyReferralDiscount(cartItems: any[], referralCode: string) {
  // Add free 12g trial to cart if not already present
  const hasTrialSize = cartItems.some(item => item.productId === '12g' || item.sku === 'purrify-12g');

  if (!hasTrialSize) {
    return [
      ...cartItems,
      {
        productId: '12g',
        sku: 'purrify-12g',
        name: 'Purrify 12g Trial Size - FREE (Referral)',
        price: 0,
        originalPrice: 6.99,
        quantity: 1,
        isReferralReward: true,
        referralCode
      }
    ];
  }

  return cartItems;
}
