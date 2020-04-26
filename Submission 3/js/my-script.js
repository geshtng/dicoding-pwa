if ("serviceWorker" in navigator) {
    registerServiceWoker();
} else {
    console.log("Service Woker belum didukung browser ini");
}

function registerServiceWoker() {
    return navigator.serviceWorker
        .register("/service-worker.js")
        .then(registration => {
            console.log("Registrasi Service Worker berhasil.");
            return registration;
        })
        .catch(err => {
            console.error("Registrasi Service Worker gagal", err);
        });
}

if ("Notification" in window) {
    requestPermission();
} else {
    console.log("Browser tidak mendukung notifikasi.")
}

function requestPermission() {
    Notification.requestPermission().then(result => {
        if (result === "denied") {
            console.log("Fitur notifikasi tidak diizinkan.");
            return;
        }
        else if (result === "default") {
            console.error("Pengguna menutup kotak dialog permintaan izin.");
            return;
        }

        if (("PushManager") in window) {
            navigator.serviceWorker.getRegistration().then(function(registration) {
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array("BM_vPV6RYMu17r-G_mtSuSLvuWR7_oTn2jSVCPP2oGMWRwffm-M3VvxMjIjsw9VIEvv0Hvajo9MYhW1wMR4h6Og")
                }).then(function(subscribe) {
                    console.log("Berhasil melakukan subscribe");
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