import type { User } from '@supabase/supabase-js';
import type { RetailerStatus } from '@/generated/client/enums';
import prisma from '@/lib/prisma';
import { normalizeEmail } from '@/lib/auth/roles';
import {
  createSupabaseRouteHandlerClient,
  createSupabaseServerClient,
} from '@/lib/supabase/server';

const retailerPortalSelect = {
  id: true,
  businessName: true,
  contactName: true,
  email: true,
  status: true,
  createdAt: true,
  lastLoginAt: true,
} as const;

export const RETAILER_PORTAL_ERROR_CODES = {
  pending: 'retailer_pending',
  rejected: 'retailer_rejected',
  sessionExpired: 'retailer_session_expired',
  suspended: 'retailer_suspended',
  unauthorized: 'retailer_unauthorized',
} as const;

export type RetailerPortalErrorCode =
  (typeof RETAILER_PORTAL_ERROR_CODES)[keyof typeof RETAILER_PORTAL_ERROR_CODES];

export type RetailerPortalRetailer = {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  status: RetailerStatus;
  createdAt: Date;
  lastLoginAt: Date | null;
};

export type RetailerPortalAccess =
  | { state: 'unauthenticated' }
  | {
      state: 'unauthorized';
      code: typeof RETAILER_PORTAL_ERROR_CODES.unauthorized;
      email: string;
      message: string;
    }
  | {
      state: 'blocked';
      code:
        | typeof RETAILER_PORTAL_ERROR_CODES.pending
        | typeof RETAILER_PORTAL_ERROR_CODES.rejected
        | typeof RETAILER_PORTAL_ERROR_CODES.suspended;
      status: RetailerStatus;
      retailer: RetailerPortalRetailer;
      message: string;
    }
  | {
      state: 'active';
      retailer: RetailerPortalRetailer;
      supabaseUserId: string;
    };

export function getRetailerPortalStatusError(status: RetailerStatus): {
  code:
    | typeof RETAILER_PORTAL_ERROR_CODES.pending
    | typeof RETAILER_PORTAL_ERROR_CODES.rejected
    | typeof RETAILER_PORTAL_ERROR_CODES.suspended;
  message: string;
} {
  switch (status) {
    case 'PENDING':
      return {
        code: RETAILER_PORTAL_ERROR_CODES.pending,
        message: 'Your wholesale account is pending approval.',
      };
    case 'REJECTED':
      return {
        code: RETAILER_PORTAL_ERROR_CODES.rejected,
        message: 'Your wholesale account was rejected. Please contact support.',
      };
    case 'SUSPENDED':
      return {
        code: RETAILER_PORTAL_ERROR_CODES.suspended,
        message: 'Your wholesale account is suspended. Please contact support.',
      };
    default:
      return {
        code: RETAILER_PORTAL_ERROR_CODES.suspended,
        message: 'Your wholesale account is not active.',
      };
  }
}

async function resolveRetailerPortalAccessForUser(
  user: Pick<User, 'email' | 'id'> | null | undefined
): Promise<RetailerPortalAccess> {
  const email = user?.email ? normalizeEmail(user.email) : '';

  if (!email) {
    return { state: 'unauthenticated' };
  }

  if (!prisma) {
    throw new Error('Database unavailable');
  }

  const retailer = await prisma.retailer.findUnique({
    where: { email },
    select: retailerPortalSelect,
  });

  if (!retailer) {
    return {
      state: 'unauthorized',
      code: RETAILER_PORTAL_ERROR_CODES.unauthorized,
      email,
      message: 'Unauthorized account for this portal.',
    };
  }

  if (retailer.status !== 'ACTIVE') {
    const statusError = getRetailerPortalStatusError(retailer.status);
    return {
      state: 'blocked',
      code: statusError.code,
      status: retailer.status,
      retailer,
      message: statusError.message,
    };
  }

  return {
    state: 'active',
    retailer,
    supabaseUserId: user?.id ?? '',
  };
}

export async function getRetailerPortalAccessForServer() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { state: 'unauthenticated' } as const;
  }

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return { state: 'unauthenticated' } as const;
  }

  return resolveRetailerPortalAccessForUser(data.user);
}

export async function getRetailerPortalAccessForRouteHandler() {
  const supabase = await createSupabaseRouteHandlerClient();
  if (!supabase) {
    return { state: 'unauthenticated' } as const;
  }

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return { state: 'unauthenticated' } as const;
  }

  return resolveRetailerPortalAccessForUser(data.user);
}
