import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import PageContent from '@/app/products/PageContent';
import { locales, isValidLocale } from '@/i18n/config';
import { buildLanguageAlternates, getLocalizedUrl } from '@/lib/seo-utils';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
};

interface LocalizedProductsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Map locale to OpenGraph locale format
function getOgLocale(locale: string): string {
  const localeMap: Record<string, string> = {
    'en': 'en_CA',
    'fr': 'fr_CA',
  };
  return localeMap[locale] || 'en_CA';
}

export async function generateMetadata({ params }: LocalizedProductsPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'en';

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const localizedPath = getLocalizedUrl('/products/', locale);
  const isFrench = locale === 'fr';
  const title = isFrench
    ? 'Produits Purrify - Additif de litiere au charbon actif'
    : 'Purrify Products - Activated Carbon Litter Additive';
  const description = isFrench
    ? "Magasinez les produits Purrify pour reduire les odeurs de litiere avec du charbon actif."
    : 'Shop Purrify activated carbon litter additives for proven odor control.';

  return {
    title,
    description,
    keywords: ['Purrify products', 'cat litter additive', 'activated carbon', 'odor control', 'trial size', 'family pack'],
    openGraph: {
      type: 'website',
      url: localizedPath,
      siteName: 'Purrify',
      title,
      description,
      locale: getOgLocale(locale),
      images: [
        {
          url: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
          width: 1200,
          height: 800,
          alt: 'Purrify Products',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title,
      description,
      images: ['https://www.purrify.ca/optimized/logos/purrify-logo.png'],
    },
    alternates: {
      canonical: localizedPath,
      languages: Object.fromEntries(
        buildLanguageAlternates('/products/').map((alt) => [alt.hrefLang, alt.href])
      ),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocalizedProductsPage({ params }: LocalizedProductsPageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'en';

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <PageContent />;
}
