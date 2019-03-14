import React from 'react';

import FontAwesome from 'react-fontawesome';

import { FaqBtn } from './style';

const FaqButton = () => (
  <FaqBtn to="/about/faq" className="btn btn-sm btn-danger">
    <FontAwesome name="question-circle-o" />
  </FaqBtn>
);

export default FaqButton;
