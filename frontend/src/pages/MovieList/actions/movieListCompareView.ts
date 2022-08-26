import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Movie } from '../../../types';
import { MovieListCompareViewState } from '../reducers/movieListCompareView';

export const movieListCompareViewAddMovieAction = (
  state: MovieListCompareViewState,
  action: PayloadAction<{ id: string }>
) => {
  const { id } = action.payload;

  if (state.compareMovieIds.length === state.limit) {
    toast.error(
      'Not enough space, please delete some movies from compare view and try again!'
    );
  } else {
    state.compareMovieIds = [...state.compareMovieIds, id];
    toast.success('Movie added to compare view successfully!');
  }
};

export const movieListCompareViewRemoveMovieAction = (
  state: MovieListCompareViewState,
  action: PayloadAction<{ id: string }>
) => {
  const { id } = action.payload;

  state.compareMovieIds = state.compareMovieIds.filter(
    (compareMovie) => compareMovie !== id
  );
  toast.success('Movie deleted from compare view successfully!');
};

export const movieListCompareViewGetMoviesInProgressAction = (
  state: MovieListCompareViewState
) => {
  state.loading = true;
  state.error = null;
};

export const movieListCompareViewGetMoviesSuccessAction = (
  state: MovieListCompareViewState,
  action: PayloadAction<{ movies: Movie[] }>
) => {
  const { movies } = action.payload;
  state.movies = movies;
  state.loading = false;
};

export const movieListCompareViewGetMoviesErrorAction = (
  state: MovieListCompareViewState,
  action: PayloadAction<{ error: string }>
) => {
  const { error } = action.payload;
  state.error = error;
  state.loading = false;
};
