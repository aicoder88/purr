import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Character Set */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Favicon and App Icons - Comprehensive set for all platforms */}
        <link rel="icon" href="/images/favicon.png" type="image/png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/icon-32.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/images/icon-64.png" />
        <link rel="icon" type="image/png" sizes="128x128" href="/images/icon-128.png" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <link rel="mask-icon" href="/images/icon-128.png" color="#FF3131" />
        <meta name="msapplication-TileImage" content="/images/icon-128.png" />
        
        {/* Theme and Colors */}
        <meta name="theme-color" content="#FF3131" />
        <meta name="msapplication-TileColor" content="#FF3131" />
        <meta name="msapplication-navbutton-color" content="#FF3131" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Fonts with display swap for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
          media="print"
          onLoad={(e) => {
            const target = e.currentTarget as HTMLLinkElement;
            target.media = 'all';
          }}
        />
        
        {/* Enhanced SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="referrer" content="origin-when-cross-origin" />
        
        {/* PWA Support */}
        <meta name="application-name" content="Purrify" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Purrify" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* DNS Prefetch and Preconnect for Performance */}
        <link rel="dns-prefetch" href="https://api.dicebear.com" />
        <link rel="preconnect" href="https://api.dicebear.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        
        {/* Google Tag Manager - Strategy: afterInteractive for better performance */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T8WZ5D7R');`
          }}
        />
      </Head>
      <body className="antialiased text-gray-900 bg-white">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T8WZ5D7R"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:z-50 focus:text-[#FF3131]"
        >
          Skip to content
        </a>
        
        <Main />
        <NextScript />
        
        {/* Chat plugin - Strategy: lazyOnload for better performance */}
        <Script
          id="chat-plugin"
          src="https://app.simplebotinstall.com/js/chat_plugin.js"
          data-bot-id="40892"
          strategy="lazyOnload"
        />
      </body>
    </Html>
  );
}