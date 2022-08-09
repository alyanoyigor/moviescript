import React from 'react';
import { getVideoSrc } from '../../../../utils/getVideoSrc';
import { StyledVideoContainer, StyledVideo } from './styled';

export const MovieTrailer = () => {
  const videoSrc = getVideoSrc(window.innerWidth);

  return (
    <StyledVideoContainer>
      <StyledVideo playsInline loop autoPlay muted>
        <source src={videoSrc} type="video/webm" />
      </StyledVideo>
    </StyledVideoContainer>
  );
};
