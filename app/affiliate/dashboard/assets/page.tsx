import type { Metadata } from 'next';
import AssetsContent from './AssetsContent';

export const metadata: Metadata = {
  title: 'Marketing Assets - Purrify Affiliate',
  description: 'Download banners, product images, and copy for your promotions.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AffiliateAssetsPage() {
  return <AssetsContent />;
}
