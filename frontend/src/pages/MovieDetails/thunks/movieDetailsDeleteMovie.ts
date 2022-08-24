import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { AppDispatch } from '../../../store';
import { deleteMovie } from '../../../api/movies';
import { modalClose } from '../../../store/modal/reducer/modal';
import {
  movieDeleteInProgress,
  movieDeleteError,
  movieDeleteSuccess,
} from '../reducers/movieDetailsDeleteMovie';

const MOVIE_DETAILS_DELETE_MOVIE_START_TYPE =
  'MOVIE_DETAILS_DELETE_MOVIE_START';

export const movieDetailsDeleteMovieStart = createAsyncThunk<
  void,
  { id: string },
  { dispatch: AppDispatch }
>(MOVIE_DETAILS_DELETE_MOVIE_START_TYPE, async ({ id }, { dispatch }) => {
  try {
    dispatch(movieDeleteInProgress());
    await deleteMovie(id);
    dispatch(movieDeleteSuccess());

    dispatch(modalClose());
    toast.success('Movie deleted successfully!');
    window.history.back();
  } catch (error) {
    dispatch(movieDeleteError({ error: error as string }));
    toast.error(error as string);
  }
});
