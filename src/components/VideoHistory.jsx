/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Container, Table, Button, Alert, Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Header from './Header';
import '../css/videohistory.css';
import myvideo from './videos/myvideo2.mp4';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100vw',
    position: 'relative', // For positioning the table correctly
  },
  tableWrapper: {
    width: '85%',
    marginTop: 20,
    zIndex: 1, // To ensure the table is above the video
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for readability
    padding: '20px',
    borderRadius: '10px',
  },
  th: {
    backgroundColor: '#f2f2f2',
    color: '#333',
    padding: '10px',
  },
  td: {
    padding: '10px',
  },
  button: {
    marginLeft: 10,
  },
  noData: {
    marginTop: 20,
    textAlign: 'center',
  },
  videoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 0,
    opacity: 0.7, // Slight transparency for the video background
  },
};


function VideoHistory({ header }) {
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  useEffect(() => {
    fetch('http://localhost:3001/getVideos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response is', data[0].videoUrl);
        setVideos(data);
      })
      .catch((error) => console.error('Error fetching videos:', error));

  }, []);

  const handleOpenVideo = (videoUrl) => {
    const fullVideoUrl = `http://localhost:3001${videoUrl}`;
    setCurrentVideoUrl(fullVideoUrl);
    setShowModal(true);
  };

  const handleDownloadVideo = (videoUrl) => {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = videoUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentVideoUrl('');
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflowY: 'hidden',
    }}
    >
      <video
        src={myvideo}
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          overflowY: 'hidden',
        }}
      />
      <Container style={styles.container}>
        <div style={styles.tableWrapper}>
          {videos.length === 0 ? (
            <Alert variant="info" style={styles.noData}>
              There are no videos to view
            </Alert>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ ...styles.th, width: '40%' }}>Name</th>
                  <th style={{ ...styles.th, width: '30%' }}>Date</th>
                  <th style={{ ...styles.th, width: '30%' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video) => (
                  <tr key={video._id}>
                    <td style={styles.td}>{video.name}</td>
                    <td style={styles.td}>{new Date(video.createdAt).toLocaleDateString()}</td>
                    <td style={styles.td}>
                      <Button
                        variant="primary"
                        style={styles.button}
                        onClick={() => handleOpenVideo(video.videoUrl)}
                      >
                        Open Video
                      </Button>
                      <Button
                        variant="secondary"
                        style={styles.button}
                        onClick={() => handleDownloadVideo(video.videoUrl)}
                      >
                        Download Video
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Video Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentVideoUrl && (
            <video controls style={{ width: '100%' }}>
              <source src={currentVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

VideoHistory.propTypes = {
  header: PropTypes.string.isRequired,
};

export default VideoHistory;
