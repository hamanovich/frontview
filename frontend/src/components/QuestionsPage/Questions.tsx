import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import QuestionOne from './Question';
import Loader from '../../utils/Loader';
import {
  approveQuestion,
  removeQuestion,
  editQuestionField,
} from '../../actions/questions';
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
      removeQuestion,
      editQuestionField,
    },
  ),

  Loader('questions'),
);

const Questions: FunctionComponent<QuestionsProps> = ({
  user,
  qlists,
  questions,
  approveQuestion,
  removeQuestion,
  editQuestionField,
}) => (
  <Row>
    {questions.length ? (
      questions.map((question: Question) => (
        <Col sm={6} xs={12} key={question._id}>
          <QuestionOne
            question={question}
            approveQuestion={approveQuestion}
            removeQuestion={removeQuestion}
            editQuestionField={editQuestionField}
            user={user}
            qlists={qlists}
          />
        </Col>
      ))
    ) : (
      <span>
        You have no added questions.
        <Link to="/questions/add">Try it now</Link>
      </span>
    )}
  </Row>
);

export default enhance(Questions);
