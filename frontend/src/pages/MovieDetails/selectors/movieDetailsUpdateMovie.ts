import { createSelector } from 'reselect';
import { RootState } from 'store';

const movieUpdateStateSelector = (state: RootState) =>
  state.movieDetails.movieDetailsUpdateMovie;

export const movieUpdateSelector = createSelector(
  movieUpdateStateSelector,
  (movie) => ({
    loading: movie.loading,
    error: movie.error,
  })
);

export const movieUpdateCategoriesSelector = createSelector(
  movieUpdateStateSelector,
  (movie) => ({
    categories: movie.categories,
    fetchCategoriesLoading: movie.fetchCategoriesLoading,
  })
);

export const movieUpdateFetchDataSelector = createSelector(
  movieUpdateStateSelector,
  (movie) => ({
    fetchData: movie.fetchData,
    fetchLoading: movie.fetchLoading,
  })
);
