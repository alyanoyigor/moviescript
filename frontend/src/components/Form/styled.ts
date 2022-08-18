import styled from 'styled-components';
import { Box, Skeleton, styled as styledMui } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export const StyledForm = styled.form`
  display: flex;
  height: 100%;
  gap: 8px;
  flex-direction: column;
`;

export const StyledButton = styledMui(LoadingButton)`
  width: 100px;
`;

export const StyledSkeleton = styledMui(Skeleton)`
  transform: none;
`;

export const StyledButtonsContainer = styledMui(Box)`
  display: flex;
  gap: 4px;
  justify-content: flex-end;
`;
