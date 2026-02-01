/**
 * Affiliate Authentication Middleware
 * Protects affiliate dashboard routes using NextAuth sessions
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export interface AffiliateSession {
  affiliateId: string;
  affiliateCode: string;
  email: string;
  name: string;
  code: string;
  status: string;
}

export interface AffiliateApiRequest extends NextApiRequest {
  affiliate: AffiliateSession;
}

type AffiliateApiHandler = (
  req: AffiliateApiRequest,
  res: NextApiResponse
) => Promise<void> | void;

/**
 * Middleware to protect affiliate dashboard API routes
 * Checks for valid NextAuth session with affiliate role
 */
export function withAffiliateAuth(handler: AffiliateApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const session = await auth();

      if (!session?.user) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      // Check if user has affiliate role
      const user = session.user as { role?: string; affiliateId?: string };

      if (user.role !== 'affiliate' || !user.affiliateId) {
        return res.status(403).json({ error: 'Not authorized as affiliate' });
      }

      if (!prisma) {
        return res.status(500).json({ error: 'Database connection not established' });
      }

      // Fetch full affiliate data
      const affiliate = await prisma.affiliate.findUnique({
        where: { id: user.affiliateId },
        select: {
          id: true,
          email: true,
          name: true,
          code: true,
          status: true,
        },
      });

      if (!affiliate) {
        return res.status(404).json({ error: 'Affiliate not found' });
      }

      if (affiliate.status !== 'ACTIVE') {
        return res.status(403).json({
          error: 'Affiliate account is not active',
          status: affiliate.status,
        });
      }

      // Attach affiliate to request
      (req as AffiliateApiRequest).affiliate = {
        affiliateId: affiliate.id,
        affiliateCode: affiliate.code,
        email: affiliate.email,
        name: affiliate.name,
        code: affiliate.code,
        status: affiliate.status,
      };

      // Update last login time
      await prisma.affiliate.update({
        where: { id: affiliate.id },
        data: { lastLoginAt: new Date() },
      });

      return handler(req as AffiliateApiRequest, res);
    } catch (error) {
      console.error('Affiliate auth error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}

/**
 * Get affiliate session from request (for SSR pages)
 * Returns null if not authenticated as affiliate
 */
export async function getAffiliateSession(
  _req?: NextApiRequest,
  _res?: NextApiResponse
): Promise<AffiliateSession | null> {
  try {
    const session = await auth();

    if (!session?.user) {
      return null;
    }

    const user = session.user as { role?: string; affiliateId?: string };

    if (user.role !== 'affiliate' || !user.affiliateId) {
      return null;
    }

    if (!prisma) {
      return null;
    }

    const affiliate = await prisma.affiliate.findUnique({
      where: { id: user.affiliateId },
      select: {
        id: true,
        email: true,
        name: true,
        code: true,
        status: true,
      },
    });

    if (!affiliate || affiliate.status !== 'ACTIVE') {
      return null;
    }

    return {
      affiliateId: affiliate.id,
      affiliateCode: affiliate.code,
      email: affiliate.email,
      name: affiliate.name,
      code: affiliate.code,
      status: affiliate.status,
    };
  } catch (error) {
    console.error('Error getting affiliate session:', error);
    return null;
  }
}

/**
 * Check if a session belongs to an affiliate
 */
export function isAffiliateSession(session: unknown): boolean {
  if (!session || typeof session !== 'object') {
    return false;
  }

  const s = session as { user?: { role?: string } };
  return s.user?.role === 'affiliate';
}
