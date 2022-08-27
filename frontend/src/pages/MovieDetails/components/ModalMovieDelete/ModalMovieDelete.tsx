import React from 'react';
import { Typography } from '@mui/material';

import { Modal } from '../../../../components/Modal';
import { StyledButtonsContainer, StyledButton, StyledTitle } from './styled';

type ModalMovieDeleteProps = {
  open: boolean;
  handleClose: () => void;
  loading: boolean;
  handleDeleteMovie: () => void;
  title: string;
};

export const ModalMovieDelete = (props: ModalMovieDeleteProps) => {
  const { open, handleClose, loading, handleDeleteMovie, title } = props;

  return (
    <Modal maxHeight={250} open={open} onClose={handleClose}>
      <Typography mb={1} textAlign="center" variant="h5" component="h1">
        Delete movie
      </Typography>
      <Typography mb={1} textAlign="center" variant="body1" component="p">
        Do you really want to delete <StyledTitle>{title}</StyledTitle> ?
      </Typography>
      <StyledButtonsContainer
        display="flex"
        gap="4px"
        justifyContent="flex-end"
      >
        <StyledButton
          color="secondary"
          variant="contained"
          disabled={loading}
          onClick={handleClose}
        >
          Cancel
        </StyledButton>
        <StyledButton
          onClick={handleDeleteMovie}
          disabled={loading}
          loading={loading}
          type="submit"
        >
          Delete
        </StyledButton>
      </StyledButtonsContainer>
    </Modal>
  );
};
