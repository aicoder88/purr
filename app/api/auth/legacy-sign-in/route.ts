import { NextRequest } from 'next/server';
import {
  authenticateAdminCredentials,
  authenticateAffiliateCredentials,
  authenticateCustomerCredentials,
  verifyRetailerCredentials,
} from '@/lib/auth/principals';
import { normalizeEmail } from '@/lib/auth/roles';
import {
  syncAdminSupabaseUser,
  syncAffiliateSupabaseUser,
  syncCustomerSupabaseUser,
  syncRetailerSupabaseUser,
} from '@/lib/auth/supabase-users';
import { withRateLimit, RATE_LIMITS } from '@/lib/rate-limit';
import { getRetailerPortalStatusError } from '@/lib/auth/retailer-portal';

interface LegacySignInRequest {
  provider: string;
  email: string;
  password: string;
}

async function handler(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json() as LegacySignInRequest;
    const provider = body.provider?.trim();
    const email = body.email ? normalizeEmail(body.email) : '';
    const password = body.password ?? '';

    if (!provider || !email || !password) {
      return Response.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    if (provider === 'customer-credentials') {
      const principal = await authenticateCustomerCredentials(email, password);
      if (!principal) {
        return Response.json({ message: 'Invalid email or password.' }, { status: 401 });
      }

      await syncCustomerSupabaseUser(email, password);
      return Response.json({ ok: true });
    }

    if (provider === 'admin-credentials') {
      const principal = await authenticateAdminCredentials(email, password);
      if (!principal) {
        return Response.json({ message: 'Invalid email or password.' }, { status: 401 });
      }

      await syncAdminSupabaseUser(email, password);
      return Response.json({ ok: true });
    }

    if (provider === 'affiliate-credentials') {
      const principal = await authenticateAffiliateCredentials(email, password);
      if (!principal) {
        return Response.json({ message: 'Invalid email or password.' }, { status: 401 });
      }

      await syncAffiliateSupabaseUser(email, password);
      return Response.json({ ok: true });
    }

    if (provider === 'retailer-credentials') {
      const result = await verifyRetailerCredentials(email, password);
      if (result.kind === 'invalid') {
        return Response.json({ message: 'Invalid email or password.' }, { status: 401 });
      }

      if (result.kind === 'blocked') {
        const statusError = getRetailerPortalStatusError(result.status);
        return Response.json(
          {
            code: statusError.code,
            message: statusError.message,
            status: result.status,
          },
          { status: 403 }
        );
      }

      await syncRetailerSupabaseUser(email, password);
      return Response.json({ ok: true });
    }

    return Response.json({ message: 'Unsupported authentication provider.' }, { status: 400 });
  } catch (error) {
    console.error('Legacy sign-in migration error:', error);
    return Response.json({ message: 'Authentication failed. Please try again.' }, { status: 500 });
  }
}

export const POST = withRateLimit(RATE_LIMITS.AUTH, handler);
