import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import SearchMovie from '../Fitur/SearchMovie';
import { useSelector, useDispatch } from 'react-redux';
import { logout, getMe } from '../../redux/actions/authActions';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

function MenuBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
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
