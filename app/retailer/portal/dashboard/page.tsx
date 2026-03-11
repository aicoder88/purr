import { redirect } from 'next/navigation';
import {
  RETAILER_PORTAL_ERROR_CODES,
  getRetailerPortalAccessForServer,
} from '@/lib/auth/retailer-portal';
import DashboardContent from './DashboardContent';

function toLoginPath(errorCode?: string) {
  return errorCode
    ? `/retailer/portal/login?error=${encodeURIComponent(errorCode)}`
    : '/retailer/portal/login';
}

export default async function RetailerDashboardPage() {
  const access = await getRetailerPortalAccessForServer();

  if (access.state === 'active') {
    return <DashboardContent />;
  }

  if (access.state === 'unauthenticated') {
    redirect(toLoginPath(RETAILER_PORTAL_ERROR_CODES.sessionExpired));
  }

  redirect(toLoginPath(access.code));
}
