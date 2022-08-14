import { Typography } from '@mui/material';
import { Logo } from '../Logo';
import { StyledNav, StyledHeaderWrapper, StyledNavLink } from './styled';

export const Header = () => (
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
  </StyledHeaderWrapper>
);
