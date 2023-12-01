
import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://neonflake-api.cyclic.app/videos');
        const data = await response.json();
        setVideos(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching videos', error);

      }
    };

    fetchData();
  }, []); 

  const handleVideoClick = (videoUrl) => {
    
    window.open(videoUrl, '_blank');
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Video List
      </Typography>
      <hr/>
      <Grid container spacing={3}>
        {videos.map((video) => (
          <Grid item key={video.title} xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '16px' }}  onClick={() => handleVideoClick(video.videoUrl)}>
             <img
                src={video.thumbnailUrl}
                alt={video.title}
                style={{ maxWidth: '100%', marginBottom: '8px' }}
              />
              <Typography variant="subtitle1" align="center" onClick={() => handleVideoClick(video.videoUrl)}>
                {video.title}
              </Typography>
              
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default VideoList;
