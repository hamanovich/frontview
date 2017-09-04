import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import Questions from './Questions';

const QuestionsAuthor = ({
  auth,
  questions,
  editQuestionField,
  voteQuestion
}) => (
  <div>
    <PageHeader>
      <FontAwesome name="file-text-o" /> Only Your Questions
  </PageHeader>

    <Questions
      user={auth.user}
      questions={questions}
      editQuestionField={editQuestionField}
      voteQuestion={voteQuestion}
    />
  </div>
);

QuestionsAuthor.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired
  }).isRequired,
  questions: PropTypes.array.isRequired,
  editQuestionField: PropTypes.func.isRequired,
  voteQuestion: PropTypes.func.isRequired
};

export default QuestionsAuthor;