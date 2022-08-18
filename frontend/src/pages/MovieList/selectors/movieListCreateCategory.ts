import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';

const movieListCreateCategoryStateSelector = (state: RootState) =>
  state.movieList.movieListCreateCategory;

export const movieListCreateCategorySelector = createSelector(
  movieListCreateCategoryStateSelector,
  (state) => ({ data: state.data, loading: state.loading, error: state.error })
);
