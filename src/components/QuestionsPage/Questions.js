import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';

import Question from './Question';
import Loader from '../../utils/Loader';

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

export default Loader('questions')(Questions);