import { Box, Button, IconButton, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';

import { useAppDispatch } from '../../store';
import { authLogoutStart } from '../../store/auth/thunks/authLogout';
import { MODAL_NAME } from '../../store/modal/constants/modal';
import { modalClose, modalOpen } from '../../store/modal/reducer/modal';
import { modalSelector } from '../../store/modal/selectors/modal';
import { Logo } from '../Logo';
import { HeaderMenu } from './HeaderMenu';
import {
  StyledNav,
  StyledHeaderWrapper,
  StyledNavLink,
  StyledContainer,
  StyledMenuButtonWrapper,
} from './styled';

type HeaderProps = {
  token: string | null;
};

export const Header = (props: HeaderProps) => {
  const { token } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickLogout = () => {
    dispatch(authLogoutStart());
    navigate('/');
  };

  const { open, name } = useSelector(modalSelector);

  const handleCloseMenu = () => {
    dispatch(modalClose());
  };

  const handleOpenMenu = () => {
    dispatch(modalOpen({ name: MODAL_NAME.MENU_OPEN }));
  };

  return (
    <StyledHeaderWrapper>
      <Logo />
      <StyledContainer>
        <StyledNav>
          <StyledNavLink to="/">
            <Typography component="span">Home</Typography>
          </StyledNavLink>
          <StyledNavLink to="/movies">
            <Typography component="span">Movies</Typography>
          </StyledNavLink>
        </StyledNav>
        <Box display="flex" gap="8px">
          {token && (
            <Button
              onClick={onClickLogout}
              variant="contained"
              color="secondary"
            >
              Logout
            </Button>
          )}
          {!token && (
            <>
              <StyledNavLink to="/login">
                <Button variant="outlined" color="light">
                  Login
                </Button>
              </StyledNavLink>
              <StyledNavLink to="/register">
                <Button variant="contained">Register</Button>
              </StyledNavLink>
            </>
          )}
        </Box>
      </StyledContainer>
      <StyledMenuButtonWrapper>
        <IconButton edge="start" color="inherit" onClick={handleOpenMenu}>
          <MenuIcon />
        </IconButton>
      </StyledMenuButtonWrapper>
      <HeaderMenu
        open={open && name === MODAL_NAME.MENU_OPEN}
        handleCloseMenu={handleCloseMenu}
      />
    </StyledHeaderWrapper>
  );
};
