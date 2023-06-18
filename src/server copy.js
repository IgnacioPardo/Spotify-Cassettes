// Express server
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const app_route = await import('./routes/app.js');
const callback = await import('./routes/callback.js');
const login = await import('./routes/login.js');
const refresh_token = await import('./routes/refresh_token.js');

console.log({ app_route, callback, login, refresh_token });

// args for express server for debugging

var args = process.argv.slice(2);

export var debug = args[0] === '-d' || args[0] === '--debug';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export var app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../build')));

dotenv.config();

export const client_id = process.env.CLIENT_ID;
export const client_secret = process.env.CLIENT_SECRET;

console.log({client_id});
console.log({client_secret});

export const redirect_url = process.env.DOMAIN + "/callback";

app.get('/src/spotify.js', function (req, res) {
    // With MIME type application/javascript

    res.sendFile(path.resolve(__dirname, '../src', 'spotify.js'), { type: 'application/javascript' });
});

app.use('/app', app_route);
app.use('/callback', callback);
app.use('/login', login);
app.use('/refresh_token', refresh_token);

//app.use(express.static('public'));
const port = process.env.PORT || 9001;
app.listen(8888, () => console.log(`Listening on port ${port}`));

console.log("Server started");
