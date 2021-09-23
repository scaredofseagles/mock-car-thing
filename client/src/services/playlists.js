import axios from "axios";

export const getPlaylistsTracks = async (id, token) => {

  const response = await axios({
      url: `https://api.spotify.com/v1/playlists/${id}/tracks`,
      method: "GET",
      headers: {
          "Authorization":  "Bearer " + token
      }
  })

  let { data } = response;
  if (data && data.items) return data.items;
}

export const getPlaylistMeta = async (id, token) => {
  const response = await axios({
      url: "https://api.spotify.com/v1/me/playlists",
      method: "GET",
      headers: {
          "Authorization":  "Bearer " + token
      }
  })

  let { data } = response;
  if (data && data.items) {
      let correctData = data.items.filter(playlist => playlist.id === id)
      if (correctData.length) return correctData[0]
  }
}
