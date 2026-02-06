export const dynamic = 'force-static';

import type { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'Purrify Family Pack (240g) - Best Value for Multi-Cat Homes',
  description: 'Best value cat litter freshener for multi-cat households. 240g activated charcoal additive provides 2 months of odor control. Natural coconut shell formula works with any litter. Ships to USA & Canada.',
  keywords: ['cat litter freshener', 'family pack', 'multi-cat', 'activated charcoal', 'odor control', '240g', 'best value'],
  openGraph: {
    title: 'Purrify Family Pack (240g) - Best Value for Multi-Cat Homes',
    description: 'Best value cat litter freshener for multi-cat homes. 240g activated charcoal cat litter additive from coconut shells. Best value per gram.',
    url: 'https://www.purrify.ca/products/family-pack',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/140g-640w.avif',
        width: 640,
        height: 640,
        alt: 'Purrify 240g Family Pack',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.purrify.ca/products/family-pack',
  },
};

export default function FamilyPackPage() {
  return <PageContent />;
}
