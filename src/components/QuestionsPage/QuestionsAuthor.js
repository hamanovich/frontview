import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import Questions from './Questions';

import { QuestionType, UserType } from '../../propTypes';

const QuestionsAuthor = ({
  auth,
  questions,
  editQuestionField,
}) => (
  <div>
    <PageHeader>
      <FontAwesome name="file-text-o" /> {auth.user.username}&apos;s Questions
    </PageHeader>

    <Questions
      user={auth.user}
      questions={questions}
      editQuestionField={editQuestionField}
    />
  </div>
);

const { shape, arrayOf, func, bool } = PropTypes;

QuestionsAuthor.propTypes = {
  auth: shape({
    user: UserType,
    isAuthenticated: bool.isRequired
  }).isRequired,
  questions: arrayOf(QuestionType).isRequired,
  editQuestionField: func.isRequired
};

export default QuestionsAuthor;