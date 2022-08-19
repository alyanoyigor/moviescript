import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../store';
import { modalClose } from '../../store/modal/reducer/modal';
import { MODAL_NAME } from '../../store/modal/constants/modal';
import { modalSelector } from '../../store/modal/selectors/modal';
import { MovieCategoryUserInput, Position, MovieUserInput } from '../../types';

import { Preloader } from '../../components/Preloader';
import { Error } from '../../components/Error';
import { CenterContainer } from '../../components/CenterContainer';

import { movieListFetchSelector } from './selectors/movieListFetch';
import { movieListCreateCategorySelector } from './selectors/movieListCreateCategory';
import {
  movieListCreateMovieSelector,
  movieListCreateMovieFetchCategoriesSelector,
} from './selectors/movieListCreateMovie';

import { movieListFetchStart } from './thunks/movieListFetch';
import { movieListCreateMovieStart } from './thunks/movieListCreateMovie';
import { movieListCreateCategoryStart } from './thunks/movieListCreateCategory';

import { MovieItem } from './components/MovieItem';
import { MovieListControls } from './components/MovieListControls';
import { MovieListSkeleton } from './components/MovieListSkeleton';
import { ModalCategoryCreate } from './components/ModalCategoryCreate';
import { ModalMovieCreate } from './components/ModalMovieCreate';

import { StyledListWrapper } from './styled';

export const MovieList = () => {
  const [paginateLoading, setPaginateLoading] = useState(false);

  const { data: movies, loading, error } = useSelector(movieListFetchSelector);
  const { loading: categoryCreateLoading } = useSelector(
    movieListCreateCategorySelector
  );
  const { loading: movieCreateLoading } = useSelector(
    movieListCreateMovieSelector
  );
  const { fetchCategoriesLoading, categories } = useSelector(
    movieListCreateMovieFetchCategoriesSelector
  );
  const { open, name } = useSelector(modalSelector);

  const dispatch = useAppDispatch();

  const handleModalClose = useCallback(() => {
    dispatch(modalClose());
  }, [dispatch]);

  const handleCreateCategorySubmit = useCallback(
    (category: MovieCategoryUserInput) => {
      dispatch(movieListCreateCategoryStart({ category }));
    },
    [dispatch]
  );

  const handleCreateMovieSubmit = useCallback(
    (movie: MovieUserInput) => {
      dispatch(movieListCreateMovieStart({ movie }));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(movieListFetchStart());
  }, [dispatch]);

  return (
    <>
      {loading && !error && movies.length > 0 && (
        <CenterContainer position={Position.fixed}>
          <Preloader width={96} height={96} />
        </CenterContainer>
      )}
      {!error && <MovieListControls />}
      {loading && !error && movies.length === 0 && (
        <MovieListSkeleton moviesCount={8} />
      )}
      {!error && (
        <>
          {movies.length > 0 && (
            <StyledListWrapper>
              {movies.map((movie) => (
                <MovieItem
                  key={movie._id}
                  title={movie.title}
                  releaseDate={movie.releaseDate}
                  movieId={movie._id}
                  imagePath={movie.imagePath}
                />
              ))}
            </StyledListWrapper>
          )}
          {movies.length === 0 && !loading && <h1>Nothing was found</h1>}
        </>
      )}
      {movies.length >= 8 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={64}
        >
          {paginateLoading && <Preloader />}
          {!paginateLoading && (
            <Button sx={{ height: '42px' }} variant="contained">
              Show more
            </Button>
          )}
        </Box>
      )}
      {error && !loading && <Error>{error}</Error>}
      <ModalCategoryCreate
        open={open && name === MODAL_NAME.CATEGORY_CREATE}
        loading={categoryCreateLoading}
        handleClose={handleModalClose}
        handleCreateCategory={handleCreateCategorySubmit}
      />
      <ModalMovieCreate
        open={open && name === MODAL_NAME.MOVIE_CREATE}
        loading={movieCreateLoading}
        categories={categories}
        fetchCategoriesLoading={fetchCategoriesLoading}
        handleClose={handleModalClose}
        handleCreateMovie={handleCreateMovieSubmit}
      />
    </>
  );
};
