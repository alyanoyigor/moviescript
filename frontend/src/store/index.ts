import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import movieListReducer from '../pages/MovieList/reducers/movieList';

const rootReducer = combineReducers({
  movieList: movieListReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
