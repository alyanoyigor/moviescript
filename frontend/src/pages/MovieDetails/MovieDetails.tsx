import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from 'react-redux';

import { Preloader } from '../../components/Preloader';
import { CenterContainer } from '../../components/CenterContainer';
import { Position } from '../../types';
import { useAppDispatch } from '../../store';
import { movieFetchStart } from './thunks/movieDetails';
import { movieSelector } from './selectors/movieDetails';
import {
  StyledBackButton,
  StyledContainer,
  StyledDescriptionTitle,
  StyledImage,
  StyledImageWrapper,
  StyledMovieContent,
  StyledMovieKey,
  StyledMovieTitle,
  StyledMovieValue,
} from './styled';

export const MovieDetails = () => {
  const { id: movieId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: movie, loading, error } = useSelector(movieSelector);

  useEffect(() => {
    if (movieId) {
      dispatch(movieFetchStart({ id: movieId }));
    }
  }, [dispatch, movieId]);

  return (
    <>
      {loading && !error && (
        <CenterContainer position={Position.fixed}>
          <Preloader width={96} height={96} />
        </CenterContainer>
      )}
      <StyledContainer>
        <StyledBackButton
          variant="outlined"
          color="light"
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </StyledBackButton>
        {movie && !loading && !error && (
          <>
            <StyledImageWrapper>
              <StyledImage src={movie.imagePath} alt="" />
            </StyledImageWrapper>
            <StyledMovieContent>
              <StyledMovieTitle>{movie.title}</StyledMovieTitle>
              <Box
                display="flex"
                alignItems="flex-end"
                gap="32px"
                marginBottom="24px"
              >
                <Box>
                  <StyledMovieKey>Release date:</StyledMovieKey>
                </Box>
                <Box>
                  <StyledMovieValue>{movie.releaseDate}</StyledMovieValue>
                </Box>
              </Box>
              <Box marginBottom="36px">
                <StyledDescriptionTitle>
                  Film description:
                </StyledDescriptionTitle>
                <StyledMovieValue>{movie.description}</StyledMovieValue>
              </Box>
              <Button variant="contained">Edit Movie</Button>
            </StyledMovieContent>
          </>
        )}
      </StyledContainer>
    </>
  );
};
