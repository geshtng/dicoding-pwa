importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
    { url: "/", revision: "1" },
    { url: "/manifest.json", revision: "1"},
    { url: "/index.html", revision: "1"},
    { url: "/nav.html", revision: "1"},
    { url: "/pages/home.html", revision: "1"},
    { url: "/pages/matches.html", revision: "1"},
    { url: "/pages/detail-pages/match.html", revision: "1"},
    { url: "/pages/detail-pages/player.html", revision: "1"},
    { url: "/pages/detail-pages/team.html", revision: "1"},
    { url: "/css/materialize.min.css", revision: "1"},
    { url: "/js/api.js", revision: "1"},
    { url: "/js/db.js", revision: "1"},
    { url: "/js/helpers.js", revision: "1"},
    { url: "/js/idb.js", revision: "1"},
    { url: "/js/materialize.min.js", revision: "1"},
    { url: "/js/my-script.js", revision: "1"},
    { url: "/js/nav.js", revision: "1"},
    { url: "/js/views.js", revision: "1"},
], {
    // Ignore all URL parameters.
    ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    new RegExp("/pages/"),
    workbox.strategies.staleWhileRevalidate({
        cacheName: "pages"
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
)

self.addEventListener("push", event => {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = "Push message no payload";
    }

    var options = {
        body: body,
        icon: "images/icons/icon-512x512.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification("Push Notification", options)
    );
});