import React from 'react';
import { Typography } from '@mui/material';

import { MovieCategory, MovieFormSchema } from '../../../../types';
import { movieCreateSchema } from '../../../../validation/movieCreateSchema';
import { Modal } from '../../../../components/Modal';
import { MovieForm } from '../../../../components/MovieForm';

type ModalMovieCreateProps = {
  open: boolean;
  handleClose: () => void;
  loading: boolean;
  categories: MovieCategory[];
  fetchCategoriesLoading: boolean;
  handleCreateMovie: (data: MovieFormSchema) => void;
};

export const ModalMovieCreate = (props: ModalMovieCreateProps) => {
  const {
    open,
    handleClose,
    loading,
    fetchCategoriesLoading,
    categories,
    handleCreateMovie,
  } = props;

  return (
    <Modal maxHeight={600} open={open} onClose={handleClose}>
      <Typography mb={1} textAlign="center" variant="h5" component="h1">
        Create movie
      </Typography>
      <MovieForm
        loading={loading}
        schema={movieCreateSchema}
        categories={categories}
        fetchCategoriesLoading={fetchCategoriesLoading}
        onSubmit={handleCreateMovie}
        onCancel={handleClose}
      />
    </Modal>
  );
};
