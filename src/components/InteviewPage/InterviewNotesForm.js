import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import { TextareaField } from '../formElements';

import validate from '../../validations/interviewNotes';

class InterviewNotesForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    provideFeedback: PropTypes.func.isRequired,
    candidate: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  onSubmit = (feedback) => {
    const { provideFeedback, candidate } = this.props;
    const { history } = this.context.router;

    provideFeedback(candidate._id, feedback);

    history.push({
      pathname: '/interview/finish',
      state: feedback.result
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)} noValidate>
        <Field
          label="Private notes:"
          name="result"
          component={TextareaField}
          rows={6}
          placeholder="Add notes about how it is going"
        />

        <HelpBlock>Before Finish be sure that you asked all questions!</HelpBlock>

        <Button
          type="submit"
          bsStyle="primary"
          bsSize="large"
        >Finish Interview</Button>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'InterviewNotesForm',
  validate
})(InterviewNotesForm);