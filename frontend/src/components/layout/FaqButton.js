import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const FaqBtn = styled(Link)`
  position: fixed;
  right: -0.375rem;
  top: calc(50% - 3rem);
  font-size: 3rem;
`;

const FaqButton = () => (
  <FaqBtn to="/faq" className="btn btn-danger btn-lg">
    <FontAwesome name="question-circle-o" />
  </FaqBtn>
);

export default FaqButton;
