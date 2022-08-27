import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { register } from 'api/auth';
import { Register } from 'types';
import { authActions } from '../reducer/auth';

const AUTH_REGISTER_PREFIX = 'AUTH_REGISTER';
export const authRegisterStart = createAsyncThunk<void, Register>(
  AUTH_REGISTER_PREFIX,
  async (data, { dispatch }) => {
    try {
      dispatch(authActions.authRegisterInProgress());
      const token = await register(data);

      dispatch(authActions.authRegisterSuccess(token));
      localStorage.setItem('token', token.token);
      toast.success('You registered successfully!');
    } catch (error) {
      toast.error(error as string);
      dispatch(authActions.authRegisterError({ error: error as string }));
    }
  }
);
