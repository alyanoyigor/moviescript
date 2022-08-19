import { combineReducers } from '@reduxjs/toolkit';
import movieListFetchReducer from './movieListFetch';
import movieListGetCategoriesReducer from './movieListGetCategories';
import movieListCreateCategoryReducer from './movieListCreateCategory';
import movieListCreateMovieReducer from './movieListCreateMovie';

const movieListReducer = combineReducers({
  movieListFetch: movieListFetchReducer,
  movieListGetCategories: movieListGetCategoriesReducer,
  movieListCreateCategory: movieListCreateCategoryReducer,
  movieListCreateMovie: movieListCreateMovieReducer,
});

export default movieListReducer;
