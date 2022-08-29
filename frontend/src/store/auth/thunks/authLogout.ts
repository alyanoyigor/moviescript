import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { logout } from 'api/auth';
import { authActions } from '../reducer/auth';
import { movieListCompareViewResetData } from 'pages/MovieList/reducers/movieListCompareView';

const AUTH_LOGOUT_PREFIX = 'AUTH_LOGOUT';
export const authLogoutStart = createAsyncThunk(
  AUTH_LOGOUT_PREFIX,
  async (_data, { dispatch }) => {
    try {
      dispatch(authActions.authLogoutInProgress());

      await logout();
      dispatch(authActions.authLogoutSuccess());
      localStorage.clear();
      dispatch(movieListCompareViewResetData());

      toast.success('You logged out successfully!');
    } catch (error) {
      toast.error(error as string);
      dispatch(authActions.authLogoutError({ error: error as string }));
    }
  }
);
