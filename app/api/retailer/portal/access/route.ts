import { getRetailerPortalAccessForRouteHandler } from '@/lib/auth/retailer-portal';

export async function GET() {
  try {
    const access = await getRetailerPortalAccessForRouteHandler();

    if (access.state === 'active') {
      return Response.json({ allowed: true });
    }

    if (access.state === 'unauthenticated') {
      return Response.json(
        {
          allowed: false,
          code: 'retailer_session_expired',
          message: 'Your retailer session expired. Please log in again.',
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        allowed: false,
        code: access.code,
        message: access.message,
        status: access.state === 'blocked' ? access.status : undefined,
      },
      { status: 403 }
    );
  } catch (error) {
    console.error('Retailer portal access error:', error);
    return Response.json(
      {
        allowed: false,
        message: 'Unable to verify retailer access.',
      },
      { status: 500 }
    );
  }
}
