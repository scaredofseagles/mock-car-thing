import logo from './logo.svg';
import './App.css';
import hash from "./hash";
import { useEffect, useState } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import Player from "./Player";

function App2() {

  const [state, setState] = useState({
    token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0
      },
      is_playing: "Paused",
      progress_ms: 0,
      no_data: false,
  });

  useEffect(() => {
    let token = hash.access_token;
    if (token) {
      setState({ token: token});
      getCurrentlyPlaying(token);
    }

    localStorage.setItem("token", JSON.stringify({token}));

    let interval = setInterval(() => tick(), 5000);

    return () => clearInterval(interval);

  }, [])

  const tick = () => {
    if (state.token){
      getCurrentlyPlaying(state.token);
    }
  }

  const getCurrentlyPlaying =  (token) => {
    // use fetch
    fetch("https://api.spotify.com/v1/me/player", {
      method: "GET",
      headers: {
        "Authorization":  "Bearer " + token
      }
    })
    .then(response => response.json())
    .then(data => {
      if (!data) {
        setState({
          no_data: true
        });
        return
      }

      console.log(data)

      setState({
        item: data.item,
        is_playing: data.is_playing,
        progress_ms: data.progress_ms,
        no_data: false
      })
    })

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=false`}
            >
              Login to Spotify
            </a>
          )}
          {state.token && !state.no_data && (
            <Player
              item={state.item}
              is_playing={state.is_playing}
              progress_ms={state.progress_ms}
            />
          )}
          {state.no_data && (
            <p>
              You need to be playing a song on Spotify, for something to appear here.
            </p>
          )}
      </header>
    </div>
  );
}

export default App2;
