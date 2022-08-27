import { PayloadAction } from '@reduxjs/toolkit';
import { MovieCategory, Movie } from 'types';
import { MovieDetailsUpdateMovieState } from '../reducers/movieDetailsUpdateMovie';

export const movieUpdateInProgressAction = (
  state: MovieDetailsUpdateMovieState
) => {
  state.loading = true;
  state.error = null;
};

export const movieUpdateSuccessAction = (
  state: MovieDetailsUpdateMovieState
) => {
  state.loading = false;
};

export const movieUpdateErrorAction = (
  state: MovieDetailsUpdateMovieState,
  action: PayloadAction<{ error: string }>
) => {
  const { error } = action.payload;

  state.loading = false;
  state.error = error;
};

export const movieBeforeUpdateInProgressAction = (
  state: MovieDetailsUpdateMovieState
) => {
  state.fetchLoading = true;
  state.fetchCategoriesLoading = true;
  state.error = null;
};

export const movieBeforeUpdateSuccessAction = (
  state: MovieDetailsUpdateMovieState,
  action: PayloadAction<{ categories: MovieCategory[]; movie: Movie }>
) => {
  const { categories, movie } = action.payload;
  state.categories = categories;
  state.fetchData = movie;

  state.fetchLoading = false;
  state.fetchCategoriesLoading = false;
};

export const movieBeforeUpdateErrorAction = (
  state: MovieDetailsUpdateMovieState,
  action: PayloadAction<{ error: string }>
) => {
  const { error } = action.payload;

  state.fetchLoading = false;
  state.fetchCategoriesLoading = false;
  state.error = error;
};
