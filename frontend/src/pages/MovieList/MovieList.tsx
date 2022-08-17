import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';

import { Preloader } from '../../components/Preloader';
import { useAppDispatch } from '../../store';

import { movieListFetchSelector } from './selectors/movieListFetch';
import { MovieItem } from './components/MovieItem';
import { movieListFetchStart } from './thunks/movieListFetch';
import { MovieListControls } from './components/MovieListControls';
import { MovieListSkeleton } from './components/MovieListSkeleton';
import { StyledListWrapper, StyledCenterContainer } from './styled';

export const MovieList = () => {
  const [paginateLoading, setPaginateLoading] = useState(false);

  const { data: movies, loading, error } = useSelector(movieListFetchSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(movieListFetchStart());
  }, [dispatch]);

  return (
    <>
      {loading && !error && movies.length > 0 && (
        <StyledCenterContainer>
          <Preloader width={96} height={96} />
        </StyledCenterContainer>
      )}
      <MovieListControls />
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
    </>
  );
};
