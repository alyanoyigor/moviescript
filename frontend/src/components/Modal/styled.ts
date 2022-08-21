import { IconButton, styled } from '@mui/material';

export const modalStyles = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 440,
  minHeight: 200,
  boxShadow: 24,
  overflow: 'auto',
  bgcolor: '#fff',
  color: '#000',
  fontSize: '18px',
  borderRadius: '4px',
  p: '32px',
  '&:focus-visible': {
    outline: 'none',
  },
  '@media(max-height: 600px)': {
    height: '90%',
  },
  '@media(max-width: 600px)': {
    width: '90%',
  },
};

export const StyledCloseButton = styled(IconButton)`
  position: absolute;
  right: 4px;
  top: 4px;
`;
