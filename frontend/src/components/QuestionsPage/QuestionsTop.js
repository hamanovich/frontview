import React, { Fragment } from 'react';
import { arrayOf } from 'prop-types';
import styled from 'styled-components';
import map from 'lodash/map';
import FontAwesome from 'react-fontawesome';
import { Helmet } from 'react-helmet';

import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

import { QuestionType } from '../../propTypes';

import Loader from '../../utils/Loader';

const BadgeGroup = styled.span`
  .label {
    margin: 0 3px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
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
  <Fragment>
    <Helmet>
      <title>Frontview: Top 10 Questions</title>
    </Helmet>
    <h1>
      <FontAwesome name="exclamation" /> Top 10 Questions
    </h1>

    <ListGroup>
      {map(questions, (question, index) => (
        <ListGroup.Item action href={`/questions/${question.slug}/one`} key={question.slug}>
          <h4>
            {index + 1}. {question.question}
          </h4>
          <BadgeGroup>
            <Badge variant="warning">{question.practice}</Badge>
          </BadgeGroup>
          {' | '}
          <BadgeGroup>
            {question.level &&
              map(question.level, level => (
                <Badge variant="primary" key={level}>
                  {level}
                </Badge>
              ))}
          </BadgeGroup>
          {' | '}
          <BadgeGroup>
            {question.skill &&
              map(question.skill, skill => (
                <Badge variant="primary" key={skill}>
                  {skill}
                </Badge>
              ))}
          </BadgeGroup>
          <LabelVoted>
            <FontAwesome name="thumbs-o-up" /> {question.votes.like.length}
          </LabelVoted>
        </ListGroup.Item>
      ))}
    </ListGroup>
  </Fragment>
);

QuestionsTop.propTypes = {
  questions: arrayOf(QuestionType).isRequired,
};

export default Loader('questions')(QuestionsTop);
