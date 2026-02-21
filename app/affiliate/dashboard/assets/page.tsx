import type { Metadata } from 'next';
import AssetsContent from './AssetsContent';

export const metadata: Metadata = {
  title: 'Affiliate Assets',
  description: 'Download marketing assets for your Purrify affiliate promotions.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AffiliateAssetsPage() {
  return <AssetsContent />;
}
