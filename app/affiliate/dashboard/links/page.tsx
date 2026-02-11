import type { Metadata } from 'next';
import LinksContent from './LinksContent';

export const metadata: Metadata = {
  title: 'Affiliate Links | Purrify',
  description: 'Generate and manage your Purrify affiliate links.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AffiliateLinksPage() {
  return <LinksContent />;
}
