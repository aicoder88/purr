import type { Metadata } from 'next';
import StatsContent from './StatsContent';

export const metadata: Metadata = {
  title: 'Affiliate Statistics | Purrify',
  description: 'View detailed statistics for your Purrify affiliate performance.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AffiliateStatsPage() {
  return <StatsContent />;
}
