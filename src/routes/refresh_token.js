import querystring from 'querystring';
import fetch from 'node-fetch';
import { redirect_url, client_id, client_secret } from '../server.js';
import express from 'express';

const router = express.Router();
router.get('/refresh_token', function (req, res, next) {

    var refresh_token = req.query.refresh_token;
    console.log("/refresh_token");
    console.log({ refresh_token });

    var url = "https://accounts.spotify.com/api/token";

    var base64Credentials = btoa(client_id + ':' + client_secret);
    var headers = {
        'Authorization': 'Basic ' + base64Credentials,
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    var body = querystring.stringify({
        grant_type: 'client_credentials',
        refresh_token: refresh_token,
        redirect_uri: redirect_url
    });

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
    }).then(response => {
        return response.json();
    })
        .then(data => {
            console.log(data);
            var access_token = data.access_token;
            res.redirect('/app?' +
                querystring.stringify({
                    access_token: access_token,
                    refresh_token: refresh_token
                }));
        });

});

export default router;
