import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMovies } from '../../../api/movies';
import { Movie } from '../../../types';
import { getQueries } from '../../../utils/getQueries';

const MOVIE_LIST_FETCH_START_TYPE = 'MOVIE_LIST_FETCH_START';

export const movieListFetchStart = createAsyncThunk<
  { movies: Movie[]; count: number },
  never
>(MOVIE_LIST_FETCH_START_TYPE, async (_, { rejectWithValue }) => {
  try {
    const queries = getQueries();

    const { movies, allMoviesCount } = await getMovies(queries);
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    return { movies, count: allMoviesCount };
  } catch (error) {
    return rejectWithValue({ error });
  }
});
