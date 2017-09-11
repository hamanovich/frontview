import React from 'react';
import PropTypes from 'prop-types';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import Questions from './Questions';
import QuestionsBar from './QuestionsBar';

const QuestionsTags = ({
  auth,
  questions,
  editQuestionField,
  state
}) => (
  <div>
    <PageHeader>Questions by &apos;{state.filters.filter}&apos;</PageHeader>

    <QuestionsBar
      active={state.filters.tag}
      tags={state.filters.tags}
      filter={state.filters.filter}
    />

    <hr />

    <Questions
      user={auth.user}
      questions={questions}
      editQuestionField={editQuestionField}
    />
  </div>
);

QuestionsTags.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired
  }).isRequired,
  questions: PropTypes.array.isRequired,
  editQuestionField: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
};

export default QuestionsTags;