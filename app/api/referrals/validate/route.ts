import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(req: Request): Promise<Response> {
  try {
    const session = await auth();
    const body = await req.json();
    const { code } = body;

    if (!session?.user?.email) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!prisma) {
      return Response.json({ message: 'Database not available' }, { status: 503 });
    }

    // Find referral code
    const referral = await prisma.referral.findUnique({
      where: { code },
      include: {
        referrer: true,
      },
    });

    if (!referral) {
      return Response.json({ message: 'Invalid referral code' }, { status: 404 });
    }

    // Check if user has already used a referral code
    const existingReferral = await prisma.referral.findFirst({
      where: {
        refereeId: session.user.email,
      },
    });

    if (existingReferral) {
      return Response.json({ message: 'You have already used a referral code' }, { status: 400 });
    }

    // Check if user is trying to use their own referral code
    if (referral.referrerId === session.user.email) {
      return Response.json({ message: 'You cannot use your own referral code' }, { status: 400 });
    }

    // Update referral with referee
    await prisma.referral.update({
      where: { id: referral.id },
      data: {
        refereeId: session.user.email,
      },
    });

    return Response.json({
      message: 'Referral code applied successfully',
      referrerName: referral.referrer.name,
    });
  } catch (_error) {
    return Response.json({ message: 'Error validating referral code' }, { status: 500 });
  }
}
