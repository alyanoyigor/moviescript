import React, { useCallback, useEffect } from 'react';
import { Box, Rating, Table, TableBody, TableCell } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowBack as ArrowBackIcon,
  DeleteForever as DeleteForeverIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { Error } from '../../components/Error';
import { Preloader } from '../../components/Preloader';
import { CenterContainer } from '../../components/CenterContainer';
import { MovieFormSchema, Position } from '../../types';
import { useAppDispatch } from '../../store';
import { modalSelector } from '../../store/modal/selectors/modal';
import { modalOpen, modalClose } from '../../store/modal/reducer/modal';
import { MODAL_NAME } from '../../store/modal/constants/modal';
import {
  movieDetailsBeforeUpdateMovieStart,
  movieDetailsUpdateMovieStart,
} from './thunks/movieDetailsUpdateMovie';
import { movieDetailsFetchStart } from './thunks/movieDetailsFetch';
import { movieDetailsDeleteMovieStart } from './thunks/movieDetailsDeleteMovie';
import { movieFetchSelector } from './selectors/movieDetailsFetch';
import { ModalMovieUpdate } from './components/ModalMovieUpdate';
import { ModalMovieDelete } from './components/ModalMovieDelete';
import { movieDeleteSelector } from './selectors/movieDetailsDeleteMovie';
import {
  movieUpdateCategoriesSelector,
  movieUpdateFetchDataSelector,
  movieUpdateSelector,
} from './selectors/movieDetailsUpdateMovie';
import {
  StyledButton,
  StyledBackButton,
  StyledEditButton,
  StyledContainer,
  StyledDescriptionTitle,
  StyledImage,
  StyledImageWrapper,
  StyledMovieContent,
  StyledMovieKey,
  StyledMovieTitle,
  StyledMovieValue,
  StyledTableRow,
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
            <StyledMovieContent>
              <StyledMovieTitle>{movie.title}</StyledMovieTitle>
              <Table sx={{ maxWidth: 600, marginBottom: '32px' }}>
                <TableBody>
                  <StyledTableRow>
                    <TableCell>
                      <StyledMovieKey>Release date:</StyledMovieKey>
                    </TableCell>
                    <TableCell>
                      <StyledMovieValue>{date}</StyledMovieValue>
                    </TableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <TableCell>
                      <StyledMovieKey>Duration:</StyledMovieKey>
                    </TableCell>
                    <TableCell>
                      <StyledMovieValue>{movie.duration} min.</StyledMovieValue>
                    </TableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <TableCell>
                      <StyledMovieKey>Grade:</StyledMovieKey>
                    </TableCell>
                    <TableCell>
                      <Rating value={movie.grade} precision={0.5} readOnly />
                    </TableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <TableCell>
                      <StyledMovieKey>Categories:</StyledMovieKey>
                    </TableCell>
                    <TableCell>
                      <StyledMovieValue>{categories}</StyledMovieValue>
                    </TableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
              <Box>
                <StyledDescriptionTitle>
                  Film description:
                </StyledDescriptionTitle>
                <StyledMovieValue>{movie.description}</StyledMovieValue>
              </Box>
            </StyledMovieContent>
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
