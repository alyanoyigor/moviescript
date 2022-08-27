import { NavLink } from 'react-router-dom';
import { Box, styled } from '@mui/material';

export const StyledButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
  bottom: '0',
  left: '50%',
  transform: 'translate(-50%, 0)',
})) as typeof Box;

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
