// add api response to cookies
// check if expired, if so request refresh access_token
// if error, show message (might need an /error)

import axios from "axios";
import querystring from "query-string";

const auth = {
  login: async (clientId, code, codeVerifier) => {
    const result = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",

      data: `${querystring.stringify({
        client_id: clientId,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "http://localhost:3000/callback",
        code_verifier: new Buffer(codeVerifier).toString("base64"),
      })}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    // if success, save state as logged in
    console.log(result);
  },
  refresh: async () => {},
};

export default auth;
