import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';

const movieListGetCategoriesStateSelector = (state: RootState) =>
  state.movieList.movieListGetCategories;

export const movieListGetCategoriesSelector = createSelector(
  movieListGetCategoriesStateSelector,
  (state) => ({ data: state.data, loading: state.loading, error: state.error })
);
