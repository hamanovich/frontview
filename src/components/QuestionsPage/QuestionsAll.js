import React from 'react';
import PropTypes from 'prop-types';

import PageHeader from 'react-bootstrap/lib/PageHeader';
import Badge from 'react-bootstrap/lib/Badge';

import Questions from './Questions';
import PaginationBar from '../layout/PaginationBar';

import { QuestionType, UserType, QListType } from '../../propTypes';

const QuestionsAll = ({
  auth,
  questions,
  qlists,
  editQuestionField,
  state,
  history
}) => (
  <div>
    <PageHeader>Questions <Badge>{state.pagination.count}</Badge></PageHeader>

    <Questions
      user={auth.user}
      questions={questions}
      qlists={qlists}
      editQuestionField={editQuestionField}
    />

    <PaginationBar
      activePage={state.pagination.activePage}
      pages={state.pagination.pages}
      onSelect={activePage => (state.pagination.activePage !== activePage) &&
        history.push(`/questions/page/${activePage}`)}
    />
  </div>
);

const { shape, arrayOf, func, string, number } = PropTypes;

QuestionsAll.propTypes = {
  auth: shape({
    user: UserType
  }).isRequired,
  questions: arrayOf(QuestionType).isRequired,
  qlists: arrayOf(QListType).isRequired,
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
  }).isRequired,
  history: shape({
    push: func
  }).isRequired
};

export default QuestionsAll;