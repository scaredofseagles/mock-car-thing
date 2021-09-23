import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box
} from "@chakra-ui/react";
import moment from 'moment';
import { AiOutlineHeart } from "react-icons/ai";
import { BsPlayFill, BsPauseFill } from "react-icons/bs"
import useStore from "../../services/store";


const TrackList = ({trackList}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setCurrentlyPlaying } = useStore()

  const handleOnHover = (e) => {
    if (e.type === "mouseenter") setIsHovered(true);
    else if (e.type === "mouseenter") setIsHovered(false);
  }

  return (
    <Box>
      <Table variant="simple" >
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Title</Th>
            <Th>Artist</Th>
            <Th>Album</Th>
            <Th></Th>
            <Th>Duration</Th>
          </Tr>
        </Thead>
        <Tbody>
          {trackList.length ? trackList.map((track, index) => {
            return (
              <Tr key={index+1} _hover={{backgroundColor: "gray.100", cursor: "pointer"}} onClick={() => setCurrentlyPlaying(track)}>
                <Td>{ index+1 }</Td>
                <Td>{track.track.name}</Td>
                <Td>{track.track.artists[0].name}</Td>
                <Td>{track.track.album.name}</Td>
                <Td><AiOutlineHeart /></Td>
                <Td>{moment(track.track.duration_ms).format("m:ss")}</Td>
              </Tr>
            )
          }): <Tr>
            <Td>1</Td>
            <Td>Song</Td>
            <Td>Artist</Td>
            <Td>Album</Td>
            <Td><AiOutlineHeart /></Td>
            <Td>3:14</Td>
          </Tr>}
        </Tbody>
      </Table>
    </Box>
  )
}

export default TrackList;
