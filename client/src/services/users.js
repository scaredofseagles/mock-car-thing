import axios from "axios";

export const getUserInfo = async (token) => {
  try {
    const response = await axios({
      url: "https://api.spotify.com/v1/me",
      method: "GET",
      headers: {
        "Authorization":  "Bearer " + token
      }
    })

    return {success: true, data: response.data}
  } catch (e) {
    console.error(e)
    return { success: false, message: e.message}
  }
}
