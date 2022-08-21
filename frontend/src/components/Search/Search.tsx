import React, { ChangeEvent } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  StyledInputBase,
  StyledSearchContainer,
  StyledSearchIconWrapper,
} from './styled';

type SearchProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Search = (props: SearchProps) => {
  const { value, onChange } = props;

  return (
    <StyledSearchContainer>
      <StyledSearchIconWrapper>
        <SearchIcon />
      </StyledSearchIconWrapper>
      <StyledInputBase
        value={value}
        onChange={onChange}
        placeholder="Search movie…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </StyledSearchContainer>
  );
};
