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
    console.log("server " + code);
    const client_id = "f7e20170b64b41a39cd2700b998b636f";
    const client_secret = "2b2ae5c1af5f41c598cfb2bb15eb91cb";
    const redirect_uri = "http://localhost:3000";

    const spotifyAPI = new SpotifyWebApi({
        redirectUri: redirect_uri,
        clientId: client_id,
        clientSecret: client_secret
    })

    spotifyAPI.authorizationCodeGrant(req.body.code).then(data => { // could use any var here for promise result
        res.json({
            access_token: data.body.access_token,
            refresh_token: data.body.refresh_token,
            expires_in: data.body.expires_in
        })
    }).catch(err => {
        console.log(err);
        res.sendStatus(400);
    })
});

app.listen(3001); // port we listen on
