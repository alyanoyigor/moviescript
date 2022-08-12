import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeProvider } from 'styled-components';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import theme from './styles/theme';
import App from './App';

// declare module '@mui/material/styles' {
//   interface Palette {
//     light: Palette['primary'];
//   }
//   interface PaletteOptions {
//     light: PaletteOptions['primary'];
//   }
// }

// declare module '@mui/material/Button' {
//   interface ButtonPropsColorOverrides {
//     light: true;
//   }
// }

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </MuiThemeProvider>
  </BrowserRouter>
);
