import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';

const movieListCreateCategoryStateSelector = (state: RootState) =>
  state.movieList.movieListCreateCategory;

export const movieListCreateCategorySelector = createSelector(
  movieListCreateCategoryStateSelector,
  (state) => ({ loading: state.loading, error: state.error })
);
