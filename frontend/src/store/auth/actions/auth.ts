import { PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../reducer/auth';

export const authLoginInProgressAction = (state: AuthState) => {
  state.loading = true;
  state.error = null;
};

export const authLoginSuccessAction = (
  state: AuthState,
  action: PayloadAction<{
    token: string;
  }>
) => {
  const { token } = action.payload;

  state.token = token;
  state.loading = false;
};

export const authLoginErrorAction = (
  state: AuthState,
  action: PayloadAction<{ error: string }>
) => {
  const { error } = action.payload;

  state.loading = false;
  state.error = error;
};

export const authRegisterInProgressAction = (state: AuthState) => {
  state.loading = true;
  state.error = null;
};

export const authRegisterSuccessAction = (
  state: AuthState,
  action: PayloadAction<{
    token: string;
  }>
) => {
  const { token } = action.payload;

  state.token = token;
  state.loading = false;
};

export const authRegisterErrorAction = (
  state: AuthState,
  action: PayloadAction<{ error: string }>
) => {
  const { error } = action.payload;

  state.loading = false;
  state.error = error;
};

export const authLogoutInProgressAction = (state: AuthState) => {
  state.loading = true;
  state.error = null;
};

export const authLogoutSuccessAction = (state: AuthState) => {
  state.loading = false;
  state.token = null;
  localStorage.clear();
};

export const authLogoutErrorAction = (
  state: AuthState,
  action: PayloadAction<{ error: string }>
) => {
  const { error } = action.payload;

  state.loading = false;
  state.error = error;
  state.token = null;
};
