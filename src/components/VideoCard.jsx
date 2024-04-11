import React from "react";
import { useNavigate } from "react-router-dom";
import { formatAgo } from "../util/date";

export default function VideoCard({ video }) {
  const navigate = useNavigate();
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  if (typeof (video.id) !== 'string' && video.id.kind === 'youtube#channel')
    return null;
  const videoId = typeof (video.id) === 'string' ? video.id : video.id.videoId;
  return (
    <li style={{ flex: 1, listStyleType: "none", maxWidth: 250, margin: 20 }} onClick={() => {
      navigate(`/videos/watch/${videoId}`, { state: { video }, })
    }}>
      <img src={thumbnails.medium.url} alt={title} width={250} />
      <div >
        <p>{title}</p>
        <p>{channelTitle}</p>
        <p>{formatAgo(publishedAt, 'ko')}</p>
      </div>
    </li>
  )
}