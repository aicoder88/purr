import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { getLocale, setRequestLocale } from 'next-intl/server';
import '../src/index.css';
import { defaultLocale, isValidLocale, locales, Locale } from '@/i18n/config';
import { AppLayout } from '@/components/layout/AppLayout';
import { Providers } from './providers';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import { DeferredThirdPartyMounts } from '@/components/performance/DeferredThirdPartyMounts';
import { getScopedMessages } from '@/i18n/scoped-messages';

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

const HTML_LANG_MAP: Record<string, string> = {
  fr: 'fr-CA',
  en: 'en-CA',
};

function buildRootLanguageAlternates(baseUrl: string): Record<string, string> {
  const localeEntries = locales.map((locale) => {
    const hrefLang = HTML_LANG_MAP[locale] ?? 'en-CA';
    const href = locale === defaultLocale ? `${baseUrl}/` : `${baseUrl}/${locale}/`;
    return [hrefLang, href] as const;
  });

  return Object.fromEntries([
    ...localeEntries,
    ['x-default', `${baseUrl}/`],
  ]) as Record<string, string>;
}

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
const hasAnthropicApiKey = Boolean(process.env.ANTHROPIC_API_KEY);

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
  const alternates = {
    // Note: Individual pages should define their own canonical URLs
    // This is a fallback - child pages should override via their own metadata
    languages: buildRootLanguageAlternates(baseUrl),
  };

  return {
    title: `${SITE_NAME} - Cat Litter Odor Control`,
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
      site: '@purrifyhq',
      creator: '@purrifyhq',
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
  const requestLocale = await getLocale();
  const locale: Locale = isValidLocale(requestLocale) ? requestLocale : defaultLocale;
  setRequestLocale(locale);
  const messages = await getScopedMessages(locale, ['root']);
  const accessibilityMessages = (messages as Record<string, unknown>).accessibility as
    | { gtmNoscriptTitle?: string }
    | undefined;
  const gtmNoscriptTitle = accessibilityMessages?.gtmNoscriptTitle;
  const htmlLang = HTML_LANG_MAP[locale] ?? 'en-CA';

  return (
    <html lang={htmlLang} className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root,.dark {
                --background: 222.2 84% 4.9%;
                --foreground: 210 40% 98%;
                --card: 222.2 84% 4.9%;
                --card-foreground: 210 40% 98%;
                --popover: 222.2 84% 4.9%;
                --popover-foreground: 210 40% 98%;
                --primary: 246 86% 67%;
                --primary-foreground: 222.2 47.4% 11.2%;
                --secondary: 217.2 32.6% 17.5%;
                --secondary-foreground: 210 40% 98%;
                --muted: 217.2 32.6% 17.5%;
                --muted-foreground: 215 20.2% 65.1%;
                --accent: 330 100% 59%;
                --accent-foreground: 210 40% 98%;
                --destructive: 0 62.8% 30.6%;
                --destructive-foreground: 210 40% 98%;
                --border: 217.2 32.6% 17.5%;
                --input: 217.2 32.6% 17.5%;
                --ring: 330 100% 59%;
                --radius: 0.75rem;
              }
              html { background-color: hsl(222.2 84% 4.9%); color: hsl(210 40% 98%); color-scheme: dark; }
              body { margin: 0; min-height: 100vh; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; }
            `
          }}
        />
        {gtmId ? (
          /* Keep the dataLayer queue ready immediately, but load GTM itself
             after the first interaction or idle time in DeferredThirdPartyMounts. */
          <script
            data-cfasync="false"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer=window.dataLayer||[];
                window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
              `,
            }}
          />
        ) : null}
      </head>
      <body className="font-sans overflow-x-clip">
        {gtmId ? (
          <noscript>
            <iframe
              title={gtmNoscriptTitle}
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        ) : null}
        <Providers locale={locale} messages={messages}>
          <AppLayout>
            {children}
          </AppLayout>
          <DeferredThirdPartyMounts
            hasChatWidget={hasAnthropicApiKey}
            gtmId={gtmId}
          />
        </Providers>
      </body>
    </html >
  );
}
