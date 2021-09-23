import { useEffect, useState } from "react";
import { Box, VStack, HStack, Heading, Button } from "@chakra-ui/react"
import Image from "../General/Image"
import useStore from "../../services/store";
import "../../css/playlists.css"

const Albums = () => {
  const token = useStore(state => state.token);
  const [albumsList, setAlbumsList] = useState([])

  useEffect(() => {
      getAlbums(token)
  }, [])

  const getAlbums = async (token) => {
      const response = await fetch("https://api.spotify.com/v1/me/albums", {
          method: "GET",
          headers: {
              "Authorization":  "Bearer " + token
          }
      })

      let data = await response.json();
      if (data && data.items) {
          setAlbumsList(data.items)
      }
  }

  const handleShow = () => {
    console.log('clicked')
  }


  return (
    <Box onClick={handleShow}>
      <HStack spacing={"65%"}>
        <Heading my=".5em">Albums</Heading>
        <Button variant="ghost" className="moreBtn">See All</Button>
      </HStack>
      <HStack spacing={3} className="playlist">
        {albumsList.length ?
          albumsList.map(item => <Image key={item.id} src={item.album.images[0].url} name={item.album.name} desc={item.album.artists[0].name}/>)
          : <Image />
        }
      </HStack>
    </Box>
  )
}

export default Albums;
