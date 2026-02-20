import type { Metadata } from 'next';
import AffiliateContent from './AffiliateContent';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Affiliate Program | Purrify',
  description: 'Join the Purrify affiliate program and earn commissions by sharing our natural cat litter deodorizer.',
  alternates: {
    canonical: `${SITE_URL}/affiliate/`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AffiliatePage() {
  return <AffiliateContent />;
}
