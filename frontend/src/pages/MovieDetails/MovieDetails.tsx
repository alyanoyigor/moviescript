import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  StyledBackButton,
  StyledContainer,
  StyledDescriptionTitle,
  StyledImage,
  StyledImageWrapper,
  StyledMovieContent,
  StyledMovieKey,
  StyledMovieTitle,
  StyledMovieValue,
} from './styled';

const image_16_9 = 'https://wallpaperaccess.com/full/109672.jpg';
const image_9_16 = 'https://static.posters.cz/image/750webp/50036.webp';

export const MovieDetails = () => {
  const navigate = useNavigate();

  return (
    <StyledContainer>
      <StyledBackButton
        variant="outlined"
        color="light"
        onClick={() => navigate(-1)}
        startIcon={<ArrowBackIcon />}
      >
        Back
      </StyledBackButton>
      <StyledImageWrapper>
        <StyledImage src={image_16_9} alt="" />
      </StyledImageWrapper>
      <StyledMovieContent>
        <StyledMovieTitle>Spider Man (Never go home)</StyledMovieTitle>
        <Box
          display="flex"
          alignItems="flex-end"
          gap="32px"
          marginBottom="24px"
        >
          <Box>
            <StyledMovieKey>Release date:</StyledMovieKey>
          </Box>
          <Box>
            <StyledMovieValue>05.12.2020</StyledMovieValue>
          </Box>
        </Box>
        <Box marginBottom="36px">
          <StyledDescriptionTitle>Film description:</StyledDescriptionTitle>
          <StyledMovieValue>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </StyledMovieValue>
        </Box>
        <Button variant="contained">Edit Movie</Button>
      </StyledMovieContent>
    </StyledContainer>
  );
};
