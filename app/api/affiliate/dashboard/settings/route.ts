import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { PayoutMethod } from '@/generated/client/client';
import { auth } from '@/auth';

export async function GET(): Promise<Response> {
  if (!prisma) {
    return Response.json({ error: 'Database connection error' }, { status: 500 });
  }

  try {
    // Authenticate affiliate
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = session.user as { role?: string; affiliateId?: string };
    if (user.role !== 'affiliate' || !user.affiliateId) {
      return Response.json({ error: 'Not authorized as affiliate' }, { status: 403 });
    }

    const affiliateId = user.affiliateId;

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
      return Response.json({ error: 'Affiliate not found' }, { status: 404 });
    }

    return Response.json({
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
    return Response.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(req: Request): Promise<Response> {
  if (!prisma) {
    return Response.json({ error: 'Database connection error' }, { status: 500 });
  }

  try {
    // Authenticate affiliate
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = session.user as { role?: string; affiliateId?: string };
    if (user.role !== 'affiliate' || !user.affiliateId) {
      return Response.json({ error: 'Not authorized as affiliate' }, { status: 403 });
    }

    const affiliateId = user.affiliateId;

    const body = await req.json();
    const { payoutMethod, payoutEmail, currentPassword, newPassword } = body;

    const affiliate = await prisma.affiliate.findUnique({
      where: { id: affiliateId },
      select: {
        id: true,
        passwordHash: true,
      },
    });

    if (!affiliate) {
      return Response.json({ error: 'Affiliate not found' }, { status: 404 });
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
        return Response.json({ error: 'Invalid payout method. Use PAYPAL or ETRANSFER.' }, { status: 400 });
      }
      updateData.payoutMethod = payoutMethod as PayoutMethod;
    }

    if (payoutEmail !== undefined) {
      if (!payoutEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payoutEmail)) {
        return Response.json({ error: 'Invalid payout email' }, { status: 400 });
      }
      updateData.payoutEmail = payoutEmail;
    }

    // Update password if provided
    if (newPassword) {
      if (!currentPassword) {
        return Response.json({ error: 'Current password is required to change password' }, { status: 400 });
      }

      // Verify current password
      const isValidPassword = await bcrypt.compare(currentPassword, affiliate.passwordHash);
      if (!isValidPassword) {
        return Response.json({ error: 'Current password is incorrect' }, { status: 400 });
      }

      // Validate new password
      if (newPassword.length < 8) {
        return Response.json({ error: 'New password must be at least 8 characters' }, { status: 400 });
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

    return Response.json({
      success: true,
      message: 'Settings updated successfully',
    });
  } catch (error) {
    console.error('Failed to update affiliate settings:', error);
    return Response.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
