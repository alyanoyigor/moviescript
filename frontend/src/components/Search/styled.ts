import { InputBase, styled, alpha } from '@mui/material';

export const StyledSearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginLeft: 0,
  borderRadius: theme.shape.borderRadius,

  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  [theme.breakpoints.up('md')]: {
    maxWidth: '350px',
  },
}));

export const StyledSearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: '100%',
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    border: `solid 1px ${alpha(theme.palette.common.white, 0.1)}`,
    '&:focus': {
      border: `solid 1px ${alpha(theme.palette.common.white, 0.5)}`,
    },
  },
}));
