import React from 'react';
import PropTypes from 'prop-types';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import Questions from './Questions';
import QuestionsBar from './QuestionsBar';

const QuestionsTags = ({ match }) => (
  <div>
    <PageHeader>
      Questions by &apos;
      {match.params.filter}
      &apos;
    </PageHeader>

    <QuestionsBar active={match.params.tag} filter={match.params.filter} />

    <hr />

    <Questions />
  </div>
);

const { shape, string } = PropTypes;

QuestionsTags.propTypes = {
  match: shape({
    params: shape({
      filter: string,
      tag: string,
    }),
    path: string,
  }).isRequired,
};

export default QuestionsTags;
