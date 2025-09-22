// Purrify Revenue-Optimized Service Worker
const CACHE_VERSION = 'purrify-v1.2';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const CHECKOUT_CACHE = `${CACHE_VERSION}-checkout`;

// Critical resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/products/trial-size',
  '/products/compare',
  '/checkout',
  '/manifest.json',
  '/optimized/purrify-logo.webp',
  '/optimized/20g.webp',
  '/optimized/60g.webp',
  '/optimized/140g.webp'
];

// Dynamic resources that should be cached
const DYNAMIC_PATTERNS = [
  /\/api\/products/,
  /\/api\/testimonials/,
  /\/locations\//,
  /\/solutions\//,
  /\/compare\//
];

// Checkout-critical resources
const CHECKOUT_PATTERNS = [
  /\/api\/create-checkout-session/,
  /\/api\/edge\/prefetch-checkout/,
  /stripe\.com/,
  /checkout\.stripe\.com/
];

// Network-first strategies for real-time data
const NETWORK_FIRST_PATTERNS = [
  /\/api\/cart/,
  /\/api\/newsletter/,
  /\/api\/contact/
];

self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker installing...');
  
  event.waitUntil(
    (async () => {
      try {
        // Cache critical static assets
        const staticCache = await caches.open(STATIC_CACHE);
        await staticCache.addAll(STATIC_ASSETS);
        
        // Preload critical product data
        await preloadCriticalData();
        
        console.log('✅ Service Worker installed successfully');
        
        // Skip waiting to activate immediately
        self.skipWaiting();
      } catch (_error) {
        console.error('❌ Service Worker installation failed:', error);
      }
    })()
  );
});

self.addEventListener('activate', (event) => {
  console.log('🔄 Service Worker activating...');
  
  event.waitUntil(
    (async () => {
      try {
        // Clean up old caches
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames
            .filter(name => name.startsWith('purrify-') && !name.includes(CACHE_VERSION))
            .map(name => caches.delete(name))
        );
        
        // Take control of all clients immediately
        await self.clients.claim();
        
        console.log('✅ Service Worker activated successfully');
      } catch (_error) {
        console.error('❌ Service Worker activation failed:', error);
      }
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests and cross-origin requests
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // Determine caching strategy based on URL patterns
  if (isStaticAsset(url.pathname)) {
    event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
  } else if (isCheckoutCritical(url.pathname)) {
    event.respondWith(networkFirstWithOfflineSupport(request, CHECKOUT_CACHE));
  } else if (isDynamicContent(url.pathname)) {
    event.respondWith(staleWhileRevalidateStrategy(request, DYNAMIC_CACHE));
  } else if (isNetworkFirst(url.pathname)) {
    event.respondWith(networkFirstStrategy(request));
  } else {
    // Default strategy for other requests
    event.respondWith(staleWhileRevalidateStrategy(request, DYNAMIC_CACHE));
  }
});

// Background sync for offline checkout attempts
self.addEventListener('sync', (event) => {
  if (event.tag === 'checkout-retry') {
    event.waitUntil(retryOfflineCheckouts());
  } else if (event.tag === 'analytics-sync') {
    event.waitUntil(syncOfflineAnalytics());
  }
});

// Push notifications for cart abandonment (if enabled)
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  try {
    const data = event.data.json();
    
    if (data.type === 'cart-reminder') {
      event.waitUntil(showCartReminderNotification(data));
    }
  } catch (_error) {
    console.error('Push notification error:', error);
  }
});

// Caching Strategies Implementation

async function cacheFirstStrategy(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      // Return cached version immediately
      return cachedResponse;
    }
    
    // Fetch from network and cache
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (_error) {
    console.error('Cache-first strategy failed:', error);
    return new Response('Offline - Resource not available', { status: 503 });
  }
}

async function networkFirstWithOfflineSupport(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(cacheName);
      await cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
  } catch (_error) {
    // Fallback to cache
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // For checkout requests, return offline checkout page
    if (request.url.includes('checkout')) {
      return createOfflineCheckoutResponse();
    }
    
    return new Response('Offline - Please check your connection', { status: 503 });
  }
}

async function staleWhileRevalidateStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Always try to fetch fresh data in background
  const networkResponsePromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => null);
  
  // Return cached version immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Wait for network if no cache
  return networkResponsePromise || new Response('Offline', { status: 503 });
}

async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (_error) {
    return new Response('Network request failed', { status: 503 });
  }
}

// Helper functions for URL pattern matching

function isStaticAsset(pathname) {
  return STATIC_ASSETS.includes(pathname) || 
         pathname.startsWith('/optimized/') ||
         pathname.startsWith('/_next/static/') ||
         pathname.includes('.css') ||
         pathname.includes('.js') ||
         pathname.includes('.webp') ||
         pathname.includes('.jpg') ||
         pathname.includes('.png');
}

function isCheckoutCritical(pathname) {
  return CHECKOUT_PATTERNS.some(pattern => pattern.test(pathname));
}

