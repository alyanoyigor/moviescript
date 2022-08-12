import BalanceIcon from '@mui/icons-material/Balance';
import { Box, IconButton } from '@mui/material';
import {
  StyledCardContainer,
  StyledCard,
  StyledCardContent,
  StyledTitle,
  StyledTextData,
} from './styled';

export const MovieItem = () => {
  return (
    <StyledCardContainer>
      <StyledCard>
        <StyledCardContent>
          <Box width="100%" display="flex" justifyContent="center">
            <StyledTitle>Spider Man 3 (Never go home)</StyledTitle>
            <StyledTextData>2021</StyledTextData>
          </Box>
        </StyledCardContent>
        <Box position="absolute" top={16} right={16} zIndex={1}>
          <IconButton>
            <BalanceIcon />
          </IconButton>
        </Box>
      </StyledCard>
    </StyledCardContainer>
  );
};
