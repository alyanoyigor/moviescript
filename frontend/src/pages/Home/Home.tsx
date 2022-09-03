import { Button } from '@mui/material';
import React, { Suspense } from 'react';
import {
  StyledHomeBody,
  StyledHomeWrapper,
  StyledTitle,
  StyledLink,
  StyledSkeleton,
} from './styled';

const MovieTrailer = React.lazy(() =>
  import('./components/MovieTrailer').then((module) => ({
    default: module.MovieTrailer,
  }))
);

export const Home = () => {
  return (
    <StyledHomeWrapper>
      <StyledHomeBody>
        <StyledTitle>Unlimited movies, TV shows, and more</StyledTitle>
        <div>
          <StyledLink to="/movies">
            <Button variant="contained" size="large">
              Find movie
            </Button>
          </StyledLink>
        </div>
      </StyledHomeBody>
      <Suspense
        fallback={
          <StyledSkeleton
            sx={{ bgcolor: 'grey.900' }}
            animation="wave"
            variant="rectangular"
          />
        }
      >
        <MovieTrailer />
      </Suspense>
    </StyledHomeWrapper>
  );
};
