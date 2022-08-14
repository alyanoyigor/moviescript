import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    light: Palette['primary'];
  }
  interface PaletteOptions {
    light: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    light: true;
  }
}

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
    light: {
      main: '#fafafa',
      contrastText: '#0a0a0a',
    },
  },
});

export default theme;
