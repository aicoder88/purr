import { auth } from '@/auth';
import { validateReferralCodeForEmail } from '@/lib/referral-program';

export async function POST(req: Request): Promise<Response> {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = (await req.json().catch(() => ({}))) as { code?: string };
    if (!body.code) {
      return Response.json({ message: 'Referral code is required' }, { status: 400 });
    }

    const validation = await validateReferralCodeForEmail(body.code, session.user.email);

    return Response.json({
      message: 'Referral code applied successfully',
      referrerName: validation.referrerName,
      discount: validation.discount,
      code: validation.code,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error validating referral code';
    const status = message === 'Referral code not found' ? 404 : 400;
    return Response.json({ message }, { status });
  }
}
