import { PayloadAction } from '@reduxjs/toolkit';
import { MovieDetailsDeleteMovieState } from '../reducers/movieDetailsDeleteMovie';

export const movieDeleteInProgressAction = (
  state: MovieDetailsDeleteMovieState
) => {
  state.loading = true;
  state.error = null;
};

export const movieDeleteSuccessAction = (
  state: MovieDetailsDeleteMovieState
) => {
  state.loading = false;
};

export const movieDeleteErrorAction = (
  state: MovieDetailsDeleteMovieState,
  action: PayloadAction<{ error: string }>
) => {
  const { error } = action.payload;

  state.loading = false;
  state.error = error;
};
