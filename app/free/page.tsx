import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Trial | Purrify',
  description: 'Get a free trial of Purrify cat litter deodorizer.',
  robots: {
    index: false,
    follow: false,
  },
};

interface FreeRedirectPageProps {
  params: Promise<{ locale?: string }>;
}

/**
 * Redirect /free to trial size product page
 * This maintains SEO and prevents 404s
 */
export default async function FreeRedirectPage({ params }: FreeRedirectPageProps) {
  const { locale } = await params;
  const destination = locale === 'fr' ? '/fr/products/trial-size' : '/products/trial-size';
  redirect(destination);
}
