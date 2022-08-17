import { Movie, MovieCategory } from '../types';
import client from './client';

export const getMovies = async () => {
  try {
    return await client.get<never, Movie[]>('/movies');
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCategories = async () => {
  try {
    return await client.get<never, MovieCategory[]>('/categories');
  } catch (error) {
    return Promise.reject(error);
  }
};
