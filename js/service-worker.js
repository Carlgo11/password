const urls = ['/', '/css/main.css', '/img/icons/favicon.svg', '/js/main.js', '/manifest.json'];

self.addEventListener('install', event => {
    console.log("Install");
    event.waitUntil(caches.open('cache')
        .then(c => c.addAll(urls))
        .then(self.skipWaiting()));
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request).then(async cachedResponse => {
        return cachedResponse || await fetch(event.request);
    }));
});
