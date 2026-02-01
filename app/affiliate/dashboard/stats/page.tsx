import type { Metadata } from 'next';
import StatsContent from './StatsContent';

export const metadata: Metadata = {
  title: 'Performance Stats - Purrify Affiliate',
  description: 'Track your affiliate performance over time.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AffiliateStatsPage() {
  return <StatsContent />;
}
