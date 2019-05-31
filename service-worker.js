// Incrementing CACHE_VERSION will kick off the install event and force previously cached
// resources to be cached again.
const CACHE_VERSION = 1;
let CURRENT_CACHES = {
    offline: 'offline-v' + CACHE_VERSION,
    assets: 'assets-v' + CACHE_VERSION
};
const OFFLINE_URL = 'index.html';

function createCacheBustedRequest(url) {
    let request = new Request(url, {
        cache: 'reload'
    });
    if ('cache' in request) {
        return request;
    }

    // If {cache: 'reload'} didn't have any effect, append a cache-busting URL parameter instead.
    let bustedUrl = new URL(url, self.location.href);
    bustedUrl.search += (bustedUrl.search ? '&' : '') + 'cachebust=' + Date.now();
    return new Request(bustedUrl);
}

self.addEventListener('install', event => {
    event.waitUntil(
        fetch(createCacheBustedRequest(OFFLINE_URL)).then(function (response) {
            return caches.open(CURRENT_CACHES.offline).then(function (cache) {
                return cache.put(OFFLINE_URL, response);
            });
        })
    );
    event.waitUntil(
        caches.open(CURRENT_CACHES.assets).then(function (cache) {
            return cache.addAll(
                ['.',
                    'css/corner.css',
                    'css/main.min.css',
                    'img/favicon_16px.png',
                    'img/favicon_32px.png',
                    'img/favicon_64px.png',
                    'img/favicon_128px.png',
                    'img/favicon_256px.png',
                    'img/favicon_512px.png',
                    'js/main.js',
                    'index.html'
                ]
            );
        })
    )
});


self.addEventListener('activate', event => {
    let expectedCacheNames = Object.keys(CURRENT_CACHES).map(function (key) {
        return CURRENT_CACHES[key];
    });

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (expectedCacheNames.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate' ||
        (event.request.method === 'GET' &&
            event.request.headers.get('accept').includes('text/html'))) {
        event.respondWith(
            fetch(event.request).catch(error => {
                return caches.match(OFFLINE_URL);
            })
        );
    }
});

self.addEventListener('fetch', function (event) {
    if (!event.request.headers.get('accept').includes('text/html')) {
        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            })
        );
    }
});
