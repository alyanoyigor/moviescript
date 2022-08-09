import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLogoContainer = styled(Link)`
  display: inline-flex;
  text-transform: uppercase;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  line-height: 80%;
  font-weight: 800;
  color: #ffffff;
  text-decoration: none;

  &.active {
    pointer-events: none;
  }
`;

export const StyledSelectedText = styled.span`
  padding: 2px;
  background-color: ${(props) => props.theme.palette.primary.main};
  color: #ffffff;
  border-radius: 2px;
`;
