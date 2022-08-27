import React from 'react';
import { TransitionProps } from '@mui/material/transitions';
import {
  AppBar,
  Dialog,
  Divider,
  IconButton,
  List,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

import { Movie } from 'types';
import { Error } from 'components/Error';
import { ModalMovieCard } from './ModalMovieCard';
import { StyledListItem, StyledSkeleton } from './styled';

type ModalMovieCompareViewProps = {
  open: boolean;
  handleClose: () => void;
  movies: Movie[];
  loading: boolean;
  error: string | null;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ModalMovieCompareView = (props: ModalMovieCompareViewProps) => {
  const { open, handleClose, movies, loading, error } = props;

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Compare movies
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        <>
          {loading &&
            !error &&
            Array.from(Array(5), (_, index) => (
              <StyledListItem key={index}>
                <StyledSkeleton />
              </StyledListItem>
            ))}
          {!loading &&
            !error &&
            movies.map((movie) => (
              <React.Fragment key={movie._id}>
                <ModalMovieCard movie={movie} />
                {movies.at(-1)?._id !== movie._id && <Divider />}
              </React.Fragment>
            ))}
          {error && !loading && <Error>{error}</Error>}
        </>
      </List>
    </Dialog>
  );
};
