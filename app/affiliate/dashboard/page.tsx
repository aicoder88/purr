import type { Metadata } from 'next';
import DashboardContent from './DashboardContent';

export const metadata: Metadata = {
  title: 'Affiliate Dashboard | Purrify',
  description: 'Access your Purrify affiliate dashboard to track earnings, generate links, and manage your account.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AffiliateDashboardPage() {
  return <DashboardContent />;
}
