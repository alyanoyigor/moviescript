import { PayloadAction } from '@reduxjs/toolkit';
import { MovieListCreateCategoryState } from '../reducers/movieListCreateCategory';

export const categoryCreateInProgressAction = (
  state: MovieListCreateCategoryState
) => {
  state.loading = true;
  state.error = null;
};

export const categoryCreateSuccessAction = (
  state: MovieListCreateCategoryState
) => {
  state.loading = false;
};

export const categoryCreateErrorAction = (
  state: MovieListCreateCategoryState,
  action: PayloadAction<{ error: string }>
) => {
  const { error } = action.payload;

  state.loading = false;
  state.error = error;
};
