// Express server
import express from 'express';
import dotenv from 'dotenv';
import querystring from 'querystring';
import fetch from 'node-fetch';
import request from 'request';
import path from 'path';
import { fileURLToPath } from 'url';

// args for express server for debugging

var args = process.argv.slice(2);

var debug = args[0] === '-d' || args[0] === '--debug';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var app = express();

//app.use(express.static('public'));
app.listen(8888, () => console.log('Server started on port 8888'));

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../build')));

dotenv.config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const redirect_uri = 'https://13f5-181-167-121-18.ngrok-free.app/callback';

function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

app.get('/app', function (req, res) {
    var access_token = req.query.access_token;
    if (debug){
        console.log(access_token);
    }
    //if (access_token) {
        // React app opens up with access token
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
    //}
});

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
// });

app.get('/src/spotify.js', function (req, res) {
    // With MIME type application/javascript

    res.sendFile(path.resolve(__dirname, '../src', 'spotify.js'), { type: 'application/javascript' });
});

app.get('/login', function (req, res) {

    var state = generateRandomString(16);

    var scope = 'user-read-private user-read-email user-top-read';

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});


app.get('/callback', async function (req, res) {

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
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                var access_token = body.access_token,
                    refresh_token = body.refresh_token;
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

app.get('/refresh_token', function (req, res) {

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
        redirect_uri: "https://13f5-181-167-121-18.ngrok-free.app/callback"
    });

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
    }).then(response => {
        console.log(response);
        return response.json();
    })
        .then(data => {
            var access_token = data.access_token;
            res.redirect('/app?' +
                querystring.stringify({
                    access_token: access_token,
                    refresh_token: refresh_token
                }));
        })

});
