/**
 * Advanced Service Worker for Ultimate Performance
 * Apple-inspired offline-first approach with intelligent caching
 * Cost-optimized with strategic resource management
 */

const CACHE_NAME = 'purrify-v2025-montreal';
const CACHE_VERSION = '2.1.0';
const MAX_CACHE_SIZE = 50 * 1024 * 1024; // 50MB cache limit for cost efficiency

// Strategic caching groups for optimal performance/cost ratio
const CACHE_STRATEGIES = {
  // Critical resources - Cache First (instant loading)
  critical: [
    '/',
    '/fr',
    '/montreal',
    '/fr/montreal',
    '/offline',
    '/_next/static/css/',
    '/_next/static/chunks/framework',
    '/_next/static/chunks/main',
    '/optimized/purrify-logo-icon.webp',
    '/optimized/purrify-hero.webp'
  ],

  // Images - Cache First with size optimization
  images: [
    '/optimized/',
    '/images/',
    '/icons/'
  ],

  // API endpoints - Network First with fallback
  api: [
    '/api/products',
    '/api/testimonials',
    '/api/contact',
    '/api/newsletter'
  ],

  // Marketing assets - Stale While Revalidate
  marketing: [
    '/videos/',
    '/fonts/',
    '/css/',
    '/_next/static/'
  ],

  // External resources - Network First
  external: [
    'https://fonts.googleapis.com',
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://js.stripe.com'
  ]
};

// Montreal-specific optimizations
const MONTREAL_OPTIMIZATIONS = {
  // Bilingual content prefetching
  bilingualPrefetch: true,

  // Winter mode (slow network adaptation)
  winterMode: false, // Auto-detected based on date

  // Mobile-first caching (high mobile usage in Montreal)
  mobileFirst: true,

  // Cost optimization settings
  costLimits: {
    maxDailyCacheSize: 10 * 1024 * 1024, // 10MB daily cache growth
    maxImageCache: 20 * 1024 * 1024,     // 20MB image cache
    maxStaticCache: 15 * 1024 * 1024     // 15MB static cache
  }
};

/**
 * Install Service Worker with strategic pre-caching
 */
self.addEventListener('install', event => {
  console.log('🚀 Installing advanced SW v' + CACHE_VERSION);

  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      // Pre-cache critical resources for instant loading
      const criticalResources = [
        '/',
        '/montreal',
        '/optimized/purrify-logo-icon.webp',
        '/optimized/cat_rose_thumbnail.webp',
        '/_next/static/css/critical.css'
      ];

      // Cache critical resources in parallel for speed
      await Promise.allSettled(
        criticalResources.map(url =>
          cache.add(url).catch(err =>
            console.warn(`Failed to cache ${url}:`, err)
          )
        )
      );

      // Pre-cache Montreal-specific bilingual content
      if (MONTREAL_OPTIMIZATIONS.bilingualPrefetch) {
        await cache.addAll([
          '/fr/montreal',
          '/fr/',
          '/zh/'
        ].map(url => url).filter(Boolean));
      }

      // Skip waiting to activate immediately
      self.skipWaiting();
    })()
  );
});

/**
 * Activate with intelligent cache cleanup
 */
self.addEventListener('activate', event => {
  console.log('✅ Activating advanced SW v' + CACHE_VERSION);

  event.waitUntil(
    (async () => {
      // Clean up old caches
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );

      // Monitor cache size and optimize
      await optimizeCacheSize();

      // Take control of all clients immediately
      self.clients.claim();
    })()
  );
});

/**
 * Advanced fetch handler with intelligent routing
 */
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Route to appropriate strategy
  event.respondWith(handleRequest(request, url));
});

/**
 * Intelligent request handler with performance optimization
 */
async function handleRequest(request, url) {
  const pathname = url.pathname;

  try {
    // 1. Critical resources - Cache First (instant loading)
    if (isCriticalResource(pathname)) {
      return await cacheFirstStrategy(request);
    }

    // 2. Images - Cache First with compression
    if (isImageResource(pathname)) {
      return await imageOptimizedStrategy(request);
    }

    // 3. API endpoints - Network First with intelligent fallback
    if (isApiRequest(pathname)) {
      return await networkFirstStrategy(request);
    }

    // 4. Marketing assets - Stale While Revalidate
    if (isMarketingAsset(pathname)) {
      return await staleWhileRevalidateStrategy(request);
    }

    // 5. External resources - Network First with timeout
    if (isExternalResource(url.hostname)) {
      return await externalResourceStrategy(request);
    }

    // 6. Default - Network with cache fallback
    return await networkWithCacheFallback(request);

  } catch (error) {
    console.warn('SW fetch error:', error);
    return await getOfflineFallback(pathname);
  }
}

/**
 * Cache First Strategy - For critical resources
 * Instant loading with background updates
 */
async function cacheFirstStrategy(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    // Background refresh for next visit
    refreshInBackground(request, cache);
    return cachedResponse;
  }

  // Cache miss - fetch and cache
  const response = await fetch(request);
  if (response.ok) {
    cache.put(request, response.clone());
  }
  return response;
}

/**
 * Image Optimized Strategy - With size limits and format optimization
 */
async function imageOptimizedStrategy(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) return cachedResponse;

  try {
    const response = await fetch(request);

    if (response.ok && response.headers.get('content-type')?.includes('image')) {
      const imageSize = response.headers.get('content-length');

      // Only cache if under size limit (cost optimization)
      if (!imageSize || parseInt(imageSize) < 100 * 1024) { // 100KB limit
        cache.put(request, response.clone());
      }
    }

    return response;
  } catch (error) {
    // Return placeholder for failed images
    return new Response(
      '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect width="300" height="200" fill="#f0f0f0"/><text x="150" y="100" text-anchor="middle" fill="#666">Image unavailable</text></svg>',
      { headers: { 'content-type': 'image/svg+xml' } }
    );
  }
}

