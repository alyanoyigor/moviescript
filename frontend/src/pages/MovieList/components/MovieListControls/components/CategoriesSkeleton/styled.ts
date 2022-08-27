import { Skeleton, styled, MenuItem } from '@mui/material';

export const StyledCategorySkeleton = styled(Skeleton)(() => ({
  height: '100%',
  width: '100%',
  transform: 'none',
}));

export const StyledMenuItem = styled(MenuItem)(() => ({
  height: 45,
}));
