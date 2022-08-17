import React, { MouseEvent, useState, useEffect, useCallback } from 'react';
import { Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  AddToPhotos as AddToPhotosIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Add as AddIcon,
} from '@mui/icons-material';

import { Search } from '../../../../components/Search';
import { useAppDispatch } from '../../../../store';
import { movieListGetCategoriesSelector } from '../../selectors/movieListGetCategories';
import { movieListGetCategoriesStart } from '../../thunks/movieListGetCategories';
import { MenuCategories } from './components/MenuCategories';
import { MenuAdd } from './components/MenuAdd';
import { modalOpen } from '../../../../store/modal/reducer/modal';
import { MODAL_NAME } from '../../../../store/modal/constants/modal';

export const MovieListControls = () => {
  const {
    data: categories,
    loading,
    error,
  } = useSelector(movieListGetCategoriesSelector);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [anchorElAddMenu, setAnchorElAddMenu] = useState<HTMLElement | null>(
    null
  );
  const [isDesc, setIsDesc] = useState<boolean | null>(null);

  const open = Boolean(anchorEl);
  const openAddMenu = Boolean(anchorElAddMenu);

  const onClickSortButton = () => {
    switch (isDesc) {
      case null:
        setIsDesc(true);
        break;
      case true:
        setIsDesc(false);
        break;
      case false:
        setIsDesc(null);
        break;
      default:
        break;
    }
  };

  const handleOpenMenuCategories = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenAddMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElAddMenu(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseAddMenu = () => {
    setAnchorElAddMenu(null);
  };

  const handleCreateCategory = useCallback(() => {
    dispatch(modalOpen({ name: MODAL_NAME.CATEGORY_CREATE }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(movieListGetCategoriesStart());
  }, [dispatch]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      gap="8px"
      marginBottom="16px"
      flexWrap="wrap"
    >
      <Search />
      <Button
        color="secondary"
        variant="contained"
        aria-controls={open ? 'categories-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpenMenuCategories}
        startIcon={<AddToPhotosIcon />}
      >
        Categories
      </Button>
      <MenuCategories
        loading={loading}
        error={error}
        categories={categories}
        onClose={handleClose}
        open={open}
        anchorEl={anchorEl}
      />
      <Button
        onClick={onClickSortButton}
        variant="contained"
        color="info"
        sx={{ width: '90px' }}
        startIcon={
          (isDesc === false && <ArrowUpwardIcon />) ||
          (isDesc === true && <ArrowDownwardIcon />)
        }
      >
        Sort
      </Button>
      <Button
        aria-controls={openAddMenu ? 'add-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openAddMenu ? 'true' : undefined}
        variant="outlined"
        color="light"
        startIcon={<AddIcon />}
        onClick={handleOpenAddMenu}
      >
        Add
      </Button>
      <MenuAdd
        handleCreateCategory={handleCreateCategory}
        anchorEl={anchorElAddMenu}
        open={openAddMenu}
        onClose={handleCloseAddMenu}
      />
    </Box>
  );
};
