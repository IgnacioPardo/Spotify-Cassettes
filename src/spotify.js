// Import node-fetch and dotenv
//import fetch from 'node-fetch';

var client_secret = "436c20a76abf4940bad0fc062ad869c6";//process.env.CLIENT_SECRET;
var client_id = "a20a76c3e8bc4d95b349805b8894fe0a";//process.env.CLIENT_ID;


const getAccessToken = async () => {
    var url = "https://accounts.spotify.com/api/token";

    var base64Credentials = btoa(client_id + ':' + client_secret);
    var headers = {
        'Authorization': 'Basic ' + base64Credentials,
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    var body = 'grant_type=client_credentials';

    // Make a POST request to Spotify's /api/token endpoint

    
    const response = await fetch(url, {
                                method: 'POST',
                                headers: headers,
                                body: body
                            })
                            .then(response => response.json())
                            .then(data => {
                                return data;
                            });

    return response;
}

const getAuthorizationHeader = async () => {
    var headers = {
        'Authorization': 'Bearer ' + (await getAccessToken()).access_token
    };
    return headers;
}


const getTopArtists = async () => {
    var url = 'https://api.spotify.com/v1/me/top/'

    var headers = await getAuthorizationHeader();

    // Make a GET request to Spotify's /v1/me/top/artists endpoint

    var params = {
        limit: 10,
        time_range: 'short_term'
    };

    var url = new URL(url + 'artists');
    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url, {
        method: 'GET',
        headers: headers
    })
        .then(response => response.text())
        .then(data => {
            return data;
        });

    return response;
}

export default getTopArtists;
