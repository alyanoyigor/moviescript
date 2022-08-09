import { Typography } from '@mui/material';
import { Logo } from '../Logo';
import { StyledNav, StyledHeaderWrapper, StyledNavLink } from './styled';

export const Header = () => (
  <StyledHeaderWrapper>
    <Logo />
    <StyledNav>
      <StyledNavLink to="/movies">
        <Typography component="span">Movies</Typography>
      </StyledNavLink>
      <StyledNavLink to="/categories">
        <Typography component="span">Categories</Typography>
      </StyledNavLink>
      <StyledNavLink to="/favorites">
        <Typography component="span">Favorites</Typography>
      </StyledNavLink>
    </StyledNav>
  </StyledHeaderWrapper>
);
