import React, { FunctionComponent, Fragment } from 'react';
import FontAwesome from 'react-fontawesome';
import { Helmet } from 'react-helmet';

import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

import Loader from '../../utils/Loader';
import { BadgeGroup, LabelVoted } from './style';
import { QuestionsTopProps } from './models';
import { Question } from '../../propTypes/QuestionType';

const QuestionsTop: FunctionComponent<QuestionsTopProps> = ({ questions }) => (
  <Fragment>
    <Helmet>
      <title>Frontview: Top 10 Questions</title>
    </Helmet>
    <h1>
      <FontAwesome name="exclamation" /> Top 10 Questions
    </h1>

    <ListGroup>
      {questions.map((question: Question, index: number) => (
        <ListGroup.Item
          action
          href={`/questions/${question.slug}/one`}
          key={question._id}>
          <h4>
            {index + 1}. {question.question}
          </h4>
          <BadgeGroup>
            <Badge variant="warning">{question.practice}</Badge>
          </BadgeGroup>
          {' | '}
          <BadgeGroup>
            {question.level &&
              question.level.map((level: string) => (
                <Fragment key={level}>
                  <Badge variant="primary">{level}</Badge>{' '}
                </Fragment>
              ))}
          </BadgeGroup>
          {' | '}
          <BadgeGroup>
            {question.skill &&
              question.skill.map((skill: string) => (
                <Fragment key={skill}>
                  <Badge variant="primary">{skill}</Badge>{' '}
                </Fragment>
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

export default Loader('questions')(QuestionsTop);
