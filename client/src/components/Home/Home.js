import Playlists from "./Playlists"
import Albums from "./Albums"
import Tracks from "./Tracks"
import RecentlyPlayed from "./RecentlyPlayed"
import { Box } from "@chakra-ui/react"

const Home = () => {
  // currently playing

  // playlists

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
