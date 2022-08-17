import { createSlice } from '@reduxjs/toolkit';

import { MovieCategory } from '../../../types';
import * as actions from '../actions/movieListCreateCategory';

export type MovieListCreateCategoryState = {
  data: MovieCategory | Record<string, never>;
  error: string | null;
  loading: boolean;
};

const initialState: MovieListCreateCategoryState = {
  data: {},
  error: null,
  loading: true,
};

const MOVIE_LIST_CREATE_CATEGORY_SLICE_NAME =
  'MOVIE_LIST_CREATE_CATEGORY_SLICE';

const movieListCreateCategorySlice = createSlice({
  name: MOVIE_LIST_CREATE_CATEGORY_SLICE_NAME,
  initialState,
  reducers: {
    categoryCreateInProgress: actions.categoryCreateInProgressAction,
    categoryCreateSuccess: actions.categoryCreateSuccessAction,
    categoryCreateError: actions.categoryCreateErrorAction,
  },
});

export const {
  categoryCreateInProgress,
  categoryCreateSuccess,
  categoryCreateError,
} = movieListCreateCategorySlice.actions;

export default movieListCreateCategorySlice.reducer;
