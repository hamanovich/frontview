import React from 'react';
import PropTypes from 'prop-types';

import PageHeader from 'react-bootstrap/lib/PageHeader';
import Badge from 'react-bootstrap/lib/Badge';

import Questions from './Questions';
import PaginationBar from '../layout/PaginationBar';

const QuestionsAll = ({
  auth,
  questions,
  editQuestionField,
  onPageSelect,
  state
}) => (
  <div>
    <PageHeader>Questions <Badge>{state.pagination.count}</Badge></PageHeader>

    <Questions
      user={auth.user}
      questions={questions}
      editQuestionField={editQuestionField}
    />

    <PaginationBar
      activePage={state.pagination.activePage}
      pages={state.pagination.pages}
      onSelect={onPageSelect}
    />
  </div>
);

QuestionsAll.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired
  }).isRequired,
  questions: PropTypes.array.isRequired,
  onPageSelect: PropTypes.func.isRequired,
  editQuestionField: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
};

export default QuestionsAll;