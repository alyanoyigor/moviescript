import { Movie, MovieUserInput, MovieQueries } from '../types';
import client from './client';

export const getMovies = async (queries?: MovieQueries) => {
  try {
    return await client.get<never, Movie[]>('/movies', { params: queries });
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

export const createMovie = async (movie: MovieUserInput) => {
  try {
    return await client.post<never, Movie>(`/movies`, movie);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createMovieImage = async (image: FormData) => {
  try {
    return await client.post<never, { url: string }>('/movies/upload', image);
  } catch (error) {
    return Promise.reject(error);
  }
};
