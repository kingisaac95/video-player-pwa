const cacheName = 'dev-fest-pwa';
const filesToCache = [
  '/',
  '/index.html',
  '/index.html?homescreen=1',
  '/?homescreen=1',
  '/styles/styles.css',
  '/video/funny_kids_laughing.mp4',
];
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
