import React from 'react';
import MoviePath from 'assets/video/movie-trailer.webm';
import { StyledVideoContainer, StyledVideo } from './styled';

export const MovieTrailer = () => (
  <StyledVideoContainer>
    <StyledVideo playsInline loop autoPlay muted>
      <source src={MoviePath} type="video/webm" />
    </StyledVideo>
  </StyledVideoContainer>
);
