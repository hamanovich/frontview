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

const { shape, arrayOf, func, string, bool, number } = PropTypes;

QuestionsSearch.propTypes = {
  auth: shape({
    user: UserType,
    isAuthenticated: bool.isRequired
  }).isRequired,
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

export default QuestionsSearch;