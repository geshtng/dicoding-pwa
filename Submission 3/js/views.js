function getStandingsView(data) {
    var tableStandingsHtml = "";
    var seasonInfoHtml = "";

    data.standings.forEach(function (standing) {
        var tableDataStanding = "";

        standing.table.forEach(function (team) {
            team = JSON.parse(JSON.stringify(team).replace(/^http:\/\//i, 'https://'));  
            
            tableDataStanding += `
                <tr>
                    <td class="center-align">${team.position}</td>
                    <td>
                        <a href="/pages/detail-pages/team.html?id=${team.team.id}">
                            <p style="display: flex; align-items: center;">
                                <img class="materialboxed" style="float:left; margin-right:20px" width="50" height="50" src="${team.team.crestUrl}">
                                ${team.team.name}
                            </p>
                        </a>
                    </td>
                    <td class="center-align">${team.playedGames}</td>
                    <td class="center-align">${team.won}</td>
                    <td class="center-align">${team.draw}</td>
                    <td class="center-align">${team.lost}</td>
                    <td class="center-align">${team.points}</td>
                    <td class="center-align">${team.goalsFor}</td>
                    <td class="center-align">${team.goalsAgainst}</td>
                    <td class="center-align">${team.goalDifference}</td>
                </tr>
            `;
        })

        var groupName = standing.group;

        tableStandingsHtml += `
            <div class="card">
                <div class="card-content">
                    <table class="responsive-table striped centered">
                        <thead>
                            <tr>
                                <th class="center-align">Position</th>
                                <th class="center-align">Team</th>
                                <th class="center-align">Played</th>
                                <th class="center-align">Won</th>
                                <th class="center-align">Draw</th>
                                <th class="center-align">Lost</th>
                                <th class="center-align">Points</th>
                                <th class="center-align">Goals For</th>
                                <th class="center-align">Goals Against</th>
                                <th class="center-align">Goals Difference</th>
                            </tr>
                        </thead>

                        <tbody>
                            ` + tableDataStanding + `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    });

    seasonInfoHtml += `
        <div class="card">
            <div class="card-content">
                <div class="row" style="margin-bottom: 0px;">
                    <div class="col s4 m2 l2">
                        <p>Start date</p>
                        <p>End date</p>
                        <p>Matchday</p>
                        <p>Last updated</p>
                    </div>
                    <div class="col s6 m4 l2">
                        <p>: ${convertDate(new Date(data.season.startDate))}</p>
                        <p>: ${convertDate(new Date(data.season.endDate))}</p>
                        <p>: ${data.season.currentMatchday}</p>
                        <p>: ${convertDate(new Date(data.competition.lastUpdated))}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById("preloader").innerHTML = "";
    document.getElementById("standings").innerHTML = tableStandingsHtml;
    document.getElementById("seasonInfo").innerHTML = seasonInfoHtml;
}

function getMatchesView(data) {
    var tableDataMatches = "";
    var tableMatchesHtml = "";

    var dataMatch = data.matches;
    var matchDays = [];
    const unique = (value, index, self) => {
        return self.indexOf(value) === index;
    };

    for(let i = 0; i < dataMatch.length; i++) {
        matchDays.push(dataMatch[i].matchday);
    }


    /* Separating matches by date(matchday) */
    let idx = 0;
    for(let i = 0; i < dataMatch.length; i++) {
        if (dataMatch[i].matchday === matchDays.filter(unique)[idx]) {
            // Tambah row
            tableDataMatches += `
                <tr>
                    <td> ${dataMatch[i].homeTeam.name} </td>
                    <td> (${new Date(dataMatch[i].utcDate).toLocaleTimeString()}) </td>
                    <td> ${dataMatch[i].awayTeam.name} </td>
                    <td> <a href="/pages/detail-pages/match.html?id=${dataMatch[i].id}">Detail</a> </td>
                </tr>
            `;
        } else {
            // Tambah tabel
            tableMatchesHtml += `
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">${convertDate(new Date(dataMatch[i-1].utcDate).toLocaleDateString())}</span>
                        <table class="responsive-table striped centered">
                            <thead>
                                <tr>
                                    <th>Home</th>
                                    <th>Kick Off</th>
                                    <th>Away</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                ` + tableDataMatches + `
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

            // Kosongkan row
            tableDataMatches = "";
            
            // Tambah row
            tableDataMatches += `
                <tr>
                    <td> ${dataMatch[i].homeTeam.name} </td>
                    <td> (${new Date(dataMatch[i].utcDate).toLocaleTimeString()}) </td>
                    <td> ${dataMatch[i].awayTeam.name} </td>
                    <td> <a href="/pages/detail-pages/match.html?id=${dataMatch[i].id}">Detail</a> </td>
                </tr>
            `;

            idx++;
        }
    }

    // Tambah tabel
    tableMatchesHtml += `
        <div class="card">
            <div class="card-content">
                <span class="card-title">${convertDate(new Date(dataMatch[dataMatch.length-1].utcDate).toLocaleDateString())}</span>
                <table class="responsive-table striped centered">
                    <thead>
                        <tr>
                            <th>Home</th>
                            <th>Kick Off</th>
                            <th>Away</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ` + tableDataMatches + `
                    </tbody>
                </table>
            </div>
        </div>
    `;

    document.getElementById("matches").innerHTML = tableMatchesHtml;
}

function getDetailTeamView(data) {
    data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));

    var tableOverviewHtml = "";
    var tableSquadHtml = "";

    tableOverviewHtml += `
        <tr>
            <td style="font-weight: bold;">Name</td>
            <td>${data.name}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Short Name</td>
            <td>${data.shortName}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Founded</td>
            <td>${data.founded}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Three Letter Abbreviation</td>
            <td>${data.tla}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Address</td>
            <td>${data.address}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Phone</td>
            <td>${data.phone}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Website</td>
            <td><a href="${data.website}" target="_blank">${data.website}</a></td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Email</td>
            <td><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Club Colors</td>
            <td>${data.clubColors}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Venue</td>
            <td>${data.venue}</td>
        </tr>
    `;

    let number = 1;
    data.squad.forEach(function (squad) {
        tableSquadHtml += `
            <tr>
                <td class="center-align">${number}</td>
                <td>${squad.name}</td>
                <td class="center-align">${squad.position}</td>
                <td class="center-align"><a href="/pages/detail-pages/player.html?id=${squad.id}">Detail</a></td>
            </tr>
        `;
        number++;
    });

    var lastUpdated = `<p class="right-align">Last updated: ${convertDate(new Date(data.lastUpdated))}</p>`;

    document.getElementById("crestUrl").src = data.crestUrl;
    document.getElementById("nameHeader").innerHTML = data.name;
    document.getElementById("preloader").innerHTML = "";
    document.getElementById("tableOverview").innerHTML = tableOverviewHtml;
    document.getElementById("tableSquad").innerHTML = tableSquadHtml;
    document.getElementById("lastUpdated").innerHTML = lastUpdated;
}

function getDetailMatchView(data) {
    var tableMatchDetailHtml = "";

    match = data.match;
    h2h = data.head2head;

    tableMatchDetailHtml += `
        <div class="left-align">Matchday: ${match.matchday}</div>
        <div class="left-align">
            Kick Off: ${convertDate(new Date(match.utcDate).toLocaleDateString())} 
            - 
            ${new Date(match.utcDate).toLocaleTimeString()}
        </div>

        <div class="row">
            <div class="col s5 m5 l5 center-align"> <h5> <a href="/pages/detail-pages/team.html?id=${match.homeTeam.id}">${match.homeTeam.name}</a> </h5> </div>
            <div class="col s2 m2 l2 center-align"> <h5> - </h5> </div>
            <div class="col s5 m5 l5 center-align"> <h5> <a href="/pages/detail-pages/team.html?id=${match.awayTeam.id}">${match.awayTeam.name}</a> </h5> </div>
        </div>

        <h6 class="center-align">${match.venue}</h6>
        <hr>
        <div class="center-align">Number of Matches: ${h2h.numberOfMatches}</div>
        <div class="center-align">Total Goals: ${h2h.totalGoals}</div>

        <table class="striped centered" style="margin-top: 30px; margin-bottom: 30px;">
            <thead></thead>
            <tbody>
                <tr>
                    <td>${h2h.homeTeam.wins}</td>
                    <td style="font-weight: bold;">Wins</td>
                    <td>${h2h.awayTeam.wins}</td>
                </tr>
                <tr>
                    <td>${h2h.homeTeam.draws}</td>
                    <td style="font-weight: bold;">Draws</td>
                    <td>${h2h.awayTeam.draws}</td>
                </tr>
                <tr>
                    <td>${h2h.homeTeam.losses}</td>
                    <td style="font-weight: bold;">Loses</td>
                    <td>${h2h.awayTeam.losses}</td>
                </tr>
            </tbody>
        </table>

        <div class="right-align" style="font-size: 12px;">Last Updated: ${convertDate(new Date(match.lastUpdated).toLocaleDateString())}</div>
    `;

    document.getElementById("preloader").innerHTML = "";
    document.getElementById("tableMatchDetail").innerHTML = tableMatchDetailHtml;
}

function getDetailPlayerView(data) {
    var tablePlayerDetailHtml = "";

    tablePlayerDetailHtml += `
        <table class="striped">
            <thead></thead>
            <tbody>
                <tr>
                    <td style="font-weight: bold;">Name</td>
                    <td>${data.name}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">First Name</td>
                    <td>${data.firstName}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Last Name</td>
                    <td>${data.lastName}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Country of Birth</td>
                    <td>${data.countryOfBirth}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Date of Birth</td>
                    <td>${data.dateOfBirth}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Nationality</td>
                    <td>${data.nationality}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Position</td>
                    <td>${data.position}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Shirt Number</td>
                    <td>${data.shirtNumber}</td>
                </tr>
            </tbody>
        </table>

        <div class="right-align" style="font-size: 12px;">Last Updated: ${convertDate(new Date(data.lastUpdated).toLocaleDateString())}</div>
    `;

    document.getElementById("preloader").innerHTML = "";
    document.getElementById("tablePlayerDetail").innerHTML = tablePlayerDetailHtml;
}

function getTeamFavoriteView(data) {
    data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));

    var tableTeamFavoriteHtml = "";
    let number = 1;

    tableTeamFavoriteHtml += `
        <table class="striped centered">
            <thead>
                <tr>
                    <th>Num</th>
                    <th>Team Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(function(team) {
        tableTeamFavoriteHtml += `
            <tr>
                <td>${number}</td>
                <td><a href="/pages/detail-pages/team.html?id=${team.id}">${team.name}</a></td>
                <td>
                    <a class="waves-effect waves-light btn-small red" onclick="removeFromFavorites(${team.id}, 'favorite_team')">
                        <i class="large material-icons">delete</i>
                    </a>
                </td>
            </tr>
        `;

        number++;
    });

    tableTeamFavoriteHtml += `
            </tbody>
        </table>
    `;

    document.getElementById("favorite-item").innerHTML = tableTeamFavoriteHtml;
}

function getMatchFavoriteView(data) {
    var tableMatchFavoriteHtml = "";
    let number = 1;

    tableMatchFavoriteHtml += `
        <table class="striped centered">
            <thead>
                <tr>
                    <th>Num</th>
                    <th>Match Date</th>
                    <th>Teams</th>
                    <th>Detail</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(function(match) {
        tableMatchFavoriteHtml += `
            <tr>
                <td>${number}</td>
                <td>${convertDate(new Date(match.utcDate).toLocaleDateString())}</td>
                <td>${match.homeTeam.name} - ${match.awayTeam.name}
                </td>
                <td><a href="/pages/detail-pages/match.html?id=${match.id}">Detail</a></td>
                <td>
                    <a class="waves-effect waves-light btn-small red" onclick="removeFromFavorites(${match.id}, 'favorite_match')">
                        <i class="large material-icons">delete</i>
                    </a>
                </td>
            </tr>
        `;

        number++;
    });

    tableMatchFavoriteHtml += `
            </tbody>
        </table>
    `;

    document.getElementById("favorite-item").innerHTML = tableMatchFavoriteHtml;
}

function getPlayerFavoriteView(data) {
    var tablePlayerFavoriteHtml = "";
    let number = 1;

    tablePlayerFavoriteHtml += `
        <table class="striped centered">
            <thead>
                <tr>
                    <th>Num</th>
                    <th>Player Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(function(player) {
        tablePlayerFavoriteHtml += `
            <tr>
                <td>${number}</td>
                <td><a href="/pages/detail-pages/player.html?id=${player.id}">${player.name}</a></td>
                <td>
                    <a class="waves-effect waves-light btn-small red" onclick="removeFromFavorites(${player.id}, 'favorite_player')">
                        <i class="large material-icons">delete</i>
                    </a>
                </td>
            </tr>
        `;

        number++;
    });

    tablePlayerFavoriteHtml += `
            </tbody>
        </table>
    `;

    document.getElementById("favorite-item").innerHTML = tablePlayerFavoriteHtml; 
}

function showEmptyFavoriteView(type) {
    var favoriteMessage = "";

    favoriteMessage += `
        <div class="card-content">
            <div class="center-align">
                <h6>Belum ada data ${type} favorit.</h6>
            </div>
        </div>
    `;

    document.getElementById("favorite-item").innerHTML = favoriteMessage;
}
