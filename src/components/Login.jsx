import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import loginbg from './videos/loginbg.jpg';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      console.log(response.status);
      if (response.status === 200) {
        console.log('Giriş başarılı:');
        localStorage.setItem('newUserId', '123');
        history.push('/');
        window.location.reload();
      } else {
        alert('Hata Giriş Başarısız');
        console.error('Giriş başarısız');
      }
    } catch (error) {
      console.error('Sunucu hatası:', error);
    }
  };

  return (
    <div
      className="w-full"
      style={{
        backgroundImage: `url(${loginbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Container className="d-flex justify-content-center align-items-center h-100">
        <Form
          style={{
            width: '500px',
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 20,
          }}
          onSubmit={handleLogin}
        >
          <h2 className="mb-3">Giriş Yap</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email adresi</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email adresinizi girin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Parola</Form.Label>
            <Form.Control
              type="password"
              placeholder="Parolanızı girin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Giriş Yap
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
