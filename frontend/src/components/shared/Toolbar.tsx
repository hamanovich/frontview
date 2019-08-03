import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import FontAwesome from 'react-fontawesome';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import { voteQuestion } from '../../actions/questions';
import { qlistAddQuestion } from '../../actions/qlists';

import { Question } from '../../propTypes/QuestionType';
import { QList } from '../../propTypes/QListType';
import { ToolbarProps } from './models';

export const Toolbar: FunctionComponent<ToolbarProps> = ({
  user,
  question,
  voteQuestion,
  qlistAddQuestion,
  qlists,
}) => (
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
      <DropdownButton
        size="sm"
        variant="info"
        title={<FontAwesome name="star" />}
        id="qlist">
        {qlists.map((qlist: QList, index: any) => (
          <Dropdown.Item
            eventKey={index}
            key={qlist._id}
            onClick={qlistAddQuestion(qlist, question)}>
            {qlist.title}
            {qlist.questions
              .map((q: Question) => q._id)
              .includes(question._id) && <FontAwesome name="check" />}
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

export default connect(
  null,
  {
    voteQuestion,
    qlistAddQuestion,
  },
)(Toolbar);
