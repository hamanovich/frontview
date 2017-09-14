import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import map from 'lodash/map';
import FontAwesome from 'react-fontawesome';

import PageHeader from 'react-bootstrap/lib/PageHeader';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Label from 'react-bootstrap/lib/Label';

import Loader from '../../utils/Loader';

const LabelGroup = styled.span`
  .label {
    margin: 0 3px;

    &:first-child{
      margin-left: 0;
    }

    &:last-child{
      margin-right: 0;
    }
  }
`;

const LabelVoted = styled.span`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const QuestionsTop = ({ questions }) => (
  <div>
    <PageHeader>
      <FontAwesome name="exclamation" /> Top 10 Questions
    </PageHeader>

    <ListGroup>
      {map(questions, (question, index) => (
        <ListGroupItem
          header={`${index + 1}. ${question.question}`}
          href={`/questions/${question.slug}/one`}
          key={question.slug}
        >
          <LabelGroup>
            <Label bsStyle="warning">{question.practice}</Label>
          </LabelGroup>
          {' | '}
          <LabelGroup>
            {question.level && map(question.level, level => (
              <Label bsStyle="primary" key={level}>{level}</Label>
            ))}
          </LabelGroup>
          {' | '}
          <LabelGroup>
            {question.skill && map(question.skill, skill => (
              <Label bsStyle="primary" key={skill}>{skill}</Label>
            ))}
          </LabelGroup>
          <LabelVoted>
            <FontAwesome name="thumbs-o-up" /> {question.votes.like.length}
          </LabelVoted>
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
);

QuestionsTop.propTypes = {
  questions: PropTypes.array.isRequired
};

export default Loader('questions')(QuestionsTop);