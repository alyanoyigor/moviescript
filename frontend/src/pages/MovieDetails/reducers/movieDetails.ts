import { combineReducers } from '@reduxjs/toolkit';
import movieDetailsFetchReducer from './movieDetailsFetch';
import movieDetailsUpdateMovieReducer from './movieDetailsUpdateMovie';
import movieDetailsDeleteMovieReducer from './movieDetailsDeleteMovie';

const movieDetailsReducer = combineReducers({
  movieDetailsFetch: movieDetailsFetchReducer,
  movieDetailsUpdateMovie: movieDetailsUpdateMovieReducer,
  movieDetailsDeleteMovie: movieDetailsDeleteMovieReducer,
});

export default movieDetailsReducer;
