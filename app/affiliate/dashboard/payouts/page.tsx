import type { Metadata } from 'next';
import PayoutsContent from './PayoutsContent';

export const metadata: Metadata = {
  title: 'Payouts - Purrify Affiliate',
  description: 'Manage your earnings and request payouts.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AffiliatePayoutsPage() {
  return <PayoutsContent />;
}
