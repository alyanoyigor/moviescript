import React from 'react';
import { Typography } from '@mui/material';

import { Modal } from '../../../../components/Modal';
import { MovieCategory, MovieFormSchema } from '../../../../types';
import { MovieForm } from '../MovieForm';

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
    <Modal open={open} onClose={handleClose}>
      <Typography mb={1} textAlign="center" variant="h5" component="h1">
        Create movie
      </Typography>
      <MovieForm
        loading={loading}
        categories={categories}
        fetchCategoriesLoading={fetchCategoriesLoading}
        onSubmit={handleCreateMovie}
        onCancel={handleClose}
      />
    </Modal>
  );
};
