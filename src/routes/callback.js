import querystring from 'querystring';
import request from 'request';

import { redirect_url, client_id, client_secret } from '../server.js';

import express from 'express';

const router = express.Router();

router.get('/callback', async function (req, res, next) {
    // console.log(redirect_uri);

    var code = req.query.code || null;
    var state = req.query.state || null;

    if (state === null) {
        res.redirect('/app?' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_url,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                var access_token = body.access_token, refresh_token = body.refresh_token;
                //we can also pass the token to the browser to make requests from there
                res.redirect('/app?' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
            } else {
                res.redirect('/app?' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
});

export default router;
