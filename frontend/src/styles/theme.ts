import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    light: Palette['primary'];
    dark: Palette['primary'];
    silverGrey: Palette['primary'];
  }
  interface PaletteOptions {
    light: PaletteOptions['primary'];
    dark: PaletteOptions['primary'];
    silverGrey: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    light: true;
    silverGrey: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    silverGrey: true;
  }
}

export const getTheme = (mode: 'dark' | 'light') => {
  return createTheme({
    palette: {
      mode,
      common: {
        black: '#0a0a0a',
        white: '#fafafa',
      },
      primary: {
        main: '#e0262d',
      },
      secondary: {
        main: '#e05326',
      },
      info: {
        main: '#4026e0',
      },
      light: {
        main: '#fafafa',
        contrastText: '#0a0a0a',
      },
      dark: {
        main: '#0a0a0a',
        contrastText: '#fafafa',
      },
      silverGrey: {
        main: '#565656',
        contrastText: '#fafafa',
      },
    },
  });
};