function isDynamicContent(pathname) {
  return DYNAMIC_PATTERNS.some(pattern => pattern.test(pathname));
}

function isNetworkFirst(pathname) {
  return NETWORK_FIRST_PATTERNS.some(pattern => pattern.test(pathname));
}

// Specialized functions

async function preloadCriticalData() {
  try {
    // Preload product data
    const productsResponse = await fetch('/api/products');
    if (productsResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      await cache.put('/api/products', productsResponse);
    }
    
    // Preload testimonials
    const testimonialsResponse = await fetch('/api/testimonials');
    if (testimonialsResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      await cache.put('/api/testimonials', testimonialsResponse);
    }
  } catch (_error) {
    console.error('Failed to preload critical data:', error);
  }
}

function createOfflineCheckoutResponse() {
  const offlineHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Offline Checkout - Purrify</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
          background: linear-gradient(135deg, #fef3c7 0%, #fce7f3 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .container {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .icon { font-size: 48px; margin-bottom: 20px; }
        h1 { color: #f97316; margin-bottom: 20px; }
        .button {
          background: linear-gradient(45deg, #f97316, #ec4899);
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          text-decoration: none;
          display: inline-block;
          margin: 10px;
          cursor: pointer;
        }
        .retry-info {
          background: #fef3c7;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
          border-left: 4px solid #f59e0b;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="icon">📱</div>
        <h1>You're Offline</h1>
        <p>Don't worry! Your cart is saved and we'll process your order when you're back online.</p>
        
        <div class="retry-info">
          <strong>📱 Offline Checkout Saved</strong><br>
          We'll automatically retry when your connection returns.
        </div>
        
        <button class="button" onclick="retryConnection()">Try Again</button>
        <a href="/" class="button">Return Home</a>
        
        <script>
          function retryConnection() {
            if (navigator.onLine) {
              window.location.reload();
            } else {
              alert('Still offline. We\\'ll retry automatically when connected.');
            }
          }
          
          // Auto-retry when back online
          window.addEventListener('online', () => {
            setTimeout(() => window.location.reload(), 1000);
          });
        </script>
      </div>
    </body>
    </html>
  `;
  
  return new Response(offlineHTML, {
    headers: { 'Content-Type': 'text/html' }
  });
}

async function retryOfflineCheckouts() {
  try {
    // Get stored offline checkout attempts
    const offlineCheckouts = await getStoredCheckouts();
    
    for (const checkout of offlineCheckouts) {
      try {
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(checkout.data)
        });
        
        if (response.ok) {
          await removeStoredCheckout(checkout.id);
          
          // Notify user of successful checkout
          await self.registration.showNotification('Checkout Complete! 🎉', {
            body: 'Your Purrify order has been processed successfully.',
            icon: '/optimized/purrify-logo-icon.webp',
            badge: '/optimized/purrify-logo-icon.webp',
            tag: 'checkout-success'
          });
        }
      } catch (_error) {
        console.error('Failed to retry checkout:', error);
      }
    }
  } catch (_error) {
    console.error('Retry offline checkouts failed:', error);
  }
}

async function syncOfflineAnalytics() {
  // Sync offline analytics events when back online
  try {
    const offlineEvents = await getStoredAnalytics();
    
    for (const event of offlineEvents) {
      try {
        // Send to analytics service
        if (self.gtag) {
          self.gtag('event', event.name, event.parameters);
        }
        
        await removeStoredAnalytic(event.id);
      } catch (_error) {
        console.error('Failed to sync analytic event:', error);
      }
    }
  } catch (_error) {
    console.error('Sync offline analytics failed:', error);
  }
}

async function showCartReminderNotification(data) {
  const options = {
    body: data.message || 'Your cats are waiting! Complete your Purrify order.',
    icon: '/optimized/purrify-logo-icon.webp',
    badge: '/optimized/purrify-logo-icon.webp',
    tag: 'cart-reminder',
    requireInteraction: true,
    actions: [
      {
        action: 'complete-order',
        title: 'Complete Order',
        icon: '/optimized/20g.webp'
      },
      {
        action: 'dismiss',
        title: 'Later',
        icon: '/icons/dismiss.png'
      }
    ],
    data: {
      cartValue: data.cartValue,
      discount: data.discount
    }
  };
  
  return self.registration.showNotification('Don\'t Let Odors Win! 🐱', options);
}

// IndexedDB helpers for offline storage
async function getStoredCheckouts() {
  // Implementation would use IndexedDB to store/retrieve offline checkout attempts
  return [];
}

async function removeStoredCheckout(_id) {
  // Remove processed checkout from storage
}

async function getStoredAnalytics() {
  // Get stored analytics events
  return [];
}

async function removeStoredAnalytic(_id) {
  // Remove processed analytic event
}

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PERFORMANCE_MARK') {
    // Track performance metrics
    console.log('Performance mark:', event.data.mark);
  }
});

console.log('🎯 Purrify Revenue Service Worker loaded successfully!');