import React from "react";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import Stack from '@mui/material/Stack';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import VideoCard from "./VideoCard";

import { useRelatedVideo } from "../api/youtube"; 


export default function RelatedVideos({ id, name }) {
  const uri = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet&channelId=${id}`;


  const {isLoading, error, videos} = useRelatedVideo(id);


  // 수정 전 버전 - youtube.js 사용 전

  // const { isLoading, error, data: videos } = useQuery({
  //   queryKey: ['relatedVideos', id],
  //   queryFn: async () => {
  //     return axios
  //       .get('/data/searchChannel.json')
  //       // .get(uri)
  //       .then(res => res.data.items);
  //   }, staleTime: 1000 * 60 * 1,
  // })

  return (
    <>
      {isLoading && <p><HourglassTopIcon />Loading</p>}
      {error && <p><WarningAmberIcon />Something is wrong!!!</p>}
      {videos && (
        <Stack direction={'column'} spacing={1} sx={{ textAlign: 'center' }}>
          <h4 style={{ textAlign: "center", fontWeight: "bold" }}>이 채널의 다른 영상들 !!</h4>
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1px', margin: '5px' }}>
            {videos.slice(0, 3).map((video) => (
              <VideoCard video={video} />
            ))}
          </div>
        </Stack>
      )}
    </>
  )
}

