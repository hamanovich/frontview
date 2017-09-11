import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import Questions from './Questions';

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

QuestionsAuthor.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired
  }).isRequired,
  questions: PropTypes.array.isRequired,
  editQuestionField: PropTypes.func.isRequired
};

export default QuestionsAuthor;