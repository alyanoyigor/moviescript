import React from 'react';
import {
  StyledSkeletonContainer,
  StyledMovieSkeleton,
  StyledMovieSkeletonWrapper,
} from './styled';

type MovieListSkeletonProps = {
  moviesCount: number;
};

export const MovieListSkeleton = (props: MovieListSkeletonProps) => {
  const { moviesCount } = props;

  return (
    <StyledSkeletonContainer>
      {Array.from(Array(moviesCount), (_, index) => (
        <StyledMovieSkeletonWrapper key={index}>
          <StyledMovieSkeleton className="movie-skeleton" />
        </StyledMovieSkeletonWrapper>
      ))}
    </StyledSkeletonContainer>
  );
};
