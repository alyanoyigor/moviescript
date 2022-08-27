import { PayloadAction } from '@reduxjs/toolkit';
import { Movie } from 'types';
import { MovieDetailsFetchState } from '../reducers/movieDetailsFetch';

export const movieFetchInProgressAction = (state: MovieDetailsFetchState) => {
  state.loading = true;
  state.error = null;
};

export const movieFetchSuccessAction = (
  state: MovieDetailsFetchState,
  action: PayloadAction<{ data: Movie }>
) => {
  const { data } = action.payload;

  state.data = data;
  state.loading = false;
};

export const movieFetchErrorAction = (
  state: MovieDetailsFetchState,
  action: PayloadAction<{ error: string }>
) => {
  const { error } = action.payload;

  state.loading = false;
  state.error = error;
};
