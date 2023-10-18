import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import GoogleLogin from './GoogleLogin';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState([]);

  const history = useNavigate();
  const { login } = useAuth();

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://shy-cloud-3319.fly.dev/api/v1/auth/login', {
        email,
        password,
      });

      console.log('Login berhasil', response.data);

      const userData = response.data.data;

      localStorage.setItem('token', userData.token);

      login(userData);

      history('/');
    } catch (error) {
      setValidation(error.response.data);
      console.error('Login gagal', error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Box sx={{ marginBottom: '1rem' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'blue', fontSize: '16px' }}>
              &lt; Kembali
            </Link>
          </Box>
          <h2>HALAMAN LOGIN</h2>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { mt: 2, width: '40ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField label="ALAMAT EMAIL" type="email" variant="standard" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan Alamat Email" />
          </Box>
          {validation.email && <div className="alert alert-danger">{validation.email[0]}</div>}
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { mt: 2, width: '40ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField label="PASSWORD" type="password" variant="standard" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password" />
          </Box>
          {validation.password && <div className="alert alert-danger">{validation.password[0]}</div>}
          <div className="d-grid gap-2">
            <Button type="submit" variant="contained" size="small" sx={{ width: '49ch', mt: 1 }} onClick={loginHandler}>
              LOGIN
            </Button>
          </div>
          <Row style={{ marginTop: 20 }}>
            <Col className="text-center">
              <GoogleLogin buttonText="Login with Google 🚀" />
            </Col>
          </Row>
          <p style={{ marginTop: 20, color: 'GrayText' }}>
            Don't have an account?
            <Link to="/register" style={{ textDecoration: 'none' }}>
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
