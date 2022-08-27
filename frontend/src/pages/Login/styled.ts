import { styled, Typography } from '@mui/material';

export const StyledContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  height: calc(90vh - 76px);
`;

export const StyledTitle = styled(Typography)`
  font-weight: 500;
` as typeof Typography;

export const StyledForm = styled('form')`
  display: flex;
  max-width: 500px;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;
