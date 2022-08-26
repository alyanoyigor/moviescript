import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMovie } from '../../../api/movies';
import { Movie } from '../../../types';

const MOVIE_LIST_COMPARE_VIEW_GET_MOVIES_PREFIX =
  'MOVIE_LIST_COMPARE_VIEW_GET_MOVIES';

export const movieListCompareViewGetMoviesStart = createAsyncThunk<
  { movies: Movie[] },
  { movieIdList: string[] }
>(
  MOVIE_LIST_COMPARE_VIEW_GET_MOVIES_PREFIX,
  async ({ movieIdList }, { rejectWithValue }) => {
    try {
      const promises = movieIdList.map((movieId) => getMovie(movieId));
      const settledMovies = await Promise.allSettled(promises);
      const movies = settledMovies.reduce(
        (accumulate: Movie[], movie) =>
          movie.status === 'fulfilled'
            ? [...accumulate, movie.value]
            : accumulate,
        []
      );
      return { movies };
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);
