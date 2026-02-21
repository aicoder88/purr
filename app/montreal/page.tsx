import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Montreal Locations',
  description: 'Find Purrify retailers in Montreal.',
  robots: {
    index: false,
    follow: false,
  },
  other: {
    'last-modified': '2025-12-27',
  },
};

interface MontrealRedirectPageProps {
  params: Promise<{ locale?: string }>;
}

/**
 * Montreal redirect page
 * Redirects /montreal to /locations/montreal for consistency with location routing
 */
export default async function MontrealRedirectPage({ params }: MontrealRedirectPageProps) {
  const { locale } = await params;
  const destination = locale === 'fr' ? '/fr/locations/montreal' : '/locations/montreal';
  redirect(destination);
}
