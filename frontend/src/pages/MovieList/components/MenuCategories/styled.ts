import { Checkbox, Menu, MenuItem, styled } from '@mui/material';

export const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    marginLeft: 4,
    maxWidth: 250,
    marginTop: 12,
    width: '100%',
    position: 'relative',
    zIndex: 1,
    overflow: 'visible',
  },

  '& .MuiMenu-list': {
    maxHeight: 196,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.3rem',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[600],
      borderRadius: 4,
    },
  },

  '& .MuiMenu-paper:before': {
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
}));

export const StyledMenuItem = styled(MenuItem)(() => ({
  height: 45,
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
