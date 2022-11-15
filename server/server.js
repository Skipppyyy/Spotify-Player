const express = require('express');
const axios = require('axios')
const cors = require('cors');
const request = require('request')
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors()); // just to relax middleware security
app.use(bodyParser.json()); // to parse json body (which is what code is)

app.post('/login', (req, res) => { // post method, req/res are params 
    const code = req.body.code; // must be posted to 3001

    const client_id = "f7e20170b64b41a39cd2700b998b636f";
    const client_secret = "2b2ae5c1af5f41c598cfb2bb15eb91cb";
    const redirect_uri = "http://localhost:3000";

    const spotifyAPI = new SpotifyWebApi({
        redirectURI: redirect_uri,
        clientId: client_id,
        clientSecret: client_secret
    })
});

app.get('/', (req, res) => {
    const code = req.query.code || null;    
    const client_id = "f7e20170b64b41a39cd2700b998b636f";
    const client_secret = "2b2ae5c1af5f41c598cfb2bb15eb91cb";

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) { // dont work
        if (!error && response.statusCode === 200) {
            res.json({
                access_token: body.access_token,
                refresh_token: body.refresh_token,
                expires_in: body.expires_in
            })
        } else {
            console.log(error);
        }
    }) // calling post inside of post, 
})

app.listen(3001); // port we listen on
