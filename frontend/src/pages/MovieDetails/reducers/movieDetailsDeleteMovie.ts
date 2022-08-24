import { createSlice } from '@reduxjs/toolkit';
import * as actions from '../actions/movieDetailsDeleteMovie';

export type MovieDetailsDeleteMovieState = {
  error: string | null;
  loading: boolean;
};

const initialState: MovieDetailsDeleteMovieState = {
  error: null,
  loading: false,
};

const MOVIE_DETAILS_DELETE_MOVIE_SLICE_NAME =
  'MOVIE_DETAILS_DELETE_MOVIE_SLICE';

const movieDetailsDeleteMovieSlice = createSlice({
  name: MOVIE_DETAILS_DELETE_MOVIE_SLICE_NAME,
  initialState,
  reducers: {
    movieDeleteInProgress: actions.movieDeleteInProgressAction,
    movieDeleteSuccess: actions.movieDeleteSuccessAction,
    movieDeleteError: actions.movieDeleteErrorAction,
  },
});

export const { movieDeleteInProgress, movieDeleteSuccess, movieDeleteError } =
  movieDetailsDeleteMovieSlice.actions;

export default movieDetailsDeleteMovieSlice.reducer;
