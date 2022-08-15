import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import theme from './styles/theme';
import App from './App';
import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>
);
