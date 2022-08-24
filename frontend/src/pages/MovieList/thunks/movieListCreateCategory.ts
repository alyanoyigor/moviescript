import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { MovieCategoryUserInput } from '../../../types';
import { AppDispatch } from '../../../store';
import { createCategory } from '../../../api/categories';
import { modalClose } from '../../../store/modal/reducer/modal';
import {
  categoryCreateInProgress,
  categoryCreateError,
  categoryCreateSuccess,
} from '../reducers/movieListCreateCategory';
import { movieListGetCategoriesStart } from './movieListGetCategories';

const MOVIE_LIST_CREATE_CATEGORY_START_TYPE =
  'MOVIE_LIST_CREATE_CATEGORY_START';

export const movieListCreateCategoryStart = createAsyncThunk<
  void,
  { category: MovieCategoryUserInput },
  { dispatch: AppDispatch }
>(MOVIE_LIST_CREATE_CATEGORY_START_TYPE, async (data, { dispatch }) => {
  try {
    const { category } = data;
    dispatch(categoryCreateInProgress());

    await createCategory(category);
    dispatch(modalClose());

    dispatch(categoryCreateSuccess());
    await dispatch(movieListGetCategoriesStart());
    toast.success('Category created successfully!');
  } catch (error) {
    dispatch(categoryCreateError({ error: error as string }));
    toast.error(error as string);
  }
});
