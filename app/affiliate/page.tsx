import type { Metadata } from 'next';
import AffiliateContent from './AffiliateContent';

export const metadata: Metadata = {
  title: 'Affiliate Program | Purrify',
  description: 'Join the Purrify affiliate program and earn commissions by sharing our natural cat litter deodorizer.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function AffiliatePage() {
  return <AffiliateContent />;
}
