import { useState, useEffect } from "react";
import { Box, VStack, HStack, IconButton, Image, Text, Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb, } from "@chakra-ui/react";
import { BsShuffle, BsSkipStartFill, BsPlayFill, BsPauseFill, BsSkipEndFill, BsArrowRepeat, BsFillVolumeUpFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import useStore from "../../services/store";
import {handlePlayback} from "../../services/controls"
import "../../css/controls.css";

const ControlsBar = (props) => {
  const currentlyPlaying = useStore(state => state.currentlyPlaying);
  const deviceId = useStore(state => state.deviceId);
  const token = useStore(state => state.token);

  const [isPlaying, setIsPlaying] = useState()
  const [volume, setVolume] = useState()

  useEffect(() => {
    console.log({currentlyPlaying})
    // TODO: will have to handle if pause or play btn && same for  volume
  }, [currentlyPlaying])

  const playback = async () => {
    let result = await handlePlayback(currentlyPlaying.track.uri, deviceId, token);

    console.log({result})
  }

  const getArtistNames = () => {
    let array = [];

    currentlyPlaying.track.artists.forEach((item) => {
      array.push(item.name)
    });

    return array
  }

  if (currentlyPlaying){
    return (
    <Box id="controlBar" bg="gray.900"  py="2em" w="100%" color="white">

        <HStack className="playingInfo" color="white">
          <Image boxSize="60px" src={currentlyPlaying.track.album.images[0].url} alt="playing image" mr="1em"/>
          <VStack>
            <Text maxWidth="20vw" isTruncated>{currentlyPlaying.track.name}</Text>
            <Text maxWidth="20vw" isTruncated>{getArtistNames().join(", ")}</Text>
          </VStack>
          <span style={{marginLeft:"1.5em"}}><AiOutlineHeart /></span>
        </HStack>

        <div className="controls">
          <IconButton aria-label="Shuffle Track" variant="ghost" _hover={{bg: "gray.700"}} icon={<BsShuffle />} />
          <IconButton aria-label="Previous Track" variant="ghost" _hover={{bg: "gray.700"}} icon={<BsSkipStartFill />} />
          <IconButton onClick={playback} aria-label="Play Track" variant="ghost" bg="green.400" _hover={{bg: "green.200"}} isRound icon={<BsPlayFill />} />
          <IconButton aria-label="Next Track" variant="ghost" _hover={{bg: "gray.700"}} icon={<BsSkipEndFill />} />
          <IconButton aria-label="Repeat Track" variant="ghost" _hover={{bg: "gray.700"}} icon={<BsArrowRepeat />} />
        </div>

        <div className="volume" >
          <HStack>
            <IconButton aria-label="Adjust Volume" variant="ghost" _hover={{bg: "gray.700"}} icon={<BsFillVolumeUpFill />} />
              <Slider aria-label="Volume Slider" defaultValue={30} w="120px" colorScheme="green">
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
          </HStack>

        </div>


    </Box>
  )}

  return null
}

export default ControlsBar;
