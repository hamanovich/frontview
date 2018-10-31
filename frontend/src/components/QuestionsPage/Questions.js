import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import compose from 'recompose/compose';

import Question from './Question';
import Loader from '../../utils/Loader';

import { editQuestionField } from '../../actions/questions';

import { QuestionType, UserType, QListType } from '../../propTypes';

const enhance = compose(
  connect(
    state => ({
      user: state.auth.user,
      questions: state.questions,
      qlists: state.qlists,
    }),
    {
      editQuestionField,
    },
  ),

  Loader('questions'),
);

const Questions = ({ user, qlists, questions, editQuestionField }) => (
  <Fragment>
    {questions.length ? (
      map(questions, question => (
        <Question
          question={question}
          editQuestionField={editQuestionField}
          key={question._id}
          user={user}
          qlists={qlists}
        />
      ))
    ) : (
      <span>
        You have no added questions.
        <Link to="/questions/add">Try it now</Link>
      </span>
    )}
  </Fragment>
);

const { arrayOf, func } = PropTypes;

Questions.propTypes = {
  user: UserType.isRequired,
  qlists: arrayOf(QListType).isRequired,
  questions: arrayOf(QuestionType).isRequired,
  editQuestionField: func.isRequired,
};

export default enhance(Questions);
