import { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useEffect, useMemo } from 'react';
import { DefaultSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import '../src/index.css';
import { SITE_NAME, CONTACT_INFO, SOCIAL_LINKS } from '../src/lib/constants';
import { buildDefaultSeoConfig } from '../src/lib/seo/defaultSeoConfig';
import Script from 'next/script';

import { TranslationProvider } from '../src/lib/translation-context';
import { useRouter } from 'next/router';
import { Layout } from '../src/components/layout/layout';
import { ThemeProvider } from '../src/components/theme/theme-provider';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import { ToastProvider } from '../src/components/admin/Toast';
import { captureUTM } from '../src/lib/tracking/utm';

/**
 * Cleanup any stale service workers that may be causing cache issues.
 * This runs once on app load to ensure old SW caches don't persist.
 */
function useServiceWorkerCleanup() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister().then((success) => {
            if (success) {
              console.log('[SW Cleanup] Unregistered stale service worker');
            }
          });
        }
      });
      // Also clear caches that service workers may have created
      if ('caches' in window) {
        caches.keys().then((cacheNames) => {
          cacheNames.forEach((cacheName) => {
            caches.delete(cacheName).then((success) => {
              if (success) {
                console.log(`[Cache Cleanup] Deleted cache: ${cacheName}`);
              }
            });
          });
        });
      }
    }
  }, []);
}

/**
 * Capture UTM parameters from URL on initial page load.
 * Stores attribution data for ad spend optimization tracking.
 */
function useUTMCapture() {
  useEffect(() => {
    captureUTM();
  }, []);
}

const Toaster = dynamic(() => import('../src/components/ui/toaster').then(mod => ({ default: mod.Toaster })), {
  ssr: false,
});

const AnalyticsComponent = dynamic(() => import('@vercel/analytics/next').then(mod => mod.Analytics), {
  ssr: false,
});



interface PageProps {
  session?: Session | null;
  [key: string]: unknown;
}

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter', weight: ['400', '500', '600', '700'] });

function MyApp({ Component, pageProps }: AppProps<PageProps>) {
  const router = useRouter();
  const { locale } = router;

  // Cleanup stale service workers and caches on app load
  useServiceWorkerCleanup();

  // Capture UTM parameters for attribution tracking
  useUTMCapture();

  // Canonical site URL (use www domain to avoid redirects)
  const canonicalUrl = 'https://www.purrify.ca';
  const defaultSeoConfig = useMemo(
    () => buildDefaultSeoConfig(locale, canonicalUrl),
    [locale, canonicalUrl]
  );

  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider defaultTheme="system" storageKey="purrify-theme">
        <TranslationProvider language={locale ?? 'en'}>
          <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="theme-color" content="#FF3131" media="(prefers-color-scheme: light)" />
            <meta name="theme-color" content="#121212" media="(prefers-color-scheme: dark)" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="msapplication-TileColor" content="#FF3131" />
            <meta name="application-name" content={SITE_NAME} />
            <meta name="referrer" content="origin-when-cross-origin" />

            {/* Favicon and App Icons */}
            <link rel="icon" href="/images/favicon.png" type="image/png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/images/icon-32.png" />
            <link rel="icon" type="image/png" sizes="64x64" href="/images/icon-64.png" />
            <link rel="icon" type="image/png" sizes="128x128" href="/images/icon-128.png" />
            <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />

            {/* DNS Prefetch only for non-critical third-parties */}
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          </Head>

          <DefaultSeo {...defaultSeoConfig} />

          {/* Organization Schema Markup */}
          <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: SITE_NAME,
                url: canonicalUrl,
                logo: '/optimized/purrify-logo.avif',
                sameAs: Object.values(SOCIAL_LINKS),
                contactPoint: [
                  {
                    '@type': 'ContactPoint',
                    telephone: CONTACT_INFO.phoneInternational,
                    contactType: 'customer service',
                    areaServed: 'CA',
                    availableLanguage: ['English', 'French'],
                  },
                ],
              })
            }}
          />

          <div className={`${inter.variable} font-sans`}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>

          <Toaster />
          <ToastProvider />
          <AnalyticsComponent />
        </TranslationProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
