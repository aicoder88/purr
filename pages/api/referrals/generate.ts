import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

interface ReferralCode {
  id: string;
  userId: string;
  code: string;
  createdAt: string;
  expiresAt: string;
  maxUses: number;
  currentUses: number;
  isActive: boolean;
}

// In-memory storage for demo - replace with database in production
const referralCodes = new Map<string, ReferralCode>();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, userName, email } = req.body;

    if (!userId || !userName) {
      return res.status(400).json({ error: 'Missing required fields: userId, userName' });
    }

    // Generate personalized referral code
    const sanitizedName = userName.replace(/[^a-zA-Z]/g, '').toUpperCase().substring(0, 8);
    const randomSuffix = Math.floor(Math.random() * 99) + 1;
    const code = `${sanitizedName}${randomSuffix}-CAT`;

    // Create referral code object
    const referralCode: ReferralCode = {
      id: crypto.randomUUID(),
      userId,
      code,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
      maxUses: 50, // Allow up to 50 referrals per user
      currentUses: 0,
      isActive: true
    };

    // Store referral code (replace with database insert)
    referralCodes.set(code, referralCode);

    // Track referral code generation
    if (typeof global !== 'undefined' && (global as any).gtag) {
      (global as any).gtag('event', 'referral_code_generated', {
        event_category: 'referrals',
        event_label: 'code_generation',
        user_id: userId
      });
    }

    res.status(200).json({
      success: true,
      data: {
        code: referralCode.code,
        shareUrl: `https://www.purrify.ca/refer/${referralCode.code}`,
        expiresAt: referralCode.expiresAt,
        maxUses: referralCode.maxUses,
        currentUses: referralCode.currentUses
      }
    });

  } catch (error) {
    console.error('Error generating referral code:', error);
    res.status(500).json({
      error: 'Failed to generate referral code',
      message: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    });
  }
}

// Helper function to generate social sharing URLs
export function generateSocialShareUrls(code: string, referrerName: string) {
  const shareUrl = `https://www.purrify.ca/refer/${code}`;
  const message = `Hey! I love this cat litter deodorizer that completely eliminates odors. ${referrerName} recommended it and you get a FREE trial! Check it out:`;

  return {
    email: {
      subject: `${referrerName} recommends Purrify - Get your FREE trial!`,
      body: `Hi!\n\n${message}\n\n${shareUrl}\n\nThis stuff actually works - no more embarrassing litter box smell!\n\nBest,\n${referrerName}`
    },
    sms: {
      text: `${message} ${shareUrl}`
    },
    facebook: {
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(message)}`
    },
    twitter: {
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${message} ${shareUrl} #CatOdorSolution #PurrifyWorks`)}`
    },
    whatsapp: {
      url: `https://wa.me/?text=${encodeURIComponent(`${message} ${shareUrl}`)}`
    },
    linkedin: {
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    }
  };
}

// Helper function to validate referral code format
export function validateReferralCodeFormat(code: string): boolean {
  // Format: NAME##-CAT (e.g., SARAH15-CAT)
  const codeRegex = /^[A-Z]{1,8}\d{1,2}-CAT$/;
  return codeRegex.test(code);
}