const cacheName = 'sample-pwa';
const filesToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/funny_kids_laughing.mp4',
  'https://www.youtube.com/embed/XGSy3_Czz8k?controls=1'
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
