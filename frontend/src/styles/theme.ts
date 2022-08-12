import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    common: {
      black: '#0a0a0a',
      white: '#fafafa',
    },
    primary: {
      main: '#e0262d',
    },
    secondary: {
      main: '#7826e0',
    },
  },
});

export default theme;
