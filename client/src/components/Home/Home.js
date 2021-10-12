import { useEffect } from "react";
import Playlists from "./Playlists"
import Albums from "./Albums"
import Tracks from "./Tracks"
import RecentlyPlayed from "./RecentlyPlayed"
import { Box } from "@chakra-ui/react"
import useConnectPlayer from "../../Hooks/useConnectPlayer";

const Home = () => {



  return (
    <Box p="10%" >
      <RecentlyPlayed />
      <Playlists />
      <Tracks />
      <Albums />
    </Box>
  )
}

export default Home;
