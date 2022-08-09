import styled from 'styled-components';

export const StyledVideoContainer = styled.div`
  width: 100%;
  height: 100%;

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background-image: linear-gradient(
      to right,
      #000000,
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0)
    );
  }
`;

export const StyledVideo = styled.video`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;

  object-fit: cover;
  transition: opacity 400ms ease 0ms;
`;
