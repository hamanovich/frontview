import React from 'react';
import { arrayOf, shape, func, string } from 'prop-types';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import FontAwesome from 'react-fontawesome';
import map from 'lodash/map';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import { voteQuestion } from '../../actions/questions';
import { qlistAddQuestion } from '../../actions/qlists';

import { QuestionType, QListType } from '../../propTypes';

export const Toolbar = ({ user, question, voteQuestion, qlistAddQuestion, qlists }) => (
  <ButtonToolbar>
    <ButtonGroup size="sm">
      <Button
        variant="success"
        active={question.votes.like.includes(user._id)}
        onClick={voteQuestion(question, 'like', user._id)}>
        <FontAwesome name="thumbs-up" /> {question.votes.like.length}
      </Button>

      <Button
        variant="danger"
        active={question.votes.dislike.includes(user._id)}
        onClick={voteQuestion(question, 'dislike', user._id)}>
        <FontAwesome name="thumbs-down" /> {question.votes.dislike.length}
      </Button>
    </ButtonGroup>

    <ButtonGroup size="sm">
      <DropdownButton size="sm" variant="info" title={<FontAwesome name="star" />} id="qlist">
        {map(qlists, (qlist, index) => (
          <Dropdown.Item
            eventKey={index}
            key={qlist._id}
            onClick={qlistAddQuestion(qlist, question)}>
            {qlist.title}
            {map(qlist.questions, q => q._id).includes(question._id) && (
              <FontAwesome name="check" />
            )}
          </Dropdown.Item>
        ))}
        {qlists.length > 0 && <Dropdown.Divider />}
        <LinkContainer to="/me/qlist/create">
          <Dropdown.Item>Create a new QList</Dropdown.Item>
        </LinkContainer>
      </DropdownButton>
    </ButtonGroup>
  </ButtonToolbar>
);

Toolbar.propTypes = {
  user: shape({
    _id: string,
  }).isRequired,
  question: QuestionType.isRequired,
  qlists: arrayOf(QListType).isRequired,
  qlistAddQuestion: func.isRequired,
  voteQuestion: func.isRequired,
};

export default connect(
  null,
  {
    voteQuestion,
    qlistAddQuestion,
  },
)(Toolbar);
