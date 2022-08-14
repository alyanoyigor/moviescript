import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { Preloader } from '../../components/Preloader';
import { MovieItem } from './components/MovieItem';
import { MovieListControls } from './components/MovieListControls';
import { StyledListWrapper } from './styled';

export const MovieList = () => {
  const [count, setCount] = useState(6);
  const [paginateLoading, setPaginateLoading] = useState(false);

  const handleShowMore = () => {
    setPaginateLoading(true);
    setTimeout(() => {
      setCount((prevCount) => prevCount + 6);
      setPaginateLoading(false);
    }, 1500);
  };

  return (
    <>
      <MovieListControls />
      <StyledListWrapper>
        {Array.from(Array(count), (_, index) => (
          <MovieItem key={index} />
        ))}
      </StyledListWrapper>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={64}
      >
        {paginateLoading && <Preloader />}
        {!paginateLoading && (
          <Button
            sx={{ height: '42px' }}
            variant="contained"
            onClick={handleShowMore}
          >
            Show more
          </Button>
        )}
      </Box>
    </>
  );
};
