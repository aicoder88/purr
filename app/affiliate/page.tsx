import type { Metadata } from 'next';
import AffiliateContent from './AffiliateContent';
import { SITE_URL } from '@/lib/constants';
import { buildPageMetadata } from '@/lib/seo/page-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Affiliate Program | Purrify',
  description:
    'Join the Purrify affiliate program and earn commissions by sharing our activated carbon cat litter odor control products.',
  path: '/affiliate/',
  image: `${SITE_URL}/optimized/marketing/affiliate-dashboard.webp`,
  imageAlt: 'Purrify affiliate dashboard and partner program',
  robots: {
    index: true,
    follow: true,
  },
});

export default function AffiliatePage() {
  return <AffiliateContent />;
}
