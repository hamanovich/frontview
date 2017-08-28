import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

const Toolbar = ({ size, question, userId, voteQuestion }) => (
  <ButtonGroup bsSize={size}>
    <Button
      bsStyle="success"
      active={question.votes.like.includes(userId)}
      onClick={() => voteQuestion(question, 'like', userId)}>
      <FontAwesome name="thumbs-up" /> {question.votes.like.length}
    </Button>

    <Button
      bsStyle="danger"
      active={question.votes.dislike.includes(userId)}
      onClick={() => voteQuestion(question, 'dislike', userId)}>
      <FontAwesome name="thumbs-down" /> {question.votes.dislike.length}
    </Button>
  </ButtonGroup>
);

Toolbar.propTypes = {
  size: PropTypes.string,
  userId: PropTypes.string.isRequired,
  question: PropTypes.object.isRequired,
  voteQuestion: PropTypes.func.isRequired
};

Toolbar.defaultProps = {
  size: 'small'
};

export default Toolbar;