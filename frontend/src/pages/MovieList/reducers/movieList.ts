import { combineReducers } from '@reduxjs/toolkit';
import movieListFetchReducer from './movieListFetch';
import movieListGetCategoriesReducer from './movieListGetCategories';
import movieListCreateCategoryReducer from './movieListCreateCategory';
import movieListCreateMovieReducer from './movieListCreateMovie';
import movieListCompareViewReducer from './movieListCompareView';

const movieListReducer = combineReducers({
  movieListFetch: movieListFetchReducer,
  movieListGetCategories: movieListGetCategoriesReducer,
  movieListCreateCategory: movieListCreateCategoryReducer,
  movieListCreateMovie: movieListCreateMovieReducer,
  movieListCompareView: movieListCompareViewReducer,
});

export default movieListReducer;
