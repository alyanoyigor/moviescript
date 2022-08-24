import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMovie } from '../../../api/movies';
import { Movie } from '../../../types';

const BOOK_ITEM_FETCH_START_PREFIX = 'BOOK_ITEM_FETCH_START';

export const movieDetailsFetchStart = createAsyncThunk<
  { data: Movie },
  { id: string }
>(BOOK_ITEM_FETCH_START_PREFIX, async (data, { rejectWithValue }) => {
  try {
    const { id } = data;
    const movie = await getMovie(id);

    return { data: movie };
  } catch (error) {
    return rejectWithValue({ error });
  }
});
