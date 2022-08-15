import { PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../../types';
import { MovieListFetchState } from '../reducers/movieList';

export const movieListFetchInProgressAction = (state: MovieListFetchState) => {
  state.loading = true;
  state.error = null;
};

export const movieListFetchSuccessAction = (
  state: MovieListFetchState,
  action: PayloadAction<{ data: Movie[] }>
) => {
  const { data } = action.payload;

  state.data = data;
  state.loading = false;
};

export const movieListFetchErrorAction = (
  state: MovieListFetchState,
  action: PayloadAction<{ error: string }>
) => {
  const { error } = action.payload;

  state.loading = false;
  state.error = error;
};
