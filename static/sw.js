const CACHE_NAME = 'learn-to-do-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

const STATIC_ASSETS = [
	'/',
	'/typing-test',
	'/favicon.svg',
	'/app.css'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(STATIC_CACHE).then((cache) => {
			return cache.addAll(STATIC_ASSETS);
		})
	);
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
	const { request } = event;
	
	// Skip non-GET requests
	if (request.method !== 'GET') return;
	
	// Skip chrome-extension requests
	if (request.url.startsWith('chrome-extension://')) return;
	
	event.respondWith(
		caches.match(request).then((response) => {
			// Return cached version or fetch from network
			return response || fetch(request).then((fetchResponse) => {
				// Cache successful responses
				if (fetchResponse.status === 200) {
					const responseClone = fetchResponse.clone();
					caches.open(DYNAMIC_CACHE).then((cache) => {
						cache.put(request, responseClone);
					});
				}
				return fetchResponse;
			});
		})
	);
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
	if (event.tag === 'background-sync') {
		event.waitUntil(doBackgroundSync());
	}
});

async function doBackgroundSync() {
	// Handle background sync tasks
	console.log('Background sync completed');
} 