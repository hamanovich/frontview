import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

export const FaqBtn = styled(Link)`
  position: fixed;
  right: -0.25rem;
  top: calc(50% - 3rem);
  font-size: 2rem;
  z-index: 2;
`;

export const FontIcon = styled(FontAwesome)`
  position: fixed;
  top: calc(50% - 6rem);
  left: calc(50% - 28px);
`;
