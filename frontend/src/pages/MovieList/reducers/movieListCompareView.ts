import { createSlice } from '@reduxjs/toolkit';

import { Movie } from 'types';
import * as actions from '../actions/movieListCompareView';
import { movieListCompareViewGetMoviesStart } from '../thunks/movieListCompareView';

export type MovieListCompareViewState = {
  limit: number;
  error: string | null;
  loading: boolean;
  compareMovieIds: string[];
  movies: Movie[];
};

const getSavedMovieIdList = () => {
  const savedMovieIdList = localStorage.getItem('compareMovies');
  return savedMovieIdList
    ? savedMovieIdList.split(',').map((movieId: string) => movieId)
    : [];
};

const initialState: MovieListCompareViewState = {
  limit: 5,
  error: null,
  loading: true,
  compareMovieIds: getSavedMovieIdList(),
  movies: [],
};

const MOVIE_LIST_COMPARE_VIEW_SLICE_NAME = 'MOVIE_LIST_COMPARE_VIEW_SLICE';

const movieListCompareViewSlice = createSlice({
  name: MOVIE_LIST_COMPARE_VIEW_SLICE_NAME,
  initialState,
  reducers: {
    movieListCompareViewAddMovie: actions.movieListCompareViewAddMovieAction,
    movieListCompareViewRemoveMovie:
      actions.movieListCompareViewRemoveMovieAction,
    movieListCompareViewResetData: () => ({
      ...initialState,
      compareMovieIds: getSavedMovieIdList(),
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        movieListCompareViewGetMoviesStart.pending.type,
        actions.movieListCompareViewGetMoviesInProgressAction
      )
      .addCase(
        movieListCompareViewGetMoviesStart.fulfilled.type,
        actions.movieListCompareViewGetMoviesSuccessAction
      )
      .addCase(
        movieListCompareViewGetMoviesStart.rejected.type,
        actions.movieListCompareViewGetMoviesErrorAction
      );
  },
});

export const {
  movieListCompareViewAddMovie,
  movieListCompareViewRemoveMovie,
  movieListCompareViewResetData,
} = movieListCompareViewSlice.actions;

export default movieListCompareViewSlice.reducer;
