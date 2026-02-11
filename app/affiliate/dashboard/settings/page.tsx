import type { Metadata } from 'next';
import SettingsContent from './SettingsContent';

export const metadata: Metadata = {
  title: 'Affiliate Settings | Purrify',
  description: 'Manage your Purrify affiliate account settings.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AffiliateSettingsPage() {
  return <SettingsContent />;
}
