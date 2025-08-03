// Purrify Service Worker for PWA functionality
const CACHE_NAME = 'purrify-v1.0.0';
const STATIC_CACHE = 'purrify-static-v1';
const DYNAMIC_CACHE = 'purrify-dynamic-v1';

// Assets to cache for offline functionality
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/optimized/purrify-logo-icon.webp',
  // Add critical CSS and JS files
  '/_next/static/css/',
  '/_next/static/js/',
  // Critical pages
  '/products/trial-size',
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
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Take control of all pages immediately
  self.clients.claim();
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests
  if (!url.origin.includes(self.location.origin)) {
    return;
  }
  
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Otherwise fetch from network
        return fetch(request)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            // Cache dynamic content
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // If both cache and network fail, show offline page for navigation requests
            if (request.destination === 'document') {
              return caches.match('/offline');
            }
            
            // For other requests, you might want to return a default response
            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

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
        } catch (error) {
          console.error('Service Worker: Failed to sync contact form', error);
        }
      }
    }
  } catch (error) {
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
        } catch (error) {
          console.error('Service Worker: Failed to sync newsletter signup', error);
        }
      }
    }
  } catch (error) {
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
