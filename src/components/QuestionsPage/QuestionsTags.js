import React from 'react';
import PropTypes from 'prop-types';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import Questions from './Questions';
import QuestionsBar from './QuestionsBar';

const QuestionsTags = ({ state, match }) => (
  <div>
    <PageHeader>Questions by &apos;{match.params.filter}&apos;</PageHeader>

    <QuestionsBar
      active={match.params.tag}
      tags={state.tags}
      filter={match.params.filter}
    />

    <hr />

    <Questions />
  </div>
);

const { shape, arrayOf, string, number } = PropTypes;

QuestionsTags.propTypes = {
  match: shape({
    params: shape({
      filter: string,
      tag: string
    }),
    path: string
  }).isRequired,
  state: shape({
    tags: arrayOf(shape({
      _id: string,
      count: number
    }))
  }).isRequired
};

export default QuestionsTags;