import React from 'react';
import PropTypes from 'prop-types';

import PageHeader from 'react-bootstrap/lib/PageHeader';
import Badge from 'react-bootstrap/lib/Badge';

import Questions from './Questions';
import PaginationBar from '../layout/PaginationBar';

import { QuestionType, UserType } from '../../propTypes';

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

const { shape, arrayOf, func, string, number } = PropTypes;

QuestionsAll.propTypes = {
  auth: shape({
    user: UserType
  }).isRequired,
  questions: arrayOf(QuestionType).isRequired,
  onPageSelect: func.isRequired,
  editQuestionField: func.isRequired,
  state: shape({
    pagination: shape({
      activePage: number,
      pages: number,
      count: number
    }),
    searchQuery: string,
    filters: shape({
      filter: string,
      tags: arrayOf(shape({
        _id: string,
        count: number
      })),
      tag: string
    }).isRequired
  }).isRequired
};

export default QuestionsAll;