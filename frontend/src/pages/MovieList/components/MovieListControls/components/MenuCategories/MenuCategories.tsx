import React from 'react';
import PropTypes from 'prop-types';
import { ListItemText } from '@mui/material';
import { StyledMenu, StyledMenuItem, StyledCheckbox } from './styled';

type MenuCategoriesProps = {
  open: boolean;
  onClose: () => void;
  anchorEl: Element | null;
};

export const MenuCategories = (props: MenuCategoriesProps) => {
  const { open, anchorEl, onClose } = props;

  return (
    <StyledMenu
      id="basic-menu"
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <StyledMenuItem value="name1">
        <StyledCheckbox disableRipple={true} />
        <ListItemText primary="name1" />
      </StyledMenuItem>
    </StyledMenu>
  );
};

MenuCategories.defaultProps = {
  anchorEl: null,
};

MenuCategories.propTypes = {
  anchorEl: PropTypes.instanceOf(Element),
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
