import { useEffect } from "react";
import { Box, HStack, Button, Center, Image } from "@chakra-ui/react";
import { authEndpoint, clientId, redirectUri, scopes } from "../../config";
import logo from "./Spotify_Logo_CMYK_Green.png";
import auth from "../../services/auth";
import hash from "../../hash";
import { useHistory } from "react-router-dom";
import useStore from "../../services/store";
import querystring from "query-string";
import { getUserInfo } from "../../services/users";
import useConnectPlayer from "../../Hooks/useConnectPlayer";
import { hashCode, generateString, encodeURL } from "../../services/crypt";
import { v4 as uuidv4 } from "uuid";

const Login = () => {
  const history = useHistory();
  const { setCurrentUser, setToken } = useStore();

  const uuid = uuidv4();
  const codeVerifier = generateString();

  useEffect(() => {
    // console.log(window.location);
    if (window.location.pathname === "/callback") {
      let state = localStorage.getItem("spotify_auth_state");
      let verifier = localStorage.getItem("spotify_code_verifier");
      const parsed = querystring.parse(window.location.search);
      // TODO: do something if error property
      // console.log(parsed, state);

      if (parsed.error) console.error(parsed);
      else if (parsed.state === state) getToken(parsed.code, verifier);
    }

    // if (hash.access_token) {
    //   setToken(hash.access_token);
    //   getUser(hash.access_token)
    // }
  }, []);

  const handleLogin = async () => {
    // window.location.replace(
    //     `https://accounts.spotify.com/authorize?${querystring.stringify({
    //       response_type: "token",
    //       client_id: clientId,
    //       scopes: scopes.join("%20"),
    //       redirect_uri: "http://localhost:3000/",
    //       show_dialog: true
    //   })}`
    // )
    const code = await hashCode(codeVerifier);

    localStorage.setItem("spotify_auth_state", uuid);
    localStorage.setItem("spotify_code_verifier", codeVerifier);

    window.location.replace(
      `https://accounts.spotify.com/authorize?${querystring.stringify({
        client_id: clientId,
        response_type: "code",
        redirect_uri: "http://localhost:3000/callback",
        code_challenge_method: "S256",
        code_challenge: encodeURL(code),
        state: uuid,
        scopes: scopes.join("%20"),
      })}`
    );
  };

  const getToken = async (code, verifier) => {
    let encodedVerifier = encodeURL(codeVerifier);
    console.log({ codeVerifier, encodedVerifier });

    let response = await auth.login(clientId, code, encodedVerifier);

    console.log({ response });
  };
  //   const connected = useConnectPlayer(hash.access_token)
  //
  // // TODO: dont allow anything until connected
  //   console.log(connected)
  //
  //   const getUser = async (token) => {
  //     const result = await getUserInfo(token)
  //     if (result.success) {
  //       setCurrentUser(result.data);
  //       history.push("/home")
  //     }
  //   }

  return (
    <Box p="10%" bg="black" height="100vh">
      <Center>
        <Box mt="10vh">
          <Image width="80vw" maxWidth="600px" src={logo} />
        </Box>
      </Center>
      <Center>
        <HStack mt="10%">
          <Button onClick={handleLogin} backgroundColor="#1db954" color="white" _hover={{ backgroundColor: "green.500" }}>
            Login
          </Button>
          <Button>New User</Button>
        </HStack>
      </Center>

      <a href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=false`}>Login</a>
    </Box>
  );
};

export default Login;
