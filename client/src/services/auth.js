// add api response to cookies
// check if expired, if so request refresh access_token
// if error, show message (might need an /error)

import axios from "axios"

const auth = {
  login: async () => {
    const result = await axios.get("/api/authorize");
    // if success, save state as logged in
    if (result.status === 200){
      return result.data
    }

  },
  refresh: async () => {}
}

export default auth;
