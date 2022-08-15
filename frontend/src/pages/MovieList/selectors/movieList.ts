import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';

const movieListSelector = (state: RootState) => state.movieList;

export const movieListFetchSelector = createSelector(
  movieListSelector,
  (state) => ({ data: state.data, loading: state.loading, error: state.error })
);
