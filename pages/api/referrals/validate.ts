import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';
import { auth } from '@/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await auth();
    const { code } = req.body;

    if (!session?.user?.email) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!prisma) {
      return res.status(503).json({ message: 'Database not available' });
    }

    // Find referral code
    const referral = await prisma.referral.findUnique({
      where: { code },
      include: {
        referrer: true,
      },
    });

    if (!referral) {
      return res.status(404).json({ message: 'Invalid referral code' });
    }

    // Check if user has already used a referral code
    const existingReferral = await prisma.referral.findFirst({
      where: {
        refereeId: session.user.email,
      },
    });

    if (existingReferral) {
      return res.status(400).json({ message: 'You have already used a referral code' });
    }

    // Check if user is trying to use their own referral code
    if (referral.referrerId === session.user.email) {
      return res.status(400).json({ message: 'You cannot use your own referral code' });
    }

    // Update referral with referee
    await prisma.referral.update({
      where: { id: referral.id },
      data: {
        refereeId: session.user.email,
      },
    });

    return res.status(200).json({
      message: 'Referral code applied successfully',
      referrerName: referral.referrer.name,
    });
  } catch (error) {
    console.error('Error validating referral code:', error);
    return res.status(500).json({ message: 'Error validating referral code' });
  }
}
