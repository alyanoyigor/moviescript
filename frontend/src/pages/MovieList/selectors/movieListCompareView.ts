import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

const movieListCompareViewStateSelector = (state: RootState) =>
  state.movieList.movieListCompareView;

export const movieListCompareViewSelector = createSelector(
  movieListCompareViewStateSelector,
  (state) => state.compareMovieIds
);

export const movieListCompareViewFetchSelector = createSelector(
  movieListCompareViewStateSelector,
  (state) => ({
    compareMovies: state.movies,
    loading: state.loading,
    error: state.error,
  })
);
