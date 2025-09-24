import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { PurrifyStructuredData } from '../src/components/seo/AdvancedStructuredData';

export default function Document() {
  const enableGtm = process.env.NODE_ENV === 'production';
  return (
    <Html lang="en">
      <Head>
        {/* Self-host fonts via next/font; remove external font CSS/preconnect to avoid blocking */}
        
        {/* Remove global preloads - each page will preload what it needs */}
        
        {/* Enhanced SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="video-description" content="Purrify activated carbon cat litter additive demonstration video showing how it eliminates odors at the molecular level" />
        
        {/* Font-face rules handled by next/font */}
        
        {/* Google Tag Manager */}
        {enableGtm && (
          <Script
            id="gtm-script"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T8WZ5D7R');`
            }}
          />
        )}
      </Head>
      <body className="antialiased text-gray-900 dark:text-gray-50 dark:text-gray-50 bg-white dark:bg-gray-900">
        {/* Google Tag Manager (noscript) */}
        {enableGtm && (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-T8WZ5D7R"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        
        {/* Global Structured Data */}
        <PurrifyStructuredData />
        
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:p-4 bg-white dark:bg-gray-800 focus:z-50 focus:text-[#FF3131] dark:focus:text-[#FF3131] focus:top-0 focus:left-0"
        >
          Skip to content
        </a>
        
        <Main />
        <NextScript />
        
        {/* Chat plugin moved to idle loader in _app.tsx to improve TTI */}
        {/* Removed legacy lazy-image script; Next/Image handles lazy-loading */}
      </body>
    </Html>
  );
}
