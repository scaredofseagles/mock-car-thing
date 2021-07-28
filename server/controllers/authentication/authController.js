const querystring = require("query-string");
const { v4: uuid }  = require("uuid")
require("dotenv").config();

exports.authorize = (req, res) => {
    const scope = 'user-read-private user-read-email';

    const uuid = uuidv4()

    res.cookie('spotify_auth_state', uuid)

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
        response_type: 'code',
        client_id: process.env.clientID,
        scope: scope,
        redirect_uri: "http://localhost:8080",
        state: uuid,
        })
    );
}

exports.callback = async (req, res) => {
    
}