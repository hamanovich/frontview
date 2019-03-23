import React, { FC } from 'react';
import { Field, reduxForm } from 'redux-form';

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import lifecycle from 'recompose/lifecycle';
import pure from 'recompose/pure';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { TextField, TextareaField } from '../formElements';
import validate from '../../validations/comment';
import Loader from '../../utils/Loader';
import {
  CommentFormProps,
  CommentFormLifecycleProps,
  CommentFormHandlersProps,
} from './models';

const enhance = compose<CommentFormProps, {}>(
  reduxForm({
    form: 'CommentForm',
    validate,
  }),

  lifecycle<CommentFormLifecycleProps, {}>({
    componentDidMount() {
      const { initialize, user } = this.props;

      initialize({ username: user.username });
    },
  }),

  withHandlers<CommentFormHandlersProps, {}>({
    onSubmit: props => (values: any) => {
      const { addComment, reset, user, question, getQuestion, slug } = props;
      const query = { ...values, userId: user._id, questionId: question._id };

      addComment(query).then(() => {
        reset();
        getQuestion(slug);
      });
    },
  }),

  Loader('question'),

  pure,
);

const CommentForm: FC<CommentFormProps> = ({ handleSubmit, onSubmit }) => (
  <Row>
    <Col md={6} sm={8}>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Field
          label="Username:"
          component={TextField}
          type="text"
          name="username"
          readonly
        />

        <Field
          label="Topic*:"
          component={TextField}
          type="text"
          name="topic"
          placeholder="Put the title/theme of comment"
        />

        <Field
          label="Comment*:"
          name="comment"
          component={TextareaField}
          rows={6}
          placeholder="Put your comment about this question"
        />

        <Button type="submit" variant="info" size="lg">
          Add a Comment
        </Button>
      </Form>
    </Col>
  </Row>
);

export default enhance(CommentForm);
