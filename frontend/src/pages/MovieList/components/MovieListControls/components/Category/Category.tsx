import React, { useState } from 'react';
import { ListItemText } from '@mui/material';
import { MovieCategory } from '../../../../../../types';
import { StyledMenuItem, StyledCheckbox } from './styled';

type CategoryProps = {
  category: MovieCategory;
};

export const Category = (props: CategoryProps) => {
  const { category } = props;
  const [checked, setChecked] = useState(false);

  return (
    <StyledMenuItem
      onClick={() => setChecked((prevChecked) => !prevChecked)}
      key={category._id}
      value={category.name}
    >
      <StyledCheckbox checked={checked} disableRipple={true} />
      <ListItemText primary={category.name} />
    </StyledMenuItem>
  );
};
