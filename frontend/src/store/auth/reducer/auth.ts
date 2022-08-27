import { createSlice } from '@reduxjs/toolkit';
import * as actions from '../actions/auth';

export type AuthState = {
  loading: boolean;
  error: string | null;
  token: string | null;
};

const savedToken = localStorage.getItem('token');

const initialState: AuthState = {
  loading: false,
  error: null,
  token: savedToken,
};

const AUTH_SLICE_NAME = 'AUTH_SLICE';

const authSlice = createSlice({
  name: AUTH_SLICE_NAME,
  initialState,
  reducers: {
    authLogoutInProgress: actions.authLogoutInProgressAction,
    authLogoutSuccess: actions.authLogoutSuccessAction,
    authLogoutError: actions.authLogoutErrorAction,

    authLoginInProgress: actions.authLoginInProgressAction,
    authLoginSuccess: actions.authLoginSuccessAction,
    authLoginError: actions.authLoginErrorAction,

    authRegisterInProgress: actions.authRegisterInProgressAction,
    authRegisterSuccess: actions.authRegisterSuccessAction,
    authRegisterError: actions.authRegisterErrorAction,
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
