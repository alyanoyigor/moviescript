import {
  Button,
  Typography,
  TableRow,
  styled as styledMUI,
} from '@mui/material';
import styled from 'styled-components';

export const StyledImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 80vh;
  width: 100%;
  padding-left: 24px;

  ${(props) => props.theme.breakpoints.down('md')} {
    margin-top: 16px;
    padding: 0;
    justify-content: flex-start;
    height: auto;
  }
`;

export const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 10% 45% 45%;

  ${(props) => props.theme.breakpoints.down('md')} {
    grid-template-columns: 100%;
  }
`;

export const StyledMovieKey = styled(Typography).attrs({
  variant: 'body1',
  component: 'p',
})``;

export const StyledMovieValue = styled(Typography).attrs({
  variant: 'body1',
  component: 'p',
})`
  color: ${(props) => props.theme.palette.grey[300]} !important;
`;

export const StyledMovieTitle = styled(Typography).attrs({
  variant: 'h4',
  component: 'h1',
})`
  font-weight: 900 !important;
  margin-bottom: 24px !important;
`;

export const StyledDescriptionTitle = styled(Typography).attrs({
  variant: 'h6',
  component: 'h2',
})`
  font-weight: 500 !important;
`;

export const StyledMovieContent = styled.div`
  margin-left: 24px;

  ${(props) => props.theme.breakpoints.down('md')} {
    margin: 0;
    margin-top: 24px;
  }
`;

export const StyledBackButton = styled(Button)`
  height: 42px;
  max-width: 110px;
`;

export const StyledTableRow = styledMUI(TableRow)(({ theme }) => ({
  '& td, & th': {
    border: 0,
    padding: 8,
    paddingLeft: 0,
  },
}));
