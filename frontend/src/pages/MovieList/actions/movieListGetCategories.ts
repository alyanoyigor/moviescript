import { PayloadAction } from '@reduxjs/toolkit';
import { MovieCategory } from '../../../types';
import { MovieListGetCategoriesState } from '../reducers/movieListGetCategories';

export const movieListGetCategoriesInProgressAction = (
  state: MovieListGetCategoriesState
) => {
  state.loading = true;
  state.error = null;
};

export const movieListGetCategoriesSuccessAction = (
  state: MovieListGetCategoriesState,
  action: PayloadAction<{ data: MovieCategory[] }>
) => {
  const { data } = action.payload;

  state.data = data;
  state.loading = false;
};

export const movieListGetCategoriesErrorAction = (
  state: MovieListGetCategoriesState,
  action: PayloadAction<{ error: string }>
) => {
  const { error } = action.payload;

  state.loading = false;
  state.error = error;
};
