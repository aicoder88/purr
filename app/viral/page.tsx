import type { Metadata } from 'next';
import ViralContent from './ViralContent';

export const metadata: Metadata = {
  title: 'The Viral Odour Vault: Purrify Profit Report',
  description: 'Stop guessing why your videos die in obscurity. We have dissected the Viral Anchors of the pet care world to build your profit machine.',
  alternates: {
    canonical: '/viral',
  },
  openGraph: {
    url: '/viral',
    title: 'The Viral Odour Vault: Purrify Profit Report',
    description: 'Dissecting the Viral Anchors of the pet care world.',
  },
};

export default function ViralReportPage() {
  return <ViralContent />;
}
