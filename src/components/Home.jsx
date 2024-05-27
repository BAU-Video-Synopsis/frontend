/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useContext } from 'react';
import Typewriter from 'typewriter-effect';
import Flip from 'react-reveal';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import myvideo from './videos/myvideo.mp4';

const styles = {
  mainContainer: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflowY: 'hidden',
  },
};

function Home() {
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const theme = useContext(ThemeContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        alert('Lütfen dosya seçin!');
        return;
      }
      setIsLoading(true);
      const isLogined = !!localStorage.getItem('newUserId');
      const formData = new FormData();
      formData.append('video', selectedFile);
      formData.append('isLogined', isLogined);
      formData.append('fileName', selectedFile.name);
      const response = await fetch('http://localhost:3001/uploadVideo', {
        method: 'POST',
        body: formData,
        mode: 'cors', // CORS modunu belirt
      });

      setIsLoading(false);

      if (!response.ok) {
        throw new Error('Dosya yükleme başarısız!');
      }

      const newdata = await response.json();
      console.log('Video uploaded successfully:', newdata.message);
      alert('Upload successful');
      // Başarı durumuna göre kullanıcıya bilgi verebilirsiniz
    } catch (error) {
      setIsLoading(false);
      console.error('Error uploading video:', error);
      alert('Error uploading video');
      // Hata durumunda kullanıcıya bilgi verebilirsiniz
    }
  };

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <div style={styles.mainContainer}>
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

        <Flip>
          <div>
            <Typewriter
              options={{
                loop: true,
                autoStart: true,
                strings: data?.roles || [],
              }}
            />
          </div>

          <div className="d-flex col-9 justify-content-between mt-3" style={{ width: 400 }}>
            <div style={{ flex: '1', marginRight: '5px' }}>
              <Button variant="primary" size="md" active className="w-100" href="howtodo">
                Get Information
              </Button>
            </div>
            <div style={{ flex: '1', marginLeft: '5px' }}>
              <Button variant="primary" size="md" active className="w-100" onClick={() => setShow(!show)}>
                Let's Start
              </Button>
            </div>
          </div>
        </Flip>
      </div>
      <Modal
        show={show}
        size="lg"
        animation
        aria-labelledby="contained-modal-title-vcenter"
        centered
        data-bs-theme={theme.bsPrimaryVariant}
      >
        <Modal.Header closeButton={false}>
          <Modal.Title id="contained-modal-title-vcenter">
            Summarize Video
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Upload Your Video</h4>
          <p>
            The size of the uploaded video must be less than 300 MB and its format must be mp4.
          </p>
          <div>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleUpload} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Submit'}
          </Button>
          <Button onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Home;
