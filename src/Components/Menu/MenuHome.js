import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import SearchMovie from '../Fitur/SearchMovie';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

function MenuBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Mendapatkan token dari local storage
    const token = localStorage.getItem('token');

    if (token) {
      // Lakukan permintaan ke API Postman untuk mendapatkan data pengguna setelah login
      fetch('https://shy-cloud-3319.fly.dev/api/v1/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`, // Menggunakan token dari local storage
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data.data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []); // Efek ini hanya perlu dijalankan sekali saat komponen dimuat

  const handleLogout = () => {
    // Hapus token dari local storage
    localStorage.removeItem('token');
    // Hapus data pengguna
    setUser(null);

    // Hapus data "Popular Movies" dari localStorage saat logout
    localStorage.removeItem('popularMovies');

    // Redirect ke halaman login atau halaman lain setelah logout
    // history.push('/login'); // Jika Anda menggunakan react-router
  };

  return (
    <div>
      <div style={{ justifyContent: 'center', textAlign: 'center' }} className="menubar">
        <Grid container spacing={2} className="gridbar">
          <Grid item xs={2}>
            <StyledLink to="/i">
              <h1 className="logopage">MovieList</h1>
            </StyledLink>
          </Grid>
          <Grid item xs={6} style={{ justifyContent: 'center', textAlign: 'center' }}>
            <SearchMovie />
          </Grid>
          <Grid item xs={4}>
            {user ? ( // Jika pengguna sudah login, tampilkan tombol Logout dan informasi pengguna
              <Stack spacing={2} direction="row" className="users">
                <p style={{ fontWeight: 'bold' }}>{`Welcome, ${user.name} (${user.email})`}</p>
                <Button variant="outlined" color="red" sx={{ border: 2, borderRadius: 20 }} onClick={handleLogout}>
                  Logout
                </Button>
              </Stack>
            ) : (
              // Jika pengguna belum login, tampilkan tombol Login dan Register
              <Stack spacing={2} direction="row" className="users">
                <StyledLink to="login">
                  <Tooltip title="Sign In">
                    <Button variant="outlined" color="red" sx={{ border: 2, borderRadius: 20 }}>
                      Login
                    </Button>
                  </Tooltip>
                </StyledLink>
                <StyledLink to="register">
                  <Tooltip title="Sign Up">
                    <Button variant="contained" sx={{ borderRadius: 20 }}>
                      Register
                    </Button>
                  </Tooltip>
                </StyledLink>
              </Stack>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default MenuBar;
