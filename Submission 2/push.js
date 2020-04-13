var webPush = require("web-push");

const vapidKeys = {
    "publicKey": "BCtiAqAMoAghPCnW6OdSGCWJj8GuPUAIKJWY75t4aiqqsQMVHmIgCwMV45mNKDSBnBi0Mp418iQ89U-iIsDW5g8",
    "privateKey": "wBxjEecvdxhovl8YErWxZOppJ0_aC87Wzi6WQIP0mkQ"
};

webPush.setVapidDetails(
    "mailto:sihotangg@gmail.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dwAV5WDf7Q8:APA91bGOp1hTcqNNu0VdcHYHLWy2e2CO11UUtQLK-9rMnrLOm9Hxx2N7bailpvEGPmumKVVZ-5DfIGkXHgDk6iH8UTjC660NEGbFmp6JZhz18Wt-e3BWo67QGK56pkY5pQtGeinctruF",
    "keys": {
        "p256dh": "BIBlnqy2v5kQqu28E/dPA+Iv2Y2Ag517qMhWN7o+kyW2CEOowt1NWb5CVOtIITTGTizyf5sWQT+9Vk2KGpaQORc=",
        "auth": "lRGwmwOuiA2J+N0fiUkKtg=="
    }
};

var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
    gcmAPIKey: "815398615954",
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);