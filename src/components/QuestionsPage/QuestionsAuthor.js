import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import Questions from './Questions';

import { QuestionType, UserType, QListType } from '../../propTypes';

const QuestionsAuthor = ({
  auth,
  questions,
  qlists,
  editQuestionField,
}) => (
  <div>
    <PageHeader>
      <FontAwesome name="file-text-o" /> {auth.user.username}&apos;s Questions
    </PageHeader>

    <Questions
      user={auth.user}
      questions={questions}
      qlists={qlists}
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
  qlists: arrayOf(QListType).isRequired,
  questions: arrayOf(QuestionType).isRequired,
  editQuestionField: func.isRequired
};

export default QuestionsAuthor;