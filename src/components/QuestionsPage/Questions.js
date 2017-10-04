import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';

import Question from './Question';
import Loader from '../../utils/Loader';

import { QuestionType, UserType } from '../../propTypes';

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

const { arrayOf, func } = PropTypes;

Questions.propTypes = {
  user: UserType.isRequired,
  questions: arrayOf(QuestionType).isRequired,
  editQuestionField: func.isRequired
};

export default Loader('questions')(Questions);