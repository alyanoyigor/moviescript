import { LoadingButton } from '@mui/lab';
import { Box, styled } from '@mui/material';

export const StyledButton = styled(LoadingButton)`
  width: 100px;
`;

export const StyledButtonsContainer = styled(Box)`
  display: flex;
  margin-top: auto;
  gap: 4px;
  justify-content: flex-end;
`;

export const StyledTitle = styled('span')(({ theme }) => ({
  fontWeight: 700,
  fontSize: 18,
  color: theme.palette.primary.main,
}));
