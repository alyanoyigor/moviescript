import { IconButton, Box, styled } from '@mui/material';

export const StyledContainer = styled(Box)(
  ({ maxHeight }: { maxHeight: number }) => ({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '440px',
    minHeight: '200px',
    overflow: 'auto',
    backgroundColor: '#ffffff',
    color: '#000000',
    fontSize: '18px',
    borderRadius: '4px',
    padding: '32px',

    '&:focus-visible': {
      outline: 'none',
    },

    [`@media(max-height: ${maxHeight}px)`]: {
      height: '100%',
    },
    '@media(max-width: 600px)': {
      width: '100%',
    },
  })
);

export const StyledCloseButton = styled(IconButton)`
  position: absolute;
  right: 4px;
  top: 4px;
`;
