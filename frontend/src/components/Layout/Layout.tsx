import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { GlobalStyles } from '../../styles/GlobalStyles';
import { Header } from '../Header';

export const Layout = () => (
  <>
    <GlobalStyles />
    <ToastContainer
      autoClose={3000}
      position="top-right"
      hideProgressBar={true}
    />
    <Container maxWidth="xl">
      <Header />
      <Outlet />
    </Container>
  </>
);
