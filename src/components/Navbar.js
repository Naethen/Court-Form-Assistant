import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {AppBar, Toolbar, Typography,  Button,  Container} from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';

function Navbar() {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <GavelIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            Court Form Assistant
          </Typography>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
          >
            Home
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
