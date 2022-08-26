import { Box, IconButton } from '@mui/material';
import {
  Check as CheckIcon,
  Balance as BalanceIcon,
} from '@mui/icons-material';
import {
  StyledCardContainer,
  StyledCard,
  StyledImage,
  StyledCardContent,
  StyledTitle,
  StyledTextData,
} from './styled';

type MovieItemProps = {
  title: string;
  releaseDate: Date;
  movieId: string;
  imagePath: string;
  handleToggleCompareMovie: (id: string) => void;
  compareMovieIds: string[];
};

export const MovieItem = (props: MovieItemProps) => {
  const {
    title,
    releaseDate,
    movieId,
    imagePath,
    compareMovieIds,
    handleToggleCompareMovie,
  } = props;
  const releaseYear = new Date(releaseDate).getFullYear();

  return (
    <StyledCardContainer to={`/movies/${movieId}`}>
      <StyledCard>
        <StyledImage src={imagePath} alt={title} />
        <StyledCardContent>
          <Box width="100%" display="flex" justifyContent="center">
            <StyledTitle>{title}</StyledTitle>
            <StyledTextData>{releaseYear}</StyledTextData>
          </Box>
        </StyledCardContent>
        <Box position="absolute" top={16} right={16} zIndex={1}>
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleToggleCompareMovie(movieId);
            }}
          >
            {compareMovieIds.indexOf(movieId) > -1 ? (
              <CheckIcon color="success" />
            ) : (
              <BalanceIcon />
            )}
          </IconButton>
        </Box>
      </StyledCard>
    </StyledCardContainer>
  );
};
