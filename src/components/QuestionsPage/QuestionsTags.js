import React from 'react';
import PropTypes from 'prop-types';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import Questions from './Questions';
import QuestionsBar from './QuestionsBar';

const QuestionsTags = ({
  auth,
  questions,
  editQuestionField,
  voteQuestion,
  state
}) => (
  <div>
    <PageHeader>Questions</PageHeader>

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
      voteQuestion={voteQuestion}
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
  voteQuestion: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
};

export default QuestionsTags;