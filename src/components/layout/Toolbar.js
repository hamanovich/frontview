import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import FontAwesome from 'react-fontawesome';
import map from 'lodash/map';


import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import { voteQuestion } from '../../actions/questions';
import { qlistAddQuestion } from '../../actions/qlists';

import { QuestionType, QListType } from '../../propTypes';

const Toolbar = ({
  user, question, voteQuestion, qlistAddQuestion, qlists,
}) => (
  <ButtonToolbar>
    <ButtonGroup bsSize="small">
      <Button
        bsStyle="success"
        active={question.votes.like.includes(user._id)}
        onClick={voteQuestion(question, 'like', user._id)}
      >
        <FontAwesome name="thumbs-up" />
        {' '}
        {question.votes.like.length}
      </Button>

      <Button
        bsStyle="danger"
        active={question.votes.dislike.includes(user._id)}
        onClick={voteQuestion(question, 'dislike', user._id)}
      >
        <FontAwesome name="thumbs-down" />
        {' '}
        {question.votes.dislike.length}
      </Button>
    </ButtonGroup>

    <ButtonGroup bsSize="small">
      <DropdownButton
        bsSize="small"
        bsStyle="info"
        title={<FontAwesome name="star" />}
        id="qlist"
      >
        {map(qlists, (qlist, index) => (
          <MenuItem
            eventKey={index}
            key={qlist._id}
            onClick={qlistAddQuestion(qlist, question)}
          >
            {qlist.title}
            {map(qlist.questions, q => q._id).includes(question._id)
              && <FontAwesome name="check" />
            }
          </MenuItem>
        ))}
        <MenuItem divider />
        <LinkContainer to="/me/qlist/create">
          <MenuItem>Create new QList</MenuItem>
        </LinkContainer>
      </DropdownButton>
    </ButtonGroup>
  </ButtonToolbar>
);

const {
  arrayOf, shape, func, string,
} = PropTypes;

Toolbar.propTypes = {
  user: shape({
    _id: string,
  }).isRequired,
  question: QuestionType.isRequired,
  qlists: arrayOf(QListType).isRequired,
  qlistAddQuestion: func.isRequired,
  voteQuestion: func.isRequired,
};

export default connect(null, {
  voteQuestion,
  qlistAddQuestion,
})(Toolbar);