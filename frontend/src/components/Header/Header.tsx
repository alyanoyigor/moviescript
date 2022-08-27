import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { authLogoutStart } from '../../store/auth/thunks/authLogout';
import { Logo } from '../Logo';
import { StyledNav, StyledHeaderWrapper, StyledNavLink } from './styled';

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

  return (
    <StyledHeaderWrapper>
      <Logo />
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
          <Button onClick={onClickLogout} variant="contained" color="secondary">
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
    </StyledHeaderWrapper>
  );
};
