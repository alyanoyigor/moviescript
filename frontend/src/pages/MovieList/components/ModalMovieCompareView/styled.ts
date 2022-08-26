import { styled, ListItem, Skeleton } from '@mui/material';

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  width: '100%',
  height: '280px',

  [theme.breakpoints.down('sm')]: {
    flexWrap: 'wrap-reverse',
    height: '500px',
    alignItems: 'flex-end',
  },
}));

export const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  transform: 'none',
  width: '100%',
  height: '100%',
}));
