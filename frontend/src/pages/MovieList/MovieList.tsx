import React from 'react';
import { Box } from '@mui/material';
import { MovieItem } from './components/MovieItem';
import { Search } from '../../components/Search';
import styled from 'styled-components';

export const StyledListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0;
`;

export const MovieList = () => {
  return (
    <div>
      <Box display="flex" justifyContent="center">
        <Search />
      </Box>
      <StyledListWrapper>
        <MovieItem />
        <MovieItem />
        <MovieItem />
        <MovieItem />
      </StyledListWrapper>
    </div>
  );
};
