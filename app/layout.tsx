import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import '../src/index.css';
import { defaultLocale, getLocaleFromPathname, Locale } from '@/i18n/config';
import { AppLayout } from '@/components/layout/AppLayout';
import { Providers } from './providers';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
});

// OG Locale mapping (OpenGraph uses underscores)
const OG_LOCALE_MAP: Record<string, string> = {
  fr: 'fr_CA',
  en: 'en_CA',
};

const DEFAULT_GTM_ID = 'GTM-T8WZ5D7R';

function normalizeGtmId(rawId?: string): string | undefined {
  if (!rawId) return undefined;

  const sanitizedId = rawId.trim().replace(/^["']|["']$/g, '').toUpperCase();
  return /^GTM-[A-Z0-9]+$/.test(sanitizedId) ? sanitizedId : undefined;
}

function normalizeMetaValue(rawValue?: string): string | undefined {
  if (!rawValue) return undefined;

  const sanitizedValue = rawValue.trim().replace(/^["']|["']$/g, '');
  return sanitizedValue.length > 0 ? sanitizedValue : undefined;
}

const normalizedGtmId = normalizeGtmId(process.env.NEXT_PUBLIC_GTM_ID);
const gtmId = process.env.NODE_ENV === 'test'
  ? normalizedGtmId
  : (normalizedGtmId ?? DEFAULT_GTM_ID);
const ahrefsSiteVerification = normalizeMetaValue(process.env.NEXT_PUBLIC_AHREFS_SITE_VERIFICATION);

/**
 * Generate metadata for the app based on locale
 * Includes: OpenGraph, Twitter Cards, Robots, Icons, and Hreflang alternates
 */
export async function generateMetadata(): Promise<Metadata> {
  const locale = defaultLocale;
  const ogLocale = OG_LOCALE_MAP[locale] ?? 'en_CA';
  const baseUrl = SITE_URL;

  // Build language alternates for hreflang
  // Maps language-region codes to their corresponding URLs
  const languages: Record<string, string> = {
    // Canadian English (default)
    'en-CA': `${baseUrl}/`,
    // Canadian French
    'fr-CA': `${baseUrl}/fr/`,
    // US English (dedicated landing page)
    'en-US': `${baseUrl}/us/`,
    // x-default for users whose language doesn't match any above
    'x-default': `${baseUrl}/`,
  };

  const alternates = {
    // Note: Individual pages should define their own canonical URLs
    // This is a fallback - child pages should override via their own metadata
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
        { url: '/optimized/icons/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: [
        { url: '/optimized/icons/apple-touch-icon.png', sizes: '180x180' },
      ],
      shortcut: ['/optimized/icons/favicon.svg'],
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
          url: '/optimized/logos/purrify-logo.png',
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
      images: ['/optimized/logos/purrify-logo.png'],
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
      ...(ahrefsSiteVerification
        ? { 'ahrefs-site-verification': ahrefsSiteVerification }
        : {}),
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
  // Detect locale from URL path for correct html lang attribute
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const locale: Locale = getLocaleFromPathname(pathname);

  // Load messages directly to avoid dynamic request config using cookies
  const translationModule = await import(`@/translations/${locale}.ts`);
  const messages = translationModule[locale];

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Contentsquare UX Analytics */}
        <script
          src="https://t.contentsquare.net/uxa/92035d15b29d9.js"
          async
        />
      </head>
      <body className="font-sans">
        {gtmId ? (
          <>
            {/* Raw <script> so data-cfasync="false" lands on the element itself.
                Next.js <Script> wraps content in its loader JSON, hiding the
                attribute from Cloudflare Rocket Loader which then rewrites the
                type to a deferred hash — preventing GTM from executing. */}
            {/* eslint-disable-next-line @next/next/next-script-for-ga */}
            <script
              data-cfasync="false"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer=window.dataLayer||[];
                  window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
                  (function(w,d,s,l,i){
                    w[l]=w[l]||[];
                    w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
                    var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                    j.async=true;
                    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                    f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${gtmId}');
                `,
              }}
            />
            <noscript>
              <iframe
                title="gtm-noscript"
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
          </>
        ) : null}
        <Providers locale={locale} messages={messages}>
          <AppLayout>
            {children}
          </AppLayout>

        </Providers>
      </body>
    </html >
  );
}
