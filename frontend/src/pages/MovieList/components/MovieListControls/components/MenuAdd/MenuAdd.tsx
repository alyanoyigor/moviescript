import React from 'react';
import PropTypes from 'prop-types';
import { StyledMenu, StyledMenuItem } from './styled';

type MenuAddProps = {
  open: boolean;
  handleOpenModalCategoryCreate: () => void;
  handleOpenModalMovieCreate: () => void;
  onClose: () => void;
  anchorEl: Element | null;
};

export const MenuAdd = (props: MenuAddProps) => {
  const {
    open,
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
      <StyledMenuItem onClick={onClickCreateMovie}>Movie</StyledMenuItem>
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
