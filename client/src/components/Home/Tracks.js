import { useEffect, useState } from "react";
import { Box, VStack, HStack, Heading, Button } from "@chakra-ui/react"
import Image from "../General/Image"
import useStore from "../../services/store";
import "../../css/playlists.css"

const Tracks = () => {
  const token = useStore(state => state.token);
  const [tracksList, setTracksList] = useState([])

  useEffect(() => {
    getTracks(token)
  }, [])

  const getTracks = async (token) => {
      const response = await fetch("https://api.spotify.com/v1/me/tracks", {
          method: "GET",
          headers: {
              "Authorization":  "Bearer " + token
          }
      })

      let data = await response.json();
      if (data && data.items) {
          setTracksList(data.items)
      }
  }


  return (
    <Box>
      <HStack spacing={"65%"}>
        <Heading my=".5em">Tracks</Heading>
        <Button variant="ghost" className="moreBtn">See All</Button>
      </HStack>
      <HStack spacing={3} className="playlist">
        {tracksList.length ?
          tracksList.map(item => <Image key={item.id} id={item.id} type="track" src={item.track.album.images[0].url} name={item.track.name} desc={item.track.album.artists[0].name}/>)
          : <Image />
        }
      </HStack>
    </Box>
  )
}

export default Tracks;
