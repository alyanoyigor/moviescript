import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { StyledSkeleton, StyledButtonsContainer } from './styled';

type FormSkeletonProps = {
  inputsCount: number;
};

export const FormSkeleton = (props: FormSkeletonProps) => {
  const { inputsCount } = props;

  return (
    <Box display="flex" flexDirection="column" gap="8px">
      {Array.from(Array(inputsCount), (_, index) => (
        <StyledSkeleton key={index} height={40} />
      ))}
      <StyledButtonsContainer
        display="flex"
        gap="4px"
        justifyContent="flex-end"
      >
        <StyledSkeleton width={100} height={36} />
        <StyledSkeleton width={100} height={36} />
      </StyledButtonsContainer>
    </Box>
  );
};

FormSkeleton.propTypes = {
  inputsCount: PropTypes.number.isRequired,
};
