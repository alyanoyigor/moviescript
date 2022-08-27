import { createSlice } from '@reduxjs/toolkit';
import { movieDetailsFetchStart } from '../thunks/movieDetailsFetch';

import { Movie } from 'types';
import * as actions from '../actions/movieDetailsFetch';

export type MovieDetailsFetchState = {
  data: Movie | Record<string, never>;
  error: string | null;
  loading: boolean;
};

const initialState: MovieDetailsFetchState = {
  data: {},
  error: null,
  loading: true,
};

const MOVIE_DETAILS_FETCH_SLICE_NAME = 'MOVIE_DETAILS_FETCH_SLICE';

const movieDetailsFetchSlice = createSlice({
  name: MOVIE_DETAILS_FETCH_SLICE_NAME,
  initialState,
  reducers: {
    movieDetailsResetData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        movieDetailsFetchStart.pending.type,
        actions.movieFetchInProgressAction
      )
      .addCase(
        movieDetailsFetchStart.fulfilled.type,
        actions.movieFetchSuccessAction
      )
      .addCase(
        movieDetailsFetchStart.rejected.type,
        actions.movieFetchErrorAction
      );
  },
});

export const { movieDetailsResetData } = movieDetailsFetchSlice.actions;

export default movieDetailsFetchSlice.reducer;
