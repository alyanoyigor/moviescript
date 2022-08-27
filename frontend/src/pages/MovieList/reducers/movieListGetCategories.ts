import { createSlice } from '@reduxjs/toolkit';

import { MovieCategory } from 'types';
import * as actions from '../actions/movieListGetCategories';
import { movieListGetCategoriesStart } from '../thunks/movieListGetCategories';

export type MovieListGetCategoriesState = {
  data: MovieCategory[];
  error: string | null;
  loading: boolean;
};

const initialState: MovieListGetCategoriesState = {
  data: [],
  error: null,
  loading: true,
};

const MOVIE_LIST_GET_CATEGORIES_SLICE_NAME = 'MOVIE_LIST_GET_CATEGORIES_SLICE';

const movieListGetCategoriesSlice = createSlice({
  name: MOVIE_LIST_GET_CATEGORIES_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        movieListGetCategoriesStart.pending.type,
        actions.movieListGetCategoriesInProgressAction
      )
      .addCase(
        movieListGetCategoriesStart.fulfilled.type,
        actions.movieListGetCategoriesSuccessAction
      )
      .addCase(
        movieListGetCategoriesStart.rejected.type,
        actions.movieListGetCategoriesErrorAction
      );
  },
});

export default movieListGetCategoriesSlice.reducer;
