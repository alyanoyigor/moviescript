import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';

import { Preloader } from '../../components/Preloader';
import { useAppDispatch } from '../../store';

import { movieListFetchSelector } from './selectors/movieList';
import { MovieItem } from './components/MovieItem';
import { movieListFetchStart } from './thunks/movieList';
import { MovieListControls } from './components/MovieListControls';
import { StyledListWrapper } from './styled';

export const MovieList = () => {
  const [paginateLoading, setPaginateLoading] = useState(false);

  const { data, loading, error } = useSelector(movieListFetchSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(movieListFetchStart());
  }, [dispatch]);

  return (
    <>
      <MovieListControls />
      {data.length > 0 && (
        <StyledListWrapper>
          {data.map((movie) => (
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
    </>
  );
};
