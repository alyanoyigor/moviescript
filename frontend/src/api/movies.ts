import { Movie } from '../types';
import client from './client';

export const getMovies = async () => {
  try {
    return await client.get<never, Movie[]>('/movies');
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
