import { createSlice } from '@reduxjs/toolkit';

import { MovieCategory } from '../../../types';
import * as actions from '../actions/movieListCreateMovie';
import { movieListBeforeCreateMovieStart } from '../thunks/movieListCreateMovie';

export type MovieListCreateMovieState = {
  error: string | null;
  loading: boolean;
  fetchCategoriesLoading: boolean;
  categories: MovieCategory[];
};

const initialState: MovieListCreateMovieState = {
  error: null,
  loading: false,
  fetchCategoriesLoading: true,
  categories: [],
};

const MOVIE_LIST_CREATE_MOVIE_SLICE_NAME = 'MOVIE_LIST_CREATE_MOVIE_SLICE';

const movieListCreateMovieSlice = createSlice({
  name: MOVIE_LIST_CREATE_MOVIE_SLICE_NAME,
  initialState,
  reducers: {
    movieCreateInProgress: actions.movieCreateInProgressAction,
    movieCreateSuccess: actions.movieCreateSuccessAction,
    movieCreateError: actions.movieCreateErrorAction,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        movieListBeforeCreateMovieStart.pending.type,
        actions.movieListBeforeCreateMovieInProgressAction
      )
      .addCase(
        movieListBeforeCreateMovieStart.fulfilled.type,
        actions.movieListBeforeCreateMovieSuccessAction
      )
      .addCase(
        movieListBeforeCreateMovieStart.rejected.type,
        actions.movieListBeforeCreateMovieErrorAction
      );
  },
});

export const { movieCreateInProgress, movieCreateSuccess, movieCreateError } =
  movieListCreateMovieSlice.actions;

export default movieListCreateMovieSlice.reducer;
