import type { Metadata } from 'next';
import PayoutsContent from './PayoutsContent';

export const metadata: Metadata = {
  title: 'Affiliate Payouts',
  description: 'View your Purrify affiliate payout history and settings.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AffiliatePayoutsPage() {
  return <PayoutsContent />;
}
