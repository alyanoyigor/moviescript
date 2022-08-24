import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { MovieFormSchema, MovieCategory, Movie } from '../../../types';
import { AppDispatch } from '../../../store';
import { updateMovie, updateMovieImage } from '../../../api/movies';
import { getCategories } from '../../../api/categories';
import { getMovie } from '../../../api/movies';
import { modalClose } from '../../../store/modal/reducer/modal';
import {
  movieUpdateInProgress,
  movieUpdateError,
  movieUpdateSuccess,
} from '../reducers/movieDetailsUpdateMovie';
import { movieDetailsFetchStart } from './movieDetailsFetch';

const MOVIE_DETAILS_UPDATE_MOVIE_START_TYPE =
  'MOVIE_DETAILS_UPDATE_MOVIE_START';

export const movieDetailsUpdateMovieStart = createAsyncThunk<
  void,
  { movie: MovieFormSchema; id: string },
  { dispatch: AppDispatch }
>(MOVIE_DETAILS_UPDATE_MOVIE_START_TYPE, async (data, { dispatch }) => {
  try {
    const { id, movie } = data;

    const updatedMovie = {
      title: movie.title,
      description: movie.description,
      duration: movie.duration,
      releaseDate: movie.releaseDate,
      grade: movie.grade,
    } as Partial<Movie>;

    if (movie.categories && movie.fetchCategories) {
      updatedMovie.categories = movie.fetchCategories.filter((category) =>
        movie.categories.includes(category.name)
      );
    }

    if (movie.imagePath.length > 0) {
      const file = movie.imagePath[0];
      const formData = new FormData();
      formData.append('file', file);

      await updateMovieImage({ id, image: formData });
      const image = await updateMovieImage({ id, image: formData });
      updatedMovie.imagePath = image.url;
    }

    dispatch(movieUpdateInProgress());
    await updateMovie({ id, movie: updatedMovie });
    dispatch(movieUpdateSuccess());

    dispatch(modalClose());
    await dispatch(movieDetailsFetchStart({ id }));
    toast.success('Movie updated successfully!');
  } catch (error) {
    dispatch(movieUpdateError({ error: error as string }));
    toast.error(error as string);
  }
});

const MOVIE_DETAILS_BEFORE_UPDATE_MOVIE_START_TYPE =
  'MOVIE_DETAILS_BEFORE_UPDATE_MOVIE_START';

export const movieDetailsBeforeUpdateMovieStart = createAsyncThunk<
  { categories: MovieCategory[]; movie: Movie },
  { id: string }
>(
  MOVIE_DETAILS_BEFORE_UPDATE_MOVIE_START_TYPE,
  async ({ id }, { rejectWithValue }) => {
    try {
      const categories = await getCategories();
      const movie = await getMovie(id);

      return { categories, movie };
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);
