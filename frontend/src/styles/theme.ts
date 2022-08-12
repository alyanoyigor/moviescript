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
      main: '#E05326',
    },
    info: {
      main: '#4026e0',
    },
    // light: {
    //   main: '#fafafa',
    // },
  },
});

export default theme;
