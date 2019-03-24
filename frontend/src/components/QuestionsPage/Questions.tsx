import React, { FC, Fragment } from 'react';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';

import QuestionOne from './Question';
import Loader from '../../utils/Loader';
import { approveQuestion, editQuestionField } from '../../actions/questions';
import { QuestionsProps, QuestionsState } from './models';
import { Question } from '../../propTypes/QuestionType';

const enhance = compose<
  QuestionsProps,
  { questions?: Question | Question[] | string[] }
>(
  connect(
    (state: QuestionsState) => ({
      user: state.auth.user,
      questions: state.questions,
      qlists: state.qlists,
    }),
    {
      approveQuestion,
      editQuestionField,
    },
  ),

  Loader('questions'),
);

const Questions: FC<QuestionsProps> = ({
  user,
  qlists,
  questions,
  approveQuestion,
  editQuestionField,
}) => (
  <Fragment>
    {questions.length ? (
      map(questions, question => (
        <QuestionOne
          question={question}
          approveQuestion={approveQuestion}
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

export default enhance(Questions);
