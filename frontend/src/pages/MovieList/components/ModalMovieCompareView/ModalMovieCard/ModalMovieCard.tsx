import React from 'react';
import dayjs from 'dayjs';
import { Box, Chip, Typography } from '@mui/material';
import {
  CalendarMonth as CalendarMonthIcon,
  Star as StarIcon,
  Timelapse as TimelapseIcon,
} from '@mui/icons-material';

import { Movie } from '../../../../../types';
import {
  StyledImage,
  StyledImageContainer,
  StyledListItem,
  StyledDescription,
  StyledIconContainer,
  StyledTitle,
} from './styled';

type ModalMovieCardProps = {
  movie: Movie;
};

export const ModalMovieCard = (props: ModalMovieCardProps) => {
  const { movie } = props;
  const categories =
    movie.categories.length > 3
      ? movie.categories.slice(0, 3)
      : movie.categories;

  return (
    <StyledListItem>
      <Box width="100%" padding="16px">
        <Box marginBottom="8px">
          <StyledTitle variant="h4" component="h1">
            {movie.title}
          </StyledTitle>
        </Box>
        <Box marginBottom="16px" display="flex" flexWrap="wrap" gap="8px">
          {categories.map((category) => (
            <Chip color="secondary" key={category._id} label={category.name} />
          ))}
        </Box>
        <Box marginBottom="16px">
          <StyledDescription variant="body1" component="p">
            {movie.description}
          </StyledDescription>
        </Box>
        <Box display="flex" justifyContent="space-around" flexWrap="wrap">
          <StyledIconContainer>
            <CalendarMonthIcon />
            <Typography>
              {dayjs(movie.releaseDate).format('MMM D, YYYY')}
            </Typography>
          </StyledIconContainer>
          <StyledIconContainer>
            <StarIcon />
            <Typography>{movie.grade.toString().padEnd(3, '.0')}</Typography>
          </StyledIconContainer>
          <StyledIconContainer>
            <TimelapseIcon />
            <Typography>{movie.duration} min.</Typography>
          </StyledIconContainer>
        </Box>
      </Box>
      <StyledImageContainer>
        <StyledImage src={movie.imagePath} alt={movie.title} />
      </StyledImageContainer>
    </StyledListItem>
  );
};
