import { styled, TextField } from '@mui/material';

export const StyledTextField = styled(TextField)`
  label {
    color: ${({ theme }) => theme.palette.silverGrey.main};
  }

  input {
    color: ${({ theme }) => theme.palette.dark.main};
  }

  .MuiInputBase-root:hover {
    .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.grey[500]};
    }
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.palette.silverGrey.main};
  }
`;
