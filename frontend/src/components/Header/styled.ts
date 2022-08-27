import { NavLink } from 'react-router-dom';
import { Box, styled } from '@mui/material';

export const StyledHeaderWrapper = styled('div')`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 20px 0;
  gap: 64px;
`;

export const StyledNav = styled('nav')(({ theme }) => ({
  display: 'flex',
  gap: '16px',
  color: theme.palette.common.white,
  flex: '1',
}));

export const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',

  '& > span': {
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: 500,
  },

  '&.active': {
    color: theme.palette.primary.main,
    pointerEvents: 'none',
  },
}));

export const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',

  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
})) as typeof Box;

export const StyledMenuButtonWrapper = styled(Box)(({ theme }) => ({
  display: 'block',
  flexGrow: 1,
  textAlign: 'right',

  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
})) as typeof Box;
