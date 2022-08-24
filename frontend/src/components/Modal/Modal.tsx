import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Modal as ModalMUI, Box, ThemeProvider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getTheme } from '../../styles/theme';
import { StyledCloseButton, modalStyles } from './styled';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal: React.FC<ModalProps> = (props) => {
  const { open, onClose, children } = props;

  return (
    <ThemeProvider theme={getTheme('light')}>
      <ModalMUI open={open} onClose={onClose}>
        <Box sx={modalStyles}>
          <StyledCloseButton color="silverGrey" size="small" onClick={onClose}>
            <CloseIcon />
          </StyledCloseButton>
          {children}
        </Box>
      </ModalMUI>
    </ThemeProvider>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};
