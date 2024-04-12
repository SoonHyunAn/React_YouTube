import React from "react";
import { useParams } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
import Grid from "@mui/material/Grid";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import VideoCard from '../components/VideoCard';

import { useVideo } from '../api/youtube';

// const keywordUri = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet&q=`;
// const popularUri = `https://youtube.googleapis.com/youtube/v3/videos?chart=mostPopular&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet`;

export default function Videos() {
  const { keyword } = useParams();

  const { isLoading, error, videos } = useVideo(keyword);

  // 수정 전 버전 - youtube.js 사용 전

  // const { isLoading, error, data: videos } = useQuery({
  //   queryKey: ['videos', keyword],
  //   queryFn: async () => {
  //     const uri = keyword ? keywordUri + keyword : popularUri;
  //     return axios
  //       .get(`/data/${keyword ? 'search' : 'popular'}.json`)
  //       // .get(uri)
  //       .then(res => res.data.items);
  //   }, staleTime: 1000 * 60 * 1,
  // });

  return (
    <>
      <div style={{ marginBottom: '10px', color: "lightcoral", padding: '0px 0px 15px 25px' }}>Videos {keyword ? `${keyword} 검색` : 'Hot Trend'}</div>
      {isLoading && <p><HourglassTopIcon />Loading</p>}
      {error && <p><WarningAmberIcon />Something is wrong!!!</p>}
      {videos && (
        <Grid container spacing={1} style={{ textAlign: 'left', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1px', margin: '5px' }}>
          {videos.map((video, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <VideoCard video={video} />
              <div>{video.title}</div>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}