import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';

const movieListSelector = (state: RootState) => state.movieList.movieListFetch;

export const movieListFetchSelector = createSelector(
  movieListSelector,
  (state) => ({ data: state.data, loading: state.loading, error: state.error })
);

export const movieListFetchQueriesSelector = createSelector(
  movieListSelector,
  (state) => ({ queries: state.queries })
);
