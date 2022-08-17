import { Skeleton, styled } from '@mui/material';

export const StyledCategorySkeleton = styled(Skeleton)(() => ({
  height: 40,
  marginBottom: 5,
  transform: 'none',

  '&:last-child': {
    marginBottom: 0,
  },
}));
