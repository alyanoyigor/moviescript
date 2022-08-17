import { MovieCategory, MovieCategoryUserInput } from '../types';
import client from './client';

export const getCategories = async () => {
  try {
    return await client.get<never, MovieCategory[]>('/categories');
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createCategory = async (category: MovieCategoryUserInput) => {
  try {
    return await client.post<never, MovieCategory>('/categories', category);
  } catch (error) {
    return Promise.reject(error);
  }
};
