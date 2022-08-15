import BalanceIcon from '@mui/icons-material/Balance';
import { Box, IconButton } from '@mui/material';
import {
  StyledCardContainer,
  StyledCard,
  StyledCardContent,
  StyledTitle,
  StyledTextData,
} from './styled';

type MovieItemProps = {
  title: string;
  releaseDate: string;
  movieId: string;
  imagePath: string;
};

export const MovieItem = (props: MovieItemProps) => {
  const { title, releaseDate, movieId, imagePath } = props;
  const releaseYear = new Date(releaseDate).getFullYear();

  return (
    <StyledCardContainer to={`/movies/${movieId}`}>
      <StyledCard image={imagePath}>
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
              console.log('click');
            }}
          >
            <BalanceIcon />
          </IconButton>
        </Box>
      </StyledCard>
    </StyledCardContainer>
  );
};
