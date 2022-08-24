import { PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../../types';
import { MovieListFetchState } from '../reducers/movieListFetch';

export const movieListFetchInProgressAction = (state: MovieListFetchState) => {
  state.loading = true;
  state.error = null;
};

export const movieListFetchSuccessAction = (
  state: MovieListFetchState,
  action: PayloadAction<{
    movies: Movie[];
    count: number;
  }>
) => {
  const { movies, count } = action.payload;

  state.count = count;
  state.data = movies;
  state.loading = false;
};

export const movieListFetchErrorAction = (
  state: MovieListFetchState,
  action: PayloadAction<{ error: string }>
) => {
  const { error } = action.payload;

  state.loading = false;
  state.error = error;
};

export const movieListAddQueryAction = (
  state: MovieListFetchState,
  action: PayloadAction<{ query: { name: string; value: string } }>
) => {
  const { query } = action.payload;
  state.queries = { ...state.queries, ...{ [query.name]: query.value } };
};
