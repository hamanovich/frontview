import React from 'react';
import PropTypes from 'prop-types';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import Questions from './Questions';

const QuestionsSearch = ({
  auth,
  questions,
  editQuestionField,
  state
}) => (
  <div>
    <PageHeader>Search: &apos;{state.searchQuery}&apos;</PageHeader>

    <Questions
      user={auth.user}
      questions={questions}
      editQuestionField={editQuestionField}
    />
  </div>
);

QuestionsSearch.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired
  }).isRequired,
  questions: PropTypes.array.isRequired,
  editQuestionField: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
};

export default QuestionsSearch;