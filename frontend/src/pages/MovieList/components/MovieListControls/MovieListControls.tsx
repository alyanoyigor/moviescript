import React, { MouseEvent, useState } from 'react';
import { Box, Button } from '@mui/material';
import {
  AddToPhotos as AddToPhotosIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { Search } from '../../../../components/Search';
import { MenuCategories } from './components/MenuCategories';

export const MovieListControls = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isDesc, setIsDesc] = useState<boolean | null>(null);
  const open = Boolean(anchorEl);

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

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpenMenuCategories}
        startIcon={<AddToPhotosIcon />}
      >
        Categories
      </Button>
      <MenuCategories onClose={handleClose} open={open} anchorEl={anchorEl} />
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
      <Button variant="outlined" color="light" startIcon={<AddIcon />}>
        Add
      </Button>
    </Box>
  );
};
