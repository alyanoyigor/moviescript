import React from 'react';
import { Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import NotFoundGif from '../../assets/404.gif';
import {
  StyledContainer,
  StyledContent,
  StyledImage,
  StyledImageContainer,
  StyledTitle,
  StyledDescription,
  StyledLink,
} from './styled';

export const NotFound = () => {
  return (
    <StyledContainer>
      <StyledContent>
        <StyledTitle variant="h1" component="h1">
          404
        </StyledTitle>
        <StyledDescription>Page not found</StyledDescription>
        <StyledLink to="/">
          <Button size="large" variant="contained" endIcon={<ArrowForward />}>
            Home
          </Button>
        </StyledLink>
      </StyledContent>
      <StyledImageContainer>
        <StyledImage src={NotFoundGif} alt="Not found" />
      </StyledImageContainer>
    </StyledContainer>
  );
};
