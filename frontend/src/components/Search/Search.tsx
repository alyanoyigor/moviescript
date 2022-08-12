import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  StyledInputBase,
  StyledSearchContainer,
  StyledSearchIconWrapper,
} from './styled';

export const Search = () => {
  return (
    <StyledSearchContainer>
      <StyledSearchIconWrapper>
        <SearchIcon />
      </StyledSearchIconWrapper>
      <StyledInputBase
        placeholder="Search movie…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </StyledSearchContainer>
  );
};
