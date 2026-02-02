import type { NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { PayoutMethod } from '@/generated/client/client';
import { withAffiliateAuth, AffiliateApiRequest } from '@/lib/affiliate/middleware';

async function handler(req: AffiliateApiRequest, res: NextApiResponse) {
  if (!prisma) {
    return res.status(500).json({ error: 'Database connection error' });
  }

  const { affiliateId } = req.affiliate;

  // GET - Fetch current settings
  if (req.method === 'GET') {
    try {
      const affiliate = await prisma.affiliate.findUnique({
        where: { id: affiliateId },
        select: {
          id: true,
          name: true,
          email: true,
          code: true,
          website: true,
          payoutMethod: true,
          payoutEmail: true,
          status: true,
          createdAt: true,
        },
      });

      if (!affiliate) {
        return res.status(404).json({ error: 'Affiliate not found' });
      }

      return res.status(200).json({
        profile: {
          name: affiliate.name,
          email: affiliate.email,
          code: affiliate.code,
          website: affiliate.website,
          status: affiliate.status,
          memberSince: affiliate.createdAt,
        },
        payment: {
          method: affiliate.payoutMethod,
          email: affiliate.payoutEmail,
        },
      });
    } catch (error) {
      console.error('Failed to fetch affiliate settings:', error);
      return res.status(500).json({ error: 'Failed to fetch settings' });
    }
  }

  // PUT - Update settings
  if (req.method === 'PUT') {
    const { payoutMethod, payoutEmail, currentPassword, newPassword } = req.body;

    try {
      const affiliate = await prisma.affiliate.findUnique({
        where: { id: affiliateId },
        select: {
          id: true,
          passwordHash: true,
        },
      });

      if (!affiliate) {
        return res.status(404).json({ error: 'Affiliate not found' });
      }

      // Build update data
      const updateData: {
        payoutMethod?: PayoutMethod;
        payoutEmail?: string;
        passwordHash?: string;
      } = {};

      // Update payment settings if provided
      if (payoutMethod !== undefined) {
        const validMethods: PayoutMethod[] = ['PAYPAL', 'ETRANSFER'];
        if (!validMethods.includes(payoutMethod as PayoutMethod)) {
          return res.status(400).json({ error: 'Invalid payout method. Use PAYPAL or ETRANSFER.' });
        }
        updateData.payoutMethod = payoutMethod as PayoutMethod;
      }

      if (payoutEmail !== undefined) {
        if (!payoutEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payoutEmail)) {
          return res.status(400).json({ error: 'Invalid payout email' });
        }
        updateData.payoutEmail = payoutEmail;
      }

      // Update password if provided
      if (newPassword) {
        if (!currentPassword) {
          return res.status(400).json({ error: 'Current password is required to change password' });
        }

        // Verify current password
        const isValidPassword = await bcrypt.compare(currentPassword, affiliate.passwordHash);
        if (!isValidPassword) {
          return res.status(400).json({ error: 'Current password is incorrect' });
        }

        // Validate new password
        if (newPassword.length < 8) {
          return res.status(400).json({ error: 'New password must be at least 8 characters' });
        }

        updateData.passwordHash = await bcrypt.hash(newPassword, 10);
      }

      // Apply updates if any
      if (Object.keys(updateData).length > 0) {
        await prisma.affiliate.update({
          where: { id: affiliateId },
          data: updateData,
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Settings updated successfully',
      });
    } catch (error) {
      console.error('Failed to update affiliate settings:', error);
      return res.status(500).json({ error: 'Failed to update settings' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default withAffiliateAuth(handler);
