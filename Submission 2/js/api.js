var base_url = "https://api.football-data.org/v2";
var api_token = "d6d7c05a129a4462a835cc8a0cd29885";
var id_liga = 2021;

var endpoint_standings = `${base_url}/competitions/${id_liga}/standings?standingType=TOTAL`;
var endpoint_matches = `${base_url}/competitions/${id_liga}/matches?status=SCHEDULED`;
var endpoint_detail_team = `${base_url}/teams/`;
var endpoint_detail_match = `${base_url}/matches/`;
var endpoint_detail_player = `${base_url}/players/`;

var typeTeam = "team";
var typeMatch = "match";
var typePlayer = "player";
var storeNameTeam = "favorite_team";
var storeNameMatch = "favorite_match";
var storeNamePlayer = "favorite_player";

function status(response) {
    if (response.status !== 200) {
        console.log("[API.js][status] Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}
function json(response) {
    return response.json();
}

function error(error) {
    console.log("[API.js][error] Error : " + error);
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
            caches.match(endpoint_standings).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getResultStandingsJSON(data);
                        resolve(data);
                    });
                }
            });
        }
    
        fetchAPI(endpoint_standings)
            .then(status)
            .then(json)
            .then(function(data) {
                getResultStandingsJSON(data);
                resolve(data);
            })
    
        .catch(error);
    });
}

function getMatches() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_matches).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getResultMatchesJSON(data);
                        resolve(data);
                    });
                }
            });
        }
    
        fetchAPI(endpoint_matches)
            .then(status)
            .then(json)
            .then(function(data) {
                getResultMatchesJSON(data);
                resolve(data);
            })
        .catch(error);
    });
}

function getTeamDetail(teamID) {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_detail_team + teamID).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getResultTeamInfoJSON(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(endpoint_detail_team + teamID)
            .then(status)
            .then(json)
            .then(function(data) {
                getResultTeamInfoJSON(data);
                resolve(data);
            })
        .catch(error);
    });  
}

function getMatchDetail(matchID) {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_detail_match + matchID).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getResultMatchDetailJSON(data);
                        resolve(data);
                    });
                }
            });
        }
    
        fetchAPI(endpoint_detail_match + matchID)
            .then(status)
            .then(json)
            .then(function(data) {
                getResultMatchDetailJSON(data);
                resolve(data);
            })
        .catch(error);
    });
}

function getPlayerDetail(playerID) {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_detail_player + playerID).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getResultPlayerDetailJSON(data);
                        resolve(data);
                    });
                }
            });
        }
    
        fetchAPI(endpoint_detail_player + playerID)
            .then(status)
            .then(json)
            .then(function(data) {
                getResultPlayerDetailJSON(data);
                resolve(data);
            })
        .catch(error);
    });
}

function tabFavorite(type) {
    if (type == typeTeam) {
        getAllFavorites(storeNameTeam).then(function(data) {
            getResultTeamFavoritesJSON(data);
        });
    }
    else if(type == typeMatch) {
        getAllFavorites(storeNameMatch).then(function(data) {
            getResultMatchFavoritesJSON(data);
        });
    }
    else if(type == typePlayer) {
        getAllFavorites(storeNamePlayer).then(function(data) {
            getResultPlayerFavoritesJSON(data); 
        });
    }
}

function getFavoriteById(ID, type) {
    if (type == typeTeam) {
        getById(ID, storeNameTeam).then(function(data) {
            getResultTeamInfoJSON(data);
        });
    }
    else if (type == typeMatch) {
        getById(ID, storeNameMatch).then(function(data) {
            getResultMatchDetailJSON(data);
        })
    }
    else if (type == typePlayer) {
        getById(ID, storeNamePlayer).then(function(data) {
            getResultPlayerDetailJSON(data);
        })
    }
}