/**
 * Network First Strategy - For dynamic content
 */
async function networkFirstStrategy(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request, { timeout: 5000 }); // 5s timeout

    if (response.ok) {
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    // Network failed - try cache
    const cachedResponse = await cache.match(request);
    return cachedResponse || getOfflineFallback(request.url);
  }
}

/**
 * Stale While Revalidate - For marketing assets
 */
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  // Always try to update in background
  const networkPromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => null);

  // Return cached version immediately if available
  return cachedResponse || await networkPromise || getOfflineFallback(request.url);
}

/**
 * External Resource Strategy - With timeout and fallback
 */
async function externalResourceStrategy(request) {
  try {
    const response = await fetch(request, {
      timeout: 3000, // 3s timeout for external resources
      mode: 'cors'
    });
    return response;
  } catch (error) {
    // Return empty response to prevent blocking
    return new Response('', { status: 204 });
  }
}

/**
 * Network with Cache Fallback - Default strategy
 */
async function networkWithCacheFallback(request) {
  try {
    const response = await fetch(request);

    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    return cachedResponse || getOfflineFallback(request.url);
  }
}

/**
 * Intelligent offline fallback
 */
async function getOfflineFallback(pathname) {
  // Montreal-specific offline pages
  if (pathname.includes('/montreal')) {
    const cache = await caches.open(CACHE_NAME);
    return await cache.match('/montreal') || await cache.match('/');
  }

  // French language fallback
  if (pathname.startsWith('/fr/')) {
    const cache = await caches.open(CACHE_NAME);
    return await cache.match('/fr/') || await cache.match('/');
  }

  // Default offline page
  const cache = await caches.open(CACHE_NAME);
  return await cache.match('/offline') || new Response(
    `<!DOCTYPE html>
    <html>
    <head>
      <title>Purrify - Offline</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <style>
        body { font-family: Inter, -apple-system, sans-serif; text-align: center; padding: 50px; background: #f5f5f5; }
        .offline { max-width: 400px; margin: 0 auto; }
        .logo { width: 80px; height: 80px; margin: 20px auto; }
        h1 { color: #FF3131; margin-bottom: 20px; }
        p { color: #666; line-height: 1.6; }
      </style>
    </head>
    <body>
      <div class="offline">
        <div class="logo">🐱</div>
        <h1>You're Offline</h1>
        <p>Please check your internet connection. We've cached some content for you to browse.</p>
        <p>Purrify will be back online soon!</p>
      </div>
    </body>
    </html>`,
    { headers: { 'content-type': 'text/html' } }
  );
}

/**
 * Background refresh for cache-first resources
 */
function refreshInBackground(request, cache) {
  // Don't await - let it run in background
  fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
  }).catch(() => {
    // Silent fail for background updates
  });
}

/**
 * Cache size optimization for cost efficiency
 */
async function optimizeCacheSize() {
  const cache = await caches.open(CACHE_NAME);
  const requests = await cache.keys();

  // Calculate total cache size (estimate)
  let totalSize = requests.length * 50 * 1024; // Rough estimate: 50KB per item

  if (totalSize > MAX_CACHE_SIZE) {
    // Remove oldest entries (LRU eviction)
    const oldestEntries = requests.slice(0, Math.floor(requests.length * 0.2));
    await Promise.all(
      oldestEntries.map(request => cache.delete(request))
    );

    console.log(`🧹 Cache cleanup: removed ${oldestEntries.length} entries`);
  }
}

/**
 * Resource classification helpers
 */
function isCriticalResource(pathname) {
  return CACHE_STRATEGIES.critical.some(pattern =>
    pathname === pattern || pathname.startsWith(pattern)
  );
}

function isImageResource(pathname) {
  return CACHE_STRATEGIES.images.some(pattern =>
    pathname.startsWith(pattern)
  ) || /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i.test(pathname);
}

function isApiRequest(pathname) {
  return CACHE_STRATEGIES.api.some(pattern =>
    pathname.startsWith(pattern)
  );
}

function isMarketingAsset(pathname) {
  return CACHE_STRATEGIES.marketing.some(pattern =>
    pathname.startsWith(pattern)
  );
}

function isExternalResource(hostname) {
  return CACHE_STRATEGIES.external.some(pattern =>
    hostname.includes(pattern.replace('https://', ''))
  );
}

/**
 * Montreal-specific winter mode detection
 */
function isWinterMode() {
  const now = new Date();
  const month = now.getMonth();
  // Winter months in Montreal: Nov-Mar (slower networks)
  return month >= 10 || month <= 2;
}

// Auto-enable winter optimizations
if (isWinterMode()) {
  MONTREAL_OPTIMIZATIONS.winterMode = true;
  console.log('❄️ Winter mode enabled - optimizing for slower networks');
}

/**
 * Performance monitoring
 */
self.addEventListener('message', event => {
  if (event.data?.type === 'PERFORMANCE_REPORT') {
    // Send cache performance metrics
    caches.open(CACHE_NAME).then(cache => {
      cache.keys().then(keys => {
        event.ports[0].postMessage({
          type: 'CACHE_STATS',
          cacheSize: keys.length,
          version: CACHE_VERSION,
          winterMode: MONTREAL_OPTIMIZATIONS.winterMode
        });
      });
    });
  }
});

console.log('🏎️ Purrify Advanced SW ready - Montreal optimized v' + CACHE_VERSION);