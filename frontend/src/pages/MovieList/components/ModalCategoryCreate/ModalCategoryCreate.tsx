import React from 'react';
import { Typography } from '@mui/material';
import { Path, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { categoryCreateSchema } from 'validation/categoryCreateSchema';
import { MovieCategoryUserInput } from 'types';
import { Modal } from 'components/Modal';
import { Form } from 'components/Form';

type ModalCategoryCreateProps = {
  open: boolean;
  handleClose: () => void;
  loading: boolean;
  handleCreateCategory: (data: MovieCategoryUserInput) => void;
};

export const ModalCategoryCreate = (props: ModalCategoryCreateProps) => {
  const { open, handleClose, loading, handleCreateCategory } = props;
  const inputs: { label: string; name: Path<MovieCategoryUserInput> }[] = [
    { label: 'Name', name: 'name' },
  ];
  const hookFormData = useForm<MovieCategoryUserInput>({
    resolver: yupResolver(categoryCreateSchema),
  });

  return (
    <Modal maxHeight={250} open={open} onClose={handleClose}>
      <Typography mb={1} textAlign="center" variant="h5" component="h1">
        Create category
      </Typography>
      <Form
        loading={loading}
        onSubmit={handleCreateCategory}
        onCancel={handleClose}
        inputsInfo={inputs}
        hookFormData={hookFormData}
      />
    </Modal>
  );
};
