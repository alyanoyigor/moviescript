import { Button, styled as styledMUI } from '@mui/material';
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
  margin-bottom: 32px;

  ${(props) => props.theme.breakpoints.down('md')} {
    grid-template-columns: 100%;
  }
`;

export const StyledButton = styledMUI(Button)`
  height: 40px;
  width: 100%;
  max-width: 100px;
`;

export const StyledBackButton = styledMUI(StyledButton)`
  margin-bottom: 32px;

  ${(props) => props.theme.breakpoints.down('md')} {
    margin: 0;
    margin-right: 32px;
  }
`;

export const StyledEditButton = styledMUI(StyledButton)`
  margin-bottom: 8px;

  ${(props) => props.theme.breakpoints.down('md')} {
    margin: 0;
    margin-right: 8px;
  }
`;
