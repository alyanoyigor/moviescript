import { Checkbox, MenuItem, styled } from '@mui/material';

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
