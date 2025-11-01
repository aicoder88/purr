// Purrify Service Worker for PWA functionality
const CACHE_VERSION = '2025.01.17';
const STATIC_CACHE = `purrify-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `purrify-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `purrify-images-${CACHE_VERSION}`;

// Critical assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/optimized/purrify-logo-icon.webp',
  '/optimized/20g.webp',
  '/optimized/60g.webp',
  '/optimized/140g.webp',
  // Critical pages for offline access
  '/products/trial-size',
  '/products/standard',
  '/learn/how-it-works',
  '/support/contact'
];


// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error('Service Worker: Error caching static assets', error);
      })
  );
  
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');

  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheName.includes(CACHE_VERSION)) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all pages immediately
      self.clients.claim()
    ])
  );
});

const imageExtensionPattern = /\.(jpg|jpeg|png|gif|webp|avif|svg)$/;

// Optimized fetch handler with intelligent caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and external requests
  if (request.method !== 'GET' || !url.origin.includes(self.location.origin)) {
    return;
  }

  // Determine cache strategy based on request type
  if (url.pathname.startsWith('/optimized/') || imageExtensionPattern.test(url.pathname)) {
    // Images: Cache first strategy for long-term caching
    event.respondWith(handleImageRequest(request));
  } else if (url.pathname.startsWith('/api/')) {
    // API: Network first for fresh data
    event.respondWith(handleApiRequest(request));
  } else if (url.pathname.startsWith('/_next/static/')) {
    // Static assets: Cache first with long-term caching
    event.respondWith(handleStaticAssetRequest(request));
  } else {
    // Pages: Stale while revalidate for good UX
    event.respondWith(handlePageRequest(request));
  }
});

// Cache-first strategy for images
async function handleImageRequest(request) {
  try {
    const cache = await caches.open(IMAGE_CACHE);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (_error) {
    console.warn('Image cache error:', error);
    return new Response('Image not available offline', { status: 503 });
  }
}

// Network-first strategy for API requests
async function handleApiRequest(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (_error) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response('API unavailable offline', { status: 503 });
  }
}

// Cache-first for static assets
async function handleStaticAssetRequest(request) {
  try {
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (_error) {
    return new Response('Asset not available offline', { status: 503 });
  }
}

// Stale-while-revalidate for pages
async function handlePageRequest(request) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);

    // Fetch fresh version in background
    const fetchPromise = fetch(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    }).catch(() => null);

    // Return cached version immediately if available
    if (cachedResponse) {
      return cachedResponse;
    }

    // Otherwise wait for network
    const response = await fetchPromise;
    if (response) {
      return response;
    }

    // Fallback to offline page
    return cache.match('/') || new Response('Page not available offline', {
      status: 503,
      headers: { 'Content-Type': 'text/html' }
    });
  } catch (_error) {
    console.warn('Page cache error:', error);
    return new Response('Page not available offline', { status: 503 });
  }
}

// Background sync for form submissions when offline
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered', event.tag);
  
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForms());
  }
  
  if (event.tag === 'newsletter-signup') {
    event.waitUntil(syncNewsletterSignups());
  }
});

// Push notification handler
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update from Purrify!',
    icon: '/optimized/purrify-logo-icon.webp',
    badge: '/optimized/purrify-logo-icon.webp',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Products',
        icon: '/optimized/purrify-logo-icon.webp'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/optimized/purrify-logo-icon.webp'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Purrify', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/#products')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Helper functions for background sync
async function syncContactForms() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const requests = await cache.keys();
    
    for (const request of requests) {
      if (request.url.includes('/api/contact')) {
        try {
          await fetch(request);
          await cache.delete(request);
          console.log('Service Worker: Contact form synced successfully');
        } catch (_error) {
          console.error('Service Worker: Failed to sync contact form', error);
        }
      }
    }
  } catch (_error) {
    console.error('Service Worker: Error syncing contact forms', error);
  }
}

async function syncNewsletterSignups() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const requests = await cache.keys();
    
    for (const request of requests) {
      if (request.url.includes('/api/newsletter')) {
        try {
          await fetch(request);
          await cache.delete(request);
          console.log('Service Worker: Newsletter signup synced successfully');
        } catch (_error) {
          console.error('Service Worker: Failed to sync newsletter signup', error);
        }
      }
    }
  } catch (_error) {
    console.error('Service Worker: Error syncing newsletter signups', error);
  }
}

// Handle app updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('Service Worker: Loaded successfully');
