import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Box, HStack, Button, Center, Image } from "@chakra-ui/react";
import logo from "./Spotify_Logo_CMYK_Green.png";
import querystring from "query-string";

const Callback = () => {

useEffect(() => {
  console.log(window.location.search);
}, [])

  return(
    <Box p="10%" bg="black" height="100vh">
      <Center><Box mt="10vh"><Image width="80vw" maxWidth="600px" src={logo}/></Box></Center>
      {/* TODO: add progress bar OR flicker loading */}
  </Box>
  )
}

export default Callback;
