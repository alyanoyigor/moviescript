import { createSelector } from 'reselect';
import { RootState } from 'store';

const movieStateSelector = (state: RootState) =>
  state.movieDetails.movieDetailsFetch;

export const movieFetchSelector = createSelector(
  movieStateSelector,
  (movie) => ({
    loading: movie.loading,
    data: movie.data,
    error: movie.error,
  })
);
