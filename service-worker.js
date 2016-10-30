var files = [
  "/",
  "/index.html",
  "/css/estilo.css",
  "/js/loadCSS.js",
  "/js/cssrelpreload.js",
  "/js/nprogress.min.js",
  "/favicon.ico",
  "/img/facebook-icon.png",
  "/img/autor.jpg",
  "/img/play.jpg",
  "/img/fifa08.jpg",
  "/img/potplayer.jpg",
  "/img/handycache.jpg",
  "/img/pes2015.jpg",
  "/js/app.js",
  "/js/app-reload.js",
  "/js/langpack/en.json"
];
// dev only
if (typeof files == 'undefined') {
  var files = [];
} else {
  files.push('./');
}

var CACHE_NAME = 'erivelton';

self.addEventListener('activate', function(event) {
  console.log('[SW] Activate');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (CACHE_NAME.indexOf(cacheName) == -1) {
            console.log('[SW] Delete cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('install', function(event){
  console.log('[SW] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return Promise.all(
      	files.map(function(file){
      		return cache.add(file);
      	})
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('[SW] fetch ' + event.request.url)
  event.respondWith(
    caches.match(event.request).then(function(response){
      return response || fetch(event.request.clone());
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event);
  clients.openWindow('/');
});