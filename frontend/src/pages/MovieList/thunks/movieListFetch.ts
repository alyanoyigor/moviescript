import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMovies } from '../../../api/movies';
import { Movie } from '../../../types';

const MOVIE_LIST_FETCH_START_TYPE = 'MOVIE_LIST_FETCH_START';

export const movieListFetchStart = createAsyncThunk<{ data: Movie[] }, never>(
  MOVIE_LIST_FETCH_START_TYPE,
  async (_data, { rejectWithValue }) => {
    try {
      const movieList = await getMovies();

      return { data: movieList };
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);
