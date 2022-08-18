import { PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../../types';
import { MovieDetailsState } from '../reducers/movieDetails';

export const movieFetchInProgressAction = (state: MovieDetailsState) => {
  state.loading = true;
  state.error = null;
};

export const movieFetchSuccessAction = (
  state: MovieDetailsState,
  action: PayloadAction<{ data: Movie }>
) => {
  const { data } = action.payload;

  state.data = data;
  state.loading = false;
};

export const movieFetchErrorAction = (
  state: MovieDetailsState,
  action: PayloadAction<{ error: string }>
) => {
  const { error } = action.payload;

  state.loading = false;
  state.error = error;
};
