import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledHeaderWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 20px 0;
  gap: 64px;
`;

export const StyledNav = styled.nav`
  display: flex;
  gap: 16px;
  color: ${(props) => props.theme.palette.common.white};
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;

  & > span {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
  }

  &.active {
    color: ${(props) => props.theme.palette.primary.main};
    pointer-events: none;
  }
`;
