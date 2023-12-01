import React, { useState } from 'react';
import { Typography,TextField, TextareaAutosize, Button, Container, Grid, Paper, Input } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {

  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [success,setSuccess]=useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('thumbnail', thumbnail);
    data.append('video', video);

    try {
      const response = await fetch('https://neonflake-api.cyclic.app/upload', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        console.log('Video uploaded successfully');
      } else {
        console.error('Error uploading video');
      }

      setTitle('');
      setDescription('');
      setThumbnail(null);
      setVideo(null);
      setSuccess(true);
    } 

    catch (error) {
      console.error('Network error', error);
    }
    
  };

  const navigate = useNavigate();
  const Navigateview = () => {
    navigate('/view');
  };

  const handleClose = () => {
    setSuccess(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Upload Page
      </Typography>
      <hr/>
      {success && (
        <Alert severity="success" onClose={handleClose}>This is a success alert — check it out!</Alert>
      )}
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                inputProps={{ maxLength: 50 }}
                required
                style={{ marginBottom: 15 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                placeholder="Description"
                style={{ width: '100%', padding: '10px', marginTop: '10px' }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={200}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type="file"
                id="thumbnail"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setThumbnail(e.target.files[0])}
                style={{ display: 'none' }}
              />
              <label htmlFor="thumbnail">
                <Button component="span" variant="outlined" style={{ marginBottom: 15 }}>
                  {thumbnail ? thumbnail.name : 'Upload Thumbnail (JPG/PNG only)'}
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <Input
                type="file"
                id="video"
                accept=".mpg, .avi, .mp4"
                onChange={(e) => setVideo(e.target.files[0])}
                style={{ display: 'none' }}
              />
              <label htmlFor="video">
                <Button component="span" variant="outlined" style={{ marginBottom: 15 }}>
                  {video ? video.name : 'Upload Video (MPG/AVI/MP4 only)'}
                </Button>
              </label>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="success" style={{ marginTop: '20px' }}>
            Submit
          </Button>
        </form>
      </Paper>
      <br></br>
      <Button  variant="contained" fullWidth onClick={Navigateview} style={{size:"small",  marginTop: '20px' }}>View All thumbnails</Button>
    </Container>
    
  );
};

export default UploadPage;
