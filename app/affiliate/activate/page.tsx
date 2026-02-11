import type { Metadata } from 'next';
import ActivateContent from './ActivateContent';

export const metadata: Metadata = {
  title: 'Activate Affiliate Account | Purrify',
  description: 'Activate your Purrify affiliate account.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AffiliateActivatePage() {
  return <ActivateContent />;
}
