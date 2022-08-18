import { combineReducers } from '@reduxjs/toolkit';
import movieListFetchReducer from './movieListFetch';
import movieListGetCategoriesReducer from './movieListGetCategories';
import movieListCreateCategoryReducer from './movieListCreateCategory';

const movieListReducer = combineReducers({
  movieListFetch: movieListFetchReducer,
  movieListGetCategories: movieListGetCategoriesReducer,
  movieListCreateCategory: movieListCreateCategoryReducer,
});

export default movieListReducer;
