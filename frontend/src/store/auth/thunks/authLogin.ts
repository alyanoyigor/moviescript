import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { login } from 'api/auth';
import { Login } from 'types';
import { authActions } from '../reducer/auth';

const AUTH_LOGIN_PREFIX = 'AUTH_LOGIN';
export const authLoginStart = createAsyncThunk<void, Login>(
  AUTH_LOGIN_PREFIX,
  async (data, { dispatch }) => {
    try {
      dispatch(authActions.authLoginInProgress());

      const token = await login(data);
      dispatch(authActions.authLoginSuccess(token));

      localStorage.setItem('token', token.token);
      toast.success('You logged in successfully!');
    } catch (error) {
      toast.error(error as string);
      dispatch(authActions.authLoginError({ error: error as string }));
    }
  }
);
