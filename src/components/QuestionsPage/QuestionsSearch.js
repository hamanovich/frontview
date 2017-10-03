import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import Questions from './Questions';

import { QuestionType, UserType } from '../../propTypes';

const QuestionsSearch = ({
  auth,
  questions,
  editQuestionField,
  state
}) => (
  <div>
    <PageHeader>
      <FontAwesome name="search-plus" /> Search: &apos;{state.searchQuery}&apos;
    </PageHeader>

    <Questions
      user={auth.user}
      questions={questions}
      editQuestionField={editQuestionField}
    />
  </div>
);

QuestionsSearch.propTypes = {
  auth: PropTypes.shape({
    user: UserType,
    isAuthenticated: PropTypes.bool.isRequired
  }).isRequired,
  questions: PropTypes.arrayOf(QuestionType).isRequired,
  editQuestionField: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
};

export default QuestionsSearch;