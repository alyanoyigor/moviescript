import { MovieCategoryUserInput } from './../../../types/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { AppDispatch } from '../../../store';
import { createCategory } from '../../../api/categories';
import { modalClose } from '../../../store/modal/reducer/modal';
import {
  categoryCreateInProgress,
  categoryCreateError,
  categoryCreateSuccess,
} from '../reducers/movieListCreateCategory';
import { movieListGetCategoriesStart } from './movieListGetCategories';

const MOVIE_LIST_CATEGORY_CREATE_START_TYPE =
  'MOVIE_LIST_CATEGORY_CREATE_START';

export const movieListCategoryCreateStart = createAsyncThunk<
  void,
  { category: MovieCategoryUserInput },
  { dispatch: AppDispatch }
>(MOVIE_LIST_CATEGORY_CREATE_START_TYPE, async (data, { dispatch }) => {
  try {
    const { category } = data;
    dispatch(categoryCreateInProgress());

    await createCategory(category);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    dispatch(categoryCreateSuccess());

    dispatch(modalClose());
    await dispatch(movieListGetCategoriesStart());
    toast.success('Category created successfully!');
  } catch (error) {
    dispatch(categoryCreateError({ error: error as string }));
    toast.error(error as string);
  }
});
