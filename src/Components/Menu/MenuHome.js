// bagian atas halaman utama dan detail
import React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import SearchMovie from '../Fitur/SearchMovie';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

function MenuBar(props) {
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
            <Stack spacing={2} direction="row" className="users">
              <Button variant="outlined" color="red" sx={{ border: 2, borderRadius: 20 }}>
                Login
              </Button>
              <Button variant="contained" sx={{ borderRadius: 20 }}>
                Register
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default MenuBar;
