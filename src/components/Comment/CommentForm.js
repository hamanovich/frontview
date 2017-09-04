import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';

import { TextField, TextareaField } from '../formElements';

import validate from '../../validations/comment';

class CommentForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    getQuestion: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    initialize: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { initialize, user } = this.props;

    initialize({ username: user.username });
  }

  onSubmit = (values) => {
    const { addComment, reset, user, question, getQuestion } = this.props;
    const query = { ...values, userId: user._id, questionId: question._id };
    const { slug } = this.context.router.route.match.params;


    addComment(query).then(() => {
      reset();
      getQuestion(slug);
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Row>
        <Col md={6} sm={8}>
          <Form onSubmit={handleSubmit(this.onSubmit)} noValidate>
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

            <Button
              type="submit"
              bsStyle="info"
              bsSize="large"
            >Add a Comment</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default reduxForm({
  form: 'comment',
  validate
})(CommentForm);