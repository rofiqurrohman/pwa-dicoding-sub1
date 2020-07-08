const CACHE_NAME = "wisatangawi-v1";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/manifest.json",
  "/pages/home.html",
  "/pages/airterjun.html",
  "/pages/alam.html",
  "/pages/renang.html",
  "/pages/sejarah.html",
  "/img/benteng.jpeg",
  "/img/hargo.jpg",
  "/img/header.jpg",
  "/img/jamus.jpg",
  "/img/pengantin.jpg",
  "/img/pinus.jpg",
  "/img/redjo.jpg",
  "/img/soerjo.jpg",
  "/img/srambang.jpg",
  "/img/suwono.jpg",
  "/img/teleng.jpg",
  "/img/tirto.jpg",
  "/img/trinil.jpg",
  "/img/wadukpondok.jpg",
  "/img/icon/apple-180x180.png",
  "/img/icon/favicon-16x16.png",
  "/img/icon/favicon-32x32.png",
  "/img/icon/pwa-192x192.png",
  "/img/icon/pwa-512x512.png",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/sw.js"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
  });

  self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });