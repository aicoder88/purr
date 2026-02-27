import type { Metadata } from 'next';
import OfflineContent from './OfflineContent';

export const metadata: Metadata = {
  title: 'Offline',
  alternates: {
    canonical: 'https://www.purrify.ca/offline/',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/offline/',
    title: 'Offline',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflinePage() {
  return <OfflineContent />;
}
