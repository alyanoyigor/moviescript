import { styled, ListItem, Typography } from '@mui/material';

export const StyledImageContainer = styled('div')(({ theme }) => ({
  height: '264px',
  flex: '0 0 40%',

  [theme.breakpoints.down('sm')]: {
    flex: 'auto',
    marginTop: 'auto',
    height: '242px',
  },
}));

export const StyledImage = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: cover;
  vertical-align: middle;
`;

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

export const StyledDescription = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
` as typeof Typography;

export const StyledTitle = styled(Typography)`
  font-weight: 500;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
` as typeof Typography;

export const StyledIconContainer = styled('div')`
  display: flex;
  gap: 8px;
`;
