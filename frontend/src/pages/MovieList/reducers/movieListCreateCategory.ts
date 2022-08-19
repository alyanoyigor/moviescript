import { createSlice } from '@reduxjs/toolkit';

import * as actions from '../actions/movieListCreateCategory';

export type MovieListCreateCategoryState = {
  error: string | null;
  loading: boolean;
};

const initialState: MovieListCreateCategoryState = {
  error: null,
  loading: false,
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
