import { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useEffect } from 'react';
import { DefaultSeo } from 'next-seo';
import '../src/index.css';
import { SITE_NAME, SITE_DESCRIPTION } from '../src/lib/constants';
import { Toaster } from '../src/components/ui/toaster';
import Script from 'next/script';

import { TranslationProvider } from '../src/lib/translation-context';
import { useRouter } from 'next/router';
import { Layout } from '../src/components/layout/layout';
import { CartProvider } from '../src/lib/cart-context';
import { ThemeProvider } from '../src/components/theme/theme-provider';
import { Analytics } from '@vercel/analytics/next';

interface PageProps {
  // Add your page props here if needed
  [key: string]: unknown;
}

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter', weight: ['400','500','700'] });

function MyApp({ Component, pageProps }: AppProps<PageProps>) {
  const router = useRouter();
  const { locale, pathname } = router;

  // Canonical site URL
  const canonicalUrl = 'https://purrify.ca';

  // Service Worker registration
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none'
          });

          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available, prompt user to refresh
                  if (confirm('New content is available! Click OK to refresh.')) {
                    window.location.reload();
                  }
                }
              });
            }
          });

          console.log('SW registered successfully');
        } catch (error) {
          console.warn('SW registration failed:', error);
        }
      };

      // Register after page load to avoid blocking
      if (document.readyState === 'complete') {
        registerSW();
      } else {
        window.addEventListener('load', registerSW);
      }
    }
  }, []);
  
  
  return (
    <ThemeProvider defaultTheme="system" storageKey="purrify-theme">
      <CartProvider>
        <TranslationProvider language={locale ?? 'en'}>
          <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="theme-color" content="#FF3131" media="(prefers-color-scheme: light)" />
            <meta name="theme-color" content="#121212" media="(prefers-color-scheme: dark)" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="msapplication-TileColor" content="#FF3131" />
            <meta name="msapplication-navbutton-color" content="#FF3131" />
            <meta name="application-name" content={SITE_NAME} />
            <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="referrer" content="origin-when-cross-origin" />
            
            {/* Favicon and App Icons */}
            <link rel="icon" href="/images/favicon.png" type="image/png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/images/icon-32.png" />
            <link rel="icon" type="image/png" sizes="64x64" href="/images/icon-64.png" />
            <link rel="icon" type="image/png" sizes="128x128" href="/images/icon-128.png" />
            <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
            <link rel="mask-icon" href="/images/icon-128.png" color="#FF3131" />
            <link rel="manifest" href="/manifest.json" />
            
            {/* DNS Prefetch only for non-critical third-parties */}
            <link rel="dns-prefetch" href="https://api.dicebear.com" />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          </Head>
          
          <DefaultSeo
            titleTemplate={`%s | ${SITE_NAME}`}
            defaultTitle={`${SITE_NAME} - Activated Carbon Cat Litter Additive`}
            // Use per-page descriptions to avoid duplicates
            canonical={canonicalUrl}
            openGraph={{
              type: 'website',
              locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
              url: canonicalUrl,
              siteName: SITE_NAME,
              title: `${SITE_NAME} - Activated Carbon Cat Litter Additive`,
              description: SITE_DESCRIPTION,
              images: [
                {
                  url: '/purrify-logo.png',
                  width: 1200,
                  height: 630,
                  alt: SITE_NAME,
                  type: 'image/png',
                },
              ],
            }}
            twitter={{
              handle: '@purrify',
              site: '@purrify',
              cardType: 'summary_large_image',
            }}
            additionalMetaTags={[
              {
                name: 'keywords',
                content: 'cat litter, odor control, activated carbon, cat litter additive, pet odor, cat odor elimination, natural odor control, cat care, pet supplies',
              },
              {
                name: 'author',
                content: SITE_NAME,
              },
              {
                name: 'application-name',
                content: SITE_NAME,
              },
              {
                property: 'og:site_name',
                content: SITE_NAME,
              },
              {
                name: 'apple-mobile-web-app-title',
                content: SITE_NAME,
              },
            ]}
            additionalLinkTags={[
              { rel: 'manifest', href: '/manifest.json' },
              { rel: 'alternate', hrefLang: 'en', href: 'https://purrify.ca/' },
              { rel: 'alternate', hrefLang: 'fr', href: 'https://purrify.ca/fr/' },
              { rel: 'alternate', hrefLang: 'x-default', href: 'https://purrify.ca/' },
            ]}
          />
          
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
                logo: '/purrify-logo.png',
                sameAs: [
                  'https://facebook.com/purrify',
                  'https://instagram.com/purrify',
                  'https://twitter.com/purrify'
                ],
                contactPoint: [
                  {
                    '@type': 'ContactPoint',
                    telephone: '1-250-432-9352',
                    contactType: 'customer service',
                    areaServed: 'CA',
                    availableLanguage: ['English', 'French'],
                  },
                ],
              })
            }}
          />
          
          <div className={inter.variable}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>

          {/* Idle-load chat plugin to avoid blocking TTI */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(){
                  if (window.__purrifyChatLoaded) return;
                  function loadChat(){
                    if (window.__purrifyChatLoaded) return; 
                    window.__purrifyChatLoaded = true;
                    var s = document.createElement('script');
                    s.src = 'https://app.simplebotinstall.com/js/chat_plugin.js';
                    s.defer = true;
                    s.setAttribute('data-bot-id','40892');
                    document.body.appendChild(s);
                  }
                  var scheduled = false;
                  function schedule(){
                    if (scheduled) return; scheduled = true;
                    if ('requestIdleCallback' in window) {
                      requestIdleCallback(function(){ setTimeout(loadChat, 0); }, { timeout: 4000 });
                    } else {
                      window.addEventListener('load', function(){ setTimeout(loadChat, 3000); });
                    }
                  }
                  // Load on idle, or on first interaction if earlier
                  ['mousemove','touchstart','scroll','keydown'].forEach(function(evt){
                    window.addEventListener(evt, function handler(){
                      window.removeEventListener(evt, handler, { passive: true } as any);
                      loadChat();
                    }, { passive: true, once: true });
                  });
                  schedule();
                })();
              `
            }}
          />
          
          
          <Toaster />
          <Analytics />
        </TranslationProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default MyApp;
