import React, { FunctionComponent, FormEvent, useEffect } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { TextField, TextareaField } from '../formElements';
import validate from '../../validations/comment';
import Loader from '../../utils/Loader';
import { User, Question } from '../../propTypes';

type CommentFormProps = {
  handleSubmit: (
    onSubmit: () => void,
  ) => ((event: FormEvent<HTMLFormElement>) => void) | undefined;
  onSubmit: () => void;
  initialize: (username: { username: string }) => void;
  user: User;
  addComment: (query: any) => Promise<void>;
  question: Question;
  getQuestion: (slug: string) => void;
  slug: string;
  addFlashMessage: (payload: {
    type: string;
    text: string;
  }) => { type: string; payload: { type: string; text: string } };
  reset: () => void;
};

const CommentForm: FunctionComponent<
  InjectedFormProps<{}, CommentFormProps> & CommentFormProps
> = ({
  handleSubmit,
  initialize,
  user,
  addComment,
  reset,
  question,
  getQuestion,
  addFlashMessage,
  slug,
}) => {
  useEffect(() => {
    initialize({ username: user.username });
  }, [initialize, user.username]);

  const onSubmit = (values: any) => {
    const query = { ...values, userId: user._id, questionId: question._id };

    addComment(query).then(() => {
      reset();
      getQuestion(slug);
      addFlashMessage({
        type: 'warning',
        text: 'Before publish comment should be verified',
      });
    });
  };

  return (
    <Row>
      <Col md={6} sm={8}>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Alert variant="info">
            Please keep in mind, only <strong>verified</strong> comments are
            visible for users.
          </Alert>
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
};

export default Loader('question')(
  reduxForm<{}, any>({
    form: 'CommentForm',
    validate,
  })(CommentForm),
);
