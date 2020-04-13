/* Register Service Worker */
if ("serviceWorker" in navigator) {
    registerServiceWorker();
    requestPermission();
} else {
    console.log("[myScript.js][ServiceWorker] Service Worker belum didukung browser ini.");
}

function registerServiceWorker() {
    return navigator.serviceWorker
        .register("/service-worker.js")
        .then(function(registration) {
            console.log("[myScript.js][registerServiceWorker] Registrasi Service Worker berhasil.");
            return registration;
        })
        .catch(function(err) {
            console.error("[myScript.js][registerServiceWorker] Registrasi Service Worker gagal.", err);
        });
}

function requestPermission() {
    if ("Notification" in window) {
        Notification.requestPermission().then(function(result) {
            if (result === "denied") {
                console.log("[myScript.js][requestPermission] Fitur notifikasi tidak diizinkan.");
                return;
            }
            else if (result === "default") {
                console.error("[myScript.js][requestPermission] Pengguna menutup kotak dialog permintaan izin.");
                return;
            }
    
            // navigator.serviceWorker.getRegistration().then(function(reg) {
            //     reg.showNotification("[mySript.js][requestPermission] Notifikasi diizinkan!");
            // });

            if (("PushManager") in window) {
                navigator.serviceWorker.getRegistration().then(function(registration) {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BCtiAqAMoAghPCnW6OdSGCWJj8GuPUAIKJWY75t4aiqqsQMVHmIgCwMV45mNKDSBnBi0Mp418iQ89U-iIsDW5g8")
                    }).then(function(subscribe) {
                        console.log("[myScript.js][requestPermission] Berhasil melakukan subscribe");
                        console.log("[Endpoint]: ", subscribe.endpoint);
                        console.log("[p256dh key]: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey("p256dh")))));
                        console.log("[Auth key]: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey("auth")))));
                    }).catch(function(e) {
                        console.error("[myScript.js][requestPermission] Tidak dapat melakukan subscribe", e.message);
                    })
                })
            }
        });
    }
}