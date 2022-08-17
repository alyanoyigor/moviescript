import { Menu, MenuItem, styled } from '@mui/material';

export const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    marginLeft: 4,
    maxWidth: 150,
    marginTop: 12,
    width: '100%',
    position: 'relative',
    zIndex: 1,
    overflow: 'visible',
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
