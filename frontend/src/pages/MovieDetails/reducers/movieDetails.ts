import { combineReducers } from '@reduxjs/toolkit';
import movieDetailsFetchReducer from './movieDetailsFetch';
import movieDetailsUpdateMovieReducer from './movieDetailsUpdateMovie';

const movieDetailsReducer = combineReducers({
  movieDetailsFetch: movieDetailsFetchReducer,
  movieDetailsUpdateMovie: movieDetailsUpdateMovieReducer,
});

export default movieDetailsReducer;
