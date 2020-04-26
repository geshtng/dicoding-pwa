var dbPromised = idb.open("bundesliga-idb", 1, upgradeDB => {
     var teamsObjectStore = upgradeDB.createObjectStore(store_name_team, {keyPath: "id"});
     teamsObjectStore.createIndex("team_name", "name", {unique: false});

     var matchObjectStore = upgradeDB.createObjectStore(store_name_match, {keyPath: "id"});
     matchObjectStore.createIndex("home_team", "homeTeam.name", {unique: false});
     matchObjectStore.createIndex("away_team", "awayTeam.name", {unique: false});

     var playerObjectStore = upgradeDB.createObjectStore(store_name_player, {keyPath: "id"});
     playerObjectStore.createIndex("player_name", "name", {unique: false});
});

function addToFavorite(data, store_name) {
    var dataValue;

    switch (store_name) {
        case store_name_team: dataValue = data; break;
        case store_name_match: dataValue = data.match; break;
        case store_name_player: dataValue = data; break;
    }

    dbPromised
        .then(db => {
            var tx = db.transaction(store_name, "readwrite");
            var store = tx.objectStore(store_name);
            
            store.put(dataValue);
            
            return tx.complete;
        })
        .then(function() {
            M.toast({
                html: "Berhasil ditambahkan ke favorite."
            });
        });
}

function removeFromFavorites(ID, store_name) {
    dbPromised
        .then(db => {
            var tx = db.transaction(store_name, "readwrite");
            var store = tx.objectStore(store_name);

            store.delete(ID);

            return tx.complete;
        })
        .then(function() {
            M.toast({
                html: "Berhasil dihapus dari favorite."
            });
        });

    location.reload();
}

function getAllFavorites(store_name) {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(db => {
                var tx = db.transaction(store_name, "readonly");
                var store = tx.objectStore(store_name);

                return store.getAll();
            })
            .then(data => {
                resolve(data);
            });
    });
}

function getById(ID, store_name) {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(db => {
                var tx = db.transaction(store_name, "readonly");
                var store = tx.objectStore(store_name);

                return store.get(ID);
            })
            .then(data => {
                resolve(data);
            });
    });
}

async function isFavorite(ID, store_name) {
    return await getById(ID, store_name) === undefined ? false : true;
}
