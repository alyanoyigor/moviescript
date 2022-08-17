import { Skeleton, styled } from '@mui/material';

export const StyledSkeletonContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0;
`;

export const StyledMovieSkeleton = styled(Skeleton)`
  height: 400px;
  transform: none;
`;

export const StyledMovieSkeletonWrapper = styled('div')`
  width: 100%;
  margin: 0;
  margin-bottom: 8px;
  text-decoration: none;

  ${(props) => props.theme.breakpoints.up('sm')} {
    width: 50%;

    & > .movie-skeleton {
      margin-right: 4px;
    }

    &:nth-of-type(even) > .movie-skeleton {
      margin-right: 0;
      margin-left: 4px;
    }
  }

  ${(props) => props.theme.breakpoints.up('md')} {
    width: 33.3%;

    & > .movie-skeleton {
      margin: 0 4px;
    }

    &:nth-of-type(even) > .movie-skeleton {
      margin-bottom: 0;
      margin-right: 4px;
    }

    &:nth-of-type(3n + 1) > .movie-skeleton {
      margin: 0;
      margin-right: 4px;
    }

    &:nth-of-type(3n) > .movie-skeleton {
      margin: 0;
      margin-left: 4px;
    }
  }

  ${(props) => props.theme.breakpoints.up('lg')} {
    width: 25%;

    & > .movie-skeleton,
    &:nth-of-type(even) > .movie-skeleton,
    &:nth-of-type(3n) > .movie-skeleton,
    &:nth-of-type(3n + 1) > .movie-skeleton {
      margin: 0 4px;
    }

    &:nth-of-type(4n + 1) > .movie-skeleton {
      margin: 0;
      margin-right: 4px;
    }

    &:nth-of-type(4n) > .movie-skeleton {
      margin: 0;
      margin-left: 4px;
    }
  }
`;
