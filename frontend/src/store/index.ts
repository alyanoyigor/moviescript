import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import movieDetailsReducer from '../pages/MovieDetails/reducers/movieDetails';
import movieListReducer from '../pages/MovieList/reducers/movieList';
import modalReducer from './modal/reducer/modal';
import authReducer from './auth/reducer/auth';

const rootReducer = combineReducers({
  movieList: movieListReducer,
  movieDetails: movieDetailsReducer,
  auth: authReducer,
  modal: modalReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
