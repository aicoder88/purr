import type { Metadata } from 'next';
import DashboardContent from './DashboardContent';

export const metadata: Metadata = {
  title: 'Affiliate Dashboard - Purrify',
  description: 'Track your affiliate earnings, conversions, and performance metrics.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AffiliateDashboardPage() {
  return <DashboardContent />;
}
