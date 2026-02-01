import type { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'FREE Cat Litter Freshener Trial - Activated Charcoal Additive | Purrify',
  description: 'FREE Cat Litter Deodorizer Trial | Just Pay $4.76 Shipping | 87% of customers upgrade within 7 days. ★ 4.8 rating. Ships to USA & Canada. Risk-free guarantee.',
  keywords: ['cat litter freshener', 'free trial', 'charcoal litter additive', 'cat litter deodorizer', 'activated carbon trial'],
  openGraph: {
    title: 'FREE Cat Litter Freshener Trial - Activated Charcoal Additive',
    description: 'FREE trial of our activated charcoal cat litter additive. Natural coconut shell carbon litter freshener eliminates ammonia odors instantly.',
    url: 'https://www.purrify.ca/products/trial-size',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/17gpink.webp',
        width: 400,
        height: 400,
        alt: 'Purrify 12g Trial Size',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.purrify.ca/products/trial-size',
  },
};

export default function TrialSizePage() {
  return <PageContent />;
}
