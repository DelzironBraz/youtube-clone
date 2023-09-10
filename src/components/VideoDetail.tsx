import { Box, Link, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { CheckCircle } from "@mui/icons-material";
import { Videos } from ".";

const VideoDetail = () => {
    const { id } = useParams();

    const [videoDetail, setVideoDetail] = useState(null);
    const [videos, setVideos] = useState([]);
    
    useEffect(() => {
        fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
            .then(({ items }) => setVideoDetail(items[0]));

        fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
            .then(({ items }) => setVideos(items));
    }, [id]);

    if(!videoDetail?.snippet) return 'Loading...';

    const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

    return (
        <>
            <Box minHeight="95vh">
                <Stack direction={{xs: 'column', md: 'row'}}>
                    <Box flex={1}>
                        <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
                            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className='react-player' controls />
                            <Typography color='#FFF' variant="h5" fontWeight="bold" p={2}>
                                {title}
                            </Typography>
                            <Stack direction="row" justifyContent="space-between" sx={{ color: '#FFF' }} py={1} px={2} >
                                <Link top={`/channel/${channelId}`}>
                                    <Typography variant={{ sm: "subtitle1", md: "h6" }} color='#FFF'>
                                        {channelTitle}
                                        <CheckCircle sx={{ fontSize: '12px', color: 'gray', ml: '5px' }}/>
                                    </Typography>
                                </Link>
                                <Stack direction="row" gap="20px" alignItems="center">
                                    <Typography variant="body1" sx={{ opacity: 0.7 }}>
                                        {Number(viewCount).toLocaleString()} views
                                    </Typography>
                                    <Typography variant="body1" sx={{ opacity: 0.7 }}>
                                        {Number(likeCount).toLocaleString()} likes
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Box>
                    </Box>
                    <Box px={2} py={{md: 1, xs: 5}} justifyContent='center' alignItems='center'>
                        <Videos videos={videos} direction="column" />
                    </Box>
                </Stack>
            </Box>
        </>
    );
}

export default VideoDetail