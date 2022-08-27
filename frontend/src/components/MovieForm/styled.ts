import styled from 'styled-components';
import { Box, Skeleton, styled as styledMui } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export const StyledForm = styled.form`
  display: flex;
  height: 100%;
  gap: 8px;
  flex-direction: column;
`;

export const StyledSkeleton = styledMui(Skeleton)`
  transform: none;
  width: 100%;
  height: 42px;
`;

export const StyledButton = styledMui(LoadingButton)`
  width: 100px;
`;

export const StyledButtonsContainer = styledMui(Box)`
  display: flex;
  margin-top: auto;
  gap: 4px;
  justify-content: flex-end;
`;
