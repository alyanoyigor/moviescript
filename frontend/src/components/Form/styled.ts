import styled from 'styled-components';
import { Box, Skeleton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import styledEngine from '@mui/styled-engine';

export const StyledForm = styled.form`
  display: flex;
  height: 100%;
  gap: 8px;
  flex-direction: column;
`;

export const StyledButton = styledEngine(LoadingButton)`
  width: 100px;
`;

export const StyledSkeleton = styledEngine(Skeleton)`
  transform: none;
`;

export const StyledButtonsContainer = styledEngine(Box)`
  display: flex;
  gap: 4px;
  justify-content: flex-end;
`;
