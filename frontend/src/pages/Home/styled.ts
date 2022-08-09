import { Typography, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledHomeWrapper = styled.div`
  margin-top: 15vh;
`;

export const StyledHomeBody = styled.div`
  position: relative;
  z-index: 1;

  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 24px;
`;

export const StyledSkeleton = styled(Skeleton)`
  position: absolute !important;
  top: 0;
  left: 0;

  width: 100%;
  height: 100% !important;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const StyledTitle = styled(Typography).attrs(() => ({
  component: 'h1',
  variant: 'h2',
}))`
  font-weight: 700 !important;
  max-width: 590px;
  color: #ffffff;
`;
