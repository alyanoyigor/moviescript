import { Movie, MovieQueries } from '../types';
import client from './client';

export const getMovies = async (queries?: MovieQueries) => {
  try {
    return await client.get<never, { movies: Movie[]; allMoviesCount: number }>(
      '/movies',
      { params: queries }
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getMovie = async (id: string) => {
  try {
    return await client.get<never, Movie>(`/movies/${id}`);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateMovie = async ({
  id,
  movie,
}: {
  id: string;
  movie: Partial<Movie>;
}) => {
  try {
    return await client.patch<never, Movie>(`/movies/${id}`, movie);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createMovie = async (movie: Movie) => {
  try {
    return await client.post<never, Movie>(`/movies`, movie);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createMovieImage = async (image: FormData) => {
  try {
    return await client.post<never, { url: string; id: string }>(
      '/movies/upload',
      image
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateMovieImage = async ({
  id,
  image,
}: {
  id: string;
  image: FormData;
}) => {
  try {
    return await client.patch<never, { url: string }>(
      `/movies/${id}/upload`,
      image
    );
  } catch (error) {
    return Promise.reject(error);
  }
};
