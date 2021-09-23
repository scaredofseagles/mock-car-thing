import { useEffect, useState } from "react";
import { Box, VStack, HStack, Heading, Button, Image, Text } from "@chakra-ui/react"

const CurrentlyPlaying = (props) => {


  return (
    <Box m="5%">
      <HStack>
        <Image mr="15%"  boxSize="300px" src={""} alt="Playing Image" />
        <VStack>
          <Heading mb="5%">Track Title</Heading>
          <Text>Artist</Text>
          <Text>Album</Text>
        </VStack>
      </HStack>
    </Box>
  )
}

export default CurrentlyPlaying;
