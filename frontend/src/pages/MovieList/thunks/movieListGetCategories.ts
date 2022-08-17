import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories } from '../../../api/categories';
import { MovieCategory } from '../../../types';

const MOVIE_LIST_GET_CATEGORIES_START_NAME = 'MOVIE_LIST_GET_CATEGORIES_START';

export const movieListGetCategoriesStart = createAsyncThunk<
  { data: MovieCategory[] },
  never
>(MOVIE_LIST_GET_CATEGORIES_START_NAME, async (_data, { rejectWithValue }) => {
  try {
    const movieList = await getCategories();
    return { data: movieList };
  } catch (error) {
    return rejectWithValue({ error });
  }
});
