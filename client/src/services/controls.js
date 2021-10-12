import axios from "axios";
import { scopes } from "../config"

// const play = ({
//   spotify_uri,
//   playerInstance: {
//     _options: {
//       getOAuthToken,
//     }
//   },
//   id
// }) => {
//   getOAuthToken(access_token => {
//     fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
//       method: 'PUT',
//       body: JSON.stringify({ uris: [spotify_uri], scopes: ["streaming", "user-read-birthdate", "user-read-email", "user-read-private"] }),
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${access_token}`
//       },
//     });
//   });
// };

export const handlePlayback = async (contextUri, deviceId, token) => {
  const response = await axios({
    url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      "Authorization":  "Bearer " + token
    },
    data: JSON.stringify({ uris: [contextUri], scopes})
  })

  console.log({response})
}
