import React, { MouseEvent, useState } from 'react';
import { Box, Button } from '@mui/material';
import {
  AddToPhotos as AddToPhotosIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';
import { Search } from '../../components/Search';
import { Preloader } from '../../components/Preloader';
import { MovieItem } from './components/MovieItem';
import { MenuCategories } from './components/MenuCategories';
import { StyledListWrapper } from './styled';

export const MovieList = () => {
  const [count, setCount] = useState(6);
  const [loading, setLoading] = useState(false);
  const [isDesc, setIsDesc] = useState<boolean | null>(null);

  const handleShowMore = () => {
    setLoading(true);
    setTimeout(() => {
      setCount((prevCount) => prevCount + 6);
      setLoading(false);
    }, 21500);
  };

  const onClickSortButton = () => {
    switch (isDesc) {
      case null:
        setIsDesc(false);
        break;
      case true:
        setIsDesc(null);
        break;
      case false:
        setIsDesc(true);
        break;
      default:
        break;
    }
  };

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const onClickMenuCategories = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Box display="flex" justifyContent="center" gap="8px">
        <Button
          color="secondary"
          variant="contained"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={onClickMenuCategories}
          startIcon={<AddToPhotosIcon />}
        >
          Categories
        </Button>
        <MenuCategories onClose={handleClose} open={open} anchorEl={anchorEl} />
        <Search />
        <Button
          onClick={onClickSortButton}
          variant="outlined"
          color="info"
          startIcon={
            (isDesc === false && <ArrowUpwardIcon />) ||
            (isDesc === true && <ArrowDownwardIcon />)
          }
        >
          Sort
        </Button>
      </Box>
      <StyledListWrapper>
        {Array.from(Array(count), (_, index) => (
          <MovieItem key={index} />
        ))}
      </StyledListWrapper>
      {loading ? (
        <Preloader />
      ) : (
        <button onClick={handleShowMore}>Show more</button>
      )}
    </div>
  );
};
