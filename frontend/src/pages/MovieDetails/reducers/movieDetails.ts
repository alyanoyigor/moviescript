import { createSlice } from '@reduxjs/toolkit';
import { movieFetchStart } from '../thunks/movieDetails';

import { Movie } from '../../../types';
import * as actions from '../actions/movieDetails';

export type MovieDetailsState = {
  data: Movie | Record<string, never>;
  error: string | null;
  loading: boolean;
};

const initialState: MovieDetailsState = {
  data: {},
  error: null,
  loading: true,
};

const MOVIE_DETAILS_SLICE_NAME = 'MOVIE_DETAILS_SLICE';

const movieDetailsSlice = createSlice({
  name: MOVIE_DETAILS_SLICE_NAME,
  initialState,
  reducers: {
    movieDetailsResetData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(movieFetchStart.pending.type, actions.movieFetchInProgressAction)
      .addCase(movieFetchStart.fulfilled.type, actions.movieFetchSuccessAction)
      .addCase(movieFetchStart.rejected.type, actions.movieFetchErrorAction);
  },
});

export const { movieDetailsResetData } = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;
