import {useEffect} from "react";
import { Box, HStack, Button, Center, Image } from "@chakra-ui/react";
import { authEndpoint, clientId, redirectUri, scopes } from "../../config";
import logo from "./Spotify_Logo_CMYK_Green.png";
import auth from "../../services/auth";
import hash from "../../hash";
import { useHistory } from "react-router-dom";
import useStore from "../../services/store";
import querystring from "query-string";
import { getUserInfo } from "../../services/users";

const Login = () => {
  const history = useHistory();
  const { setCurrentUser, setToken } = useStore();

  useEffect(() => {
    if (hash.access_token) {
      setToken(hash.access_token);
      getUser(hash.access_token)
    }
  }, [])

  const handleLogin = () => {
    window.location.replace(
        `https://accounts.spotify.com/authorize?${querystring.stringify({
          response_type: "token",
          client_id: clientId,
          scopes: scopes.join("%20"),
          redirect_uri: "http://localhost:3000/",
          show_dialog: true
      })}`
      )
  }

  const getUser = async (token) => {
    const result = await getUserInfo(token)
    if (result.success) {
      setCurrentUser(result.data);
      history.push("/home")
    }
  }

  return(
    <Box p="10%" bg="black" height="100vh">
      <Center><Box mt="10vh"><Image width="80vw" maxWidth="600px" src={logo}/></Box></Center>
      <Center>
        <HStack mt="10%">
          <Button onClick={handleLogin} backgroundColor="#1db954" color="white" _hover={{backgroundColor:"green.500"}}>Login</Button>
        <Button>New User</Button>
      </HStack>
      </Center>

    <a href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      "%20"
    )}&response_type=token&show_dialog=false`}>Login</a>
  </Box>
  )
}

export default Login;
