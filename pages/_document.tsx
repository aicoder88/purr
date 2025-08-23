import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { PurrifyStructuredData } from '../src/components/seo/AdvancedStructuredData';
import { PerformanceMonitor } from '../src/components/performance/PerformanceMonitor';
import { CacheOptimizer } from '../src/components/performance/CacheOptimizer';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Critical CSS from external file for better caching */}
        <link
          rel="preload"
          href="/critical.css"
          as="style"
          onLoad={() => {}}
        />
        <link rel="stylesheet" href="/critical.css" />
        <noscript>
          <link rel="stylesheet" href="/critical.css" />
        </noscript>
        
        {/* Preload critical fonts for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        
        {/* Remove global preloads - each page will preload what it needs */}
        
        {/* Enhanced SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="video-description" content="Purrify activated carbon cat litter additive demonstration video showing how it eliminates odors at the molecular level" />
        
        {/* Reduce CLS with font display settings */}
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local('Inter Regular'), local('Inter-Regular');
          }
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: local('Inter Medium'), local('Inter-Medium');
          }
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: local('Inter Bold'), local('Inter-Bold');
          }
        `}} />
        
        {/* Google Tag Manager */}
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
      </Head>
      <body className="antialiased text-gray-900 dark:text-gray-50 bg-white dark:bg-gray-900">
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
        
        {/* Global Structured Data */}
        <PurrifyStructuredData />
        
        {/* Performance Monitoring */}
        <PerformanceMonitor enabled={true} sampleRate={0.1} />
        
        {/* Cache Optimization */}
        <CacheOptimizer 
          enabled={true}
          preloadRoutes={['/products/trial-size', '/customers/testimonials', '/learn/how-it-works']}
          warmupDelay={3000}
          maxCacheSize={15728640}
        />
        
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white dark:focus:bg-gray-800 focus:z-50 focus:text-[#FF3131] dark:focus:text-[#FF3131] focus:top-0 focus:left-0"
        >
          Skip to content
        </a>
        
        <Main />
        <NextScript />
        
        {/* Chat plugin */}
        <Script
          id="chat-plugin"
          src="https://app.simplebotinstall.com/js/chat_plugin.js"
          data-bot-id="40892"
          strategy="lazyOnload"
          defer
        />
        
        {/* Preload interaction script */}
        <Script id="interaction-observer" strategy="afterInteractive">
          {`
            // Lazy load images that are offscreen
            if ('IntersectionObserver' in window) {
              const lazyImages = document.querySelectorAll('img[loading="lazy"]');
              const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                      img.setAttribute('src', src);
                      img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                  }
                });
              });
              
              lazyImages.forEach(image => {
                imageObserver.observe(image);
              });
            }
          `}
        </Script>
      </body>
    </Html>
  );
}