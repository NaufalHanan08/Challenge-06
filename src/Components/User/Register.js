import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import GoogleLogin from './GoogleLogin';

export const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [validation, setValidation] = useState([]);

  const history = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();

    const name = `${firstName} ${lastName}`;

    try {
      const response = await axios.post('https://shy-cloud-3319.fly.dev/api/v1/auth/register', {
        email,
        name,
        password,
      });

      console.log('Register berhasil', response.data);
      history('/');
    } catch (error) {
      setValidation(error.response.data);
      console.error('Register gagal', error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Link to="/" style={{ textDecoration: 'none', color: 'blue', fontSize: '16px' }}>
            &lt; Kembali
          </Link>
          <h2>HALAMAN REGISTER</h2>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { mt: 2, width: '40ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField label="NAMA DEPAN" type="text" variant="standard" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Masukkan Nama Depan" />
          </Box>
          {validation.firstName && <div className="alert alert-danger">{validation.firstName[0]}</div>}
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { mt: 2, width: '40ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField label="NAMA BELAKANG" type="text" variant="standard" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Masukkan Nama Belakang" />
          </Box>
          {validation.lastName && <div className="alert alert-danger">{validation.lastName[0]}</div>}
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
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { mt: 2, width: '40ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField label="KONFIRMASI PASSWORD" type="password" variant="standard" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Masukkan Konfirmasi Password" />
          </Box>
          {validation.passwordConfirmation && <div className="alert alert-danger">{validation.passwordConfirmation[0]}</div>}
          <Button type="submit" variant="contained" size="small" sx={{ width: '49ch', mt: 1 }} onClick={registerHandler}>
            REGISTER
          </Button>
          <Row style={{ marginTop: 20 }}>
            <Col className="text-center">
              <GoogleLogin buttonText="Login with Google 🚀" />
            </Col>
          </Row>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
