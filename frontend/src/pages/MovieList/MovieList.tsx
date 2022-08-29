import React, { useCallback, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'store';
import { modalClose } from 'store/modal/reducer/modal';
import { MODAL_NAME } from 'store/modal/constants/modal';
import { modalSelector } from 'store/modal/selectors/modal';
import { MovieCategoryUserInput, Position, MovieFormSchema } from 'types';
import NothingFoundMovies from 'assets/gif/nothing-found-movies.gif';

import { Preloader } from 'components/Preloader';
import { Error } from 'components/Error';
import { CenterContainer } from 'components/CenterContainer';
import { setQueries } from 'utils/setQueries';
import { getQueries } from 'utils/getQueries';

import { movieListFetchSelector } from './selectors/movieListFetch';
import { movieListCreateCategorySelector } from './selectors/movieListCreateCategory';
import {
  movieListCreateMovieSelector,
  movieListCreateMovieFetchCategoriesSelector,
} from './selectors/movieListCreateMovie';
import {
  movieListCompareViewFetchSelector,
  movieListCompareViewSelector,
} from './selectors/movieListCompareView';
import {
  movieListAddQuery,
  movieListResetData,
  movieListSetQueries,
} from './reducers/movieListFetch';
import {
  movieListCompareViewAddMovie,
  movieListCompareViewRemoveMovie,
} from './reducers/movieListCompareView';

import { movieListFetchStart } from './thunks/movieListFetch';
import { movieListCreateMovieStart } from './thunks/movieListCreateMovie';
import { movieListCreateCategoryStart } from './thunks/movieListCreateCategory';

import { MovieItem } from './components/MovieItem';
import { MovieListControls } from './components/MovieListControls';
import { MovieListSkeleton } from './components/MovieListSkeleton';
import { ModalCategoryCreate } from './components/ModalCategoryCreate';
import { ModalMovieCreate } from './components/ModalMovieCreate';
import { ModalMovieCompareView } from './components/ModalMovieCompareView';

import { StyledListWrapper, StyledNothingFoundImage } from './styled';

export const MovieList = () => {
  const {
    data: movies,
    loading,
    error,
    count,
    queries,
  } = useSelector(movieListFetchSelector);

  const OFFSET_LIMIT = 8;
  const limit = Number(queries.limit) || OFFSET_LIMIT;

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
  const compareMovieIds = useSelector(movieListCompareViewSelector);
  const {
    compareMovies,
    loading: compareMoviesLoading,
    error: compareMoviesError,
  } = useSelector(movieListCompareViewFetchSelector);

  const dispatch = useAppDispatch();

  const handleToggleCompareMovie = useCallback(
    (id: string) => {
      if (compareMovieIds.indexOf(id) > -1) {
        dispatch(movieListCompareViewRemoveMovie({ id }));
      } else {
        dispatch(movieListCompareViewAddMovie({ id }));
      }
    },
    [compareMovieIds, dispatch]
  );

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
    (movie: MovieFormSchema) => {
      dispatch(movieListCreateMovieStart({ movie }));
    },
    [dispatch]
  );

  const handleBeforeUnload = useCallback(() => {
    localStorage.setItem('compareMovies', compareMovieIds.join(','));
  }, [compareMovieIds]);

  const onClickShowMoreMovies = () => {
    let limit = Number(queries.limit) || OFFSET_LIMIT;

    if (limit < OFFSET_LIMIT) {
      limit = OFFSET_LIMIT;
    }

    limit = limit + OFFSET_LIMIT;

    if (typeof count === 'number' && Number(queries.limit) >= count) {
      limit = Number(queries.limit);
    }
    const query = { name: 'limit', value: String(limit) };
    dispatch(movieListAddQuery({ query }));
    setQueries(query);
    dispatch(movieListFetchStart());
  };

  useEffect(() => {
    dispatch(movieListSetQueries({ queries: getQueries() }));
    dispatch(movieListFetchStart());

    return () => {
      dispatch(movieListResetData());
    };
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

  return (
    <>
      {loading && !error && movies.length > 0 && (
        <CenterContainer position={Position.fixed}>
          <Preloader width={96} height={96} />
        </CenterContainer>
      )}
      {!error && <MovieListControls queries={queries} />}
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
                  compareMovieIds={compareMovieIds}
                  handleToggleCompareMovie={handleToggleCompareMovie}
                />
              ))}
            </StyledListWrapper>
          )}
          {movies.length === 0 && !loading && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h6" component="p">
                Sorry, we tried, but nothing was found
              </Typography>
              <StyledNothingFoundImage
                src={NothingFoundMovies}
                alt="Nothing was found"
              />
            </Box>
          )}
        </>
      )}
      {movies.length >= OFFSET_LIMIT && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={64}
        >
          {typeof count === 'number' && limit < count && (
            <Button
              sx={{ height: '42px' }}
              variant="contained"
              onClick={onClickShowMoreMovies}
            >
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
      <ModalMovieCompareView
        open={open && name === MODAL_NAME.MOVIE_COMPARE_VIEW}
        handleClose={handleModalClose}
        movies={compareMovies}
        loading={compareMoviesLoading}
        error={compareMoviesError}
      />
    </>
  );
};
