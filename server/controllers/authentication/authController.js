const querystring = require("query-string");
const request = require("request");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const scopes = require("./scopes");
require("dotenv").config();

exports.authorize = (req, res) => {
  const uuid = uuidv4();
  res.cookie("spotify_auth_state", uuid);
  res.header("Access-Control-Allow-Origin", "*");

  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: "code",
      client_id: process.env.clientID,
      scopes: scopes.join("%20"),
      redirect_uri: "http://localhost:8080/api/callback",
      state: uuid,
    })}`
  );

};

exports.callback = async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies.spotify_auth_state : null;


  if (state === null || state !== storedState) {
    res.redirect(
      `/#${querystring.stringify({
        error: "state_mismatch",
      })}`
    );
  } else {
    res.clearCookie("spotify_auth_state");

    try {
      const result = await axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        data:`code=${code}&redirect_uri=http://localhost:8080/api/callback&grant_type=authorization_code`,
        auth: {
          username: process.env.clientID,
          password: process.env.clientSecret
        },

        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })

      if (result.status === 200) {
        const { refresh_token } = result.data;
        const { access_token } = result.data;
        res.cookie("spotify_access_token", access_token);
        res.cookie("spotify_refresh_token", refresh_token, { httpOnly: true });
        res.cookie("spotify_token_obj", result.data, { httpOnly: true })

        const userData = await axios.get("https://api.spotify.com/v1/me", {headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (userData.status === 200) res.json({ success: true, auth: result.data, user: userData.data});
        else console.log(userData);
      }
    } catch (e) {
      console.log("error in callback", e)
      res.redirect(
        `/#${querystring.stringify({
          error: "invalid_token",
        })}`
      );
    }
  }
};

exports.refreshToken = (req, res) => {
  // requesting access token from refresh token
  const { refresh_token } = req.query;
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: { Authorization: `Basic ${Buffer.from(`${process.env.clientID}:${process.env.clientSecret}`, "base64")}` },
    form: {
      grant_type: "refresh_token",
      refresh_token,
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const { access_token } = body;
      res.send({
        access_token,
      });
    }
  });


};
