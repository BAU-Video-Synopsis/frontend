import React from 'react';
import { Container, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import loginbg from './videos/loginbg.jpg';

function Login() {
//   const theme = useContext(ThemeContext);
  return (
    <div
      className="w-full"
      style={{
        backgroundImage: `url(${loginbg})`,
        backgroundSize: 'cover', // Resmi tamamen kaplamak için cover kullanın
        backgroundPosition: 'center', // Resmi ortalamak için
        height: '100vh', // Tam viewport yüksekliği
        width: '100vw', // Tam viewport genişliği
      }}
    >
      <Container className="d-flex justify-content-center align-items-center h-100">
        <Form style={{
          width: '500px', backgroundColor: 'white', padding: 20, borderRadius: 20,
        }}
        >
          <h2 className="mb-3">Giriş Yap</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-left">Email adresi</Form.Label>
            <Form.Control type="email" placeholder="Email adresinizi girin" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-left">Parola</Form.Label>
            <Form.Control type="password" placeholder="Parolanızı girin" />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              localStorage.setItem('newUserId', '');
              window.location.reload();
            }}
          >
            Giriş Yap
          </Button>
        </Form>
      </Container>

    </div>
  );
}

export default Login;
