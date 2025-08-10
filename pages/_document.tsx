import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { PurrifyStructuredData } from '../src/components/seo/AdvancedStructuredData';
import { PerformanceMonitor } from '../src/components/performance/PerformanceMonitor';
import { CacheOptimizer } from '../src/components/performance/CacheOptimizer';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Critical CSS inline to improve Core Web Vitals */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Critical CSS for above-the-fold content */
          * { box-sizing: border-box; }
          body { margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333333; background-color: #FFFFFF; }
          .hero-section { position: relative; overflow: hidden; background: linear-gradient(135deg, #FFFFFF 0%, #FFFFF5 50%, #FFFFFF 100%); min-height: 100vh; display: flex; align-items: center; }
          .hero-container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: center; }
          @media (min-width: 1024px) { .hero-container { grid-template-columns: 1fr 1fr; gap: 3rem; } }
          .hero-content { z-index: 10; }
          .hero-title { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; color: #1E1B4B; }
          .hero-subtitle { font-size: 1.25rem; color: #333333; font-weight: 300; margin-bottom: 2rem; line-height: 1.6; }
          .hero-buttons { display: flex; flex-direction: column; gap: 1rem; }
          @media (min-width: 640px) { .hero-buttons { flex-direction: row; } }
          .hero-button { display: inline-flex; align-items: center; justify-content: center; padding: 1rem 2rem; font-weight: 700; font-size: 1rem; border-radius: 0.75rem; text-decoration: none; transition: all 0.3s ease; border: none; cursor: pointer; min-height: 3rem; }
          .hero-button-primary { background: linear-gradient(135deg, #FF3131 0%, #FF3131 100%); color: white; box-shadow: 0 4px 6px -1px rgba(255, 49, 49, 0.1), 0 2px 4px -1px rgba(255, 49, 49, 0.06); }
          .hero-button-primary:hover { box-shadow: 0 10px 15px -3px rgba(255, 49, 49, 0.1), 0 4px 6px -2px rgba(255, 49, 49, 0.05); transform: translateY(-1px); }
          .hero-button-secondary { background: white; color: #5B2EFF; border: 2px solid #5B2EFF; }
          .hero-button-secondary:hover { background: #5B2EFF; color: white; }
          .hero-video-container { position: relative; display: flex; flex-direction: column; align-items: center; }
          .hero-video-wrapper { position: relative; overflow: hidden; border-radius: 1.5rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); transition: all 0.3s ease; }
          .hero-video { width: 100%; max-width: 500px; height: auto; display: block; object-fit: cover; }
          .hero-decoration { position: absolute; border-radius: 50%; filter: blur(3rem); opacity: 0.7; transition: opacity 0.7s ease; }
          .hero-decoration-1 { top: 5rem; left: 2.5rem; width: 16rem; height: 16rem; background: rgba(255, 49, 49, 0.2); }
          .hero-decoration-2 { bottom: 5rem; right: 2.5rem; width: 20rem; height: 20rem; background: rgba(224, 239, 199, 0.3); }
          .hero-decoration-3 { top: 10rem; right: 5rem; width: 5rem; height: 5rem; background: rgba(91, 46, 255, 0.2); filter: blur(1.5rem); }
          .hero-skeleton { background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: loading 1.5s infinite; }
          @keyframes loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
          .skip-nav { position: absolute; top: -40px; left: 6px; background: #FF3131; color: white; padding: 8px; text-decoration: none; border-radius: 4px; z-index: 1000; transition: top 0.3s; }
          .skip-nav:focus { top: 6px; }
          .container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
          @media (max-width: 640px) { .container { padding: 0 0.75rem; } .hero-title { font-size: 2.5rem; } .hero-subtitle { font-size: 1.125rem; } }
          @media print { .hero-decoration, .hero-video { display: none; } .hero-section { background: white; min-height: auto; } }
        `}} />
        
        {/* Preload critical fonts for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/optimized/purrify-logo-icon.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/optimized/purrify-logo-text.webp"
          as="image"
          type="image/webp"
        />
        
        {/* Preload hero video poster for better LCP */}
        <link
          rel="preload"
          href="/optimized/cat_rose_thumbnail.webp"
          as="image"
          type="image/webp"
        />
        
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
          className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:z-50 focus:text-[#FF3131] focus:top-0 focus:left-0"
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