import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatAgo } from "../util/date";
import Card from '@mui/material/Card';

export default function VideoCard({ video }) {
  const titleStyle = {
    padding: '0px 0px 0px 0px',
    width: 250
  };

  const navigate = useNavigate();
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  if (typeof (video.id) !== 'string' && video.id.kind === 'youtube#channel')
    return;
  const videoId = typeof (video.id) === 'string' ? video.id : video.id.videoID;
  return (
    <Card width={250} onClick={() => {
      navigate(`/videos/watch/${videoId}`, { state: { video } })
    }}>

      <img src={thumbnails.medium.url} alt={title} width={250} />
      <div>
        <p style={titleStyle}>{title}</p>
        <p style={titleStyle}>{channelTitle}</p>
        <p style={titleStyle}>{formatAgo(publishedAt, 'ko')}</p>
      </div>
    </Card>
  )
}