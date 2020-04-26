const base_url = "https://api.football-data.org/v2";
const api_token = "d6d7c05a129a4462a835cc8a0cd29885";
const id_liga = 2002;

const endpoint_standings = `${base_url}/competitions/${id_liga}/standings?standingType=TOTAL`;
const endpoint_matches = `${base_url}/competitions/${id_liga}/matches?status=SCHEDULED`;
const endpoint_detail_team = `${base_url}/teams/`;
const endpoint_detail_match = `${base_url}/matches/`;
const endpoint_detail_player = `${base_url}/players/`;

const store_name_team = "favorite_team";
const store_name_match = "favorite_match";
const store_name_player = "favorite_player";

function status(response) {
    if (response.status !== 200) {
        console.log("Error : ", response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}

function fetchAPI(endpoint) {
    return fetch(endpoint, {
        headers: {
            "X-Auth-Token": api_token
        }
    });
}

function getStandings() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_standings).then(response => {
                if (response) {
                    response.json().then(data => {
                        getStandingsView(data);
                        resolve(data);
                    });
                } 
            });
        }

        fetchAPI(endpoint_standings)
            .then(status)
            .then(json)
            .then(data => {
                getStandingsView(data);
                resolve(data);      
            })
            .catch(error);
    });
}

function getMatches() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_matches).then(response => {
                if (response) {
                    response.json().then(data => {
                        getMatchesView(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(endpoint_matches)
            .then(status)
            .then(json)
            .then(data => {
                getMatchesView(data);
                resolve(data);
            })
            .catch(error);
    });
}

function getDetailTeam(teamID) {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_detail_team + teamID).then(response => {
                if (response) {
                    response.json().then(data => {
                        getDetailTeamView(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(endpoint_detail_team + teamID)
            .then(status)
            .then(json)
            .then(data => {
                getDetailTeamView(data);
                resolve(data);
            })
            .catch(error);
    });
}

function getDetailMatch(matchID) {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_detail_match + matchID).then(response => {
                if (response) {
                    response.json().then(data => {
                        getDetailMatchView(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(endpoint_detail_match + matchID)
            .then(status)
            .then(json)
            .then(data => {
                getDetailMatchView(data);
                resolve(data);
            })
            .catch(error);
    });
}

function getDetailPlayer(playerID) {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_detail_player + playerID).then(response => {
                if (response) {
                    response.json().then(data => {
                        getDetailPlayerView(data);
                        resolve(data);
                    })
                }
            });
        }

        fetchAPI(endpoint_detail_player + playerID)
            .then(status)
            .then(json)
            .then(data => {
                getDetailPlayerView(data);
                resolve(data);
            })
            .catch(error);
    });
}

function filterFavorites(store_name) {
    var type;

    switch (store_name) {
        case store_name_team:
            type = "team";
            getAllFavorites(store_name).then(data => {
                if (data == "") showEmptyFavoriteView(type);
                else getTeamFavoriteView(data);
            });
            break;

        case store_name_match:
            type = "match";
            getAllFavorites(store_name).then(data => {
                if (data == "") showEmptyFavoriteView(type);
                else getMatchFavoriteView(data);
            });
            break;
            
        case store_name_player:
            type = "player";
            getAllFavorites(store_name).then(data => {
                if (data == "") showEmptyFavoriteView(type);
                else getPlayerFavoriteView(data);
            });
            break;
    }
}

function getFavoriteById(ID, store_name) {
    switch (store_name) {
        case store_name_team:
            getById(ID, store_name).then(data => {
                getDetailTeamView(data);
            });
            break;
        
        case store_name_match:
            getById(ID, store_name).then(data => {
                getDetailMatchView(data);
            });
            break;

        case store_name_player:
            getById(ID, store_name).then(data => {
                getDetailPlayer(data);
            })
            break;
    }
}