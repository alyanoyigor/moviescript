import React, { ReactNode } from 'react';
import { Position } from 'types';
import { StyledCenterContainer } from './styled';

const defaultProps = {
  position: Position.absolute,
};

type CenterContainerProps = {
  children: ReactNode;
  position?: Position;
} & typeof defaultProps;

export const CenterContainer = (props: CenterContainerProps) => {
  const { children, position } = props;

  return (
    <StyledCenterContainer position={position}>
      {children}
    </StyledCenterContainer>
  );
};

CenterContainer.defaultProps = defaultProps;
