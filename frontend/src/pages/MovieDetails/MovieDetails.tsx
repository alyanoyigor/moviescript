import React, { useCallback, useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowBack as ArrowBackIcon,
  DeleteForever as DeleteForeverIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { Error } from 'components/Error';
import { Preloader } from 'components/Preloader';
import { CenterContainer } from 'components/CenterContainer';
import { MovieFormSchema, Position } from 'types';
import { useAppDispatch } from 'store';
import { modalSelector } from 'store/modal/selectors/modal';
import { modalOpen, modalClose } from 'store/modal/reducer/modal';
import { MODAL_NAME } from 'store/modal/constants/modal';

import {
  movieDetailsBeforeUpdateMovieStart,
  movieDetailsUpdateMovieStart,
} from './thunks/movieDetailsUpdateMovie';
import { movieDetailsFetchStart } from './thunks/movieDetailsFetch';
import { movieDetailsDeleteMovieStart } from './thunks/movieDetailsDeleteMovie';

import { movieDeleteSelector } from './selectors/movieDetailsDeleteMovie';
import { movieFetchSelector } from './selectors/movieDetailsFetch';
import {
  movieUpdateCategoriesSelector,
  movieUpdateFetchDataSelector,
  movieUpdateSelector,
} from './selectors/movieDetailsUpdateMovie';
import { movieDetailsResetData } from './reducers/movieDetailsFetch';

import { ModalMovieUpdate } from './components/ModalMovieUpdate';
import { ModalMovieDelete } from './components/ModalMovieDelete';
import { MovieTableContent } from './components/MovieTableContent';
import {
  StyledButton,
  StyledBackButton,
  StyledEditButton,
  StyledContainer,
  StyledImage,
  StyledImageWrapper,
} from './styled';

export const MovieDetails = () => {
  const { id: movieId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { open, name } = useSelector(modalSelector);
  const { loading: createMovieLoading } = useSelector(movieUpdateSelector);
  const { categories: fetchCategories, fetchCategoriesLoading } = useSelector(
    movieUpdateCategoriesSelector
  );
  const { fetchData, fetchLoading } = useSelector(movieUpdateFetchDataSelector);
  const { loading: deleteMovieLoading } = useSelector(movieDeleteSelector);
  const { data: movie, loading, error } = useSelector(movieFetchSelector);
  const date = dayjs(movie.releaseDate).format('MMM D, YYYY');
  const categories = (movie.categories || [])
    .map((category) => category.name)
    .join(', ');

  const onClickEditMovie = () => {
    dispatch(modalOpen({ name: MODAL_NAME.MOVIE_UPDATE }));
    if (movieId) {
      dispatch(movieDetailsBeforeUpdateMovieStart({ id: movieId }));
    }
  };

  const onClickDeleteMovie = () => {
    dispatch(modalOpen({ name: MODAL_NAME.MOVIE_DELETE }));
  };

  const handleModalClose = useCallback(() => {
    dispatch(modalClose());
  }, [dispatch]);

  const handleUpdateMovie = useCallback(
    (movie: MovieFormSchema) => {
      if (movieId) {
        dispatch(movieDetailsUpdateMovieStart({ id: movieId, movie }));
      }
    },
    [movieId, dispatch]
  );

  const handleDeleteMovie = useCallback(() => {
    if (movieId) {
      dispatch(movieDetailsDeleteMovieStart({ id: movieId }));
    }
  }, [movieId, dispatch]);

  useEffect(() => {
    if (movieId) {
      dispatch(movieDetailsFetchStart({ id: movieId }));
    }

    return () => {
      dispatch(movieDetailsResetData());
    };
  }, [dispatch, movieId]);

  return (
    <>
      {loading && !error && (
        <CenterContainer position={Position.fixed}>
          <Preloader width={96} height={96} />
        </CenterContainer>
      )}
      <StyledContainer>
        <Box>
          <StyledBackButton
            variant="outlined"
            color="light"
            onClick={() => navigate(-1)}
            startIcon={<ArrowBackIcon />}
          >
            Back
          </StyledBackButton>
          {Object.keys(movie).length !== 0 && !error && (
            <>
              <StyledEditButton
                onClick={onClickEditMovie}
                variant="contained"
                startIcon={<EditIcon />}
                color="secondary"
              >
                Edit
              </StyledEditButton>
              <StyledButton
                onClick={onClickDeleteMovie}
                variant="contained"
                startIcon={<DeleteForeverIcon />}
              >
                Delete
              </StyledButton>
            </>
          )}
        </Box>
        {Object.keys(movie).length !== 0 && !error && (
          <>
            <StyledImageWrapper>
              <StyledImage src={movie.imagePath} alt="" />
            </StyledImageWrapper>
            <MovieTableContent
              date={date}
              categories={categories}
              title={movie.title}
              duration={movie.duration}
              grade={movie.grade}
              description={movie.description}
            />
          </>
        )}
      </StyledContainer>
      {error && <Error>{error}</Error>}
      <ModalMovieUpdate
        open={open && name === MODAL_NAME.MOVIE_UPDATE}
        handleClose={handleModalClose}
        loading={createMovieLoading}
        defaultMovieProps={fetchData}
        fetchLoading={fetchLoading}
        fetchCategoriesLoading={fetchCategoriesLoading}
        categories={fetchCategories}
        handleUpdateMovie={handleUpdateMovie}
      />
      <ModalMovieDelete
        open={open && name === MODAL_NAME.MOVIE_DELETE}
        loading={deleteMovieLoading}
        handleDeleteMovie={handleDeleteMovie}
        handleClose={handleModalClose}
        title={movie.title}
      />
    </>
  );
};
