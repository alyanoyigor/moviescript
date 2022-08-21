import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMovies } from '../../../api/movies';
import { Movie, MovieQueries } from '../../../types';

const MOVIE_LIST_FETCH_START_TYPE = 'MOVIE_LIST_FETCH_START';

export const movieListFetchStart = createAsyncThunk<
  { data: Movie[] },
  MovieQueries | undefined
>(MOVIE_LIST_FETCH_START_TYPE, async (queries, { rejectWithValue }) => {
  try {
    const movieList = await getMovies(queries);
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    return { data: movieList };
  } catch (error) {
    return rejectWithValue({ error });
  }
});
