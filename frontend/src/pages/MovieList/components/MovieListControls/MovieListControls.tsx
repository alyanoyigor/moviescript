import React, {
  MouseEvent,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Input,
  SelectChangeEvent,
} from '@mui/material';
import { useSelector } from 'react-redux';
import {
  AddToPhotos as AddToPhotosIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Add as AddIcon,
} from '@mui/icons-material';

import { Search } from '../../../../components/Search';
import { CenterContainer } from '../../../../components/CenterContainer';
import { Preloader } from '../../../../components/Preloader';
import { Error } from '../../../../components/Error';
import { useAppDispatch } from '../../../../store';
import { modalOpen } from '../../../../store/modal/reducer/modal';
import { MODAL_NAME } from '../../../../store/modal/constants/modal';
import { movieListGetCategoriesSelector } from '../../selectors/movieListGetCategories';
import { movieListGetCategoriesStart } from '../../thunks/movieListGetCategories';
import { movieListBeforeCreateMovieStart } from '../../thunks/movieListCreateMovie';
import { SortMoviesOptions } from '../../../../types';
import { MenuAdd } from './components/MenuAdd';
import { CategoriesSkeleton } from './components/CategoriesSkeleton';

export const MovieListControls = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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
  const open = Boolean(anchorEl);
  const openAddMenu = Boolean(anchorElAddMenu);

  const onClickSortButton = () => {
    switch (searchParams.get('sort')) {
      case null:
        searchParams.set('sort', SortMoviesOptions.desc);
        break;
      case SortMoviesOptions.desc:
        searchParams.set('sort', SortMoviesOptions.asc);
        break;
      case SortMoviesOptions.asc:
        searchParams.delete('sort');
        break;
      default:
        break;
    }
    setSearchParams(searchParams);
  };

  const handleOpenMenuCategories = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenAddMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElAddMenu(event.currentTarget);
  };

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleCloseAddMenu = useCallback(() => {
    setAnchorElAddMenu(null);
  }, []);

  const handleOpenModalMovieCreate = useCallback(() => {
    dispatch(modalOpen({ name: MODAL_NAME.MOVIE_CREATE }));
    dispatch(movieListBeforeCreateMovieStart());
  }, [dispatch]);

  const handleOpenModalCategoryCreate = useCallback(() => {
    dispatch(modalOpen({ name: MODAL_NAME.CATEGORY_CREATE }));
  }, [dispatch]);

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '') {
      searchParams.delete('search');
    } else {
      searchParams.set('search', value);
    }
    setSearchParams(searchParams);
  };

  const handleChangeCategory = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    const categoryList = typeof value === 'string' ? value.split(',') : value;
    if (categoryList.length === 0) {
      searchParams.delete('categories');
    } else {
      searchParams.set('categories', categoryList.join(','));
    }
    setSearchParams(searchParams);
  };

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
      <Search
        value={searchParams.get('search') || ''}
        onChange={handleChangeSearch}
      />

      <FormControl>
        <Button
          id="openMenu"
          color="secondary"
          variant="contained"
          onClick={handleOpenMenuCategories}
          startIcon={<AddToPhotosIcon />}
        >
          Categories
        </Button>
        <Select
          multiple
          value={searchParams.get('categories')?.split(',') || []}
          onChange={handleChangeCategory}
          input={<Input id="select-multiple-checkbox" />}
          style={{ display: 'none' }}
          open={open}
          onClose={handleClose}
          renderValue={(selected) => selected.join(',')}
          MenuProps={{
            anchorEl: document.getElementById('openMenu'),
            PaperProps: {
              style: { width: '200px', maxHeight: 200, overflow: 'auto' },
            },
          }}
        >
          {loading && !error && categories.length > 0 && (
            <CenterContainer>
              <Preloader />
            </CenterContainer>
          )}
          {loading && !error && categories.length === 0 && (
            <CategoriesSkeleton categoriesCount={4} />
          )}
          {!error &&
            categories.length > 0 &&
            categories.map((category) => {
              const categoryParams = searchParams.get('categories') || '';
              const isChecked =
                categoryParams.split(',').indexOf(category.name) > -1;
              return (
                <MenuItem key={category._id} value={category.name}>
                  <Checkbox checked={isChecked} />
                  <ListItemText primary={category.name} />
                </MenuItem>
              );
            })}
          {!error && !loading && categories.length === 0 && (
            <h1>Nothing was found</h1>
          )}
          {error && !loading && <Error>{error}</Error>}
        </Select>
      </FormControl>
      <Button
        onClick={onClickSortButton}
        variant="contained"
        color="info"
        sx={{ width: '90px' }}
        startIcon={
          (searchParams.get('sort') === SortMoviesOptions.desc && (
            <ArrowUpwardIcon />
          )) ||
          (searchParams.get('sort') === SortMoviesOptions.asc && (
            <ArrowDownwardIcon />
          ))
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
        handleOpenModalCategoryCreate={handleOpenModalCategoryCreate}
        handleOpenModalMovieCreate={handleOpenModalMovieCreate}
        anchorEl={anchorElAddMenu}
        open={openAddMenu}
        onClose={handleCloseAddMenu}
      />
    </Box>
  );
};
