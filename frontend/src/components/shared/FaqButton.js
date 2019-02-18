import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const FaqBtn = styled(Link)`
  position: fixed;
  right: -0.25rem;
  top: calc(50% - 3rem);
  font-size: 2rem;
`;

const FaqButton = () => (
  <FaqBtn to="/about/faq" className="btn btn-danger">
    <FontAwesome name="question-circle-o" />
  </FaqBtn>
);

export default FaqButton;
