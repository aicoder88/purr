import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '../src/index.css';
import { getMessages } from 'next-intl/server';
import { getUserLocale } from '@/lib/locale';
import { AppLayout } from '@/components/layout/AppLayout';
import { Providers } from './providers';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, SOCIAL_LINKS } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
});

// Hreflang locale mapping for regional targeting
// Using proper BCP 47 language tags with hyphens
const HREFLANG_MAP: Record<string, string> = {
  en: 'en-CA',    // English - Canada (default)
  fr: 'fr-CA',    // French - Canada
  zh: 'zh-CN',    // Chinese - China (Simplified)
  es: 'es-US',    // Spanish - USA
};

// OG Locale mapping (OpenGraph uses underscores)
const OG_LOCALE_MAP: Record<string, string> = {
  fr: 'fr_CA',
  zh: 'zh_CN',
  es: 'es_US',
  en: 'en_CA',
};

// Supported locales for hreflang
const SUPPORTED_LOCALES = ['en', 'fr', 'zh', 'es'];

/**
 * Generate metadata for the app based on locale
 * Includes: OpenGraph, Twitter Cards, Robots, Icons, and Hreflang alternates
 */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getUserLocale();
  const ogLocale = OG_LOCALE_MAP[locale] ?? 'en_CA';
  const baseUrl = SITE_URL;

  // Build language alternates for hreflang
  // Maps language-region codes to their corresponding URLs
  const languages: Record<string, string> = {
    // Canadian English (default)
    'en-CA': `${baseUrl}/`,
    // Canadian French
    'fr-CA': `${baseUrl}/fr`,
    // Chinese (Simplified)
    'zh-CN': `${baseUrl}/zh`,
    // US Spanish
    'es-US': `${baseUrl}/es`,
    // US English (dedicated landing page)
    'en-US': `${baseUrl}/us`,
    // x-default for users whose language doesn't match any above
    'x-default': `${baseUrl}/`,
  };

  const alternates = {
    canonical: baseUrl,
    languages: languages as Record<string, string>,
  };

  return {
    title: {
      template: `%s | ${SITE_NAME}`,
      default: `${SITE_NAME} - Cat Litter Odor Control`,
    },
    description: SITE_DESCRIPTION,
    metadataBase: new URL(baseUrl),
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME }],
    generator: 'Next.js',
    keywords: [
      'cat litter',
      'odor control',
      'activated carbon',
      'cat litter additive',
      'pet odor',
      'cat odor elimination',
      'natural odor control',
      'cat care',
      'pet supplies',
    ],
    referrer: 'origin-when-cross-origin',
    icons: {
      icon: [
        { url: '/optimized/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: [
        { url: '/images/Logos/apple-touch-icon.png', sizes: '180x180' },
      ],
      shortcut: ['/optimized/favicon.svg'],
    },
    manifest: '/manifest.json',
    alternates,
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: baseUrl,
      siteName: SITE_NAME,
      title: `${SITE_NAME} - Cat Litter Odor Control`,
      description: SITE_DESCRIPTION,
      images: [
        {
          url: '/images/Logos/purrify-logo.png',
          width: 1200,
          height: 800,
          alt: SITE_NAME,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrify',
      creator: '@purrify',
      title: `${SITE_NAME} - Cat Litter Odor Control`,
      description: SITE_DESCRIPTION,
      images: ['/images/Logos/purrify-logo.png'],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'msapplication-TileColor': '#FF3131',
      'apple-mobile-web-app-title': SITE_NAME,
      'format-detection': 'telephone=no',
    },
  };
}

/**
 * Viewport configuration
 * Separated from metadata for better caching in Next.js App Router
 */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FF3131' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getUserLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body className="font-sans">
        <Providers locale={locale} messages={messages}>
          <AppLayout>
            {children}
          </AppLayout>
        </Providers>
      </body>
    </html>
  );
}
