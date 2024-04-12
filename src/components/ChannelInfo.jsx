import React from "react";
import Stack from '@mui/material/Stack';
import { useChannelInfo } from '../api/youtube';

export default function ChannelInfo({ id, name }) {
  const { url } = useChannelInfo(id);
  return (
    <Stack direction={'row'} sx={{ alignItems: 'center' }} spacing={2} >
      {url && <img src={url} alt={name} height={64} width={64} />}
      <h4>{name}</h4>
    </Stack>
  )
}


// 수정 전 버전 - youtube.js 사용 전

// import React from "react";
// import { useQuery } from '@tanstack/react-query';
// import axios from "axios";
// import Stack from '@mui/material/Stack';

// export default function ChannelInfo({ id, name }) {
//   const { data: url } = useQuery({
//     queryKey: ['channel', id],
//     queryFn: async () => {
//       return axios
//         .get('/data/channel.json')
//         .then(res => res.data.items[0].snippet.thumbnails.default.url)
//     }, staleTime: 1000 * 60 * 5,
//   }
//   );
//   return (
//     <Stack direction={'row'} sx={{ alignItems: "center" }} spacing={2}>
//       {url && <img src={url} alt={name} />}
//       <h4>{name}</h4>
//     </Stack>
//   )
// }