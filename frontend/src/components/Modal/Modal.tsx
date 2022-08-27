import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Modal as ModalMUI, ThemeProvider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getTheme } from '../../styles/theme';
import { StyledCloseButton, StyledContainer } from './styled';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  maxHeight: number;
  children: ReactNode;
};

export const Modal: React.FC<ModalProps> = (props) => {
  const { open, onClose, maxHeight, children } = props;

  return (
    <ThemeProvider theme={getTheme('light')}>
      <ModalMUI open={open} onClose={onClose}>
        <StyledContainer maxHeight={maxHeight}>
          <StyledCloseButton color="silverGrey" size="small" onClick={onClose}>
            <CloseIcon />
          </StyledCloseButton>
          {children}
        </StyledContainer>
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
