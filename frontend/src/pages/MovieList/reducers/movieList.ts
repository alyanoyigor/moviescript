import { combineReducers } from '@reduxjs/toolkit';
import movieListFetchReducer from './movieListFetch';
import movieListGetCategoriesReducer from './movieListGetCategories';

const movieListReducer = combineReducers({
  movieListFetch: movieListFetchReducer,
  movieListGetCategories: movieListGetCategoriesReducer,
});

export default movieListReducer;
