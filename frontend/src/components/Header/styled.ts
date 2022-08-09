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
  color: #ffffff;
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;
