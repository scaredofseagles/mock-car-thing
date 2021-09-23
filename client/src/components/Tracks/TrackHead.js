import { useEffect, useState } from "react";
import { Box, VStack, HStack, Heading, Button, Image as Img, Text } from "@chakra-ui/react"
import Image from "../General/Image"

const TrackHead = ({meta}) => {

  return (
    <Box m="5%">
      <HStack>
        <Img mr="15%"  boxSize="300px" src={meta.images && meta.images.length ? meta.images[0].url : ""} alt="Playlist Image" />
        <VStack>
          <Heading mb="5%">{meta.name}</Heading>
          <Text>Made by: {meta.owner?.display_name}</Text>
          <Text>Total Tracks: {meta.tracks?.total}</Text>
        </VStack>
      </HStack>
    </Box>
  )
}

export default TrackHead;
