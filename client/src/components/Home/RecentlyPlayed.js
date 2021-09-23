import { useEffect, useState } from "react";
import { Box, VStack, HStack, Heading, Button } from "@chakra-ui/react"
import Image from "../General/Image";
import useStore from "../../services/store";
import "../../css/playlists.css";

const RecentlyPlayed = () => {
  const token = useStore(state => state.token);
  const [recentList, setRecentList] = useState([])

  useEffect(() => {
      getRecent(token)
  }, [])

  const getRecent = async (token) => {
      const response = await fetch("https://api.spotify.com/v1/me/player/recently-played", {
          method: "GET",
          headers: {
              "Authorization":  "Bearer " + token
          }
      })

      let data = await response.json();
      if (data && data.items) {
          setRecentList(data.items)
      }
  }


  return (
    <Box>
      <HStack spacing={"47%"}>
        <Heading my=".5em">Recently Played</Heading>
        <Button variant="ghost" className="moreBtn">See All</Button>
      </HStack>
      <HStack spacing={3} className="playlist">
        {recentList.length ?
          recentList.map(item => <Image key={item.id} id={item.id} type="track" src={item.track.album.images[0].url} name={item.track.name} desc={item.track.album.artists[0].name} data={item} />)
          : <Image />
        }
      </HStack>
    </Box>
  )
}

export default RecentlyPlayed;
