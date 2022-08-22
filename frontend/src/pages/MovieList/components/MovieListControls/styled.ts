import { alpha, Checkbox, MenuItem, styled } from '@mui/material';

export const sxSelectCategory = {
  marginTop: '12px',
  maxWidth: '200px',
  zIndex: 1,
  position: 'relative',
  overflow: 'visible',

  '& .MuiMenu-list': {
    maxHeight: 200,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.3rem',
    },
    '&::-webkit-scrollbar-track': {
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'grey.600',
      borderRadius: 4,
    },
  },

  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: '10%',
    width: 16,
    height: 16,
    backgroundColor: '#121212',
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 0,
    backgroundImage:
      'linear-gradient(rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12))',
  },
};

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  height: 45,

  '&.Mui-selected': {
    backgroundColor: alpha(theme.palette.secondary.main, 0.2),
  },

  '&.Mui-selected:hover': {
    backgroundColor: alpha(theme.palette.secondary.main, 0.5),
  },
}));

export const StyledCheckbox = styled(Checkbox)(() => ({
  color: '#ffffff',

  '&:hover': {
    backgroundColor: 'transparent',
  },

  '&.Mui-checked': {
    color: '#ffffff',
  },
}));
