import React from 'react';
import { Typography } from '@mui/material';

import { Modal } from '../../../../components/Modal';
import { Movie, MovieCategory, MovieFormSchema } from '../../../../types';
import { movieUpdateSchema } from '../../../../validation/movieUpdateSchema';
import { MovieForm } from '../../../../components/MovieForm';

type ModalMovieUpdateProps = {
  open: boolean;
  handleClose: () => void;
  loading: boolean;
  fetchLoading: boolean;
  categories: MovieCategory[];
  fetchCategoriesLoading: boolean;
  handleUpdateMovie: (data: MovieFormSchema) => void;
  defaultMovieProps: Movie | Record<never, string>;
};

export const ModalMovieUpdate = (props: ModalMovieUpdateProps) => {
  const {
    open,
    handleClose,
    loading,
    defaultMovieProps,
    fetchLoading,
    fetchCategoriesLoading,
    categories,
    handleUpdateMovie,
  } = props;

  return (
    <Modal open={open} onClose={handleClose}>
      <Typography mb={1} textAlign="center" variant="h5" component="h1">
        Update movie
      </Typography>
      <MovieForm
        loading={loading}
        schema={movieUpdateSchema}
        categories={categories}
        defaultMovieProps={defaultMovieProps}
        fetchLoading={fetchLoading}
        fetchCategoriesLoading={fetchCategoriesLoading}
        onSubmit={handleUpdateMovie}
        onCancel={handleClose}
      />
    </Modal>
  );
};
