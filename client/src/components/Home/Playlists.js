import { useEffect, useState } from "react";
import { Box, VStack, HStack, Heading, Button } from "@chakra-ui/react"
import Image from "../General/Image"
import useStore from "../../services/store";
import "../../css/playlists.css"

const Playlists = () => {
  const token = useStore(state => state.token);
  const [playlistList, setPlaylistList] = useState([])

  useEffect(() => {
      getPlaylists(token)
  }, [])

  const getPlaylists = async (token) => {
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
          method: "GET",
          headers: {
              "Authorization":  "Bearer " + token
          }
      })

      let data = await response.json();
      if (data && data.items) {
          setPlaylistList(data.items)
      }
  }

  return (
    <Box>
      <HStack spacing={"65%"}>
        <Heading my=".5em">Playlists</Heading>
        <Button variant="ghost" className="moreBtn">See All</Button>
      </HStack>
      <HStack spacing={3} className="playlist">
        {playlistList.length ?
          playlistList.map(item => <Image key={item.id} id={item.id} type="playlist" src={item.images[0].url} name={item.name} desc={item.description} />)
          : <Image />
        }
      </HStack>
    </Box>
  )
}

export default Playlists;
