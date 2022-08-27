import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

const movieListCreateMovieStateSelector = (state: RootState) =>
  state.movieList.movieListCreateMovie;

export const movieListCreateMovieSelector = createSelector(
  movieListCreateMovieStateSelector,
  (state) => ({ loading: state.loading, error: state.error })
);

export const movieListCreateMovieFetchCategoriesSelector = createSelector(
  movieListCreateMovieStateSelector,
  (state) => ({
    fetchCategoriesLoading: state.fetchCategoriesLoading,
    categories: state.categories,
  })
);
