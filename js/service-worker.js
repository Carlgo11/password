const CACHE_NAME = 'cache';
const urlsToCache = [
    '/',
    '/css/main.css',
    '/js/main.js',
    '/img/apple/apple-touch-icon_256px.png',
    '/img/favicon.svg'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});

// Extend scope to the entire domain
self.addEventListener('activate', function (event) {
    event.waitUntil(self.clients.claim());
});
