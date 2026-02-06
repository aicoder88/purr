export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME, CONTACT_INFO } from '@/lib/constants';
import SellSheetClientPage from './_components/SellSheetClientPage';

export const metadata: Metadata = {
  title: `${SITE_NAME} B2B Sell Sheet - Wholesale Partner Information`,
  description: 'Download our B2B sell sheet with wholesale pricing, product specifications, and partnership opportunities. Perfect for retailers, veterinarians, and pet professionals.',
  keywords: ['wholesale', 'b2b', 'sell sheet', 'partner program'],
  alternates: {
    canonical: '/b2b/sell-sheet',
  },
  openGraph: {
    title: `${SITE_NAME} B2B Sell Sheet - Wholesale Partner Information`,
    description: 'Download our B2B sell sheet with wholesale pricing, product specifications, and partnership opportunities.',
    url: 'https://www.purrify.ca/b2b/sell-sheet',
    type: 'website',
  },
};

export default function SellSheetPage() {
  return <SellSheetClientPage />;
}
