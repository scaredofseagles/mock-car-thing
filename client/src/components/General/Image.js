import { Box, Image as Img, VStack, Heading, Text } from "@chakra-ui/react"
import { useHistory } from "react-router-dom";
import useStore from "../../services/store";

const Image = (props) => {
  const { setCurrentlyPlaying } = useStore();
  const history = useHistory();

  const handleShow = () => {
    if (props.type === "track") setCurrentlyPlaying(props.data);
    else history.push(`/tracks?${props.type}=${props.id}`);
  }

  return (
    <Box onClick={handleShow} borderWidth="3px" borderRadius="lg" p="2%" minWidth="230px" minHeight="330px" overflow="hidden" _hover={{ borderColor: "green.200"}} style={{ cursor: "pointer"}}>
      <VStack>
        <Img boxSize="200px" src={props.src} alt="Dan Abramov" />

      <Heading size="md">{props.name}</Heading>
      <Text>{props.desc ? props.desc : ""}</Text>
      </VStack>

    </Box>
  )
}

export default Image;
