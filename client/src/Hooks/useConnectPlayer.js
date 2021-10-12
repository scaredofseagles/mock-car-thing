import { useState, useEffect } from "react";
import useStore from "../services/store";

const useConnectPlayer = (token) => {

  const { setDeviceId } = useStore()

  const [state, setState] = useState({
    loadingState: "Loading",
    spotifyAccessToken: token,
    spotifyDeviceId: "",
    spotifyPlayerConnected: false,
    spotifyPlayerReady: false,
    spotifyPlayer: undefined
  })

  useEffect(() => {
    loadScript()
  }, [])

  // adds sdk script to document
  const loadScript = () => {
    const existingScript = document.getElementById('spotify');
    if (!existingScript){
      const script = document.createElement('script');
      script.src="https://sdk.scdn.co/spotify-player.js";
      script.id="spotify";
      document.body.appendChild(script);
      script.onload = () => spotifySDKCallback();
    }
      if (existingScript) spotifySDKCallback();
    };

  const spotifySDKCallback = () => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      let { Player } = window.Spotify;
      const spotifyPlayer = new Player({
        name: "mock-car-thing",
        getOAuthToken: cb => {
          cb(token)
        },
        volume: 0.3
      });

      spotifyPlayer.addListener('player_state_changed', ({
        position,
        duration,
        track_window: { currentTrack }
      }) => {
        console.log('Currently Playing', currentTrack);
        console.log('Position in Song', position);
        console.log('Duration of Song', duration);
      });

      setState({
        ...state,
        loadingState: "Loaded",
        spotifyPlayer
      })

      connectToPlayer(spotifyPlayer)

    }
  }

  const play = ({
    spotify_uri,
    playerInstance: {
      _options: {
        getOAuthToken,
      }
    },
    id
  }) => {
    getOAuthToken(access_token => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [spotify_uri], scopes: ["streaming", "user-read-birthdate", "user-read-email", "user-read-private"] }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      });
    });
  };

  const connectToPlayer = (spotifyPlayer) => {
    // console.log({state})
    if (spotifyPlayer){
      spotifyPlayer.addListener("ready", ({device_id}) => {
        console.log('Ready with Device ID', device_id);
        setDeviceId(device_id)
        setState({
          ...state,
          loadingState: "Player Ready",
          spotifyDeviceId: device_id,
          spotifyPlayerReady: true
        })

        play({
          playerInstance: spotifyPlayer,
          spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
          id: device_id
        });

      })

      spotifyPlayer.connect().then(success => {
        if (success) {
          console.log('The Web Playback SDK successfully connected to Spotify!');
        }})


    }


  }


  return state.spotifyDeviceId;

}

export default useConnectPlayer;
