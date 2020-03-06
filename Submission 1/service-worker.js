const CACHE_NAME = "dicoding";
var urlsToCache = [
    "/",
    "/manifest.json",
    "/nav.html",
    "/index.html",
    "/pages/academy.html",
    "/pages/challenge.html",
    "/pages/event.html",
    "/pages/job.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/images/academy/academy-why-cicilan.png",
    "/images/academy/academy-why-review.png",
    "/images/academy/academy-why-uptodate.png",
    "/images/academy/aplikasi_kognitif.png",
    "/images/academy/java.png",
    "/images/academy/line_chatbot.png",
    "/images/academy/line_liff.png",
    "/images/academy/python.png",
    "/images/academy/source_code_management.png",
    "/images/challenge/ai_for_agriculture.png",
    "/images/challenge/be_kraf.png",
    "/images/challenge/challenge-ui-ability.png",
    "/images/challenge/challenge-ui-industry.png",
    "/images/challenge/challenge-ui-reward.png",
    "/images/challenge/create_your_ar.png",
    "/images/challenge/id_camp.png",
    "/images/challenge/samsung.jpg",
    "/images/challenge/telkom.png",
    "/images/event/aej.jpg",
    "/images/event/basic-seo.png",
    "/images/event/event-ui-network.png",
    "/images/event/event-ui-update.png",
    "/images/event/event-ui-upgrade.png",
    "/images/event/kotlinconf.png",
    "/images/job/exel.jpg",
    "/images/job/garuda-infinity.jpg",
    "/images/job/job-company-partnership.png",
    "/images/job/job-competition.png",
    "/images/job/job-dicoding-portfolio.png",
    "/images/job/septagon.png",

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
