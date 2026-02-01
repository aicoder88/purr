import type { Metadata } from 'next';
import ActivateContent from './ActivateContent';

export const metadata: Metadata = {
  title: 'Activate Your Affiliate Account - Purrify',
  description: 'Complete your affiliate activation by purchasing the starter kit.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AffiliateActivatePage() {
  return <ActivateContent />;
}
