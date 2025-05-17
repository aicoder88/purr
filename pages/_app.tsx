import { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import '../src/index.css';
import { SITE_NAME, SITE_DESCRIPTION } from '../src/lib/constants';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  // Dynamically determine the canonical URL
  const canonicalUrl = typeof window !== 'undefined' ?
    `${window.location.origin}/` :
    process.env.VERCEL_URL ?
      `https://${process.env.VERCEL_URL}/` :
      '/';
  
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#FF3131" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Favicon and App Icons */}
        <link rel="icon" href="/images/favicon.png" type="image/png" />
        <link rel="icon" href="/images/icon-32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/images/icon-64.png" type="image/png" sizes="64x64" />
        <link rel="icon" href="/images/icon-128.png" type="image/png" sizes="128x128" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        
        {/* Preconnect to important domains - will be handled automatically by the browser */}
        <link rel="preconnect" href="https://api.dicebear.com" />
      </Head>
      
      <DefaultSeo
        titleTemplate={`%s | ${SITE_NAME}`}
        defaultTitle={`${SITE_NAME} - Activated Carbon Cat Litter Additive`}
        description={SITE_DESCRIPTION}
        canonical={canonicalUrl}
        openGraph={{
          type: 'website',
          locale: 'en_CA',
          url: canonicalUrl,
          siteName: SITE_NAME,
          title: `${SITE_NAME} - Activated Carbon Cat Litter Additive`,
          description: SITE_DESCRIPTION,
          images: [
            {
              url: typeof window !== 'undefined' ?
                `${window.location.origin}/purrify-logo.png` :
                process.env.VERCEL_URL ?
                  `https://${process.env.VERCEL_URL}/purrify-logo.png` :
                  '/purrify-logo.png',
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
            content: 'cat litter, odor control, activated carbon, cat litter additive, pet odor, cat odor elimination, eco-friendly cat litter, natural odor control, cat care, pet supplies',
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
          {
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            rel: 'alternate',
            hrefLang: 'en',
            href: canonicalUrl,
          },
          {
            rel: 'alternate',
            hrefLang: 'fr',
            href: `${canonicalUrl}fr/`,
          },
          {
            rel: 'alternate',
            hrefLang: 'x-default',
            href: canonicalUrl,
          },
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
            logo: typeof window !== 'undefined' ?
              `${window.location.origin}/purrify-logo.png` :
              process.env.VERCEL_URL ?
                `https://${process.env.VERCEL_URL}/purrify-logo.png` :
                '/purrify-logo.png',
            sameAs: [
              'https://facebook.com/purrify',
              'https://instagram.com/purrify',
              'https://twitter.com/purrify'
            ],
            contactPoint: [
              {
                '@type': 'ContactPoint',
                telephone: '+1-438-931-7345',
                contactType: 'customer service',
                email: 'hello@purrify.ca',
                areaServed: 'CA',
                availableLanguage: ['English', 'French'],
              },
            ],
          })
        }}
      />
      
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default MyApp;