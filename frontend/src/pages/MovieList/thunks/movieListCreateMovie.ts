import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { MovieUserInput, MovieCategory } from '../../../types';
import { AppDispatch } from '../../../store';
import { createMovie } from '../../../api/movies';
import { getCategories } from '../../../api/categories';
import { modalClose } from '../../../store/modal/reducer/modal';
import {
  movieCreateInProgress,
  movieCreateError,
  movieCreateSuccess,
} from '../reducers/movieListCreateMovie';
import { movieListGetCategoriesStart } from './movieListGetCategories';

const MOVIE_LIST_CREATE_MOVIE_START_TYPE = 'MOVIE_LIST_CREATE_MOVIE_START';

export const movieListCreateMovieStart = createAsyncThunk<
  void,
  { movie: MovieUserInput },
  { dispatch: AppDispatch }
>(MOVIE_LIST_CREATE_MOVIE_START_TYPE, async (data, { dispatch }) => {
  try {
    const { movie } = data;
    dispatch(movieCreateInProgress());

    await createMovie(movie);
    dispatch(movieCreateSuccess());

    dispatch(modalClose());
    await dispatch(movieListGetCategoriesStart());
    toast.success('Movie created successfully!');
  } catch (error) {
    dispatch(movieCreateError({ error: error as string }));
    toast.error(error as string);
  }
});

const MOVIE_LIST_BEFORE_CREATE_MOVIE_START_TYPE =
  'MOVIE_LIST_BEFORE_CREATE_MOVIE_START';

export const movieListBeforeCreateMovieStart = createAsyncThunk<
  { data: MovieCategory[] },
  never
>(
  MOVIE_LIST_BEFORE_CREATE_MOVIE_START_TYPE,
  async (_data, { rejectWithValue }) => {
    try {
      const categories = await getCategories();
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return { data: categories };
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);
