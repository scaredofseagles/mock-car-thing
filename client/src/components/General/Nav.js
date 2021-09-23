import { useState } from "react";
import { Box, Link as ReachLink, Image, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useStore from "../../services/store";
import logo from "../Login/Spotify_Logo_CMYK_Green.png";

const Nav = () => {
  const currentUser = useStore(state => state.currentUser);

  if (currentUser){
  return (
    <Box pt={5} pb={0} borderWidth="1px" position="sticky" top="0" bg="white">
          <ul style={{ display: "flex", listStyleType: "none" }}>
              <Link as={ReachLink} to="/home"><Image ml=".5em" src={logo} width="150px" /></Link>
              <Menu>
                <MenuButton style={{ marginLeft: "auto", marginRight: "1em"}}>
                  <Image  borderRadius="full" boxSize="40px" src={currentUser.images[0].url} alt={currentUser.display_name} />
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Log Out</MenuItem>
                </MenuList>
              </Menu>
          </ul>
          <Box mt={5} w="100%" h="6px" bg="green.300" ></Box>
    </Box>
  )}

  return null;
}

export default Nav;
