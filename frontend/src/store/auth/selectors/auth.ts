import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../index';

const authStateSelector = (state: RootState) => state.auth;

export const authTokenSelector = createSelector(
  authStateSelector,
  (state) => state.token
);

export const authLoadingSelector = createSelector(
  authStateSelector,
  (state) => state.loading
);
