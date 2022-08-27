import React from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { StyledNavLink, StyledButtons } from './styled';

type HeaderMenuProps = {
  open: boolean;
  token: string | null;
  handleCloseMenu: () => void;
  handleClickLogout: () => void;
};

export const HeaderMenu = (props: HeaderMenuProps) => {
  const { open, handleCloseMenu, token, handleClickLogout } = props;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleCloseMenu}
      PaperProps={{
        sx: { width: '50%', minWidth: '260px' },
      }}
    >
      <Box>
        <IconButton sx={{ mb: 2 }} onClick={handleCloseMenu}>
          <CloseIcon />
        </IconButton>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ mb: 2 }}>
          <StyledNavLink to="/">
            <ListItemButton>
              <ListItemText primary="Home" />
            </ListItemButton>
          </StyledNavLink>
          <StyledNavLink to="/movies">
            <ListItemButton>
              <ListItemText primary="Movies" />
            </ListItemButton>
          </StyledNavLink>
        </Box>
        <StyledButtons>
          {token && (
            <Button
              onClick={handleClickLogout}
              sx={{ m: 1 }}
              variant="contained"
              color="secondary"
            >
              Logout
            </Button>
          )}
          {!token && (
            <>
              <StyledNavLink to="/login">
                <Button sx={{ m: 1 }} variant="outlined" color="light">
                  Login
                </Button>
              </StyledNavLink>
              <StyledNavLink to="/register">
                <Button sx={{ m: 1 }} variant="contained">
                  Register
                </Button>
              </StyledNavLink>
            </>
          )}
        </StyledButtons>
      </Box>
    </Drawer>
  );
};
