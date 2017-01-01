
var CACHE = 'cache-and-update';

 
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');

 
  evt.waitUntil(precache());
});

 
self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');

 
  evt.respondWith(fromCache(evt.request));

 
  evt.waitUntil(update(evt.request));
});

 
function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
      './fonts/proximanova-bold-webfont.eot',
      './fonts/proximanova-bold-webfont.ttf',
      './fonts/proximanova-bold-webfont.woff',
      './fonts/proximanova-light-webfont.eot',
      './fonts/proximanova-light-webfont.ttf',
      './fonts/proximanova-light-webfont.woff',
      './fonts/proximanova-regular-webfont.eot',
      './fonts/proximanova-regular-webfont.ttf',
      './fonts/proximanova-regular-webfont.woff',
      './js/nprogress.min.js',
      './img/facebook-icon.png',
      './img/autor.jpg',
      './img/play.jpg',
      './img/fifa08.jpg',
      './img/potplayer.jpg',
      './img/handycache.jpg',
      './img/pes2015.jpg',
      './js/app.js'
    ]);
  });
}

 
function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

 
function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}