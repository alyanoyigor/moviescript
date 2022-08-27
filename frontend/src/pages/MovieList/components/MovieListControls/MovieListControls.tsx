import React, {
  MouseEvent,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from 'react';
import {
  Box,
  Button,
  FormControl,
  Select,
  ListItemText,
  Input,
  IconButton,
  SelectChangeEvent,
  Tooltip,
} from '@mui/material';
import { useSelector } from 'react-redux';
import {
  AddToPhotos as AddToPhotosIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Compare as CompareIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import debounce from 'lodash.debounce';

import { Search } from '../../../../components/Search';
import { CenterContainer } from '../../../../components/CenterContainer';
import { Preloader } from '../../../../components/Preloader';
import { Error } from '../../../../components/Error';
import { useAppDispatch } from '../../../../store';
import { modalOpen } from '../../../../store/modal/reducer/modal';
import { MODAL_NAME } from '../../../../store/modal/constants/modal';
import { movieListGetCategoriesSelector } from '../../selectors/movieListGetCategories';
import { movieListGetCategoriesStart } from '../../thunks/movieListGetCategories';
import { movieListFetchStart } from '../../thunks/movieListFetch';
import { movieListBeforeCreateMovieStart } from '../../thunks/movieListCreateMovie';
import { movieListCompareViewGetMoviesStart } from '../../thunks/movieListCompareView';
import { setQueries } from '../../../../utils/setQueries';
import { movieListCompareViewSelector } from '../../selectors/movieListCompareView';
import { movieListAddQuery } from '../../reducers/movieListFetch';
import { MovieQueries, SortMoviesOptions } from '../../../../types';
import { MenuAdd } from './components/MenuAdd';
import { CategoriesSkeleton } from './components/CategoriesSkeleton';
import { StyledCheckbox, StyledMenuItem, sxSelectCategory } from './styled';

type MovieListControlsProps = {
  queries: MovieQueries;
};

export const MovieListControls = (props: MovieListControlsProps) => {
  const { queries } = props;
  const {
    data: categories,
    loading,
    error,
  } = useSelector(movieListGetCategoriesSelector);
  const dispatch = useAppDispatch();

  const getMovieList = (query: { name: string; value: string | null }) => {
    setQueries(query);
    dispatch(movieListFetchStart());
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(getMovieList, 500), []);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [anchorElAddMenu, setAnchorElAddMenu] = useState<HTMLElement | null>(
    null
  );
  const open = Boolean(anchorEl);
  const openAddMenu = Boolean(anchorElAddMenu);

  const sortActions = {
    asc: () => {
      const query = { name: 'sort', value: SortMoviesOptions.desc };
      dispatch(movieListAddQuery({ query }));
      return query;
    },
    desc: () => {
      const query = { name: 'sort', value: null };
      dispatch(movieListAddQuery({ query }));
      return query;
    },
  };

  const onClickSortButton = () => {
    if (queries.sort && sortActions[queries.sort]) {
      const query = sortActions[queries.sort]();
      return getMovieList(query);
    }
    const query = { name: 'sort', value: SortMoviesOptions.asc };
    dispatch(movieListAddQuery({ query }));
    getMovieList(query);
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
    const query = {
      name: 'search',
      value: event.target.value === '' ? null : event.target.value,
    };
    dispatch(movieListAddQuery({ query }));
    debounceFn(query);
  };

  const compareMovies = useSelector(movieListCompareViewSelector);

  const handleOpenModalCompareView = useCallback(() => {
    dispatch(modalOpen({ name: MODAL_NAME.MOVIE_COMPARE_VIEW }));
    dispatch(
      movieListCompareViewGetMoviesStart({
        movieIdList: compareMovies,
      })
    );
  }, [dispatch, compareMovies]);

  const handleChangeCategory = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    const categoryList = typeof value === 'string' ? value.split(',') : value;
    const query = {
      name: 'categories',
      value: categoryList.length === 0 ? null : categoryList.join(','),
    };
    dispatch(movieListAddQuery({ query }));
    getMovieList(query);
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
      <Search value={queries.search || ''} onChange={handleChangeSearch} />
      <FormControl>
        <Button
          id="openMenu"
          color="secondary"
          variant="contained"
          sx={{ height: '100%' }}
          onClick={handleOpenMenuCategories}
          startIcon={<AddToPhotosIcon />}
        >
          Categories
        </Button>
        <Select
          multiple
          value={queries.categories?.split(',') || []}
          onChange={handleChangeCategory}
          input={<Input id="select-multiple-checkbox" />}
          style={{ display: 'none' }}
          open={open}
          onClose={handleClose}
          renderValue={(selected) => selected.join(',')}
          MenuProps={{
            anchorEl: document.getElementById('openMenu'),
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            PaperProps: {
              sx: sxSelectCategory,
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
              const categoryParams = queries.categories || '';
              const isChecked =
                categoryParams.split(',').indexOf(category.name) > -1;
              return (
                <StyledMenuItem
                  color="secondary"
                  key={category._id}
                  value={category.name}
                >
                  <StyledCheckbox disableRipple={true} checked={isChecked} />
                  <ListItemText primary={category.name} />
                </StyledMenuItem>
              );
            })}
          {!error && !loading && categories.length === 0 && (
            <StyledMenuItem disabled>Nothing was found</StyledMenuItem>
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
          (queries.sort === SortMoviesOptions.desc && <ArrowUpwardIcon />) ||
          (queries.sort === SortMoviesOptions.asc && <ArrowDownwardIcon />)
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
      <Tooltip
        title={
          compareMovies.length <= 1
            ? 'Add movies to compare them'
            : 'Compare view'
        }
      >
        <span>
          <IconButton
            disabled={compareMovies.length <= 1}
            onClick={handleOpenModalCompareView}
          >
            <CompareIcon />
          </IconButton>
        </span>
      </Tooltip>
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
