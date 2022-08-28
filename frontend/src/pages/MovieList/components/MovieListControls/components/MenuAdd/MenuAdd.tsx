import React from 'react';
import PropTypes from 'prop-types';
import { StyledMenu, StyledMenuItem } from './styled';
import { Tooltip } from '@mui/material';

type MenuAddProps = {
  open: boolean;
  categoriesLength: number;
  handleOpenModalCategoryCreate: () => void;
  handleOpenModalMovieCreate: () => void;
  onClose: () => void;
  anchorEl: Element | null;
};

export const MenuAdd = (props: MenuAddProps) => {
  const {
    open,
    categoriesLength,
    handleOpenModalCategoryCreate,
    handleOpenModalMovieCreate,
    anchorEl,
    onClose,
  } = props;

  const onClickCreateCategory = () => {
    handleOpenModalCategoryCreate();
    onClose();
  };

  const onClickCreateMovie = () => {
    handleOpenModalMovieCreate();
    onClose();
  };

  return (
    <StyledMenu
      id="add-menu"
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      MenuListProps={{
        'aria-labelledby': 'add-button',
      }}
    >
      <Tooltip
        placement="right"
        title={categoriesLength === 0 ? 'Please add at least one category' : ''}
      >
        <span>
          <StyledMenuItem
            disabled={categoriesLength === 0}
            onClick={onClickCreateMovie}
          >
            Movie
          </StyledMenuItem>
        </span>
      </Tooltip>
      <StyledMenuItem onClick={onClickCreateCategory}>Category</StyledMenuItem>
    </StyledMenu>
  );
};

MenuAdd.defaultProps = {
  anchorEl: null,
};

MenuAdd.propTypes = {
  anchorEl: PropTypes.instanceOf(Element),
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
