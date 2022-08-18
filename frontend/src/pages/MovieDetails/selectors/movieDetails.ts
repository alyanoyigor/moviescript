import { createSelector } from 'reselect';
import { RootState } from '../../../store';

const movieStateSelector = (state: RootState) => state.movieDetails;

export const movieSelector = createSelector(movieStateSelector, (movie) => ({
  loading: movie.loading,
  data: movie.data,
  error: movie.error,
}));
