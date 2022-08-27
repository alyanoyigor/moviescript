import { PayloadAction } from '@reduxjs/toolkit';
import { MovieCategory } from 'types';
import { MovieListCreateMovieState } from '../reducers/movieListCreateMovie';

export const movieCreateInProgressAction = (
  state: MovieListCreateMovieState
) => {
  state.loading = true;
  state.error = null;
};

export const movieCreateSuccessAction = (state: MovieListCreateMovieState) => {
  state.loading = false;
};

export const movieCreateErrorAction = (
  state: MovieListCreateMovieState,
  action: PayloadAction<{ error: string }>
) => {
  const { error } = action.payload;

  state.loading = false;
  state.error = error;
};

export const movieListBeforeCreateMovieInProgressAction = (
  state: MovieListCreateMovieState
) => {
  state.fetchCategoriesLoading = true;
  state.error = null;
};

export const movieListBeforeCreateMovieSuccessAction = (
  state: MovieListCreateMovieState,
  action: PayloadAction<{ data: MovieCategory[] }>
) => {
  const { data } = action.payload;
  state.categories = data;
  state.fetchCategoriesLoading = false;
};

export const movieListBeforeCreateMovieErrorAction = (
  state: MovieListCreateMovieState,
  action: PayloadAction<{ error: string }>
) => {
  const { error } = action.payload;

  state.fetchCategoriesLoading = false;
  state.error = error;
};
