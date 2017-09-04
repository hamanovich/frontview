import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import FontAwesome from 'react-fontawesome';

import PageHeader from 'react-bootstrap/lib/PageHeader';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Label from 'react-bootstrap/lib/Label';

import Loader from '../../utils/Loader';

import './QuestionsTop.css';

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
          <span className="label-group">
            <Label bsStyle="warning">{question.practice}</Label>
          </span>
          {' | '}
          <span className="label-group">
            {question.level && map(question.level, level => (
              <Label bsStyle="primary" key={level}>{level}</Label>
            ))}
          </span>
          {' | '}
          <span className="label-group">
            {question.skill && map(question.skill, skill => (
              <Label bsStyle="primary" key={skill}>{skill}</Label>
            ))}
          </span>
          <span className="label-voted">
            <FontAwesome name="thumbs-o-up" /> {question.votes.like.length}
          </span>
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
);

QuestionsTop.propTypes = {
  questions: PropTypes.array.isRequired
};

export default Loader('questions')(QuestionsTop);