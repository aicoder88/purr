import type { Metadata } from 'next';
import OfflineContent from './OfflineContent';

export const metadata: Metadata = {
  title: 'You are Offline | Purrify',
  description: 'It looks like you are offline. Please check your internet connection and try again.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflinePage() {
  return <OfflineContent />;
}
