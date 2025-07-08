const CACHE_NAME = 'teamlunch-v1';
const OFFLINE_URL = '/offline.html';

// Files to cache for offline functionality
const urlsToCache = [
    '/',
    '/offline.html',
    '/css/styles.css',
    '/js/cart.js',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    'https://cdn.tailwindcss.com'
];

// Install event - cache resources
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching app shell');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                // Force the waiting service worker to become the active service worker
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Claim control of all clients
            return self.clients.claim();
        })
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip requests to external domains (except fonts and CDN)
    const url = new URL(event.request.url);
    if (url.origin !== location.origin && 
        !url.hostname.includes('fonts.googleapis.com') && 
        !url.hostname.includes('cdn.tailwindcss.com')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version if available
                if (response) {
                    return response;
                }

                // Try to fetch from network
                return fetch(event.request)
                    .then(response => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        // Add to cache for future use
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // Network failed, check if we have a cached version
                        return caches.match(event.request)
                            .then(cachedResponse => {
                                if (cachedResponse) {
                                    return cachedResponse;
                                }

                                // For navigation requests, return offline page
                                if (event.request.mode === 'navigate' || 
                                    (event.request.method === 'GET' && 
                                     event.request.headers.get('accept').includes('text/html'))) {
                                    return caches.match(OFFLINE_URL);
                                }

                                // For other requests, return a generic offline response
                                return new Response('Offline', {
                                    status: 503,
                                    statusText: 'Service Unavailable'
                                });
                            });
                    });
            })
    );
});

// Background sync for when connection is restored
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        console.log('Background sync triggered');
        event.waitUntil(
            // Perform any background sync tasks here
            Promise.resolve()
        );
    }
});

// Push notification handling (for future use)
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/icon-192x192.png',
            badge: '/icon-72x72.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: data.primaryKey
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Öffnen',
                    icon: '/icon-192x192.png'
                },
                {
                    action: 'close',
                    title: 'Schließen',
                    icon: '/icon-192x192.png'
                }
            ]
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Notification click handling
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        // Open the app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handling from main thread
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Update cache when new version is available
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'UPDATE_CACHE') {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(cache => {
                    return cache.addAll(urlsToCache);
                })
        );
    }
}); 