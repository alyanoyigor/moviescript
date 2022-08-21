import { createSlice } from '@reduxjs/toolkit';

import * as actions from '../actions/movieListFetch';
import { Movie, MovieQueries } from '../../../types';
import { movieListFetchStart } from '../thunks/movieListFetch';

export type MovieListFetchState = {
  data: Movie[];
  error: string | null;
  loading: boolean;
  queries: MovieQueries;
};

const initialState: MovieListFetchState = {
  data: [],
  error: null,
  loading: true,
  queries: {},
};

const MOVIE_LIST_FETCH_SLICE_NAME = 'MOVIE_LIST_FETCH_SLICE';

const movieListFetchSlice = createSlice({
  name: MOVIE_LIST_FETCH_SLICE_NAME,
  initialState,
  reducers: {
    movieListResetData: () => initialState,
    movieListAddQuery: actions.movieListAddQueryAction,
    movieListRemoveQuery: actions.movieListRemoveQueryAction,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        movieListFetchStart.pending.type,
        actions.movieListFetchInProgressAction
      )
      .addCase(
        movieListFetchStart.fulfilled.type,
        actions.movieListFetchSuccessAction
      )
      .addCase(
        movieListFetchStart.rejected.type,
        actions.movieListFetchErrorAction
      );
  },
});

export const { movieListAddQuery, movieListRemoveQuery } =
  movieListFetchSlice.actions;

export default movieListFetchSlice.reducer;
