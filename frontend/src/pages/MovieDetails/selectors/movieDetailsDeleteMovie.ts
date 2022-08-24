import { createSelector } from 'reselect';
import { RootState } from '../../../store';

const movieDeleteStateSelector = (state: RootState) =>
  state.movieDetails.movieDetailsDeleteMovie;

export const movieDeleteSelector = createSelector(
  movieDeleteStateSelector,
  (movie) => ({
    loading: movie.loading,
    error: movie.error,
  })
);
