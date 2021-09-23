import {useEffect, useState} from "react"
import { Box } from "@chakra-ui/react"
import { getPlaylistsTracks, getPlaylistMeta } from "../../services/playlists"
import TrackHead from "./TrackHead"
import TrackList from "./TrackList"
import queryString from 'query-string';
import useStore from "../../services/store";

const TrackView = () => {
  // tracks?playlist=1

  const token = useStore(state => state.token);
  const [trackList, setTrackList] = useState([])
  const [meta, setMeta] = useState({})

  useEffect(() => {
    const parsed = queryString.parse(window.location.search)
    getTracks(parsed)
  }, [])

  const getTracks = async (parsed) => {
    if (Object.keys(parsed)[0] === "playlist") {
      let result = await getPlaylistsTracks(parsed.playlist, token);
      let data = await getPlaylistMeta(parsed.playlist, token);
      setTrackList(result)
      setMeta(data)
    }
  }

  return (
    <Box padding="10%">
      <TrackHead meta={meta}/>
      <TrackList trackList={trackList}/>
    </Box>
  )
}

export default TrackView;
