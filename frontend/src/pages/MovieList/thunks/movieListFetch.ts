import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMovies } from '../../../api/movies';
import { Movie, MoviesQuery } from '../../../types';

const MOVIE_LIST_FETCH_START_TYPE = 'MOVIE_LIST_FETCH_START';

export const movieListFetchStart = createAsyncThunk<
  { data: Movie[] },
  MoviesQuery | undefined
>(MOVIE_LIST_FETCH_START_TYPE, async (queries, { rejectWithValue }) => {
  try {
    const movieList = await getMovies(queries);

    return { data: movieList };
  } catch (error) {
    return rejectWithValue({ error });
  }
});
