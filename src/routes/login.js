import querystring from 'querystring';
import { client_id, redirect_url } from '../server.js';

import { generateRandomString } from '../utils.js';

import express from 'express';

const router = express.Router();

router.get('/login', function (req, res, next) {

    var state = generateRandomString(16);

    var scope = 'user-read-private user-read-email user-top-read';

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_url,
            state: state
        }));
});

export default router;
