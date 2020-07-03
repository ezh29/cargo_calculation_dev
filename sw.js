const _version = 'v1';
const cacheName = 'ottogiPWA-' + _version;
const cacheList = [];

self.addEventListener('install', function (e) {
    self.skipWaiting();
    console.log('install');
    // e.waitUntil(
      // caches.open(cacheName)
       // .then(function (cache) {
         // return cache.addAll(cacheList);
         // })
     // );
});

// Life cycle: ACTIVATE
self.addEventListener('activate', function(e){
    console.log('Activate');
    e.waitUntil(
      caches.keys().then(function (keyList) {
          return Promise.all(keyList.map(function (key){
              if (key !== cacheName) {
                  console.log('Removing old cache' + key);
                  return caches.delete(key);
              }
          }));
      })
    );
});

// Functional: FETCH
self.addEventListener('fetch', function (e) {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then(function (response) {
          return response || fetch(e.request);
      })
    );
});

//message
self.addEventListener('message', function (e) {
    if (e.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});