import { Metadata } from 'next';
import POSContent from './pos-content';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Purrify POS Display - Print-Ready Retail Sign',
  description: 'Free print-ready point-of-sale display for Purrify retailers. Professional counter signage to boost sales and educate customers.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function POSPage() {
  return <POSContent />;
}
