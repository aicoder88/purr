import type { Metadata } from 'next';
import SettingsContent from './SettingsContent';

export const metadata: Metadata = {
  title: 'Settings - Purrify Affiliate',
  description: 'Manage your account and payment settings.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AffiliateSettingsPage() {
  return <SettingsContent />;
}
