import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';

import Question from './Question';

const Questions = ({ user, questions, editQuestionField, voteQuestion }) => (
  <div>
    {map(questions, question => (
      <Question
        question={question}
        editQuestionField={editQuestionField}
        voteQuestion={voteQuestion}
        key={question._id}
        user={user}
      />
    ))}
  </div>
);

Questions.propTypes = {
  user: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  editQuestionField: PropTypes.func.isRequired,
  voteQuestion: PropTypes.func.isRequired
};

export default Questions;