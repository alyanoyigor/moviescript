import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { GlobalStyles } from '../../styles/GlobalStyles';
import { Header } from '../Header';

type LayoutProps = {
  token: string | null;
};

export const Layout = (props: LayoutProps) => {
  const { token } = props;

  return (
    <>
      <GlobalStyles />
      <ToastContainer
        autoClose={3000}
        position="top-right"
        hideProgressBar={true}
      />
      <Container maxWidth="xl">
        <Header token={token} />
        <Outlet />
      </Container>
    </>
  );
};
