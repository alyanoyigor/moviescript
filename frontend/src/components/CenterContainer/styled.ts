import styled from 'styled-components';
import { Position } from '../../types';

export const StyledCenterContainer = styled.div`
  position: ${(props: { position: Position }) => props.position};
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
