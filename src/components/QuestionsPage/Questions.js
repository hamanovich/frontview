import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';

import Question from './Question';

const Questions = ({ user, questions, editQuestionField }) => (
  <div>
    {map(questions, question => (
      <Question
        question={question}
        editQuestionField={editQuestionField}
        key={question._id}
        user={user}
      />
    ))}
  </div>
);

Questions.propTypes = {
  user: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  editQuestionField: PropTypes.func.isRequired
};

export default Questions;