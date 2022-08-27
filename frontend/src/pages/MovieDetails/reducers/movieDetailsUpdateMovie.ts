import { createSlice } from '@reduxjs/toolkit';

import { MovieCategory, Movie } from 'types';
import * as actions from '../actions/movieDetailsUpdateMovie';
import { movieDetailsBeforeUpdateMovieStart } from '../thunks/movieDetailsUpdateMovie';

export type MovieDetailsUpdateMovieState = {
  error: string | null;
  loading: boolean;
  fetchLoading: boolean;
  fetchCategoriesLoading: boolean;
  categories: MovieCategory[];
  fetchData: Movie | Record<never, string>;
};

const initialState: MovieDetailsUpdateMovieState = {
  error: null,
  loading: false,
  fetchLoading: true,
  fetchCategoriesLoading: true,
  categories: [],
  fetchData: {},
};

const MOVIE_DETAILS_UPDATE_MOVIE_SLICE_NAME =
  'MOVIE_DETAILS_UPDATE_MOVIE_SLICE';

const movieDetailsUpdateMovieSlice = createSlice({
  name: MOVIE_DETAILS_UPDATE_MOVIE_SLICE_NAME,
  initialState,
  reducers: {
    movieUpdateInProgress: actions.movieUpdateInProgressAction,
    movieUpdateSuccess: actions.movieUpdateSuccessAction,
    movieUpdateError: actions.movieUpdateErrorAction,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        movieDetailsBeforeUpdateMovieStart.pending.type,
        actions.movieBeforeUpdateInProgressAction
      )
      .addCase(
        movieDetailsBeforeUpdateMovieStart.fulfilled.type,
        actions.movieBeforeUpdateSuccessAction
      )
      .addCase(
        movieDetailsBeforeUpdateMovieStart.rejected.type,
        actions.movieBeforeUpdateErrorAction
      );
  },
});

export const { movieUpdateInProgress, movieUpdateSuccess, movieUpdateError } =
  movieDetailsUpdateMovieSlice.actions;

export default movieDetailsUpdateMovieSlice.reducer;
