import React from "react";
import { useLocation } from 'react-router-dom';
import ChannelInfo from "../components/ChannelInfo";
import RelatedVideo from "../components/RelatedVideos"
import Grid from "@mui/material/Grid";

export default function VideoDetail() {
  const { state } = useLocation(); // 보내진 정보를 바탕으로 받아옴.
  const video = state?.video;
  if (!video) return null; // video 객체가 존재하지 않는 경우 처리

  const { title, channelId, channelTitle, description } = video?.snippet;
  if (!title || !channelId || !channelTitle || !description) return null; // 필수 속성이 존재하지 않는 경우 처리

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <article>
          <iframe src={`https://www.youtube.com/embed/${video.id}`} title={title} 
            id='player' typeof='text/html' width='100%' height={500} />
        </article>
        <div>
          <h3>{title}</h3>
          <ChannelInfo />
          <pre>{description}</pre>
        </div>
        </Grid>
        <Grid item xs={3}>
          <RelatedVideo />
        </Grid>
    </Grid>
  )
}
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useLocation } from 'react-router-dom';

// export default function VideoDetail() {
//   const { videoId } = useParams();
//   const [video, setVideo] = useState(null);
//   // const { status: {video} } = useLocation();
//   // const { title, channelId, channelTitle, description } = video.snippet;
 
//   useEffect(() => {
//     axios
//       .get(`https://youtube.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
//       .then((response) => {
//         setVideo(response.data.items[0]);
//       })
//       .catch((error) => {
//         console.error("Error fetching video details:", error);
//       });
//   }, [videoId]);

//   if (!video) {
//     return <div>Loading...</div>;
//   }

//   const { snippet } = video;
//   return (
//     <div>
//       <h2>{snippet.title}</h2>
//       <p>{snippet.description}</p>
//       <iframe
//         width="560"
//         height="315"
//         src={`https://www.youtube.com/watch?=${videoId}`}
//         title={snippet.title}
//         allowFullScreen
//       ></iframe>
//     </div>
//   );
// }