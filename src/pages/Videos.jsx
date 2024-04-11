import React from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function Videos() {
  const { keyword } = useParams();
  const { isLoading, error, data: videos } = useQuery({
    queryKey: ['videos', keyword],
    queryFn: async () => {
      return axios
        .get(`/data/${keyword ? 'search' : 'popular'}.json`)
        .then(res => res.data.items);
    }, staleTime: 1000 * 60 * 1,
  });
  // useEffect(() => {
  //   axios.get(`/data/${keyword ? 'search' : 'popular'}.json`)
  //     .then(res => setVideos(res.data.items))
  // }, [keyword])
  return (
    <div>
      <div>Videos {keyword ? `${keyword}로 검색` : 'Hot Trend'}</div>
      {isLoading && <p><HourglassTopIcon/>Loading</p>}
      {error && <p><WarningAmberIcon/>Something is wrong!!!</p>}
      {videos && (
        <ul>
          {videos.map(video => (
            <li key={video.id}>{video.snippet.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}