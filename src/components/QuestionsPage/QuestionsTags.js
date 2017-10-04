import React from 'react';
import PropTypes from 'prop-types';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import Questions from './Questions';
import QuestionsBar from './QuestionsBar';

import { QuestionType, UserType, QListType } from '../../propTypes';

const QuestionsTags = ({
  auth,
  questions,
  qlists,
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
      qlists={qlists}
      editQuestionField={editQuestionField}
    />
  </div>
);

const { shape, arrayOf, func, string, bool, number } = PropTypes;

QuestionsTags.propTypes = {
  auth: shape({
    user: UserType,
    isAuthenticated: bool.isRequired
  }).isRequired,
  qlists: arrayOf(QListType).isRequired,
  questions: arrayOf(QuestionType).isRequired,
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

export default QuestionsTags;