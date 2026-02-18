import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { headers } from 'next/headers';
import '../src/index.css';
import { defaultLocale } from '@/i18n/config';
import { LocaleDetector } from '@/components/LocaleDetector';
import { AppLayout } from '@/components/layout/AppLayout';
import { Providers } from './providers';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import '@/lib/chunk-retry-handler';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '600', '700'],
});

// OG Locale mapping (OpenGraph uses underscores)
const OG_LOCALE_MAP: Record<string, string> = {
  fr: 'fr_CA',
  en: 'en_CA',
};

/**
 * Generate metadata for the app based on locale
 * Includes: OpenGraph, Twitter Cards, Robots, Icons, and Hreflang alternates
 */
export async function generateMetadata(): Promise<Metadata> {
  const locale = defaultLocale;
  const ogLocale = OG_LOCALE_MAP[locale] ?? 'en_CA';
  const baseUrl = SITE_URL;

  // Get the current pathname from headers for dynamic canonical URL
  const headersList = await headers();
  const pathname = headersList.get('x-invoke-path') || headersList.get('x-matched-path') || '/';
  const currentPath = pathname === '/' ? '/' : pathname;

  // Build canonical URL - ensure trailing slash for consistency
  const canonicalPath = currentPath.endsWith('/') || currentPath === '/'
    ? currentPath
    : `${currentPath}/`;
  const canonicalUrl = `${baseUrl}${canonicalPath}`;

  // Build language alternates for hreflang
  // Maps language-region codes to their corresponding URLs
  const languages: Record<string, string> = {
    // Canadian English (default)
    'en-CA': `${baseUrl}${canonicalPath}`,
    // Canadian French
    'fr-CA': `${baseUrl}/fr${canonicalPath === '/' ? '/' : canonicalPath}`,
    // US English (dedicated landing page)
    'en-US': `${baseUrl}/us${canonicalPath === '/' ? '/' : canonicalPath}`,
    // x-default for users whose language doesn't match any above
    'x-default': `${baseUrl}${canonicalPath}`,
  };

  const alternates = {
    canonical: canonicalUrl,
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
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: `${SITE_NAME} - Cat Litter Odor Control`,
      description: SITE_DESCRIPTION,
      images: [
        {
          url: '/images/Logos/purr-pink-og.png',
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
      images: ['/images/Logos/purr-pink-og.png'],
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
      'p:domain_verify': 'd4a9556d272da1c274d3ee54b09e9f71',
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
  // Use default locale for static generation (SSG)
  const locale = defaultLocale;

  // Load messages directly to avoid dynamic request config using cookies
  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body className="font-sans">
        <Providers locale={locale} messages={messages}>
          <LocaleDetector />
          <AppLayout>
            {children}
          </AppLayout>

        </Providers>
        <SpeedInsights />
      </body>
    </html >
  );
}
