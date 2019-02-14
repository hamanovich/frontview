import React from 'react';
import { func } from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { TextareaField } from '../formElements';

import validate from '../../validations/interviewNotes';

const enhance = compose(
  reduxForm({
    form: 'InterviewNotesForm',
    validate,
  }),

  withHandlers({
    onSubmit: props => feedback => {
      const { provideFeedback, candidate, push } = props;

      provideFeedback(candidate._id, feedback);

      push({
        pathname: '/interview/finish',
        state: { feedback, candidate },
      });
    },
  }),
);

const InterviewNotesForm = ({ handleSubmit, onSubmit }) => (
  <Form onSubmit={handleSubmit(onSubmit)} noValidate>
    <Field
      label="Private notes:"
      name="result"
      component={TextareaField}
      rows={6}
      placeholder="Add notes about how it is going"
    />

    <p>Before Finish be sure that you asked all questions!</p>

    <Button type="submit" variant="primary" size="lg">
      Finish Interview
    </Button>
  </Form>
);

InterviewNotesForm.propTypes = {
  handleSubmit: func.isRequired,
  onSubmit: func.isRequired,
};

export default enhance(InterviewNotesForm);
